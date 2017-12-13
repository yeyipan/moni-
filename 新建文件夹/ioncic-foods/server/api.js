
app.factory('apiFoods',['$http',function($http) {
    var s = []  //
    // 获取所有的数组分类/
    s.getFoodsType = function(cb) {
        $http.get('http://localhost:3000/api/v1/food_type/all_type')
        .then(function(res) {
            // 回调函数里面是服务端响应的数据//
            cb(res.data)
        })
    }
    
    // 获取商品数据／／
    s.getFoods = function(type,page,cb) {
        $http.get('http://localhost:3000/api/v1/food/?page' + page + '&type=' + type).then(function(res) {
            cb(res.data)
        })
    }

    // 返回数组数据／／
    return s
}])