webpackJsonp([1],{NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),n=s("fZjL"),r=s.n(n),a={name:"Upload",methods:{parseFile:function(t){var e=null;this.$papa.parse(t,{header:!0,complete:function(t){e=t.data}}),this.$emit("load",e)},getFile:function(t){var e=this;if(t.target.files[0]){var s=t.target.files[0],i=new FileReader;i.onload=function(t){return e.parseFile(t.target.result)},i.readAsText(s)}}}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("label",{staticClass:"upload-button"},[e("h1",[this._v("Upload Rankings CSV")]),this._v(" "),e("input",{attrs:{type:"file"},on:{change:this.getFile}})])},staticRenderFns:[]};var o={name:"app",data:function(){return{showUpload:!0,rankings:[],drafted:[],colHeaders:[],draftedColumns:[],sortBy:null,nameCol:null,nameColIndex:null,posCol:null,rankColNames:["ranking","rank","rk","rk.","overall","ovr","ovr."],nameColNames:["player name","player","name","nm","nm."],posColNames:["position","pos.","pos"],sortDirection:"asc",filter:null,filterOn:[],hover:!0}},methods:{setRows:function(t){for(var e in this.showUpload=!1,this.rankings=t,this.colHeaders=r()(this.rankings[0]),this.colHeaders)this.rankColNames.includes(this.colHeaders[e].toLowerCase())&&(this.sortBy=this.colHeaders[e]),this.nameColNames.includes(this.colHeaders[e].toLowerCase())&&(this.nameCol=this.colHeaders[e],this.nameColIndex=e),this.posColNames.includes(this.colHeaders[e].toLowerCase())&&(this.posCol=this.colHeaders[e]);this.draftedColumns.push(this.colHeaders[this.nameColIndex])},removeFromRankings:function(t){this.drafted.splice(0,0,t),this.rankings.splice(this.rankings.indexOf(t),1)},undraft:function(t){this.rankings.splice(0,0,t),this.drafted.splice(this.drafted.indexOf(t),1)},mergeSort:function(t){if(t.length<2)return t;var e=parseInt(t.length/2),s=t.slice(0,e),i=t.slice(e,t.length);return this.merge(this.mergeSort(s),this.mergeSort(i))},merge:function(t,e){for(var s=[];t.length&&e.length;)parseInt(t[0].split(",")[0])<=parseInt(e[0].split(",")[0])?s.push(t.shift()):s.push(e.shift());for(;t.length;)s.push(t.shift());for(;e.length;)s.push(e.shift());return s}},components:{Upload:s("VU/8")(a,l,!1,function(t){s("Nten")},null,null).exports}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("meta",{attrs:{name:"viewport",content:"width=device-width, initial-scale=1"}}),t._v(" "),t._m(0),t._v(" "),s("br"),t._v(" "),!0===this.showUpload?s("upload",{staticClass:"visible",attrs:{id:"uploadButton"},on:{load:t.setRows}}):t._e(),t._v(" "),s("br"),t._v(" "),s("br"),t._v(" "),this.rankings.length>0?s("div",[s("b-form-group",{attrs:{label:"Filter","label-for":"filter-input"}},[s("b-input-group",[s("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:"Type to Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t._v(" "),s("b-input-group-append",[s("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Clear")])],1)],1)],1)],1):t._e(),t._v(" "),this.rankings.length>0?s("div",{staticClass:"container"},[s("div",{staticClass:"item"},[t._m(1),t._v(" "),s("div",[s("b-table",{attrs:{filter:t.filter,"filter-included-fields":t.filterOn,"sort-direction":t.sortDirection,"sort-by":t.sortBy,items:this.rankings,fields:this.colHeaders},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"row-clicked":t.removeFromRankings}})],1)]),t._v(" "),s("div",{staticClass:"item"},[t._m(2),t._v(" "),s("div",[s("b-table",{attrs:{items:this.drafted,fields:this.draftedColumns},on:{"row-clicked":t.undraft}})],1)])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero"},[e("header",[e("br"),this._v(" "),e("h1",[e("b",[this._v("FFB DraftMagic")])]),this._v(" "),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Rankings\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("th",[e("tr",{staticClass:"orange"},[this._v("\n          Drafted\n        ")])])}]};var c=s("VU/8")(o,d,!1,function(t){s("SB0a")},null,null).exports,h=s("Tqaz"),u=s("R/3D");i.default.use(h.a),i.default.use(u.a),i.default.config.productionTip=!1,new i.default({el:"#app",components:{App:c},template:"<App/>"})},Nten:function(t,e){},SB0a:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9a9c97456c9670233310.js.map