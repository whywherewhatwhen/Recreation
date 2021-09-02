<template>
  <div class="app-container">
     <el-form label-width="120px">
      <el-form-item label="电影名称">
        <el-input v-model="filmInfo.filmName"/>
      </el-form-item>
     <el-form-item label="电影IMDb">
        <el-input v-model="filmInfo.filmId"/>
      </el-form-item>     
     <el-form-item label="电影评分">
        <el-input-number v-model="filmInfo.filmScore"/>
      </el-form-item>
     <el-form-item label="电影导演">
        <el-input v-model="filmInfo.filmAuthor"/>
      </el-form-item>
     <el-form-item label="电影地区">
        <el-input v-model="filmInfo.filmPublisher"/>
      </el-form-item>
     <el-form-item label="电影价格">
        <el-input-number v-model="filmInfo.filmPrice"/>
      </el-form-item>
     <el-form-item label="电影时长">
        <el-input-number v-model="filmInfo.filmNum"/>
      </el-form-item>               
      <el-form-item label="电影排序">
        <el-input-number v-model="filmInfo.sort" controls-position="right" min="0"/>
      </el-form-item>
     <el-form-item label="电影上映日期">
        <el-input v-model="filmInfo.filmDate"/>
      </el-form-item>
        <el-form-item label="电影简介">
            <tinymce :height="300" v-model="filmInfo.description"/>
        </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="电影封面">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="filmInfo.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换封面
          </el-button>

          <image-cropper
                        v-show="imagecropperShow"
                        :width="100"
                        :height="100"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduoss/fileoss'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="save">增加</el-button>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="Update">修改</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import filmApi from '@/api/film/film.js'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
  components: { ImageCropper, PanThumb,Tinymce },
  data() {
    return {
      filmInfo:{
        filmName: '',
        filmId:'',
        filmScore:0,
        filmAuthor:'',
        filmPublisher:'',
        filmPrice:0.0,
        filmNum:0,
        sort: 0,
        avatar: '',
        filmDate:'',
        description:'',
      },
      //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    close() { //关闭上传弹框的方法
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.filmInfo.avatar = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.filmId) {
          //从路径获取id值
          const filmId = this.$route.params.filmId
          //调用根据id查询的方法
          this.getInfo(filmId)
      } else { //路径没有id值，做添加
        //清空表单
        this.filmInfo = {}
      }
    },

    getInfo(id) {
      filmApi.getFilm(id)
        .then(response => {
          this.filmInfo = response.data.filmInfoVo
        })
    },

    save() {
        this.saveFilmInfo()
    },

      Update() {
        this.updateFilmInfo()
    },    
    saveFilmInfo() {
      filmApi.addFilmInfo(this.filmInfo)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/film/table'})
        })
    },
    updateFilmInfo() {
      filmApi.updateFilmInfo(this.filmInfo)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/film/table'})
        })
    },

  }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>