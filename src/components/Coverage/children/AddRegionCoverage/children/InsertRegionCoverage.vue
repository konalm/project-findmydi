<template>
<div class="modal-box insert-box insert-region-coverage">
  <div class="modal-box__body">
    <div class="close-button__container">
      <button class="close-button small" v-on:click="$emit('toggleInsert')">
        <i class="material-icons">close</i>
      </button>
    </div>

    <p class="region-text">Enter region with your city or another you wish to 
      instructor your student.
    </p>

    <region-dropdown v-model="region" />
    
    <p class="api-response mt-3 text-danger" v-if="addRegionResponse">
      {{ addRegionResponse }}
    </p>

    <div class="button-container">
      <button class="base-button padded-button" v-on:click="addRegion()" 
        v-if="editRegion"
      >
        Proceed
      </button>

      <button class="base-button padded-button" v-on:click="toggleEditRegion()"
        v-if="!editRegion"
      >
        Edit Region 
      </button>
    </div>  

    <!-- range -->
    <div class="range-container" v-if="!editRegion">
      <p>How far are you willing to travel to instructor your lessons ?</p> 

      <input type="number" class="range" v-model="range" /> Miles
    </div>

    <p class="api-response mt-3 text-danger" v-if="addCoverageResponse">
      {{ addCoverageResponse }}
    </p>

    <!-- add new coverage -->
    <div class="button-container add-coverage" v-if="!editRegion">
      <button class="base-button padded-button" v-on:click="addCoverage()">
          <i class="fa fa-plus"></i> Coverage 
      </button>
    </div>
  </div>

  <!-- google map -->
  <div class="map-container" v-bind:class="{'hide': this.editRegion}">
    <div id="map-canvas"></div>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'
import RegionDropdown from '@/components/patterns/RegionPredictDropdown.vue'
import axios from 'axios'

import location from '../../../../../googleapis/location'

let geometry = {lng: '', lat: ''}

@Component({
  components: {
    RegionDropdown
  }
})
export default class AddRegion extends Vue {
  region: string = ''
  range: number = 0
  addRegionResponse: string = ''
  addCoverageResponse: string = ''
  predictions = []
  editRegion: boolean = true
  editRange: boolean = false


  @Watch('range')
  onRangeChanged(val: string, oldVal: string) {
    if (this.range <= 0) { return }

    location.init([
      {
        longitude: Number(geometry.lng), 
        latitude: Number(geometry.lat),
        range: Number(this.range)
      }
    ])
  }

  /** 
   * emit event to parent to close the add coverage component
   */
  close() {
    this.$emit('close')
  }

  /** 
   * get longitude and latitude of region from the api
   */
  addRegion() {
    if (!this.regionValidation()) { return }
    
    /* reset range to 0 as user may have used previously */ 
    this.$store.commit('setGoogleapisRadius', 0)
    
    httpAuth.get(`googleapis-geocode/${this.region}`)
      .then(res => {
          this.editRegion = false 
          this.editRange = true
          geometry = res.data.geometry.location

          location.init([
            {
              longitude: Number(geometry.lng), 
              latitude: Number(geometry.lat),
              range: 0
            }
          ])
      })
      .catch(err => {
        this.addRegionResponse = err.response.data
      })
  }

  /** 
   * add instructor coverage model
   */
  addCoverage() {
    if (!this.coverageValidation()) { return }

    httpAuth.post(`instructor-region-coverages`, {
      region: this.region,
      long: geometry.lng,
      lat: geometry.lat,
      range: this.range
    })
      .then(res => {
        this.$emit('newCoverageAdded')
      })
      .catch(err => {
        this.addCoverageResponse = err.response.data
      })
  }

  /** 
   * 
   */
  regionValidation() {
    this.addRegionResponse = ''

    if (!this.region) {
      this.addRegionResponse = 'Region is required'
      return 
    }

    return true
  }

  /** 
   * 
   */
  coverageValidation() {
    if (!this.region) { 
      this.addCoverageResponse = 'region is required'
      return 
    }

    if (!this.range) { 
      this.addCoverageResponse = 'range is required'
      return 
    }

    if (this.range <= 0) {
      this.addCoverageResponse = 'range must be greater than 0'
      return 
    }

    return true
  }

  /** 
   * toggle edit region booelean
   */
  toggleEditRegion() {
    this.editRegion = !this.editRegion
  }
}
</script>



<style lang="scss" scoped>
.close-button__container {
  margin-bottom: 15px;
}

.region-search-container {
  margin-bottom: 15px;

  input {
    width: 350px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgb(200,200,200);
    padding-left: 20px;
    margin: 0;
  }
}

.region-text {
  margin-bottom: 15px;
}

.region-result {
  font-weight: bold;
}

.button-container {
  margin-top: 30px;
}

.range-container {
  margin-top: 30px;
}

input {
  width: 350px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid rgb(200,200,200);
  padding-left: 20px;
  margin: 0;

  @media screen and (max-width: 650px) {
    width: 100px;
  }
}

input.range {
  width: 100px;
}

.modal-box {
  width: 376px;

  .modal-box__body {
    padding-left: 20px;
    padding-top: 20px;
    margin-bottom: 0;

    p {
      font-size: 16px;
    }

    input.region-input {
      width: 350px;

      @media screen and (max-width: 650px) {
        width: 100px;
      }
    }
  }
}

.map-container {
  padding: 20px 0 14px 0;

  #map-canvas {
    width: 220px;
    height: 220px;
    margin: 0 auto;
  }
}

</style>

<style lang="scss">
.modal-box.insert-region-coverage {
  .region-search-container {
    @media screen and (max-width: 650px) {
      width: 100%; 
    }

    input, ul {
      @media screen and (max-width: 650px) {
        width: 80%;
      }

      @media screen and (max-width: 550px) {
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss" scoped src="../../../../../scss/insert-coverage-box.scss" />