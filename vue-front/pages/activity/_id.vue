<template>
  <div id="List" class="bg-fa of">
<el-input
  type="textarea"
  :rows="3"
  placeholder="请输入感想"
  v-model="activity.content">
</el-input>
<input type="button" @click="addActivity()" value="提交" class="lh-reply-btn">
     
  </div>

  
</template>


<script>
import activity from "@/api/activity";
export default {
     //和页面异步开始的
  asyncData({ params, error }) {
    return {id: params.id}
    
  },
  data() {
    return {
      activity:{
        content:'',
        id:'',
      },
      description:'',

    }
  },
  methods:{
    addActivity(){
        this.activity.id = this.id
        activity.addMind(this.activity).then(response => {
            if(response.data.success){        
                this.$message({
                type: 'success',
                message: "参与活动成功"
              })                     
                this.activity.content = ''
            }
        })
    },
  }
  
};
</script>