<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app'
}
</script>

<style>
h1, h2, h3 {
  font-weight: normal;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

button {
  cursor: pointer;
}

</style>



<style lang="scss" src="./scss/master.scss" />
