import request from '@/utils/request'

export default {

  getPageList(page, limit, bookId) {
    return request({
      url: `/servicemain/comment/${bookId}/${page}/${limit}`,
      method: 'get'
    })
  },
  addComment(comment) {
    return request({
      url: `/servicemain/comment/auth/save`,
      method: 'post',
      data: comment
    })
  }
}