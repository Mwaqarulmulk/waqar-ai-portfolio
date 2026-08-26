# Groq model verification

On 2026-08-26, the recruiter assistant failed because `llama-3.3-70b-versatile` returned HTTP 404 from Groq with `model_not_found` for this API key.

The live Groq model catalog endpoint `https://api.groq.com/openai/v1/models` returned `qwen/qwen3.6-27b` as an active chat-capable model. The model detail endpoint `https://api.groq.com/openai/v1/models/qwen/qwen3.6-27b` reported `active: true`, `context_window: 131072`, and `max_completion_tokens: 16384`.

The server proxy now defaults to `GROQ_MODEL ?? "qwen/qwen3.6-27b"`, while allowing a future server-only override through `GROQ_MODEL`. The client does not receive the Groq key or make direct provider requests.
Official Groq reasoning documentation confirms `qwen/qwen3.6-27b` supports `reasoning_format: hidden`, which returns only the final answer. `raw` includes `<think>` tags, while `parsed` separates reasoning into a dedicated field. The proxy should set `reasoning_format: "hidden"` rather than relying only on output sanitization.
