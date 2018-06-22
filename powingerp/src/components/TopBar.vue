<template>
  <div>
    <el-menu :default-active="'/home'" :unique-opened="isUnique" :router="isRouter" mode="horizontal">
      <template v-for="item in menus">
        <el-menu-item :index="item.router" :key="item.router">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "topbar",
    data() {
      return {
        isUnique: true,
        isRouter: true,
        menus: [{
          name: '首页',
          router: '/home',
          children: []
        }, {
          name: '消息',
          router: '/message',
          children: []
        }, {
          name: '代办事项',
          router: '/task',
          children: []
        }, {
          name: '我',
          router: '/me',
          children: []
        }]
      };
    }
  };
</script>
