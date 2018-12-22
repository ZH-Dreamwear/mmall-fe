/*
* @Author: Administrator
* @Date:   2018-04-03 11:07:53
 * @Last modified by:
 * @Last modified time: 2018-12-22T13:13:51+08:00
*/

'use strict';
//导入hogan
var Hogan = require('hogan.js');
var conf = {
	serverHost:''
};
var _mm = {
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.type || 'json',
			data : param.data || '',
			success : function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg)
				}
				//没有登录成功，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg)
				}
			},
			error :function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//获取服务器地址
	getServerUrl:function(path){
		return conf.serverHost + path;
	},
	//获取URL参数，也就是？后面的键值对，返回键对应的值
	getUrlParam : function(name){
		//正则 匹配规则
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		//result是一个数组,下标为2的对应的是值
		//console.log(result);
		return result ? decodeURIComponent(result[2]):null;
	},
	//渲染html模板,这里使用的hogan模板引擎
	renderHtml : function(htmlTemplate, data){
		//hogan是先编译，再渲染
		var template = Hogan.compile(htmlTemplate),
				result   = template.render(data);
		return result;
	},
	//成功提示
	successTips:function(msg){
		alert(msg||'操作成功！');
	},
	errorTips:function(msg){
		alert(msg||'操作失败！');
	},
	//字段的验证，支持非空、手机、邮箱的判断
	validate : function(value, type){
		//去掉空格
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	doLogin : function(){
		//从哪里开始登陆，登陆成功就跳到当前页面，而不是跳到主页，encodeURIComponent转码
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location);
	},
	//跳到主页
	goHome : function(){
		window.location.href = './index.html';
	}
};

module.exports = _mm;
