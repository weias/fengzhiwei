<template>
    <div class="content">
      <router-link :to="{path: '/addCar'}">
        <li v-for="item in items">
          <img v-lazy="item.surfaceImg || defaultCarIcon">
          <h3>{{ item.plateNumber || item.tempNumber }}</h3>
          <template v-for="tag in item.tag">
            <el-tag style="float: right;color: #ffffff" size="mini" v-bind:style="{background: tag.color}">{{ tag.name }}</el-tag>
          </template>
          <p style="margin-top: 3px;margin-bottom: 3px">{{ item.driverName }}</p>
          <p style="margin-top: 3px;margin-bottom: 3px">{{ item.brandText }}</p>
        </li>
      </router-link>
    </div>
</template>

<script>
  export default {
    name: 'car-item',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        defaultCarIcon: require('../../assets/img/car_default.png')
//        defaultCarIcon: '../../static/img/car_default.png'
      }
    }
  }
</script>

<style lang='less' scoped>
  .content {
    position: relative;
    display: block;
    overflow: hidden;
    background: #ffffff;
    padding: 1px;

    li {
      float: left;
      width: 50%;
      list-style-type:none
    }

    img {
      width: 80px;
      height: 80px;
      float: left;
    }
    h3 {
      font-size: 18px;
      color: #333333;
      margin-top: 6px;
      margin-bottom: 6px;
    }
    p {
      font-size: 16px;
      color: #8d8d8d;
    }
  }
</style>
