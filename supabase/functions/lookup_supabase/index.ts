/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

let rateLimitStore = {};

function rateLimit(ip: string): boolean {
  // Implement rate limiting logic here, similar to previous examples
  return true; // Placeholder for simplicity
}

Deno.serve(async (req) => {
  const { requestId, storageUrl } = await req.json();
  if (!requestId || !storageUrl) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for") || "";
  if (!rateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });
  }

  try {
    const response = await fetch("YOUR_GCLOUD_FUNCTION_ENDPOINT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, storageUrl })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Cloud Function: ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error calling Google Cloud Function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
});
