
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.1";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-instrumentation.js
var require_edge_instrumentation = __commonJS({
  ".next/server/edge-instrumentation.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[183], { 931: (e, n, r) => {
      "use strict";
      async function s() {
      }
      r.r(n), r.d(n, { onRequestError: () => t, register: () => s });
      let t = void 0;
    } }, (e) => {
      var n = e(e.s = 931);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_instrumentation = n;
    }]);
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, a = true;
        try {
          e[o](i, i.exports, t), a = false;
        } finally {
          a && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var a = e2.length; a > 0 && e2[a - 1][2] > i; a--) e2[a] = e2[a - 1];
            e2[a] = [o, n, i];
            return;
          }
          for (var l = 1 / 0, a = 0; a < e2.length; a++) {
            for (var [o, n, i] = e2[a], u = true, f = 0; f < o.length; f++) (false & i || l >= i) && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < l && (l = i));
            if (u) {
              e2.splice(a--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [a, l, u] = o2, f = 0;
          if (a.some((r4) => 0 !== e2[r4])) {
            for (n in l) t.o(l, n) && (t.m[n] = l[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < a.length; f++) i = a[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 16: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => i, h: () => s });
      let n = "DYNAMIC_SERVER_USAGE";
      class i extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = n;
        }
      }
      function s(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === n;
      }
    }, 35: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray, s = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), u = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.iterator, m = Object.prototype.hasOwnProperty, g = Object.assign;
      function y(e2, t2, r2, n2, i2, a2) {
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== (r2 = a2.ref) ? r2 : null, props: a2 };
      }
      function v(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var b = /\/+/g;
      function _(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function w() {
      }
      function k(e2, t2, r2) {
        if (null == e2) return e2;
        var o2 = [], l2 = 0;
        return !function e3(t3, r3, o3, l3, c2) {
          var u2, d2, h2, m2 = typeof t3;
          ("undefined" === m2 || "boolean" === m2) && (t3 = null);
          var g2 = false;
          if (null === t3) g2 = true;
          else switch (m2) {
            case "bigint":
            case "string":
            case "number":
              g2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case a:
                  g2 = true;
                  break;
                case p:
                  return e3((g2 = t3._init)(t3._payload), r3, o3, l3, c2);
              }
          }
          if (g2) return c2 = c2(t3), g2 = "" === l3 ? "." + _(t3, 0) : l3, i(c2) ? (o3 = "", null != g2 && (o3 = g2.replace(b, "$&/") + "/"), e3(c2, r3, o3, "", function(e4) {
            return e4;
          })) : null != c2 && (v(c2) && (u2 = c2, d2 = o3 + (null == c2.key || t3 && t3.key === c2.key ? "" : ("" + c2.key).replace(b, "$&/") + "/") + g2, c2 = y(u2.type, d2, void 0, void 0, void 0, u2.props)), r3.push(c2)), 1;
          g2 = 0;
          var k2 = "" === l3 ? "." : l3 + ":";
          if (i(t3)) for (var S2 = 0; S2 < t3.length; S2++) m2 = k2 + _(l3 = t3[S2], S2), g2 += e3(l3, r3, o3, m2, c2);
          else if ("function" == typeof (S2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = f && h2[f] || h2["@@iterator"]) ? h2 : null)) for (t3 = S2.call(t3), S2 = 0; !(l3 = t3.next()).done; ) m2 = k2 + _(l3 = l3.value, S2++), g2 += e3(l3, r3, o3, m2, c2);
          else if ("object" === m2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(w, w) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, o3, l3, c2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return g2;
        }(e2, o2, "", "", function(e3) {
          return t2.call(r2, e3, l2++);
        }), o2;
      }
      function S(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function E() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Children = { map: k, forEach: function(e2, t2, r2) {
        k(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return k(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return k(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!v(e2)) throw Error(n(143));
        return e2;
      } }, t.Fragment = o, t.Profiler = c, t.StrictMode = l, t.Suspense = d, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, t.cache = function(e2) {
        return function() {
          var t2 = r.A;
          if (!t2) return e2.apply(null, arguments);
          var n2 = t2.getCacheForType(E);
          void 0 === (t2 = n2.get(e2)) && (t2 = T(), n2.set(e2, t2)), n2 = 0;
          for (var i2 = arguments.length; n2 < i2; n2++) {
            var s2 = arguments[n2];
            if ("function" == typeof s2 || "object" == typeof s2 && null !== s2) {
              var a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(s2)) && (t2 = T(), a2.set(s2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(s2)) && (t2 = T(), a2.set(s2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (n2 = t2).s = 1, n2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, t.captureOwnerStack = function() {
        return null;
      }, t.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var i2 = g({}, e2.props), s2 = e2.key, a2 = void 0;
        if (null != t2) for (o2 in void 0 !== t2.ref && (a2 = void 0), void 0 !== t2.key && (s2 = "" + t2.key), t2) m.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (i2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var l2 = Array(o2), c2 = 0; c2 < o2; c2++) l2[c2] = arguments[c2 + 2];
          i2.children = l2;
        }
        return y(e2.type, s2, void 0, void 0, a2, i2);
      }, t.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, s2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (s2 = "" + t2.key), t2) m.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var a2 = arguments.length - 2;
        if (1 === a2) i2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), l2 = 0; l2 < a2; l2++) o2[l2] = arguments[l2 + 2];
          i2.children = o2;
        }
        if (e2 && e2.defaultProps) for (n2 in a2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = a2[n2]);
        return y(e2, s2, void 0, void 0, null, i2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: u, render: e2 };
      }, t.isValidElement = v, t.lazy = function(e2) {
        return { $$typeof: p, _payload: { _status: -1, _result: e2 }, _init: S };
      }, t.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.use = function(e2) {
        return r.H.use(e2);
      }, t.useCallback = function(e2, t2) {
        return r.H.useCallback(e2, t2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return r.H.useId();
      }, t.useMemo = function(e2, t2) {
        return r.H.useMemo(e2, t2);
      }, t.version = "19.2.0-canary-3fbfb9ba-20250409";
    }, 58: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => a });
      let n = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let s = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return s ? new s() : new i();
      }
    }, 115: (e, t, r) => {
      "use strict";
      r.d(t, { XN: () => i, FP: () => n });
      let n = (0, r(58).xl)();
      function i(e2) {
        let t2 = n.getStore();
        switch (!t2 && function(e3) {
          throw Object.defineProperty(Error(`\`${e3}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
        }(e2), t2.type) {
          case "request":
          default:
            return t2;
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", { value: "E401", enumerable: false, configurable: true });
          case "cache":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E37", enumerable: false, configurable: true });
          case "unstable-cache":
            throw Object.defineProperty(Error(`\`${e2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E69", enumerable: false, configurable: true });
        }
      }
    }, 159: (e, t, r) => {
      "use strict";
      r.d(t, { RM: () => s, s8: () => i });
      let n = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), i = "NEXT_HTTP_ERROR_FALLBACK";
      function s(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === i && n.has(Number(r2));
      }
    }, 167: (e, t, r) => {
      "use strict";
      r.d(t, { nJ: () => i });
      var n = r(821);
      function i(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, i2] = t2, s = t2.slice(2, -2).join(";"), a = Number(t2.at(-2));
        return "NEXT_REDIRECT" === r2 && ("replace" === i2 || "push" === i2) && "string" == typeof s && !isNaN(a) && a in n.Q;
      }
    }, 199: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => s });
      var n = r(159), i = r(167);
      function s(e2) {
        return (0, i.nJ)(e2) || (0, n.RM)(e2);
      }
    }, 201: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return s;
      } });
      let n = new (r(521)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let s2 = i(e2, t2);
        return s2 ? n.run(s2, r2) : r2();
      }
      function a(e2, t2) {
        let r2 = n.getStore();
        return r2 || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 220: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => oQ });
      var i = {};
      async function s() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(i), r.d(i, { config: () => oF, default: () => oW });
      let a = null;
      async function o() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        a || (a = s());
        let e10 = await a;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function l(...e10) {
        let t10 = await s();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let c = null;
      function u() {
        return c || (c = o()), c;
      }
      function d(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, construct() {
          throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }, apply(r10, n10, i10) {
          if ("function" == typeof i10[0]) return i10[0](t10);
          throw Object.defineProperty(Error(d(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), u();
      class h extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class p extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class f extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let m = "_N_T_", g = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function y(e10) {
        var t10, r10, n10, i10, s10, a10 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, s10 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (n10 = o2, o2 += 1, l2(), i10 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (s10 = true, o2 = i10, a10.push(e10.substring(t10, n10)), t10 = o2) : o2 = n10 + 1;
          } else o2 += 1;
          (!s10 || o2 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function v(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...y(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function b(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...g, GROUP: { builtinReact: [g.reactServerComponents, g.actionBrowser], serverOnly: [g.reactServerComponents, g.actionBrowser, g.instrument, g.middleware], neutralTarget: [g.apiNode, g.apiEdge], clientOnly: [g.serverSideRendering, g.appPagesBrowser], bundled: [g.reactServerComponents, g.actionBrowser, g.serverSideRendering, g.appPagesBrowser, g.shared, g.instrument, g.middleware], appPages: [g.reactServerComponents, g.serverSideRendering, g.appPagesBrowser, g.actionBrowser] } });
      let _ = Symbol("response"), w = Symbol("passThrough"), k = Symbol("waitUntil");
      class S {
        constructor(e10, t10) {
          this[w] = false, this[k] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[_] || (this[_] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[w] = true;
        }
        waitUntil(e10) {
          if ("external" === this[k].kind) return (0, this[k].function)(e10);
          this[k].promises.push(e10);
        }
      }
      class E extends S {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function T(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function x(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function C(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = x(e10);
        return "" + t10 + r10 + n10 + i10;
      }
      function O(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = x(e10);
        return "" + r10 + t10 + n10 + i10;
      }
      function R(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = x(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let I = /* @__PURE__ */ new WeakMap();
      function A(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = I.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), I.set(t10, n10));
        let i10 = e10.split("/", 2);
        if (!i10[1]) return { pathname: e10 };
        let s10 = i10[1].toLowerCase(), a10 = n10.indexOf(s10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let P = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function N(e10, t10) {
        return new URL(String(e10).replace(P, "localhost"), t10 && String(t10).replace(P, "localhost"));
      }
      let U = Symbol("NextURLInternal");
      class q {
        constructor(e10, t10, r10) {
          let n10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[U] = { url: N(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i10;
          let s10 = function(e11, t11) {
            var r11, n11;
            let { basePath: i11, i18n: s11, trailingSlash: a11 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a11 };
            i11 && R(o3.pathname, i11) && (o3.pathname = function(e12, t12) {
              if (!R(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, i11), o3.basePath = i11);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              o3.buildId = e12[0], l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (s11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : A(o3.pathname, s11.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (n11 = e12.pathname) ? n11 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : A(l2, s11.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[U].url.pathname, { nextConfig: this[U].options.nextConfig, parseData: true, i18nProvider: this[U].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[U].url, this[U].options.headers);
          this[U].domainLocale = this[U].options.i18nProvider ? this[U].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) for (let s11 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var n11, i11;
              if (t11 === (null == (n11 = s11.domain) ? void 0 : n11.split(":", 1)[0].toLowerCase()) || r11 === s11.defaultLocale.toLowerCase() || (null == (i11 = s11.locales) ? void 0 : i11.some((e12) => e12.toLowerCase() === r11))) return s11;
            }
          }(null == (t10 = this[U].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o2 = (null == (r10 = this[U].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[U].options.nextConfig) || null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[U].url.pathname = s10.pathname, this[U].defaultLocale = o2, this[U].basePath = s10.basePath ?? "", this[U].buildId = s10.buildId, this[U].locale = s10.locale ?? o2, this[U].trailingSlash = s10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !n10 && (R(i10, "/api") || R(i10, "/" + t11.toLowerCase())) ? e11 : C(e11, "/" + t11);
          }((e10 = { basePath: this[U].basePath, buildId: this[U].buildId, defaultLocale: this[U].options.forceLocale ? void 0 : this[U].defaultLocale, locale: this[U].locale, pathname: this[U].url.pathname, trailingSlash: this[U].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = T(t10)), e10.buildId && (t10 = O(C(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = C(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : O(t10, "/") : T(t10);
        }
        formatSearch() {
          return this[U].url.search;
        }
        get buildId() {
          return this[U].buildId;
        }
        set buildId(e10) {
          this[U].buildId = e10;
        }
        get locale() {
          return this[U].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[U].locale || !(null == (r10 = this[U].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[U].locale = e10;
        }
        get defaultLocale() {
          return this[U].defaultLocale;
        }
        get domainLocale() {
          return this[U].domainLocale;
        }
        get searchParams() {
          return this[U].url.searchParams;
        }
        get host() {
          return this[U].url.host;
        }
        set host(e10) {
          this[U].url.host = e10;
        }
        get hostname() {
          return this[U].url.hostname;
        }
        set hostname(e10) {
          this[U].url.hostname = e10;
        }
        get port() {
          return this[U].url.port;
        }
        set port(e10) {
          this[U].url.port = e10;
        }
        get protocol() {
          return this[U].url.protocol;
        }
        set protocol(e10) {
          this[U].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[U].url = N(e10), this.analyze();
        }
        get origin() {
          return this[U].url.origin;
        }
        get pathname() {
          return this[U].url.pathname;
        }
        set pathname(e10) {
          this[U].url.pathname = e10;
        }
        get hash() {
          return this[U].url.hash;
        }
        set hash(e10) {
          this[U].url.hash = e10;
        }
        get search() {
          return this[U].url.search;
        }
        set search(e10) {
          this[U].url.search = e10;
        }
        get password() {
          return this[U].url.password;
        }
        set password(e10) {
          this[U].url.password = e10;
        }
        get username() {
          return this[U].url.username;
        }
        set username(e10) {
          this[U].url.username = e10;
        }
        get basePath() {
          return this[U].basePath;
        }
        set basePath(e10) {
          this[U].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new q(String(this), this[U].options);
        }
      }
      var j = r(725);
      let M = Symbol("internal request");
      class D extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          b(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n10 = new q(r10, { headers: v(this.headers), nextConfig: t10.nextConfig });
          this[M] = { cookies: new j.tm(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[M].cookies;
        }
        get nextUrl() {
          return this[M].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new f();
        }
        get url() {
          return this[M].url;
        }
      }
      var L = r(716);
      let H = Symbol("internal response"), z = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function $(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n10, i10] of e10.request.headers) t10.set("x-middleware-request-" + n10, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class B extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n10 = new Proxy(new j.VO(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let s10 = Reflect.apply(e11[n11], e11, i11), a10 = new Headers(r10);
                  return s10 instanceof j.VO && r10.set("x-middleware-set-cookie", s10.getAll().map((e12) => (0, j.Ud)(e12)).join(",")), $(t10, a10), s10;
                };
              default:
                return L.l.get(e11, n11, i10);
            }
          } });
          this[H] = { cookies: n10, url: t10.url ? new q(t10.url, { headers: v(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[H].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new B(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!z.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", b(e10)), new B(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", b(e10)), $(t10, r10), new B(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), $(e10, t10), new B(null, { ...e10, headers: t10 });
        }
      }
      function J(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i10 = n10.origin === r10.origin;
        return { url: i10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: i10 };
      }
      let K = "Next-Router-Prefetch", W = ["RSC", "Next-Router-State-Tree", K, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], F = "_rsc";
      var V = r(381), X = r(818), G = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(G || {}), Q = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(Q || {}), Y = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(Y || {}), Z = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(Z || {}), ee = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(ee || {}), et = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(et || {}), er = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(er || {}), en = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(en || {}), ei = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(ei || {}), es = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(es || {}), ea = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(ea || {}), eo = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eo || {});
      let el = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ec = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function eu(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ed, propagation: eh, trace: ep, SpanStatusCode: ef, SpanKind: em, ROOT_CONTEXT: eg } = n = r(700);
      class ey extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let ev = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof ey;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: ef.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eb = /* @__PURE__ */ new Map(), e_ = n.createContextKey("next.rootSpanId"), ew = 0, ek = () => ew++, eS = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class eE {
        getTracerInstance() {
          return ep.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ed;
        }
        getTracePropagationData() {
          let e10 = ed.active(), t10 = [];
          return eh.inject(e10, t10, eS), t10;
        }
        getActiveScopeSpan() {
          return ep.getSpan(null == ed ? void 0 : ed.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = ed.active();
          if (ep.getSpanContext(n10)) return t10();
          let i10 = eh.extract(n10, e10, r10);
          return ed.with(i10, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, n10, i10] = e10, { fn: s10, options: a10 } = "function" == typeof n10 ? { fn: n10, options: {} } : { fn: i10, options: { ...n10 } }, o2 = a10.spanName ?? r10;
          if (!el.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return s10();
          let l2 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t10 = ep.getSpanContext(l2)) ? void 0 : t10.isRemote) && (c2 = true) : (l2 = (null == ed ? void 0 : ed.active()) ?? eg, c2 = true);
          let u2 = ek();
          return a10.attributes = { "next.span_name": o2, "next.span_type": r10, ...a10.attributes }, ed.with(l2.setValue(e_, u2), () => this.getTracerInstance().startActiveSpan(o2, a10, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, n11 = () => {
              eb.delete(u2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ec.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            c2 && eb.set(u2, new Map(Object.entries(a10.attributes ?? {})));
            try {
              if (s10.length > 1) return s10(e11, (t13) => ev(e11, t13));
              let t12 = s10(e11);
              if (eu(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw ev(e11, t13), t13;
              }).finally(n11);
              return e11.end(), n11(), t12;
            } catch (t12) {
              throw ev(e11, t12), n11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return el.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let s10 = arguments.length - 1, a10 = arguments[s10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(ed.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[s10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? ep.setSpan(ed.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ed.active().getValue(e_);
          return eb.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = ed.active().getValue(e_), n10 = eb.get(r10);
          n10 && n10.set(e10, t10);
        }
      }
      let eT = (() => {
        let e10 = new eE();
        return () => e10;
      })(), ex = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(ex);
      class eC {
        constructor(e10, t10, r10, n10) {
          var i10;
          let s10 = e10 && function(e11, t11) {
            let r11 = V.o.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (i10 = r10.get(ex)) ? void 0 : i10.value;
          this._isEnabled = !!(!s10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: ex, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: ex, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eO(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of y(r10)) n10.append("set-cookie", e11);
          for (let e11 of new j.VO(n10).getAll()) t10.set(e11);
        }
      }
      var eR = r(115), eI = r(802), eA = r.n(eI);
      class eP extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      var eN = r(535);
      class eU {
        constructor(e10, t10) {
          this.cache = /* @__PURE__ */ new Map(), this.sizes = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10 || (() => 1);
        }
        set(e10, t10) {
          if (!e10 || !t10) return;
          let r10 = this.calculateSize(t10);
          if (r10 > this.maxSize) return void console.warn("Single item size exceeds maxSize");
          this.cache.has(e10) && (this.totalSize -= this.sizes.get(e10) || 0), this.cache.set(e10, t10), this.sizes.set(e10, r10), this.totalSize += r10, this.touch(e10);
        }
        has(e10) {
          return !!e10 && (this.touch(e10), !!this.cache.get(e10));
        }
        get(e10) {
          if (!e10) return;
          let t10 = this.cache.get(e10);
          if (void 0 !== t10) return this.touch(e10), t10;
        }
        touch(e10) {
          let t10 = this.cache.get(e10);
          void 0 !== t10 && (this.cache.delete(e10), this.cache.set(e10, t10), this.evictIfNecessary());
        }
        evictIfNecessary() {
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) this.evictLeastRecentlyUsed();
        }
        evictLeastRecentlyUsed() {
          let e10 = this.cache.keys().next().value;
          if (void 0 !== e10) {
            let t10 = this.sizes.get(e10) || 0;
            this.totalSize -= t10, this.cache.delete(e10), this.sizes.delete(e10);
          }
        }
        reset() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        keys() {
          return [...this.cache.keys()];
        }
        remove(e10) {
          this.cache.has(e10) && (this.totalSize -= this.sizes.get(e10) || 0, this.cache.delete(e10), this.sizes.delete(e10));
        }
        clear() {
          this.cache.clear(), this.sizes.clear(), this.totalSize = 0;
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      r(356).Buffer, new eU(52428800, (e10) => e10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eq = Symbol.for("@next/cache-handlers-map"), ej = Symbol.for("@next/cache-handlers-set"), eM = globalThis;
      function eD() {
        if (eM[eq]) return eM[eq].entries();
      }
      async function eL(e10, t10) {
        if (!e10) return t10();
        let r10 = eH(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.pendingRevalidatedTags), n10 = new Set(e11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: t12.pendingRevalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !n10.has(e12)) };
          }(r10, eH(e10));
          await e$(e10, t11);
        }
      }
      function eH(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function ez(e10, t10) {
        if (0 === e10.length) return;
        let r10 = [];
        t10 && r10.push(t10.revalidateTag(e10));
        let n10 = function() {
          if (eM[ej]) return eM[ej].values();
        }();
        if (n10) for (let t11 of n10) r10.push(t11.expireTags(...e10));
        await Promise.all(r10);
      }
      async function e$(e10, t10) {
        let r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], n10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, i10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([ez(r10, e10.incrementalCache), ...Object.values(n10), ...i10]);
      }
      var eB = r(620), eJ = r(427);
      class eK {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new (eA())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eu(e10)) this.waitUntil || eW(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || eW();
          let t10 = eR.FP.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = eJ.Z.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (0, eB.cg)(async () => {
            try {
              await eJ.Z.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eN.J.getStore();
          if (!e10) throw Object.defineProperty(new eP("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eL(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eP("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eW() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function eF(e10) {
        let t10, r10 = { then: (n10, i10) => (t10 || (t10 = e10()), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, i10)) };
        return r10;
      }
      class eV {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function eX() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let eG = Symbol.for("@next/request-context"), eQ = (e10) => {
        let t10 = ["/layout"];
        if (e10.startsWith("/")) {
          let r10 = e10.split("/");
          for (let e11 = 1; e11 < r10.length + 1; e11++) {
            let n10 = r10.slice(0, e11).join("/");
            n10 && (n10.endsWith("/page") || n10.endsWith("/route") || (n10 = `${n10}${!n10.endsWith("/") ? "/" : ""}layout`), t10.push(n10));
          }
        }
        return t10;
      };
      async function eY(e10, t10, r10) {
        let n10 = [], i10 = r10 && r10.size > 0;
        for (let t11 of eQ(e10)) t11 = `${m}${t11}`, n10.push(t11);
        if (t10.pathname && !i10) {
          let e11 = `${m}${t10.pathname}`;
          n10.push(e11);
        }
        return { tags: n10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eD();
          if (r11) for (let [n11, i11] of r11) "getExpiration" in i11 && t11.set(n11, eF(async () => i11.getExpiration(...e11)));
          return t11;
        }(n10) };
      }
      class eZ extends D {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let e0 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, e1 = (e10, t10) => eT().withPropagatedContext(e10.headers, t10, e0), e2 = false;
      async function e5(e10) {
        var t10;
        let n10, i10;
        if (!e2 && (e2 = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(905);
          e11(), e1 = t11(e1);
        }
        await u();
        let s10 = void 0 !== globalThis.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let a10 = new q(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...a10.searchParams.keys()]) {
          let t11 = a10.searchParams.getAll(e11), r10 = function(e12) {
            for (let t12 of ["nxtP", "nxtI"]) if (e12 !== t12 && e12.startsWith(t12)) return e12.substring(t12.length);
            return null;
          }(e11);
          if (r10) {
            for (let e12 of (a10.searchParams.delete(r10), t11)) a10.searchParams.append(r10, e12);
            a10.searchParams.delete(e11);
          }
        }
        let o2 = a10.buildId;
        a10.buildId = "";
        let l2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, n11] of Object.entries(e11)) for (let e12 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), c2 = l2.has("x-nextjs-data"), d2 = "1" === l2.get("RSC");
        c2 && "/index" === a10.pathname && (a10.pathname = "/");
        let h2 = /* @__PURE__ */ new Map();
        if (!s10) for (let e11 of W) {
          let t11 = e11.toLowerCase(), r10 = l2.get(t11);
          null !== r10 && (h2.set(t11, r10), l2.delete(t11));
        }
        let p2 = new eZ({ page: e10.page, input: function(e11) {
          let t11 = "string" == typeof e11, r10 = t11 ? new URL(e11) : e11;
          return r10.searchParams.delete(F), t11 ? r10.toString() : r10;
        }(a10).toString(), init: { body: e10.request.body, headers: l2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        c2 && Object.defineProperty(p2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eX() }) }));
        let f2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[eG];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), m2 = new E({ request: p2, page: e10.page, context: f2 ? { waitUntil: f2 } : void 0 });
        if ((n10 = await e1(p2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = m2.waitUntil.bind(m2), r10 = new eV();
            return eT().trace(eo.execute, { spanName: `middleware ${p2.method} ${p2.nextUrl.pathname}`, attributes: { "http.target": p2.nextUrl.pathname, "http.method": p2.method } }, async () => {
              try {
                var n11, s11, a11, l3, c3, u2;
                let d3 = eX(), h3 = await eY("/", p2.nextUrl, null), f3 = (c3 = p2.nextUrl, u2 = (e11) => {
                  i10 = e11;
                }, function(e11, t12, r11, n12, i11, s12, a12, o3, l4, c4, u3) {
                  function d4(e12) {
                    r11 && r11.setHeader("Set-Cookie", e12);
                  }
                  let h4 = {};
                  return { type: "request", phase: e11, implicitTags: s12, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: i11, get headers() {
                    return h4.headers || (h4.headers = function(e12) {
                      let t13 = V.o.from(e12);
                      for (let e13 of W) t13.delete(e13.toLowerCase());
                      return V.o.seal(t13);
                    }(t12.headers)), h4.headers;
                  }, get cookies() {
                    if (!h4.cookies) {
                      let e12 = new j.tm(V.o.from(t12.headers));
                      eO(t12, e12), h4.cookies = X.Ck.seal(e12);
                    }
                    return h4.cookies;
                  }, set cookies(value) {
                    h4.cookies = value;
                  }, get mutableCookies() {
                    if (!h4.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r12 = new j.tm(V.o.from(e13));
                        return X.K8.wrap(r12, t13);
                      }(t12.headers, a12 || (r11 ? d4 : void 0));
                      eO(t12, e12), h4.mutableCookies = e12;
                    }
                    return h4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return h4.userspaceMutableCookies || (h4.userspaceMutableCookies = (0, X.hm)(this.mutableCookies)), h4.userspaceMutableCookies;
                  }, get draftMode() {
                    return h4.draftMode || (h4.draftMode = new eC(l4, t12, this.cookies, this.mutableCookies)), h4.draftMode;
                  }, renderResumeDataCache: o3 ?? null, isHmrRefresh: c4, serverComponentsHmrCache: u3 || globalThis.__serverComponentsHmrCache };
                }("action", p2, void 0, c3, {}, h3, u2, void 0, d3, false, void 0)), g3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r11, requestEndedState: n12, isPrefetchRequest: i11, buildId: s12, previouslyRevalidatedTags: a12 }) {
                  var o3;
                  let l4 = { isStaticGeneration: !r11.shouldWaitOnAllReady && !r11.supportsDynamicResponse && !r11.isDraftMode && !r11.isPossibleServerAction, page: e11, fallbackRouteParams: t12, route: (o3 = e11.split("/").reduce((e12, t13, r12, n13) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r12 === n13.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? o3 : "/" + o3, incrementalCache: r11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r11.cacheLifeProfiles, isRevalidate: r11.isRevalidate, isPrerendering: r11.nextExport, fetchCache: r11.fetchCache, isOnDemandRevalidate: r11.isOnDemandRevalidate, isDraftMode: r11.isDraftMode, requestEndedState: n12, isPrefetchRequest: i11, buildId: s12, reactLoadableManifest: (null == r11 ? void 0 : r11.reactLoadableManifest) || {}, assetPrefix: (null == r11 ? void 0 : r11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r12, onAfterTaskError: n13 } = e12;
                    return new eK({ waitUntil: t13, onClose: r12, onTaskError: n13 });
                  }(r11), dynamicIOEnabled: r11.experimental.dynamicIO, dev: r11.dev ?? false, previouslyRevalidatedTags: a12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t13 = eD();
                    if (t13) for (let [r12, n13] of t13) "refreshTags" in n13 && e12.set(r12, eF(async () => n13.refreshTags()));
                    return e12;
                  }() };
                  return r11.store = l4, l4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (s11 = e10.request.nextConfig) || null == (n11 = s11.experimental) ? void 0 : n11.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) || null == (a11 = l3.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: t11, onClose: r10.onClose.bind(r10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: p2.headers.has(K), buildId: o2 ?? "", previouslyRevalidatedTags: [] });
                return await eN.J.run(g3, () => eR.FP.run(f3, e10.handler, p2, m2));
              } finally {
                setTimeout(() => {
                  r10.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(p2, m2);
        })) && !(n10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        n10 && i10 && n10.headers.set("set-cookie", i10);
        let g2 = null == n10 ? void 0 : n10.headers.get("x-middleware-rewrite");
        if (n10 && g2 && (d2 || !s10)) {
          let t11 = new q(g2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          s10 || t11.host !== p2.nextUrl.host || (t11.buildId = o2 || t11.buildId, n10.headers.set("x-middleware-rewrite", String(t11)));
          let { url: r10, isRelative: i11 } = J(t11.toString(), a10.toString());
          !s10 && c2 && n10.headers.set("x-nextjs-rewrite", r10), d2 && i11 && (a10.pathname !== t11.pathname && n10.headers.set("x-nextjs-rewritten-path", t11.pathname), a10.search !== t11.search && n10.headers.set("x-nextjs-rewritten-query", t11.search.slice(1)));
        }
        let y2 = null == n10 ? void 0 : n10.headers.get("Location");
        if (n10 && y2 && !s10) {
          let t11 = new q(y2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          n10 = new Response(n10.body, n10), t11.host === a10.host && (t11.buildId = o2 || t11.buildId, n10.headers.set("Location", t11.toString())), c2 && (n10.headers.delete("Location"), n10.headers.set("x-nextjs-redirect", J(t11.toString(), a10.toString()).url));
        }
        let v2 = n10 || B.next(), b2 = v2.headers.get("x-middleware-override-headers"), _2 = [];
        if (b2) {
          for (let [e11, t11] of h2) v2.headers.set(`x-middleware-request-${e11}`, t11), _2.push(e11);
          _2.length > 0 && v2.headers.set("x-middleware-override-headers", b2 + "," + _2.join(","));
        }
        return { response: v2, waitUntil: ("internal" === m2[k].kind ? Promise.all(m2[k].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: p2.fetchMetrics };
      }
      var e4 = Object.defineProperty, e3 = Object.getOwnPropertyDescriptor, e6 = Object.getOwnPropertyNames, e8 = Object.prototype.hasOwnProperty, e9 = (e10) => {
        throw TypeError(e10);
      }, e7 = (e10, t10, r10) => t10.has(e10) || e9("Cannot " + r10), te = (e10, t10, r10) => (e7(e10, t10, "read from private field"), r10 ? r10.call(e10) : t10.get(e10)), tt = (e10, t10, r10) => t10.has(e10) ? e9("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10), tr = (e10, t10, r10, n10) => (e7(e10, t10, "write to private field"), n10 ? n10.call(e10, r10) : t10.set(e10, r10), r10), tn = (e10, t10, r10) => (e7(e10, t10, "access private method"), r10), ti = { initialDelay: 125, maxDelayBetweenRetries: 0, factor: 2, shouldRetry: (e10, t10) => t10 < 5, retryImmediately: false, jitter: true }, ts = async (e10) => new Promise((t10) => setTimeout(t10, e10)), ta = (e10, t10) => t10 ? e10 * (1 + Math.random()) : e10, to = (e10) => {
        let t10 = 0, r10 = () => {
          let r11 = e10.initialDelay * Math.pow(e10.factor, t10);
          return r11 = ta(r11, e10.jitter), Math.min(e10.maxDelayBetweenRetries || r11, r11);
        };
        return async () => {
          await ts(r10()), t10++;
        };
      }, tl = async (e10, t10 = {}) => {
        let r10 = 0, { shouldRetry: n10, initialDelay: i10, maxDelayBetweenRetries: s10, factor: a10, retryImmediately: o2, jitter: l2 } = { ...ti, ...t10 }, c2 = to({ initialDelay: i10, maxDelayBetweenRetries: s10, factor: a10, jitter: l2 });
        for (; ; ) try {
          return await e10();
        } catch (e11) {
          if (!n10(e11, ++r10)) throw e11;
          o2 && 1 === r10 ? await ts(ta(100, l2)) : await c2();
        }
      }, tc = (e10) => "undefined" != typeof atob && "function" == typeof atob ? atob(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10, "base64").toString() : e10, tu = (e10) => "undefined" != typeof btoa && "function" == typeof btoa ? btoa(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10).toString("base64") : e10, td = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], th = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], tp = [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"], tf = [".accountsstage.dev"], tm = "https://api.clerk.com", tg = "pk_live_";
      function ty(e10) {
        if (!e10.endsWith("$")) return false;
        let t10 = e10.slice(0, -1);
        return !t10.includes("$") && t10.includes(".");
      }
      function tv(e10, t10 = {}) {
        let r10;
        if (!(e10 = e10 || "") || !tb(e10)) {
          if (t10.fatal && !e10) throw Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
          if (t10.fatal && !tb(e10)) throw Error("Publishable key not valid.");
          return null;
        }
        let n10 = e10.startsWith(tg) ? "production" : "development";
        try {
          r10 = tc(e10.split("_")[2]);
        } catch {
          if (t10.fatal) throw Error("Publishable key not valid: Failed to decode key.");
          return null;
        }
        if (!ty(r10)) {
          if (t10.fatal) throw Error("Publishable key not valid: Decoded key has invalid format.");
          return null;
        }
        let i10 = r10.slice(0, -1);
        return t10.proxyUrl ? i10 = t10.proxyUrl : "development" !== n10 && t10.domain && t10.isSatellite && (i10 = `clerk.${t10.domain}`), { instanceType: n10, frontendApi: i10 };
      }
      function tb(e10 = "") {
        try {
          if (!(e10.startsWith(tg) || e10.startsWith("pk_test_"))) return false;
          let t10 = e10.split("_");
          if (3 !== t10.length) return false;
          let r10 = t10[2];
          if (!r10) return false;
          let n10 = tc(r10);
          return ty(n10);
        } catch {
          return false;
        }
      }
      function t_(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function tw(e10, t10 = globalThis.crypto.subtle) {
        let r10 = new TextEncoder().encode(e10);
        return tu(String.fromCharCode(...new Uint8Array(await t10.digest("sha-1", r10)))).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      var tk = (e10, t10) => `${e10}_${t10}`, tS = () => false, tE = () => {
        try {
          return true;
        } catch {
        }
        return false;
      }, tT = /* @__PURE__ */ new Set(), tx = (e10, t10, r10) => {
        let n10 = tS() || tE(), i10 = r10 ?? e10;
        tT.has(i10) || n10 || (tT.add(i10), console.warn(`Clerk - DEPRECATION WARNING: "${e10}" is deprecated and will be removed in the next major release.
${t10}`));
      };
      function tC(e10) {
        return { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: e10?.meta?.param_name, sessionId: e10?.meta?.session_id, emailAddresses: e10?.meta?.email_addresses, identifiers: e10?.meta?.identifiers, zxcvbn: e10?.meta?.zxcvbn, plan: e10?.meta?.plan, isPlanUpgradePossible: e10?.meta?.is_plan_upgrade_possible } };
      }
      var tO = class e10 extends Error {
        constructor(t10, { data: r10, status: n10, clerkTraceId: i10, retryAfter: s10 }) {
          super(t10), this.toString = () => {
            let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
            return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
          }, Object.setPrototypeOf(this, e10.prototype), this.status = n10, this.message = t10, this.clerkTraceId = i10, this.retryAfter = s10, this.clerkError = true, this.errors = function(e11 = []) {
            return e11.length > 0 ? e11.map(tC) : [];
          }(r10);
        }
      }, tR = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function tI({ packageName: e10, customMessages: t10 }) {
        let r10 = e10;
        function n10(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let n11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            n11 = n11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${n11}`;
        }
        let i10 = { ...tR, ...t10 };
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(i10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(n10(i10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(n10(i10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(n10(i10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(n10(i10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(n10(i10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(n10(e11));
        } };
      }
      var tA = tI({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: tP } = /* @__PURE__ */ function() {
        let e10 = /* @__PURE__ */ new Map();
        return { isDevOrStagingUrl: (t10) => {
          if (!t10) return false;
          let r10 = "string" == typeof t10 ? t10 : t10.hostname, n10 = e10.get(r10);
          return void 0 === n10 && (n10 = th.some((e11) => r10.endsWith(e11)), e10.set(r10, n10)), n10;
        } };
      }(), tN = { InvalidSecretKey: "clerk_key_invalid" }, tU = { TokenExpired: "token-expired", TokenInvalid: "token-invalid", TokenInvalidAlgorithm: "token-invalid-algorithm", TokenInvalidAuthorizedParties: "token-invalid-authorized-parties", TokenInvalidSignature: "token-invalid-signature", TokenNotActiveYet: "token-not-active-yet", TokenIatInTheFuture: "token-iat-in-the-future", TokenVerificationFailed: "token-verification-failed", InvalidSecretKey: "secret-key-invalid", LocalJWKMissing: "jwk-local-missing", RemoteJWKFailedToLoad: "jwk-remote-failed-to-load", JWKFailedToResolve: "jwk-failed-to-resolve", JWKKidMismatch: "jwk-kid-mismatch" }, tq = { ContactSupport: "Contact support@clerk.com", EnsureClerkJWT: "Make sure that this is a valid Clerk generate JWT.", SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.", SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable." }, tj = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: n10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = n10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      }, tM = { TokenInvalid: "token-invalid", InvalidSecretKey: "secret-key-invalid", UnexpectedError: "unexpected-error" }, tD = class e10 extends Error {
        constructor({ message: t10, code: r10, status: n10 }) {
          super(t10), Object.setPrototypeOf(this, e10.prototype), this.code = r10, this.status = n10;
        }
        getFullMessage() {
          return `${this.message} (code=${this.code}, status=${this.status})`;
        }
      };
      let tL = crypto;
      var tH = fetch.bind(globalThis), tz = { crypto: tL, get fetch() {
        return tH;
      }, AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, t$ = { parse: (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let n10 = e11.length;
        for (; "=" === e11[n10 - 1]; ) if (--n10, !r10.loose && !((e11.length - n10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let i10 = new (r10.out ?? Uint8Array)(n10 * t11.bits / 8 | 0), s10 = 0, a10 = 0, o2 = 0;
        for (let r11 = 0; r11 < n10; ++r11) {
          let n11 = t11.codes[e11[r11]];
          if (void 0 === n11) throw SyntaxError("Invalid character " + e11[r11]);
          a10 = a10 << t11.bits | n11, (s10 += t11.bits) >= 8 && (s10 -= 8, i10[o2++] = 255 & a10 >> s10);
        }
        if (s10 >= t11.bits || 255 & a10 << 8 - s10) throw SyntaxError("Unexpected end of data");
        return i10;
      }(e10, tB, t10) }, tB = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, tJ = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, tK = "RSASSA-PKCS1-v1_5", tW = { RS256: tK, RS384: tK, RS512: tK }, tF = Object.keys(tJ), tV = (e10) => Array.isArray(e10) && e10.length > 0 && e10.every((e11) => "string" == typeof e11), tX = (e10, t10) => {
        let r10 = [t10].flat().filter((e11) => !!e11), n10 = [e10].flat().filter((e11) => !!e11);
        if (r10.length > 0 && n10.length > 0) {
          if ("string" == typeof e10) {
            if (!r10.includes(e10)) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
          } else if (tV(e10) && !e10.some((e11) => r10.includes(e11))) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
        }
      }, tG = (e10) => {
        if (void 0 !== e10 && "JWT" !== e10) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenInvalid, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "JWT".` });
      }, tQ = (e10) => {
        if (!tF.includes(e10)) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenInvalidAlgorithm, message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${tF}.` });
      }, tY = (e10) => {
        if ("string" != typeof e10) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(e10)}.` });
      }, tZ = (e10, t10) => {
        if (e10 && t10 && 0 !== t10.length && !t10.includes(e10)) throw new tj({ reason: tU.TokenInvalidAuthorizedParties, message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(e10)}. Expected "${t10}".` });
      }, t0 = (e10, t10) => {
        if ("number" != typeof e10) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() <= r10.getTime() - t10) throw new tj({ reason: tU.TokenExpired, message: `JWT is expired. Expiry date: ${n10.toUTCString()}, Current date: ${r10.toUTCString()}.` });
      }, t1 = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new tj({ reason: tU.TokenNotActiveYet, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      }, t2 = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new tj({ reason: tU.TokenIatInTheFuture, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      };
      async function t5(e10, t10) {
        let { header: r10, signature: n10, raw: i10 } = e10, s10 = new TextEncoder().encode([i10.header, i10.payload].join(".")), a10 = function(e11) {
          let t11 = tJ[e11], r11 = tW[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${tF.join(",")}.`);
          return { hash: { name: tJ[e11] }, name: tW[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return tz.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let n11 = function(e13) {
              let t12 = tc(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, n12 = t12.length; e14 < n12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), i11 = "sign" === r11 ? "pkcs8" : "spki";
            return tz.crypto.subtle.importKey(i11, n11, t11, false, [r11]);
          }(t10, a10, "verify");
          return { data: await tz.crypto.subtle.verify(a10.name, e11, n10, s10) };
        } catch (e11) {
          return { errors: [new tj({ reason: tU.TokenInvalidSignature, message: e11?.message })] };
        }
      }
      function t4(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new tj({ reason: tU.TokenInvalid, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, n10, i10] = t10, s10 = new TextDecoder(), a10 = JSON.parse(s10.decode(t$.parse(r10, { loose: true }))), o2 = JSON.parse(s10.decode(t$.parse(n10, { loose: true })));
        return { data: { header: a10, payload: o2, signature: t$.parse(i10, { loose: true }), raw: { header: r10, payload: n10, signature: i10, text: e10 } } };
      }
      async function t3(e10, t10) {
        let { audience: r10, authorizedParties: n10, clockSkewInMs: i10, key: s10 } = t10, a10 = i10 || 5e3, { data: o2, errors: l2 } = t4(e10);
        if (l2) return { errors: l2 };
        let { header: c2, payload: u2 } = o2;
        try {
          let { typ: e11, alg: t11 } = c2;
          tG(e11), tQ(t11);
          let { azp: i11, sub: s11, aud: o3, iat: l3, exp: d3, nbf: h3 } = u2;
          tY(s11), tX([o3], [r10]), tZ(i11, n10), t0(d3, a10), t1(h3, a10), t2(l3, a10);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: d2, errors: h2 } = await t5(o2, s10);
        return h2 ? { errors: [new tj({ action: tq.EnsureClerkJWT, reason: tU.TokenVerificationFailed, message: `Error verifying JWT signature. ${h2[0]}` })] } : d2 ? { data: u2 } : { errors: [new tj({ reason: tU.TokenInvalidSignature, message: "JWT signature is invalid." })] };
      }
      var t6 = { strict_mfa: { afterMinutes: 10, level: "multi_factor" }, strict: { afterMinutes: 10, level: "second_factor" }, moderate: { afterMinutes: 60, level: "second_factor" }, lax: { afterMinutes: 1440, level: "second_factor" } }, t8 = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]), t9 = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]), t7 = (e10) => "number" == typeof e10 && e10 > 0, re = (e10) => t8.has(e10), rt = (e10) => t9.has(e10), rr = (e10) => e10.replace(/^(org:)*/, "org:"), rn = (e10, t10) => {
        let { orgId: r10, orgRole: n10, orgPermissions: i10 } = t10;
        return (e10.role || e10.permission) && r10 && n10 && i10 ? e10.permission ? i10.includes(rr(e10.permission)) : e10.role ? rr(n10) === rr(e10.role) : null : null;
      }, ri = (e10, t10) => {
        let { org: r10, user: n10 } = ra(e10), [i10, s10] = t10.split(":"), a10 = s10 || i10;
        return "org" === i10 ? r10.includes(a10) : "user" === i10 ? n10.includes(a10) : [...r10, ...n10].includes(a10);
      }, rs = (e10, t10) => {
        let { features: r10, plans: n10 } = t10;
        return e10.feature && r10 ? ri(r10, e10.feature) : e10.plan && n10 ? ri(n10, e10.plan) : null;
      }, ra = (e10) => {
        let t10 = e10 ? e10.split(",").map((e11) => e11.trim()) : [];
        return { org: t10.filter((e11) => e11.split(":")[0].includes("o")).map((e11) => e11.split(":")[1]), user: t10.filter((e11) => e11.split(":")[0].includes("u")).map((e11) => e11.split(":")[1]) };
      }, ro = (e10) => {
        if (!e10) return false;
        let t10 = "string" == typeof e10 && rt(e10), r10 = "object" == typeof e10 && re(e10.level) && t7(e10.afterMinutes);
        return (!!t10 || !!r10) && ((e11) => "string" == typeof e11 ? t6[e11] : e11).bind(null, e10);
      }, rl = (e10, { factorVerificationAge: t10 }) => {
        if (!e10.reverification || !t10) return null;
        let r10 = ro(e10.reverification);
        if (!r10) return null;
        let { level: n10, afterMinutes: i10 } = r10(), [s10, a10] = t10, o2 = -1 !== s10 ? i10 > s10 : null, l2 = -1 !== a10 ? i10 > a10 : null;
        switch (n10) {
          case "first_factor":
            return o2;
          case "second_factor":
            return -1 !== a10 ? l2 : o2;
          case "multi_factor":
            return -1 === a10 ? o2 : o2 && l2;
        }
      }, rc = (e10) => (t10) => {
        if (!e10.userId) return false;
        let r10 = rs(t10, e10), n10 = rn(t10, e10), i10 = rl(t10, e10);
        return [r10 || n10, i10].some((e11) => null === e11) ? [r10 || n10, i10].some((e11) => true === e11) : [r10 || n10, i10].every((e11) => true === e11);
      }, ru = ({ per: e10, fpm: t10 }) => {
        if (!e10 || !t10) return { permissions: [], featurePermissionMap: [] };
        let r10 = e10.split(",").map((e11) => e11.trim()), n10 = t10.split(",").map((e11) => Number.parseInt(e11.trim(), 10)).map((e11) => e11.toString(2).padStart(r10.length, "0").split("").map((e12) => Number.parseInt(e12, 10)).reverse()).filter(Boolean);
        return { permissions: r10, featurePermissionMap: n10 };
      }, rd = (e10) => {
        let t10, r10, n10, i10, s10 = e10.fva ?? null, a10 = e10.sts ?? null;
        if (2 === e10.v) {
          if (e10.o) {
            t10 = e10.o?.id, n10 = e10.o?.slg, e10.o?.rol && (r10 = `org:${e10.o?.rol}`);
            let { org: s11 } = ra(e10.fea), { permissions: a11, featurePermissionMap: o2 } = ru({ per: e10.o?.per, fpm: e10.o?.fpm });
            i10 = function({ features: e11, permissions: t11, featurePermissionMap: r11 }) {
              if (!e11 || !t11 || !r11) return [];
              let n11 = [];
              for (let i11 = 0; i11 < e11.length; i11++) {
                let s12 = e11[i11];
                if (i11 >= r11.length) continue;
                let a12 = r11[i11];
                if (a12) for (let e12 = 0; e12 < a12.length; e12++) 1 === a12[e12] && n11.push(`org:${s12}:${t11[e12]}`);
              }
              return n11;
            }({ features: s11, featurePermissionMap: o2, permissions: a11 });
          }
        } else t10 = e10.org_id, r10 = e10.org_role, n10 = e10.org_slug, i10 = e10.org_permissions;
        return { sessionClaims: e10, sessionId: e10.sid, sessionStatus: a10, actor: e10.act, userId: e10.sub, orgId: t10, orgRole: r10, orgSlug: n10, orgPermissions: i10, factorVerificationAge: s10 };
      }, rh = r(554);
      function rp(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function rf(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      var rm = "https://api.clerk.com", rg = "@clerk/backend@2.6.0", ry = "2025-04-10", rv = { Session: "__session", Refresh: "__refresh", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count", HandshakeNonce: "__clerk_handshake_nonce" }, rb = { ClerkSynced: "__clerk_synced", SuffixedCookies: "suffixed_cookies", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: rv.DevBrowser, Handshake: rv.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session", HandshakeReason: "__clerk_hs_reason", HandshakeNonce: rv.HandshakeNonce, HandshakeFormat: "format" }, r_ = { Cookies: rv, Headers: { Accept: "accept", AuthMessage: "x-clerk-auth-message", Authorization: "authorization", AuthReason: "x-clerk-auth-reason", AuthSignature: "x-clerk-auth-signature", AuthStatus: "x-clerk-auth-status", AuthToken: "x-clerk-auth-token", CacheControl: "cache-control", ClerkRedirectTo: "x-clerk-redirect-to", ClerkRequestData: "x-clerk-request-data", ClerkUrl: "x-clerk-clerk-url", CloudFrontForwardedProto: "cloudfront-forwarded-proto", ContentType: "content-type", ContentSecurityPolicy: "content-security-policy", ContentSecurityPolicyReportOnly: "content-security-policy-report-only", EnableDebug: "x-clerk-debug", ForwardedHost: "x-forwarded-host", ForwardedPort: "x-forwarded-port", ForwardedProto: "x-forwarded-proto", Host: "host", Location: "location", Nonce: "x-nonce", Origin: "origin", Referrer: "referer", SecFetchDest: "sec-fetch-dest", SecFetchSite: "sec-fetch-site", UserAgent: "user-agent", ReportingEndpoints: "reporting-endpoints" }, ContentTypes: { Json: "application/json" }, QueryParameters: rb }, rw = (e10, t10, r10, n10) => {
        if ("" === e10) return rk(t10.toString(), r10?.toString());
        let i10 = new URL(e10), s10 = r10 ? new URL(r10, i10) : void 0, a10 = new URL(t10, i10), o2 = `${i10.hostname}:${i10.port}` != `${a10.hostname}:${a10.port}`;
        return s10 && (o2 && s10.searchParams.delete(r_.QueryParameters.ClerkSynced), a10.searchParams.set("redirect_url", s10.toString())), o2 && n10 && a10.searchParams.set(r_.QueryParameters.DevBrowser, n10), a10.toString();
      }, rk = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let n10 = new URL(t10);
          r10 = new URL(e10, n10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      }, rS = (e10) => {
        let { publishableKey: t10, redirectAdapter: r10, signInUrl: n10, signUpUrl: i10, baseUrl: s10, sessionStatus: a10 } = e10, o2 = tv(t10), l2 = o2?.frontendApi, c2 = o2?.instanceType === "development", u2 = function(e11) {
          if (!e11) return "";
          let t11 = e11.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.");
          return `https://${t11}`;
        }(l2), d2 = "pending" === a10, h2 = (t11, { returnBackUrl: n11 }) => r10(rw(s10, `${t11}/tasks`, n11, c2 ? e10.devBrowserToken : null));
        return { redirectToSignUp: ({ returnBackUrl: t11 } = {}) => {
          i10 || u2 || tA.throwMissingPublishableKeyError();
          let a11 = `${u2}/sign-up`, o3 = i10 || function(e11) {
            if (!e11) return;
            let t12 = new URL(e11, s10);
            return t12.pathname = `${t12.pathname}/create`, t12.toString();
          }(n10) || a11;
          return d2 ? h2(o3, { returnBackUrl: t11 }) : r10(rw(s10, o3, t11, c2 ? e10.devBrowserToken : null));
        }, redirectToSignIn: ({ returnBackUrl: t11 } = {}) => {
          n10 || u2 || tA.throwMissingPublishableKeyError();
          let i11 = `${u2}/sign-in`, a11 = n10 || i11;
          return d2 ? h2(a11, { returnBackUrl: t11 }) : r10(rw(s10, a11, t11, c2 ? e10.devBrowserToken : null));
        } };
      };
      function rE(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      function rT(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var rx = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.originalFrontendApi = "", this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues(), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl;
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.tokenInHeader;
        }
        usesSuffixedCookies() {
          let e10 = this.getSuffixedCookie(r_.Cookies.ClientUat), t10 = this.getCookie(r_.Cookies.ClientUat), r10 = this.getSuffixedCookie(r_.Cookies.Session) || "", n10 = this.getCookie(r_.Cookies.Session) || "";
          if (n10 && !this.tokenHasIssuer(n10)) return false;
          if (n10 && !this.tokenBelongsToInstance(n10)) return true;
          if (!e10 && !r10) return false;
          let { data: i10 } = t4(n10), s10 = i10?.payload.iat || 0, { data: a10 } = t4(r10), o2 = a10?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && s10 > o2 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(a10);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        isCrossOriginReferrer() {
          if (!this.referrer || !this.origin) return false;
          try {
            if ("cross-site" === this.getHeader(r_.Headers.SecFetchSite)) return true;
            return new URL(this.referrer).origin !== this.origin;
          } catch {
            return false;
          }
        }
        initPublishableKeyValues(e10) {
          tv(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = tv(this.publishableKey, { fatal: true, domain: e10.domain, isSatellite: e10.isSatellite });
          this.originalFrontendApi = t10.frontendApi;
          let r10 = tv(this.publishableKey, { fatal: true, proxyUrl: e10.proxyUrl, domain: e10.domain, isSatellite: e10.isSatellite });
          this.instanceType = r10.instanceType, this.frontendApi = r10.frontendApi;
        }
        initHeaderValues() {
          this.tokenInHeader = this.parseAuthorizationHeader(this.getHeader(r_.Headers.Authorization)), this.origin = this.getHeader(r_.Headers.Origin), this.host = this.getHeader(r_.Headers.Host), this.forwardedHost = this.getHeader(r_.Headers.ForwardedHost), this.forwardedProto = this.getHeader(r_.Headers.CloudFrontForwardedProto) || this.getHeader(r_.Headers.ForwardedProto), this.referrer = this.getHeader(r_.Headers.Referrer), this.userAgent = this.getHeader(r_.Headers.UserAgent), this.secFetchDest = this.getHeader(r_.Headers.SecFetchDest), this.accept = this.getHeader(r_.Headers.Accept);
        }
        initCookieValues() {
          this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(r_.Cookies.Session), this.refreshTokenInCookie = this.getSuffixedCookie(r_.Cookies.Refresh), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(r_.Cookies.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(r_.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(r_.Cookies.DevBrowser), this.handshakeToken = this.getQueryParam(r_.QueryParameters.Handshake) || this.getCookie(r_.Cookies.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(r_.Cookies.RedirectCount)) || 0, this.handshakeNonce = this.getQueryParam(r_.QueryParameters.HandshakeNonce) || this.getCookie(r_.Cookies.HandshakeNonce);
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          return this.getCookie(tk(e10, this.cookieSuffix)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.usesSuffixedCookies() ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        parseAuthorizationHeader(e10) {
          if (!e10) return;
          let [t10, r10] = e10.split(" ", 2);
          return r10 ? "Bearer" === t10 ? r10 : void 0 : t10;
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = t4(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = t4(e10);
          if (r10) return false;
          let n10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.originalFrontendApi === n10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= (Date.now() / 1e3 | 0);
        }
      }, rC = async (e10, t10) => new rx(t10.publishableKey ? await tw(t10.publishableKey, tz.crypto.subtle) : "", e10, t10), rO = RegExp("(?<!:)/{1,}", "g");
      function rR(...e10) {
        return e10.filter((e11) => e11).join("/").replace(rO, "/");
      }
      var rI = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, rA = "/actor_tokens", rP = class extends rI {
        async create(e10) {
          return this.request({ method: "POST", path: rA, bodyParams: e10 });
        }
        async revoke(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(rA, e10, "revoke") });
        }
      }, rN = "/accountless_applications", rU = class extends rI {
        async createAccountlessApplication() {
          return this.request({ method: "POST", path: rN });
        }
        async completeAccountlessApplicationOnboarding() {
          return this.request({ method: "POST", path: rR(rN, "complete") });
        }
      }, rq = "/allowlist_identifiers", rj = class extends rI {
        async getAllowlistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rq, queryParams: { ...e10, paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: rq, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(rq, e10) });
        }
      }, rM = "/api_keys", rD = class extends rI {
        async create(e10) {
          return this.request({ method: "POST", path: rM, bodyParams: e10 });
        }
        async revoke(e10) {
          let { apiKeyId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(rM, t10, "revoke"), bodyParams: r10 });
        }
        async getSecret(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(rM, e10, "secret") });
        }
        async verifySecret(e10) {
          return this.request({ method: "POST", path: rR(rM, "verify"), bodyParams: { secret: e10 } });
        }
      }, rL = class extends rI {
        async changeDomain(e10) {
          return this.request({ method: "POST", path: rR("/beta_features", "change_domain"), bodyParams: e10 });
        }
      }, rH = "/blocklist_identifiers", rz = class extends rI {
        async getBlocklistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rH, queryParams: e10 });
        }
        async createBlocklistIdentifier(e10) {
          return this.request({ method: "POST", path: rH, bodyParams: e10 });
        }
        async deleteBlocklistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(rH, e10) });
        }
      }, r$ = "/clients", rB = class extends rI {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: r$, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(r$, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: rR(r$, "verify"), bodyParams: { token: e10 } });
        }
        async getHandshakePayload(e10) {
          return this.request({ method: "GET", path: rR(r$, "handshake_payload"), queryParams: e10 });
        }
      }, rJ = "/domains", rK = class extends rI {
        async list() {
          return this.request({ method: "GET", path: rJ });
        }
        async add(e10) {
          return this.request({ method: "POST", path: rJ, bodyParams: e10 });
        }
        async update(e10) {
          let { domainId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rR(rJ, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.deleteDomain(e10);
        }
        async deleteDomain(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(rJ, e10) });
        }
      }, rW = "/email_addresses", rF = class extends rI {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(rW, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: rW, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(rW, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(rW, e10) });
        }
      }, rV = class extends rI {
        async verifyAccessToken(e10) {
          return this.request({ method: "POST", path: rR("/oauth_applications/access_tokens", "verify"), bodyParams: { access_token: e10 } });
        }
      }, rX = "/instance", rG = class extends rI {
        async get() {
          return this.request({ method: "GET", path: rX });
        }
        async update(e10) {
          return this.request({ method: "PATCH", path: rX, bodyParams: e10 });
        }
        async updateRestrictions(e10) {
          return this.request({ method: "PATCH", path: rR(rX, "restrictions"), bodyParams: e10 });
        }
        async updateOrganizationSettings(e10) {
          return this.request({ method: "PATCH", path: rR(rX, "organization_settings"), bodyParams: e10 });
        }
      }, rQ = "/invitations", rY = class extends rI {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: rQ, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: rQ, bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(rQ, e10, "revoke") });
        }
      }, rZ = "/machines", r0 = class extends rI {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(rZ, e10) });
        }
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rZ, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rZ, bodyParams: e10 });
        }
        async update(e10) {
          let { machineId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rR(rZ, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(rZ, e10) });
        }
      }, r1 = class extends rI {
        async verifySecret(e10) {
          return this.request({ method: "POST", path: rR("/m2m_tokens", "verify"), bodyParams: { secret: e10 } });
        }
      }, r2 = class extends rI {
        async getJwks() {
          return this.request({ method: "GET", path: "/jwks" });
        }
      }, r5 = "/jwt_templates", r4 = class extends rI {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: r5, queryParams: { ...e10, paginated: true } });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(r5, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: r5, bodyParams: e10 });
        }
        async update(e10) {
          let { templateId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rR(r5, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(r5, e10) });
        }
      }, r3 = "/organizations", r6 = class extends rI {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: r3, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: r3, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let { includeMembersCount: t10 } = e10, r10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(r10), this.request({ method: "GET", path: rR(r3, r10), queryParams: { includeMembersCount: t10 } });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(r3, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new tz.FormData();
          return r10.append("file", t10?.file), t10?.uploaderUserId && r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: rR(r3, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(r3, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(r3, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: rR(r3, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rR(r3, t10, "memberships"), queryParams: r10 });
        }
        async getInstanceOrganizationMembershipList(e10) {
          return this.request({ method: "GET", path: "/organization_memberships", queryParams: e10 });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(r3, t10, "memberships"), bodyParams: r10 });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, ...n10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rR(r3, t10, "memberships", r10), bodyParams: n10 });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, ...n10 } = e10;
          return this.request({ method: "PATCH", path: rR(r3, t10, "memberships", r10, "metadata"), bodyParams: n10 });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: rR(r3, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rR(r3, t10, "invitations"), queryParams: r10 });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(r3, t10, "invitations"), bodyParams: r10 });
        }
        async createOrganizationInvitationBulk(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(r3, e10, "invitations", "bulk"), bodyParams: t10 });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: rR(r3, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, ...n10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(r3, t10, "invitations", r10, "revoke"), bodyParams: n10 });
        }
        async getOrganizationDomainList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rR(r3, t10, "domains"), queryParams: r10 });
        }
        async createOrganizationDomain(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(r3, t10, "domains"), bodyParams: { ...r10, verified: r10.verified ?? true } });
        }
        async updateOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10, ...n10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "PATCH", path: rR(r3, t10, "domains", r10), bodyParams: n10 });
        }
        async deleteOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "DELETE", path: rR(r3, t10, "domains", r10) });
        }
      }, r8 = "/oauth_applications", r9 = class extends rI {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: r8, queryParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(r8, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: r8, bodyParams: e10 });
        }
        async update(e10) {
          let { oauthApplicationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rR(r8, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(r8, e10) });
        }
        async rotateSecret(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(r8, e10, "rotate_secret") });
        }
      }, r7 = "/phone_numbers", ne = class extends rI {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(r7, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: r7, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(r7, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(r7, e10) });
        }
      }, nt = class extends rI {
        async verify(e10) {
          return this.request({ method: "POST", path: "/proxy_checks", bodyParams: e10 });
        }
      }, nr = "/redirect_urls", nn = class extends rI {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: nr, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(nr, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: nr, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(nr, e10) });
        }
      }, ni = "/saml_connections", ns = class extends rI {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: ni, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: ni, bodyParams: e10 });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(ni, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(ni, e10), bodyParams: t10 });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(ni, e10) });
        }
      }, na = "/sessions", no = class extends rI {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: na, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(na, e10) });
        }
        async createSession(e10) {
          return this.request({ method: "POST", path: na, bodyParams: e10 });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(na, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(na, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10, r10) {
          this.requireId(e10);
          let n10 = { method: "POST", path: t10 ? rR(na, e10, "tokens", t10) : rR(na, e10, "tokens") };
          return void 0 !== r10 && (n10.bodyParams = { expires_in_seconds: r10 }), this.request(n10);
        }
        async refreshSession(e10, t10) {
          this.requireId(e10);
          let { suffixed_cookies: r10, ...n10 } = t10;
          return this.request({ method: "POST", path: rR(na, e10, "refresh"), bodyParams: n10, queryParams: { suffixed_cookies: r10 } });
        }
      }, nl = "/sign_in_tokens", nc = class extends rI {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: nl, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(nl, e10, "revoke") });
        }
      }, nu = "/sign_ups", nd = class extends rI {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(nu, e10) });
        }
        async update(e10) {
          let { signUpAttemptId: t10, ...r10 } = e10;
          return this.request({ method: "PATCH", path: rR(nu, t10), bodyParams: r10 });
        }
      }, nh = class extends rI {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, np = "/users", nf = class extends rI {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: n10, ...i10 } = e10, [s10, a10] = await Promise.all([this.request({ method: "GET", path: np, queryParams: e10 }), this.getCount(i10)]);
          return { data: s10, totalCount: a10 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rR(np, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: np, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(np, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new tz.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: rR(np, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rR(np, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(np, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: rR(np, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          this.requireId(e10);
          let r10 = t10.startsWith("oauth_"), n10 = r10 ? t10 : `oauth_${t10}`;
          return r10 && tx("getUserOauthAccessToken(userId, provider)", "Remove the `oauth_` prefix from the `provider` argument."), this.request({ method: "GET", path: rR(np, e10, "oauth_access_tokens", n10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(np, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: n10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rR(np, t10, "organization_memberships"), queryParams: { limit: r10, offset: n10 } });
        }
        async getOrganizationInvitationList(e10) {
          let { userId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rR(np, t10, "organization_invitations"), queryParams: r10 });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(np, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rR(np, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(np, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(np, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(np, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rR(np, e10, "unlock") });
        }
        async deleteUserProfileImage(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(np, e10, "profile_image") });
        }
        async deleteUserPasskey(e10) {
          return this.requireId(e10.userId), this.requireId(e10.passkeyIdentificationId), this.request({ method: "DELETE", path: rR(np, e10.userId, "passkeys", e10.passkeyIdentificationId) });
        }
        async deleteUserWeb3Wallet(e10) {
          return this.requireId(e10.userId), this.requireId(e10.web3WalletIdentificationId), this.request({ method: "DELETE", path: rR(np, e10.userId, "web3_wallets", e10.web3WalletIdentificationId) });
        }
        async deleteUserExternalAccount(e10) {
          return this.requireId(e10.userId), this.requireId(e10.externalAccountId), this.request({ method: "DELETE", path: rR(np, e10.userId, "external_accounts", e10.externalAccountId) });
        }
        async deleteUserBackupCodes(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(np, e10, "backup_code") });
        }
        async deleteUserTOTP(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rR(np, e10, "totp") });
        }
      }, nm = "/waitlist_entries", ng = class extends rI {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: nm, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: nm, bodyParams: e10 });
        }
      }, ny = "/webhooks", nv = class extends rI {
        async createSvixApp() {
          return this.request({ method: "POST", path: rR(ny, "svix") });
        }
        async generateSvixAuthURL() {
          return this.request({ method: "POST", path: rR(ny, "svix_url") });
        }
        async deleteSvixApp() {
          return this.request({ method: "DELETE", path: rR(ny, "svix") });
        }
      }, nb = (e10) => "object" == typeof e10 && null !== e10, n_ = (e10) => nb(e10) && !(e10 instanceof RegExp) && !(e10 instanceof Error) && !(e10 instanceof Date) && !(globalThis.Blob && e10 instanceof globalThis.Blob), nw = Symbol("mapObjectSkip"), nk = (e10, t10, r10, n10 = /* @__PURE__ */ new WeakMap()) => {
        if (r10 = { deep: false, target: {}, ...r10 }, n10.has(e10)) return n10.get(e10);
        n10.set(e10, r10.target);
        let { target: i10 } = r10;
        delete r10.target;
        let s10 = (e11) => e11.map((e12) => n_(e12) ? nk(e12, t10, r10, n10) : e12);
        if (Array.isArray(e10)) return s10(e10);
        for (let [a10, o2] of Object.entries(e10)) {
          let l2 = t10(a10, o2, e10);
          if (l2 === nw) continue;
          let [c2, u2, { shouldRecurse: d2 = true } = {}] = l2;
          "__proto__" !== c2 && (r10.deep && d2 && n_(u2) && (u2 = Array.isArray(u2) ? s10(u2) : nk(u2, t10, r10, n10)), i10[c2] = u2);
        }
        return i10;
      };
      function nS(e10, t10, r10) {
        if (!nb(e10)) throw TypeError(`Expected an object, got \`${e10}\` (${typeof e10})`);
        if (Array.isArray(e10)) throw TypeError("Expected an object, got an array");
        return nk(e10, t10, r10);
      }
      var nE = /([\p{Ll}\d])(\p{Lu})/gu, nT = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu, nx = /(\d)\p{Ll}|(\p{L})\d/u, nC = /[^\p{L}\d]+/giu, nO = "$1\0$2";
      function nR(e10) {
        let t10 = e10.trim();
        t10 = (t10 = t10.replace(nE, nO).replace(nT, nO)).replace(nC, "\0");
        let r10 = 0, n10 = t10.length;
        for (; "\0" === t10.charAt(r10); ) r10++;
        if (r10 === n10) return [];
        for (; "\0" === t10.charAt(n10 - 1); ) n10--;
        return t10.slice(r10, n10).split(/\0/g);
      }
      function nI(e10) {
        let t10 = nR(e10);
        for (let e11 = 0; e11 < t10.length; e11++) {
          let r10 = t10[e11], n10 = nx.exec(r10);
          if (n10) {
            let i10 = n10.index + (n10[1] ?? n10[2]).length;
            t10.splice(e11, 1, r10.slice(0, i10), r10.slice(i10));
          }
        }
        return t10;
      }
      function nA(e10, t10) {
        var r10, n10 = { delimiter: "_", ...t10 };
        let [i10, s10, a10] = function(e11, t11 = {}) {
          let r11 = t11.split ?? (t11.separateNumbers ? nI : nR), n11 = t11.prefixCharacters ?? "", i11 = t11.suffixCharacters ?? "", s11 = 0, a11 = e11.length;
          for (; s11 < e11.length; ) {
            let t12 = e11.charAt(s11);
            if (!n11.includes(t12)) break;
            s11++;
          }
          for (; a11 > s11; ) {
            let t12 = a11 - 1, r12 = e11.charAt(t12);
            if (!i11.includes(r12)) break;
            a11 = t12;
          }
          return [e11.slice(0, s11), r11(e11.slice(s11, a11)), e11.slice(a11)];
        }(e10, n10);
        return i10 + s10.map(false === (r10 = n10?.locale) ? (e11) => e11.toLowerCase() : (e11) => e11.toLocaleLowerCase(r10)).join(n10?.delimiter ?? " ") + a10;
      }
      var nP = {}.constructor;
      function nN(e10, t10) {
        return e10.some((e11) => "string" == typeof e11 ? e11 === t10 : e11.test(t10));
      }
      function nU(e10, t10, r10) {
        return r10.shouldRecurse ? { shouldRecurse: r10.shouldRecurse(e10, t10) } : void 0;
      }
      var nq = function(e10, t10) {
        if (Array.isArray(e10)) {
          if (e10.some((e11) => e11.constructor !== nP)) throw Error("obj must be array of plain objects");
          let r11 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => nA(e11, t10.parsingOptions));
          return e10.map((e11) => nS(e11, (e12, n10) => [nN(t10.exclude, e12) ? e12 : r11(e12), n10, nU(e12, n10, t10)], t10));
        }
        if (e10.constructor !== nP) throw Error("obj must be an plain object");
        let r10 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => nA(e11, t10.parsingOptions));
        return nS(e10, (e11, n10) => [nN(t10.exclude, e11) ? e11 : r10(e11), n10, nU(e11, n10, t10)], t10);
      }, nj = class e10 {
        constructor(e11, t10, r10, n10) {
          this.publishableKey = e11, this.secretKey = t10, this.claimUrl = r10, this.apiKeysUrl = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.publishable_key, t10.secret_key, t10.claim_url, t10.api_keys_url);
        }
      }, nM = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.status = t10, this.userId = r10, this.actor = n10, this.token = i10, this.url = s10, this.createdAt = a10, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.user_id, t10.actor, t10.token, t10.url, t10.created_at, t10.updated_at);
        }
      }, nD = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = n10, this.updatedAt = i10, this.instanceId = s10, this.invitationId = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id, t10.invitation_id);
        }
      }, nL = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2) {
          this.id = e11, this.type = t10, this.name = r10, this.subject = n10, this.scopes = i10, this.claims = s10, this.revoked = a10, this.revocationReason = o2, this.expired = l2, this.expiration = c2, this.createdBy = u2, this.description = d2, this.lastUsedAt = h2, this.createdAt = p2, this.updatedAt = f2, this.secret = m2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type, t10.name, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_by, t10.description, t10.last_used_at, t10.created_at, t10.updated_at, t10.secret);
        }
      }, nH = class e10 {
        constructor(e11, t10, r10, n10, i10, s10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = n10, this.updatedAt = i10, this.instanceId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id);
        }
      }, nz = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.isMobile = t10, this.ipAddress = r10, this.city = n10, this.country = i10, this.browserVersion = s10, this.browserName = a10, this.deviceType = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.is_mobile, t10.ip_address, t10.city, t10.country, t10.browser_version, t10.browser_name, t10.device_type);
        }
      }, n$ = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2 = null) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = n10, this.lastActiveAt = i10, this.expireAt = s10, this.abandonAt = a10, this.createdAt = o2, this.updatedAt = l2, this.lastActiveOrganizationId = c2, this.latestActivity = u2, this.actor = d2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at, t10.last_active_organization_id, t10.latest_activity && nz.fromJSON(t10.latest_activity), t10.actor);
        }
      }, nB = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = n10, this.signUpId = i10, this.lastActiveSessionId = s10, this.createdAt = a10, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => n$.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.created_at, t10.updated_at);
        }
      }, nJ = class e10 {
        constructor(e11, t10, r10) {
          this.host = e11, this.value = t10, this.required = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.host, t10.value, t10.required);
        }
      }, nK = class e10 {
        constructor(e11) {
          this.cookies = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.cookies);
        }
      }, nW = class e10 {
        constructor(e11, t10, r10, n10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, nF = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.name = t10, this.isSatellite = r10, this.frontendApiUrl = n10, this.developmentOrigin = i10, this.cnameTargets = s10, this.accountsPortalUrl = a10, this.proxyUrl = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.is_satellite, t10.frontend_api_url, t10.development_origin, t10.cname_targets && t10.cname_targets.map((e11) => nJ.fromJSON(e11)), t10.accounts_portal_url, t10.proxy_url);
        }
      }, nV = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = n10, this.subject = i10, this.body = s10, this.bodyPlain = a10, this.status = o2, this.slug = l2, this.data = c2, this.deliveredByClerk = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, nX = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, nG = class e10 {
        constructor(e11, t10, r10 = null, n10 = null, i10 = null, s10 = null, a10 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = n10, this.expireAt = i10, this.nonce = s10, this.message = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, nQ = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && nG.fromJSON(t10.verification), t10.linked_to.map((e11) => nX.fromJSON(e11)));
        }
      }, nY = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2 = {}, h2, p2) {
          this.id = e11, this.provider = t10, this.identificationId = r10, this.externalId = n10, this.approvedScopes = i10, this.emailAddress = s10, this.firstName = a10, this.lastName = o2, this.imageUrl = l2, this.username = c2, this.phoneNumber = u2, this.publicMetadata = d2, this.label = h2, this.verification = p2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.phone_number, t10.public_metadata, t10.label, t10.verification && nG.fromJSON(t10.verification));
        }
      }, nZ = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2) {
          this.id = e11, this.clientId = t10, this.type = r10, this.subject = n10, this.scopes = i10, this.revoked = s10, this.revocationReason = a10, this.expired = o2, this.expiration = l2, this.createdAt = c2, this.updatedAt = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.type, t10.subject, t10.scopes, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at);
        }
      }, n0 = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.environmentType = t10, this.allowedOrigins = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.environment_type, t10.allowed_origins);
        }
      }, n1 = class e10 {
        constructor(e11, t10, r10, n10, i10) {
          this.allowlist = e11, this.blocklist = t10, this.blockEmailSubaddresses = r10, this.blockDisposableEmailDomains = n10, this.ignoreDotsForGmailAddresses = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.allowlist, t10.blocklist, t10.block_email_subaddresses, t10.block_disposable_email_domains, t10.ignore_dots_for_gmail_addresses);
        }
      }, n2 = class e10 {
        constructor(e11, t10, r10, n10, i10) {
          this.id = e11, this.restrictedToAllowlist = t10, this.fromEmailAddress = r10, this.progressiveSignUp = n10, this.enhancedEmailDeliverability = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.restricted_to_allowlist, t10.from_email_address, t10.progressive_sign_up, t10.enhanced_email_deliverability);
        }
      }, n5 = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = n10, this.updatedAt = i10, this.status = s10, this.url = a10, this.revoked = o2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.url, t10.revoked);
          return r10._raw = t10, r10;
        }
      }, n4 = { AccountlessApplication: "accountless_application", ActorToken: "actor_token", AllowlistIdentifier: "allowlist_identifier", ApiKey: "api_key", BlocklistIdentifier: "blocklist_identifier", Client: "client", Cookies: "cookies", Domain: "domain", Email: "email", EmailAddress: "email_address", Instance: "instance", InstanceRestrictions: "instance_restrictions", InstanceSettings: "instance_settings", Invitation: "invitation", Machine: "machine", MachineToken: "machine_to_machine_token", JwtTemplate: "jwt_template", OauthAccessToken: "oauth_access_token", IdpOAuthAccessToken: "clerk_idp_oauth_access_token", OAuthApplication: "oauth_application", Organization: "organization", OrganizationInvitation: "organization_invitation", OrganizationMembership: "organization_membership", OrganizationSettings: "organization_settings", PhoneNumber: "phone_number", ProxyCheck: "proxy_check", RedirectUrl: "redirect_url", SamlConnection: "saml_connection", Session: "session", SignInToken: "sign_in_token", SignUpAttempt: "sign_up_attempt", SmsMessage: "sms_message", User: "user", WaitlistEntry: "waitlist_entry", Token: "token", TotalCount: "total_count" }, n3 = class e10 {
        constructor(e11, t10, r10, n10, i10) {
          this.id = e11, this.name = t10, this.instanceId = r10, this.createdAt = n10, this.updatedAt = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.instance_id, t10.created_at, t10.updated_at);
        }
      }, n6 = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2) {
          this.id = e11, this.name = t10, this.subject = r10, this.scopes = n10, this.claims = i10, this.revoked = s10, this.revocationReason = a10, this.expired = o2, this.expiration = l2, this.createdBy = c2, this.creationReason = u2, this.createdAt = d2, this.updatedAt = h2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_by, t10.creation_reason, t10.created_at, t10.updated_at);
        }
      }, n8 = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2) {
          this.id = e11, this.name = t10, this.claims = r10, this.lifetime = n10, this.allowedClockSkew = i10, this.customSigningKey = s10, this.signingAlgorithm = a10, this.createdAt = o2, this.updatedAt = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.claims, t10.lifetime, t10.allowed_clock_skew, t10.custom_signing_key, t10.signing_algorithm, t10.created_at, t10.updated_at);
        }
      }, n9 = class e10 {
        constructor(e11, t10, r10, n10 = {}, i10, s10, a10, o2) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = n10, this.label = i10, this.scopes = s10, this.tokenSecret = a10, this.expiresAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret, t10.expires_at);
        }
      }, n7 = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2) {
          this.id = e11, this.instanceId = t10, this.name = r10, this.clientId = n10, this.isPublic = i10, this.scopes = s10, this.redirectUris = a10, this.authorizeUrl = o2, this.tokenFetchUrl = l2, this.userInfoUrl = c2, this.discoveryUrl = u2, this.tokenIntrospectionUrl = d2, this.createdAt = h2, this.updatedAt = p2, this.clientSecret = f2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.instance_id, t10.name, t10.client_id, t10.public, t10.scopes, t10.redirect_uris, t10.authorize_url, t10.token_fetch_url, t10.user_info_url, t10.discovery_url, t10.token_introspection_url, t10.created_at, t10.updated_at, t10.client_secret);
        }
      }, ie = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2 = {}, l2 = {}, c2, u2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = n10, this.hasImage = i10, this.createdAt = s10, this.updatedAt = a10, this.publicMetadata = o2, this.privateMetadata = l2, this.maxAllowedMemberships = c2, this.adminDeleteEnabled = u2, this.membersCount = d2, this.createdBy = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count, t10.created_by);
          return r10._raw = t10, r10;
        }
      }, it = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2 = {}, d2 = {}, h2) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.roleName = n10, this.organizationId = i10, this.createdAt = s10, this.updatedAt = a10, this.expiresAt = o2, this.url = l2, this.status = c2, this.publicMetadata = u2, this.privateMetadata = d2, this.publicOrganizationData = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.role, t10.role_name, t10.organization_id, t10.created_at, t10.updated_at, t10.expires_at, t10.url, t10.status, t10.public_metadata, t10.private_metadata, t10.public_organization_data);
          return r10._raw = t10, r10;
        }
      }, ir = class e10 {
        constructor(e11, t10, r10, n10 = {}, i10 = {}, s10, a10, o2, l2) {
          this.id = e11, this.role = t10, this.permissions = r10, this.publicMetadata = n10, this.privateMetadata = i10, this.createdAt = s10, this.updatedAt = a10, this.organization = o2, this.publicUserData = l2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.role, t10.permissions, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, ie.fromJSON(t10.organization), ii.fromJSON(t10.public_user_data));
          return r10._raw = t10, r10;
        }
      }, ii = class e10 {
        constructor(e11, t10, r10, n10, i10, s10) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = n10, this.hasImage = i10, this.userId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, is = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2) {
          this.enabled = e11, this.maxAllowedMemberships = t10, this.maxAllowedRoles = r10, this.maxAllowedPermissions = n10, this.creatorRole = i10, this.adminDeleteEnabled = s10, this.domainsEnabled = a10, this.domainsEnrollmentModes = o2, this.domainsDefaultRole = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.enabled, t10.max_allowed_memberships, t10.max_allowed_roles, t10.max_allowed_permissions, t10.creator_role, t10.admin_delete_enabled, t10.domains_enabled, t10.domains_enrollment_modes, t10.domains_default_role);
        }
      }, ia = class e10 {
        constructor(e11, t10, r10, n10, i10, s10) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = n10, this.verification = i10, this.linkedTo = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && nG.fromJSON(t10.verification), t10.linked_to.map((e11) => nX.fromJSON(e11)));
        }
      }, io = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.domainId = t10, this.lastRunAt = r10, this.proxyUrl = n10, this.successful = i10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.domain_id, t10.last_run_at, t10.proxy_url, t10.successful, t10.created_at, t10.updated_at);
        }
      }, il = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, ic = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, v2, b2, _2) {
          this.id = e11, this.name = t10, this.domain = r10, this.organizationId = n10, this.idpEntityId = i10, this.idpSsoUrl = s10, this.idpCertificate = a10, this.idpMetadataUrl = o2, this.idpMetadata = l2, this.acsUrl = c2, this.spEntityId = u2, this.spMetadataUrl = d2, this.active = h2, this.provider = p2, this.userCount = f2, this.syncUserAttributes = m2, this.allowSubdomains = g2, this.allowIdpInitiated = y2, this.createdAt = v2, this.updatedAt = b2, this.attributeMapping = _2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.organization_id, t10.idp_entity_id, t10.idp_sso_url, t10.idp_certificate, t10.idp_metadata_url, t10.idp_metadata, t10.acs_url, t10.sp_entity_id, t10.sp_metadata_url, t10.active, t10.provider, t10.user_count, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at, t10.attribute_mapping && id.fromJSON(t10.attribute_mapping));
        }
      }, iu = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2) {
          this.id = e11, this.name = t10, this.domain = r10, this.active = n10, this.provider = i10, this.syncUserAttributes = s10, this.allowSubdomains = a10, this.allowIdpInitiated = o2, this.createdAt = l2, this.updatedAt = c2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.active, t10.provider, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at);
        }
      }, id = class e10 {
        constructor(e11, t10, r10, n10) {
          this.userId = e11, this.emailAddress = t10, this.firstName = r10, this.lastName = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.user_id, t10.email_address, t10.first_name, t10.last_name);
        }
      }, ih = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.active = n10, this.emailAddress = i10, this.firstName = s10, this.lastName = a10, this.verification = o2, this.samlConnection = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.active, t10.email_address, t10.first_name, t10.last_name, t10.verification && nG.fromJSON(t10.verification), t10.saml_connection && iu.fromJSON(t10.saml_connection));
        }
      }, ip = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = n10, this.url = i10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, im = class e10 {
        constructor(e11, t10) {
          this.nextAction = e11, this.supportedStrategies = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.next_action, t10.supported_strategies);
        }
      }, ig = class e10 {
        constructor(e11, t10, r10, n10) {
          this.emailAddress = e11, this.phoneNumber = t10, this.web3Wallet = r10, this.externalAccount = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.email_address && im.fromJSON(t10.email_address), t10.phone_number && im.fromJSON(t10.phone_number), t10.web3_wallet && im.fromJSON(t10.web3_wallet), t10.external_account);
        }
      }, iy = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, v2, b2, _2, w2) {
          this.id = e11, this.status = t10, this.requiredFields = r10, this.optionalFields = n10, this.missingFields = i10, this.unverifiedFields = s10, this.verifications = a10, this.username = o2, this.emailAddress = l2, this.phoneNumber = c2, this.web3Wallet = u2, this.passwordEnabled = d2, this.firstName = h2, this.lastName = p2, this.customAction = f2, this.externalId = m2, this.createdSessionId = g2, this.createdUserId = y2, this.abandonAt = v2, this.legalAcceptedAt = b2, this.publicMetadata = _2, this.unsafeMetadata = w2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.required_fields, t10.optional_fields, t10.missing_fields, t10.unverified_fields, t10.verifications ? ig.fromJSON(t10.verifications) : null, t10.username, t10.email_address, t10.phone_number, t10.web3_wallet, t10.password_enabled, t10.first_name, t10.last_name, t10.custom_action, t10.external_id, t10.created_session_id, t10.created_user_id, t10.abandon_at, t10.legal_accepted_at, t10.public_metadata, t10.unsafe_metadata);
        }
      }, iv = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = n10, this.status = i10, this.phoneNumberId = s10, this.data = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, ib = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, i_ = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && nG.fromJSON(t10.verification));
        }
      }, iw = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, v2, b2 = {}, _2 = {}, w2 = {}, k2 = [], S2 = [], E2 = [], T2 = [], x2 = [], C2, O2, R2 = null, I2, A2) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = n10, this.twoFactorEnabled = i10, this.banned = s10, this.locked = a10, this.createdAt = o2, this.updatedAt = l2, this.imageUrl = c2, this.hasImage = u2, this.primaryEmailAddressId = d2, this.primaryPhoneNumberId = h2, this.primaryWeb3WalletId = p2, this.lastSignInAt = f2, this.externalId = m2, this.username = g2, this.firstName = y2, this.lastName = v2, this.publicMetadata = b2, this.privateMetadata = _2, this.unsafeMetadata = w2, this.emailAddresses = k2, this.phoneNumbers = S2, this.web3Wallets = E2, this.externalAccounts = T2, this.samlAccounts = x2, this.lastActiveAt = C2, this.createOrganizationEnabled = O2, this.createOrganizationsLimit = R2, this.deleteSelfEnabled = I2, this.legalAcceptedAt = A2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => nQ.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => ia.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => i_.fromJSON(e11)), (t10.external_accounts || []).map((e11) => nY.fromJSON(e11)), (t10.saml_accounts || []).map((e11) => ih.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit, t10.delete_self_enabled, t10.legal_accepted_at);
          return r10._raw = t10, r10;
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      }, ik = class e10 {
        constructor(e11, t10, r10, n10, i10, s10, a10) {
          this.id = e11, this.emailAddress = t10, this.status = r10, this.invitation = n10, this.createdAt = i10, this.updatedAt = s10, this.isLocked = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.status, t10.invitation && n5.fromJSON(t10.invitation), t10.created_at, t10.updated_at, t10.is_locked);
        }
      };
      function iS(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return nW.fromJSON(e10);
        switch (e10.object) {
          case n4.AccountlessApplication:
            return nj.fromJSON(e10);
          case n4.ActorToken:
            return nM.fromJSON(e10);
          case n4.AllowlistIdentifier:
            return nD.fromJSON(e10);
          case n4.ApiKey:
            return nL.fromJSON(e10);
          case n4.BlocklistIdentifier:
            return nH.fromJSON(e10);
          case n4.Client:
            return nB.fromJSON(e10);
          case n4.Cookies:
            return nK.fromJSON(e10);
          case n4.Domain:
            return nF.fromJSON(e10);
          case n4.EmailAddress:
            return nQ.fromJSON(e10);
          case n4.Email:
            return nV.fromJSON(e10);
          case n4.IdpOAuthAccessToken:
            return nZ.fromJSON(e10);
          case n4.Instance:
            return n0.fromJSON(e10);
          case n4.InstanceRestrictions:
            return n1.fromJSON(e10);
          case n4.InstanceSettings:
            return n2.fromJSON(e10);
          case n4.Invitation:
            return n5.fromJSON(e10);
          case n4.JwtTemplate:
            return n8.fromJSON(e10);
          case n4.Machine:
            return n3.fromJSON(e10);
          case n4.MachineToken:
            return n6.fromJSON(e10);
          case n4.OauthAccessToken:
            return n9.fromJSON(e10);
          case n4.OAuthApplication:
            return n7.fromJSON(e10);
          case n4.Organization:
            return ie.fromJSON(e10);
          case n4.OrganizationInvitation:
            return it.fromJSON(e10);
          case n4.OrganizationMembership:
            return ir.fromJSON(e10);
          case n4.OrganizationSettings:
            return is.fromJSON(e10);
          case n4.PhoneNumber:
            return ia.fromJSON(e10);
          case n4.ProxyCheck:
            return io.fromJSON(e10);
          case n4.RedirectUrl:
            return il.fromJSON(e10);
          case n4.SamlConnection:
            return ic.fromJSON(e10);
          case n4.SignInToken:
            return ip.fromJSON(e10);
          case n4.SignUpAttempt:
            return iy.fromJSON(e10);
          case n4.Session:
            return n$.fromJSON(e10);
          case n4.SmsMessage:
            return iv.fromJSON(e10);
          case n4.Token:
            return ib.fromJSON(e10);
          case n4.TotalCount:
            return e10.total_count;
          case n4.User:
            return iw.fromJSON(e10);
          case n4.WaitlistEntry:
            return ik.fromJSON(e10);
          default:
            return e10;
        }
      }
      function iE(e10) {
        var t10;
        return t10 = async (t11) => {
          let r10, { secretKey: n10, requireSecretKey: i10 = true, apiUrl: s10 = rm, apiVersion: a10 = "v1", userAgent: o2 = rg, skipApiVersionInUrl: l2 = false } = e10, { path: c2, method: u2, queryParams: d2, headerParams: h2, bodyParams: p2, formData: f2 } = t11;
          i10 && rT(n10);
          let m2 = new URL(l2 ? rR(s10, c2) : rR(s10, a10, c2));
          if (d2) for (let [e11, t12] of Object.entries(nq({ ...d2 }))) t12 && [t12].flat().forEach((t13) => m2.searchParams.append(e11, t13));
          let g2 = new Headers({ "Clerk-API-Version": ry, "User-Agent": o2, ...h2 });
          n10 && g2.set("Authorization", `Bearer ${n10}`);
          try {
            var y2;
            f2 ? r10 = await tz.fetch(m2.href, { method: u2, headers: g2, body: f2 }) : (g2.set("Content-Type", "application/json"), r10 = await tz.fetch(m2.href, { method: u2, headers: g2, ...(() => {
              if (!("GET" !== u2 && p2 && Object.keys(p2).length > 0)) return null;
              let e12 = (e13) => nq(e13, { deep: false });
              return { body: JSON.stringify(Array.isArray(p2) ? p2.map(e12) : e12(p2)) };
            })() }));
            let e11 = r10?.headers && r10.headers?.get(r_.Headers.ContentType) === r_.ContentTypes.Json, t12 = await (e11 ? r10.json() : r10.text());
            if (!r10.ok) return { data: null, errors: iC(t12), status: r10?.status, statusText: r10?.statusText, clerkTraceId: iT(t12, r10?.headers), retryAfter: ix(r10?.headers) };
            return { ...Array.isArray(t12) ? { data: t12.map((e12) => iS(e12)) } : (y2 = t12) && "object" == typeof y2 && "data" in y2 && Array.isArray(y2.data) && void 0 !== y2.data ? { data: t12.data.map((e12) => iS(e12)), totalCount: t12.total_count } : { data: iS(t12) }, errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: iT(e11, r10?.headers) };
            return { data: null, errors: iC(e11), status: r10?.status, statusText: r10?.statusText, clerkTraceId: iT(e11, r10?.headers), retryAfter: ix(r10?.headers) };
          }
        }, async (...e11) => {
          let { data: r10, errors: n10, totalCount: i10, status: s10, statusText: a10, clerkTraceId: o2, retryAfter: l2 } = await t10(...e11);
          if (n10) {
            let e12 = new tO(a10 || "", { data: [], status: s10, clerkTraceId: o2, retryAfter: l2 });
            throw e12.errors = n10, e12;
          }
          return void 0 !== i10 ? { data: r10, totalCount: i10 } : r10;
        };
      }
      function iT(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function ix(e10) {
        let t10 = e10?.get("Retry-After");
        if (!t10) return;
        let r10 = parseInt(t10, 10);
        if (!isNaN(r10)) return r10;
      }
      function iC(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(tC) : [];
        }
        return [];
      }
      function iO(e10) {
        let t10 = iE(e10);
        return { __experimental_accountlessApplications: new rU(iE({ ...e10, requireSecretKey: false })), actorTokens: new rP(t10), allowlistIdentifiers: new rj(t10), apiKeys: new rD(iE({ ...e10, skipApiVersionInUrl: true })), betaFeatures: new rL(t10), blocklistIdentifiers: new rz(t10), clients: new rB(t10), domains: new rK(t10), emailAddresses: new rF(t10), idPOAuthAccessToken: new rV(iE({ ...e10, skipApiVersionInUrl: true })), instance: new rG(t10), invitations: new rY(t10), jwks: new r2(t10), jwtTemplates: new r4(t10), machines: new r0(t10), machineTokens: new r1(iE({ ...e10, skipApiVersionInUrl: true })), oauthApplications: new r9(t10), organizations: new r6(t10), phoneNumbers: new ne(t10), proxyChecks: new nt(t10), redirectUrls: new nn(t10), samlConnections: new ns(t10), sessions: new no(t10), signInTokens: new nc(t10), signUps: new nd(t10), testingTokens: new nh(t10), users: new nf(t10), waitlistEntries: new ng(t10), webhooks: new nv(t10) };
      }
      var iR = { SessionToken: "session_token", ApiKey: "api_key", MachineToken: "machine_token", OAuthToken: "oauth_token" }, iI = "oat_", iA = ["mt_", iI, "ak_"];
      function iP(e10) {
        return iA.some((t10) => e10.startsWith(t10));
      }
      function iN(e10) {
        if (e10.startsWith("mt_")) return iR.MachineToken;
        if (e10.startsWith(iI)) return iR.OAuthToken;
        if (e10.startsWith("ak_")) return iR.ApiKey;
        throw Error("Unknown machine token type");
      }
      var iU = (e10, t10) => !!e10 && ("any" === t10 || (Array.isArray(t10) ? t10 : [t10]).includes(e10)), iq = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      };
      function ij(e10, t10) {
        return { tokenType: iR.SessionToken, sessionClaims: null, sessionId: null, sessionStatus: t10 ?? null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, factorVerificationAge: null, getToken: () => Promise.resolve(null), has: () => false, debug: iq(e10), isAuthenticated: false };
      }
      function iM(e10, t10) {
        let r10 = { id: null, subject: null, scopes: null, has: () => false, getToken: () => Promise.resolve(null), debug: iq(t10), isAuthenticated: false };
        switch (e10) {
          case iR.ApiKey:
            return { ...r10, tokenType: e10, name: null, claims: null, scopes: null, userId: null, orgId: null };
          case iR.MachineToken:
            return { ...r10, tokenType: e10, name: null, claims: null, scopes: null, machineId: null };
          case iR.OAuthToken:
            return { ...r10, tokenType: e10, scopes: null, userId: null, clientId: null };
          default:
            throw Error(`Invalid token type: ${e10}`);
        }
      }
      function iD() {
        return { isAuthenticated: false, tokenType: null, getToken: () => Promise.resolve(null), has: () => false, debug: () => ({}) };
      }
      var iL = (e10) => {
        let { debug: t10, getToken: r10, has: n10, ...i10 } = e10;
        return i10;
      }, iH = (e10) => {
        let { fetcher: t10, sessionToken: r10, sessionId: n10 } = e10 || {};
        return async (e11 = {}) => n10 ? e11.template || void 0 !== e11.expiresInSeconds ? t10(n10, e11.template, e11.expiresInSeconds) : r10 : null;
      }, iz = ({ authObject: e10, acceptsToken: t10 = iR.SessionToken }) => "any" === t10 ? e10 : Array.isArray(t10) ? iU(e10.tokenType, t10) ? e10 : iD() : iU(e10.tokenType, t10) ? e10 : !function(e11) {
        return e11 === iR.ApiKey || e11 === iR.MachineToken || e11 === iR.OAuthToken;
      }(t10) ? ij(e10.debug) : iM(t10, e10.debug), i$ = { SignedIn: "signed-in", SignedOut: "signed-out", Handshake: "handshake" }, iB = { ClientUATWithoutSessionToken: "client-uat-but-no-session-token", DevBrowserMissing: "dev-browser-missing", DevBrowserSync: "dev-browser-sync", PrimaryRespondsToSyncing: "primary-responds-to-syncing", PrimaryDomainCrossOriginSync: "primary-domain-cross-origin-sync", SatelliteCookieNeedsSyncing: "satellite-needs-syncing", SessionTokenAndUATMissing: "session-token-and-uat-missing", SessionTokenMissing: "session-token-missing", SessionTokenExpired: "session-token-expired", SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat", SessionTokenNBF: "session-token-nbf", SessionTokenIatInTheFuture: "session-token-iat-in-the-future", SessionTokenWithoutClientUAT: "session-token-but-no-client-uat", ActiveOrganizationMismatch: "active-organization-mismatch", TokenTypeMismatch: "token-type-mismatch", UnexpectedError: "unexpected-error" };
      function iJ(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), token: n10 } = e10;
        return { status: i$.SignedIn, reason: null, message: null, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: true, isAuthenticated: true, tokenType: e10.tokenType, toAuth: ({ treatPendingAsSignedOut: r11 = true } = {}) => {
          if (e10.tokenType === iR.SessionToken) {
            let { sessionClaims: i11 } = e10, s11 = function(e11, t11, r12) {
              let { actor: n11, sessionId: i12, sessionStatus: s12, userId: a11, orgId: o2, orgRole: l2, orgSlug: c2, orgPermissions: u2, factorVerificationAge: d2 } = rd(r12), h2 = iO(e11), p2 = iH({ sessionId: i12, sessionToken: t11, fetcher: async (e12, t12, r13) => (await h2.sessions.getToken(e12, t12 || "", r13)).jwt });
              return { tokenType: iR.SessionToken, actor: n11, sessionClaims: r12, sessionId: i12, sessionStatus: s12, userId: a11, orgId: o2, orgRole: l2, orgSlug: c2, orgPermissions: u2, factorVerificationAge: d2, getToken: p2, has: rc({ orgId: o2, orgRole: l2, orgPermissions: u2, userId: a11, factorVerificationAge: d2, features: r12.fea || "", plans: r12.pla || "" }), debug: iq({ ...e11, sessionToken: t11 }), isAuthenticated: true };
            }(t10, n10, i11);
            return r11 && "pending" === s11.sessionStatus ? ij(void 0, s11.sessionStatus) : s11;
          }
          let { machineData: i10 } = e10;
          var s10 = e10.tokenType;
          let a10 = { id: i10.id, subject: i10.subject, getToken: () => Promise.resolve(n10), has: () => false, debug: iq(t10), isAuthenticated: true };
          switch (s10) {
            case iR.ApiKey:
              return { ...a10, tokenType: s10, name: i10.name, claims: i10.claims, scopes: i10.scopes, userId: i10.subject.startsWith("user_") ? i10.subject : null, orgId: i10.subject.startsWith("org_") ? i10.subject : null };
            case iR.MachineToken:
              return { ...a10, tokenType: s10, name: i10.name, claims: i10.claims, scopes: i10.scopes, machineId: i10.subject };
            case iR.OAuthToken:
              return { ...a10, tokenType: s10, scopes: i10.scopes, userId: i10.subject, clientId: i10.clientId };
            default:
              throw Error(`Invalid token type: ${s10}`);
          }
        }, headers: r10, token: n10 };
      }
      function iK(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), reason: n10, message: i10 = "", tokenType: s10 } = e10;
        return iW({ status: i$.SignedOut, reason: n10, message: i10, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: s10, toAuth: () => s10 === iR.SessionToken ? ij({ ...t10, status: i$.SignedOut, reason: n10, message: i10 }) : iM(s10, { reason: n10, message: i10, headers: r10 }), headers: r10, token: null });
      }
      var iW = (e10) => {
        let t10 = new Headers(e10.headers || {});
        if (e10.message) try {
          t10.set(r_.Headers.AuthMessage, e10.message);
        } catch {
        }
        if (e10.reason) try {
          t10.set(r_.Headers.AuthReason, e10.reason);
        } catch {
        }
        if (e10.status) try {
          t10.set(r_.Headers.AuthStatus, e10.status);
        } catch {
        }
        return e10.headers = t10, e10;
      }, iF = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, iV = (...e10) => new iF(...e10), iX = class extends Request {
        constructor(e10, t10) {
          super("string" != typeof e10 && "url" in e10 ? e10.url : String(e10), t10 || "string" == typeof e10 ? void 0 : e10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(r_.Headers.ForwardedProto), n10 = e10.headers.get(r_.Headers.ForwardedHost), i10 = e10.headers.get(r_.Headers.Host), s10 = t10.protocol, a10 = this.getFirstValueFromHeader(n10) ?? i10, o2 = this.getFirstValueFromHeader(r10) ?? s10?.replace(/[:/]/, ""), l2 = a10 && o2 ? `${o2}://${a10}` : t10.origin;
          return l2 === t10.origin ? iV(t10) : iV(t10.pathname + t10.search, l2);
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, rh.qg)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, iG = (...e10) => e10[0] instanceof iX ? e10[0] : new iX(...e10), iQ = (e10) => e10.split(";")[0]?.split("=")[0], iY = (e10) => e10.split(";")[0]?.split("=")[1], iZ = {}, i0 = 0;
      function i1(e10, t10 = true) {
        iZ[e10.kid] = e10, i0 = t10 ? Date.now() : -1;
      }
      var i2 = "local";
      function i5(e10) {
        if (!iZ[i2]) {
          if (!e10) throw new tj({ action: tq.SetClerkJWTKey, message: "Missing local JWK.", reason: tU.LocalJWKMissing });
          i1({ kid: "local", kty: "RSA", alg: "RS256", n: e10.replace(/\r\n|\n|\r/g, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" }, false);
        }
        return iZ[i2];
      }
      async function i4({ secretKey: e10, apiUrl: t10 = rm, apiVersion: r10 = "v1", kid: n10, skipJwksCache: i10 }) {
        if (i10 || function() {
          if (-1 === i0) return false;
          let e11 = Date.now() - i0 >= 3e5;
          return e11 && (iZ = {}), e11;
        }() || !iZ[n10]) {
          if (!e10) throw new tj({ action: tq.ContactSupport, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: tU.RemoteJWKFailedToLoad });
          let { keys: n11 } = await tl(() => i3(t10, e10, r10));
          if (!n11 || !n11.length) throw new tj({ action: tq.ContactSupport, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: tU.RemoteJWKFailedToLoad });
          n11.forEach((e11) => i1(e11));
        }
        let s10 = iZ[n10];
        if (!s10) {
          let e11 = Object.values(iZ).map((e12) => e12.kid).sort().join(", ");
          throw new tj({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${tq.ContactSupport} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${n10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: tU.JWKKidMismatch });
        }
        return s10;
      }
      async function i3(e10, t10, r10) {
        if (!t10) throw new tj({ action: tq.SetClerkSecretKey, message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: tU.RemoteJWKFailedToLoad });
        let n10 = new URL(e10);
        n10.pathname = rR(n10.pathname, r10, "/jwks");
        let i10 = await tz.fetch(n10.href, { headers: { Authorization: `Bearer ${t10}`, "Clerk-API-Version": ry, "Content-Type": "application/json", "User-Agent": rg } });
        if (!i10.ok) {
          let e11 = await i10.json(), t11 = i6(e11?.errors, tN.InvalidSecretKey);
          if (t11) {
            let e12 = tU.InvalidSecretKey;
            throw new tj({ action: tq.ContactSupport, message: t11.message, reason: e12 });
          }
          throw new tj({ action: tq.ContactSupport, message: `Error loading Clerk JWKS from ${n10.href} with code=${i10.status}`, reason: tU.RemoteJWKFailedToLoad });
        }
        return i10.json();
      }
      var i6 = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null;
      async function i8(e10, t10) {
        let { data: r10, errors: n10 } = t4(e10);
        if (n10) return { errors: n10 };
        let { header: i10 } = r10, { kid: s10 } = i10;
        try {
          let r11;
          if (t10.jwtKey) r11 = i5(t10.jwtKey);
          else {
            if (!t10.secretKey) return { errors: [new tj({ action: tq.SetClerkJWTKey, message: "Failed to resolve JWK during verification.", reason: tU.JWKFailedToResolve })] };
            r11 = await i4({ ...t10, kid: s10 });
          }
          return await t3(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      function i9(e10, t10, r10) {
        if ("clerkError" in t10) {
          let n10, i10;
          switch (t10.status) {
            case 401:
              n10 = tM.InvalidSecretKey, i10 = t10.errors[0]?.message || "Invalid secret key";
              break;
            case 404:
              n10 = tM.TokenInvalid, i10 = r10;
              break;
            default:
              n10 = tM.UnexpectedError, i10 = "Unexpected error";
          }
          return { data: void 0, tokenType: e10, errors: [new tD({ message: i10, code: n10, status: t10.status })] };
        }
        return { data: void 0, tokenType: e10, errors: [new tD({ message: "Unexpected error", code: tM.UnexpectedError, status: t10.status })] };
      }
      async function i7(e10, t10) {
        try {
          let r10 = iO(t10);
          return { data: await r10.machineTokens.verifySecret(e10), tokenType: iR.MachineToken, errors: void 0 };
        } catch (e11) {
          return i9(iR.MachineToken, e11, "Machine token not found");
        }
      }
      async function se(e10, t10) {
        try {
          let r10 = iO(t10);
          return { data: await r10.idPOAuthAccessToken.verifyAccessToken(e10), tokenType: iR.OAuthToken, errors: void 0 };
        } catch (e11) {
          return i9(iR.OAuthToken, e11, "OAuth token not found");
        }
      }
      async function st(e10, t10) {
        try {
          let r10 = iO(t10);
          return { data: await r10.apiKeys.verifySecret(e10), tokenType: iR.ApiKey, errors: void 0 };
        } catch (e11) {
          return i9(iR.ApiKey, e11, "API key not found");
        }
      }
      async function sr(e10, t10) {
        if (e10.startsWith("mt_")) return i7(e10, t10);
        if (e10.startsWith(iI)) return se(e10, t10);
        if (e10.startsWith("ak_")) return st(e10, t10);
        throw Error("Unknown machine token type");
      }
      async function sn(e10, { key: t10 }) {
        let { data: r10, errors: n10 } = t4(e10);
        if (n10) throw n10[0];
        let { header: i10, payload: s10 } = r10, { typ: a10, alg: o2 } = i10;
        tG(a10), tQ(o2);
        let { data: l2, errors: c2 } = await t5(r10, t10);
        if (c2) throw new tj({ reason: tU.TokenVerificationFailed, message: `Error verifying handshake token. ${c2[0]}` });
        if (!l2) throw new tj({ reason: tU.TokenInvalidSignature, message: "Handshake signature is invalid." });
        return s10;
      }
      async function si(e10, t10) {
        let r10, { secretKey: n10, apiUrl: i10, apiVersion: s10, jwksCacheTtlInMs: a10, jwtKey: o2, skipJwksCache: l2 } = t10, { data: c2, errors: u2 } = t4(e10);
        if (u2) throw u2[0];
        let { kid: d2 } = c2.header;
        if (o2) r10 = i5(o2);
        else if (n10) r10 = await i4({ secretKey: n10, apiUrl: i10, apiVersion: s10, kid: d2, jwksCacheTtlInMs: a10, skipJwksCache: l2 });
        else throw new tj({ action: tq.SetClerkJWTKey, message: "Failed to resolve JWK during handshake verification.", reason: tU.JWKFailedToResolve });
        return await sn(e10, { key: r10 });
      }
      var ss = class {
        constructor(e10, t10, r10) {
          this.authenticateContext = e10, this.options = t10, this.organizationMatcher = r10;
        }
        isRequestEligibleForHandshake() {
          let { accept: e10, secFetchDest: t10 } = this.authenticateContext;
          return !!("document" === t10 || "iframe" === t10 || !t10 && e10?.startsWith("text/html"));
        }
        buildRedirectToHandshake(e10) {
          if (!this.authenticateContext?.clerkUrl) throw Error("Missing clerkUrl in authenticateContext");
          let t10 = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl), r10 = this.authenticateContext.frontendApi.startsWith("http") ? this.authenticateContext.frontendApi : `https://${this.authenticateContext.frontendApi}`, n10 = new URL("v1/client/handshake", r10 = r10.replace(/\/+$/, "") + "/");
          n10.searchParams.append("redirect_url", t10?.href || ""), n10.searchParams.append("__clerk_api_version", ry), n10.searchParams.append(r_.QueryParameters.SuffixedCookies, this.authenticateContext.usesSuffixedCookies().toString()), n10.searchParams.append(r_.QueryParameters.HandshakeReason, e10), n10.searchParams.append(r_.QueryParameters.HandshakeFormat, "nonce"), "development" === this.authenticateContext.instanceType && this.authenticateContext.devBrowserToken && n10.searchParams.append(r_.QueryParameters.DevBrowser, this.authenticateContext.devBrowserToken);
          let i10 = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
          return i10 && this.getOrganizationSyncQueryParams(i10).forEach((e11, t11) => {
            n10.searchParams.append(t11, e11);
          }), new Headers({ [r_.Headers.Location]: n10.href });
        }
        async getCookiesFromHandshake() {
          let e10 = [];
          if (this.authenticateContext.handshakeNonce) try {
            let t10 = await this.authenticateContext.apiClient?.clients.getHandshakePayload({ nonce: this.authenticateContext.handshakeNonce });
            t10 && e10.push(...t10.directives);
          } catch (e11) {
            console.error("Clerk: HandshakeService: error getting handshake payload:", e11);
          }
          else if (this.authenticateContext.handshakeToken) {
            let t10 = await si(this.authenticateContext.handshakeToken, this.authenticateContext);
            t10 && Array.isArray(t10.handshake) && e10.push(...t10.handshake);
          }
          return e10;
        }
        async resolveHandshake() {
          let e10 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t10 = await this.getCookiesFromHandshake(), r10 = "";
          if (t10.forEach((t11) => {
            e10.append("Set-Cookie", t11), iQ(t11).startsWith(r_.Cookies.Session) && (r10 = iY(t11));
          }), "development" === this.authenticateContext.instanceType) {
            let t11 = new URL(this.authenticateContext.clerkUrl);
            t11.searchParams.delete(r_.QueryParameters.Handshake), t11.searchParams.delete(r_.QueryParameters.HandshakeHelp), e10.append(r_.Headers.Location, t11.toString()), e10.set(r_.Headers.CacheControl, "no-store");
          }
          if ("" === r10) return iK({ tokenType: iR.SessionToken, authenticateContext: this.authenticateContext, reason: iB.SessionTokenMissing, message: "", headers: e10 });
          let { data: n10, errors: [i10] = [] } = await i8(r10, this.authenticateContext);
          if (n10) return iJ({ tokenType: iR.SessionToken, authenticateContext: this.authenticateContext, sessionClaims: n10, headers: e10, token: r10 });
          if ("development" === this.authenticateContext.instanceType && (i10?.reason === tU.TokenExpired || i10?.reason === tU.TokenNotActiveYet || i10?.reason === tU.TokenIatInTheFuture)) {
            let t11 = new tj({ action: i10.action, message: i10.message, reason: i10.reason });
            t11.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${t11.getFullMessage()}`);
            let { data: n11, errors: [s10] = [] } = await i8(r10, { ...this.authenticateContext, clockSkewInMs: 864e5 });
            if (n11) return iJ({ tokenType: iR.SessionToken, authenticateContext: this.authenticateContext, sessionClaims: n11, headers: e10, token: r10 });
            throw Error(s10?.message || "Clerk: Handshake retry failed.");
          }
          throw Error(i10?.message || "Clerk: Handshake failed.");
        }
        handleTokenVerificationErrorInDevelopment(e10) {
          if (e10.reason === tU.TokenInvalidSignature) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
          throw Error(`Clerk: Handshake token verification failed: ${e10.getFullMessage()}.`);
        }
        checkAndTrackRedirectLoop(e10) {
          if (3 === this.authenticateContext.handshakeRedirectLoopCounter) return true;
          let t10 = this.authenticateContext.handshakeRedirectLoopCounter + 1, r10 = r_.Cookies.RedirectCount;
          return e10.append("Set-Cookie", `${r10}=${t10}; SameSite=Lax; HttpOnly; Max-Age=3`), false;
        }
        removeDevBrowserFromURL(e10) {
          let t10 = new URL(e10);
          return t10.searchParams.delete(r_.QueryParameters.DevBrowser), t10.searchParams.delete(r_.QueryParameters.LegacyDevBrowser), t10;
        }
        getOrganizationSyncTarget(e10, t10) {
          return t10.findTarget(e10);
        }
        getOrganizationSyncQueryParams(e10) {
          let t10 = /* @__PURE__ */ new Map();
          return "personalAccount" === e10.type && t10.set("organization_id", ""), "organization" === e10.type && (e10.organizationId && t10.set("organization_id", e10.organizationId), e10.organizationSlug && t10.set("organization_id", e10.organizationSlug)), t10;
        }
      }, sa = class {
        constructor(e10) {
          this.organizationPattern = this.createMatcher(e10?.organizationPatterns), this.personalAccountPattern = this.createMatcher(e10?.personalAccountPatterns);
        }
        createMatcher(e10) {
          if (!e10) return null;
          try {
            return function(e11, t10) {
              try {
                var r10, n10, i10, s10, a10, o2, l2;
                return r10 = void 0, n10 = [], i10 = function e12(t11, r11, n11) {
                  var i11;
                  return t11 instanceof RegExp ? function(e13, t12) {
                    if (!t12) return e13;
                    for (var r12 = /\((?:\?<(.*?)>)?(?!\?)/g, n12 = 0, i12 = r12.exec(e13.source); i12; ) t12.push({ name: i12[1] || n12++, prefix: "", suffix: "", modifier: "", pattern: "" }), i12 = r12.exec(e13.source);
                    return e13;
                  }(t11, r11) : Array.isArray(t11) ? (i11 = t11.map(function(t12) {
                    return e12(t12, r11, n11).source;
                  }), new RegExp("(?:".concat(i11.join("|"), ")"), rf(n11))) : function(e13, t12, r12) {
                    void 0 === r12 && (r12 = {});
                    for (var n12 = r12.strict, i12 = void 0 !== n12 && n12, s11 = r12.start, a11 = r12.end, o3 = r12.encode, l3 = void 0 === o3 ? function(e14) {
                      return e14;
                    } : o3, c2 = r12.delimiter, u2 = r12.endsWith, d2 = "[".concat(rp(void 0 === u2 ? "" : u2), "]|$"), h2 = "[".concat(rp(void 0 === c2 ? "/#?" : c2), "]"), p2 = void 0 === s11 || s11 ? "^" : "", f2 = 0; f2 < e13.length; f2++) {
                      var m2 = e13[f2];
                      if ("string" == typeof m2) p2 += rp(l3(m2));
                      else {
                        var g2 = rp(l3(m2.prefix)), y2 = rp(l3(m2.suffix));
                        if (m2.pattern) if (t12 && t12.push(m2), g2 || y2) if ("+" === m2.modifier || "*" === m2.modifier) {
                          var v2 = "*" === m2.modifier ? "?" : "";
                          p2 += "(?:".concat(g2, "((?:").concat(m2.pattern, ")(?:").concat(y2).concat(g2, "(?:").concat(m2.pattern, "))*)").concat(y2, ")").concat(v2);
                        } else p2 += "(?:".concat(g2, "(").concat(m2.pattern, ")").concat(y2, ")").concat(m2.modifier);
                        else {
                          if ("+" === m2.modifier || "*" === m2.modifier) throw TypeError('Can not repeat "'.concat(m2.name, '" without a prefix and suffix'));
                          p2 += "(".concat(m2.pattern, ")").concat(m2.modifier);
                        }
                        else p2 += "(?:".concat(g2).concat(y2, ")").concat(m2.modifier);
                      }
                    }
                    if (void 0 === a11 || a11) i12 || (p2 += "".concat(h2, "?")), p2 += r12.endsWith ? "(?=".concat(d2, ")") : "$";
                    else {
                      var b2 = e13[e13.length - 1], _2 = "string" == typeof b2 ? h2.indexOf(b2[b2.length - 1]) > -1 : void 0 === b2;
                      i12 || (p2 += "(?:".concat(h2, "(?=").concat(d2, "))?")), _2 || (p2 += "(?=".concat(h2, "|").concat(d2, ")"));
                    }
                    return new RegExp(p2, rf(r12));
                  }(function(e13, t12) {
                    void 0 === t12 && (t12 = {});
                    for (var r12 = function(e14) {
                      for (var t13 = [], r13 = 0; r13 < e14.length; ) {
                        var n13 = e14[r13];
                        if ("*" === n13 || "+" === n13 || "?" === n13) {
                          t13.push({ type: "MODIFIER", index: r13, value: e14[r13++] });
                          continue;
                        }
                        if ("\\" === n13) {
                          t13.push({ type: "ESCAPED_CHAR", index: r13++, value: e14[r13++] });
                          continue;
                        }
                        if ("{" === n13) {
                          t13.push({ type: "OPEN", index: r13, value: e14[r13++] });
                          continue;
                        }
                        if ("}" === n13) {
                          t13.push({ type: "CLOSE", index: r13, value: e14[r13++] });
                          continue;
                        }
                        if (":" === n13) {
                          for (var i13 = "", s12 = r13 + 1; s12 < e14.length; ) {
                            var a12 = e14.charCodeAt(s12);
                            if (a12 >= 48 && a12 <= 57 || a12 >= 65 && a12 <= 90 || a12 >= 97 && a12 <= 122 || 95 === a12) {
                              i13 += e14[s12++];
                              continue;
                            }
                            break;
                          }
                          if (!i13) throw TypeError("Missing parameter name at ".concat(r13));
                          t13.push({ type: "NAME", index: r13, value: i13 }), r13 = s12;
                          continue;
                        }
                        if ("(" === n13) {
                          var o4 = 1, l4 = "", s12 = r13 + 1;
                          if ("?" === e14[s12]) throw TypeError('Pattern cannot start with "?" at '.concat(s12));
                          for (; s12 < e14.length; ) {
                            if ("\\" === e14[s12]) {
                              l4 += e14[s12++] + e14[s12++];
                              continue;
                            }
                            if (")" === e14[s12]) {
                              if (0 == --o4) {
                                s12++;
                                break;
                              }
                            } else if ("(" === e14[s12] && (o4++, "?" !== e14[s12 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(s12));
                            l4 += e14[s12++];
                          }
                          if (o4) throw TypeError("Unbalanced pattern at ".concat(r13));
                          if (!l4) throw TypeError("Missing pattern at ".concat(r13));
                          t13.push({ type: "PATTERN", index: r13, value: l4 }), r13 = s12;
                          continue;
                        }
                        t13.push({ type: "CHAR", index: r13, value: e14[r13++] });
                      }
                      return t13.push({ type: "END", index: r13, value: "" }), t13;
                    }(e13), n12 = t12.prefixes, i12 = void 0 === n12 ? "./" : n12, s11 = t12.delimiter, a11 = void 0 === s11 ? "/#?" : s11, o3 = [], l3 = 0, c2 = 0, u2 = "", d2 = function(e14) {
                      if (c2 < r12.length && r12[c2].type === e14) return r12[c2++].value;
                    }, h2 = function(e14) {
                      var t13 = d2(e14);
                      if (void 0 !== t13) return t13;
                      var n13 = r12[c2], i13 = n13.type, s12 = n13.index;
                      throw TypeError("Unexpected ".concat(i13, " at ").concat(s12, ", expected ").concat(e14));
                    }, p2 = function() {
                      for (var e14, t13 = ""; e14 = d2("CHAR") || d2("ESCAPED_CHAR"); ) t13 += e14;
                      return t13;
                    }, f2 = function(e14) {
                      for (var t13 = 0; t13 < a11.length; t13++) {
                        var r13 = a11[t13];
                        if (e14.indexOf(r13) > -1) return true;
                      }
                      return false;
                    }, m2 = function(e14) {
                      var t13 = o3[o3.length - 1], r13 = e14 || (t13 && "string" == typeof t13 ? t13 : "");
                      if (t13 && !r13) throw TypeError('Must have text between two parameters, missing text after "'.concat(t13.name, '"'));
                      return !r13 || f2(r13) ? "[^".concat(rp(a11), "]+?") : "(?:(?!".concat(rp(r13), ")[^").concat(rp(a11), "])+?");
                    }; c2 < r12.length; ) {
                      var g2 = d2("CHAR"), y2 = d2("NAME"), v2 = d2("PATTERN");
                      if (y2 || v2) {
                        var b2 = g2 || "";
                        -1 === i12.indexOf(b2) && (u2 += b2, b2 = ""), u2 && (o3.push(u2), u2 = ""), o3.push({ name: y2 || l3++, prefix: b2, suffix: "", pattern: v2 || m2(b2), modifier: d2("MODIFIER") || "" });
                        continue;
                      }
                      var _2 = g2 || d2("ESCAPED_CHAR");
                      if (_2) {
                        u2 += _2;
                        continue;
                      }
                      if (u2 && (o3.push(u2), u2 = ""), d2("OPEN")) {
                        var b2 = p2(), w2 = d2("NAME") || "", k2 = d2("PATTERN") || "", S2 = p2();
                        h2("CLOSE"), o3.push({ name: w2 || (k2 ? l3++ : ""), pattern: w2 && !k2 ? m2(b2) : k2, prefix: b2, suffix: S2, modifier: d2("MODIFIER") || "" });
                        continue;
                      }
                      h2("END");
                    }
                    return o3;
                  }(t11, n11), r11, n11);
                }(e11, n10, r10), s10 = n10, a10 = r10, void 0 === a10 && (a10 = {}), o2 = a10.decode, l2 = void 0 === o2 ? function(e12) {
                  return e12;
                } : o2, function(e12) {
                  var t11 = i10.exec(e12);
                  if (!t11) return false;
                  for (var r11 = t11[0], n11 = t11.index, a11 = /* @__PURE__ */ Object.create(null), o3 = 1; o3 < t11.length; o3++) !function(e13) {
                    if (void 0 !== t11[e13]) {
                      var r12 = s10[e13 - 1];
                      "*" === r12.modifier || "+" === r12.modifier ? a11[r12.name] = t11[e13].split(r12.prefix + r12.suffix).map(function(e14) {
                        return l2(e14, r12);
                      }) : a11[r12.name] = l2(t11[e13], r12);
                    }
                  }(o3);
                  return { path: r11, index: n11, params: a11 };
                };
              } catch (e12) {
                throw Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e12.message}`);
              }
            }(e10);
          } catch (t10) {
            throw Error(`Invalid pattern "${e10}": ${t10}`);
          }
        }
        findTarget(e10) {
          let t10 = this.findOrganizationTarget(e10);
          return t10 || this.findPersonalAccountTarget(e10);
        }
        findOrganizationTarget(e10) {
          if (!this.organizationPattern) return null;
          try {
            let t10 = this.organizationPattern(e10.pathname);
            if (!t10 || !("params" in t10)) return null;
            let r10 = t10.params;
            if (r10.id) return { type: "organization", organizationId: r10.id };
            if (r10.slug) return { type: "organization", organizationSlug: r10.slug };
            return null;
          } catch (e11) {
            return console.error("Failed to match organization pattern:", e11), null;
          }
        }
        findPersonalAccountTarget(e10) {
          if (!this.personalAccountPattern) return null;
          try {
            return this.personalAccountPattern(e10.pathname) ? { type: "personalAccount" } : null;
          } catch (e11) {
            return console.error("Failed to match personal account pattern:", e11), null;
          }
        }
      }, so = { NonEligibleNoCookie: "non-eligible-no-refresh-cookie", NonEligibleNonGet: "non-eligible-non-get", InvalidSessionToken: "invalid-session-token", MissingApiClient: "missing-api-client", MissingSessionToken: "missing-session-token", MissingRefreshToken: "missing-refresh-token", ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed", ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim", FetchError: "fetch-error", UnexpectedSDKError: "unexpected-sdk-error", UnexpectedBAPIError: "unexpected-bapi-error" };
      function sl(e10, t10, r10) {
        return iU(e10, t10) ? null : iK({ tokenType: e10, authenticateContext: r10, reason: iB.TokenTypeMismatch });
      }
      var sc = async (e10, t10) => {
        let r10 = await rC(iG(e10), t10);
        rT(r10.secretKey);
        let n10 = t10.acceptsToken ?? iR.SessionToken;
        if (r10.isSatellite) {
          var i10 = r10.signInUrl, s10 = r10.secretKey;
          if (!i10 && t_(s10)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
          if (r10.signInUrl && r10.origin && function(e11, t11) {
            let r11;
            try {
              r11 = new URL(e11);
            } catch {
              throw Error("The signInUrl needs to have a absolute url format.");
            }
            if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
          }(r10.signInUrl, r10.origin), !(r10.proxyUrl || r10.domain)) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }
        let a10 = new sa(t10.organizationSyncOptions), o2 = new ss(r10, { organizationSyncOptions: t10.organizationSyncOptions }, a10);
        async function l2(r11) {
          if (!t10.apiClient) return { data: null, error: { message: "An apiClient is needed to perform token refresh.", cause: { reason: so.MissingApiClient } } };
          let { sessionToken: n11, refreshTokenInCookie: i11 } = r11;
          if (!n11) return { data: null, error: { message: "Session token must be provided.", cause: { reason: so.MissingSessionToken } } };
          if (!i11) return { data: null, error: { message: "Refresh token must be provided.", cause: { reason: so.MissingRefreshToken } } };
          let { data: s11, errors: a11 } = t4(n11);
          if (!s11 || a11) return { data: null, error: { message: "Unable to decode the expired session token.", cause: { reason: so.ExpiredSessionTokenDecodeFailed, errors: a11 } } };
          if (!s11?.payload?.sid) return { data: null, error: { message: "Expired session token is missing the `sid` claim.", cause: { reason: so.ExpiredSessionTokenMissingSidClaim } } };
          try {
            return { data: (await t10.apiClient.sessions.refreshSession(s11.payload.sid, { format: "cookie", suffixed_cookies: r11.usesSuffixedCookies(), expired_token: n11 || "", refresh_token: i11 || "", request_origin: r11.clerkUrl.origin, request_headers: Object.fromEntries(Array.from(e10.headers.entries()).map(([e11, t11]) => [e11, [t11]])) })).cookies, error: null };
          } catch (e11) {
            if (!e11?.errors?.length) return { data: null, error: { message: "Unexpected Server/BAPI error", cause: { reason: so.UnexpectedBAPIError, errors: [e11] } } };
            if ("unexpected_error" === e11.errors[0].code) return { data: null, error: { message: "Fetch unexpected error", cause: { reason: so.FetchError, errors: e11.errors } } };
            return { data: null, error: { message: e11.errors[0].code, cause: { reason: e11.errors[0].code, errors: e11.errors } } };
          }
        }
        async function c2(e11) {
          let { data: t11, error: r11 } = await l2(e11);
          if (!t11 || 0 === t11.length) return { data: null, error: r11 };
          let n11 = new Headers(), i11 = "";
          t11.forEach((e12) => {
            n11.append("Set-Cookie", e12), iQ(e12).startsWith(r_.Cookies.Session) && (i11 = iY(e12));
          });
          let { data: s11, errors: a11 } = await i8(i11, e11);
          return a11 ? { data: null, error: { message: "Clerk: unable to verify refreshed session token.", cause: { reason: so.InvalidSessionToken, errors: a11 } } } : { data: { jwtPayload: s11, sessionToken: i11, headers: n11 }, error: null };
        }
        function u2(e11, t11, r11, n11) {
          if (!o2.isRequestEligibleForHandshake()) return iK({ tokenType: iR.SessionToken, authenticateContext: e11, reason: t11, message: r11 });
          let i11 = n11 ?? o2.buildRedirectToHandshake(t11);
          return (i11.get(r_.Headers.Location) && i11.set(r_.Headers.CacheControl, "no-store"), o2.checkAndTrackRedirectLoop(i11)) ? (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), iK({ tokenType: iR.SessionToken, authenticateContext: e11, reason: t11, message: r11 })) : function(e12, t12, r12 = "", n12) {
            return iW({ status: i$.Handshake, reason: t12, message: r12, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: iR.SessionToken, toAuth: () => null, headers: n12, token: null });
          }(e11, t11, r11, i11);
        }
        async function d2() {
          let { tokenInHeader: e11 } = r10;
          try {
            let { data: t11, errors: n11 } = await i8(e11, r10);
            if (n11) throw n11[0];
            return iJ({ tokenType: iR.SessionToken, authenticateContext: r10, sessionClaims: t11, headers: new Headers(), token: e11 });
          } catch (e12) {
            return p2(e12, "header");
          }
        }
        async function h2() {
          let e11 = r10.clientUat, t11 = !!r10.sessionTokenInCookie, n11 = !!r10.devBrowserToken;
          if (r10.handshakeNonce || r10.handshakeToken) try {
            return await o2.resolveHandshake();
          } catch (e12) {
            e12 instanceof tj && "development" === r10.instanceType ? o2.handleTokenVerificationErrorInDevelopment(e12) : console.error("Clerk: unable to resolve handshake:", e12);
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(r_.QueryParameters.DevBrowser)) return u2(r10, iB.DevBrowserSync, "");
          let i11 = r10.isSatellite && "document" === r10.secFetchDest;
          if ("production" === r10.instanceType && i11) return u2(r10, iB.SatelliteCookieNeedsSyncing, "");
          if ("development" === r10.instanceType && i11 && !r10.clerkUrl.searchParams.has(r_.QueryParameters.ClerkSynced)) {
            let e12 = new URL(r10.signInUrl);
            e12.searchParams.append(r_.QueryParameters.ClerkRedirectUrl, r10.clerkUrl.toString());
            let t12 = new Headers({ [r_.Headers.Location]: e12.toString() });
            return u2(r10, iB.SatelliteCookieNeedsSyncing, "", t12);
          }
          let s11 = new URL(r10.clerkUrl).searchParams.get(r_.QueryParameters.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && s11) {
            let e12 = new URL(s11);
            r10.devBrowserToken && e12.searchParams.append(r_.QueryParameters.DevBrowser, r10.devBrowserToken), e12.searchParams.append(r_.QueryParameters.ClerkSynced, "true");
            let t12 = new Headers({ [r_.Headers.Location]: e12.toString() });
            return u2(r10, iB.PrimaryRespondsToSyncing, "", t12);
          }
          if ("development" === r10.instanceType && !n11) return u2(r10, iB.DevBrowserMissing, "");
          if (!e11 && !t11) return iK({ tokenType: iR.SessionToken, authenticateContext: r10, reason: iB.SessionTokenAndUATMissing });
          if (!e11 && t11) return u2(r10, iB.SessionTokenWithoutClientUAT, "");
          if (e11 && !t11) return u2(r10, iB.ClientUATWithoutSessionToken, "");
          let { data: l3, errors: c3 } = t4(r10.sessionTokenInCookie);
          if (c3) return p2(c3[0], "cookie");
          if (l3.payload.iat < r10.clientUat) return u2(r10, iB.SessionTokenIATBeforeClientUAT, "");
          try {
            let { data: e12, errors: t12 } = await i8(r10.sessionTokenInCookie, r10);
            if (t12) throw t12[0];
            let n12 = iJ({ tokenType: iR.SessionToken, authenticateContext: r10, sessionClaims: e12, headers: new Headers(), token: r10.sessionTokenInCookie });
            if (!r10.isSatellite && "document" === r10.secFetchDest && r10.isCrossOriginReferrer()) return u2(r10, iB.PrimaryDomainCrossOriginSync, "Cross-origin request from satellite domain requires handshake");
            let i12 = n12.toAuth();
            if (i12.userId) {
              let e13 = function(e14, t13) {
                let r11 = a10.findTarget(e14.clerkUrl);
                if (!r11) return null;
                let n13 = false;
                if ("organization" === r11.type && (r11.organizationSlug && r11.organizationSlug !== t13.orgSlug && (n13 = true), r11.organizationId && r11.organizationId !== t13.orgId && (n13 = true)), "personalAccount" === r11.type && t13.orgId && (n13 = true), !n13) return null;
                if (e14.handshakeRedirectLoopCounter > 0) return console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."), null;
                let i13 = u2(e14, iB.ActiveOrganizationMismatch, "");
                return "handshake" !== i13.status ? null : i13;
              }(r10, i12);
              if (e13) return e13;
            }
            return n12;
          } catch (e12) {
            return p2(e12, "cookie");
          }
        }
        async function p2(t11, n11) {
          let i11;
          if (!(t11 instanceof tj)) return iK({ tokenType: iR.SessionToken, authenticateContext: r10, reason: iB.UnexpectedError });
          if (t11.reason === tU.TokenExpired && r10.refreshTokenInCookie && "GET" === e10.method) {
            let { data: e11, error: t12 } = await c2(r10);
            if (e11) return iJ({ tokenType: iR.SessionToken, authenticateContext: r10, sessionClaims: e11.jwtPayload, headers: e11.headers, token: e11.sessionToken });
            i11 = t12?.cause?.reason ? t12.cause.reason : so.UnexpectedSDKError;
          } else i11 = "GET" !== e10.method ? so.NonEligibleNonGet : r10.refreshTokenInCookie ? null : so.NonEligibleNoCookie;
          return (t11.tokenCarrier = n11, [tU.TokenExpired, tU.TokenNotActiveYet, tU.TokenIatInTheFuture].includes(t11.reason)) ? u2(r10, sd({ tokenError: t11.reason, refreshError: i11 }), t11.getFullMessage()) : iK({ tokenType: iR.SessionToken, authenticateContext: r10, reason: t11.reason, message: t11.getFullMessage() });
        }
        function f2(e11, t11) {
          return t11 instanceof tD ? iK({ tokenType: e11, authenticateContext: r10, reason: t11.code, message: t11.getFullMessage() }) : iK({ tokenType: e11, authenticateContext: r10, reason: iB.UnexpectedError });
        }
        async function m2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (!iP(e11)) return iK({ tokenType: n10, authenticateContext: r10, reason: iB.TokenTypeMismatch, message: "" });
          let t11 = sl(iN(e11), n10, r10);
          if (t11) return t11;
          let { data: i11, tokenType: s11, errors: a11 } = await sr(e11, r10);
          return a11 ? f2(s11, a11[0]) : iJ({ tokenType: s11, authenticateContext: r10, machineData: i11, token: e11 });
        }
        async function g2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (iP(e11)) {
            let t12 = sl(iN(e11), n10, r10);
            if (t12) return t12;
            let { data: i12, tokenType: s11, errors: a11 } = await sr(e11, r10);
            return a11 ? f2(s11, a11[0]) : iJ({ tokenType: s11, authenticateContext: r10, machineData: i12, token: e11 });
          }
          let { data: t11, errors: i11 } = await i8(e11, r10);
          return i11 ? p2(i11[0], "header") : iJ({ tokenType: iR.SessionToken, authenticateContext: r10, sessionClaims: t11, token: e11 });
        }
        return Array.isArray(n10) && !function(e11, t11) {
          let r11 = null, { tokenInHeader: n11 } = t11;
          return n11 && (r11 = iP(n11) ? iN(n11) : iR.SessionToken), iU(r11 ?? iR.SessionToken, e11);
        }(n10, r10) ? function() {
          let e11 = iD();
          return iW({ status: i$.SignedOut, reason: iB.TokenTypeMismatch, message: "", proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", signInUrl: "", signUpUrl: "", afterSignInUrl: "", afterSignUpUrl: "", isSignedIn: false, isAuthenticated: false, tokenType: null, toAuth: () => e11, headers: new Headers(), token: null });
        }() : r10.tokenInHeader ? "any" === n10 ? g2() : n10 === iR.SessionToken ? d2() : m2() : n10 === iR.OAuthToken || n10 === iR.ApiKey || n10 === iR.MachineToken ? iK({ tokenType: n10, authenticateContext: r10, reason: "No token in header" }) : h2();
      }, su = (e10) => {
        let { isSignedIn: t10, isAuthenticated: r10, proxyUrl: n10, reason: i10, message: s10, publishableKey: a10, isSatellite: o2, domain: l2 } = e10;
        return { isSignedIn: t10, isAuthenticated: r10, proxyUrl: n10, reason: i10, message: s10, publishableKey: a10, isSatellite: o2, domain: l2 };
      }, sd = ({ tokenError: e10, refreshError: t10 }) => {
        switch (e10) {
          case tU.TokenExpired:
            return `${iB.SessionTokenExpired}-refresh-${t10}`;
          case tU.TokenNotActiveYet:
            return iB.SessionTokenNBF;
          case tU.TokenIatInTheFuture:
            return iB.SessionTokenIatInTheFuture;
          default:
            return iB.UnexpectedError;
        }
      }, sh = { secretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" };
      r(821), r(167), r(830).s;
      var sp = r(159);
      let sf = "" + sp.s8 + ";404";
      sp.s8, sp.s8, r(792).X, r(280), "undefined" == typeof URLPattern || URLPattern, r(557), r(602), r(801), r(335), /* @__PURE__ */ new WeakMap();
      let sm = { Headers: { NextRewrite: "x-middleware-rewrite", NextResume: "x-middleware-next", NextRedirect: "Location", NextUrl: "next-url", NextAction: "next-action", NextjsData: "x-nextjs-data" } }, sg = (e10) => e10.headers.get(sm.Headers.NextRedirect), sy = (e10, t10, r10) => (e10.headers.set(t10, r10), e10);
      var sv = "__clerk_db_jwt", sb = (e10) => {
        let t10 = new URL(e10);
        return t10.searchParams.delete(sv), t10;
      }, s_ = (e10) => {
        let t10 = new URL(e10);
        return t10.searchParams.delete("__dev_session"), t10.hash = decodeURI(t10.hash).replace(/__clerk_db_jwt\[(.*)\]/, ""), t10.href.endsWith("#") && (t10.hash = ""), t10;
      };
      let sw = (e10, t10, r10) => {
        let n10 = t10.headers.get("location");
        if ("true" === t10.headers.get(r_.Headers.ClerkRedirectTo) && n10 && t_(r10.secretKey) && e10.clerkUrl.isCrossOrigin(n10)) {
          let r11 = e10.cookies.get(sv) || "", i10 = function(e11, t11) {
            let r12 = new URL(e11), n11 = r12.searchParams.get(sv);
            r12.searchParams.delete(sv);
            let i11 = n11 || t11;
            return i11 && r12.searchParams.set(sv, i11), r12;
          }(new URL(n10), r11);
          return B.redirect(i10.href, t10);
        }
        return t10;
      }, sk = { rE: "15.3.5" }, sS = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch {
          return "";
        }
      }, sE = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? sS(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, sS(t10)])), null, 2)).join(", "), sT = (e10, t10) => () => {
        let e11 = [], r10 = false;
        return { enable: () => {
          r10 = true;
        }, debug: (...t11) => {
          r10 && e11.push(t11.map((e12) => "function" == typeof e12 ? e12() : e12));
        }, commit: () => {
          if (r10) for (let r11 of e11) {
            let e12 = t10(r11);
            e12 = e12.split("\n").map((e13) => `  ${e13}`).join("\n"), process.env.VERCEL && (e12 = function(e13, t11) {
              let r12 = new TextEncoder(), n10 = new TextDecoder("utf-8"), i10 = r12.encode(e13).slice(0, 4096);
              return n10.decode(i10).replace(/\uFFFD/g, "");
            }(e12, 4096));
          }
        } };
      }, sx = (e10, t10) => (...r10) => {
        let n10 = ("string" == typeof e10 ? sT(e10, sE) : e10)(), i10 = t10(n10);
        try {
          let e11 = i10(...r10);
          if ("object" == typeof e11 && "then" in e11 && "function" == typeof e11.then) return e11.then((e12) => (n10.commit(), e12)).catch((e12) => {
            throw n10.commit(), e12;
          });
          return n10.commit(), e11;
        } catch (e11) {
          throw n10.commit(), e11;
        }
      };
      function sC(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      var sO = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let n10 = { ...r10 };
          for (let r11 of Object.keys(n10)) {
            let i10 = e10(r11.toString());
            i10 !== r11 && (n10[i10] = n10[r11], delete n10[r11]), "object" == typeof n10[i10] && (n10[i10] = t10(n10[i10]));
          }
          return n10;
        };
        return t10;
      };
      function sR(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      sO(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), sO(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      }), process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL;
      let sI = process.env.CLERK_API_VERSION || "v1", sA = process.env.CLERK_SECRET_KEY || "", sP = "pk_test_ZmFtb3VzLXNhaWxmaXNoLTg4LmNsZXJrLmFjY291bnRzLmRldiQ", sN = process.env.CLERK_ENCRYPTION_KEY || "", sU = process.env.CLERK_API_URL || ((e10) => {
        let t10 = tv(e10)?.frontendApi;
        return t10?.startsWith("clerk.") && td.some((e11) => t10?.endsWith(e11)) ? tm : tp.some((e11) => t10?.endsWith(e11)) ? "https://api.lclclerk.com" : tf.some((e11) => t10?.endsWith(e11)) ? "https://api.clerkstage.dev" : tm;
      })(sP), sq = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", sj = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", sM = sR(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, sD = "/sign-in", sL = sR(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), sH = sR(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG), sz = sR(process.env.NEXT_PUBLIC_CLERK_KEYLESS_DISABLED) || false, s$ = !(sk.rE.startsWith("13.") || sk.rE.startsWith("14.0")) && false, sB = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase(), n10 = r10.includes("dynamic server usage"), i10 = r10.includes("this page needs to bail out of prerendering");
        return /Route .*? needs to bail out of prerendering at this point because it used .*?./.test(t10) || n10 || i10;
      };
      async function sJ() {
        try {
          let { headers: e10 } = await Promise.resolve().then(r.bind(r, 221)), t10 = await e10();
          return new D("https://placeholder.com", { headers: t10 });
        } catch (e10) {
          if (e10 && sB(e10)) throw e10;
          throw Error(`Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      }
      var sK = class {
        constructor() {
          tt(this, s3), tt(this, s5, "clerk_telemetry_throttler"), tt(this, s4, 864e5);
        }
        isEventThrottled(e10) {
          if (!te(this, s3, s9)) return false;
          let t10 = Date.now(), r10 = tn(this, s3, s6).call(this, e10), n10 = te(this, s3, s8)?.[r10];
          if (!n10) {
            let e11 = { ...te(this, s3, s8), [r10]: t10 };
            localStorage.setItem(te(this, s5), JSON.stringify(e11));
          }
          if (n10 && t10 - n10 > te(this, s4)) {
            let e11 = te(this, s3, s8);
            delete e11[r10], localStorage.setItem(te(this, s5), JSON.stringify(e11));
          }
          return !!n10;
        }
      };
      s5 = /* @__PURE__ */ new WeakMap(), s4 = /* @__PURE__ */ new WeakMap(), s3 = /* @__PURE__ */ new WeakSet(), s6 = function(e10) {
        let { sk: t10, pk: r10, payload: n10, ...i10 } = e10, s10 = { ...n10, ...i10 };
        return JSON.stringify(Object.keys({ ...n10, ...i10 }).sort().map((e11) => s10[e11]));
      }, s8 = function() {
        let e10 = localStorage.getItem(te(this, s5));
        return e10 ? JSON.parse(e10) : {};
      }, s9 = function() {
        if ("undefined" == typeof window) return false;
        let e10 = window.localStorage;
        if (!e10) return false;
        try {
          let t10 = "test";
          return e10.setItem(t10, t10), e10.removeItem(t10), true;
        } catch (t10) {
          return t10 instanceof DOMException && ("QuotaExceededError" === t10.name || "NS_ERROR_DOM_QUOTA_REACHED" === t10.name) && e10.length > 0 && e10.removeItem(te(this, s5)), false;
        }
      };
      var sW = { samplingRate: 1, maxBufferSize: 5, endpoint: "https://clerk-telemetry.com" }, sF = class {
        constructor(e10) {
          tt(this, ai), tt(this, s7), tt(this, ae), tt(this, at, {}), tt(this, ar, []), tt(this, an), tr(this, s7, { maxBufferSize: e10.maxBufferSize ?? sW.maxBufferSize, samplingRate: e10.samplingRate ?? sW.samplingRate, disabled: e10.disabled ?? false, debug: e10.debug ?? false, endpoint: sW.endpoint }), e10.clerkVersion || "undefined" != typeof window ? te(this, at).clerkVersion = e10.clerkVersion ?? "" : te(this, at).clerkVersion = "", te(this, at).sdk = e10.sdk, te(this, at).sdkVersion = e10.sdkVersion, te(this, at).publishableKey = e10.publishableKey ?? "";
          let t10 = tv(e10.publishableKey);
          t10 && (te(this, at).instanceType = t10.instanceType), e10.secretKey && (te(this, at).secretKey = e10.secretKey.substring(0, 16)), tr(this, ae, new sK());
        }
        get isEnabled() {
          return !("development" !== te(this, at).instanceType || te(this, s7).disabled || "undefined" != typeof process && process.env && sR(process.env.CLERK_TELEMETRY_DISABLED) || "undefined" != typeof window && window?.navigator?.webdriver);
        }
        get isDebug() {
          return te(this, s7).debug || "undefined" != typeof process && process.env && sR(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          let t10 = tn(this, ai, ad).call(this, e10.event, e10.payload);
          tn(this, ai, ac).call(this, t10.event, t10), tn(this, ai, as).call(this, t10, e10.eventSamplingRate) && (te(this, ar).push(t10), tn(this, ai, ao).call(this));
        }
      };
      s7 = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakSet(), as = function(e10, t10) {
        return this.isEnabled && !this.isDebug && tn(this, ai, aa).call(this, e10, t10);
      }, aa = function(e10, t10) {
        let r10 = Math.random();
        return !!(r10 <= te(this, s7).samplingRate && (void 0 === t10 || r10 <= t10)) && !te(this, ae).isEventThrottled(e10);
      }, ao = function() {
        if ("undefined" == typeof window) return void tn(this, ai, al).call(this);
        if (te(this, ar).length >= te(this, s7).maxBufferSize) {
          te(this, an) && ("undefined" != typeof cancelIdleCallback ? cancelIdleCallback : clearTimeout)(te(this, an)), tn(this, ai, al).call(this);
          return;
        }
        te(this, an) || ("requestIdleCallback" in window ? tr(this, an, requestIdleCallback(() => {
          tn(this, ai, al).call(this);
        })) : tr(this, an, setTimeout(() => {
          tn(this, ai, al).call(this);
        }, 0)));
      }, al = function() {
        fetch(new URL("/v1/event", te(this, s7).endpoint), { method: "POST", body: JSON.stringify({ events: te(this, ar) }), headers: { "Content-Type": "application/json" } }).catch(() => void 0).then(() => {
          tr(this, ar, []);
        }).catch(() => void 0);
      }, ac = function(e10, t10) {
        this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
      }, au = function() {
        let e10 = { name: te(this, at).sdk, version: te(this, at).sdkVersion };
        if ("undefined" != typeof window) {
          let t10 = window;
          if (t10.Clerk) {
            let r10 = t10.Clerk;
            if ("object" == typeof r10 && null !== r10 && "constructor" in r10 && "object" == typeof r10.constructor && null !== r10.constructor && r10.constructor.sdkMetadata) {
              let { name: t11, version: n10 } = r10.constructor.sdkMetadata;
              void 0 !== t11 && (e10.name = t11), void 0 !== n10 && (e10.version = n10);
            }
          }
        }
        return e10;
      }, ad = function(e10, t10) {
        let r10 = tn(this, ai, au).call(this);
        return { event: e10, cv: te(this, at).clerkVersion ?? "", it: te(this, at).instanceType ?? "", sdk: r10.name, sdkv: r10.version, ...te(this, at).publishableKey ? { pk: te(this, at).publishableKey } : {}, ...te(this, at).secretKey ? { sk: te(this, at).secretKey } : {}, payload: t10 };
      };
      let sV = { secretKey: sA, publishableKey: sP, apiUrl: sU, apiVersion: sI, userAgent: "@clerk/nextjs@6.27.1", proxyUrl: sj, domain: sq, isSatellite: sM, sdkMetadata: { name: "@clerk/nextjs", version: "6.27.1", environment: "production" }, telemetry: { disabled: sL, debug: sH } }, sX = (e10) => function(e11) {
        let t10 = { ...e11 }, r10 = iO(t10), n10 = function(e12) {
          let t11 = rE(sh, e12.options), r11 = e12.apiClient;
          return { authenticateRequest: (e13, n11 = {}) => {
            let { apiUrl: i11, apiVersion: s10 } = t11, a10 = rE(t11, n11);
            return sc(e13, { ...n11, ...a10, apiUrl: i11, apiVersion: s10, apiClient: r11 });
          }, debugRequestState: su };
        }({ options: t10, apiClient: r10 }), i10 = new sF({ ...e11.telemetry, publishableKey: t10.publishableKey, secretKey: t10.secretKey, samplingRate: 0.1, ...t10.sdkMetadata ? { sdk: t10.sdkMetadata.name, sdkVersion: t10.sdkMetadata.version } : {} });
        return { ...r10, ...n10, telemetry: i10 };
      }({ ...sV, ...e10 });
      function sG(e10, t10) {
        var r10, n10;
        return function(e11) {
          try {
            let { headers: t11, nextUrl: r11, cookies: n11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get) && "function" == typeof (null == r11 ? void 0 : r11.searchParams.get) && "function" == typeof (null == n11 ? void 0 : n11.get);
          } catch {
            return false;
          }
        }(e10) || function(e11) {
          try {
            let { headers: t11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get);
          } catch {
            return false;
          }
        }(e10) ? e10.headers.get(t10) : e10.headers[t10] || e10.headers[t10.toLowerCase()] || (null == (n10 = null == (r10 = e10.socket) ? void 0 : r10._httpMessage) ? void 0 : n10.getHeader(t10));
      }
      var sQ = r(521);
      let sY = /* @__PURE__ */ new Map(), sZ = new sQ.AsyncLocalStorage();
      var s0 = /* @__PURE__ */ new Set(), s1 = { warnOnce: (e10) => {
        s0.has(e10) || (s0.add(e10), console.warn(e10));
      } };
      function s2(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      var s5, s4, s3, s6, s8, s9, s7, ae, at, ar, an, ai, as, aa, ao, al, ac, au, ad, ah, ap, af, am, ag, ay, av = Object.defineProperty, ab = (e10, t10, r10) => t10 in e10 ? av(e10, t10, { enumerable: true, configurable: true, writable: true, value: r10 }) : e10[t10] = r10, a_ = (null == (ah = "undefined" != typeof globalThis ? globalThis : void 0) ? void 0 : ah.crypto) || (null == (ap = void 0 !== r.g ? r.g : void 0) ? void 0 : ap.crypto) || (null == (af = "undefined" != typeof self ? self : void 0) ? void 0 : af.crypto) || (null == (ag = null == (am = "undefined" != typeof frames ? frames : void 0) ? void 0 : am[0]) ? void 0 : ag.crypto);
      ay = a_ ? (e10) => {
        let t10 = [];
        for (let r10 = 0; r10 < e10; r10 += 4) t10.push(a_.getRandomValues(new Uint32Array(1))[0]);
        return new ak(t10, e10);
      } : (e10) => {
        let t10 = [], r10 = (e11) => {
          let t11 = e11, r11 = 987654321;
          return () => {
            let e12 = ((r11 = 36969 * (65535 & r11) + (r11 >> 16) | 0) << 16) + (t11 = 18e3 * (65535 & t11) + (t11 >> 16) | 0) | 0;
            return e12 /= 4294967296, (e12 += 0.5) * (Math.random() > 0.5 ? 1 : -1);
          };
        };
        for (let n10 = 0, i10; n10 < e10; n10 += 4) {
          let e11 = r10(4294967296 * (i10 || Math.random()));
          i10 = 987654071 * e11(), t10.push(4294967296 * e11() | 0);
        }
        return new ak(t10, e10);
      };
      var aw = class {
        static create(...e10) {
          return new this(...e10);
        }
        mixIn(e10) {
          return Object.assign(this, e10);
        }
        clone() {
          let e10 = new this.constructor();
          return Object.assign(e10, this), e10;
        }
      }, ak = class extends aw {
        constructor(e10 = [], t10 = 4 * e10.length) {
          super();
          let r10 = e10;
          if (r10 instanceof ArrayBuffer && (r10 = new Uint8Array(r10)), (r10 instanceof Int8Array || r10 instanceof Uint8ClampedArray || r10 instanceof Int16Array || r10 instanceof Uint16Array || r10 instanceof Int32Array || r10 instanceof Uint32Array || r10 instanceof Float32Array || r10 instanceof Float64Array) && (r10 = new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength)), r10 instanceof Uint8Array) {
            let e11 = r10.byteLength, t11 = [];
            for (let n10 = 0; n10 < e11; n10 += 1) t11[n10 >>> 2] |= r10[n10] << 24 - n10 % 4 * 8;
            this.words = t11, this.sigBytes = e11;
          } else this.words = e10, this.sigBytes = t10;
        }
        toString(e10 = aS) {
          return e10.stringify(this);
        }
        concat(e10) {
          let t10 = this.words, r10 = e10.words, n10 = this.sigBytes, i10 = e10.sigBytes;
          if (this.clamp(), n10 % 4) for (let e11 = 0; e11 < i10; e11 += 1) {
            let i11 = r10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
            t10[n10 + e11 >>> 2] |= i11 << 24 - (n10 + e11) % 4 * 8;
          }
          else for (let e11 = 0; e11 < i10; e11 += 4) t10[n10 + e11 >>> 2] = r10[e11 >>> 2];
          return this.sigBytes += i10, this;
        }
        clamp() {
          let { words: e10, sigBytes: t10 } = this;
          e10[t10 >>> 2] &= 4294967295 << 32 - t10 % 4 * 8, e10.length = Math.ceil(t10 / 4);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10.words = this.words.slice(0), e10;
        }
      };
      ((e10, t10, r10) => ab(e10, "symbol" != typeof t10 ? t10 + "" : t10, r10))(ak, "random", ay);
      var aS = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, n10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          n10.push((r11 >>> 4).toString(16)), n10.push((15 & r11).toString(16));
        }
        return n10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let n10 = 0; n10 < t10; n10 += 2) r10[n10 >>> 3] |= parseInt(e10.substr(n10, 2), 16) << 24 - n10 % 8 * 4;
        return new ak(r10, t10 / 2);
      } }, aE = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, n10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          n10.push(String.fromCharCode(r11));
        }
        return n10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let n10 = 0; n10 < t10; n10 += 1) r10[n10 >>> 2] |= (255 & e10.charCodeAt(n10)) << 24 - n10 % 4 * 8;
        return new ak(r10, t10);
      } }, aT = { stringify(e10) {
        try {
          return decodeURIComponent(escape(aE.stringify(e10)));
        } catch {
          throw Error("Malformed UTF-8 data");
        }
      }, parse: (e10) => aE.parse(unescape(encodeURIComponent(e10))) }, ax = class extends aw {
        constructor() {
          super(), this._minBufferSize = 0;
        }
        reset() {
          this._data = new ak(), this._nDataBytes = 0;
        }
        _append(e10) {
          let t10 = e10;
          "string" == typeof t10 && (t10 = aT.parse(t10)), this._data.concat(t10), this._nDataBytes += t10.sigBytes;
        }
        _process(e10) {
          let t10, { _data: r10, blockSize: n10 } = this, i10 = r10.words, s10 = r10.sigBytes, a10 = s10 / (4 * n10), o2 = (a10 = e10 ? Math.ceil(a10) : Math.max((0 | a10) - this._minBufferSize, 0)) * n10, l2 = Math.min(4 * o2, s10);
          if (o2) {
            for (let e11 = 0; e11 < o2; e11 += n10) this._doProcessBlock(i10, e11);
            t10 = i10.splice(0, o2), r10.sigBytes -= l2;
          }
          return new ak(t10, l2);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._data = this._data.clone(), e10;
        }
      }, aC = class extends ax {
        constructor(e10) {
          super(), this.blockSize = 16, this.cfg = Object.assign(new aw(), e10), this.reset();
        }
        static _createHelper(e10) {
          return (t10, r10) => new e10(r10).finalize(t10);
        }
        static _createHmacHelper(e10) {
          return (t10, r10) => new aO(e10, r10).finalize(t10);
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        update(e10) {
          return this._append(e10), this._process(), this;
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      }, aO = class extends aw {
        constructor(e10, t10) {
          super();
          let r10 = new e10();
          this._hasher = r10;
          let n10 = t10;
          "string" == typeof n10 && (n10 = aT.parse(n10));
          let i10 = r10.blockSize, s10 = 4 * i10;
          n10.sigBytes > s10 && (n10 = r10.finalize(t10)), n10.clamp();
          let a10 = n10.clone();
          this._oKey = a10;
          let o2 = n10.clone();
          this._iKey = o2;
          let l2 = a10.words, c2 = o2.words;
          for (let e11 = 0; e11 < i10; e11 += 1) l2[e11] ^= 1549556828, c2[e11] ^= 909522486;
          a10.sigBytes = s10, o2.sigBytes = s10, this.reset();
        }
        reset() {
          let e10 = this._hasher;
          e10.reset(), e10.update(this._iKey);
        }
        update(e10) {
          return this._hasher.update(e10), this;
        }
        finalize(e10) {
          let t10 = this._hasher, r10 = t10.finalize(e10);
          return t10.reset(), t10.finalize(this._oKey.clone().concat(r10));
        }
      }, aR = (e10, t10, r10) => {
        let n10 = [], i10 = 0;
        for (let s10 = 0; s10 < t10; s10 += 1) if (s10 % 4) {
          let t11 = r10[e10.charCodeAt(s10 - 1)] << s10 % 4 * 2 | r10[e10.charCodeAt(s10)] >>> 6 - s10 % 4 * 2;
          n10[i10 >>> 2] |= t11 << 24 - i10 % 4 * 8, i10 += 1;
        }
        return ak.create(n10, i10);
      }, aI = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, n10 = this._map;
        e10.clamp();
        let i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 3) {
          let s11 = (t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255) << 16 | (t10[e11 + 1 >>> 2] >>> 24 - (e11 + 1) % 4 * 8 & 255) << 8 | t10[e11 + 2 >>> 2] >>> 24 - (e11 + 2) % 4 * 8 & 255;
          for (let t11 = 0; t11 < 4 && e11 + 0.75 * t11 < r10; t11 += 1) i10.push(n10.charAt(s11 >>> 6 * (3 - t11) & 63));
        }
        let s10 = n10.charAt(64);
        if (s10) for (; i10.length % 4; ) i10.push(s10);
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = this._map, n10 = this._reverseMap;
        if (!n10) {
          this._reverseMap = [], n10 = this._reverseMap;
          for (let e11 = 0; e11 < r10.length; e11 += 1) n10[r10.charCodeAt(e11)] = e11;
        }
        let i10 = r10.charAt(64);
        if (i10) {
          let r11 = e10.indexOf(i10);
          -1 !== r11 && (t10 = r11);
        }
        return aR(e10, t10, n10);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, aA = [];
      for (let e10 = 0; e10 < 64; e10 += 1) aA[e10] = 4294967296 * Math.abs(Math.sin(e10 + 1)) | 0;
      var aP = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (t10 & r10 | ~t10 & n10) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aN = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (t10 & n10 | r10 & ~n10) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aU = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (t10 ^ r10 ^ n10) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aq = (e10, t10, r10, n10, i10, s10, a10) => {
        let o2 = e10 + (r10 ^ (t10 | ~n10)) + i10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aj = class extends aC {
        _doReset() {
          this._hash = new ak([1732584193, 4023233417, 2562383102, 271733878]);
        }
        _doProcessBlock(e10, t10) {
          for (let r11 = 0; r11 < 16; r11 += 1) {
            let n11 = t10 + r11, i11 = e10[n11];
            e10[n11] = (i11 << 8 | i11 >>> 24) & 16711935 | (i11 << 24 | i11 >>> 8) & 4278255360;
          }
          let r10 = this._hash.words, n10 = e10[t10 + 0], i10 = e10[t10 + 1], s10 = e10[t10 + 2], a10 = e10[t10 + 3], o2 = e10[t10 + 4], l2 = e10[t10 + 5], c2 = e10[t10 + 6], u2 = e10[t10 + 7], d2 = e10[t10 + 8], h2 = e10[t10 + 9], p2 = e10[t10 + 10], f2 = e10[t10 + 11], m2 = e10[t10 + 12], g2 = e10[t10 + 13], y2 = e10[t10 + 14], v2 = e10[t10 + 15], b2 = r10[0], _2 = r10[1], w2 = r10[2], k2 = r10[3];
          b2 = aP(b2, _2, w2, k2, n10, 7, aA[0]), k2 = aP(k2, b2, _2, w2, i10, 12, aA[1]), w2 = aP(w2, k2, b2, _2, s10, 17, aA[2]), _2 = aP(_2, w2, k2, b2, a10, 22, aA[3]), b2 = aP(b2, _2, w2, k2, o2, 7, aA[4]), k2 = aP(k2, b2, _2, w2, l2, 12, aA[5]), w2 = aP(w2, k2, b2, _2, c2, 17, aA[6]), _2 = aP(_2, w2, k2, b2, u2, 22, aA[7]), b2 = aP(b2, _2, w2, k2, d2, 7, aA[8]), k2 = aP(k2, b2, _2, w2, h2, 12, aA[9]), w2 = aP(w2, k2, b2, _2, p2, 17, aA[10]), _2 = aP(_2, w2, k2, b2, f2, 22, aA[11]), b2 = aP(b2, _2, w2, k2, m2, 7, aA[12]), k2 = aP(k2, b2, _2, w2, g2, 12, aA[13]), w2 = aP(w2, k2, b2, _2, y2, 17, aA[14]), _2 = aP(_2, w2, k2, b2, v2, 22, aA[15]), b2 = aN(b2, _2, w2, k2, i10, 5, aA[16]), k2 = aN(k2, b2, _2, w2, c2, 9, aA[17]), w2 = aN(w2, k2, b2, _2, f2, 14, aA[18]), _2 = aN(_2, w2, k2, b2, n10, 20, aA[19]), b2 = aN(b2, _2, w2, k2, l2, 5, aA[20]), k2 = aN(k2, b2, _2, w2, p2, 9, aA[21]), w2 = aN(w2, k2, b2, _2, v2, 14, aA[22]), _2 = aN(_2, w2, k2, b2, o2, 20, aA[23]), b2 = aN(b2, _2, w2, k2, h2, 5, aA[24]), k2 = aN(k2, b2, _2, w2, y2, 9, aA[25]), w2 = aN(w2, k2, b2, _2, a10, 14, aA[26]), _2 = aN(_2, w2, k2, b2, d2, 20, aA[27]), b2 = aN(b2, _2, w2, k2, g2, 5, aA[28]), k2 = aN(k2, b2, _2, w2, s10, 9, aA[29]), w2 = aN(w2, k2, b2, _2, u2, 14, aA[30]), _2 = aN(_2, w2, k2, b2, m2, 20, aA[31]), b2 = aU(b2, _2, w2, k2, l2, 4, aA[32]), k2 = aU(k2, b2, _2, w2, d2, 11, aA[33]), w2 = aU(w2, k2, b2, _2, f2, 16, aA[34]), _2 = aU(_2, w2, k2, b2, y2, 23, aA[35]), b2 = aU(b2, _2, w2, k2, i10, 4, aA[36]), k2 = aU(k2, b2, _2, w2, o2, 11, aA[37]), w2 = aU(w2, k2, b2, _2, u2, 16, aA[38]), _2 = aU(_2, w2, k2, b2, p2, 23, aA[39]), b2 = aU(b2, _2, w2, k2, g2, 4, aA[40]), k2 = aU(k2, b2, _2, w2, n10, 11, aA[41]), w2 = aU(w2, k2, b2, _2, a10, 16, aA[42]), _2 = aU(_2, w2, k2, b2, c2, 23, aA[43]), b2 = aU(b2, _2, w2, k2, h2, 4, aA[44]), k2 = aU(k2, b2, _2, w2, m2, 11, aA[45]), w2 = aU(w2, k2, b2, _2, v2, 16, aA[46]), _2 = aU(_2, w2, k2, b2, s10, 23, aA[47]), b2 = aq(b2, _2, w2, k2, n10, 6, aA[48]), k2 = aq(k2, b2, _2, w2, u2, 10, aA[49]), w2 = aq(w2, k2, b2, _2, y2, 15, aA[50]), _2 = aq(_2, w2, k2, b2, l2, 21, aA[51]), b2 = aq(b2, _2, w2, k2, m2, 6, aA[52]), k2 = aq(k2, b2, _2, w2, a10, 10, aA[53]), w2 = aq(w2, k2, b2, _2, p2, 15, aA[54]), _2 = aq(_2, w2, k2, b2, i10, 21, aA[55]), b2 = aq(b2, _2, w2, k2, d2, 6, aA[56]), k2 = aq(k2, b2, _2, w2, v2, 10, aA[57]), w2 = aq(w2, k2, b2, _2, c2, 15, aA[58]), _2 = aq(_2, w2, k2, b2, g2, 21, aA[59]), b2 = aq(b2, _2, w2, k2, o2, 6, aA[60]), k2 = aq(k2, b2, _2, w2, f2, 10, aA[61]), w2 = aq(w2, k2, b2, _2, s10, 15, aA[62]), _2 = aq(_2, w2, k2, b2, h2, 21, aA[63]), r10[0] = r10[0] + b2 | 0, r10[1] = r10[1] + _2 | 0, r10[2] = r10[2] + w2 | 0, r10[3] = r10[3] + k2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, n10 = 8 * e10.sigBytes;
          t10[n10 >>> 5] |= 128 << 24 - n10 % 32;
          let i10 = Math.floor(r10 / 4294967296);
          t10[(n10 + 64 >>> 9 << 4) + 15] = (i10 << 8 | i10 >>> 24) & 16711935 | (i10 << 24 | i10 >>> 8) & 4278255360, t10[(n10 + 64 >>> 9 << 4) + 14] = (r10 << 8 | r10 >>> 24) & 16711935 | (r10 << 24 | r10 >>> 8) & 4278255360, e10.sigBytes = (t10.length + 1) * 4, this._process();
          let s10 = this._hash, a10 = s10.words;
          for (let e11 = 0; e11 < 4; e11 += 1) {
            let t11 = a10[e11];
            a10[e11] = (t11 << 8 | t11 >>> 24) & 16711935 | (t11 << 24 | t11 >>> 8) & 4278255360;
          }
          return s10;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      };
      aC._createHelper(aj), aC._createHmacHelper(aj);
      var aM = class extends aw {
        constructor(e10) {
          super(), this.cfg = Object.assign(new aw(), { keySize: 4, hasher: aj, iterations: 1 }, e10);
        }
        compute(e10, t10) {
          let r10, { cfg: n10 } = this, i10 = n10.hasher.create(), s10 = ak.create(), a10 = s10.words, { keySize: o2, iterations: l2 } = n10;
          for (; a10.length < o2; ) {
            r10 && i10.update(r10), r10 = i10.update(e10).finalize(t10), i10.reset();
            for (let e11 = 1; e11 < l2; e11 += 1) r10 = i10.finalize(r10), i10.reset();
            s10.concat(r10);
          }
          return s10.sigBytes = 4 * o2, s10;
        }
      }, aD = class extends ax {
        constructor(e10, t10, r10) {
          super(), this.cfg = Object.assign(new aw(), r10), this._xformMode = e10, this._key = t10, this.reset();
        }
        static createEncryptor(e10, t10) {
          return this.create(this._ENC_XFORM_MODE, e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.create(this._DEC_XFORM_MODE, e10, t10);
        }
        static _createHelper(e10) {
          let t10 = (e11) => "string" == typeof e11 ? aW : aK;
          return { encrypt: (r10, n10, i10) => t10(n10).encrypt(e10, r10, n10, i10), decrypt: (r10, n10, i10) => t10(n10).decrypt(e10, r10, n10, i10) };
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        process(e10) {
          return this._append(e10), this._process();
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      };
      aD._ENC_XFORM_MODE = 1, aD._DEC_XFORM_MODE = 2, aD.keySize = 4, aD.ivSize = 4;
      var aL = class extends aw {
        constructor(e10, t10) {
          super(), this._cipher = e10, this._iv = t10;
        }
        static createEncryptor(e10, t10) {
          return this.Encryptor.create(e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.Decryptor.create(e10, t10);
        }
      };
      function aH(e10, t10, r10) {
        let n10, i10 = this._iv;
        i10 ? (n10 = i10, this._iv = void 0) : n10 = this._prevBlock;
        for (let i11 = 0; i11 < r10; i11 += 1) e10[t10 + i11] ^= n10[i11];
      }
      var az = class extends aL {
      };
      az.Encryptor = class extends az {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: n10 } = r10;
          aH.call(this, e10, t10, n10), r10.encryptBlock(e10, t10), this._prevBlock = e10.slice(t10, t10 + n10);
        }
      }, az.Decryptor = class extends az {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: n10 } = r10, i10 = e10.slice(t10, t10 + n10);
          r10.decryptBlock(e10, t10), aH.call(this, e10, t10, n10), this._prevBlock = i10;
        }
      };
      var a$ = { pad(e10, t10) {
        let r10 = 4 * t10, n10 = r10 - e10.sigBytes % r10, i10 = n10 << 24 | n10 << 16 | n10 << 8 | n10, s10 = [];
        for (let e11 = 0; e11 < n10; e11 += 4) s10.push(i10);
        let a10 = ak.create(s10, n10);
        e10.concat(a10);
      }, unpad(e10) {
        let t10 = 255 & e10.words[e10.sigBytes - 1 >>> 2];
        e10.sigBytes -= t10;
      } }, aB = class extends aD {
        constructor(e10, t10, r10) {
          super(e10, t10, Object.assign({ mode: az, padding: a$ }, r10)), this.blockSize = 4;
        }
        reset() {
          let e10;
          super.reset.call(this);
          let { cfg: t10 } = this, { iv: r10, mode: n10 } = t10;
          this._xformMode === this.constructor._ENC_XFORM_MODE ? e10 = n10.createEncryptor : (e10 = n10.createDecryptor, this._minBufferSize = 1), this._mode = e10.call(n10, this, r10 && r10.words), this._mode.__creator = e10;
        }
        _doProcessBlock(e10, t10) {
          this._mode.processBlock(e10, t10);
        }
        _doFinalize() {
          let e10, { padding: t10 } = this.cfg;
          return this._xformMode === this.constructor._ENC_XFORM_MODE ? (t10.pad(this._data, this.blockSize), e10 = this._process(true)) : (e10 = this._process(true), t10.unpad(e10)), e10;
        }
      }, aJ = class extends aw {
        constructor(e10) {
          super(), this.mixIn(e10);
        }
        toString(e10) {
          return (e10 || this.formatter).stringify(this);
        }
      }, aK = class extends aw {
        static encrypt(e10, t10, r10, n10) {
          let i10 = Object.assign(new aw(), this.cfg, n10), s10 = e10.createEncryptor(r10, i10), a10 = s10.finalize(t10), o2 = s10.cfg;
          return aJ.create({ ciphertext: a10, key: r10, iv: o2.iv, algorithm: e10, mode: o2.mode, padding: o2.padding, blockSize: s10.blockSize, formatter: i10.format });
        }
        static decrypt(e10, t10, r10, n10) {
          let i10 = t10, s10 = Object.assign(new aw(), this.cfg, n10);
          return i10 = this._parse(i10, s10.format), e10.createDecryptor(r10, s10).finalize(i10.ciphertext);
        }
        static _parse(e10, t10) {
          return "string" == typeof e10 ? t10.parse(e10, this) : e10;
        }
      };
      aK.cfg = Object.assign(new aw(), { format: { stringify(e10) {
        let t10, { ciphertext: r10, salt: n10 } = e10;
        return (n10 ? ak.create([1398893684, 1701076831]).concat(n10).concat(r10) : r10).toString(aI);
      }, parse(e10) {
        let t10, r10 = aI.parse(e10), n10 = r10.words;
        return 1398893684 === n10[0] && 1701076831 === n10[1] && (t10 = ak.create(n10.slice(2, 4)), n10.splice(0, 4), r10.sigBytes -= 16), aJ.create({ ciphertext: r10, salt: t10 });
      } } });
      var aW = class extends aK {
        static encrypt(e10, t10, r10, n10) {
          let i10 = Object.assign(new aw(), this.cfg, n10), s10 = i10.kdf.execute(r10, e10.keySize, e10.ivSize, i10.salt, i10.hasher);
          i10.iv = s10.iv;
          let a10 = aK.encrypt.call(this, e10, t10, s10.key, i10);
          return a10.mixIn(s10), a10;
        }
        static decrypt(e10, t10, r10, n10) {
          let i10 = t10, s10 = Object.assign(new aw(), this.cfg, n10);
          i10 = this._parse(i10, s10.format);
          let a10 = s10.kdf.execute(r10, e10.keySize, e10.ivSize, i10.salt, s10.hasher);
          return s10.iv = a10.iv, aK.decrypt.call(this, e10, i10, a10.key, s10);
        }
      };
      aW.cfg = Object.assign(aK.cfg, { kdf: { execute(e10, t10, r10, n10, i10) {
        let s10, a10 = n10;
        a10 || (a10 = ak.random(8)), s10 = i10 ? aM.create({ keySize: t10 + r10, hasher: i10 }).compute(e10, a10) : aM.create({ keySize: t10 + r10 }).compute(e10, a10);
        let o2 = ak.create(s10.words.slice(t10), 4 * r10);
        return s10.sigBytes = 4 * t10, aJ.create({ key: s10, iv: o2, salt: a10 });
      } } });
      var aF = [], aV = [], aX = [], aG = [], aQ = [], aY = [], aZ = [], a0 = [], a1 = [], a2 = [], a5 = [];
      for (let e10 = 0; e10 < 256; e10 += 1) e10 < 128 ? a5[e10] = e10 << 1 : a5[e10] = e10 << 1 ^ 283;
      var a4 = 0, a3 = 0;
      for (let e10 = 0; e10 < 256; e10 += 1) {
        let e11 = a3 ^ a3 << 1 ^ a3 << 2 ^ a3 << 3 ^ a3 << 4;
        e11 = e11 >>> 8 ^ 255 & e11 ^ 99, aF[a4] = e11, aV[e11] = a4;
        let t10 = a5[a4], r10 = a5[t10], n10 = a5[r10], i10 = 257 * a5[e11] ^ 16843008 * e11;
        aX[a4] = i10 << 24 | i10 >>> 8, aG[a4] = i10 << 16 | i10 >>> 16, aQ[a4] = i10 << 8 | i10 >>> 24, aY[a4] = i10, i10 = 16843009 * n10 ^ 65537 * r10 ^ 257 * t10 ^ 16843008 * a4, aZ[e11] = i10 << 24 | i10 >>> 8, a0[e11] = i10 << 16 | i10 >>> 16, a1[e11] = i10 << 8 | i10 >>> 24, a2[e11] = i10, a4 ? (a4 = t10 ^ a5[a5[a5[n10 ^ t10]]], a3 ^= a5[a5[a3]]) : a4 = a3 = 1;
      }
      var a6 = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], a8 = class extends aB {
        _doReset() {
          let e10;
          if (this._nRounds && this._keyPriorReset === this._key) return;
          this._keyPriorReset = this._key;
          let t10 = this._keyPriorReset, r10 = t10.words, n10 = t10.sigBytes / 4;
          this._nRounds = n10 + 6;
          let i10 = (this._nRounds + 1) * 4;
          this._keySchedule = [];
          let s10 = this._keySchedule;
          for (let t11 = 0; t11 < i10; t11 += 1) t11 < n10 ? s10[t11] = r10[t11] : (e10 = s10[t11 - 1], t11 % n10 ? n10 > 6 && t11 % n10 == 4 && (e10 = aF[e10 >>> 24] << 24 | aF[e10 >>> 16 & 255] << 16 | aF[e10 >>> 8 & 255] << 8 | aF[255 & e10]) : e10 = (aF[(e10 = e10 << 8 | e10 >>> 24) >>> 24] << 24 | aF[e10 >>> 16 & 255] << 16 | aF[e10 >>> 8 & 255] << 8 | aF[255 & e10]) ^ a6[t11 / n10 | 0] << 24, s10[t11] = s10[t11 - n10] ^ e10);
          this._invKeySchedule = [];
          let a10 = this._invKeySchedule;
          for (let t11 = 0; t11 < i10; t11 += 1) {
            let r11 = i10 - t11;
            e10 = t11 % 4 ? s10[r11] : s10[r11 - 4], t11 < 4 || r11 <= 4 ? a10[t11] = e10 : a10[t11] = aZ[aF[e10 >>> 24]] ^ a0[aF[e10 >>> 16 & 255]] ^ a1[aF[e10 >>> 8 & 255]] ^ a2[aF[255 & e10]];
          }
        }
        encryptBlock(e10, t10) {
          this._doCryptBlock(e10, t10, this._keySchedule, aX, aG, aQ, aY, aF);
        }
        decryptBlock(e10, t10) {
          let r10 = e10[t10 + 1];
          e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10, this._doCryptBlock(e10, t10, this._invKeySchedule, aZ, a0, a1, a2, aV), r10 = e10[t10 + 1], e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10;
        }
        _doCryptBlock(e10, t10, r10, n10, i10, s10, a10, o2) {
          let l2 = this._nRounds, c2 = e10[t10] ^ r10[0], u2 = e10[t10 + 1] ^ r10[1], d2 = e10[t10 + 2] ^ r10[2], h2 = e10[t10 + 3] ^ r10[3], p2 = 4;
          for (let e11 = 1; e11 < l2; e11 += 1) {
            let e12 = n10[c2 >>> 24] ^ i10[u2 >>> 16 & 255] ^ s10[d2 >>> 8 & 255] ^ a10[255 & h2] ^ r10[p2];
            p2 += 1;
            let t11 = n10[u2 >>> 24] ^ i10[d2 >>> 16 & 255] ^ s10[h2 >>> 8 & 255] ^ a10[255 & c2] ^ r10[p2];
            p2 += 1;
            let o3 = n10[d2 >>> 24] ^ i10[h2 >>> 16 & 255] ^ s10[c2 >>> 8 & 255] ^ a10[255 & u2] ^ r10[p2];
            p2 += 1;
            let l3 = n10[h2 >>> 24] ^ i10[c2 >>> 16 & 255] ^ s10[u2 >>> 8 & 255] ^ a10[255 & d2] ^ r10[p2];
            p2 += 1, c2 = e12, u2 = t11, d2 = o3, h2 = l3;
          }
          let f2 = (o2[c2 >>> 24] << 24 | o2[u2 >>> 16 & 255] << 16 | o2[d2 >>> 8 & 255] << 8 | o2[255 & h2]) ^ r10[p2];
          p2 += 1;
          let m2 = (o2[u2 >>> 24] << 24 | o2[d2 >>> 16 & 255] << 16 | o2[h2 >>> 8 & 255] << 8 | o2[255 & c2]) ^ r10[p2];
          p2 += 1;
          let g2 = (o2[d2 >>> 24] << 24 | o2[h2 >>> 16 & 255] << 16 | o2[c2 >>> 8 & 255] << 8 | o2[255 & u2]) ^ r10[p2];
          p2 += 1;
          let y2 = (o2[h2 >>> 24] << 24 | o2[c2 >>> 16 & 255] << 16 | o2[u2 >>> 8 & 255] << 8 | o2[255 & d2]) ^ r10[p2];
          p2 += 1, e10[t10] = f2, e10[t10 + 1] = m2, e10[t10 + 2] = g2, e10[t10 + 3] = y2;
        }
      };
      a8.keySize = 8;
      var a9 = aB._createHelper(a8), a7 = [], oe = class extends aC {
        _doReset() {
          this._hash = new ak([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }
        _doProcessBlock(e10, t10) {
          let r10 = this._hash.words, n10 = r10[0], i10 = r10[1], s10 = r10[2], a10 = r10[3], o2 = r10[4];
          for (let r11 = 0; r11 < 80; r11 += 1) {
            if (r11 < 16) a7[r11] = 0 | e10[t10 + r11];
            else {
              let e11 = a7[r11 - 3] ^ a7[r11 - 8] ^ a7[r11 - 14] ^ a7[r11 - 16];
              a7[r11] = e11 << 1 | e11 >>> 31;
            }
            let l2 = (n10 << 5 | n10 >>> 27) + o2 + a7[r11];
            r11 < 20 ? l2 += (i10 & s10 | ~i10 & a10) + 1518500249 : r11 < 40 ? l2 += (i10 ^ s10 ^ a10) + 1859775393 : r11 < 60 ? l2 += (i10 & s10 | i10 & a10 | s10 & a10) - 1894007588 : l2 += (i10 ^ s10 ^ a10) - 899497514, o2 = a10, a10 = s10, s10 = i10 << 30 | i10 >>> 2, i10 = n10, n10 = l2;
          }
          r10[0] = r10[0] + n10 | 0, r10[1] = r10[1] + i10 | 0, r10[2] = r10[2] + s10 | 0, r10[3] = r10[3] + a10 | 0, r10[4] = r10[4] + o2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, n10 = 8 * e10.sigBytes;
          return t10[n10 >>> 5] |= 128 << 24 - n10 % 32, t10[(n10 + 64 >>> 9 << 4) + 14] = Math.floor(r10 / 4294967296), t10[(n10 + 64 >>> 9 << 4) + 15] = r10, e10.sigBytes = 4 * t10.length, this._process(), this._hash;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      }, ot = (aC._createHelper(oe), aC._createHmacHelper(oe));
      let or = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, on = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, oi = `Clerk: Unable to decrypt request data.

Refresh the page if your .env file was just updated. If the issue persists, ensure the encryption key is valid and properly set.

For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)`, os = tI({ packageName: "@clerk/nextjs" }), oa = "x-middleware-override-headers", oo = "x-middleware-request", ol = (e10, t10, r10) => {
        e10.headers.get(oa) || (e10.headers.set(oa, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${oo}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(oa, `${e10.headers.get(oa)},${t11}`), e10.headers.set(`${oo}-${t11}`, r11);
        });
      }, oc = (e10, t10) => {
        let r10, n10 = sC(null == t10 ? void 0 : t10.proxyUrl, e10.clerkUrl, sj);
        r10 = n10 && !s2(n10) ? new URL(n10, e10.clerkUrl).toString() : n10;
        let i10 = sC(t10.isSatellite, new URL(e10.url), sM), s10 = sC(t10.domain, new URL(e10.url), sq), a10 = (null == t10 ? void 0 : t10.signInUrl) || sD;
        if (i10 && !r10 && !s10) throw Error(or);
        if (i10 && !s2(a10) && t_(t10.secretKey || sA)) throw Error(on);
        return { proxyUrl: r10, isSatellite: i10, domain: s10, signInUrl: a10 };
      }, ou = (e10) => B.redirect(e10, { headers: { [r_.Headers.ClerkRedirectTo]: "true" } }), od = "clerk_keyless_dummy_key";
      function oh() {
        if (tE()) throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
        throw Error(oi);
      }
      function op(e10, t10) {
        return JSON.parse(a9.decrypt(e10, t10).toString(aT));
      }
      let of = async () => {
        var e10, t10;
        let r10;
        try {
          let e11 = await sJ(), t11 = sG(e11, r_.Headers.ClerkRequestData);
          r10 = function(e12) {
            if (!e12) return {};
            let t12 = tE() ? sN || sA : sN || sA || od;
            try {
              return op(e12, t12);
            } catch {
              if (s$) try {
                return op(e12, od);
              } catch {
                oh();
              }
              oh();
            }
          }(t11);
        } catch (e11) {
          if (e11 && sB(e11)) throw e11;
        }
        let n10 = null != (t10 = null == (e10 = sZ.getStore()) ? void 0 : e10.get("requestData")) ? t10 : r10;
        return (null == n10 ? void 0 : n10.secretKey) || (null == n10 ? void 0 : n10.publishableKey) ? sX(n10) : sX({});
      };
      class om {
        static createDefaultDirectives() {
          return Object.entries(this.DEFAULT_DIRECTIVES).reduce((e10, [t10, r10]) => (e10[t10] = new Set(r10), e10), {});
        }
        static isKeyword(e10) {
          return this.KEYWORDS.has(e10.replace(/^'|'$/g, ""));
        }
        static formatValue(e10) {
          let t10 = e10.replace(/^'|'$/g, "");
          return this.isKeyword(t10) ? `'${t10}'` : e10;
        }
        static handleDirectiveValues(e10) {
          let t10 = /* @__PURE__ */ new Set();
          return e10.includes("'none'") || e10.includes("none") ? t10.add("'none'") : e10.forEach((e11) => t10.add(this.formatValue(e11))), t10;
        }
      }
      om.KEYWORDS = /* @__PURE__ */ new Set(["none", "self", "strict-dynamic", "unsafe-eval", "unsafe-hashes", "unsafe-inline"]), om.DEFAULT_DIRECTIVES = { "connect-src": ["self", "https://clerk-telemetry.com", "https://*.clerk-telemetry.com", "https://api.stripe.com", "https://maps.googleapis.com"], "default-src": ["self"], "form-action": ["self"], "frame-src": ["self", "https://challenges.cloudflare.com", "https://*.js.stripe.com", "https://js.stripe.com", "https://hooks.stripe.com"], "img-src": ["self", "https://img.clerk.com"], "script-src": ["self", "unsafe-inline", "https:", "http:", "https://*.js.stripe.com", "https://js.stripe.com", "https://maps.googleapis.com"], "style-src": ["self", "unsafe-inline"], "worker-src": ["self", "blob:"] };
      let og = "__clerk_keys_";
      async function oy(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").slice(0, 16);
      }
      async function ov() {
        let e10 = process.env.PWD;
        if (!e10) return `${og}0`;
        let t10 = e10.split("/").filter(Boolean).slice(-3).reverse().join("/"), r10 = await oy(t10);
        return `${og}${r10}`;
      }
      async function ob(e10) {
        let t10;
        if (!s$) return;
        let r10 = await ov();
        try {
          r10 && (t10 = JSON.parse(e10(r10) || "{}"));
        } catch {
          t10 = void 0;
        }
        return t10;
      }
      let o_ = { REDIRECT_TO_URL: "CLERK_PROTECT_REDIRECT_TO_URL", REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN", REDIRECT_TO_SIGN_UP: "CLERK_PROTECT_REDIRECT_TO_SIGN_UP" }, ow = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, ok = new Set(Object.values(ow)), oS = "NEXT_HTTP_ERROR_FALLBACK";
      function oE(e10) {
        if (!function(e11) {
          if ("object" != typeof e11 || null === e11 || !("digest" in e11) || "string" != typeof e11.digest) return false;
          let [t11, r10] = e11.digest.split(";");
          return t11 === oS && ok.has(Number(r10));
        }(e10)) return;
        let [, t10] = e10.digest.split(";");
        return Number(t10);
      }
      let oT = "NEXT_REDIRECT";
      function ox(e10, t10, r10 = "replace", n10 = 307) {
        let i10 = Error(oT);
        throw i10.digest = `${oT};${r10};${e10};${n10};`, i10.clerk_digest = o_.REDIRECT_TO_URL, Object.assign(i10, t10), i10;
      }
      function oC(e10, t10) {
        return null === t10 ? "" : t10 || e10;
      }
      function oO(e10) {
        if ("object" != typeof e10 || null === e10 || !("digest" in e10) || "string" != typeof e10.digest) return false;
        let t10 = e10.digest.split(";"), [r10, n10] = t10, i10 = t10.slice(2, -2).join(";"), s10 = Number(t10.at(-2));
        return r10 === oT && ("replace" === n10 || "push" === n10) && "string" == typeof i10 && !isNaN(s10) && 307 === s10;
      }
      function oR() {
        let e10 = Error(oS);
        throw e10.digest = `${oS};${ow.UNAUTHORIZED}`, e10;
      }
      let oI = (e10) => {
        if (e10 && !e10.unauthenticatedUrl && !e10.unauthorizedUrl && !e10.token && (1 !== Object.keys(e10).length || !("token" in e10))) return e10;
      }, oA = (e10) => {
        var t10, r10;
        return !!e10.headers.get(sm.Headers.NextUrl) && ((null == (t10 = e10.headers.get(r_.Headers.Accept)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e10.headers.get(r_.Headers.ContentType)) ? void 0 : r10.includes("multipart/form-data")) || !!e10.headers.get(sm.Headers.NextAction));
      }, oP = (e10) => {
        var t10;
        return "document" === e10.headers.get(r_.Headers.SecFetchDest) || "iframe" === e10.headers.get(r_.Headers.SecFetchDest) || (null == (t10 = e10.headers.get(r_.Headers.Accept)) ? void 0 : t10.includes("text/html")) || oN(e10) || oq(e10);
      }, oN = (e10) => !!e10.headers.get(sm.Headers.NextUrl) && !oA(e10) || oU(), oU = () => {
        let e10 = globalThis.fetch;
        if (!function(e11) {
          return "__nextPatched" in e11 && true === e11.__nextPatched;
        }(e10)) return false;
        let { page: t10, pagePath: r10 } = e10.__nextGetStaticStore().getStore() || {};
        return !!(r10 || t10);
      }, oq = (e10) => !!e10.headers.get(sm.Headers.NextjsData), oj = (e10) => [e10[0] instanceof Request ? e10[0] : void 0, e10[0] instanceof Request ? e10[1] : void 0], oM = (e10) => ["function" == typeof e10[0] ? e10[0] : void 0, (2 === e10.length ? e10[1] : "function" == typeof e10[0] ? {} : e10[0]) || {}], oD = (e10) => "/clerk-sync-keyless" === e10.nextUrl.pathname, oL = (e10) => {
        let t10 = e10.nextUrl.searchParams.get("returnUrl"), r10 = new URL(e10.url);
        return r10.pathname = "", B.redirect(t10 || r10.toString());
      }, oH = (e10, t10) => ({ ...t10, ...oc(e10, t10), acceptsToken: "any" }), oz = (e10) => (t10 = {}) => {
        !function(e11, t11) {
          ox(e11, { clerk_digest: o_.REDIRECT_TO_SIGN_IN, returnBackUrl: oC(e11, t11) });
        }(e10.clerkUrl.toString(), t10.returnBackUrl);
      }, o$ = (e10) => (t10 = {}) => {
        !function(e11, t11) {
          ox(e11, { clerk_digest: o_.REDIRECT_TO_SIGN_UP, returnBackUrl: oC(e11, t11) });
        }(e10.clerkUrl.toString(), t10.returnBackUrl);
      }, oB = (e10, t10, r10) => async (n10, i10) => function(e11) {
        let { redirectToSignIn: t11, authObject: r11, redirect: n11, notFound: i11, request: s10, unauthorized: a10 } = e11;
        return async (...e12) => {
          var o2, l2, c2, u2, d2, h2;
          let p2 = oI(e12[0]), f2 = (null == (o2 = e12[0]) ? void 0 : o2.unauthenticatedUrl) || (null == (l2 = e12[1]) ? void 0 : l2.unauthenticatedUrl), m2 = (null == (c2 = e12[0]) ? void 0 : c2.unauthorizedUrl) || (null == (u2 = e12[1]) ? void 0 : u2.unauthorizedUrl), g2 = (null == (d2 = e12[0]) ? void 0 : d2.token) || (null == (h2 = e12[1]) ? void 0 : h2.token) || iR.SessionToken, y2 = () => r11.tokenType !== iR.SessionToken ? a10() : m2 ? n11(m2) : i11();
          return iU(r11.tokenType, g2) ? r11.tokenType !== iR.SessionToken ? r11.isAuthenticated ? r11 : y2() : "pending" !== r11.sessionStatus && r11.userId ? p2 ? "function" == typeof p2 ? p2(r11.has) ? r11 : y2() : r11.has(p2) ? r11 : y2() : r11 : f2 ? n11(f2) : oP(s10) ? t11() : i11() : y2();
        };
      }({ request: e10, redirect: (e11) => ox(e11, { redirectUrl: e11 }), notFound: () => function() {
        let e11 = Object.defineProperty(Error(sf), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        throw e11.digest = sf, e11;
      }(), unauthorized: oR, authObject: iz({ authObject: t10, acceptsToken: (null == n10 ? void 0 : n10.token) || (null == i10 ? void 0 : i10.token) || iR.SessionToken }), redirectToSignIn: r10 })(n10, i10), oJ = (e10, t10, r10) => async (n10) => {
        var i10;
        let s10 = null != (i10 = null == n10 ? void 0 : n10.acceptsToken) ? i10 : iR.SessionToken, a10 = iz({ authObject: e10, acceptsToken: s10 });
        return a10.tokenType === iR.SessionToken && iU(iR.SessionToken, s10) ? Object.assign(a10, { redirectToSignIn: t10, redirectToSignUp: r10 }) : a10;
      }, oK = (e10, t10, r10, n10) => {
        var i10;
        if (oE(e10) === ow.UNAUTHORIZED) {
          let e11 = new B(null, { status: 401 }), t11 = n10.toAuth();
          if (t11 && t11.tokenType === iR.OAuthToken) {
            let t12 = tv(n10.publishableKey);
            return sy(e11, "WWW-Authenticate", `Bearer resource_metadata="https://${null == t12 ? void 0 : t12.frontendApi}/.well-known/oauth-protected-resource"`);
          }
          return e11;
        }
        if (function(e11) {
          return "object" == typeof e11 && null !== e11 && "digest" in e11 && "NEXT_NOT_FOUND" === e11.digest || oE(e11) === ow.NOT_FOUND;
        }(e10)) return sy(B.rewrite(new URL(`/clerk_${Date.now()}`, r10.url)), r_.Headers.AuthReason, "protect-rewrite");
        let s10 = function(e11) {
          return !!oO(e11) && "clerk_digest" in e11 && e11.clerk_digest === o_.REDIRECT_TO_SIGN_IN;
        }(e10), a10 = function(e11) {
          return !!oO(e11) && "clerk_digest" in e11 && e11.clerk_digest === o_.REDIRECT_TO_SIGN_UP;
        }(e10);
        if (s10 || a10) {
          let r11 = rS({ redirectAdapter: ou, baseUrl: t10.clerkUrl, signInUrl: n10.signInUrl, signUpUrl: n10.signUpUrl, publishableKey: n10.publishableKey, sessionStatus: null == (i10 = n10.toAuth()) ? void 0 : i10.sessionStatus }), { returnBackUrl: a11 } = e10;
          return r11[s10 ? "redirectToSignIn" : "redirectToSignUp"]({ returnBackUrl: a11 });
        }
        if (oO(e10)) return ou(e10.redirectUrl);
        throw e10;
      }, oW = ((...e10) => {
        let [t10, r10] = oj(e10), [n10, i10] = oM(e10);
        return sZ.run(sY, () => {
          let e11 = sx("clerkMiddleware", (e12) => async (t11, r11) => {
            var s11, a11;
            let o2 = "function" == typeof i10 ? await i10(t11) : i10, l2 = await ob((e13) => {
              var r12;
              return null == (r12 = t11.cookies.get(e13)) ? void 0 : r12.value;
            }), c2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(o2.publishableKey || sP || (null == l2 ? void 0 : l2.publishableKey), () => os.throwMissingPublishableKeyError()), u2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(o2.secretKey || sA || (null == l2 ? void 0 : l2.secretKey), () => os.throwMissingSecretKeyError()), d2 = { publishableKey: c2, secretKey: u2, signInUrl: o2.signInUrl || sD, signUpUrl: o2.signUpUrl || "/sign-up", ...o2 };
            sY.set("requestData", d2);
            let h2 = await of();
            d2.debug && e12.enable();
            let p2 = iG(t11);
            e12.debug("options", d2), e12.debug("url", () => p2.toJSON());
            let f2 = t11.headers.get(r_.Headers.Authorization);
            f2 && f2.startsWith("Basic ") && e12.debug("Basic Auth detected");
            let m2 = t11.headers.get(r_.Headers.ContentSecurityPolicy);
            m2 && e12.debug("Content-Security-Policy detected", () => ({ value: m2 }));
            let g2 = await h2.authenticateRequest(p2, oH(p2, d2));
            e12.debug("requestState", () => ({ status: g2.status, headers: JSON.stringify(Object.fromEntries(g2.headers)), reason: g2.reason }));
            let y2 = g2.headers.get(r_.Headers.Location);
            if (y2) {
              let e13 = B.redirect(y2);
              return g2.headers.forEach((t12, r12) => {
                r12 !== r_.Headers.Location && e13.headers.append(r12, t12);
              }), e13;
            }
            if (g2.status === i$.Handshake) throw Error("Clerk: handshake status without redirect");
            let v2 = g2.toAuth();
            e12.debug("auth", () => ({ auth: v2, debug: v2.debug() }));
            let b2 = oz(p2), _2 = o$(p2), w2 = await oB(p2, v2, b2), k2 = oJ(v2, b2, _2);
            k2.protect = w2;
            let S2 = B.next();
            try {
              S2 = await sZ.run(sY, async () => null == n10 ? void 0 : n10(k2, t11, r11)) || S2;
            } catch (e13) {
              S2 = oK(e13, p2, t11, g2);
            }
            if (d2.contentSecurityPolicy) {
              let { headers: t12 } = function(e13, t13) {
                var r12;
                let n11 = [], i11 = t13.strict ? function() {
                  let e14 = new Uint8Array(16);
                  return crypto.getRandomValues(e14), btoa(Array.from(e14, (e15) => String.fromCharCode(e15)).join(""));
                }() : void 0, s12 = function(e14, t14, r13, n12) {
                  let i12 = Object.entries(om.DEFAULT_DIRECTIVES).reduce((e15, [t15, r14]) => (e15[t15] = new Set(r14), e15), {});
                  if (i12["connect-src"].add(t14), e14 && (i12["script-src"].delete("http:"), i12["script-src"].delete("https:"), i12["script-src"].add("'strict-dynamic'"), n12 && i12["script-src"].add(`'nonce-${n12}'`)), r13) {
                    let e15 = /* @__PURE__ */ new Map();
                    Object.entries(r13).forEach(([t15, r14]) => {
                      let n13 = Array.isArray(r14) ? r14 : [r14];
                      om.DEFAULT_DIRECTIVES[t15] ? function(e16, t16, r15) {
                        if (r15.includes("'none'") || r15.includes("none")) {
                          e16[t16] = /* @__PURE__ */ new Set(["'none'"]);
                          return;
                        }
                        let n14 = /* @__PURE__ */ new Set();
                        e16[t16].forEach((e17) => {
                          n14.add(om.formatValue(e17));
                        }), r15.forEach((e17) => {
                          n14.add(om.formatValue(e17));
                        }), e16[t16] = n14;
                      }(i12, t15, n13) : function(e16, t16, r15) {
                        if (r15.includes("'none'") || r15.includes("none")) return e16.set(t16, /* @__PURE__ */ new Set(["'none'"]));
                        let n14 = /* @__PURE__ */ new Set();
                        r15.forEach((e17) => {
                          let t17 = om.formatValue(e17);
                          n14.add(t17);
                        }), e16.set(t16, n14);
                      }(e15, t15, n13);
                    }), e15.forEach((e16, t15) => {
                      i12[t15] = e16;
                    });
                  }
                  return Object.entries(i12).sort(([e15], [t15]) => e15.localeCompare(t15)).map(([e15, t15]) => {
                    let r14 = Array.from(t15).map((e16) => ({ raw: e16, formatted: om.formatValue(e16) }));
                    return `${e15} ${r14.map((e16) => e16.formatted).join(" ")}`;
                  }).join("; ");
                }(null != (r12 = t13.strict) && r12, e13, t13.directives, i11);
                return t13.reportTo && (s12 += "; report-to csp-endpoint", n11.push([r_.Headers.ReportingEndpoints, `csp-endpoint="${t13.reportTo}"`])), t13.reportOnly ? n11.push([r_.Headers.ContentSecurityPolicyReportOnly, s12]) : n11.push([r_.Headers.ContentSecurityPolicy, s12]), i11 && n11.push([r_.Headers.Nonce, i11]), { headers: n11 };
              }((null != (a11 = null == (s11 = tv(c2)) ? void 0 : s11.frontendApi) ? a11 : "").replace("$", ""), d2.contentSecurityPolicy);
              t12.forEach(([e13, t13]) => {
                sy(S2, e13, t13);
              }), e12.debug("Clerk generated CSP", () => ({ headers: t12 }));
            }
            if (g2.headers && g2.headers.forEach((t12, r12) => {
              r12 === r_.Headers.ContentSecurityPolicy && e12.debug("Content-Security-Policy detected", () => ({ value: t12 })), S2.headers.append(r12, t12);
            }), sg(S2)) return e12.debug("handlerResult is redirect"), sw(p2, S2, d2);
            d2.debug && ol(S2, p2, { [r_.Headers.EnableDebug]: "true" });
            let E2 = u2 === (null == l2 ? void 0 : l2.secretKey) ? { publishableKey: null == l2 ? void 0 : l2.publishableKey, secretKey: null == l2 ? void 0 : l2.secretKey } : {};
            return !function(e13, t12, r12, n11, i11, s12) {
              let a12, { reason: o3, message: l3, status: c3, token: u3 } = r12;
              if (t12 || (t12 = B.next()), t12.headers.get(sm.Headers.NextRedirect)) return;
              "1" === t12.headers.get(sm.Headers.NextResume) && (t12.headers.delete(sm.Headers.NextResume), a12 = new URL(e13.url));
              let d3 = t12.headers.get(sm.Headers.NextRewrite);
              if (d3) {
                let t13 = new URL(e13.url);
                if ((a12 = new URL(d3)).origin !== t13.origin) return;
              }
              if (a12) {
                let r13 = function(e14, t13, r14) {
                  var n12;
                  let i12 = (e15) => !e15 || !Object.values(e15).some((e16) => void 0 !== e16);
                  if (i12(e14) && i12(t13) && !r14) return;
                  if (e14.secretKey && !sN) return void s1.warnOnce("Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys");
                  let s13 = tE() ? sN || (n12 = () => os.throwMissingSecretKeyError(), sA || n12(), sA) : sN || sA || od;
                  return a9.encrypt(JSON.stringify({ ...t13, ...e14, machineAuthObject: null != r14 ? r14 : void 0 }), s13).toString();
                }(n11, i11, s12);
                ol(t12, e13, { [r_.Headers.AuthStatus]: c3, [r_.Headers.AuthToken]: u3 || "", [r_.Headers.AuthSignature]: u3 ? ot(u3, (null == n11 ? void 0 : n11.secretKey) || sA || i11.secretKey || "").toString() : "", [r_.Headers.AuthMessage]: l3 || "", [r_.Headers.AuthReason]: o3 || "", [r_.Headers.ClerkUrl]: e13.clerkUrl.toString(), ...r13 ? { [r_.Headers.ClerkRequestData]: r13 } : {} }), t12.headers.set(sm.Headers.NextRewrite, a12.href);
              }
            }(p2, S2, g2, o2, E2, "session_token" === v2.tokenType ? null : iL(v2)), S2;
          }), s10 = async (t11, r11) => {
            var n11, s11;
            if (oD(t11)) return oL(t11);
            let a11 = "function" == typeof i10 ? await i10(t11) : i10, o2 = await ob((e12) => {
              var r12;
              return null == (r12 = t11.cookies.get(e12)) ? void 0 : r12.value;
            }), l2 = !(a11.publishableKey || sP || (null == o2 ? void 0 : o2.publishableKey)), c2 = null != (s11 = null == (n11 = sG(t11, r_.Headers.Authorization)) ? void 0 : n11.replace("Bearer ", "")) ? s11 : "";
            if (l2 && !iP(c2)) {
              let e12 = B.next();
              return ol(e12, t11, { [r_.Headers.AuthStatus]: "signed-out" }), e12;
            }
            return e11(t11, r11);
          }, a10 = async (t11, r11) => s$ ? s10(t11, r11) : e11(t11, r11);
          return t10 && r10 ? a10(t10, r10) : a10;
        });
      })(), oF = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"] };
      r(199);
      let oV = { ...i }, oX = oV.middleware || oV.default, oG = "/middleware";
      if ("function" != typeof oX) throw Object.defineProperty(Error(`The Middleware "${oG}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function oQ(e10) {
        return e5({ ...e10, page: oG, handler: async (...e11) => {
          try {
            return await oX(...e11);
          } catch (i10) {
            let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
            throw await l(i10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), i10;
          }
        } });
      }
    }, 221: (e, t, r) => {
      "use strict";
      r.d(t, { headers: () => b }), r(818), r(725);
      var n = r(535), i = r(115), s = r(557), a = r(602), o = r(801), l = r(815);
      let c = { current: null }, u = "function" == typeof l.cache ? l.cache : (e2) => e2, d = console.warn;
      function h(e2) {
        return function(...t2) {
          d(e2(...t2));
        };
      }
      u((e2) => {
        try {
          d(c.current);
        } finally {
          c.current = null;
        }
      });
      var p = r(335);
      let f = /* @__PURE__ */ new WeakMap(), m = h(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      });
      function g() {
        return this.getAll().map((e2) => [e2.name, e2]).values();
      }
      function y(e2) {
        for (let e3 of this.getAll()) this.delete(e3.name);
        return e2;
      }
      var v = r(381);
      function b() {
        let e2 = n.J.getStore(), t2 = i.FP.getStore();
        if (e2) {
          if (t2 && "after" === t2.phase && !(0, p.iC)()) throw Object.defineProperty(Error(`Route ${e2.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
          if (e2.forceStatic) return w(v.o.seal(new Headers({})));
          if (t2) {
            if ("cache" === t2.type) throw Object.defineProperty(Error(`Route ${e2.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
            else if ("unstable-cache" === t2.type) throw Object.defineProperty(Error(`Route ${e2.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
          }
          if (e2.dynamicShouldError) throw Object.defineProperty(new a.f(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
          if (t2) if ("prerender" === t2.type) {
            var r2 = e2.route, l2 = t2;
            let n2 = _.get(l2);
            if (n2) return n2;
            let i2 = (0, o.W)(l2.renderSignal, "`headers()`");
            return _.set(l2, i2), Object.defineProperties(i2, { append: { value: function() {
              let e3 = `\`headers().append(${k(arguments[0])}, ...)\``, t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, delete: { value: function() {
              let e3 = `\`headers().delete(${k(arguments[0])})\``, t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, get: { value: function() {
              let e3 = `\`headers().get(${k(arguments[0])})\``, t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, has: { value: function() {
              let e3 = `\`headers().has(${k(arguments[0])})\``, t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, set: { value: function() {
              let e3 = `\`headers().set(${k(arguments[0])}, ...)\``, t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, getSetCookie: { value: function() {
              let e3 = "`headers().getSetCookie()`", t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, forEach: { value: function() {
              let e3 = "`headers().forEach(...)`", t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, keys: { value: function() {
              let e3 = "`headers().keys()`", t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, values: { value: function() {
              let e3 = "`headers().values()`", t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, entries: { value: function() {
              let e3 = "`headers().entries()`", t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } }, [Symbol.iterator]: { value: function() {
              let e3 = "`headers()[Symbol.iterator]()`", t3 = E(r2, e3);
              (0, s.t3)(r2, e3, t3, l2);
            } } }), i2;
          } else "prerender-ppr" === t2.type ? (0, s.Ui)(e2.route, "headers", t2.dynamicTracking) : "prerender-legacy" === t2.type && (0, s.xI)("headers", e2, t2);
          (0, s.Pk)(e2, t2);
        }
        return w((0, i.XN)("headers").headers);
      }
      let _ = /* @__PURE__ */ new WeakMap();
      function w(e2) {
        let t2 = _.get(e2);
        if (t2) return t2;
        let r2 = Promise.resolve(e2);
        return _.set(e2, r2), Object.defineProperties(r2, { append: { value: e2.append.bind(e2) }, delete: { value: e2.delete.bind(e2) }, get: { value: e2.get.bind(e2) }, has: { value: e2.has.bind(e2) }, set: { value: e2.set.bind(e2) }, getSetCookie: { value: e2.getSetCookie.bind(e2) }, forEach: { value: e2.forEach.bind(e2) }, keys: { value: e2.keys.bind(e2) }, values: { value: e2.values.bind(e2) }, entries: { value: e2.entries.bind(e2) }, [Symbol.iterator]: { value: e2[Symbol.iterator].bind(e2) } }), r2;
      }
      function k(e2) {
        return "string" == typeof e2 ? `'${e2}'` : "...";
      }
      let S = h(E);
      function E(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }
      function T() {
        let e2 = workAsyncStorage.getStore(), t2 = workUnitAsyncStorage.getStore();
        switch ((!e2 || !t2) && throwForMissingRequestStore("draftMode"), t2.type) {
          case "request":
            return x(t2.draftMode, e2);
          case "cache":
          case "unstable-cache":
            let r2 = getDraftModeProviderForCacheScope(e2, t2);
            if (r2) return x(r2, e2);
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            return O(null);
          default:
            return t2;
        }
      }
      function x(e2, t2) {
        let r2, n2 = C.get(T);
        return n2 || (r2 = O(e2), C.set(e2, r2), r2);
      }
      r(16);
      let C = /* @__PURE__ */ new WeakMap();
      function O(e2) {
        let t2 = new R(e2), r2 = Promise.resolve(t2);
        return Object.defineProperty(r2, "isEnabled", { get: () => t2.isEnabled, set(e3) {
          Object.defineProperty(r2, "isEnabled", { value: e3, writable: true, enumerable: true });
        }, enumerable: true, configurable: true }), r2.enable = t2.enable.bind(t2), r2.disable = t2.disable.bind(t2), r2;
      }
      class R {
        constructor(e2) {
          this._provider = e2;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          A("draftMode().enable()"), null !== this._provider && this._provider.enable();
        }
        disable() {
          A("draftMode().disable()"), null !== this._provider && this._provider.disable();
        }
      }
      let I = h(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${r2}used ${t2}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      });
      function A(e2) {
        let t2 = workAsyncStorage.getStore(), r2 = workUnitAsyncStorage.getStore();
        if (t2) {
          if (r2) {
            if ("cache" === r2.type) throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E246", enumerable: false, configurable: true });
            else if ("unstable-cache" === r2.type) throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E259", enumerable: false, configurable: true });
            else if ("after" === r2.phase) throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E348", enumerable: false, configurable: true });
          }
          if (t2.dynamicShouldError) throw Object.defineProperty(new StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (r2) {
            if ("prerender" === r2.type) {
              let n2 = Object.defineProperty(Error(`Route ${t2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              abortAndThrowOnSynchronousRequestDataAccess(t2.route, e2, n2, r2);
            } else if ("prerender-ppr" === r2.type) postponeWithTracking(t2.route, e2, r2.dynamicTracking);
            else if ("prerender-legacy" === r2.type) {
              r2.revalidate = 0;
              let n2 = Object.defineProperty(new DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
            }
          }
        }
      }
    }, 280: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, s2) {
          !function(a2, o) {
            "use strict";
            var l = "function", c = "undefined", u = "object", d = "string", h = "major", p = "model", f = "name", m = "type", g = "vendor", y = "version", v = "architecture", b = "console", _ = "mobile", w = "tablet", k = "smarttv", S = "wearable", E = "embedded", T = "Amazon", x = "Apple", C = "ASUS", O = "BlackBerry", R = "Browser", I = "Chrome", A = "Firefox", P = "Google", N = "Huawei", U = "Microsoft", q = "Motorola", j = "Opera", M = "Samsung", D = "Sharp", L = "Sony", H = "Xiaomi", z = "Zebra", $ = "Facebook", B = "Chromium OS", J = "Mac OS", K = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, W = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, F = function(e2, t2) {
              return typeof e2 === d && -1 !== V(t2).indexOf(V(e2));
            }, V = function(e2) {
              return e2.toLowerCase();
            }, X = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === c ? e2 : e2.substring(0, 350);
            }, G = function(e2, t2) {
              for (var r2, n2, i3, s3, a3, c2, d2 = 0; d2 < t2.length && !a3; ) {
                var h2 = t2[d2], p2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < h2.length && !a3 && h2[r2]; ) if (a3 = h2[r2++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) c2 = a3[++n2], typeof (s3 = p2[i3]) === u && s3.length > 0 ? 2 === s3.length ? typeof s3[1] == l ? this[s3[0]] = s3[1].call(this, c2) : this[s3[0]] = s3[1] : 3 === s3.length ? typeof s3[1] !== l || s3[1].exec && s3[1].test ? this[s3[0]] = c2 ? c2.replace(s3[1], s3[2]) : void 0 : this[s3[0]] = c2 ? s3[1].call(this, c2, s3[2]) : void 0 : 4 === s3.length && (this[s3[0]] = c2 ? s3[3].call(this, c2.replace(s3[1], s3[2])) : o) : this[s3] = c2 || o;
                d2 += 2;
              }
            }, Q = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (F(t2[r2][n2], e2)) return "?" === r2 ? o : r2;
              } else if (F(t2[r2], e2)) return "?" === r2 ? o : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [y, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [y, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, y], [/opios[\/ ]+([\w\.]+)/i], [y, [f, j + " Mini"]], [/\bopr\/([\w\.]+)/i], [y, [f, j]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, y], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [y, [f, "UC" + R]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [y, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [y, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [y, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [y, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [y, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + R], y], [/\bfocus\/([\w\.]+)/i], [y, [f, A + " Focus"]], [/\bopt\/([\w\.]+)/i], [y, [f, j + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [y, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [y, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [y, [f, j + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [y, [f, "MIUI " + R]], [/fxios\/([-\w\.]+)/i], [y, [f, A]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + R]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + R], y], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], y], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, y], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, $], y], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, y], [/\bgsa\/([\w\.]+) .*safari\//i], [y, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [y, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [y, [f, I + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, I + " WebView"], y], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [y, [f, "Android " + R]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, y], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [y, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [y, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [y, Q, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, y], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], y], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [y, [f, A + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, y], [/(cobalt)\/([\w\.]+)/i], [f, [y, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[v, "amd64"]], [/(ia32(?=;))/i], [[v, V]], [/((?:i[346]|x)86)[;\)]/i], [[v, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[v, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[v, "armhf"]], [/windows (ce|mobile); ppc;/i], [[v, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[v, /ower/, "", V]], [/(sun4\w)[;\)]/i], [[v, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[v, V]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [g, M], [m, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [g, M], [m, _]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [g, x], [m, _]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [g, x], [m, w]], [/(macintosh);/i], [p, [g, x]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [g, D], [m, _]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [g, N], [m, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [g, N], [m, _]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [g, H], [m, _]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [g, H], [m, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [g, "OPPO"], [m, _]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [g, "Vivo"], [m, _]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [g, "Realme"], [m, _]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [g, q], [m, _]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [g, q], [m, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [g, "LG"], [m, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [g, "LG"], [m, _]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [g, "Lenovo"], [m, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [g, "Nokia"], [m, _]], [/(pixel c)\b/i], [p, [g, P], [m, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [g, P], [m, _]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [g, L], [m, _]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [g, L], [m, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [g, "OnePlus"], [m, _]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [g, T], [m, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [g, T], [m, _]], [/(playbook);[-\w\),; ]+(rim)/i], [p, g, [m, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [g, O], [m, _]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [g, C], [m, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [g, C], [m, _]], [/(nexus 9)/i], [p, [g, "HTC"], [m, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [g, [p, /_/g, " "], [m, _]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [g, "Acer"], [m, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [g, "Meizu"], [m, _]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [g, p, [m, _]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [g, p, [m, w]], [/(surface duo)/i], [p, [g, U], [m, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [g, "Fairphone"], [m, _]], [/(u304aa)/i], [p, [g, "AT&T"], [m, _]], [/\bsie-(\w*)/i], [p, [g, "Siemens"], [m, _]], [/\b(rct\w+) b/i], [p, [g, "RCA"], [m, w]], [/\b(venue[\d ]{2,7}) b/i], [p, [g, "Dell"], [m, w]], [/\b(q(?:mv|ta)\w+) b/i], [p, [g, "Verizon"], [m, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [g, "Barnes & Noble"], [m, w]], [/\b(tm\d{3}\w+) b/i], [p, [g, "NuVision"], [m, w]], [/\b(k88) b/i], [p, [g, "ZTE"], [m, w]], [/\b(nx\d{3}j) b/i], [p, [g, "ZTE"], [m, _]], [/\b(gen\d{3}) b.+49h/i], [p, [g, "Swiss"], [m, _]], [/\b(zur\d{3}) b/i], [p, [g, "Swiss"], [m, w]], [/\b((zeki)?tb.*\b) b/i], [p, [g, "Zeki"], [m, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[g, "Dragon Touch"], p, [m, w]], [/\b(ns-?\w{0,9}) b/i], [p, [g, "Insignia"], [m, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [g, "NextBook"], [m, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[g, "Voice"], p, [m, _]], [/\b(lvtel\-)?(v1[12]) b/i], [[g, "LvTel"], p, [m, _]], [/\b(ph-1) /i], [p, [g, "Essential"], [m, _]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [g, "Envizen"], [m, w]], [/\b(trio[-\w\. ]+) b/i], [p, [g, "MachSpeed"], [m, w]], [/\btu_(1491) b/i], [p, [g, "Rotor"], [m, w]], [/(shield[\w ]+) b/i], [p, [g, "Nvidia"], [m, w]], [/(sprint) (\w+)/i], [g, p, [m, _]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [g, U], [m, _]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [g, z], [m, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [g, z], [m, _]], [/smart-tv.+(samsung)/i], [g, [m, k]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [g, M], [m, k]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[g, "LG"], [m, k]], [/(apple) ?tv/i], [g, [p, x + " TV"], [m, k]], [/crkey/i], [[p, I + "cast"], [g, P], [m, k]], [/droid.+aft(\w)( bui|\))/i], [p, [g, T], [m, k]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [g, D], [m, k]], [/(bravia[\w ]+)( bui|\))/i], [p, [g, L], [m, k]], [/(mitv-\w{5}) bui/i], [p, [g, H], [m, k]], [/Hbbtv.*(technisat) (.*);/i], [g, p, [m, k]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[g, X], [p, X], [m, k]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[m, k]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [g, p, [m, b]], [/droid.+; (shield) bui/i], [p, [g, "Nvidia"], [m, b]], [/(playstation [345portablevi]+)/i], [p, [g, L], [m, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [g, U], [m, b]], [/((pebble))app/i], [g, p, [m, S]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [g, x], [m, S]], [/droid.+; (glass) \d/i], [p, [g, P], [m, S]], [/droid.+; (wt63?0{2,3})\)/i], [p, [g, z], [m, S]], [/(quest( 2| pro)?)/i], [p, [g, $], [m, S]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [g, [m, E]], [/(aeobc)\b/i], [p, [g, T], [m, E]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [m, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [m, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[m, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[m, _]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [g, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [y, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [y, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, y], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [y, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, y], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [y, Q, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [y, Q, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[y, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, J], [y, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [y, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, y], [/\(bb(10);/i], [y, [f, O]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [y, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [y, [f, A + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [y, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [y, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [y, [f, I + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, B], y], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, y], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], y], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, y]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = o), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== c && a2.navigator ? a2.navigator : o, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : o, s3 = t2 ? K(Z, t2) : Z, b2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o, t3[y] = o, G.call(t3, n2, s3.browser), t3[h] = typeof (e3 = t3[y]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o, b2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[v] = o, G.call(e3, n2, s3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[g] = o, e3[p] = o, e3[m] = o, G.call(e3, n2, s3.device), b2 && !e3[m] && i3 && i3.mobile && (e3[m] = _), b2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== c && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[m] = w), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o, e3[y] = o, G.call(e3, n2, s3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o, e3[y] = o, G.call(e3, n2, s3.os), b2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, B).replace(/macos/i, J)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? X(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = W([f, y, h]), ee.CPU = W([v]), ee.DEVICE = W([p, g, m, b, _, k, w, S, E]), ee.ENGINE = ee.OS = W([f, y]), typeof s2 !== c ? (i2.exports && (s2 = i2.exports = ee), s2.UAParser = ee) : r.amdO ? void 0 === (n = function() {
              return ee;
            }.call(t, r, t, e)) || (e.exports = n) : typeof a2 !== c && (a2.UAParser = ee);
            var et = typeof a2 !== c && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, s = {};
        function a(e2) {
          var t2 = s[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = s[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, a), n2 = false;
          } finally {
            n2 && delete s[e2];
          }
          return r2.exports;
        }
        a.ab = "//", e.exports = a(226);
      })();
    }, 335: (e, t, r) => {
      "use strict";
      r.d(t, { iC: () => i }), r(602);
      var n = r(427);
      function i() {
        let e2 = n.Z.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 381: (e, t, r) => {
      "use strict";
      r.d(t, { o: () => s });
      var n = r(716);
      class i extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new i();
        }
      }
      class s extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, i2) {
            if ("symbol" == typeof r2) return n.l.get(t2, r2, i2);
            let s2 = r2.toLowerCase(), a = Object.keys(e2).find((e3) => e3.toLowerCase() === s2);
            if (void 0 !== a) return n.l.get(t2, a, i2);
          }, set(t2, r2, i2, s2) {
            if ("symbol" == typeof r2) return n.l.set(t2, r2, i2, s2);
            let a = r2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === a);
            return n.l.set(t2, o ?? r2, i2, s2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return n.l.has(t2, r2);
            let i2 = r2.toLowerCase(), s2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 !== s2 && n.l.has(t2, s2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return n.l.deleteProperty(t2, r2);
            let i2 = r2.toLowerCase(), s2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 === s2 || n.l.deleteProperty(t2, s2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return i.callable;
              default:
                return n.l.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new s(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 427: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => n });
      let n = (0, r(620).xl)();
    }, 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 535: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n });
      let n = (0, r(58).xl)();
    }, 552: (e, t, r) => {
      "use strict";
      var n = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return s;
      } });
      let i = r(201), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: i2, headers: s2, body: a2, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(s2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, c = await a(o2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!u.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
        }
        let { status: p, headers: f, body: m } = d.response;
        return new Response(m ? n.from(m, "base64") : null, { status: p, headers: new Headers(f) });
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 554: (e, t) => {
      "use strict";
      t.qg = function(e2, t2) {
        let a = new r(), o = e2.length;
        if (o < 2) return a;
        let l = t2?.decode || s, c = 0;
        do {
          let t3 = e2.indexOf("=", c);
          if (-1 === t3) break;
          let r2 = e2.indexOf(";", c), s2 = -1 === r2 ? o : r2;
          if (t3 > s2) {
            c = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let u = n(e2, c, t3), d = i(e2, t3, u), h = e2.slice(u, d);
          if (void 0 === a[h]) {
            let r3 = n(e2, t3 + 1, s2), o2 = i(e2, s2, r3), c2 = l(e2.slice(r3, o2));
            a[h] = c2;
          }
          c = s2 + 1;
        } while (c < o);
        return a;
      }, Object.prototype.toString;
      let r = (() => {
        let e2 = function() {
        };
        return e2.prototype = /* @__PURE__ */ Object.create(null), e2;
      })();
      function n(e2, t2, r2) {
        do {
          let r3 = e2.charCodeAt(t2);
          if (32 !== r3 && 9 !== r3) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function i(e2, t2, r2) {
        for (; t2 > r2; ) {
          let r3 = e2.charCodeAt(--t2);
          if (32 !== r3 && 9 !== r3) return t2 + 1;
        }
        return r2;
      }
      function s(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 557: (e, t, r) => {
      "use strict";
      r.d(t, { t3: () => l, I3: () => d, Ui: () => c, xI: () => a, Pk: () => o });
      var n = r(815), i = r(16);
      r(602), r(115), r(535), r(801);
      let s = "function" == typeof n.unstable_postpone;
      function a(e2, t2, r2) {
        let n2 = Object.defineProperty(new i.F(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function o(e2, t2) {
        t2 && "cache" !== t2.type && "unstable-cache" !== t2.type && ("prerender" === t2.type || "prerender-legacy" === t2.type) && (t2.revalidate = 0);
      }
      function l(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2 = n2.dynamicTracking;
          i2 && null === i2.syncDynamicErrorWithStack && (i2.syncDynamicExpression = t2, i2.syncDynamicErrorWithStack = r2, true === n2.validating && (i2.syncDynamicLogged = true)), function(e3, t3, r3) {
            let n3 = p(`Route ${e3} needs to bail out of prerendering at this point because it used ${t3}.`);
            r3.controller.abort(n3);
            let i3 = r3.dynamicTracking;
            i3 && i3.dynamicAccesses.push({ stack: i3.isDebugDynamicAccesses ? Error().stack : void 0, expression: t3 });
          }(e2, t2, n2);
        }
        throw p(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function c(e2, t2, r2) {
        (function() {
          if (!s) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), n.unstable_postpone(u(e2, t2));
      }
      function u(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function d(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && h(e2.message);
      }
      function h(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === h(u("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      function p(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 602: (e, t, r) => {
      "use strict";
      r.d(t, { f: () => n });
      class n extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 620: (e, t, r) => {
      "use strict";
      r.d(t, { cg: () => o, xl: () => a });
      let n = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let s = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return s ? new s() : new i();
      }
      function o(e2) {
        return s ? s.bind(e2) : i.bind(e2);
      }
    }, 700: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { DiagConsoleLogger: () => U, DiagLogLevel: () => n, INVALID_SPANID: () => ed, INVALID_SPAN_CONTEXT: () => ep, INVALID_TRACEID: () => eh, ProxyTracer: () => eA, ProxyTracerProvider: () => eN, ROOT_CONTEXT: () => P, SamplingDecision: () => a, SpanKind: () => o, SpanStatusCode: () => l, TraceFlags: () => s, ValueType: () => i, baggageEntryMetadataFromString: () => I, context: () => eH, createContextKey: () => A, createNoopMeter: () => ee, createTraceState: () => eL, default: () => e2, defaultTextMapGetter: () => et, defaultTextMapSetter: () => er, diag: () => ez, isSpanContextValid: () => ex, isValidSpanId: () => eT, isValidTraceId: () => eE, metrics: () => eJ, propagation: () => eZ, trace: () => e1 });
      var n, i, s, a, o, l, c = "object" == typeof globalThis ? globalThis : "object" == typeof self ? self : "object" == typeof window ? window : "object" == typeof r.g ? r.g : {}, u = "1.9.0", d = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/, h = function(e3) {
        var t2 = /* @__PURE__ */ new Set([e3]), r2 = /* @__PURE__ */ new Set(), n2 = e3.match(d);
        if (!n2) return function() {
          return false;
        };
        var i2 = { major: +n2[1], minor: +n2[2], patch: +n2[3], prerelease: n2[4] };
        if (null != i2.prerelease) return function(t3) {
          return t3 === e3;
        };
        function s2(e4) {
          return r2.add(e4), false;
        }
        return function(e4) {
          if (t2.has(e4)) return true;
          if (r2.has(e4)) return false;
          var n3 = e4.match(d);
          if (!n3) return s2(e4);
          var a2 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
          if (null != a2.prerelease || i2.major !== a2.major) return s2(e4);
          if (0 === i2.major) return i2.minor === a2.minor && i2.patch <= a2.patch ? (t2.add(e4), true) : s2(e4);
          return i2.minor <= a2.minor ? (t2.add(e4), true) : s2(e4);
        };
      }(u), p = Symbol.for("opentelemetry.js.api." + u.split(".")[0]);
      function f(e3, t2, r2, n2) {
        void 0 === n2 && (n2 = false);
        var i2, s2 = c[p] = null != (i2 = c[p]) ? i2 : { version: u };
        if (!n2 && s2[e3]) {
          var a2 = Error("@opentelemetry/api: Attempted duplicate registration of API: " + e3);
          return r2.error(a2.stack || a2.message), false;
        }
        if (s2.version !== u) {
          var a2 = Error("@opentelemetry/api: Registration of version v" + s2.version + " for " + e3 + " does not match previously registered API v" + u);
          return r2.error(a2.stack || a2.message), false;
        }
        return s2[e3] = t2, r2.debug("@opentelemetry/api: Registered a global for " + e3 + " v" + u + "."), true;
      }
      function m(e3) {
        var t2, r2, n2 = null == (t2 = c[p]) ? void 0 : t2.version;
        if (n2 && h(n2)) return null == (r2 = c[p]) ? void 0 : r2[e3];
      }
      function g(e3, t2) {
        t2.debug("@opentelemetry/api: Unregistering a global for " + e3 + " v" + u + ".");
        var r2 = c[p];
        r2 && delete r2[e3];
      }
      var y = function(e3, t2) {
        var r2 = "function" == typeof Symbol && e3[Symbol.iterator];
        if (!r2) return e3;
        var n2, i2, s2 = r2.call(e3), a2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(n2 = s2.next()).done; ) a2.push(n2.value);
        } catch (e4) {
          i2 = { error: e4 };
        } finally {
          try {
            n2 && !n2.done && (r2 = s2.return) && r2.call(s2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      }, v = function(e3, t2, r2) {
        if (r2 || 2 == arguments.length) for (var n2, i2 = 0, s2 = t2.length; i2 < s2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e3.concat(n2 || Array.prototype.slice.call(t2));
      }, b = function() {
        function e3(e4) {
          this._namespace = e4.namespace || "DiagComponentLogger";
        }
        return e3.prototype.debug = function() {
          for (var e4 = [], t2 = 0; t2 < arguments.length; t2++) e4[t2] = arguments[t2];
          return _("debug", this._namespace, e4);
        }, e3.prototype.error = function() {
          for (var e4 = [], t2 = 0; t2 < arguments.length; t2++) e4[t2] = arguments[t2];
          return _("error", this._namespace, e4);
        }, e3.prototype.info = function() {
          for (var e4 = [], t2 = 0; t2 < arguments.length; t2++) e4[t2] = arguments[t2];
          return _("info", this._namespace, e4);
        }, e3.prototype.warn = function() {
          for (var e4 = [], t2 = 0; t2 < arguments.length; t2++) e4[t2] = arguments[t2];
          return _("warn", this._namespace, e4);
        }, e3.prototype.verbose = function() {
          for (var e4 = [], t2 = 0; t2 < arguments.length; t2++) e4[t2] = arguments[t2];
          return _("verbose", this._namespace, e4);
        }, e3;
      }();
      function _(e3, t2, r2) {
        var n2 = m("diag");
        if (n2) return r2.unshift(t2), n2[e3].apply(n2, v([], y(r2), false));
      }
      !function(e3) {
        e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
      }(n || (n = {}));
      var w = function(e3, t2) {
        var r2 = "function" == typeof Symbol && e3[Symbol.iterator];
        if (!r2) return e3;
        var n2, i2, s2 = r2.call(e3), a2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(n2 = s2.next()).done; ) a2.push(n2.value);
        } catch (e4) {
          i2 = { error: e4 };
        } finally {
          try {
            n2 && !n2.done && (r2 = s2.return) && r2.call(s2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      }, k = function(e3, t2, r2) {
        if (r2 || 2 == arguments.length) for (var n2, i2 = 0, s2 = t2.length; i2 < s2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e3.concat(n2 || Array.prototype.slice.call(t2));
      }, S = function() {
        function e3() {
          function e4(e5) {
            return function() {
              for (var t3 = [], r2 = 0; r2 < arguments.length; r2++) t3[r2] = arguments[r2];
              var n2 = m("diag");
              if (n2) return n2[e5].apply(n2, k([], w(t3), false));
            };
          }
          var t2 = this;
          t2.setLogger = function(e5, r2) {
            if (void 0 === r2 && (r2 = { logLevel: n.INFO }), e5 === t2) {
              var i2, s2, a2, o2 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
              return t2.error(null != (i2 = o2.stack) ? i2 : o2.message), false;
            }
            "number" == typeof r2 && (r2 = { logLevel: r2 });
            var l2 = m("diag"), c2 = function(e6, t3) {
              function r3(r4, n2) {
                var i3 = t3[r4];
                return "function" == typeof i3 && e6 >= n2 ? i3.bind(t3) : function() {
                };
              }
              return e6 < n.NONE ? e6 = n.NONE : e6 > n.ALL && (e6 = n.ALL), t3 = t3 || {}, { error: r3("error", n.ERROR), warn: r3("warn", n.WARN), info: r3("info", n.INFO), debug: r3("debug", n.DEBUG), verbose: r3("verbose", n.VERBOSE) };
            }(null != (s2 = r2.logLevel) ? s2 : n.INFO, e5);
            if (l2 && !r2.suppressOverrideMessage) {
              var u2 = null != (a2 = Error().stack) ? a2 : "<failed to generate stacktrace>";
              l2.warn("Current logger will be overwritten from " + u2), c2.warn("Current logger will overwrite one already registered from " + u2);
            }
            return f("diag", c2, t2, true);
          }, t2.disable = function() {
            g("diag", t2);
          }, t2.createComponentLogger = function(e5) {
            return new b(e5);
          }, t2.verbose = e4("verbose"), t2.debug = e4("debug"), t2.info = e4("info"), t2.warn = e4("warn"), t2.error = e4("error");
        }
        return e3.instance = function() {
          return this._instance || (this._instance = new e3()), this._instance;
        }, e3;
      }(), E = function(e3, t2) {
        var r2 = "function" == typeof Symbol && e3[Symbol.iterator];
        if (!r2) return e3;
        var n2, i2, s2 = r2.call(e3), a2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(n2 = s2.next()).done; ) a2.push(n2.value);
        } catch (e4) {
          i2 = { error: e4 };
        } finally {
          try {
            n2 && !n2.done && (r2 = s2.return) && r2.call(s2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      }, T = function(e3) {
        var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e3[t2], n2 = 0;
        if (r2) return r2.call(e3);
        if (e3 && "number" == typeof e3.length) return { next: function() {
          return e3 && n2 >= e3.length && (e3 = void 0), { value: e3 && e3[n2++], done: !e3 };
        } };
        throw TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, x = function() {
        function e3(e4) {
          this._entries = e4 ? new Map(e4) : /* @__PURE__ */ new Map();
        }
        return e3.prototype.getEntry = function(e4) {
          var t2 = this._entries.get(e4);
          if (t2) return Object.assign({}, t2);
        }, e3.prototype.getAllEntries = function() {
          return Array.from(this._entries.entries()).map(function(e4) {
            var t2 = E(e4, 2);
            return [t2[0], t2[1]];
          });
        }, e3.prototype.setEntry = function(t2, r2) {
          var n2 = new e3(this._entries);
          return n2._entries.set(t2, r2), n2;
        }, e3.prototype.removeEntry = function(t2) {
          var r2 = new e3(this._entries);
          return r2._entries.delete(t2), r2;
        }, e3.prototype.removeEntries = function() {
          for (var t2, r2, n2 = [], i2 = 0; i2 < arguments.length; i2++) n2[i2] = arguments[i2];
          var s2 = new e3(this._entries);
          try {
            for (var a2 = T(n2), o2 = a2.next(); !o2.done; o2 = a2.next()) {
              var l2 = o2.value;
              s2._entries.delete(l2);
            }
          } catch (e4) {
            t2 = { error: e4 };
          } finally {
            try {
              o2 && !o2.done && (r2 = a2.return) && r2.call(a2);
            } finally {
              if (t2) throw t2.error;
            }
          }
          return s2;
        }, e3.prototype.clear = function() {
          return new e3();
        }, e3;
      }(), C = Symbol("BaggageEntryMetadata"), O = S.instance();
      function R(e3) {
        return void 0 === e3 && (e3 = {}), new x(new Map(Object.entries(e3)));
      }
      function I(e3) {
        return "string" != typeof e3 && (O.error("Cannot create baggage metadata from unknown type: " + typeof e3), e3 = ""), { __TYPE__: C, toString: function() {
          return e3;
        } };
      }
      function A(e3) {
        return Symbol.for(e3);
      }
      var P = new function e3(t2) {
        var r2 = this;
        r2._currentContext = t2 ? new Map(t2) : /* @__PURE__ */ new Map(), r2.getValue = function(e4) {
          return r2._currentContext.get(e4);
        }, r2.setValue = function(t3, n2) {
          var i2 = new e3(r2._currentContext);
          return i2._currentContext.set(t3, n2), i2;
        }, r2.deleteValue = function(t3) {
          var n2 = new e3(r2._currentContext);
          return n2._currentContext.delete(t3), n2;
        };
      }(), N = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }], U = function() {
        for (var e3 = 0; e3 < N.length; e3++) this[N[e3].n] = /* @__PURE__ */ function(e4) {
          return function() {
            for (var t2 = [], r2 = 0; r2 < arguments.length; r2++) t2[r2] = arguments[r2];
            if (console) {
              var n2 = console[e4];
              if ("function" != typeof n2 && (n2 = console.log), "function" == typeof n2) return n2.apply(console, t2);
            }
          };
        }(N[e3].c);
      }, q = /* @__PURE__ */ function() {
        var e3 = function(t2, r2) {
          return (e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
            e4.__proto__ = t3;
          } || function(e4, t3) {
            for (var r3 in t3) Object.prototype.hasOwnProperty.call(t3, r3) && (e4[r3] = t3[r3]);
          })(t2, r2);
        };
        return function(t2, r2) {
          if ("function" != typeof r2 && null !== r2) throw TypeError("Class extends value " + String(r2) + " is not a constructor or null");
          function n2() {
            this.constructor = t2;
          }
          e3(t2, r2), t2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
        };
      }(), j = function() {
        function e3() {
        }
        return e3.prototype.createGauge = function(e4, t2) {
          return V;
        }, e3.prototype.createHistogram = function(e4, t2) {
          return X;
        }, e3.prototype.createCounter = function(e4, t2) {
          return F;
        }, e3.prototype.createUpDownCounter = function(e4, t2) {
          return G;
        }, e3.prototype.createObservableGauge = function(e4, t2) {
          return Y;
        }, e3.prototype.createObservableCounter = function(e4, t2) {
          return Q;
        }, e3.prototype.createObservableUpDownCounter = function(e4, t2) {
          return Z;
        }, e3.prototype.addBatchObservableCallback = function(e4, t2) {
        }, e3.prototype.removeBatchObservableCallback = function(e4) {
        }, e3;
      }(), M = function() {
      }, D = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2.prototype.add = function(e4, t3) {
        }, t2;
      }(M), L = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2.prototype.add = function(e4, t3) {
        }, t2;
      }(M), H = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2.prototype.record = function(e4, t3) {
        }, t2;
      }(M), z = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2.prototype.record = function(e4, t3) {
        }, t2;
      }(M), $ = function() {
        function e3() {
        }
        return e3.prototype.addCallback = function(e4) {
        }, e3.prototype.removeCallback = function(e4) {
        }, e3;
      }(), B = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2;
      }($), J = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2;
      }($), K = function(e3) {
        function t2() {
          return null !== e3 && e3.apply(this, arguments) || this;
        }
        return q(t2, e3), t2;
      }($), W = new j(), F = new D(), V = new H(), X = new z(), G = new L(), Q = new B(), Y = new J(), Z = new K();
      function ee() {
        return W;
      }
      !function(e3) {
        e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
      }(i || (i = {}));
      var et = { get: function(e3, t2) {
        if (null != e3) return e3[t2];
      }, keys: function(e3) {
        return null == e3 ? [] : Object.keys(e3);
      } }, er = { set: function(e3, t2, r2) {
        null != e3 && (e3[t2] = r2);
      } }, en = function(e3, t2) {
        var r2 = "function" == typeof Symbol && e3[Symbol.iterator];
        if (!r2) return e3;
        var n2, i2, s2 = r2.call(e3), a2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(n2 = s2.next()).done; ) a2.push(n2.value);
        } catch (e4) {
          i2 = { error: e4 };
        } finally {
          try {
            n2 && !n2.done && (r2 = s2.return) && r2.call(s2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      }, ei = function(e3, t2, r2) {
        if (r2 || 2 == arguments.length) for (var n2, i2 = 0, s2 = t2.length; i2 < s2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e3.concat(n2 || Array.prototype.slice.call(t2));
      }, es = function() {
        function e3() {
        }
        return e3.prototype.active = function() {
          return P;
        }, e3.prototype.with = function(e4, t2, r2) {
          for (var n2 = [], i2 = 3; i2 < arguments.length; i2++) n2[i2 - 3] = arguments[i2];
          return t2.call.apply(t2, ei([r2], en(n2), false));
        }, e3.prototype.bind = function(e4, t2) {
          return t2;
        }, e3.prototype.enable = function() {
          return this;
        }, e3.prototype.disable = function() {
          return this;
        }, e3;
      }(), ea = function(e3, t2) {
        var r2 = "function" == typeof Symbol && e3[Symbol.iterator];
        if (!r2) return e3;
        var n2, i2, s2 = r2.call(e3), a2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(n2 = s2.next()).done; ) a2.push(n2.value);
        } catch (e4) {
          i2 = { error: e4 };
        } finally {
          try {
            n2 && !n2.done && (r2 = s2.return) && r2.call(s2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      }, eo = function(e3, t2, r2) {
        if (r2 || 2 == arguments.length) for (var n2, i2 = 0, s2 = t2.length; i2 < s2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e3.concat(n2 || Array.prototype.slice.call(t2));
      }, el = "context", ec = new es(), eu = function() {
        function e3() {
        }
        return e3.getInstance = function() {
          return this._instance || (this._instance = new e3()), this._instance;
        }, e3.prototype.setGlobalContextManager = function(e4) {
          return f(el, e4, S.instance());
        }, e3.prototype.active = function() {
          return this._getContextManager().active();
        }, e3.prototype.with = function(e4, t2, r2) {
          for (var n2, i2 = [], s2 = 3; s2 < arguments.length; s2++) i2[s2 - 3] = arguments[s2];
          return (n2 = this._getContextManager()).with.apply(n2, eo([e4, t2, r2], ea(i2), false));
        }, e3.prototype.bind = function(e4, t2) {
          return this._getContextManager().bind(e4, t2);
        }, e3.prototype._getContextManager = function() {
          return m(el) || ec;
        }, e3.prototype.disable = function() {
          this._getContextManager().disable(), g(el, S.instance());
        }, e3;
      }();
      !function(e3) {
        e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
      }(s || (s = {}));
      var ed = "0000000000000000", eh = "00000000000000000000000000000000", ep = { traceId: eh, spanId: ed, traceFlags: s.NONE }, ef = function() {
        function e3(e4) {
          void 0 === e4 && (e4 = ep), this._spanContext = e4;
        }
        return e3.prototype.spanContext = function() {
          return this._spanContext;
        }, e3.prototype.setAttribute = function(e4, t2) {
          return this;
        }, e3.prototype.setAttributes = function(e4) {
          return this;
        }, e3.prototype.addEvent = function(e4, t2) {
          return this;
        }, e3.prototype.addLink = function(e4) {
          return this;
        }, e3.prototype.addLinks = function(e4) {
          return this;
        }, e3.prototype.setStatus = function(e4) {
          return this;
        }, e3.prototype.updateName = function(e4) {
          return this;
        }, e3.prototype.end = function(e4) {
        }, e3.prototype.isRecording = function() {
          return false;
        }, e3.prototype.recordException = function(e4, t2) {
        }, e3;
      }(), em = A("OpenTelemetry Context Key SPAN");
      function eg(e3) {
        return e3.getValue(em) || void 0;
      }
      function ey() {
        return eg(eu.getInstance().active());
      }
      function ev(e3, t2) {
        return e3.setValue(em, t2);
      }
      function eb(e3) {
        return e3.deleteValue(em);
      }
      function e_(e3, t2) {
        return ev(e3, new ef(t2));
      }
      function ew(e3) {
        var t2;
        return null == (t2 = eg(e3)) ? void 0 : t2.spanContext();
      }
      var ek = /^([0-9a-f]{32})$/i, eS = /^[0-9a-f]{16}$/i;
      function eE(e3) {
        return ek.test(e3) && e3 !== eh;
      }
      function eT(e3) {
        return eS.test(e3) && e3 !== ed;
      }
      function ex(e3) {
        return eE(e3.traceId) && eT(e3.spanId);
      }
      function eC(e3) {
        return new ef(e3);
      }
      var eO = eu.getInstance(), eR = function() {
        function e3() {
        }
        return e3.prototype.startSpan = function(e4, t2, r2) {
          if (void 0 === r2 && (r2 = eO.active()), null == t2 ? void 0 : t2.root) return new ef();
          var n2, i2 = r2 && ew(r2);
          return "object" == typeof (n2 = i2) && "string" == typeof n2.spanId && "string" == typeof n2.traceId && "number" == typeof n2.traceFlags && ex(i2) ? new ef(i2) : new ef();
        }, e3.prototype.startActiveSpan = function(e4, t2, r2, n2) {
          if (!(arguments.length < 2)) {
            2 == arguments.length ? a2 = t2 : 3 == arguments.length ? (i2 = t2, a2 = r2) : (i2 = t2, s2 = r2, a2 = n2);
            var i2, s2, a2, o2 = null != s2 ? s2 : eO.active(), l2 = this.startSpan(e4, i2, o2), c2 = ev(o2, l2);
            return eO.with(c2, a2, void 0, l2);
          }
        }, e3;
      }(), eI = new eR(), eA = function() {
        function e3(e4, t2, r2, n2) {
          this._provider = e4, this.name = t2, this.version = r2, this.options = n2;
        }
        return e3.prototype.startSpan = function(e4, t2, r2) {
          return this._getTracer().startSpan(e4, t2, r2);
        }, e3.prototype.startActiveSpan = function(e4, t2, r2, n2) {
          var i2 = this._getTracer();
          return Reflect.apply(i2.startActiveSpan, i2, arguments);
        }, e3.prototype._getTracer = function() {
          if (this._delegate) return this._delegate;
          var e4 = this._provider.getDelegateTracer(this.name, this.version, this.options);
          return e4 ? (this._delegate = e4, this._delegate) : eI;
        }, e3;
      }(), eP = new (function() {
        function e3() {
        }
        return e3.prototype.getTracer = function(e4, t2, r2) {
          return new eR();
        }, e3;
      }())(), eN = function() {
        function e3() {
        }
        return e3.prototype.getTracer = function(e4, t2, r2) {
          var n2;
          return null != (n2 = this.getDelegateTracer(e4, t2, r2)) ? n2 : new eA(this, e4, t2, r2);
        }, e3.prototype.getDelegate = function() {
          var e4;
          return null != (e4 = this._delegate) ? e4 : eP;
        }, e3.prototype.setDelegate = function(e4) {
          this._delegate = e4;
        }, e3.prototype.getDelegateTracer = function(e4, t2, r2) {
          var n2;
          return null == (n2 = this._delegate) ? void 0 : n2.getTracer(e4, t2, r2);
        }, e3;
      }();
      !function(e3) {
        e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
      }(a || (a = {})), function(e3) {
        e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
      }(o || (o = {})), function(e3) {
        e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
      }(l || (l = {}));
      var eU = "[_0-9a-z-*/]", eq = RegExp("^(?:[a-z]" + eU + "{0,255}|" + ("[a-z0-9]" + eU + "{0,240}@[a-z]") + eU + "{0,13})$"), ej = /^[ -~]{0,255}[!-~]$/, eM = /,|=/, eD = function() {
        function e3(e4) {
          this._internalState = /* @__PURE__ */ new Map(), e4 && this._parse(e4);
        }
        return e3.prototype.set = function(e4, t2) {
          var r2 = this._clone();
          return r2._internalState.has(e4) && r2._internalState.delete(e4), r2._internalState.set(e4, t2), r2;
        }, e3.prototype.unset = function(e4) {
          var t2 = this._clone();
          return t2._internalState.delete(e4), t2;
        }, e3.prototype.get = function(e4) {
          return this._internalState.get(e4);
        }, e3.prototype.serialize = function() {
          var e4 = this;
          return this._keys().reduce(function(t2, r2) {
            return t2.push(r2 + "=" + e4.get(r2)), t2;
          }, []).join(",");
        }, e3.prototype._parse = function(e4) {
          !(e4.length > 512) && (this._internalState = e4.split(",").reverse().reduce(function(e5, t2) {
            var r2 = t2.trim(), n2 = r2.indexOf("=");
            if (-1 !== n2) {
              var i2 = r2.slice(0, n2), s2 = r2.slice(n2 + 1, t2.length);
              eq.test(i2) && ej.test(s2) && !eM.test(s2) && e5.set(i2, s2);
            }
            return e5;
          }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
        }, e3.prototype._keys = function() {
          return Array.from(this._internalState.keys()).reverse();
        }, e3.prototype._clone = function() {
          var t2 = new e3();
          return t2._internalState = new Map(this._internalState), t2;
        }, e3;
      }();
      function eL(e3) {
        return new eD(e3);
      }
      var eH = eu.getInstance(), ez = S.instance(), e$ = new (function() {
        function e3() {
        }
        return e3.prototype.getMeter = function(e4, t2, r2) {
          return W;
        }, e3;
      }())(), eB = "metrics", eJ = function() {
        function e3() {
        }
        return e3.getInstance = function() {
          return this._instance || (this._instance = new e3()), this._instance;
        }, e3.prototype.setGlobalMeterProvider = function(e4) {
          return f(eB, e4, S.instance());
        }, e3.prototype.getMeterProvider = function() {
          return m(eB) || e$;
        }, e3.prototype.getMeter = function(e4, t2, r2) {
          return this.getMeterProvider().getMeter(e4, t2, r2);
        }, e3.prototype.disable = function() {
          g(eB, S.instance());
        }, e3;
      }().getInstance(), eK = function() {
        function e3() {
        }
        return e3.prototype.inject = function(e4, t2) {
        }, e3.prototype.extract = function(e4, t2) {
          return e4;
        }, e3.prototype.fields = function() {
          return [];
        }, e3;
      }(), eW = A("OpenTelemetry Baggage Key");
      function eF(e3) {
        return e3.getValue(eW) || void 0;
      }
      function eV() {
        return eF(eu.getInstance().active());
      }
      function eX(e3, t2) {
        return e3.setValue(eW, t2);
      }
      function eG(e3) {
        return e3.deleteValue(eW);
      }
      var eQ = "propagation", eY = new eK(), eZ = function() {
        function e3() {
          this.createBaggage = R, this.getBaggage = eF, this.getActiveBaggage = eV, this.setBaggage = eX, this.deleteBaggage = eG;
        }
        return e3.getInstance = function() {
          return this._instance || (this._instance = new e3()), this._instance;
        }, e3.prototype.setGlobalPropagator = function(e4) {
          return f(eQ, e4, S.instance());
        }, e3.prototype.inject = function(e4, t2, r2) {
          return void 0 === r2 && (r2 = er), this._getGlobalPropagator().inject(e4, t2, r2);
        }, e3.prototype.extract = function(e4, t2, r2) {
          return void 0 === r2 && (r2 = et), this._getGlobalPropagator().extract(e4, t2, r2);
        }, e3.prototype.fields = function() {
          return this._getGlobalPropagator().fields();
        }, e3.prototype.disable = function() {
          g(eQ, S.instance());
        }, e3.prototype._getGlobalPropagator = function() {
          return m(eQ) || eY;
        }, e3;
      }().getInstance(), e0 = "trace", e1 = function() {
        function e3() {
          this._proxyTracerProvider = new eN(), this.wrapSpanContext = eC, this.isSpanContextValid = ex, this.deleteSpan = eb, this.getSpan = eg, this.getActiveSpan = ey, this.getSpanContext = ew, this.setSpan = ev, this.setSpanContext = e_;
        }
        return e3.getInstance = function() {
          return this._instance || (this._instance = new e3()), this._instance;
        }, e3.prototype.setGlobalTracerProvider = function(e4) {
          var t2 = f(e0, this._proxyTracerProvider, S.instance());
          return t2 && this._proxyTracerProvider.setDelegate(e4), t2;
        }, e3.prototype.getTracerProvider = function() {
          return m(e0) || this._proxyTracerProvider;
        }, e3.prototype.getTracer = function(e4, t2) {
          return this.getTracerProvider().getTracer(e4, t2);
        }, e3.prototype.disable = function() {
          g(e0, S.instance()), this._proxyTracerProvider = new eN();
        }, e3;
      }().getInstance();
      let e2 = { context: eH, diag: ez, metrics: eJ, propagation: eZ, trace: e1 };
    }, 716: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 724: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, s = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = o(e2), { domain: i2, expires: s2, httponly: a2, maxage: l2, path: d2, samesite: h2, secure: p, partitioned: f, priority: m } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g, y, v = { name: t2, value: decodeURIComponent(r2), domain: i2, ...s2 && { expires: new Date(s2) }, ...a2 && { httpOnly: true }, ..."string" == typeof l2 && { maxAge: Number(l2) }, path: d2, ...h2 && { sameSite: c.includes(g = (g = h2).toLowerCase()) ? g : void 0 }, ...p && { secure: true }, ...m && { priority: u.includes(y = (y = m).toLowerCase()) ? y : void 0 }, ...f && { partitioned: true } };
          let e3 = {};
          for (let t3 in v) v[t3] && (e3[t3] = v[t3]);
          return e3;
        }
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(s, { RequestCookies: () => d, ResponseCookies: () => h, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => a }), e.exports = ((e2, s2, a2, o2) => {
        if (s2 && "object" == typeof s2 || "function" == typeof s2) for (let l2 of n(s2)) i.call(e2, l2) || l2 === a2 || t(e2, l2, { get: () => s2[l2], enumerable: !(o2 = r(s2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), s);
      var c = ["strict", "lax", "none"], u = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, s2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, s2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, l2(), i3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (s2 = true, o2 = i3, a2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!s2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 725: (e, t, r) => {
      "use strict";
      r.d(t, { Ud: () => n.stringifyCookie, VO: () => n.ResponseCookies, tm: () => n.RequestCookies });
      var n = r(724);
    }, 792: (e, t, r) => {
      "use strict";
      r.d(t, { X: () => function e2(t2) {
        if ((0, s.p)(t2) || "object" == typeof t2 && null !== t2 && "digest" in t2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === t2.digest || (0, o.h)(t2) || (0, a.I3)(t2) || "object" == typeof t2 && null !== t2 && t2.$$typeof === i || (0, n.T)(t2)) throw t2;
        t2 instanceof Error && "cause" in t2 && e2(t2.cause);
      } });
      var n = r(801);
      let i = Symbol.for("react.postpone");
      var s = r(199), a = r(557), o = r(16);
    }, 801: (e, t, r) => {
      "use strict";
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === i;
      }
      r.d(t, { T: () => n, W: () => o });
      let i = "HANGING_PROMISE_REJECTION";
      class s extends Error {
        constructor(e2) {
          super(`During prerendering, ${e2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${e2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = e2, this.digest = i;
        }
      }
      let a = /* @__PURE__ */ new WeakMap();
      function o(e2, t2) {
        if (e2.aborted) return Promise.reject(new s(t2));
        {
          let r2 = new Promise((r3, n2) => {
            let i2 = n2.bind(null, new s(t2)), o2 = a.get(e2);
            if (o2) o2.push(i2);
            else {
              let t3 = [i2];
              a.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return r2.catch(l), r2;
        }
      }
      function l() {
      }
    }, 802: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function n2() {
          }
          function i2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function s(e3, t3, n3, s2, a2) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var o2 = new i2(n3, s2 || e3, a2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], o2] : e3._events[l].push(o2) : (e3._events[l] = o2, e3._eventsCount++), e3;
          }
          function a(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new n2() : delete e3._events[t3];
          }
          function o() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r2 = false)), o.prototype.eventNames = function() {
            var e3, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e3 = this._events) t2.call(e3, n3) && i3.push(r2 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
          }, o.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, s2 = n3.length, a2 = Array(s2); i3 < s2; i3++) a2[i3] = n3[i3].fn;
            return a2;
          }, o.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, o.prototype.emit = function(e3, t3, n3, i3, s2, a2) {
            var o2 = r2 ? r2 + e3 : e3;
            if (!this._events[o2]) return false;
            var l, c, u = this._events[o2], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e3, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, s2), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, s2, a2), true;
              }
              for (c = 1, l = Array(d - 1); c < d; c++) l[c - 1] = arguments[c];
              u.fn.apply(u.context, l);
            } else {
              var h, p = u.length;
              for (c = 0; c < p; c++) switch (u[c].once && this.removeListener(e3, u[c].fn, void 0, true), d) {
                case 1:
                  u[c].fn.call(u[c].context);
                  break;
                case 2:
                  u[c].fn.call(u[c].context, t3);
                  break;
                case 3:
                  u[c].fn.call(u[c].context, t3, n3);
                  break;
                case 4:
                  u[c].fn.call(u[c].context, t3, n3, i3);
                  break;
                default:
                  if (!l) for (h = 1, l = Array(d - 1); h < d; h++) l[h - 1] = arguments[h];
                  u[c].fn.apply(u[c].context, l);
              }
            }
            return true;
          }, o.prototype.on = function(e3, t3, r3) {
            return s(this, e3, t3, r3, false);
          }, o.prototype.once = function(e3, t3, r3) {
            return s(this, e3, t3, r3, true);
          }, o.prototype.removeListener = function(e3, t3, n3, i3) {
            var s2 = r2 ? r2 + e3 : e3;
            if (!this._events[s2]) return this;
            if (!t3) return a(this, s2), this;
            var o2 = this._events[s2];
            if (o2.fn) o2.fn !== t3 || i3 && !o2.once || n3 && o2.context !== n3 || a(this, s2);
            else {
              for (var l = 0, c = [], u = o2.length; l < u; l++) (o2[l].fn !== t3 || i3 && !o2[l].once || n3 && o2[l].context !== n3) && c.push(o2[l]);
              c.length ? this._events[s2] = 1 === c.length ? c[0] : c : a(this, s2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && a(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r2, o.EventEmitter = o, e2.exports = o;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let n2 = 0, i2 = e3.length;
            for (; i2 > 0; ) {
              let s = i2 / 2 | 0, a = n2 + s;
              0 >= r2(e3[a], t3) ? (n2 = ++a, i2 -= s + 1) : i2 = s;
            }
            return n2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r2(574);
          class i2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r3);
              let i3 = n2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(i3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = i2;
        }, 816: (e2, t2, r2) => {
          let n2 = r2(213);
          class i2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let s = (e3, t3, r3) => new Promise((s2, a) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void s2(e3);
            let o = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  s2(r3());
                } catch (e4) {
                  a(e4);
                }
                return;
              }
              let n3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, o2 = r3 instanceof Error ? r3 : new i2(n3);
              "function" == typeof e3.cancel && e3.cancel(), a(o2);
            }, t3);
            n2(e3.then(s2, a), () => {
              clearTimeout(o);
            });
          });
          e2.exports = s, e2.exports.default = s, e2.exports.TimeoutError = i2;
        } }, r = {};
        function n(e2) {
          var i2 = r[e2];
          if (void 0 !== i2) return i2.exports;
          var s = r[e2] = { exports: {} }, a = true;
          try {
            t[e2](s, s.exports, n), a = false;
          } finally {
            a && delete r[e2];
          }
          return s.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true });
          let e2 = n(993), t2 = n(816), r2 = n(821), s = () => {
          }, a = new t2.TimeoutError();
          class o extends e2 {
            constructor(e3) {
              var t3, n2, i2, a2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = s, this._resolveIdle = s, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (n2 = null == (t3 = e3.intervalCap) ? void 0 : t3.toString()) ? n2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = s, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = s, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((n2, i2) => {
                let s2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let s3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && i2(a);
                    });
                    n2(await s3);
                  } catch (e4) {
                    i2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(s2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          i.default = o;
        })(), e.exports = i;
      })();
    }, 815: (e, t, r) => {
      "use strict";
      e.exports = r(35);
    }, 818: (e, t, r) => {
      "use strict";
      r.d(t, { Ck: () => l, K8: () => u, hm: () => d });
      var n = r(725), i = r(716), s = r(535), a = r(115);
      class o extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new o();
        }
      }
      class l {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return o.callable;
              default:
                return i.l.get(e3, t2, r2);
            }
          } });
        }
      }
      let c = Symbol.for("next.mutated.cookies");
      class u {
        static wrap(e2, t2) {
          let r2 = new n.VO(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let a2 = [], o2 = /* @__PURE__ */ new Set(), l2 = () => {
            let e3 = s.J.getStore();
            if (e3 && (e3.pathWasRevalidated = true), a2 = r2.getAll().filter((e4) => o2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of a2) {
                let r3 = new n.VO(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          }, u2 = new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case c:
                return a2;
              case "delete":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.delete(...t4), u2;
                  } finally {
                    l2();
                  }
                };
              case "set":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4), u2;
                  } finally {
                    l2();
                  }
                };
              default:
                return i.l.get(e3, t3, r3);
            }
          } });
          return u2;
        }
      }
      function d(e2) {
        let t2 = new Proxy(e2, { get(e3, r2, n2) {
          switch (r2) {
            case "delete":
              return function(...r3) {
                return h("cookies().delete"), e3.delete(...r3), t2;
              };
            case "set":
              return function(...r3) {
                return h("cookies().set"), e3.set(...r3), t2;
              };
            default:
              return i.l.get(e3, r2, n2);
          }
        } });
        return t2;
      }
      function h(e2) {
        if ("action" !== (0, a.XN)(e2).phase) throw new o();
      }
    }, 821: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => n });
      var n = function(e2) {
        return e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect", e2;
      }({});
    }, 830: (e, t, r) => {
      "use strict";
      r.d(t, { s: () => n });
      let n = (0, r(58).xl)();
    }, 890: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, s = t2.split(n), a = (r2 || {}).decode || e2, o = 0; o < s.length; o++) {
              var l = s[o], c = l.indexOf("=");
              if (!(c < 0)) {
                var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, a));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var s = n2 || {}, a = s.encode || r;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var o = a(t2);
            if (o && !i.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != s.maxAge) {
              var c = s.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (s.domain) {
              if (!i.test(s.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + s.domain;
            }
            if (s.path) {
              if (!i.test(s.path)) throw TypeError("option path is invalid");
              l += "; Path=" + s.path;
            }
            if (s.expires) {
              if ("function" != typeof s.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + s.expires.toUTCString();
            }
            if (s.httpOnly && (l += "; HttpOnly"), s.secure && (l += "; Secure"), s.sameSite) switch ("string" == typeof s.sameSite ? s.sameSite.toLowerCase() : s.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 905: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let n = r(201), i = r(552);
      function s() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    } }, (e) => {
      var t = e(e.s = 220);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\.json)?[\\/#\\?]?$"] }];
    require_edge_instrumentation();
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": true }, "typescript": { "ignoreBuildErrors": true, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "img.clerk.com" }], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone", "experimental": { "nodeMiddleware": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 9, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "viewTransition": false, "routerBFCache": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "useCache": false, "optimizePackageImports": ["@clerk/nextjs", "lucide-react", "@liveblocks/react", "@liveblocks/react-lexical", "@lexical/react", "@radix-ui/react-dialog", "@radix-ui/react-popover", "@radix-ui/react-select", "@radix-ui/react-label", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "serverExternalPackages": ["@sentry/nextjs"], "compiler": { "removeConsole": true }, "turbopack": { "root": "/Users/bhaskarg/Documents/Projects/LiveDocs/google-sheets-clone" } };
var BuildId = "7yZi7HTjZ-L3gPcOwM4Hn";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/sentry-example-page", "regex": "^/sentry\\-example\\-page(?:/)?$", "routeKeys": {}, "namedRegex": "^/sentry\\-example\\-page(?:/)?$" }], "dynamic": [{ "page": "/documents/[id]", "regex": "^/documents/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/documents/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sentry-example-page": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sentry-example-page", "dataRoute": "/sentry-example-page.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "275a0a83f1ae966e8a9dc73f136b033b", "previewModeSigningKey": "3b372c496accfc8b119919d7a0844d7122700992c8dc2cb6b2d509d826c1eb17", "previewModeEncryptionKey": "40bc3756ebca8ecad1008c8e73cacb6dcc421c25caa18fd6e8ecfd115c0e07e4" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-instrumentation.js", "server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "7yZi7HTjZ-L3gPcOwM4Hn", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "lPIdJNrsYvYRA0noWufziki3nAcNCZpIsKJX6dS48Jc=", "__NEXT_PREVIEW_MODE_ID": "275a0a83f1ae966e8a9dc73f136b033b", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "40bc3756ebca8ecad1008c8e73cacb6dcc421c25caa18fd6e8ecfd115c0e07e4", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "3b372c496accfc8b119919d7a0844d7122700992c8dc2cb6b2d509d826c1eb17" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/favicon.ico/route": "/favicon.ico", "/api/liveblocks-auth/route": "/api/liveblocks-auth", "/api/sentry-example-api/route": "/api/sentry-example-api", "/(auth)/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]", "/(root)/documents/[id]/page": "/documents/[id]", "/sentry-example-page/page": "/sentry-example-page", "/(auth)/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/(root)/page": "/" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
