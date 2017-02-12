// 入口文件

// 引用koa
var koa = require('koa');
// koa中间件koa-route
var controller = require('koa-route');
// koa实例化
var app = koa();

// 模板展示
// koa中间件koa-views
var views = require('co-views');
// 实例化
var render = views('./view',{
	map : { html : 'ejs' }
});

var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
app.use(koa_static({
	rootDir: './static/',
	rootPath: '/static/',
	maxage: 0
}));

// webAppService.js需要servic
var service = require('./service/webAppService.js');

// 访问静态资源文件
// 集成静态文件中间件koa-static-server
var koa_static = require('koa-static-server');
// http://127.0.0.1:3001/static/test.js
app.use(koa_static({
	rootDir:'./static/',
	// url路径
	rootPath:'/s/',
	// 缓存
	maxage : 0
}));

/* 测试代码 */

// 测试route 访问http://127.0.0.1:3001/route_test 
app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = 'hello koa';
}));

// 测试模板ejs 访问http://127.0.0.1:3001/ejs_test
// 写前端页面模板
app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	// ES6 Generator异步 知识点
	this.body = yield render('test',{title:'title_test'});
}));

// 测试api webAppService.js返回json数据显示 前端到后端模拟数据打通
app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	// ES6 Generator异步 知识点
	this.body = service.get_test_data();
}));

// 前端代码
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('index',{title:'书城首页'});
}));
app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('search',{title:'搜索页面'});
}));
var querystring = require('querystring');
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	// jsonObj参数传递bookId:bookId
	// http://127.0.0.1:3001/book?id=1242 =>1242
	this.body = yield render('book',{bookId:bookId});
}));

/* 任务代码 */

app.use(controller.get('/ajax/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_male_data(id);
}));

app.use(controller.get('/ajax/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_female_data(id);
}));

app.use(controller.get('/ajax/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_category_data();
}));

var querystring = require('querystring');
app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id = "";
	}
	this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));

// 调用webAppService.js的路由接口
app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

// 调用webAppService.js的路由接口
app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_rank_data();
}));


// // 调用webAppService.js的路由接口
// app.use(controller.get('/ajax/search',function*(){
// 	this.set('Cache-Control','no-cache');
// 	// 获得三个参数
// 	var querystring = require('querystring');
// 	var params = querystring.parse(this.req._parsedUrl.query);
// 	var start = params.start;
// 	var end = params.end;
// 	var keyword = params.keyword;
// 	this.body = yield service.get_search_data(start,end,keyword);
// }));

app.listen(3001);
console.log('Koa server is started!');


