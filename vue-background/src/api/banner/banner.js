import request from '@/utils/request'

export default{

    getBannerListPage(current,limit,bannerQuery){
        return request({
            url: `/recreationcms/banneradmin/pageBannerCondition/${current}/${limit}`,
            method: 'post',
            data: bannerQuery
          })
    },

     //删除Banner
     deleteBannerId(id) {
        return request({
            url: `/recreationcms/banneradmin/remove/${id}`,
            method: 'delete'
          })
    },
    //添加banner
    addBanner(banner) {
        return request({
            url: `/recreationcms/banneradmin/addBanner`,
            method: 'post',
            data: banner
          })
    },
    //根据id查询banner
    getBannerInfo(id) {
        return request({
            url: `/recreationcms/banneradmin/get/${id}`,
            method: 'get'
          })
    },
    //修改banner
    updateBannerInfo(banner) {
        return request({
            url: `/recreationcms/banneradmin/update`,
            method: 'put',
            data: banner
          })
    },

}

