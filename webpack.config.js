/*
* @Author: Administrator
* @Date:   2018-03-24 23:56:00
 * @Last modified by:   
 * @Last modified time: 2018-12-20T16:09:17+08:00
*/
var webpack = require('webpack');
//单独提取CSS插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//处理HTML模板插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置，dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法（如果插件变多则代码变得冗余，所以封装成函数）
var getHtmlConfig = function(name, title){
	return {
		template : './src/view/'+ name +'.html',
		filename : 'view/'+ name +'.html',
		inject   : true,
		hash     : true,
		title    : title,
		//需要打包的模块
		chunks	 : ['common',name]
	};
};

var config = {
	//入口文件的配置，多入口写成对象形式，键名
	entry: {
		'common' : ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js'],
		'result' : ['./src/page/result/index.js']
	},
	/*这样配置会出现login覆盖index的情况，所以只有login*/
	// output: {
	// 	path: './dist',
	// 	filename: 'app.js'
	// }
	output: {
		path: './dist',
		publicPath : '/dist',
		//这里的name就是上面入口文件对应的key值，想要打包后输出的JS文件统一在/dist/js/下
		filename: 'js/[name].js'
	},
	//配置依赖的插件
	externals : {
		'jquery' : 'window.jQuery'
	},
	module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
			{
                test: /\.string$/,
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
		]
  },
	//配置别名 便于访问 __dirname 表示当前根目录
	resolve: {
		alias: {
			node_modules : __dirname + '/node_modules',
			util : __dirname+ '/src/util',
			page : __dirname+ '/src/page',
			service : __dirname+ '/src/service',
			view : __dirname+ '/src/view'
		}
	},
	plugins: [
		//独立通用模块到js/base.js
		//提取公共模块插件：CommonsChunkPlugin
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		//把css单独打包到文件里,参数是输出的文件路径和名字格式 "css/[name].css"
		new ExtractTextPlugin("css/[name].css"),
		//HTML模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
	]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http:localhost:8088/');
}

module.exports = config;
