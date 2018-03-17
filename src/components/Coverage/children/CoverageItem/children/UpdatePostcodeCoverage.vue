<template>
   <div class="modal-box__body">
    <input type="text" placeholder="postcode" v-model="postcode" />
    <br />
    <input type="number" placeholder="range" class="range" v-model="range" />
    Miles
  
    <!-- error message -->
    <p class="text-danger mt-3" v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <!-- buttons -->
    <div class="modal-box__button-container">
      <button class="base-button secondary" v-on:click="updateMap()">
        See change on map
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
import {Prop, Watch} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'
import location from '../../../../../googleapis/location'

let geometry = {lng: '', lat: ''}


@Component({})
export default class postcodeCoverage extends Vue {
  postcode: string = ''
  range: number = null
  errorMessage: string = ''

  @Prop() coverage: {id, postcode, range, coverage_type, longitude, latitude}


  beforeMount() {
    this.postcode = this.coverage.postcode
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
   * update map to see how changes are effect cover
   * update postcode, get long and lat only if postcode was update
   * update range, only if range was updated
   */
  async updateMap() {
    this.errorMessage = ''

    if (this.postcode !== this.coverage.postcode) {
      await this.updatePostcode()
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
   * update postcode coverage
   */
  update() {
    if (!this.validation()) { return }

    httpAuth.put(`instructors-coverage/${this.coverage.id}`, {
      postcode: this.postcode,
      range: this.range
    })
      .then(res => {
        this.$emit('coverageUpdated')
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }

  /** 
   * check if postcode valid and get long & lat
   */
  async updatePostcode() {
    await httpAuth.get(`postcode-lnglat/${this.postcode}`)
      .then(res => {
        geometry = {lng: res.data.long, lat: res.data.lat}
      })
      .catch(err => {
        if (err.response.status === 422) {
          this.errorMessage = 'postcode not valid'
          return 
        }

        throw new Error(err)
      })
  }

  /**
   * validate inputs 
   */
  validation() {
    this.errorMessage = ''

    if (!this.postcode) {
      this.errorMessage = 'postcode is required'
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
      text-align: left;
      padding-left: 30px;
      padding-right: 15px;

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
    }
  }

  input {
    margin-bottom: 15px;
    width: 227px;
    color: #918F8F;

    &.range {
      width: 69px;
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
</style>