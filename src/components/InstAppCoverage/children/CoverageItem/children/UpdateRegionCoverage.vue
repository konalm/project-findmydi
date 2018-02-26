<template>
  <div class="modal-box__body update-coverage-box">
    <region-dropdown v-model="region" :view="'update-region-coverage'" />

   
    <input type="number" class="range" placeholder="range" v-model="range" />
    Miles

    <!-- error message -->
    <p class="text-danger mt-3" v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <!-- buttons -->
    <div class="modal-box__button-container">    
      <button class="base-button secondary" v-on:click="updateMap()">
        See changed on map
      </button>

      <div class="spacer"></div>

      <button class="base-button" v-on:click="update()">
        Update 
      </button>
    </div>

    <!-- map -->
    <div class="map-container">
      <div id="map-canvas"></div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import {httpAuth} from '@/http-requests'
import RegionDropdown from '@/components/patterns/RegionPredictDropdown.vue'
import location from '../../../../../googleapis/location'

let geometry = {lng: '', lat: ''}


@Component({
  components: {
    RegionDropdown
  }
})
export default class updateRegionCoverage extends Vue {
  region: string = ''
  range: number = null 
  errorMessage: string = ''

  @Prop() coverage: {id, region, range, longitude, latitude}

  beforeMount() {
    this.region = this.coverage.region 
    this.range = this.coverage.range
    geometry = {lng: this.coverage.longitude, lat: this.coverage.latitude}    
  }

  mounted() {
    location.init([
      {
        longitude: this.coverage.longitude, 
        latitude: this.coverage.latitude,
        range: this.coverage.range
      }
    ])
  }

  /**
   * 
   */
  async updateMap() {
    this.errorMessage = ''

    if (this.region !== this.coverage.region) {
      await this.updateRegion()
    }

    location.init([
      {
        longitude: geometry.lng, 
        latitude: geometry.lat,
        range: this.range
      }
    ])
  }

  /** 
   * 
   */
  async updateRegion() {
    await httpAuth.get(`googleapis-geocode/${this.region}`)
      .then(res => {
        geometry = {
          lng: res.data.geometry.location.lng, 
          lat: res.data.geometry.location.lat
        }
      })
      .catch(err => {
        if (err.response.status === 422) {
          this.errorMessage =  err.response.data
        }
      })
  }

  /**
   * update region coverage 
   */
  update() {
    if (!this.validation()) { return }

    httpAuth.get(`googleapis-geocode/${this.region}`)
      .then(res => {
        geometry = res.data.geometry.location

        return httpAuth.put(`instructor-region-coverages/${this.coverage.id}`, {
          region: this.region,
          range: this.range,
          long: geometry.lng,
          lat: geometry.lat
        })
      })
      .then(res => {
        this.$emit('coverageUpdated')
      })
      .catch(err => {
        this.errorMessage = err.response.data 
      })
  }

  /**
   * validate inputs 
   */
  validation() {
    this.errorMessage = ''

    if (!this.region) {
      this.errorMessage = 'region is required'
      return false
    }

    if (!this.range) {
      this.errorMessage = 'range is required'
      return false
    }

    if (this.range <= 0) {
      this.errorMessage = 'range must be greater than 0'
      return false
    }

    return true
  }
}
</script>



<style lang="scss" scoped>
  .modal-box {
    .modal-box__body {
      text-align: left !important;
      padding-left: 20px;

      input {
        color: #918F8F;

        &.range {
          width: 69px;
          margin-bottom: 15px;
        }
      }

      .modal-box__button-container {
        margin: 10px -15px 0 -30px;

        .spacer {
          width: 30px;
        }

        button {
          width: 130px;
          height: auto;
        }
      }

      .map-container {
        padding: 20px 0 0 0;
        margin-left: -30px;
        margin-right: -15px;

        #map-canvas {
          margin: 0 auto;
          margin-bottom: 20px;
          width: 250px;
          height: 250px;
        }
      }
    }
  }
</style>