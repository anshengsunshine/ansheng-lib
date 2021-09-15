import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import vue from "rollup-plugin-vue"
import autoprefixer from "autoprefixer"
import { terser } from "rollup-plugin-terser"

export default {
    input: "./src/index.js",
    output: [
        {
            file: "./dist/ansheng-lib-umd.js",
            format: "umd",
            name: "anshengLib"
        }, {
            file: "./dist/ansheng-lib-es.js",
            format: "es"
        }, {
            file: "./dist/ansheng-lib-cjs.js",
            format: "cjs"
        }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'  // 转换 es6 语法 
        }),
        vue({   // 编译 vue 代码，并为 vue 组件的样式加前缀
            style: {
                postcssPlugins: [
                    autoprefixer()
                ]
            }
        }),
        commonjs(),  // 支持 commonjs 模块规范
        terser()  // 代码压缩
    ],
    external: [
        'vue'
    ]
}