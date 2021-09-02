import request from '@/utils/request'

export default {

  getPageList(page, limit, musicId) {
    return request({
      url: `/servicemusic/comment/${musicId}/${page}/${limit}`,
      method: 'get'
    })
  },
  addComment(comment) {
    return request({
      url: `/servicemusic/comment/auth/save`,
      method: 'post',
      data: comment
    })
  }
}