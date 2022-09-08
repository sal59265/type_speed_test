<template>
<div class="main-header">
  <nav>
    <router-link  class="rout-link" to="/" name="Home">Type Speed Test</router-link>
  </nav>
</div>
</template>ee

<script>
  export default {
    name: 'Nav'
  }
</script>
<style>
  nav {
    text-align: center;
    display:flex;
    font-size: 20px;
    align-items: center;
    background-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.8));
    padding-bottom: 10px;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 10%);
  transition: 0.8s ease;
  }

  .rout-link {
  margin: 2em;
  font-family: "Roboto Condensed", sans-serif;
  color: #5f6368;
  }

  .button {
    border-radius: 4px;
  background: #005fff;
  border: 1px solid #005fff;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  padding: 0.7rem 1.2rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease;
  }

  a {
  text-decoration: none;
}

</style>