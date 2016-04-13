/**
 * 获取DOM元素样式相关操作
 * Copyright 2015-2016, classes.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2016/4/5.
 * @author zhengzk
 **/
define( [
    '../vQ'
], function(vQ) {

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

});