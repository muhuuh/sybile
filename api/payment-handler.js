// This would be in your Vercel project, under `/api/receive-blocknative.js` or similar
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
      // Update payment_infos and retrieve the updated row to get request_id
      const { data: paymentData, error: paymentError } = await supabase
        .from("payment_infos")
        .update({ value_paid: transaction.value, tx_id: transaction.hash })
        .match({ address_payer: transaction.from })
        .single(); // Assuming each transaction uniquely identifies a single row

      if (paymentError) {
        console.error("Supabase update error:", paymentError);
        return res.status(500).json({ error: "Failed to update database" });
      }

      // Extract request_id from the updated payment_info
      const { request_id } = paymentData;

      // Update analysis_requests using the retrieved request_id
      const { error: analysisError } = await supabase
        .from("analysis_requests")
        .update({ payment_done: true })
        .match({ request_id });

      if (analysisError) {
        console.error("Error updating analysis_requests:", analysisError);
        return res
          .status(500)
          .json({ error: "Failed to update analysis_requests table" });
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
/*
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
