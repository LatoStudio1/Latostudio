// Builds the published site into ./_site:
//  - copies the repo (without .git, .github, node_modules, _site)
//  - pre-compiles the page's JSX (no more in-browser Babel)
//  - renders the page to HTML ahead of time, so crawlers, AI tools and slow phones
//    get the full content immediately; React then takes over that HTML (hydration).
// If anything fails, the page is published unchanged (the site never breaks).
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const OUT = path.join(ROOT, "_site");
const SKIP = new Set([".git", ".github", "build", "node_modules", "_site"]);

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

function build(html) {
  const ts = require("typescript");
  const React = require("react");
  const { renderToString } = require("react-dom/server");

  const open = '<script type="text/babel">';
  const start = html.lastIndexOf(open);
  if (start < 0) throw new Error("babel script not found");
  const end = html.indexOf("</script>", start);
  const jsx = html.slice(start + open.length, end);

  const compile = (src) => ts.transpileModule(src, {
    compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2019 },
    reportDiagnostics: true,
  });
  // in the browser React reuses the pre-rendered page instead of rebuilding it;
  // small differences (e.g. phone vs desktop layout) are fixed silently by re-rendering
  const mountLine = /ReactDOM\.createRoot\([^;]*\)\.render\([^;]*\);\s*$/m;
  if (!mountLine.test(jsx)) throw new Error("mount line not found");
  const out = compile(jsx.replace(mountLine, 'ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App), { onRecoverableError: function () {} });\n'));
  const errs = (out.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error && d.code < 5000);
  if (errs.length) throw new Error("JSX error: " + errs.map(d => ts.flattenDiagnosticMessageText(d.messageText, " ")).join("; "));
  const browserJs = out.outputText;

  // --- server render (desktop viewport, effects don't run) ---
  const ssrJs = compile(jsx.replace(mountLine, "return App;")).outputText;
  const noop = () => {};
  const mq = () => ({ matches: false, addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop });
  const fakeWindow = { innerWidth: 1440, innerHeight: 900, scrollY: 0, matchMedia: mq, addEventListener: noop, removeEventListener: noop, scrollTo: noop };
  const fakeDocument = { getElementById: () => null, querySelectorAll: () => [], body: { style: {}, scrollHeight: 0 }, addEventListener: noop };
  const fakeReactDOM = { createPortal: () => null, createRoot: () => ({ render: noop }) };
  const App = new Function("React", "ReactDOM", "window", "document", ssrJs)(React, fakeReactDOM, fakeWindow, fakeDocument);
  const markup = renderToString(React.createElement(App));
  const text = markup.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (text.length < 2000 || !text.includes("handle") || !text.includes("Lato Studio")) throw new Error("rendered page looks empty");

  let page = html.slice(0, start) +
    "<script>\n    window.addEventListener(\"DOMContentLoaded\", function () {\n" + browserJs + "\n    });\n  </script>" +
    html.slice(end + "</script>".length);
  page = page.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>/, "");
  if (!page.includes('<div id="root"></div>')) throw new Error("root div not found");
  page = page.replace('<div id="root"></div>', '<div id="root">' + markup + "</div>");
  return page;
}

fs.rmSync(OUT, { recursive: true, force: true });
copyDir(ROOT, OUT);
const src = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
try {
  const page = build(src);
  fs.writeFileSync(path.join(OUT, "index.html"), page);
  console.log("Prerendered index.html (" + Math.round(page.length / 1024) + " KB)");
} catch (err) {
  console.log("::warning::Prerender skipped, publishing the page as is: " + err.message);
}
