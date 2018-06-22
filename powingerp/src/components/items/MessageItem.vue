<template>
  <div>
    <template v-for="item in items">
      <router-link class="content" :to="{path: '/msg', query: { type: item.type, title: item.name }}">
        <img :src="item.surfaceImg">
        <h3>{{ item.name }}</h3>
        <p>{{ item.desc }}</p>
        <el-badge v-if="parseInt(item.unReadNum) > 0" style="float: right" :value="parseInt(item.unReadNum)" />
      </router-link>
    </template>
  </div>
</template>

<script>
  import { hostDomain } from '@/global/global'
  export default {
    name: 'message-item',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        hostDomain,
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

    img {
      width: 80px;
      height: 80px;
      float: left;
    }
    h3 {
      font-size: 18px;
      color: #333333;
    }
    p {
      font-size: 16px;
      color: #8d8d8d;
      margin-bottom: 0;
    }
  }
</style>
