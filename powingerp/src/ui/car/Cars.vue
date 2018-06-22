<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 8px;margin-left: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-input style="float: right;width: 100px;" clearable placeholder="搜索" v-model="keyword" @keyup.enter.native="search"></el-input>

    <car-item style="margin-top: 60px;" :items="cars"></car-item>

    <el-pagination v-if="total > 0"
                   style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="12"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import CarItem from '../../components/items/CarItem'
  export default {
    name: 'cars',
    components: { CarItem },
    data() {
      return {
        currentPage: 1,
        total: 0,
        keyword: '',
        cars: [],
      };
    },
    mounted () {
      setTimeout(() => {
        this.loadData(0);
      }, 20)
    },
    methods: {
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.loadData(val - 1)
      },
      search () {
        this.loadData(0)
      },
      loadData (page) {
//        console.log(this.keyword);
        this.$axios({
          url: "v1/car/list",
          method: "POST",
          data: {
            cid: '',
            page: page,
            size: 12,
            keyword: this.keyword
          }
        }).then(res => {
          if (res.data.status == 2000) {
            this.total = parseInt(res.data.data.total)
            this.cars = res.data.data.list
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
