// This would be in your Vercel project, under `/api/receive-blocknative.js` or similar
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  console.log("req");
  console.log(req);
  console.log(req.method);
  console.log(res);
  console.log("req.body: ", JSON.stringify(req.body, null, 2));
  console.log("Webhook triggered");

  const { type, record } = req.body;
  console.log("Type:", type);
  if (req.method === "POST") {
    // Parse the notification from Blocknative
    console.log("serverless function");
    console.log(req.body);
    const { transaction } = req.body; // Adjust based on actual Blocknative notification payload

    // Perform validation and update Supabase if necessary
    const { data, error } = await supabase
      .from("payment_info")
      .update({ payment_received: true })
      .match({ address_payer: transaction.from });
    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ error: "Failed to update database" });
    }

    //if successful, get request_id from this row, and with this request id, update analysis_request table

    return res.status(200).json({ message: "Transaction processed" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
