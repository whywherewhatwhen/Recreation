import request from '@/utils/request'

export default {

  getPageList(page, limit, filmId) {
    return request({
      url: `/servicefilm/comment/${filmId}/${page}/${limit}`,
      method: 'get'
    })
  },
  addComment(comment) {
    return request({
      url: `/servicefilm/comment/auth/save`,
      method: 'post',
      data: comment
    })
  }
}