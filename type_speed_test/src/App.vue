<template>
  <div id="app">
    <Nav />
    <Home />
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav,
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
