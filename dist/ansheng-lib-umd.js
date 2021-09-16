!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).anshengLib={})}(this,(function(e){"use strict";var t={name:"AslFrame",props:{width:{type:Number,default:3840},height:{type:Number,default:2160},bgColor:{default:"rgb(2, 2, 37)"}},data:function(){return{frameWidth:0,frameHeight:0}},methods:{setSize:function(){this.frameWidth=this.width||screen.width,this.frameHeight=this.height||screen.height;var e=this.$refs.aslFrame;e.style.width=this.frameWidth+"px",e.style.height=this.frameHeight+"px"},setScale:function(){var e=document.body.clientWidth,t=document.body.clientHeight,n=e/this.frameWidth,s=t/this.frameHeight;this.$refs.aslFrame.style.transform="scale(".concat(n,",").concat(s,")")},debounce:function(e,t){var n,s=arguments,i=this,o=t||300;return function(){var t=s;n&&clearTimeout(n),n=setTimeout((function(){n=null,e.apply(i,t)}),o)}}},mounted:function(){this.setSize(),this.setScale(),this.debouncedSetScale=this.debounce(this.setScale,500),window.addEventListener("resize",this.debouncedSetScale)},destroyed:function(){window.removeEventListener("resize",this.debouncedSetScale)}};function n(e,t,n,s,i,o,r,a,d,l){"boolean"!=typeof r&&(d=a,a=r,r=!1);const c="function"==typeof n?n.options:n;let m;if(e&&e.render&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),s&&(c._scopeId=s),o?(m=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(o)},c._ssrRegister=m):t&&(m=r?function(e){t.call(this,l(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,a(e))}),m)if(c.functional){const e=c.render;c.render=function(t,n){return m.call(n),e(t,n)}}else{const e=c.beforeCreate;c.beforeCreate=e?[].concat(e,m):[m]}return n}const s="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function i(e){return(e,t)=>function(e,t){const n=s?t.media||"default":e,i=r[n]||(r[n]={ids:new Set,styles:[]});if(!i.ids.has(e)){i.ids.add(e);let n=t.source;if(t.map&&(n+="\n/*# sourceURL="+t.map.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),i.element||(i.element=document.createElement("style"),i.element.type="text/css",t.media&&i.element.setAttribute("media",t.media),void 0===o&&(o=document.head||document.getElementsByTagName("head")[0]),o.appendChild(i.element)),"styleSheet"in i.element)i.styles.push(n),i.element.styleSheet.cssText=i.styles.filter(Boolean).join("\n");else{const e=i.ids.size-1,t=document.createTextNode(n),s=i.element.childNodes;s[e]&&i.element.removeChild(s[e]),s.length?i.element.insertBefore(t,s[e]):i.element.appendChild(t)}}}(e,t)}let o;const r={};const a=t;var d=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{ref:"aslFrame",staticClass:"asl_frame",style:{background:e.bgColor}},[e._t("default")],2)};d._withStripped=!0;const l=n({render:d,staticRenderFns:[]},(function(e){e&&e("data-v-05bb8be2_0",{source:".asl_frame {\n  position: fixed;\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n}\n\n/*# sourceMappingURL=Frame.vue.map */",map:{version:3,sources:["F:\\my_project\\rollup_从入门到打包一个组件库\\ansheng-lib\\src\\components\\Frame\\Frame.vue","Frame.vue"],names:[],mappings:"AA8EA;EACA,eAAA;EACA,kCAAA;UAAA,0BAAA;AC7EA;;AAEA,oCAAoC",file:"Frame.vue",sourcesContent:['<template>\n  <div class="asl_frame" :style="{ background: bgColor }" ref="aslFrame">\n    <slot></slot>\n  </div>\n</template>\n<script>\nexport default {\n  name: "AslFrame",\n  props: {\n    width: {\n      type: Number,\n      default: 3840,\n    },\n    height: {\n      type: Number,\n      default: 2160,\n    },\n    bgColor: {\n      default: "rgb(2, 2, 37)",\n    },\n  },\n  data() {\n    return {\n      frameWidth: 0,\n      frameHeight: 0,\n    };\n  },\n  methods: {\n    setSize() {\n      //获取父组件传入的容器宽高，通常是设计稿宽高，或者电脑屏幕的宽高\n      this.frameWidth = this.width || screen.width;\n      this.frameHeight = this.height || screen.height;\n\n      //将传入的宽高设为大屏边框容器的宽高\n      let frame = this.$refs.aslFrame;\n      frame.style.width = this.frameWidth + "px";\n      frame.style.height = this.frameHeight + "px";\n    },\n    setScale() {\n      //获取页面的宽高，使用时需要设置html，body{ height:100% }，否则获取到的页面高度为0\n      let bodyWidth = document.body.clientWidth,\n        bodyHeight = document.body.clientHeight;\n\n      //根据浏览器视口的的宽高 和 大屏边框容器的宽高 计算缩放值\n      let scaleX = bodyWidth / this.frameWidth,\n        scaleY = bodyHeight / this.frameHeight;\n\n      //为大屏边框容器设置缩放值\n      this.$refs.aslFrame.style.transform = `scale(${scaleX},${scaleY})`;\n    },\n    debounce(fn, t) {\n      const delay = t || 300;\n      let timer;\n      return () => {\n        const args = arguments;\n        if (timer) {\n          clearTimeout(timer);\n        }\n        timer = setTimeout(() => {\n          timer = null;\n          fn.apply(this, args);\n        }, delay);\n      };\n    },\n  },\n  mounted() {\n    this.setSize();\n    this.setScale();\n    this.debouncedSetScale = this.debounce(this.setScale, 500);\n    //触发resize事件时，重新计算 大屏边框容器 的缩放值\n    window.addEventListener("resize", this.debouncedSetScale);\n  },\n  destroyed() {\n    window.removeEventListener("resize", this.debouncedSetScale);\n  },\n};\n<\/script>\n<style lang="scss">\n.asl_frame {\n  position: fixed;\n  transform-origin: left top; //将transform-origin设为左上角\n}\n</style>\n',".asl_frame {\n  position: fixed;\n  transform-origin: left top;\n}\n\n/*# sourceMappingURL=Frame.vue.map */"]},media:void 0})}),a,undefined,false,undefined,!1,i,void 0,void 0);function c(e){e.component(l.name,l)}const m={name:"AslTest"};var f=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"asl_test"},[e._v("test---page")])};f._withStripped=!0;const u=n({render:f,staticRenderFns:[]},(function(e){e&&e("data-v-448b5bfd_0",{source:"\n.asl_test {\n  font-size: 70px;\n  color: red;\n}\n",map:{version:3,sources:["F:\\my_project\\rollup_从入门到打包一个组件库\\ansheng-lib\\src\\components\\Test\\Test.vue"],names:[],mappings:";AAWA;EACA,eAAA;EACA,UAAA;AACA",file:"Test.vue",sourcesContent:['<template>\n  <div class="asl_test">test---page</div>\n</template>\n\n<script>\nexport default {\n  name: "AslTest",\n};\n<\/script>\n\n<style>\n.asl_test {\n  font-size: 70px;\n  color: red;\n}\n</style>\n']},media:void 0})}),m,undefined,false,undefined,!1,i,void 0,void 0);function h(e){e.component(u.name,u)}function p(e){e.use(c),e.use(h)}window&&window.Vue&&Vue.use(p),e.Frame=c,e.Test=h,e.default=p,Object.defineProperty(e,"__esModule",{value:!0})}));
