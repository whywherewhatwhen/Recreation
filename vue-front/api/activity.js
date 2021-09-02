import request from '@/utils/request'

export default {
    //查询前两条banner数据
  addMind(activity) {
    return request({
      url: '/recreationcms/activity/save',
      method: 'post',
      data:activity
    })
  }
}