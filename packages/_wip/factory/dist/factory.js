var eu = Object.defineProperty;
var Po = (r) => {
  throw TypeError(r);
};
var tu = (r, e, t) => e in r ? eu(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var it = (r, e, t) => tu(r, typeof e != "symbol" ? e + "" : e, t), _s = (r, e, t) => e.has(r) || Po("Cannot " + t);
var z = (r, e, t) => (_s(r, e, "read from private field"), t ? t.call(r) : e.get(r)), Ct = (r, e, t) => e.has(r) ? Po("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Be = (r, e, t, n) => (_s(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t), Sr = (r, e, t) => (_s(r, e, "access private method"), t);
var ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Er(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function ru(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
var vc = {};
Object.defineProperty(vc, "__esModule", { value: !0 });
const nu = {
  seconds: { short: "s", medium: "sec", long: "second" },
  minutes: { short: "m", medium: "min", long: "minute" },
  hours: { short: "h", medium: "hr", long: "hour" },
  days: { short: "d", medium: "day", long: "day" },
  weeks: { short: "w", medium: "wk", long: "week" },
  months: { short: "m", medium: "mon", long: "month" },
  years: { short: "y", medium: "yr", long: "year" }
};
function iu(r, e = { format: "medium" }) {
  if (!["short", "medium", "long"].includes(e.format))
    throw new Error("The provided format is incorrect.");
  const t = (/* @__PURE__ */ new Date()).getTime(), n = r instanceof Date ? (t - r.getTime()) / 1e3 : t / 1e3 - r, i = Math.floor(n), s = Math.floor(i / 60), a = Math.floor(s / 60), f = Math.floor(a / 24), d = Math.floor(f / 7), l = Math.floor(f / 30), c = Math.floor(f / 365);
  if (i < 0)
    throw new Error("The time difference is negative. The provided timestamp is in the future.");
  if (i === 0)
    return "now";
  const u = {
    years: c,
    months: l,
    weeks: d,
    days: f,
    hours: a,
    minutes: s,
    seconds: i
  }, h = Object.keys(u).find((x) => u[x] > 0) || "seconds", p = u[h], v = e.format === "short", g = p > 1 && !v ? "s" : "", b = nu[h][e.format];
  return `${p}${v ? "" : " "}${b}${g} ago`;
}
vc.default = iu;
function su(r = 0) {
  return new Promise((e) => {
    setTimeout(() => {
      e();
    }, r);
  });
}
var Io = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
function ou(r) {
  return Io(this, arguments, void 0, function* (e, t = document) {
    const n = t.querySelectorAll('link[rel="stylesheet"]');
    return n && e && Array.from(n).forEach((i) => Io(this, void 0, void 0, function* () {
      e == null || e.appendChild(i.cloneNode());
    })), !0;
  });
}
let Ii;
const au = new Uint8Array(16);
function cu() {
  if (!Ii && (Ii = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Ii))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ii(au);
}
const pt = [];
for (let r = 0; r < 256; ++r)
  pt.push((r + 256).toString(16).slice(1));
function lu(r, e = 0) {
  return pt[r[e + 0]] + pt[r[e + 1]] + pt[r[e + 2]] + pt[r[e + 3]] + "-" + pt[r[e + 4]] + pt[r[e + 5]] + "-" + pt[r[e + 6]] + pt[r[e + 7]] + "-" + pt[r[e + 8]] + pt[r[e + 9]] + "-" + pt[r[e + 10]] + pt[r[e + 11]] + pt[r[e + 12]] + pt[r[e + 13]] + pt[r[e + 14]] + pt[r[e + 15]];
}
const uu = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), jo = {
  randomUUID: uu
};
function Lr(r, e, t) {
  if (jo.randomUUID && !r)
    return jo.randomUUID();
  r = r || {};
  const n = r.random || (r.rng || cu)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, lu(n);
}
function gc() {
  return window.scrollY || window.pageYOffset || // @ts-ignore
  document.scrollTop || document.body.scrollTop;
}
function yc(r) {
  const e = r.getBoundingClientRect(), t = document.body, n = document.documentElement, i = window.pageYOffset || n.scrollTop || t.scrollTop, s = window.pageXOffset || n.scrollLeft || t.scrollLeft, a = n.clientTop || t.clientTop || 0, f = n.clientLeft || t.clientLeft || 0, d = e.top + i - a, l = e.left + s - f;
  return {
    top: Math.round(d),
    left: Math.round(l)
  };
}
function fu(r) {
  const e = yc(r), t = gc();
  return window.innerHeight - e.top + t;
}
function hu(r) {
  const e = yc(r), t = gc();
  return e.top - t;
}
function du(r) {
  const e = new FormData(r);
  return Object.fromEntries(e);
}
function pu(r) {
  return !(!r || typeof r != "object" || r.constructor && r.constructor.name === "Object" || Object.prototype.toString.call(r) === "[object Object]" || r.constructor === Object);
}
function di(r) {
  return !(!r || typeof r != "object" || r.constructor && r.constructor.name !== "Object" || Object.prototype.toString.call(r) !== "[object Object]" || r !== Object(r));
}
var Xi = { exports: {} };
Xi.exports;
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", f = "[object Boolean]", d = "[object Date]", l = "[object Error]", c = "[object Function]", u = "[object GeneratorFunction]", h = "[object Map]", p = "[object Number]", v = "[object Object]", g = "[object Promise]", b = "[object RegExp]", x = "[object Set]", $ = "[object String]", _ = "[object Symbol]", w = "[object WeakMap]", E = "[object ArrayBuffer]", A = "[object DataView]", R = "[object Float32Array]", N = "[object Float64Array]", k = "[object Int8Array]", O = "[object Int16Array]", S = "[object Int32Array]", I = "[object Uint8Array]", C = "[object Uint8ClampedArray]", D = "[object Uint16Array]", H = "[object Uint32Array]", B = /[\\^$.*+?()[\]{}|]/g, W = /\w*$/, X = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, U = {};
  U[s] = U[a] = U[E] = U[A] = U[f] = U[d] = U[R] = U[N] = U[k] = U[O] = U[S] = U[h] = U[p] = U[v] = U[b] = U[x] = U[$] = U[_] = U[I] = U[C] = U[D] = U[H] = !0, U[l] = U[c] = U[w] = !1;
  var T = typeof ye == "object" && ye && ye.Object === Object && ye, L = typeof self == "object" && self && self.Object === Object && self, j = T || L || Function("return this")(), M = e && !e.nodeType && e, ie = M && !0 && r && !r.nodeType && r, se = ie && ie.exports === M;
  function We(o, m) {
    return o.set(m[0], m[1]), o;
  }
  function Re(o, m) {
    return o.add(m), o;
  }
  function qe(o, m) {
    for (var y = -1, P = o ? o.length : 0; ++y < P && m(o[y], y, o) !== !1; )
      ;
    return o;
  }
  function Le(o, m) {
    for (var y = -1, P = m.length, F = o.length; ++y < P; )
      o[F + y] = m[y];
    return o;
  }
  function Ge(o, m, y, P) {
    for (var F = -1, K = o ? o.length : 0; ++F < K; )
      y = m(y, o[F], F, o);
    return y;
  }
  function Ke(o, m) {
    for (var y = -1, P = Array(o); ++y < o; )
      P[y] = m(y);
    return P;
  }
  function ue(o, m) {
    return o == null ? void 0 : o[m];
  }
  function Y(o) {
    var m = !1;
    if (o != null && typeof o.toString != "function")
      try {
        m = !!(o + "");
      } catch {
      }
    return m;
  }
  function Ne(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P, F) {
      y[++m] = [F, P];
    }), y;
  }
  function be(o, m) {
    return function(y) {
      return o(m(y));
    };
  }
  function ke(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P) {
      y[++m] = P;
    }), y;
  }
  var Ze = Array.prototype, gt = Function.prototype, fe = Object.prototype, ee = j["__core-js_shared__"], ne = function() {
    var o = /[^.]+$/.exec(ee && ee.keys && ee.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), pe = gt.toString, J = fe.hasOwnProperty, Se = fe.toString, De = RegExp(
    "^" + pe.call(J).replace(B, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Pe = se ? j.Buffer : void 0, yt = j.Symbol, ut = j.Uint8Array, jt = be(Object.getPrototypeOf, Object), Ue = Object.create, Je = fe.propertyIsEnumerable, zt = Ze.splice, ft = Object.getOwnPropertySymbols, Tt = Pe ? Pe.isBuffer : void 0, Vt = be(Object.keys, Object), Xe = xe(j, "DataView"), me = xe(j, "Map"), Qe = xe(j, "Promise"), He = xe(j, "Set"), Ye = xe(j, "WeakMap"), ve = xe(Object, "create"), Ft = de(Xe), Wt = de(me), qt = de(Qe), Mt = de(He), Gt = de(Ye), _t = yt ? yt.prototype : void 0, ht = _t ? _t.valueOf : void 0;
  function oe(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Rt() {
    this.__data__ = ve ? ve(null) : {};
  }
  function ae(o) {
    return this.has(o) && delete this.__data__[o];
  }
  function Oe(o) {
    var m = this.__data__;
    if (ve) {
      var y = m[o];
      return y === n ? void 0 : y;
    }
    return J.call(m, o) ? m[o] : void 0;
  }
  function Lt(o) {
    var m = this.__data__;
    return ve ? m[o] !== void 0 : J.call(m, o);
  }
  function Kt(o, m) {
    var y = this.__data__;
    return y[o] = ve && m === void 0 ? n : m, this;
  }
  oe.prototype.clear = Rt, oe.prototype.delete = ae, oe.prototype.get = Oe, oe.prototype.has = Lt, oe.prototype.set = Kt;
  function te(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Nr() {
    this.__data__ = [];
  }
  function kr(o) {
    var m = this.__data__, y = et(m, o);
    if (y < 0)
      return !1;
    var P = m.length - 1;
    return y == P ? m.pop() : zt.call(m, y, 1), !0;
  }
  function Dr(o) {
    var m = this.__data__, y = et(m, o);
    return y < 0 ? void 0 : m[y][1];
  }
  function Ur(o) {
    return et(this.__data__, o) > -1;
  }
  function Hr(o, m) {
    var y = this.__data__, P = et(y, o);
    return P < 0 ? y.push([o, m]) : y[P][1] = m, this;
  }
  te.prototype.clear = Nr, te.prototype.delete = kr, te.prototype.get = Dr, te.prototype.has = Ur, te.prototype.set = Hr;
  function $e(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Br() {
    this.__data__ = {
      hash: new oe(),
      map: new (me || te)(),
      string: new oe()
    };
  }
  function zr(o) {
    return tt(this, o).delete(o);
  }
  function Vr(o) {
    return tt(this, o).get(o);
  }
  function Fr(o) {
    return tt(this, o).has(o);
  }
  function Wr(o, m) {
    return tt(this, o).set(o, m), this;
  }
  $e.prototype.clear = Br, $e.prototype.delete = zr, $e.prototype.get = Vr, $e.prototype.has = Fr, $e.prototype.set = Wr;
  function we(o) {
    this.__data__ = new te(o);
  }
  function qr() {
    this.__data__ = new te();
  }
  function Gr(o) {
    return this.__data__.delete(o);
  }
  function Kr(o) {
    return this.__data__.get(o);
  }
  function Zr(o) {
    return this.__data__.has(o);
  }
  function Jr(o, m) {
    var y = this.__data__;
    if (y instanceof te) {
      var P = y.__data__;
      if (!me || P.length < t - 1)
        return P.push([o, m]), this;
      y = this.__data__ = new $e(P);
    }
    return y.set(o, m), this;
  }
  we.prototype.clear = qr, we.prototype.delete = Gr, we.prototype.get = Kr, we.prototype.has = Zr, we.prototype.set = Jr;
  function Xr(o, m) {
    var y = wt(o) || wn(o) ? Ke(o.length, String) : [], P = y.length, F = !!P;
    for (var K in o)
      J.call(o, K) && !(F && (K == "length" || yn(K, P))) && y.push(K);
    return y;
  }
  function Zt(o, m, y) {
    var P = o[m];
    (!(J.call(o, m) && Yt(P, y)) || y === void 0 && !(m in o)) && (o[m] = y);
  }
  function et(o, m) {
    for (var y = o.length; y--; )
      if (Yt(o[y][0], m))
        return y;
    return -1;
  }
  function Qr(o, m) {
    return o && Jt(m, xt(m), o);
  }
  function bt(o, m, y, P, F, K, re) {
    var Z;
    if (P && (Z = K ? P(o, F, K, re) : P(o)), Z !== void 0)
      return Z;
    if (!rt(o))
      return o;
    var rr = wt(o);
    if (rr) {
      if (Z = mn(o), !m)
        return hn(o, Z);
    } else {
      var Ee = he(o), nr = Ee == c || Ee == u;
      if (En(o))
        return sn(o, m);
      if (Ee == v || Ee == s || nr && !K) {
        if (Y(o))
          return K ? o : {};
        if (Z = vn(nr ? {} : o), !m)
          return dn(o, Qr(Z, o));
      } else {
        if (!U[Ee])
          return K ? o : {};
        Z = gn(o, Ee, bt, m);
      }
    }
    re || (re = new we());
    var ir = re.get(o);
    if (ir)
      return ir;
    if (re.set(o, Z), !rr)
      var sr = y ? pn(o) : xt(o);
    return qe(sr || o, function(Et, nt) {
      sr && (nt = Et, Et = o[nt]), Zt(Z, nt, bt(Et, m, y, P, nt, o, re));
    }), Z;
  }
  function Yr(o) {
    return rt(o) ? Ue(o) : {};
  }
  function en(o, m, y) {
    var P = m(o);
    return wt(o) ? P : Le(P, y(o));
  }
  function tn(o) {
    return Se.call(o);
  }
  function rn(o) {
    if (!rt(o) || bn(o))
      return !1;
    var m = tr(o) || Y(o) ? De : X;
    return m.test(de(o));
  }
  function nn(o) {
    if (!Qt(o))
      return Vt(o);
    var m = [];
    for (var y in Object(o))
      J.call(o, y) && y != "constructor" && m.push(y);
    return m;
  }
  function sn(o, m) {
    if (m)
      return o.slice();
    var y = new o.constructor(o.length);
    return o.copy(y), y;
  }
  function $t(o) {
    var m = new o.constructor(o.byteLength);
    return new ut(m).set(new ut(o)), m;
  }
  function on(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.byteLength);
  }
  function an(o, m, y) {
    var P = m ? y(Ne(o), !0) : Ne(o);
    return Ge(P, We, new o.constructor());
  }
  function cn(o) {
    var m = new o.constructor(o.source, W.exec(o));
    return m.lastIndex = o.lastIndex, m;
  }
  function ln(o, m, y) {
    var P = m ? y(ke(o), !0) : ke(o);
    return Ge(P, Re, new o.constructor());
  }
  function un(o) {
    return ht ? Object(ht.call(o)) : {};
  }
  function fn(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.length);
  }
  function hn(o, m) {
    var y = -1, P = o.length;
    for (m || (m = Array(P)); ++y < P; )
      m[y] = o[y];
    return m;
  }
  function Jt(o, m, y, P) {
    y || (y = {});
    for (var F = -1, K = m.length; ++F < K; ) {
      var re = m[F], Z = void 0;
      Zt(y, re, Z === void 0 ? o[re] : Z);
    }
    return y;
  }
  function dn(o, m) {
    return Jt(o, Xt(o), m);
  }
  function pn(o) {
    return en(o, xt, Xt);
  }
  function tt(o, m) {
    var y = o.__data__;
    return _n(m) ? y[typeof m == "string" ? "string" : "hash"] : y.map;
  }
  function xe(o, m) {
    var y = ue(o, m);
    return rn(y) ? y : void 0;
  }
  var Xt = ft ? be(ft, Object) : An, he = tn;
  (Xe && he(new Xe(new ArrayBuffer(1))) != A || me && he(new me()) != h || Qe && he(Qe.resolve()) != g || He && he(new He()) != x || Ye && he(new Ye()) != w) && (he = function(o) {
    var m = Se.call(o), y = m == v ? o.constructor : void 0, P = y ? de(y) : void 0;
    if (P)
      switch (P) {
        case Ft:
          return A;
        case Wt:
          return h;
        case qt:
          return g;
        case Mt:
          return x;
        case Gt:
          return w;
      }
    return m;
  });
  function mn(o) {
    var m = o.length, y = o.constructor(m);
    return m && typeof o[0] == "string" && J.call(o, "index") && (y.index = o.index, y.input = o.input), y;
  }
  function vn(o) {
    return typeof o.constructor == "function" && !Qt(o) ? Yr(jt(o)) : {};
  }
  function gn(o, m, y, P) {
    var F = o.constructor;
    switch (m) {
      case E:
        return $t(o);
      case f:
      case d:
        return new F(+o);
      case A:
        return on(o, P);
      case R:
      case N:
      case k:
      case O:
      case S:
      case I:
      case C:
      case D:
      case H:
        return fn(o, P);
      case h:
        return an(o, P, y);
      case p:
      case $:
        return new F(o);
      case b:
        return cn(o);
      case x:
        return ln(o, P, y);
      case _:
        return un(o);
    }
  }
  function yn(o, m) {
    return m = m ?? i, !!m && (typeof o == "number" || le.test(o)) && o > -1 && o % 1 == 0 && o < m;
  }
  function _n(o) {
    var m = typeof o;
    return m == "string" || m == "number" || m == "symbol" || m == "boolean" ? o !== "__proto__" : o === null;
  }
  function bn(o) {
    return !!ne && ne in o;
  }
  function Qt(o) {
    var m = o && o.constructor, y = typeof m == "function" && m.prototype || fe;
    return o === y;
  }
  function de(o) {
    if (o != null) {
      try {
        return pe.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function $n(o) {
    return bt(o, !1, !0);
  }
  function Yt(o, m) {
    return o === m || o !== o && m !== m;
  }
  function wn(o) {
    return xn(o) && J.call(o, "callee") && (!Je.call(o, "callee") || Se.call(o) == s);
  }
  var wt = Array.isArray;
  function er(o) {
    return o != null && Sn(o.length) && !tr(o);
  }
  function xn(o) {
    return On(o) && er(o);
  }
  var En = Tt || Cn;
  function tr(o) {
    var m = rt(o) ? Se.call(o) : "";
    return m == c || m == u;
  }
  function Sn(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= i;
  }
  function rt(o) {
    var m = typeof o;
    return !!o && (m == "object" || m == "function");
  }
  function On(o) {
    return !!o && typeof o == "object";
  }
  function xt(o) {
    return er(o) ? Xr(o) : nn(o);
  }
  function An() {
    return [];
  }
  function Cn() {
    return !1;
  }
  r.exports = $n;
})(Xi, Xi.exports);
var mu = Xi.exports;
const vu = /* @__PURE__ */ Er(mu);
var Qi = { exports: {} };
Qi.exports;
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", f = "[object Boolean]", d = "[object Date]", l = "[object Error]", c = "[object Function]", u = "[object GeneratorFunction]", h = "[object Map]", p = "[object Number]", v = "[object Object]", g = "[object Promise]", b = "[object RegExp]", x = "[object Set]", $ = "[object String]", _ = "[object Symbol]", w = "[object WeakMap]", E = "[object ArrayBuffer]", A = "[object DataView]", R = "[object Float32Array]", N = "[object Float64Array]", k = "[object Int8Array]", O = "[object Int16Array]", S = "[object Int32Array]", I = "[object Uint8Array]", C = "[object Uint8ClampedArray]", D = "[object Uint16Array]", H = "[object Uint32Array]", B = /[\\^$.*+?()[\]{}|]/g, W = /\w*$/, X = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, U = {};
  U[s] = U[a] = U[E] = U[A] = U[f] = U[d] = U[R] = U[N] = U[k] = U[O] = U[S] = U[h] = U[p] = U[v] = U[b] = U[x] = U[$] = U[_] = U[I] = U[C] = U[D] = U[H] = !0, U[l] = U[c] = U[w] = !1;
  var T = typeof ye == "object" && ye && ye.Object === Object && ye, L = typeof self == "object" && self && self.Object === Object && self, j = T || L || Function("return this")(), M = e && !e.nodeType && e, ie = M && !0 && r && !r.nodeType && r, se = ie && ie.exports === M;
  function We(o, m) {
    return o.set(m[0], m[1]), o;
  }
  function Re(o, m) {
    return o.add(m), o;
  }
  function qe(o, m) {
    for (var y = -1, P = o ? o.length : 0; ++y < P && m(o[y], y, o) !== !1; )
      ;
    return o;
  }
  function Le(o, m) {
    for (var y = -1, P = m.length, F = o.length; ++y < P; )
      o[F + y] = m[y];
    return o;
  }
  function Ge(o, m, y, P) {
    for (var F = -1, K = o ? o.length : 0; ++F < K; )
      y = m(y, o[F], F, o);
    return y;
  }
  function Ke(o, m) {
    for (var y = -1, P = Array(o); ++y < o; )
      P[y] = m(y);
    return P;
  }
  function ue(o, m) {
    return o == null ? void 0 : o[m];
  }
  function Y(o) {
    var m = !1;
    if (o != null && typeof o.toString != "function")
      try {
        m = !!(o + "");
      } catch {
      }
    return m;
  }
  function Ne(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P, F) {
      y[++m] = [F, P];
    }), y;
  }
  function be(o, m) {
    return function(y) {
      return o(m(y));
    };
  }
  function ke(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P) {
      y[++m] = P;
    }), y;
  }
  var Ze = Array.prototype, gt = Function.prototype, fe = Object.prototype, ee = j["__core-js_shared__"], ne = function() {
    var o = /[^.]+$/.exec(ee && ee.keys && ee.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), pe = gt.toString, J = fe.hasOwnProperty, Se = fe.toString, De = RegExp(
    "^" + pe.call(J).replace(B, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Pe = se ? j.Buffer : void 0, yt = j.Symbol, ut = j.Uint8Array, jt = be(Object.getPrototypeOf, Object), Ue = Object.create, Je = fe.propertyIsEnumerable, zt = Ze.splice, ft = Object.getOwnPropertySymbols, Tt = Pe ? Pe.isBuffer : void 0, Vt = be(Object.keys, Object), Xe = xe(j, "DataView"), me = xe(j, "Map"), Qe = xe(j, "Promise"), He = xe(j, "Set"), Ye = xe(j, "WeakMap"), ve = xe(Object, "create"), Ft = de(Xe), Wt = de(me), qt = de(Qe), Mt = de(He), Gt = de(Ye), _t = yt ? yt.prototype : void 0, ht = _t ? _t.valueOf : void 0;
  function oe(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Rt() {
    this.__data__ = ve ? ve(null) : {};
  }
  function ae(o) {
    return this.has(o) && delete this.__data__[o];
  }
  function Oe(o) {
    var m = this.__data__;
    if (ve) {
      var y = m[o];
      return y === n ? void 0 : y;
    }
    return J.call(m, o) ? m[o] : void 0;
  }
  function Lt(o) {
    var m = this.__data__;
    return ve ? m[o] !== void 0 : J.call(m, o);
  }
  function Kt(o, m) {
    var y = this.__data__;
    return y[o] = ve && m === void 0 ? n : m, this;
  }
  oe.prototype.clear = Rt, oe.prototype.delete = ae, oe.prototype.get = Oe, oe.prototype.has = Lt, oe.prototype.set = Kt;
  function te(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Nr() {
    this.__data__ = [];
  }
  function kr(o) {
    var m = this.__data__, y = et(m, o);
    if (y < 0)
      return !1;
    var P = m.length - 1;
    return y == P ? m.pop() : zt.call(m, y, 1), !0;
  }
  function Dr(o) {
    var m = this.__data__, y = et(m, o);
    return y < 0 ? void 0 : m[y][1];
  }
  function Ur(o) {
    return et(this.__data__, o) > -1;
  }
  function Hr(o, m) {
    var y = this.__data__, P = et(y, o);
    return P < 0 ? y.push([o, m]) : y[P][1] = m, this;
  }
  te.prototype.clear = Nr, te.prototype.delete = kr, te.prototype.get = Dr, te.prototype.has = Ur, te.prototype.set = Hr;
  function $e(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Br() {
    this.__data__ = {
      hash: new oe(),
      map: new (me || te)(),
      string: new oe()
    };
  }
  function zr(o) {
    return tt(this, o).delete(o);
  }
  function Vr(o) {
    return tt(this, o).get(o);
  }
  function Fr(o) {
    return tt(this, o).has(o);
  }
  function Wr(o, m) {
    return tt(this, o).set(o, m), this;
  }
  $e.prototype.clear = Br, $e.prototype.delete = zr, $e.prototype.get = Vr, $e.prototype.has = Fr, $e.prototype.set = Wr;
  function we(o) {
    this.__data__ = new te(o);
  }
  function qr() {
    this.__data__ = new te();
  }
  function Gr(o) {
    return this.__data__.delete(o);
  }
  function Kr(o) {
    return this.__data__.get(o);
  }
  function Zr(o) {
    return this.__data__.has(o);
  }
  function Jr(o, m) {
    var y = this.__data__;
    if (y instanceof te) {
      var P = y.__data__;
      if (!me || P.length < t - 1)
        return P.push([o, m]), this;
      y = this.__data__ = new $e(P);
    }
    return y.set(o, m), this;
  }
  we.prototype.clear = qr, we.prototype.delete = Gr, we.prototype.get = Kr, we.prototype.has = Zr, we.prototype.set = Jr;
  function Xr(o, m) {
    var y = wt(o) || wn(o) ? Ke(o.length, String) : [], P = y.length, F = !!P;
    for (var K in o)
      J.call(o, K) && !(F && (K == "length" || yn(K, P))) && y.push(K);
    return y;
  }
  function Zt(o, m, y) {
    var P = o[m];
    (!(J.call(o, m) && Yt(P, y)) || y === void 0 && !(m in o)) && (o[m] = y);
  }
  function et(o, m) {
    for (var y = o.length; y--; )
      if (Yt(o[y][0], m))
        return y;
    return -1;
  }
  function Qr(o, m) {
    return o && Jt(m, xt(m), o);
  }
  function bt(o, m, y, P, F, K, re) {
    var Z;
    if (P && (Z = K ? P(o, F, K, re) : P(o)), Z !== void 0)
      return Z;
    if (!rt(o))
      return o;
    var rr = wt(o);
    if (rr) {
      if (Z = mn(o), !m)
        return hn(o, Z);
    } else {
      var Ee = he(o), nr = Ee == c || Ee == u;
      if (En(o))
        return sn(o, m);
      if (Ee == v || Ee == s || nr && !K) {
        if (Y(o))
          return K ? o : {};
        if (Z = vn(nr ? {} : o), !m)
          return dn(o, Qr(Z, o));
      } else {
        if (!U[Ee])
          return K ? o : {};
        Z = gn(o, Ee, bt, m);
      }
    }
    re || (re = new we());
    var ir = re.get(o);
    if (ir)
      return ir;
    if (re.set(o, Z), !rr)
      var sr = y ? pn(o) : xt(o);
    return qe(sr || o, function(Et, nt) {
      sr && (nt = Et, Et = o[nt]), Zt(Z, nt, bt(Et, m, y, P, nt, o, re));
    }), Z;
  }
  function Yr(o) {
    return rt(o) ? Ue(o) : {};
  }
  function en(o, m, y) {
    var P = m(o);
    return wt(o) ? P : Le(P, y(o));
  }
  function tn(o) {
    return Se.call(o);
  }
  function rn(o) {
    if (!rt(o) || bn(o))
      return !1;
    var m = tr(o) || Y(o) ? De : X;
    return m.test(de(o));
  }
  function nn(o) {
    if (!Qt(o))
      return Vt(o);
    var m = [];
    for (var y in Object(o))
      J.call(o, y) && y != "constructor" && m.push(y);
    return m;
  }
  function sn(o, m) {
    if (m)
      return o.slice();
    var y = new o.constructor(o.length);
    return o.copy(y), y;
  }
  function $t(o) {
    var m = new o.constructor(o.byteLength);
    return new ut(m).set(new ut(o)), m;
  }
  function on(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.byteLength);
  }
  function an(o, m, y) {
    var P = m ? y(Ne(o), !0) : Ne(o);
    return Ge(P, We, new o.constructor());
  }
  function cn(o) {
    var m = new o.constructor(o.source, W.exec(o));
    return m.lastIndex = o.lastIndex, m;
  }
  function ln(o, m, y) {
    var P = m ? y(ke(o), !0) : ke(o);
    return Ge(P, Re, new o.constructor());
  }
  function un(o) {
    return ht ? Object(ht.call(o)) : {};
  }
  function fn(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.length);
  }
  function hn(o, m) {
    var y = -1, P = o.length;
    for (m || (m = Array(P)); ++y < P; )
      m[y] = o[y];
    return m;
  }
  function Jt(o, m, y, P) {
    y || (y = {});
    for (var F = -1, K = m.length; ++F < K; ) {
      var re = m[F], Z = void 0;
      Zt(y, re, Z === void 0 ? o[re] : Z);
    }
    return y;
  }
  function dn(o, m) {
    return Jt(o, Xt(o), m);
  }
  function pn(o) {
    return en(o, xt, Xt);
  }
  function tt(o, m) {
    var y = o.__data__;
    return _n(m) ? y[typeof m == "string" ? "string" : "hash"] : y.map;
  }
  function xe(o, m) {
    var y = ue(o, m);
    return rn(y) ? y : void 0;
  }
  var Xt = ft ? be(ft, Object) : An, he = tn;
  (Xe && he(new Xe(new ArrayBuffer(1))) != A || me && he(new me()) != h || Qe && he(Qe.resolve()) != g || He && he(new He()) != x || Ye && he(new Ye()) != w) && (he = function(o) {
    var m = Se.call(o), y = m == v ? o.constructor : void 0, P = y ? de(y) : void 0;
    if (P)
      switch (P) {
        case Ft:
          return A;
        case Wt:
          return h;
        case qt:
          return g;
        case Mt:
          return x;
        case Gt:
          return w;
      }
    return m;
  });
  function mn(o) {
    var m = o.length, y = o.constructor(m);
    return m && typeof o[0] == "string" && J.call(o, "index") && (y.index = o.index, y.input = o.input), y;
  }
  function vn(o) {
    return typeof o.constructor == "function" && !Qt(o) ? Yr(jt(o)) : {};
  }
  function gn(o, m, y, P) {
    var F = o.constructor;
    switch (m) {
      case E:
        return $t(o);
      case f:
      case d:
        return new F(+o);
      case A:
        return on(o, P);
      case R:
      case N:
      case k:
      case O:
      case S:
      case I:
      case C:
      case D:
      case H:
        return fn(o, P);
      case h:
        return an(o, P, y);
      case p:
      case $:
        return new F(o);
      case b:
        return cn(o);
      case x:
        return ln(o, P, y);
      case _:
        return un(o);
    }
  }
  function yn(o, m) {
    return m = m ?? i, !!m && (typeof o == "number" || le.test(o)) && o > -1 && o % 1 == 0 && o < m;
  }
  function _n(o) {
    var m = typeof o;
    return m == "string" || m == "number" || m == "symbol" || m == "boolean" ? o !== "__proto__" : o === null;
  }
  function bn(o) {
    return !!ne && ne in o;
  }
  function Qt(o) {
    var m = o && o.constructor, y = typeof m == "function" && m.prototype || fe;
    return o === y;
  }
  function de(o) {
    if (o != null) {
      try {
        return pe.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function $n(o) {
    return bt(o, !0, !0);
  }
  function Yt(o, m) {
    return o === m || o !== o && m !== m;
  }
  function wn(o) {
    return xn(o) && J.call(o, "callee") && (!Je.call(o, "callee") || Se.call(o) == s);
  }
  var wt = Array.isArray;
  function er(o) {
    return o != null && Sn(o.length) && !tr(o);
  }
  function xn(o) {
    return On(o) && er(o);
  }
  var En = Tt || Cn;
  function tr(o) {
    var m = rt(o) ? Se.call(o) : "";
    return m == c || m == u;
  }
  function Sn(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= i;
  }
  function rt(o) {
    var m = typeof o;
    return !!o && (m == "object" || m == "function");
  }
  function On(o) {
    return !!o && typeof o == "object";
  }
  function xt(o) {
    return er(o) ? Xr(o) : nn(o);
  }
  function An() {
    return [];
  }
  function Cn() {
    return !1;
  }
  r.exports = $n;
})(Qi, Qi.exports);
var gu = Qi.exports;
const yu = /* @__PURE__ */ Er(gu);
function _c(r, e = {}) {
  return e = Object.assign({ deep: !1 }, e), e.deep ? yu(r) : vu(r);
}
function bc(r, e, t, n = []) {
  t = Object.assign({ classInstances: !1, array: !0, clone: !1, privateProps: !0 }, t);
  const i = Array.isArray(r);
  let s = i ? [] : t != null && t.clone ? _c(r, { deep: !0 }) : r;
  return Object.keys(r).forEach((a) => {
    if (!(t != null && t.privateProps) && a.match(/^_/))
      return;
    if (di(r[a]) || pu(r[a]) && (t != null && t.classInstances) || Array.isArray(r[a]) && (t != null && t.array)) {
      const d = bc(
        r[a],
        e,
        Object.assign(Object.assign({}, t), { clone: !1 }),
        // @ts-ignore
        [...n, a]
      );
      i ? s.push(d) : a === "..." && di(d) ? s = Object.assign(Object.assign({}, s), d) : s[a] = d;
      return;
    }
    const f = e == null ? void 0 : e({
      object: r,
      prop: a,
      value: r[a],
      path: [...n, a].join(".")
    });
    if (f === -1) {
      delete s[a];
      return;
    }
    i ? s.push(f) : a === "..." && di(f) ? s = Object.assign(Object.assign({}, s), f) : s[a] = f;
  }), s;
}
var $c = { exports: {} };
function _u(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bs = { exports: {} };
const bu = {}, $u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bu
}, Symbol.toStringTag, { value: "Module" })), wu = /* @__PURE__ */ ru($u);
var To;
function ur() {
  return To || (To = 1, function(r, e) {
    (function(t, n) {
      r.exports = n();
    })(ye, function() {
      var t = t || function(n, i) {
        var s;
        if (typeof window < "u" && window.crypto && (s = window.crypto), typeof self < "u" && self.crypto && (s = self.crypto), typeof globalThis < "u" && globalThis.crypto && (s = globalThis.crypto), !s && typeof window < "u" && window.msCrypto && (s = window.msCrypto), !s && typeof ye < "u" && ye.crypto && (s = ye.crypto), !s && typeof _u == "function")
          try {
            s = wu;
          } catch {
          }
        var a = function() {
          if (s) {
            if (typeof s.getRandomValues == "function")
              try {
                return s.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof s.randomBytes == "function")
              try {
                return s.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, f = Object.create || /* @__PURE__ */ function() {
          function $() {
          }
          return function(_) {
            var w;
            return $.prototype = _, w = new $(), $.prototype = null, w;
          };
        }(), d = {}, l = d.lib = {}, c = l.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function($) {
              var _ = f(this);
              return $ && _.mixIn($), (!_.hasOwnProperty("init") || this.init === _.init) && (_.init = function() {
                _.$super.init.apply(this, arguments);
              }), _.init.prototype = _, _.$super = this, _;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var $ = this.extend();
              return $.init.apply($, arguments), $;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function($) {
              for (var _ in $)
                $.hasOwnProperty(_) && (this[_] = $[_]);
              $.hasOwnProperty("toString") && (this.toString = $.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), u = l.WordArray = c.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function($, _) {
            $ = this.words = $ || [], _ != i ? this.sigBytes = _ : this.sigBytes = $.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function($) {
            return ($ || p).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function($) {
            var _ = this.words, w = $.words, E = this.sigBytes, A = $.sigBytes;
            if (this.clamp(), E % 4)
              for (var R = 0; R < A; R++) {
                var N = w[R >>> 2] >>> 24 - R % 4 * 8 & 255;
                _[E + R >>> 2] |= N << 24 - (E + R) % 4 * 8;
              }
            else
              for (var k = 0; k < A; k += 4)
                _[E + k >>> 2] = w[k >>> 2];
            return this.sigBytes += A, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var $ = this.words, _ = this.sigBytes;
            $[_ >>> 2] &= 4294967295 << 32 - _ % 4 * 8, $.length = n.ceil(_ / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var $ = c.clone.call(this);
            return $.words = this.words.slice(0), $;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function($) {
            for (var _ = [], w = 0; w < $; w += 4)
              _.push(a());
            return new u.init(_, $);
          }
        }), h = d.enc = {}, p = h.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function($) {
            for (var _ = $.words, w = $.sigBytes, E = [], A = 0; A < w; A++) {
              var R = _[A >>> 2] >>> 24 - A % 4 * 8 & 255;
              E.push((R >>> 4).toString(16)), E.push((R & 15).toString(16));
            }
            return E.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function($) {
            for (var _ = $.length, w = [], E = 0; E < _; E += 2)
              w[E >>> 3] |= parseInt($.substr(E, 2), 16) << 24 - E % 8 * 4;
            return new u.init(w, _ / 2);
          }
        }, v = h.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function($) {
            for (var _ = $.words, w = $.sigBytes, E = [], A = 0; A < w; A++) {
              var R = _[A >>> 2] >>> 24 - A % 4 * 8 & 255;
              E.push(String.fromCharCode(R));
            }
            return E.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function($) {
            for (var _ = $.length, w = [], E = 0; E < _; E++)
              w[E >>> 2] |= ($.charCodeAt(E) & 255) << 24 - E % 4 * 8;
            return new u.init(w, _);
          }
        }, g = h.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function($) {
            try {
              return decodeURIComponent(escape(v.stringify($)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function($) {
            return v.parse(unescape(encodeURIComponent($)));
          }
        }, b = l.BufferedBlockAlgorithm = c.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new u.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function($) {
            typeof $ == "string" && ($ = g.parse($)), this._data.concat($), this._nDataBytes += $.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function($) {
            var _, w = this._data, E = w.words, A = w.sigBytes, R = this.blockSize, N = R * 4, k = A / N;
            $ ? k = n.ceil(k) : k = n.max((k | 0) - this._minBufferSize, 0);
            var O = k * R, S = n.min(O * 4, A);
            if (O) {
              for (var I = 0; I < O; I += R)
                this._doProcessBlock(E, I);
              _ = E.splice(0, O), w.sigBytes -= S;
            }
            return new u.init(_, S);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var $ = c.clone.call(this);
            return $._data = this._data.clone(), $;
          },
          _minBufferSize: 0
        });
        l.Hasher = b.extend({
          /**
           * Configuration options.
           */
          cfg: c.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function($) {
            this.cfg = this.cfg.extend($), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            b.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function($) {
            return this._append($), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function($) {
            $ && this._append($);
            var _ = this._doFinalize();
            return _;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function($) {
            return function(_, w) {
              return new $.init(w).finalize(_);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function($) {
            return function(_, w) {
              return new x.HMAC.init($, w).finalize(_);
            };
          }
        });
        var x = d.algo = {};
        return d;
      }(Math);
      return t;
    });
  }(bs)), bs.exports;
}
(function(r, e) {
  (function(t, n) {
    r.exports = n(ur());
  })(ye, function(t) {
    return function() {
      var n = t, i = n.lib, s = i.WordArray, a = n.enc;
      a.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function(d) {
          var l = d.words, c = d.sigBytes, u = this._map;
          d.clamp();
          for (var h = [], p = 0; p < c; p += 3)
            for (var v = l[p >>> 2] >>> 24 - p % 4 * 8 & 255, g = l[p + 1 >>> 2] >>> 24 - (p + 1) % 4 * 8 & 255, b = l[p + 2 >>> 2] >>> 24 - (p + 2) % 4 * 8 & 255, x = v << 16 | g << 8 | b, $ = 0; $ < 4 && p + $ * 0.75 < c; $++)
              h.push(u.charAt(x >>> 6 * (3 - $) & 63));
          var _ = u.charAt(64);
          if (_)
            for (; h.length % 4; )
              h.push(_);
          return h.join("");
        },
        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function(d) {
          var l = d.length, c = this._map, u = this._reverseMap;
          if (!u) {
            u = this._reverseMap = [];
            for (var h = 0; h < c.length; h++)
              u[c.charCodeAt(h)] = h;
          }
          var p = c.charAt(64);
          if (p) {
            var v = d.indexOf(p);
            v !== -1 && (l = v);
          }
          return f(d, l, u);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function f(d, l, c) {
        for (var u = [], h = 0, p = 0; p < l; p++)
          if (p % 4) {
            var v = c[d.charCodeAt(p - 1)] << p % 4 * 2, g = c[d.charCodeAt(p)] >>> 6 - p % 4 * 2, b = v | g;
            u[h >>> 2] |= b << 24 - h % 4 * 8, h++;
          }
        return s.create(u, h);
      }
    }(), t.enc.Base64;
  });
})($c);
var xu = $c.exports, Eu = { exports: {} };
(function(r, e) {
  (function(t, n) {
    r.exports = n(ur());
  })(ye, function(t) {
    return t.enc.Utf8;
  });
})(Eu);
var $s = { exports: {} }, Mo;
function wc() {
  return Mo || (Mo = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(ur());
    })(ye, function(t) {
      return function(n) {
        var i = t, s = i.lib, a = s.WordArray, f = s.Hasher, d = i.algo, l = [];
        (function() {
          for (var g = 0; g < 64; g++)
            l[g] = n.abs(n.sin(g + 1)) * 4294967296 | 0;
        })();
        var c = d.MD5 = f.extend({
          _doReset: function() {
            this._hash = new a.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(g, b) {
            for (var x = 0; x < 16; x++) {
              var $ = b + x, _ = g[$];
              g[$] = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360;
            }
            var w = this._hash.words, E = g[b + 0], A = g[b + 1], R = g[b + 2], N = g[b + 3], k = g[b + 4], O = g[b + 5], S = g[b + 6], I = g[b + 7], C = g[b + 8], D = g[b + 9], H = g[b + 10], B = g[b + 11], W = g[b + 12], X = g[b + 13], le = g[b + 14], U = g[b + 15], T = w[0], L = w[1], j = w[2], M = w[3];
            T = u(T, L, j, M, E, 7, l[0]), M = u(M, T, L, j, A, 12, l[1]), j = u(j, M, T, L, R, 17, l[2]), L = u(L, j, M, T, N, 22, l[3]), T = u(T, L, j, M, k, 7, l[4]), M = u(M, T, L, j, O, 12, l[5]), j = u(j, M, T, L, S, 17, l[6]), L = u(L, j, M, T, I, 22, l[7]), T = u(T, L, j, M, C, 7, l[8]), M = u(M, T, L, j, D, 12, l[9]), j = u(j, M, T, L, H, 17, l[10]), L = u(L, j, M, T, B, 22, l[11]), T = u(T, L, j, M, W, 7, l[12]), M = u(M, T, L, j, X, 12, l[13]), j = u(j, M, T, L, le, 17, l[14]), L = u(L, j, M, T, U, 22, l[15]), T = h(T, L, j, M, A, 5, l[16]), M = h(M, T, L, j, S, 9, l[17]), j = h(j, M, T, L, B, 14, l[18]), L = h(L, j, M, T, E, 20, l[19]), T = h(T, L, j, M, O, 5, l[20]), M = h(M, T, L, j, H, 9, l[21]), j = h(j, M, T, L, U, 14, l[22]), L = h(L, j, M, T, k, 20, l[23]), T = h(T, L, j, M, D, 5, l[24]), M = h(M, T, L, j, le, 9, l[25]), j = h(j, M, T, L, N, 14, l[26]), L = h(L, j, M, T, C, 20, l[27]), T = h(T, L, j, M, X, 5, l[28]), M = h(M, T, L, j, R, 9, l[29]), j = h(j, M, T, L, I, 14, l[30]), L = h(L, j, M, T, W, 20, l[31]), T = p(T, L, j, M, O, 4, l[32]), M = p(M, T, L, j, C, 11, l[33]), j = p(j, M, T, L, B, 16, l[34]), L = p(L, j, M, T, le, 23, l[35]), T = p(T, L, j, M, A, 4, l[36]), M = p(M, T, L, j, k, 11, l[37]), j = p(j, M, T, L, I, 16, l[38]), L = p(L, j, M, T, H, 23, l[39]), T = p(T, L, j, M, X, 4, l[40]), M = p(M, T, L, j, E, 11, l[41]), j = p(j, M, T, L, N, 16, l[42]), L = p(L, j, M, T, S, 23, l[43]), T = p(T, L, j, M, D, 4, l[44]), M = p(M, T, L, j, W, 11, l[45]), j = p(j, M, T, L, U, 16, l[46]), L = p(L, j, M, T, R, 23, l[47]), T = v(T, L, j, M, E, 6, l[48]), M = v(M, T, L, j, I, 10, l[49]), j = v(j, M, T, L, le, 15, l[50]), L = v(L, j, M, T, O, 21, l[51]), T = v(T, L, j, M, W, 6, l[52]), M = v(M, T, L, j, N, 10, l[53]), j = v(j, M, T, L, H, 15, l[54]), L = v(L, j, M, T, A, 21, l[55]), T = v(T, L, j, M, C, 6, l[56]), M = v(M, T, L, j, U, 10, l[57]), j = v(j, M, T, L, S, 15, l[58]), L = v(L, j, M, T, X, 21, l[59]), T = v(T, L, j, M, k, 6, l[60]), M = v(M, T, L, j, B, 10, l[61]), j = v(j, M, T, L, R, 15, l[62]), L = v(L, j, M, T, D, 21, l[63]), w[0] = w[0] + T | 0, w[1] = w[1] + L | 0, w[2] = w[2] + j | 0, w[3] = w[3] + M | 0;
          },
          _doFinalize: function() {
            var g = this._data, b = g.words, x = this._nDataBytes * 8, $ = g.sigBytes * 8;
            b[$ >>> 5] |= 128 << 24 - $ % 32;
            var _ = n.floor(x / 4294967296), w = x;
            b[($ + 64 >>> 9 << 4) + 15] = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360, b[($ + 64 >>> 9 << 4) + 14] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360, g.sigBytes = (b.length + 1) * 4, this._process();
            for (var E = this._hash, A = E.words, R = 0; R < 4; R++) {
              var N = A[R];
              A[R] = (N << 8 | N >>> 24) & 16711935 | (N << 24 | N >>> 8) & 4278255360;
            }
            return E;
          },
          clone: function() {
            var g = f.clone.call(this);
            return g._hash = this._hash.clone(), g;
          }
        });
        function u(g, b, x, $, _, w, E) {
          var A = g + (b & x | ~b & $) + _ + E;
          return (A << w | A >>> 32 - w) + b;
        }
        function h(g, b, x, $, _, w, E) {
          var A = g + (b & $ | x & ~$) + _ + E;
          return (A << w | A >>> 32 - w) + b;
        }
        function p(g, b, x, $, _, w, E) {
          var A = g + (b ^ x ^ $) + _ + E;
          return (A << w | A >>> 32 - w) + b;
        }
        function v(g, b, x, $, _, w, E) {
          var A = g + (x ^ (b | ~$)) + _ + E;
          return (A << w | A >>> 32 - w) + b;
        }
        i.MD5 = f._createHelper(c), i.HmacMD5 = f._createHmacHelper(c);
      }(Math), t.MD5;
    });
  }($s)), $s.exports;
}
wc();
function Su(r) {
  if (typeof r != "string")
    return r;
  if (r.toLowerCase() === "true")
    return !0;
  if (r.toLowerCase() === "false")
    return !1;
  if (r.toLowerCase() === "null")
    return null;
  if (r.toLowerCase() === "undefined")
    return;
  r = r.split("⠀").join("").trim();
  const e = Number(r);
  if (!isNaN(e))
    return Number.isInteger(e) ? e : parseFloat(r);
  try {
    const n = JSON.parse(r);
    if (n)
      return n;
  } catch {
  }
  return r;
}
var Ou = { exports: {} }, ws = { exports: {} }, xs = { exports: {} }, Ro;
function Au() {
  return Ro || (Ro = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(ur());
    })(ye, function(t) {
      return function() {
        var n = t, i = n.lib, s = i.WordArray, a = i.Hasher, f = n.algo, d = [], l = f.SHA1 = a.extend({
          _doReset: function() {
            this._hash = new s.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(c, u) {
            for (var h = this._hash.words, p = h[0], v = h[1], g = h[2], b = h[3], x = h[4], $ = 0; $ < 80; $++) {
              if ($ < 16)
                d[$] = c[u + $] | 0;
              else {
                var _ = d[$ - 3] ^ d[$ - 8] ^ d[$ - 14] ^ d[$ - 16];
                d[$] = _ << 1 | _ >>> 31;
              }
              var w = (p << 5 | p >>> 27) + x + d[$];
              $ < 20 ? w += (v & g | ~v & b) + 1518500249 : $ < 40 ? w += (v ^ g ^ b) + 1859775393 : $ < 60 ? w += (v & g | v & b | g & b) - 1894007588 : w += (v ^ g ^ b) - 899497514, x = b, b = g, g = v << 30 | v >>> 2, v = p, p = w;
            }
            h[0] = h[0] + p | 0, h[1] = h[1] + v | 0, h[2] = h[2] + g | 0, h[3] = h[3] + b | 0, h[4] = h[4] + x | 0;
          },
          _doFinalize: function() {
            var c = this._data, u = c.words, h = this._nDataBytes * 8, p = c.sigBytes * 8;
            return u[p >>> 5] |= 128 << 24 - p % 32, u[(p + 64 >>> 9 << 4) + 14] = Math.floor(h / 4294967296), u[(p + 64 >>> 9 << 4) + 15] = h, c.sigBytes = u.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var c = a.clone.call(this);
            return c._hash = this._hash.clone(), c;
          }
        });
        n.SHA1 = a._createHelper(l), n.HmacSHA1 = a._createHmacHelper(l);
      }(), t.SHA1;
    });
  }(xs)), xs.exports;
}
var Es = { exports: {} }, Lo;
function Cu() {
  return Lo || (Lo = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(ur());
    })(ye, function(t) {
      (function() {
        var n = t, i = n.lib, s = i.Base, a = n.enc, f = a.Utf8, d = n.algo;
        d.HMAC = s.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(l, c) {
            l = this._hasher = new l.init(), typeof c == "string" && (c = f.parse(c));
            var u = l.blockSize, h = u * 4;
            c.sigBytes > h && (c = l.finalize(c)), c.clamp();
            for (var p = this._oKey = c.clone(), v = this._iKey = c.clone(), g = p.words, b = v.words, x = 0; x < u; x++)
              g[x] ^= 1549556828, b[x] ^= 909522486;
            p.sigBytes = v.sigBytes = h, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var l = this._hasher;
            l.reset(), l.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(l) {
            return this._hasher.update(l), this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(l) {
            var c = this._hasher, u = c.finalize(l);
            c.reset();
            var h = c.finalize(this._oKey.clone().concat(u));
            return h;
          }
        });
      })();
    });
  }(Es)), Es.exports;
}
var No;
function xc() {
  return No || (No = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(ur(), Au(), Cu());
    })(ye, function(t) {
      return function() {
        var n = t, i = n.lib, s = i.Base, a = i.WordArray, f = n.algo, d = f.MD5, l = f.EvpKDF = s.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: s.extend({
            keySize: 128 / 32,
            hasher: d,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(c) {
            this.cfg = this.cfg.extend(c);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(c, u) {
            for (var h, p = this.cfg, v = p.hasher.create(), g = a.create(), b = g.words, x = p.keySize, $ = p.iterations; b.length < x; ) {
              h && v.update(h), h = v.update(c).finalize(u), v.reset();
              for (var _ = 1; _ < $; _++)
                h = v.finalize(h), v.reset();
              g.concat(h);
            }
            return g.sigBytes = x * 4, g;
          }
        });
        n.EvpKDF = function(c, u, h) {
          return l.create(h).compute(c, u);
        };
      }(), t.EvpKDF;
    });
  }(ws)), ws.exports;
}
var Ss = { exports: {} }, ko;
function Pu() {
  return ko || (ko = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(ur(), xc());
    })(ye, function(t) {
      t.lib.Cipher || function(n) {
        var i = t, s = i.lib, a = s.Base, f = s.WordArray, d = s.BufferedBlockAlgorithm, l = i.enc;
        l.Utf8;
        var c = l.Base64, u = i.algo, h = u.EvpKDF, p = s.Cipher = d.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: a.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(O, S) {
            return this.create(this._ENC_XFORM_MODE, O, S);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(O, S) {
            return this.create(this._DEC_XFORM_MODE, O, S);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(O, S, I) {
            this.cfg = this.cfg.extend(I), this._xformMode = O, this._key = S, this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            d.reset.call(this), this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(O) {
            return this._append(O), this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(O) {
            O && this._append(O);
            var S = this._doFinalize();
            return S;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function O(S) {
              return typeof S == "string" ? k : A;
            }
            return function(S) {
              return {
                encrypt: function(I, C, D) {
                  return O(C).encrypt(S, I, C, D);
                },
                decrypt: function(I, C, D) {
                  return O(C).decrypt(S, I, C, D);
                }
              };
            };
          }()
        });
        s.StreamCipher = p.extend({
          _doFinalize: function() {
            var O = this._process(!0);
            return O;
          },
          blockSize: 1
        });
        var v = i.mode = {}, g = s.BlockCipherMode = a.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(O, S) {
            return this.Encryptor.create(O, S);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(O, S) {
            return this.Decryptor.create(O, S);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(O, S) {
            this._cipher = O, this._iv = S;
          }
        }), b = v.CBC = function() {
          var O = g.extend();
          O.Encryptor = O.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(I, C) {
              var D = this._cipher, H = D.blockSize;
              S.call(this, I, C, H), D.encryptBlock(I, C), this._prevBlock = I.slice(C, C + H);
            }
          }), O.Decryptor = O.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(I, C) {
              var D = this._cipher, H = D.blockSize, B = I.slice(C, C + H);
              D.decryptBlock(I, C), S.call(this, I, C, H), this._prevBlock = B;
            }
          });
          function S(I, C, D) {
            var H, B = this._iv;
            B ? (H = B, this._iv = n) : H = this._prevBlock;
            for (var W = 0; W < D; W++)
              I[C + W] ^= H[W];
          }
          return O;
        }(), x = i.pad = {}, $ = x.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(O, S) {
            for (var I = S * 4, C = I - O.sigBytes % I, D = C << 24 | C << 16 | C << 8 | C, H = [], B = 0; B < C; B += 4)
              H.push(D);
            var W = f.create(H, C);
            O.concat(W);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(O) {
            var S = O.words[O.sigBytes - 1 >>> 2] & 255;
            O.sigBytes -= S;
          }
        };
        s.BlockCipher = p.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: p.cfg.extend({
            mode: b,
            padding: $
          }),
          reset: function() {
            var O;
            p.reset.call(this);
            var S = this.cfg, I = S.iv, C = S.mode;
            this._xformMode == this._ENC_XFORM_MODE ? O = C.createEncryptor : (O = C.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == O ? this._mode.init(this, I && I.words) : (this._mode = O.call(C, this, I && I.words), this._mode.__creator = O);
          },
          _doProcessBlock: function(O, S) {
            this._mode.processBlock(O, S);
          },
          _doFinalize: function() {
            var O, S = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (S.pad(this._data, this.blockSize), O = this._process(!0)) : (O = this._process(!0), S.unpad(O)), O;
          },
          blockSize: 128 / 32
        });
        var _ = s.CipherParams = a.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(O) {
            this.mixIn(O);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(O) {
            return (O || this.formatter).stringify(this);
          }
        }), w = i.format = {}, E = w.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(O) {
            var S, I = O.ciphertext, C = O.salt;
            return C ? S = f.create([1398893684, 1701076831]).concat(C).concat(I) : S = I, S.toString(c);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(O) {
            var S, I = c.parse(O), C = I.words;
            return C[0] == 1398893684 && C[1] == 1701076831 && (S = f.create(C.slice(2, 4)), C.splice(0, 4), I.sigBytes -= 16), _.create({ ciphertext: I, salt: S });
          }
        }, A = s.SerializableCipher = a.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: a.extend({
            format: E
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(O, S, I, C) {
            C = this.cfg.extend(C);
            var D = O.createEncryptor(I, C), H = D.finalize(S), B = D.cfg;
            return _.create({
              ciphertext: H,
              key: I,
              iv: B.iv,
              algorithm: O,
              mode: B.mode,
              padding: B.padding,
              blockSize: O.blockSize,
              formatter: C.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(O, S, I, C) {
            C = this.cfg.extend(C), S = this._parse(S, C.format);
            var D = O.createDecryptor(I, C).finalize(S.ciphertext);
            return D;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(O, S) {
            return typeof O == "string" ? S.parse(O, this) : O;
          }
        }), R = i.kdf = {}, N = R.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(O, S, I, C, D) {
            if (C || (C = f.random(64 / 8)), D)
              var H = h.create({ keySize: S + I, hasher: D }).compute(O, C);
            else
              var H = h.create({ keySize: S + I }).compute(O, C);
            var B = f.create(H.words.slice(S), I * 4);
            return H.sigBytes = S * 4, _.create({ key: H, iv: B, salt: C });
          }
        }, k = s.PasswordBasedCipher = A.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: A.cfg.extend({
            kdf: N
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(O, S, I, C) {
            C = this.cfg.extend(C);
            var D = C.kdf.execute(I, O.keySize, O.ivSize, C.salt, C.hasher);
            C.iv = D.iv;
            var H = A.encrypt.call(this, O, S, D.key, C);
            return H.mixIn(D), H;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(O, S, I, C) {
            C = this.cfg.extend(C), S = this._parse(S, C.format);
            var D = C.kdf.execute(I, O.keySize, O.ivSize, S.salt, C.hasher);
            C.iv = D.iv;
            var H = A.decrypt.call(this, O, S, D.key, C);
            return H;
          }
        });
      }();
    });
  }(Ss)), Ss.exports;
}
(function(r, e) {
  (function(t, n, i) {
    r.exports = n(ur(), xu, wc(), xc(), Pu());
  })(ye, function(t) {
    return function() {
      var n = t, i = n.lib, s = i.BlockCipher, a = n.algo, f = [], d = [], l = [], c = [], u = [], h = [], p = [], v = [], g = [], b = [];
      (function() {
        for (var _ = [], w = 0; w < 256; w++)
          w < 128 ? _[w] = w << 1 : _[w] = w << 1 ^ 283;
        for (var E = 0, A = 0, w = 0; w < 256; w++) {
          var R = A ^ A << 1 ^ A << 2 ^ A << 3 ^ A << 4;
          R = R >>> 8 ^ R & 255 ^ 99, f[E] = R, d[R] = E;
          var N = _[E], k = _[N], O = _[k], S = _[R] * 257 ^ R * 16843008;
          l[E] = S << 24 | S >>> 8, c[E] = S << 16 | S >>> 16, u[E] = S << 8 | S >>> 24, h[E] = S;
          var S = O * 16843009 ^ k * 65537 ^ N * 257 ^ E * 16843008;
          p[R] = S << 24 | S >>> 8, v[R] = S << 16 | S >>> 16, g[R] = S << 8 | S >>> 24, b[R] = S, E ? (E = N ^ _[_[_[O ^ N]]], A ^= _[_[A]]) : E = A = 1;
        }
      })();
      var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], $ = a.AES = s.extend({
        _doReset: function() {
          var _;
          if (!(this._nRounds && this._keyPriorReset === this._key)) {
            for (var w = this._keyPriorReset = this._key, E = w.words, A = w.sigBytes / 4, R = this._nRounds = A + 6, N = (R + 1) * 4, k = this._keySchedule = [], O = 0; O < N; O++)
              O < A ? k[O] = E[O] : (_ = k[O - 1], O % A ? A > 6 && O % A == 4 && (_ = f[_ >>> 24] << 24 | f[_ >>> 16 & 255] << 16 | f[_ >>> 8 & 255] << 8 | f[_ & 255]) : (_ = _ << 8 | _ >>> 24, _ = f[_ >>> 24] << 24 | f[_ >>> 16 & 255] << 16 | f[_ >>> 8 & 255] << 8 | f[_ & 255], _ ^= x[O / A | 0] << 24), k[O] = k[O - A] ^ _);
            for (var S = this._invKeySchedule = [], I = 0; I < N; I++) {
              var O = N - I;
              if (I % 4)
                var _ = k[O];
              else
                var _ = k[O - 4];
              I < 4 || O <= 4 ? S[I] = _ : S[I] = p[f[_ >>> 24]] ^ v[f[_ >>> 16 & 255]] ^ g[f[_ >>> 8 & 255]] ^ b[f[_ & 255]];
            }
          }
        },
        encryptBlock: function(_, w) {
          this._doCryptBlock(_, w, this._keySchedule, l, c, u, h, f);
        },
        decryptBlock: function(_, w) {
          var E = _[w + 1];
          _[w + 1] = _[w + 3], _[w + 3] = E, this._doCryptBlock(_, w, this._invKeySchedule, p, v, g, b, d);
          var E = _[w + 1];
          _[w + 1] = _[w + 3], _[w + 3] = E;
        },
        _doCryptBlock: function(_, w, E, A, R, N, k, O) {
          for (var S = this._nRounds, I = _[w] ^ E[0], C = _[w + 1] ^ E[1], D = _[w + 2] ^ E[2], H = _[w + 3] ^ E[3], B = 4, W = 1; W < S; W++) {
            var X = A[I >>> 24] ^ R[C >>> 16 & 255] ^ N[D >>> 8 & 255] ^ k[H & 255] ^ E[B++], le = A[C >>> 24] ^ R[D >>> 16 & 255] ^ N[H >>> 8 & 255] ^ k[I & 255] ^ E[B++], U = A[D >>> 24] ^ R[H >>> 16 & 255] ^ N[I >>> 8 & 255] ^ k[C & 255] ^ E[B++], T = A[H >>> 24] ^ R[I >>> 16 & 255] ^ N[C >>> 8 & 255] ^ k[D & 255] ^ E[B++];
            I = X, C = le, D = U, H = T;
          }
          var X = (O[I >>> 24] << 24 | O[C >>> 16 & 255] << 16 | O[D >>> 8 & 255] << 8 | O[H & 255]) ^ E[B++], le = (O[C >>> 24] << 24 | O[D >>> 16 & 255] << 16 | O[H >>> 8 & 255] << 8 | O[I & 255]) ^ E[B++], U = (O[D >>> 24] << 24 | O[H >>> 16 & 255] << 16 | O[I >>> 8 & 255] << 8 | O[C & 255]) ^ E[B++], T = (O[H >>> 24] << 24 | O[I >>> 16 & 255] << 16 | O[C >>> 8 & 255] << 8 | O[D & 255]) ^ E[B++];
          _[w] = X, _[w + 1] = le, _[w + 2] = U, _[w + 3] = T;
        },
        keySize: 256 / 32
      });
      n.AES = s._createHelper($);
    }(), t.AES;
  });
})(Ou);
var Iu = { exports: {} };
(function(r, e) {
  (function(t, n) {
    r.exports = n(ur());
  })(ye, function(t) {
    return function(n) {
      var i = t, s = i.lib, a = s.WordArray, f = s.Hasher, d = i.algo, l = [], c = [];
      (function() {
        function p(x) {
          for (var $ = n.sqrt(x), _ = 2; _ <= $; _++)
            if (!(x % _))
              return !1;
          return !0;
        }
        function v(x) {
          return (x - (x | 0)) * 4294967296 | 0;
        }
        for (var g = 2, b = 0; b < 64; )
          p(g) && (b < 8 && (l[b] = v(n.pow(g, 1 / 2))), c[b] = v(n.pow(g, 1 / 3)), b++), g++;
      })();
      var u = [], h = d.SHA256 = f.extend({
        _doReset: function() {
          this._hash = new a.init(l.slice(0));
        },
        _doProcessBlock: function(p, v) {
          for (var g = this._hash.words, b = g[0], x = g[1], $ = g[2], _ = g[3], w = g[4], E = g[5], A = g[6], R = g[7], N = 0; N < 64; N++) {
            if (N < 16)
              u[N] = p[v + N] | 0;
            else {
              var k = u[N - 15], O = (k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3, S = u[N - 2], I = (S << 15 | S >>> 17) ^ (S << 13 | S >>> 19) ^ S >>> 10;
              u[N] = O + u[N - 7] + I + u[N - 16];
            }
            var C = w & E ^ ~w & A, D = b & x ^ b & $ ^ x & $, H = (b << 30 | b >>> 2) ^ (b << 19 | b >>> 13) ^ (b << 10 | b >>> 22), B = (w << 26 | w >>> 6) ^ (w << 21 | w >>> 11) ^ (w << 7 | w >>> 25), W = R + B + C + c[N] + u[N], X = H + D;
            R = A, A = E, E = w, w = _ + W | 0, _ = $, $ = x, x = b, b = W + X | 0;
          }
          g[0] = g[0] + b | 0, g[1] = g[1] + x | 0, g[2] = g[2] + $ | 0, g[3] = g[3] + _ | 0, g[4] = g[4] + w | 0, g[5] = g[5] + E | 0, g[6] = g[6] + A | 0, g[7] = g[7] + R | 0;
        },
        _doFinalize: function() {
          var p = this._data, v = p.words, g = this._nDataBytes * 8, b = p.sigBytes * 8;
          return v[b >>> 5] |= 128 << 24 - b % 32, v[(b + 64 >>> 9 << 4) + 14] = n.floor(g / 4294967296), v[(b + 64 >>> 9 << 4) + 15] = g, p.sigBytes = v.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var p = f.clone.call(this);
          return p._hash = this._hash.clone(), p;
        }
      });
      i.SHA256 = f._createHelper(h), i.HmacSHA256 = f._createHmacHelper(h);
    }(Math), t.SHA256;
  });
})(Iu);
var ju = { exports: {} }, Os = { exports: {} }, Do;
function Tu() {
  return Do || (Do = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(ur());
    })(ye, function(t) {
      return function(n) {
        var i = t, s = i.lib, a = s.Base, f = s.WordArray, d = i.x64 = {};
        d.Word = a.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(l, c) {
            this.high = l, this.low = c;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        }), d.WordArray = a.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(l, c) {
            l = this.words = l || [], c != n ? this.sigBytes = c : this.sigBytes = l.length * 8;
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            for (var l = this.words, c = l.length, u = [], h = 0; h < c; h++) {
              var p = l[h];
              u.push(p.high), u.push(p.low);
            }
            return f.create(u, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            for (var l = a.clone.call(this), c = l.words = this.words.slice(0), u = c.length, h = 0; h < u; h++)
              c[h] = c[h].clone();
            return l;
          }
        });
      }(), t;
    });
  }(Os)), Os.exports;
}
(function(r, e) {
  (function(t, n, i) {
    r.exports = n(ur(), Tu());
  })(ye, function(t) {
    return function() {
      var n = t, i = n.lib, s = i.Hasher, a = n.x64, f = a.Word, d = a.WordArray, l = n.algo;
      function c() {
        return f.create.apply(f, arguments);
      }
      var u = [
        c(1116352408, 3609767458),
        c(1899447441, 602891725),
        c(3049323471, 3964484399),
        c(3921009573, 2173295548),
        c(961987163, 4081628472),
        c(1508970993, 3053834265),
        c(2453635748, 2937671579),
        c(2870763221, 3664609560),
        c(3624381080, 2734883394),
        c(310598401, 1164996542),
        c(607225278, 1323610764),
        c(1426881987, 3590304994),
        c(1925078388, 4068182383),
        c(2162078206, 991336113),
        c(2614888103, 633803317),
        c(3248222580, 3479774868),
        c(3835390401, 2666613458),
        c(4022224774, 944711139),
        c(264347078, 2341262773),
        c(604807628, 2007800933),
        c(770255983, 1495990901),
        c(1249150122, 1856431235),
        c(1555081692, 3175218132),
        c(1996064986, 2198950837),
        c(2554220882, 3999719339),
        c(2821834349, 766784016),
        c(2952996808, 2566594879),
        c(3210313671, 3203337956),
        c(3336571891, 1034457026),
        c(3584528711, 2466948901),
        c(113926993, 3758326383),
        c(338241895, 168717936),
        c(666307205, 1188179964),
        c(773529912, 1546045734),
        c(1294757372, 1522805485),
        c(1396182291, 2643833823),
        c(1695183700, 2343527390),
        c(1986661051, 1014477480),
        c(2177026350, 1206759142),
        c(2456956037, 344077627),
        c(2730485921, 1290863460),
        c(2820302411, 3158454273),
        c(3259730800, 3505952657),
        c(3345764771, 106217008),
        c(3516065817, 3606008344),
        c(3600352804, 1432725776),
        c(4094571909, 1467031594),
        c(275423344, 851169720),
        c(430227734, 3100823752),
        c(506948616, 1363258195),
        c(659060556, 3750685593),
        c(883997877, 3785050280),
        c(958139571, 3318307427),
        c(1322822218, 3812723403),
        c(1537002063, 2003034995),
        c(1747873779, 3602036899),
        c(1955562222, 1575990012),
        c(2024104815, 1125592928),
        c(2227730452, 2716904306),
        c(2361852424, 442776044),
        c(2428436474, 593698344),
        c(2756734187, 3733110249),
        c(3204031479, 2999351573),
        c(3329325298, 3815920427),
        c(3391569614, 3928383900),
        c(3515267271, 566280711),
        c(3940187606, 3454069534),
        c(4118630271, 4000239992),
        c(116418474, 1914138554),
        c(174292421, 2731055270),
        c(289380356, 3203993006),
        c(460393269, 320620315),
        c(685471733, 587496836),
        c(852142971, 1086792851),
        c(1017036298, 365543100),
        c(1126000580, 2618297676),
        c(1288033470, 3409855158),
        c(1501505948, 4234509866),
        c(1607167915, 987167468),
        c(1816402316, 1246189591)
      ], h = [];
      (function() {
        for (var v = 0; v < 80; v++)
          h[v] = c();
      })();
      var p = l.SHA512 = s.extend({
        _doReset: function() {
          this._hash = new d.init([
            new f.init(1779033703, 4089235720),
            new f.init(3144134277, 2227873595),
            new f.init(1013904242, 4271175723),
            new f.init(2773480762, 1595750129),
            new f.init(1359893119, 2917565137),
            new f.init(2600822924, 725511199),
            new f.init(528734635, 4215389547),
            new f.init(1541459225, 327033209)
          ]);
        },
        _doProcessBlock: function(v, g) {
          for (var b = this._hash.words, x = b[0], $ = b[1], _ = b[2], w = b[3], E = b[4], A = b[5], R = b[6], N = b[7], k = x.high, O = x.low, S = $.high, I = $.low, C = _.high, D = _.low, H = w.high, B = w.low, W = E.high, X = E.low, le = A.high, U = A.low, T = R.high, L = R.low, j = N.high, M = N.low, ie = k, se = O, We = S, Re = I, qe = C, Le = D, Ge = H, Ke = B, ue = W, Y = X, Ne = le, be = U, ke = T, Ze = L, gt = j, fe = M, ee = 0; ee < 80; ee++) {
            var ne, pe, J = h[ee];
            if (ee < 16)
              pe = J.high = v[g + ee * 2] | 0, ne = J.low = v[g + ee * 2 + 1] | 0;
            else {
              var Se = h[ee - 15], De = Se.high, Pe = Se.low, yt = (De >>> 1 | Pe << 31) ^ (De >>> 8 | Pe << 24) ^ De >>> 7, ut = (Pe >>> 1 | De << 31) ^ (Pe >>> 8 | De << 24) ^ (Pe >>> 7 | De << 25), jt = h[ee - 2], Ue = jt.high, Je = jt.low, zt = (Ue >>> 19 | Je << 13) ^ (Ue << 3 | Je >>> 29) ^ Ue >>> 6, ft = (Je >>> 19 | Ue << 13) ^ (Je << 3 | Ue >>> 29) ^ (Je >>> 6 | Ue << 26), Tt = h[ee - 7], Vt = Tt.high, Xe = Tt.low, me = h[ee - 16], Qe = me.high, He = me.low;
              ne = ut + Xe, pe = yt + Vt + (ne >>> 0 < ut >>> 0 ? 1 : 0), ne = ne + ft, pe = pe + zt + (ne >>> 0 < ft >>> 0 ? 1 : 0), ne = ne + He, pe = pe + Qe + (ne >>> 0 < He >>> 0 ? 1 : 0), J.high = pe, J.low = ne;
            }
            var Ye = ue & Ne ^ ~ue & ke, ve = Y & be ^ ~Y & Ze, Ft = ie & We ^ ie & qe ^ We & qe, Wt = se & Re ^ se & Le ^ Re & Le, qt = (ie >>> 28 | se << 4) ^ (ie << 30 | se >>> 2) ^ (ie << 25 | se >>> 7), Mt = (se >>> 28 | ie << 4) ^ (se << 30 | ie >>> 2) ^ (se << 25 | ie >>> 7), Gt = (ue >>> 14 | Y << 18) ^ (ue >>> 18 | Y << 14) ^ (ue << 23 | Y >>> 9), _t = (Y >>> 14 | ue << 18) ^ (Y >>> 18 | ue << 14) ^ (Y << 23 | ue >>> 9), ht = u[ee], oe = ht.high, Rt = ht.low, ae = fe + _t, Oe = gt + Gt + (ae >>> 0 < fe >>> 0 ? 1 : 0), ae = ae + ve, Oe = Oe + Ye + (ae >>> 0 < ve >>> 0 ? 1 : 0), ae = ae + Rt, Oe = Oe + oe + (ae >>> 0 < Rt >>> 0 ? 1 : 0), ae = ae + ne, Oe = Oe + pe + (ae >>> 0 < ne >>> 0 ? 1 : 0), Lt = Mt + Wt, Kt = qt + Ft + (Lt >>> 0 < Mt >>> 0 ? 1 : 0);
            gt = ke, fe = Ze, ke = Ne, Ze = be, Ne = ue, be = Y, Y = Ke + ae | 0, ue = Ge + Oe + (Y >>> 0 < Ke >>> 0 ? 1 : 0) | 0, Ge = qe, Ke = Le, qe = We, Le = Re, We = ie, Re = se, se = ae + Lt | 0, ie = Oe + Kt + (se >>> 0 < ae >>> 0 ? 1 : 0) | 0;
          }
          O = x.low = O + se, x.high = k + ie + (O >>> 0 < se >>> 0 ? 1 : 0), I = $.low = I + Re, $.high = S + We + (I >>> 0 < Re >>> 0 ? 1 : 0), D = _.low = D + Le, _.high = C + qe + (D >>> 0 < Le >>> 0 ? 1 : 0), B = w.low = B + Ke, w.high = H + Ge + (B >>> 0 < Ke >>> 0 ? 1 : 0), X = E.low = X + Y, E.high = W + ue + (X >>> 0 < Y >>> 0 ? 1 : 0), U = A.low = U + be, A.high = le + Ne + (U >>> 0 < be >>> 0 ? 1 : 0), L = R.low = L + Ze, R.high = T + ke + (L >>> 0 < Ze >>> 0 ? 1 : 0), M = N.low = M + fe, N.high = j + gt + (M >>> 0 < fe >>> 0 ? 1 : 0);
        },
        _doFinalize: function() {
          var v = this._data, g = v.words, b = this._nDataBytes * 8, x = v.sigBytes * 8;
          g[x >>> 5] |= 128 << 24 - x % 32, g[(x + 128 >>> 10 << 5) + 30] = Math.floor(b / 4294967296), g[(x + 128 >>> 10 << 5) + 31] = b, v.sigBytes = g.length * 4, this._process();
          var $ = this._hash.toX32();
          return $;
        },
        clone: function() {
          var v = s.clone.call(this);
          return v._hash = this._hash.clone(), v;
        },
        blockSize: 1024 / 32
      });
      n.SHA512 = s._createHelper(p), n.HmacSHA512 = s._createHmacHelper(p);
    }(), t.SHA512;
  });
})(ju);
function Uo(r, e) {
  var t;
  const n = Object.assign({ id: `injected-style-${Lr()}`, rootNode: void 0 }, e ?? {});
  if (document.querySelector(`#${n.id}`))
    return;
  const i = document.createElement("style");
  if (i.type = "text/css", i.setAttribute("id", n.id), i.innerHTML = r, n.rootNode)
    n.rootNode.appendChild(i);
  else {
    const s = document.querySelector('head link[rel="stylesheet"]');
    s ? (t = s.parentElement) === null || t === void 0 || t.insertBefore(i, s) : document.head.appendChild(i);
  }
  return i;
}
function Mu(r) {
  var e;
  const t = r.href;
  let n = !1;
  for (let i = 0; i < document.styleSheets.length; i++)
    document.styleSheets[i].href && (!((e = document.styleSheets[i].href) === null || e === void 0) && e.match(t)) ? n = !0 : i == document.styleSheets.length - 1;
  return n;
}
function Ru(r, e) {
  return new Promise((t, n) => {
    if (Mu(r))
      t(r);
    else {
      const i = document.createElement("img");
      i.addEventListener("error", (s) => {
        t(r);
      }), i.src = r.href;
    }
  });
}
function Lu(r, e, t) {
  const n = Object.assign({ offset: 20, once: !1, times: -1 }, {});
  let i = !1, s = r, a = r;
  r === window.document.body ? (i = !0, s = document, a = window.document.body) : r === window.document && (i = !0, r = document.body, a = document.body);
  let f = !0, d = 0;
  const l = (c) => {
    let u, h, p;
    i ? (h = window.innerHeight, p = a.scrollTop, u = Math.max(window.document.body.scrollHeight, window.document.documentElement.scrollHeight, window.document.body.offsetHeight, window.document.documentElement.offsetHeight, window.document.body.clientHeight, window.document.documentElement.clientHeight)) : (h = a.offsetHeight, p = a.scrollTop, u = a.scrollHeight), f && p + h >= u - n.offset ? (e(), d++, (n.once || n.times > 0 && d >= n.times) && (s.removeEventListener("scroll", l), f = !1)) : a.offsetHeight + a.scrollTop < a.scrollHeight - n.offset && (f = !0);
  };
  s.addEventListener("scroll", l);
}
function Nu(r, e) {
  if (r.nodeName == "#comment" || r.nodeName == "#text")
    return !1;
  const t = Element.prototype;
  return (t.matches || t.webkitMatchesSelector || // @ts-ignore
  t.mozMatchesSelector || // @ts-ignore
  t.msMatchesSelector || function(i) {
    return [].indexOf.call(document.querySelectorAll(i), this) !== -1;
  }).call(r, e);
}
function ku(r, e) {
  const t = r;
  let n = r.parentElement;
  for (; n && n != t.ownerDocument; ) {
    if (typeof e == "function") {
      if (e(n))
        return n;
    } else if (typeof e == "string" && Nu(n, e))
      return n;
    n = n.parentNode;
  }
}
function Du(r, e) {
  var t;
  if (e = Object.assign({ x: !0, y: !0 }, e ?? {}), !(r instanceof Element))
    return !1;
  const n = ((t = window.parent) !== null && t !== void 0 ? t : window).getComputedStyle(r);
  var i = n.overflowY.trim(), s = n.overflowX.trim();
  const a = {
    vertical: (i === "scroll" || i === "auto") && r.scrollHeight > r.clientHeight,
    horizontal: (s === "scroll" || s === "auto") && r.scrollWidth > r.clientWidth
  };
  return !!(e.x && a.horizontal || e.y && a.vertical);
}
function Uu(r) {
  return ku(r, (t) => Du(t));
}
function Zs(r, e = {}) {
  e = Object.assign({}, e);
  const t = document.documentElement.scrollTop || document.body.scrollTop, n = document.documentElement.scrollLeft || document.body.scrollLeft, i = window.innerHeight || document.documentElement.clientHeight, s = window.innerWidth || document.documentElement.clientWidth, a = r.getBoundingClientRect(), f = a.top - t, d = a.left - n, l = a.right - n, c = a.bottom - t, u = f - i <= 0, h = c <= i, p = d >= 0 && d <= s, v = l >= 0 && l <= s;
  return !!((u || h) && (p || v) || f <= 0 && c >= i && d <= 0 && l >= s || f <= 0 && c >= i && d <= 0 && v || f <= 0 && c >= i && l >= s && p || d <= 0 && l >= s && f <= 0 && h || d <= 0 && l >= s && c >= i && u);
}
function Hu(r) {
  return new Promise((e) => {
    r.addEventListener("animationend", (t) => {
      e(r);
    }, {
      once: !0
    });
  });
}
var Bu = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
function zu(r, e) {
  function t() {
    return [
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`
    ].join(" ");
  }
  const n = Object.assign({ offset: void 0 }, e);
  let i;
  const s = n.offset ? `${n.offset}` : t();
  return new Promise((a) => Bu(this, void 0, void 0, function* () {
    const f = {
      root: null,
      // relative to document viewport
      rootMargin: s,
      // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0
      // visible amount of item shown in relation to root
    };
    if (Zs(r))
      return a(r);
    function d(c, u) {
      c.forEach((h) => {
        var p;
        h.intersectionRatio > 0 && ((p = u.disconnect) === null || p === void 0 || p.call(u), a(r));
      });
    }
    let l = new IntersectionObserver(d, f);
    l.observe(r), window.addEventListener("resize", (c) => {
      clearTimeout(i), i = setTimeout(() => {
        var u;
        (u = l.disconnect) === null || u === void 0 || u.call(l), f.rootMargin = s, l = new IntersectionObserver(d, f), l.observe(r);
      }, 500);
    });
  }));
}
function Vu(r, e) {
  return new Promise((t, n) => {
    const i = Object.assign({ pointerover: !0, pointerout: !0, pointerdown: !0, touchstart: !0, touchend: !0, focus: !0 }, e ?? {});
    function s(h) {
      t(h), r.removeEventListener("pointerover", a), r.removeEventListener("pointerout", f), r.removeEventListener("pointerdown", d), r.removeEventListener("touchstart", l), r.removeEventListener("touchend", c), r.removeEventListener("focus", u), r.removeEventListener("focusin", u);
    }
    function a(h) {
      s("pointerover");
    }
    i.pointerover && r.addEventListener("pointerover", a);
    function f(h) {
      s("pointerout");
    }
    i.pointerout && r.addEventListener("pointerout", f);
    function d(h) {
      s("pointerdown");
    }
    i.pointerdown && r.addEventListener("pointerdown", d);
    function l(h) {
      s("touchstart");
    }
    i.touchstart && r.addEventListener("touchstart", l, {
      passive: !0
    });
    function c(h) {
      s("touchend");
    }
    i.touchend && r.addEventListener("touchend", c);
    function u(h) {
      s("focus");
    }
    i.focus === !0 && (r.addEventListener("focus", u), r.addEventListener("focusin", u));
  });
}
const Ho = /* @__PURE__ */ new WeakMap();
let Fu = class extends Promise {
  cancel() {
  }
};
function Wu(r, e) {
  const t = Object.assign({ offset: "10px", once: !0, whenIn: void 0, whenOut: void 0 }, e ?? {});
  let n;
  function i() {
    return [
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`
    ].join(" ");
  }
  const s = Lr(), a = t.offset ? `${t.offset}` : i(), f = new Fu((d) => {
    var l;
    const c = {
      root: null,
      // relative to document viewport
      rootMargin: a,
      threshold: 0
      // visible amount of item shown in relation to root
    };
    let u = (l = Ho.get(r)) !== null && l !== void 0 ? l : {};
    Ho.set(r, u);
    function h(p) {
      p.forEach((v) => {
        var g, b;
        if (v.intersectionRatio === 0) {
          if (!u[s])
            return;
          u[s] = !1, (g = t.whenOut) === null || g === void 0 || g.call(t, r);
        } else {
          if (t.once && n.disconnect(), u[s])
            return;
          u[s] = !0, (b = t.whenIn) === null || b === void 0 || b.call(t, r), t.once && d(r);
        }
      });
    }
    n = new IntersectionObserver(h, c), n.observe(r), setTimeout(() => {
      f.cancel = () => {
        n.disconnect(), Promise.resolve(r);
      };
    });
  });
  return f.finally(() => {
    n == null || n.disconnect();
  }), f;
}
var qu = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
function Gu(r, e) {
  function t() {
    return [
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`,
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`
    ].join(" ");
  }
  const n = Object.assign({ offset: void 0 }, e);
  let i, s;
  const a = n.offset ? `${n.offset}` : t();
  let f = Uu(r);
  return (f == null ? void 0 : f.tagName) === "HTML" && (f = void 0), new Promise((d) => qu(this, void 0, void 0, function* () {
    const l = {
      root: f,
      // relative to document viewport
      rootMargin: a,
      threshold: 0
      // visible amount of item shown in relation to root
    };
    function c(u, h) {
      u.forEach((p) => {
        var v;
        p.intersectionRatio > 0 && ((v = h.disconnect) === null || v === void 0 || v.call(h), d(r));
      });
    }
    i = new IntersectionObserver(c, l), i.observe(r), window.addEventListener("resize", (u) => {
      clearTimeout(s), s = setTimeout(() => {
        var h;
        (h = i.disconnect) === null || h === void 0 || h.call(i), l.rootMargin = a, i = new IntersectionObserver(c, l), i.observe(r);
      }, 500);
    });
  }));
}
function Ku(r, e = {}) {
  return new Promise((t, n) => {
    e = Object.assign({ offset: "10px" }, e);
    let i = !1;
    const s = () => {
      i || (a.disconnect(), t(r));
    }, a = new IntersectionObserver((f, d) => {
      if (!f.length)
        return;
      f[0].intersectionRatio > 0 ? i = !0 : i = !1, s();
    }, {
      root: null,
      // viewport
      rootMargin: `${e.offset}`,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    a.observe(r);
  });
}
function Zu(r) {
  r || (r = Array.from(document.querySelectorAll('link[rel="stylesheet"]')));
  const e = [];
  return [].forEach.call(r, (n) => {
    e.push(Ru(n));
  }), Promise.all(e);
}
const Bo = /* @__PURE__ */ new WeakMap();
function Ju(r, e) {
  let t;
  const n = new Promise((i, s) => {
    var a;
    const f = Object.assign({ whenVisible: void 0, whenInvisible: void 0, once: !0 }, e ?? {}), d = (a = Bo.get(r)) !== null && a !== void 0 ? a : {};
    Bo.set(r, d);
    const l = Lr();
    t = new IntersectionObserver(function(c) {
      var u, h;
      if (c[0].intersectionRatio == 0) {
        if (!d[l])
          return;
        d[l] = !1, (u = f.whenInvisible) === null || u === void 0 || u.call(f, r);
      } else {
        if (f.once && t.disconnect(), d[l])
          return;
        d[l] = !0, (h = f.whenVisible) === null || h === void 0 || h.call(f, r), f.once && i(r);
      }
    }), t.observe(r);
  });
  return n.finally(() => {
    t == null || t.disconnect();
  }), n;
}
var Xu = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
function Js(r, e, t) {
  const n = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, {});
  return new Promise((i, s) => Xu(this, void 0, void 0, function* () {
    Array.isArray(e) || (e = e.split(",").map((f) => f.trim()));
    const a = [];
    if (e.forEach((f) => {
      const d = f.match(/^timeout\:([0-9]+)/);
      if (d && d[1]) {
        const l = parseInt(d[1]), c = new Promise((u) => {
          setTimeout(u, l);
        });
        a.push(c);
        return;
      }
      switch (f) {
        case "inViewport":
          a.push(Wu(r, n.whenInViewport));
          break;
        case "nearViewport":
          a.push(Gu(r, n.whenNearViewport));
          break;
        case "entersViewport":
          a.push(zu(r, n.whenEntersViewport));
          break;
        case "outOfViewport":
          a.push(Ku(r, n.whenOutOfViewport));
          break;
        case "interact":
          a.push(Vu(r, n.whenInteract));
          break;
        case "visible":
          a.push(Ju(r, {
            whenVisible: n.whenVisible,
            once: !0
          }));
          break;
        case "domReady":
          a.push(__whenDomReady());
          break;
        case "stylesheetsReady":
          a.push(Zu(r ? [r] : null));
          break;
        case "animationEnd":
          a.push(Hu(r));
          break;
      }
    }), !e.length || e.includes("direct") || e.includes("directly")) {
      i(r);
      return;
    }
    yield Promise.race(a), i(r);
  }));
}
var zo = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
function Di(r, e, t, n = !0) {
  var i, s, a, f, d, l;
  let c, u, h = !1;
  const p = [], v = Object.assign({ rootNode: document, once: !0, afterFirst: void 0, scopes: !0, firstOnly: !1, attributes: [], when: void 0 }, t ?? {}), g = [];
  v.scopes && (c = r.split(",").map((E) => `${E.trim()}:not([s-scope] ${E.trim()})`).join(","));
  function b() {
    return p.length && h && n;
  }
  function x() {
    h = !0, g.forEach((E) => {
      E.cancel();
    }), u == null || u.disconnect();
  }
  function $(E) {
    b() || (e == null || e(E, {
      cancel: x
    }), v.firstOnly && x(), p.includes(E) || p.push(E));
  }
  function _(E, A) {
    return zo(this, void 0, void 0, function* () {
      if (!(!E.matches || b())) {
        if (E.matches(r) && (!v.once || !p.includes(E)))
          if (v.when) {
            if (yield Js(E, [v.when]), b())
              return;
            $(E);
          } else
            $(E);
        w(E, A);
      }
    });
  }
  function w(E, A) {
    if (!E.querySelectorAll || b())
      return;
    Array.from(E == null ? void 0 : E.querySelectorAll(A)).forEach((N) => {
      _(N, A);
    });
  }
  if (v.scopes && (v.rootNode === document || // @ts-ignore
  !(!((s = (i = v.rootNode) === null || i === void 0 ? void 0 : i.hasAttribute) === null || s === void 0) && s.call(i, "s-scope")))) {
    let E = {};
    g.push(Di("[s-scope]", (A) => zo(this, void 0, void 0, function* () {
      const R = A.id || `s-scope-${Lr()}`;
      A.id !== R && A.setAttribute("id", R), !b() && (yield Js(A, ["nearViewport"]), !b() && g.push(Di(r, (N) => {
        _(N, r);
      }, Object.assign({}, t, {
        rootNode: A,
        scopes: !1,
        afterFirst() {
          E[R] && // @ts-ignore
          A._sQuerySelectorLiveScopeDirty || (A._sQuerySelectorLiveScopeDirty = !0, E[R] = !0, A.classList.add("ready"), A.setAttribute("ready", "true"));
        }
      }), !0)));
    }), Object.assign({}, t, {
      firstOnly: !1,
      scopes: !1
    }), !1)), g.push(Di(c, (A) => {
      _(A, r);
    }, Object.assign({}, t, {
      scopes: !1
    }), !1)), (a = v.afterFirst) === null || a === void 0 || a.call(v);
  } else {
    u = new MutationObserver((A, R) => {
      A.forEach((N) => {
        N.attributeName && _(N.target, r), N.addedNodes && N.addedNodes.forEach((k) => {
          _(k, r);
        });
      });
    });
    let E = {
      childList: !0,
      subtree: !0
    };
    r.split(",").map((A) => A.trim()).forEach((A) => {
      const R = A.match(/\[[^\]]+\]/gm);
      R != null && R.length && R.forEach((N) => {
        var k, O;
        const S = N.split("=")[0].replace(/^\[/, "").replace(/\]$/, "");
        !((k = v.attributes) === null || k === void 0) && k.includes(S) || (O = v.attributes) === null || O === void 0 || O.push(S);
      });
    }), !((f = v.attributes) === null || f === void 0) && f.length && (E = Object.assign(Object.assign({}, E), { attributes: !!(!((d = v.attributes) === null || d === void 0) && d.length), attributeFilter: v.attributes.length ? v.attributes : void 0 })), u.observe(v.rootNode, E), w(v.rootNode, r), (l = v.afterFirst) === null || l === void 0 || l.call(v);
  }
  return {
    cancel: x
  };
}
function Qu(r, e) {
  let t = 0, n = 0;
  return t = e.x - r.x, t = t * t, n = e.y - r.y, n = n * n, Math.sqrt(t + n);
}
function Yu(r, e, t) {
  const n = Object.assign({}, t ?? {});
  let i, s = 1 / 0;
  const a = r.getBoundingClientRect();
  for (let [f, d] of Object.entries(e)) {
    if (d === r)
      continue;
    const l = d.getBoundingClientRect();
    let c;
    switch (n.direction) {
      case "top":
        if (l.top > a.top)
          continue;
        break;
      case "right":
        if (l.left < a.right)
          continue;
        break;
      case "bottom":
        if (l.bottom < a.bottom)
          continue;
        break;
      case "left":
        if (l.right > a.left)
          continue;
        break;
    }
    c = Qu(a, l), c < s && (s = c, i = d);
  }
  return i;
}
const ef = new RegExp("([\\p{Ll}\\d])(\\p{Lu})", "gu"), tf = new RegExp("(\\p{Lu})([\\p{Lu}][\\p{Ll}])", "gu"), rf = new RegExp("(\\d)\\p{Ll}|(\\p{L})\\d", "u"), nf = /[^\p{L}\d]+/giu, Vo = "$1\0$2", Fo = "";
function Ec(r) {
  let e = r.trim();
  e = e.replace(ef, Vo).replace(tf, Vo), e = e.replace(nf, "\0");
  let t = 0, n = e.length;
  for (; e.charAt(t) === "\0"; )
    t++;
  if (t === n)
    return [];
  for (; e.charAt(n - 1) === "\0"; )
    n--;
  return e.slice(t, n).split(/\0/g);
}
function sf(r) {
  const e = Ec(r);
  for (let t = 0; t < e.length; t++) {
    const n = e[t], i = rf.exec(n);
    if (i) {
      const s = i.index + (i[1] ?? i[2]).length;
      e.splice(t, 1, n.slice(0, s), n.slice(s));
    }
  }
  return e;
}
function Sc(r, e) {
  const [t, n, i] = lf(r, e), s = of(e == null ? void 0 : e.locale), a = af(e == null ? void 0 : e.locale), f = cf(s, a);
  return t + n.map((d, l) => l === 0 ? s(d) : f(d, l)).join("") + i;
}
function of(r) {
  return (e) => e.toLocaleLowerCase(r);
}
function af(r) {
  return (e) => e.toLocaleUpperCase(r);
}
function cf(r, e) {
  return (t, n) => {
    const i = t[0];
    return (n > 0 && i >= "0" && i <= "9" ? "_" + i : e(i)) + r(t.slice(1));
  };
}
function lf(r, e = {}) {
  const t = e.split ?? (e.separateNumbers ? sf : Ec), n = e.prefixCharacters ?? Fo, i = e.suffixCharacters ?? Fo;
  let s = 0, a = r.length;
  for (; s < r.length; ) {
    const f = r.charAt(s);
    if (!n.includes(f))
      break;
    s++;
  }
  for (; a > s; ) {
    const f = a - 1, d = r.charAt(f);
    if (!i.includes(d))
      break;
    a = f;
  }
  return [
    r.slice(0, s),
    t(r.slice(s, a)),
    r.slice(a)
  ];
}
function uf(r) {
  return Sc(r);
}
function Wo(r, e) {
  if (!r)
    return;
  const t = window.getComputedStyle(r), n = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];
  for (let i = 0; i < n.length; i++) {
    const s = n[i], a = t[uf(`${s}${e}`)];
    if (a && a.trim() !== "")
      return Su(a);
  }
  return null;
}
function qo(r) {
  return Sc(r);
}
function Xs(r, e) {
  const t = Object.assign({ quotesToRemove: ['"', "'", "”", "`"] }, {});
  return r = r.trim(), t.quotesToRemove.forEach((n) => {
    if (r.substr(0, 1) === n && r.substr(-1) === n) {
      r = r.substr(1), r = r.substr(0, r.length - 1);
      return;
    }
  }), r;
}
function Qs(r) {
  const e = r.concat();
  for (let t = 0; t < e.length; ++t)
    for (let n = t + 1; n < e.length; ++n)
      e[t] === e[n] && e.splice(n--, 1);
  return e;
}
function ff(r) {
  var e;
  return ((e = r.parentElement) === null || e === void 0 ? void 0 : e.querySelector(":focus-within")) === r;
}
function hf() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
var As, Cs;
let ji = !1, Ti;
try {
  (As = document == null ? void 0 : document.addEventListener) === null || As === void 0 || As.call(document, "wheel", (r) => {
    ji = !0, clearTimeout(Ti), Ti = setTimeout(() => {
      ji = !1;
    }, 200);
  }), (Cs = document == null ? void 0 : document.addEventListener) === null || Cs === void 0 || Cs.call(document, "touchmove", (r) => {
    ji = !0, clearTimeout(Ti), Ti = setTimeout(() => {
      ji = !1;
    }, 200);
  });
} catch {
}
var Go = { exports: {} };
(function(r, e) {
  (function(t) {
    const n = Function.prototype.toString;
    function i(a) {
      return n.call(a).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
    }
    function s(a) {
      if (typeof a != "function")
        return !1;
      if (/^class[\s{]/.test(n.call(a)))
        return !0;
      const f = i(a);
      return /classCallCheck\(/.test(f) || /TypeError\("Cannot call a class as a function"\)/.test(f);
    }
    r.exports && (e = r.exports = s), e.isClass = s;
  })();
})(Go, Go.exports);
function df({ onlyFirst: r = !1 } = {}) {
  const t = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(t, r ? void 0 : "g");
}
df();
function pf(r) {
  return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var Oc = { exports: {} };
/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/
(function(r, e) {
  (function(t, n) {
    r.exports = n();
  })(ye, function() {
    var t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(l) {
      return typeof l;
    } : function(l) {
      return l && typeof Symbol == "function" && l.constructor === Symbol && l !== Symbol.prototype ? "symbol" : typeof l;
    }, n = function(l, c) {
      if (!(l instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }, i = /* @__PURE__ */ function() {
      function l(c, u) {
        for (var h = 0; h < u.length; h++) {
          var p = u[h];
          p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(c, p.key, p);
        }
      }
      return function(c, u, h) {
        return u && l(c.prototype, u), h && l(c, h), c;
      };
    }(), s = Object.assign || function(l) {
      for (var c = 1; c < arguments.length; c++) {
        var u = arguments[c];
        for (var h in u)
          Object.prototype.hasOwnProperty.call(u, h) && (l[h] = u[h]);
      }
      return l;
    }, a = function() {
      function l(c) {
        var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 5e3;
        n(this, l), this.ctx = c, this.iframes = u, this.exclude = h, this.iframesTimeout = p;
      }
      return i(l, [{
        key: "getContexts",
        value: function() {
          var u = void 0, h = [];
          return typeof this.ctx > "u" || !this.ctx ? u = [] : NodeList.prototype.isPrototypeOf(this.ctx) ? u = Array.prototype.slice.call(this.ctx) : Array.isArray(this.ctx) ? u = this.ctx : typeof this.ctx == "string" ? u = Array.prototype.slice.call(document.querySelectorAll(this.ctx)) : u = [this.ctx], u.forEach(function(p) {
            var v = h.filter(function(g) {
              return g.contains(p);
            }).length > 0;
            h.indexOf(p) === -1 && !v && h.push(p);
          }), h;
        }
      }, {
        key: "getIframeContents",
        value: function(u, h) {
          var p = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
          }, v = void 0;
          try {
            var g = u.contentWindow;
            if (v = g.document, !g || !v)
              throw new Error("iframe inaccessible");
          } catch {
            p();
          }
          v && h(v);
        }
      }, {
        key: "isIframeBlank",
        value: function(u) {
          var h = "about:blank", p = u.getAttribute("src").trim(), v = u.contentWindow.location.href;
          return v === h && p !== h && p;
        }
      }, {
        key: "observeIframeLoad",
        value: function(u, h, p) {
          var v = this, g = !1, b = null, x = function $() {
            if (!g) {
              g = !0, clearTimeout(b);
              try {
                v.isIframeBlank(u) || (u.removeEventListener("load", $), v.getIframeContents(u, h, p));
              } catch {
                p();
              }
            }
          };
          u.addEventListener("load", x), b = setTimeout(x, this.iframesTimeout);
        }
      }, {
        key: "onIframeReady",
        value: function(u, h, p) {
          try {
            u.contentWindow.document.readyState === "complete" ? this.isIframeBlank(u) ? this.observeIframeLoad(u, h, p) : this.getIframeContents(u, h, p) : this.observeIframeLoad(u, h, p);
          } catch {
            p();
          }
        }
      }, {
        key: "waitForIframes",
        value: function(u, h) {
          var p = this, v = 0;
          this.forEachIframe(u, function() {
            return !0;
          }, function(g) {
            v++, p.waitForIframes(g.querySelector("html"), function() {
              --v || h();
            });
          }, function(g) {
            g || h();
          });
        }
      }, {
        key: "forEachIframe",
        value: function(u, h, p) {
          var v = this, g = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
          }, b = u.querySelectorAll("iframe"), x = b.length, $ = 0;
          b = Array.prototype.slice.call(b);
          var _ = function() {
            --x <= 0 && g($);
          };
          x || _(), b.forEach(function(w) {
            l.matches(w, v.exclude) ? _() : v.onIframeReady(w, function(E) {
              h(w) && ($++, p(E)), _();
            }, _);
          });
        }
      }, {
        key: "createIterator",
        value: function(u, h, p) {
          return document.createNodeIterator(u, h, p, !1);
        }
      }, {
        key: "createInstanceOnIframe",
        value: function(u) {
          return new l(u.querySelector("html"), this.iframes);
        }
      }, {
        key: "compareNodeIframe",
        value: function(u, h, p) {
          var v = u.compareDocumentPosition(p), g = Node.DOCUMENT_POSITION_PRECEDING;
          if (v & g)
            if (h !== null) {
              var b = h.compareDocumentPosition(p), x = Node.DOCUMENT_POSITION_FOLLOWING;
              if (b & x)
                return !0;
            } else
              return !0;
          return !1;
        }
      }, {
        key: "getIteratorNode",
        value: function(u) {
          var h = u.previousNode(), p = void 0;
          return h === null ? p = u.nextNode() : p = u.nextNode() && u.nextNode(), {
            prevNode: h,
            node: p
          };
        }
      }, {
        key: "checkIframeFilter",
        value: function(u, h, p, v) {
          var g = !1, b = !1;
          return v.forEach(function(x, $) {
            x.val === p && (g = $, b = x.handled);
          }), this.compareNodeIframe(u, h, p) ? (g === !1 && !b ? v.push({
            val: p,
            handled: !0
          }) : g !== !1 && !b && (v[g].handled = !0), !0) : (g === !1 && v.push({
            val: p,
            handled: !1
          }), !1);
        }
      }, {
        key: "handleOpenIframes",
        value: function(u, h, p, v) {
          var g = this;
          u.forEach(function(b) {
            b.handled || g.getIframeContents(b.val, function(x) {
              g.createInstanceOnIframe(x).forEachNode(h, p, v);
            });
          });
        }
      }, {
        key: "iterateThroughNodes",
        value: function(u, h, p, v, g) {
          for (var b = this, x = this.createIterator(h, u, v), $ = [], _ = [], w = void 0, E = void 0, A = function() {
            var N = b.getIteratorNode(x);
            return E = N.prevNode, w = N.node, w;
          }; A(); )
            this.iframes && this.forEachIframe(h, function(R) {
              return b.checkIframeFilter(w, E, R, $);
            }, function(R) {
              b.createInstanceOnIframe(R).forEachNode(u, function(N) {
                return _.push(N);
              }, v);
            }), _.push(w);
          _.forEach(function(R) {
            p(R);
          }), this.iframes && this.handleOpenIframes($, u, p, v), g();
        }
      }, {
        key: "forEachNode",
        value: function(u, h, p) {
          var v = this, g = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
          }, b = this.getContexts(), x = b.length;
          x || g(), b.forEach(function($) {
            var _ = function() {
              v.iterateThroughNodes(u, $, h, p, function() {
                --x <= 0 && g();
              });
            };
            v.iframes ? v.waitForIframes($, _) : _();
          });
        }
      }], [{
        key: "matches",
        value: function(u, h) {
          var p = typeof h == "string" ? [h] : h, v = u.matches || u.matchesSelector || u.msMatchesSelector || u.mozMatchesSelector || u.oMatchesSelector || u.webkitMatchesSelector;
          if (v) {
            var g = !1;
            return p.every(function(b) {
              return v.call(u, b) ? (g = !0, !1) : !0;
            }), g;
          } else
            return !1;
        }
      }]), l;
    }(), f = function() {
      function l(c) {
        n(this, l), this.ctx = c, this.ie = !1;
        var u = window.navigator.userAgent;
        (u.indexOf("MSIE") > -1 || u.indexOf("Trident") > -1) && (this.ie = !0);
      }
      return i(l, [{
        key: "log",
        value: function(u) {
          var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "debug", p = this.opt.log;
          this.opt.debug && (typeof p > "u" ? "undefined" : t(p)) === "object" && typeof p[h] == "function" && p[h]("mark.js: " + u);
        }
      }, {
        key: "escapeStr",
        value: function(u) {
          return u.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
      }, {
        key: "createRegExp",
        value: function(u) {
          return this.opt.wildcards !== "disabled" && (u = this.setupWildcardsRegExp(u)), u = this.escapeStr(u), Object.keys(this.opt.synonyms).length && (u = this.createSynonymsRegExp(u)), (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (u = this.setupIgnoreJoinersRegExp(u)), this.opt.diacritics && (u = this.createDiacriticsRegExp(u)), u = this.createMergedBlanksRegExp(u), (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (u = this.createJoinersRegExp(u)), this.opt.wildcards !== "disabled" && (u = this.createWildcardsRegExp(u)), u = this.createAccuracyRegExp(u), u;
        }
      }, {
        key: "createSynonymsRegExp",
        value: function(u) {
          var h = this.opt.synonyms, p = this.opt.caseSensitive ? "" : "i", v = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? "\0" : "";
          for (var g in h)
            if (h.hasOwnProperty(g)) {
              var b = h[g], x = this.opt.wildcards !== "disabled" ? this.setupWildcardsRegExp(g) : this.escapeStr(g), $ = this.opt.wildcards !== "disabled" ? this.setupWildcardsRegExp(b) : this.escapeStr(b);
              x !== "" && $ !== "" && (u = u.replace(new RegExp("(" + this.escapeStr(x) + "|" + this.escapeStr($) + ")", "gm" + p), v + ("(" + this.processSynomyms(x) + "|") + (this.processSynomyms($) + ")") + v));
            }
          return u;
        }
      }, {
        key: "processSynomyms",
        value: function(u) {
          return (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (u = this.setupIgnoreJoinersRegExp(u)), u;
        }
      }, {
        key: "setupWildcardsRegExp",
        value: function(u) {
          return u = u.replace(/(?:\\)*\?/g, function(h) {
            return h.charAt(0) === "\\" ? "?" : "";
          }), u.replace(/(?:\\)*\*/g, function(h) {
            return h.charAt(0) === "\\" ? "*" : "";
          });
        }
      }, {
        key: "createWildcardsRegExp",
        value: function(u) {
          var h = this.opt.wildcards === "withSpaces";
          return u.replace(/\u0001/g, h ? "[\\S\\s]?" : "\\S?").replace(/\u0002/g, h ? "[\\S\\s]*?" : "\\S*");
        }
      }, {
        key: "setupIgnoreJoinersRegExp",
        value: function(u) {
          return u.replace(/[^(|)\\]/g, function(h, p, v) {
            var g = v.charAt(p + 1);
            return /[(|)\\]/.test(g) || g === "" ? h : h + "\0";
          });
        }
      }, {
        key: "createJoinersRegExp",
        value: function(u) {
          var h = [], p = this.opt.ignorePunctuation;
          return Array.isArray(p) && p.length && h.push(this.escapeStr(p.join(""))), this.opt.ignoreJoiners && h.push("\\u00ad\\u200b\\u200c\\u200d"), h.length ? u.split(/\u0000+/).join("[" + h.join("") + "]*") : u;
        }
      }, {
        key: "createDiacriticsRegExp",
        value: function(u) {
          var h = this.opt.caseSensitive ? "" : "i", p = this.opt.caseSensitive ? ["aàáảãạăằắẳẵặâầấẩẫậäåāą", "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćč", "CÇĆČ", "dđď", "DĐĎ", "eèéẻẽẹêềếểễệëěēę", "EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïī", "IÌÍỈĨỊÎÏĪ", "lł", "LŁ", "nñňń", "NÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøō", "OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rř", "RŘ", "sšśșş", "SŠŚȘŞ", "tťțţ", "TŤȚŢ", "uùúủũụưừứửữựûüůū", "UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿ", "YÝỲỶỸỴŸ", "zžżź", "ZŽŻŹ"] : ["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćčCÇĆČ", "dđďDĐĎ", "eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïīIÌÍỈĨỊÎÏĪ", "lłLŁ", "nñňńNÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rřRŘ", "sšśșşSŠŚȘŞ", "tťțţTŤȚŢ", "uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿYÝỲỶỸỴŸ", "zžżźZŽŻŹ"], v = [];
          return u.split("").forEach(function(g) {
            p.every(function(b) {
              if (b.indexOf(g) !== -1) {
                if (v.indexOf(b) > -1)
                  return !1;
                u = u.replace(new RegExp("[" + b + "]", "gm" + h), "[" + b + "]"), v.push(b);
              }
              return !0;
            });
          }), u;
        }
      }, {
        key: "createMergedBlanksRegExp",
        value: function(u) {
          return u.replace(/[\s]+/gmi, "[\\s]+");
        }
      }, {
        key: "createAccuracyRegExp",
        value: function(u) {
          var h = this, p = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿", v = this.opt.accuracy, g = typeof v == "string" ? v : v.value, b = typeof v == "string" ? [] : v.limiters, x = "";
          switch (b.forEach(function($) {
            x += "|" + h.escapeStr($);
          }), g) {
            case "partially":
            default:
              return "()(" + u + ")";
            case "complementary":
              return x = "\\s" + (x || this.escapeStr(p)), "()([^" + x + "]*" + u + "[^" + x + "]*)";
            case "exactly":
              return "(^|\\s" + x + ")(" + u + ")(?=$|\\s" + x + ")";
          }
        }
      }, {
        key: "getSeparatedKeywords",
        value: function(u) {
          var h = this, p = [];
          return u.forEach(function(v) {
            h.opt.separateWordSearch ? v.split(" ").forEach(function(g) {
              g.trim() && p.indexOf(g) === -1 && p.push(g);
            }) : v.trim() && p.indexOf(v) === -1 && p.push(v);
          }), {
            keywords: p.sort(function(v, g) {
              return g.length - v.length;
            }),
            length: p.length
          };
        }
      }, {
        key: "isNumeric",
        value: function(u) {
          return Number(parseFloat(u)) == u;
        }
      }, {
        key: "checkRanges",
        value: function(u) {
          var h = this;
          if (!Array.isArray(u) || Object.prototype.toString.call(u[0]) !== "[object Object]")
            return this.log("markRanges() will only accept an array of objects"), this.opt.noMatch(u), [];
          var p = [], v = 0;
          return u.sort(function(g, b) {
            return g.start - b.start;
          }).forEach(function(g) {
            var b = h.callNoMatchOnInvalidRanges(g, v), x = b.start, $ = b.end, _ = b.valid;
            _ && (g.start = x, g.length = $ - x, p.push(g), v = $);
          }), p;
        }
      }, {
        key: "callNoMatchOnInvalidRanges",
        value: function(u, h) {
          var p = void 0, v = void 0, g = !1;
          return u && typeof u.start < "u" ? (p = parseInt(u.start, 10), v = p + parseInt(u.length, 10), this.isNumeric(u.start) && this.isNumeric(u.length) && v - h > 0 && v - p > 0 ? g = !0 : (this.log("Ignoring invalid or overlapping range: " + ("" + JSON.stringify(u))), this.opt.noMatch(u))) : (this.log("Ignoring invalid range: " + JSON.stringify(u)), this.opt.noMatch(u)), {
            start: p,
            end: v,
            valid: g
          };
        }
      }, {
        key: "checkWhitespaceRanges",
        value: function(u, h, p) {
          var v = void 0, g = !0, b = p.length, x = h - b, $ = parseInt(u.start, 10) - x;
          return $ = $ > b ? b : $, v = $ + parseInt(u.length, 10), v > b && (v = b, this.log("End range automatically set to the max value of " + b)), $ < 0 || v - $ < 0 || $ > b || v > b ? (g = !1, this.log("Invalid range: " + JSON.stringify(u)), this.opt.noMatch(u)) : p.substring($, v).replace(/\s+/g, "") === "" && (g = !1, this.log("Skipping whitespace only range: " + JSON.stringify(u)), this.opt.noMatch(u)), {
            start: $,
            end: v,
            valid: g
          };
        }
      }, {
        key: "getTextNodes",
        value: function(u) {
          var h = this, p = "", v = [];
          this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function(g) {
            v.push({
              start: p.length,
              end: (p += g.textContent).length,
              node: g
            });
          }, function(g) {
            return h.matchesExclude(g.parentNode) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }, function() {
            u({
              value: p,
              nodes: v
            });
          });
        }
      }, {
        key: "matchesExclude",
        value: function(u) {
          return a.matches(u, this.opt.exclude.concat(["script", "style", "title", "head", "html"]));
        }
      }, {
        key: "wrapRangeInTextNode",
        value: function(u, h, p) {
          var v = this.opt.element ? this.opt.element : "mark", g = u.splitText(h), b = g.splitText(p - h), x = document.createElement(v);
          return x.setAttribute("data-markjs", "true"), this.opt.className && x.setAttribute("class", this.opt.className), x.textContent = g.textContent, g.parentNode.replaceChild(x, g), b;
        }
      }, {
        key: "wrapRangeInMappedTextNode",
        value: function(u, h, p, v, g) {
          var b = this;
          u.nodes.every(function(x, $) {
            var _ = u.nodes[$ + 1];
            if (typeof _ > "u" || _.start > h) {
              if (!v(x.node))
                return !1;
              var w = h - x.start, E = (p > x.end ? x.end : p) - x.start, A = u.value.substr(0, x.start), R = u.value.substr(E + x.start);
              if (x.node = b.wrapRangeInTextNode(x.node, w, E), u.value = A + R, u.nodes.forEach(function(N, k) {
                k >= $ && (u.nodes[k].start > 0 && k !== $ && (u.nodes[k].start -= E), u.nodes[k].end -= E);
              }), p -= E, g(x.node.previousSibling, x.start), p > x.end)
                h = x.end;
              else
                return !1;
            }
            return !0;
          });
        }
      }, {
        key: "wrapMatches",
        value: function(u, h, p, v, g) {
          var b = this, x = h === 0 ? 0 : h + 1;
          this.getTextNodes(function($) {
            $.nodes.forEach(function(_) {
              _ = _.node;
              for (var w = void 0; (w = u.exec(_.textContent)) !== null && w[x] !== ""; )
                if (p(w[x], _)) {
                  var E = w.index;
                  if (x !== 0)
                    for (var A = 1; A < x; A++)
                      E += w[A].length;
                  _ = b.wrapRangeInTextNode(_, E, E + w[x].length), v(_.previousSibling), u.lastIndex = 0;
                }
            }), g();
          });
        }
      }, {
        key: "wrapMatchesAcrossElements",
        value: function(u, h, p, v, g) {
          var b = this, x = h === 0 ? 0 : h + 1;
          this.getTextNodes(function($) {
            for (var _ = void 0; (_ = u.exec($.value)) !== null && _[x] !== ""; ) {
              var w = _.index;
              if (x !== 0)
                for (var E = 1; E < x; E++)
                  w += _[E].length;
              var A = w + _[x].length;
              b.wrapRangeInMappedTextNode($, w, A, function(R) {
                return p(_[x], R);
              }, function(R, N) {
                u.lastIndex = N, v(R);
              });
            }
            g();
          });
        }
      }, {
        key: "wrapRangeFromIndex",
        value: function(u, h, p, v) {
          var g = this;
          this.getTextNodes(function(b) {
            var x = b.value.length;
            u.forEach(function($, _) {
              var w = g.checkWhitespaceRanges($, x, b.value), E = w.start, A = w.end, R = w.valid;
              R && g.wrapRangeInMappedTextNode(b, E, A, function(N) {
                return h(N, $, b.value.substring(E, A), _);
              }, function(N) {
                p(N, $);
              });
            }), v();
          });
        }
      }, {
        key: "unwrapMatches",
        value: function(u) {
          for (var h = u.parentNode, p = document.createDocumentFragment(); u.firstChild; )
            p.appendChild(u.removeChild(u.firstChild));
          h.replaceChild(p, u), this.ie ? this.normalizeTextNode(h) : h.normalize();
        }
      }, {
        key: "normalizeTextNode",
        value: function(u) {
          if (u) {
            if (u.nodeType === 3)
              for (; u.nextSibling && u.nextSibling.nodeType === 3; )
                u.nodeValue += u.nextSibling.nodeValue, u.parentNode.removeChild(u.nextSibling);
            else
              this.normalizeTextNode(u.firstChild);
            this.normalizeTextNode(u.nextSibling);
          }
        }
      }, {
        key: "markRegExp",
        value: function(u, h) {
          var p = this;
          this.opt = h, this.log('Searching with expression "' + u + '"');
          var v = 0, g = "wrapMatches", b = function($) {
            v++, p.opt.each($);
          };
          this.opt.acrossElements && (g = "wrapMatchesAcrossElements"), this[g](u, this.opt.ignoreGroups, function(x, $) {
            return p.opt.filter($, x, v);
          }, b, function() {
            v === 0 && p.opt.noMatch(u), p.opt.done(v);
          });
        }
      }, {
        key: "mark",
        value: function(u, h) {
          var p = this;
          this.opt = h;
          var v = 0, g = "wrapMatches", b = this.getSeparatedKeywords(typeof u == "string" ? [u] : u), x = b.keywords, $ = b.length, _ = this.opt.caseSensitive ? "" : "i", w = function E(A) {
            var R = new RegExp(p.createRegExp(A), "gm" + _), N = 0;
            p.log('Searching with expression "' + R + '"'), p[g](R, 1, function(k, O) {
              return p.opt.filter(O, A, v, N);
            }, function(k) {
              N++, v++, p.opt.each(k);
            }, function() {
              N === 0 && p.opt.noMatch(A), x[$ - 1] === A ? p.opt.done(v) : E(x[x.indexOf(A) + 1]);
            });
          };
          this.opt.acrossElements && (g = "wrapMatchesAcrossElements"), $ === 0 ? this.opt.done(v) : w(x[0]);
        }
      }, {
        key: "markRanges",
        value: function(u, h) {
          var p = this;
          this.opt = h;
          var v = 0, g = this.checkRanges(u);
          g && g.length ? (this.log("Starting to mark with the following ranges: " + JSON.stringify(g)), this.wrapRangeFromIndex(g, function(b, x, $, _) {
            return p.opt.filter(b, x, $, _);
          }, function(b, x) {
            v++, p.opt.each(b, x);
          }, function() {
            p.opt.done(v);
          })) : this.opt.done(v);
        }
      }, {
        key: "unmark",
        value: function(u) {
          var h = this;
          this.opt = u;
          var p = this.opt.element ? this.opt.element : "*";
          p += "[data-markjs]", this.opt.className && (p += "." + this.opt.className), this.log('Removal selector "' + p + '"'), this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function(v) {
            h.unwrapMatches(v);
          }, function(v) {
            var g = a.matches(v, p), b = h.matchesExclude(v);
            return !g || b ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }, this.opt.done);
        }
      }, {
        key: "opt",
        set: function(u) {
          this._opt = s({}, {
            element: "",
            className: "",
            exclude: [],
            iframes: !1,
            iframesTimeout: 5e3,
            separateWordSearch: !0,
            diacritics: !0,
            synonyms: {},
            accuracy: "partially",
            acrossElements: !1,
            caseSensitive: !1,
            ignoreJoiners: !1,
            ignoreGroups: 0,
            ignorePunctuation: [],
            wildcards: "disabled",
            each: function() {
            },
            noMatch: function() {
            },
            filter: function() {
              return !0;
            },
            done: function() {
            },
            debug: !1,
            log: window.console
          }, u);
        },
        get: function() {
          return this._opt;
        }
      }, {
        key: "iterator",
        get: function() {
          return new a(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
        }
      }]), l;
    }();
    function d(l) {
      var c = this, u = new f(l);
      return this.mark = function(h, p) {
        return u.mark(h, p), c;
      }, this.markRegExp = function(h, p) {
        return u.markRegExp(h, p), c;
      }, this.markRanges = function(h, p) {
        return u.markRanges(h, p), c;
      }, this.unmark = function(h) {
        return u.unmark(h), c;
      }, this;
    }
    return d;
  });
})(Oc);
var mf = Oc.exports;
const vf = /* @__PURE__ */ Er(mf);
function gf(r, e, t) {
  const n = Object.assign({ class: "-highlight" }, t ?? {});
  let i, s;
  typeof r == "string" ? (s = document.createElement("div"), s.innerHTML = r, i = "string") : r instanceof HTMLElement && (s = r, i = "element");
  const a = new vf(s), f = {
    className: n.class
  };
  return e instanceof RegExp ? a.markRegExp(e, f) : (Array.isArray(e) || typeof e == "string") && a.mark(e, f), i === "string" ? s.innerHTML : s;
}
var yf = {};
(function(r) {
  (function() {
    var e = {
      not_type: /[^T]/,
      not_primitive: /[^v]/,
      number: /[diefg]/,
      numeric_arg: /[bcdiefguxX]/,
      json: /[j]/,
      text: /^[^\x25]+/,
      modulo: /^\x25{2}/,
      placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
      key: /^([a-z_][a-z_\d]*)/i,
      key_access: /^\.([a-z_][a-z_\d]*)/i,
      index_access: /^\[(\d+)\]/,
      sign: /^[+-]/
    };
    function t(f) {
      return i(a(f), arguments);
    }
    function n(f, d) {
      return t.apply(null, [f].concat(d || []));
    }
    function i(f, d) {
      var l = 1, c = f.length, u, h = "", p, v, g, b, x, $, _, w;
      for (p = 0; p < c; p++)
        if (typeof f[p] == "string")
          h += f[p];
        else if (typeof f[p] == "object") {
          if (g = f[p], g.keys)
            for (u = d[l], v = 0; v < g.keys.length; v++) {
              if (u == null)
                throw new Error(t('[sprintf] Cannot access property "%s" of undefined value "%s"', g.keys[v], g.keys[v - 1]));
              u = u[g.keys[v]];
            }
          else g.param_no ? u = d[g.param_no] : u = d[l++];
          if (e.not_type.test(g.type) && e.not_primitive.test(g.type) && u instanceof Function && (u = u()), e.numeric_arg.test(g.type) && typeof u != "number" && isNaN(u))
            throw new TypeError(t("[sprintf] expecting number but found %T", u));
          switch (e.number.test(g.type) && (_ = u >= 0), g.type) {
            case "b":
              u = parseInt(u, 10).toString(2);
              break;
            case "c":
              u = String.fromCharCode(parseInt(u, 10));
              break;
            case "d":
            case "i":
              u = parseInt(u, 10);
              break;
            case "j":
              u = JSON.stringify(u, null, g.width ? parseInt(g.width) : 0);
              break;
            case "e":
              u = g.precision ? parseFloat(u).toExponential(g.precision) : parseFloat(u).toExponential();
              break;
            case "f":
              u = g.precision ? parseFloat(u).toFixed(g.precision) : parseFloat(u);
              break;
            case "g":
              u = g.precision ? String(Number(u.toPrecision(g.precision))) : parseFloat(u);
              break;
            case "o":
              u = (parseInt(u, 10) >>> 0).toString(8);
              break;
            case "s":
              u = String(u), u = g.precision ? u.substring(0, g.precision) : u;
              break;
            case "t":
              u = String(!!u), u = g.precision ? u.substring(0, g.precision) : u;
              break;
            case "T":
              u = Object.prototype.toString.call(u).slice(8, -1).toLowerCase(), u = g.precision ? u.substring(0, g.precision) : u;
              break;
            case "u":
              u = parseInt(u, 10) >>> 0;
              break;
            case "v":
              u = u.valueOf(), u = g.precision ? u.substring(0, g.precision) : u;
              break;
            case "x":
              u = (parseInt(u, 10) >>> 0).toString(16);
              break;
            case "X":
              u = (parseInt(u, 10) >>> 0).toString(16).toUpperCase();
              break;
          }
          e.json.test(g.type) ? h += u : (e.number.test(g.type) && (!_ || g.sign) ? (w = _ ? "+" : "-", u = u.toString().replace(e.sign, "")) : w = "", x = g.pad_char ? g.pad_char === "0" ? "0" : g.pad_char.charAt(1) : " ", $ = g.width - (w + u).length, b = g.width && $ > 0 ? x.repeat($) : "", h += g.align ? w + u + b : x === "0" ? w + b + u : b + w + u);
        }
      return h;
    }
    var s = /* @__PURE__ */ Object.create(null);
    function a(f) {
      if (s[f])
        return s[f];
      for (var d = f, l, c = [], u = 0; d; ) {
        if ((l = e.text.exec(d)) !== null)
          c.push(l[0]);
        else if ((l = e.modulo.exec(d)) !== null)
          c.push("%");
        else if ((l = e.placeholder.exec(d)) !== null) {
          if (l[2]) {
            u |= 1;
            var h = [], p = l[2], v = [];
            if ((v = e.key.exec(p)) !== null)
              for (h.push(v[1]); (p = p.substring(v[0].length)) !== ""; )
                if ((v = e.key_access.exec(p)) !== null)
                  h.push(v[1]);
                else if ((v = e.index_access.exec(p)) !== null)
                  h.push(v[1]);
                else
                  throw new SyntaxError("[sprintf] failed to parse named argument key");
            else
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            l[2] = h;
          } else
            u |= 2;
          if (u === 3)
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          c.push(
            {
              placeholder: l[0],
              param_no: l[1],
              keys: l[2],
              sign: l[3],
              pad_char: l[4],
              align: l[5],
              width: l[6],
              precision: l[7],
              type: l[8]
            }
          );
        } else
          throw new SyntaxError("[sprintf] unexpected placeholder");
        d = d.substring(l[0].length);
      }
      return s[f] = c;
    }
    r.sprintf = t, r.vsprintf = n, typeof window < "u" && (window.sprintf = t, window.vsprintf = n);
  })();
})(yf);
function Mi(r) {
  return r.charAt(0).toUpperCase() + r.slice(1);
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = globalThis, co = Ui.ShadowRoot && (Ui.ShadyCSS === void 0 || Ui.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ac = Symbol(), Ko = /* @__PURE__ */ new WeakMap();
let _f = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== Ac) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (co && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = Ko.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ko.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const bf = (r) => new _f(typeof r == "string" ? r : r + "", void 0, Ac), $f = (r, e) => {
  if (co) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), i = Ui.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = t.cssText, r.appendChild(n);
  }
}, Zo = co ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return bf(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wf, defineProperty: xf, getOwnPropertyDescriptor: Ef, getOwnPropertyNames: Sf, getOwnPropertySymbols: Of, getPrototypeOf: Af } = Object, Mr = globalThis, Jo = Mr.trustedTypes, Cf = Jo ? Jo.emptyScript : "", Ps = Mr.reactiveElementPolyfillSupport, pi = (r, e) => r, Yi = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Cf : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, lo = (r, e) => !wf(r, e), Xo = { attribute: !0, type: String, converter: Yi, reflect: !1, hasChanged: lo };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Mr.litPropertyMetadata ?? (Mr.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class qn extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Xo) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && xf(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: i, set: s } = Ef(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(a) {
      const f = i == null ? void 0 : i.call(this);
      s.call(this, a), this.requestUpdate(e, f, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Xo;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pi("elementProperties"))) return;
    const e = Af(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pi("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pi("properties"))) {
      const t = this.properties, n = [...Sf(t), ...Of(t)];
      for (const i of n) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, i] of t) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const i = this._$Eu(t, n);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n) t.unshift(Zo(i));
    } else e !== void 0 && t.push(Zo(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $f(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostConnected) == null ? void 0 : n.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostDisconnected) == null ? void 0 : n.call(t);
    });
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$EC(e, t) {
    var s;
    const n = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, n);
    if (i !== void 0 && n.reflect === !0) {
      const a = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Yi).toAttribute(t, n.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s;
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), f = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : Yi;
      this._$Em = i, this[i] = f.fromAttribute(t, a.type), this._$Em = null;
    }
  }
  requestUpdate(e, t, n) {
    if (e !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(e)), !(n.hasChanged ?? lo)(this[e], t)) return;
      this.P(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, t, n) {
    this._$AL.has(e) || this._$AL.set(e, t), n.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, a] of i) a.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.P(s, this[s], a);
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (n = this._$EO) == null || n.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      }), this.update(t)) : this._$EU();
    } catch (i) {
      throw e = !1, this._$EU(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t) => this._$EC(t, this[t]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
qn.elementStyles = [], qn.shadowRootOptions = { mode: "open" }, qn[pi("elementProperties")] = /* @__PURE__ */ new Map(), qn[pi("finalized")] = /* @__PURE__ */ new Map(), Ps == null || Ps({ ReactiveElement: qn }), (Mr.reactiveElementVersions ?? (Mr.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = globalThis, es = mi.trustedTypes, Qo = es ? es.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Cc = "$lit$", Pr = `lit$${Math.random().toFixed(9).slice(2)}$`, Pc = "?" + Pr, Pf = `<${Pc}>`, Bn = document, $i = () => Bn.createComment(""), wi = (r) => r === null || typeof r != "object" && typeof r != "function", uo = Array.isArray, If = (r) => uo(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Is = `[ 	
\f\r]`, ti = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Yo = /-->/g, ea = />/g, Pn = RegExp(`>|${Is}(?:([^\\s"'>=/]+)(${Is}*=${Is}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ta = /'/g, ra = /"/g, Ic = /^(?:script|style|textarea|title)$/i, jf = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), G = jf(1), zn = Symbol.for("lit-noChange"), Ae = Symbol.for("lit-nothing"), na = /* @__PURE__ */ new WeakMap(), Nn = Bn.createTreeWalker(Bn, 129);
function jc(r, e) {
  if (!uo(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qo !== void 0 ? Qo.createHTML(e) : e;
}
const Tf = (r, e) => {
  const t = r.length - 1, n = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ti;
  for (let f = 0; f < t; f++) {
    const d = r[f];
    let l, c, u = -1, h = 0;
    for (; h < d.length && (a.lastIndex = h, c = a.exec(d), c !== null); ) h = a.lastIndex, a === ti ? c[1] === "!--" ? a = Yo : c[1] !== void 0 ? a = ea : c[2] !== void 0 ? (Ic.test(c[2]) && (i = RegExp("</" + c[2], "g")), a = Pn) : c[3] !== void 0 && (a = Pn) : a === Pn ? c[0] === ">" ? (a = i ?? ti, u = -1) : c[1] === void 0 ? u = -2 : (u = a.lastIndex - c[2].length, l = c[1], a = c[3] === void 0 ? Pn : c[3] === '"' ? ra : ta) : a === ra || a === ta ? a = Pn : a === Yo || a === ea ? a = ti : (a = Pn, i = void 0);
    const p = a === Pn && r[f + 1].startsWith("/>") ? " " : "";
    s += a === ti ? d + Pf : u >= 0 ? (n.push(l), d.slice(0, u) + Cc + d.slice(u) + Pr + p) : d + Pr + (u === -2 ? f : p);
  }
  return [jc(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class xi {
  constructor({ strings: e, _$litType$: t }, n) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const f = e.length - 1, d = this.parts, [l, c] = Tf(e, t);
    if (this.el = xi.createElement(l, n), Nn.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = Nn.nextNode()) !== null && d.length < f; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Cc)) {
          const h = c[a++], p = i.getAttribute(u).split(Pr), v = /([.?@])?(.*)/.exec(h);
          d.push({ type: 1, index: s, name: v[2], strings: p, ctor: v[1] === "." ? Rf : v[1] === "?" ? Lf : v[1] === "@" ? Nf : fs }), i.removeAttribute(u);
        } else u.startsWith(Pr) && (d.push({ type: 6, index: s }), i.removeAttribute(u));
        if (Ic.test(i.tagName)) {
          const u = i.textContent.split(Pr), h = u.length - 1;
          if (h > 0) {
            i.textContent = es ? es.emptyScript : "";
            for (let p = 0; p < h; p++) i.append(u[p], $i()), Nn.nextNode(), d.push({ type: 2, index: ++s });
            i.append(u[h], $i());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Pc) d.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(Pr, u + 1)) !== -1; ) d.push({ type: 7, index: s }), u += Pr.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const n = Bn.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Qn(r, e, t = r, n) {
  var a, f;
  if (e === zn) return e;
  let i = n !== void 0 ? (a = t._$Co) == null ? void 0 : a[n] : t._$Cl;
  const s = wi(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((f = i == null ? void 0 : i._$AO) == null || f.call(i, !1), s === void 0 ? i = void 0 : (i = new s(r), i._$AT(r, t, n)), n !== void 0 ? (t._$Co ?? (t._$Co = []))[n] = i : t._$Cl = i), i !== void 0 && (e = Qn(r, i._$AS(r, e.values), i, n)), e;
}
class Mf {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: n } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? Bn).importNode(t, !0);
    Nn.currentNode = i;
    let s = Nn.nextNode(), a = 0, f = 0, d = n[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let l;
        d.type === 2 ? l = new fo(s, s.nextSibling, this, e) : d.type === 1 ? l = new d.ctor(s, d.name, d.strings, this, e) : d.type === 6 && (l = new kf(s, this, e)), this._$AV.push(l), d = n[++f];
      }
      a !== (d == null ? void 0 : d.index) && (s = Nn.nextNode(), a++);
    }
    return Nn.currentNode = Bn, i;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
let fo = class Tc {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, n, i) {
    this.type = 2, this._$AH = Ae, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Qn(this, e, t), wi(e) ? e === Ae || e == null || e === "" ? (this._$AH !== Ae && this._$AR(), this._$AH = Ae) : e !== this._$AH && e !== zn && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : If(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== Ae && wi(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Bn.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: n } = e, i = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = xi.createElement(jc(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(t);
    else {
      const a = new Mf(i, this), f = a.u(this.options);
      a.p(t), this.T(f), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = na.get(e.strings);
    return t === void 0 && na.set(e.strings, t = new xi(e)), t;
  }
  k(e) {
    uo(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, i = 0;
    for (const s of e) i === t.length ? t.push(n = new Tc(this.O($i()), this.O($i()), this, this.options)) : n = t[i], n._$AI(s), i++;
    i < t.length && (this._$AR(n && n._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
class fs {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, i, s) {
    this.type = 1, this._$AH = Ae, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Ae;
  }
  _$AI(e, t = this, n, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = Qn(this, e, t, 0), a = !wi(e) || e !== this._$AH && e !== zn, a && (this._$AH = e);
    else {
      const f = e;
      let d, l;
      for (e = s[0], d = 0; d < s.length - 1; d++) l = Qn(this, f[n + d], t, d), l === zn && (l = this._$AH[d]), a || (a = !wi(l) || l !== this._$AH[d]), l === Ae ? e = Ae : e !== Ae && (e += (l ?? "") + s[d + 1]), this._$AH[d] = l;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === Ae ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Rf extends fs {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === Ae ? void 0 : e;
  }
}
class Lf extends fs {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== Ae);
  }
}
class Nf extends fs {
  constructor(e, t, n, i, s) {
    super(e, t, n, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Qn(this, e, t, 0) ?? Ae) === zn) return;
    const n = this._$AH, i = e === Ae && n !== Ae || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== Ae && (n === Ae || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class kf {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Qn(this, e);
  }
}
const js = mi.litHtmlPolyfillSupport;
js == null || js(xi, fo), (mi.litHtmlVersions ?? (mi.litHtmlVersions = [])).push("3.2.1");
const Df = (r, e, t) => {
  const n = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    n._$litPart$ = i = new fo(e.insertBefore($i(), s), s, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let vi = class extends qn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Df(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return zn;
  }
};
var mc;
vi._$litElement$ = !0, vi.finalized = !0, (mc = globalThis.litElementHydrateSupport) == null || mc.call(globalThis, { LitElement: vi });
const Ts = globalThis.litElementPolyfillSupport;
Ts == null || Ts({ LitElement: vi });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mc = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Uf = { attribute: !0, type: String, converter: Yi, reflect: !1, hasChanged: lo }, Hf = (r = Uf, e, t) => {
  const { kind: n, metadata: i } = t;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), s.set(t.name, r), n === "accessor") {
    const { name: a } = t;
    return { set(f) {
      const d = e.get.call(this);
      e.set.call(this, f), this.requestUpdate(a, d, r);
    }, init(f) {
      return f !== void 0 && this.P(a, void 0, r), f;
    } };
  }
  if (n === "setter") {
    const { name: a } = t;
    return function(f) {
      const d = this[a];
      e.call(this, f), this.requestUpdate(a, d, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Q(r) {
  return (e, t) => typeof t == "object" ? Hf(r, e, t) : ((n, i, s) => {
    const a = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, a ? { ...n, wrapped: !0 } : n), a ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function fr(r) {
  return Q({ ...r, state: !0, attribute: !1 });
}
var hr = function(r, e, t, n) {
  var i = arguments.length, s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(r, e, t, n);
  else for (var f = r.length - 1; f >= 0; f--) (a = r[f]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, Ms = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
class _e extends vi {
  get state() {
    var e;
    const t = this.stateId || this.id;
    if (this.saveState && t)
      try {
        return JSON.parse((e = localStorage.getItem(t)) !== null && e !== void 0 ? e : "{}");
      } catch {
      }
    return this._state;
  }
  set state(e) {
    Object.assign(this._state, e);
    const t = this.stateId || this.id;
    this.saveState && t && localStorage.setItem(t, JSON.stringify(this._state));
  }
  /**
   * @name            define
   * @type            Function
   * @static
   *
   * This static method allows you to define a custom element just like the `customElement.define` does.
   * The trick is that this define method will not initialize the component directly. It will
   * wait until it is near the viewport before actually creating a new element names "%tagName-up".
   * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
   *
   * @param
   * @param       {Any}           props          The initial props to apply to your custom element
   * @param       {String}        tagName         The tagname you want to search in the DOM
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static define(e, t = {}, n = {}) {
    var i;
    if (!e)
      throw new Error(`You have to specify a tagName to the ${this.name}.define method...`);
    _e.setDefaultProps(e, t);
    const s = (i = n.window) !== null && i !== void 0 ? i : window;
    s.customElements.get(e.toLowerCase()) || s.customElements.define(e.toLowerCase(), class extends this {
    });
  }
  /**
   * @name            setDefaultProps
   * @type            Function
   * @static
   *
   * This static method allows you to set some default props for some particular
   * component(s). You can target components using simple css selectorl like "my-component#cool".
   * Once the component is instanciated, it will check if some defaults are specified and
   * extends them with the passed props.
   *
   * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
   * @param     {Any}         props         An object of props you want to set defaults for
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static setDefaultProps(e, t) {
    e = Array.isArray(e) ? e : [e], e.forEach((n) => {
      var i;
      this._defaultProps[n] = Object.assign(Object.assign({}, (i = this._defaultProps[n]) !== null && i !== void 0 ? i : {}), t);
    });
  }
  injectStyle(e, t = this.tagName) {
    this.constructor._injectedStyles.indexOf(t) === -1 && (this.constructor._injectedStyles.push(t), Uo(e, {
      id: t
    }));
  }
  /**
   * @name            getDefaultProps
   * @type            Function
   * @static
   *
   * This static method allows you to get back some default props setted for a component/feature, etc...
   *
   * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
   * @return    {Any}                                 Some default props setted or an empty object
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static getDefaultProps(e) {
    var t, n;
    return Object.assign(Object.assign({}, (t = this._defaultProps["*"]) !== null && t !== void 0 ? t : {}), (n = this._defaultProps[e]) !== null && n !== void 0 ? n : {});
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(e, t) {
    var n, i, s, a, f;
    super(), this.id = void 0, this.name = "", this.verbose = !1, this.activeWhen = ["inViewport"], this.mountWhen = "direct", this.prefixEvent = !0, this.adoptStyle = !0, this.saveState = !1, this.stateId = "", this.shadowDom = !1, this.classesSchema = "slim", this._internalName = this.tagName.toLowerCase(), this._shouldUpdate = !1, this._listenersMap = /* @__PURE__ */ new Map(), this._state = {}, this._LitElementMounted = !1, e && (this._internalName = e), this.setAttribute("id", (n = this.id) !== null && n !== void 0 ? n : `s-${Math.round(Math.random() * 9999)}`);
    const d = (i = this.firstUpdated) === null || i === void 0 ? void 0 : i.bind(this);
    this.firstUpdated = () => Ms(this, void 0, void 0, function* () {
      d && (yield d());
    });
    const l = (s = this.shouldUpdate) === null || s === void 0 ? void 0 : s.bind(this);
    this.shouldUpdate = () => l && !l() ? !1 : this._shouldUpdate;
    const c = Object.assign(Object.assign(Object.assign({}, _e.getDefaultProps(e.toLowerCase())), _e.getDefaultProps(this.tagName.toLowerCase())), t ?? {}), u = (f = (a = this.getAttribute("mountWhen")) !== null && a !== void 0 ? a : c.mountWhen) !== null && f !== void 0 ? f : "direct";
    this._waitAndExecute(u, () => {
      this._mount();
    });
  }
  connectedCallback() {
    const e = _e.getDefaultProps(this.tagName.toLowerCase());
    for (let [n, i] of Object.entries(e))
      this[n] = i;
    for (let [n, i] of this._listenersMap.entries())
      i.length && i.forEach((s) => {
        n.addEventListener(s.type, s.listener);
      });
    this.classList.add(...this.cls("")), this.shadowDom === !1 && (this.createRenderRoot = () => this);
    const t = this._getDocumentFromElement(this);
    if (document !== t && this.constructor.styles && Uo(this.constructor.styles, {
      rootNode: t
    }), !_e._keepInjectedCssBeforeStylesheetLinksInited) {
      const n = document.head.querySelector('link[rel="stylesheet"]');
      Di("style", (i) => {
        n && document.head.insertBefore(i, n);
      }, {
        rootNode: document.head
      }), _e._keepInjectedCssBeforeStylesheetLinksInited = !0;
    }
    super.connectedCallback();
  }
  /**
   * @name           setState
   * @type            Function
   *
   * This method allows you to set the state of the component.
   * It will merge the new state with the existing one.
   * This state will be saved in the localStorage if the "saveState" attribute is set to true.
   *
   * @param           {Partial<LitElement['_state']>}          newState          The new state to set
   *
   * @since           1.0.0
   */
  setState(e) {
    this.state = Object.assign(Object.assign({}, this.state), e), this.requestUpdate();
  }
  log(...e) {
    if (this.verbose) {
      let t = [];
      t.push(`[${this.tagName.toLowerCase()}]`), this.id && this.id !== this.tagName.toLocaleLowerCase() && t.push(this.id), t = [...t, ...e], console.log(...t);
    }
  }
  _getDocumentFromElement(e) {
    for (; e.parentNode; )
      e = e.parentNode;
    return e;
  }
  // /**
  //  * @name           addEventListener
  //  * @type            Function
  //  *
  //  * This method allows you to add an event listener on the component itself.
  //  * It will automatically remove the listener when the component is disconnected and added again when connected.
  //  *
  //  * @param           {String}            type            The event type to listen for
  //  * @param           {EventListenerOrEventListenerObject}          listener        The listener to call when the event is triggered
  //  * @param           {boolean|AddEventListenerOptions}          [options]       Some options to pass to the addEventListener method
  //  *
  //  * @since           1.0.0
  //  */
  // addEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | AddEventListenerOptions,
  // ): void {
  //   this.addEventListenerOn(this as HTMLElement, type, listener, options);
  // }
  /**
   * @name           addEventListenerOn
   * @type            Function
   *
   * This method allows you to add an event listener on any element.
   * It will automatically remove the listener when the component is disconnected and added again when connected.
   *
   * @param           {HTMLElement}            $elm            The element on which to add the event listener
   * @param           {String}            type            The event type to listen for
   * @param           {EventListenerOrEventListenerObject}          listener        The listener to call when the event is triggered
   * @param           {boolean|AddEventListenerOptions}          [options]       Some options to pass to the addEventListener method
   *
   * @since           1.0.0
   */
  addEventListenerOn(e, t, n, i) {
    var s;
    if (!e)
      return;
    let a = (s = this._listenersMap.get(e)) !== null && s !== void 0 ? s : [];
    a.push({
      listener: n,
      type: t
    }), e !== this && e.addEventListener(t, n, i), this._listenersMap.set(e, a);
  }
  /**
   * @name           dispatch
   * @type            Function
   *
   * This method allows you to dispatch some CustomEvents from your component node itself.
   *
   * If the "prefixEvent" attribute is set to true, the event will be dispatched with the following names:
   * 1. An event called "%internalName.%eventName"
   * 2. An event called "%name.%eventName" if the "name" property is setted
   * 3. An event called "%tagName.%eventName" if the tagName is different from the internalName
   *
   * Otherwise, the event will be dispatched with the following names:
   * 1. An event called "%eventName"
   *
   * @param           {String}            eventName     The event name to dispatch
   * @param           {TLitElementDispatchSettings}          [settings={}]     The settings to use for the dispatch
   *
   * @since           1.0.0
   */
  dispatch(e, t) {
    const n = Object.assign({ $elm: this, bubbles: !0, cancelable: !0, detail: {} }, t ?? {});
    let i = [], s = e;
    i.push(e), e.startsWith(`${this._internalName}.`) || (s = `${this._internalName}.${e}`, i.push(s), s = `${qo(this._internalName)}.${e}`, i.push(s)), e.startsWith(`${this.tagName}.`) || (s = `${this.tagName.toLowerCase()}.${e}`, i.push(s), s = `${qo(this.tagName.toLowerCase())}.${e}`, i.push(s)), i = Qs(i);
    for (let a of i)
      this.log(`Dispatching event "${a}"`), n.$elm.dispatchEvent(new CustomEvent(a, n));
  }
  _adoptStyleInShadowRoot(e, t) {
    return ou(e, t);
  }
  /**
   * @name          internalCls
   * @type          Function
   *
   * This method allows you to get a class that is based in on the internalName of the component.
   * This is useful to query some element(s) inside your component that used the `cls` method.
   *
   * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
   * @return        {String}                    The generated internalName based class that you can apply
   *
   * @since         1.0.0
   */
  internalCls(e = "") {
    return e ? `${this._internalName.toLowerCase()}${e && !e.match(/^(_{1,2}|-)/) ? "-" : ""}${e}` : this._internalName;
  }
  /**
   * @name          cls
   * @type          Function
   *
   * This method allows you to get a class that is based on the tagName of the component.
   *
   * If the "classesSchema" attribute is set to "full", the class will be generated like this:
   * 1. %internalName_%lowerCaseClassName
   * 2. %tagName_%lowerCaseClassName if the tagName is different from the internalName
   * 3. %name_%lowerCaseClassName if the "name" property is setted
   *
   * If the "classesSchema" attribute is set to "slim", the class will be generated like this:
   * 1. _%lowerCaseClassName
   *
   * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
   * @param         {TClassesSchema}       [classesSchema=this.classesSchema]         The schema to use to generate the class. Can be "slim" or "full"
   * @return        {String[]}                    The generated class(es) that you can apply
   *
   * @since         1.0.0
   */
  cls(e = "", t = this.classesSchema) {
    let n = "", i = [];
    return e ? (t === "full" && (n += `${this._internalName.toLowerCase()}`), e.split(" ").forEach((s) => {
      i.push(`${this._internalName.toLowerCase()}${s && !s.match(/^(_{1,2}|-)/) ? "-" : ""}${s}`), t === "full" ? i.push(`${this.tagName.toLowerCase()}${s && !s.match(/^(_{1,2}|-)/) ? "-" : ""}${s}`) : i.push(`${s && !s.match(/^(_{1,2}|-)/) ? "-" : ""}${s}`), this.name && this.name !== this.tagName.toLowerCase() && (t === "full" ? i.push(`${this.name.toLowerCase()}${s && !s.match(/^(_{1,2}|-)/) ? "-" : ""}${s}`) : i.push(`${s && !s.match(/^(_{1,2}|-)/) ? "-" : ""}${s}`));
    }), i = i.map((s) => s.replace(/[\-]+/, "-")), i = Qs(i), i.toString = function() {
      return this.join(" ");
    }, i) : (i.push(this.tagName.toLowerCase()), this._internalName !== e && i.push(this._internalName.toLowerCase()), this.name && this.name !== this.tagName.toLowerCase() && i.push(this.name.toLowerCase()), i.toString = function() {
      return this.join(" ");
    }, i);
  }
  _waitAndExecute(e, t) {
    return new Promise((n, i) => Ms(this, void 0, void 0, function* () {
      Array.isArray(e) || (e = [e]), e.includes("direct") ? yield su() : yield Js(this, e), t == null || t(this), n(this);
    }));
  }
  /**
   * @name            isActive
   * @type            Function
   *
   * true if the component is active or not. A component is active when
   *
   * @since   2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isActive() {
    return !(this.activeWhen.includes("inViewport") && !Zs(this));
  }
  isMounted() {
    return this._LitElementMounted || this.hasAttribute("mounted");
  }
  /**
   * @name            isInViewport
   * @type            Function
   *
   * true if the component is in the viewport, false if not
   *
   * @return         {Boolean}       true if in the viewport, false if not
   *
   * @since           1.0.0
   */
  isInViewport() {
    return Zs(this);
  }
  /**
   * @name            mount
   * @type            Function
   * @async
   *
   * This method allows you to actually mount your feature behavior.
   * It will be called depending on the "mountWhen" setting setted.
   *
   * @since           1.0.0
   */
  mount() {
  }
  _mount() {
    return Ms(this, void 0, void 0, function* () {
      var e, t;
      return this.log("Mounting..."), this.mount && typeof this.mount == "function" && (yield this.mount()), this._shouldUpdate = !0, this.requestUpdate(), this.injectStyle(
        // @ts-ignore
        (t = (e = this.constructor.styles) === null || e === void 0 ? void 0 : e.cssText) !== null && t !== void 0 ? t : "",
        this.tagName
      ), this.adoptStyle && this.shadowRoot && (yield this._adoptStyleInShadowRoot(this.shadowRoot)), this.setAttribute("mounted", "true"), this._LitElementMounted = !0, !0;
    });
  }
  disconnectedCallback() {
    for (let [e, t] of this._listenersMap.entries())
      t.length && t.forEach((n) => {
        e.removeEventListener(n.type, n.listener);
      });
    super.disconnectedCallback();
  }
}
_e._keepInjectedCssBeforeStylesheetLinksInited = !1;
_e._defaultProps = {};
_e._injectedStyles = [];
hr([
  Q({ type: String })
  // @ts-ignore
], _e.prototype, "id", void 0);
hr([
  Q({ type: String })
], _e.prototype, "name", void 0);
hr([
  Q({ type: Boolean })
], _e.prototype, "verbose", void 0);
hr([
  Q({ type: Array })
], _e.prototype, "activeWhen", void 0);
hr([
  Q({ type: String })
], _e.prototype, "mountWhen", void 0);
hr([
  Q({ type: Boolean })
], _e.prototype, "prefixEvent", void 0);
hr([
  Q({ type: Boolean })
], _e.prototype, "adoptStyle", void 0);
hr([
  Q({ type: Boolean })
], _e.prototype, "saveState", void 0);
hr([
  Q({ type: String })
], _e.prototype, "stateId", void 0);
hr([
  Q({ type: Boolean })
], _e.prototype, "shadowDom", void 0);
hr([
  Q({ type: String })
], _e.prototype, "classesSchema", void 0);
function ho(r, e) {
  if (Array.isArray(e))
    return ia(r, e);
  if (r[e] !== void 0)
    return r[e];
  if (!e || e === "" || e === ".")
    return r;
  e = e.replace(/\[(\w+)\]/g, ".$1"), e = e.replace(/\\\./g, "_dot_"), e = e.replace(/^\./, "");
  let t = [e.replace(/\?/gm, "")];
  const n = e.split(".");
  for (let i = n.length - 1; i >= 0; i--)
    if (n[i].match(/\?$/)) {
      const a = n.slice(0, i), f = n.slice(i + 1);
      t.push([...a, ...f].join(".")), t.push([...a, ...f.filter((d) => !d.match(/\?$/))].join("."));
    }
  t = Qs(t.map((i) => i.replace(/\?/gm, "")));
  for (let i = 0; i < t.length; i++) {
    const s = t[i], a = ia(r, s);
    if (a !== void 0)
      return a;
  }
}
function ia(r, e) {
  let t = r, n;
  if (typeof e == "string") {
    if (r[e] !== void 0)
      return r[e];
    if (!e || e === "" || e === ".")
      return r;
    e = e.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
  }
  for (n = [...e].map((i) => typeof i == "string" ? Xs(i) : i); n.length; ) {
    let i = n.shift();
    if (typeof i == "string" && (i = i.replace(/\?$/, "")), typeof t != "object" || !(t && i in t))
      return;
    t = t[i];
  }
  return t;
}
function Or(r, e, t, n) {
  const i = Object.assign({ preferAssign: !1 }, {});
  let s = r, a;
  if (Array.isArray(e) && e.length === 1 && (e = e[0]), typeof e == "string") {
    if (!e || e === "" || e === ".") {
      Object.assign(r, t);
      return;
    }
    e = e.replace(/\[(\w+)\]/g, ".[$1]"), a = Xs(e).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((f) => Xs(f));
  } else Array.isArray(e) && (a = [...e]);
  for (; a.length - 1; ) {
    const f = a.shift();
    f in s || (typeof a[0] == "string" ? a[0].match(/^\[[0-9]+\]$/) ? s[f] = [] : s[f] = {} : s[f] = {}), s[f] || (s[f] = {}), s = s[f];
  }
  if (typeof a[0] == "string" && a[0].match(/^\[[0-9]+\]$/))
    Array.isArray(s) || (s = []), s.push(t);
  else if (di(s[a[0]]) && di(t) && i.preferAssign) {
    for (const f in s[a[0]])
      delete s[a[0]][f];
    Object.assign(s[a[0]], t);
  } else
    s[a[0]] = t;
  return ho(r, e);
}
function Bf(r) {
  const e = {};
  console.log("object", r);
  for (const t in r)
    t && (console.log("key", t), Or(e, t, r[t]));
  return e;
}
var zf = Rc;
function Rc(r, e, t) {
  r instanceof RegExp && (r = sa(r, t)), e instanceof RegExp && (e = sa(e, t));
  var n = Lc(r, e, t);
  return n && {
    start: n[0],
    end: n[1],
    pre: t.slice(0, n[0]),
    body: t.slice(n[0] + r.length, n[1]),
    post: t.slice(n[1] + e.length)
  };
}
function sa(r, e) {
  var t = e.match(r);
  return t ? t[0] : null;
}
Rc.range = Lc;
function Lc(r, e, t) {
  var n, i, s, a, f, d = t.indexOf(r), l = t.indexOf(e, d + 1), c = d;
  if (d >= 0 && l > 0) {
    if (r === e)
      return [d, l];
    for (n = [], s = t.length; c >= 0 && !f; )
      c == d ? (n.push(c), d = t.indexOf(r, c + 1)) : n.length == 1 ? f = [n.pop(), l] : (i = n.pop(), i < s && (s = i, a = l), l = t.indexOf(e, c + 1)), c = d < l && d >= 0 ? d : l;
    n.length && (f = [s, a]);
  }
  return f;
}
var Nc = zf, Vf = qf, kc = "\0SLASH" + Math.random() + "\0", Dc = "\0OPEN" + Math.random() + "\0", po = "\0CLOSE" + Math.random() + "\0", Uc = "\0COMMA" + Math.random() + "\0", Hc = "\0PERIOD" + Math.random() + "\0";
function Rs(r) {
  return parseInt(r, 10) == r ? parseInt(r, 10) : r.charCodeAt(0);
}
function Ff(r) {
  return r.split("\\\\").join(kc).split("\\{").join(Dc).split("\\}").join(po).split("\\,").join(Uc).split("\\.").join(Hc);
}
function Wf(r) {
  return r.split(kc).join("\\").split(Dc).join("{").split(po).join("}").split(Uc).join(",").split(Hc).join(".");
}
function Bc(r) {
  if (!r)
    return [""];
  var e = [], t = Nc("{", "}", r);
  if (!t)
    return r.split(",");
  var n = t.pre, i = t.body, s = t.post, a = n.split(",");
  a[a.length - 1] += "{" + i + "}";
  var f = Bc(s);
  return s.length && (a[a.length - 1] += f.shift(), a.push.apply(a, f)), e.push.apply(e, a), e;
}
function qf(r) {
  return r ? (r.substr(0, 2) === "{}" && (r = "\\{\\}" + r.substr(2)), li(Ff(r), !0).map(Wf)) : [];
}
function Gf(r) {
  return "{" + r + "}";
}
function Kf(r) {
  return /^-?0\d/.test(r);
}
function Zf(r, e) {
  return r <= e;
}
function Jf(r, e) {
  return r >= e;
}
function li(r, e) {
  var t = [], n = Nc("{", "}", r);
  if (!n) return [r];
  var i = n.pre, s = n.post.length ? li(n.post, !1) : [""];
  if (/\$$/.test(n.pre))
    for (var a = 0; a < s.length; a++) {
      var f = i + "{" + n.body + "}" + s[a];
      t.push(f);
    }
  else {
    var d = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body), l = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body), c = d || l, u = n.body.indexOf(",") >= 0;
    if (!c && !u)
      return n.post.match(/,.*\}/) ? (r = n.pre + "{" + n.body + po + n.post, li(r)) : [r];
    var h;
    if (c)
      h = n.body.split(/\.\./);
    else if (h = Bc(n.body), h.length === 1 && (h = li(h[0], !1).map(Gf), h.length === 1))
      return s.map(function(O) {
        return n.pre + h[0] + O;
      });
    var p;
    if (c) {
      var v = Rs(h[0]), g = Rs(h[1]), b = Math.max(h[0].length, h[1].length), x = h.length == 3 ? Math.abs(Rs(h[2])) : 1, $ = Zf, _ = g < v;
      _ && (x *= -1, $ = Jf);
      var w = h.some(Kf);
      p = [];
      for (var E = v; $(E, g); E += x) {
        var A;
        if (l)
          A = String.fromCharCode(E), A === "\\" && (A = "");
        else if (A = String(E), w) {
          var R = b - A.length;
          if (R > 0) {
            var N = new Array(R + 1).join("0");
            E < 0 ? A = "-" + N + A.slice(1) : A = N + A;
          }
        }
        p.push(A);
      }
    } else {
      p = [];
      for (var k = 0; k < h.length; k++)
        p.push.apply(p, li(h[k], !1));
    }
    for (var k = 0; k < p.length; k++)
      for (var a = 0; a < s.length; a++) {
        var f = i + p[k] + s[a];
        (!e || c || f) && t.push(f);
      }
  }
  return t;
}
const Xf = /* @__PURE__ */ Er(Vf), Qf = 1024 * 64, ts = (r) => {
  if (typeof r != "string")
    throw new TypeError("invalid pattern");
  if (r.length > Qf)
    throw new TypeError("pattern is too long");
}, Yf = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
  "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
  "[:ascii:]": ["\\x00-\\x7f", !1],
  "[:blank:]": ["\\p{Zs}\\t", !0],
  "[:cntrl:]": ["\\p{Cc}", !0],
  "[:digit:]": ["\\p{Nd}", !0],
  "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
  "[:lower:]": ["\\p{Ll}", !0],
  "[:print:]": ["\\p{C}", !0],
  "[:punct:]": ["\\p{P}", !0],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
  "[:upper:]": ["\\p{Lu}", !0],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
  "[:xdigit:]": ["A-Fa-f0-9", !1]
}, ri = (r) => r.replace(/[[\]\\-]/g, "\\$&"), eh = (r) => r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), oa = (r) => r.join(""), th = (r, e) => {
  const t = e;
  if (r.charAt(t) !== "[")
    throw new Error("not in a brace expression");
  const n = [], i = [];
  let s = t + 1, a = !1, f = !1, d = !1, l = !1, c = t, u = "";
  e: for (; s < r.length; ) {
    const g = r.charAt(s);
    if ((g === "!" || g === "^") && s === t + 1) {
      l = !0, s++;
      continue;
    }
    if (g === "]" && a && !d) {
      c = s + 1;
      break;
    }
    if (a = !0, g === "\\" && !d) {
      d = !0, s++;
      continue;
    }
    if (g === "[" && !d) {
      for (const [b, [x, $, _]] of Object.entries(Yf))
        if (r.startsWith(b, s)) {
          if (u)
            return ["$.", !1, r.length - t, !0];
          s += b.length, _ ? i.push(x) : n.push(x), f = f || $;
          continue e;
        }
    }
    if (d = !1, u) {
      g > u ? n.push(ri(u) + "-" + ri(g)) : g === u && n.push(ri(g)), u = "", s++;
      continue;
    }
    if (r.startsWith("-]", s + 1)) {
      n.push(ri(g + "-")), s += 2;
      continue;
    }
    if (r.startsWith("-", s + 1)) {
      u = g, s += 2;
      continue;
    }
    n.push(ri(g)), s++;
  }
  if (c < s)
    return ["", !1, 0, !1];
  if (!n.length && !i.length)
    return ["$.", !1, r.length - t, !0];
  if (i.length === 0 && n.length === 1 && /^\\?.$/.test(n[0]) && !l) {
    const g = n[0].length === 2 ? n[0].slice(-1) : n[0];
    return [eh(g), !1, c - t, !1];
  }
  const h = "[" + (l ? "^" : "") + oa(n) + "]", p = "[" + (l ? "" : "^") + oa(i) + "]";
  return [n.length && i.length ? "(" + h + "|" + p + ")" : n.length ? h : p, f, c - t, !0];
}, ui = (r, { windowsPathsNoEscape: e = !1 } = {}) => e ? r.replace(/\[([^\/\\])\]/g, "$1") : r.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1"), rh = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]), aa = (r) => rh.has(r), nh = "(?!(?:^|/)\\.\\.?(?:$|/))", Ls = "(?!\\.)", ih = /* @__PURE__ */ new Set(["[", "."]), sh = /* @__PURE__ */ new Set(["..", "."]), oh = new Set("().*{}+?[]^$\\!"), ah = (r) => r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), mo = "[^/]", ca = mo + "*?", la = mo + "+?";
var ot, lt, $r, Ce, ze, jr, Dn, Tr, vr, Un, Ai, Vn, zc, Rr, Hi, Ys, Vc;
const St = class St {
  constructor(e, t, n = {}) {
    Ct(this, Vn);
    it(this, "type");
    Ct(this, ot);
    Ct(this, lt);
    Ct(this, $r, !1);
    Ct(this, Ce, []);
    Ct(this, ze);
    Ct(this, jr);
    Ct(this, Dn);
    Ct(this, Tr, !1);
    Ct(this, vr);
    Ct(this, Un);
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    Ct(this, Ai, !1);
    this.type = e, e && Be(this, lt, !0), Be(this, ze, t), Be(this, ot, z(this, ze) ? z(z(this, ze), ot) : this), Be(this, vr, z(this, ot) === this ? n : z(z(this, ot), vr)), Be(this, Dn, z(this, ot) === this ? [] : z(z(this, ot), Dn)), e === "!" && !z(z(this, ot), Tr) && z(this, Dn).push(this), Be(this, jr, z(this, ze) ? z(z(this, ze), Ce).length : 0);
  }
  get hasMagic() {
    if (z(this, lt) !== void 0)
      return z(this, lt);
    for (const e of z(this, Ce))
      if (typeof e != "string" && (e.type || e.hasMagic))
        return Be(this, lt, !0);
    return z(this, lt);
  }
  // reconstructs the pattern
  toString() {
    return z(this, Un) !== void 0 ? z(this, Un) : this.type ? Be(this, Un, this.type + "(" + z(this, Ce).map((e) => String(e)).join("|") + ")") : Be(this, Un, z(this, Ce).map((e) => String(e)).join(""));
  }
  push(...e) {
    for (const t of e)
      if (t !== "") {
        if (typeof t != "string" && !(t instanceof St && z(t, ze) === this))
          throw new Error("invalid part: " + t);
        z(this, Ce).push(t);
      }
  }
  toJSON() {
    var t;
    const e = this.type === null ? z(this, Ce).slice().map((n) => typeof n == "string" ? n : n.toJSON()) : [this.type, ...z(this, Ce).map((n) => n.toJSON())];
    return this.isStart() && !this.type && e.unshift([]), this.isEnd() && (this === z(this, ot) || z(z(this, ot), Tr) && ((t = z(this, ze)) == null ? void 0 : t.type) === "!") && e.push({}), e;
  }
  isStart() {
    var t;
    if (z(this, ot) === this)
      return !0;
    if (!((t = z(this, ze)) != null && t.isStart()))
      return !1;
    if (z(this, jr) === 0)
      return !0;
    const e = z(this, ze);
    for (let n = 0; n < z(this, jr); n++) {
      const i = z(e, Ce)[n];
      if (!(i instanceof St && i.type === "!"))
        return !1;
    }
    return !0;
  }
  isEnd() {
    var t, n, i;
    if (z(this, ot) === this || ((t = z(this, ze)) == null ? void 0 : t.type) === "!")
      return !0;
    if (!((n = z(this, ze)) != null && n.isEnd()))
      return !1;
    if (!this.type)
      return (i = z(this, ze)) == null ? void 0 : i.isEnd();
    const e = z(this, ze) ? z(z(this, ze), Ce).length : 0;
    return z(this, jr) === e - 1;
  }
  copyIn(e) {
    typeof e == "string" ? this.push(e) : this.push(e.clone(this));
  }
  clone(e) {
    const t = new St(this.type, e);
    for (const n of z(this, Ce))
      t.copyIn(n);
    return t;
  }
  static fromGlob(e, t = {}) {
    var i;
    const n = new St(null, void 0, t);
    return Sr(i = St, Rr, Hi).call(i, e, n, 0, t), n;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== z(this, ot))
      return z(this, ot).toMMPattern();
    const e = this.toString(), [t, n, i, s] = this.toRegExpSource();
    if (!(i || z(this, lt) || z(this, vr).nocase && !z(this, vr).nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase()))
      return n;
    const f = (z(this, vr).nocase ? "i" : "") + (s ? "u" : "");
    return Object.assign(new RegExp(`^${t}$`, f), {
      _src: t,
      _glob: e
    });
  }
  get options() {
    return z(this, vr);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(e) {
    var d;
    const t = e ?? !!z(this, vr).dot;
    if (z(this, ot) === this && Sr(this, Vn, zc).call(this), !this.type) {
      const l = this.isStart() && this.isEnd(), c = z(this, Ce).map((v) => {
        var _;
        const [g, b, x, $] = typeof v == "string" ? Sr(_ = St, Rr, Vc).call(_, v, z(this, lt), l) : v.toRegExpSource(e);
        return Be(this, lt, z(this, lt) || x), Be(this, $r, z(this, $r) || $), g;
      }).join("");
      let u = "";
      if (this.isStart() && typeof z(this, Ce)[0] == "string" && !(z(this, Ce).length === 1 && sh.has(z(this, Ce)[0]))) {
        const g = ih, b = (
          // dots are allowed, and the pattern starts with [ or .
          t && g.has(c.charAt(0)) || // the pattern starts with \., and then [ or .
          c.startsWith("\\.") && g.has(c.charAt(2)) || // the pattern starts with \.\., and then [ or .
          c.startsWith("\\.\\.") && g.has(c.charAt(4))
        ), x = !t && !e && g.has(c.charAt(0));
        u = b ? nh : x ? Ls : "";
      }
      let h = "";
      return this.isEnd() && z(z(this, ot), Tr) && ((d = z(this, ze)) == null ? void 0 : d.type) === "!" && (h = "(?:$|\\/)"), [
        u + c + h,
        ui(c),
        Be(this, lt, !!z(this, lt)),
        z(this, $r)
      ];
    }
    const n = this.type === "*" || this.type === "+", i = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let s = Sr(this, Vn, Ys).call(this, t);
    if (this.isStart() && this.isEnd() && !s && this.type !== "!") {
      const l = this.toString();
      return Be(this, Ce, [l]), this.type = null, Be(this, lt, void 0), [l, ui(this.toString()), !1, !1];
    }
    let a = !n || e || t ? "" : Sr(this, Vn, Ys).call(this, !0);
    a === s && (a = ""), a && (s = `(?:${s})(?:${a})*?`);
    let f = "";
    if (this.type === "!" && z(this, Ai))
      f = (this.isStart() && !t ? Ls : "") + la;
    else {
      const l = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !t && !e ? Ls : "") + ca + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && a ? ")" : this.type === "*" && a ? ")?" : `)${this.type}`;
      f = i + s + l;
    }
    return [
      f,
      ui(s),
      Be(this, lt, !!z(this, lt)),
      z(this, $r)
    ];
  }
};
ot = new WeakMap(), lt = new WeakMap(), $r = new WeakMap(), Ce = new WeakMap(), ze = new WeakMap(), jr = new WeakMap(), Dn = new WeakMap(), Tr = new WeakMap(), vr = new WeakMap(), Un = new WeakMap(), Ai = new WeakMap(), Vn = new WeakSet(), zc = function() {
  if (this !== z(this, ot))
    throw new Error("should only call on root");
  if (z(this, Tr))
    return this;
  this.toString(), Be(this, Tr, !0);
  let e;
  for (; e = z(this, Dn).pop(); ) {
    if (e.type !== "!")
      continue;
    let t = e, n = z(t, ze);
    for (; n; ) {
      for (let i = z(t, jr) + 1; !n.type && i < z(n, Ce).length; i++)
        for (const s of z(e, Ce)) {
          if (typeof s == "string")
            throw new Error("string part in extglob AST??");
          s.copyIn(z(n, Ce)[i]);
        }
      t = n, n = z(t, ze);
    }
  }
  return this;
}, Rr = new WeakSet(), Hi = function(e, t, n, i) {
  var p, v;
  let s = !1, a = !1, f = -1, d = !1;
  if (t.type === null) {
    let g = n, b = "";
    for (; g < e.length; ) {
      const x = e.charAt(g++);
      if (s || x === "\\") {
        s = !s, b += x;
        continue;
      }
      if (a) {
        g === f + 1 ? (x === "^" || x === "!") && (d = !0) : x === "]" && !(g === f + 2 && d) && (a = !1), b += x;
        continue;
      } else if (x === "[") {
        a = !0, f = g, d = !1, b += x;
        continue;
      }
      if (!i.noext && aa(x) && e.charAt(g) === "(") {
        t.push(b), b = "";
        const $ = new St(x, t);
        g = Sr(p = St, Rr, Hi).call(p, e, $, g, i), t.push($);
        continue;
      }
      b += x;
    }
    return t.push(b), g;
  }
  let l = n + 1, c = new St(null, t);
  const u = [];
  let h = "";
  for (; l < e.length; ) {
    const g = e.charAt(l++);
    if (s || g === "\\") {
      s = !s, h += g;
      continue;
    }
    if (a) {
      l === f + 1 ? (g === "^" || g === "!") && (d = !0) : g === "]" && !(l === f + 2 && d) && (a = !1), h += g;
      continue;
    } else if (g === "[") {
      a = !0, f = l, d = !1, h += g;
      continue;
    }
    if (aa(g) && e.charAt(l) === "(") {
      c.push(h), h = "";
      const b = new St(g, c);
      c.push(b), l = Sr(v = St, Rr, Hi).call(v, e, b, l, i);
      continue;
    }
    if (g === "|") {
      c.push(h), h = "", u.push(c), c = new St(null, t);
      continue;
    }
    if (g === ")")
      return h === "" && z(t, Ce).length === 0 && Be(t, Ai, !0), c.push(h), h = "", t.push(...u, c), l;
    h += g;
  }
  return t.type = null, Be(t, lt, void 0), Be(t, Ce, [e.substring(n - 1)]), l;
}, Ys = function(e) {
  return z(this, Ce).map((t) => {
    if (typeof t == "string")
      throw new Error("string type in extglob ast??");
    const [n, i, s, a] = t.toRegExpSource(e);
    return Be(this, $r, z(this, $r) || a), n;
  }).filter((t) => !(this.isStart() && this.isEnd()) || !!t).join("|");
}, Vc = function(e, t, n = !1) {
  let i = !1, s = "", a = !1;
  for (let f = 0; f < e.length; f++) {
    const d = e.charAt(f);
    if (i) {
      i = !1, s += (oh.has(d) ? "\\" : "") + d;
      continue;
    }
    if (d === "\\") {
      f === e.length - 1 ? s += "\\\\" : i = !0;
      continue;
    }
    if (d === "[") {
      const [l, c, u, h] = th(e, f);
      if (u) {
        s += l, a = a || c, f += u - 1, t = t || h;
        continue;
      }
    }
    if (d === "*") {
      n && e === "*" ? s += la : s += ca, t = !0;
      continue;
    }
    if (d === "?") {
      s += mo, t = !0;
      continue;
    }
    s += ah(d);
  }
  return [s, ui(e), !!t, a];
}, Ct(St, Rr);
let rs = St;
const ch = (r, { windowsPathsNoEscape: e = !1 } = {}) => e ? r.replace(/[?*()[\]]/g, "[$&]") : r.replace(/[?*()[\]\\]/g, "\\$&"), Ot = (r, e, t = {}) => (ts(e), !t.nocomment && e.charAt(0) === "#" ? !1 : new hs(e, t).match(r)), lh = /^\*+([^+@!?\*\[\(]*)$/, uh = (r) => (e) => !e.startsWith(".") && e.endsWith(r), fh = (r) => (e) => e.endsWith(r), hh = (r) => (r = r.toLowerCase(), (e) => !e.startsWith(".") && e.toLowerCase().endsWith(r)), dh = (r) => (r = r.toLowerCase(), (e) => e.toLowerCase().endsWith(r)), ph = /^\*+\.\*+$/, mh = (r) => !r.startsWith(".") && r.includes("."), vh = (r) => r !== "." && r !== ".." && r.includes("."), gh = /^\.\*+$/, yh = (r) => r !== "." && r !== ".." && r.startsWith("."), _h = /^\*+$/, bh = (r) => r.length !== 0 && !r.startsWith("."), $h = (r) => r.length !== 0 && r !== "." && r !== "..", wh = /^\?+([^+@!?\*\[\(]*)?$/, xh = ([r, e = ""]) => {
  const t = Fc([r]);
  return e ? (e = e.toLowerCase(), (n) => t(n) && n.toLowerCase().endsWith(e)) : t;
}, Eh = ([r, e = ""]) => {
  const t = Wc([r]);
  return e ? (e = e.toLowerCase(), (n) => t(n) && n.toLowerCase().endsWith(e)) : t;
}, Sh = ([r, e = ""]) => {
  const t = Wc([r]);
  return e ? (n) => t(n) && n.endsWith(e) : t;
}, Oh = ([r, e = ""]) => {
  const t = Fc([r]);
  return e ? (n) => t(n) && n.endsWith(e) : t;
}, Fc = ([r]) => {
  const e = r.length;
  return (t) => t.length === e && !t.startsWith(".");
}, Wc = ([r]) => {
  const e = r.length;
  return (t) => t.length === e && t !== "." && t !== "..";
}, qc = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix", ua = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
}, Ah = qc === "win32" ? ua.win32.sep : ua.posix.sep;
Ot.sep = Ah;
const Ut = Symbol("globstar **");
Ot.GLOBSTAR = Ut;
const Ch = "[^/]", Ph = Ch + "*?", Ih = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", jh = "(?:(?!(?:\\/|^)\\.).)*?", Th = (r, e = {}) => (t) => Ot(t, r, e);
Ot.filter = Th;
const kt = (r, e = {}) => Object.assign({}, r, e), Mh = (r) => {
  if (!r || typeof r != "object" || !Object.keys(r).length)
    return Ot;
  const e = Ot;
  return Object.assign((n, i, s = {}) => e(n, i, kt(r, s)), {
    Minimatch: class extends e.Minimatch {
      constructor(i, s = {}) {
        super(i, kt(r, s));
      }
      static defaults(i) {
        return e.defaults(kt(r, i)).Minimatch;
      }
    },
    AST: class extends e.AST {
      /* c8 ignore start */
      constructor(i, s, a = {}) {
        super(i, s, kt(r, a));
      }
      /* c8 ignore stop */
      static fromGlob(i, s = {}) {
        return e.AST.fromGlob(i, kt(r, s));
      }
    },
    unescape: (n, i = {}) => e.unescape(n, kt(r, i)),
    escape: (n, i = {}) => e.escape(n, kt(r, i)),
    filter: (n, i = {}) => e.filter(n, kt(r, i)),
    defaults: (n) => e.defaults(kt(r, n)),
    makeRe: (n, i = {}) => e.makeRe(n, kt(r, i)),
    braceExpand: (n, i = {}) => e.braceExpand(n, kt(r, i)),
    match: (n, i, s = {}) => e.match(n, i, kt(r, s)),
    sep: e.sep,
    GLOBSTAR: Ut
  });
};
Ot.defaults = Mh;
const Gc = (r, e = {}) => (ts(r), e.nobrace || !/\{(?:(?!\{).)*\}/.test(r) ? [r] : Xf(r));
Ot.braceExpand = Gc;
const Rh = (r, e = {}) => new hs(r, e).makeRe();
Ot.makeRe = Rh;
const Lh = (r, e, t = {}) => {
  const n = new hs(e, t);
  return r = r.filter((i) => n.match(i)), n.options.nonull && !r.length && r.push(e), r;
};
Ot.match = Lh;
const fa = /[?*]|[+@!]\(.*?\)|\[|\]/, Nh = (r) => r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
class hs {
  constructor(e, t = {}) {
    it(this, "options");
    it(this, "set");
    it(this, "pattern");
    it(this, "windowsPathsNoEscape");
    it(this, "nonegate");
    it(this, "negate");
    it(this, "comment");
    it(this, "empty");
    it(this, "preserveMultipleSlashes");
    it(this, "partial");
    it(this, "globSet");
    it(this, "globParts");
    it(this, "nocase");
    it(this, "isWindows");
    it(this, "platform");
    it(this, "windowsNoMagicRoot");
    it(this, "regexp");
    ts(e), t = t || {}, this.options = t, this.pattern = e, this.platform = t.platform || qc, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!t.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!t.nonegate, this.comment = !1, this.empty = !1, this.partial = !!t.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = t.windowsNoMagicRoot !== void 0 ? t.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1)
      return !0;
    for (const e of this.set)
      for (const t of e)
        if (typeof t != "string")
          return !0;
    return !1;
  }
  debug(...e) {
  }
  make() {
    const e = this.pattern, t = this.options;
    if (!t.nocomment && e.charAt(0) === "#") {
      this.comment = !0;
      return;
    }
    if (!e) {
      this.empty = !0;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], t.debug && (this.debug = (...s) => console.error(...s)), this.debug(this.pattern, this.globSet);
    const n = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(n), this.debug(this.pattern, this.globParts);
    let i = this.globParts.map((s, a, f) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const d = s[0] === "" && s[1] === "" && (s[2] === "?" || !fa.test(s[2])) && !fa.test(s[3]), l = /^[a-z]:/i.test(s[0]);
        if (d)
          return [...s.slice(0, 4), ...s.slice(4).map((c) => this.parse(c))];
        if (l)
          return [s[0], ...s.slice(1).map((c) => this.parse(c))];
      }
      return s.map((d) => this.parse(d));
    });
    if (this.debug(this.pattern, i), this.set = i.filter((s) => s.indexOf(!1) === -1), this.isWindows)
      for (let s = 0; s < this.set.length; s++) {
        const a = this.set[s];
        a[0] === "" && a[1] === "" && this.globParts[s][2] === "?" && typeof a[3] == "string" && /^[a-z]:$/i.test(a[3]) && (a[2] = "?");
      }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(e) {
    if (this.options.noglobstar)
      for (let n = 0; n < e.length; n++)
        for (let i = 0; i < e[n].length; i++)
          e[n][i] === "**" && (e[n][i] = "*");
    const { optimizationLevel: t = 1 } = this.options;
    return t >= 2 ? (e = this.firstPhasePreProcess(e), e = this.secondPhasePreProcess(e)) : t >= 1 ? e = this.levelOneOptimize(e) : e = this.adjascentGlobstarOptimize(e), e;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(e) {
    return e.map((t) => {
      let n = -1;
      for (; (n = t.indexOf("**", n + 1)) !== -1; ) {
        let i = n;
        for (; t[i + 1] === "**"; )
          i++;
        i !== n && t.splice(n, i - n);
      }
      return t;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(e) {
    return e.map((t) => (t = t.reduce((n, i) => {
      const s = n[n.length - 1];
      return i === "**" && s === "**" ? n : i === ".." && s && s !== ".." && s !== "." && s !== "**" ? (n.pop(), n) : (n.push(i), n);
    }, []), t.length === 0 ? [""] : t));
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let t = !1;
    do {
      if (t = !1, !this.preserveMultipleSlashes) {
        for (let i = 1; i < e.length - 1; i++) {
          const s = e[i];
          i === 1 && s === "" && e[0] === "" || (s === "." || s === "") && (t = !0, e.splice(i, 1), i--);
        }
        e[0] === "." && e.length === 2 && (e[1] === "." || e[1] === "") && (t = !0, e.pop());
      }
      let n = 0;
      for (; (n = e.indexOf("..", n + 1)) !== -1; ) {
        const i = e[n - 1];
        i && i !== "." && i !== ".." && i !== "**" && (t = !0, e.splice(n - 1, 2), n -= 2);
      }
    } while (t);
    return e.length === 0 ? [""] : e;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(e) {
    let t = !1;
    do {
      t = !1;
      for (let n of e) {
        let i = -1;
        for (; (i = n.indexOf("**", i + 1)) !== -1; ) {
          let a = i;
          for (; n[a + 1] === "**"; )
            a++;
          a > i && n.splice(i + 1, a - i);
          let f = n[i + 1];
          const d = n[i + 2], l = n[i + 3];
          if (f !== ".." || !d || d === "." || d === ".." || !l || l === "." || l === "..")
            continue;
          t = !0, n.splice(i, 1);
          const c = n.slice(0);
          c[i] = "**", e.push(c), i--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let a = 1; a < n.length - 1; a++) {
            const f = n[a];
            a === 1 && f === "" && n[0] === "" || (f === "." || f === "") && (t = !0, n.splice(a, 1), a--);
          }
          n[0] === "." && n.length === 2 && (n[1] === "." || n[1] === "") && (t = !0, n.pop());
        }
        let s = 0;
        for (; (s = n.indexOf("..", s + 1)) !== -1; ) {
          const a = n[s - 1];
          if (a && a !== "." && a !== ".." && a !== "**") {
            t = !0;
            const d = s === 1 && n[s + 1] === "**" ? ["."] : [];
            n.splice(s - 1, 2, ...d), n.length === 0 && n.push(""), s -= 2;
          }
        }
      }
    } while (t);
    return e;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(e) {
    for (let t = 0; t < e.length - 1; t++)
      for (let n = t + 1; n < e.length; n++) {
        const i = this.partsMatch(e[t], e[n], !this.preserveMultipleSlashes);
        if (i) {
          e[t] = [], e[n] = i;
          break;
        }
      }
    return e.filter((t) => t.length);
  }
  partsMatch(e, t, n = !1) {
    let i = 0, s = 0, a = [], f = "";
    for (; i < e.length && s < t.length; )
      if (e[i] === t[s])
        a.push(f === "b" ? t[s] : e[i]), i++, s++;
      else if (n && e[i] === "**" && t[s] === e[i + 1])
        a.push(e[i]), i++;
      else if (n && t[s] === "**" && e[i] === t[s + 1])
        a.push(t[s]), s++;
      else if (e[i] === "*" && t[s] && (this.options.dot || !t[s].startsWith(".")) && t[s] !== "**") {
        if (f === "b")
          return !1;
        f = "a", a.push(e[i]), i++, s++;
      } else if (t[s] === "*" && e[i] && (this.options.dot || !e[i].startsWith(".")) && e[i] !== "**") {
        if (f === "a")
          return !1;
        f = "b", a.push(t[s]), i++, s++;
      } else
        return !1;
    return e.length === t.length && a;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const e = this.pattern;
    let t = !1, n = 0;
    for (let i = 0; i < e.length && e.charAt(i) === "!"; i++)
      t = !t, n++;
    n && (this.pattern = e.slice(n)), this.negate = t;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(e, t, n = !1) {
    const i = this.options;
    if (this.isWindows) {
      const g = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), b = !g && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]), x = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), $ = !x && t[0] === "" && t[1] === "" && t[2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]), _ = b ? 3 : g ? 0 : void 0, w = $ ? 3 : x ? 0 : void 0;
      if (typeof _ == "number" && typeof w == "number") {
        const [E, A] = [e[_], t[w]];
        E.toLowerCase() === A.toLowerCase() && (t[w] = E, w > _ ? t = t.slice(w) : _ > w && (e = e.slice(_)));
      }
    }
    const { optimizationLevel: s = 1 } = this.options;
    s >= 2 && (e = this.levelTwoFileOptimize(e)), this.debug("matchOne", this, { file: e, pattern: t }), this.debug("matchOne", e.length, t.length);
    for (var a = 0, f = 0, d = e.length, l = t.length; a < d && f < l; a++, f++) {
      this.debug("matchOne loop");
      var c = t[f], u = e[a];
      if (this.debug(t, c, u), c === !1)
        return !1;
      if (c === Ut) {
        this.debug("GLOBSTAR", [t, c, u]);
        var h = a, p = f + 1;
        if (p === l) {
          for (this.debug("** at the end"); a < d; a++)
            if (e[a] === "." || e[a] === ".." || !i.dot && e[a].charAt(0) === ".")
              return !1;
          return !0;
        }
        for (; h < d; ) {
          var v = e[h];
          if (this.debug(`
globstar while`, e, h, t, p, v), this.matchOne(e.slice(h), t.slice(p), n))
            return this.debug("globstar found match!", h, d, v), !0;
          if (v === "." || v === ".." || !i.dot && v.charAt(0) === ".") {
            this.debug("dot detected!", e, h, t, p);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), h++;
        }
        return !!(n && (this.debug(`
>>> no match, partial?`, e, h, t, p), h === d));
      }
      let g;
      if (typeof c == "string" ? (g = u === c, this.debug("string match", c, u, g)) : (g = c.test(u), this.debug("pattern match", c, u, g)), !g)
        return !1;
    }
    if (a === d && f === l)
      return !0;
    if (a === d)
      return n;
    if (f === l)
      return a === d - 1 && e[a] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return Gc(this.pattern, this.options);
  }
  parse(e) {
    ts(e);
    const t = this.options;
    if (e === "**")
      return Ut;
    if (e === "")
      return "";
    let n, i = null;
    (n = e.match(_h)) ? i = t.dot ? $h : bh : (n = e.match(lh)) ? i = (t.nocase ? t.dot ? dh : hh : t.dot ? fh : uh)(n[1]) : (n = e.match(wh)) ? i = (t.nocase ? t.dot ? Eh : xh : t.dot ? Sh : Oh)(n) : (n = e.match(ph)) ? i = t.dot ? vh : mh : (n = e.match(gh)) && (i = yh);
    const s = rs.fromGlob(e, this.options).toMMPattern();
    return i && typeof s == "object" && Reflect.defineProperty(s, "test", { value: i }), s;
  }
  makeRe() {
    if (this.regexp || this.regexp === !1)
      return this.regexp;
    const e = this.set;
    if (!e.length)
      return this.regexp = !1, this.regexp;
    const t = this.options, n = t.noglobstar ? Ph : t.dot ? Ih : jh, i = new Set(t.nocase ? ["i"] : []);
    let s = e.map((d) => {
      const l = d.map((c) => {
        if (c instanceof RegExp)
          for (const u of c.flags.split(""))
            i.add(u);
        return typeof c == "string" ? Nh(c) : c === Ut ? Ut : c._src;
      });
      return l.forEach((c, u) => {
        const h = l[u + 1], p = l[u - 1];
        c !== Ut || p === Ut || (p === void 0 ? h !== void 0 && h !== Ut ? l[u + 1] = "(?:\\/|" + n + "\\/)?" + h : l[u] = n : h === void 0 ? l[u - 1] = p + "(?:\\/|" + n + ")?" : h !== Ut && (l[u - 1] = p + "(?:\\/|\\/" + n + "\\/)" + h, l[u + 1] = Ut));
      }), l.filter((c) => c !== Ut).join("/");
    }).join("|");
    const [a, f] = e.length > 1 ? ["(?:", ")"] : ["", ""];
    s = "^" + a + s + f + "$", this.negate && (s = "^(?!" + s + ").+$");
    try {
      this.regexp = new RegExp(s, [...i].join(""));
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  slashSplit(e) {
    return this.preserveMultipleSlashes ? e.split("/") : this.isWindows && /^\/\/[^\/]+/.test(e) ? ["", ...e.split(/\/+/)] : e.split(/\/+/);
  }
  match(e, t = this.partial) {
    if (this.debug("match", e, this.pattern), this.comment)
      return !1;
    if (this.empty)
      return e === "";
    if (e === "/" && t)
      return !0;
    const n = this.options;
    this.isWindows && (e = e.split("\\").join("/"));
    const i = this.slashSplit(e);
    this.debug(this.pattern, "split", i);
    const s = this.set;
    this.debug(this.pattern, "set", s);
    let a = i[i.length - 1];
    if (!a)
      for (let f = i.length - 2; !a && f >= 0; f--)
        a = i[f];
    for (let f = 0; f < s.length; f++) {
      const d = s[f];
      let l = i;
      if (n.matchBase && d.length === 1 && (l = [a]), this.matchOne(l, d, t))
        return n.flipNegate ? !0 : !this.negate;
    }
    return n.flipNegate ? !1 : this.negate;
  }
  static defaults(e) {
    return Ot.defaults(e).Minimatch;
  }
}
Ot.AST = rs;
Ot.Minimatch = hs;
Ot.escape = ch;
Ot.unescape = ui;
var Ns;
!((Ns = window.process) === null || Ns === void 0) && Ns.env ? window.process.env.I18N || (window.process.env.I18N = {}) : window.process = {
  env: {
    I18N: {}
  }
};
function Bt(r, e) {
  var t, n, i, s;
  const a = Object.assign({ tokens: {} }, {}), f = (n = (t = process.env) === null || t === void 0 ? void 0 : t.I18N) !== null && n !== void 0 ? n : {};
  let d;
  a.id && (d = (i = f[a.id]) !== null && i !== void 0 ? i : ho(f, a.id)), d || (d = (s = f[r]) !== null && s !== void 0 ? s : r), f[r] || (f._missing || (f._missing = {}), f._missing[r] = r);
  const l = ` ${d} `.match(/(__\([^__\)]*\)__|(?!\|)%[a-zA-Z0-9])/gm);
  if (!l)
    return d;
  function c(h) {
    var p, v;
    return (v = (p = a.tokens[h]) !== null && p !== void 0 ? p : a.tokens[h.replace(/^%/, "")]) !== null && v !== void 0 ? v : h;
  }
  let u;
  return l.forEach((h) => {
    var p;
    if (h.match(/^%/)) {
      u = h;
      const v = c(h);
      d = d.replaceAll(new RegExp(`([^(])?${h}`, "g"), `$1${v}`);
    } else {
      const v = h.match(/\|(%[a-zA-Z0-9]+)\)__/), g = (p = v == null ? void 0 : v[1]) !== null && p !== void 0 ? p : u, b = c(g);
      if (typeof b != "number") {
        d = d.replace(h, `**(invalid token "${g}" for pluralization)**`);
        return;
      }
      h = h.replace(/\\\|/gm, "_$_");
      let x = h.split(/\|/gm);
      x = x.map(($) => $.replace(/_\$_/gm, "|").replace(/^__\(/, "").replace(/\)__$/, "")), h = h.replace(/_\$_/gm, "\\|"), x.length === 1 ? d = d.replace(h, b > 1 ? x[0] : "") : x.length === 2 && x[0].match(/^%[a-zA-Z0-9]+/) ? d = d.replace(h, b > 1 ? x[1] : "") : x.length === 2 && !x[0].match(/^%[a-zA-Z0-9]+/) ? d = d.replace(h, b > 1 ? x[1] : x[0]) : x.length === 3 && (d = d.replace(h, b > 1 ? x[2] : x[1]));
    }
  }), d;
}
var Kc = { exports: {} };
(function(r) {
  (function(e) {
    if (typeof t != "function") {
      var t = function(v) {
        return v;
      };
      t.nonNative = !0;
    }
    const n = t("plaintext"), i = t("html"), s = t("comment"), a = /<(\w*)>/g, f = /<\/?([^\s\/>]+)/;
    function d(v, g, b) {
      v = v || "", g = g || [], b = b || "";
      let x = c(g, b);
      return u(v, x);
    }
    function l(v, g) {
      v = v || [], g = g || "";
      let b = c(v, g);
      return function($) {
        return u($ || "", b);
      };
    }
    d.init_streaming_mode = l;
    function c(v, g) {
      return v = h(v), {
        allowable_tags: v,
        tag_replacement: g,
        state: n,
        tag_buffer: "",
        depth: 0,
        in_quote_char: ""
      };
    }
    function u(v, g) {
      if (typeof v != "string")
        throw new TypeError("'html' parameter must be a string");
      let b = g.allowable_tags, x = g.tag_replacement, $ = g.state, _ = g.tag_buffer, w = g.depth, E = g.in_quote_char, A = "";
      for (let R = 0, N = v.length; R < N; R++) {
        let k = v[R];
        if ($ === n)
          switch (k) {
            case "<":
              $ = i, _ += k;
              break;
            default:
              A += k;
              break;
          }
        else if ($ === i)
          switch (k) {
            case "<":
              if (E)
                break;
              w++;
              break;
            case ">":
              if (E)
                break;
              if (w) {
                w--;
                break;
              }
              E = "", $ = n, _ += ">", b.has(p(_)) ? A += _ : A += x, _ = "";
              break;
            case '"':
            case "'":
              k === E ? E = "" : E = E || k, _ += k;
              break;
            case "-":
              _ === "<!-" && ($ = s), _ += k;
              break;
            case " ":
            case `
`:
              if (_ === "<") {
                $ = n, A += "< ", _ = "";
                break;
              }
              _ += k;
              break;
            default:
              _ += k;
              break;
          }
        else if ($ === s)
          switch (k) {
            case ">":
              _.slice(-2) == "--" && ($ = n), _ = "";
              break;
            default:
              _ += k;
              break;
          }
      }
      return g.state = $, g.tag_buffer = _, g.depth = w, g.in_quote_char = E, A;
    }
    function h(v) {
      let g = /* @__PURE__ */ new Set();
      if (typeof v == "string") {
        let b;
        for (; b = a.exec(v); )
          g.add(b[1]);
      } else !t.nonNative && typeof v[t.iterator] == "function" ? g = new Set(v) : typeof v.forEach == "function" && v.forEach(g.add, g);
      return g;
    }
    function p(v) {
      let g = f.exec(v);
      return g ? g[1].toLowerCase() : null;
    }
    r.exports ? r.exports = d : e.striptags = d;
  })(ye);
})(Kc);
var kh = Kc.exports;
const Dh = /* @__PURE__ */ Er(kh);
function Uh(r, e = [], t = "") {
  return Dh(r, e, t);
}
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Hh = function(e) {
  return typeof e < "u" && e !== null && (typeof e == "object" || typeof e == "function");
}, ha = Hh, Bh = function(e) {
  ha(e) || (e = {});
  for (var t = arguments.length, n = 1; n < t; n++) {
    var i = arguments[n];
    ha(i) && zh(e, i);
  }
  return e;
};
function zh(r, e) {
  for (var t in e)
    Vh(e, t) && (r[t] = e[t]);
}
function Vh(r, e) {
  return Object.prototype.hasOwnProperty.call(r, e);
}
var Fh = Bh, ks = {}, da, Hn = {
  default: {
    "&quot;": '"',
    "&#34;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&amp;": "&",
    "&#38;": "&",
    "&gt;": ">",
    "&#62;": ">",
    "&lt;": "<",
    "&#60;": "<"
  },
  extras: {
    "&cent;": "¢",
    "&#162;": "¢",
    "&copy;": "©",
    "&#169;": "©",
    "&euro;": "€",
    "&#8364;": "€",
    "&pound;": "£",
    "&#163;": "£",
    "&reg;": "®",
    "&#174;": "®",
    "&yen;": "¥",
    "&#165;": "¥"
  }
};
Object.defineProperty(Hn, "all", {
  get: function() {
    return da || (da = Fh({}, Hn.default, Hn.extras));
  }
});
function vo(r, e) {
  if (!qh(r)) return "";
  var t = Hn[e || "default"], n = Wh(e, t);
  return r.replace(n, function(i) {
    return t[i];
  });
}
function Wh(r, e) {
  if (ks[r])
    return ks[r];
  var t = Object.keys(e).join("|"), n = new RegExp("(?=(" + t + "))\\1", "g");
  return ks[r] = n, n;
}
function qh(r) {
  return r && typeof r == "string";
}
vo.chars = Hn.default;
vo.extras = Hn.extras;
Object.defineProperty(vo, "all", {
  get: function() {
    return Hn.all;
  }
});
let In = [];
const pa = /* @__PURE__ */ new WeakMap();
let Ds = !1;
class Gh extends Promise {
  cancel() {
  }
}
function Zc(r, e) {
  const t = new Gh((n) => {
    var i;
    const s = Object.assign({ ctx: document }, {});
    (Array.isArray(s.ctx) ? s.ctx : [s.ctx]).forEach((d) => {
      pa.has(d) || (pa.set(d, !0), d.addEventListener("keydown", (l) => {
        var c;
        if (l.key !== "Escape" || !In.length || Ds)
          return;
        Ds = !0, setTimeout(() => {
          Ds = !1;
        });
        const u = In.pop();
        (c = u.callback) === null || c === void 0 || c.call(u), u.resolve();
      }));
    });
    const f = {
      id: (i = s.id) !== null && i !== void 0 ? i : Lr(),
      callback: r,
      resolve: n
    };
    if (setTimeout(() => {
      t.cancel = () => {
        In = In.filter((d) => d.id !== f.id), Promise.resolve(t);
      };
    }), s.id) {
      const d = In.find((l) => l.id === s.id);
      d ? (d.callback = r, d.resolve = n) : In.push(f);
    } else
      In.push(f);
  });
  return t;
}
function Cr(r, e, t) {
  const n = Object.assign({ ctx: document.body, preventDefault: !0 }, t ?? {});
  if (Array.isArray(r)) {
    const l = r.map((c) => Cr(c, e, t));
    return {
      cancel: () => {
        l.forEach((c) => {
          c.cancel();
        });
      }
    };
  }
  const i = r.split("+").map((l) => l === "command" || l === "cmd" ? "meta" : l === "escape" || l === "esc" ? "Escape" : l), s = i[i.length - 1], a = ["shift", "ctrl", "alt", "meta"], f = i.filter((l) => a.includes(l)).length > 1, d = (l) => {
    const c = document.activeElement;
    if (((c == null ? void 0 : c.tagName) === "INPUT" || (c == null ? void 0 : c.tagName) === "TEXTAREA" || c != null && c.hasAttribute("contenteditable")) && !i.includes("meta") && !i.includes("ctrl") && s !== "Escape" || l.key !== s)
      return;
    let u = [l.shiftKey, l.ctrlKey, l.altKey, l.metaKey].filter((p) => p).length > 1, h = l.shiftKey || l.ctrlKey || l.altKey || l.metaKey;
    i.length > 1 && !h || f && !u || l.ctrlKey && !i.includes("ctrl") || l.metaKey && !i.includes("meta") || l.altKey && !i.includes("alt") || l.shiftKey && !i.includes("shift") || (n.preventDefault && l.preventDefault(), e(l));
  };
  return n.ctx.addEventListener("keydown", d), {
    cancel: () => {
      n.ctx.removeEventListener("keydown", d);
    }
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jc = { CHILD: 2 }, Xc = (r) => (...e) => ({ _$litDirective$: r, values: e });
let Qc = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, n) {
    this._$Ct = e, this._$AM = t, this._$Ci = n;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class eo extends Qc {
  constructor(e) {
    if (super(e), this.it = Ae, e.type !== Jc.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === Ae || e == null) return this._t = void 0, this.it = e;
    if (e === zn) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
eo.directiveName = "unsafeHTML", eo.resultType = 1;
const gi = Xc(eo);
var Me = function(r, e, t, n) {
  var i = arguments.length, s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(r, e, t, n);
  else for (var f = r.length - 1; f >= 0; f--) (a = r[f]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, jn = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
class Te extends _e {
  constructor() {
    super("s-advanced-select"), this._displayedMaxItems = 0, this._filterValue = "", this._items = [], this._filteredItems = [], this._isLoading = !1, this.items = [], this.value = "value", this.label = "label", this.showKeywords = !1, this.emptyText = Bt("No items found..."), this.loadingText = Bt("Loading, please wait..."), this.minChars = 1, this.filtrable = [], this.highlightable = [], this.closeTimeout = 100, this.notSelectable = !1, this.maxItems = -1, this.classes = {}, this.inline = !1, this._$container = document.createElement("div"), this._$list = document.createElement("ul"), this._$dropdown = document.createElement("div"), this._$input = document.createElement("input"), this._templatesFromHtml = {}, this._isArrowUsed = !1, this._baseTemplates = (e) => {
    }, this._currentItemIdx = 0;
  }
  mount() {
    return jn(this, void 0, void 0, function* () {
      if (this._displayedMaxItems = this.maxItems, typeof this.filtrable == "string" && (this.filtrable = this.filtrable.split(",").map((e) => e.trim())), this.filtrable.length || (this.filtrable.push("id"), this.filtrable.push("value"), typeof this.label == "string" && this.filtrable.push(this.label)), this.highlightable.length || typeof this.label == "string" && this.highlightable.push(this.label), !this.filtrable.length)
        throw new Error('Sorry but you have to specify at least one property in the "filtrable" item property...');
      this._baseTemplates = ({ type: e, item: t, $items: n, html: i }) => {
        switch (e) {
          case "item":
            return i`
            ${gi(typeof this.label == "function" ? Bt(this.label({ item: t })) : Bt(t[this.label]))}
          `;
          case "group":
            return i` <div class="${this.cls("_group-label")}">
              <span class="${this.cls("_group-label-inner")}">
                ${Bt(t.label)}
              <span>
            </div>
            <div class="${this.cls("_group-items")}">
              <ul class="${this.cls("_group-items-inner")}">${n}</ul>
          </div>`;
          case "empty":
            return i` <div>${Bt(this.emptyText)}</div> `;
          case "loading":
            return i`
            <div class="${this.cls("_loading")}">
              ${Bt(this.loadingText)}
            </div>
          `;
        }
      }, this._grabTemplatesFromDom(), this._initListeners(), ff(this) && setTimeout(() => {
        this.focus();
      });
    });
  }
  updated(e) {
    e.has("_isLoading") && (this._isLoading ? this.dispatch("loading") : this.dispatch("loaded")), this._filterValue ? this.classList.add("-filtered") : this.classList.remove("-filtered"), this._isLoading ? this.classList.add("-loading") : this.classList.remove("-loading"), this._filteredItems.length ? this.classList.remove("-empty") : this.classList.add("-empty"), this.inline ? this.classList.add("-inline") : this.classList.remove("-inline");
  }
  firstUpdated() {
    return jn(this, void 0, void 0, function* () {
      var e, t;
      this._$input = (e = this.querySelector("input")) !== null && e !== void 0 ? e : document.createElement("input"), !((t = this._$input) === null || t === void 0) && t.parentElement || this.appendChild(this._$input), this._$input.setAttribute("autocomplete", "off"), this._$form = this._$input.form, this.addEventListenerOn(this._$input, "keydown", (n) => {
        n.key === "Escape" && n.preventDefault();
      }), this.addEventListenerOn(this._$form, "submit", (n) => {
        this.isActive() && n.preventDefault();
      }), this.addEventListenerOn(this._$input, "keydown", (n) => jn(this, void 0, void 0, function* () {
        if (!this.isActive() || this._filterValue === n.target.value)
          return;
        this.resetPreselected(), this.resetSelected();
        const i = n.target.value;
        this._filterValue = i, this._displayedMaxItems = this.maxItems, typeof this.items == "function" ? yield this.refreshItems() : this._filterItems();
      })), this.addEventListenerOn(this._$input, "focus", (n) => {
        if (!this.isActive())
          return;
        const i = n.target.value;
        this._filterValue = i, this._open(), this._updateListSizeAndPosition();
      }), this._$input.classList.add(...this.cls("_input")), this.classes.input && this._$input.classList.add(this.classes.input), this._$container = this, this._$container.classList.add(...this.cls()), this.classes.container && this._$container.classList.add(this.classes.container), this._$list = this.querySelector("ul"), this._$dropdown = this.querySelector(`.${this.internalCls("_dropdown")}`), this.addEventListenerOn(document, "scroll", () => {
        this._updateListSizeAndPosition();
      }), this._updateListSizeAndPosition(), Lu(this._$list, () => {
        var n;
        this.maxItems !== -1 && (this._displayedMaxItems = ((n = this._displayedMaxItems) !== null && n !== void 0 ? n : 0) + this.maxItems, this._filterItems());
      }), this.addEventListenerOn(document, "keyup", (n) => {
        var i;
        if (!this.isActive() || !this._filteredItems.length)
          return;
        const s = {
          ArrowDown: "bottom",
          ArrowUp: "top",
          ArrowLeft: "left",
          ArrowRight: "right"
        };
        if (!s[n.key])
          return;
        this._isArrowUsed = !0, clearTimeout(this._isArrowUsedTimeout), this._isArrowUsedTimeout = setTimeout(() => {
          this._isArrowUsed = !1;
        }, 100);
        const a = this.querySelectorAll(`.${this.internalCls("_item")}.-match`), f = this.querySelector(`.${this.internalCls("_item")}.-preselected`) || this.querySelector(`.${this.internalCls("_item")}.-selected`) || this.querySelectorAll(`.${this.internalCls("_item")}`)[0];
        if (this.getPreselectedItem()) {
          let l = Yu(f, a, {
            direction: s[n.key]
          });
          if (!l)
            return;
          const c = l.dataset.id;
          c && this.preselect(c, {
            scrollIntoView: !0
          });
        } else {
          const l = (i = a[0]) === null || i === void 0 ? void 0 : i.dataset.id;
          l && this.preselect(l, {
            scrollIntoView: !0
          });
        }
      }), this.addEventListenerOn(document, "keyup", (n) => {
        n.key === "Enter" && (n.preventDefault(), this.isActive() && this.select());
      }), this._filterValue && this.setSearch(this._filterValue), this._$input.value && (this._filterValue = this._$input.value), this.inline && this.refreshItems();
    });
  }
  _initListeners() {
    this.hotkey && Cr(this.hotkey, () => {
      this.focus();
    });
  }
  _grabTemplatesFromDom() {
    this.querySelectorAll("template").forEach((e) => {
      e.hasAttribute("type") && (this._templatesFromHtml[e.getAttribute("type")] = e.innerHTML);
    });
  }
  _renderTemplate(e) {
    const t = Object.assign({ type: "item", item: null, $items: [], html: G, unsafeHTML: gi, idx: 0 }, e);
    if (this.templates) {
      const n = this.templates(t);
      if (n)
        return n;
    }
    return this._templatesFromHtml[t.type] ? G` ${gi(this._templatesFromHtml[t.type])} ` : this._baseTemplates(t);
  }
  /**
   * @name          preselect
   * @type          Function
   *
   * Preselect an item in the dropdown
   *
   * @param       {String|TAdvancedSelectElementItem}        item        The item to preselect. Can be a string that represent the id of the item, or the item itself
   * @param       {Object}        [settings={}]           Some settings to configure your preselection
   *
   * @since       1.0.0
   */
  preselect(e, t) {
    typeof e == "string" && (e = this.getItemById(e));
    const n = this.getPreselectedItem();
    if (n && (n.state.preselected = !1), !this.notSelectable && e.state.match) {
      if (t != null && t.scrollIntoView) {
        const i = this.getItemDomElement(e);
        i && i.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }
      e.state.preselected = !0, t != null && t.preventFocus || setTimeout(() => {
        this.focus();
      }), this.requestUpdate();
    }
  }
  /**
   * @name        resetPreselected
   * @type        Function
   *
   * Reset the preselected item
   *
   * @since       1.0.0
   */
  resetPreselected() {
    const e = this.getPreselectedItem();
    e && (e.state.preselected = !1);
  }
  /**
   * @name        setSearch
   * @type        Function
   *
   * Set the search value and refresh items accordingly
   *
   * @param       {String}        value       The value to set
   *
   * @since       1.0.0
   */
  setSearch(e) {
    return jn(this, void 0, void 0, function* () {
      console.log("setSearch", e), this._$input.value = e, this._filterValue = e, yield this.refreshItems(), this.requestUpdate();
    });
  }
  /**
   * @name       select
   * @type       Function
   *
   * Select an item in the dropdown
   *
   * @param       {String|TAdvancedSelectElementItem}        item        The item to select. Can be a string that represent the id of the item, or the item itself
   *
   * @since       1.0.0
   */
  select(e = this.getPreselectedItem()) {
    typeof e == "string" && (e = this.getItemById(e));
    const t = this.getPreselectedItem();
    t && (t.state.preselected = !1);
    const n = this.getSelectedItem();
    n && (n.state.selected = !1), !this.notSelectable && e.state.match && (e.state.selected = !0, setTimeout(() => {
      var i;
      e.preventSet ? this.setSearch("") : this.setSearch((i = e.value) !== null && i !== void 0 ? i : e.id), e.preventClose && this.focus();
    }), e.preventClose || this._close(), e.preventSelect || (console.log("dispatch select", e), this.dispatch("select", {
      detail: {
        item: e,
        $elm: this.querySelector(`.${this.internalCls("_item")}[data-internal-id="${e._internalId}"]`)
      }
    })), this.requestUpdate());
  }
  resetSelected() {
    const e = this.getSelectedItem();
    e && (e.state.selected = !1);
  }
  getItemDomElement(e) {
    return this.querySelector(`.${this.internalCls("_item")}[data-id="${e.id}"]`);
  }
  /**
   * @name        reset
   * @type        Function
   *
   * Reset the advanced select (preselected, selected, search, etc...)
   *
   * @since       1.0.0
   */
  reset() {
    this.resetPreselected(), this.resetSelected(), this.setSearch(""), this.dispatch("reset");
  }
  /**
   * @name        getItemById
   * @type        Function
   *
   * Get an item by it's id
   *
   * @param       {String}        id        The id of the item to get
   * @return      {TAdvancedSelectElementItem}        The item found
   *
   * @since       1.0.0
   */
  getItemById(e) {
    return this._filteredItems.find((t) => t.id === e);
  }
  /**
   * @name       getPreselectedItem
   * @type       Function
   *
   * Get the preselected item
   *
   * @return      {TAdvancedSelectElementItem}        The preselected item
   *
   * @since       1.0.0
   */
  getPreselectedItem() {
    return this._filteredItems.find((e) => e.state.preselected);
  }
  /**
   * @name        getSelectedItem
   * @type        Function
   *
   * Get the selected item
   *
   * @return      {TAdvancedSelectElementItem}        The selected item
   *
   * @since       1.0.0
   */
  getSelectedItem() {
    return this._filteredItems.find((e) => e.state.selected);
  }
  /**
   * @name        getMatchItems
   * @type        Function
   *
   * Get the items that match the search
   *
   * @return      {TAdvancedSelectElementItem[]}        The items that match the search
   *
   * @since       1.0.0
   */
  getMatchItems() {
    return this._filteredItems.filter((e) => e.state.match);
  }
  _open() {
    return jn(this, void 0, void 0, function* () {
      Zc(() => {
        this.isActive() && (this.reset(), this._close());
      }), this.dispatch("open"), yield this.refreshItems();
    });
  }
  _close() {
    var e;
    (e = document.activeElement) === null || e === void 0 || e.blur(), this.dispatch("close");
  }
  /**
   * @name        focus
   * @type        Function
   *
   * Focus the input and open the dropdown
   *
   * @since       1.0.0
   */
  focus() {
    this._$input.focus();
  }
  /**
   * @name       blur
   * @type       Function
   *
   * Blur the input and close the dropdown
   *
   * @since       1.0.0
   */
  blur() {
    this._$input.blur(), this._close();
  }
  /**
   * @name        refreshItems
   * @type        Function
   *
   * Refresh the items in the dropdown
   *
   * @since       1.0.0
   */
  refreshItems() {
    return jn(this, void 0, void 0, function* () {
      if (clearTimeout(this._isLoadingTimeout), this._isLoadingTimeout = setTimeout(() => {
        this._isLoading = !0;
      }, 100), this.items) {
        if (typeof this.items == "string")
          try {
            this._items = JSON.parse(this.items);
          } catch {
            const n = document.querySelector(this.items);
            n && (this._items = JSON.parse(n.innerHTML.trim()));
          }
        else typeof this.items == "function" ? this._items = yield this.items({
          search: this._filterValue,
          items: this._items
        }) : this._items = this.items;
        this.dispatch("items", {
          detail: {
            items: this._items
          }
        });
      }
      this._initItems(this._items), yield this._filterItems(), clearTimeout(this._isLoadingTimeout), this._isLoading = !1;
      const e = this.querySelector(`.${this.internalCls("_item")}.-selected`);
      if (e) {
        this.preselect(e == null ? void 0 : e.dataset.id, {
          preventFocus: !0,
          scrollIntoView: !0
        });
        return;
      } else
        this._filteredItems.length && this.preselect(this._filteredItems[0], {
          preventFocus: !0,
          scrollIntoView: !0
        });
    });
  }
  _initItems(e) {
    return e.map((t) => (t.items && (t.items = this._initItems(t.items)), this._initItem(t)));
  }
  _initItem(e) {
    if (e.type !== "group")
      return e.state || (e.state = {
        match: !0,
        preselected: !1,
        selected: !1
      }), e.id || (e.id = Lr()), e.type || (e.type = "item"), e;
  }
  _getItemsOnly() {
    const e = [];
    return this._items.forEach((t) => {
      var n;
      t.type == "group" ? (n = t.items) === null || n === void 0 || n.forEach((i) => {
        e.push(i);
      }) : e.push(t);
    }), e;
  }
  _filterItems() {
    return jn(this, void 0, void 0, function* () {
      if (this._filterValue && this._filterValue.length < this.minChars)
        return;
      this._isLoading = !0;
      const e = this._getItemsOnly();
      let t = this._filterValue;
      this.filterValuePreprocess && (t = this.filterValuePreprocess(t)), t = pf(t);
      let n = e;
      if (this.filterItems)
        n = yield this.filterItems(n, t, this);
      else {
        if (!this.filtrable.length)
          return !0;
        n = n.filter((i) => {
          let s = !1;
          for (let a = 0; a < Object.keys(i).length; a++) {
            const f = Object.keys(i)[a];
            if (typeof i[f] != "string")
              continue;
            const d = Uh(i[f]);
            if (i._original || Object.defineProperty(i, "_original", {
              value: {},
              writable: !0,
              configurable: !1,
              enumerable: !1
            }), i._original[f] || (i._original[f] = i[f]), this.filtrable.indexOf(f) !== -1) {
              const l = t.split(" ").map((u) => u.replace(/[^a-zA-Z0-9 ]/g, "").trim()).filter((u) => u !== ""), c = new RegExp(`${t}`.split(" ").map((u) => u.replace(/[^a-zA-Z0-9 ]+/g, "").trim()).join("|"), "gi");
              if (d.match(c))
                if (s = !0, this.highlightable.includes(f) && t && t !== "") {
                  let u = i._original[f];
                  u = gf(u, l, {
                    class: this.cls("_highlight").join(" ")
                  }), i[f] = u;
                } else
                  i[f] = i._original[f];
              else
                i[f] = i._original[f];
            }
          }
          return i.state.match = s, s;
        });
      }
      this._filteredItems = n, this._isLoading = !1;
    });
  }
  /**
   * Maintain the dropdown position and size
   */
  _updateListSizeAndPosition() {
    if (!this.isActive() || this.inline || !this._$dropdown)
      return;
    const e = Wo(this._$dropdown, "marginTop"), t = Wo(this._$dropdown, "marginBottom"), n = hu(this._$input), i = fu(this._$input) - this._$input.clientHeight;
    let s;
    n > i ? (this._$container.classList.add("-top"), this._$dropdown.style.top = "auto", this._$dropdown.style.bottom = `calc(100% - ${t})`, s = n - parseInt(e)) : (this._$container.classList.remove("-top"), this._$dropdown.style.bottom = "auto", this._$dropdown.style.top = `calc(100% - ${e})`, s = i - parseInt(t)), this._$dropdown.style.maxHeight = `${s}px`;
  }
  /**
   * This function just remove a keyword from the input and filter the items again
   */
  _removeKeyword(e) {
    const t = this._filterValue.split(" ").filter((n) => n !== e).join(" ");
    this.setSearch(t);
  }
  _renderItems(e, t = !1) {
    return G`${e.map((n, i) => this._renderItem(n, i, t))}`;
  }
  _renderItem(e, t, n = !1) {
    var i, s, a, f;
    if (this._currentItemIdx++, e._internalId || Object.defineProperty(e, "_internalId", {
      value: `s-${Lr()}`,
      writable: !1,
      enumerable: !1,
      configurable: !1
    }), !(this.maxItems !== -1 && this._currentItemIdx > this._displayedMaxItems))
      return G`
      <li
        data-id="${e.id}"
        data-internal-id="${e._internalId}"
        @pointerup=${() => this.select(e)}
        @mouseover=${() => {
        this._isArrowUsed || (this.preselect(e), this.requestUpdate());
      }}
        style="z-index: ${999999999 - t}"
        tabindex="-1"
        class="${this.cls("_item")} ${this.classes.item} ${n ? this.cls("_group-item") : ""} ${!((i = e.state) === null || i === void 0) && i.selected ? "-selected" : ""} ${!((s = e.state) === null || s === void 0) && s.preselected ? "-preselected" : ""} ${this._filterValue ? "-filtered" : ""} ${!((a = e.state) === null || a === void 0) && a.match ? "-match" : ""}"
      >
        ${this._renderTemplate({
        type: (f = e.type) !== null && f !== void 0 ? f : "item",
        item: e,
        idx: t
      })}
      </li>
    `;
  }
  render() {
    this._currentItemIdx = 0;
    const e = this._renderTemplate({
      type: "before"
    }), t = this._renderTemplate({
      type: "after"
    }), n = this._renderTemplate({
      type: "empty"
    });
    return G`
      <div class="${this.cls("_dropdown")} ${this.classes.dropdown}">
        ${e ? G`
              <div
                class="${this.cls("_before")} ${this.classes.before}"
                tabindex="-1"
              >
                ${e}
              </div>
            ` : ""}
        ${this._$input && this._$input.value && this.showKeywords ? G`
              <div
                tabindex="-1"
                class="${this.cls("_keywords")} ${this.classes.keywords}"
              >
                ${this._$input.value.split(" ").filter((i) => i !== "").map((i) => G`
                      <span
                        tabindex="-1"
                        @click=${() => this._removeKeyword(i)}
                        class="${this.cls("_keyword")}"
                        >${Bt(i)}</span
                      >
                    `)}
              </div>
            ` : ""}
        <ul class="${this.cls("_items")} ${this.classes.items}">
          ${this._isLoading ? G`
                <li class="${this.classes.item} ${this.cls("_loading")}">
                  ${this._renderTemplate({
      type: "loading"
    })}
                </li>
              ` : !this._isLoading && this._filteredItems.length <= 0 && n ? G`
                <li class="${this.classes.item} ${this.cls("_empty")}">
                  ${n}
                </li>
              ` : this._isLoading ? "" : this._items.map((i, s) => {
      var a, f, d, l;
      switch (i.type) {
        case "group":
          const c = this._renderItems((a = i.items) !== null && a !== void 0 ? a : [], !0);
          return G`
                      <li
                        class="${this.classes.group} ${this.cls("_group")}"
                        group="${(l = (d = (f = i[this.label]) !== null && f !== void 0 ? f : i.label) !== null && d !== void 0 ? d : i.title) !== null && l !== void 0 ? l : i.name}"
                      >
                        ${this._renderTemplate({
            type: "group",
            $items: c,
            item: i
          })}
                      </li>
                    `;
        default:
          return G` ${this._renderItem(i, s)} `;
      }
    })}
        </ul>
        ${t ? G`
              <div
                class="${this.cls("_after")} ${this.classes.after}"
                tabindex="-1"
              >
                ${t}
              </div>
            ` : ""}
      </div>
    `;
  }
}
Me([
  fr()
], Te.prototype, "_filterValue", void 0);
Me([
  fr()
], Te.prototype, "_items", void 0);
Me([
  fr()
], Te.prototype, "_filteredItems", void 0);
Me([
  fr()
], Te.prototype, "_isLoading", void 0);
Me([
  Q()
], Te.prototype, "items", void 0);
Me([
  Q()
], Te.prototype, "value", void 0);
Me([
  Q()
], Te.prototype, "label", void 0);
Me([
  Q({ type: Boolean })
], Te.prototype, "showKeywords", void 0);
Me([
  Q({ type: String })
], Te.prototype, "emptyText", void 0);
Me([
  Q({ type: String })
], Te.prototype, "loadingText", void 0);
Me([
  Q({ type: Function })
], Te.prototype, "filterValuePreprocess", void 0);
Me([
  Q({ type: String })
], Te.prototype, "hotkey", void 0);
Me([
  Q({ type: Function })
], Te.prototype, "filterItems", void 0);
Me([
  Q({ type: Number })
], Te.prototype, "minChars", void 0);
Me([
  Q({ type: Array })
], Te.prototype, "filtrable", void 0);
Me([
  Q({ type: Array })
], Te.prototype, "highlightable", void 0);
Me([
  Q({ type: Object })
], Te.prototype, "templates", void 0);
Me([
  Q({ type: Number })
], Te.prototype, "closeTimeout", void 0);
Me([
  Q({ type: Boolean })
], Te.prototype, "notSelectable", void 0);
Me([
  Q({ type: Number })
], Te.prototype, "maxItems", void 0);
Me([
  Q({ type: Object })
], Te.prototype, "classes", void 0);
Me([
  Q({ type: Boolean })
], Te.prototype, "inline", void 0);
function ma(r) {
  var e;
  return !((e = navigator == null ? void 0 : navigator.clipboard) === null || e === void 0) && e.writeText ? navigator.clipboard.writeText(r) : Promise.reject("The Clipboard API is not available.");
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kh = (r) => r.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yi = (r, e) => {
  var n;
  const t = r._$AN;
  if (t === void 0) return !1;
  for (const i of t) (n = i._$AO) == null || n.call(i, e, !1), yi(i, e);
  return !0;
}, ns = (r) => {
  let e, t;
  do {
    if ((e = r._$AM) === void 0) break;
    t = e._$AN, t.delete(r), r = e;
  } while ((t == null ? void 0 : t.size) === 0);
}, Yc = (r) => {
  for (let e; e = r._$AM; r = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(r)) break;
    t.add(r), Xh(e);
  }
};
function Zh(r) {
  this._$AN !== void 0 ? (ns(this), this._$AM = r, Yc(this)) : this._$AM = r;
}
function Jh(r, e = !1, t = 0) {
  const n = this._$AH, i = this._$AN;
  if (i !== void 0 && i.size !== 0) if (e) if (Array.isArray(n)) for (let s = t; s < n.length; s++) yi(n[s], !1), ns(n[s]);
  else n != null && (yi(n, !1), ns(n));
  else yi(this, r);
}
const Xh = (r) => {
  r.type == Jc.CHILD && (r._$AP ?? (r._$AP = Jh), r._$AQ ?? (r._$AQ = Zh));
};
class Qh extends Qc {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, n) {
    super._$AT(e, t, n), Yc(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    var n, i;
    e !== this.isConnected && (this.isConnected = e, e ? (n = this.reconnected) == null || n.call(this) : (i = this.disconnected) == null || i.call(this)), t && (yi(this, e), ns(this));
  }
  setValue(e) {
    if (Kh(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
class Yh extends Qh {
  constructor() {
    super(...arguments), this.prevData = {};
  }
  render(e) {
    return Ae;
  }
  update(e, [t]) {
    var n;
    this.element !== e.element && (this.element = e.element), this.host = ((n = e.options) === null || n === void 0 ? void 0 : n.host) || this.element, this.apply(t), this.groom(t), this.prevData = { ...t };
  }
  apply(e) {
    if (!e)
      return;
    const { prevData: t, element: n } = this;
    for (const i in e) {
      const s = e[i];
      s !== t[i] && (n[i] = s);
    }
  }
  groom(e) {
    const { prevData: t, element: n } = this;
    if (t)
      for (const i in t)
        (!e || !(i in e) && n[i] === t[i]) && (n[i] = void 0);
  }
}
class ed extends Yh {
  constructor() {
    super(...arguments), this.eventData = {};
  }
  apply(e) {
    if (e)
      for (const t in e) {
        const n = e[t];
        n !== this.eventData[t] && this.applyEvent(t, n);
      }
  }
  applyEvent(e, t) {
    const { prevData: n, element: i } = this;
    this.eventData[e] = t, n[e] && i.removeEventListener(e, this, t), i.addEventListener(e, this, t);
  }
  groom(e) {
    const { prevData: t, element: n } = this;
    if (t)
      for (const i in t)
        (!e || !(i in e) && n[i] === t[i]) && this.groomEvent(i, t[i]);
  }
  groomEvent(e, t) {
    const { element: n } = this;
    delete this.eventData[e], n.removeEventListener(e, this, t);
  }
  handleEvent(e) {
    const t = this.eventData[e.type];
    typeof t == "function" ? t.call(this.host, e) : t.handleEvent(e);
  }
  disconnected() {
    const { eventData: e, element: t } = this;
    for (const n in e) {
      const i = n.slice(1), s = e[n];
      t.removeEventListener(i, this, s);
    }
  }
  reconnected() {
    const { eventData: e, element: t } = this;
    for (const n in e) {
      const i = n.slice(1), s = e[n];
      t.addEventListener(i, this, s);
    }
  }
}
class td extends ed {
  apply(e) {
    if (!e)
      return;
    const { prevData: t, element: n } = this;
    for (const i in e) {
      const s = e[i];
      if (s === t[i])
        continue;
      const a = i.slice(1);
      switch (i[0]) {
        case "@":
          this.eventData[a] = s, this.applyEvent(a, s);
          break;
        case ".":
          n[a] = s;
          break;
        case "?":
          s ? n.setAttribute(a, "") : n.removeAttribute(a);
          break;
        default:
          s != null ? n.setAttribute(i, String(s)) : n.removeAttribute(i);
          break;
      }
    }
  }
  groom(e) {
    const { prevData: t, element: n } = this;
    if (t)
      for (const i in t) {
        const s = i.slice(1);
        if (!e || !(i in e) && n[s] === t[i])
          switch (i[0]) {
            case "@":
              this.groomEvent(s, t[i]);
              break;
            case ".":
              n[s] = void 0;
              break;
            case "?":
              n.removeAttribute(s);
              break;
            default:
              n.removeAttribute(i);
              break;
          }
      }
  }
}
const rd = Xc(td), nd = {
  // validation errors
  AdditionalItemsError: "Array at `{{pointer}}` may not have an additional item `{{key}}`",
  AdditionalPropertiesError: "Additional property `{{property}}` on `{{pointer}}` does not match schema `{{schema}}`",
  AllOfError: "Value `{{value}}` at `{{pointer}}` does not match schema of `{{allOf}}`",
  AnyOfError: "Value `{{value}}` at `{{pointer}}` does not match any schema of `{{anyOf}}`",
  ConstError: "Expected value at `{{pointer}}` to be `{{expected}}`, but value given is `{{value}}`",
  containsAnyError: "The array at `{{pointer}}` must contain at least one item",
  ContainsArrayError: "The property at `{{pointer}}` must not be an array",
  ContainsError: "The array at `{{pointer}}` must contain an element that matches `{{schema}}`",
  ContainsMinError: "The array at `{{pointer}}` contains {{delta}} too few items matching `{{schema}}`",
  ContainsMaxError: "The array at `{{pointer}}` contains {{delta}} too many items matching `{{schema}}`",
  EnumError: "Expected given value `{{value}}` in `{{pointer}}` to be one of `{{values}}`",
  ForbiddenPropertyError: "Property name `{{property}}` at `{{pointer}}` is not allowed",
  FormatDateError: "Value `{{value}}` at `{{pointer}}` is not a valid date",
  FormatDateTimeError: "Value `{{value}}` at `{{pointer}}` is not a valid date-time",
  FormatDurationError: "Value `{{value}}` at `{{pointer}}` is not a valid duration",
  FormatEmailError: "Value `{{value}}` at `{{pointer}}` is not a valid email",
  FormatHostnameError: "Value `{{value}}` at `{{pointer}}` is not a valid hostname",
  FormatIPV4Error: "Value `{{value}}` at `{{pointer}}` is not a valid IPv4 address",
  FormatIPV4LeadingZeroError: "IPv4 addresses starting with zero are invalid, since they are interpreted as octals",
  FormatIPV6Error: "Value `{{value}}` at `{{pointer}}` is not a valid IPv6 address",
  FormatIPV6LeadingZeroError: "IPv6 addresses starting with zero are invalid, since they are interpreted as octals",
  FormatJsonPointerError: "Value `{{value}}` at `{{pointer}}` is not a valid json-pointer",
  FormatRegExError: "Value `{{value}}` at `{{pointer}}` is not a valid regular expression",
  FormatTimeError: "Value `{{value}}` at `{{pointer}}` is not a valid time",
  FormatURIError: "Value `{{value}}` at `{{pointer}}` is not a valid uri",
  FormatURIReferenceError: "Value `{{value}}` at `{{pointer}}` is not a valid uri-reference",
  FormatURITemplateError: "Value `{{value}}` at `{{pointer}}` is not a valid uri-template",
  FormatURLError: "Value `{{value}}` at `{{pointer}}` is not a valid url",
  FormatUUIDError: "Value `{{value}}` at `{{pointer}}` is not a valid uuid",
  InvalidDataError: "No value may be specified in `{{pointer}}`",
  InvalidPropertyNameError: "Invalid property name `{{property}}` at `{{pointer}}`",
  MaximumError: "Value in `{{pointer}}` is `{{length}}`, but should be `{{maximum}}` at maximum",
  MaxItemsError: "Too many items in `{{pointer}}`, should be `{{maximum}}` at most, but got `{{length}}`",
  MaxLengthError: "Value `{{pointer}}` should have a maximum length of `{{maxLength}}`, but got `{{length}}`.",
  MaxPropertiesError: "Too many properties in `{{pointer}}`, should be `{{maximum}}` at most, but got `{{length}}`",
  MinimumError: "Value in `{{pointer}}` is `{{length}}`, but should be `{{minimum}}` at minimum",
  MinItemsError: "Too few items in `{{pointer}}`, should be at least `{{minItems}}`, but got `{{length}}`",
  MinItemsOneError: "At least one item is required in `{{pointer}}`",
  MinLengthError: "Value `{{pointer}}` should have a minimum length of `{{minLength}}`, but got `{{length}}`.",
  MinLengthOneError: "A value is required in `{{pointer}}`",
  MinPropertiesError: "Too few properties in `{{pointer}}`, should be at least `{{minimum}}`, but got `{{length}}`",
  MissingDependencyError: "The required propery '{{missingProperty}}' in `{{pointer}}` is missing",
  MissingOneOfPropertyError: "Value at `{{pointer}}` property: `{{property}}`",
  MultipleOfError: "Expected `{{value}}` in `{{pointer}}` to be multiple of `{{multipleOf}}`",
  MultipleOneOfError: "Value `{{value}}` should not match multiple schemas in oneOf `{{matches}}`",
  NoAdditionalPropertiesError: "Additional property `{{property}}` in `{{pointer}}` is not allowed",
  NotError: "Value `{{value}}` at pointer should not match schema `{{not}}`",
  OneOfError: "Value `{{value}}` in `{{pointer}}` does not match any given oneof schema",
  OneOfPropertyError: "Failed finding a matching oneOfProperty schema in `{{pointer}}` where `{{property}}` matches `{{value}}`",
  PatternError: "Value in `{{pointer}}` should match `{{description}}`, but received `{{received}}`",
  PatternPropertiesError: "Property `{{key}}` does not match any patterns in `{{pointer}}`. Valid patterns are: {{patterns}}",
  RequiredPropertyError: "The required property `{{key}}` is missing at `{{pointer}}`",
  SchemaWarning: "Failed retrieving a schema from '{{pointer}}' to key '{{key}}'",
  TypeError: "Expected `{{value}}` ({{received}}) in `{{pointer}}` to be of type `{{expected}}`",
  UndefinedValueError: "Value must not be undefined in `{{pointer}}`",
  UnevaluatedPropertyError: "Invalid unevaluated property `{{pointer}}`",
  UnevaluatedItemsError: "Invalid unevaluated item `{{pointer}}`",
  UniqueItemsError: "Items in array must be unique. Value `{{value}}` in `{{pointer}}` is a duplicate of {{duplicatePointer}}.",
  UnknownPropertyError: "Could not find a valid schema for property `{{pointer}}` within object",
  ValueNotEmptyError: "A value for `{{property}}` is required at `{{pointer}}`"
}, id = Object.prototype.toString;
function ce(r) {
  const e = id.call(r).match(/\s([^\]]+)\]/).pop().toLowerCase();
  return e === "file" ? "object" : e;
}
const sd = "object", od = "array";
function ad(r, e = {}) {
  return r.replace(/\{\{\w+\}\}/g, (t) => {
    const n = t.replace(/[{}]/g, ""), i = e[n], s = ce(i);
    return s === sd || s === od ? JSON.stringify(i) : i;
  });
}
function cd(r, e, t = r) {
  var n;
  const i = (n = nd[r]) !== null && n !== void 0 ? n : t;
  return ad(i, e);
}
function ld(r) {
  return r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function ud(r, e) {
  return {
    type: "error",
    name: r,
    code: ld(r),
    message: cd(r, e),
    data: e
  };
}
function q(r) {
  return ud.bind(null, r);
}
function Ei(r, e = []) {
  for (let t = 0; t < r.length; t += 1) {
    const n = r[t];
    Array.isArray(n) ? Ei(n, e) : e.push(n);
  }
  return e;
}
const Ci = {
  DECLARATOR_ONEOF: "oneOfProperty",
  GET_TEMPLATE_RECURSION_LIMIT: 1,
  propertyBlacklist: ["_id"],
  templateDefaultOptions: {
    addOptionalProps: !1,
    removeInvalidData: !1,
    extendDefaults: !0
  }
};
function Fe(r) {
  return (r == null ? void 0 : r.type) === "error";
}
function fd(r) {
  return r instanceof Promise;
}
function is(r) {
  return Fe(r) || fd(r);
}
function ge(r) {
  return ce(r) === "object";
}
const { DECLARATOR_ONEOF: Xn } = Ci;
function hd(r, e) {
  const { schema: t, draft: n, pointer: i } = r;
  if (e != null && t[Xn]) {
    const f = [], d = t[Xn], l = e[t[Xn]];
    if (l === void 0)
      return n.errors.missingOneOfPropertyError({
        property: d,
        pointer: i,
        schema: t,
        value: e
      });
    for (let c = 0; c < t.oneOf.length; c += 1) {
      const u = r.next(t.oneOf[c]).resolveRef(), h = n.step(u, d, e);
      if (Fe(h))
        return h;
      let p = Ei(n.validate(h, l));
      if (p = p.filter(is), p.length > 0)
        f.push(...p);
      else
        return h.next(u.schema);
    }
    return n.errors.oneOfPropertyError({
      property: d,
      value: l,
      pointer: i,
      schema: t,
      errors: f
    });
  }
  const s = [], a = [];
  for (let f = 0; f < t.oneOf.length; f += 1) {
    const d = n.resolveRef(r.next(t.oneOf[f]));
    let l = Ei(n.validate(d, e));
    l = l.filter(is), l.length > 0 ? a.push(...l) : s.push({ index: f, schema: d.schema });
  }
  return s.length === 1 ? r.next(s[0].schema) : s.length > 1 ? n.errors.multipleOneOfError({
    value: e,
    pointer: i,
    schema: t,
    matches: s
  }) : n.errors.oneOfError({
    value: JSON.stringify(e),
    pointer: i,
    schema: t,
    oneOf: t.oneOf,
    errors: a
  });
}
function dd(r, e) {
  const { draft: t, schema: n, pointer: i } = r;
  if (e == null || n.properties == null)
    return -1;
  let s = 0;
  const a = Object.keys(n.properties);
  for (let f = 0; f < a.length; f += 1) {
    const d = a[f];
    e[d] && t.isValid(e[d], n.properties[d], i) && (s += 1);
  }
  return s;
}
function go(r, e) {
  const { schema: t, pointer: n, draft: i } = r;
  if (!Array.isArray(t.oneOf))
    throw new Error("not a oneof schema");
  if (e != null && t[Xn]) {
    const a = [], f = t[Xn], d = e[t[Xn]];
    if (d === void 0)
      return i.errors.missingOneOfPropertyError({
        property: f,
        pointer: n,
        schema: t,
        value: e
      });
    for (let l = 0; l < t.oneOf.length; l += 1) {
      const c = i.resolveRef(r.next(t.oneOf[l])), u = i.step(c, f, e);
      if (Fe(u))
        return u;
      let h = Ei(i.validate(u, d));
      if (h = h.filter(is), h.length > 0)
        a.push(...h);
      else
        return u.next(c.schema);
    }
    return i.errors.oneOfPropertyError({
      property: f,
      value: d,
      pointer: n,
      schema: t,
      errors: a
    });
  }
  const s = [];
  for (let a = 0; a < t.oneOf.length; a += 1) {
    const d = i.resolveRef(r.next(t.oneOf[a])).schema;
    i.isValid(e, d, n) && s.push({ schema: d, index: a });
  }
  if (s.length === 1)
    return r.next(s[0].schema);
  if (ge(e)) {
    let a, f = 0;
    for (let d = 0; d < t.oneOf.length; d += 1) {
      const l = i.resolveRef(r.next(t.oneOf[d])), c = dd(l, e);
      f < c && (f = c, a = l.schema);
    }
    return a === void 0 ? i.errors.oneOfError({
      value: JSON.stringify(e),
      pointer: n,
      schema: t,
      oneOf: t.oneOf
    }) : r.next(a);
  }
  return s.length > 1 ? i.errors.multipleOneOfError({ matches: s, pointer: n, schema: t, value: e }) : i.errors.oneOfError({
    value: JSON.stringify(e),
    pointer: n,
    schema: t,
    oneOf: t.oneOf
  });
}
const pd = (r, e) => {
  if (Array.isArray(r.schema.oneOf)) {
    const t = r.draft.resolveOneOf(r, e);
    if (Fe(t))
      return t;
  }
};
function Pt(r, e, ...t) {
  if ((e == null ? void 0 : e.type) === "error")
    return e;
  if ((r == null ? void 0 : r.type) === "error")
    return r;
  const n = ce(r), i = ce(e);
  if (n !== i)
    return r;
  const s = Bi(r, e);
  for (let a = 0; a < t.length; a += 1)
    delete s[t[a]];
  return s;
}
function Bi(r, e, t) {
  var n;
  if (ge(r) && ge(e)) {
    const i = {};
    return [...Object.keys(r), ...Object.keys(e)].filter((s, a, f) => f.indexOf(s) === a).forEach((s) => i[s] = Bi(r[s], e[s], s)), i;
  }
  if (Array.isArray(r) && Array.isArray(e)) {
    if (t === "required")
      return r.concat(e).filter((a, f, d) => d.indexOf(a) === f);
    if (t === "items") {
      const a = [];
      for (let f = 0; f < e.length; f += 1)
        ge(r[f]) && ge(e[f]) && r[f].type === e[f].type ? a[f] = Bi(r[f], e[f]) : a.push((n = e[f]) !== null && n !== void 0 ? n : r[f]);
      return a;
    }
    const i = [], s = [];
    for (let a = 0; a < Math.max(r.length, e.length); a += 1)
      ge(r[a]) && ge(e[a]) ? i[a] = Bi(r[a], e[a]) : r[a] !== void 0 && e[a] !== void 0 ? (i[a] = r[a], s.push(e[a])) : r[a] !== void 0 ? i[a] = r[a] : e[a] !== void 0 && s.push(e[a]);
    return [...i, ...s].filter((a, f, d) => d.indexOf(a) === f);
  }
  return Array.isArray(e) ? e : Array.isArray(r) ? r : e !== void 0 ? e : r;
}
function to(r, ...e) {
  const t = {};
  return Object.keys(r).forEach((n) => {
    e.includes(n) || (t[n] = r[n]);
  }), t;
}
function ds(r, e) {
  if (r.schema.if != null) {
    if (r.schema.if === !1)
      return r.next(r.schema.else);
    if (r.schema.if && (r.schema.then || r.schema.else)) {
      const t = r.draft.resolveRef(r.next(r.schema.if)), n = r.draft.validate(t, e);
      if (n.length === 0 && r.schema.then) {
        const i = r.next(r.schema.then);
        return r.draft.resolveRef(i);
      }
      if (n.length !== 0 && r.schema.else) {
        const i = r.next(r.schema.else);
        return r.draft.resolveRef(i);
      }
    }
  }
}
const md = (r, e) => {
  const t = ds(r, e);
  if (t)
    return r.draft.validate(t, e);
};
function el(r) {
  return { ...r };
}
function tl(r, e) {
  const t = ds(r, e);
  if (t)
    return t;
  const n = el(r.schema);
  return r.next(to(n, "if", "then", "else"));
}
function vd(r, e) {
  const { schema: t } = r;
  let n = el(t);
  for (let i = 0; i < t.allOf.length; i += 1) {
    const s = r.next(t.allOf[i]).resolveRef(), a = tl(s, e).schema;
    n = Pt(n, a);
  }
  return delete n.allOf, r.next(n);
}
function rl(r, e) {
  const { allOf: t } = e;
  if (!Array.isArray(t) || t.length === 0)
    return;
  let n = {};
  return t.forEach((i) => {
    if (i == null)
      return;
    const s = r.createNode(i).resolveRef();
    n = Pt(n, s.schema);
  }), n;
}
const gd = (r, e) => {
  const { draft: t, schema: n } = r, { allOf: i } = n;
  if (!Array.isArray(i) || i.length === 0)
    return;
  const s = [];
  return n.allOf.forEach((a) => {
    s.push(...t.validate(r.next(a), e));
  }), s;
};
function yd(r, ...e) {
  if (r == null)
    throw new Error("undefined schema");
  const t = this, n = Pt(t.schema, r, ...e);
  return { ...t, schema: n, path: [...t.path, t.schema] };
}
function _d() {
  const r = this;
  return r.draft.resolveRef(r);
}
function bd(r, e) {
  if (Fe(r))
    return r;
  if (r == null)
    throw new Error("undefined schema");
  if (!ge(r) && ce(r) !== "boolean")
    throw new Error(`bad schema type ${ce(r)}`);
  const t = this;
  return {
    ...t,
    pointer: e ? `${t.pointer}/${e}` : t.pointer,
    schema: r,
    path: [...t.path, t.schema]
  };
}
function lr(r) {
  return ge(r) && r.next && r.path && r.draft;
}
function $d(r, e, t = "#") {
  return { draft: r, pointer: t, schema: e, path: [], next: bd, merge: yd, resolveRef: _d };
}
function wd(r) {
  const e = r.path;
  let t = 0;
  for (let i = e.length - 1; i >= 0; i--)
    if (e[i].$id && /^https?:\/\//.test(e[i].$id) && e[i].$recursiveAnchor !== !0) {
      t = i;
      break;
    }
  const n = e.find((i, s) => s >= t && i.$recursiveAnchor === !0);
  if (n)
    return r.next(n);
  for (let i = e.length - 1; i >= 0; i--)
    if (e[i].$id)
      return r.next(e[i]);
  return r.next(r.draft.rootSchema);
}
function nl(r) {
  if (!lr(r))
    throw new Error("expected node");
  if (r.schema == null)
    return r;
  if (r.schema.$recursiveRef)
    return nl(wd(r));
  if (r.schema.$ref == null)
    return r;
  const e = r.draft.rootSchema.getRef(r.schema);
  return e === !1 ? r.next(e) : r.merge(e, "$ref");
}
function xd(r) {
  return r.filter((e, t) => r.indexOf(e) === t);
}
function il(r, e) {
  var t;
  const { schema: n } = r, i = (t = n.dependencies) !== null && t !== void 0 ? t : n.dependentSchemas;
  if (!ge(i) || !ge(e))
    return;
  let s = !1, a = { required: [] };
  if (Object.keys(i).forEach((f) => {
    var d, l;
    if (e[f] == null && !(!((d = n.required) === null || d === void 0) && d.includes(f) || !((l = a.required) === null || l === void 0) && l.includes(f)))
      return;
    const c = i[f];
    if (Array.isArray(c)) {
      s = !0, a.required.push(...c);
      return;
    }
    if (ge(c)) {
      s = !0;
      const u = r.next(c).resolveRef();
      a = Pt(a, u.schema);
      return;
    }
  }), s)
    return a.required = xd(a.required), a;
}
const Ed = (r, e) => {
  const { draft: t, schema: n, pointer: i } = r, s = n.dependentRequired;
  if (!ge(s))
    return;
  const a = [];
  return Object.keys(e).forEach((f) => {
    const d = s[f];
    if (d !== !0) {
      if (d === !1) {
        a.push(t.errors.missingDependencyError({ pointer: i, schema: n, value: e }));
        return;
      }
      if (Array.isArray(d))
        for (let l = 0, c = d.length; l < c; l += 1)
          e[d[l]] === void 0 && a.push(t.errors.missingDependencyError({ missingProperty: d[l], pointer: i, schema: n, value: e }));
    }
  }), a;
}, Sd = (r, e) => {
  const { draft: t, schema: n, pointer: i } = r, s = n.dependentSchemas;
  if (!ge(s))
    return;
  const a = [];
  return Object.keys(e).forEach((f) => {
    const d = s[f];
    if (d !== !0) {
      if (d === !1) {
        a.push(t.errors.missingDependencyError({ pointer: i, schema: n, value: e }));
        return;
      }
      ge(d) && t.validate(r.next(d), e).map((l) => a.push(l));
    }
  }), a;
}, Od = (r, e) => {
  const { draft: t, schema: n, pointer: i } = r, s = n.dependencies;
  if (!ge(s))
    return;
  const a = [];
  return Object.keys(e).forEach((f) => {
    if (s[f] === void 0 || s[f] === !0)
      return;
    if (s[f] === !1) {
      a.push(t.errors.missingDependencyError({ pointer: i, schema: n, value: e }));
      return;
    }
    let d;
    const l = ce(s[f]), c = s[f];
    if (Array.isArray(c))
      d = c.filter((u) => e[u] === void 0).map((u) => t.errors.missingDependencyError({ missingProperty: u, pointer: i, schema: n, value: e }));
    else if (l === "object")
      d = t.validate(r.next(s[f]), e);
    else
      throw new Error(`Invalid dependency definition for ${i}/${f}. Must be string[] or schema`);
    a.push(...d);
  }), a.length > 0 ? a : void 0;
};
function sl(r, e) {
  const { draft: t, schema: n } = r;
  if (!Array.isArray(n.anyOf) || n.anyOf.length === 0)
    return;
  let i;
  if (n.anyOf.forEach((s) => {
    const a = t.resolveRef(r.next(s));
    t.validate(a, e).length === 0 && (i = i ? Pt(i, a.schema) : a.schema);
  }), i)
    return r.next(i);
}
function Ad(r, e) {
  const { anyOf: t } = r.schema;
  if (!Array.isArray(t) || t.length === 0)
    return r;
  const n = sl(r, e);
  if (n) {
    const { pointer: i, schema: s } = r;
    return r.draft.errors.anyOfError({ pointer: i, schema: s, value: e, anyOf: JSON.stringify(t) });
  }
  return r.merge(n.schema, "anyOf");
}
const Cd = (r, e) => {
  const { draft: t, schema: n, pointer: i } = r;
  if (!(!Array.isArray(n.anyOf) || n.anyOf.length === 0)) {
    for (let s = 0; s < n.anyOf.length; s += 1) {
      const a = t.resolveRef(r.next(n.anyOf[s]));
      if (t.validate(a, e).length === 0)
        return;
    }
    return t.errors.anyOfError({ pointer: i, schema: n, value: e, anyOf: n.anyOf });
  }
}, va = ["allOf", "anyOf", "oneOf", "dependencies", "if", "then", "else"], Pd = ["allOf", "anyOf", "oneOf", "dependencies", "if"];
function Id(r) {
  const e = Object.keys(r);
  return Pd.findIndex((t) => e.includes(t)) !== -1;
}
function ro(r, e) {
  let t, n;
  const i = r.draft.resolveRef(r), { draft: s } = i, a = lr(i) ? i.schema : i;
  if (a.oneOf) {
    const h = go(i, e);
    Fe(h) ? n = h : h && (t = Pt(t ?? {}, h.schema));
  }
  if (Array.isArray(a.allOf)) {
    const h = a.allOf.map((p) => {
      if (Id(p)) {
        const v = ro(i.next(p), e);
        if (v == null || Fe(v))
          return v;
        const g = Pt(p, v.schema);
        return to(g, ...va);
      }
      return p;
    });
    if (h.length > 0) {
      const p = rl(s, { allOf: h });
      t = Pt(t ?? {}, p);
    }
  }
  const f = sl(i, e);
  f && f.schema && (t = Pt(t ?? {}, f.schema));
  const d = il(i, e);
  d && (t = Pt(t ?? {}, d));
  const l = ds(i, e);
  if (lr(l) && (t = Pt(t ?? {}, l.schema)), t == null)
    return n;
  if (Fe(t))
    return t;
  const c = ro(i.next(t), e);
  lr(c) && (t = Pt(t, c.schema));
  const u = to(t, ...va);
  return i.next(u);
}
const jd = ["allOf", "anyOf", "oneOf", "dependencies", "if", "then", "else"];
function ss(r, e) {
  const t = ro(r, e);
  return lr(t) ? r.merge(t.schema, ...jd) : t || r;
}
var Td = Function.prototype.toString, Us = Object.create, Md = Object.prototype.toString, Rd = (
  /** @class */
  function() {
    function r() {
      this._keys = [], this._values = [];
    }
    return r.prototype.has = function(e) {
      return !!~this._keys.indexOf(e);
    }, r.prototype.get = function(e) {
      return this._values[this._keys.indexOf(e)];
    }, r.prototype.set = function(e, t) {
      this._keys.push(e), this._values.push(t);
    }, r;
  }()
);
function Ld() {
  return new Rd();
}
function Nd() {
  return /* @__PURE__ */ new WeakMap();
}
var kd = typeof WeakMap < "u" ? Nd : Ld;
function yo(r) {
  if (!r)
    return Us(null);
  var e = r.constructor;
  if (e === Object)
    return r === Object.prototype ? {} : Us(r);
  if (e && ~Td.call(e).indexOf("[native code]"))
    try {
      return new e();
    } catch {
    }
  return Us(r);
}
function Dd(r) {
  var e = "";
  return r.global && (e += "g"), r.ignoreCase && (e += "i"), r.multiline && (e += "m"), r.unicode && (e += "u"), r.sticky && (e += "y"), e;
}
function Ud(r) {
  return r.flags;
}
var Hd = /test/g.flags === "g" ? Ud : Dd;
function ol(r) {
  var e = Md.call(r);
  return e.substring(8, e.length - 1);
}
function Bd(r) {
  return r[Symbol.toStringTag] || ol(r);
}
var zd = typeof Symbol < "u" ? Bd : ol, Vd = Object.defineProperty, Fd = Object.getOwnPropertyDescriptor, al = Object.getOwnPropertyNames, _o = Object.getOwnPropertySymbols, cl = Object.prototype, ll = cl.hasOwnProperty, Wd = cl.propertyIsEnumerable, ul = typeof _o == "function";
function qd(r) {
  return al(r).concat(_o(r));
}
var Gd = ul ? qd : al;
function ps(r, e, t) {
  for (var n = Gd(r), i = 0, s = n.length, a = void 0, f = void 0; i < s; ++i)
    if (a = n[i], !(a === "callee" || a === "caller")) {
      if (f = Fd(r, a), !f) {
        e[a] = t.copier(r[a], t);
        continue;
      }
      !f.get && !f.set && (f.value = t.copier(f.value, t));
      try {
        Vd(e, a, f);
      } catch {
        e[a] = f.value;
      }
    }
  return e;
}
function Kd(r, e) {
  var t = new e.Constructor();
  e.cache.set(r, t);
  for (var n = 0, i = r.length; n < i; ++n)
    t[n] = e.copier(r[n], e);
  return t;
}
function Zd(r, e) {
  var t = new e.Constructor();
  return e.cache.set(r, t), ps(r, t, e);
}
function fl(r, e) {
  return r.slice(0);
}
function Jd(r, e) {
  return r.slice(0, r.size, r.type);
}
function Xd(r, e) {
  return new e.Constructor(fl(r.buffer));
}
function Qd(r, e) {
  return new e.Constructor(r.getTime());
}
function hl(r, e) {
  var t = new e.Constructor();
  return e.cache.set(r, t), r.forEach(function(n, i) {
    t.set(i, e.copier(n, e));
  }), t;
}
function Yd(r, e) {
  return ps(r, hl(r, e), e);
}
function ep(r, e) {
  var t = yo(e.prototype);
  e.cache.set(r, t);
  for (var n in r)
    ll.call(r, n) && (t[n] = e.copier(r[n], e));
  return t;
}
function tp(r, e) {
  var t = yo(e.prototype);
  e.cache.set(r, t);
  for (var n in r)
    ll.call(r, n) && (t[n] = e.copier(r[n], e));
  for (var i = _o(r), s = 0, a = i.length, f = void 0; s < a; ++s)
    f = i[s], Wd.call(r, f) && (t[f] = e.copier(r[f], e));
  return t;
}
var rp = ul ? tp : ep;
function np(r, e) {
  var t = yo(e.prototype);
  return e.cache.set(r, t), ps(r, t, e);
}
function Hs(r, e) {
  return new e.Constructor(r.valueOf());
}
function ip(r, e) {
  var t = new e.Constructor(r.source, Hd(r));
  return t.lastIndex = r.lastIndex, t;
}
function zi(r, e) {
  return r;
}
function dl(r, e) {
  var t = new e.Constructor();
  return e.cache.set(r, t), r.forEach(function(n) {
    t.add(e.copier(n, e));
  }), t;
}
function sp(r, e) {
  return ps(r, dl(r, e), e);
}
var op = Array.isArray, bo = Object.assign, ap = Object.getPrototypeOf || function(r) {
  return r.__proto__;
}, pl = {
  array: Kd,
  arrayBuffer: fl,
  blob: Jd,
  dataView: Xd,
  date: Qd,
  error: zi,
  map: hl,
  object: rp,
  regExp: ip,
  set: dl
}, cp = bo({}, pl, {
  array: Zd,
  map: Yd,
  object: np,
  set: sp
});
function lp(r) {
  return {
    Arguments: r.object,
    Array: r.array,
    ArrayBuffer: r.arrayBuffer,
    Blob: r.blob,
    Boolean: Hs,
    DataView: r.dataView,
    Date: r.date,
    Error: r.error,
    Float32Array: r.arrayBuffer,
    Float64Array: r.arrayBuffer,
    Int8Array: r.arrayBuffer,
    Int16Array: r.arrayBuffer,
    Int32Array: r.arrayBuffer,
    Map: r.map,
    Number: Hs,
    Object: r.object,
    Promise: zi,
    RegExp: r.regExp,
    Set: r.set,
    String: Hs,
    WeakMap: zi,
    WeakSet: zi,
    Uint8Array: r.arrayBuffer,
    Uint8ClampedArray: r.arrayBuffer,
    Uint16Array: r.arrayBuffer,
    Uint32Array: r.arrayBuffer,
    Uint64Array: r.arrayBuffer
  };
}
function ml(r) {
  var e = bo({}, pl, r), t = lp(e), n = t.Array, i = t.Object;
  function s(a, f) {
    if (f.prototype = f.Constructor = void 0, !a || typeof a != "object")
      return a;
    if (f.cache.has(a))
      return f.cache.get(a);
    if (f.prototype = ap(a), f.Constructor = f.prototype && f.prototype.constructor, !f.Constructor || f.Constructor === Object)
      return i(a, f);
    if (op(a))
      return n(a, f);
    var d = t[zd(a)];
    return d ? d(a, f) : typeof a.then == "function" ? a : i(a, f);
  }
  return function(f) {
    return s(f, {
      Constructor: void 0,
      cache: kd(),
      copier: s,
      prototype: void 0
    });
  };
}
function up(r) {
  return ml(bo({}, cp, r));
}
up({});
var no = ml({});
class fp {
  constructor(e, t) {
    this.remotes = {}, this.errors = {}, this.typeKeywords = {}, this.validateKeyword = {}, this.validateType = {}, this.validateFormat = {}, this.config = e, this.typeKeywords = no(e.typeKeywords), this.validateKeyword = Object.assign({}, e.validateKeyword), this.validateType = Object.assign({}, e.validateType), this.validateFormat = Object.assign({}, e.validateFormat), this.errors = Object.assign({}, e.errors), this.setSchema(t);
  }
  get rootSchema() {
    return this.__rootSchema;
  }
  set rootSchema(e) {
    e != null && (this.__rootSchema = this.config.compileSchema(this, e));
  }
  /**
   * register a json-schema to be referenced from another json-schema
   * @param url - base-url of json-schema (aka id)
   * @param schema - json-schema root
   */
  addRemoteSchema(e, t) {
    this.config.addRemoteSchema(this, e, t);
  }
  compileSchema(e) {
    var t;
    return this.config.compileSchema(this, e, (t = this.rootSchema) !== null && t !== void 0 ? t : e);
  }
  createSchemaOf(e) {
    return this.config.createSchemaOf(e);
  }
  /**
   * Iterates over data, retrieving its schema
   *
   * @param data - the data to iterate
   * @param callback - will be called with (schema, data, pointer) on each item
   * @param [schema] - the schema matching the data. Defaults to rootSchema
   * @param [pointer] - pointer to current data. Default to rootPointer
   */
  each(e, t, n, i) {
    const s = this.createNode(n ?? this.rootSchema, i);
    return this.config.each(s, e, t);
  }
  eachSchema(e, t = this.rootSchema) {
    return this.config.eachSchema(t, e);
  }
  getChildSchemaSelection(e, t) {
    return this.config.getChildSchemaSelection(this, e, t);
  }
  /**
   * Returns the json-schema of a data-json-pointer.
   *
   * To resolve dynamic schema where the type of json-schema is evaluated by
   * its value, a data object has to be passed in options.
   *
   * Per default this function will return `undefined` for valid properties that
   * do not have a defined schema. Use the option `withSchemaWarning: true` to
   * receive an error with `code: schema-warning` containing the location of its
   * last evaluated json-schema.
   *
   * Notes
   *      - uses draft.step to walk through data and schema
   *
   * @param draft
   * @param pointer - json pointer in data to get the json schema for
   * @param [options.data] - the data object, which includes the json pointers value. This is optional, as
   *    long as no oneOf, anyOf, etc statement is part of the pointers schema
   * @param [options.schema] - the json schema to iterate. Defaults to draft.rootSchema
   * @param [options.withSchemaWarning] - if true returns an error instead of `undefined` for valid properties missing a schema definition
   * @return resolved json-schema object of requested json-pointer location
   */
  getSchema(e) {
    const t = this.getSchemaNode(e);
    return lr(t) ? t.schema : t;
  }
  getSchemaNode(e) {
    return this.config.getSchema(this, e);
  }
  /**
   * Create data object matching the given schema
   *
   * @param [data] - optional template data
   * @param [schema] - json schema, defaults to rootSchema
   * @return created template data
   */
  getTemplate(e, t, n = this.config.templateDefaultOptions) {
    return this.config.getTemplate(this, e, t, n);
  }
  isValid(e, t, n) {
    return this.config.isValid(this, e, t, n);
  }
  createNode(e, t = "#") {
    return this.config.createNode(this, e, t);
  }
  resolveAnyOf(e, t) {
    return this.config.resolveAnyOf(e, t);
  }
  resolveAllOf(e, t) {
    return this.config.resolveAllOf(e, t);
  }
  resolveRef(e) {
    return this.config.resolveRef(e);
  }
  resolveOneOf(e, t) {
    return this.config.resolveOneOf(e, t);
  }
  setSchema(e) {
    this.rootSchema = e;
  }
  /**
   * Returns the json-schema of the given object property or array item.
   * e.g. it steps by one key into the data
   *
   * This helper determines the location of the property within the schema (additional properties, oneOf, ...) and
   * returns the correct schema.
   *
   * @param  node
   * @param  key       - property-name or array-index
   * @param  data      - parent of key
   * @return schema-node containing child schema or error if failed resolving key
   */
  step(e, t, n) {
    return this.config.step(e, t, n);
  }
  validate(e, t = this.rootSchema, n) {
    if (lr(e)) {
      const s = t, a = e;
      return this.config.validate(a, s);
    }
    if (Fe(e))
      return [e];
    const i = this.createNode(t, n);
    return this.config.validate(i, e);
  }
}
function Gn(r, e, t, n) {
  const i = e[r];
  ge(i) && Object.keys(i).forEach((s) => {
    Array.isArray(i[s]) || (s === "$defs" ? Gn("$defs", i[s], t, `${n}/${r}/$defs`) : ar(i[s], t, `${n}/${r}/${s}`));
  });
}
function Ri(r, e, t, n) {
  const i = e[r];
  Array.isArray(i) && i.forEach((s, a) => ar(s, t, `${n}/${r}/${a}`));
}
function ar(r, e, t = "") {
  r !== void 0 && e(r, t) !== !0 && ge(r) && (Gn("properties", r, e, t), Gn("patternProperties", r, e, t), ar(r.not, e, `${t}/not`), ar(r.additionalProperties, e, `${t}/additionalProperties`), Gn("dependencies", r, e, t), ge(r.items) && ar(r.items, e, `${t}/items`), Ri("items", r, e, t), ar(r.additionalItems, e, `${t}/additionalItems`), Ri("allOf", r, e, t), Ri("anyOf", r, e, t), Ri("oneOf", r, e, t), ar(r.if, e, `${t}/if`), ar(r.then, e, `${t}/then`), ar(r.else, e, `${t}/else`), Gn("definitions", r, e, t), Gn("$defs", r, e, t));
}
const hp = /(#)+$/, Bs = /#$/, ga = /^[#/]+/, ya = /^[^:]+:\/\/[^/]+\//, dp = /\/[^/]*$/, pp = /#.*$/, mp = /^urn:uuid:[0-9A-Fa-f]/;
function _a(r, e) {
  return r == null && e == null ? "#" : e == null ? r.replace(Bs, "") : mp.test(e) ? e : r == null || r === "" || r === "#" ? e.replace(Bs, "") : e[0] === "#" ? `${r.replace(pp, "")}${e.replace(hp, "")}` : ya.test(e) ? e.replace(Bs, "") : ya.test(r) && e.startsWith("/") ? `${r.replace(/(^[^:]+:\/\/[^/]+)(.*)/, "$1")}/${e.replace(ga, "")}` : `${r.replace(dp, "")}/${e.replace(ga, "")}`;
}
var vl = { exports: {} };
(function(r, e) {
  (function(t, n) {
    r.exports = n();
  })(typeof self < "u" ? self : ye, () => (() => {
    var t = { d: (S, I) => {
      for (var C in I) t.o(I, C) && !t.o(S, C) && Object.defineProperty(S, C, { enumerable: !0, get: I[C] });
    }, o: (S, I) => Object.prototype.hasOwnProperty.call(S, I), r: (S) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(S, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(S, "__esModule", { value: !0 });
    } }, n = {};
    function i(S) {
      return S === "#" || S === "" || Array.isArray(S) && S.length === 0 || !1;
    }
    t.r(n), t.d(n, { default: () => O, get: () => u, isRoot: () => i, join: () => N, remove: () => w, removeUndefinedItems: () => _, set: () => b, split: () => c, splitLast: () => k });
    const s = /~1/g, a = /~0/g, f = /(^#?\/?)/g;
    function d(S) {
      return S.replace(s, "/").replace(a, "~");
    }
    function l(S) {
      return d(decodeURIComponent(S));
    }
    function c(S) {
      if (S == null || typeof S != "string" || i(S)) return Array.isArray(S) ? S : [];
      const I = S.indexOf("#") >= 0 ? l : d, C = (S = S.replace(f, "")).split("/");
      for (let D = 0, H = C.length; D < H; D += 1) C[D] = I(C[D]);
      return C;
    }
    function u(S, I, C = void 0) {
      if (I == null || S == null) return C;
      if (i(I)) return S;
      const D = h(S, c(I));
      return D === void 0 ? C : D;
    }
    function h(S, I) {
      const C = I.shift();
      if (S !== void 0) return C !== void 0 ? h(S[C], I) : S;
    }
    const p = /^\[.*\]$/, v = /^\[(.+)\]$/;
    function g(S, I) {
      return S === "__proto__" || S == "constructor" && I.length > 0 && I[0] == "prototype";
    }
    function b(S, I, C) {
      if (I == null) return S;
      const D = c(I);
      if (D.length === 0) return S;
      S == null && (S = p.test(D[0]) ? [] : {});
      let H, B, W = S;
      for (; D.length > 1; ) H = D.shift(), B = p.test(D[0]), g(H, D) || (W = $(W, H, B));
      return H = D.pop(), x(W, H, C), S;
    }
    function x(S, I, C) {
      let D;
      const H = I.match(v);
      I === "[]" && Array.isArray(S) ? S.push(C) : H ? (D = H.pop(), S[D] = C) : S[I] = C;
    }
    function $(S, I, C) {
      if (S[I] != null) return S[I];
      const D = C ? [] : {};
      return x(S, I, D), D;
    }
    function _(S) {
      let I = 0, C = 0;
      for (; I + C < S.length; ) S[I + C] === void 0 && (C += 1), S[I] = S[I + C], I += 1;
      return S.length = S.length - C, S;
    }
    function w(S, I, C) {
      const D = c(I), H = D.pop(), B = u(S, D);
      return B && delete B[H], Array.isArray(B) && C !== !0 && _(B), S;
    }
    const E = /~/g, A = /\//g;
    function R(S, I) {
      if (S.length === 0) return I ? "#" : "";
      for (let C = 0, D = S.length; C < D; C += 1) S[C] = S[C].replace(E, "~0").replace(A, "~1"), I && (S[C] = encodeURIComponent(S[C]));
      return (I ? "#/" : "/") + S.join("/");
    }
    function N(S, ...I) {
      const C = [];
      if (Array.isArray(S)) return R(S, arguments[1] === !0);
      const D = arguments[arguments.length - 1], H = typeof D == "boolean" ? D : S && S[0] === "#";
      for (let W = 0, X = arguments.length; W < X; W += 1) C.push.apply(C, c(arguments[W]));
      const B = [];
      for (let W = 0, X = C.length; W < X; W += 1) if (C[W] === "..") {
        if (B.length === 0) return H ? "#" : "";
        B.pop();
      } else B.push(C[W]);
      return R(B, H);
    }
    function k(S) {
      const I = c(S);
      if (I.length === 0) return typeof S == "string" && S[0] === "#" ? ["#", I[0]] : ["", void 0];
      if (I.length === 1) return S[0] === "#" ? ["#", I[0]] : ["", I[0]];
      const C = I.pop();
      return [N(I, S[0] === "#"), C];
    }
    const O = { get: u, set: b, remove: w, join: N, split: c, splitLast: k, isRoot: i, removeUndefinedItems: _ };
    return n;
  })());
})(vl);
var Mn = vl.exports;
const vp = /* @__PURE__ */ Er(Mn), zs = /(#)+$/g, gp = ["", null, "#"];
function yp(r) {
  if (gp.includes(r))
    return [];
  if (r = r.replace(zs, ""), r.indexOf("#") === -1)
    return [r.replace(/(#|\/)+$/g, "")];
  if (r.indexOf("#") === 0)
    return [r.replace(zs, "")];
  const e = r.split("#");
  return e[0] = e[0].replace(/(#|\/)+$/g, ""), e[1] = `#${e[1].replace(zs, "")}`, e;
}
const _p = /(#)+$/g, bp = (r) => ce(r) === "object";
function _r(r, e, t) {
  var n, i, s, a, f;
  let d;
  if (bp(t) ? d = t.__ref || t.$ref : d = t, d == null)
    return e;
  let l;
  const c = d.replace(_p, "");
  if (r.remotes[c] != null)
    return l = r.remotes[c], l && l.$ref ? _r(r, l, l) : l;
  const u = (n = r.anchors) === null || n === void 0 ? void 0 : n[d];
  if (u)
    return Mn.get(e, u);
  if (r.ids[d] != null)
    return l = Mn.get(e, r.ids[d]), l && l.$ref ? _r(r, e, l) : l;
  const h = d, p = yp(d);
  if (p.length === 0)
    return e;
  if (p.length === 1) {
    if (d = p[0], r.remotes[d] && (l = r.remotes[d], l && l.$ref))
      return _r(r, e, l);
    if (r.ids[d])
      return l = Mn.get(e, r.ids[d]), l && l.$ref ? _r(r, e, l) : l;
    const v = (i = e.getContext) === null || i === void 0 ? void 0 : i.call(e).ids[d];
    if (v)
      return _r(r, e, v);
  }
  if (p.length === 2) {
    const v = p[0];
    d = p[1];
    const g = (s = r.remotes[v]) !== null && s !== void 0 ? s : r.remotes[`${v}/`];
    if (g)
      return g.getContext && g.getContext().anchors[h] != null ? g.getRef(h) : g.getRef ? g.getRef(d) : _r(r, g, d);
    const b = (a = r.ids[v]) !== null && a !== void 0 ? a : r.ids[`${v}/`];
    if (b)
      return _r(r, Mn.get(e, b), d);
  }
  return l = Mn.get(e, (f = r.ids[d]) !== null && f !== void 0 ? f : d), l && l.$ref ? _r(r, e, l) : l;
}
function wr(r) {
  if (r === void 0)
    return;
  const e = {
    type: ce(r)
  };
  return e.type === "object" && ge(r) && (e.properties = {}, Object.keys(r).forEach((t) => e.properties[t] = wr(r[t]))), e.type === "array" && Array.isArray(r) && (r.length === 1 ? e.items = wr(r[0]) : e.items = r.map(wr)), e;
}
const $p = {
  additionalItemsError: q("AdditionalItemsError"),
  additionalPropertiesError: q("AdditionalPropertiesError"),
  allOfError: q("AllOfError"),
  anyOfError: q("AnyOfError"),
  constError: q("ConstError"),
  containsAnyError: q("ContainsAnyError"),
  containsArrayError: q("ContainsArrayError"),
  containsError: q("ContainsError"),
  containsMaxError: q("ContainsMaxError"),
  containsMinError: q("ContainsMinError"),
  enumError: q("EnumError"),
  forbiddenPropertyError: q("ForbiddenPropertyError"),
  formatDateError: q("FormatDateError"),
  formatDateTimeError: q("FormatDateTimeError"),
  formatDurationError: q("FormatDurationError"),
  formatEmailError: q("FormatEmailError"),
  formatHostnameError: q("FormatHostnameError"),
  formatIPV4Error: q("FormatIPV4Error"),
  formatIPV4LeadingZeroError: q("FormatIPV4LeadingZeroError"),
  formatIPV6Error: q("FormatIPV6Error"),
  formatIPV6LeadingZeroError: q("FormatIPV6LeadingZeroError"),
  formatJsonPointerError: q("FormatJsonPointerError"),
  formatRegExError: q("FormatRegExError"),
  formatTimeError: q("FormatTimeError"),
  formatURIError: q("FormatURIError"),
  formatURIReferenceError: q("FormatURIReferenceError"),
  formatURITemplateError: q("FormatURITemplateError"),
  formatURLError: q("FormatURLError"),
  formatUUIDError: q("FormatUUIDError"),
  invalidDataError: q("InvalidDataError"),
  invalidPropertyNameError: q("InvalidPropertyNameError"),
  invalidSchemaError: q("InvalidSchemaError"),
  invalidTypeError: q("InvalidTypeError"),
  maximumError: q("MaximumError"),
  maxItemsError: q("MaxItemsError"),
  maxLengthError: q("MaxLengthError"),
  maxPropertiesError: q("MaxPropertiesError"),
  minimumError: q("MinimumError"),
  minItemsError: q("MinItemsError"),
  minItemsOneError: q("MinItemsOneError"),
  minLengthError: q("MinLengthError"),
  minLengthOneError: q("MinLengthOneError"),
  minPropertiesError: q("MinPropertiesError"),
  missingDependencyError: q("MissingDependencyError"),
  missingOneOfPropertyError: q("MissingOneOfPropertyError"),
  multipleOfError: q("MultipleOfError"),
  multipleOneOfError: q("MultipleOneOfError"),
  noAdditionalPropertiesError: q("NoAdditionalPropertiesError"),
  notError: q("NotError"),
  oneOfError: q("OneOfError"),
  oneOfPropertyError: q("OneOfPropertyError"),
  patternError: q("PatternError"),
  patternPropertiesError: q("PatternPropertiesError"),
  requiredPropertyError: q("RequiredPropertyError"),
  schemaWarning: q("SchemaWarning"),
  typeError: q("TypeError"),
  undefinedValueError: q("UndefinedValueError"),
  unevaluatedItemsError: q("UnevaluatedItemsError"),
  unevaluatedPropertyError: q("UnevaluatedPropertyError"),
  uniqueItemsError: q("UniqueItemsError"),
  unknownPropertyError: q("UnknownPropertyError"),
  valueNotEmptyError: q("ValueNotEmptyError")
};
var gl = { exports: {} };
(function(r) {
  (function(e) {
    e.exports.is_uri = n, e.exports.is_http_uri = i, e.exports.is_https_uri = s, e.exports.is_web_uri = a, e.exports.isUri = n, e.exports.isHttpUri = i, e.exports.isHttpsUri = s, e.exports.isWebUri = a;
    var t = function(f) {
      var d = f.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
      return d;
    };
    function n(f) {
      if (f && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(f) && !/%[^0-9a-f]/i.test(f) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(f)) {
        var d = [], l = "", c = "", u = "", h = "", p = "", v = "";
        if (d = t(f), l = d[1], c = d[2], u = d[3], h = d[4], p = d[5], !!(l && l.length && u.length >= 0)) {
          if (c && c.length) {
            if (!(u.length === 0 || /^\//.test(u))) return;
          } else if (/^\/\//.test(u)) return;
          if (/^[a-z][a-z0-9\+\-\.]*$/.test(l.toLowerCase()))
            return v += l + ":", c && c.length && (v += "//" + c), v += u, h && h.length && (v += "?" + h), p && p.length && (v += "#" + p), v;
        }
      }
    }
    function i(f, d) {
      if (n(f)) {
        var l = [], c = "", u = "", h = "", p = "", v = "", g = "", b = "";
        if (l = t(f), c = l[1], u = l[2], h = l[3], v = l[4], g = l[5], !!c) {
          if (d) {
            if (c.toLowerCase() != "https") return;
          } else if (c.toLowerCase() != "http") return;
          if (u)
            return /:(\d+)$/.test(u) && (p = u.match(/:(\d+)$/)[0], u = u.replace(/:\d+$/, "")), b += c + ":", b += "//" + u, p && (b += p), b += h, v && v.length && (b += "?" + v), g && g.length && (b += "#" + g), b;
        }
      }
    }
    function s(f) {
      return i(f, !0);
    }
    function a(f) {
      return i(f) || s(f);
    }
  })(r);
})(gl);
var wp = gl.exports;
const ba = /* @__PURE__ */ Er(wp);
var cr = {}, yl = { exports: {} };
(function(r) {
  (function(e, t) {
    r.exports ? r.exports = t() : e.nearley = t();
  })(ye, function() {
    function e(l, c, u) {
      return this.id = ++e.highestId, this.name = l, this.symbols = c, this.postprocess = u, this;
    }
    e.highestId = 0, e.prototype.toString = function(l) {
      var c = typeof l > "u" ? this.symbols.map(d).join(" ") : this.symbols.slice(0, l).map(d).join(" ") + " ● " + this.symbols.slice(l).map(d).join(" ");
      return this.name + " → " + c;
    };
    function t(l, c, u, h) {
      this.rule = l, this.dot = c, this.reference = u, this.data = [], this.wantedBy = h, this.isComplete = this.dot === l.symbols.length;
    }
    t.prototype.toString = function() {
      return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    }, t.prototype.nextState = function(l) {
      var c = new t(this.rule, this.dot + 1, this.reference, this.wantedBy);
      return c.left = this, c.right = l, c.isComplete && (c.data = c.build(), c.right = void 0), c;
    }, t.prototype.build = function() {
      var l = [], c = this;
      do
        l.push(c.right.data), c = c.left;
      while (c.left);
      return l.reverse(), l;
    }, t.prototype.finish = function() {
      this.rule.postprocess && (this.data = this.rule.postprocess(this.data, this.reference, a.fail));
    };
    function n(l, c) {
      this.grammar = l, this.index = c, this.states = [], this.wants = {}, this.scannable = [], this.completed = {};
    }
    n.prototype.process = function(l) {
      for (var c = this.states, u = this.wants, h = this.completed, p = 0; p < c.length; p++) {
        var v = c[p];
        if (v.isComplete) {
          if (v.finish(), v.data !== a.fail) {
            for (var g = v.wantedBy, b = g.length; b--; ) {
              var x = g[b];
              this.complete(x, v);
            }
            if (v.reference === this.index) {
              var $ = v.rule.name;
              (this.completed[$] = this.completed[$] || []).push(v);
            }
          }
        } else {
          var $ = v.rule.symbols[v.dot];
          if (typeof $ != "string") {
            this.scannable.push(v);
            continue;
          }
          if (u[$]) {
            if (u[$].push(v), h.hasOwnProperty($))
              for (var _ = h[$], b = 0; b < _.length; b++) {
                var w = _[b];
                this.complete(v, w);
              }
          } else
            u[$] = [v], this.predict($);
        }
      }
    }, n.prototype.predict = function(l) {
      for (var c = this.grammar.byName[l] || [], u = 0; u < c.length; u++) {
        var h = c[u], p = this.wants[l], v = new t(h, 0, this.index, p);
        this.states.push(v);
      }
    }, n.prototype.complete = function(l, c) {
      var u = l.nextState(c);
      this.states.push(u);
    };
    function i(l, c) {
      this.rules = l, this.start = c || this.rules[0].name;
      var u = this.byName = {};
      this.rules.forEach(function(h) {
        u.hasOwnProperty(h.name) || (u[h.name] = []), u[h.name].push(h);
      });
    }
    i.fromCompiled = function(h, c) {
      var u = h.Lexer;
      h.ParserStart && (c = h.ParserStart, h = h.ParserRules);
      var h = h.map(function(v) {
        return new e(v.name, v.symbols, v.postprocess);
      }), p = new i(h, c);
      return p.lexer = u, p;
    };
    function s() {
      this.reset("");
    }
    s.prototype.reset = function(l, c) {
      this.buffer = l, this.index = 0, this.line = c ? c.line : 1, this.lastLineBreak = c ? -c.col : 0;
    }, s.prototype.next = function() {
      if (this.index < this.buffer.length) {
        var l = this.buffer[this.index++];
        return l === `
` && (this.line += 1, this.lastLineBreak = this.index), { value: l };
      }
    }, s.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak
      };
    }, s.prototype.formatError = function(l, c) {
      var u = this.buffer;
      if (typeof u == "string") {
        var h = u.split(`
`).slice(
          Math.max(0, this.line - 5),
          this.line
        ), p = u.indexOf(`
`, this.index);
        p === -1 && (p = u.length);
        var v = this.index - this.lastLineBreak, g = String(this.line).length;
        return c += " at line " + this.line + " col " + v + `:

`, c += h.map(function(x, $) {
          return b(this.line - h.length + $ + 1, g) + " " + x;
        }, this).join(`
`), c += `
` + b("", g + v) + `^
`, c;
      } else
        return c + " at index " + (this.index - 1);
      function b(x, $) {
        var _ = String(x);
        return Array($ - _.length + 1).join(" ") + _;
      }
    };
    function a(l, c, u) {
      if (l instanceof i)
        var h = l, u = c;
      else
        var h = i.fromCompiled(l, c);
      this.grammar = h, this.options = {
        keepHistory: !1,
        lexer: h.lexer || new s()
      };
      for (var p in u || {})
        this.options[p] = u[p];
      this.lexer = this.options.lexer, this.lexerState = void 0;
      var v = new n(h, 0);
      this.table = [v], v.wants[h.start] = [], v.predict(h.start), v.process(), this.current = 0;
    }
    a.fail = {}, a.prototype.feed = function(l) {
      var c = this.lexer;
      c.reset(l, this.lexerState);
      for (var u; ; ) {
        try {
          if (u = c.next(), !u)
            break;
        } catch (R) {
          var g = new n(this.grammar, this.current + 1);
          this.table.push(g);
          var h = new Error(this.reportLexerError(R));
          throw h.offset = this.current, h.token = R.token, h;
        }
        var p = this.table[this.current];
        this.options.keepHistory || delete this.table[this.current - 1];
        var v = this.current + 1, g = new n(this.grammar, v);
        this.table.push(g);
        for (var b = u.text !== void 0 ? u.text : u.value, x = c.constructor === s ? u.value : u, $ = p.scannable, _ = $.length; _--; ) {
          var w = $[_], E = w.rule.symbols[w.dot];
          if (E.test ? E.test(x) : E.type ? E.type === u.type : E.literal === b) {
            var A = w.nextState({ data: x, token: u, isToken: !0, reference: v - 1 });
            g.states.push(A);
          }
        }
        if (g.process(), g.states.length === 0) {
          var h = new Error(this.reportError(u));
          throw h.offset = this.current, h.token = u, h;
        }
        this.options.keepHistory && (p.lexerState = c.save()), this.current++;
      }
      return p && (this.lexerState = c.save()), this.results = this.finish(), this;
    }, a.prototype.reportLexerError = function(l) {
      var c, u, h = l.token;
      return h ? (c = "input " + JSON.stringify(h.text[0]) + " (lexer error)", u = this.lexer.formatError(h, "Syntax error")) : (c = "input (lexer error)", u = l.message), this.reportErrorCommon(u, c);
    }, a.prototype.reportError = function(l) {
      var c = (l.type ? l.type + " token: " : "") + JSON.stringify(l.value !== void 0 ? l.value : l), u = this.lexer.formatError(l, "Syntax error");
      return this.reportErrorCommon(u, c);
    }, a.prototype.reportErrorCommon = function(l, c) {
      var u = [];
      u.push(l);
      var h = this.table.length - 2, p = this.table[h], v = p.states.filter(function(b) {
        var x = b.rule.symbols[b.dot];
        return x && typeof x != "string";
      });
      if (v.length === 0)
        u.push("Unexpected " + c + `. I did not expect any more input. Here is the state of my parse table:
`), this.displayStateStack(p.states, u);
      else {
        u.push("Unexpected " + c + `. Instead, I was expecting to see one of the following:
`);
        var g = v.map(function(b) {
          return this.buildFirstStateStack(b, []) || [b];
        }, this);
        g.forEach(function(b) {
          var x = b[0], $ = x.rule.symbols[x.dot], _ = this.getSymbolDisplay($);
          u.push("A " + _ + " based on:"), this.displayStateStack(b, u);
        }, this);
      }
      return u.push(""), u.join(`
`);
    }, a.prototype.displayStateStack = function(l, c) {
      for (var u, h = 0, p = 0; p < l.length; p++) {
        var v = l[p], g = v.rule.toString(v.dot);
        g === u ? h++ : (h > 0 && c.push("    ^ " + h + " more lines identical to this"), h = 0, c.push("    " + g)), u = g;
      }
    }, a.prototype.getSymbolDisplay = function(l) {
      return f(l);
    }, a.prototype.buildFirstStateStack = function(l, c) {
      if (c.indexOf(l) !== -1)
        return null;
      if (l.wantedBy.length === 0)
        return [l];
      var u = l.wantedBy[0], h = [l].concat(c), p = this.buildFirstStateStack(u, h);
      return p === null ? null : [l].concat(p);
    }, a.prototype.save = function() {
      var l = this.table[this.current];
      return l.lexerState = this.lexerState, l;
    }, a.prototype.restore = function(l) {
      var c = l.index;
      this.current = c, this.table[c] = l, this.table.splice(c + 1), this.lexerState = l.lexerState, this.results = this.finish();
    }, a.prototype.rewind = function(l) {
      if (!this.options.keepHistory)
        throw new Error("set option `keepHistory` to enable rewinding");
      this.restore(this.table[l]);
    }, a.prototype.finish = function() {
      var l = [], c = this.grammar.start, u = this.table[this.table.length - 1];
      return u.states.forEach(function(h) {
        h.rule.name === c && h.dot === h.rule.symbols.length && h.reference === 0 && h.data !== a.fail && l.push(h);
      }), l.map(function(h) {
        return h.data;
      });
    };
    function f(l) {
      var c = typeof l;
      if (c === "string")
        return l;
      if (c === "object") {
        if (l.literal)
          return JSON.stringify(l.literal);
        if (l instanceof RegExp)
          return "character matching " + l;
        if (l.type)
          return l.type + " token";
        if (l.test)
          return "token matching " + String(l.test);
        throw new Error("Unknown symbol type: " + l);
      }
    }
    function d(l) {
      var c = typeof l;
      if (c === "string")
        return l;
      if (c === "object") {
        if (l.literal)
          return JSON.stringify(l.literal);
        if (l instanceof RegExp)
          return l.toString();
        if (l.type)
          return "%" + l.type;
        if (l.test)
          return "<" + String(l.test) + ">";
        throw new Error("Unknown symbol type: " + l);
      }
    }
    return {
      Parser: a,
      Grammar: i,
      Rule: e
    };
  });
})(yl);
var xp = yl.exports, $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
function dt(r) {
  return r[0];
}
const _l = (r) => [].concat(...r.map((e) => Array.isArray(e) ? _l(e) : e));
function Wn(r) {
  return r ? Array.isArray(r) ? _l(r).join("") : r : "";
}
const Ep = {
  Lexer: void 0,
  ParserRules: [
    { name: "Reverse_path", symbols: ["Path"] },
    { name: "Reverse_path$string$1", symbols: [{ literal: "<" }, { literal: ">" }], postprocess: (r) => r.join("") },
    { name: "Reverse_path", symbols: ["Reverse_path$string$1"] },
    { name: "Forward_path$subexpression$1$subexpression$1", symbols: [{ literal: "<" }, /[pP]/, /[oO]/, /[sS]/, /[tT]/, /[mM]/, /[aA]/, /[sS]/, /[tT]/, /[eE]/, /[rR]/, { literal: "@" }], postprocess: function(r) {
      return r.join("");
    } },
    { name: "Forward_path$subexpression$1", symbols: ["Forward_path$subexpression$1$subexpression$1", "Domain", { literal: ">" }] },
    { name: "Forward_path", symbols: ["Forward_path$subexpression$1"] },
    { name: "Forward_path$subexpression$2", symbols: [{ literal: "<" }, /[pP]/, /[oO]/, /[sS]/, /[tT]/, /[mM]/, /[aA]/, /[sS]/, /[tT]/, /[eE]/, /[rR]/, { literal: ">" }], postprocess: function(r) {
      return r.join("");
    } },
    { name: "Forward_path", symbols: ["Forward_path$subexpression$2"] },
    { name: "Forward_path", symbols: ["Path"] },
    { name: "Path$ebnf$1$subexpression$1", symbols: ["A_d_l", { literal: ":" }] },
    { name: "Path$ebnf$1", symbols: ["Path$ebnf$1$subexpression$1"], postprocess: dt },
    { name: "Path$ebnf$1", symbols: [], postprocess: () => null },
    { name: "Path", symbols: [{ literal: "<" }, "Path$ebnf$1", "Mailbox", { literal: ">" }] },
    { name: "A_d_l$ebnf$1", symbols: [] },
    { name: "A_d_l$ebnf$1$subexpression$1", symbols: [{ literal: "," }, "At_domain"] },
    { name: "A_d_l$ebnf$1", symbols: ["A_d_l$ebnf$1", "A_d_l$ebnf$1$subexpression$1"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "A_d_l", symbols: ["At_domain", "A_d_l$ebnf$1"] },
    { name: "At_domain", symbols: [{ literal: "@" }, "Domain"] },
    { name: "Domain$ebnf$1", symbols: [] },
    { name: "Domain$ebnf$1$subexpression$1", symbols: [{ literal: "." }, "sub_domain"] },
    { name: "Domain$ebnf$1", symbols: ["Domain$ebnf$1", "Domain$ebnf$1$subexpression$1"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "Domain", symbols: ["sub_domain", "Domain$ebnf$1"] },
    { name: "sub_domain", symbols: ["U_label"] },
    { name: "Let_dig", symbols: ["ALPHA_DIGIT"], postprocess: dt },
    { name: "Ldh_str$ebnf$1", symbols: [] },
    { name: "Ldh_str$ebnf$1", symbols: ["Ldh_str$ebnf$1", "ALPHA_DIG_DASH"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "Ldh_str", symbols: ["Ldh_str$ebnf$1", "Let_dig"] },
    { name: "U_Let_dig", symbols: ["ALPHA_DIGIT_U"], postprocess: dt },
    { name: "U_Ldh_str$ebnf$1", symbols: [] },
    { name: "U_Ldh_str$ebnf$1", symbols: ["U_Ldh_str$ebnf$1", "ALPHA_DIG_DASH_U"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "U_Ldh_str", symbols: ["U_Ldh_str$ebnf$1", "U_Let_dig"] },
    { name: "U_label$ebnf$1$subexpression$1", symbols: ["U_Ldh_str"] },
    { name: "U_label$ebnf$1", symbols: ["U_label$ebnf$1$subexpression$1"], postprocess: dt },
    { name: "U_label$ebnf$1", symbols: [], postprocess: () => null },
    { name: "U_label", symbols: ["U_Let_dig", "U_label$ebnf$1"] },
    { name: "address_literal$subexpression$1", symbols: ["IPv4_address_literal"] },
    { name: "address_literal$subexpression$1", symbols: ["IPv6_address_literal"] },
    { name: "address_literal$subexpression$1", symbols: ["General_address_literal"] },
    { name: "address_literal", symbols: [{ literal: "[" }, "address_literal$subexpression$1", { literal: "]" }] },
    {
      name: "non_local_part",
      symbols: ["Domain"],
      postprocess: function(r) {
        return { DomainName: Wn(r[0]) };
      }
    },
    {
      name: "non_local_part",
      symbols: ["address_literal"],
      postprocess: function(r) {
        return { AddressLiteral: Wn(r[0]) };
      }
    },
    {
      name: "Mailbox",
      symbols: ["Local_part", { literal: "@" }, "non_local_part"],
      postprocess: function(r) {
        return { localPart: Wn(r[0]), domainPart: Wn(r[2]) };
      }
    },
    {
      name: "Local_part",
      symbols: ["Dot_string"],
      postprocess: function(r) {
        return { DotString: Wn(r[0]) };
      }
    },
    {
      name: "Local_part",
      symbols: ["Quoted_string"],
      postprocess: function(r) {
        return { QuotedString: Wn(r[0]) };
      }
    },
    { name: "Dot_string$ebnf$1", symbols: [] },
    { name: "Dot_string$ebnf$1$subexpression$1", symbols: [{ literal: "." }, "Atom"] },
    { name: "Dot_string$ebnf$1", symbols: ["Dot_string$ebnf$1", "Dot_string$ebnf$1$subexpression$1"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "Dot_string", symbols: ["Atom", "Dot_string$ebnf$1"] },
    { name: "Atom$ebnf$1", symbols: [/[0-9A-Za-z!#$%&'*+\-/=?^_`{|}~\u0080-\uFFFF/]/] },
    { name: "Atom$ebnf$1", symbols: ["Atom$ebnf$1", /[0-9A-Za-z!#$%&'*+\-/=?^_`{|}~\u0080-\uFFFF/]/], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "Atom", symbols: ["Atom$ebnf$1"] },
    { name: "Quoted_string$ebnf$1", symbols: [] },
    { name: "Quoted_string$ebnf$1", symbols: ["Quoted_string$ebnf$1", "QcontentSMTP"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "Quoted_string", symbols: ["DQUOTE", "Quoted_string$ebnf$1", "DQUOTE"] },
    { name: "QcontentSMTP", symbols: ["qtextSMTP"] },
    { name: "QcontentSMTP", symbols: ["quoted_pairSMTP"] },
    { name: "quoted_pairSMTP", symbols: [{ literal: "\\" }, /[\x20-\x7e]/] },
    { name: "qtextSMTP", symbols: [/[\x20-\x21\x23-\x5b\x5d-\x7e\u0080-\uFFFF]/], postprocess: dt },
    { name: "IPv4_address_literal$macrocall$2", symbols: [{ literal: "." }, "Snum"] },
    { name: "IPv4_address_literal$macrocall$1", symbols: ["IPv4_address_literal$macrocall$2", "IPv4_address_literal$macrocall$2", "IPv4_address_literal$macrocall$2"] },
    { name: "IPv4_address_literal", symbols: ["Snum", "IPv4_address_literal$macrocall$1"] },
    { name: "IPv6_address_literal$subexpression$1", symbols: [/[iI]/, /[pP]/, /[vV]/, { literal: "6" }, { literal: ":" }], postprocess: function(r) {
      return r.join("");
    } },
    { name: "IPv6_address_literal", symbols: ["IPv6_address_literal$subexpression$1", "IPv6_addr"] },
    { name: "General_address_literal$ebnf$1", symbols: ["dcontent"] },
    { name: "General_address_literal$ebnf$1", symbols: ["General_address_literal$ebnf$1", "dcontent"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "General_address_literal", symbols: ["Standardized_tag", { literal: ":" }, "General_address_literal$ebnf$1"] },
    { name: "Standardized_tag", symbols: ["Ldh_str"] },
    { name: "dcontent", symbols: [/[\x21-\x5a\x5e-\x7e]/], postprocess: dt },
    { name: "Snum", symbols: ["DIGIT"] },
    { name: "Snum$subexpression$1", symbols: [/[1-9]/, "DIGIT"] },
    { name: "Snum", symbols: ["Snum$subexpression$1"] },
    { name: "Snum$subexpression$2", symbols: [{ literal: "1" }, "DIGIT", "DIGIT"] },
    { name: "Snum", symbols: ["Snum$subexpression$2"] },
    { name: "Snum$subexpression$3", symbols: [{ literal: "2" }, /[0-4]/, "DIGIT"] },
    { name: "Snum", symbols: ["Snum$subexpression$3"] },
    { name: "Snum$subexpression$4", symbols: [{ literal: "2" }, { literal: "5" }, /[0-5]/] },
    { name: "Snum", symbols: ["Snum$subexpression$4"] },
    { name: "IPv6_addr", symbols: ["IPv6_full"] },
    { name: "IPv6_addr", symbols: ["IPv6_comp"] },
    { name: "IPv6_addr", symbols: ["IPv6v4_full"] },
    { name: "IPv6_addr", symbols: ["IPv6v4_comp"] },
    { name: "IPv6_hex", symbols: ["HEXDIG"] },
    { name: "IPv6_hex$subexpression$1", symbols: ["HEXDIG", "HEXDIG"] },
    { name: "IPv6_hex", symbols: ["IPv6_hex$subexpression$1"] },
    { name: "IPv6_hex$subexpression$2", symbols: ["HEXDIG", "HEXDIG", "HEXDIG"] },
    { name: "IPv6_hex", symbols: ["IPv6_hex$subexpression$2"] },
    { name: "IPv6_hex$subexpression$3", symbols: ["HEXDIG", "HEXDIG", "HEXDIG", "HEXDIG"] },
    { name: "IPv6_hex", symbols: ["IPv6_hex$subexpression$3"] },
    { name: "IPv6_full$macrocall$2", symbols: [{ literal: ":" }, "IPv6_hex"] },
    { name: "IPv6_full$macrocall$1", symbols: ["IPv6_full$macrocall$2", "IPv6_full$macrocall$2", "IPv6_full$macrocall$2", "IPv6_full$macrocall$2", "IPv6_full$macrocall$2", "IPv6_full$macrocall$2", "IPv6_full$macrocall$2"] },
    { name: "IPv6_full", symbols: ["IPv6_hex", "IPv6_full$macrocall$1"] },
    { name: "IPv6_comp$ebnf$1$subexpression$1$macrocall$2", symbols: [{ literal: ":" }, "IPv6_hex"] },
    { name: "IPv6_comp$ebnf$1$subexpression$1$macrocall$1", symbols: ["IPv6_comp$ebnf$1$subexpression$1$macrocall$2", "IPv6_comp$ebnf$1$subexpression$1$macrocall$2", "IPv6_comp$ebnf$1$subexpression$1$macrocall$2", "IPv6_comp$ebnf$1$subexpression$1$macrocall$2", "IPv6_comp$ebnf$1$subexpression$1$macrocall$2"] },
    { name: "IPv6_comp$ebnf$1$subexpression$1", symbols: ["IPv6_hex", "IPv6_comp$ebnf$1$subexpression$1$macrocall$1"] },
    { name: "IPv6_comp$ebnf$1", symbols: ["IPv6_comp$ebnf$1$subexpression$1"], postprocess: dt },
    { name: "IPv6_comp$ebnf$1", symbols: [], postprocess: () => null },
    { name: "IPv6_comp$string$1", symbols: [{ literal: ":" }, { literal: ":" }], postprocess: (r) => r.join("") },
    { name: "IPv6_comp$ebnf$2$subexpression$1$macrocall$2", symbols: [{ literal: ":" }, "IPv6_hex"] },
    { name: "IPv6_comp$ebnf$2$subexpression$1$macrocall$1", symbols: ["IPv6_comp$ebnf$2$subexpression$1$macrocall$2", "IPv6_comp$ebnf$2$subexpression$1$macrocall$2", "IPv6_comp$ebnf$2$subexpression$1$macrocall$2", "IPv6_comp$ebnf$2$subexpression$1$macrocall$2", "IPv6_comp$ebnf$2$subexpression$1$macrocall$2"] },
    { name: "IPv6_comp$ebnf$2$subexpression$1", symbols: ["IPv6_hex", "IPv6_comp$ebnf$2$subexpression$1$macrocall$1"] },
    { name: "IPv6_comp$ebnf$2", symbols: ["IPv6_comp$ebnf$2$subexpression$1"], postprocess: dt },
    { name: "IPv6_comp$ebnf$2", symbols: [], postprocess: () => null },
    { name: "IPv6_comp", symbols: ["IPv6_comp$ebnf$1", "IPv6_comp$string$1", "IPv6_comp$ebnf$2"] },
    { name: "IPv6v4_full$macrocall$2", symbols: [{ literal: ":" }, "IPv6_hex"] },
    { name: "IPv6v4_full$macrocall$1", symbols: ["IPv6v4_full$macrocall$2", "IPv6v4_full$macrocall$2", "IPv6v4_full$macrocall$2", "IPv6v4_full$macrocall$2", "IPv6v4_full$macrocall$2"] },
    { name: "IPv6v4_full", symbols: ["IPv6_hex", "IPv6v4_full$macrocall$1", { literal: ":" }, "IPv4_address_literal"] },
    { name: "IPv6v4_comp$ebnf$1$subexpression$1$macrocall$2", symbols: [{ literal: ":" }, "IPv6_hex"] },
    { name: "IPv6v4_comp$ebnf$1$subexpression$1$macrocall$1", symbols: ["IPv6v4_comp$ebnf$1$subexpression$1$macrocall$2", "IPv6v4_comp$ebnf$1$subexpression$1$macrocall$2", "IPv6v4_comp$ebnf$1$subexpression$1$macrocall$2"] },
    { name: "IPv6v4_comp$ebnf$1$subexpression$1", symbols: ["IPv6_hex", "IPv6v4_comp$ebnf$1$subexpression$1$macrocall$1"] },
    { name: "IPv6v4_comp$ebnf$1", symbols: ["IPv6v4_comp$ebnf$1$subexpression$1"], postprocess: dt },
    { name: "IPv6v4_comp$ebnf$1", symbols: [], postprocess: () => null },
    { name: "IPv6v4_comp$string$1", symbols: [{ literal: ":" }, { literal: ":" }], postprocess: (r) => r.join("") },
    { name: "IPv6v4_comp$ebnf$2$subexpression$1$macrocall$2", symbols: [{ literal: ":" }, "IPv6_hex"] },
    { name: "IPv6v4_comp$ebnf$2$subexpression$1$macrocall$1", symbols: ["IPv6v4_comp$ebnf$2$subexpression$1$macrocall$2", "IPv6v4_comp$ebnf$2$subexpression$1$macrocall$2", "IPv6v4_comp$ebnf$2$subexpression$1$macrocall$2"] },
    { name: "IPv6v4_comp$ebnf$2$subexpression$1", symbols: ["IPv6_hex", "IPv6v4_comp$ebnf$2$subexpression$1$macrocall$1", { literal: ":" }] },
    { name: "IPv6v4_comp$ebnf$2", symbols: ["IPv6v4_comp$ebnf$2$subexpression$1"], postprocess: dt },
    { name: "IPv6v4_comp$ebnf$2", symbols: [], postprocess: () => null },
    { name: "IPv6v4_comp", symbols: ["IPv6v4_comp$ebnf$1", "IPv6v4_comp$string$1", "IPv6v4_comp$ebnf$2", "IPv4_address_literal"] },
    { name: "DIGIT", symbols: [/[0-9]/], postprocess: dt },
    { name: "ALPHA_DIGIT_U", symbols: [/[0-9A-Za-z\u0080-\uFFFF]/], postprocess: dt },
    { name: "ALPHA_DIGIT", symbols: [/[0-9A-Za-z]/], postprocess: dt },
    { name: "ALPHA_DIG_DASH", symbols: [/[-0-9A-Za-z]/], postprocess: dt },
    { name: "ALPHA_DIG_DASH_U", symbols: [/[-0-9A-Za-z\u0080-\uFFFF]/], postprocess: dt },
    { name: "HEXDIG", symbols: [/[0-9A-Fa-f]/], postprocess: dt },
    { name: "DQUOTE", symbols: [{ literal: '"' }], postprocess: dt }
  ],
  ParserStart: "Reverse_path"
};
$o.default = Ep;
var Sp = ye && ye.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.canonicalize = cr.canonicalize_quoted_string = cr.normalize = cr.normalize_dot_string = wl = cr.parse = void 0;
const bl = xp, $l = Sp($o);
$l.default.ParserStart = "Mailbox";
const Op = bl.Grammar.fromCompiled($l.default);
function wo(r) {
  const e = new bl.Parser(Op);
  if (e.feed(r), e.results.length !== 1)
    throw new Error("address parsing failed: ambiguous grammar");
  return e.results[0];
}
var wl = cr.parse = wo;
function xl(r) {
  return function() {
    const n = r.indexOf("+");
    return n === -1 ? r : r.substr(0, n);
  }().replace(/\./g, "").toLowerCase();
}
cr.normalize_dot_string = xl;
function Ap(r) {
  var e, t;
  const n = wo(r), i = (e = n.domainPart.AddressLiteral) !== null && e !== void 0 ? e : n.domainPart.DomainName.toLowerCase();
  return `${(t = n.localPart.QuotedString) !== null && t !== void 0 ? t : xl(n.localPart.DotString)}@${i}`;
}
cr.normalize = Ap;
function El(r) {
  return `"${r.substr(1).substr(0, r.length - 2).replace(/(?:\\(.))/g, "$1").replace(/(?:(["\\]))/g, "\\$1")}"`;
}
cr.canonicalize_quoted_string = El;
function Cp(r) {
  var e;
  const t = wo(r), n = (e = t.domainPart.AddressLiteral) !== null && e !== void 0 ? e : t.domainPart.DomainName.toLowerCase();
  return `${t.localPart.QuotedString ? El(t.localPart.QuotedString) : t.localPart.DotString}@${n}`;
}
cr.canonicalize = Cp;
const Pp = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/, Ip = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i, jp = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/, Tp = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, Mp = /^(?<time>(?:([0-1]\d|2[0-3]):[0-5]\d:(?<second>[0-5]\d|60)))(?:\.\d+)?(?<offset>(?:z|[+-]([0-1]\d|2[0-3])(?::?[0-5]\d)?))$/i, Rp = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Lp = /^(?:\/(?:[^~/]|~0|~1)*)*$/, Np = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/, kp = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, Dp = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, Up = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, io = {
  date: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e != "string" || e === "")
      return;
    const s = e.match(Tp);
    if (!s)
      return t.errors.formatDateTimeError({ value: e, pointer: i, schema: n });
    const a = +s[1], f = +s[2], d = +s[3], l = a % 4 === 0 && (a % 100 !== 0 || a % 400 === 0);
    if (!(f >= 1 && f <= 12 && d >= 1 && d <= (f == 2 && l ? 29 : Rp[f])))
      return t.errors.formatDateError({ value: e, pointer: i, schema: n });
  },
  "date-time": (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e != "string" || e === "")
      return;
    const s = e.split(/t/i);
    if (s.length === 2) {
      const a = io.date(r, s[0]) === void 0, f = io.time(r, s[1]) === void 0;
      if (a && f)
        return;
    }
    return t.errors.formatDateTimeError({ value: e, pointer: i, schema: n });
  },
  duration: (r, e) => {
    if (ce(e) !== "string")
      return;
    const n = /(\d+M)(\d+W)|(\d+Y)(\d+W)/;
    if (!Up.test(e) || n.test(e))
      return r.draft.errors.formatDurationError({
        value: e,
        pointer: r.pointer,
        schema: r.schema
      });
  },
  email: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e != "string" || e === "")
      return;
    if (e[0] === '"')
      return t.errors.formatEmailError({ value: e, pointer: i, schema: n });
    const [s, a, ...f] = e.split("@");
    if (!s || !a || f.length !== 0 || s.length > 64 || a.length > 253)
      return t.errors.formatEmailError({ value: e, pointer: i, schema: n });
    if (s[0] === "." || s.endsWith(".") || s.includes(".."))
      return t.errors.formatEmailError({ value: e, pointer: i, schema: n });
    if (!/^[a-z0-9.-]+$/i.test(a) || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(s))
      return t.errors.formatEmailError({ value: e, pointer: i, schema: n });
    if (!a.split(".").every((d) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(d)))
      return t.errors.formatEmailError({ value: e, pointer: i, schema: n });
  },
  /**
   * @draft 7
   * [RFC6531] https://json-schema.org/draft-07/json-schema-validation.html#RFC6531
   */
  "idn-email": (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === ""))
      try {
        wl(e);
        return;
      } catch {
        return t.errors.formatEmailError({ value: e, pointer: i, schema: n });
      }
  },
  hostname: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e == "string" && !(e === "" || jp.test(e)))
      return t.errors.formatHostnameError({ value: e, pointer: i, schema: n });
  },
  ipv4: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "")) {
      if (e && e[0] === "0")
        return t.errors.formatIPV4LeadingZeroError({ value: e, pointer: i, schema: n });
      if (!(e.length <= 15 && Pp.test(e)))
        return t.errors.formatIPV4Error({ value: e, pointer: i, schema: n });
    }
  },
  ipv6: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "")) {
      if (e && e[0] === "0")
        return t.errors.formatIPV6LeadingZeroError({ value: e, pointer: i, schema: n });
      if (!(e.length <= 45 && Ip.test(e)))
        return t.errors.formatIPV6Error({ value: e, pointer: i, schema: n });
    }
  },
  "json-pointer": (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "") && !Lp.test(e))
      return t.errors.formatJsonPointerError({ value: e, pointer: i, schema: n });
  },
  "relative-json-pointer": (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e == "string" && !Np.test(e))
      return t.errors.formatJsonPointerError({ value: e, pointer: i, schema: n });
  },
  regex: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e == "string" && /\\Z$/.test(e) === !1) {
      try {
        new RegExp(e);
        return;
      } catch {
      }
      return t.errors.formatRegExError({ value: e, pointer: i, schema: n });
    }
    if (!(typeof e == "object" || typeof e == "number" || Array.isArray(e)))
      return t.errors.formatRegExError({ value: e, pointer: i, schema: n });
  },
  // hh:mm:ss.sTZD
  // RFC 3339 https://datatracker.ietf.org/doc/html/rfc3339#section-4
  time: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (typeof e != "string" || e === "")
      return;
    const s = e.match(Mp);
    if (!s)
      return t.errors.formatDateTimeError({ value: e, pointer: i, schema: n });
    if (s.groups.second === "60") {
      if (/23:59:60(z|\+00:00)/i.test(e))
        return;
      const a = s.groups.time.match(/(\d+):(\d+):/), f = s.groups.offset.match(/(\d+):(\d+)/);
      if (f) {
        const d = parseInt(a[1]), l = parseInt(f[1]), c = parseInt(a[2]), u = parseInt(f[2]);
        let h;
        /^-/.test(s.groups.offset) ? h = (d + l) * 60 + (c + u) : h = (24 + d - l) * 60 + (c - u);
        const p = Math.floor(h / 60), v = p % 24, g = h - p * 60;
        if (v === 23 && g === 59)
          return;
      }
      return t.errors.formatDateTimeError({ value: e, pointer: i, schema: n });
    }
  },
  uri: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "") && !ba.isUri(e))
      return t.errors.formatURIError({ value: e, pointer: i, schema: n });
  },
  "uri-reference": (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "") && !kp.test(e))
      return t.errors.formatURIReferenceError({ value: e, pointer: i, schema: n });
  },
  "uri-template": (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "") && !Dp.test(e))
      return t.errors.formatURITemplateError({ value: e, pointer: i, schema: n });
  },
  url: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(e === "" || ba.isWebUri(e)))
      return t.errors.formatURLError({ value: e, pointer: i, schema: n });
  },
  uuid: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!(typeof e != "string" || e === "") && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e))
      return t.errors.formatUUIDError({ value: e, pointer: i, schema: n });
  }
};
function Hp(r, e, t = r.rootSchema) {
  var n;
  if (t.oneOf)
    return t.oneOf.map((s) => r.createNode(s).resolveRef().schema);
  if (!((n = t.items) === null || n === void 0) && n.oneOf)
    return t.items.oneOf.map((s) => r.createNode(s).resolveRef().schema);
  const i = r.step(r.createNode(t), e, {});
  return Fe(i) ? i : [i.schema];
}
const Sl = {};
function Bp(r, e = Sl) {
  const { pointer: t = "#", data: n, schema: i = r.rootSchema, withSchemaWarning: s = !1 } = e, a = vp.split(t), f = r.createNode(i).resolveRef(), d = Ol(f, a, n);
  return !s && Fe(d) && d.code === "schema-warning" ? r.createNode(void 0) : d;
}
function Ol(r, e, t = Sl) {
  if (e.length === 0)
    return r.resolveRef();
  const n = e.shift(), i = r.draft.step(r, n, t);
  return Fe(i) ? i : (t = t[n], Ol(i, e, t));
}
var zp = function(e) {
  return Vp(e) && !Fp(e);
};
function Vp(r) {
  return !!r && typeof r == "object";
}
function Fp(r) {
  var e = Object.prototype.toString.call(r);
  return e === "[object RegExp]" || e === "[object Date]" || Gp(r);
}
var Wp = typeof Symbol == "function" && Symbol.for, qp = Wp ? Symbol.for("react.element") : 60103;
function Gp(r) {
  return r.$$typeof === qp;
}
function Kp(r) {
  return Array.isArray(r) ? [] : {};
}
function Si(r, e) {
  return e.clone !== !1 && e.isMergeableObject(r) ? Yn(Kp(r), r, e) : r;
}
function Zp(r, e, t) {
  return r.concat(e).map(function(n) {
    return Si(n, t);
  });
}
function Jp(r, e) {
  if (!e.customMerge)
    return Yn;
  var t = e.customMerge(r);
  return typeof t == "function" ? t : Yn;
}
function Xp(r) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r).filter(function(e) {
    return Object.propertyIsEnumerable.call(r, e);
  }) : [];
}
function $a(r) {
  return Object.keys(r).concat(Xp(r));
}
function Al(r, e) {
  try {
    return e in r;
  } catch {
    return !1;
  }
}
function Qp(r, e) {
  return Al(r, e) && !(Object.hasOwnProperty.call(r, e) && Object.propertyIsEnumerable.call(r, e));
}
function Yp(r, e, t) {
  var n = {};
  return t.isMergeableObject(r) && $a(r).forEach(function(i) {
    n[i] = Si(r[i], t);
  }), $a(e).forEach(function(i) {
    Qp(r, i) || (Al(r, i) && t.isMergeableObject(e[i]) ? n[i] = Jp(i, t)(r[i], e[i], t) : n[i] = Si(e[i], t));
  }), n;
}
function Yn(r, e, t) {
  t = t || {}, t.arrayMerge = t.arrayMerge || Zp, t.isMergeableObject = t.isMergeableObject || zp, t.cloneUnlessOtherwiseSpecified = Si;
  var n = Array.isArray(e), i = Array.isArray(r), s = n === i;
  return s ? n ? t.arrayMerge(r, e, t) : Yp(r, e, t) : Si(e, t);
}
Yn.all = function(e, t) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, i) {
    return Yn(n, i, t);
  }, {});
};
var em = Yn, tm = em;
const rm = /* @__PURE__ */ Er(tm), nm = (r, e) => e, Cl = (r, e) => rm(r, e, { arrayMerge: nm });
function im(r) {
  switch (ce(r)) {
    case "string":
    case "array":
      return (r == null ? void 0 : r.length) === 0;
    case "null":
    case "undefined":
      return !0;
    case "object":
      return Object.keys(r).length === 0;
    default:
      return !1;
  }
}
const wa = Ci.templateDefaultOptions;
let xr;
function Vs(r, e) {
  const { $ref: t } = r;
  return t == null ? !0 : (xr[e] == null || xr[e][t] == null ? 0 : xr[e][t]) < Ci.GET_TEMPLATE_RECURSION_LIMIT;
}
function xa(r, e, t) {
  const { $ref: n } = e;
  return n == null ? e : (xr[t] = xr[t] || {}, xr[t][n] = xr[t][n] || 0, xr[t][n] += 1, r.createNode(e, t).resolveRef().schema);
}
function sm(r, e) {
  if (r === "string")
    return JSON.stringify(e);
  if (typeof e != "string")
    return null;
  try {
    if (e = JSON.parse(e), typeof e === r)
      return e;
  } catch {
  }
  return null;
}
function Pl(r, e, t, n, i) {
  if (ce(e) !== "object")
    return Object.assign({ pointer: n }, e);
  if (Vs(e, n) === !1 && t == null)
    return !1;
  let s = no(xa(r, e, n));
  if (Array.isArray(e.anyOf) && e.anyOf.length > 0) {
    if (Vs(e.anyOf[0], `${n}/anyOf/0`)) {
      const a = xa(r, e.anyOf[0], `${n}/anyOf/0`);
      s = Cl(s, a), s.pointer = e.anyOf[0].$ref || s.pointer;
    }
    delete s.anyOf;
  }
  if (Array.isArray(e.allOf) && e.allOf.map((f, d) => Vs(f, `${n}/allOf/${d}`)).reduceRight((f, d) => f && d, !0)) {
    const f = [];
    let d = no(t);
    for (let c = 0; c < e.allOf.length; c += 1) {
      const u = r.createNode(e.allOf[c], n);
      f.push(tl(u, d).schema), d = or(r, d, { type: e.type, ...f[c] }, `${n}/allOf/${c}`, i);
    }
    const l = rl(r, { allOf: f });
    l && (s = Pt(s, l));
  }
  return s.pointer = s.pointer || e.$ref || n, s;
}
const Ea = (r) => r && typeof r == "object";
function or(r, e, t, n, i) {
  var s;
  if (t == null)
    throw new Error(`getTemplate: missing schema for data: ${JSON.stringify(e)}`);
  if (n == null)
    throw new Error("Missing pointer");
  let a = Pl(r, t, e, n, i);
  if (!Ea(a))
    return;
  if (n = a.pointer, a != null && a.const)
    return a.const;
  if (Array.isArray(a.oneOf))
    if (im(e)) {
      const c = a.oneOf[0].type || a.type || a.const && typeof a.const || ce(e);
      a = { ...a.oneOf[0], type: c };
    } else {
      const c = r.createNode(a, n), u = go(c, e);
      if (Fe(u)) {
        if (e != null && i.removeInvalidData !== !0)
          return e;
        a = a.oneOf[0], e = void 0;
      } else {
        const h = u.schema;
        h.type = (s = h.type) !== null && s !== void 0 ? s : a.type, a = h;
      }
    }
  if (!Ea(a) || a.type == null)
    return;
  if (e instanceof File)
    return e;
  const f = Array.isArray(a.type) ? om(a.type, e, a.default) : a.type, d = ce(e);
  return e != null && d !== f && !(d === "number" && f === "integer") && (e = sm(f, e)), Sa[f] == null ? i.removeInvalidData ? void 0 : e : Sa[f](r, a, e, n, i);
}
function om(r, e, t) {
  if (e == null) {
    if (t != null) {
      const i = ce(t);
      if (r.includes(i))
        return i;
    }
    return r[0];
  }
  const n = ce(e);
  return r.includes(n) ? n : r[0];
}
const Sa = {
  null: (r, e, t) => ni(e, t, null),
  string: (r, e, t) => ni(e, t, ""),
  number: (r, e, t) => ni(e, t, 0),
  integer: (r, e, t) => ni(e, t, 0),
  boolean: (r, e, t) => ni(e, t, !1),
  object: (r, e, t, n, i) => {
    var s;
    const a = e.default === void 0 ? {} : e.default, f = {}, d = i.extendDefaults === !1 && e.default !== void 0 ? [] : (s = e.required) !== null && s !== void 0 ? s : [];
    e.properties && Object.keys(e.properties).forEach((p) => {
      const v = t == null || t[p] == null ? a[p] : t[p], g = d.includes(p);
      (v != null || g || i.addOptionalProps) && (f[p] = or(r, v, e.properties[p], `${n}/properties/${p}`, i));
    });
    const l = r.createNode(e, n);
    let c = il(l, f);
    if (c) {
      c = Pt(e, c), delete c.dependencies;
      const p = or(r, t, c, `${n}/dependencies`, i);
      Object.assign(f, p);
    }
    t && (i.removeInvalidData === !0 && (e.additionalProperties === !1 || ce(e.additionalProperties) === "object") ? ce(e.additionalProperties) === "object" && Object.keys(t).forEach((p) => {
      f[p] == null && r.isValid(t[p], e.additionalProperties) && (f[p] = t[p]);
    }) : Object.keys(t).forEach((p) => f[p] == null && (f[p] = t[p])));
    const u = r.createNode(e, n), h = ds(u, f);
    if (lr(h)) {
      const p = or(r, f, { type: "object", ...h.schema }, n, i);
      Object.assign(f, p);
    }
    return f;
  },
  // build array type of items, ignores additionalItems
  array: (r, e, t, n, i) => {
    var s, a;
    if (e.items == null)
      return t || [];
    const f = e.default === void 0 ? [] : e.default, d = t || f, l = i.extendDefaults === !1 && e.default !== void 0 ? 0 : e.minItems || 0;
    if (Array.isArray(e.items)) {
      for (let u = 0, h = Math.max(l ?? 0, (a = (s = e.items) === null || s === void 0 ? void 0 : s.length) !== null && a !== void 0 ? a : 0); u < h; u += 1)
        d[u] = or(r, d[u] == null ? f[u] : d[u], e.items[u], `${n}/items/${u}`, i);
      return d;
    }
    if (ce(e.items) !== "object")
      return d;
    const c = Pl(r, e.items, t, n, i);
    if (c === !1)
      return d;
    if (n = c.pointer || n, c.oneOf && d.length === 0) {
      const u = c.oneOf[0];
      for (let h = 0; h < l; h += 1)
        d[h] = or(r, d[h] == null ? f[h] : d[h], u, `${n}/oneOf/0`, i);
      return d;
    }
    if (c.oneOf && d.length > 0) {
      const u = Math.max(l, d.length);
      for (let h = 0; h < u; h += 1) {
        let p = d[h] == null ? f[h] : d[h];
        const v = r.createNode(c, n);
        let g = go(v, p);
        g == null || Fe(g) ? p != null && i.removeInvalidData !== !0 ? d[h] = p : (p = void 0, g = c.oneOf[0], d[h] = or(r, p, g, `${n}/oneOf/${h}`, i)) : d[h] = or(r, p, g.schema, `${n}/oneOf/${h}`, i);
      }
      return d;
    }
    if (c.type) {
      for (let u = 0, h = Math.max(l, d.length); u < h; u += 1)
        d[u] = or(r, d[u] == null ? f[u] : d[u], c, `${n}/items`, i);
      return d;
    }
    return d;
  }
};
function ni(r, e, t) {
  return e ?? (r.const ? r.const : r.default === void 0 && Array.isArray(r.enum) ? r.enum[0] : r.default === void 0 ? t : r.default);
}
const am = (r, e, t = r.rootSchema, n) => (xr = {}, n ? or(r, e, t, "#", { ...wa, ...n }) : or(r, e, t, "#", wa));
function cm(r, e, t = r.rootSchema, n = "#") {
  const i = r.createNode(t, n);
  return r.validate(i, e).length === 0;
}
function Oa(r) {
  const e = [];
  let t = 0;
  const n = r.length;
  for (; t < n; ) {
    const i = r.charCodeAt(t++);
    if (i >= 55296 && i <= 56319 && t < n) {
      const s = r.charCodeAt(t++);
      (s & 64512) == 56320 ? e.push(((i & 1023) << 10) + (s & 1023) + 65536) : (e.push(i), t--);
    } else
      e.push(i);
  }
  return e;
}
function Aa(r) {
  const e = `${r}`;
  if (e.includes("e-"))
    return parseInt(e.replace(/.*e-/, ""));
  const t = e.indexOf(".");
  return t === -1 ? 0 : e.length - (t + 1);
}
var lm = function r(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var n, i, s;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length) return !1;
      for (i = n; i-- !== 0; )
        if (!r(e[i], t[i])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if (s = Object.keys(e), n = s.length, n !== Object.keys(t).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var a = s[i];
      if (!r(e[a], t[a])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
};
const Il = /* @__PURE__ */ Er(lm), um = Object.prototype.hasOwnProperty, Ca = (r, e) => !(r[e] === void 0 || !um.call(r, e)), fm = {
  additionalProperties: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (n.additionalProperties === !0 || n.additionalProperties == null || ce(n.patternProperties) === "object" && n.additionalProperties === !1)
      return;
    const s = [];
    let a = Object.keys(e).filter((d) => Ci.propertyBlacklist.includes(d) === !1);
    const f = Object.keys(n.properties || {});
    if (ce(n.patternProperties) === "object") {
      const d = Object.keys(n.patternProperties).map((l) => new RegExp(l));
      a = a.filter((l) => {
        for (let c = 0; c < d.length; c += 1)
          if (d[c].test(l))
            return !1;
        return !0;
      });
    }
    for (let d = 0, l = a.length; d < l; d += 1) {
      const c = a[d];
      if (f.indexOf(c) === -1) {
        const u = ge(n.additionalProperties);
        if (u && Array.isArray(n.additionalProperties.oneOf)) {
          const h = t.resolveOneOf(r.next(n.additionalProperties), e[c]);
          Fe(h) ? s.push(t.errors.additionalPropertiesError({
            pointer: i,
            schema: n.additionalProperties,
            value: e,
            property: a[d],
            properties: f,
            // pass all validation errors
            errors: h.data.errors
          })) : s.push(...t.validate(r.next(h, c), e[c]));
        } else if (u) {
          const h = t.validate(r.next(n.additionalProperties, c), e[c]);
          s.push(...h);
        } else
          s.push(t.errors.noAdditionalPropertiesError({
            pointer: i,
            schema: n,
            value: e,
            property: a[d],
            properties: f
          }));
      }
    }
    return s;
  },
  allOf: gd,
  anyOf: Cd,
  dependencies: Od,
  enum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r, s = ce(e);
    if (s === "object" || s === "array") {
      const a = JSON.stringify(e);
      for (let f = 0; f < n.enum.length; f += 1)
        if (JSON.stringify(n.enum[f]) === a)
          return;
    } else if (n.enum.includes(e))
      return;
    return t.errors.enumError({ pointer: i, schema: n, value: e, values: n.enum });
  },
  format: (r, e) => {
    const { draft: t, schema: n } = r;
    if (t.validateFormat[n.format])
      return t.validateFormat[n.format](r, e);
  },
  items: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (n.items === !1)
      return Array.isArray(e) && e.length === 0 ? void 0 : t.errors.invalidDataError({ pointer: i, value: e, schema: n });
    const s = [];
    for (let a = 0; a < e.length; a += 1) {
      const f = e[a], d = t.step(r.next(n), a, e);
      if (Fe(d))
        return [d];
      const l = t.validate(d, f);
      s.push(...l);
    }
    return s;
  },
  maximum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.maximum)) {
      if (n.maximum && n.maximum < e)
        return t.errors.maximumError({
          maximum: n.maximum,
          length: e,
          value: e,
          pointer: i,
          schema: n
        });
      if (n.maximum && n.exclusiveMaximum === !0 && n.maximum === e)
        return t.errors.maximumError({
          maximum: n.maximum,
          length: e,
          pointer: i,
          schema: n,
          value: e
        });
    }
  },
  maxItems: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.maxItems) && n.maxItems < e.length)
      return t.errors.maxItemsError({
        maximum: n.maxItems,
        length: e.length,
        schema: n,
        value: e,
        pointer: i
      });
  },
  maxLength: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (isNaN(n.maxLength))
      return;
    const s = Oa(e).length;
    if (n.maxLength < s)
      return t.errors.maxLengthError({
        maxLength: n.maxLength,
        length: s,
        pointer: i,
        schema: n,
        value: e
      });
  },
  maxProperties: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r, s = Object.keys(e).length;
    if (isNaN(n.maxProperties) === !1 && n.maxProperties < s)
      return t.errors.maxPropertiesError({
        maxProperties: n.maxProperties,
        length: s,
        pointer: i,
        schema: n,
        value: e
      });
  },
  minLength: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (isNaN(n.minLength))
      return;
    const s = Oa(e).length;
    if (n.minLength > s)
      return n.minLength === 1 ? t.errors.minLengthOneError({
        minLength: n.minLength,
        length: s,
        pointer: i,
        schema: n,
        value: e
      }) : t.errors.minLengthError({
        minLength: n.minLength,
        length: s,
        pointer: i,
        schema: n,
        value: e
      });
  },
  minimum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.minimum)) {
      if (n.minimum > e)
        return t.errors.minimumError({
          minimum: n.minimum,
          length: e,
          pointer: i,
          schema: n,
          value: e
        });
      if (n.exclusiveMinimum === !0 && n.minimum === e)
        return t.errors.minimumError({
          minimum: n.minimum,
          length: e,
          pointer: i,
          schema: n,
          value: e
        });
    }
  },
  minItems: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.minItems) && n.minItems > e.length)
      return n.minItems === 1 ? t.errors.minItemsOneError({
        minItems: n.minItems,
        length: e.length,
        pointer: i,
        schema: n,
        value: e
      }) : t.errors.minItemsError({
        minItems: n.minItems,
        length: e.length,
        pointer: i,
        schema: n,
        value: e
      });
  },
  minProperties: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (isNaN(n.minProperties))
      return;
    const s = Object.keys(e).length;
    if (n.minProperties > s)
      return t.errors.minPropertiesError({
        minProperties: n.minProperties,
        length: s,
        pointer: i,
        schema: n,
        value: e
      });
  },
  multipleOf: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (isNaN(n.multipleOf) || typeof e != "number")
      return;
    const s = Aa(e), a = Aa(n.multipleOf);
    if (s > a)
      return t.errors.multipleOfError({
        multipleOf: n.multipleOf,
        value: e,
        pointer: i,
        schema: n
      });
    const f = Math.pow(10, a), d = Math.round(e * f), l = Math.round(n.multipleOf * f);
    if (d % l / f !== 0)
      return t.errors.multipleOfError({
        multipleOf: n.multipleOf,
        value: e,
        pointer: i,
        schema: n
      });
  },
  not: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r, s = [];
    return t.validate(r.next(n.not), e).length === 0 && s.push(t.errors.notError({ value: e, not: n.not, pointer: i, schema: n })), s;
  },
  oneOf: pd,
  pattern: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (new RegExp(n.pattern, "u").test(e) === !1)
      return t.errors.patternError({
        pattern: n.pattern,
        description: n.patternExample || n.pattern,
        received: e,
        schema: n,
        value: e,
        pointer: i
      });
  },
  patternProperties: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r, s = n.properties || {}, a = n.patternProperties;
    if (ce(a) !== "object")
      return;
    const f = [], d = Object.keys(e), l = Object.keys(a).map((c) => ({
      regex: new RegExp(c),
      patternSchema: a[c]
    }));
    return d.forEach((c) => {
      let u = !1;
      for (let h = 0, p = l.length; h < p; h += 1)
        if (l[h].regex.test(c)) {
          u = !0;
          const v = t.validate(r.next(l[h].patternSchema, c), e[c]);
          v && v.length > 0 && f.push(...v);
        }
      s[c] || u === !1 && n.additionalProperties === !1 && f.push(t.errors.patternPropertiesError({
        key: c,
        pointer: i,
        schema: n,
        value: e,
        patterns: Object.keys(a).join(",")
      }));
    }), f;
  },
  properties: (r, e) => {
    const { draft: t, schema: n } = r, i = [], s = Object.keys(n.properties || {});
    for (let a = 0; a < s.length; a += 1) {
      const f = s[a];
      if (Ca(e, f)) {
        const d = t.step(r, f, e);
        if (Fe(d))
          i.push(d);
        else {
          const l = t.validate(d, e[f]);
          i.push(...l);
        }
      }
    }
    return i;
  },
  // @todo move to separate file: this is custom keyword validation for JsonEditor.properties keyword
  propertiesRequired: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r, s = [], a = Object.keys(n.properties || {});
    for (let f = 0; f < a.length; f += 1) {
      const d = a[f];
      if (e[d] === void 0)
        s.push(t.errors.requiredPropertyError({ key: d, pointer: i, schema: n, value: e }));
      else {
        const l = t.step(r, d, e), c = t.validate(l, e[d]);
        s.push(...c);
      }
    }
    return s;
  },
  required: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (Array.isArray(n.required) !== !1)
      return n.required.map((s) => {
        if (!Ca(e, s))
          return t.errors.requiredPropertyError({
            key: s,
            pointer: i,
            schema: n,
            value: e
          });
      });
  },
  // @todo move to separate file: this is custom keyword validation for JsonEditor.required keyword
  requiredNotEmpty: (r, e) => {
    const { schema: t } = r;
    if (Array.isArray(t.required) !== !1)
      return t.required.map((n) => {
        const { draft: i, schema: s, pointer: a } = r;
        if (e[n] == null || e[n] === "")
          return i.errors.valueNotEmptyError({
            property: n,
            pointer: `${a}/${n}`,
            schema: s,
            value: e
          });
      });
  },
  uniqueItems: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if ((Array.isArray(e) && n.uniqueItems) === !1)
      return;
    const s = [], a = [];
    return e.forEach((f, d) => {
      for (let l = d + 1; l < e.length; l += 1)
        Il(f, e[l]) && !s.includes(l) && (a.push(t.errors.uniqueItemsError({
          pointer: `${i}/${l}`,
          duplicatePointer: `${i}/${d}`,
          arrayPointer: i,
          value: JSON.stringify(f),
          schema: n
        })), s.push(l));
    }), a;
  }
}, hm = {
  array: (r, e, t) => {
    const { draft: n, schema: i, pointer: s } = r, a = t == null ? void 0 : t[e], f = ce(i.items);
    if (f === "object")
      return ss(r.next(i.items, e), a);
    if (f === "array") {
      if (i.items[e] === !0)
        return r.next(wr(a), e);
      if (i.items[e] === !1)
        return n.errors.invalidDataError({
          key: e,
          value: a,
          pointer: s,
          schema: i
        });
      if (i.items[e])
        return n.resolveRef(r.next(i.items[e], e));
      if (i.additionalItems === !1)
        return n.errors.additionalItemsError({
          key: e,
          value: a,
          pointer: s,
          schema: i
        });
      if (i.additionalItems === !0 || i.additionalItems === void 0)
        return r.next(wr(a), e);
      if (ce(i.additionalItems) === "object")
        return r.next(i.additionalItems, e);
      throw new Error(`Invalid schema ${JSON.stringify(i, null, 2)} for ${JSON.stringify(t, null, 2)}`);
    }
    return i.additionalItems !== !1 && a ? r.next(wr(a), e) : new Error(`Invalid array schema for ${e} at ${s}`);
  },
  object: (r, e, t) => {
    var n, i;
    const { draft: s, pointer: a } = r, f = ss(r, t), d = (n = f.schema) !== null && n !== void 0 ? n : f, l = (i = d == null ? void 0 : d.properties) === null || i === void 0 ? void 0 : i[e];
    if (l !== void 0) {
      if (l === !1)
        return s.errors.forbiddenPropertyError({
          property: e,
          value: t,
          pointer: a,
          schema: d
        });
      if (l === !0)
        return r.next(wr(t == null ? void 0 : t[e]), e);
      const h = s.resolveRef(r.next(l, e));
      if (Fe(h))
        return h;
      if (h && Array.isArray(h.schema.oneOf)) {
        const p = r.next(h.schema, e), v = s.resolveOneOf(p, t[e]);
        return Fe(v) ? v : p.merge(v.schema, "oneOf");
      }
      if (h)
        return h;
    }
    const { patternProperties: c } = d;
    if (ce(c) === "object") {
      let h;
      const p = Object.keys(c);
      for (let v = 0, g = p.length; v < g; v += 1)
        if (h = new RegExp(p[v]), h.test(e))
          return r.next(c[p[v]], e);
    }
    const { additionalProperties: u } = d;
    if (ce(u) === "object")
      return r.next(d.additionalProperties, e);
    if (t && (u === void 0 || u === !0)) {
      const h = wr(t[e]);
      return h ? r.next(h, e) : void 0;
    }
    return s.errors.unknownPropertyError({
      property: e,
      value: t,
      pointer: `${a}`,
      schema: d
    });
  }
};
function dm(r, e, t) {
  var n;
  const { draft: i, schema: s, pointer: a } = r, f = ce(t);
  let d = (n = s.type) !== null && n !== void 0 ? n : f;
  if (Array.isArray(d)) {
    if (!d.includes(f))
      return i.errors.typeError({
        value: t,
        pointer: a,
        expected: s.type,
        received: f,
        schema: s
      });
    d = f;
  }
  const l = hm[d];
  if (l) {
    const c = l(r, `${e}`, t);
    return c === void 0 ? i.errors.schemaWarning({ pointer: a, value: t, schema: s, key: e }) : c;
  }
  return new Error(`Unsupported schema type ${s.type} for key ${e}`);
}
const pm = {
  array: (r, e) => r.draft.typeKeywords.array.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e)),
  object: (r, e) => r.draft.typeKeywords.object.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e)),
  string: (r, e) => r.draft.typeKeywords.string.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e)),
  integer: (r, e) => r.draft.typeKeywords.number.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e)),
  number: (r, e) => r.draft.typeKeywords.number.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e)),
  boolean: (r, e) => r.draft.typeKeywords.boolean.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e)),
  null: (r, e) => r.draft.typeKeywords.null.filter((t) => r.schema && r.schema[t] != null).map((t) => r.draft.validateKeyword[t](r, e))
};
function mm(r, e) {
  const t = ce(r);
  return t === "number" && (e === "integer" || Array.isArray(e) && e.includes("integer")) ? Number.isInteger(r) || isNaN(r) ? "integer" : "number" : t;
}
function vm(r, e) {
  if (!lr(r))
    throw new Error("node expected");
  const { draft: t, pointer: n } = r;
  r = r.resolveRef();
  const i = r.schema;
  if (i == null)
    throw new Error("missing schema");
  if (ce(i) === "boolean")
    return i ? [] : [t.errors.invalidDataError({ pointer: n, schema: i, value: e })];
  if (Fe(i))
    return [i];
  if (i.const !== void 0)
    return Il(i.const, e) ? [] : [t.errors.constError({ pointer: n, schema: i, value: e, expected: i.const })];
  const s = mm(e, i.type), a = i.type || s;
  return s !== a && (!Array.isArray(a) || !a.includes(s)) ? [
    t.errors.typeError({
      pointer: n,
      schema: i,
      value: e,
      received: s,
      expected: a
    })
  ] : t.validateType[s] == null ? [t.errors.invalidTypeError({ pointer: n, schema: i, value: e, receivedType: s })] : Ei(t.validateType[s](r, e)).filter(is);
}
function so(r, e, t) {
  const n = r.resolveRef(), { draft: i, schema: s, pointer: a } = n;
  t(s, e, a);
  const f = ce(e);
  f === "object" ? Object.keys(e).forEach((d) => {
    const l = i.step(n, d, e);
    lr(l) && so(l, e[d], t);
  }) : f === "array" && e.forEach((d, l) => {
    const c = i.step(n, l, e);
    lr(c) && so(c, e[l], t);
  });
}
function gm(r, e, t) {
  t.$id = t.$id || e, r.remotes[e] = r.compileSchema(t);
}
const Pa = "__compiled", Ia = "__ref", ym = "getRef", _m = "getRoot", bm = "getContext", $m = /(#|\/)+$/g;
function wm(r, e, t = e, n = !1) {
  if (e === !0 || e === !1 || e === void 0 || e[Pa] !== void 0)
    return e;
  const i = { ids: {}, anchors: {}, remotes: r.remotes }, s = JSON.stringify(e), a = JSON.parse(s);
  if (Object.defineProperties(a, {
    [Pa]: { enumerable: !1, value: !0 },
    [bm]: { enumerable: !1, value: () => i },
    [ym]: {
      enumerable: !1,
      value: _r.bind(null, i, a)
    }
  }), n === !1 && s.includes("$ref") === !1)
    return a;
  a !== t && Object.defineProperty(a, "$defs", {
    enumerable: !0,
    value: Object.assign({}, t.definitions, t.$defs, a.definitions, a.$defs)
  });
  const f = {}, d = () => a;
  return ar(a, (l, c) => {
    var u;
    if (l.$id) {
      if (l.$id.startsWith("http") && /(allOf|anyOf|oneOf|if)\/\d+$/.test(c)) {
        const b = c.replace(/\/(allOf|anyOf|oneOf|if)\/\d+$/, ""), x = Mn.get(a, b);
        l.$id = (u = x.$id) !== null && u !== void 0 ? u : l.$id;
      }
      i.ids[l.$id.replace($m, "")] = c;
    }
    c = `#${c}`.replace(/##+/, "#");
    const h = c.replace(/\/[^/]+$/, ""), p = c.replace(/\/[^/]+\/[^/]+$/, ""), v = f[h] || f[p], g = _a(v, l.$id);
    f[c] = g, i.ids[g] == null && (i.ids[g] = c), l.$anchor && (i.anchors[`${g}#${l.$anchor}`] = c), l.$ref && !l[Ia] && (Object.defineProperty(l, Ia, {
      enumerable: !1,
      value: _a(g, l.$ref)
    }), Object.defineProperty(l, _m, { enumerable: !1, value: d }));
  }), a;
}
const xm = {
  ...fm,
  // @draft >= 6
  contains: (r, e) => {
    var t, n;
    const { draft: i, schema: s, pointer: a } = r;
    if (s.contains === !1)
      return i.errors.containsArrayError({ pointer: a, value: e, schema: s });
    if (s.contains === !0)
      return Array.isArray(e) && e.length === 0 ? i.errors.containsAnyError({ pointer: a, value: e, schema: s }) : void 0;
    if (ce(s.contains) !== "object")
      return;
    let f = 0;
    for (let c = 0; c < e.length; c += 1)
      i.validate(r.next(s.contains, c), e[c]).length === 0 && f++;
    const d = (t = s.maxContains) !== null && t !== void 0 ? t : 1 / 0, l = (n = s.minContains) !== null && n !== void 0 ? n : 1;
    if (!(d >= f && l <= f))
      return d < f ? i.errors.containsMaxError({ pointer: a, schema: s, delta: f - d, value: e }) : l > f ? i.errors.containsMinError({ pointer: a, schema: s, delta: l - f, value: e }) : i.errors.containsError({ pointer: a, schema: s, value: e });
  },
  exclusiveMaximum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.exclusiveMaximum) && n.exclusiveMaximum <= e)
      return t.errors.maximumError({
        maximum: n.exclusiveMaximum,
        length: e,
        pointer: i,
        schema: n,
        value: e
      });
  },
  exclusiveMinimum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.exclusiveMinimum) && n.exclusiveMinimum >= e)
      return t.errors.minimumError({
        minimum: n.exclusiveMinimum,
        length: e,
        pointer: i,
        schema: n,
        value: e
      });
  },
  // @feature if-then-else
  if: md,
  maximum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.maximum) && n.maximum && n.maximum < e)
      return t.errors.maximumError({
        maximum: n.maximum,
        length: e,
        pointer: i,
        schema: n,
        value: e
      });
  },
  minimum: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (!isNaN(n.minimum) && n.minimum > e)
      return t.errors.minimumError({
        minimum: n.minimum,
        length: e,
        pointer: i,
        schema: n,
        value: e
      });
  },
  patternProperties: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r, s = n.properties || {}, a = n.patternProperties;
    if (ce(a) !== "object")
      return;
    const f = [], d = Object.keys(e), l = Object.keys(a).map((c) => ({
      regex: new RegExp(c),
      patternSchema: a[c]
    }));
    return d.forEach((c) => {
      let u = !1;
      for (let h = 0, p = l.length; h < p; h += 1)
        if (l[h].regex.test(c)) {
          if (u = !0, l[h].patternSchema === !1) {
            f.push(t.errors.patternPropertiesError({
              key: c,
              pointer: i,
              patterns: Object.keys(a).join(","),
              schema: n,
              value: e
            }));
            return;
          }
          const v = t.validate(r.next(l[h].patternSchema, c), e[c]);
          v && v.length > 0 && f.push(...v);
        }
      s[c] || u === !1 && n.additionalProperties === !1 && f.push(t.errors.patternPropertiesError({
        key: c,
        pointer: i,
        patterns: Object.keys(a).join(","),
        schema: n,
        value: e
      }));
    }), f;
  },
  // @draft >= 6
  propertyNames: (r, e) => {
    const { draft: t, schema: n, pointer: i } = r;
    if (n.propertyNames === !1)
      return Object.keys(e).length === 0 ? void 0 : t.errors.invalidPropertyNameError({
        property: Object.keys(e),
        pointer: i,
        value: e,
        schema: n
      });
    if (n.propertyNames === !0 || ce(n.propertyNames) !== "object")
      return;
    const s = [], a = Object.keys(e), f = { ...n.propertyNames, type: "string" };
    return a.forEach((d) => {
      const l = r.next(f, d), c = t.validate(l, d);
      c.length > 0 && s.push(t.errors.invalidPropertyNameError({
        property: d,
        pointer: i,
        validationError: c[0],
        value: e[d],
        schema: n
      }));
    }), s;
  }
}, jl = (r) => ge(r) ? Object.keys(r).map((e) => new RegExp(e)) : [];
function Em(r, e, t) {
  var n, i;
  const s = r.draft.resolveRef(r), { schema: a } = s;
  if (a.additionalProperties === !0)
    return !0;
  if (!((n = a.properties) === null || n === void 0) && n[e]) {
    const d = (i = a.properties) === null || i === void 0 ? void 0 : i[e];
    if (s.draft.isValid(t, d))
      return !0;
  }
  if (jl(a.patternProperties).find((d) => d.test(e)))
    return !0;
  if (ge(a.additionalProperties)) {
    const d = a.additionalProperties;
    return s.draft.validate(s.next(d), t);
  }
  return !1;
}
const Sm = {
  // ...omit(Keywords, "dependencies"),
  ...xm,
  dependencies: void 0,
  dependentSchemas: Sd,
  dependentRequired: Ed,
  /**
   * @draft >= 2019-09
   * Similar to additionalProperties, but can "see" into subschemas and across references
   * https://json-schema.org/draft/2019-09/json-schema-core#rfc.section.9.3.2.4
   */
  unevaluatedProperties: (r, e) => {
    var t;
    const { draft: n, schema: i, pointer: s } = r;
    if (!ge(e) || i.unevaluatedProperties == null)
      return;
    let a = Object.keys(e);
    if (a.length === 0)
      return;
    const f = ss(r, e), d = (t = f.schema) !== null && t !== void 0 ? t : f;
    if (d.unevaluatedProperties === !0)
      return;
    const l = jl(d.patternProperties);
    if (a = a.filter((u) => {
      var h;
      return !(!((h = d.properties) === null || h === void 0) && h[u] || ge(i.if) && Em(r.next({ type: "object", ...i.if }), u, e[u]) || l.find((p) => p.test(u)) || d.additionalProperties);
    }), a.length === 0)
      return;
    const c = [];
    return d.unevaluatedProperties === !1 ? (a.forEach((u) => {
      c.push(n.errors.unevaluatedPropertyError({
        pointer: `${s}/${u}`,
        value: JSON.stringify(e[u]),
        schema: i
      }));
    }), c) : (a.forEach((u) => {
      if (ge(d.unevaluatedProperties)) {
        const h = n.validate(r.next(d.unevaluatedProperties, u), e[u]);
        c.push(...h);
      }
    }), c);
  },
  /**
   * @draft >= 2019-09
   * Similar to additionalItems, but can "see" into subschemas and across references
   * https://json-schema.org/draft/2019-09/json-schema-core#rfc.section.9.3.1.3
   */
  unevaluatedItems: (r, e) => {
    var t;
    const { draft: n, schema: i, pointer: s } = r;
    if (!Array.isArray(e) || e.length === 0 || i.unevaluatedItems == null || i.unevaluatedItems === !0)
      return;
    const a = ss(n.resolveRef(r), e), f = (t = a.schema) !== null && t !== void 0 ? t : a;
    if (f.unevaluatedItems === !0 || f.additionalItems === !0)
      return;
    if (ge(i.if)) {
      const l = { type: "array", ...i.if };
      if (n.isValid(e, l) && Array.isArray(l.items) && l.items.length === e.length)
        return;
    }
    if (ge(f.items)) {
      const l = { ...f, unevaluatedItems: void 0 };
      return n.validate(r.next(l), e).map((u) => n.errors.unevaluatedItemsError({ ...u.data }));
    }
    if (Array.isArray(f.items)) {
      const l = [];
      for (let c = f.items.length; c < e.length; c += 1)
        c < f.items.length ? n.validate(r.next(f.items[c], c), e[c]).length > 0 && l.push({ index: c, value: e[c] }) : l.push({ index: c, value: e[c] });
      return l.map((c) => n.errors.unevaluatedItemsError({
        pointer: `${s}/${c.index}`,
        value: JSON.stringify(c.value),
        schema: f.unevaluatedItems
      }));
    }
    if (ge(f.unevaluatedItems))
      return e.map((l, c) => {
        if (!n.isValid(l, f.unevaluatedItems))
          return n.errors.unevaluatedItemsError({
            pointer: `${s}/${c}`,
            value: JSON.stringify(l),
            schema: f.unevaluatedItems
          });
      });
    const d = [];
    return e.forEach((l, c) => {
      d.push(n.errors.unevaluatedItemsError({
        pointer: `${s}/${c}`,
        value: JSON.stringify(l),
        schema: i
      }));
    }), d;
  }
}, Om = {
  typeKeywords: {
    array: [
      "allOf",
      "anyOf",
      "contains",
      "enum",
      "if",
      "items",
      "maxItems",
      "minItems",
      "not",
      "oneOf",
      "unevaluatedItems",
      "uniqueItems"
    ],
    boolean: ["allOf", "anyOf", "enum", "not", "oneOf"],
    object: [
      "additionalProperties",
      "allOf",
      "anyOf",
      // "dependencies",
      "dependentSchemas",
      "dependentRequired",
      "enum",
      "format",
      "if",
      "maxProperties",
      "minProperties",
      "not",
      "oneOf",
      "patternProperties",
      "properties",
      "propertyNames",
      "required",
      "unevaluatedProperties"
      // 2019-09
    ],
    string: [
      "allOf",
      "anyOf",
      "enum",
      "format",
      "if",
      "maxLength",
      "minLength",
      "not",
      "oneOf",
      "pattern"
    ],
    number: [
      "allOf",
      "anyOf",
      "enum",
      "exclusiveMaximum",
      "exclusiveMinimum",
      "format",
      "if",
      "maximum",
      "minimum",
      "multipleOf",
      "not",
      "oneOf"
    ],
    null: ["allOf", "anyOf", "enum", "format", "not", "oneOf"]
  },
  validateKeyword: Sm,
  validateType: pm,
  validateFormat: io,
  errors: $p,
  createNode: $d,
  addRemoteSchema: gm,
  compileSchema: wm,
  createSchemaOf: wr,
  each: so,
  eachSchema: ar,
  getChildSchemaSelection: Hp,
  getSchema: Bp,
  getTemplate: am,
  isValid: cm,
  resolveAllOf: vd,
  resolveAnyOf: Ad,
  resolveOneOf: hd,
  resolveRef: nl,
  step: dm,
  validate: vm,
  templateDefaultOptions: Ci.templateDefaultOptions
};
class Am extends fp {
  constructor(e, t = {}) {
    super(Cl(Om, t), e);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xo = Symbol.for(""), Cm = (r) => {
  if ((r == null ? void 0 : r.r) === xo) return r == null ? void 0 : r._$litStatic$;
}, ja = (r) => ({ _$litStatic$: r, r: xo }), Ta = (r, ...e) => ({ _$litStatic$: e.reduce((t, n, i) => t + ((s) => {
  if (s._$litStatic$ !== void 0) return s._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(n) + r[i + 1], r[0]), r: xo }), Ma = /* @__PURE__ */ new Map(), Pm = (r) => (e, ...t) => {
  const n = t.length;
  let i, s;
  const a = [], f = [];
  let d, l = 0, c = !1;
  for (; l < n; ) {
    for (d = e[l]; l < n && (s = t[l], (i = Cm(s)) !== void 0); ) d += i + e[++l], c = !0;
    l !== n && f.push(s), a.push(d), l++;
  }
  if (l === n && a.push(e[n]), c) {
    const u = a.join("$$lit$$");
    (e = Ma.get(u)) === void 0 && (a.raw = a, Ma.set(u, e = a)), t = f;
  }
  return r(e, ...t);
}, Ra = Pm(G);
var Im = function(r, e, t, n) {
  var i = arguments.length, s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(r, e, t, n);
  else for (var f = r.length - 1; f >= 0; f--) (a = r[f]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, jm = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
};
let La = class extends _e {
  constructor() {
    super("s-json-schema-form-default-group-renderer");
  }
  mount() {
    return jm(this, void 0, void 0, function* () {
    });
  }
  firstUpdated(e) {
  }
  render() {
    return G` <div class="${this.cls("_container")}"></div>`;
  }
};
La = Im([
  Mc("s-json-schema-form-default-group-renderer")
], La);
var ms = function(r, e, t, n) {
  var i = arguments.length, s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(r, e, t, n);
  else for (var f = r.length - 1; f >= 0; f--) (a = r[f]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let Oi = class extends _e {
  constructor() {
    super("s-json-schema-form-stack-group-renderer"), this.buttonText = "Open options", this.isOpen = !1, this.renderedProps = null, this._escapeQueue = null, this._clickOutsideHandler = (e) => {
      this.contains(e.target) || this.close();
    };
  }
  updateSizeProperties() {
    const e = this.children[0];
    if (!e)
      return;
    const t = e.getBoundingClientRect(), n = window.innerHeight, i = Math.floor(n - t.y), s = e.scrollHeight;
    console.log(s, i), s > i && i < t.y && e.style.setProperty("--s-json-schema-form-group-translate-y", `${s * -1}px`), e.style.setProperty("--s-json-schema-form-group-max-height", `${n - t.y}px`);
  }
  open() {
    this.isOpen = !0, this.classList.add("-open"), this._escapeQueue = Zc(() => {
      this.close();
    }), document.addEventListener("click", this._clickOutsideHandler), this.updateSizeProperties();
    const e = this.querySelector("input, select, textarea");
    e == null || e.focus();
  }
  close() {
    var e, t;
    console.log("close"), this.isOpen = !1, this.classList.remove("-open"), (t = (e = this._escapeQueue) === null || e === void 0 ? void 0 : e.cancel) === null || t === void 0 || t.call(e), document.removeEventListener("click", this._clickOutsideHandler);
  }
  render() {
    return G` <div class=${this.cls("_container")}>
      <button
        class="${this.cls("_button")} button -outline"
        @click=${() => {
      this.open();
    }}
      >
        ${this.buttonText}
      </button>
    </div>`;
  }
};
ms([
  Q({ type: String })
], Oi.prototype, "buttonText", void 0);
ms([
  Q({ type: Boolean })
], Oi.prototype, "isOpen", void 0);
ms([
  Q({ type: Object })
], Oi.prototype, "renderedProps", void 0);
Oi = ms([
  Mc("s-json-schema-form-stack-group-renderer")
], Oi);
var Pi = function(r, e, t, n) {
  var i = arguments.length, s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(r, e, t, n);
  else for (var f = r.length - 1; f >= 0; f--) (a = r[f]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, Na = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, e || [])).next());
  });
}, ii = function(r, e, t, n) {
  if (t === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? r !== e || !n : !e.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? n : t === "a" ? n.call(r) : n ? n.value : e.get(r);
}, si = function(r, e, t, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? r !== e || !i : !e.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, t) : i ? i.value = t : e.set(r, t), t;
}, Vi, Fi, Wi, qi, Gi;
class It extends _e {
  static registerWidget(e) {
    this.widgets[e.id] = e;
  }
  static registerGroupRenderer(e) {
    this.groupRenderers[e.id] = e;
  }
  get schema() {
    return ii(this, Vi, "f");
  }
  set schema(e) {
    si(this, Vi, e, "f");
  }
  get values() {
    return ii(this, Fi, "f");
  }
  set values(e) {
    si(this, Fi, e, "f");
  }
  get formClasses() {
    return ii(this, Wi, "f");
  }
  set formClasses(e) {
    si(this, Wi, e, "f");
  }
  get buttonClasses() {
    return ii(this, qi, "f");
  }
  set buttonClasses(e) {
    si(this, qi, e, "f");
  }
  get widgets() {
    return ii(this, Gi, "f");
  }
  set widgets(e) {
    si(this, Gi, e, "f");
  }
  constructor() {
    super("s-json-schema-form"), Vi.set(this, {}), Fi.set(this, {}), Wi.set(this, !1), qi.set(this, !1), Gi.set(this, {}), this._registeredWidgets = {}, this._errorsByPath = {};
  }
  get $form() {
    var e;
    const t = this.querySelector("input, select, textarea");
    return (e = t == null ? void 0 : t.form) !== null && e !== void 0 ? e : null;
  }
  mount() {
    return Na(this, void 0, void 0, function* () {
      this._registeredWidgets = Object.assign(Object.assign({ wysiwyg: {
        id: "wysiwyg",
        tag: "s-json-schema-form-wysiwyg-widget"
      } }, this.widgets), It.widgets);
    });
  }
  update(e) {
    super.update(e), this.$form && (this.$form.checkValidity() ? this.$form.classList.remove("-invalid") : this.$form.classList.add("-invalid"));
  }
  firstUpdated(e) {
    this._handleFormSubmit();
  }
  _handleFormSubmit() {
    const e = this.$form;
    if (!e)
      return;
    const t = e.checkValidity;
    e.checkValidity = () => !(!t.call(e) || Object.keys(this._errorsByPath).length);
  }
  _findInSchema(e, t) {
    return t.reduce((i, s) => {
      var a, f, d;
      return !((a = i == null ? void 0 : i.properties) === null || a === void 0) && a[s] ? i.properties[s] : !((d = (f = i == null ? void 0 : i.items) === null || f === void 0 ? void 0 : f.properties) === null || d === void 0) && d[s] ? i.items.properties[s] : (i == null ? void 0 : i[s]) !== void 0 ? i[s] : null;
    }, e);
  }
  _validateValues(e, t) {
    return new Am(e).validate(t);
  }
  _renderComponentValueErrors(e) {
    var t;
    const n = (t = this._errorsByPath[e.join(".")]) !== null && t !== void 0 ? t : [];
    return n.length ? G`
      <ul class=${`${this.cls("_values-errors")} errors`}>
        ${n.map((i) => G`
            <li class=${`${this.cls("_values-error error")} error`}>
              ${i.message.replace("in `#`", "").replace("at `#`", "").trim()}
            </li>
          `)}
      </ul>
    ` : "";
  }
  _renderComponentValueEditWidget(e, t) {
    var n, i, s, a, f;
    const d = t.filter((p) => isNaN(parseInt(p))), l = this._findInSchema(this.schema, d), c = t[t.length - 1];
    e === null && l.default !== void 0 && (Or(this.values, t, l.default), e = l.default);
    let u = "";
    const h = this._validateValues(l, e);
    if (h.length ? (this._errorsByPath[t.join(".")] = h, this.requestUpdate()) : delete this._errorsByPath[t.join(".")], l)
      switch (!0) {
        case l.enum !== void 0:
          return G`<select
              id="${this.getIdFromPath(t)}"
              name=${c}
              class=${`${this.cls("_values-select")} ${this.formClasses ? "form-select" : ""}`}
              autofocus=${(n = l.autofocus) !== null && n !== void 0 ? n : Ae}
              @change=${(p) => {
            Or(this.values, t, p.target.value), this._emitUpdate({
              value: p.target.value,
              path: t
            });
          }}
            >
              ${l.enum.map((p) => G`<option value=${p} ?selected=${p === e}>
                  ${p}
                </option>`)}
            </select>
            ${u} `;
        case l.type === "string":
          return G`<input
            type="text"
            name=${c}
            .value=${e ?? ""}
            id="${this.getIdFromPath(t)}"
            class=${`${this.cls("_values-input")} ${this.formClasses ? "form-input" : ""}`}
            autofocus=${(i = l.autofocus) !== null && i !== void 0 ? i : Ae}
            placeholder=${(s = l.placeholder) !== null && s !== void 0 ? s : ""}
            @input=${(p) => {
            Or(this.values, t, p.target.value);
          }}
            @change=${(p) => {
            this._emitUpdate({
              value: p.target.value,
              path: t
            });
          }}
          />`;
        case l.type === "boolean":
          return G`<input
            type="checkbox"
            name=${c}
            .checked=${e}
            id="${this.getIdFromPath(t)}"
            class=${`${this.cls("_values-checkbox")} ${this.formClasses ? "form-checkbox" : ""}`}
            autofocus=${(a = l.autofocus) !== null && a !== void 0 ? a : Ae}
            @change=${(p) => {
            Or(this.values, t, p.target.checked), this._emitUpdate({
              value: p.target.checked,
              path: t
            });
          }}
          />`;
        case l.type === "number":
          return G`<input
            type="number"
            name=${c}
            .value=${e}
            min=${l.minimum}
            max=${l.maximum}
            id="${this.getIdFromPath(t)}"
            class=${`${this.cls("_values-input")} ${this.formClasses ? "form-input form-number" : ""}`}
            autofocus=${(f = l.autofocus) !== null && f !== void 0 ? f : Ae}
            @input=${(p) => {
            Or(this.values, t, parseFloat(p.target.value));
          }}
            @change=${(p) => {
            this._emitUpdate({
              value: p.target.value,
              path: t
            });
          }}
          />`;
      }
    return typeof e == "number" ? G`<span class="-number">${e}</span>` : e === !0 ? G`<span class="-true">true</span>` : e === !1 ? G`<span class="-false">false</span>` : e === null ? G`<span class="-null">null</span>` : e === void 0 ? G`<span class="-undefined">undefined</span>` : e;
  }
  _emitUpdate(e) {
    return Na(this, void 0, void 0, function* () {
      this.dispatch("update", {
        detail: {
          values: this.values,
          update: e
        }
      }), this.requestUpdate();
    });
  }
  _createComponentDefaultValuesFromSchema(e) {
    const t = {};
    return bc(e, ({ object: n, prop: i, value: s, path: a }) => {
      if (n.type !== "object" && i === "type") {
        const f = a.split(".").filter((l) => l !== "properties" && l !== "items" && l !== "type");
        let d = n.default;
        if (d === void 0)
          switch (!0) {
            case n.enum !== void 0:
              d = n.enum[0];
              break;
            case s === "string":
              d = "";
              break;
            case s === "boolean":
              d = !1;
              break;
            case s === "number":
              n.minimum !== void 0 ? d = n.minimum : d = 0;
              break;
          }
        t[f.join(".")] = d;
      }
      return s;
    }), Bf(t);
  }
  getIdFromPath(e) {
    return `${this.tagName.toLowerCase()}-value-${e.join("-")}`;
  }
  _renderComponentValuesPreview(e, t = []) {
    var n, i, s, a;
    const f = ho(this.values, t);
    if (e.widget) {
      if (!this._registeredWidgets[e.widget])
        throw new Error(`The widget "${e.widget}" is not registered in carpenter. Make sure to register it using SCarpenterElement.registerWidget static method...`);
      const d = Ta`${ja(this._registeredWidgets[e.widget].tag)}`;
      return Ra`
        <${d} @s-carpenter.update=${(l) => {
        Or(this.values, t, l.detail), this._emitUpdate({
          value: l.detail,
          path: t
        });
      }}></${d}>
      `;
    }
    if (!((i = (n = e.editor) === null || n === void 0 ? void 0 : n.groups) === null || i === void 0) && i.length)
      return G`
        <ul class=${this.cls("_groups")}>
          ${e.editor.groups.map((d) => {
        var l, c, u, h;
        d.type || (d.type = "default");
        const p = {};
        for (let [x, $] of Object.entries(e.properties))
          ((l = $.editor) === null || l === void 0 ? void 0 : l.group) === d.id ? p[x] = $ : !((c = $.editor) === null || c === void 0) && c.group || ($.editor || ($.editor = {}), $.editor.group = "default", p[x]);
        const v = Object.assign(Object.assign({}, e), { title: d.title, description: d.description, properties: p, isGroup: d.id !== "default" });
        delete v.editor;
        const g = Ta`${ja((u = It.groupRenderers[d.type]) === null || u === void 0 ? void 0 : u.tag)}`, b = this._renderComponentValuesPreview(v, t);
        return G`
              <li class=${this.cls(`_group -${(h = d.type) !== null && h !== void 0 ? h : "default"}`)}>
                <div class="${this.cls("_group-body")}">
                  ${Ra`
                    <${g} .renderedProps=${b} ${rd(d)}>        
                    ${b}
                    </${g}>
                `}
                </div>
              </li>
            `;
      })}
        </ul>
      `;
    switch (!0) {
      case (e.type === "object" && e.properties !== void 0):
        return G`
          <div class="${this.cls("_values-object")}">
            <div class=${this.cls("_values-object-inner")}>
              ${e.isGroup ? G`
                    <header class=${this.cls("_group-header")}>
                      <h3 class=${this.cls("_group-title")}>${e.title}</h3>
                      <p class=${this.cls("_group-description")}>
                        ${e.description}
                      </p>
                    </header>
                  ` : ""}
              <ul class=${this.cls("_values-object-items")}>
                ${Object.entries(e.properties).map(([d, l]) => {
          var c, u;
          return l.type === "object" ? G`
                      <li class=${this.cls("_values-object-item")}>
                        <header
                          class="${this.cls("_values-object-item-header")}"
                        >
                          <h3 class="${this.cls("_values-object-item-title")}">
                            ${(c = l.title) !== null && c !== void 0 ? c : d}
                          </h3>
                        </header>
                        ${this._renderComponentValuesPreview(e.properties[d], [...t, d])}
                        ${this._renderComponentValueErrors([...t, d])}
                      </li>
                    ` : G`
                      <li class=${this.cls("_values-item _values-item-object")}>
                        <label
                          for="${this.getIdFromPath([...t, d])}"
                          class="${this.cls("_values-label")} ${this.formClasses ? "form-label" : ""}"
                        >
                          <div
                            class=${this.cls("_values-prop")}
                            style="--prop-length: ${d.length}"
                          >
                            ${(u = l.title) !== null && u !== void 0 ? u : d}
                          </div>
                        </label>
                        ${this._renderComponentValuesPreview(e.properties[d], [...t, d])}
                        ${this._renderComponentValueErrors([...t, d])}
                      </li>
                    `;
        })}
              </ul>
            </div>
          </div>
        `;
      case (e.type === "array" && e.items !== void 0):
        return G`
          <div class=${this.cls("_values-array")}>
            ${e.isGroup ? G`
                  <header class=${this.cls("_group-header")}>
                    <h3 class=${this.cls("_group-title")}>${e.title}</h3>
                    <p class=${this.cls("_group-description")}>
                      ${e.description}
                    </p>
                  </header>
                ` : ""}
            <ul class=${this.cls("_values-array-items")}>
              ${f != null && f.length ? G`
                    ${f.map((d, l) => G`
                        <li class=${this.cls("_values-array-item")}>
                          <div class=${this.cls("_values-array-item-header")}>
                            <p class="${this.cls("_values-array-item-index")}">
                              ${e.title.replace(/s$/, "")} #${l}
                            </p>
                            ${d.id ? G`
                                  <button
                                    class="${this.cls("_values-array-item-id")} button -outline"
                                    @click=${() => {
          ma(d.id);
        }}
                                  >
                                    ID: #${d.id}
                                  </button>
                                ` : ""}
                            <button
                              class="${this.cls("_values-array-item-remove")} button -outline"
                              @click=${() => {
          f.splice(l, 1), this._emitUpdate({
            value: f,
            path: t
          });
        }}
                            >
                              Remove
                            </button>
                          </div>
                          ${this._renderComponentValuesPreview(e.items, [
          ...t,
          `${l}`
        ])}
                          ${this._renderComponentValueErrors([...t, `${l}`])}
                        </li>
                      `)}
                  ` : ""}
              <button
                class=${`${this.cls("_values-add")} ${this.buttonClasses === !0 ? "button" : typeof this.buttonClasses == "string" ? this.buttonClasses : ""}`}
                @click=${() => {
          const d = this._createComponentDefaultValuesFromSchema(e.items);
          f ? f.push(d) : Or(this.values, t, [d]), this._emitUpdate({
            value: f,
            path: t
          }), this.requestUpdate();
        }}
              >
                Add a ${(a = (s = e.items.title) === null || s === void 0 ? void 0 : s.toLowerCase()) !== null && a !== void 0 ? a : "new item"}
              </button>
            </ul>
          </div>
        `;
      default:
        return G`
          <div class=${this.cls("_values-value")}>
            ${this._renderComponentValueEditWidget(f, t)}
          </div>
        `;
    }
  }
  render() {
    var e;
    if (this.schema)
      return G`
        <div class=${this.cls("_inner")}>
          <header class=${this.cls("_header")}>
            <h2 class=${this.cls("_title")}>
              ${this.schema.title}
              ${!((e = this.values) === null || e === void 0) && e.id ? G`<span
                    class="${this.cls("_title-id")} button -outline"
                    @click=${() => {
        ma(this.values.id);
      }}
                    >ID: #${this.values.id}</span
                  >` : ""}
            </h2>
            <p class=${this.cls("_description")}>${this.schema.description}</p>
          </header>
          <div class=${this.cls("_values")}>
            ${this._renderComponentValuesPreview(this.schema)}
          </div>
        </div>
      `;
  }
}
Vi = /* @__PURE__ */ new WeakMap(), Fi = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap();
It.widgets = {};
It.groupRenderers = {};
Pi([
  Q({ type: Object })
], It.prototype, "schema", null);
Pi([
  Q({ type: Object })
], It.prototype, "values", null);
Pi([
  Q({ type: Boolean })
], It.prototype, "formClasses", null);
Pi([
  Q()
], It.prototype, "buttonClasses", null);
Pi([
  Q({ type: Object })
], It.prototype, "widgets", null);
It.registerGroupRenderer({
  id: "default",
  tag: "s-json-schema-form-default-group-renderer"
});
It.registerGroupRenderer({
  id: "stack",
  tag: "s-json-schema-form-stack-group-renderer"
});
It.define("s-json-schema-form", It, {});
var Tm = Object.defineProperty, Tl = (r) => {
  throw TypeError(r);
}, Mm = (r, e, t) => e in r ? Tm(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, at = (r, e, t) => Mm(r, typeof e != "symbol" ? e + "" : e, t), Eo = (r, e, t) => e.has(r) || Tl("Cannot " + t), V = (r, e, t) => (Eo(r, e, "read from private field"), t ? t.call(r) : e.get(r)), Nt = (r, e, t) => e.has(r) ? Tl("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Ve = (r, e, t, n) => (Eo(r, e, "write to private field"), e.set(r, t), t), Rn = (r, e, t) => (Eo(r, e, "access private method"), t);
let Li;
const Rm = new Uint8Array(16);
function Lm() {
  if (!Li && (Li = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Li))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Li(Rm);
}
const mt = [];
for (let r = 0; r < 256; ++r)
  mt.push((r + 256).toString(16).slice(1));
function Nm(r, e = 0) {
  return mt[r[e + 0]] + mt[r[e + 1]] + mt[r[e + 2]] + mt[r[e + 3]] + "-" + mt[r[e + 4]] + mt[r[e + 5]] + "-" + mt[r[e + 6]] + mt[r[e + 7]] + "-" + mt[r[e + 8]] + mt[r[e + 9]] + "-" + mt[r[e + 10]] + mt[r[e + 11]] + mt[r[e + 12]] + mt[r[e + 13]] + mt[r[e + 14]] + mt[r[e + 15]];
}
const km = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ka = {
  randomUUID: km
};
function vs(r, e, t) {
  if (ka.randomUUID && !r)
    return ka.randomUUID();
  r = r || {};
  const n = r.random || (r.rng || Lm)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, Nm(n);
}
var je = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Dm(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function Um(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
function Da(r) {
  return !(!r || typeof r != "object" || r.constructor && r.constructor.name !== "Object" || Object.prototype.toString.call(r) !== "[object Object]" || r !== Object(r));
}
var os = { exports: {} };
os.exports;
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", f = "[object Boolean]", d = "[object Date]", l = "[object Error]", c = "[object Function]", u = "[object GeneratorFunction]", h = "[object Map]", p = "[object Number]", v = "[object Object]", g = "[object Promise]", b = "[object RegExp]", x = "[object Set]", $ = "[object String]", _ = "[object Symbol]", w = "[object WeakMap]", E = "[object ArrayBuffer]", A = "[object DataView]", R = "[object Float32Array]", N = "[object Float64Array]", k = "[object Int8Array]", O = "[object Int16Array]", S = "[object Int32Array]", I = "[object Uint8Array]", C = "[object Uint8ClampedArray]", D = "[object Uint16Array]", H = "[object Uint32Array]", B = /[\\^$.*+?()[\]{}|]/g, W = /\w*$/, X = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, U = {};
  U[s] = U[a] = U[E] = U[A] = U[f] = U[d] = U[R] = U[N] = U[k] = U[O] = U[S] = U[h] = U[p] = U[v] = U[b] = U[x] = U[$] = U[_] = U[I] = U[C] = U[D] = U[H] = !0, U[l] = U[c] = U[w] = !1;
  var T = typeof je == "object" && je && je.Object === Object && je, L = typeof self == "object" && self && self.Object === Object && self, j = T || L || Function("return this")(), M = e && !e.nodeType && e, ie = M && !0 && r && !r.nodeType && r, se = ie && ie.exports === M;
  function We(o, m) {
    return o.set(m[0], m[1]), o;
  }
  function Re(o, m) {
    return o.add(m), o;
  }
  function qe(o, m) {
    for (var y = -1, P = o ? o.length : 0; ++y < P && m(o[y], y, o) !== !1; )
      ;
    return o;
  }
  function Le(o, m) {
    for (var y = -1, P = m.length, F = o.length; ++y < P; )
      o[F + y] = m[y];
    return o;
  }
  function Ge(o, m, y, P) {
    for (var F = -1, K = o ? o.length : 0; ++F < K; )
      y = m(y, o[F], F, o);
    return y;
  }
  function Ke(o, m) {
    for (var y = -1, P = Array(o); ++y < o; )
      P[y] = m(y);
    return P;
  }
  function ue(o, m) {
    return o == null ? void 0 : o[m];
  }
  function Y(o) {
    var m = !1;
    if (o != null && typeof o.toString != "function")
      try {
        m = !!(o + "");
      } catch {
      }
    return m;
  }
  function Ne(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P, F) {
      y[++m] = [F, P];
    }), y;
  }
  function be(o, m) {
    return function(y) {
      return o(m(y));
    };
  }
  function ke(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P) {
      y[++m] = P;
    }), y;
  }
  var Ze = Array.prototype, gt = Function.prototype, fe = Object.prototype, ee = j["__core-js_shared__"], ne = function() {
    var o = /[^.]+$/.exec(ee && ee.keys && ee.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), pe = gt.toString, J = fe.hasOwnProperty, Se = fe.toString, De = RegExp(
    "^" + pe.call(J).replace(B, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Pe = se ? j.Buffer : void 0, yt = j.Symbol, ut = j.Uint8Array, jt = be(Object.getPrototypeOf, Object), Ue = Object.create, Je = fe.propertyIsEnumerable, zt = Ze.splice, ft = Object.getOwnPropertySymbols, Tt = Pe ? Pe.isBuffer : void 0, Vt = be(Object.keys, Object), Xe = xe(j, "DataView"), me = xe(j, "Map"), Qe = xe(j, "Promise"), He = xe(j, "Set"), Ye = xe(j, "WeakMap"), ve = xe(Object, "create"), Ft = de(Xe), Wt = de(me), qt = de(Qe), Mt = de(He), Gt = de(Ye), _t = yt ? yt.prototype : void 0, ht = _t ? _t.valueOf : void 0;
  function oe(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Rt() {
    this.__data__ = ve ? ve(null) : {};
  }
  function ae(o) {
    return this.has(o) && delete this.__data__[o];
  }
  function Oe(o) {
    var m = this.__data__;
    if (ve) {
      var y = m[o];
      return y === n ? void 0 : y;
    }
    return J.call(m, o) ? m[o] : void 0;
  }
  function Lt(o) {
    var m = this.__data__;
    return ve ? m[o] !== void 0 : J.call(m, o);
  }
  function Kt(o, m) {
    var y = this.__data__;
    return y[o] = ve && m === void 0 ? n : m, this;
  }
  oe.prototype.clear = Rt, oe.prototype.delete = ae, oe.prototype.get = Oe, oe.prototype.has = Lt, oe.prototype.set = Kt;
  function te(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Nr() {
    this.__data__ = [];
  }
  function kr(o) {
    var m = this.__data__, y = et(m, o);
    if (y < 0)
      return !1;
    var P = m.length - 1;
    return y == P ? m.pop() : zt.call(m, y, 1), !0;
  }
  function Dr(o) {
    var m = this.__data__, y = et(m, o);
    return y < 0 ? void 0 : m[y][1];
  }
  function Ur(o) {
    return et(this.__data__, o) > -1;
  }
  function Hr(o, m) {
    var y = this.__data__, P = et(y, o);
    return P < 0 ? y.push([o, m]) : y[P][1] = m, this;
  }
  te.prototype.clear = Nr, te.prototype.delete = kr, te.prototype.get = Dr, te.prototype.has = Ur, te.prototype.set = Hr;
  function $e(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Br() {
    this.__data__ = {
      hash: new oe(),
      map: new (me || te)(),
      string: new oe()
    };
  }
  function zr(o) {
    return tt(this, o).delete(o);
  }
  function Vr(o) {
    return tt(this, o).get(o);
  }
  function Fr(o) {
    return tt(this, o).has(o);
  }
  function Wr(o, m) {
    return tt(this, o).set(o, m), this;
  }
  $e.prototype.clear = Br, $e.prototype.delete = zr, $e.prototype.get = Vr, $e.prototype.has = Fr, $e.prototype.set = Wr;
  function we(o) {
    this.__data__ = new te(o);
  }
  function qr() {
    this.__data__ = new te();
  }
  function Gr(o) {
    return this.__data__.delete(o);
  }
  function Kr(o) {
    return this.__data__.get(o);
  }
  function Zr(o) {
    return this.__data__.has(o);
  }
  function Jr(o, m) {
    var y = this.__data__;
    if (y instanceof te) {
      var P = y.__data__;
      if (!me || P.length < t - 1)
        return P.push([o, m]), this;
      y = this.__data__ = new $e(P);
    }
    return y.set(o, m), this;
  }
  we.prototype.clear = qr, we.prototype.delete = Gr, we.prototype.get = Kr, we.prototype.has = Zr, we.prototype.set = Jr;
  function Xr(o, m) {
    var y = wt(o) || wn(o) ? Ke(o.length, String) : [], P = y.length, F = !!P;
    for (var K in o)
      J.call(o, K) && !(F && (K == "length" || yn(K, P))) && y.push(K);
    return y;
  }
  function Zt(o, m, y) {
    var P = o[m];
    (!(J.call(o, m) && Yt(P, y)) || y === void 0 && !(m in o)) && (o[m] = y);
  }
  function et(o, m) {
    for (var y = o.length; y--; )
      if (Yt(o[y][0], m))
        return y;
    return -1;
  }
  function Qr(o, m) {
    return o && Jt(m, xt(m), o);
  }
  function bt(o, m, y, P, F, K, re) {
    var Z;
    if (P && (Z = K ? P(o, F, K, re) : P(o)), Z !== void 0)
      return Z;
    if (!rt(o))
      return o;
    var rr = wt(o);
    if (rr) {
      if (Z = mn(o), !m)
        return hn(o, Z);
    } else {
      var Ee = he(o), nr = Ee == c || Ee == u;
      if (En(o))
        return sn(o, m);
      if (Ee == v || Ee == s || nr && !K) {
        if (Y(o))
          return K ? o : {};
        if (Z = vn(nr ? {} : o), !m)
          return dn(o, Qr(Z, o));
      } else {
        if (!U[Ee])
          return K ? o : {};
        Z = gn(o, Ee, bt, m);
      }
    }
    re || (re = new we());
    var ir = re.get(o);
    if (ir)
      return ir;
    if (re.set(o, Z), !rr)
      var sr = y ? pn(o) : xt(o);
    return qe(sr || o, function(Et, nt) {
      sr && (nt = Et, Et = o[nt]), Zt(Z, nt, bt(Et, m, y, P, nt, o, re));
    }), Z;
  }
  function Yr(o) {
    return rt(o) ? Ue(o) : {};
  }
  function en(o, m, y) {
    var P = m(o);
    return wt(o) ? P : Le(P, y(o));
  }
  function tn(o) {
    return Se.call(o);
  }
  function rn(o) {
    if (!rt(o) || bn(o))
      return !1;
    var m = tr(o) || Y(o) ? De : X;
    return m.test(de(o));
  }
  function nn(o) {
    if (!Qt(o))
      return Vt(o);
    var m = [];
    for (var y in Object(o))
      J.call(o, y) && y != "constructor" && m.push(y);
    return m;
  }
  function sn(o, m) {
    if (m)
      return o.slice();
    var y = new o.constructor(o.length);
    return o.copy(y), y;
  }
  function $t(o) {
    var m = new o.constructor(o.byteLength);
    return new ut(m).set(new ut(o)), m;
  }
  function on(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.byteLength);
  }
  function an(o, m, y) {
    var P = m ? y(Ne(o), !0) : Ne(o);
    return Ge(P, We, new o.constructor());
  }
  function cn(o) {
    var m = new o.constructor(o.source, W.exec(o));
    return m.lastIndex = o.lastIndex, m;
  }
  function ln(o, m, y) {
    var P = m ? y(ke(o), !0) : ke(o);
    return Ge(P, Re, new o.constructor());
  }
  function un(o) {
    return ht ? Object(ht.call(o)) : {};
  }
  function fn(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.length);
  }
  function hn(o, m) {
    var y = -1, P = o.length;
    for (m || (m = Array(P)); ++y < P; )
      m[y] = o[y];
    return m;
  }
  function Jt(o, m, y, P) {
    y || (y = {});
    for (var F = -1, K = m.length; ++F < K; ) {
      var re = m[F], Z = void 0;
      Zt(y, re, Z === void 0 ? o[re] : Z);
    }
    return y;
  }
  function dn(o, m) {
    return Jt(o, Xt(o), m);
  }
  function pn(o) {
    return en(o, xt, Xt);
  }
  function tt(o, m) {
    var y = o.__data__;
    return _n(m) ? y[typeof m == "string" ? "string" : "hash"] : y.map;
  }
  function xe(o, m) {
    var y = ue(o, m);
    return rn(y) ? y : void 0;
  }
  var Xt = ft ? be(ft, Object) : An, he = tn;
  (Xe && he(new Xe(new ArrayBuffer(1))) != A || me && he(new me()) != h || Qe && he(Qe.resolve()) != g || He && he(new He()) != x || Ye && he(new Ye()) != w) && (he = function(o) {
    var m = Se.call(o), y = m == v ? o.constructor : void 0, P = y ? de(y) : void 0;
    if (P)
      switch (P) {
        case Ft:
          return A;
        case Wt:
          return h;
        case qt:
          return g;
        case Mt:
          return x;
        case Gt:
          return w;
      }
    return m;
  });
  function mn(o) {
    var m = o.length, y = o.constructor(m);
    return m && typeof o[0] == "string" && J.call(o, "index") && (y.index = o.index, y.input = o.input), y;
  }
  function vn(o) {
    return typeof o.constructor == "function" && !Qt(o) ? Yr(jt(o)) : {};
  }
  function gn(o, m, y, P) {
    var F = o.constructor;
    switch (m) {
      case E:
        return $t(o);
      case f:
      case d:
        return new F(+o);
      case A:
        return on(o, P);
      case R:
      case N:
      case k:
      case O:
      case S:
      case I:
      case C:
      case D:
      case H:
        return fn(o, P);
      case h:
        return an(o, P, y);
      case p:
      case $:
        return new F(o);
      case b:
        return cn(o);
      case x:
        return ln(o, P, y);
      case _:
        return un(o);
    }
  }
  function yn(o, m) {
    return m = m ?? i, !!m && (typeof o == "number" || le.test(o)) && o > -1 && o % 1 == 0 && o < m;
  }
  function _n(o) {
    var m = typeof o;
    return m == "string" || m == "number" || m == "symbol" || m == "boolean" ? o !== "__proto__" : o === null;
  }
  function bn(o) {
    return !!ne && ne in o;
  }
  function Qt(o) {
    var m = o && o.constructor, y = typeof m == "function" && m.prototype || fe;
    return o === y;
  }
  function de(o) {
    if (o != null) {
      try {
        return pe.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function $n(o) {
    return bt(o, !1, !0);
  }
  function Yt(o, m) {
    return o === m || o !== o && m !== m;
  }
  function wn(o) {
    return xn(o) && J.call(o, "callee") && (!Je.call(o, "callee") || Se.call(o) == s);
  }
  var wt = Array.isArray;
  function er(o) {
    return o != null && Sn(o.length) && !tr(o);
  }
  function xn(o) {
    return On(o) && er(o);
  }
  var En = Tt || Cn;
  function tr(o) {
    var m = rt(o) ? Se.call(o) : "";
    return m == c || m == u;
  }
  function Sn(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= i;
  }
  function rt(o) {
    var m = typeof o;
    return !!o && (m == "object" || m == "function");
  }
  function On(o) {
    return !!o && typeof o == "object";
  }
  function xt(o) {
    return er(o) ? Xr(o) : nn(o);
  }
  function An() {
    return [];
  }
  function Cn() {
    return !1;
  }
  r.exports = $n;
})(os, os.exports);
os.exports;
var as = { exports: {} };
as.exports;
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, s = "[object Arguments]", a = "[object Array]", f = "[object Boolean]", d = "[object Date]", l = "[object Error]", c = "[object Function]", u = "[object GeneratorFunction]", h = "[object Map]", p = "[object Number]", v = "[object Object]", g = "[object Promise]", b = "[object RegExp]", x = "[object Set]", $ = "[object String]", _ = "[object Symbol]", w = "[object WeakMap]", E = "[object ArrayBuffer]", A = "[object DataView]", R = "[object Float32Array]", N = "[object Float64Array]", k = "[object Int8Array]", O = "[object Int16Array]", S = "[object Int32Array]", I = "[object Uint8Array]", C = "[object Uint8ClampedArray]", D = "[object Uint16Array]", H = "[object Uint32Array]", B = /[\\^$.*+?()[\]{}|]/g, W = /\w*$/, X = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, U = {};
  U[s] = U[a] = U[E] = U[A] = U[f] = U[d] = U[R] = U[N] = U[k] = U[O] = U[S] = U[h] = U[p] = U[v] = U[b] = U[x] = U[$] = U[_] = U[I] = U[C] = U[D] = U[H] = !0, U[l] = U[c] = U[w] = !1;
  var T = typeof je == "object" && je && je.Object === Object && je, L = typeof self == "object" && self && self.Object === Object && self, j = T || L || Function("return this")(), M = e && !e.nodeType && e, ie = M && !0 && r && !r.nodeType && r, se = ie && ie.exports === M;
  function We(o, m) {
    return o.set(m[0], m[1]), o;
  }
  function Re(o, m) {
    return o.add(m), o;
  }
  function qe(o, m) {
    for (var y = -1, P = o ? o.length : 0; ++y < P && m(o[y], y, o) !== !1; )
      ;
    return o;
  }
  function Le(o, m) {
    for (var y = -1, P = m.length, F = o.length; ++y < P; )
      o[F + y] = m[y];
    return o;
  }
  function Ge(o, m, y, P) {
    for (var F = -1, K = o ? o.length : 0; ++F < K; )
      y = m(y, o[F], F, o);
    return y;
  }
  function Ke(o, m) {
    for (var y = -1, P = Array(o); ++y < o; )
      P[y] = m(y);
    return P;
  }
  function ue(o, m) {
    return o == null ? void 0 : o[m];
  }
  function Y(o) {
    var m = !1;
    if (o != null && typeof o.toString != "function")
      try {
        m = !!(o + "");
      } catch {
      }
    return m;
  }
  function Ne(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P, F) {
      y[++m] = [F, P];
    }), y;
  }
  function be(o, m) {
    return function(y) {
      return o(m(y));
    };
  }
  function ke(o) {
    var m = -1, y = Array(o.size);
    return o.forEach(function(P) {
      y[++m] = P;
    }), y;
  }
  var Ze = Array.prototype, gt = Function.prototype, fe = Object.prototype, ee = j["__core-js_shared__"], ne = function() {
    var o = /[^.]+$/.exec(ee && ee.keys && ee.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), pe = gt.toString, J = fe.hasOwnProperty, Se = fe.toString, De = RegExp(
    "^" + pe.call(J).replace(B, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Pe = se ? j.Buffer : void 0, yt = j.Symbol, ut = j.Uint8Array, jt = be(Object.getPrototypeOf, Object), Ue = Object.create, Je = fe.propertyIsEnumerable, zt = Ze.splice, ft = Object.getOwnPropertySymbols, Tt = Pe ? Pe.isBuffer : void 0, Vt = be(Object.keys, Object), Xe = xe(j, "DataView"), me = xe(j, "Map"), Qe = xe(j, "Promise"), He = xe(j, "Set"), Ye = xe(j, "WeakMap"), ve = xe(Object, "create"), Ft = de(Xe), Wt = de(me), qt = de(Qe), Mt = de(He), Gt = de(Ye), _t = yt ? yt.prototype : void 0, ht = _t ? _t.valueOf : void 0;
  function oe(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Rt() {
    this.__data__ = ve ? ve(null) : {};
  }
  function ae(o) {
    return this.has(o) && delete this.__data__[o];
  }
  function Oe(o) {
    var m = this.__data__;
    if (ve) {
      var y = m[o];
      return y === n ? void 0 : y;
    }
    return J.call(m, o) ? m[o] : void 0;
  }
  function Lt(o) {
    var m = this.__data__;
    return ve ? m[o] !== void 0 : J.call(m, o);
  }
  function Kt(o, m) {
    var y = this.__data__;
    return y[o] = ve && m === void 0 ? n : m, this;
  }
  oe.prototype.clear = Rt, oe.prototype.delete = ae, oe.prototype.get = Oe, oe.prototype.has = Lt, oe.prototype.set = Kt;
  function te(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Nr() {
    this.__data__ = [];
  }
  function kr(o) {
    var m = this.__data__, y = et(m, o);
    if (y < 0)
      return !1;
    var P = m.length - 1;
    return y == P ? m.pop() : zt.call(m, y, 1), !0;
  }
  function Dr(o) {
    var m = this.__data__, y = et(m, o);
    return y < 0 ? void 0 : m[y][1];
  }
  function Ur(o) {
    return et(this.__data__, o) > -1;
  }
  function Hr(o, m) {
    var y = this.__data__, P = et(y, o);
    return P < 0 ? y.push([o, m]) : y[P][1] = m, this;
  }
  te.prototype.clear = Nr, te.prototype.delete = kr, te.prototype.get = Dr, te.prototype.has = Ur, te.prototype.set = Hr;
  function $e(o) {
    var m = -1, y = o ? o.length : 0;
    for (this.clear(); ++m < y; ) {
      var P = o[m];
      this.set(P[0], P[1]);
    }
  }
  function Br() {
    this.__data__ = {
      hash: new oe(),
      map: new (me || te)(),
      string: new oe()
    };
  }
  function zr(o) {
    return tt(this, o).delete(o);
  }
  function Vr(o) {
    return tt(this, o).get(o);
  }
  function Fr(o) {
    return tt(this, o).has(o);
  }
  function Wr(o, m) {
    return tt(this, o).set(o, m), this;
  }
  $e.prototype.clear = Br, $e.prototype.delete = zr, $e.prototype.get = Vr, $e.prototype.has = Fr, $e.prototype.set = Wr;
  function we(o) {
    this.__data__ = new te(o);
  }
  function qr() {
    this.__data__ = new te();
  }
  function Gr(o) {
    return this.__data__.delete(o);
  }
  function Kr(o) {
    return this.__data__.get(o);
  }
  function Zr(o) {
    return this.__data__.has(o);
  }
  function Jr(o, m) {
    var y = this.__data__;
    if (y instanceof te) {
      var P = y.__data__;
      if (!me || P.length < t - 1)
        return P.push([o, m]), this;
      y = this.__data__ = new $e(P);
    }
    return y.set(o, m), this;
  }
  we.prototype.clear = qr, we.prototype.delete = Gr, we.prototype.get = Kr, we.prototype.has = Zr, we.prototype.set = Jr;
  function Xr(o, m) {
    var y = wt(o) || wn(o) ? Ke(o.length, String) : [], P = y.length, F = !!P;
    for (var K in o)
      J.call(o, K) && !(F && (K == "length" || yn(K, P))) && y.push(K);
    return y;
  }
  function Zt(o, m, y) {
    var P = o[m];
    (!(J.call(o, m) && Yt(P, y)) || y === void 0 && !(m in o)) && (o[m] = y);
  }
  function et(o, m) {
    for (var y = o.length; y--; )
      if (Yt(o[y][0], m))
        return y;
    return -1;
  }
  function Qr(o, m) {
    return o && Jt(m, xt(m), o);
  }
  function bt(o, m, y, P, F, K, re) {
    var Z;
    if (P && (Z = K ? P(o, F, K, re) : P(o)), Z !== void 0)
      return Z;
    if (!rt(o))
      return o;
    var rr = wt(o);
    if (rr) {
      if (Z = mn(o), !m)
        return hn(o, Z);
    } else {
      var Ee = he(o), nr = Ee == c || Ee == u;
      if (En(o))
        return sn(o, m);
      if (Ee == v || Ee == s || nr && !K) {
        if (Y(o))
          return K ? o : {};
        if (Z = vn(nr ? {} : o), !m)
          return dn(o, Qr(Z, o));
      } else {
        if (!U[Ee])
          return K ? o : {};
        Z = gn(o, Ee, bt, m);
      }
    }
    re || (re = new we());
    var ir = re.get(o);
    if (ir)
      return ir;
    if (re.set(o, Z), !rr)
      var sr = y ? pn(o) : xt(o);
    return qe(sr || o, function(Et, nt) {
      sr && (nt = Et, Et = o[nt]), Zt(Z, nt, bt(Et, m, y, P, nt, o, re));
    }), Z;
  }
  function Yr(o) {
    return rt(o) ? Ue(o) : {};
  }
  function en(o, m, y) {
    var P = m(o);
    return wt(o) ? P : Le(P, y(o));
  }
  function tn(o) {
    return Se.call(o);
  }
  function rn(o) {
    if (!rt(o) || bn(o))
      return !1;
    var m = tr(o) || Y(o) ? De : X;
    return m.test(de(o));
  }
  function nn(o) {
    if (!Qt(o))
      return Vt(o);
    var m = [];
    for (var y in Object(o))
      J.call(o, y) && y != "constructor" && m.push(y);
    return m;
  }
  function sn(o, m) {
    if (m)
      return o.slice();
    var y = new o.constructor(o.length);
    return o.copy(y), y;
  }
  function $t(o) {
    var m = new o.constructor(o.byteLength);
    return new ut(m).set(new ut(o)), m;
  }
  function on(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.byteLength);
  }
  function an(o, m, y) {
    var P = m ? y(Ne(o), !0) : Ne(o);
    return Ge(P, We, new o.constructor());
  }
  function cn(o) {
    var m = new o.constructor(o.source, W.exec(o));
    return m.lastIndex = o.lastIndex, m;
  }
  function ln(o, m, y) {
    var P = m ? y(ke(o), !0) : ke(o);
    return Ge(P, Re, new o.constructor());
  }
  function un(o) {
    return ht ? Object(ht.call(o)) : {};
  }
  function fn(o, m) {
    var y = m ? $t(o.buffer) : o.buffer;
    return new o.constructor(y, o.byteOffset, o.length);
  }
  function hn(o, m) {
    var y = -1, P = o.length;
    for (m || (m = Array(P)); ++y < P; )
      m[y] = o[y];
    return m;
  }
  function Jt(o, m, y, P) {
    y || (y = {});
    for (var F = -1, K = m.length; ++F < K; ) {
      var re = m[F], Z = void 0;
      Zt(y, re, Z === void 0 ? o[re] : Z);
    }
    return y;
  }
  function dn(o, m) {
    return Jt(o, Xt(o), m);
  }
  function pn(o) {
    return en(o, xt, Xt);
  }
  function tt(o, m) {
    var y = o.__data__;
    return _n(m) ? y[typeof m == "string" ? "string" : "hash"] : y.map;
  }
  function xe(o, m) {
    var y = ue(o, m);
    return rn(y) ? y : void 0;
  }
  var Xt = ft ? be(ft, Object) : An, he = tn;
  (Xe && he(new Xe(new ArrayBuffer(1))) != A || me && he(new me()) != h || Qe && he(Qe.resolve()) != g || He && he(new He()) != x || Ye && he(new Ye()) != w) && (he = function(o) {
    var m = Se.call(o), y = m == v ? o.constructor : void 0, P = y ? de(y) : void 0;
    if (P)
      switch (P) {
        case Ft:
          return A;
        case Wt:
          return h;
        case qt:
          return g;
        case Mt:
          return x;
        case Gt:
          return w;
      }
    return m;
  });
  function mn(o) {
    var m = o.length, y = o.constructor(m);
    return m && typeof o[0] == "string" && J.call(o, "index") && (y.index = o.index, y.input = o.input), y;
  }
  function vn(o) {
    return typeof o.constructor == "function" && !Qt(o) ? Yr(jt(o)) : {};
  }
  function gn(o, m, y, P) {
    var F = o.constructor;
    switch (m) {
      case E:
        return $t(o);
      case f:
      case d:
        return new F(+o);
      case A:
        return on(o, P);
      case R:
      case N:
      case k:
      case O:
      case S:
      case I:
      case C:
      case D:
      case H:
        return fn(o, P);
      case h:
        return an(o, P, y);
      case p:
      case $:
        return new F(o);
      case b:
        return cn(o);
      case x:
        return ln(o, P, y);
      case _:
        return un(o);
    }
  }
  function yn(o, m) {
    return m = m ?? i, !!m && (typeof o == "number" || le.test(o)) && o > -1 && o % 1 == 0 && o < m;
  }
  function _n(o) {
    var m = typeof o;
    return m == "string" || m == "number" || m == "symbol" || m == "boolean" ? o !== "__proto__" : o === null;
  }
  function bn(o) {
    return !!ne && ne in o;
  }
  function Qt(o) {
    var m = o && o.constructor, y = typeof m == "function" && m.prototype || fe;
    return o === y;
  }
  function de(o) {
    if (o != null) {
      try {
        return pe.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function $n(o) {
    return bt(o, !0, !0);
  }
  function Yt(o, m) {
    return o === m || o !== o && m !== m;
  }
  function wn(o) {
    return xn(o) && J.call(o, "callee") && (!Je.call(o, "callee") || Se.call(o) == s);
  }
  var wt = Array.isArray;
  function er(o) {
    return o != null && Sn(o.length) && !tr(o);
  }
  function xn(o) {
    return On(o) && er(o);
  }
  var En = Tt || Cn;
  function tr(o) {
    var m = rt(o) ? Se.call(o) : "";
    return m == c || m == u;
  }
  function Sn(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= i;
  }
  function rt(o) {
    var m = typeof o;
    return !!o && (m == "object" || m == "function");
  }
  function On(o) {
    return !!o && typeof o == "object";
  }
  function xt(o) {
    return er(o) ? Xr(o) : nn(o);
  }
  function An() {
    return [];
  }
  function Cn() {
    return !1;
  }
  r.exports = $n;
})(as, as.exports);
as.exports;
var Ua = { exports: {} };
function Hm(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ha = { exports: {} };
const Bm = {}, zm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bm
}, Symbol.toStringTag, { value: "Module" })), Vm = /* @__PURE__ */ Um(zm);
var Ba;
function dr() {
  return Ba || (Ba = 1, function(r, e) {
    (function(t, n) {
      r.exports = n();
    })(je, function() {
      var t = t || function(n, i) {
        var s;
        if (typeof window < "u" && window.crypto && (s = window.crypto), typeof self < "u" && self.crypto && (s = self.crypto), typeof globalThis < "u" && globalThis.crypto && (s = globalThis.crypto), !s && typeof window < "u" && window.msCrypto && (s = window.msCrypto), !s && typeof je < "u" && je.crypto && (s = je.crypto), !s && typeof Hm == "function")
          try {
            s = Vm;
          } catch {
          }
        var a = function() {
          if (s) {
            if (typeof s.getRandomValues == "function")
              try {
                return s.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof s.randomBytes == "function")
              try {
                return s.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, f = Object.create || /* @__PURE__ */ function() {
          function $() {
          }
          return function(_) {
            var w;
            return $.prototype = _, w = new $(), $.prototype = null, w;
          };
        }(), d = {}, l = d.lib = {}, c = l.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function($) {
              var _ = f(this);
              return $ && _.mixIn($), (!_.hasOwnProperty("init") || this.init === _.init) && (_.init = function() {
                _.$super.init.apply(this, arguments);
              }), _.init.prototype = _, _.$super = this, _;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var $ = this.extend();
              return $.init.apply($, arguments), $;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function($) {
              for (var _ in $)
                $.hasOwnProperty(_) && (this[_] = $[_]);
              $.hasOwnProperty("toString") && (this.toString = $.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), u = l.WordArray = c.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function($, _) {
            $ = this.words = $ || [], _ != i ? this.sigBytes = _ : this.sigBytes = $.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function($) {
            return ($ || p).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function($) {
            var _ = this.words, w = $.words, E = this.sigBytes, A = $.sigBytes;
            if (this.clamp(), E % 4)
              for (var R = 0; R < A; R++) {
                var N = w[R >>> 2] >>> 24 - R % 4 * 8 & 255;
                _[E + R >>> 2] |= N << 24 - (E + R) % 4 * 8;
              }
            else
              for (var k = 0; k < A; k += 4)
                _[E + k >>> 2] = w[k >>> 2];
            return this.sigBytes += A, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var $ = this.words, _ = this.sigBytes;
            $[_ >>> 2] &= 4294967295 << 32 - _ % 4 * 8, $.length = n.ceil(_ / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var $ = c.clone.call(this);
            return $.words = this.words.slice(0), $;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function($) {
            for (var _ = [], w = 0; w < $; w += 4)
              _.push(a());
            return new u.init(_, $);
          }
        }), h = d.enc = {}, p = h.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function($) {
            for (var _ = $.words, w = $.sigBytes, E = [], A = 0; A < w; A++) {
              var R = _[A >>> 2] >>> 24 - A % 4 * 8 & 255;
              E.push((R >>> 4).toString(16)), E.push((R & 15).toString(16));
            }
            return E.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function($) {
            for (var _ = $.length, w = [], E = 0; E < _; E += 2)
              w[E >>> 3] |= parseInt($.substr(E, 2), 16) << 24 - E % 8 * 4;
            return new u.init(w, _ / 2);
          }
        }, v = h.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function($) {
            for (var _ = $.words, w = $.sigBytes, E = [], A = 0; A < w; A++) {
              var R = _[A >>> 2] >>> 24 - A % 4 * 8 & 255;
              E.push(String.fromCharCode(R));
            }
            return E.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function($) {
            for (var _ = $.length, w = [], E = 0; E < _; E++)
              w[E >>> 2] |= ($.charCodeAt(E) & 255) << 24 - E % 4 * 8;
            return new u.init(w, _);
          }
        }, g = h.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function($) {
            try {
              return decodeURIComponent(escape(v.stringify($)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function($) {
            return v.parse(unescape(encodeURIComponent($)));
          }
        }, b = l.BufferedBlockAlgorithm = c.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new u.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function($) {
            typeof $ == "string" && ($ = g.parse($)), this._data.concat($), this._nDataBytes += $.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function($) {
            var _, w = this._data, E = w.words, A = w.sigBytes, R = this.blockSize, N = R * 4, k = A / N;
            $ ? k = n.ceil(k) : k = n.max((k | 0) - this._minBufferSize, 0);
            var O = k * R, S = n.min(O * 4, A);
            if (O) {
              for (var I = 0; I < O; I += R)
                this._doProcessBlock(E, I);
              _ = E.splice(0, O), w.sigBytes -= S;
            }
            return new u.init(_, S);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var $ = c.clone.call(this);
            return $._data = this._data.clone(), $;
          },
          _minBufferSize: 0
        });
        l.Hasher = b.extend({
          /**
           * Configuration options.
           */
          cfg: c.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function($) {
            this.cfg = this.cfg.extend($), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            b.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function($) {
            return this._append($), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function($) {
            $ && this._append($);
            var _ = this._doFinalize();
            return _;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function($) {
            return function(_, w) {
              return new $.init(w).finalize(_);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function($) {
            return function(_, w) {
              return new x.HMAC.init($, w).finalize(_);
            };
          }
        });
        var x = d.algo = {};
        return d;
      }(Math);
      return t;
    });
  }(Ha)), Ha.exports;
}
var za;
function Ml() {
  return za || (za = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(dr());
    })(je, function(t) {
      return function() {
        var n = t, i = n.lib, s = i.WordArray, a = n.enc;
        a.Base64 = {
          /**
           * Converts a word array to a Base64 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Base64 string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
           */
          stringify: function(d) {
            var l = d.words, c = d.sigBytes, u = this._map;
            d.clamp();
            for (var h = [], p = 0; p < c; p += 3)
              for (var v = l[p >>> 2] >>> 24 - p % 4 * 8 & 255, g = l[p + 1 >>> 2] >>> 24 - (p + 1) % 4 * 8 & 255, b = l[p + 2 >>> 2] >>> 24 - (p + 2) % 4 * 8 & 255, x = v << 16 | g << 8 | b, $ = 0; $ < 4 && p + $ * 0.75 < c; $++)
                h.push(u.charAt(x >>> 6 * (3 - $) & 63));
            var _ = u.charAt(64);
            if (_)
              for (; h.length % 4; )
                h.push(_);
            return h.join("");
          },
          /**
           * Converts a Base64 string to a word array.
           *
           * @param {string} base64Str The Base64 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
           */
          parse: function(d) {
            var l = d.length, c = this._map, u = this._reverseMap;
            if (!u) {
              u = this._reverseMap = [];
              for (var h = 0; h < c.length; h++)
                u[c.charCodeAt(h)] = h;
            }
            var p = c.charAt(64);
            if (p) {
              var v = d.indexOf(p);
              v !== -1 && (l = v);
            }
            return f(d, l, u);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function f(d, l, c) {
          for (var u = [], h = 0, p = 0; p < l; p++)
            if (p % 4) {
              var v = c[d.charCodeAt(p - 1)] << p % 4 * 2, g = c[d.charCodeAt(p)] >>> 6 - p % 4 * 2, b = v | g;
              u[h >>> 2] |= b << 24 - h % 4 * 8, h++;
            }
          return s.create(u, h);
        }
      }(), t.enc.Base64;
    });
  }(Ua)), Ua.exports;
}
Ml();
var Fm = { exports: {} };
(function(r, e) {
  (function(t, n) {
    r.exports = n(dr());
  })(je, function(t) {
    return t.enc.Utf8;
  });
})(Fm);
var Rl = { exports: {} };
(function(r, e) {
  (function(t, n) {
    r.exports = n(dr());
  })(je, function(t) {
    return function(n) {
      var i = t, s = i.lib, a = s.WordArray, f = s.Hasher, d = i.algo, l = [];
      (function() {
        for (var g = 0; g < 64; g++)
          l[g] = n.abs(n.sin(g + 1)) * 4294967296 | 0;
      })();
      var c = d.MD5 = f.extend({
        _doReset: function() {
          this._hash = new a.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(g, b) {
          for (var x = 0; x < 16; x++) {
            var $ = b + x, _ = g[$];
            g[$] = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360;
          }
          var w = this._hash.words, E = g[b + 0], A = g[b + 1], R = g[b + 2], N = g[b + 3], k = g[b + 4], O = g[b + 5], S = g[b + 6], I = g[b + 7], C = g[b + 8], D = g[b + 9], H = g[b + 10], B = g[b + 11], W = g[b + 12], X = g[b + 13], le = g[b + 14], U = g[b + 15], T = w[0], L = w[1], j = w[2], M = w[3];
          T = u(T, L, j, M, E, 7, l[0]), M = u(M, T, L, j, A, 12, l[1]), j = u(j, M, T, L, R, 17, l[2]), L = u(L, j, M, T, N, 22, l[3]), T = u(T, L, j, M, k, 7, l[4]), M = u(M, T, L, j, O, 12, l[5]), j = u(j, M, T, L, S, 17, l[6]), L = u(L, j, M, T, I, 22, l[7]), T = u(T, L, j, M, C, 7, l[8]), M = u(M, T, L, j, D, 12, l[9]), j = u(j, M, T, L, H, 17, l[10]), L = u(L, j, M, T, B, 22, l[11]), T = u(T, L, j, M, W, 7, l[12]), M = u(M, T, L, j, X, 12, l[13]), j = u(j, M, T, L, le, 17, l[14]), L = u(L, j, M, T, U, 22, l[15]), T = h(T, L, j, M, A, 5, l[16]), M = h(M, T, L, j, S, 9, l[17]), j = h(j, M, T, L, B, 14, l[18]), L = h(L, j, M, T, E, 20, l[19]), T = h(T, L, j, M, O, 5, l[20]), M = h(M, T, L, j, H, 9, l[21]), j = h(j, M, T, L, U, 14, l[22]), L = h(L, j, M, T, k, 20, l[23]), T = h(T, L, j, M, D, 5, l[24]), M = h(M, T, L, j, le, 9, l[25]), j = h(j, M, T, L, N, 14, l[26]), L = h(L, j, M, T, C, 20, l[27]), T = h(T, L, j, M, X, 5, l[28]), M = h(M, T, L, j, R, 9, l[29]), j = h(j, M, T, L, I, 14, l[30]), L = h(L, j, M, T, W, 20, l[31]), T = p(T, L, j, M, O, 4, l[32]), M = p(M, T, L, j, C, 11, l[33]), j = p(j, M, T, L, B, 16, l[34]), L = p(L, j, M, T, le, 23, l[35]), T = p(T, L, j, M, A, 4, l[36]), M = p(M, T, L, j, k, 11, l[37]), j = p(j, M, T, L, I, 16, l[38]), L = p(L, j, M, T, H, 23, l[39]), T = p(T, L, j, M, X, 4, l[40]), M = p(M, T, L, j, E, 11, l[41]), j = p(j, M, T, L, N, 16, l[42]), L = p(L, j, M, T, S, 23, l[43]), T = p(T, L, j, M, D, 4, l[44]), M = p(M, T, L, j, W, 11, l[45]), j = p(j, M, T, L, U, 16, l[46]), L = p(L, j, M, T, R, 23, l[47]), T = v(T, L, j, M, E, 6, l[48]), M = v(M, T, L, j, I, 10, l[49]), j = v(j, M, T, L, le, 15, l[50]), L = v(L, j, M, T, O, 21, l[51]), T = v(T, L, j, M, W, 6, l[52]), M = v(M, T, L, j, N, 10, l[53]), j = v(j, M, T, L, H, 15, l[54]), L = v(L, j, M, T, A, 21, l[55]), T = v(T, L, j, M, C, 6, l[56]), M = v(M, T, L, j, U, 10, l[57]), j = v(j, M, T, L, S, 15, l[58]), L = v(L, j, M, T, X, 21, l[59]), T = v(T, L, j, M, k, 6, l[60]), M = v(M, T, L, j, B, 10, l[61]), j = v(j, M, T, L, R, 15, l[62]), L = v(L, j, M, T, D, 21, l[63]), w[0] = w[0] + T | 0, w[1] = w[1] + L | 0, w[2] = w[2] + j | 0, w[3] = w[3] + M | 0;
        },
        _doFinalize: function() {
          var g = this._data, b = g.words, x = this._nDataBytes * 8, $ = g.sigBytes * 8;
          b[$ >>> 5] |= 128 << 24 - $ % 32;
          var _ = n.floor(x / 4294967296), w = x;
          b[($ + 64 >>> 9 << 4) + 15] = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360, b[($ + 64 >>> 9 << 4) + 14] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360, g.sigBytes = (b.length + 1) * 4, this._process();
          for (var E = this._hash, A = E.words, R = 0; R < 4; R++) {
            var N = A[R];
            A[R] = (N << 8 | N >>> 24) & 16711935 | (N << 24 | N >>> 8) & 4278255360;
          }
          return E;
        },
        clone: function() {
          var g = f.clone.call(this);
          return g._hash = this._hash.clone(), g;
        }
      });
      function u(g, b, x, $, _, w, E) {
        var A = g + (b & x | ~b & $) + _ + E;
        return (A << w | A >>> 32 - w) + b;
      }
      function h(g, b, x, $, _, w, E) {
        var A = g + (b & $ | x & ~$) + _ + E;
        return (A << w | A >>> 32 - w) + b;
      }
      function p(g, b, x, $, _, w, E) {
        var A = g + (b ^ x ^ $) + _ + E;
        return (A << w | A >>> 32 - w) + b;
      }
      function v(g, b, x, $, _, w, E) {
        var A = g + (x ^ (b | ~$)) + _ + E;
        return (A << w | A >>> 32 - w) + b;
      }
      i.MD5 = f._createHelper(c), i.HmacMD5 = f._createHmacHelper(c);
    }(Math), t.MD5;
  });
})(Rl);
var Wm = Rl.exports, qm = { exports: {} }, Va = { exports: {} }, Fa = { exports: {} }, Wa;
function Gm() {
  return Wa || (Wa = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(dr());
    })(je, function(t) {
      return function() {
        var n = t, i = n.lib, s = i.WordArray, a = i.Hasher, f = n.algo, d = [], l = f.SHA1 = a.extend({
          _doReset: function() {
            this._hash = new s.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(c, u) {
            for (var h = this._hash.words, p = h[0], v = h[1], g = h[2], b = h[3], x = h[4], $ = 0; $ < 80; $++) {
              if ($ < 16)
                d[$] = c[u + $] | 0;
              else {
                var _ = d[$ - 3] ^ d[$ - 8] ^ d[$ - 14] ^ d[$ - 16];
                d[$] = _ << 1 | _ >>> 31;
              }
              var w = (p << 5 | p >>> 27) + x + d[$];
              $ < 20 ? w += (v & g | ~v & b) + 1518500249 : $ < 40 ? w += (v ^ g ^ b) + 1859775393 : $ < 60 ? w += (v & g | v & b | g & b) - 1894007588 : w += (v ^ g ^ b) - 899497514, x = b, b = g, g = v << 30 | v >>> 2, v = p, p = w;
            }
            h[0] = h[0] + p | 0, h[1] = h[1] + v | 0, h[2] = h[2] + g | 0, h[3] = h[3] + b | 0, h[4] = h[4] + x | 0;
          },
          _doFinalize: function() {
            var c = this._data, u = c.words, h = this._nDataBytes * 8, p = c.sigBytes * 8;
            return u[p >>> 5] |= 128 << 24 - p % 32, u[(p + 64 >>> 9 << 4) + 14] = Math.floor(h / 4294967296), u[(p + 64 >>> 9 << 4) + 15] = h, c.sigBytes = u.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var c = a.clone.call(this);
            return c._hash = this._hash.clone(), c;
          }
        });
        n.SHA1 = a._createHelper(l), n.HmacSHA1 = a._createHmacHelper(l);
      }(), t.SHA1;
    });
  }(Fa)), Fa.exports;
}
var qa = { exports: {} }, Ga;
function Km() {
  return Ga || (Ga = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(dr());
    })(je, function(t) {
      (function() {
        var n = t, i = n.lib, s = i.Base, a = n.enc, f = a.Utf8, d = n.algo;
        d.HMAC = s.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(l, c) {
            l = this._hasher = new l.init(), typeof c == "string" && (c = f.parse(c));
            var u = l.blockSize, h = u * 4;
            c.sigBytes > h && (c = l.finalize(c)), c.clamp();
            for (var p = this._oKey = c.clone(), v = this._iKey = c.clone(), g = p.words, b = v.words, x = 0; x < u; x++)
              g[x] ^= 1549556828, b[x] ^= 909522486;
            p.sigBytes = v.sigBytes = h, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var l = this._hasher;
            l.reset(), l.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(l) {
            return this._hasher.update(l), this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(l) {
            var c = this._hasher, u = c.finalize(l);
            c.reset();
            var h = c.finalize(this._oKey.clone().concat(u));
            return h;
          }
        });
      })();
    });
  }(qa)), qa.exports;
}
var Ka;
function Ll() {
  return Ka || (Ka = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(dr(), Gm(), Km());
    })(je, function(t) {
      return function() {
        var n = t, i = n.lib, s = i.Base, a = i.WordArray, f = n.algo, d = f.MD5, l = f.EvpKDF = s.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: s.extend({
            keySize: 128 / 32,
            hasher: d,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(c) {
            this.cfg = this.cfg.extend(c);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(c, u) {
            for (var h, p = this.cfg, v = p.hasher.create(), g = a.create(), b = g.words, x = p.keySize, $ = p.iterations; b.length < x; ) {
              h && v.update(h), h = v.update(c).finalize(u), v.reset();
              for (var _ = 1; _ < $; _++)
                h = v.finalize(h), v.reset();
              g.concat(h);
            }
            return g.sigBytes = x * 4, g;
          }
        });
        n.EvpKDF = function(c, u, h) {
          return l.create(h).compute(c, u);
        };
      }(), t.EvpKDF;
    });
  }(Va)), Va.exports;
}
var Za = { exports: {} }, Ja;
function Zm() {
  return Ja || (Ja = 1, function(r, e) {
    (function(t, n, i) {
      r.exports = n(dr(), Ll());
    })(je, function(t) {
      t.lib.Cipher || function(n) {
        var i = t, s = i.lib, a = s.Base, f = s.WordArray, d = s.BufferedBlockAlgorithm, l = i.enc;
        l.Utf8;
        var c = l.Base64, u = i.algo, h = u.EvpKDF, p = s.Cipher = d.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: a.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(O, S) {
            return this.create(this._ENC_XFORM_MODE, O, S);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(O, S) {
            return this.create(this._DEC_XFORM_MODE, O, S);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(O, S, I) {
            this.cfg = this.cfg.extend(I), this._xformMode = O, this._key = S, this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            d.reset.call(this), this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(O) {
            return this._append(O), this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(O) {
            O && this._append(O);
            var S = this._doFinalize();
            return S;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function O(S) {
              return typeof S == "string" ? k : A;
            }
            return function(S) {
              return {
                encrypt: function(I, C, D) {
                  return O(C).encrypt(S, I, C, D);
                },
                decrypt: function(I, C, D) {
                  return O(C).decrypt(S, I, C, D);
                }
              };
            };
          }()
        });
        s.StreamCipher = p.extend({
          _doFinalize: function() {
            var O = this._process(!0);
            return O;
          },
          blockSize: 1
        });
        var v = i.mode = {}, g = s.BlockCipherMode = a.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(O, S) {
            return this.Encryptor.create(O, S);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(O, S) {
            return this.Decryptor.create(O, S);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(O, S) {
            this._cipher = O, this._iv = S;
          }
        }), b = v.CBC = function() {
          var O = g.extend();
          O.Encryptor = O.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(I, C) {
              var D = this._cipher, H = D.blockSize;
              S.call(this, I, C, H), D.encryptBlock(I, C), this._prevBlock = I.slice(C, C + H);
            }
          }), O.Decryptor = O.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(I, C) {
              var D = this._cipher, H = D.blockSize, B = I.slice(C, C + H);
              D.decryptBlock(I, C), S.call(this, I, C, H), this._prevBlock = B;
            }
          });
          function S(I, C, D) {
            var H, B = this._iv;
            B ? (H = B, this._iv = n) : H = this._prevBlock;
            for (var W = 0; W < D; W++)
              I[C + W] ^= H[W];
          }
          return O;
        }(), x = i.pad = {}, $ = x.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(O, S) {
            for (var I = S * 4, C = I - O.sigBytes % I, D = C << 24 | C << 16 | C << 8 | C, H = [], B = 0; B < C; B += 4)
              H.push(D);
            var W = f.create(H, C);
            O.concat(W);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(O) {
            var S = O.words[O.sigBytes - 1 >>> 2] & 255;
            O.sigBytes -= S;
          }
        };
        s.BlockCipher = p.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: p.cfg.extend({
            mode: b,
            padding: $
          }),
          reset: function() {
            var O;
            p.reset.call(this);
            var S = this.cfg, I = S.iv, C = S.mode;
            this._xformMode == this._ENC_XFORM_MODE ? O = C.createEncryptor : (O = C.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == O ? this._mode.init(this, I && I.words) : (this._mode = O.call(C, this, I && I.words), this._mode.__creator = O);
          },
          _doProcessBlock: function(O, S) {
            this._mode.processBlock(O, S);
          },
          _doFinalize: function() {
            var O, S = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (S.pad(this._data, this.blockSize), O = this._process(!0)) : (O = this._process(!0), S.unpad(O)), O;
          },
          blockSize: 128 / 32
        });
        var _ = s.CipherParams = a.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(O) {
            this.mixIn(O);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(O) {
            return (O || this.formatter).stringify(this);
          }
        }), w = i.format = {}, E = w.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(O) {
            var S, I = O.ciphertext, C = O.salt;
            return C ? S = f.create([1398893684, 1701076831]).concat(C).concat(I) : S = I, S.toString(c);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(O) {
            var S, I = c.parse(O), C = I.words;
            return C[0] == 1398893684 && C[1] == 1701076831 && (S = f.create(C.slice(2, 4)), C.splice(0, 4), I.sigBytes -= 16), _.create({ ciphertext: I, salt: S });
          }
        }, A = s.SerializableCipher = a.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: a.extend({
            format: E
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(O, S, I, C) {
            C = this.cfg.extend(C);
            var D = O.createEncryptor(I, C), H = D.finalize(S), B = D.cfg;
            return _.create({
              ciphertext: H,
              key: I,
              iv: B.iv,
              algorithm: O,
              mode: B.mode,
              padding: B.padding,
              blockSize: O.blockSize,
              formatter: C.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(O, S, I, C) {
            C = this.cfg.extend(C), S = this._parse(S, C.format);
            var D = O.createDecryptor(I, C).finalize(S.ciphertext);
            return D;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(O, S) {
            return typeof O == "string" ? S.parse(O, this) : O;
          }
        }), R = i.kdf = {}, N = R.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(O, S, I, C, D) {
            if (C || (C = f.random(64 / 8)), D)
              var H = h.create({ keySize: S + I, hasher: D }).compute(O, C);
            else
              var H = h.create({ keySize: S + I }).compute(O, C);
            var B = f.create(H.words.slice(S), I * 4);
            return H.sigBytes = S * 4, _.create({ key: H, iv: B, salt: C });
          }
        }, k = s.PasswordBasedCipher = A.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: A.cfg.extend({
            kdf: N
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(O, S, I, C) {
            C = this.cfg.extend(C);
            var D = C.kdf.execute(I, O.keySize, O.ivSize, C.salt, C.hasher);
            C.iv = D.iv;
            var H = A.encrypt.call(this, O, S, D.key, C);
            return H.mixIn(D), H;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(O, S, I, C) {
            C = this.cfg.extend(C), S = this._parse(S, C.format);
            var D = C.kdf.execute(I, O.keySize, O.ivSize, S.salt, C.hasher);
            C.iv = D.iv;
            var H = A.decrypt.call(this, O, S, D.key, C);
            return H;
          }
        });
      }();
    });
  }(Za)), Za.exports;
}
(function(r, e) {
  (function(t, n, i) {
    r.exports = n(dr(), Ml(), Wm, Ll(), Zm());
  })(je, function(t) {
    return function() {
      var n = t, i = n.lib, s = i.BlockCipher, a = n.algo, f = [], d = [], l = [], c = [], u = [], h = [], p = [], v = [], g = [], b = [];
      (function() {
        for (var _ = [], w = 0; w < 256; w++)
          w < 128 ? _[w] = w << 1 : _[w] = w << 1 ^ 283;
        for (var E = 0, A = 0, w = 0; w < 256; w++) {
          var R = A ^ A << 1 ^ A << 2 ^ A << 3 ^ A << 4;
          R = R >>> 8 ^ R & 255 ^ 99, f[E] = R, d[R] = E;
          var N = _[E], k = _[N], O = _[k], S = _[R] * 257 ^ R * 16843008;
          l[E] = S << 24 | S >>> 8, c[E] = S << 16 | S >>> 16, u[E] = S << 8 | S >>> 24, h[E] = S;
          var S = O * 16843009 ^ k * 65537 ^ N * 257 ^ E * 16843008;
          p[R] = S << 24 | S >>> 8, v[R] = S << 16 | S >>> 16, g[R] = S << 8 | S >>> 24, b[R] = S, E ? (E = N ^ _[_[_[O ^ N]]], A ^= _[_[A]]) : E = A = 1;
        }
      })();
      var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], $ = a.AES = s.extend({
        _doReset: function() {
          var _;
          if (!(this._nRounds && this._keyPriorReset === this._key)) {
            for (var w = this._keyPriorReset = this._key, E = w.words, A = w.sigBytes / 4, R = this._nRounds = A + 6, N = (R + 1) * 4, k = this._keySchedule = [], O = 0; O < N; O++)
              O < A ? k[O] = E[O] : (_ = k[O - 1], O % A ? A > 6 && O % A == 4 && (_ = f[_ >>> 24] << 24 | f[_ >>> 16 & 255] << 16 | f[_ >>> 8 & 255] << 8 | f[_ & 255]) : (_ = _ << 8 | _ >>> 24, _ = f[_ >>> 24] << 24 | f[_ >>> 16 & 255] << 16 | f[_ >>> 8 & 255] << 8 | f[_ & 255], _ ^= x[O / A | 0] << 24), k[O] = k[O - A] ^ _);
            for (var S = this._invKeySchedule = [], I = 0; I < N; I++) {
              var O = N - I;
              if (I % 4)
                var _ = k[O];
              else
                var _ = k[O - 4];
              I < 4 || O <= 4 ? S[I] = _ : S[I] = p[f[_ >>> 24]] ^ v[f[_ >>> 16 & 255]] ^ g[f[_ >>> 8 & 255]] ^ b[f[_ & 255]];
            }
          }
        },
        encryptBlock: function(_, w) {
          this._doCryptBlock(_, w, this._keySchedule, l, c, u, h, f);
        },
        decryptBlock: function(_, w) {
          var E = _[w + 1];
          _[w + 1] = _[w + 3], _[w + 3] = E, this._doCryptBlock(_, w, this._invKeySchedule, p, v, g, b, d);
          var E = _[w + 1];
          _[w + 1] = _[w + 3], _[w + 3] = E;
        },
        _doCryptBlock: function(_, w, E, A, R, N, k, O) {
          for (var S = this._nRounds, I = _[w] ^ E[0], C = _[w + 1] ^ E[1], D = _[w + 2] ^ E[2], H = _[w + 3] ^ E[3], B = 4, W = 1; W < S; W++) {
            var X = A[I >>> 24] ^ R[C >>> 16 & 255] ^ N[D >>> 8 & 255] ^ k[H & 255] ^ E[B++], le = A[C >>> 24] ^ R[D >>> 16 & 255] ^ N[H >>> 8 & 255] ^ k[I & 255] ^ E[B++], U = A[D >>> 24] ^ R[H >>> 16 & 255] ^ N[I >>> 8 & 255] ^ k[C & 255] ^ E[B++], T = A[H >>> 24] ^ R[I >>> 16 & 255] ^ N[C >>> 8 & 255] ^ k[D & 255] ^ E[B++];
            I = X, C = le, D = U, H = T;
          }
          var X = (O[I >>> 24] << 24 | O[C >>> 16 & 255] << 16 | O[D >>> 8 & 255] << 8 | O[H & 255]) ^ E[B++], le = (O[C >>> 24] << 24 | O[D >>> 16 & 255] << 16 | O[H >>> 8 & 255] << 8 | O[I & 255]) ^ E[B++], U = (O[D >>> 24] << 24 | O[H >>> 16 & 255] << 16 | O[I >>> 8 & 255] << 8 | O[C & 255]) ^ E[B++], T = (O[H >>> 24] << 24 | O[I >>> 16 & 255] << 16 | O[C >>> 8 & 255] << 8 | O[D & 255]) ^ E[B++];
          _[w] = X, _[w + 1] = le, _[w + 2] = U, _[w + 3] = T;
        },
        keySize: 256 / 32
      });
      n.AES = s._createHelper($);
    }(), t.AES;
  });
})(qm);
var Jm = { exports: {} };
(function(r, e) {
  (function(t, n) {
    r.exports = n(dr());
  })(je, function(t) {
    return function(n) {
      var i = t, s = i.lib, a = s.WordArray, f = s.Hasher, d = i.algo, l = [], c = [];
      (function() {
        function p(x) {
          for (var $ = n.sqrt(x), _ = 2; _ <= $; _++)
            if (!(x % _))
              return !1;
          return !0;
        }
        function v(x) {
          return (x - (x | 0)) * 4294967296 | 0;
        }
        for (var g = 2, b = 0; b < 64; )
          p(g) && (b < 8 && (l[b] = v(n.pow(g, 1 / 2))), c[b] = v(n.pow(g, 1 / 3)), b++), g++;
      })();
      var u = [], h = d.SHA256 = f.extend({
        _doReset: function() {
          this._hash = new a.init(l.slice(0));
        },
        _doProcessBlock: function(p, v) {
          for (var g = this._hash.words, b = g[0], x = g[1], $ = g[2], _ = g[3], w = g[4], E = g[5], A = g[6], R = g[7], N = 0; N < 64; N++) {
            if (N < 16)
              u[N] = p[v + N] | 0;
            else {
              var k = u[N - 15], O = (k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3, S = u[N - 2], I = (S << 15 | S >>> 17) ^ (S << 13 | S >>> 19) ^ S >>> 10;
              u[N] = O + u[N - 7] + I + u[N - 16];
            }
            var C = w & E ^ ~w & A, D = b & x ^ b & $ ^ x & $, H = (b << 30 | b >>> 2) ^ (b << 19 | b >>> 13) ^ (b << 10 | b >>> 22), B = (w << 26 | w >>> 6) ^ (w << 21 | w >>> 11) ^ (w << 7 | w >>> 25), W = R + B + C + c[N] + u[N], X = H + D;
            R = A, A = E, E = w, w = _ + W | 0, _ = $, $ = x, x = b, b = W + X | 0;
          }
          g[0] = g[0] + b | 0, g[1] = g[1] + x | 0, g[2] = g[2] + $ | 0, g[3] = g[3] + _ | 0, g[4] = g[4] + w | 0, g[5] = g[5] + E | 0, g[6] = g[6] + A | 0, g[7] = g[7] + R | 0;
        },
        _doFinalize: function() {
          var p = this._data, v = p.words, g = this._nDataBytes * 8, b = p.sigBytes * 8;
          return v[b >>> 5] |= 128 << 24 - b % 32, v[(b + 64 >>> 9 << 4) + 14] = n.floor(g / 4294967296), v[(b + 64 >>> 9 << 4) + 15] = g, p.sigBytes = v.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var p = f.clone.call(this);
          return p._hash = this._hash.clone(), p;
        }
      });
      i.SHA256 = f._createHelper(h), i.HmacSHA256 = f._createHmacHelper(h);
    }(Math), t.SHA256;
  });
})(Jm);
var Xm = { exports: {} }, Xa = { exports: {} }, Qa;
function Qm() {
  return Qa || (Qa = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(dr());
    })(je, function(t) {
      return function(n) {
        var i = t, s = i.lib, a = s.Base, f = s.WordArray, d = i.x64 = {};
        d.Word = a.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(l, c) {
            this.high = l, this.low = c;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        }), d.WordArray = a.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(l, c) {
            l = this.words = l || [], c != n ? this.sigBytes = c : this.sigBytes = l.length * 8;
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            for (var l = this.words, c = l.length, u = [], h = 0; h < c; h++) {
              var p = l[h];
              u.push(p.high), u.push(p.low);
            }
            return f.create(u, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            for (var l = a.clone.call(this), c = l.words = this.words.slice(0), u = c.length, h = 0; h < u; h++)
              c[h] = c[h].clone();
            return l;
          }
        });
      }(), t;
    });
  }(Xa)), Xa.exports;
}
(function(r, e) {
  (function(t, n, i) {
    r.exports = n(dr(), Qm());
  })(je, function(t) {
    return function() {
      var n = t, i = n.lib, s = i.Hasher, a = n.x64, f = a.Word, d = a.WordArray, l = n.algo;
      function c() {
        return f.create.apply(f, arguments);
      }
      var u = [
        c(1116352408, 3609767458),
        c(1899447441, 602891725),
        c(3049323471, 3964484399),
        c(3921009573, 2173295548),
        c(961987163, 4081628472),
        c(1508970993, 3053834265),
        c(2453635748, 2937671579),
        c(2870763221, 3664609560),
        c(3624381080, 2734883394),
        c(310598401, 1164996542),
        c(607225278, 1323610764),
        c(1426881987, 3590304994),
        c(1925078388, 4068182383),
        c(2162078206, 991336113),
        c(2614888103, 633803317),
        c(3248222580, 3479774868),
        c(3835390401, 2666613458),
        c(4022224774, 944711139),
        c(264347078, 2341262773),
        c(604807628, 2007800933),
        c(770255983, 1495990901),
        c(1249150122, 1856431235),
        c(1555081692, 3175218132),
        c(1996064986, 2198950837),
        c(2554220882, 3999719339),
        c(2821834349, 766784016),
        c(2952996808, 2566594879),
        c(3210313671, 3203337956),
        c(3336571891, 1034457026),
        c(3584528711, 2466948901),
        c(113926993, 3758326383),
        c(338241895, 168717936),
        c(666307205, 1188179964),
        c(773529912, 1546045734),
        c(1294757372, 1522805485),
        c(1396182291, 2643833823),
        c(1695183700, 2343527390),
        c(1986661051, 1014477480),
        c(2177026350, 1206759142),
        c(2456956037, 344077627),
        c(2730485921, 1290863460),
        c(2820302411, 3158454273),
        c(3259730800, 3505952657),
        c(3345764771, 106217008),
        c(3516065817, 3606008344),
        c(3600352804, 1432725776),
        c(4094571909, 1467031594),
        c(275423344, 851169720),
        c(430227734, 3100823752),
        c(506948616, 1363258195),
        c(659060556, 3750685593),
        c(883997877, 3785050280),
        c(958139571, 3318307427),
        c(1322822218, 3812723403),
        c(1537002063, 2003034995),
        c(1747873779, 3602036899),
        c(1955562222, 1575990012),
        c(2024104815, 1125592928),
        c(2227730452, 2716904306),
        c(2361852424, 442776044),
        c(2428436474, 593698344),
        c(2756734187, 3733110249),
        c(3204031479, 2999351573),
        c(3329325298, 3815920427),
        c(3391569614, 3928383900),
        c(3515267271, 566280711),
        c(3940187606, 3454069534),
        c(4118630271, 4000239992),
        c(116418474, 1914138554),
        c(174292421, 2731055270),
        c(289380356, 3203993006),
        c(460393269, 320620315),
        c(685471733, 587496836),
        c(852142971, 1086792851),
        c(1017036298, 365543100),
        c(1126000580, 2618297676),
        c(1288033470, 3409855158),
        c(1501505948, 4234509866),
        c(1607167915, 987167468),
        c(1816402316, 1246189591)
      ], h = [];
      (function() {
        for (var v = 0; v < 80; v++)
          h[v] = c();
      })();
      var p = l.SHA512 = s.extend({
        _doReset: function() {
          this._hash = new d.init([
            new f.init(1779033703, 4089235720),
            new f.init(3144134277, 2227873595),
            new f.init(1013904242, 4271175723),
            new f.init(2773480762, 1595750129),
            new f.init(1359893119, 2917565137),
            new f.init(2600822924, 725511199),
            new f.init(528734635, 4215389547),
            new f.init(1541459225, 327033209)
          ]);
        },
        _doProcessBlock: function(v, g) {
          for (var b = this._hash.words, x = b[0], $ = b[1], _ = b[2], w = b[3], E = b[4], A = b[5], R = b[6], N = b[7], k = x.high, O = x.low, S = $.high, I = $.low, C = _.high, D = _.low, H = w.high, B = w.low, W = E.high, X = E.low, le = A.high, U = A.low, T = R.high, L = R.low, j = N.high, M = N.low, ie = k, se = O, We = S, Re = I, qe = C, Le = D, Ge = H, Ke = B, ue = W, Y = X, Ne = le, be = U, ke = T, Ze = L, gt = j, fe = M, ee = 0; ee < 80; ee++) {
            var ne, pe, J = h[ee];
            if (ee < 16)
              pe = J.high = v[g + ee * 2] | 0, ne = J.low = v[g + ee * 2 + 1] | 0;
            else {
              var Se = h[ee - 15], De = Se.high, Pe = Se.low, yt = (De >>> 1 | Pe << 31) ^ (De >>> 8 | Pe << 24) ^ De >>> 7, ut = (Pe >>> 1 | De << 31) ^ (Pe >>> 8 | De << 24) ^ (Pe >>> 7 | De << 25), jt = h[ee - 2], Ue = jt.high, Je = jt.low, zt = (Ue >>> 19 | Je << 13) ^ (Ue << 3 | Je >>> 29) ^ Ue >>> 6, ft = (Je >>> 19 | Ue << 13) ^ (Je << 3 | Ue >>> 29) ^ (Je >>> 6 | Ue << 26), Tt = h[ee - 7], Vt = Tt.high, Xe = Tt.low, me = h[ee - 16], Qe = me.high, He = me.low;
              ne = ut + Xe, pe = yt + Vt + (ne >>> 0 < ut >>> 0 ? 1 : 0), ne = ne + ft, pe = pe + zt + (ne >>> 0 < ft >>> 0 ? 1 : 0), ne = ne + He, pe = pe + Qe + (ne >>> 0 < He >>> 0 ? 1 : 0), J.high = pe, J.low = ne;
            }
            var Ye = ue & Ne ^ ~ue & ke, ve = Y & be ^ ~Y & Ze, Ft = ie & We ^ ie & qe ^ We & qe, Wt = se & Re ^ se & Le ^ Re & Le, qt = (ie >>> 28 | se << 4) ^ (ie << 30 | se >>> 2) ^ (ie << 25 | se >>> 7), Mt = (se >>> 28 | ie << 4) ^ (se << 30 | ie >>> 2) ^ (se << 25 | ie >>> 7), Gt = (ue >>> 14 | Y << 18) ^ (ue >>> 18 | Y << 14) ^ (ue << 23 | Y >>> 9), _t = (Y >>> 14 | ue << 18) ^ (Y >>> 18 | ue << 14) ^ (Y << 23 | ue >>> 9), ht = u[ee], oe = ht.high, Rt = ht.low, ae = fe + _t, Oe = gt + Gt + (ae >>> 0 < fe >>> 0 ? 1 : 0), ae = ae + ve, Oe = Oe + Ye + (ae >>> 0 < ve >>> 0 ? 1 : 0), ae = ae + Rt, Oe = Oe + oe + (ae >>> 0 < Rt >>> 0 ? 1 : 0), ae = ae + ne, Oe = Oe + pe + (ae >>> 0 < ne >>> 0 ? 1 : 0), Lt = Mt + Wt, Kt = qt + Ft + (Lt >>> 0 < Mt >>> 0 ? 1 : 0);
            gt = ke, fe = Ze, ke = Ne, Ze = be, Ne = ue, be = Y, Y = Ke + ae | 0, ue = Ge + Oe + (Y >>> 0 < Ke >>> 0 ? 1 : 0) | 0, Ge = qe, Ke = Le, qe = We, Le = Re, We = ie, Re = se, se = ae + Lt | 0, ie = Oe + Kt + (se >>> 0 < ae >>> 0 ? 1 : 0) | 0;
          }
          O = x.low = O + se, x.high = k + ie + (O >>> 0 < se >>> 0 ? 1 : 0), I = $.low = I + Re, $.high = S + We + (I >>> 0 < Re >>> 0 ? 1 : 0), D = _.low = D + Le, _.high = C + qe + (D >>> 0 < Le >>> 0 ? 1 : 0), B = w.low = B + Ke, w.high = H + Ge + (B >>> 0 < Ke >>> 0 ? 1 : 0), X = E.low = X + Y, E.high = W + ue + (X >>> 0 < Y >>> 0 ? 1 : 0), U = A.low = U + be, A.high = le + Ne + (U >>> 0 < be >>> 0 ? 1 : 0), L = R.low = L + Ze, R.high = T + ke + (L >>> 0 < Ze >>> 0 ? 1 : 0), M = N.low = M + fe, N.high = j + gt + (M >>> 0 < fe >>> 0 ? 1 : 0);
        },
        _doFinalize: function() {
          var v = this._data, g = v.words, b = this._nDataBytes * 8, x = v.sigBytes * 8;
          g[x >>> 5] |= 128 << 24 - x % 32, g[(x + 128 >>> 10 << 5) + 30] = Math.floor(b / 4294967296), g[(x + 128 >>> 10 << 5) + 31] = b, v.sigBytes = g.length * 4, this._process();
          var $ = this._hash.toX32();
          return $;
        },
        clone: function() {
          var v = s.clone.call(this);
          return v._hash = this._hash.clone(), v;
        },
        blockSize: 1024 / 32
      });
      n.SHA512 = s._createHelper(p), n.HmacSHA512 = s._createHmacHelper(p);
    }(), t.SHA512;
  });
})(Xm);
function Ym(r, e) {
  r.innerHTML = e, Array.from(r.querySelectorAll("script")).forEach((t) => {
    var n;
    const i = document.createElement("script");
    Array.from(t.attributes).forEach((a) => {
      i.setAttribute(a.name, a.value);
    });
    const s = document.createTextNode(t.innerHTML);
    i.appendChild(s), (n = t.parentNode) === null || n === void 0 || n.replaceChild(i, t);
  });
}
function e0(r, e) {
  var t;
  const n = Object.assign({ id: `injected-style-${vs()}`, rootNode: void 0 }, e ?? {});
  if (document.querySelector(`#${n.id}`))
    return;
  const i = document.createElement("style");
  if (i.type = "text/css", i.setAttribute("id", n.id), i.innerHTML = r, n.rootNode)
    n.rootNode.appendChild(i);
  else {
    const s = document.querySelector('head link[rel="stylesheet"]');
    s ? (t = s.parentElement) === null || t === void 0 || t.insertBefore(i, s) : document.head.appendChild(i);
  }
  return i;
}
function t0(r) {
  var e;
  const t = r.href;
  let n = !1;
  for (let i = 0; i < document.styleSheets.length; i++)
    document.styleSheets[i].href && !((e = document.styleSheets[i].href) === null || e === void 0) && e.match(t) ? n = !0 : i == document.styleSheets.length - 1;
  return n;
}
function r0(r, e) {
  return new Promise((t, n) => {
    if (t0(r))
      t(r);
    else {
      const i = document.createElement("img");
      i.addEventListener("error", (s) => {
        t(r);
      }), i.src = r.href;
    }
  });
}
function n0(r, e) {
  if (r.nodeName == "#comment" || r.nodeName == "#text")
    return !1;
  const t = Element.prototype;
  return (t.matches || t.webkitMatchesSelector || // @ts-ignore
  t.mozMatchesSelector || // @ts-ignore
  t.msMatchesSelector || function(n) {
    return [].indexOf.call(document.querySelectorAll(n), this) !== -1;
  }).call(r, e);
}
function i0(r, e) {
  const t = r;
  let n = r.parentElement;
  for (; n && n != t.ownerDocument; ) {
    if (typeof e == "function") {
      if (e(n))
        return n;
    } else if (typeof e == "string" && n0(n, e))
      return n;
    n = n.parentNode;
  }
}
function s0(r, e) {
  var t;
  if (e = Object.assign({ x: !0, y: !0 }, e ?? {}), !(r instanceof Element))
    return !1;
  const n = ((t = window.parent) !== null && t !== void 0 ? t : window).getComputedStyle(r);
  var i = n.overflowY.trim(), s = n.overflowX.trim();
  const a = {
    vertical: (i === "scroll" || i === "auto") && r.scrollHeight > r.clientHeight,
    horizontal: (s === "scroll" || s === "auto") && r.scrollWidth > r.clientWidth
  };
  return !!(e.x && a.horizontal || e.y && a.vertical);
}
function o0(r) {
  return i0(r, (e) => s0(e));
}
function a0(r, e = {}) {
  e = Object.assign({}, e);
  const t = document.documentElement.scrollTop || document.body.scrollTop, n = document.documentElement.scrollLeft || document.body.scrollLeft, i = window.innerHeight || document.documentElement.clientHeight, s = window.innerWidth || document.documentElement.clientWidth, a = r.getBoundingClientRect(), f = a.top - t, d = a.left - n, l = a.right - n, c = a.bottom - t, u = f - i <= 0, h = c <= i, p = d >= 0 && d <= s, v = l >= 0 && l <= s;
  return !!((u || h) && (p || v) || f <= 0 && c >= i && d <= 0 && l >= s || f <= 0 && c >= i && d <= 0 && v || f <= 0 && c >= i && l >= s && p || d <= 0 && l >= s && f <= 0 && h || d <= 0 && l >= s && c >= i && u);
}
function c0(r) {
  return new Promise((e) => {
    r.addEventListener("animationend", (t) => {
      e(r);
    }, {
      once: !0
    });
  });
}
var l0 = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, [])).next());
  });
};
function u0(r, e) {
  function t() {
    return [
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`
    ].join(" ");
  }
  const n = Object.assign({ offset: void 0 }, e);
  let i;
  const s = n.offset ? `${n.offset}` : t();
  return new Promise((a) => l0(this, void 0, void 0, function* () {
    const f = {
      root: null,
      // relative to document viewport
      rootMargin: s,
      // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0
      // visible amount of item shown in relation to root
    };
    if (a0(r))
      return a(r);
    function d(c, u) {
      c.forEach((h) => {
        var p;
        h.intersectionRatio > 0 && ((p = u.disconnect) === null || p === void 0 || p.call(u), a(r));
      });
    }
    let l = new IntersectionObserver(d, f);
    l.observe(r), window.addEventListener("resize", (c) => {
      clearTimeout(i), i = setTimeout(() => {
        var u;
        (u = l.disconnect) === null || u === void 0 || u.call(l), f.rootMargin = s, l = new IntersectionObserver(d, f), l.observe(r);
      }, 500);
    });
  }));
}
function f0(r, e) {
  return new Promise((t, n) => {
    const i = Object.assign({ pointerover: !0, pointerout: !0, pointerdown: !0, touchstart: !0, touchend: !0, focus: !0 }, e ?? {});
    function s(h) {
      t(h), r.removeEventListener("pointerover", a), r.removeEventListener("pointerout", f), r.removeEventListener("pointerdown", d), r.removeEventListener("touchstart", l), r.removeEventListener("touchend", c), r.removeEventListener("focus", u), r.removeEventListener("focusin", u);
    }
    function a(h) {
      s("pointerover");
    }
    i.pointerover && r.addEventListener("pointerover", a);
    function f(h) {
      s("pointerout");
    }
    i.pointerout && r.addEventListener("pointerout", f);
    function d(h) {
      s("pointerdown");
    }
    i.pointerdown && r.addEventListener("pointerdown", d);
    function l(h) {
      s("touchstart");
    }
    i.touchstart && r.addEventListener("touchstart", l, {
      passive: !0
    });
    function c(h) {
      s("touchend");
    }
    i.touchend && r.addEventListener("touchend", c);
    function u(h) {
      s("focus");
    }
    i.focus === !0 && (r.addEventListener("focus", u), r.addEventListener("focusin", u));
  });
}
const Ya = /* @__PURE__ */ new WeakMap();
class h0 extends Promise {
  cancel() {
  }
}
function d0(r, e) {
  const t = Object.assign({ offset: "10px", once: !0, whenIn: void 0, whenOut: void 0 }, e ?? {});
  let n;
  function i() {
    return [
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`
    ].join(" ");
  }
  const s = vs(), a = t.offset ? `${t.offset}` : i(), f = new h0((d) => {
    var l;
    const c = {
      root: null,
      // relative to document viewport
      rootMargin: a,
      threshold: 0
      // visible amount of item shown in relation to root
    };
    let u = (l = Ya.get(r)) !== null && l !== void 0 ? l : {};
    Ya.set(r, u);
    function h(p) {
      p.forEach((v) => {
        var g, b;
        if (v.intersectionRatio === 0) {
          if (!u[s])
            return;
          u[s] = !1, (g = t.whenOut) === null || g === void 0 || g.call(t, r);
        } else {
          if (t.once && n.disconnect(), u[s])
            return;
          u[s] = !0, (b = t.whenIn) === null || b === void 0 || b.call(t, r), t.once && d(r);
        }
      });
    }
    n = new IntersectionObserver(h, c), n.observe(r), setTimeout(() => {
      f.cancel = () => {
        n.disconnect(), Promise.resolve(r);
      };
    });
  });
  return f.finally(() => {
    n == null || n.disconnect();
  }), f;
}
var p0 = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, [])).next());
  });
};
function m0(r, e) {
  function t() {
    return [
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`,
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`
    ].join(" ");
  }
  const n = Object.assign({ offset: void 0 }, e);
  let i, s;
  const a = n.offset ? `${n.offset}` : t();
  let f = o0(r);
  return (f == null ? void 0 : f.tagName) === "HTML" && (f = void 0), new Promise((d) => p0(this, void 0, void 0, function* () {
    const l = {
      root: f,
      // relative to document viewport
      rootMargin: a,
      threshold: 0
      // visible amount of item shown in relation to root
    };
    function c(u, h) {
      u.forEach((p) => {
        var v;
        p.intersectionRatio > 0 && ((v = h.disconnect) === null || v === void 0 || v.call(h), d(r));
      });
    }
    i = new IntersectionObserver(c, l), i.observe(r), window.addEventListener("resize", (u) => {
      clearTimeout(s), s = setTimeout(() => {
        var h;
        (h = i.disconnect) === null || h === void 0 || h.call(i), l.rootMargin = a, i = new IntersectionObserver(c, l), i.observe(r);
      }, 500);
    });
  }));
}
function v0(r, e = {}) {
  return new Promise((t, n) => {
    e = Object.assign({ offset: "10px" }, e);
    let i = !1;
    const s = () => {
      i || (a.disconnect(), t(r));
    }, a = new IntersectionObserver((f, d) => {
      f.length && (f[0].intersectionRatio > 0 ? i = !0 : i = !1, s());
    }, {
      root: null,
      // viewport
      rootMargin: `${e.offset}`,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    a.observe(r);
  });
}
function g0(r) {
  r || (r = Array.from(document.querySelectorAll('link[rel="stylesheet"]')));
  const e = [];
  return [].forEach.call(r, (t) => {
    e.push(r0(t));
  }), Promise.all(e);
}
const ec = /* @__PURE__ */ new WeakMap();
function y0(r, e) {
  let t;
  const n = new Promise((i, s) => {
    var a;
    const f = Object.assign({ whenVisible: void 0, whenInvisible: void 0, once: !0 }, e ?? {}), d = (a = ec.get(r)) !== null && a !== void 0 ? a : {};
    ec.set(r, d);
    const l = vs();
    t = new IntersectionObserver(function(c) {
      var u, h;
      if (c[0].intersectionRatio == 0) {
        if (!d[l])
          return;
        d[l] = !1, (u = f.whenInvisible) === null || u === void 0 || u.call(f, r);
      } else {
        if (f.once && t.disconnect(), d[l])
          return;
        d[l] = !0, (h = f.whenVisible) === null || h === void 0 || h.call(f, r), f.once && i(r);
      }
    }), t.observe(r);
  });
  return n.finally(() => {
    t == null || t.disconnect();
  }), n;
}
var _0 = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, [])).next());
  });
};
function tc(r, e, t) {
  const n = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, {});
  return new Promise((i, s) => _0(this, void 0, void 0, function* () {
    Array.isArray(e) || (e = e.split(",").map((f) => f.trim()));
    const a = [];
    if (e.forEach((f) => {
      const d = f.match(/^timeout\:([0-9]+)/);
      if (d && d[1]) {
        const l = parseInt(d[1]), c = new Promise((u) => {
          setTimeout(u, l);
        });
        a.push(c);
        return;
      }
      switch (f) {
        case "inViewport":
          a.push(d0(r, n.whenInViewport));
          break;
        case "nearViewport":
          a.push(m0(r, n.whenNearViewport));
          break;
        case "entersViewport":
          a.push(u0(r, n.whenEntersViewport));
          break;
        case "outOfViewport":
          a.push(v0(r, n.whenOutOfViewport));
          break;
        case "interact":
          a.push(f0(r, n.whenInteract));
          break;
        case "visible":
          a.push(y0(r, {
            whenVisible: n.whenVisible,
            once: !0
          }));
          break;
        case "domReady":
          a.push(__whenDomReady());
          break;
        case "stylesheetsReady":
          a.push(g0(r ? [r] : null));
          break;
        case "animationEnd":
          a.push(c0(r));
          break;
      }
    }), !e.length || e.includes("direct") || e.includes("directly")) {
      i(r);
      return;
    }
    yield Promise.race(a), i(r);
  }));
}
var rc = function(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function f(c) {
      try {
        l(n.next(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      try {
        l(n.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function l(c) {
      c.done ? s(c.value) : i(c.value).then(f, d);
    }
    l((n = n.apply(r, [])).next());
  });
};
function Ki(r, e, t, n = !0) {
  var i, s, a, f, d, l;
  let c, u, h = !1;
  const p = [], v = Object.assign({ rootNode: document, once: !0, afterFirst: void 0, scopes: !0, firstOnly: !1, attributes: [], when: void 0 }, t ?? {}), g = [];
  v.scopes && (c = r.split(",").map((E) => `${E.trim()}:not([s-scope] ${E.trim()})`).join(","));
  function b() {
    return p.length && h && n;
  }
  function x() {
    h = !0, g.forEach((E) => {
      E.cancel();
    }), u == null || u.disconnect();
  }
  function $(E) {
    b() || (e == null || e(E, {
      cancel: x
    }), v.firstOnly && x(), p.includes(E) || p.push(E));
  }
  function _(E, A) {
    return rc(this, void 0, void 0, function* () {
      if (!(!E.matches || b())) {
        if (E.matches(r) && (!v.once || !p.includes(E)))
          if (v.when) {
            if (yield tc(E, [v.when]), b())
              return;
            $(E);
          } else
            $(E);
        w(E, A);
      }
    });
  }
  function w(E, A) {
    !E.querySelectorAll || b() || Array.from(E == null ? void 0 : E.querySelectorAll(A)).forEach((R) => {
      _(R, A);
    });
  }
  if (v.scopes && (v.rootNode === document || // @ts-ignore
  !(!((s = (i = v.rootNode) === null || i === void 0 ? void 0 : i.hasAttribute) === null || s === void 0) && s.call(i, "s-scope")))) {
    let E = {};
    g.push(Ki("[s-scope]", (A) => rc(this, void 0, void 0, function* () {
      const R = A.id || `s-scope-${vs()}`;
      A.id !== R && A.setAttribute("id", R), !b() && (yield tc(A, ["nearViewport"]), !b() && g.push(Ki(r, (N) => {
        _(N, r);
      }, Object.assign({}, t, {
        rootNode: A,
        scopes: !1,
        afterFirst() {
          E[R] && // @ts-ignore
          A._sQuerySelectorLiveScopeDirty || (A._sQuerySelectorLiveScopeDirty = !0, E[R] = !0, A.classList.add("ready"), A.setAttribute("ready", "true"));
        }
      }), !0)));
    }), Object.assign({}, t, {
      firstOnly: !1,
      scopes: !1
    }), !1)), g.push(Ki(c, (A) => {
      _(A, r);
    }, Object.assign({}, t, {
      scopes: !1
    }), !1)), (a = v.afterFirst) === null || a === void 0 || a.call(v);
  } else {
    u = new MutationObserver((A, R) => {
      A.forEach((N) => {
        N.attributeName && _(N.target, r), N.addedNodes && N.addedNodes.forEach((k) => {
          _(k, r);
        });
      });
    });
    let E = {
      childList: !0,
      subtree: !0
    };
    r.split(",").map((A) => A.trim()).forEach((A) => {
      const R = A.match(/\[[^\]]+\]/gm);
      R != null && R.length && R.forEach((N) => {
        var k, O;
        const S = N.split("=")[0].replace(/^\[/, "").replace(/\]$/, "");
        !((k = v.attributes) === null || k === void 0) && k.includes(S) || (O = v.attributes) === null || O === void 0 || O.push(S);
      });
    }), !((f = v.attributes) === null || f === void 0) && f.length && (E = Object.assign(Object.assign({}, E), { attributes: !!(!((d = v.attributes) === null || d === void 0) && d.length), attributeFilter: v.attributes.length ? v.attributes : void 0 })), u.observe(v.rootNode, E), w(v.rootNode, r), (l = v.afterFirst) === null || l === void 0 || l.call(v);
  }
  return {
    cancel: x
  };
}
function oo(r, e) {
  const t = Object.assign({ quotesToRemove: ['"', "'", "”", "`"] }, {});
  return r = r.trim(), t.quotesToRemove.forEach((n) => {
    if (r.substr(0, 1) === n && r.substr(-1) === n) {
      r = r.substr(1), r = r.substr(0, r.length - 1);
      return;
    }
  }), r;
}
function b0() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
var Fs, Ws;
let Ni = !1, ki;
try {
  (Fs = document == null ? void 0 : document.addEventListener) === null || Fs === void 0 || Fs.call(document, "wheel", (r) => {
    Ni = !0, clearTimeout(ki), ki = setTimeout(() => {
      Ni = !1;
    }, 200);
  }), (Ws = document == null ? void 0 : document.addEventListener) === null || Ws === void 0 || Ws.call(document, "touchmove", (r) => {
    Ni = !0, clearTimeout(ki), ki = setTimeout(() => {
      Ni = !1;
    }, 200);
  });
} catch {
}
var nc = { exports: {} };
(function(r, e) {
  (function(t) {
    const n = Function.prototype.toString;
    function i(a) {
      return n.call(a).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
    }
    function s(a) {
      if (typeof a != "function")
        return !1;
      if (/^class[\s{]/.test(n.call(a)))
        return !0;
      const f = i(a);
      return /classCallCheck\(/.test(f) || /TypeError\("Cannot call a class as a function"\)/.test(f);
    }
    r.exports && (e = r.exports = s), e.isClass = s;
  })();
})(nc, nc.exports);
function $0(r) {
  const e = r.concat();
  for (let t = 0; t < e.length; ++t)
    for (let n = t + 1; n < e.length; ++n)
      e[t] === e[n] && e.splice(n--, 1);
  return e;
}
function w0(r, e) {
  if (Array.isArray(e))
    return ic(r, e);
  if (r[e] !== void 0)
    return r[e];
  if (!e || e === "" || e === ".")
    return r;
  e = e.replace(/\[(\w+)\]/g, ".$1"), e = e.replace(/\\\./g, "_dot_"), e = e.replace(/^\./, "");
  let t = [e.replace(/\?/gm, "")];
  const n = e.split(".");
  for (let i = n.length - 1; i >= 0; i--)
    if (n[i].match(/\?$/)) {
      const s = n.slice(0, i), a = n.slice(i + 1);
      t.push([...s, ...a].join(".")), t.push([...s, ...a.filter((f) => !f.match(/\?$/))].join("."));
    }
  t = $0(t.map((i) => i.replace(/\?/gm, "")));
  for (let i = 0; i < t.length; i++) {
    const s = t[i], a = ic(r, s);
    if (a !== void 0)
      return a;
  }
}
function ic(r, e) {
  let t = r, n;
  if (typeof e == "string") {
    if (r[e] !== void 0)
      return r[e];
    if (!e || e === "" || e === ".")
      return r;
    e = e.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
  }
  for (n = [...e].map((i) => typeof i == "string" ? oo(i) : i); n.length; ) {
    let i = n.shift();
    if (typeof i == "string" && (i = i.replace(/\?$/, "")), typeof t != "object" || !(t && i in t))
      return;
    t = t[i];
  }
  return t;
}
function x0(r, e, t, n) {
  const i = Object.assign({ preferAssign: !1 }, {});
  let s = r, a;
  if (Array.isArray(e) && e.length === 1 && (e = e[0]), typeof e == "string") {
    if (!e || e === "" || e === ".") {
      Object.assign(r, t);
      return;
    }
    e = e.replace(/\[(\w+)\]/g, ".[$1]"), a = oo(e).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((f) => oo(f));
  } else Array.isArray(e) && (a = [...e]);
  for (; a.length - 1; ) {
    const f = a.shift();
    f in s || (typeof a[0] == "string" ? a[0].match(/^\[[0-9]+\]$/) ? s[f] = [] : s[f] = {} : s[f] = {}), s[f] || (s[f] = {}), s = s[f];
  }
  if (typeof a[0] == "string" && a[0].match(/^\[[0-9]+\]$/))
    Array.isArray(s) || (s = []), s.push(t);
  else if (Da(s[a[0]]) && Da(t) && i.preferAssign) {
    for (const f in s[a[0]])
      delete s[a[0]][f];
    Object.assign(s[a[0]], t);
  } else
    s[a[0]] = t;
  return w0(r, e);
}
var E0 = Nl;
function Nl(r, e, t) {
  r instanceof RegExp && (r = sc(r, t)), e instanceof RegExp && (e = sc(e, t));
  var n = kl(r, e, t);
  return n && {
    start: n[0],
    end: n[1],
    pre: t.slice(0, n[0]),
    body: t.slice(n[0] + r.length, n[1]),
    post: t.slice(n[1] + e.length)
  };
}
function sc(r, e) {
  var t = e.match(r);
  return t ? t[0] : null;
}
Nl.range = kl;
function kl(r, e, t) {
  var n, i, s, a, f, d = t.indexOf(r), l = t.indexOf(e, d + 1), c = d;
  if (d >= 0 && l > 0) {
    if (r === e)
      return [d, l];
    for (n = [], s = t.length; c >= 0 && !f; )
      c == d ? (n.push(c), d = t.indexOf(r, c + 1)) : n.length == 1 ? f = [n.pop(), l] : (i = n.pop(), i < s && (s = i, a = l), l = t.indexOf(e, c + 1)), c = d < l && d >= 0 ? d : l;
    n.length && (f = [s, a]);
  }
  return f;
}
var Dl = E0, S0 = C0, Ul = "\0SLASH" + Math.random() + "\0", Hl = "\0OPEN" + Math.random() + "\0", So = "\0CLOSE" + Math.random() + "\0", Bl = "\0COMMA" + Math.random() + "\0", zl = "\0PERIOD" + Math.random() + "\0";
function qs(r) {
  return parseInt(r, 10) == r ? parseInt(r, 10) : r.charCodeAt(0);
}
function O0(r) {
  return r.split("\\\\").join(Ul).split("\\{").join(Hl).split("\\}").join(So).split("\\,").join(Bl).split("\\.").join(zl);
}
function A0(r) {
  return r.split(Ul).join("\\").split(Hl).join("{").split(So).join("}").split(Bl).join(",").split(zl).join(".");
}
function Vl(r) {
  if (!r)
    return [""];
  var e = [], t = Dl("{", "}", r);
  if (!t)
    return r.split(",");
  var n = t.pre, i = t.body, s = t.post, a = n.split(",");
  a[a.length - 1] += "{" + i + "}";
  var f = Vl(s);
  return s.length && (a[a.length - 1] += f.shift(), a.push.apply(a, f)), e.push.apply(e, a), e;
}
function C0(r) {
  return r ? (r.substr(0, 2) === "{}" && (r = "\\{\\}" + r.substr(2)), fi(O0(r), !0).map(A0)) : [];
}
function P0(r) {
  return "{" + r + "}";
}
function I0(r) {
  return /^-?0\d/.test(r);
}
function j0(r, e) {
  return r <= e;
}
function T0(r, e) {
  return r >= e;
}
function fi(r, e) {
  var t = [], n = Dl("{", "}", r);
  if (!n) return [r];
  var i = n.pre, s = n.post.length ? fi(n.post, !1) : [""];
  if (/\$$/.test(n.pre))
    for (var a = 0; a < s.length; a++) {
      var f = i + "{" + n.body + "}" + s[a];
      t.push(f);
    }
  else {
    var d = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body), l = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body), c = d || l, u = n.body.indexOf(",") >= 0;
    if (!c && !u)
      return n.post.match(/,.*\}/) ? (r = n.pre + "{" + n.body + So + n.post, fi(r)) : [r];
    var h;
    if (c)
      h = n.body.split(/\.\./);
    else if (h = Vl(n.body), h.length === 1 && (h = fi(h[0], !1).map(P0), h.length === 1))
      return s.map(function(O) {
        return n.pre + h[0] + O;
      });
    var p;
    if (c) {
      var v = qs(h[0]), g = qs(h[1]), b = Math.max(h[0].length, h[1].length), x = h.length == 3 ? Math.abs(qs(h[2])) : 1, $ = j0, _ = g < v;
      _ && (x *= -1, $ = T0);
      var w = h.some(I0);
      p = [];
      for (var E = v; $(E, g); E += x) {
        var A;
        if (l)
          A = String.fromCharCode(E), A === "\\" && (A = "");
        else if (A = String(E), w) {
          var R = b - A.length;
          if (R > 0) {
            var N = new Array(R + 1).join("0");
            E < 0 ? A = "-" + N + A.slice(1) : A = N + A;
          }
        }
        p.push(A);
      }
    } else {
      p = [];
      for (var k = 0; k < h.length; k++)
        p.push.apply(p, fi(h[k], !1));
    }
    for (var k = 0; k < p.length; k++)
      for (var a = 0; a < s.length; a++) {
        var f = i + p[k] + s[a];
        (!e || c || f) && t.push(f);
      }
  }
  return t;
}
const M0 = /* @__PURE__ */ Dm(S0), R0 = 1024 * 64, cs = (r) => {
  if (typeof r != "string")
    throw new TypeError("invalid pattern");
  if (r.length > R0)
    throw new TypeError("pattern is too long");
}, L0 = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
  "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
  "[:ascii:]": ["\\x00-\\x7f", !1],
  "[:blank:]": ["\\p{Zs}\\t", !0],
  "[:cntrl:]": ["\\p{Cc}", !0],
  "[:digit:]": ["\\p{Nd}", !0],
  "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
  "[:lower:]": ["\\p{Ll}", !0],
  "[:print:]": ["\\p{C}", !0],
  "[:punct:]": ["\\p{P}", !0],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
  "[:upper:]": ["\\p{Lu}", !0],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
  "[:xdigit:]": ["A-Fa-f0-9", !1]
}, oi = (r) => r.replace(/[[\]\\-]/g, "\\$&"), N0 = (r) => r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), oc = (r) => r.join(""), k0 = (r, e) => {
  const t = e;
  if (r.charAt(t) !== "[")
    throw new Error("not in a brace expression");
  const n = [], i = [];
  let s = t + 1, a = !1, f = !1, d = !1, l = !1, c = t, u = "";
  e: for (; s < r.length; ) {
    const v = r.charAt(s);
    if ((v === "!" || v === "^") && s === t + 1) {
      l = !0, s++;
      continue;
    }
    if (v === "]" && a && !d) {
      c = s + 1;
      break;
    }
    if (a = !0, v === "\\" && !d) {
      d = !0, s++;
      continue;
    }
    if (v === "[" && !d) {
      for (const [g, [b, x, $]] of Object.entries(L0))
        if (r.startsWith(g, s)) {
          if (u)
            return ["$.", !1, r.length - t, !0];
          s += g.length, $ ? i.push(b) : n.push(b), f = f || x;
          continue e;
        }
    }
    if (d = !1, u) {
      v > u ? n.push(oi(u) + "-" + oi(v)) : v === u && n.push(oi(v)), u = "", s++;
      continue;
    }
    if (r.startsWith("-]", s + 1)) {
      n.push(oi(v + "-")), s += 2;
      continue;
    }
    if (r.startsWith("-", s + 1)) {
      u = v, s += 2;
      continue;
    }
    n.push(oi(v)), s++;
  }
  if (c < s)
    return ["", !1, 0, !1];
  if (!n.length && !i.length)
    return ["$.", !1, r.length - t, !0];
  if (i.length === 0 && n.length === 1 && /^\\?.$/.test(n[0]) && !l) {
    const v = n[0].length === 2 ? n[0].slice(-1) : n[0];
    return [N0(v), !1, c - t, !1];
  }
  const h = "[" + (l ? "^" : "") + oc(n) + "]", p = "[" + (l ? "" : "^") + oc(i) + "]";
  return [n.length && i.length ? "(" + h + "|" + p + ")" : n.length ? h : p, f, c - t, !0];
}, _i = (r, { windowsPathsNoEscape: e = !1 } = {}) => e ? r.replace(/\[([^\/\\])\]/g, "$1") : r.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1"), D0 = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]), ac = (r) => D0.has(r), U0 = "(?!(?:^|/)\\.\\.?(?:$|/))", Gs = "(?!\\.)", H0 = /* @__PURE__ */ new Set(["[", "."]), B0 = /* @__PURE__ */ new Set(["..", "."]), z0 = new Set("().*{}+?[]^$\\!"), V0 = (r) => r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), Oo = "[^/]", Fl = Oo + "*?", Wl = Oo + "+?";
var ct, vt, Ir, Ie, st, Ln, Zn, kn, br, Kn, ls, hi, ql, Jn, Zi, ao, Gl;
const Ar = class Tn {
  constructor(e, t, n = {}) {
    Nt(this, hi), at(this, "type"), Nt(this, ct), Nt(this, vt), Nt(this, Ir, !1), Nt(this, Ie, []), Nt(this, st), Nt(this, Ln), Nt(this, Zn), Nt(this, kn, !1), Nt(this, br), Nt(this, Kn), Nt(this, ls, !1), this.type = e, e && Ve(this, vt, !0), Ve(this, st, t), Ve(this, ct, V(this, st) ? V(V(this, st), ct) : this), Ve(this, br, V(this, ct) === this ? n : V(V(this, ct), br)), Ve(this, Zn, V(this, ct) === this ? [] : V(V(this, ct), Zn)), e === "!" && !V(V(this, ct), kn) && V(this, Zn).push(this), Ve(this, Ln, V(this, st) ? V(V(this, st), Ie).length : 0);
  }
  get hasMagic() {
    if (V(this, vt) !== void 0)
      return V(this, vt);
    for (const e of V(this, Ie))
      if (typeof e != "string" && (e.type || e.hasMagic))
        return Ve(this, vt, !0);
    return V(this, vt);
  }
  // reconstructs the pattern
  toString() {
    return V(this, Kn) !== void 0 ? V(this, Kn) : this.type ? Ve(this, Kn, this.type + "(" + V(this, Ie).map((e) => String(e)).join("|") + ")") : Ve(this, Kn, V(this, Ie).map((e) => String(e)).join(""));
  }
  push(...e) {
    for (const t of e)
      if (t !== "") {
        if (typeof t != "string" && !(t instanceof Tn && V(t, st) === this))
          throw new Error("invalid part: " + t);
        V(this, Ie).push(t);
      }
  }
  toJSON() {
    var e;
    const t = this.type === null ? V(this, Ie).slice().map((n) => typeof n == "string" ? n : n.toJSON()) : [this.type, ...V(this, Ie).map((n) => n.toJSON())];
    return this.isStart() && !this.type && t.unshift([]), this.isEnd() && (this === V(this, ct) || V(V(this, ct), kn) && ((e = V(this, st)) == null ? void 0 : e.type) === "!") && t.push({}), t;
  }
  isStart() {
    var e;
    if (V(this, ct) === this)
      return !0;
    if (!((e = V(this, st)) != null && e.isStart()))
      return !1;
    if (V(this, Ln) === 0)
      return !0;
    const t = V(this, st);
    for (let n = 0; n < V(this, Ln); n++) {
      const i = V(t, Ie)[n];
      if (!(i instanceof Tn && i.type === "!"))
        return !1;
    }
    return !0;
  }
  isEnd() {
    var e, t, n;
    if (V(this, ct) === this || ((e = V(this, st)) == null ? void 0 : e.type) === "!")
      return !0;
    if (!((t = V(this, st)) != null && t.isEnd()))
      return !1;
    if (!this.type)
      return (n = V(this, st)) == null ? void 0 : n.isEnd();
    const i = V(this, st) ? V(V(this, st), Ie).length : 0;
    return V(this, Ln) === i - 1;
  }
  copyIn(e) {
    typeof e == "string" ? this.push(e) : this.push(e.clone(this));
  }
  clone(e) {
    const t = new Tn(this.type, e);
    for (const n of V(this, Ie))
      t.copyIn(n);
    return t;
  }
  static fromGlob(e, t = {}) {
    var n;
    const i = new Tn(null, void 0, t);
    return Rn(n = Tn, Jn, Zi).call(n, e, i, 0, t), i;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== V(this, ct))
      return V(this, ct).toMMPattern();
    const e = this.toString(), [t, n, i, s] = this.toRegExpSource();
    if (!(i || V(this, vt) || V(this, br).nocase && !V(this, br).nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase()))
      return n;
    const a = (V(this, br).nocase ? "i" : "") + (s ? "u" : "");
    return Object.assign(new RegExp(`^${t}$`, a), {
      _src: t,
      _glob: e
    });
  }
  get options() {
    return V(this, br);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(e) {
    var t;
    const n = e ?? !!V(this, br).dot;
    if (V(this, ct) === this && Rn(this, hi, ql).call(this), !this.type) {
      const l = this.isStart() && this.isEnd(), c = V(this, Ie).map((p) => {
        var v;
        const [g, b, x, $] = typeof p == "string" ? Rn(v = Tn, Jn, Gl).call(v, p, V(this, vt), l) : p.toRegExpSource(e);
        return Ve(this, vt, V(this, vt) || x), Ve(this, Ir, V(this, Ir) || $), g;
      }).join("");
      let u = "";
      if (this.isStart() && typeof V(this, Ie)[0] == "string" && !(V(this, Ie).length === 1 && B0.has(V(this, Ie)[0]))) {
        const p = H0, v = (
          // dots are allowed, and the pattern starts with [ or .
          n && p.has(c.charAt(0)) || // the pattern starts with \., and then [ or .
          c.startsWith("\\.") && p.has(c.charAt(2)) || // the pattern starts with \.\., and then [ or .
          c.startsWith("\\.\\.") && p.has(c.charAt(4))
        ), g = !n && !e && p.has(c.charAt(0));
        u = v ? U0 : g ? Gs : "";
      }
      let h = "";
      return this.isEnd() && V(V(this, ct), kn) && ((t = V(this, st)) == null ? void 0 : t.type) === "!" && (h = "(?:$|\\/)"), [
        u + c + h,
        _i(c),
        Ve(this, vt, !!V(this, vt)),
        V(this, Ir)
      ];
    }
    const i = this.type === "*" || this.type === "+", s = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let a = Rn(this, hi, ao).call(this, n);
    if (this.isStart() && this.isEnd() && !a && this.type !== "!") {
      const l = this.toString();
      return Ve(this, Ie, [l]), this.type = null, Ve(this, vt, void 0), [l, _i(this.toString()), !1, !1];
    }
    let f = !i || e || n ? "" : Rn(this, hi, ao).call(this, !0);
    f === a && (f = ""), f && (a = `(?:${a})(?:${f})*?`);
    let d = "";
    if (this.type === "!" && V(this, ls))
      d = (this.isStart() && !n ? Gs : "") + Wl;
    else {
      const l = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !n && !e ? Gs : "") + Fl + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && f ? ")" : this.type === "*" && f ? ")?" : `)${this.type}`;
      d = s + a + l;
    }
    return [
      d,
      _i(a),
      Ve(this, vt, !!V(this, vt)),
      V(this, Ir)
    ];
  }
};
ct = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap(), Kn = /* @__PURE__ */ new WeakMap(), ls = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakSet(), ql = function() {
  if (this !== V(this, ct))
    throw new Error("should only call on root");
  if (V(this, kn))
    return this;
  this.toString(), Ve(this, kn, !0);
  let r;
  for (; r = V(this, Zn).pop(); ) {
    if (r.type !== "!")
      continue;
    let e = r, t = V(e, st);
    for (; t; ) {
      for (let n = V(e, Ln) + 1; !t.type && n < V(t, Ie).length; n++)
        for (const i of V(r, Ie)) {
          if (typeof i == "string")
            throw new Error("string part in extglob AST??");
          i.copyIn(V(t, Ie)[n]);
        }
      e = t, t = V(e, st);
    }
  }
  return this;
}, Jn = /* @__PURE__ */ new WeakSet(), Zi = function(r, e, t, n) {
  var i, s;
  let a = !1, f = !1, d = -1, l = !1;
  if (e.type === null) {
    let v = t, g = "";
    for (; v < r.length; ) {
      const b = r.charAt(v++);
      if (a || b === "\\") {
        a = !a, g += b;
        continue;
      }
      if (f) {
        v === d + 1 ? (b === "^" || b === "!") && (l = !0) : b === "]" && !(v === d + 2 && l) && (f = !1), g += b;
        continue;
      } else if (b === "[") {
        f = !0, d = v, l = !1, g += b;
        continue;
      }
      if (!n.noext && ac(b) && r.charAt(v) === "(") {
        e.push(g), g = "";
        const x = new Ar(b, e);
        v = Rn(i = Ar, Jn, Zi).call(i, r, x, v, n), e.push(x);
        continue;
      }
      g += b;
    }
    return e.push(g), v;
  }
  let c = t + 1, u = new Ar(null, e);
  const h = [];
  let p = "";
  for (; c < r.length; ) {
    const v = r.charAt(c++);
    if (a || v === "\\") {
      a = !a, p += v;
      continue;
    }
    if (f) {
      c === d + 1 ? (v === "^" || v === "!") && (l = !0) : v === "]" && !(c === d + 2 && l) && (f = !1), p += v;
      continue;
    } else if (v === "[") {
      f = !0, d = c, l = !1, p += v;
      continue;
    }
    if (ac(v) && r.charAt(c) === "(") {
      u.push(p), p = "";
      const g = new Ar(v, u);
      u.push(g), c = Rn(s = Ar, Jn, Zi).call(s, r, g, c, n);
      continue;
    }
    if (v === "|") {
      u.push(p), p = "", h.push(u), u = new Ar(null, e);
      continue;
    }
    if (v === ")")
      return p === "" && V(e, Ie).length === 0 && Ve(e, ls, !0), u.push(p), p = "", e.push(...h, u), c;
    p += v;
  }
  return e.type = null, Ve(e, vt, void 0), Ve(e, Ie, [r.substring(t - 1)]), c;
}, ao = function(r) {
  return V(this, Ie).map((e) => {
    if (typeof e == "string")
      throw new Error("string type in extglob ast??");
    const [t, n, i, s] = e.toRegExpSource(r);
    return Ve(this, Ir, V(this, Ir) || s), t;
  }).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
}, Gl = function(r, e, t = !1) {
  let n = !1, i = "", s = !1;
  for (let a = 0; a < r.length; a++) {
    const f = r.charAt(a);
    if (n) {
      n = !1, i += (z0.has(f) ? "\\" : "") + f;
      continue;
    }
    if (f === "\\") {
      a === r.length - 1 ? i += "\\\\" : n = !0;
      continue;
    }
    if (f === "[") {
      const [d, l, c, u] = k0(r, a);
      if (c) {
        i += d, s = s || l, a += c - 1, e = e || u;
        continue;
      }
    }
    if (f === "*") {
      t && r === "*" ? i += Wl : i += Fl, e = !0;
      continue;
    }
    if (f === "?") {
      i += Oo, e = !0;
      continue;
    }
    i += V0(f);
  }
  return [i, _i(r), !!e, s];
}, Nt(Ar, Jn);
let Kl = Ar;
const F0 = (r, { windowsPathsNoEscape: e = !1 } = {}) => e ? r.replace(/[?*()[\]]/g, "[$&]") : r.replace(/[?*()[\]\\]/g, "\\$&"), At = (r, e, t = {}) => (cs(e), !t.nocomment && e.charAt(0) === "#" ? !1 : new gs(e, t).match(r)), W0 = /^\*+([^+@!?\*\[\(]*)$/, q0 = (r) => (e) => !e.startsWith(".") && e.endsWith(r), G0 = (r) => (e) => e.endsWith(r), K0 = (r) => (r = r.toLowerCase(), (e) => !e.startsWith(".") && e.toLowerCase().endsWith(r)), Z0 = (r) => (r = r.toLowerCase(), (e) => e.toLowerCase().endsWith(r)), J0 = /^\*+\.\*+$/, X0 = (r) => !r.startsWith(".") && r.includes("."), Q0 = (r) => r !== "." && r !== ".." && r.includes("."), Y0 = /^\.\*+$/, ev = (r) => r !== "." && r !== ".." && r.startsWith("."), tv = /^\*+$/, rv = (r) => r.length !== 0 && !r.startsWith("."), nv = (r) => r.length !== 0 && r !== "." && r !== "..", iv = /^\?+([^+@!?\*\[\(]*)?$/, sv = ([r, e = ""]) => {
  const t = Zl([r]);
  return e ? (e = e.toLowerCase(), (n) => t(n) && n.toLowerCase().endsWith(e)) : t;
}, ov = ([r, e = ""]) => {
  const t = Jl([r]);
  return e ? (e = e.toLowerCase(), (n) => t(n) && n.toLowerCase().endsWith(e)) : t;
}, av = ([r, e = ""]) => {
  const t = Jl([r]);
  return e ? (n) => t(n) && n.endsWith(e) : t;
}, cv = ([r, e = ""]) => {
  const t = Zl([r]);
  return e ? (n) => t(n) && n.endsWith(e) : t;
}, Zl = ([r]) => {
  const e = r.length;
  return (t) => t.length === e && !t.startsWith(".");
}, Jl = ([r]) => {
  const e = r.length;
  return (t) => t.length === e && t !== "." && t !== "..";
}, Xl = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix", cc = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
}, lv = Xl === "win32" ? cc.win32.sep : cc.posix.sep;
At.sep = lv;
const Ht = Symbol("globstar **");
At.GLOBSTAR = Ht;
const uv = "[^/]", fv = uv + "*?", hv = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", dv = "(?:(?!(?:\\/|^)\\.).)*?", pv = (r, e = {}) => (t) => At(t, r, e);
At.filter = pv;
const Dt = (r, e = {}) => Object.assign({}, r, e), mv = (r) => {
  if (!r || typeof r != "object" || !Object.keys(r).length)
    return At;
  const e = At;
  return Object.assign((t, n, i = {}) => e(t, n, Dt(r, i)), {
    Minimatch: class extends e.Minimatch {
      constructor(t, n = {}) {
        super(t, Dt(r, n));
      }
      static defaults(t) {
        return e.defaults(Dt(r, t)).Minimatch;
      }
    },
    AST: class extends e.AST {
      /* c8 ignore start */
      constructor(t, n, i = {}) {
        super(t, n, Dt(r, i));
      }
      /* c8 ignore stop */
      static fromGlob(t, n = {}) {
        return e.AST.fromGlob(t, Dt(r, n));
      }
    },
    unescape: (t, n = {}) => e.unescape(t, Dt(r, n)),
    escape: (t, n = {}) => e.escape(t, Dt(r, n)),
    filter: (t, n = {}) => e.filter(t, Dt(r, n)),
    defaults: (t) => e.defaults(Dt(r, t)),
    makeRe: (t, n = {}) => e.makeRe(t, Dt(r, n)),
    braceExpand: (t, n = {}) => e.braceExpand(t, Dt(r, n)),
    match: (t, n, i = {}) => e.match(t, n, Dt(r, i)),
    sep: e.sep,
    GLOBSTAR: Ht
  });
};
At.defaults = mv;
const Ql = (r, e = {}) => (cs(r), e.nobrace || !/\{(?:(?!\{).)*\}/.test(r) ? [r] : M0(r));
At.braceExpand = Ql;
const vv = (r, e = {}) => new gs(r, e).makeRe();
At.makeRe = vv;
const gv = (r, e, t = {}) => {
  const n = new gs(e, t);
  return r = r.filter((i) => n.match(i)), n.options.nonull && !r.length && r.push(e), r;
};
At.match = gv;
const lc = /[?*]|[+@!]\(.*?\)|\[|\]/, yv = (r) => r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
class gs {
  constructor(e, t = {}) {
    at(this, "options"), at(this, "set"), at(this, "pattern"), at(this, "windowsPathsNoEscape"), at(this, "nonegate"), at(this, "negate"), at(this, "comment"), at(this, "empty"), at(this, "preserveMultipleSlashes"), at(this, "partial"), at(this, "globSet"), at(this, "globParts"), at(this, "nocase"), at(this, "isWindows"), at(this, "platform"), at(this, "windowsNoMagicRoot"), at(this, "regexp"), cs(e), t = t || {}, this.options = t, this.pattern = e, this.platform = t.platform || Xl, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!t.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!t.nonegate, this.comment = !1, this.empty = !1, this.partial = !!t.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = t.windowsNoMagicRoot !== void 0 ? t.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1)
      return !0;
    for (const e of this.set)
      for (const t of e)
        if (typeof t != "string")
          return !0;
    return !1;
  }
  debug(...e) {
  }
  make() {
    const e = this.pattern, t = this.options;
    if (!t.nocomment && e.charAt(0) === "#") {
      this.comment = !0;
      return;
    }
    if (!e) {
      this.empty = !0;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], t.debug && (this.debug = (...s) => console.error(...s)), this.debug(this.pattern, this.globSet);
    const n = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(n), this.debug(this.pattern, this.globParts);
    let i = this.globParts.map((s, a, f) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const d = s[0] === "" && s[1] === "" && (s[2] === "?" || !lc.test(s[2])) && !lc.test(s[3]), l = /^[a-z]:/i.test(s[0]);
        if (d)
          return [...s.slice(0, 4), ...s.slice(4).map((c) => this.parse(c))];
        if (l)
          return [s[0], ...s.slice(1).map((c) => this.parse(c))];
      }
      return s.map((d) => this.parse(d));
    });
    if (this.debug(this.pattern, i), this.set = i.filter((s) => s.indexOf(!1) === -1), this.isWindows)
      for (let s = 0; s < this.set.length; s++) {
        const a = this.set[s];
        a[0] === "" && a[1] === "" && this.globParts[s][2] === "?" && typeof a[3] == "string" && /^[a-z]:$/i.test(a[3]) && (a[2] = "?");
      }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(e) {
    if (this.options.noglobstar)
      for (let n = 0; n < e.length; n++)
        for (let i = 0; i < e[n].length; i++)
          e[n][i] === "**" && (e[n][i] = "*");
    const { optimizationLevel: t = 1 } = this.options;
    return t >= 2 ? (e = this.firstPhasePreProcess(e), e = this.secondPhasePreProcess(e)) : t >= 1 ? e = this.levelOneOptimize(e) : e = this.adjascentGlobstarOptimize(e), e;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(e) {
    return e.map((t) => {
      let n = -1;
      for (; (n = t.indexOf("**", n + 1)) !== -1; ) {
        let i = n;
        for (; t[i + 1] === "**"; )
          i++;
        i !== n && t.splice(n, i - n);
      }
      return t;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(e) {
    return e.map((t) => (t = t.reduce((n, i) => {
      const s = n[n.length - 1];
      return i === "**" && s === "**" ? n : i === ".." && s && s !== ".." && s !== "." && s !== "**" ? (n.pop(), n) : (n.push(i), n);
    }, []), t.length === 0 ? [""] : t));
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let t = !1;
    do {
      if (t = !1, !this.preserveMultipleSlashes) {
        for (let i = 1; i < e.length - 1; i++) {
          const s = e[i];
          i === 1 && s === "" && e[0] === "" || (s === "." || s === "") && (t = !0, e.splice(i, 1), i--);
        }
        e[0] === "." && e.length === 2 && (e[1] === "." || e[1] === "") && (t = !0, e.pop());
      }
      let n = 0;
      for (; (n = e.indexOf("..", n + 1)) !== -1; ) {
        const i = e[n - 1];
        i && i !== "." && i !== ".." && i !== "**" && (t = !0, e.splice(n - 1, 2), n -= 2);
      }
    } while (t);
    return e.length === 0 ? [""] : e;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(e) {
    let t = !1;
    do {
      t = !1;
      for (let n of e) {
        let i = -1;
        for (; (i = n.indexOf("**", i + 1)) !== -1; ) {
          let a = i;
          for (; n[a + 1] === "**"; )
            a++;
          a > i && n.splice(i + 1, a - i);
          let f = n[i + 1];
          const d = n[i + 2], l = n[i + 3];
          if (f !== ".." || !d || d === "." || d === ".." || !l || l === "." || l === "..")
            continue;
          t = !0, n.splice(i, 1);
          const c = n.slice(0);
          c[i] = "**", e.push(c), i--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let a = 1; a < n.length - 1; a++) {
            const f = n[a];
            a === 1 && f === "" && n[0] === "" || (f === "." || f === "") && (t = !0, n.splice(a, 1), a--);
          }
          n[0] === "." && n.length === 2 && (n[1] === "." || n[1] === "") && (t = !0, n.pop());
        }
        let s = 0;
        for (; (s = n.indexOf("..", s + 1)) !== -1; ) {
          const a = n[s - 1];
          if (a && a !== "." && a !== ".." && a !== "**") {
            t = !0;
            const f = s === 1 && n[s + 1] === "**" ? ["."] : [];
            n.splice(s - 1, 2, ...f), n.length === 0 && n.push(""), s -= 2;
          }
        }
      }
    } while (t);
    return e;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(e) {
    for (let t = 0; t < e.length - 1; t++)
      for (let n = t + 1; n < e.length; n++) {
        const i = this.partsMatch(e[t], e[n], !this.preserveMultipleSlashes);
        if (i) {
          e[t] = [], e[n] = i;
          break;
        }
      }
    return e.filter((t) => t.length);
  }
  partsMatch(e, t, n = !1) {
    let i = 0, s = 0, a = [], f = "";
    for (; i < e.length && s < t.length; )
      if (e[i] === t[s])
        a.push(f === "b" ? t[s] : e[i]), i++, s++;
      else if (n && e[i] === "**" && t[s] === e[i + 1])
        a.push(e[i]), i++;
      else if (n && t[s] === "**" && e[i] === t[s + 1])
        a.push(t[s]), s++;
      else if (e[i] === "*" && t[s] && (this.options.dot || !t[s].startsWith(".")) && t[s] !== "**") {
        if (f === "b")
          return !1;
        f = "a", a.push(e[i]), i++, s++;
      } else if (t[s] === "*" && e[i] && (this.options.dot || !e[i].startsWith(".")) && e[i] !== "**") {
        if (f === "a")
          return !1;
        f = "b", a.push(t[s]), i++, s++;
      } else
        return !1;
    return e.length === t.length && a;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const e = this.pattern;
    let t = !1, n = 0;
    for (let i = 0; i < e.length && e.charAt(i) === "!"; i++)
      t = !t, n++;
    n && (this.pattern = e.slice(n)), this.negate = t;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(e, t, n = !1) {
    const i = this.options;
    if (this.isWindows) {
      const g = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), b = !g && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]), x = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), $ = !x && t[0] === "" && t[1] === "" && t[2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]), _ = b ? 3 : g ? 0 : void 0, w = $ ? 3 : x ? 0 : void 0;
      if (typeof _ == "number" && typeof w == "number") {
        const [E, A] = [e[_], t[w]];
        E.toLowerCase() === A.toLowerCase() && (t[w] = E, w > _ ? t = t.slice(w) : _ > w && (e = e.slice(_)));
      }
    }
    const { optimizationLevel: s = 1 } = this.options;
    s >= 2 && (e = this.levelTwoFileOptimize(e)), this.debug("matchOne", this, { file: e, pattern: t }), this.debug("matchOne", e.length, t.length);
    for (var a = 0, f = 0, d = e.length, l = t.length; a < d && f < l; a++, f++) {
      this.debug("matchOne loop");
      var c = t[f], u = e[a];
      if (this.debug(t, c, u), c === !1)
        return !1;
      if (c === Ht) {
        this.debug("GLOBSTAR", [t, c, u]);
        var h = a, p = f + 1;
        if (p === l) {
          for (this.debug("** at the end"); a < d; a++)
            if (e[a] === "." || e[a] === ".." || !i.dot && e[a].charAt(0) === ".")
              return !1;
          return !0;
        }
        for (; h < d; ) {
          var v = e[h];
          if (this.debug(`
globstar while`, e, h, t, p, v), this.matchOne(e.slice(h), t.slice(p), n))
            return this.debug("globstar found match!", h, d, v), !0;
          if (v === "." || v === ".." || !i.dot && v.charAt(0) === ".") {
            this.debug("dot detected!", e, h, t, p);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), h++;
        }
        return !!(n && (this.debug(`
>>> no match, partial?`, e, h, t, p), h === d));
      }
      let g;
      if (typeof c == "string" ? (g = u === c, this.debug("string match", c, u, g)) : (g = c.test(u), this.debug("pattern match", c, u, g)), !g)
        return !1;
    }
    if (a === d && f === l)
      return !0;
    if (a === d)
      return n;
    if (f === l)
      return a === d - 1 && e[a] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return Ql(this.pattern, this.options);
  }
  parse(e) {
    cs(e);
    const t = this.options;
    if (e === "**")
      return Ht;
    if (e === "")
      return "";
    let n, i = null;
    (n = e.match(tv)) ? i = t.dot ? nv : rv : (n = e.match(W0)) ? i = (t.nocase ? t.dot ? Z0 : K0 : t.dot ? G0 : q0)(n[1]) : (n = e.match(iv)) ? i = (t.nocase ? t.dot ? ov : sv : t.dot ? av : cv)(n) : (n = e.match(J0)) ? i = t.dot ? Q0 : X0 : (n = e.match(Y0)) && (i = ev);
    const s = Kl.fromGlob(e, this.options).toMMPattern();
    return i && typeof s == "object" && Reflect.defineProperty(s, "test", { value: i }), s;
  }
  makeRe() {
    if (this.regexp || this.regexp === !1)
      return this.regexp;
    const e = this.set;
    if (!e.length)
      return this.regexp = !1, this.regexp;
    const t = this.options, n = t.noglobstar ? fv : t.dot ? hv : dv, i = new Set(t.nocase ? ["i"] : []);
    let s = e.map((d) => {
      const l = d.map((c) => {
        if (c instanceof RegExp)
          for (const u of c.flags.split(""))
            i.add(u);
        return typeof c == "string" ? yv(c) : c === Ht ? Ht : c._src;
      });
      return l.forEach((c, u) => {
        const h = l[u + 1], p = l[u - 1];
        c !== Ht || p === Ht || (p === void 0 ? h !== void 0 && h !== Ht ? l[u + 1] = "(?:\\/|" + n + "\\/)?" + h : l[u] = n : h === void 0 ? l[u - 1] = p + "(?:\\/|" + n + ")?" : h !== Ht && (l[u - 1] = p + "(?:\\/|\\/" + n + "\\/)" + h, l[u + 1] = Ht));
      }), l.filter((c) => c !== Ht).join("/");
    }).join("|");
    const [a, f] = e.length > 1 ? ["(?:", ")"] : ["", ""];
    s = "^" + a + s + f + "$", this.negate && (s = "^(?!" + s + ").+$");
    try {
      this.regexp = new RegExp(s, [...i].join(""));
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  slashSplit(e) {
    return this.preserveMultipleSlashes ? e.split("/") : this.isWindows && /^\/\/[^\/]+/.test(e) ? ["", ...e.split(/\/+/)] : e.split(/\/+/);
  }
  match(e, t = this.partial) {
    if (this.debug("match", e, this.pattern), this.comment)
      return !1;
    if (this.empty)
      return e === "";
    if (e === "/" && t)
      return !0;
    const n = this.options;
    this.isWindows && (e = e.split("\\").join("/"));
    const i = this.slashSplit(e);
    this.debug(this.pattern, "split", i);
    const s = this.set;
    this.debug(this.pattern, "set", s);
    let a = i[i.length - 1];
    if (!a)
      for (let f = i.length - 2; !a && f >= 0; f--)
        a = i[f];
    for (let f = 0; f < s.length; f++) {
      const d = s[f];
      let l = i;
      if (n.matchBase && d.length === 1 && (l = [a]), this.matchOne(l, d, t))
        return n.flipNegate ? !0 : !this.negate;
    }
    return n.flipNegate ? !1 : this.negate;
  }
  static defaults(e) {
    return At.defaults(e).Minimatch;
  }
}
At.AST = Kl;
At.Minimatch = gs;
At.escape = F0;
At.unescape = _i;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ji = globalThis, Ao = Ji.ShadowRoot && (Ji.ShadyCSS === void 0 || Ji.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yl = Symbol(), uc = /* @__PURE__ */ new WeakMap();
let _v = class {
  constructor(r, e, t) {
    if (this._$cssResult$ = !0, t !== Yl) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = r, this.t = e;
  }
  get styleSheet() {
    let r = this.o;
    const e = this.t;
    if (Ao && r === void 0) {
      const t = e !== void 0 && e.length === 1;
      t && (r = uc.get(e)), r === void 0 && ((this.o = r = new CSSStyleSheet()).replaceSync(this.cssText), t && uc.set(e, r));
    }
    return r;
  }
  toString() {
    return this.cssText;
  }
};
const bv = (r) => new _v(typeof r == "string" ? r : r + "", void 0, Yl), $v = (r, e) => {
  if (Ao) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), i = Ji.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = t.cssText, r.appendChild(n);
  }
}, fc = Ao ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return bv(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wv, defineProperty: xv, getOwnPropertyDescriptor: Ev, getOwnPropertyNames: Sv, getOwnPropertySymbols: Ov, getPrototypeOf: Av } = Object, ei = globalThis, hc = ei.trustedTypes, Cv = hc ? hc.emptyScript : "", dc = ei.reactiveElementPolyfillSupport, bi = (r, e) => r, us = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Cv : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, Co = (r, e) => !wv(r, e), pc = { attribute: !0, type: String, converter: us, reflect: !1, hasChanged: Co };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ei.litPropertyMetadata ?? (ei.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ai extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = pc) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && xv(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: i, set: s } = Ev(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(a) {
      const f = i == null ? void 0 : i.call(this);
      s.call(this, a), this.requestUpdate(e, f, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? pc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(bi("elementProperties"))) return;
    const e = Av(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(bi("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(bi("properties"))) {
      const t = this.properties, n = [...Sv(t), ...Ov(t)];
      for (const i of n) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, i] of t) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const i = this._$Eu(t, n);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n) t.unshift(fc(i));
    } else e !== void 0 && t.push(fc(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $v(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostConnected) == null ? void 0 : n.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostDisconnected) == null ? void 0 : n.call(t);
    });
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$EC(e, t) {
    var n;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : us).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), f = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : us;
      this._$Em = s, this[s] = f.fromAttribute(t, a.type), this._$Em = null;
    }
  }
  requestUpdate(e, t, n) {
    if (e !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(e)), !(n.hasChanged ?? Co)(this[e], t)) return;
      this.P(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, t, n) {
    this._$AL.has(e) || this._$AL.set(e, t), n.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, a] of i) a.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.P(s, this[s], a);
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (e = this._$EO) == null || e.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      }), this.update(n)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t) => this._$EC(t, this[t]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
ai.elementStyles = [], ai.shadowRootOptions = { mode: "open" }, ai[bi("elementProperties")] = /* @__PURE__ */ new Map(), ai[bi("finalized")] = /* @__PURE__ */ new Map(), dc == null || dc({ ReactiveElement: ai }), (ei.reactiveElementVersions ?? (ei.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pv = { attribute: !0, type: String, converter: us, reflect: !1, hasChanged: Co }, Iv = (r = Pv, e, t) => {
  const { kind: n, metadata: i } = t;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), s.set(t.name, r), n === "accessor") {
    const { name: a } = t;
    return { set(f) {
      const d = e.get.call(this);
      e.set.call(this, f), this.requestUpdate(a, d, r);
    }, init(f) {
      return f !== void 0 && this.P(a, void 0, r), f;
    } };
  }
  if (n === "setter") {
    const { name: a } = t;
    return function(f) {
      const d = this[a];
      e.call(this, f), this.requestUpdate(a, d, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Fn(r) {
  return (e, t) => typeof t == "object" ? Iv(r, e, t) : ((n, i, s) => {
    const a = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, a ? { ...n, wrapped: !0 } : n), a ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ys(r) {
  return Fn({ ...r, state: !0, attribute: !1 });
}
const jv = `@import '../../components/daemon.css';

.s-carpenter-daemon {
  border: 3px solid red;
  position: absolute;
  z-index: 100;
  @s-transition (slow);

  .s-carpenter-daemon_tools {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    background: red;
  }
}
`;
class Tv extends _e {
  constructor() {
    super("s-carpenter-daemon"), this.$currentComponent = null;
  }
  get $document() {
    return this.ownerDocument;
  }
  adoptedCallback() {
    e0(jv, {
      id: "s-carpenter-daemon-css",
      rootNode: this.$document.head
    }), Ki(
      '[type="lotsof/component"]',
      (e) => {
        this._initComponent(e);
      },
      {
        rootNode: this.$document
      }
    );
  }
  _initComponent(e) {
    e.addEventListener("mousemove", () => {
      this._setComponent(e);
    });
  }
  _setComponent(e) {
    this.$currentComponent !== e && (this.$currentComponent = e, this._setDaemonPosition());
  }
  _setDaemonPosition() {
    var e, t, n, i;
    const s = (e = this.$currentComponent) == null ? void 0 : e.getBoundingClientRect().top, a = (t = this.$currentComponent) == null ? void 0 : t.getBoundingClientRect().left, f = (n = this.$currentComponent) == null ? void 0 : n.getBoundingClientRect().width, d = (i = this.$currentComponent) == null ? void 0 : i.getBoundingClientRect().height;
    console.log("top", s), console.log("left", a), console.log("width", f), console.log("height", d), this.style.top = `${s}px`, this.style.left = `${a}px`, this.style.width = `${f}px`, this.style.height = `${d}px`;
  }
  render() {
    return G`<div class="${this.cls("_inner")}">
      <div class="${this.cls("_tools")}">
        <div class="${this.cls("_tool")}">Edit</div>
      </div>
    </div> `;
  }
}
var Mv = Object.defineProperty, gr = (r, e, t, n) => {
  for (var i = void 0, s = r.length - 1, a; s >= 0; s--)
    (a = r[s]) && (i = a(e, t, i) || i);
  return i && Mv(e, t, i), i;
}, ci;
const pr = (ci = class extends _e {
  constructor() {
    super("s-carpenter"), this.mediaQueries = {}, this.mediaQuery = "desktop", this.darkModeClass = "-dark", this._notifications = [], this._currentMediaQuery = "", this._currentAction = null, this._state = {}, this.saveState = !0;
  }
  static registerAdapter(r, e) {
    if (this._adapters[r])
      throw new Error(
        `[s-carpenter] An adapter with id "${r}" already exists`
      );
    this._adapters[r] = e;
  }
  get currentMediaQuery() {
    return this.mediaQueries[this._currentMediaQuery];
  }
  update(r) {
    var e, t, n, i;
    super.update(r), r.has("_currentMediaQuery") && (((e = this.currentMediaQuery) == null ? void 0 : e.max) !== -1 ? (n = this._$canvas) == null || n.style.setProperty(
      "--s-carpenter-canvas-width",
      ((t = this.currentMediaQuery) == null ? void 0 : t.max) + "px"
    ) : (i = this._$canvas) == null || i.style.removeProperty("--s-carpenter-canvas-width"), setTimeout(() => {
      this._updateIframeSize();
    }, 300));
  }
  // private _updateMediaQueries(): void {
  //   // get the computed style of the document (iframe)
  //   const style = this._$iframe?.contentWindow?.getComputedStyle(
  //     this.$iframeDocument?.body as Element,
  //   );
  //   // try to get the media queries from the css variables (sugarcss)
  //   ['mobile', 'tablet', 'desktop', 'wide'].forEach((media) => {
  //     const min = parseInt(
  //         style?.getPropertyValue(`--s-media-${media}-min`) ?? '0',
  //       ),
  //       max = parseInt(
  //         style?.getPropertyValue(`--s-media-${media}-max`) ?? '0',
  //       );
  //     if (min || max) {
  //       const query: TCarpenterMediaQuery = {
  //         name: media,
  //         min: min ? min : -1,
  //         max: max ? max : -1,
  //       };
  //       this.mediaQueries[media] = query;
  //     }
  //   });
  //   // init the media query if not set
  //   if (
  //     !this._currentMediaQuery &&
  //     Object.keys(this.mediaQueries ?? {}).length
  //   ) {
  //     this._currentMediaQuery = Object.keys(this.mediaQueries)[0];
  //   }
  //   // make sure we update the UI
  //   this.requestUpdate();
  // }
  get $iframeDocument() {
    var r;
    return (r = this._$iframe) == null ? void 0 : r.contentDocument;
  }
  get $iframe() {
    return this._$iframe;
  }
  firstUpdated(r) {
    var e, t;
    const n = document.querySelector("s-carpenter-daemon");
    (t = (e = this._$iframe) == null ? void 0 : e.contentDocument) == null || t.body.appendChild(n);
  }
  async mount() {
    b0() || (await this._initEnvironment(), this._initListeners(document), this._initListeners(this.$iframeDocument));
  }
  _initListeners(r) {
  }
  async _initEnvironment() {
    var r, e, t, n, i, s, a, f, d, l, c, u, h, p, v, g;
    this.log("Init the carpenter environment...");
    const b = document.createElement("div");
    b.classList.add(...this.cls("_canvas")), document.body.appendChild(b);
    const x = document.createElement("iframe");
    x.classList.add(...this.cls("_iframe")), this._$iframe = x;
    let $ = !1;
    const _ = new Promise((A) => {
      x.addEventListener("load", () => {
        $ || ($ = !0, this.dispatch("ready", {
          bubbles: !0,
          cancelable: !1,
          detail: this
        }), A(!0));
      });
    });
    b.appendChild(x), await _;
    const w = new DOMParser().parseFromString(
      document.documentElement.outerHTML,
      "text/html"
    );
    (r = w.body.querySelector("s-factory")) == null || r.remove(), (e = w.body.querySelector("s-carpenter")) == null || e.remove(), (t = w.body.querySelector("s-carpenter-daemon")) == null || t.remove(), (n = w.body.querySelector(".s-carpenter_canvas")) == null || n.remove(), (i = x == null ? void 0 : x.contentWindow) == null || i.document.open(), (s = x == null ? void 0 : x.contentWindow) == null || s.document.write(w.documentElement.outerHTML), (a = x == null ? void 0 : x.contentWindow) == null || a.document.close(), (d = (f = this.$iframeDocument) == null ? void 0 : f.querySelector(`.${this.cls("_iframe")}`)) == null || d.remove(), (c = (l = this.$iframeDocument) == null ? void 0 : l.querySelector(this.tagName)) == null || c.remove();
    const E = (h = (u = this._$iframe) == null ? void 0 : u.contentDocument) == null ? void 0 : h.createElement(
      "style"
    );
    E.innerHTML = `
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `, (p = x.contentWindow) == null || p.document.head.appendChild(E), setTimeout(() => {
      var A;
      (A = this.component) != null && A.html && this._setIframeContent(this.component.html);
    }, 100), (g = (v = this._$iframe) == null ? void 0 : v.contentDocument) == null || g.body.classList.remove("-dark"), Tv.define("s-carpenter-daemon", null, {
      // window: this._$iframe?.contentWindow,
    }), document.querySelectorAll(
      `body > *:not(${this.tagName}):not(s-factory):not(.${this.cls(
        "_canvas"
      )}):not(script):not(${this.cls("_canvas").map((A) => `.${A}`).join(",")}`
    ).forEach((A) => {
      A.remove();
    });
  }
  _setIframeContent(r) {
    var e;
    (e = this._$iframe) != null && e.contentDocument && (Ym(this._$iframe.contentDocument.body, r), setTimeout(this._updateIframeSize.bind(this), 50), setTimeout(this._updateIframeSize.bind(this), 100), setTimeout(this._updateIframeSize.bind(this), 200));
  }
  _updateIframeSize() {
    var r;
    (r = this._$iframe) == null || r.dispatchEvent(
      new CustomEvent("load", {
        bubbles: !0,
        cancelable: !1
      })
    );
  }
  // public selectMediaQuery(name: string): void {
  //   this._currentMediaQuery = name;
  // }
  async _applyUpdate(r) {
    if (!this.component)
      return;
    x0(this.component.values, r.path, r.value);
    const e = {
      ...r,
      component: this.component
    };
    typeof this.adapter == "string" && ci._adapters[this.adapter] ? ci._adapters[this.adapter].applyUpdate(e) : this.adapter && this.adapter.applyUpdate(e), this.dispatch("update", {
      bubbles: !0,
      cancelable: !1,
      detail: e
    });
  }
  // private _renderMediaQueries(): any {
  //   return html`<nav class="${this.cls('_media-queries')}">
  //     <ol class="${this.cls('_media-queries-list')}">
  //       ${Object.entries(this.mediaQueries).map(
  //         ([name, query]) => html`
  //           <li
  //             class="${this.cls('_media-queries-list-item')} ${this
  //               ._currentMediaQuery === name
  //               ? '-active'
  //               : ''}"
  //             @pointerup=${() => {
  //               this._currentMediaQuery = name;
  //             }}
  //           >
  //             <span class="${this.cls('_media-queries-list-item-name')}"
  //               >${query.name}</span
  //             >
  //           </li>
  //         `,
  //       )}
  //     </ol>
  //   </nav>`;
  // }
  // private _renderBottombar(): any {
  //   return html`<nav class="${this.cls('_bottombar')}">
  //     ${this._renderMediaQueries()}
  //   </nav>`;
  // }
  // private _renderNotifications(): any {
  //   if (!this._notifications.length) {
  //     return;
  //   }
  //   return html`
  //     <div class="${this.cls('_notifications')}">
  //       <ul class="${this.cls('_notifications-list')}">
  //         ${this._notifications.map(
  //           (notification) => html`
  //             <li
  //               class="${this.cls('_notifications-item')} ${notification.type
  //                 ? `-${notification.type}`
  //                 : ''}"
  //             >
  //               <span class="${this.cls('_notifications-message')}">
  //                 ${notification.message}
  //               </span>
  //             </li>
  //           `,
  //         )}
  //     </div>
  //   `;
  // }
  _renderEditor() {
    if (this.component)
      return G`<div class="${this.cls("_editor")}">
      <div class="${this.cls("_editor-inner")}">
        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          @s-json-schema-form.update=${(r) => {
        this._applyUpdate({
          ...r.detail.update
        });
      }}
          id="s-carpenter-json-schema-form"
          name="s-carpenter-json-schema-form"
          .buttonClasses=${!0}
          .formClasses=${!0}
          .verbose=${this.verbose}
          .schema=${this.component.schema}
          .values=${this.component.values ?? {}}
        ></s-json-schema-form>
      </div>
    </div>`;
  }
  render() {
    return G`
      <s-carpenter-daemon></s-carpenter-daemon>
      ${this._renderEditor()}
    `;
  }
}, ci._adapters = {}, ci);
gr([
  Fn({ type: Object })
], pr.prototype, "mediaQueries");
gr([
  Fn({ type: String })
], pr.prototype, "mediaQuery");
gr([
  Fn({ type: Object })
], pr.prototype, "adapter");
gr([
  Fn({ type: Object })
], pr.prototype, "component");
gr([
  Fn({ type: String })
], pr.prototype, "darkModeClass");
gr([
  Fn({ type: Function })
], pr.prototype, "loaded");
gr([
  ys()
], pr.prototype, "_notifications");
gr([
  ys()
], pr.prototype, "_currentMediaQuery");
gr([
  ys()
], pr.prototype, "_currentAction");
gr([
  ys()
], pr.prototype, "_state");
let Rv = pr;
Rv.define("s-carpenter");
const Lv = G`<svg
  class="s-factory_logo"
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 40H40V40C40 34.4772 35.5228 30 30 30H10V40Z"
    fill="black"
    fill-opacity="0.1"
  />
  <path
    class="-accent"
    d="M0 30H20V35C20 37.7614 17.7614 40 15 40H10C4.47715 40 0 35.5228 0 30V30Z"
    fill="#FFD500"
  />
  <path
    d="M0 5C0 2.23858 2.23858 0 5 0H10C15.5228 0 20 4.47715 20 10V10H0V5Z"
    class="-accent"
  />
  <path
    d="M10 10C10 4.47715 14.4772 0 20 0H35C37.7614 0 40 2.23858 40 5V10H10V10Z"
    fill="black"
  />
  <path
    class="-accent"
    d="M20 25H40V20C40 17.2386 37.7614 15 35 15H20V25Z"
    fill="#FFD500"
  />
  <path d="M0 15H30V15C30 20.5228 25.5228 25 20 25H0V15Z" fill="black" />
</svg> `, Ks = {
  blade: `<svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4796_4088)">
      <path
        d="M0 46.5392V2L12.7255 10.098V39.0196L25.451 46.5392L51.4804 32.0784V46.5392L25.451 61L0 46.5392Z"
        fill="black"
      />
      <path
        d="M64.206 10.6765L51.4805 18.1961V32.6569L64.206 25.1373V10.6765Z"
        fill="black"
      />
      <path
        d="M51.4804 32.6569L38.7549 25.1373V10.6765L51.4804 18.1961V32.6569Z"
        fill="black"
      />
      <path
        d="M26.0295 32.6569L12.7256 24.5588V10.098L26.0295 18.1961V32.6569Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_4796_4088">
        <rect width="64" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg>`,
  lit: `<svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_511_4929)">
      <rect width="64" height="64" fill="white" />
      <rect width="64" height="64" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 25.4815V50.963L19.7907 64L32.5814 51.5556L44.7907 64L57 50.963V25.4815L44.2093 38.5185V13.037L32 25.4815V0L19.2093 13.037V38.5185L7 25.4815Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_511_4929">
        <rect width="64" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg> `,
  react: `<svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52.6191 21.7986C51.9374 21.5619 51.2508 21.3415 50.5592 21.1373C50.6739 20.663 50.7797 20.186 50.8765 19.7063C52.4365 11.9956 51.4165 5.78361 47.9353 3.73871C44.6021 1.77647 39.1357 3.82137 33.6213 8.7107C33.0791 9.19313 32.548 9.69001 32.028 10.2014C31.6813 9.86166 31.3258 9.5292 30.9614 9.20397C25.1816 3.97585 19.3885 1.77376 15.9113 3.82543C12.5781 5.79174 11.5875 11.631 12.9915 18.9393C13.1319 19.662 13.2897 20.3816 13.4648 21.098C12.6448 21.3352 11.8528 21.5886 11.0955 21.8569C4.32782 24.2622 0 28.0336 0 31.9445C0 35.9855 4.64514 40.0374 11.7022 42.4943C12.2746 42.6921 12.8524 42.876 13.4354 43.0458C13.2461 43.8128 13.0786 44.5884 12.9328 45.3726C11.5995 52.5548 12.6395 58.2559 15.966 60.21C19.4019 62.2278 25.1656 60.1544 30.7841 55.1539C31.2285 54.7582 31.6729 54.3404 32.1173 53.9004C32.6791 54.4524 33.2568 54.9882 33.8506 55.5076C39.2904 60.275 44.6621 62.2007 47.9833 60.2411C51.4165 58.2165 52.5325 52.0913 51.0832 44.6394C50.9721 44.0703 50.8441 43.4894 50.6992 42.8967C51.1045 42.7748 51.5014 42.6487 51.8898 42.5186C59.2229 40.0428 64 36.0397 64 31.9486C63.9973 28.0187 59.5309 24.2229 52.6191 21.7986ZM35.4199 10.8112C40.1437 6.62244 44.5595 4.96917 46.5727 6.15085C48.7153 7.40977 49.5486 12.4861 48.202 19.1439C48.1131 19.5775 48.0171 20.0098 47.914 20.4408C45.095 19.789 42.2363 19.3291 39.357 19.0639C37.7085 16.6503 35.9013 14.3526 33.9479 12.1866C34.4261 11.715 34.9159 11.2566 35.4172 10.8112H35.4199ZM18.8965 35.2863C19.4752 36.4246 20.0801 37.5489 20.7111 38.6592C21.3538 39.7921 22.0235 40.9083 22.7204 42.0078C20.7392 41.7888 18.7705 41.4663 16.822 41.0415C17.3873 39.1823 18.0832 37.2512 18.8965 35.2863ZM18.8965 28.7369C18.0966 26.814 17.4193 24.9222 16.8633 23.0955C18.6899 22.6794 20.6365 22.3393 22.6657 22.0818C21.9858 23.1605 21.3316 24.255 20.7031 25.3653C20.0747 26.4756 19.4712 27.5995 18.8925 28.7369H18.8965ZM20.3498 32.0123C21.1925 30.2262 22.1 28.4745 23.0724 26.7571C24.0439 25.0405 25.0781 23.3633 26.1749 21.7254C28.0788 21.5791 30.0307 21.5018 32.0027 21.5018C33.9746 21.5018 35.9385 21.5791 37.8411 21.7268C38.9264 23.3611 39.9543 25.0324 40.925 26.7408C41.8956 28.4492 42.8151 30.1928 43.6835 31.9716C42.8267 33.764 41.9094 35.523 40.9316 37.2485C39.9619 38.965 38.9397 40.6472 37.8651 42.2951C35.9652 42.4306 33.9986 42.5051 31.9987 42.5051C29.9988 42.5051 28.0695 42.4414 26.2042 42.3181C25.0994 40.6748 24.0568 38.9903 23.0764 37.2648C22.096 35.5392 21.1858 33.7884 20.3458 32.0123H20.3498ZM43.2982 38.6402C43.9426 37.5037 44.5613 36.3523 45.1541 35.186C45.9668 37.0589 46.6842 38.9731 47.3034 40.9209C45.3319 41.3721 43.3386 41.7182 41.3316 41.9576C42.0089 40.8654 42.6644 39.7596 43.2982 38.6402ZM45.1275 28.7383C44.5373 27.5954 43.9235 26.4662 43.2862 25.3504C42.664 24.2501 42.0156 23.1632 41.3409 22.09C43.3822 22.3529 45.3408 22.7025 47.1767 23.1294C46.5864 25.0327 45.9025 26.9047 45.1275 28.7383ZM32.0293 14.1773C33.3607 15.6559 34.6178 17.2018 35.7958 18.8092C33.2759 18.6872 30.7543 18.6872 28.2308 18.8092C29.4748 17.1369 30.7481 15.5853 32.0293 14.1773ZM17.2873 6.23351C19.4285 4.97052 24.163 6.77557 29.1535 11.2841C29.4721 11.5727 29.7934 11.8749 30.1134 12.188C28.15 14.3537 26.3301 16.6493 24.6656 19.0599C21.7928 19.323 18.9397 19.7756 16.1247 20.415C15.962 19.7501 15.8153 19.0807 15.6847 18.4067C14.4781 12.1419 15.2767 7.41926 17.2873 6.23351ZM14.1661 40.3626C13.6328 40.2081 13.1061 40.0406 12.5861 39.8599C9.46627 38.7758 6.88905 37.361 5.11979 35.8202C3.53585 34.4393 2.73322 33.0611 2.73322 31.9445C2.73322 29.5717 6.20774 26.5443 12.0022 24.4913C12.7301 24.2338 13.4643 23.9984 14.2047 23.7852C15.0653 26.5962 16.1075 29.3463 17.3246 32.0177C16.093 34.726 15.0379 37.5137 14.1661 40.3626ZM28.9828 53.0562C26.4989 55.2678 24.011 56.8357 21.8178 57.6257C19.8472 58.3344 18.2779 58.3548 17.3299 57.7978C15.3114 56.6121 14.4714 52.0331 15.6167 45.8916C15.7527 45.1688 15.9082 44.4461 16.0833 43.7234C18.9266 44.3459 21.8082 44.771 24.7083 44.9958C26.389 47.419 28.2239 49.7276 30.2014 51.907C29.8041 52.3041 29.3974 52.6862 28.9828 53.0562ZM32.1053 49.9096C30.8094 48.4853 29.5161 46.9093 28.2548 45.2154C29.4806 45.2642 30.7285 45.2885 31.9987 45.2885C33.3026 45.2885 34.5932 45.2601 35.8652 45.2018C34.6914 46.835 33.4365 48.4062 32.1053 49.9096ZM48.7073 53.7839C48.326 55.8762 47.5594 57.272 46.6114 57.8303C44.5941 59.0201 40.281 57.4739 35.6305 53.3963C35.0972 52.9302 34.5639 52.4301 34.0213 51.9057C35.9602 49.7178 37.7522 47.3998 39.385 44.9674C42.3011 44.7163 45.1968 44.2612 48.0513 43.6055C48.182 44.1421 48.2975 44.6679 48.398 45.1828C49.0393 48.4758 49.1313 51.4544 48.7073 53.7839ZM51.0272 39.8748C50.6779 39.9927 50.3179 40.1065 49.9526 40.2176C49.0575 37.3934 47.9746 34.6343 46.7114 31.9594C47.9272 29.3202 48.9677 26.6011 49.8259 23.8205C50.4806 24.0143 51.1165 24.2175 51.7285 24.433C57.6509 26.5091 61.2641 29.5825 61.2641 31.9445C61.2641 34.4651 57.3616 37.7364 51.0272 39.8748Z"
      fill="black"
    />
    <path
      d="M31.9805 37.5965C33.168 37.6004 34.3299 37.2457 35.3192 36.5772C36.3085 35.9088 37.0805 34.9566 37.5376 33.8414C37.9948 32.7262 38.1164 31.498 37.8871 30.3124C37.6578 29.1268 37.0879 28.0371 36.2495 27.1812C35.4112 26.3254 34.3422 25.742 33.1777 25.5048C32.0133 25.2676 30.8059 25.3873 29.7084 25.8488C28.6109 26.3103 27.6727 27.0928 27.0126 28.0973C26.3524 29.1017 26 30.2829 26 31.4912C25.9984 32.2918 26.1518 33.0848 26.4515 33.825C26.7512 34.5652 27.1914 35.238 27.7468 35.805C28.3022 36.372 28.962 36.8221 29.6884 37.1295C30.4149 37.4369 31.1937 37.5955 31.9805 37.5965Z"
      fill="black"
    />
  </svg> `,
  twig: `<svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4796_4120)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.82406 7.20149C6.56287 7.83098 5.67471 8.27428 5.44428 7.92752C4.80758 6.99073 9.18085 1.06072 15.0924 0.126217C24.226 -1.32253 32.4926 10.1095 34.9227 13.4701L34.9511 13.5094C39.3439 19.7008 42.0397 26.9057 42.7775 34.4259C42.7024 34.5293 42.6282 34.6333 42.5546 34.7377C46.7266 29.3636 53.2119 25.1627 58.0443 27.1101C63.0914 29.144 64.3346 37.053 63.928 37.2591C63.8344 37.3068 63.6392 36.9589 63.3369 36.42L63.3369 36.4199C62.521 34.9655 60.9249 32.1202 58.4393 31.9063C55.4459 31.6506 52.9076 35.4751 52.4481 36.1674L52.4441 36.1735C50.5851 38.9564 50.1343 41.9546 50.3527 49.3573C50.4735 53.2259 50.771 58.2489 51.5146 64.1285L36.2778 64.1331L36.2776 64.1286H18.9504C19.1944 60.597 19.0581 57.0499 18.5437 53.5466C18.1024 47.6879 16.1342 42.0407 12.8296 37.1515C9.46557 32.7567 5.12123 30.5226 2.44945 29.1486L2.44943 29.1486C0.85617 28.3292 -0.142316 27.8158 0.0165398 27.3323C0.353482 26.3085 5.75153 26.7391 10.5663 28.0034C14.4278 29.0174 20.3425 31.0555 27.0489 36.5203C25.1048 13.7703 20.5745 6.34739 15.7942 5.2683C12.9721 4.63196 9.89514 6.16777 7.82406 7.20149L7.82406 7.20149ZM45.8817 44.2541C45.8813 45.1831 45.554 46.0831 44.9558 46.8008C44.3576 47.5186 43.5254 48.0097 42.6011 48.1905C41.6767 48.3713 40.7173 48.2306 39.8864 47.7923C39.0554 47.3541 38.4044 46.6454 38.0441 45.7871C37.6838 44.9287 37.6367 43.9738 37.9106 43.085C38.1845 42.1962 38.7626 41.4285 39.5464 40.9128C40.3302 40.397 41.2712 40.165 42.209 40.2564C43.1468 40.3478 44.0235 40.7569 44.6897 41.414C45.0684 41.7866 45.3686 42.2294 45.5732 42.7168C45.7778 43.2042 45.8826 43.7267 45.8817 44.2541ZM35.0173 44.2541C35.0168 45.1831 34.6896 46.0831 34.0914 46.8008C33.4931 47.5186 32.661 48.0097 31.7366 48.1905C30.8122 48.3713 29.8528 48.2306 29.0219 47.7923C28.191 47.3541 27.5399 46.6454 27.1796 45.7871C26.8194 44.9287 26.7722 43.9738 27.0461 43.085C27.3201 42.1962 27.8982 41.4285 28.682 40.9128C29.4657 40.397 30.4067 40.165 31.3445 40.2564C32.2824 40.3478 33.159 40.7569 33.8252 41.414C34.2039 41.7866 34.5042 42.2294 34.7087 42.7168C34.9133 43.2042 35.0182 43.7267 35.0173 44.2541Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_4796_4120">
        <rect width="64" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg> `,
  vue: `<svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.9851 4H40L32 16.9299L25.1429 4H0L32 60L64 4H50.9851ZM7.95657 8.67036H15.6434L32 37.5963L48.3429 8.67036H56.0297L32.0023 50.7317L7.95657 8.67036Z"
      fill="black"
    />
  </svg> `
};
var Nv = Object.defineProperty, yr = (r, e, t, n) => {
  for (var i = void 0, s = r.length - 1, a; s >= 0; s--)
    (a = r[s]) && (i = a(e, t, i) || i);
  return i && Nv(e, t, i), i;
};
const kv = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "saveValues",
  title: "Save values",
  description: "Simply save the actual component values to use them later",
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name",
      description: "Unique name to identify the saved values",
      minLength: 5,
      placeholder: "Complete with video and slider",
      autofocus: !0
    }
  }
};
class mr extends _e {
  constructor() {
    super("s-factory"), this.src = "/api/specs", this.commandPanelHotkey = "cmd+p", this.darkModeClass = "-dark", this.specs = {}, this._notifications = [], this._currentComponent = null, this._components = {}, this._currentAction = null, this._state = {}, this._$commandPanelSelect = null, this.saveState = !0;
  }
  get currentEngine() {
    return document.location.search && new URLSearchParams(document.location.search).get("engine") || void 0;
  }
  get currentComponent() {
    return this._components[this.currentComponentId];
  }
  get currentComponentId() {
    return this._currentComponentId;
  }
  get componentsToRender() {
    var t;
    const e = document.location.pathname.match(/^\/component\/([^\?]+)/);
    return (t = e == null ? void 0 : e[1]) == null ? void 0 : t.split("+");
  }
  async _fetchSpecs() {
    const e = await fetch(this.src), t = await e.json();
    this.specs = t;
  }
  async mount() {
    hf() || (await this._fetchSpecs(), await this._initEnvironment(), this._initListeners(document), this._initCommandPanel(), this._restoreUiMode());
  }
  _initCommandPanel() {
    Te.define("s-factory-command-panel-select", {
      activeWhen: [],
      items: (e) => {
        var t, n, i;
        switch (!0) {
          case ((t = e.search) == null ? void 0 : t.startsWith("/")):
            const s = [];
            for (const [a, f] of Object.entries(
              this.specs.components
            ))
              for (let d of f.engines)
                s.push({
                  id: `/${a}/${d}`,
                  value: `/${a}/${d}`,
                  label: `<div class="${this.cls("_command-panel-component")}">
                        <h3 class="${this.cls(
                    "_command-panel-component-name"
                  )}">${Mi(f.name)}</span>
                        <h4 class="${this.cls(
                    "_command-panel-component-engine"
                  )}">${d}</h4>
                        ${Ks[d] || ""}
                      </div>`,
                  preventSet: !0,
                  engine: d
                });
            return s;
          case ((n = e.search) == null ? void 0 : n.startsWith("!")):
            return Object.entries(this.currentComponent.engines).map(
              ([a, f]) => (console.log(this.currentComponent), {
                id: `!${this.currentComponent.id}`,
                value: `!${this.currentComponent.id}`,
                preventSet: !0,
                label: `${Mi(f)}`,
                engine: f
              })
            );
          case ((i = e.search) == null ? void 0 : i.startsWith("<")):
            return Object.entries(this.currentComponent.savedValues).map(
              ([a, f]) => ({
                id: `<${a}`,
                value: `<${a}`,
                preventSet: !0,
                label: f.name
              })
            );
          default:
            return [
              {
                id: "/",
                value: "/",
                preventClose: !0,
                preventSelect: !0,
                label: `<span class="s-factory-command-panel_prefix"
                      >/</span
                    >${Bt("Components")}`
              },
              {
                id: "!",
                value: "!",
                preventClose: !0,
                preventSelect: !0,
                label: `<span class="s-factory-command-panel_prefix"
                      >!</span
                    >${Bt("Switch engine")}`
              }
              // {
              //   id: '@',
              //   value: '@',
              //   preventClose: true,
              //   preventSelect: true,
              //   label: `<span class="s-factory-command-panel_prefix"
              //         >@</span
              //       >${__i18n('Media queries')}`,
              // },
              // {
              //   id: '<',
              //   value: '<',
              //   preventClose: true,
              //   preventSelect: true,
              //   label: `<span class="s-factory-command-panel_prefix"
              //         >&lt;</span
              //       >${__i18n('Load values')}`,
              // },
              // {
              //   id: '>',
              //   value: '>',
              //   label: `<span class="s-factory-command-panel_prefix"
              //         >&gt;</span
              //       >${__i18n('Save values')}`,
              // },
            ];
        }
      }
    }), setTimeout(() => {
      this._$commandPanelSelect = this.querySelector(
        "s-factory-command-panel-select"
      );
    });
  }
  _initListeners(e) {
    e.addEventListener("keydown", (n) => {
      switch (!0) {
        case n.key === "§":
          document.body.classList.add("-show-ui");
          break;
      }
    }), e.addEventListener("keyup", (n) => {
      var i;
      switch (!0) {
        case n.key === "§":
          document.body.classList.remove("-show-ui"), n.preventDefault(), (i = document.activeElement) == null || i.blur();
          break;
      }
    });
    const t = {
      ctx: e
    };
    Cr(
      "escape",
      (n) => {
        this._currentAction = null;
      },
      t
    ), Cr(
      "cmd+shift+p",
      (n) => {
        var i, s;
        (i = this._$commandPanelSelect) == null || i.setSearch(""), (s = this._$commandPanelSelect) == null || s.focus();
      },
      t
    ), Cr(
      "cmd+p",
      (n) => {
        var i, s;
        console.log("cmd+p", this._$commandPanelSelect), (i = this._$commandPanelSelect) == null || i.setSearch("/"), (s = this._$commandPanelSelect) == null || s.focus();
      },
      t
    ), Cr(
      "cmd+e",
      (n) => {
        var i, s;
        (i = this._$commandPanelSelect) == null || i.setSearch("!"), (s = this._$commandPanelSelect) == null || s.focus();
      },
      t
    ), Cr(
      "cmd+r",
      (n) => {
        this.randomizeComponentValues(this.currentComponentId);
      },
      t
    ), Cr(
      "cmd+m",
      (n) => {
        this.toggleUiMode();
      },
      t
    );
  }
  _initEnvironment() {
    this.log("Init the factory environment..."), document.body.appendChild(this);
  }
  _initComponents() {
    var e;
    (e = this.componentsToRender) == null || e.forEach((t) => {
      this._updateComponent(t);
    }), this._currentComponentId = Object.keys(this._components)[0];
  }
  async _updateComponent(e = this.currentComponentId, t = {}) {
    var c;
    const n = this.querySelector("s-carpenter"), i = {
      $iframe: n == null ? void 0 : n.$iframe,
      ...t
    }, s = this.getComponent(e);
    if (!s)
      return;
    let a = `/api/render/${s.relPath}`;
    i.engine ? a += `?engine=${i.engine}` : this.currentEngine && s.engines.includes(this.currentEngine) ? a += `?engine=${this.currentEngine}` : a += `?engine=${s.engines[0]}`;
    const f = new FormData();
    f.append("values", JSON.stringify(s.values)), f.append("id", s.id);
    const d = await fetch(a, {
      method: "POST",
      body: f
    }), l = await d.json();
    if (s.values = l.values, i.$iframe) {
      let u = (c = i.$iframe.contentDocument) == null ? void 0 : c.querySelector(
        `#${s.id}-container`
      );
      const p = new DOMParser().parseFromString(
        l.html,
        "text/html"
      ).querySelector(
        `#${s.id}-container`
      );
      u ? u.innerHTML = p.innerHTML : (i.$iframe.contentDocument.body.appendChild(p), u = i.$iframe.contentDocument.querySelector(
        `#${s.id}-container`
      )), Array.from(u.querySelectorAll("script")).forEach(
        (v) => {
          var x;
          const g = document.createElement("script");
          Array.from(v.attributes).forEach(($) => {
            g.setAttribute($.name, $.value);
          });
          const b = document.createTextNode(v.innerHTML);
          g.appendChild(b), (x = v.parentNode) == null || x.replaceChild(g, v);
        }
      );
    }
    n == null || n.requestUpdate(), this.requestUpdate();
  }
  getComponent(e) {
    if (this._components[e])
      return this._components[e];
    if (this.specs.components[e]) {
      const t = _c(this.specs.components[e]);
      return t.id = "s-component-" + Lr(), this._components[t.id] = t, t;
    }
    throw new Error(`Component ${e} not found`);
  }
  selectComponent(e, t) {
    let n = `/component/${e}`;
    t && (n += `?engine=${t}`), history.pushState({ id: e, engine: t }, "", n), this._currentComponentId = e, this._updateComponent();
  }
  // public setComponentValues(id: string, values: any): void {
  //   const component = this.getComponent(id);
  //   if (!component) {
  //     return;
  //   }
  //   component.values = values;
  //   this._updateComponent(component.name);
  // }
  toggleUiMode() {
    this.setUiMode(this.state.mode === "dark" ? "light" : "dark");
  }
  _restoreUiMode() {
    this.state.mode && this.setUiMode(this.state.mode);
  }
  setUiMode(e) {
    this.setState({ mode: e }), e === "light" ? document.body.classList.remove("-dark") : document.body.classList.add("-dark");
  }
  randomizeComponentValues(e = this.currentComponentId) {
    if (!e)
      return;
    const t = this.getComponent(e);
    t && (t.values = {});
  }
  async _saveComponentValues(e, t) {
    const n = await fetch(`/api/saveValues/${e.name}`, {
      method: "POST",
      body: JSON.stringify({
        id: e.id,
        name: t,
        values: e.values
      })
    }), i = await n.json();
    if (i.errors) {
      console.error(i.errors);
      return;
    }
    await this._fetchSpecs(), this._currentAction = null, this._sendNotification({
      id: "valuesSaved",
      message: `Values saved as ${t}`,
      type: "success",
      timeout: 2e3
    });
  }
  _handleCommandPanelSelect(e) {
    let t, n;
    switch (!0) {
      case e.value.startsWith("/"):
      case e.value.startsWith("!"):
        [n, t] = e.value.slice(1).split("/"), console.log("select", e);
        break;
      case e.value.startsWith("@"):
        e.value.slice(1);
        break;
      case e.value.startsWith(">"):
        this._currentAction = "saveValues";
        break;
      case e.value.startsWith("<"):
        break;
    }
  }
  _renderComponents() {
    return G`
      ${this.specs.components ? G`
            <nav class=${this.cls("_components")}>
              <ol class="${this.cls("_components-list")}">
                ${Object.entries(this.specs.components).map(
      ([e, t]) => G`
                    <li
                      class="${this.cls("_components-list-item")} ${this.currentComponentId === e ? "-active" : ""}"
                    >
                      <span
                        class="${this.cls("_components-list-item-name")}"
                        @pointerup=${(n) => {
        this.selectComponent(e);
      }}
                      >
                        ${t.name}
                      </span>
                      <ol class="${this.cls("_components-list-item-engines")}">
                        ${t.engines.map(
        (n) => G`
                            <li
                              class="${this.cls(
          "_components-list-item-engine"
        )} ${this.currentEngine === n ? "-active" : ""}"
                              @pointerup=${(i) => {
          this.selectComponent(e, n);
        }}
                            >
                              ${gi(Ks[n] || n)}
                            </li>
                          `
      )}
                      </ol>
                    </li>
                  `
    )}
              </ol>
            </nav>
          ` : ""}
    `;
  }
  async _sendNotification(e) {
    this._notifications.push(e), e.timeout && setTimeout(() => {
      this._notifications = this._notifications.filter(
        (t) => t !== e
      );
    }, e.timeout);
  }
  _renderSidebar() {
    return G`<nav class="${this.cls("_sidebar")}">
      <div class="${this.cls("_sidebar-inner")}">
        ${this._renderComponents()}
      </div>
    </nav>`;
  }
  _renderTopbar() {
    return G`<nav class="${this.cls("_topbar")}">
      <h1 class="${this.cls("_topbar-title")}">${Lv}</h1>
      ${this.currentComponent ? G`<div class="${this.cls("_topbar-component")}">
            <h2 class="${this.cls("_topbar-component-name")}">
              ${Mi(this.currentComponent.name)}
            </h2>
            <p class="${this.cls("_topbar-component-version")}">
              ${this.currentComponent.version}
            </p>
            <p class="${this.cls("_topbar-component-engine")}">
              ${Mi(this.currentEngine)}
              ${gi(
      Ks[this.currentEngine] || this.currentEngine
    )}
            </p>
          </div>` : ""}
    </nav>`;
  }
  _renderMode() {
    return G`
      <button
        class="${this.cls("_bottombar-mode")} ${this.state.mode === "dark" ? "-active" : ""}"
        @pointerup=${() => {
      this.toggleUiMode();
    }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
          />
        </svg>
      </button>
    `;
  }
  _renderCommandPanel() {
    return G`<nav class="${this.cls("_command-panel")}">
      <s-factory-command-panel-select
        .verbose=${this.verbose}
        id="s-factory-command-panel"
        mountWhen="direct"
        hotkey=${this.commandPanelHotkey}
        @s-factory-command-panel-select.select=${(e) => {
      this._handleCommandPanelSelect(e.detail.item);
    }}
      >
        <input
          type="text"
          class="form-input"
          placeholder=${Bt(`Command panel (${this.commandPanelHotkey})`)}
        />
      </s-factory-command-panel-select>
    </nav>`;
  }
  _renderNotifications() {
    if (this._notifications.length)
      return G`
      <div class="${this.cls("_notifications")}">
        <ul class="${this.cls("_notifications-list")}">
          ${this._notifications.map(
        (e) => G`
              <li
                class="${this.cls("_notifications-item")} ${e.type ? `-${e.type}` : ""}"
              >
                <span class="${this.cls("_notifications-message")}">
                  ${e.message}
                </span>
              </li>
            `
      )}
      </div>
    `;
  }
  _renderSaveValuesForm() {
    var e;
    return G`
      <div class="popin">
        <form
          class="${this.cls("_save-values-form")} form"
          @submit=${(t) => {
      if (t.preventDefault(), !t.target.checkValidity())
        return;
      const n = du(t.target);
      this._saveComponentValues(this.currentComponent, n.name);
    }}
        >
          <s-json-schema-form
            id="s-factory-save-values-form"
            .formClasses=${!0}
            .schema=${kv}
            .values=${{}}
          ></s-json-schema-form>
          <code class="${this.cls("_save-values-form-code")}">
            ${JSON.stringify((e = this.currentComponent) == null ? void 0 : e.values, null, 2)}
          </code>
          <input
            type="submit"
            class="button -full"
            value=${Bt("Save values")}
          />
        </form>
      </div>
    `;
  }
  _renderEditor() {
    return G`
      <div class="${this.cls("_editor")}">
        <div class="${this.cls("_editor-inner")}">
          <s-carpenter
            .component=${this.currentComponent}
            .verbose=${this.verbose}
            @s-carpenter.update=${() => {
      this._updateComponent();
    }}
            @s-carpenter.ready=${(e) => {
      var t;
      this._initListeners(
        (t = e.detail.$iframe) == null ? void 0 : t.contentDocument
      ), this._initComponents();
    }}
          />
        </div>
      </div>
    `;
  }
  render() {
    return G`
      ${this._renderTopbar()} ${this._renderCommandPanel()}
      ${this._renderEditor()}
      ${this._currentAction === "saveValues" ? this._renderSaveValuesForm() : ""}
      ${this._renderNotifications()}
    `;
  }
}
yr([
  Q({ type: String })
], mr.prototype, "src");
yr([
  Q({ type: String })
], mr.prototype, "commandPanelHotkey");
yr([
  Q({ type: String })
], mr.prototype, "darkModeClass");
yr([
  fr()
], mr.prototype, "specs");
yr([
  fr()
], mr.prototype, "_notifications");
yr([
  fr()
], mr.prototype, "_currentComponent");
yr([
  fr()
], mr.prototype, "_currentComponentId");
yr([
  fr()
], mr.prototype, "_components");
yr([
  fr()
], mr.prototype, "_currentAction");
yr([
  fr()
], mr.prototype, "_state");
mr.define("s-factory");
export {
  mr as __FactoryElement
};
