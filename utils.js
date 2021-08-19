function p(e, t) {
    return function() {
        return null;
    };
}
import E from "../../../@babel/runtime@7.15.3/deno/helpers/esm/extends.js";
import b from "../../../@babel/runtime@7.15.3/deno/helpers/esm/typeof.js";
function f(e) {
    return e && b(e) === "object" && e.constructor === Object;
}
function l(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        clone: !0
    }, n = r.clone ? E({
    }, e) : e;
    return f(e) && f(t) && Object.keys(t).forEach(function(o) {
        o !== "__proto__" && (f(t[o]) && o in e ? n[o] = l(e[o], t[o], r) : n[o] = t[o]);
    }), n;
}
import m from "../../../prop-types@15.7.2/deno/prop-types.js";
function w(e) {
    var t = e.prototype, r = t === void 0 ? {
    } : t;
    return Boolean(r.isReactComponent);
}
function d(e, t, r, n, o) {
    var a = e[t], u = o || t;
    if (a == null) return null;
    var i, s = a.type;
    return typeof s == "function" && !w(s) && (i = "Did you accidentally use a plain function component for an element instead?"), i !== void 0 ? new Error("Invalid ".concat(n, " `").concat(u, "` supplied to `").concat(r, "`. ") + "Expected an element that can hold a ref. ".concat(i, " ") + "For more information see https://material-ui.com/r/caveat-with-refs-guide") : null;
}
var _ = null
var y = p(m.element, d);
y.isRequired = p(m.element.isRequired, d);
var M = y;
function N(e) {
    var t = e.prototype, r = t === void 0 ? {
    } : t;
    return Boolean(r.isReactComponent);
}
function R(e, t, r, n, o) {
    var a = e[t], u = o || t;
    if (a == null) return null;
    var i;
    return typeof a == "function" && !N(a) && (i = "Did you accidentally provide a plain function component instead?"), i !== void 0 ? new Error("Invalid ".concat(n, " `").concat(u, "` supplied to `").concat(r, "`. ") + "Expected an element type that can hold a ref. ".concat(i, " ") + "For more information see https://material-ui.com/r/caveat-with-refs-guide") : null;
}

import j from "../../../@babel/runtime@7.15.3/deno/helpers/esm/defineProperty.js";
import D from "../../../@babel/runtime@7.15.3/deno/helpers/esm/extends.js";
var F = "exact-prop: \u200B";
function v(e) {
    return e;
}
function h(e) {
    for(var t = "https://material-ui.com/production-error/?code=" + e, r = 1; r < arguments.length; r += 1)t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified Material-UI error #" + e + "; visit " + t + " for the full message.";
}
import A from "../../../@babel/runtime@7.15.3/deno/helpers/esm/typeof.js";
import { ForwardRef as H, Memo as I } from "../../../react-is@16.13.1/deno/react-is.js";
var V = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function L(e) {
    var t = "".concat(e).match(V), r = t && t[1];
    return r || "";
}
function g(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return e.displayName || e.name || L(e) || t;
}
function x(e, t, r) {
    var n = g(t);
    return e.displayName || (n !== "" ? "".concat(r, "(").concat(n, ")") : r);
}
function T(e) {
    if (e != null) {
        if (typeof e == "string") return e;
        if (typeof e == "function") return g(e, "Component");
        if (A(e) === "object") switch(e.$$typeof){
            case H:
                return x(e, e.render, "ForwardRef");
            case I:
                return x(e, e.type, "memo");
            default:
                return;
        }
    }
}
function P(e, t, r, n, o) {
    return null;
    var a, u;
}
var $ = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
import c from "../../../prop-types@15.7.2/deno/prop-types.js";
var B = c.oneOfType([
    c.func,
    c.object
]), q = B;
export { P as HTMLElementType, p as chainPropTypes, l as deepmerge, M as elementAcceptingRef, _ as elementTypeAcceptingRef, v as exactProp, h as formatMuiErrorMessage, T as getDisplayName, $ as ponyfillGlobal, q as refType };
