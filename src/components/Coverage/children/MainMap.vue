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
import {Prop, Watch} from 'vue-property-decorator'


@Component({})
export default class CoverageMap extends Vue {
  @Prop() coverages: [Object]

  @Watch('coverages')
  onCoveragesChanged(val, oldVal: string) {
    this.coverages = val

    if (this.coverages) {
      location.init(this.coverages)
    }
  }
}
</script>


<style lang="scss" scoped>
  .modal-box.map {
    width: 425px;

    @media screen and (max-width: 900px) {
      border: 1px solid green;
      width: 350px;
    }

    @media screen and (max-width: 800px) {
      width: 250px;
    }

    @media screen and (max-width: 650px) {
      width: 80%;
      margin: 0 auto;
    }

    @media screen and (max-width: 550px) {
      width: 90%;
    }

    .modal-box__body {
      margin: 0;
      padding: 30px 0 30px 0;
    }
  }

  #map-canvas {
    width: 326px;
    height: 326px;
    margin: 0 auto; 

    @media screen and (max-width: 900px) {
      width: 300px;
      height: 300px;
    }

    @media screen and (max-width: 800px) {
      width: 200px;
      height: 200px;
    }

    @media screen and (max-width: 650px) {
      width: 250px;
      height: 250px;
    }
  }
</style>