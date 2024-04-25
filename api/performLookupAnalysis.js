import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { parse } from "csv-parse";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function performLookupAnalysis(requestId) {
  console.log("requestId", requestId);
  try {
    // Fetch storage URL from the database
    const { data: lookupData, error: lookupError } = await supabase
      .from("lookup_uploads")
      .select("storage_url")
      .eq("id", requestId)
      .single();

    console.log("lookupData.storage_url: ", lookupData.storage_url);

    if (lookupError) throw new Error("Failed to fetch storage URL");

    const analysisResult = {
      sybiledTokenPercentage: 23,
      totalSybilAddresses: 223,
      sybilAddressPercentage: 3,
      storage_url: lookupData.storage_url,
    };

    //TODO add googlecloud API
    // Call an external API with the storage_url if required
    // Replace 'EXTERNAL_API_URL' with your actual API endpoint
    //await axios.post("EXTERNAL_API_URL", { url: lookupData.storage_url });

    //TODO remove when api calls work as it should be done from there
    // Store the analysis result in the database
    const { error: resultError } = await supabase
      .from("analysis_lookup_results")
      .insert([{ request_id: requestId, data_network: analysisResult }]);

    if (resultError) throw new Error("Failed to store analysis results");

    const { error: AnalysisError } = await supabase
      .from("analysis_lookup_requests")
      .update({ analysis_done: true })
      .match({ request_id: requestId });

    if (AnalysisError) {
      console.error(
        "Error updating analysis_requests for analysis processing:",
        AnalysisError
      );
    }

    console.log("Analysis completed successfully for request ID:", requestId);
  } catch (error) {
    console.error("Error during analysis:", error.message);
  }
}
