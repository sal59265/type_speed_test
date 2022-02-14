<template>
<div class="main-header">
  <nav>
    <router-link  class="rout-link" to="/" name="Home">Home</router-link>
    <router-link class="rout-link" to="/leaderboard" name="LeaderBoard">Leader Board</router-link>
  </nav>
</div>
</template>

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
    padding-bottom: 40px;
  }

  .rout-link {
  margin: 2em;
  font-family: "Roboto Condensed", sans-serif;
  color: #5f6368;
  }

  

  a {
  text-decoration: none;
}

</style>