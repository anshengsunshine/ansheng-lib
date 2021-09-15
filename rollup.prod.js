import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import vue from "rollup-plugin-vue"
import autoprefixer from "autoprefixer"
import { terser } from "rollup-plugin-terser"

export default {
    input:"./src/index.js",
    output:[
        {
            file:"./dist/ansheng-lib-dis"
        }
    ]
}