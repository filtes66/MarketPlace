/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./backend/server.js":
/*!***************************!*\
  !*** ./backend/server.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _constants_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/environment */ \"./constants/environment.js\");\nvar PORT = 5000;\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](\"public\"));\nvar routes = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\napp.use(\"/\", routes); // body-parser\n\nroutes.use((0,body_parser__WEBPACK_IMPORTED_MODULE_1__.urlencoded)({\n  extended: false\n}));\nroutes.use((0,body_parser__WEBPACK_IMPORTED_MODULE_1__.json)());\nvar jsonParser = (0,body_parser__WEBPACK_IMPORTED_MODULE_1__.json)();\nvar corsOptions = {\n  origin: \"*\"\n}; //cors\n\nroutes.use(cors__WEBPACK_IMPORTED_MODULE_2___default()(corsOptions)); // mongoDB client\n\n\n\nvar uri = _constants_environment__WEBPACK_IMPORTED_MODULE_4__.URI_DB; //  \"mongodb+srv://philtest:Magefreud66@cluster-marketplace.0vfnb.mongodb.net/marketplace?retryWrites=true&w=majority\";\n\nvar client = new mongodb__WEBPACK_IMPORTED_MODULE_3__.MongoClient(uri, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n}); // connect to server\n\napp.listen(PORT, function () {\n  console.log(\"Server up and running on http://localhost:\".concat(PORT));\n}); // connect to DB\n\nvar DATABASE = \"marketplace\";\nclient.connect(function (err) {\n  if (err) {\n    throw Error(err);\n  }\n\n  !err && console.log(\"Successfully connected to database\");\n  var db = client.db(DATABASE);\n  var photos = db.collection(\"photos\"); // perform actions on the collection object\n\n  routes.get(\"/photos\", function (req, res) {\n    console.log(\"photos\");\n    photos.find().toArray().then(function (error, results) {\n      if (error) {\n        return res.send(error);\n      }\n\n      res.status(200).send({\n        results: results\n      });\n    })[\"catch\"](function (err) {\n      return res.send(err);\n    });\n  });\n  var exampleObj = {\n    id: 29999,\n    category: \"Clothes\",\n    name: \"Winter Jacket for Women, All sizes\",\n    price: 79\n  };\n  routes.post(\"/photos/add\", jsonParser, function (req, res) {\n    photos.insertOne(req.body).then(function () {\n      return res.status(200).send(\"successfully inserted new document\");\n    })[\"catch\"](function (err) {\n      console.log(err);\n      res.send(err);\n    });\n  });\n}); //routes\n\n/*routes.get(\"/\", (req, res) => {\r\n  res.send(\"Hello World!\");\r\n});*/\n\n//# sourceURL=webpack://marketplace/./backend/server.js?");

/***/ }),

/***/ "./constants/environment.js":
/*!**********************************!*\
  !*** ./constants/environment.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"URI_DB\": () => (/* binding */ URI_DB)\n/* harmony export */ });\nvar URI_DB = \"mongodb+srv://philtest:Magefreud66@cluster-marketplace.0vfnb.mongodb.net/marketplace?retryWrites=true&w=majority\";\n\n//# sourceURL=webpack://marketplace/./constants/environment.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./backend/server.js");
/******/ 	
/******/ })()
;