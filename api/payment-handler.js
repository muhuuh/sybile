// This would be in your Vercel project, under `/api/receive-blocknative.js` or similar
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Parse the notification from Blocknative
    const { transaction } = req.body; // Adjust based on actual Blocknative notification payload

    // Perform validation and update Supabase if necessary
    const { data, error } = await supabase
      .from("payment_info")
      .update({ payment_received: true })
      .match({ request_id: transaction.from }); // Ensure you're matching with correct logic

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ error: "Failed to update database" });
    }

    return res.status(200).json({ message: "Transaction processed" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
