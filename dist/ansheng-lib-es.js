//
//
//
//
//
var script$1 = {
  name: "AslFrame",
  props: {
    width: {
      type: Number,
      "default": 3840
    },
    height: {
      type: Number,
      "default": 2160
    },
    bgColor: {
      "default": "rgb(2, 2, 37)"
    }
  },
  data: function data() {
    return {
      frameWidth: 0,
      frameHeight: 0
    };
  },
  methods: {
    setSize: function setSize() {
      //获取父组件传入的容器宽高，通常是设计稿宽高，或者电脑屏幕的宽高
      this.frameWidth = this.width || screen.width;
      this.frameHeight = this.height || screen.height; //将传入的宽高设为大屏边框容器的宽高

      var frame = this.$refs.aslFrame;
      frame.style.width = this.frameWidth + "px";
      frame.style.height = this.frameHeight + "px";
    },
    setScale: function setScale() {
      //获取页面的宽高，使用时需要设置html，body{ height:100% }，否则获取到的页面高度为0
      var bodyWidth = document.body.clientWidth,
          bodyHeight = document.body.clientHeight; //根据浏览器视口的的宽高 和 大屏边框容器的宽高 计算缩放值

      var scaleX = bodyWidth / this.frameWidth,
          scaleY = bodyHeight / this.frameHeight; //为大屏边框容器设置缩放值

      this.$refs.aslFrame.style.transform = "scale(".concat(scaleX, ",").concat(scaleY, ")");
    },
    debounce: function debounce(fn, t) {
      var _arguments = arguments,
          _this = this;

      var delay = t || 300;
      var timer;
      return function () {
        var args = _arguments;

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {
          timer = null;
          fn.apply(_this, args);
        }, delay);
      };
    }
  },
  mounted: function mounted() {
    this.setSize();
    this.setScale();
    this.debouncedSetScale = this.debounce(this.setScale, 500); //触发resize事件时，重新计算 大屏边框容器 的缩放值

    window.addEventListener("resize", this.debouncedSetScale);
  },
  destroyed: function destroyed() {
    window.removeEventListener("resize", this.debouncedSetScale);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "aslFrame",
      staticClass: "asl_frame",
      style: { background: _vm.bgColor }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-1836b640_0", { source: ".asl_frame {\n  position: fixed;\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n}\n\n/*# sourceMappingURL=AslFrame.vue.map */", map: {"version":3,"sources":["F:\\my_project\\rollup_从入门到打包一个组件库\\ansheng-lib\\src\\components\\AslFrame\\AslFrame.vue","AslFrame.vue"],"names":[],"mappings":"AA8EA;EACA,eAAA;EACA,kCAAA;UAAA,0BAAA;AC7EA;;AAEA,uCAAuC","file":"AslFrame.vue","sourcesContent":["<template>\n  <div class=\"asl_frame\" :style=\"{ background: bgColor }\" ref=\"aslFrame\">\n    <slot></slot>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"AslFrame\",\n  props: {\n    width: {\n      type: Number,\n      default: 3840,\n    },\n    height: {\n      type: Number,\n      default: 2160,\n    },\n    bgColor: {\n      default: \"rgb(2, 2, 37)\",\n    },\n  },\n  data() {\n    return {\n      frameWidth: 0,\n      frameHeight: 0,\n    };\n  },\n  methods: {\n    setSize() {\n      //获取父组件传入的容器宽高，通常是设计稿宽高，或者电脑屏幕的宽高\n      this.frameWidth = this.width || screen.width;\n      this.frameHeight = this.height || screen.height;\n\n      //将传入的宽高设为大屏边框容器的宽高\n      let frame = this.$refs.aslFrame;\n      frame.style.width = this.frameWidth + \"px\";\n      frame.style.height = this.frameHeight + \"px\";\n    },\n    setScale() {\n      //获取页面的宽高，使用时需要设置html，body{ height:100% }，否则获取到的页面高度为0\n      let bodyWidth = document.body.clientWidth,\n        bodyHeight = document.body.clientHeight;\n\n      //根据浏览器视口的的宽高 和 大屏边框容器的宽高 计算缩放值\n      let scaleX = bodyWidth / this.frameWidth,\n        scaleY = bodyHeight / this.frameHeight;\n\n      //为大屏边框容器设置缩放值\n      this.$refs.aslFrame.style.transform = `scale(${scaleX},${scaleY})`;\n    },\n    debounce(fn, t) {\n      const delay = t || 300;\n      let timer;\n      return () => {\n        const args = arguments;\n        if (timer) {\n          clearTimeout(timer);\n        }\n        timer = setTimeout(() => {\n          timer = null;\n          fn.apply(this, args);\n        }, delay);\n      };\n    },\n  },\n  mounted() {\n    this.setSize();\n    this.setScale();\n    this.debouncedSetScale = this.debounce(this.setScale, 500);\n    //触发resize事件时，重新计算 大屏边框容器 的缩放值\n    window.addEventListener(\"resize\", this.debouncedSetScale);\n  },\n  destroyed() {\n    window.removeEventListener(\"resize\", this.debouncedSetScale);\n  },\n};\n</script>\n<style lang=\"scss\">\n.asl_frame {\n  position: fixed;\n  transform-origin: left top; //将transform-origin设为左上角\n}\n</style>\n",".asl_frame {\n  position: fixed;\n  transform-origin: left top;\n}\n\n/*# sourceMappingURL=AslFrame.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

function AslFrame (Vue) {
  Vue.component(__vue_component__$1.name, __vue_component__$1);
}

//
//
//
//
var script = {
  name: "AslTest"
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "asl_test" }, [_vm._v("test---page")])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-d7bff8c6_0", { source: "\n.asl_test {\n  font-size: 70px;\n  color: red;\n}\n", map: {"version":3,"sources":["F:\\my_project\\rollup_从入门到打包一个组件库\\ansheng-lib\\src\\components\\AslTest\\AslTest.vue"],"names":[],"mappings":";AAWA;EACA,eAAA;EACA,UAAA;AACA","file":"AslTest.vue","sourcesContent":["<template>\n  <div class=\"asl_test\">test---page</div>\n</template>\n\n<script>\nexport default {\n  name: \"AslTest\",\n};\n</script>\n\n<style>\n.asl_test {\n  font-size: 70px;\n  color: red;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

function AslTest (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
}

// Vue.use的用法，执行该函数会全局注册所有组件

function install(Vue) {
  Vue.use(AslFrame);
  Vue.use(AslTest);
} //通过`script`标签引入组件库的情况，注册所有组件


if (window && window.Vue) {
  Vue.use(install);
}

export { AslFrame, AslTest, install as default };
