/**
 * 获取DOM元素css方式相关操作
 * Copyright 2015-2016, css.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2016/4/5.
 * @author zhengzk
 **/
//css width height
define([
    '../vQ'
], function (vQ) {

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
});