const MAX_KEY_LENGTH = 240;

function safeStorageKey(value) {
  if (!value || value.length > MAX_KEY_LENGTH) return null;
  let key;
  try {
    key = decodeURIComponent(value);
  } catch {
    return null;
  }
  if (!key || key.includes("..") || key.startsWith("/") || key.includes("\\")) return null;
  return key;
}

export default async function handler(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const requestUrl = new URL(request.url);
  // Netlify's Request may retain the public URL rather than the rewrite query.
  const pathKey = requestUrl.pathname.startsWith("/manus-storage/")
    ? requestUrl.pathname.slice("/manus-storage/".length)
    : "";
  const key = safeStorageKey(requestUrl.searchParams.get("key") || pathKey);
  if (!key) return new Response("Invalid asset key", { status: 400 });

  const forgeApiUrl = Netlify.env.get("MANUS_FORGE_API_URL") || Netlify.env.get("BUILT_IN_FORGE_API_URL");
  const forgeApiKey = Netlify.env.get("MANUS_FORGE_API_KEY") || Netlify.env.get("BUILT_IN_FORGE_API_KEY");
  if (!forgeApiUrl || !forgeApiKey) {
    return new Response("Asset proxy is not configured", { status: 503 });
  }

  try {
    const presignUrl = new URL("v1/storage/presign/get", forgeApiUrl.replace(/\/+$/, "") + "/");
    presignUrl.searchParams.set("path", key);
    const upstream = await fetch(presignUrl, {
      headers: { Authorization: `Bearer ${forgeApiKey}` },
    });
    if (!upstream.ok) return new Response("Asset backend error", { status: 502 });

    const payload = await upstream.json();
    if (!payload?.url || typeof payload.url !== "string") {
      return new Response("Asset URL unavailable", { status: 502 });
    }

    return new Response(null, {
      status: 307,
      headers: {
        Location: payload.url,
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return new Response("Asset proxy error", { status: 502 });
  }
}
