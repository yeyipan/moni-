<template>
  <div>
      <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'Foods'}">商品信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row justify="center" type="flex">
            <el-col :span="16">
                <!--
                el-form属性
                    model 指定表单数据对象
                    rules 指定验证规则
                el-form-item
                    label   标签文本
                    prop    表单域 model 字段
            -->
                <el-form :model="type" :rules="rules" ref="mainForm" label-width="100px">
                    <el-form-item label="菜品名称" prop="name">
                        <el-autocomplete placeholder="请输入菜品名称" 
                        :fetch-suggestions="filterTypeData" v-model="type.name" icon="menu"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <!--
                        设置autosize可以实现自适应输入框的大小(根据输入内容改变)
                            设置参数{ minRows: 2, maxRows: 4},可以控制大小改变范围
                    -->
                        <el-input placeholder="请输入描述信息" type="textarea" autosize v-model="type.description">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="image">
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="subHandle">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
  </div>
</template>

<script>
    import api from '../../services/api_food'
    export default {
        data(){
            return{
                id:'',
                type:{
                    name:'',
                    description:'',
                    image:''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                rules:{
                    name:[
                        {required:true,message:'菜品名称不能为空',trigger:'blur'},
                        {min:2,message:'菜品文字最小长度为2'}
                    ],
                    description:{
                        required:true,
                        message:'备注不能为空'
                    },
                    image:{
                        required:true,
                        message:'请选择图片'
                    },
                    types: [
                    { "value": "西红柿炒鸡蛋" },
                    { "value": "黄焖鸡米饭" },
                    { "value": "糖醋里脊" },
                    { "value": "红烧茄子" },
                    { "value": "梅菜扣肉" },
                    { "value": "口水鸭" },
                    { "value": "叫花鸡" },
                    { "value": "臭豆腐" },
                    { "value": "福鼎肉片" },
                    { "value": "红烧狮子头" },
                    { "value": "炒青菜" },
                    { "value": "红烧肉" },
                    { "value": "黑椒肉片" },
                ]
                }
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //auto-complete 自动完成的筛选方法
            // 此处的筛选数据源比较特殊 需要是一个包含value属性的对象数组
            filterTypeData: function (clause, callback) {
                if (clause) {//如果查询条件存在 那么尽兴筛选
                    var result = this.types.filter(function (item) {
                        return item.value.toLowerCase().indexOf(clause) > -1
                    })
                    callback(result)
                }
                else {//默认返回所有数据
                    callback(this.types)
                }
            },
            subHandle: function () {//点击保存的时候
                // console.log(this.$refs['mainForm'])
                this.$refs['mainForm'].validate(valid => {
                    if (valid) {
                        // alert('验证通过')
                        if (this.id) {//修改
                            api.update(this.id,this.type,function(res){
                                if (res.status == 'y') {
                                    this.$message.success(res.msg)
                                    //执行页面跳转
                                    this.$router.push({ name: 'FoodType' })
                                }
                                else {
                                    this.$message.error(res.msg)
                                }
                            }.bind(this))
                        }
                        else {//新增
                            api.save(this.type, function (res) {
                                if (res.status == 'y') {
                                    this.$message.success(res.msg)
                                    //执行页面跳转
                                    this.$router.push({ name: 'FoodType' })
                                }
                                else {
                                    this.$message.error(res.msg)
                                }
                            }.bind(this))
                        }
                    }
                    else {
                        console.log('vaildate error!')
                    }
                })
                console.dir(this.type)
            }
        },
        created: function () {
            // console.log(this.$route.params.id)
            if (this.$route.params.id) {
                this.id = this.$route.params.id //赋值当前的id
                api.getDataById(this.id, function (res) {
                    this.type = res.data
                }.bind(this))
            }
        }
    }
    
</script>