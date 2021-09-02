import request from '@/utils/request'

export default{

    getBookListPage(current,limit,bookQuery){
        return request({
            url: `/servicemain/book/pageBookCondition/${current}/${limit}`,
            method: 'post',
            data:bookQuery
          })
    },

     //删除书本
     deleteBookId(id) {
        return request({
            url: `/servicemain/book/deleteBook/${id}`,
            method: 'delete'
          })
    },
    //添加书本
    addBook(book) {
        return request({
            url: `/servicemain/book/addBook`,
            method: 'post',
            data: book
          })
    },
    //根据id查询书本
    getBookInfo(id) {
        return request({
            url: `/servicemain/book/getBook/${id}`,
            method: 'get'
          })
    },
    //修改书本
    updateBookInfo(book) {
        return request({
            url: `/servicemain/book/updateBook`,
            method: 'post',
            data: book
          })
    },
    addBookInfo(bookInfo){
        return request({
            url: `/servicemain/book/addBookInfo`,
            method: 'post',
            data: bookInfo
          })
    },
    updateBook(bookInfoVo){
        return request({
            url: `/servicemain/book/updateBookInfo`,
            method: 'post',
            data: bookInfoVo
          })
    },
    //根据id查询书本
    getBook(bookId) {
        return request({
            url: `/servicemain/book/getBookInfo/${bookId}`,
            method: 'get'
          })
    },

}

