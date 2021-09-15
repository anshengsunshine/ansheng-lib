# ansheng-lib
rollup按需加载，打包vue组件库

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
