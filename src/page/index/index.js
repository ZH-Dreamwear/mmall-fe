/*
* @Author: Administrator
* @Date:   2018-03-24 23:46:22
 * @Last modified by:
 * @Last modified time: 2018-12-23T16:04:44+08:00
*/
'use strict';
require('./index.css');
require('util/slider/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

$(function(){
  var bannerHtml = _mm.renderHtml(templateBanner);
  $('.banner-con').html(bannerHtml);

  var $unslider = $('.banner').unslider({
    dots: true
  });
  //使用左右箭头需要这样写，参考unslider文档
  $('.banner-arrow').click(function(){
    //将这个元素的两个类分割成数组，取第二个 就是定义方向的类
    var forward = this.className.split(' ')[1];
    //console.log(forward); //prev | next
    $unslider.data('unslider')[forward]();
  });
});

// navSide.init({
//     name : 'user-center'
// });
