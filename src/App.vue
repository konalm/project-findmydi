<template>
  <div id="app">
    <router-view></router-view>
  </div> 
</template>



<script lang="ts">
import 'bootstrap'

export default {
  name: 'app'
}
</script>



<style>
h1, h2, h3 {
  font-weight: normal;
}

#app {
  height: 100%;
  width: 100%;
}

button {
  cursor: pointer;
}

#map-canvas {
  width: 300px;
  height: 300px;
  margin-bottom: 1em;
}

</style>



<style lang="scss" src="./scss/master.scss" />
