<template>
  <div id="List" class="bg-fa of">
    <!-- 书本介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">书本介绍</span>
        </h2>
      </header>
              <!-- 书本基本信息 -->
      <div class="t-infor-wrap">
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="book.avatar">
            </section>
            <section class="mt10">
              <span class="t-tag-bg">书名：{{book.bookName}}</span>
            </section>
            <section class="mt10">
              <span class="t-infor-txt">作者：{{book.bookAuthor}}</span>
            </section>
            <section class="mt10">
              <span class="t-tag-bg">出版社：{{book.bookPublisher}}</span>
            </section>
            <section class="mt10">
              <span class="t-tag-bg">价格：{{book.bookPrice}}</span>
            </section>
            <section class="mt10">
              <span class="t-tag-bg">页数：{{book.bookNum}}</span>
            </section>
            <section class="t-infor-txt">
              <p
                class="mt20">评分：{{book.bookScore}}</p>
            </section>
            <section class="t-infor-txt">
              <div class="mt20" v-html="description">
                </div>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>

    </section>
    <!-- /书本介绍 结束 -->

<div class="mt50 commentHtml">
  <div>
      <h6 class="c-c-content c-infor-title" id="i-art-comment">
        <span class="commentTitle">书籍评论</span>
      </h6>
      <section class="lh-bj-list pr mt20 replyhtml">
        <ul>
          <li class="unBr">
            <aside class="noter-pic">
              <img width="50" height="50" class="picImg" src="~/assets/img/zan-icon.png">
              </aside>
            <div class="of">
              <section class="n-reply-wrap">
                <fieldset>
                  <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                </fieldset>
                <p class="of mt5 tar pl10 pr10">
                  <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                  <input type="button" @click="addComment()" value="回复" class="lh-reply-btn">
                </p>
              </section>
            </div>
          </li>
        </ul>
      </section>
      <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(data,index) in data.items" v-bind:key="index">
                  <aside class="noter-pic">
                    <img width="50" height="50" class="picImg" :src="data.avatar">
                    </aside>
                  <div class="of">
                    <span class="fl"> 
                    <font class="fsize12 c-blue"> 
                      {{data.nickname}}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span>
                  </div>
                  <div class="noter-txt mt5">
                    <p>{{data.content}}</p>
                  </div>
                  <div class="of mt5">
                    <span class="fr"><font class="fsize12 c-999 ml5">{{data.gmtCreate}}</font></span>
                  </div>
                </li>
              
              </ul>
          </section>
        </section>

            <!-- 公共分页 开始 -->
        <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)">首</a>
            <a
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="前一页"
            @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
            v-for="page in data.pages"
            :key="page"
            :class="{current: data.current == page, undisable: data.current == page}"
            :title="'第'+page+'页'"
            href="#"
            @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
            :class="{undisable: !data.hasNext}"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
            :class="{undisable: !data.hasNext}"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
        </div>
        <!-- 公共分页 结束 -->
  </div>
  </div>
  </div>

  
</template>


<script>
import bookApi from "@/api/book";
import comment from "@/api/bookcomment";
export default {

     //和页面异步开始的
  asyncData({ params, error }) {
    return {bookId: params.id}
    
  },
  data() {
    return {
      data:{},
      page:1,
      limit:2,
      total:0,
      // bookId:'',
      // content:'',
      book:{},
      comment:{
        content:'',
        bookId:''
      },
      description:'',
    }
  },
  created() {
    this.initBookInfo()
    this.initComment()
  },
  methods:{
    //获取书本详情
    initBookInfo() {
      bookApi.getBookInfo(this.bookId)
            .then(response => {
              this.book=response.data.data.bookInfoVo
              this.description=response.data.data.bookInfoVo.description
            })
    },

    initComment(){
       comment.getPageList(this.page, this.limit, this.bookId).then(response => {
           this.data = response.data.data
       })
    },
    addComment(){
        this.comment.bookId = this.bookId
        comment.addComment(this.comment).then(response => {
            if(response.data.success){        
                this.$message({
                type: 'success',
                message: "添加成功"
              })                     
                this.comment.content = ''
                this.initComment()
            }
        })
    },
    gotoPage(page){
          comment.getPageList(page, this.limit,this.bookId).then(response => {
              this.data = response.data.data
          })
      }
  }
  
};
</script>