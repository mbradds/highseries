(()=>{var e={123:e=>{function r(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function t(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],n=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return t}}(e,r)||function(e,r){if(e){if("string"==typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,r){if(!Object.prototype.hasOwnProperty.call(e,r))throw new TypeError("attempted to use private field on non-instance");return e}var u=0;function s(e){return"__private_"+u+++"_"+e}var c=s("getUnique"),f=s("seriesProperties"),l=s("properxName"),d=s("yValues"),h=s("nonTidyOperation"),p=s("tidyOperation"),v=s("findDataType"),y=function(){function e(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;i(this,e),Object.defineProperty(this,v,{value:P}),Object.defineProperty(this,p,{value:w}),Object.defineProperty(this,h,{value:O}),Object.defineProperty(this,d,{value:g}),Object.defineProperty(this,l,{value:b}),Object.defineProperty(this,f,{value:m}),Object.defineProperty(this,c,{value:_}),this._df=r,this._chartType=t,this._series=void 0}var r,n;return r=e,(n=[{key:"filter",value:function(e){for(var r=this,n=function(){var e=t(o[i],2),n=e[0],a=e[1];Array.isArray(a)?a.map((function(e){r._df=r._df.filter((function(r){return r[n]==e}))})):r._df=r._df.filter((function(e){return e[n]==a}))},i=0,o=Object.entries(e);i<o.length;i++)n();return this._df}},{key:"sort",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"asc",t=[];return"asc"==r?t=this._df.slice().sort((function(r,t){return t[e]-r[e]})):"desc"==r&&(t=this._df.slice().sort((function(r,t){return r[e]-t[e]}))),this._df=t,this._df}},{key:"generateSeries",value:function(e,r){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:void 0;return a(this,v)[v](r,n),"non-tidy"==this._dataType?this._series=a(this,h)[h](e,r,t,i,o):this._series=a(this,p)[p](e,r,t,i,n,o),this._series}},{key:"df",get:function(){return this._df},set:function(e){this._df=e}},{key:"chartType",get:function(){return this._chartType},set:function(e){this._chartType=e}},{key:"series",get:function(){return this._series}}])&&o(r.prototype,n),e}(),_=function(e){for(var r,t={},n=[],i=0;r=this._df[i++];){var o=r[e];o in t||(t[o]=1,n.push(o))}return n},m=function(e){return void 0!==e?function(e,r,t){return{name:e,data:r,color:t[e]}}:function(e,r,t){return{name:e,data:r}}},b=function(e){return void 0!==e?e:null==this._chartType||["line","area"].includes(this._chartType)?"x":void 0},g=function(e){if(e.hasOwnProperty("decimals")&&!e.hasOwnProperty("operator"))return function(r,t){return null!==r[t]?+r[t].toFixed(e.decimals):r[t]};if(!e.hasOwnProperty("decimals")&&!e.hasOwnProperty("operator"))return function(e,r){return e[r]};if(e.hasOwnProperty("operator"))if(e.hasOwnProperty("decimals")){if("*"==e.operator)return function(r,t){return null!==r[t]?+(r[t]*e.conversion).toFixed(e.decimals):r[t]};if("/"==e.operator)return function(r,t){return null!==r[t]?+(r[t]/e.conversion).toFixed(e.decimals):r[t]};if("+"==e.conversion)return function(r,t){return null!==r[t]?+(r[t]+e.conversion).toFixed(e.decimals):r[t]};if("-"==e.conversion)return function(r,t){return null!==r[t]?+(r[t]-e.conversion).toFixed(e.decimals):r[t]}}else{if("*"==e.operator)return function(r,t){return null!==r[t]?+r[t]*e.conversion:r[t]};if("/"==e.operator)return function(r,t){return null!==r[t]?+r[t]/e.conversion:r[t]};if("+"==e.conversion)return function(r,t){return null!==r[t]?+(r[t]+e.conversion):r[t]};if("-"==e.conversion)return function(r,t){return null!==r[t]?+(r[t]-e.conversion):r[t]}}},O=function(e,n,i,o,u){var s={},c={};n.map((function(e){s[e]=[],c[e]=0})),u=a(this,l)[l](u);var h=a(this,d)[d](i);this._df.map((function(t){n.map((function(n){var i;s[n].push((r(i={},u,t[e]),r(i,"y",h(t,n)),i)),c[n]=c[n]+t[n]}))}));for(var p=[],v=a(this,f)[f](o),y=0,_=Object.entries(s);y<_.length;y++){var m=t(_[y],2),b=m[0],g=m[1];0!==c[b]&&p.push(v(b,g,o))}return p},w=function(e,t,n,i,o,u){var s=this,h=a(this,c)[c](t),p=a(this,d)[d](n),v=a(this,f)[f](i);return u=a(this,l)[l](u),h.map((function(n){var a=s._df.filter((function(e){return e[t]==n})).map((function(t){var n;return r(n={},u,t[e]),r(n,"y",p(t,o)),n}));return v(n,a,i)}))},P=function(e,r){Array.isArray(e)&&null==r?this._dataType="non-tidy":this._dataType="tidy"};e.exports=y}},r={};function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{}};return e[n](i,i.exports,t),i.exports}(()=>{var e,r=t(123),n=("../test_data/non-tidy.json",(e=new XMLHttpRequest).open("GET","../test_data/non-tidy.json",!1),e.send(null),JSON.parse(e.responseText));console.log(n);var i=new r(n,"line");i.filter({Product:"Propane",Origin:"Canada"}),i.sort("Period","desc");var o=i.generateSeries("Period",["Marine","Pipeline","Railway","Truck"],{conversion:6.2898,operator:"*",decimals:2},void 0,{Marine:"Red",Pipeline:"Blue",Railway:"Green",Truck:"Yellow"});console.log(i),Highcharts.chart("container",{plotOptions:{series:{label:{connectorAllowed:!1},pointStart:2010}},series:o})})()})();