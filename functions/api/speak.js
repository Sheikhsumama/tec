// Cloudflare Pages Function: POST /api/speak  { "text": "..." }  ->  audio/mpeg
// The ElevenLabs key lives only in the server environment (ELEVENLABS_API_KEY).
// It is never sent to the browser.

const MAX_CHARS = 300;

function cors(origin, allowed) {
  const ok = !allowed || origin === allowed;
  return {
    "Access-Control-Allow-Origin": ok ? (origin || "*") : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function onRequest({ request, env }) {
  const origin = request.headers.get("Origin") || "";
  const headers = cors(origin, env.ALLOWED_ORIGIN);

  if (request.method === "OPTIONS") return new Response(null, { headers });
  if (request.method !== "POST")
    return new Response("Method not allowed", { status: 405, headers });

  if (!env.ELEVENLABS_API_KEY || !env.ELEVENLABS_VOICE_ID)
    return new Response("Voice is not configured yet", { status: 503, headers });

  let text = "";
  try {
    ({ text = "" } = await request.json());
  } catch {
    return new Response("Bad JSON", { status: 400, headers });
  }
  text = String(text).trim();
  if (!text) return new Response("No text", { status: 400, headers });
  if (text.length > MAX_CHARS)
    return new Response("Text too long", { status: 413, headers });

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${env.ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
        voice_settings: { stability: 0.6, similarity_boost: 0.75, style: 0.2 },
      }),
    }
  );

  if (!upstream.ok)
    return new Response("Voice service error", { status: 502, headers });

  return new Response(upstream.body, {
    headers: { ...headers, "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
  });
}
