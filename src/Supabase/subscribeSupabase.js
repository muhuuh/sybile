import supabase from "./supabase";
import { updateFromRealTime } from "../components/store/payment-lookup-slice";
import { updateFromRealTimePredictive } from "../components/store/payment-slice";

export const subscribeToSupabaseLookup = (dispatch, requestId) => {
  const channel = supabase
    .channel("public:analysis_lookup_requests")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "analysis_lookup_requests" },
      (payload) => {
        console.log("Change received!", payload);
        if (payload.new.request_id === requestId) {
          dispatch(
            updateFromRealTime({
              request_id: payload.new.request_id,
              paymentMade: payload.new.payment_done,
              analysisDone: payload.new.analysis_done,
            })
          );
        }
      }
    )
    .subscribe();

  return channel;
};

export const subscribeToSupabasePredictive = (dispatch, requestId) => {
  const channel = supabase
    .channel("public:analysis_requests")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "analysis_requests" },
      (payload) => {
        console.log("Change received!", payload);
        if (payload.new.request_id === requestId) {
          dispatch(
            updateFromRealTimePredictive({
              request_id: payload.new.request_id,
              paymentMade: payload.new.payment_done,
              analysisDone: payload.new.analysis_done,
            })
          );
        }
      }
    )
    .subscribe();

  return channel;
};
