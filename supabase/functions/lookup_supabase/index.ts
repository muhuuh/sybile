////PS C:\Users\valen\Documents\Coding\Website\sybile\sybile> supabase functions deploy lookup_supabase


/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

let rateLimitStore = {};

function rateLimit(ip: string): boolean {
  const limit = 2; // Limit per 15 minutes
  const duration = 900000; // 15 minutes in milliseconds
  const now = Date.now();
  
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = [];
  }

  // Remove timestamps outside of the current rate limit window
  rateLimitStore[ip] = rateLimitStore[ip].filter(timestamp => now - timestamp < duration);

  if (rateLimitStore[ip].length >= limit) {
    return false; // Rate limit exceeded
  }

  rateLimitStore[ip].push(now); // Log the current request time
  return true;
}

Deno.serve(async (req) => {
  const { requestId, storageUrl } = await req.json();
  
  if (!requestId || !storageUrl) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.ip;
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
