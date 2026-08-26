import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { ENV } from "./_core/env";

const context: TrpcContext = {
  user: null,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};

describe("recruiterChat", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns a useful setup fallback when Groq is not configured", async () => {
    const originalKey = ENV.groqApiKey;
    ENV.groqApiKey = "";
    const result = await appRouter.createCaller(context).recruiterChat({ messages: [{ role: "user", content: "Can I ask about the portfolio?" }] });
    ENV.groqApiKey = originalKey;
    expect(result.configured).toBe(false);
    expect(result.content).toContain("setup mode");
  });

  it("returns the assistant response through the server proxy", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ choices: [{ message: { content: "<think>private reasoning</think>AestheticsPlace.pk demonstrates full-stack healthcare software, RBAC, Cloudflare D1, and Twilio automation." } }] }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await appRouter.createCaller(context).recruiterChat({ messages: [{ role: "user", content: "Why is AestheticsPlace.pk relevant?" }] });

    expect(result.configured).toBe(true);
    expect(result.content).toContain("AestheticsPlace.pk");
    expect(result.content).not.toContain("private reasoning");
    expect(fetchMock).toHaveBeenCalledOnce();
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect((request.headers as Record<string, string>).Authorization).toMatch(/^Bearer /);
    expect(String(request.body)).toContain('"model":"qwen/qwen3.6-27b"');
    expect(String(request.body)).toContain('"reasoning_format":"hidden"');
    expect(String(request.body)).toContain("AestheticsPlace.pk");
  });
});
