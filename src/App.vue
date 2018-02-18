<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div id="map-canvas"></div> -->

      
    <!-- <label>Street
      <input type="text" id="street" name="street" />
    </label>

    <label>Locality
      <input type="text" id="locality" name="locality" />
    </label>

    <label>Region
      <input type="text" id="region" name="region" />
    </label>

    <label>Country
      <input type="text" id="country" name="country" />
    </label>

    <label>Latitude
      <input type="text" id="latitude" name="latitude" />
    </label>

    <label>Longitude
      <input type="text" id="longitude" name="longitude" />
    </label> -->
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
