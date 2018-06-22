<template>
  <div>
    <el-input style="width: 100px;margin-top: 10px;" clearable placeholder="搜索" />

    <message-item style="margin-top: 10px;" :items="messages"></message-item>

  </div>
</template>

<script>
  import MessageItem from '../../components/items/MessageItem'
  export default {
    name: 'message',
    components: { MessageItem },
    data() {
      return {
        messages: [],
      };
    },
    mounted () {
      this.refresh()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      search () {
        this.refresh()
      },
      refresh () {
        console.log(this.keyword);
        this.$axios({
          url: "v1/message/category",
          method: "POST",
          data: {
          }
        }).then(res => {
          if (res.data.status == 2000) {
            this.messages = res.data.data
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(error => {
          this.$message.error(error.toString());
        });
      }
    }
  }
</script>
