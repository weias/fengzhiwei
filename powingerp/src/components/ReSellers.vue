<template>
  <div>
    <template v-for="item in items">
      <el-button class="button" @click="select(item)">{{ item.name }}</el-button>
    </template>

    <el-pagination v-if="total > 0" style="position:absolute;bottom: 20px;"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="28"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        currentPage: 1,
        total: 0,
        items: []
      }
    },
    mounted () {
      setTimeout(() => {
        this.loadData(0);
      }, 20)
    },
    methods: {
      handleCurrentChange(val) {
        this.loadData(val - 1)
      },
      loadData(page) {
        this.$axios({
          url: "v1/cars/seller-list",
          method: "POST",
          data: {
            total: 0,
            page: page,
            size: 28
          }
        }).then(res => {
          if (res.data.status == 2000) {
            this.total = parseInt(res.data.data.total)
            this.items = res.data.data.list
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      select(item) {
        this.$emit('setReSeller', { reSellerId:item.id, reSellerName:item.name });
      }
    }
  }
</script>

<style lang='less' scoped>
  .button {
    margin-bottom: 10px;
    margin-left: 0;
    margin-right: 8px;
    padding: 12px 2px;
    width: 110px;
    overflow: hidden;
    text-overflow:ellipsis
  }
</style>
