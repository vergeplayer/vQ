/**
 * 内部实现的简版jQuery
 * Copyright 2015-2016, vQ.js
 * MIT Licensed
 * @since 2015/8/24.
 * @modify 2016/4/7.
 * @author zhengzk
 */
define([], function () {

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
        version: '@VERSION',
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
});