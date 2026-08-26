import { describe, expect, it } from "vitest";

describe("Groq secret", () => {
  it("authenticates against the Groq models endpoint", async () => {
    const apiKey = process.env.GROQ_API_KEY;
    expect(apiKey, "GROQ_API_KEY must be configured").toBeTruthy();

    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    expect(response.ok, `Groq models request failed with ${response.status}`).toBe(true);
  }, 15_000);
});
