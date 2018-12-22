/**
 * @Date:   2018-12-20T14:02:48+08:00
 * @Last modified time: 2018-12-20T14:41:27+08:00
 */
'use strict';
require('./index.css');
var _mm     = require('util/mm.js');

// 通用头部组件 header
var header = {
    init : function(){
        this.bindEvent();
    },
    onLoad : function() {
      //获取到url参数中的关键词 用于回填到输入框中
      var keyword = _mm.getUrlParam('keyword');
      if(keyword) {
        $('#search-input').val(keyword);
      }
    },
    bindEvent : function() {
      var _this = this;
      //点击搜索按钮
      $('#search-btn').click(function() {
        _this.searchSubmit();
      });
      //第二种方式：enter键提交
      $('#search-input').keyup(function(e){
        if(e.keyCode === 13) {
          _this.searchSubmit();
        }
      });
    },
    //搜索的提交
    searchSubmit : function() {
      var keyword = $.trim($('#search-input').val());
      //如果提交的时候用户输入了keyword，则跳转到对应的list页面
      if(keyword) {
        window.location.href = './list.html?keyword=' + keyword;
      }
      //keyword为空，则直接返回首页
      else {
        _mm.goHome();
      }
    }
};

header.init();
