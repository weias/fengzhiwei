<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 8px;margin-left: 20px">
      <el-breadcrumb-item :to="{ path: '/message' }">消息</el-breadcrumb-item>
      <el-breadcrumb-item>{{ msgTitle }}</el-breadcrumb-item>
    </el-breadcrumb>

    <msg-item style="margin-top: 10px;" :items="msgs"></msg-item>

    <el-pagination v-if="total > 0"
                   style="margin-top: 20px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage"
                   :page-size="10"
                   layout="total, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import MsgItem from '../../components/items/MsgItem'
  export default {
    name: 'msg',
    components: { MsgItem },
    data() {
      return {
        msgTitle: '',
        msgType: '',
        currentPage: 1,
        total: 0,
        keyword: '',
        msgs: [],
      };
    },
    mounted () {
      this.getQuery()
      this.refresh(0)
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.refresh(val - 1)
      },
      async getQuery () {
        const { query } = this.$route
        this.msgType = query.type
        this.msgTitle = query.title
      },
      search () {
        this.refresh(0)
      },
      refresh (page) {
        console.log(this.keyword);
        this.$axios({
          url: "v1/message/list",
          method: "POST",
          data: {
            type: this.msgType,
            page: page,
            size: 10,
            keyword: this.keyword
          }
        }).then(res => {
          if (res.data.status == 2000) {
            this.total = parseInt(res.data.data.total)
            this.msgs = res.data.data.list
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
