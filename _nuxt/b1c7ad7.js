(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{493:function(t,e,r){t.exports=r.p+"img/elixir-aai.f178a15.png"},494:function(t,e,r){t.exports=r.p+"54c1d594f12cbd9a4975d5281a104288.svg"},495:function(t,e,r){t.exports=r.p+"img/eucancan.6c3c0fb.png"},496:function(t,e,r){t.exports=r.p+"img/permedcoe.def3e31.png"},497:function(t,e,r){t.exports=r.p+"img/ipc.9a63831.png"},498:function(t,e,r){t.exports=r.p+"img/decider.1f507d2.jpg"},499:function(t,e,r){r(6)({target:"Math",stat:!0},{sign:r(325)})},500:function(t,e,r){var content=r(501);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(19).default)("8f7a87bc",content,!0,{sourceMap:!1})},501:function(t,e,r){var n=r(18)(!1);n.push([t.i,".v-slide-group{display:flex}.v-slide-group:not(.v-slide-group--has-affixes)>.v-slide-group__next,.v-slide-group:not(.v-slide-group--has-affixes)>.v-slide-group__prev{display:none}.v-slide-group.v-item-group>.v-slide-group__next,.v-slide-group.v-item-group>.v-slide-group__prev{cursor:pointer}.v-slide-item{display:inline-flex;flex:0 1 auto}.v-slide-group__next,.v-slide-group__prev{align-items:center;display:flex;flex:0 1 52px;justify-content:center;min-width:52px}.v-slide-group__content{display:flex;flex:1 0 auto;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);white-space:nowrap}.v-slide-group__wrapper{contain:content;display:flex;flex:1 1 auto;overflow:hidden}.v-slide-group__next--disabled,.v-slide-group__prev--disabled{pointer-events:none}",""]),t.exports=n},512:function(t,e,r){"use strict";r.r(e);var n={name:"LogoSlider",data:function(){return{images:[{title:"Elixir AAI",href:"https://elixir-europe.org/",src:r(493)},{title:"Eucan Image",href:"https://eucanimage.eu/",src:r(494)},{title:"EUCANcan",href:"https://eucancan.com/",src:r(495)},{title:"PerMedCoE",href:"https://permedcoe.eu/",src:r(496)},{title:"IPC",href:"https://ipc-project.eu/",src:r(497)},{title:"decider",href:"https://www.deciderproject.eu/",src:r(498)}]}}},o=r(43),c=r(48),l=r.n(c),h=r(487),f=r(182),d=(r(10),r(8),r(11),r(3),r(13),r(9),r(14),r(33),r(49),r(37),r(23),r(63),r(69),r(42),r(2)),v=(r(499),r(41),r(26),r(46),r(500),r(72)),w=r(82),m=r(104),y=r(212),O=r(150),x=r(234),_=r(7),$=r(0);function S(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return A(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return A(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}function j(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function C(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(e){Object(d.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}function M(t){var e=Math.abs(t);return Math.sign(t)*(e/((1/.501-2)*(1-e)+1))}function I(t,e,r,n){var o=t.clientWidth,c=r?e.content-t.offsetLeft-o:t.offsetLeft;r&&(n=-n);var l=e.wrapper+n,h=o+c,f=.4*o;return c<=n?n=Math.max(c-f,0):l<=h&&(n=Math.min(n-(l-h-f),e.content-e.wrapper)),r?-n:n}var P=Object(_.a)(m.a,y.a).extend({name:"base-slide-group",directives:{Resize:O.a,Touch:x.a},props:{activeClass:{type:String,default:"v-slide-item--active"},centerActive:Boolean,nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},showArrows:{type:[Boolean,String],validator:function(t){return"boolean"==typeof t||["always","desktop","mobile"].includes(t)}}},data:function(){return{internalItemsLength:0,isOverflowing:!1,resizeTimeout:0,startX:0,isSwipingHorizontal:!1,isSwiping:!1,scrollOffset:0,widths:{content:0,wrapper:0}}},computed:{canTouch:function(){return"undefined"!=typeof window},__cachedNext:function(){return this.genTransition("next")},__cachedPrev:function(){return this.genTransition("prev")},classes:function(){return C(C({},m.a.options.computed.classes.call(this)),{},{"v-slide-group":!0,"v-slide-group--has-affixes":this.hasAffixes,"v-slide-group--is-overflowing":this.isOverflowing})},hasAffixes:function(){switch(this.showArrows){case"always":return!0;case"desktop":return!this.isMobile;case!0:return this.isOverflowing||Math.abs(this.scrollOffset)>0;case"mobile":return this.isMobile||this.isOverflowing||Math.abs(this.scrollOffset)>0;default:return!this.isMobile&&(this.isOverflowing||Math.abs(this.scrollOffset)>0)}},hasNext:function(){if(!this.hasAffixes)return!1;var t=this.widths,content=t.content,e=t.wrapper;return content>Math.abs(this.scrollOffset)+e},hasPrev:function(){return this.hasAffixes&&0!==this.scrollOffset}},watch:{internalValue:"setWidths",isOverflowing:"setWidths",scrollOffset:function(t){this.$vuetify.rtl&&(t=-t);var e=t<=0?M(-t):t>this.widths.content-this.widths.wrapper?-(this.widths.content-this.widths.wrapper)+M(this.widths.content-this.widths.wrapper-t):-t;this.$vuetify.rtl&&(e=-e),this.$refs.content.style.transform="translateX(".concat(e,"px)")}},beforeUpdate:function(){this.internalItemsLength=(this.$children||[]).length},updated:function(){this.internalItemsLength!==(this.$children||[]).length&&this.setWidths()},methods:{onScroll:function(){this.$refs.wrapper.scrollLeft=0},onFocusin:function(t){if(this.isOverflowing){var e,r=S(Object($.f)(t));try{for(r.s();!(e=r.n()).done;){var n,o=e.value,c=S(this.items);try{for(c.s();!(n=c.n()).done;){var l=n.value;if(l.$el===o)return void(this.scrollOffset=I(l.$el,this.widths,this.$vuetify.rtl,this.scrollOffset))}}catch(t){c.e(t)}finally{c.f()}}}catch(t){r.e(t)}finally{r.f()}}},genNext:function(){var t=this,slot=this.$scopedSlots.next?this.$scopedSlots.next({}):this.$slots.next||this.__cachedNext;return this.$createElement("div",{staticClass:"v-slide-group__next",class:{"v-slide-group__next--disabled":!this.hasNext},on:{click:function(){return t.onAffixClick("next")}},key:"next"},[slot])},genContent:function(){return this.$createElement("div",{staticClass:"v-slide-group__content",ref:"content",on:{focusin:this.onFocusin}},this.$slots.default)},genData:function(){return{class:this.classes,directives:[{name:"resize",value:this.onResize}]}},genIcon:function(t){var e=t;this.$vuetify.rtl&&"prev"===t?e="next":this.$vuetify.rtl&&"next"===t&&(e="prev");var r="".concat(t[0].toUpperCase()).concat(t.slice(1)),n=this["has".concat(r)];return this.showArrows||n?this.$createElement(v.a,{props:{disabled:!n}},this["".concat(e,"Icon")]):null},genPrev:function(){var t=this,slot=this.$scopedSlots.prev?this.$scopedSlots.prev({}):this.$slots.prev||this.__cachedPrev;return this.$createElement("div",{staticClass:"v-slide-group__prev",class:{"v-slide-group__prev--disabled":!this.hasPrev},on:{click:function(){return t.onAffixClick("prev")}},key:"prev"},[slot])},genTransition:function(t){return this.$createElement(w.b,[this.genIcon(t)])},genWrapper:function(){var t=this;return this.$createElement("div",{staticClass:"v-slide-group__wrapper",directives:[{name:"touch",value:{start:function(e){return t.overflowCheck(e,t.onTouchStart)},move:function(e){return t.overflowCheck(e,t.onTouchMove)},end:function(e){return t.overflowCheck(e,t.onTouchEnd)}}}],ref:"wrapper",on:{scroll:this.onScroll}},[this.genContent()])},calculateNewOffset:function(t,e,r,n){var o=r?-1:1,c=o*n+("prev"===t?-1:1)*e.wrapper;return o*Math.max(Math.min(c,e.content-e.wrapper),0)},onAffixClick:function(t){this.$emit("click:".concat(t)),this.scrollTo(t)},onResize:function(){this._isDestroyed||this.setWidths()},onTouchStart:function(t){var content=this.$refs.content;this.startX=this.scrollOffset+t.touchstartX,content.style.setProperty("transition","none"),content.style.setProperty("willChange","transform")},onTouchMove:function(t){if(this.canTouch){if(!this.isSwiping){var e=t.touchmoveX-t.touchstartX,r=t.touchmoveY-t.touchstartY;this.isSwipingHorizontal=Math.abs(e)>Math.abs(r),this.isSwiping=!0}this.isSwipingHorizontal&&(this.scrollOffset=this.startX-t.touchmoveX,document.documentElement.style.overflowY="hidden")}},onTouchEnd:function(){if(this.canTouch){var t=this.$refs,content=t.content,e=t.wrapper,r=content.clientWidth-e.clientWidth;content.style.setProperty("transition",null),content.style.setProperty("willChange",null),this.$vuetify.rtl?this.scrollOffset>0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset<=-r&&(this.scrollOffset=-r):this.scrollOffset<0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset>=r&&(this.scrollOffset=r),this.isSwiping=!1,document.documentElement.style.removeProperty("overflow-y")}},overflowCheck:function(t,e){t.stopPropagation(),this.isOverflowing&&e(t)},scrollIntoView:function(){if(!this.selectedItem&&this.items.length){var t=this.items[this.items.length-1].$el.getBoundingClientRect(),e=this.$refs.wrapper.getBoundingClientRect();(this.$vuetify.rtl&&e.right<t.right||!this.$vuetify.rtl&&e.left>t.left)&&this.scrollTo("prev")}this.selectedItem&&(0===this.selectedIndex||!this.centerActive&&!this.isOverflowing?this.scrollOffset=0:this.centerActive?this.scrollOffset=function(t,e,r){var n=t.offsetLeft,o=t.clientWidth;if(r){var c=e.content-n-o/2-e.wrapper/2;return-Math.min(e.content-e.wrapper,Math.max(0,c))}var l=n+o/2-e.wrapper/2;return Math.min(e.content-e.wrapper,Math.max(0,l))}(this.selectedItem.$el,this.widths,this.$vuetify.rtl):this.isOverflowing&&(this.scrollOffset=I(this.selectedItem.$el,this.widths,this.$vuetify.rtl,this.scrollOffset)))},scrollTo:function(t){this.scrollOffset=this.calculateNewOffset(t,{content:this.$refs.content?this.$refs.content.clientWidth:0,wrapper:this.$refs.wrapper?this.$refs.wrapper.clientWidth:0},this.$vuetify.rtl,this.scrollOffset)},setWidths:function(){var t=this;window.requestAnimationFrame((function(){if(!t._isDestroyed){var e=t.$refs,content=e.content,r=e.wrapper;t.widths={content:content?content.clientWidth:0,wrapper:r?r.clientWidth:0},t.isOverflowing=t.widths.wrapper+1<t.widths.content,t.scrollIntoView()}}))}},render:function(t){return t("div",this.genData(),[this.genPrev(),this.genWrapper(),this.genNext()])}}).extend({name:"v-slide-group",provide:function(){return{slideGroup:this}}}),k=r(105),E=r(12),T=r(1).a.extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots.default?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({active:this.isActive,toggle:this.toggle})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(element.data=this._b(element.data||{},element.tag,{class:Object(d.a)({},this.activeClass,this.isActive)}),element):(Object(E.c)("v-item should only contain a single element",this),element)):(Object(E.c)("v-item is missing a default scopedSlot",this),null);var element}}),W=(Object(_.a)(T,Object(k.a)("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),Object(_.a)(T,Object(k.a)("slideGroup")).extend({name:"v-slide-item"})),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("h2",{staticClass:"text-h4"},[t._v("Our partners")]),t._v(" "),r("v-slide-group",{staticClass:"pa-4",attrs:{"show-arrows":"always"}},t._l(t.images,(function(image,t){return r("v-slide-item",{key:"logoslider"+t,attrs:{disabled:""}},[r("a",{attrs:{href:image.href,target:"_blank"}},[r("v-img",{staticClass:"ma-5 pa-2",attrs:{contain:"","max-height":"150","max-width":"200",src:image.src}})],1)])})),1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VContainer:h.a,VImg:f.a,VSlideGroup:P,VSlideItem:W})}}]);