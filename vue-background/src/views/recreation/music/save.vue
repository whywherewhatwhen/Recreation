<template>
  <div class="app-container">
     <el-form label-width="120px">
      <el-form-item label="音乐名称">
        <el-input v-model="musicInfo.musicName"/>
      </el-form-item>
     <el-form-item label="ID">
        <el-input v-model="musicInfo.musicId"/>
      </el-form-item>     
     <el-form-item label="音乐评分">
        <el-input-number v-model="musicInfo.musicScore"/>
      </el-form-item>
     <el-form-item label="音乐作者">
        <el-input v-model="musicInfo.musicAuthor"/>
      </el-form-item>
     <el-form-item label="音乐专辑">
        <el-input v-model="musicInfo.musicPublisher"/>
      </el-form-item>
     <el-form-item label="音乐价格">
        <el-input-number v-model="musicInfo.musicPrice"/>
      </el-form-item>
     <el-form-item label="音乐时长">
        <el-input-number v-model="musicInfo.musicNum"/>
      </el-form-item>               
      <el-form-item label="音乐排序">
        <el-input-number v-model="musicInfo.sort" controls-position="right" min="0"/>
      </el-form-item>
     <el-form-item label="音乐上映日期">
        <el-input v-model="musicInfo.musicDate"/>
      </el-form-item>

        <el-form-item label="音乐简介">
            <tinymce :height="300" v-model="musicInfo.description"/>
        </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="音乐封面">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="musicInfo.avatar"/>
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


    <el-form-item label="上传视频">
        <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAlyiVideo'"
            :limit="1"
            class="upload-demo">
        <el-button size="small" type="primary">上传视频</el-button>
        <el-tooltip placement="right-end">
            <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
            <i class="el-icon-question"/>
        </el-tooltip>
        </el-upload>
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
import musicApi from '@/api/music/music.js'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
  components: { ImageCropper, PanThumb,Tinymce },
  data() {
    return {
      musicInfo:{
        musicName: '',
        musicId:'',
        musicScore:0,
        musicAuthor:'',
        musicPublisher:'',
        musicPrice:0.0,
        musicNum:0,
        sort: 0,
        avatar: '',
        musicDate:'',
        description:'',
        videoSourceId: '',
        videoOriginalName:''//视频名称
      },
      fileList: [],//上传文件列表
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
//点击确定调用的方法
        handleVodRemove() {
            //调用接口的删除视频的方法
            musicApi.deleteAliyunvod(this.musicInfo.videoSourceId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除视频成功!'
                    });
                    //把文件列表清空
                    this.fileList = []
                    //把video视频id和视频名称值清空
                    //上传视频id赋值
                    this.video.videoSourceId = ''
                    //上传视频名称赋值
                    this.video.videoOriginalName = ''
                })
        },
        //点击×调用这个方法
        beforeVodRemove(file,fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //上传视频成功调用的方法
        handleVodUploadSuccess(response, file, fileList) {
            //上传视频id赋值
            this.musicInfo.videoSourceId = response.data.videoId
            //上传视频名称赋值
            this.musicInfo.videoOriginalName = file.name
        },
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },
    close() { //关闭上传弹框的方法
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.musicInfo.avatar = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.musicId) {
          //从路径获取id值
          const musicId = this.$route.params.musicId
          //调用根据id查询的方法
          this.getInfo(musicId)
      } else { //路径没有id值，做添加
        //清空表单
        this.musicInfo = {}
      }
    },

    getInfo(id) {
      musicApi.getMusic(id)
        .then(response => {
          this.musicInfo = response.data.musicInfoVo
        })
    },

    save() {
        this.saveMusicInfo()
    },

      Update() {
        this.updateMusicInfo()
    },    
    saveMusicInfo() {
      musicApi.addMusicInfo(this.musicInfo)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/music/table'})
        })
    },
    updateMusicInfo() {
      musicApi.updateMusicInfo(this.musicInfo)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/music/table'})
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