import request from '@/utils/request'

export default {
    //分页电影查询的方法
  getFilmList(page,limit) {
    return request({
      url: `/servicefilm/filmfront/getFilmFrontList/${page}/${limit}`,
      method: 'post'
    })
  },
  //电影详情的方法
  getFilmInfo(id) {
    return request({
      url: `/servicefilm/film/getFilmInfo/${id}`,
      method: 'get'
    })
  }

}