/**
 * @Date:   2018-12-20T15:03:21+08:00
 * @Last modified time: 2018-12-20T15:57:25+08:00
 */
require('./index.css');
var _mm = require('util/mm.js');
//引入要渲染的模板html
var templateIndex = require('./index.string');

//侧边导航
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href: './about.html'}
        ]
    },
    // {
    //     name : 'user-center'
    // }
    init : function(option){
        // 合并选项,将传入的option选项中与this.option中相同的属性值覆盖掉
        $.extend(this.option, option);
        this.renderNav();
    },
    // 渲染导航菜单
    renderNav : function(){
        // 计算active数据,例如index页面传来{name:"user-center"},
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                //如果匹配上了，则给navList[i]这个对象添加一个属性isActive并赋值为 true
                //这时在模板里面判断isActive就能用上了，true则使用 <li class="nav-item active">
                this.option.navList[i].isActive = true;
            }
        };
        // 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;
