import { S as createAstro, _ as createRenderInstruction, g as addAttribute, h as renderHead, i as renderComponent, s as renderSlot, u as renderTemplate } from "./server_CfpDrIoW.mjs";
import { t as createComponent } from "./compiler_CDG-_YxE.mjs";
//#region node_modules/.pnpm/astro@7.0.7_@emnapi+core@1.11.1_@emnapi+runtime@1.11.2_@vercel+functions@3.7.5_rollup@4.60.4/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region node_modules/.pnpm/@vercel+analytics@2.0.1/node_modules/@vercel/analytics/dist/astro/index.astro
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", {
		"data-props": JSON.stringify(Astro.props),
		"data-params": JSON.stringify(Astro.params),
		"data-pathname": Astro.url.pathname
	})}${renderScript($$result, "/Users/evelynr/Documents/portfolio-v1/node_modules/.pnpm/@vercel+analytics@2.0.1/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/evelynr/Documents/portfolio-v1/node_modules/.pnpm/@vercel+analytics@2.0.1/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);
//#endregion
//#region src/layouts/MainLayout.astro
createAstro("https://astro.build");
var $$MainLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MainLayout;
	const { title, description = "Evelyn Rodríguez, web developer. Frontend with HTML, CSS, JavaScript and React. 70+ production WordPress sites maintained and extended, plus workflow automation. Available for remote work." } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg?v=4"><meta name="theme-color" content="#121110"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url" content="https://evelynr.dev"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"><script>
      // is:inline stops Astro from bundling/deferring this script, so it runs
      // before first paint and the page never flashes the wrong theme
      const saved = localStorage.getItem('theme');
      if (saved) document.documentElement.dataset.theme = saved;
      // js flag: reveal styles gate on this so no-JS users still see content
      document.documentElement.classList.add('js');
    <\/script>${renderHead($$result)}</head><body><button id="theme-toggle" aria-label="Toggle color theme"><span class="icon-sun">☀</span><span class="icon-moon">☾</span></button><a id="email-fixed" href="#" aria-label="Email"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="4" width="21" height="16" rx="2.2"></rect><path d="m1.5 6 10.5 7 10.5-7"></path></svg></a><main>${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Analytics", $$Index, {})}${renderScript($$result, "/Users/evelynr/Documents/portfolio-v1/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/evelynr/Documents/portfolio-v1/src/layouts/MainLayout.astro", void 0);
//#endregion
export { renderScript as n, $$MainLayout as t };
