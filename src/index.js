import {hiprint, defaultElementTypeProvider} from './hiprint/hiprint.bundle.js'
// 调用浏览器打印js
import "./hiprint/plugins/jquery.hiwprint.js";
// 默认配置
import "./hiprint/hiprint.config";
// 样式
import "./hiprint/css/hiprint.css"
import "./hiprint/css/print-lock.css"

import {version} from '../package.json'

let hiPrintPlugin = {

  install: function (Vue, name = '$hiPrint') {
    let globalVue = Vue.prototype || Vue.config.globalProperties;
    globalVue[name] = hiprint;
    /**
   * 预览打印，调起系统打印预览
	 * provider 左侧拖拽元素
	 * template 模版json字符串
	 * args 打印数据data, options,
	 */
	 globalVue.$print = function (provider = defaultElementTypeProvider, template, ...args) {
		 hiprint.init({
			providers: [new provider()]
		});
		var hiprintTemplate = new hiprint.PrintTemplate({
			template: template,
		});
		hiprintTemplate.print(...args);
		return hiprintTemplate;
	 }
	 /**
    * 单模版直接打印， 需客户端支持
	  * provider 左侧拖拽项对象
	  * template 模版json字符串
	  * args 打印数据data, options,
	  */
	 globalVue.$print2 = function (provider = defaultElementTypeProvider, template, ...args) {
		 hiprint.init({
			providers: [new provider()]
		});
		var hiprintTemplate = new hiprint.PrintTemplate({
			template: template,
		});
		hiprintTemplate.print2(...args);
		return hiprintTemplate;
	 }
  }
}

hiprint.version = version

window.hiprint = hiprint;
export {
  hiprint,
  hiPrintPlugin,
  defaultElementTypeProvider,
}


