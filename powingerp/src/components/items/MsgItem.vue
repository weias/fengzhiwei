<template>
  <div class="content">
    <template v-for="item in items">
      <p>{{ item.title }}</p>
      <p>{{ item.message }}</p>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'msg-item',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang='less' scoped>
</style>
