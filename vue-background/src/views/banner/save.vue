<template>
  <div class="app-container">
     <el-form label-width="120px">
      <el-form-item label="banner名称">
        <el-input v-model="banner.title"/>
      </el-form-item>
     <el-form-item label="banner编号">
        <el-input v-model="banner.id"/>
      </el-form-item>                  
      <el-form-item label="banner排序">
        <el-input-number v-model="banner.sort" controls-position="right" min="0"/>
      </el-form-item>

      <!-- 头像 -->
      <el-form-item label="banner图片">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="banner.imageUrl"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换封面
          </el-button>

          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
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
import BannerApi from '@/api/banner/banner.js'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
  components: { ImageCropper, PanThumb,Tinymce },
  data() {
    return {
      banner:{
        title: '',
        id:'',
        linkUrl:'',
        sort: 0,
        imageUrl: ''
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
      this.banner.imageUrl = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.bannerId) {
          //从路径获取id值
          const bannerId = this.$route.params.bannerId
          //调用根据id查询的方法
          this.getInfo(bannerId)
      } else { //路径没有id值，做添加
        //清空表单
        this.banner = {}
      }
    },
    //根据bannerid查询的方法
    getInfo(id) {
      BannerApi.getBannerInfo(id)
        .then(response => {
          this.banner = response.data.data
          console.log(this.banner)
        })
    },
    save() {
        this.saveBannerInfo()
    },

      Update() {
        this.updateBannerInfo()
    },
    //修改banner的方法
    updateBannerInfo() {
      BannerApi.updateBannerInfo(this.banner)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/banner/table'})
        })
    },
    //添加banner的方法
    saveBannerInfo() {
      BannerApi.addBanner(this.banner)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/banner/table'})
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