<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="musicQuery.film_name" placeholder="音乐名称"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="musicQuery.film_author" placeholder="音乐作者"/>
      </el-form-item>

        <el-form-item>
        <el-input v-model="musicQuery.film_id" placeholder="音乐编号"/>
      </el-form-item>


      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="musicName" label="名称" width="130" />
      <el-table-column prop="musicId" label="ID" width="180"  />
      <el-table-column prop="musicPublisher" label="专辑" width="180" />
      <el-table-column prop="musicAuthor" label="歌手" width="130"/>
      <el-table-column prop="musicScore" label="评分" width="60"/>
      <el-table-column prop="musicPrice" label="价格" width="60"/>
      <el-table-column prop="musicNum" label="时长" width="60"/>
      <el-table-column prop="musicDate" label="上映日期" width="160"/>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <router-link :to="'/music/edit/'+scope.row.musicId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.musicId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>

import music from '@/api/music/music'

export default {
    //写核心代码位置
    // data:{
    // },
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:2,//每页记录数
          total:0,//总记录数
          musicQuery:{} //条件封装对象
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{  
        //书本列表的方法
        getList(page=1) {
            this.page = page
            music.getMusicListPage(this.page,this.limit,this.musicQuery)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    //console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)   
                    console.log(this.total)
                }) 
        },
        resetData() {//清空的方法
            //表单输入项数据清空
            this.musicQuery = {}
            //查询所有书本数据
            this.getList()
        },
        //删除书本的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                music.deleteMusicId(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        }
 
    }
}
</script>
