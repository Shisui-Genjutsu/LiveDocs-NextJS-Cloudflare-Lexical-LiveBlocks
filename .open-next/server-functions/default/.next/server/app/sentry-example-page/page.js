(()=>{var e={};e.id=917,e.ids=[917],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11229:(e,r,t)=>{"use strict";t.r(r),t.d(r,{"7f0192c259abb3eb449cf4c1aec0699e8cb167715e":()=>s.ot,"7fc2de60768b96403e85b52a20f800b8879bdb82aa":()=>s.ai,"7feeef9b09070451effa6411eb9134c7b2c633c1c7":()=>s.at});var s=t(98749)},11997:e=>{"use strict";e.exports=require("punycode")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19550:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var s=t(60687),o=t(56849),n=t.n(o);function a({error:e}){return(0,s.jsx)("html",{children:(0,s.jsx)("body",{children:(0,s.jsx)(n(),{statusCode:0})})})}t(43210)},27910:e=>{"use strict";e.exports=require("stream")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},29295:(e,r,t)=>{"use strict";t.d(r,{y:()=>o});var s=t(6475);let o=(0,s.createServerReference)("7f264293cb5004db82e11d533e42b69681ec442500",s.callServer,void 0,s.findSourceMapURL,"invalidateCacheAction")},33873:e=>{"use strict";e.exports=require("path")},36259:(e,r,t)=>{"use strict";t.d(r,{default:()=>s});let s=(0,t(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/Provider.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/Provider.tsx","default")},37554:(e,r,t)=>{Promise.resolve().then(t.bind(t,51610))},39166:(e,r,t)=>{Promise.resolve().then(t.bind(t,19550))},43894:(e,r,t)=>{Promise.resolve().then(t.bind(t,46076))},46055:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(31658);let o=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},46076:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/global-error.tsx","default")},50601:(e,r,t)=>{Promise.resolve().then(t.bind(t,67906)),Promise.resolve().then(t.bind(t,93596)),Promise.resolve().then(t.bind(t,85850)),Promise.resolve().then(t.bind(t,93821)),Promise.resolve().then(t.bind(t,58758)),Promise.resolve().then(t.bind(t,41330)),Promise.resolve().then(t.bind(t,21313))},51146:(e,r,t)=>{"use strict";t.d(r,{A:()=>n});var s=t(60687);t(43210);var o=t(30474);let n=()=>(0,s.jsxs)("div",{className:"loader",children:[(0,s.jsx)(o.default,{src:"/assets/icons/loader.svg",alt:"loader",width:32,height:32,className:"animate-spin"}),"Loading..."]})},51610:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/sentry-example-page/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/sentry-example-page/page.tsx","default")},55591:e=>{"use strict";e.exports=require("https")},58014:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>u,metadata:()=>p});var s=t(37413),o=t(56389),n=t.n(o),a=t(51189),i=t.n(a);t(82704);var l=t(81228),d=t(5129),c=t(36259);let p={title:"Live Docs",description:"Your go-to collabarative editor"};function u({children:e}){return(0,s.jsx)(l.lJ,{appearance:{baseTheme:d.dark,variables:{colorPrimary:"#3371FF",fontSize:"16px"}},children:(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{className:`${n().variable} ${i().variable} antialiased`,children:(0,s.jsx)(c.default,{children:e})})})})}},59208:(e,r,t)=>{"use strict";t.r(r),t.d(r,{"7f26295de556bdc84a46140871380e2da8b27cd5ca":()=>p,"7f264293cb5004db82e11d533e42b69681ec442500":()=>s.y,"7f9d304d15482ac489083ba521afe1484a770b9301":()=>c});var s=t(38301),o=t(91199);t(42087);var n=t(25881);let a=e=>JSON.parse(JSON.stringify(e)),i=new(t(75993)).B({secret:process.env.LIVEBLOCKS_SECRET_KEY});var l=t(33331);let d=(0,n.z)({secretKey:process.env.CLERK_SECRET_KEY}),c=async({userIds:e})=>{try{let{data:r}=await d.users.getUserList({emailAddress:e}),t=r.map(e=>({id:e.id,name:`${e.firstName} ${e.lastName}`,email:e.emailAddresses[0].emailAddress,avatar:e.imageUrl})),s=e.map(e=>t.find(r=>r.email===e));return a(s)}catch(e){}},p=async({roomId:e,currentUser:r,text:t})=>{try{let s=await i.getRoom(e),o=Object.keys(s.usersAccesses).filter(e=>e!==r);if(t.length){let e=t.toLowerCase(),r=o.filter(r=>r.toLowerCase().includes(e));return a(r)}return a(o)}catch(e){}};(0,l.D)([c,p]),(0,o.A)(c,"7f9d304d15482ac489083ba521afe1484a770b9301",null),(0,o.A)(p,"7f26295de556bdc84a46140871380e2da8b27cd5ca",null)},60329:(e,r,t)=>{Promise.resolve().then(t.bind(t,36259)),Promise.resolve().then(t.bind(t,63441)),Promise.resolve().then(t.bind(t,62808)),Promise.resolve().then(t.bind(t,7791)),Promise.resolve().then(t.bind(t,12918)),Promise.resolve().then(t.bind(t,13920)),Promise.resolve().then(t.bind(t,62278))},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},67906:(e,r,t)=>{"use strict";t.d(r,{default:()=>p});var s=t(60687),o=t(49269),n=t(64871),a=t(84238),i=t(51146),l=t(6475);let d=(0,l.createServerReference)("7f9d304d15482ac489083ba521afe1484a770b9301",l.callServer,void 0,l.findSourceMapURL,"getClerkUsers"),c=(0,l.createServerReference)("7f26295de556bdc84a46140871380e2da8b27cd5ca",l.callServer,void 0,l.findSourceMapURL,"getDocumentUsers");function p({children:e}){let{user:r}=(0,a.Jd)();return(0,s.jsx)(o.aq,{authEndpoint:"/api/liveblocks-auth",resolveUsers:async({userIds:e})=>await d({userIds:e}),resolveMentionSuggestions:async({text:e,roomId:t})=>await c({roomId:t,currentUser:r?.emailAddresses[0].emailAddress,text:e}),children:(0,s.jsx)(n.zf,{fallback:(0,s.jsx)(i.A,{}),children:e})})}},69473:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.default,__next_app__:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>l});var s=t(65239),o=t(48088),n=t(46076),a=t(30893),i={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>a[e]);t.d(r,i);let l={children:["",{children:["sentry-example-page",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,51610)),"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/sentry-example-page/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,58014)),"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/layout.tsx"],"global-error":[()=>Promise.resolve().then(t.bind(t,46076)),"/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/global-error.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,d=["/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone/app/sentry-example-page/page.tsx"],c={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/sentry-example-page/page",pathname:"/sentry-example-page",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},73024:e=>{"use strict";e.exports=require("node:fs")},73972:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,86346,23)),Promise.resolve().then(t.t.bind(t,27924,23)),Promise.resolve().then(t.t.bind(t,35656,23)),Promise.resolve().then(t.t.bind(t,40099,23)),Promise.resolve().then(t.t.bind(t,38243,23)),Promise.resolve().then(t.t.bind(t,28827,23)),Promise.resolve().then(t.t.bind(t,62763,23)),Promise.resolve().then(t.t.bind(t,97173,23))},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},77598:e=>{"use strict";e.exports=require("node:crypto")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},82704:()=>{},84410:(e,r,t)=>{Promise.resolve().then(t.bind(t,86976))},86976:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l});var s=t(60687),o=t(95282),n=t.n(o),a=t(43210);class i extends Error{constructor(e){super(e),this.name="SentryExampleFrontendError"}}function l(){let[e,r]=(0,a.useState)(!1),[t,o]=(0,a.useState)(!0);return(0,s.jsxs)("div",{children:[(0,s.jsxs)(n(),{children:[(0,s.jsx)("title",{children:"sentry-example-page"}),(0,s.jsx)("meta",{name:"description",content:"Test Sentry for your Next.js app!"})]}),(0,s.jsxs)("main",{children:[(0,s.jsx)("div",{className:"flex-spacer"}),(0,s.jsx)("svg",{height:"40",width:"40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M21.85 2.995a3.698 3.698 0 0 1 1.353 1.354l16.303 28.278a3.703 3.703 0 0 1-1.354 5.053 3.694 3.694 0 0 1-1.848.496h-3.828a31.149 31.149 0 0 0 0-3.09h3.815a.61.61 0 0 0 .537-.917L20.523 5.893a.61.61 0 0 0-1.057 0l-3.739 6.494a28.948 28.948 0 0 1 9.63 10.453 28.988 28.988 0 0 1 3.499 13.78v1.542h-9.852v-1.544a19.106 19.106 0 0 0-2.182-8.85 19.08 19.08 0 0 0-6.032-6.829l-1.85 3.208a15.377 15.377 0 0 1 6.382 12.484v1.542H3.696A3.694 3.694 0 0 1 0 34.473c0-.648.17-1.286.494-1.849l2.33-4.074a8.562 8.562 0 0 1 2.689 1.536L3.158 34.17a.611.611 0 0 0 .538.917h8.448a12.481 12.481 0 0 0-6.037-9.09l-1.344-.772 4.908-8.545 1.344.77a22.16 22.16 0 0 1 7.705 7.444 22.193 22.193 0 0 1 3.316 10.193h3.699a25.892 25.892 0 0 0-3.811-12.033 25.856 25.856 0 0 0-9.046-8.796l-1.344-.772 5.269-9.136a3.698 3.698 0 0 1 3.2-1.849c.648 0 1.285.17 1.847.495Z",fill:"currentcolor"})}),(0,s.jsx)("h1",{children:"sentry-example-page"}),(0,s.jsxs)("p",{className:"description",children:["Click the button below, and view the sample error on the Sentry ",(0,s.jsx)("a",{target:"_blank",href:"https://bhaskar-pt.sentry.io/issues/?project=4509751832281168",children:"Issues Page"}),". For more details about setting up Sentry, ",(0,s.jsx)("a",{target:"_blank",href:"https://docs.sentry.io/platforms/javascript/guides/nextjs/",children:"read our docs"}),"."]}),(0,s.jsx)("button",{type:"button",onClick:async()=>{throw new i("This error is raised on the frontend of the example page.")},disabled:!0,children:(0,s.jsx)("span",{children:"Throw Sample Error"})}),e?(0,s.jsx)("p",{className:"success",children:"Error sent to Sentry."}):t?(0,s.jsx)("div",{className:"success_placeholder"}):(0,s.jsx)("div",{className:"connectivity-error",children:(0,s.jsx)("p",{children:"It looks like network requests to Sentry are being blocked, which will prevent errors from being captured. Try disabling your ad-blocker to complete the test."})}),(0,s.jsx)("div",{className:"flex-spacer"})]}),(0,s.jsx)("style",{children:`
        main {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 16px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        }

        h1 {
          padding: 0px 4px;
          border-radius: 4px;
          background-color: rgba(24, 20, 35, 0.03);
          font-family: monospace;
          font-size: 20px;
          line-height: 1.2;
        }

        p {
          margin: 0;
          font-size: 20px;
        }

        a {
          color: #6341F0;
          text-decoration: underline;
          cursor: pointer;

          @media (prefers-color-scheme: dark) {
            color: #B3A1FF;
          }
        }

        button {
          border-radius: 8px;
          color: white;
          cursor: pointer;
          background-color: #553DB8;
          border: none;
          padding: 0;
          margin-top: 4px;

          & > span {
            display: inline-block;
            padding: 12px 16px;
            border-radius: inherit;
            font-size: 20px;
            font-weight: bold;
            line-height: 1;
            background-color: #7553FF;
            border: 1px solid #553DB8;
            transform: translateY(-4px);
          }

          &:hover > span {
            transform: translateY(-8px);
          }

          &:active > span {
            transform: translateY(0);
          }

          &:disabled {
	            cursor: not-allowed;
	            opacity: 0.6;
	
	            & > span {
	              transform: translateY(0);
	              border: none
	            }
	          }
        }

        .description {
          text-align: center;
          color: #6E6C75;
          max-width: 500px;
          line-height: 1.5;
          font-size: 20px;

          @media (prefers-color-scheme: dark) {
            color: #A49FB5;
          }
        }

        .flex-spacer {
          flex: 1;
        }

        .success {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 20px;
          line-height: 1;
          background-color: #00F261;
          border: 1px solid #00BF4D;
          color: #181423;
        }

        .success_placeholder {
          height: 46px;
        }

        .connectivity-error {
          padding: 12px 16px;
          background-color: #E50045;
          border-radius: 8px;
          width: 500px;
          color: #FFFFFF;
          border: 1px solid #A80033;
          text-align: center;
          margin: 0;
        }
        
        .connectivity-error a {
          color: #FFFFFF;
          text-decoration: underline;
        }
      `})]})}},95282:(e,r)=>{"use strict";function t(){return null}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return t}}),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},97940:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,16444,23)),Promise.resolve().then(t.t.bind(t,16042,23)),Promise.resolve().then(t.t.bind(t,88170,23)),Promise.resolve().then(t.t.bind(t,49477,23)),Promise.resolve().then(t.t.bind(t,29345,23)),Promise.resolve().then(t.t.bind(t,12089,23)),Promise.resolve().then(t.t.bind(t,46577,23)),Promise.resolve().then(t.t.bind(t,31307,23))}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[80,391,999,726,721,658],()=>t(69473));module.exports=s})();