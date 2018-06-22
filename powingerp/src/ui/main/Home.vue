<template>
  <div style="width: 940px;margin: 0 auto;">
    <h2 style="text-align: center;margin: 20px auto">宝盈保险业务管理平台</h2>
    <el-carousel class="carousel">
      <el-carousel-item v-for="item in focus">
        <img v-lazy="item.img"/>
      </el-carousel-item>
    </el-carousel>
    <router-link to="/cars">
      <el-button icon="el-icon-arrow-left" class="button" style="margin-left: 2px;margin-right: 8px">车辆管理</el-button>
    </router-link>
    <el-button class="button">保单管理</el-button>
    <el-button icon="el-icon-arrow-left" class="button" style="margin-left: 2px">客户管理</el-button>
    <el-button class="button">在线报价</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'home',
  data() {
    return {
      focus: [],
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  mounted () {
    this.focus = this.userInfo.focus;
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .carousel{
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .carousel img {
    width: 100%;
    height: 100%;
  }
  .button {
    width: 49%;
    height: 100px;
    margin-top: 20px;
  }
</style>
