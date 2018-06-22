<template>
    <div>
      <top-bar></top-bar>
      <router-view class="page-component-wrap animated fadeIn"></router-view>
      <!--<router-view></router-view>-->
    </div>
</template>
<script>
import TopBar from '@/components/TopBar'
import '@/directives/customTitle.js'
export default {
  name: 'layout',
  components: {
    'top-bar': TopBar,
  }
}
</script>

