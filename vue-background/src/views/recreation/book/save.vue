<template>
  <div class="app-container">
     <el-form label-width="120px">
      <el-form-item label="书本名称">
        <el-input v-model="bookInfo.bookName"/>
      </el-form-item>
     <el-form-item label="书本ISBN">
        <el-input v-model="bookInfo.bookId"/>
      </el-form-item>     
     <el-form-item label="书本评分">
        <el-input-number v-model="bookInfo.bookScore"/>
      </el-form-item>
     <el-form-item label="书本作者">
        <el-input v-model="bookInfo.bookAuthor"/>
      </el-form-item>
     <el-form-item label="书本出版社">
        <el-input v-model="bookInfo.bookPublisher"/>
      </el-form-item>
     <el-form-item label="书本价格">
        <el-input-number v-model="bookInfo.bookPrice"/>
      </el-form-item>
     <el-form-item label="书本页数">
        <el-input-number v-model="bookInfo.bookNum"/>
      </el-form-item>               
      <el-form-item label="书本排序">
        <el-input-number v-model="bookInfo.sort" controls-position="right" min="0"/>
      </el-form-item>
        <el-form-item label="书本简介">
            <tinymce :height="300" v-model="bookInfo.description"/>
        </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="书本封面">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="bookInfo.avatar"/>
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
import BookApi from '@/api/book/book.js'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
  components: { ImageCropper, PanThumb,Tinymce },
  data() {
    return {
      book:{
        bookName: '',
        bookId:'',
        bookScore:0,
        bookAuthor:'',
        bookPublisher:'',
        bookPrice:0.0,
        bookNum:0,
        sort: 0,
        avatar: ''
      },
      bookInfo:{
        bookName: '',
        bookId:'',
        bookScore:0,
        bookAuthor:'',
        bookPublisher:'',
        bookPrice:0.0,
        bookNum:0,
        sort: 0,
        avatar: '',
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
      this.bookInfo.avatar = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.bookId) {
          //从路径获取id值
          const bookId = this.$route.params.bookId
          //调用根据id查询的方法
          this.getBook(bookId)
      } else { //路径没有id值，做添加
        //清空表单
        this.bookInfo = {}
      }
    },
    //根据书本id查询的方法
    getInfo(id) {
      BookApi.getBookInfo(id)
        .then(response => {
          this.book = response.data.tBook
        })
    },
    getBook(bookId) {
      BookApi.getBook(bookId)
        .then(response => {
          this.bookInfo = response.data.bookInfoVo
        })
    },
    save() {
        this.saveBookInfo()
    },

      Update() {
        this.updateBookInfo()
    },
    //修改讲师的方法
    updateBook() {
      BookApi.updateBookInfo(this.book)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/book/table'})
        })
    },
    //添加讲师的方法
    saveBook() {
      BookApi.addBook(this.book)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/book/table'})
        })
    },
    saveBookInfo() {
      BookApi.addBookInfo(this.bookInfo)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/book/table'})
        })
    },
    updateBookInfo() {
      BookApi.updateBook(this.bookInfo)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/book/table'})
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