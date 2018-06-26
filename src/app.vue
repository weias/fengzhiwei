<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    computed: {
      navState () {
        return this.$store.state.routerState;
      }
    },
    watch: {

    },
    mounted () {

    },
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100%;
  }
  #app.hasNav{
    padding-bottom: 50px;
  }
  html,#app,body{
    min-height: 100%;
    height: 100%;
  }
  body{
    font-size: 1.2rem;
  }
</style>
