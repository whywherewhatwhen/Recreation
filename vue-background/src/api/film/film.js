import request from '@/utils/request'

export default{

    getFilmListPage(current,limit,filmQuery){
        return request({
            url: `/servicefilm/film/pageFilmCondition/${current}/${limit}`,
            method: 'post',
            data:filmQuery
          })
    },

    //根据id查询电影
    getFilm(filmId) {
        return request({
            url: `/servicefilm/film/getFilmInfo/${filmId}`,
            method: 'get'
          })
    },

     //删除电影
     deleteFilmId(id) {
        return request({
            url: `/servicefilm/film/deleteFilm/${id}`,
            method: 'delete'
          })
    },    

    //增加电影
    addFilmInfo(filmInfoVo){
        return request({
            url: `/servicefilm/film/addFilmInfo`,
            method: 'post',
            data: filmInfoVo
          })
    },

    //修改电影
    updateFilmInfo(filmInfoVo){
        return request({
            url: `/servicefilm/film/updateFilmInfo`,
            method: 'post',
            data: filmInfoVo
          })
    },
}

