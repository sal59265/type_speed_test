<template>
  <div id="app">
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");
    background-size: cover;
    background-repeat: repeat-y;
    background-color: rgba(0,0,0,.6);
    background-blend-mode: multiply;
}
</style>
