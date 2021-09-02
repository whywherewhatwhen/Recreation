import request from '@/utils/request'

export default {
    //分页书本查询的方法
  getBookList(page,limit) {
    return request({
      url: `/servicemain/bookfront/getBookFrontList/${page}/${limit}`,
      method: 'post'
    })
  },
  //书本详情的方法
  getBookInfo(id) {
    return request({
      url: `/servicemain/book/getBookInfo/${id}`,
      method: 'get'
    })
  }

}