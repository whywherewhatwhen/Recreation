import request from '@/utils/request'

export default {
    //查询热门书籍
  getIndexDataBook() {
    return request({
      url: '/servicemain/indexfront/index',
      method: 'get'
    })
  },
    //查询热门电影
  getIndexDataFilm() {
    return request({
      url: '/servicefilm/indexfront/index',
      method: 'get'
    })
  },

    //查询热门音乐
    getIndexDataMusic() {
      return request({
        url: '/servicemusic/indexfront/index',
        method: 'get'
      })
    }
}