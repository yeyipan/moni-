<template>
    <div>
        <h1>这里是我的主入口文件</h1>
        <h3>当前计时为<i class="warning">{{seconds}}</i>秒</h3>
        <el-button @click="doLoading()" type="primary" :loading="isLoading">按钮</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLoading:false,
                seconds:0
            }
        },
        methods:{
            doLoading:function(){
                this.seconds = 0 //点击之后设置起始值为0
                this.isLoading = true //设置开始加载
                var i = setInterval(function(){
                    this.seconds += 1
                    if(this.seconds == 5){//5秒的时候结束计时
                        this.isLoading = false
                        clearInterval(i) //清除计时器
                    }
                }.bind(this),1000)
            }
        }
    }
</script>
<style>

</style>