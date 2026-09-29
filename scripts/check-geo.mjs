import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = fileURLToPath(new URL("../dist/public/", import.meta.url));
const origin = "https://mewaqarulmulk.netlify.app";
const live = process.argv[2];
if (live) assert.match(live, /^https:\/\/[a-z0-9.-]+$/i, "Supply an HTTPS origin without a trailing slash");
const get = async route => {
  if (!live) return readFile(path.join(dir, route.endsWith("/") ? `${route.slice(1)}index.html` : route.slice(1)), "utf8");
  const response = await fetch(`${live}${route}`, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, route);
  const expected = route.endsWith("/") ? "text/html" : route.endsWith(".xml") ? "xml" : "text/plain";
  assert.ok(response.headers.get("content-type")?.includes(expected), `Wrong content type: ${route}`);
  // Deploy previews should be noindex; only the production origin must be indexable.
  if (live === origin) assert.ok(!response.headers.get("x-robots-tag")?.includes("noindex"), `Blocked: ${route}`);
  return response.text();
};
const sitemap = await get("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 10, "Expected homepage, two indexes, three services, three case studies, and contact");
assert.equal(new Set(urls).size, urls.length);
assert.ok((await get("/robots.txt")).includes(`Sitemap: ${origin}/sitemap.xml`));
const titles = new Set();
for (const url of urls) {
  assert.equal(new URL(url).origin, origin);
  const route = new URL(url).pathname;
  const html = await get(route);
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1, route);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Wrong canonical: ${route}`);
  assert.ok(html.includes(`property="og:url" content="${url}"`), route);
  assert.ok(!html.includes("%VITE_"), `Unresolved environment placeholder: ${route}`);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, route);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Missing or duplicate title: ${route}`);
  titles.add(title);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
  assert.ok(graph.some(node => node["@type"] === "Person"));
  assert.ok(graph.some(node => node["@type"] === "WebSite"));
  for (const node of graph) {
    assert.ok(node["@id"].startsWith(origin), route);
    if (node.url) assert.ok(node.url.startsWith(origin), route);
  }
  assert.ok(html.includes("mailto:mwaqarmulk@gmail.com"), `No email contact: ${route}`);
  assert.ok(html.includes('href="https://wa.me/923010492137"'), `No direct WhatsApp link: ${route}`);
  for (const [, href] of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const target = new URL(href.replaceAll("&amp;", "&"), origin).pathname;
    if (target.endsWith("/")) assert.ok(urls.includes(origin + target), `Orphan target ${target} in ${route}`);
    else if (!live) assert.ok((await stat(path.join(dir, target.slice(1)))).isFile(), target);
  }
  if (route !== "/") assert.ok(!html.includes('type="module"'), `Static route depends on SPA: ${route}`);
  console.log(`PASS ${route}: HTML, canonical, schema, links, contact`);
}
console.log(`GEO checks passed on ${live || "local build"}.`);
