if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("fallback-mxe0rRH6JnaPs0P821e2J.js"),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/182-97d2d8110ad2f347.js",revision:"97d2d8110ad2f347"},{url:"/_next/static/chunks/182-97d2d8110ad2f347.js.map",revision:"959e04fecdadc628216590e3fcd8bfa5"},{url:"/_next/static/chunks/218-7f9cfef655166339.js",revision:"7f9cfef655166339"},{url:"/_next/static/chunks/218-7f9cfef655166339.js.map",revision:"0ec00114434a5ec85c7be73c26718ac5"},{url:"/_next/static/chunks/244-11fbe3f0a20548d4.js",revision:"11fbe3f0a20548d4"},{url:"/_next/static/chunks/244-11fbe3f0a20548d4.js.map",revision:"4435826c22c6e4c74336bb2731efe374"},{url:"/_next/static/chunks/33-ba442087ae4fa8f5.js",revision:"ba442087ae4fa8f5"},{url:"/_next/static/chunks/33-ba442087ae4fa8f5.js.map",revision:"8cd9f26c7d5ccea02af65de26728b60d"},{url:"/_next/static/chunks/863-b4be9154836c3cc1.js",revision:"b4be9154836c3cc1"},{url:"/_next/static/chunks/863-b4be9154836c3cc1.js.map",revision:"5efd2995144cdda580fe8bc22d564dcf"},{url:"/_next/static/chunks/996-9c91d1eae613ddeb.js",revision:"9c91d1eae613ddeb"},{url:"/_next/static/chunks/996-9c91d1eae613ddeb.js.map",revision:"f8146419d29fa019023de28afea2bc50"},{url:"/_next/static/chunks/framework-da8ad0d3df154e7f.js",revision:"da8ad0d3df154e7f"},{url:"/_next/static/chunks/framework-da8ad0d3df154e7f.js.map",revision:"e43122222b79391baf565e0b2cea680d"},{url:"/_next/static/chunks/main-dda75576ff8dcbb9.js",revision:"dda75576ff8dcbb9"},{url:"/_next/static/chunks/main-dda75576ff8dcbb9.js.map",revision:"8ea4d1b06bf6684eb000fbfab9a361f1"},{url:"/_next/static/chunks/pages/404-edfa50908ac1a144.js",revision:"edfa50908ac1a144"},{url:"/_next/static/chunks/pages/404-edfa50908ac1a144.js.map",revision:"a53e7dd3264537958cecf7a08eef7a06"},{url:"/_next/static/chunks/pages/500-c376035374f39c20.js",revision:"c376035374f39c20"},{url:"/_next/static/chunks/pages/500-c376035374f39c20.js.map",revision:"e89228147f7a4a3585f5cffa9f38bd8c"},{url:"/_next/static/chunks/pages/_app-4b7d263b21c346f4.js",revision:"4b7d263b21c346f4"},{url:"/_next/static/chunks/pages/_app-4b7d263b21c346f4.js.map",revision:"b2577d735c55e00544883d494e001f7c"},{url:"/_next/static/chunks/pages/_error-e2f2bfcd5131d4b7.js",revision:"e2f2bfcd5131d4b7"},{url:"/_next/static/chunks/pages/_error-e2f2bfcd5131d4b7.js.map",revision:"304eea13ca7ffb487de091a049524fe8"},{url:"/_next/static/chunks/pages/_offline-d8d47ac9da83ec0d.js",revision:"d8d47ac9da83ec0d"},{url:"/_next/static/chunks/pages/_offline-d8d47ac9da83ec0d.js.map",revision:"34c1c5e1236be44df3766d5e9b660cd4"},{url:"/_next/static/chunks/pages/about/%5Bslug%5D-f6e0da0578d29d0c.js",revision:"f6e0da0578d29d0c"},{url:"/_next/static/chunks/pages/about/%5Bslug%5D-f6e0da0578d29d0c.js.map",revision:"0fb12c8af73f677c45ebe640653179f7"},{url:"/_next/static/chunks/pages/browse/%5Bslug%5D-a2d718f790e0775d.js",revision:"a2d718f790e0775d"},{url:"/_next/static/chunks/pages/browse/%5Bslug%5D-a2d718f790e0775d.js.map",revision:"17658bede4151e749b22cea80c45e3da"},{url:"/_next/static/chunks/pages/composer-a3035edef189accb.js",revision:"a3035edef189accb"},{url:"/_next/static/chunks/pages/composer-a3035edef189accb.js.map",revision:"5ffae99b668f006399f3a8ce1708df3a"},{url:"/_next/static/chunks/pages/docs/%5Bslug%5D-eacc6daa6eb2448d.js",revision:"eacc6daa6eb2448d"},{url:"/_next/static/chunks/pages/docs/%5Bslug%5D-eacc6daa6eb2448d.js.map",revision:"d8aa027f2777fd9e140f909aed24d41c"},{url:"/_next/static/chunks/pages/index-df4033d97baf6d60.js",revision:"df4033d97baf6d60"},{url:"/_next/static/chunks/pages/index-df4033d97baf6d60.js.map",revision:"5130286585e9f558a946db11bb8a8d67"},{url:"/_next/static/chunks/pages/settings-31b43d11d9513cc3.js",revision:"31b43d11d9513cc3"},{url:"/_next/static/chunks/pages/settings-31b43d11d9513cc3.js.map",revision:"76223df5641b6e42b54d40bb1927863e"},{url:"/_next/static/chunks/pages/settings/accessibility-9f98020a71927034.js",revision:"9f98020a71927034"},{url:"/_next/static/chunks/pages/settings/accessibility-9f98020a71927034.js.map",revision:"eb9aaa1b17ec4473a453c6384fc18378"},{url:"/_next/static/chunks/pages/settings/general-0be9eff662b1fb12.js",revision:"0be9eff662b1fb12"},{url:"/_next/static/chunks/pages/settings/general-0be9eff662b1fb12.js.map",revision:"e80d9927342639aac4cbde9624304cd2"},{url:"/_next/static/chunks/pages/settings/network-6d9920a4af34c59c.js",revision:"6d9920a4af34c59c"},{url:"/_next/static/chunks/pages/settings/network-6d9920a4af34c59c.js.map",revision:"7dfddefc2205a1fa21281796fe29be32"},{url:"/_next/static/chunks/pages/settings/sharing-4dc022092051c861.js",revision:"4dc022092051c861"},{url:"/_next/static/chunks/pages/settings/sharing-4dc022092051c861.js.map",revision:"918655ae2d469cd8d73d5ec39422f253"},{url:"/_next/static/chunks/pages/settings/storage-0fea7a7388cf309a.js",revision:"0fea7a7388cf309a"},{url:"/_next/static/chunks/pages/settings/storage-0fea7a7388cf309a.js.map",revision:"adc7bc92fd6de1e33979c2d00fda470d"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-d13296a0cd7aff3f.js",revision:"d13296a0cd7aff3f"},{url:"/_next/static/chunks/webpack-d13296a0cd7aff3f.js.map",revision:"d2be422a478c50efc8d48e7ef2366ce7"},{url:"/_next/static/css/e6e39b401b232a51.css",revision:"e6e39b401b232a51"},{url:"/_next/static/css/e6e39b401b232a51.css.map",revision:"9060667fa8fe2e142ec54d3edfba8588"},{url:"/_next/static/media/public-sans-all-400-normal.ae05de44.woff",revision:"ae05de44"},{url:"/_next/static/media/public-sans-all-600-normal.07428ec5.woff",revision:"07428ec5"},{url:"/_next/static/media/public-sans-latin-400-normal.66c4eba4.woff2",revision:"66c4eba4"},{url:"/_next/static/media/public-sans-latin-600-normal.7e06741e.woff2",revision:"7e06741e"},{url:"/_next/static/media/public-sans-latin-ext-400-normal.fd422b1b.woff2",revision:"fd422b1b"},{url:"/_next/static/media/public-sans-latin-ext-600-normal.47b27dc8.woff2",revision:"47b27dc8"},{url:"/_next/static/mxe0rRH6JnaPs0P821e2J/_buildManifest.js",revision:"6951715314cb970010ff674a5083d5a9"},{url:"/_next/static/mxe0rRH6JnaPs0P821e2J/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/mxe0rRH6JnaPs0P821e2J/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_offline",revision:"mxe0rRH6JnaPs0P821e2J"},{url:"/brand-assets/apple-icon-180.png",revision:"b1c325af8acb8c7676c05fade2d84d97"},{url:"/brand-assets/apple-splash-1125-2436.jpg",revision:"ff8297242458772c38815e8751ed534b"},{url:"/brand-assets/apple-splash-1136-640.jpg",revision:"df18cb3ac06008aefd770f978119af67"},{url:"/brand-assets/apple-splash-1170-2532.jpg",revision:"8a19d649ab7cd717743d761dabdbd523"},{url:"/brand-assets/apple-splash-1242-2208.jpg",revision:"83654f982fc7f0cc220a3ad56419cde2"},{url:"/brand-assets/apple-splash-1242-2688.jpg",revision:"801257d9ef8e940da5baa42f259cd259"},{url:"/brand-assets/apple-splash-1284-2778.jpg",revision:"f6a95ee55103f5d1c4a567e5a17e7e80"},{url:"/brand-assets/apple-splash-1334-750.jpg",revision:"a93a838d296c5194e56a709e26bf1ab7"},{url:"/brand-assets/apple-splash-1536-2048.jpg",revision:"f45d62acc433af6bc35bcce6648a4b82"},{url:"/brand-assets/apple-splash-1620-2160.jpg",revision:"024fe6103162542f995291215362f169"},{url:"/brand-assets/apple-splash-1668-2224.jpg",revision:"daac8a2f71c128c99dac85368feb680d"},{url:"/brand-assets/apple-splash-1668-2388.jpg",revision:"86609023e71521c3c9f120ecbdf66654"},{url:"/brand-assets/apple-splash-1792-828.jpg",revision:"f8d4f7cdc5bbe08c716041612789887b"},{url:"/brand-assets/apple-splash-2048-1536.jpg",revision:"5e123ac11a2bb4eb56cae42025432729"},{url:"/brand-assets/apple-splash-2048-2732.jpg",revision:"f63e8d9654c0d4955dc67ab7750721e2"},{url:"/brand-assets/apple-splash-2160-1620.jpg",revision:"5f4d4b760237ec18e56c53b3cbe51de1"},{url:"/brand-assets/apple-splash-2208-1242.jpg",revision:"205321dce8048af6aadf70869d9a6a37"},{url:"/brand-assets/apple-splash-2224-1668.jpg",revision:"3dad3cca716cb683522b9d9b1460385c"},{url:"/brand-assets/apple-splash-2388-1668.jpg",revision:"17e02f8f7c036ef3405c1875e523fa2d"},{url:"/brand-assets/apple-splash-2436-1125.jpg",revision:"586851ca942f9184a49ef18344d11fed"},{url:"/brand-assets/apple-splash-2532-1170.jpg",revision:"07fae1dc109697879da0bc2075691d0f"},{url:"/brand-assets/apple-splash-2688-1242.jpg",revision:"c2cbcedcca9b09defda6487e8a0cb67a"},{url:"/brand-assets/apple-splash-2732-2048.jpg",revision:"51514bc5e92fc32742468184c875c7ee"},{url:"/brand-assets/apple-splash-2778-1284.jpg",revision:"9c3bbf7a09432e6a124db30aab351a1c"},{url:"/brand-assets/apple-splash-640-1136.jpg",revision:"d8e73142f747c63058299d7448a7f5af"},{url:"/brand-assets/apple-splash-750-1334.jpg",revision:"ed3ce4270923df024a0b3ec51835bd9f"},{url:"/brand-assets/apple-splash-828-1792.jpg",revision:"949bee8db0061e27d5c18f7411199e33"},{url:"/brand-assets/favicon-196.ico",revision:"0ab6bc21395b1b573b6d2a27793dc1c7"},{url:"/brand-assets/manifest-icon-192.png",revision:"9a5cfcdbb311512a46f4d748ac634c03"},{url:"/brand-assets/manifest-icon-512.png",revision:"eb5a1c44fba6029b5f629de762a735c5"},{url:"/json/demo copy 2.json",revision:"c26e9e213e7b68504c0ce747e4a9039e"},{url:"/json/demo copy.json",revision:"fa996305655e4a537e59b5828656162c"},{url:"/json/demo.json",revision:"89ed6b18b093d75834703576236bf911"},{url:"/json/test.json",revision:"4bed32ba27e26a92c2e747e817ed5355"},{url:"/manifest.json",revision:"53149ae646cff0058e467800c1a5be88"},{url:"/markdown/about/privacy.mdx",revision:"bb373493fce83eafa88ee2ee7a46041e"},{url:"/markdown/about/terms.mdx",revision:"11d46f43bb20653a7ff27cdcf432cf9d"},{url:"/markdown/docs/accessibility.mdx",revision:"afe9efa63d0121b185be135c518a1a21"},{url:"/markdown/docs/composer.mdx",revision:"a069aef044fc475ce0c850ef771aad38"},{url:"/markdown/docs/errors.mdx",revision:"7edbe69860198c757b53f292d8afe73a"},{url:"/markdown/docs/getting-started.mdx",revision:"2e65e78880e1a048883f22c454e4c430"},{url:"/markdown/docs/keyboard-shortcuts.mdx",revision:"6d7fa9b00bd262b675b619e084c89592"},{url:"/markdown/docs/settings.mdx",revision:"b190121736ba5d471622bc9bd24e951d"},{url:"/markdown/docs/sharing.mdx",revision:"e2e4c09afd571f136c265f79ace9a410"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
//# sourceMappingURL=sw.js.map
