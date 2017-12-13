var express = require('express')

var bodyParser = require('body-parser')
var app = express();

// 引入模版引擎／／ 以下两行代码为引入模版引擎代码，可直接复制粘贴.
// 将模版引擎渲染方式为art-template,并且渲染html文件
// 如果我们使用express框架路由的情况下
// 尽量使用express-art-template来渲染模板
app.engine('html',require('express-art-template'))
// 将默认渲染文件设置为html
app.set('view engine','html')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

// 因为路由地址是由上往下开始寻址的
// 如果我的public里面存在index.html
// 那么我的路由会默认直接打开此文件
// 把某一个文件夹映射为服务器静态文件目录，此目录中的内容可以直接访问
// 此文件夹下面一般存放静态资源文件(静态的html，图片，css，客户端js)
// 在一个应用程序中可以指定多个静态资源文件
// 如果public和www中存在相同名字的文件，
// 那么就会按照路由从上到下的规则进行查找地址(找到后就跳出)
// 静态目录可以创建二级目录／／／
app.use(express.static('./public'))
app.use(express.static('./www'))

/**
 * 此路由地址应该是http://localhost:3000/
 */
app.get('/',(req,res)=> {
    res.send('这里访问的是 ／ 地址')
})

/**
 * 此路由访问的地址为 http://localhost:3000/public/list
 */
app.get('/public/list',(req,res)=> {
    res.send('这里访问的是 ／public/list 地址')
})

// http://localhost:3000/public/editor
// http://localhost:3000/public/editor/abc
app.get('/public/editor/:id?',(req,res)=> {
    res.send('这里访问的是/public/editor/' + req.params.id + '地址')
})

/**
 * 我所有的路由地址，只要是以/admin/ 开头的，都会经过这个路由做跳转
 */
app.all('admin/*',(req,res)=> {
    console.log('这里访问的是/admin/*相关的路由，即路由中包含／admin的')
    /**
     * if(没有登录){
     * 跳转到登录界面
     * }else{
     * next()
     * }
     */
    next()
})

/**
 * 在访问此路由的时候，会先经过上一个路由
 * app.all('/admin/*')这个方法的处理
 */
 app.get('/admin/main',(req,res)=> {
     res.send('这里访问的是／admin/mian 地址')
 })


/**
 * 这个是通过引入模块的方式加入新的路由地址
 * 在访问的时候，首先浏览器中输入的地址为模块的别名(即app.use中的第一个参数)
 * 然后输入js中对应的路由名字
 */
app.use('/animal',require('./routes/first'))
// app.use('/family',require('./routes/first'))
// app.use('/tom/jerry',require('./routes/first'))
// app.use('/admin/animal',require('./routes/first'))


 app.listen(3000,()=> {
     console.log('node is runing......')
 })