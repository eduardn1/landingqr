// Backend function to expose Mapbox public token
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve((req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const token = Deno.env.get("MAPBOX_PUBLIC_TOKEN") ?? Deno.env.get("VITE_MAPBOX_PUBLIC_TOKEN");

  if (!token) {
    return new Response(JSON.stringify({ error: "Token non configurato" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify({ token }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
