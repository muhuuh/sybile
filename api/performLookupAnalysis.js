import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;

export async function performLookupAnalysis(requestId) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: lookupData, error: lookupError } = await supabase
      .from("lookup_uploads")
      .select("storage_url")
      .eq("id", requestId)
      .single();

    if (lookupError) throw new Error("Failed to fetch storage URL");

    // Assume some analysis logic here
    const analysisResult = { networkData: "Example analysis result" };

    // Store the analysis result
    const { error: resultError } = await supabase
      .from("analysis_lookup_results")
      .insert([{ request_id: requestId, data_network: analysisResult }]);

    if (resultError) throw new Error("Failed to store analysis results");

    console.log("Analysis completed successfully for request ID:", requestId);
  } catch (error) {
    console.error("Error during analysis:", error.message);
  }
}
