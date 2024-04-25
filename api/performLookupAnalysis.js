import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { parse } from "csv-parse";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function performLookupAnalysis(requestId) {
  console.log("requestId", requestId);
  console.log("supabaseKey;", supabaseKey);
  try {
    // Fetch storage URL from the database
    const { data: lookupData, error: lookupError } = await supabase
      .from("lookup_uploads")
      .select("storage_url")
      .eq("id", requestId)
      .single();

    console.log("lookupData.storage_url: ", lookupData.storage_url);
    if (lookupError) {
      throw new Error("Failed to fetch storage URL");
    }

    // Define a dummy analysis result
    const analysisResult = {
      sybiledTokenPercentage: 23,
      totalSybilAddresses: 223,
      sybilAddressPercentage: 3,
      storage_url: lookupData.storage_url,
    };

    console.log("analysisResult: ", analysisResult);

    // Optional: Call an external API with the storage_url if required
    // Replace 'EXTERNAL_API_URL' with your actual API endpoint
    // const apiResponse = await axios.post("EXTERNAL_API_URL", { url: lookupData.storage_url });
    // console.log("API Response:", apiResponse.data);

    // Store the dummy analysis result in the database
    const { data: insertData, error: resultError } = await supabase
      .from("analysis_lookup_results")
      .insert([{ request_id: requestId, data_network: analysisResult }]);

    if (resultError) {
      console.error("Failed to store analysis results:", resultError);
      throw new Error("Failed to store analysis results");
    } else {
      console.log("Insert Data:", insertData);
    }

    // Update the analysis done status
    const { error: analysisError } = await supabase
      .from("analysis_lookup_requests")
      .update({ analysis_done: true })
      .match({ request_id: requestId });

    if (analysisError) {
      console.error(
        "Error updating analysis_requests for analysis processing:",
        analysisError
      );
    }

    console.log("Analysis completed successfully for request ID:", requestId);
  } catch (error) {
    console.error("Error during analysis:", error.message);
  }
}
