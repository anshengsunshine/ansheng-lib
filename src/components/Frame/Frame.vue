<template>
  <div class="asl_frame" ref="aslFrame">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "AslFrame",
  props: {
    width: {
      type: Number,
      default: 3840,
    },
    height: {
      type: Number,
      default: 2160,
    },
    bgColor: {
      default: "background:rgb(2, 2, 37)",
    },
  },
  data() {
    return {
      frameWidth: 0,
      frameHeight: 0,
    };
  },
  methods: {
    setSize() {
      //获取父组件传入的容器宽高，通常是设计稿宽高，或者电脑屏幕的宽高
      this.frameWidth = this.width || screen.width;
      this.frameHeight = this.height || screen.height;

      //将传入的宽高设为大屏边框容器的宽高
      let frame = this.$refs.aslFrame;
      frame.style.width = this.frameWidth + "px";
      frame.style.height = this.frameHeight + "px";
    },
    setScale() {
      //获取页面的宽高，使用时需要设置html，body{ height:100% }，否则获取到的页面高度为0
      let bodyWidth = document.body.clientWidth,
        bodyHeight = document.body.clientHeight;

      //根据浏览器视口的的宽高 和 大屏边框容器的宽高 计算缩放值
      let scaleX = bodyWidth / this.frameWidth,
        scaleY = bodyHeight / this.frameHeight;

      //为大屏边框容器设置缩放值
      this.$refs.aslFrame.style.transform = `scale(${scaleX},${scaleY})`;
    },
    debounce(fn, t) {
      const delay = t || 300;
      let timer;
      return () => {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, args);
        }, delay);
      };
    },
  },
  mounted() {
    this.setSize();
    this.setScale();
    this.debouncedSetScale = this.debounce(this.setScale, 500);
    //触发resize事件时，重新计算 大屏边框容器 的缩放值
    window.addEventListener("resize", this.debouncedSetScale);
  },
  destroyed() {
    window.removeEventListener("resize", this.debouncedSetScale);
  },
};
</script>

