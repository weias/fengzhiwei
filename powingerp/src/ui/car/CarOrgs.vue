<template>
  <div style="overflow-y: auto">
    <template v-for="item in items">
      <div class="content" @click="select(item)">
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        items: []
      }
    },
    mounted () {
      setTimeout(() => {
        this.loadData();
      }, 20)
    },
    methods: {
      loadData() {
        this.$axios({
          url: "v1/common/org-list",
          method: "POST",
          data: {
          }
        }).then(res => {
          if (res.data.status == 2000) {
            this.items = res.data.data
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(error => {
          this.$message.error(error.toString());
        });
      },
      select(item) {
        this.$emit('setCarOrg', { orgId:item.id, orgName:item.name });
      }
    }
  }
</script>

<style lang='less' scoped>
  .content {
    padding: 8px;
    color: #303133;
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }
  .content:hover, .content:active, .content:focus {
    background: #ecf5ff;
    color: #3a8ee6;
  }
</style>
