if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("fallback-DE-51N4sVT8eBXhaKQds1.js"),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/DE-51N4sVT8eBXhaKQds1/_buildManifest.js",revision:"cc2b73de430f51ddea501afce7ab8e6e"},{url:"/_next/static/DE-51N4sVT8eBXhaKQds1/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/DE-51N4sVT8eBXhaKQds1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/195-ff684a0d5ea7fde7.js",revision:"ff684a0d5ea7fde7"},{url:"/_next/static/chunks/195-ff684a0d5ea7fde7.js.map",revision:"79da22b02732d37b8379efc8135fab14"},{url:"/_next/static/chunks/244-770e7f9db3397e45.js",revision:"770e7f9db3397e45"},{url:"/_next/static/chunks/244-770e7f9db3397e45.js.map",revision:"df43c0bd65bb5ffeef59d3889618cb25"},{url:"/_next/static/chunks/33-f74f5a45cb114026.js",revision:"f74f5a45cb114026"},{url:"/_next/static/chunks/33-f74f5a45cb114026.js.map",revision:"ff0b47f17da2275a4362b8908f1a8806"},{url:"/_next/static/chunks/692-f17789d8fe366fce.js",revision:"f17789d8fe366fce"},{url:"/_next/static/chunks/692-f17789d8fe366fce.js.map",revision:"af928772d575e14238d4f1b342e04460"},{url:"/_next/static/chunks/808-363871de133561f7.js",revision:"363871de133561f7"},{url:"/_next/static/chunks/808-363871de133561f7.js.map",revision:"8009fd592f676e42622800e220da34c2"},{url:"/_next/static/chunks/920-8dbe52205783a32b.js",revision:"8dbe52205783a32b"},{url:"/_next/static/chunks/920-8dbe52205783a32b.js.map",revision:"e62536ca5abfe42c710981b4d4308ce3"},{url:"/_next/static/chunks/996-9c91d1eae613ddeb.js",revision:"9c91d1eae613ddeb"},{url:"/_next/static/chunks/996-9c91d1eae613ddeb.js.map",revision:"f8146419d29fa019023de28afea2bc50"},{url:"/_next/static/chunks/framework-da8ad0d3df154e7f.js",revision:"da8ad0d3df154e7f"},{url:"/_next/static/chunks/framework-da8ad0d3df154e7f.js.map",revision:"e43122222b79391baf565e0b2cea680d"},{url:"/_next/static/chunks/main-dda75576ff8dcbb9.js",revision:"dda75576ff8dcbb9"},{url:"/_next/static/chunks/main-dda75576ff8dcbb9.js.map",revision:"8ea4d1b06bf6684eb000fbfab9a361f1"},{url:"/_next/static/chunks/pages/404-d41a7abe14521766.js",revision:"d41a7abe14521766"},{url:"/_next/static/chunks/pages/404-d41a7abe14521766.js.map",revision:"469645d159a603067c3c0476b5826e57"},{url:"/_next/static/chunks/pages/500-82b8d598ae0ddf1e.js",revision:"82b8d598ae0ddf1e"},{url:"/_next/static/chunks/pages/500-82b8d598ae0ddf1e.js.map",revision:"d0861d51d9c0c04216f3bcfb096e4928"},{url:"/_next/static/chunks/pages/_app-f482a85fb5664bd9.js",revision:"f482a85fb5664bd9"},{url:"/_next/static/chunks/pages/_app-f482a85fb5664bd9.js.map",revision:"3bbd8bdb53f543bb224f9cca51405f6f"},{url:"/_next/static/chunks/pages/_error-e2f2bfcd5131d4b7.js",revision:"e2f2bfcd5131d4b7"},{url:"/_next/static/chunks/pages/_error-e2f2bfcd5131d4b7.js.map",revision:"304eea13ca7ffb487de091a049524fe8"},{url:"/_next/static/chunks/pages/_offline-3dd27b1eb4050e69.js",revision:"3dd27b1eb4050e69"},{url:"/_next/static/chunks/pages/_offline-3dd27b1eb4050e69.js.map",revision:"fb4b2d2bf4978c65161b58cb3166f1ec"},{url:"/_next/static/chunks/pages/about/%5Bslug%5D-f8e6efc09acd72b6.js",revision:"f8e6efc09acd72b6"},{url:"/_next/static/chunks/pages/about/%5Bslug%5D-f8e6efc09acd72b6.js.map",revision:"7ed431c556a2ff8f704225a56b2d6c89"},{url:"/_next/static/chunks/pages/browse/%5Bslug%5D-de1e7fc69cd3a121.js",revision:"de1e7fc69cd3a121"},{url:"/_next/static/chunks/pages/browse/%5Bslug%5D-de1e7fc69cd3a121.js.map",revision:"6aa6e234c0fe776cf17e87de3ee261bf"},{url:"/_next/static/chunks/pages/commit-837588f7d4edcf5b.js",revision:"837588f7d4edcf5b"},{url:"/_next/static/chunks/pages/commit-837588f7d4edcf5b.js.map",revision:"5de01ad021835b7d3f17b1058fad3dcc"},{url:"/_next/static/chunks/pages/create-54a3883e4bf9fa4b.js",revision:"54a3883e4bf9fa4b"},{url:"/_next/static/chunks/pages/create-54a3883e4bf9fa4b.js.map",revision:"db1bdad22cb5863deb0f73dbdc201891"},{url:"/_next/static/chunks/pages/docs/%5Bslug%5D-535af13c362375ea.js",revision:"535af13c362375ea"},{url:"/_next/static/chunks/pages/docs/%5Bslug%5D-535af13c362375ea.js.map",revision:"bfaa7a82d801b82b420bee5088c96e81"},{url:"/_next/static/chunks/pages/index-5e11f8084b627024.js",revision:"5e11f8084b627024"},{url:"/_next/static/chunks/pages/index-5e11f8084b627024.js.map",revision:"0b155cb6ee2a0d9aaab7cf786fa35105"},{url:"/_next/static/chunks/pages/settings-2c6a324fc98df2f2.js",revision:"2c6a324fc98df2f2"},{url:"/_next/static/chunks/pages/settings-2c6a324fc98df2f2.js.map",revision:"b3ca3c184e4705218bb4424cb72b8d5a"},{url:"/_next/static/chunks/pages/settings/advanced-13a1a498238de443.js",revision:"13a1a498238de443"},{url:"/_next/static/chunks/pages/settings/advanced-13a1a498238de443.js.map",revision:"9a779619a82692d86139bd85fbc3432a"},{url:"/_next/static/chunks/pages/settings/connections-0c336f58409df482.js",revision:"0c336f58409df482"},{url:"/_next/static/chunks/pages/settings/connections-0c336f58409df482.js.map",revision:"76c056812d392dc39345a19961fd6530"},{url:"/_next/static/chunks/pages/settings/general-3312478699246c38.js",revision:"3312478699246c38"},{url:"/_next/static/chunks/pages/settings/general-3312478699246c38.js.map",revision:"fb53a49209ef033964dd278a34ca1047"},{url:"/_next/static/chunks/pages/settings/manage-data-7383958b2f5fc0e1.js",revision:"7383958b2f5fc0e1"},{url:"/_next/static/chunks/pages/settings/manage-data-7383958b2f5fc0e1.js.map",revision:"1f2f12fae03bab905707a0380b4781cf"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-4e27c9d56dcd8b5a.js",revision:"4e27c9d56dcd8b5a"},{url:"/_next/static/chunks/webpack-4e27c9d56dcd8b5a.js.map",revision:"5e912d932217baf1742147489d1bb0a0"},{url:"/_next/static/css/e6e39b401b232a51.css",revision:"e6e39b401b232a51"},{url:"/_next/static/css/e6e39b401b232a51.css.map",revision:"9060667fa8fe2e142ec54d3edfba8588"},{url:"/_next/static/media/public-sans-all-400-normal.ae05de44.woff",revision:"ae05de44"},{url:"/_next/static/media/public-sans-all-600-normal.07428ec5.woff",revision:"07428ec5"},{url:"/_next/static/media/public-sans-latin-400-normal.66c4eba4.woff2",revision:"66c4eba4"},{url:"/_next/static/media/public-sans-latin-600-normal.7e06741e.woff2",revision:"7e06741e"},{url:"/_next/static/media/public-sans-latin-ext-400-normal.fd422b1b.woff2",revision:"fd422b1b"},{url:"/_next/static/media/public-sans-latin-ext-600-normal.47b27dc8.woff2",revision:"47b27dc8"},{url:"/_offline",revision:"DE-51N4sVT8eBXhaKQds1"},{url:"/brand-assets/apple-icon-180.png",revision:"8780940006caca5b1e373f06e82fd1af"},{url:"/brand-assets/apple-splash-1125-2436.jpg",revision:"86fbd1cb121ceaf3e08bdcebba56c7be"},{url:"/brand-assets/apple-splash-1136-640.jpg",revision:"ede7a029c432b282e2cc14fe00239672"},{url:"/brand-assets/apple-splash-1170-2532.jpg",revision:"91d14a1e49019231cc28c998a7f698fd"},{url:"/brand-assets/apple-splash-1242-2208.jpg",revision:"31eeaa7d5bf26a403fb3a16774d6483e"},{url:"/brand-assets/apple-splash-1242-2688.jpg",revision:"7b495b042942bda0aa365bb7dbed8b3b"},{url:"/brand-assets/apple-splash-1284-2778.jpg",revision:"f87029e087d3020ffd0f35447c0fdf14"},{url:"/brand-assets/apple-splash-1334-750.jpg",revision:"165246c883305f86c45fd110818473bb"},{url:"/brand-assets/apple-splash-1536-2048.jpg",revision:"8d3dadbd41be1abac9bcbea2371dfd82"},{url:"/brand-assets/apple-splash-1620-2160.jpg",revision:"4ce8e458e1aa5fac5fb222fa7cb8cea9"},{url:"/brand-assets/apple-splash-1668-2224.jpg",revision:"5878b1a40b476a5364b562956d82f2c1"},{url:"/brand-assets/apple-splash-1668-2388.jpg",revision:"dfb78f53e7f2f292ec6f21639309663b"},{url:"/brand-assets/apple-splash-1792-828.jpg",revision:"c227af436352a6caaf93acb7f72c5c33"},{url:"/brand-assets/apple-splash-2048-1536.jpg",revision:"c4774c952cfb7d92873c477d3476de1a"},{url:"/brand-assets/apple-splash-2048-2732.jpg",revision:"8c8164473e2c039346bab0f04eb911e3"},{url:"/brand-assets/apple-splash-2160-1620.jpg",revision:"c36f5e613ea4fac80a8899354c85902e"},{url:"/brand-assets/apple-splash-2208-1242.jpg",revision:"275493f4cbab6255101666c01ee72b8c"},{url:"/brand-assets/apple-splash-2224-1668.jpg",revision:"1300f65f70553e9392a80973ed272474"},{url:"/brand-assets/apple-splash-2388-1668.jpg",revision:"f2090ccbd3b7562ac39439f723c7136f"},{url:"/brand-assets/apple-splash-2436-1125.jpg",revision:"d2f5d6ec44eb0e0c8c4e0cedd690bd05"},{url:"/brand-assets/apple-splash-2532-1170.jpg",revision:"efac034a67fbc6cc14f8f35a12a3456a"},{url:"/brand-assets/apple-splash-2688-1242.jpg",revision:"7c90bdff925d7fcf9ab580a17d295d6a"},{url:"/brand-assets/apple-splash-2732-2048.jpg",revision:"516acb6571386fdf76de28686f937e87"},{url:"/brand-assets/apple-splash-2778-1284.jpg",revision:"efe493e5a9fc277a380c209b9e97d1c9"},{url:"/brand-assets/apple-splash-640-1136.jpg",revision:"069cd3496edcac61154a939ae02bb835"},{url:"/brand-assets/apple-splash-750-1334.jpg",revision:"e106f8b20677b8d7df0f0e2dc61824c3"},{url:"/brand-assets/apple-splash-828-1792.jpg",revision:"296bdce7a826fa315ad7e3cb115ee0c8"},{url:"/brand-assets/favicon-196.ico",revision:"ac88397877b08a50a26eee05c09c94bb"},{url:"/brand-assets/manifest-icon-192.png",revision:"e4312fb3f6e55c8b7e1070bdc2522f52"},{url:"/brand-assets/manifest-icon-512.png",revision:"40a35280399add43df9c56753b332bbe"},{url:"/json/demo.json",revision:"63468d35732ba659b40e2452cc7301ca"},{url:"/manifest.json",revision:"53149ae646cff0058e467800c1a5be88"},{url:"/markdown/about/privacy.mdx",revision:"e8add1238d2aa01184ad7dfdb52cef08"},{url:"/markdown/about/terms.mdx",revision:"7df0a04cf2ef2a9b794bac9a3336d095"},{url:"/markdown/browse/demo.md",revision:"7fc8f08ea2c2a279ac1dd63e6f09a3c7"},{url:"/markdown/docs/accessibility.mdx",revision:"09e7b182ca58740dd17ee9c2789c5b04"},{url:"/markdown/docs/errors.mdx",revision:"f3dfb09ebb36f71a4b7c9844456d0bbe"},{url:"/markdown/docs/getting-started.mdx",revision:"b8062fe743cdc7d801d09d5615b51dc0"},{url:"/markdown/docs/keyboard-shortcuts.mdx",revision:"a7a271c9daf699e16be40c7812fae65f"},{url:"/markdown/docs/settings.mdx",revision:"9552b6dc10c6383ebdfeae9e24f994ca"},{url:"/markdown/docs/sharing.mdx",revision:"dd0a2ca870d54f016f235756fddc9dc6"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
//# sourceMappingURL=sw.js.map
