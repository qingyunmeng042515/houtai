/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports) {

	import Vue from 'vue'
	import VueRouter from 'vue-router'
	import VueResource from 'vue-resource'
	import VueValidator from 'vue-validator'
	import { configRouter } from './route.config'
	import XZ from './vue-xz'
	
	Vue.use(VueRouter)
	Vue.use(VueResource)
	Vue.use(VueValidator)
	Vue.use(XZ)
	
	Vue.config.debug = true
	Vue.http.options.emulateJSON = true;
	var App = Vue.extend({})
	
	var router = new VueRouter()
	configRouter(router)
	
	Vue.$xz.options({})
	
	Vue.filter('moment', function (value, formatString) {
	    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	    return moment(value).format(formatString);
	});
	
	router.start(App, '#app')
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map