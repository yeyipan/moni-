
var express = require('express');
var router = express.Router()
router.get('/cat',(req,res)=>{
    // res.send('这里访问的值./routes/first.js中的cat路由地址')
    res.render('cat',{name:'加菲猫'})
})

router.get('/a/dog',(req,res)=>{
    
    res.render('animal/dog',{name:'旺财'})
    // res.send('这里访问的值./routes/first.js中的dog路由地址')
    
})

module.exports = router