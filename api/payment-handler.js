import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  console.log("Webhook triggered");
  console.log("req.body: ", JSON.stringify(req.body, null, 2));

  if (req.method === "POST") {
    // Parse the notification from Blocknative
    const transaction = req.body;
    console.log("Transaction details:", transaction);

    try {
      // First, update value_paid and tx_id based on the transaction details
      const { data: paymentData, error: paymentError } = await supabase
        .from("payment_infos")
        .update({ value_paid: transaction.value, tx_id: transaction.hash })
        .match({ address_payer: transaction.from })
        .order("created_at", { ascending: false })
        .limit(1)
        .select("request_id, min_value, value_paid, analysis_type") // Get necessary columns to check the conditions
        .single();

      if (paymentError) {
        console.error("Supabase update error:", paymentError);
        return res.status(500).json({ error: "Failed to update database" });
      }

      if (!paymentData) {
        return res
          .status(404)
          .json({ error: "No payment info found for the transaction" });
      }

      // Check if the value paid is greater than or equal to the min_value & is the predictive analysis
      if (
        paymentData.value_paid >= paymentData.min_value &&
        paymentData.analysis_type === "predictive"
      ) {
        // Proceed to update analysis_requests since the payment meets the criteria
        const { error: analysisError } = await supabase
          .from("analysis_requests")
          .update({ payment_done: true })
          .match({ request_id: paymentData.request_id });

        if (analysisError) {
          console.error("Error updating analysis_requests:", analysisError);
          return res
            .status(500)
            .json({ error: "Failed to update analysis_requests table" });
        }
      } else if (
        paymentData.value_paid >= paymentData.min_value &&
        paymentData.analysis_type === "lookup"
      ) {
        // Proceed to update analysis_requests since the payment meets the criteria
        const { error: analysisError } = await supabase
          .from("analysis_lookup_requests")
          .update({ payment_done: true })
          .match({ request_id: paymentData.request_id });

        if (analysisError) {
          console.error("Error updating analysis_requests:", analysisError);
          return res
            .status(500)
            .json({ error: "Failed to update analysis_requests table" });
        }
      } else {
        // If the condition is not met, you might want to log this or handle accordingly
        return res.status(400).json({
          error: "Payment does not meet the minimum value requirement",
        });
      }

      return res.status(200).json({
        message: "Transaction and analysis updated successfully",
        paymentDetails: paymentData,
      });
    } catch (error) {
      console.error("Processing error:", error);
      return res
        .status(500)
        .json({ error: "Error processing the transaction" });
    }
  } else {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }
}

//old code with only predictive working
/*
//original function working for predictive analysis

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  console.log("Webhook triggered");
  console.log("req.body: ", JSON.stringify(req.body, null, 2));

  if (req.method === "POST") {
    // Parse the notification from Blocknative
    const transaction = req.body;
    console.log("Transaction details:", transaction);

    try {
      // First, update value_paid and tx_id based on the transaction details
      const { data: paymentData, error: paymentError } = await supabase
        .from("payment_infos")
        .update({ value_paid: transaction.value, tx_id: transaction.hash })
        .match({ address_payer: transaction.from })
        .select("request_id, min_value, value_paid") // Get necessary columns to check the conditions
        .single();

      if (paymentError) {
        console.error("Supabase update error:", paymentError);
        return res.status(500).json({ error: "Failed to update database" });
      }

      if (!paymentData) {
        return res
          .status(404)
          .json({ error: "No payment info found for the transaction" });
      }

      // Check if the value paid is greater than or equal to the min_value
      if (paymentData.value_paid >= paymentData.min_value) {
        // Proceed to update analysis_requests since the payment meets the criteria
        const { error: analysisError } = await supabase
          .from("analysis_requests")
          .update({ payment_done: true })
          .match({ request_id: paymentData.request_id });

        if (analysisError) {
          console.error("Error updating analysis_requests:", analysisError);
          return res
            .status(500)
            .json({ error: "Failed to update analysis_requests table" });
        }
      } else {
        // If the condition is not met, you might want to log this or handle accordingly
        return res.status(400).json({
          error: "Payment does not meet the minimum value requirement",
        });
      }

      return res.status(200).json({
        message: "Transaction and analysis updated successfully",
        paymentDetails: paymentData,
      });
    } catch (error) {
      console.error("Processing error:", error);
      return res
        .status(500)
        .json({ error: "Error processing the transaction" });
    }
  } else {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }
}

//working code with documentation payload

export default async function handler(req, res) {
  console.log("Webhook triggered");
  console.log("req.body: ", JSON.stringify(req.body, null, 2));

  if (req.method === "POST") {
    // Parse the notification from Blocknative

    const transaction = req.body.transactions[0];
    console.log("Transaction details:", transaction);

    try {
      // Assuming 'payment_info' table has a column 'address_payer' to match 'from' address in the transaction
      const { data, error } = await supabase
        .from("payment_infos")
        .update({ value_paid: transaction.value })
        .match({ address_payer: transaction.from });

      if (error) {
        console.error("Supabase update error:", error);
        return res.status(500).json({ error: "Failed to update database" });
      }

      return res
        .status(200)
        .json({ message: "Transaction processed successfully", details: data });
    } catch (error) {
      console.error("Processing error:", error);
      return res
        .status(500)
        .json({ error: "Error processing the transaction" });
    }

    //if successful, get request_id from this row, and with this request id, update analysis_request table
  } else {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }
}
*/
