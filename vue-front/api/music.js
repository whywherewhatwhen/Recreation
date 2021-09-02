import request from '@/utils/request'

export default {
    //分页音乐查询的方法
  getMusicList(page,limit) {
    return request({
      url: `/servicemusic/musicfront/getMusicFrontList/${page}/${limit}`,
      method: 'post'
    })
  },
  //音乐详情的方法
  getMusicInfo(id) {
    return request({
      url: `/servicemusic/music/getMusicInfo/${id}`,
      method: 'get'
    })
  }

}