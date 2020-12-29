!function(){"use strict";var t={154:function(t){function e(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function r(t){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?e(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):e(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}}(t,e)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var c=0;function u(t){return"__private_"+c+++"_"+t}var l=u("findDataType"),f=u("getUnique"),d=u("properxName"),h=u("yValues"),y=u("nonTidyOperation"),p=u("tidyOperation"),v=u("addProperty"),m=function(){function t(e){var r=e.data,n=e.chartType,i=void 0===n?void 0:n,o=e.xCol,a=void 0===o?void 0:o,s=e.yCols,c=void 0===s?void 0:s,u=e.colors,m=void 0===u?void 0:u,P=e.zIndex,C=void 0===P?void 0:P,j=e.seriesTypes,I=void 0===j?void 0:j,k=e.filters,S=void 0===k?void 0:k,A=e.transform,N=void 0===A?void 0:A,E=e.valuesCol,z=void 0===E?void 0:E,M=e.xName,F=void 0===M?"x":M;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),Object.defineProperty(this,v,{value:T}),Object.defineProperty(this,p,{value:_}),Object.defineProperty(this,y,{value:w}),Object.defineProperty(this,h,{value:g}),Object.defineProperty(this,d,{value:O}),Object.defineProperty(this,f,{value:b}),Object.defineProperty(this,l,{value:x}),this._data=r,this._chartType=i,this._xCol=a,this._yCols=c,this._colors=m,this._zIndex=C,this._seriesTypes=I,this._filters=S,this._transform=N,this._valuesCol=z,this._xName=F}var e,r;return e=t,(r=[{key:"update",value:function(t){t.hasOwnProperty("data")&&(this.data=t.data),t.hasOwnProperty("chartType")&&(this.chartType=t.chartType),t.hasOwnProperty("xCol")&&(this.xCol=t.xCol),t.hasOwnProperty("yCols")&&(this.yCols=t.yCols),t.hasOwnProperty("colors")&&(this.colors=t.colors),t.hasOwnProperty("zIndex")&&(this.zIndex=t.zIndex),t.hasOwnProperty("filters")&&(this.filters=t.filters),t.hasOwnProperty("transform")&&(this.transform=t.transform),t.hasOwnProperty("valuesCol")&&(this.valuesCol=t.valuesCol),t.hasOwnProperty("xName")&&(this.xName=t.xName)}},{key:"filter",value:function(t){for(var e=this,r=function(){var t=i(o[n],2),r=t[0],a=t[1];Array.isArray(a)?a.map((function(t){e.data=e.data.filter((function(e){return e[r]==t}))})):e.data=e.data.filter((function(t){return t[r]==a}))},n=0,o=Object.entries(t);n<o.length;n++)r();return this.data}},{key:"sort",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"asc",r=[];return"asc"==e?r=this.data.slice().sort((function(e,r){return r[t]-e[t]})):"desc"==e&&(r=this.data.slice().sort((function(e,r){return e[t]-r[t]}))),this.data=r,this.data}},{key:"data",get:function(){return this._data},set:function(t){this._data=t}},{key:"chartType",get:function(){return this._chartType},set:function(t){this._chartType=t}},{key:"xCol",get:function(){return this._xCol},set:function(t){this._xCol=t}},{key:"yCols",get:function(){return this._yCols},set:function(t){this._yCols=t}},{key:"colors",get:function(){return this._colors},set:function(t){this._colors=t}},{key:"zIndex",get:function(){return this._zIndex},set:function(t){this._zIndex=t}},{key:"seriesTypes",get:function(){return this._seriesTypes},set:function(t){this._seriesTypes=t}},{key:"filters",get:function(){return this._filters},set:function(t){this._filters=t}},{key:"transform",get:function(){return this._transform},set:function(t){this._transform=t}},{key:"valuesCol",get:function(){return this._valuesCol},set:function(t){this._valuesCol=t}},{key:"xName",get:function(){return this._xName},set:function(t){this._xName=t}},{key:"dataType",get:function(){return this._dataType},set:function(t){this._dataType=t}},{key:"hcSeries",get:function(){var t={};s(this,l)[l](this.yCols,this.valuesCol);var e;e="non-tidy"==this.dataType?s(this,y)[y](this.xCol,this.yCols,this.transform,this.xName):s(this,p)[p](this.xCol,this.yCols,this.transform,this.valuesCol,this.xName),t=s(this,v)[v]("data",t,e),this.colors&&(t=s(this,v)[v]("color",t,this.colors)),this.zIndex&&(t=s(this,v)[v]("zIndex",t,this.zIndex)),this.seriesTypes&&(t=s(this,v)[v]("type",t,this.seriesTypes));for(var r=[],n=0,o=Object.entries(t);n<o.length;n++){var a=i(o[n],2),c=a[0],u=a[1];u.name=c,r.push(u)}return r}}])&&a(e.prototype,r),t}(),x=function(t,e){Array.isArray(t)&&null==e?this._dataType="non-tidy":this._dataType="tidy"},b=function(t){for(var e,r={},n=[],i=0;e=this.data[i++];){var o=e[t];o in r||(r[o]=1,n.push(o))}return n},O=function(t){return void 0!==t?t:null==this._chartType?(this.xName="x","x"):void(["line","area"].includes(this._chartType)&&(this.xName="x"))},g=function(t){if(!t)return function(t,e){return t[e]};if(t&&t.hasOwnProperty("decimals")&&!t.hasOwnProperty("operator"))return function(e,r){return null!==e[r]?+e[r].toFixed(t.decimals):e[r]};if(t&&t.hasOwnProperty("operator"))if(t.hasOwnProperty("decimals")){if("*"==t.operator)return function(e,r){return null!==e[r]?+(e[r]*t.conversion).toFixed(t.decimals):e[r]};if("/"==t.operator)return function(e,r){return null!==e[r]?+(e[r]/t.conversion).toFixed(t.decimals):e[r]};if("+"==t.conversion)return function(e,r){return null!==e[r]?+(e[r]+t.conversion).toFixed(t.decimals):e[r]};if("-"==t.conversion)return function(e,r){return null!==e[r]?+(e[r]-t.conversion).toFixed(t.decimals):e[r]}}else{if("*"==t.operator)return function(e,r){return null!==e[r]?+e[r]*t.conversion:e[r]};if("/"==t.operator)return function(e,r){return null!==e[r]?+e[r]/t.conversion:e[r]};if("+"==t.conversion)return function(e,r){return null!==e[r]?+(e[r]+t.conversion):e[r]};if("-"==t.conversion)return function(e,r){return null!==e[r]?+(e[r]-t.conversion):e[r]}}},w=function(t,e,r,i){var o=this;this.filters&&this.filter(this.filters);var a={},c={};e.map((function(t){a[t]=[],c[t]=0})),s(this,d)[d](i);var u=s(this,h)[h](r);return this.data.map((function(r){e.map((function(e){var i;a[e].push((n(i={},o.xName,r[t]),n(i,"y",u(r,e)),i)),c[e]=c[e]+r[e]}))})),a},_=function(t,e,r,i,o){var a=this;this.filters&&this.filter(this.filters);var c=s(this,f)[f](e),u=s(this,h)[h](r);s(this,d)[d](o);var l={};return c.map((function(r){var o=a.data.filter((function(t){return t[e]==r})).map((function(e){var r;return n(r={},a.xName,e[t]),n(r,"y",u(e,i)),r}));l[r]=o})),l},T=function(t,e,o){for(var a={},s=0,c=Object.entries(o);s<c.length;s++){var u=i(c[s],2),l=u[0],f=u[1];a[l]=n({},t,f)}for(var d=0,h=Object.entries(a);d<h.length;d++){var y=i(h[d],2),p=y[0];y[1],e.hasOwnProperty(p)?e[p]=r(r({},e[p]),a[p]):e[p]=a[p]}return e};t.exports=m}},e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,{a:e}),e},r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t=r(154),e=r.n(t);function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return r}}(t,e)||function(t,e){if(t){if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var o=function(t){var e=new XMLHttpRequest;return e.open("GET",t,!1),e.send(null),JSON.parse(e.responseText)},a=o("./test_data/non-tidy.json"),s=o("./test_data/tidy.json"),c=function(t,e){return new Highcharts.chart(e,{chart:{type:"line",zoomType:"x",borderWidth:1},tooltip:{shared:!0},yAxis:{title:{text:"Exports (Mb/d)"}},xAxis:{type:"datetime",crosshair:!0},series:t})},u={conversion:159,operator:"*",decimals:2},l={Marine:"Red",Pipeline:"Blue",Railway:"Green",Truck:"Yellow"},f={Marine:4,Pipeline:3,Railway:2,Truck:1},d={Product:"Propane",Origin:"Canada"},h=n(function(t,r){var n=performance.now(),i=new(e())({data:t,chartType:"line",colors:l});i.xCol="Period",i.yCols="Mode of Transportation",i.valuesCol="Volume (Mb/d)",i.filters=r,i.zIndex=f;var o=c(i.hcSeries,"container-tidy"),a=performance.now();return o.update({title:{text:"Tidy load time: ".concat((a-n).toFixed(1)," milliseconds")}}),[o,i]}(s,d),2),y=h[0],p=h[1],v=n(function(t,r){var n=performance.now(),i=new(e())({data:t,chartType:"line",colors:l});i.xCol="Period",i.yCols=["Marine","Pipeline","Railway","Truck"],i.filters=r,i.zIndex=f;var o=c(i.hcSeries,"container-nonTidy"),a=performance.now();return o.update({title:{text:"Non-tidy load time: ".concat((a-n).toFixed(1)," milliseconds")}}),[o,i]}(a,d),2),m=v[0],x=v[1],b=function(t,e,r,n,i){var o=performance.now();return e.update({data:n,filters:r}),"container-tidy"==i?(t=c(e.hcSeries,"container-tidy")).update({title:{text:"Tidy update time ".concat((performance.now()-o).toFixed(1)," milliseconds")}}):(t=c(e.hcSeries,"container-nonTidy")).update({title:{text:"Non-tidy update time ".concat((performance.now()-o).toFixed(1)," milliseconds")}}),[t,e]},O=function(t,e,r,n,i){var o=performance.now();"Mb/d"==n?e.update({data:r,transform:!1}):e.update({data:r,transform:u});var a;a="container-tidy"==i?"Tidy update time:":"Non-tidy update time:",t.update({title:{text:"".concat(a," ").concat((performance.now()-o).toFixed(1)," milliseconds")},series:e.hcSeries,yAxis:{title:{text:"Exports ".concat(n)}}})};document.getElementById("select-product").addEventListener("change",(function(t){d.Product=t.target.value;var e=n(b(y,p,d,s,"container-tidy"),2);y=e[0],p=e[1];var r=n(b(m,x,d,a,"container-nonTidy"),2);m=r[0],x=r[1]})),document.getElementById("select-region").addEventListener("change",(function(t){d.Origin=t.target.value;var e=n(b(y,p,d,s,"container-tidy"),2);y=e[0],p=e[1];var r=n(b(m,x,d,a,"container-nonTidy"),2);m=r[0],x=r[1]})),document.getElementById("select-units").addEventListener("change",(function(t){var e=t.target.value;O(y,p,s,e,"container-tidy"),O(m,x,a,e,"container-nonTidy")}))}()}();