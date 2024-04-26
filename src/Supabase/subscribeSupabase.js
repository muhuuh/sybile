import supabase from "./supabase";
import { updateFromRealTime } from "../components/store/payment-lookup-slice";

export const subscribeToSupabaseLookup = (dispatch) => {
  const mySubscription = supabase
    .channel("public:analysis_lookup_requests")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "analysis_lookup_requests" },
      (payload) => {
        console.log("Change received!", payload);
        dispatch(
          updateFromRealTime({
            request_id: payload.new.request_id,
            paymentMade: payload.new.payment_done,
            analysisDone: payload.new.analysis_done,
          })
        );
      }
    )
    .subscribe();

  return mySubscription;
};

/*
export const subscribeToSupabaseLookup = (dispatch) => {
  try {
    supabase
      .from("analysis_lookup_requests")
      .on("*", (payload) => {
        console.log("Change received!", payload);
        dispatch(
          paymentLookupActions.updateAnalysisRequest({
            request_id: payload.new.request_id,
            paymentMade: payload.new.payment_done,
            analysisDone: payload.new.analysis_done,
          })
        );
      })
      .subscribe();
  } catch (error) {
    console.error("Failed to subscribe to Supabase:", error);
  }
};
*/
