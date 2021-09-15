
import Frame from "./components/Frame/index"   //导入Frame/index.js的函数
import Test from "./components/Test/index"   //导入test/index.js的函数

// Vue.use的用法，执行该函数会全局注册所有组件
function install(Vue) {
    Vue.use(Frame)
    Vue.use(Test)
}

//通过`script`标签引入组件库的情况，注册所有组件
if (window && window.Vue) {
    Vue.use(install)
}

/***
在es模块中， 能被按需引入的变量需要用这些方式导出：
export const a = 1 
export function a(){} 
export { a, b } 
而不能使用export default 
***/

//这里导出各组件的全局组件函数
//当以 import { Frame } from 'xxx'的方式导入时，就只会导入Frame的相关代码，而不会导入test相关代码
export {
    Frame,
    Test
}

export default install