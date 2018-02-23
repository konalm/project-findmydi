<template>
 <div class="modal-box map">
    <div class="modal-box__header">
      Map
    </div>

    <div class="modal-box__body">
      <div id="map-canvas"></div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import location from '../../../googleapis/location'

@Component({})
export default class CoverageMap extends Vue {
  mounted() {
    location.init()
  }
}
</script>


<style lang="scss" scoped>
  .modal-box.map {
    width: 425px;

    .modal-box__body {
      margin: 0;
      padding: 30px 0 30px 0;
    }
  }

  #map-canvas {
    width: 326px;
    height: 326px;
    margin: 0 auto; 
  }
</style>