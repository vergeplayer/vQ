/**
 * vQ 类似jQuery的DOM Utils Tool
 * Copyright 2015-2016, index.js
 * MIT Licensed
 * @since 2015/12/14.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
define([
    "./vQ",
    "./module/attributes",
    "./module/classes",
    "./module/css",
    "./module/event",
    "./module/manipulation",
    "./module/traversing",
    "./ready"
], function (vQ) {

    if ( !window || !window.document ) {
        throw new Error( 'vQ requires a window with a document' );
    }

    var _vQ = window['@NAME'];

    vQ.extend({
        /**
         * 释放并返回vQ 解决命名冲突
         * @param flag
         * @returns {Function}
         */
        noConflict: function () {
            if (window['@NAME'] == vQ) {
                window['@NAME'] = _vQ;
            }
            return vQ;
        }
    });

    //window['@NAME'] = vQ;
    return vQ;
});
