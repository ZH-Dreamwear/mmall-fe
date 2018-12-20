/*
* @Author: Rosen
* @Date:   2017-05-19 21:52:46
 * @Last modified by:   
 * @Last modified time: 2018-12-20T16:37:11+08:00
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素,一开始是全部隐藏的
    $element.show();
})
