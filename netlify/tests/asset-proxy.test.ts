import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../functions/asset-proxy.mjs";

describe("Netlify asset proxy", () => {
  beforeEach(() => vi.stubGlobal("Netlify", { env: { get: (key: string) => process.env[key] } }));
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("rejects traversal and unsupported methods", async () => {
    const invalid = await handler(new Request("https://example.com/.netlify/functions/asset-proxy?key=../private.txt"));
    expect(invalid.status).toBe(400);
    const invalidPath = await handler(new Request("https://example.com/manus-storage/image%2F..%2Fprivate.txt"));
    expect(invalidPath.status).toBe(400);

    const method = await handler(new Request("https://example.com/.netlify/functions/asset-proxy?key=image.png", { method: "POST" }));
    expect(method.status).toBe(405);
  });

  it("returns setup status without leaking configuration details", async () => {
    vi.stubEnv("MANUS_FORGE_API_URL", "");
    vi.stubEnv("MANUS_FORGE_API_KEY", "");
    vi.stubEnv("BUILT_IN_FORGE_API_URL", "");
    vi.stubEnv("BUILT_IN_FORGE_API_KEY", "");

    const response = await handler(new Request("https://example.com/.netlify/functions/asset-proxy?key=image.png"));
    expect(response.status).toBe(503);
    expect(await response.text()).toBe("Asset proxy is not configured");
  });

  it("redirects to the signed CDN URL for a valid asset", async () => {
    vi.stubEnv("MANUS_FORGE_API_URL", "https://forge.example.com");
    vi.stubEnv("MANUS_FORGE_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ url: "https://cdn.example.com/image.png?signature=test" }), { status: 200 })));

    const response = await handler(new Request("https://example.com/.netlify/functions/asset-proxy?key=image.png"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("https://cdn.example.com/image.png");
    const rewritten = await handler(new Request("https://example.com/manus-storage/image.png"));
    expect(rewritten.status).toBe(307);
    expect(rewritten.headers.get("location")).toBe(response.headers.get("location"));
  });
});
