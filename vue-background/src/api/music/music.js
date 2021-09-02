import request from '@/utils/request'

export default{

    getMusicListPage(current,limit,musicQuery){
        return request({
            url: `/servicemusic/music/pageMusicCondition/${current}/${limit}`,
            method: 'post',
            data:musicQuery
          })
    },

    //根据id查询电影
    getMusic(musicId) {
        return request({
            url: `/servicemusic/music/getMusicInfo/${musicId}`,
            method: 'get'
          })
    },

     //删除电影
     deleteMusicId(id) {
        return request({
            url: `/servicemusic/music/deleteMusic/${id}`,
            method: 'delete'
          })
    },    

    //增加电影
    addMusicInfo(musicInfoVo){
        return request({
            url: `/servicemusic/music/addMusicInfo`,
            method: 'post',
            data: musicInfoVo
          })
    },

    //修改电影
    updateMusicInfo(musicInfoVo){
        return request({
            url: `/servicemusic/music/updateMusicInfo`,
            method: 'post',
            data: musicInfoVo
          })
    },

        //删除视频
        deleteAliyunvod(id) {
            return request({
                url: '/eduvod/video/removeAlyVideo/'+id,
                method: 'delete'
              })
        }
}

