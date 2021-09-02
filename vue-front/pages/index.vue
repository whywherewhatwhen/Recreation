<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide"
          style="background: #040B1B;"
        >
          <a target="_blank" :href="banner.linkUrl">
            <img :src="banner.imageUrl" :alt="banner.title" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </div>
    <!-- 幻灯片 结束 -->

    <!-- 书本 开始 -->
    <div>
      <section class="container">
        <header class="comm-title">
          <h2 class="tac">
            <a href="#" title="新书速递" class="comm-btn c-btn-2">新书速递</a>
          </h2>
        </header>
        <div>
          <article class="i-book-list">
            <ul class="of">
              <li v-for="book in bookList" :key="book.bookId">
                <!-- <div class="mt10 hLh30 txtOf tac">
                    <a
                      href="/book/1"
                      :title="book.bookName"
                      class="fsize18 c-666"
                      >{{ book.bookName }}</a
                    >
                  </div>
                  <div class="i-book-pic">
                    <a href="/book/1" :title="book.bookName">
                      <img :alt="book.bookName" :src="book.avatar" />
                    </a>
                  </div>

                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ book.bookAuthor }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ book.bookPublisher }}</p>
                  </div> -->
                <div class="test">
                  <img :src="book.avatar" />
                  <div>{{ book.bookName }}</div>
                  <span>{{ book.bookAuthor }}</span>
                  <hr/>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </div>
    <!-- /书本 结束 -->

     <!-- 电影 开始 -->
    <div>
      <section class="container">
        <header class="comm-title">
          <h2 class="tac">
            <a href="#" title="热门电影" class="comm-btn c-btn-2">热门电影</a>
          </h2>
        </header>
        <div>
          <article class="i-book-list">
            <ul class="of">
              <li v-for="film in filmList" :key="film.filmId">
                <!-- <div class="mt10 hLh30 txtOf tac">
                    <a
                      href="/book/1"
                      :title="book.bookName"
                      class="fsize18 c-666"
                      >{{ book.bookName }}</a
                    >
                  </div>
                  <div class="i-book-pic">
                    <a href="/book/1" :title="book.bookName">
                      <img :alt="book.bookName" :src="book.avatar" />
                    </a>
                  </div>

                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ book.bookAuthor }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ book.bookPublisher }}</p>
                  </div> -->
                <div class="test">
                  <img :src="film.avatar" />
                  <div>{{ film.filmName }}</div>
                  <span>{{ film.filmAuthor }}</span>
                  <hr/>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </div>
    <!-- /电影 结束 -->
 <!-- 音乐 开始 -->
    <div>
      <section class="container">
        <header class="comm-title">
          <h2 class="tac">
            <a href="#" title="热门音乐" class="comm-btn c-btn-2">热门音乐</a>
          </h2>
        </header>
        <div>
          <article class="i-book-list">
            <ul class="of">
              <li v-for="music in musicList" :key="music.musicId">
                <!-- <div class="mt10 hLh30 txtOf tac">
                    <a
                      href="/book/1"
                      :title="book.bookName"
                      class="fsize18 c-666"
                      >{{ book.bookName }}</a
                    >
                  </div>
                  <div class="i-book-pic">
                    <a href="/book/1" :title="book.bookName">
                      <img :alt="book.bookName" :src="book.avatar" />
                    </a>
                  </div>

                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ book.bookAuthor }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ book.bookPublisher }}</p>
                  </div> -->
                <div class="test">
                  <img :src="music.avatar" />
                  <div>{{ music.musicName }}</div>
                  <span>{{ music.musicAuthor }}</span>
                  <hr/>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </div>
    <!-- /音乐 结束 -->
  </div>
</template>

<script>
import banner from "@/api/banner";
import index from "@/api/index";
export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination" //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev" //前一页dom节点
        }
      },
      //banner数组
      bannerList: [],
      bookList: [],
      filmList: [],
      musicList: [],
    };
  },
  created() {
    //调用查询banner的方法
    this.getBannerList();
    //调用查询热门书籍
    this.getHotBook();
    //调用查询热门电影
    this.getHotFilm();
    //调用查询热门音乐
    this.getHotMusic();
  },
  methods: {
    //查询热门书籍
    getHotBook() {
      index.getIndexDataBook().then(response => {
        this.bookList = response.data.data.bookList;
      });
    },
    //查询热门电影
    getHotFilm() {
      index.getIndexDataFilm().then(response => {
        this.filmList = response.data.data.filmList;
      });
    },
    getHotMusic() {
      index.getIndexDataMusic().then(response => {
        this.musicList = response.data.data.musicList;
      });
    },
    //查询banner数据
    getBannerList() {
      banner.getListBanner().then(response => {
        this.bannerList = response.data.data.list;
      });
    }
  }
};
</script>

<style scoped>
    .test {
      text-align: center;
      margin: 0 auto;
      width: 200px;
      color: blue;
    }
</style>