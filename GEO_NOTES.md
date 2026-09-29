# GEO implementation

The production identity is Muhammad Waqar Ul Mulk at https://mewaqarulmulk.netlify.app/.
Netlify project: `mewaqarulmulk` (`5caadc0a-7830-4790-9edb-889b5cc00399`).

`pnpm build` preserves the React/Vite homepage, adds readable initial homepage HTML,
and runs `scripts/build-geo.mjs` to emit nine independent static pages, page-specific
metadata and JSON-LD, and a ten-URL sitemap into `dist/public`. These pages need no
client JavaScript. Public profile links were supplied by the owner; GitHub and the
public Fiverr profile were additionally checked. Freelancer and Guru could not be
independently loaded by the research tool and are not described as verified.

The non-forced Netlify SPA fallback lets existing files take precedence. Keep the
asset-proxy redirect and function; server secrets must never use a `VITE_` prefix.
Canonical URLs deliberately stay on the production origin in preview builds.

## Evidence reviewed September 29, 2026

- `Mwaqarulmulk/ClinicChatbot` README: TypeScript, Hono, Groq, LanceDB, libSQL/Turso,
  booking, reminders, browser testing and human handoff. Its WhatsApp transport is
  Baileys, not the official WhatsApp Business API. No client outcome is asserted.
- `Mwaqarulmulk/ResumeAI-Screening-Pro` README: Python, Streamlit, scikit-learn,
  NLTK and document extraction. No equivalence to commercial ATS scoring or hiring
  performance is asserted.
- `Mwaqarulmulk/clinic/package.json`: `smile-district-web`, Next.js 14, React 18,
  Tailwind and Three.js. This is not evidence for the AestheticsPlace.pk project.
- Existing portfolio background is owner-authored. Existing employment,
  certification and impact claims were not independently audited or added to the
  new case studies/schema.

## Contact and platform limits

Netlify Forms was disabled at inspection. The homepage form opens an encoded email
draft; the visitor must send it in their email application. The static contact
page supplies a copyable email address and professional profile links. This does
not claim server delivery, capture submissions or add a paid service.
The owner supplied +92 301 0492137 for direct WhatsApp contact; homepage and static
pages link to `https://wa.me/923010492137`. No WhatsApp message is sent automatically.

The existing recruiter chat needs the separate Express/tRPC backend; a Netlify
static build does not provide it. GEO does not require enabling that backend.

## Verification

Run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:geo`.
After publishing, run `node scripts/check-geo.mjs https://mewaqarulmulk.netlify.app`.
Check the JavaScript homepage separately in a browser, including services and
case-study navigation, mobile reading layout and email-draft behavior.

Local verification on September 29, 2026: production build and all ten GEO page
checks passed. Six offline tests passed (asset-proxy, auth logout, recruiter chat);
the mocked recruiter test needs a non-secret placeholder `GROQ_API_KEY`. The full
suite also contains a live Groq authentication test requiring a real server key,
which was unavailable. `pnpm check` reported existing type errors in untouched
`ui/chart.tsx`, `ui/input-otp.tsx` and `ComponentShowcase.tsx`; no errors were
reported in the changed homepage. These limits are not hidden by disabling tests.

## Search discovery follow-up

The sitemap is advertised in robots.txt. The existing wildcard allow rule permits
search crawlers, including OAI-SearchBot; no training-crawler policy was changed.
Submit `/sitemap.xml` in the owner's verified Google Search Console and Bing
Webmaster Tools properties when available. No search-console access or indexing
submission is assumed. Crawling, indexing and recommendations remain decisions
of each search platform.

Use the same name, canonical portfolio link and relevant case-study URLs across
LinkedIn, Fiverr, Freelancer, Guru and GitHub. This change does not edit those
external profiles. Measure indexed pages, search impressions and actual qualified
inquiries; do not equate a successful deployment with search visibility.

References:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
