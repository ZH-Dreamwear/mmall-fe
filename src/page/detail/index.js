/**
 * @Date:   2018-12-23T21:07:28+08:00
 * @Last modified time: 2018-12-23T22:53:34+08:00
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
  data : {
    productId : _mm.getUrlParam('productId') || ''
  },
  init : function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function() {
    //如果没有传productId,则跳到首页
    if(!this.data.productId) {
      _mm.goHome();
    }
    this.loadDetail();
  },
  bindEvent : function() {
    var _this = this;
    // 鼠标移入缩略图进行预览,动态载入DOM时使用事件代理的方式绑定监听事件
    $(document).on('mouseenter', '.p-img-item', function() {
      //获取到鼠标移入的缩略图的src
      var imageUrl = $(this).find('.p-img').attr('src');
      //将大图的src改成上面获取到的缩略图的src，达到切换效果
      $('.main-img').attr('src', imageUrl);
    });
    //count的操作
    $(document).on('click', '.p-count-btn', function() {
      //获取 type类型
      var type = $(this).hasClass('plus') ? 'plus':'minus',
          $pCount = $('.p-count'),
          //获取当前的商品数值
          currCount = parseInt($pCount.val()),
          minCount = 1,
          maxCount = _this.data.detailInfo.stock || 1;
      //点击 "+" 号,商品数值进行加 1 操作
      if(type === 'plus') {
        $pCount.val(currCount < maxCount ? currCount+1 : maxCount);
      }
      //点击 "-" 号,商品数值进行减 1 操作
      else if(type === 'minus'){
        $pCount.val(currCount > minCount ? currCount-1 : minCount);
      }
    });
    //加入购物车
    $(document).on('click','.cart-add', function() {
      _cart.addToCart({
        productId : _this.data.productId,
        count : $('.p-count').val()
      },function(res) {
        window.location.href = './result.html?type=cart-add';
      },function(errMsg) {
        _mm.errorTips(errMsg);
      })
    })
  },
  //加载商品详情的数据
  loadDetail : function() {
    var _this = this;
    var html = '';
    _product.getProductDetail(this.data.productId,function(res) {
        _this.filter(res);
        //缓存detail的数据，用于上面商品计数
        _this.data.detailInfo = res;
        html = _mm.renderHtml(templateIndex, res);
        $('.page-wrap').html(html);
    },function(errMsg) {
        $('.page-wrap').html('<p class="err-tip">此商品暂时找不到哦~~~</p>');
    })
  },
  // 数据匹配
  //接口返回来的数据是字符串形式，而hogan循环数据需要数组形式，所以这里做了filter处理。
  filter : function(data) {
    data.subImages = data.subImages.split(',');
  }

}
$(function(){
    page.init();
})
