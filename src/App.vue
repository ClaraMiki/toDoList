<template>
  <div id="app">
    <Menu />
    <router-view/>
  </div>
</template>


<script>
import Menu from './components/Menu.vue'

export default {
  components: {
    Menu
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3b2323;
  padding: 0 30px;
}
</style>
