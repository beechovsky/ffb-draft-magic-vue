webpackJsonp([1],{"/p5Q":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),n={name:"Upload",methods:{parseFile:function(t){var e;e=t.replace(/"/g,"").replace(/,,/g,",").split(/,[\r\n]/)[0].split(/\r\n/),this.$emit("load",e)},loadTextFromFile:function(t){var e=this;if(t.target.files[0]){var s=t.target.files[0],i=new FileReader;i.onload=function(t){return e.parseFile(t.target.result)},i.readAsText(s)}}}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"upload-button"},[e("h1",[this._v("Upload Rankings CSV")]),this._v(" "),e("input",{attrs:{type:"file"},on:{change:this.loadTextFromFile}})])},staticRenderFns:[]};var a={name:"app",data:function(){return{showUpload:!0,rankings:[],drafted:[],columnHeaders:[],colCount:0,search:""}},computed:{searchList:function(){var t=this;if(this.search.length>3)return this.rankings.filter(function(e){return e.toLowerCase().includes(t.search.toLowerCase())})},rbList:function(){var t=[];return this.rankings.filter(function(e){e.split(",")[4].includes("RB")&&t.push(e)}),t},wrList:function(){var t=[];return this.rankings.filter(function(e){e.split(",")[4].includes("WR")&&t.push(e)}),t},qbList:function(){var t=[];return this.rankings.filter(function(e){e.split(",")[4].includes("QB")&&t.push(e)}),t},teList:function(){var t=[];return this.rankings.filter(function(e){e.split(",")[4].includes("TE")&&t.push(e)}),t}},methods:{setRows:function(t){for(var e in this.showUpload=!1,t)this.rankings.splice(t.indexOf(e),0,t[e]);var s=this.rankings[this.rankings.length-1];this.columnHeaders=s.split(","),this.columnHeaders.splice(1,1),this.columnHeaders.splice(1,1),this.columnHeaders.splice(1,1,"Name"),this.colCount=this.columnHeaders.length},hideRow:function(t,e,s){var i=this;!0===s?(this.drafted.splice(0,0,t),this.rankings.splice(e,1)):this.rankings.filter(function(e,s){t.split(",")[0]===e.split(",")[0]&&(i.drafted.splice(0,0,t),i.rankings.splice(s,1))}),this.search=""},putBack:function(t,e){this.rankings.splice(0,0,t),this.drafted.splice(e,1)},mergeSort:function(t){if(t.length<2)return t;var e=parseInt(t.length/2),s=t.slice(0,e),i=t.slice(e,t.length);return this.merge(this.mergeSort(s),this.mergeSort(i))},merge:function(t,e){for(var s=[];t.length&&e.length;)parseInt(t[0].split(",")[0])<=parseInt(e[0].split(",")[0])?s.push(t.shift()):s.push(e.shift());for(;t.length;)s.push(t.shift());for(;e.length;)s.push(e.shift());return s}},components:{Upload:s("VU/8")(n,r,!1,function(t){s("mz85")},null,null).exports}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("meta",{attrs:{name:"viewport",content:"width=device-width, initial-scale=1"}}),t._v(" "),t._m(0),t._v(" "),s("br"),t._v(" "),!0===this.showUpload?s("upload",{staticClass:"visible",attrs:{id:"uploadButton"},on:{load:t.setRows}}):t._e(),t._v(" "),s("br"),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"search"},[this.rankings.length>0?s("div",[s("div",{staticClass:"orange"},[t._m(1),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Player Name"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})])]):t._e()]),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"search results"},[s("table",[s("tbody",t._l(t.searchList,function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.hideRow(e,i,!1)}}},t._l(e.split(",").splice(1,3),function(e){return s("td",[t._v(t._s(e))])}),0)}),0)])]),t._v(" "),this.rankings.length>0?s("div",{staticClass:"parent"},[s("div",{staticClass:"child rankings"},[t._m(2),t._v(" "),s("table",{staticClass:"rankingsTable"},[s("thead",[s("tr",t._l(t.columnHeaders,function(e){return s("th",{staticStyle:{"background-color":"#f5f5f5"}},[t._v(t._s(e))])}),0)]),t._v(" "),s("tbody",t._l(t.mergeSort(this.rankings).splice(1,this.rankings.length),function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.hideRow(e,i,!0)}}},[t._l(e.split(",").splice(0,1),function(e){return s("td",[t._v(t._s(e))])}),t._l(e.split(",").splice(2,t.colCount),function(e){return s("td",[t._v(t._s(e))])})],2)}),0)])]),t._v(" "),s("div",{staticClass:"child rbs"},[t._m(3),t._v(" "),s("table",{staticClass:"posTable"},[s("tbody",t._l(t.mergeSort(t.rbList),function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.hideRow(e,i,!1)}}},[t._l(e.split(",").splice(2,1),function(e){return s("td",[t._v(t._s(e))])}),t._l(e.split(",").splice(4,1),function(e){return s("td",[t._v(t._s(e))])})],2)}),0)]),t._v(" "),s("br"),t._v(" "),t._m(4),t._v(" "),s("table",{staticClass:"posTable"},[s("tbody",t._l(t.mergeSort(t.qbList),function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.hideRow(e,i,!1)}}},[t._l(e.split(",").splice(2,1),function(e){return s("td",[t._v(t._s(e))])}),t._l(e.split(",").splice(4,1),function(e){return s("td",[t._v(t._s(e))])})],2)}),0)])]),t._v(" "),s("div",{staticClass:"child wrs"},[t._m(5),t._v(" "),s("table",{staticClass:"posTable"},[s("tbody",t._l(t.mergeSort(t.wrList),function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.hideRow(e,i,!1)}}},[t._l(e.split(",").splice(2,1),function(e){return s("td",[t._v(t._s(e))])}),t._l(e.split(",").splice(4,1),function(e){return s("td",[t._v(t._s(e))])})],2)}),0)]),t._v(" "),s("br"),t._v(" "),t._m(6),t._v(" "),s("table",{staticClass:"posTable",staticStyle:{width:"100%"}},[s("tbody",t._l(t.mergeSort(t.teList),function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.hideRow(e,i,!1)}}},[t._l(e.split(",").splice(2,1),function(e){return s("td",[t._v(t._s(e))])}),t._l(e.split(",").splice(4,1),function(e){return s("td",[t._v(t._s(e))])})],2)}),0)])]),t._v(" "),this.drafted.length>0?s("div",{staticClass:"child drafted"},[t._m(7),t._v(" "),s("table",[s("tbody",t._l(this.drafted,function(e,i){return s("tr",{staticClass:"clickable",on:{click:function(s){return t.putBack(e,i)}}},[t._l(e.split(",").splice(2,1),function(e){return s("td",[t._v(t._s(e))])}),t._l(e.split(",").splice(4,1),function(e){return s("td",[t._v(t._s(e))])})],2)}),0)])]):t._e()]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero"},[e("header",[e("br"),this._v(" "),e("h1",[e("b",[this._v("FFB DraftMagic© by "),e("a",{attrs:{href:"https://github.com/beechovsky/ffb-draft-magic-vue",target:"_blank"}},[this._v("Jeff Bucklew")])])]),this._v(" "),e("h3",[e("i",[this._v("Inspired by "),e("a",{attrs:{href:"https://jayzheng.com/ff/",target:"_blank"}},[this._v("Jay Zheng's Draft Aid")])])]),this._v(" "),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("b",[this._v("Search Rankings:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Rankings\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Running Backs\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Quarter Backs\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Wide Receivers\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Tight Ends\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Drafted\n        ")])])}]};var c=s("VU/8")(a,l,!1,function(t){s("/p5Q")},null,null).exports,o=s("e6fC"),u=s.n(o);i.a.use(u.a),i.a.config.productionTip=!1,new i.a({el:"#app",components:{App:c},template:"<App/>"})},mz85:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.673d035830b6fa929e81.js.map