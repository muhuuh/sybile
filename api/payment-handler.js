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

    const transaction = req.body.transactions[0];
    console.log("Transaction details:", transaction);

    try {
      // Assuming 'payment_info' table has a column 'address_payer' to match 'from' address in the transaction
      const { data, error } = await supabase
        .from("payment_info")
        .update({ payment_received: true })
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
