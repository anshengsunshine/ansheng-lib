(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.anshengLib = {}));
}(this, (function (exports) {
  'use strict';

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
        this.frameHeight = this.height || screen.height;
        console.log(this); //将传入的宽高设为大屏边框容器的宽高

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

      setTimeout(() => {
        console.log("111", document.getElementById("asl_frame"));
      }, 1000)
      var _this2 = this;

      this.$nextTick(function () {
        setTimeout(() => {
          _this2.setSize();

          _this2.setScale();

          _this2.debouncedSetScale = _this2.debounce(_this2.setScale, 500);
          //触发resize事件时，重新计算 大屏边框容器 的缩放值

          window.addEventListener("resize", _this2.debouncedSetScale);
        }, 1000)

      });
    },
    destroyed: function destroyed() {
      window.removeEventListener("resize", this.debouncedSetScale);
    }
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return "import { createVNode as _createVNode } from \"vue\"; _createVNode(\"div\", { \"class\": \"asl_frame\", \"id\": \"asl_frame\", \"ref\": \"aslFrame\" }, [_createVNode(\"slot\", null, null)]);"
  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$1 = "\n.asl_frame[data-v-4feea9a2] {\r\n  position: fixed;\r\n  transform-origin: left top;\r\n  background: rgb(2, 2, 37);\n}\r\n";
  styleInject(css_248z$1);

  script$1.render = render$1;
  script$1.__scopeId = "data-v-4feea9a2";
  script$1.__file = "src/components/AslFrame/AslFrame.vue";

  function AslFrame(Vue) {
    Vue.component(script$1.name, script$1);
  }

  var script = {
    name: "AslTest"
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return "import { createVNode as _createVNode, createTextVNode as _createTextVNode } from \"vue\"; _createVNode(\"div\", { \"class\": \"asl_test\" }, [_createTextVNode(\"test---page\")]);"
  }

  var css_248z = "\n.asl_test[data-v-7bf642a9] {\r\n  font-size: 70px;\r\n  color: red;\n}\r\n";
  styleInject(css_248z);

  script.render = render;
  script.__scopeId = "data-v-7bf642a9";
  script.__file = "src/components/AslTest/AslTest.vue";

  function AslTest(Vue) {
    Vue.component(script.name, script);
  }

  // Vue.use的用法，执行该函数会全局注册所有组件

  function install(Vue) {
    Vue.use(AslFrame);
    Vue.use(AslTest);
  } //通过`script`标签引入组件库的情况，注册所有组件


  if (window && window.Vue) {
    Vue.use(install);
  }

  exports.AslFrame = AslFrame;
  exports.AslTest = AslTest;
  exports['default'] = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
