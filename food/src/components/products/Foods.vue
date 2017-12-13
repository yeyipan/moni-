<template>
  <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/food_type'}">商品分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品信息管理</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link :to="{name:'FoodsEditor'}" class="el-button el-button--danger">新增</router-link>
      <el-table :data="data" stripe  border style="width:100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="image" label="图片"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="block">
          <el-pagination  @current-change="pageChanged" :page-count="pageCount" layout="prev,pager,next"></el-pagination>
      </div>
      <el-dialog title="提示" v-model="dialogVisible" size="tiny">
          <span>{{dialogMsg}}</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false;delItem={}">取 消</el-button>
              <el-button type="primary" @click="doDel">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
    import api from '../../services/api_food'
    export default {
        data(){
            return{
                data:[],
                dialogVisible:false,
                dislogMsg:'',
                delItem:{},
                pageCout:1,
                pageIndex:1,
            }
        },
        methods:{
            handleEditor(index,row){
                console.log(index,row)
                this.$router.push({name:'FoodsEditor',params:{id:row._id}})
            },
            handleDeleta(index,row){
                this.dialogVisible = true
                this.dislogMsg=`确认删除:${row.name}`
                this.delItem = row
            },
            doDel:function(){
                this.dialogVisible = false
                api.delete(this.delItem._id,function(res){
                    if (res.status == 'y') {
                        this.$message.success('删除成功')
                        console.dir(this.$router)
                        this.$router.push({name:'Foods',query:{random:Math.random()}})
                    } else {
                        this.$message.error(res.msg)
                    }
                }.bind(this))
            },
            getData(){
                api.getData(this.pageIndex,function(res){
                    this.pageCout = res.data.pageCout
                    this.data = res.data.res
                })
            },
            pageChanged(page){
                this.pageIndex = page
                this.getData()
            },
        },
        created:function(){
            this.getData()
        },
        watch:{
            $route:function(){
                console.log('获取信息列表数据')
                this.getData()
            }
        }
    }
</script>
