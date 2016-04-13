/*! vQ <0.1.1@2016-04-13T16:08Z> | Copyright (c) 2015-2016 1VERGE, Inc | Released under the MIT license | https://github.com/vergeplayer/vQ/blob/master/LICENSE */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vQ"] = factory();
	else
		root["vQ"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * vQ 类似jQuery的DOM Utils Tool
	 * Copyright 2015-2016, index.js
	 * MIT Licensed
	 * @since 2015/12/14.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(2),
	    __webpack_require__(3),
	    __webpack_require__(4),
	    __webpack_require__(5),
	    __webpack_require__(7),
	    __webpack_require__(8),
	    __webpack_require__(9)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (vQ) {

	    if ( !window || !window.document ) {
	        throw new Error( 'vQ requires a window with a document' );
	    }

	    var _vQ = window['vQ'];

	    vQ.extend({
	        /**
	         * 释放并返回vQ 解决命名冲突
	         * @param flag
	         * @returns {Function}
	         */
	        noConflict: function () {
	            if (window['vQ'] == vQ) {
	                window['vQ'] = _vQ;
	            }
	            return vQ;
	        }
	    });

	    //window['vQ'] = vQ;
	    return vQ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 内部实现的简版jQuery
	 * Copyright 2015-2016, vQ.js
	 * MIT Licensed
	 * @since 2015/8/24.
	 * @modify 2016/4/7.
	 * @author zhengzk
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    var slice = [].slice,
	        concat = [].concat,
	        filter = [].filter,
	        push = [].push,
	        tempParent = document.createElement('div'),
	        simpleSelectorRE = /^[\w-]*$/,
	        hasOwnProp = Object.prototype.hasOwnProperty;

	    var vQ = function (selector, context) {
	        return new vQ.fn.init(selector, context);
	    };

	    //dom.fn上绑定的方法与每个对象
	    //dom上直接绑定的方法为单列
	    vQ.fn = vQ.prototype = {
	        constructor: vQ,
	        length: 0,
	        init: function (selector, context) {

	            // "" , null , undefined , false
	            if (!selector) {
	                return this;
	            }

	            //string
	            if ('string' == typeof selector) {//字符串选择器
	                context = context instanceof vQ ? context[0] : context;
	                var nodeList = (context || document).querySelectorAll(selector);
	                this.length = nodeList.length;
	                for (var i = 0; i < this.length; i += 1) {
	                    this[i] = nodeList[i];
	                }
	                //DOM Element
	            } else if (selector.nodeType) {//DOM元素
	                this[0] = selector;
	                this.length = 1;
	                return this;
	                //vQ Object
	            } else if (selector instanceof vQ) {
	                return selector;
	                //Function
	            } else if (vQ.isFunction(selector)) {
	                //ready func
	                vQ.ready(selector);
	                //Array
	            } else if (vQ.isArrayLike(selector)) {
	                this.length = selector.length;
	                for (var j = 0; j < selector.length; j += 1) {
	                    this[j] = selector[j];
	                }
	            }
	            return this;
	            //return vQ.makeArray(selector,this);
	        },
	        /**
	         * 遍历
	         * @param callback
	         * @returns {*}
	         */
	        each: function (callback) {
	            var i = 0, length = this.length;
	            for (; i < length; i += 1) {
	                callback.call(this[i], i, this[i]);
	            }
	            return this;
	        },
	        /**
	         * 转换成数组
	         * @returns {Array.<T>}
	         */
	        toArray: function () {
	            return slice.call(this);
	        },
	        /**
	         * 获取某一个
	         * @param num
	         * @returns {*}
	         */
	        get: function (num) {
	            return num != null ?

	                // Return just the one element from the set
	                ( num < 0 ? this[num + this.length] : this[num] ) :

	                // Return all the elements in a clean array
	                slice.call(this);
	        },
	        /**
	         * eq
	         * @param i
	         * @returns {null}
	         */
	        eq: function (i) {
	            var len = this.length,
	                j = +i + ( i < 0 ? len : 0 );
	            if (j >= 0 && j < len) {
	                return vQ(this[j]);
	            }
	            return null;
	        },
	        /**
	         * slice
	         * @returns {Array.<T>}
	         */
	        slice: function () {
	            return slice.apply(this, slice.call(arguments));
	        },
	        /**
	         * find
	         * @param selector
	         * @returns {*}
	         */
	        find: function (selector) {
	            var result, own = this;
	            if (!selector) result = vQ();
	            else if (typeof selector == 'object')
	                result = vQ(selector).filter(function () {
	                    var node = this;
	                    //Array.some
	                    for (var i = 0; i < own.length; i++) {
	                        if (vQ.contains(own[i], node)) {
	                            return true;
	                        }
	                    }
	                    return false;
	                });
	            else if (this.length == 1) result = vQ(vQ.qsa(this[0], selector));
	            else result = this.map(function () {
	                    return vQ.qsa(this, selector);
	                });
	            return result;
	        },
	        /**
	         * filter
	         * @param selector
	         * @returns {*}
	         */
	        filter: function (selector) {
	            if (vQ.isFunction(selector)) return this.not(this.not(selector));
	            return vQ(filter.call(this, function (element) {
	                return vQ.matches(element, selector);
	            }));
	        },

	        /**
	         * map
	         * @param fn
	         * @returns {*}
	         */
	        map: function (fn) {
	            return vQ(vQ.map(this, function (el, i) {
	                return fn.call(el, i);
	            }));
	        },
	        /**
	         * not
	         * @param selector
	         * @returns {*}
	         */
	        not: function (selector) {
	            var nodes = [];
	            if (vQ.isFunction(selector) && selector.call !== undefined) {
	                this.each(function (idx) {
	                    if (!selector.call(this, idx)) nodes.push(this);
	                });
	            } else {
	                var excludes = typeof selector == 'string' ?
	                    this.filter(selector) : (vQ.isArrayLike(selector) && vQ.isFunction(selector.item)) ? slice.call(selector) : vQ(selector);
	                this.each(function (inx, el) {
	                    if (excludes.indexOf(el) < 0){
	                        nodes.push(el);
	                    }
	                });
	            }
	            return vQ(nodes);
	        },
	        /**
	         * 根据callback 筛选
	         * @param callback
	         * @param invert
	         * @returns {Array}
	         */
	        grep: function (callback, invert) {
	            var callbackInverse,
	                matches = [],
	                i = 0,
	                length = this.length,
	                callbackExpect = !invert;

	            // Go through the array, only saving the items
	            // that pass the validator function
	            for (; i < length; i++) {
	                callbackInverse = !callback(this[i], i);
	                if (callbackInverse !== callbackExpect) {
	                    matches.push(this[i]);
	                }
	            }

	            return matches;
	        }
	    };
	    vQ.fn.init.prototype = vQ.fn;

	    vQ.extend = vQ.fn.extend = function () {
	        var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false;

	        // Handle a deep copy situation
	        if (typeof target === 'boolean') {
	            deep = target;

	            // Skip the boolean and the target
	            target = arguments[i] || {};
	            i++;
	        }

	        // Handle case when target is a string or something (possible in deep copy)
	        if (typeof target !== 'object' && !vQ.isFunction(target)) {
	            target = {};
	        }

	        // Extend jQuery itself if only one argument is passed
	        if (i === length) {
	            target = this;
	            i--;
	        }

	        for (; i < length; i++) {

	            // Only deal with non-null/undefined values
	            if (( options = arguments[i] ) != null) {

	                // Extend the base object
	                for (name in options) {
	                    src = target[name];
	                    copy = options[name];

	                    // Prevent never-ending loop
	                    if (target === copy) {
	                        continue;
	                    }

	                    // Recurse if we're merging plain objects or arrays
	                    if (deep && copy && ( vQ.isPlainObject(copy) ||
	                        ( copyIsArray = vQ.isArray(copy) ) )) {

	                        if (copyIsArray) {
	                            copyIsArray = false;
	                            clone = src && vQ.isArray(src) ? src : [];

	                        } else {
	                            clone = src && vQ.isPlainObject(src) ? src : {};
	                        }

	                        // Never move original objects, clone them
	                        target[name] = vQ.extend(deep, clone, copy);

	                        // Don't bring in undefined values
	                    } else if (copy !== undefined) {
	                        target[name] = copy;
	                    }
	                }
	            }
	        }

	        // Return the modified object
	        return target;
	    };

	    vQ.extend({
	        version: '0.1.1',
	        /**
	         * isObject
	         * @param obj
	         * @returns {boolean}
	         */
	        isObject:function(obj) {
	            return typeof obj == 'object';
	        },
	        /**
	         * 判断是否是Object
	         * @param obj
	         * @returns {boolean}
	         */
	        isPlainObject: function (obj) {
	            return !!obj
	                && typeof obj === 'object'
	                && obj.toString() === '[object Object]'
	                && obj.constructor === Object;
	        },
	        /**
	         * 判断是否是空节点
	         * @param obj
	         * @returns {boolean}
	         */
	        isEmptyObject: function (obj) {
	            var t;
	            for (t in obj) {
	                return true;
	            }
	            return false;
	        },
	        /**
	         * 判断arr是否是Array
	         * @param arr Array
	         * @returns {boolean}
	         */
	        isArray: function (arr) {
	            return Object.prototype.toString.call(arr) === '[object Array]';
	        },
	        /**
	         * isArrayLike
	         * @param obj
	         * @returns {boolean|*}
	         */
	        isArrayLike: function (obj) {
	            return vQ.isArray(obj) || !vQ.isFunction(obj) &&
	                ( obj.length === 0 || typeof obj.length === 'number' && obj.length > 0 && ( obj.length - 1 ) in obj );
	        },
	        /**
	         * 判断fn是否是Function
	         * @param fn Function
	         * @returns {boolean}
	         */
	        isFunction: function (fn) {
	            return '[object Function]' === Object.prototype.toString.call(fn);
	        },
	        /**
	         * isWindow
	         * @param obj
	         * @returns {boolean}
	         */
	        isWindow:function(obj) {
	            return obj != null && obj == obj.window;
	        },
	        /**
	         * isDocument
	         * @param obj
	         * @returns {boolean}
	         */
	        isDocument:function(obj) {
	            return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
	        },
	        /**
	         * 获取元素节点名称
	         * @param elem
	         * @param name
	         * @returns {Function|string|boolean}
	         */
	        nodeName: function (elem, name) {
	            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	        },
	        /**
	         * matches
	         * @param element
	         * @param selector
	         * @returns {*}
	         */
	        matches: function (element, selector) {
	            if (!selector || !element || element.nodeType !== 1) return false;
	            var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                element.oMatchesSelector || element.matchesSelector;
	            if (matchesSelector) return matchesSelector.call(element, selector);
	            // fall back to performing a selector:
	            var match, parent = element.parentNode, temp = !parent;
	            if (temp) (parent = tempParent).appendChild(element);
	            match = vQ.qsa(parent, selector).indexOf(element);
	            temp && tempParent.removeChild(element);
	            return match;
	        },
	        qsa: function (element, selector) {
	            var found,
	                maybeID = selector[0] == '#',
	                maybeClass = !maybeID && selector[0] == '.',
	                nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	                isSimple = simpleSelectorRE.test(nameOnly);
	            return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
	                ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	                (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
	                    slice.call(
	                        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
	                            maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	                                element.getElementsByTagName(selector) : // Or a tag
	                            element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	                    );
	        },
	        /**
	         * makeArray
	         * @param arr
	         * @param results
	         * @returns {*|Array}
	         */
	        makeArray: function( arr, results ) {
	            var ret = results || [];
	            if ( arr != null ) {
	                if ( vQ.isArrayLike( Object( arr ) ) ) {
	                    vQ.merge( ret, typeof arr === 'string' ? [ arr ] : arr);
	                } else {
	                    push.call( ret, arr );
	                }
	            }
	            return ret;
	        },
	        /**
	         * 遍利节点
	         * @param obj
	         * @param fn
	         * @param context
	         */
	        each: function (obj, fn, context) {
	            for (var key in obj) {
	                if (hasOwnProp.call(obj, key)) {
	                    //inx,element
	                    fn.call(context || this, key, obj[key]);
	                }
	            }
	        },
	        /**
	         * map
	         * @param elements
	         * @param fn
	         * @returns {Array}
	         */
	        map: function (elements, fn) {
	            var _arr = [];
	            if (vQ.isArrayLike(elements)) {
	                for (var i = 0; i < elements.length; i++) {
	                    var val1 = fn(elements[i], i);
	                    if (val1 != null) {
	                        _arr.push(val1);
	                    }
	                }
	            } else {
	                for (var key in elements) {
	                    var val2 = fn(elements[key], key);
	                    if (val2 != null) {
	                        _arr.push(val2);
	                    }
	                }
	            }
	            return _arr;
	        },
	        /**
	         * 清楚字符串空格
	         * @param text
	         * @returns {string}
	         */
	        trim: function (text) {
	            var reg = /(^\s*)|(\s*$)/g;
	            return text == null ?
	                '' :
	                ( text + '' ).replace(reg, '');
	        },
	        /**
	         * 空function
	         */
	        noop: function () {
	        },
	        /**
	         *
	         * @param first {Object}
	         * @param second {Object}
	         * @returns {*}
	         */
	        merge: function (first, second) {
	            if (!second) {
	                return first;
	            }
	            for (var key in second) {
	                if (hasOwnProp.call(second, key)) {
	                    first[key] = second[key];
	                }
	            }
	            return first;
	        }
	    });

	    return vQ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 获取DOM元素属性相关操作
	 * Copyright 2015-2016, attributes.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/5.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(vQ) {

	    //attr  val width  height
	    /**
	     * 设置Element的属性
	     * @param el
	     * @param attributes
	     */
	    function setAttributes(el, attributes) {
	        Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
	            var attrValue = attributes[attrName];

	            if (attrValue === null || typeof (attrValue) === 'undefined' || attrValue === false) {
	                el.removeAttribute(attrName);
	            } else {
	                el.setAttribute(attrName, (attrValue === true ? '' : attrValue));
	            }
	        });
	    }

	    /**
	     * 获取Element的属性
	     * @param tag {Element}
	     * @returns {{}}
	     */
	    function getElAttributes(tag,attr) {
	        var obj, knownBooleans, attrs, attrName, attrVal;

	        obj = {};

	        // known boolean attributes
	        // we can check for matching boolean properties, but older browsers
	        // won't know about HTML5 boolean attributes that we still read from
	        knownBooleans = ',' + 'autoplay,controls,loop,muted,default' + ',';

	        if (tag && tag.attributes && tag.attributes.length > 0) {
	            attrs = tag.attributes;

	            for (var i = attrs.length - 1; i >= 0; i--) {
	                attrName = attrs[i].name;
	                attrVal = attrs[i].value;

	                // check for known booleans
	                // the matching element property will return a value for typeof
	                if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
	                    // the value of an included boolean attribute is typically an empty
	                    // string ('') which would equal false if we just check for a false value.
	                    // we also don't want support bad code like autoplay='false'
	                    attrVal = (attrVal !== null) ? true : false;
	                }

	                if(attr && attrName == attr){
	                    return attrVal;
	                }

	                obj[attrName] = attrVal;
	            }
	        }
	        if(attr && typeof attr == 'string'){
	            return tag[attr];
	        }
	        return obj;
	    }

	    vQ.extend({
	        /**
	         * 设置or获取属性
	         * @param element
	         * @param params
	         * @returns {{}}
	         */
	        attr:function(element, params) {
	            var attrs;
	            if ('object' == typeof params) {
	                attrs = params;
	            }
	            if ('string' == typeof params) {
	                if (arguments.length > 2) {
	                    attrs = {};
	                    attrs[params] = arguments[2];
	                }else{
	                    return getElAttributes(element,params);
	                }
	            }
	            if (attrs) {
	                setAttributes(element, attrs);
	            }
	        },
	        /**
	         *
	         * root中是否包含el节点
	         * @param root
	         * @param el
	         * @returns {*}
	         */
	        contains: function (root, el) {
	            if (root.compareDocumentPosition)
	                return root === el || !!(root.compareDocumentPosition(el) & 16);
	            if (root.contains && el.nodeType === 1) {
	                return root.contains(el) && root !== el;
	            }
	            while ((el = el.parentNode)) {
	                if (el === root) return true;
	            }
	            return false;
	        }
	    });

	    vQ.fn.extend({
	        /**
	         * 设置or获取属性
	         * @param element
	         * @param params
	         * @returns {{}}
	         */
	        attr: function (params) {

	            var attrs;
	            if ('object' == typeof params) {
	                attrs = params;
	            }
	            if ('string' == typeof params) {
	                if (arguments.length > 1) {
	                    attrs = {};
	                    attrs[params] = arguments[1];
	                }else{
	                    return getElAttributes(this[0],params);
	                }
	            }
	            if (attrs) {
	                this.each(function (inx, ele) {
	                    setAttributes(ele, attrs);
	                });
	            }
	        },
	        /**
	         * 是否包含某个子元素
	         * @param root
	         * @param el
	         * @returns {*}
	         */
	        contains: function (el) {
	            for(var i = 0 ; i < this.length ; i ++){
	                var flag = vQ.contains(this[i], el);
	                if (flag) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    });

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 获取DOM元素样式相关操作
	 * Copyright 2015-2016, classes.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/5.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(vQ) {

	// "className1 className2"这种情况 后续支持
	/**
	 * 是否包含class
	 * @param element
	 * @param classToCheck
	 * @returns {boolean}
	 */
	function hasClass (element, classToCheck) {
	    return ((' ' + element.className + ' ').indexOf(' ' + classToCheck + ' ') !== -1);
	}

	vQ.extend( {
	    /**
	     * 是否包含class
	     * @param element
	     * @param classToCheck
	     * @returns {boolean}
	     */
	    hasClass:function(element, classToCheck) {
	        return hasClass.apply(this,arguments);
	    },
	    /**
	     * 添加样式
	     * @param element
	     * @param classToAdd
	     */
	    addClass:function(element, classToAdd) {
	        if (!hasClass(element, classToAdd)) {
	            element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
	        }
	        return this;
	    },
	    /**
	     * 移除样式
	     * @param element
	     * @param classToRemove
	     */
	    removeClass:function(element, classToRemove) {
	        if (!hasClass(element, classToRemove)) {
	            return;
	        }

	        var classNames = element.className.split(' ');

	        // no arr.indexOf in ie8, and we don't want to add a big shim
	        for (var i = classNames.length - 1; i >= 0; i--) {
	            if (classNames[i] === classToRemove) {
	                classNames.splice(i, 1);
	            }
	        }
	        element.className = classNames.join(' ');
	        return this;
	    },
	    /**
	     * 如果有该样式 就去除 否则就添加
	     * @param element
	     * @param classToToggle
	     */
	    toggleClass:function(element,classToToggle){
	        if (!hasClass(element, classToToggle)) {
	            this.addClass(element,classToToggle);
	        }else{
	            this.removeClass(element,classToToggle);
	        }
	        return this;
	    }
	});

	vQ.fn.extend( {
	    /**
	     * 是否包含class
	     * @param classToCheck
	     * @returns {boolean}
	     */
	    hasClass:function(classToCheck) {
	        return vQ.hasClass(this[0],classToCheck);
	    },
	    /**
	     * 添加样式
	     * @param classToAdd
	     * @returns {*}
	     */
	    addClass:function(classToAdd){
	        this.each(function(inx,ele){
	            vQ.addClass(ele,classToAdd);
	        });
	        return this;
	    },
	    /**
	     * 移除样式
	     * @param classToRemove
	     * @returns {*}
	     */
	    removeClass:function(classToRemove){
	        this.each(function(inx,ele){
	            vQ.removeClass(ele,classToRemove);
	        });
	        return this;
	    },
	    /**
	     * 如果有该样式 就去除 否则就添加
	     * @param element
	     * @param classToToggle
	     * @returns {*}
	     */
	    toggleClass:function(element,classToToggle){
	        this.each(function(inx,ele){
	            vQ.toggleClass(ele,classToToggle);
	        });
	        return this;
	    }
	});

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 获取DOM元素css方式相关操作
	 * Copyright 2015-2016, css.js
	 * MIT Licensed
	 * @since 2015/9/24.
	 * @modify 2016/4/5.
	 * @author zhengzk
	 **/
	//css width height
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (vQ) {

	    var rootNodeRE = /^(?:body|html)$/i,
	        toUpperCase = function (str) {
	            return str.replace(/(\w)/, function (v) {
	                return v.toUpperCase();
	            });
	        };
	    /**
	     * 获取当前生效的样式
	     * @param ele
	     * @param attribute
	     * @returns {*}
	     */
	    function currentStyle(ele, attribute) { // 返回最终样式函数，兼容IE，设置参数：元素对象、样式特性
	        return ele.currentStyle
	            ? ele.currentStyle[attribute]
	            : document.defaultView.getComputedStyle(ele, false)[attribute];
	    }

	    /**
	     * 是否处于隐藏状态
	     * @param ele
	     * @returns {boolean}
	     */
	    function isHidden(ele) {
	        return currentStyle(ele, 'display') === 'none' || !vQ.contains(ele.ownerDocument, ele);
	    }

	    /**
	     * 显示或隐藏某元素
	     * @param ele
	     * @param show
	     */
	    function showHide(ele, show) {
	        var display = currentStyle(ele, 'display');
	        if (show) {
	            if (display === 'none') {
	                // Restore a pre-hide() value if we have one
	                ele.style.display = ele.prevDisplay || 'block';
	            }
	        } else {
	            if (display !== 'none') {
	                // Remember the value we're replacing
	                if (ele.style.display) {
	                    ele.prevDisplay = ele.style.display;
	                }
	                ele.style.display = 'none';
	            }
	        }
	    }

	    /**
	     * 设置样式
	     * @param el
	     * @param strCss
	     */
	    function setStyle(el, strCss) {
	        function endsWith(str, suffix) {
	            var l = str.length - suffix.length;
	            return l >= 0 && str.indexOf(suffix, l) == l;
	        }

	        var sty = el.style,
	            cssText = sty.cssText;
	        if (!endsWith(cssText, ';')) {
	            cssText += ';';
	        }
	        sty.cssText = cssText + strCss;
	    }

	    vQ.extend({
	        /**
	         * 显示
	         * @param ele
	         * @param callback
	         */
	        show: function (ele,callback) {
	            showHide(ele, true);
	            if(vQ.isFunction(callback)){
	                callback();
	            }
	        },
	        /**
	         * 隐藏
	         * @param ele
	         * @param callback
	         */
	        hide: function (ele,callback) {
	            showHide(ele);
	            if(vQ.isFunction(callback)){
	                callback();
	            }
	        },
	        /**
	         * 显示->隐藏 互转
	         * @param state
	         * @returns {*}
	         */
	        toggle: function (ele, state) {
	            if (typeof state === 'boolean') {
	                return state ? this.show() : this.hide();
	            }

	            if (isHidden(ele)) {
	                showHide(ele, true);
	            } else {
	                showHide(ele);
	            }
	            return this;
	        }
	    });

	    vQ.fn.extend({
	        /**
	         * offsetParent
	         * @returns {*}
	         */
	        offsetParent: function () {
	            var parent = this.offsetParent || document.body;
	            while (parent && !rootNodeRE.test(parent.nodeName) && vQ(parent).css('position') == 'static') {
	                parent = parent.offsetParent;
	            }
	            return vQ(parent);
	        },
	        /**
	         * offset
	         * @param offset
	         * @returns {*}
	         */
	        offset:function(offset){
	            if(arguments.length > 0){
	                this.each(function(inx,ele){
	                    var node = vQ(ele);
	                    var coords = node.offset(),
	                        parentOffset = ele.offsetParent.offset(),
	                        props = {
	                            top: coords.top - parentOffset.top,
	                            left: coords.left - parentOffset.left
	                        };
	                    if (node.css('position') == 'static'){
	                        props['position'] = 'relative';
	                    }
	                    node.css(props);
	                });
	            }
	            if (!this.length) return null;
	            if (!vQ.contains(document.documentElement, this[0]))
	                return {top: 0, left: 0};
	            var obj = this[0].getBoundingClientRect();
	            return {
	                left: obj.left + window.pageXOffset,
	                top: obj.top + window.pageYOffset,
	                width: Math.round(obj.width),
	                height: Math.round(obj.height)
	            };
	        },
	        /**
	         * position
	         * @returns {{top: number, left: number}}
	         */
	        position: function () {
	            if (!this.length) return;

	            var node = vQ(this[0]),
	            // Get *real* offsetParent
	                offsetParent = this.offsetParent(),
	            // Get correct offsets
	                offset = this.offset(),
	                parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {top: 0, left: 0} : offsetParent.offset();

	            // Subtract element margins
	            // note: when an element has margin: auto the offsetLeft and marginLeft
	            // are the same in Safari causing offset.left to incorrectly be 0
	            offset.top -= parseFloat(node.css('margin-top')) || 0;
	            offset.left -= parseFloat(node.css('margin-left')) || 0;

	            // Add offsetParent borders
	            parentOffset.top += parseFloat(offsetParent.css('border-top-width')) || 0;
	            parentOffset.left += parseFloat(offsetParent.css('border-left-width')) || 0;

	            // Subtract the two offsets
	            return {
	                top: offset.top - parentOffset.top,
	                left: offset.left - parentOffset.left
	            };
	        },
	        /**
	         * 设置or获取css属性
	         * @param arg
	         * @param val
	         * @returns {*}
	         */
	        css: function (arg, val) {
	            if (arguments.length == 1) {
	                if (typeof arg == 'string') {
	                    return currentStyle(this[0], arg);
	                } else if (vQ.isPlainObject(arg)) {
	                    var cssStr = '';
	                    vQ.each(arg, function (key, val) {
	                        cssStr += key + ':' + val + ';';
	                    });
	                    setStyle(this[0], cssStr);
	                }
	            } else if (arguments.length == 2) {
	                setStyle(this[0], arg + ':' + val + ';');
	            }
	            return this;
	        },
	        /**
	         * 显示
	         * @param callback
	         * @returns {*}
	         */
	        show: function (callback) {
	            this.each(function () {
	                showHide(this, true);
	            });
	            if(vQ.isFunction(callback)){
	                callback();
	            }
	            return this;
	        },
	        /**
	         * 隐藏
	         * @param callback
	         * @returns {*}
	         */
	        hide: function (callback) {
	            this.each(function () {
	                showHide(this);
	            });
	            if(vQ.isFunction(callback)){
	                callback();
	            }
	            return this;
	        },
	        /**
	         * 是否处于隐藏状态
	         * @returns {boolean}
	         */
	        isHidden: function () {
	            return isHidden(this[0]);
	        },
	        /**
	         * 显示隐藏互转
	         * @param state
	         * @returns {*}
	         */
	        toggle: function (state) {

	            if (typeof state === 'boolean') {
	                return state ? this.show() : this.hide();
	            }
	            this.each(function () {
	                if (isHidden(this)) {
	                    showHide(this, true);
	                } else {
	                    showHide(this);
	                }
	            });
	            return this;
	        }
	    });

	    var _extends = {};
	    vQ.each(['width', 'height'],function(inx,_name){
	        _extends[_name] = function(value){
	            var ele = this[0];
	            if(arguments.length > 0){
	                this.each(function (inx,ele) {
	                    var node = vQ(ele);
	                    node.css(_name,value);
	                });
	            }
	            if(vQ.isWindow(ele)){
	                return ele['inner' + toUpperCase(_name)];
	            }
	            if(vQ.isDocument(ele) ){
	                return ele.documentElement['scroll' + toUpperCase(_name)];
	            }
	            var offset = this.offset();
	            return offset[_name];
	        };
	    });
	    vQ.fn.extend(_extends);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 获取DOM元素事件绑定方法
	 * Copyright 2015-2016, event.js
	 * MIT Licensed
	 * @since 2015/9/2.
	 * @modify 2016/4/5.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(vQ,objectCreate) {
	    var slice = [].slice;
	    var event = objectCreate({
	        /**
	         * 为元素绑定方法
	         * @param element
	         * @param type
	         * @param handler
	         * @param context
	         * @returns {*}
	         */
	        bind: function (element, type, handler, context) {
	            var own = this;

	            //非DOM元素不处理 handler 非function 不处理
	            if (!(1 == element.nodeType || element.nodeType == 9 || element === window) || !vQ.isFunction(handler)) {
	                return;
	            }

	            //多个事件处理
	            if (vQ.isArray(type)) {
	                return own._handleMultipleEvents(own.observe, element, type, handler);
	            }

	            var _handler = handler;

	            //上下文对象处理
	            if (context) {
	                _handler = function () {
	                    handler.apply(context, arguments);
	                };
	                own._contextHandler[handler.$$guid] = _handler;
	                _handler.$$guid = handler.$$guid = handler.$$guid || own._guid++;
	            }

	            //调用原生方法绑定事件
	            if (element.addEventListener) {
	                element.addEventListener(type, _handler, false);
	            } else {
	                //IE等 自行托管事件

	                // assign each event handler a unique ID
	                if (!_handler.$$guid) _handler.$$guid = this._guid++;
	                // create a hash table of event types for the element
	                if (!element.events) element.events = {};
	                // create a hash table of event handlers for each element/event pair
	                var handlers = element.events[type];
	                if (!handlers) {
	                    handlers = element.events[type] = {};
	                    // store the existing event handler (if there is one)
	                    if (element['on' + type]) {
	                        handlers[0] = element['on' + type];
	                    }
	                }
	                // store the event handler in the hash table
	                handlers[_handler.$$guid] = _handler;
	                // assign a global event handler to do all the work
	                element['on' + type] = own._handleEvent;
	            }
	        },
	        /**
	         * 为元素解除已绑定方法
	         * @param element
	         * @param type
	         * @param handler
	         * @returns {*}
	         */
	        unbind: function (element, type, handler) {
	            var own = this;
	            //非DOM元素不处理 handler 非function 不处理
	            if (!(1 == element.nodeType || element.nodeType == 9 || element === window) || !vQ.isFunction(handler)) {
	                return;
	            }

	            //批量事件绑定
	            if (vQ.isArray(type)) {
	                return own._handleMultipleEvents(own.remove, element, type, handler);
	            }
	            //处理绑定了了context的事件
	            var _handler = own._contextHandler[handler.$$guid];// || handler;

	            //调用原生方法解除已绑定事件
	            if (element.removeEventListener) {
	                element.removeEventListener(type, _handler || handler, false);
	            } else {
	                //IE等 自行托管事件

	                // delete the event handler from the hash table
	                var events = element.events;
	                if (events) {
	                    delete events[handler.$$guid];//删除该方法
	                    //判断事件集合是否为空
	                    var hasProp = false;
	                    for (var prop in events) {
	                        hasProp = true;
	                    }
	                    if (!hasProp) {
	                        delete element.events;
	                    }
	                }
	            }
	            if (_handler && !delete own._contextHandler[handler.$$guid]) {
	                own._contextHandler[handler.$$guid] = null;
	            }
	        },
	        /**
	         * Trigger a listener only once for an event
	         * @param  {Element|Object}   elem Element or object to
	         * @param  {String|Array}   type
	         * @param  {Function} fn
	         * @private
	         */
	        one: function (element, type, handler, context) {
	            var own = this;
	            //非Dom元素不处理
	            if (!(1 == element.nodeType || element.nodeType == 9 || element === window)|| !vQ.isFunction(handler)) {
	                return;
	            }
	            //获取传入参数
	            var args = slice.call(arguments);

	            //批量绑定事件处理
	            if (vQ.isArray(type)) {
	                return own._handleMultipleEvents.apply(own, [own.one].concat(args));
	                //return own._handleMultipleEvents(own.one, element, type, handler);
	            }

	            var func = function () {
	                own.unbind(element, type, func);
	                handler.apply(context || element, arguments);
	            };

	            // copy the guid to the new function so it can removed using the original function's ID
	            func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
	            own.bind(element, type, func);


	            //var func = function(){
	            //    own.unbind.apply(own,args);
	            //    handler.apply(context || element, arguments);
	            //};
	            ////args = [type, func].concat(args.slice(2));//更换fun 这样支持不定个数的参数
	            //
	            //// copy the guid to the new function so it can removed using the original function's ID
	            //func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
	            ////own.observe(element, type, func);
	            //own.bind.apply(own,args);
	        },
	        /**
	         * @private
	         */
	        _guid: 0, //unique 事件唯一ID
	        _contextHandler: {},//context 事件存储
	        /**
	         * 处理多事件的绑定
	         * @param fn
	         * @param elem
	         * @param types
	         * @private
	         */
	        _handleMultipleEvents: function (fn, elem, types) {
	            var own = this;
	            var args = Array.prototype.slice.call(arguments).slice(3);//动态截取fn所需参数
	            vQ.each(types, function (inx, type) {
	                fn.apply(own, [elem, type].concat(args));
	            });
	        },
	        /**
	         * 处理事件
	         * @param event
	         * @returns {boolean}
	         * @private
	         */
	        _handleEvent: function (event) {
	            var own = this;
	            var returnValue = true;
	            // grab the event object (IE uses a global event object)
	            event = event || own._fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	            // get a reference to the hash table of event handlers
	            var handlers = this.events[event.type];
	            // execute each event handler
	            for (var i in handlers) {
	                var _handleEvent = handlers[i];
	                if (_handleEvent(event) === false) {
	                    returnValue = false;
	                }
	            }
	            return returnValue;
	        },
	        /**
	         * 修复原生事件
	         * @param  {Object} event Event object to fix
	         * @return {Object}
	         * @private
	         */
	        _fixEvent: function (event) {
	            //Fix a native event to have standard property values
	            function returnTrue() {
	                return true;
	            }

	            function returnFalse() {
	                return false;
	            }

	            // Test if fixing up is needed
	            // Used to check if !event.stopPropagation instead of isPropagationStopped
	            // But native events return true for stopPropagation, but don't have
	            // other expected methods like isPropagationStopped. Seems to be a problem
	            // with the Javascript Ninja code. So we're just overriding all events now.
	            if (!event || !event.isPropagationStopped) {
	                var old = event || window.event;

	                event = {};
	                // Clone the old object so that we can modify the values event = {};
	                // IE8 Doesn't like when you mess with native event properties
	                // Firefox returns false for event.hasOwnProperty('type') and other props
	                //  which makes copying more difficult.
	                // TODO: Probably best to create a whitelist of event props
	                for (var key in old) {
	                    // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
	                    // Chrome warns you if you try to copy deprecated keyboardEvent.keyLocation
	                    if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation') {
	                        // Chrome 32+ warns if you try to copy deprecated returnValue, but
	                        // we still want to if preventDefault isn't supported (IE8).
	                        if (!(key == 'returnValue' && old.preventDefault)) {
	                            event[key] = old[key];
	                        }
	                    }
	                }

	                // The event occurred on this element
	                if (!event.target) {
	                    event.target = event.srcElement || document;
	                }

	                // Handle which other element the event is related to
	                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;

	                // Stop the default browser action
	                event.preventDefault = function () {
	                    if (old.preventDefault) {
	                        old.preventDefault();
	                    }
	                    event.returnValue = false;
	                    event.isDefaultPrevented = returnTrue;
	                    event.defaultPrevented = true;
	                };

	                event.isDefaultPrevented = returnFalse;
	                event.defaultPrevented = false;

	                // Stop the event from bubbling
	                event.stopPropagation = function () {
	                    if (old.stopPropagation) {
	                        old.stopPropagation();
	                    }
	                    event.cancelBubble = true;
	                    event.isPropagationStopped = returnTrue;
	                };

	                event.isPropagationStopped = returnFalse;

	                // Stop the event from bubbling and executing other handlers
	                event.stopImmediatePropagation = function () {
	                    if (old.stopImmediatePropagation) {
	                        old.stopImmediatePropagation();
	                    }
	                    event.isImmediatePropagationStopped = returnTrue;
	                    event.stopPropagation();
	                };

	                event.isImmediatePropagationStopped = returnFalse;

	                // Handle mouse position
	                if (event.clientX != null) {
	                    var doc = document.documentElement, body = document.body;

	                    event.pageX = event.clientX +
	                        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
	                        (doc && doc.clientLeft || body && body.clientLeft || 0);
	                    event.pageY = event.clientY +
	                        (doc && doc.scrollTop || body && body.scrollTop || 0) -
	                        (doc && doc.clientTop || body && body.clientTop || 0);
	                }

	                // Handle key presses
	                event.which = event.charCode || event.keyCode;

	                // Fix button for mouse clicks:
	                // 0 == left; 1 == middle; 2 == right
	                if (event.button != null) {
	                    event.button = (event.button & 1 ? 0 :
	                        (event.button & 4 ? 1 :
	                            (event.button & 2 ? 2 : 0)));
	                }
	            }

	            // Returns fixed-up instance
	            return event;
	        }
	    });

	    vQ.extend({
	        /**
	         * 绑定事件
	         * @param ele
	         * @param type
	         * @param fun
	         */
	        bind: function (ele, type, fun) {
	            event.bind.apply(event, arguments);
	        },
	        /**
	         * 解除绑定事件
	         * @param ele
	         * @param type
	         * @param fun
	         */
	        unbind:function(ele,type,fun){
	            event.unbind.apply(event,arguments);
	        },
	        /**
	         * 绑定只执行一次的事件
	         * @param ele
	         * @param type
	         * @param fun
	         */
	        one:function(ele,type,fun){
	            event.one.apply(event,arguments);
	        }
	    });
	    vQ.fn.extend({
	        /**
	         * 绑定事件
	         * @param type
	         * @param fun
	         * @returns {*}
	         */
	        bind: function (type, fun) {
	            this.each(function (inx, ele) {
	                vQ.bind(ele, type, fun);
	            });
	            return this;
	        },
	        /**
	         * 解除绑定事件
	         * @param type
	         * @param fun
	         * @returns {*}
	         */
	        unbind: function (type, fun) {
	            this.each(function (inx, ele) {
	                vQ.unbind(ele, type, fun);
	            });
	            return this;
	        },
	        /**
	         * 绑定只执行一次的事件
	         * @param type
	         * @param fun
	         * @returns {*}
	         */
	        one: function (type, fun) {
	            this.each(function (inx, ele) {
	                vQ.one(ele, type, fun);
	            });
	            return this;
	        }
	    });

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Object Create
	 * Copyright 2015-2016, object-create.js
	 * MIT Licensed
	 * @since 2015/11/27.
	 * @modify 2016/2/19.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    /**
	     * 创建一个object
	     * @param obj
	     * @constructor
	     */
	    return Object.create || function (obj) {
	            //Create a new function called 'F' which is just an empty object.
	            function F() {
	            }

	            //the prototype of the 'F' function should point to the
	            //parameter of the anonymous function.
	            F.prototype = obj;

	            //create a new constructor function based off of the 'F' function.
	            return new F();
	        };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 获取DOM元素相互之间的操作处理
	 * Copyright 2015-2016, manipulation.js
	 * MIT Licensed
	 * @since 2015/9/2.
	 * @modify 2016/4/5.
	 * @author zhengzk
	 **/
	//clone detach
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(vQ) {
	    var
	        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	        rnoInnerhtml = /<script|<style|<link/i;

	    vQ.extend({
	        htmlPrefilter: function (html) {
	            return html.replace(rxhtmlTag, '<$1></$2>');
	        }
	    });

	    vQ.fn.extend({
	        /**
	         * 移除节点
	         * @returns {*}
	         */
	        remove: function () {
	            this.each(function(inx,node){
	                if (node.parentNode) {
	                    node.parentNode.removeChild(node);
	                }
	            });
	            return this;
	        },
	        /**
	         * 追加子节点
	         * @param ele
	         * @returns {*}
	         */
	        append: function (ele) {
	            var node = this[0];
	            //结点类型判断
	            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
	                if(ele instanceof vQ){
	                    ele.each(function(inx,ele){
	                        node.appendChild(ele);
	                    });
	                } else if(ele.nodeType){
	                    node.appendChild(ele);
	                }
	                // string array
	            }
	            return this;
	        },
	        /**
	         * 插入到当前节点的第一个
	         * @param ele
	         * @returns {*}
	         */
	        prepend: function (ele) {
	            var node = this[0];
	            //(ele string ??)
	            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
	                node.insertBefore(ele, node.firstChild);
	            }
	            return this;
	        },
	        /**
	         * 在当前节点之前插入
	         * @param ele
	         * @returns {*}
	         */
	        before: function (ele) {
	            var node = this[0];
	            //(ele string ??)
	            if (node.parentNode) {
	                node.parentNode.insertBefore(ele, node);
	            }
	            return this;
	        },
	        /**
	         * 在当前节点之后插入
	         * @param ele
	         * @returns {*}
	         */
	        after: function (ele) {
	            var node = this[0];
	            //(ele string ??)
	            if (node.parentNode) {
	                node.parentNode.insertBefore(ele, node.nextSibling);
	            }
	            return this;
	        },
	        /**
	         * 清空当前节点
	         * @returns {*}
	         */
	        empty: function () {
	            var elem,
	                i = 0;

	            for (; ( elem = this[i] ) != null; i++) {
	                if (elem.nodeType === 1) {
	                    // Remove any remaining nodes
	                    elem.textContent = '';
	                }
	            }
	            return this;
	        },
	        /**
	         * 替换当前节点
	         * @param ele
	         * @returns {*}
	         */
	        replaceWith: function (ele) {
	            var node = this[0];
	            if (node.parentNode) {
	                var parent = node.parentNode;
	                if(ele instanceof vQ){
	                    ele.each(function(inx,ele){
	                        parent.replaceChild(ele, node);
	                    });
	                } else{
	                    parent.replaceChild(ele, node);
	                }
	            }
	            return this;
	        },
	        /**
	         * 插入html片段
	         * @param value
	         * @returns {*}
	         */
	        html: function (value) {

	            var elem = this[0] || {},
	                i = 0,
	                l = this.length;

	            if (value === undefined && elem.nodeType === 1) {
	                return elem.innerHTML;
	            }
	            if (typeof value === 'string' && !rnoInnerhtml.test(value)) {
	                try {
	                    value = vQ.htmlPrefilter(value);
	                    for (; i < l; i++) {
	                        elem = this[i] || {};

	                        // Remove element nodes and prevent memory leaks
	                        if (elem.nodeType === 1) {
	                            elem.innerHTML = value;
	                        }
	                    }

	                    elem = 0;

	                    // If using innerHTML throws an exception, use the fallback method
	                } catch (e) {
	                }
	            }
	            return this[0].innerHTML;
	        },
	        /**
	         * 插入text文本
	         * @param value
	         * @returns {*}
	         */
	        text: function (value) {
	            var elem = this[0] || {},
	                i = 0;
	            if (arguments.length > 0) {
	                for (; ( elem = this[i] ) != null; i++) {
	                    if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
	                        // Remove any remaining nodes
	                        elem.textContent = value;
	                    }
	                }
	            }

	            var node = this[0];
	            if ( node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11 ) {

	                // Use textContent for elements
	                return node.textContent;
	            } else if ( node.nodeType === 3 || node.nodeType === 4 ) {
	                return node.nodeValue;
	            }
	            return '';
	        }
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 获取DOM元素相互之间的关系处理
	 * Copyright 2015-2016, traversing.js
	 * MIT Licensed
	 * @since 2015/9/2.
	 * @modify 2016/4/5.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(vQ) {
	    /**
	     * 获取同胞节点
	     * @param n
	     * @param elem
	     * @returns {Array}
	     */
	    var siblings = function (n, elem) {
	        var matched = [];

	        for (; n; n = n.nextSibling) {
	            if (n.nodeType === 1 && n !== elem) {
	                matched.push(n);
	            }
	        }

	        return matched;
	    };

	    var indexOf = [].indexOf;

	    function sibling(cur, dir) {
	        while (( cur = cur[dir] ) && cur.nodeType !== 1) {
	        }
	        return cur;
	    }

	    vQ.fn.extend({
	        // Determine the position of an element within the set
	        /**
	         * 下标
	         * @returns {*}
	         */
	        index: function () {
	            var elem = this[0];
	            // No argument, return index in parent
	            if (!elem) {
	                return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
	            }

	            // Index in selector
	            if (typeof elem === 'string') {
	                return indexOf.call(vQ(elem), this[0]);
	            }

	            // Locate the position of the desired element
	            return indexOf.call(this,

	                // If it receives a vQ object, the first element is used
	                elem.constructor == vQ ? elem[0] : elem
	            );
	        },
	        /**
	         * 获取父节点
	         * @returns {domLvl1.parentNode|*|Function|module.parentNode|Node|parentNode}
	         */
	        parent: function () {
	            var elem = this[0];
	            var parent = elem.parentNode;
	            return parent && parent.nodeType !== 11 ? parent : null;
	        },
	        /**
	         * 获取下一个相邻节点
	         * @returns {*}
	         */
	        next: function () {
	            var elem = this[0];
	            return sibling(elem, 'nextSibling');
	        },
	        /**
	         * 获取前一个相邻节点
	         * @returns {*}
	         */
	        prev: function () {
	            var elem = this[0];
	            return sibling(elem, 'previousSibling');
	        },
	        /**
	         * 获取同胞节点
	         * @returns {Array}
	         */
	        siblings: function () {
	            var elem = this[0];
	            return siblings(( elem.parentNode || {} ).firstChild, elem);
	        },
	        /**
	         * 子节点
	         * @returns {Array}
	         */
	        children: function () {
	            var elem = this[0];
	            return siblings(elem.firstChild);
	        },
	        /**
	         * 内容
	         * @returns {HTMLDocument|*}
	         */
	        contents: function () {
	            var elem = this[0];
	            return elem.contentDocument || vQ.merge([], elem.childNodes);
	        }
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 文档加载完成后执行相关方法
	 * Copyright 2015-2016, ready.js
	 * MIT Licensed
	 * @since 2015/9/2.
	 * @modify 2016/2/19.
	 * @author zhengzk
	 **/
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (vQ) {


	    var readyList = [];

	    /**
	     * window.onload
	     */
	    function completed() {
	        document.removeEventListener('DOMContentLoaded', completed);
	        window.removeEventListener('load', completed);
	        vQ.ready();
	    }

	    // Catch cases where $(document).ready() is called
	    // after the browser event has already occurred.
	    // We once tried to use readyState "interactive" here,
	    // but it caused issues like the one
	    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
	    if (document.readyState === 'complete') {

	        // Handle it asynchronously to allow scripts the opportunity to delay ready
	        window.setTimeout(vQ.ready);

	    } else {

	        // Use the handy event callback
	        document.addEventListener('DOMContentLoaded', completed);

	        // A fallback to window.onload, that will always work
	        window.addEventListener('load', completed);
	    }

	    vQ.extend({
	        isReady: false,
	        readyWait: 1,
	        /**
	         * 加载完成
	         * @param arg
	         */
	        ready: function (arg) {
	            if (vQ.isFunction(arg)) {
	                if (!vQ.isReady) {
	                    readyList.push(arg);
	                } else {
	                    arg.apply(document, [vQ]);
	                }
	            } else {
	                if (arg === true ? --vQ.readyWait : vQ.isReady) {
	                    return;
	                }
	                vQ.isReady = true;

	                if (arg !== true && --vQ.readyWait > 0) {
	                    return;
	                }

	                vQ.each(readyList, function (inx, func) {
	                    func.apply(document, [vQ]);
	                });

	            }

	        }
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ }
/******/ ])
});
;