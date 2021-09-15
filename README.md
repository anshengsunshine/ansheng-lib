# ansheng-lib
rollup按需加载，打包vue组件库

>>>>>> 本次开发 参考 掘金 作者：Alaso
>>>>>> 原文地址：https://juejin.cn/post/6996892279617093669#heading-5

## 使用
`npm i asl-big-screen`

## npm init -y
配置 package.json

## 新建配置文件
* example:测试文件夹;
* src:组件库源码;
* .babelrc:babel配置文件;
* .eslintrc:eslint配置文件;
* rollup.dev.js:开发环境下的打包配置文件;
* rollup.prod.js:生产环境下的打包文件

## 安装相关插件
* npm i rollup-plugin-babel -D ：用于转换 es6 语法
* npm i rollup-plugin-commonjs -D ：用于 CommonJS 模块打包
* npm i rollup-plugin-vue -D ：用于打包 .vue 文件
* npm i autoprefixer -D ：用于给css一些属性添加前缀，比如：-webkit 等
* npm i rollup-plugin-terser -D ：用于代码压缩


## rollup支持的打包文件的格式有amd, cjs, es\esm, iife, umd
* amd为AMD标准
* cjs为CommonJS标准
* esm\es为ES模块标准
* iife为立即调用函数
* umd同时支持amd、cjs和iife

## 组件搭建
`src/components/XXX/XXX.vue`
`src/components/XXX/index.js`

`src/components/YYY/YYY.vue`
`src/components/YYY/index.js`

`src/index.js` --> 导出组件，可按需加载

修改`package.json`:
`"main": "./dist/bs-display-umd.js"`
`"module": "./dist/bs-display-es.js"`


## 组件测试
`example/index.html`
引入打包好的 `../dist/bs-display-umd.js` 文件




