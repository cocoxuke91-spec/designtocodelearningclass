import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const render = async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
};

test("server-renders the Pmagic AI landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Pmagic AI/i);
  assert.match(html, /建工领域专属的/);
  assert.match(html, /超级工程大脑/);
  assert.match(html, /传统建工管理的四大黑箱/);
  assert.match(html, /一个工程大脑中枢/);
  assert.match(html, /五大智能模块/);
  assert.match(html, /从真实项目中验证的智能闭环/);
  assert.match(html, /浏览建工 AI 白皮书/);
  assert.match(html, /让你的项目进入智能管理时代/);
});

test("placeholder assets are explicit and the page remains semantic", async () => {
  const [page, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/LandingPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /function Placeholder/);
  assert.match(page, /Hero 核心 3D 图/);
  assert.match(page, /Agent 架构核心图/);
  assert.match(page, /项目鸟瞰图/);
  assert.match(page, /CTA 城市插画/);
  assert.match(page, /aria-label/);
  assert.match(page, /IntersectionObserver/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /@media \(max-width: 560px\)/);
  assert.match(packageJson, /"react": "19\.2\.6"/);
});
