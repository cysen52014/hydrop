webpackJsonp([7],{"1Ixd":function(e,d,s){"use strict";function r(e){s("dCy6")}Object.defineProperty(d,"__esModule",{value:!0});var A=s("3nu6"),a=s("ZsuB"),i=s("VU/8"),n=r,t=i(A.a,a.a,n,null,null);d.default=t.exports},"3nu6":function(e,d,s){"use strict";var r=s("lbHh"),A=s.n(r);d.a={props:[],data:function(){return{address:[],aid:"",select:!1}},created:function(){var e=this;A.a.get("f_userid")&&this.$store.dispatch("getUserAddress",{id:A.a.get("f_userid"),cb:function(d){200==d.body.code&&(e.address=d.body.data)}})},methods:{selectAddress:function(e){var d=this,s=this;this.$nextTick(function(){d.address.forEach(function(d,r){r==e?(d.active?d.active=!1:d.active=!0,s.aid=d._id,s.select=d.active):d.active=!1,s.$forceUpdate()})})},address_selected:function(){var e=this;this.$store.dispatch("addressSelect",{aid:this.aid,select:this.select,cb:function(d){200==d.body.code&&e.$router.push({path:"/cart"})}})},goBack:function(){window.history.go(-1)}}}},AJTx:function(e,d,s){d=e.exports=s("FZ+f")(!0),d.push([e.i,".add_address{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;background:#f2f2f2}.add_address .header{background:#fff;height:48px;line-height:48px;color:#333;text-align:center;font-size:20px;border-bottom:1px solid #ddd;margin-bottom:10px;position:relative}.add_address .header i{position:absolute;left:0;top:0;width:38px;height:48px;line-height:48px}.add_address .add_address_main{background:#fff;border-top:1px solid #ddd}.add_address .user_address{background:#fff}.add_address .user_address ul li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #e6e6e6}.add_address .user_address .dogo{width:30px;height:68px;cursor:pointer}.add_address .user_address .dogo i{display:block;width:15px;height:15px;border:1px solid #9e9e9e;border-radius:50%;margin:27px auto 0;font-size:10px;color:#fff;position:relative}.add_address .user_address .dogo i:before{top:-3px;position:absolute}.add_address .user_address li.active .dogo i{background:#e93b3d}.add_address .user_address .info{-webkit-box-flex:1;-ms-flex:1;flex:1}.add_address .user_address .info .p{margin:0 10px}.address_save{border-radius:10px;width:90%;margin:20px auto;background:#ff5c5c;color:#fff;height:42px;line-height:42px;text-align:center}","",{version:3,sources:["D:/nodejs/hydshop/src/pages/front-chose-address.vue"],names:[],mappings:"AACA,aACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,YAAa,AACb,kBAAoB,CACrB,AACD,qBACE,gBAAiB,AACjB,YAAa,AACb,iBAAkB,AAClB,WAAY,AACZ,kBAAmB,AACnB,eAAgB,AAChB,6BAA8B,AAC9B,mBAAoB,AACpB,iBAAmB,CACpB,AACD,uBACE,kBAAmB,AACnB,OAAU,AACV,MAAS,AACT,WAAY,AACZ,YAAa,AACb,gBAAkB,CACnB,AACD,+BACE,gBAAiB,AACjB,yBAA2B,CAC5B,AACD,2BACE,eAAiB,CAClB,AACD,iCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,+BAAiC,CAClC,AACD,iCACE,WAAY,AACZ,YAAa,AACb,cAAgB,CACjB,AACD,mCACE,cAAe,AACf,WAAY,AACZ,YAAa,AACb,yBAA0B,AAC1B,kBAAmB,AACnB,mBAAoB,AACpB,eAAgB,AAChB,WAAY,AACZ,iBAAmB,CACpB,AACD,0CACE,SAAU,AACV,iBAAmB,CACpB,AACD,6CACE,kBAAoB,CACrB,AACD,iCACE,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACjB,AACD,oCACE,aAAe,CAChB,AACD,cACE,mBAAoB,AACpB,UAAW,AACX,iBAAkB,AAClB,mBAAoB,AACpB,WAAY,AAEZ,YAAa,AACb,iBAAkB,AAClB,iBAAmB,CACpB",file:"front-chose-address.vue",sourcesContent:["\n.add_address {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  height: 100%;\r\n  background: #f2f2f2;\n}\n.add_address .header {\r\n  background: #fff;\r\n  height: 48px;\r\n  line-height: 48px;\r\n  color: #333;\r\n  text-align: center;\r\n  font-size: 20px;\r\n  border-bottom: 1px solid #ddd;\r\n  margin-bottom: 10px;\r\n  position: relative;\n}\n.add_address .header i {\r\n  position: absolute;\r\n  left: 0px;\r\n  top: 0px;\r\n  width: 38px;\r\n  height: 48px;\r\n  line-height: 48px;\n}\n.add_address .add_address_main {\r\n  background: #fff;\r\n  border-top: 1px solid #ddd;\n}\n.add_address .user_address {\r\n  background: #fff;\n}\n.add_address .user_address ul li {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  border-bottom: 1px solid #e6e6e6;\n}\n.add_address .user_address .dogo {\r\n  width: 30px;\r\n  height: 68px;\r\n  cursor: pointer;\n}\n.add_address .user_address .dogo i {\r\n  display: block;\r\n  width: 15px;\r\n  height: 15px;\r\n  border: 1px solid #9e9e9e;\r\n  border-radius: 50%;\r\n  margin: 27px auto 0;\r\n  font-size: 10px;\r\n  color: #fff;\r\n  position: relative;\n}\n.add_address .user_address .dogo i:before {\r\n  top: -3px;\r\n  position: absolute;\n}\n.add_address .user_address li.active .dogo i {\r\n  background: #e93b3d;\n}\n.add_address .user_address .info {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1;\r\n          flex: 1;\n}\n.add_address .user_address .info .p {\r\n  margin: 0 10px;\n}\n.address_save {\r\n  border-radius: 10px;\r\n  width: 90%;\r\n  margin: 20px auto;\r\n  background: #ff5c5c;\r\n  color: #fff;\r\n  text-align: center;\r\n  height: 42px;\r\n  line-height: 42px;\r\n  text-align: center;\n}\r\n"],sourceRoot:""}])},ZsuB:function(e,d,s){"use strict";var r=function(){var e=this,d=e.$createElement,s=e._self._c||d;return s("div",{staticClass:"add_address"},[s("div",{staticClass:"header"},[s("i",{staticClass:"el-icon-arrow-left",on:{click:e.goBack}}),e._v("选择收件地址")]),e._v(" "),s("div",{staticClass:"add_address_main"},[s("div",{staticClass:"user_address"},[s("ul",e._l(e.address,function(d,r){return s("li",{key:r,class:{active:d.active},on:{click:function(d){e.selectAddress(r)}}},[e._m(0,!0),e._v(" "),s("div",{staticClass:"info"},[s("span",{staticClass:"n"},[e._v(e._s(d.name))]),e._v(" "),s("span",{staticClass:"p"},[e._v(e._s(d.phone))]),e._v(" "),s("span",{staticClass:"a"},[e._v(e._s(d.address))])])])}))])]),e._v(" "),s("div",{staticClass:"address_save",on:{click:e.address_selected}},[e._v("保 存")])])},A=[function(){var e=this,d=e.$createElement,s=e._self._c||d;return s("div",{staticClass:"dogo"},[s("i")])}],a={render:r,staticRenderFns:A};d.a=a},dCy6:function(e,d,s){var r=s("AJTx");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);s("rjj0")("3af38a0d",r,!0)}});
//# sourceMappingURL=7.b424cc4cbac1ff3f563c.js.map