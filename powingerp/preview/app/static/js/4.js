webpackJsonp([4],{677:function(e,t,n){var r=n(167)(n(701),n(780),null,null);e.exports=r.exports},696:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"topbar",data:function(){return{isUnique:!0,isRouter:!0,menus:[{name:"首页",router:"/home",children:[]},{name:"消息",router:"/message",children:[]},{name:"代办事项",router:"/task",children:[]},{name:"我",router:"/me",children:[]}]}}}},701:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(765),u=n.n(r);n(715);t.default={name:"layout",components:{"top-bar":u.a}}},715:function(e,t,n){"use strict";n(7).default.directive("title",{inserted:function(e,t){document.title=t.value}})},765:function(e,t,n){var r=n(167)(n(696),n(784),null,null);e.exports=r.exports},780:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("top-bar"),e._v(" "),n("router-view",{staticClass:"page-component-wrap animated fadeIn"})],1)},staticRenderFns:[]}},784:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-menu",{attrs:{"default-active":"/home","unique-opened":e.isUnique,router:e.isRouter,mode:"horizontal"}},[e._l(e.menus,function(t){return[n("el-menu-item",{key:t.router,attrs:{index:t.router}},[n("i",{class:t.icon}),e._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.name))])])]})],2)],1)},staticRenderFns:[]}}});