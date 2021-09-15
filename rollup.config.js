import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import postcss from 'rollup-plugin-postcss'
import vue from "rollup-plugin-vue"
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
            css: true,
            compileTemplate: true
        }),
        // postcss(),
        // postcss({
        //     // 把 css 插入到 style 中
        //     // inject: true,
        //     // 把 css 放到和js同一目录
        //     extract: true
        // }),
        postcss([
            require("postcss-modules")({
                getJSON: function (cssFileName, json, outputFileName) {
                    var path = require("path");
                    var cssName = path.basename(cssFileName, ".css");
                    var jsonFileName = path.resolve("./dist/" + cssName + ".json");
                    fs.writeFileSync(jsonFileName, JSON.stringify(json));
                },
            }),
        ]),
        commonjs(),  // 支持 commonjs 模块规范
        terser()  // 代码压缩
    ],
    external: [
        'vue'
    ]
}