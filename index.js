!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i,u,s;i=Math.abs,u=function(t,e){return t.reduce(function(t,n,r){return t+n*e[r-1]})},s=function(t){var e;return e=Math.sqrt(t.map(function(t){return t*t}).reduce(function(t,e){return t+e})),t.map(function(t){return t/e})},r=function(){function t(t,e,n,r){this._len=null!=t?Math.abs(t):8,this._hpFIR=s(null!=e?e:[1.4,-.7,.3]),this._th=null!=n?n:1.5,this._base=null!=r?r:120,this._deltaLen=this._hpFIR.length,this._deltas=function(){var t,e,n;for(n=[],t=1,e=this._deltaLen;1<=e?t<=e:t>=e;1<=e?t++:t--)n.push(0);return n}.call(this),this._filtered=function(){var t,e,n;for(n=[],t=1,e=this._len;1<=e?t<=e:t>=e;1<=e?t++:t--)n.push(0);return n}.call(this),this._ts=function(){var t,e,n;for(n=[],t=1,e=this._len;1<=e?t<=e:t>=e;1<=e?t++:t--)n.push(null);return n}.call(this)}return t.prototype.check=function(t){var e;return null!=t.wheelDelta?e=t.wheelDelta:null!=t.deltaY?e=-40*t.deltaY:null==t.detail&&0!==t.detail||(e=-40*t.detail),this._deltas.unshift(e),this._deltas.pop(),this._filtered.unshift(u(this._deltas,this._hpFIR)),this._filtered.pop(),this._ts.unshift(Date.now()),this._ts.pop(),this.isInertia()},t.prototype.isInertia=function(){var t,e,n,r,u;return n=this._deltas,r=this._filtered,u=this._th,e=this._base,!(n[0]===n[1]&&i(n[0])>=e)&&(t=r.reduce(function(t,e){return t+e})/r.length,!(i(r[0]/t)>=u))},t}(),e.default=r}])});