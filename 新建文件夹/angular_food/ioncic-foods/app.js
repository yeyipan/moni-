const exp = require('express'),
    fs = require('fs'),
    app = exp()

app.use(exp.static('public'));

app.get('/api/v1/book/all_type', (req, res) => {
    var data = [
        { name: '儿童', type: 'ertong' },
        { name: '历史', type: 'lishi' },
        { name: '经济', type: 'jingji' },
        { name: '文学', type: 'wenxue' },
        { name: '玄幻', type: 'xuanhuan' },
        { name: '青春', type: 'qingchun' },
    ]
    // var booksTypes = JSON.parse(data)
    // console.log(data)
    res.send(data)
})

app.get('/api/v1/book/:type?', (req, res) => {
    var data = fs.readFileSync('./books.json')
    var books = JSON.parse(data)
    console.log(books)
    res.send(books)
})

app.listen(3000, function () {
    console.log('服务器运行在3000端口!');
});