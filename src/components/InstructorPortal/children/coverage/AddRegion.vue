<template>
  <div>
    <div class="white-modal-box__container">
      <div class="close-button__container">
        <button class="close-button small" v-on:click="close()">
          <i class="material-icons">close</i>
        </button>
      </div>

      <p class="region-text">Enter region with your city or another you wish to instructor your 
        student.
      </p>

      <!-- region search -->
      <div class="region-search-container dropdown">
        <input type="text"
          class="dropdown-toggle region-input"
          placeholder="Enter region"
          v-model="region"
          id="regionSearch"
          data-toggle="dropdown"
          v-if="editRegion"
        />

        <p class="region-result" v-if="!editRegion"> {{ region }}</p>

        <ul class="dropdown-menu" 
          aria-labelledby="regionSearch" 
          v-if="predictions && predictions.length > 0"
        >
          <li 
            v-for="prediction in predictions" 
            v-on:click="selectRegion(prediction.description)"
            :key="prediction.description"
          >
            {{ prediction.description }}
          </li>

          <li class="dropdown-footer">
            Select region
          </li>
        </ul>
      </div>
  
      <p class="api-response mt-3 text-danger" v-if="addRegionResponse">
        {{ addRegionResponse }}
      </p>

      <div class="button-container">
        <button class="base-button padded-button" v-on:click="addRegion()" v-if="editRegion">
          Proceed
        </button>

        <button class="base-button padded-button" 
          v-on:click="toggleEditRegion()"
          v-if="!editRegion"
        >
          Edit Region 
        </button>
      </div>  

      <!-- range -->
      <div class="range-container" v-if="!editRegion">
        <p>How far are you willing to travel to instructor your lessons ?</p> 

        <input type="number" class="range" v-model="range" />
      </div>


      <p class="api-response mt-3 text-danger" v-if="addCoverageResponse">
        {{ addCoverageResponse }}
      </p>

      <!-- add new coverage -->
      <div class="button-container add-coverage" v-if="!editRegion">
        <button class="base-button padded-button" v-on:click="addCoverage()">
          Add New Coverage 
        </button>
      </div>
    </div>

    <!-- google map -->
    <div id="map-canvas" v-bind:class="{'hide': this.editRegion}"></div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'
import axios from 'axios'

import location from '../../../../googleapis/location'

let geometry = {lng: '', lat: ''}

@Component({})
export default class AddRegion extends Vue {
  region: string = ''
  range: number = 0
  addRegionResponse: string = ''
  addCoverageResponse: string = ''
  predictions = []
  editRegion: boolean = true
  editRange: boolean = false


  /**
   * on every region change >> send api request to get google places 
   * predictions for region
   */
  @Watch('region')
  onRegionChanged(val: string, oldVal: string) {
    if (!this.region) { return }

    this.googlePlacesPredictionApiRequest()
  }

  @Watch('range')
  onRangeChanged(val: string, oldVal: string) {
    if (this.range <= 0) { return }

    this.$store.commit('setGoogleapisRadius', Number(this.range))
    location.init()
  }


  /**
   * assign region to result selected in the UI
   */
  selectRegion(desc) {
    this.region = desc
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
          
          this.$store.commit(
            'setGoogleapisLocation', 
            {long: geometry.lng, lat: geometry.lat} 
          )

          location.init()
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
        this.close();
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

  /**
   * send region input to google api to predict users region
   */
  googlePlacesPredictionApiRequest() {
    httpAuth.get(`googleapis-autocomplete/${this.region}`)
      .then(res => {
        this.predictions = res.data
      })
      .catch(err => {
        throw new Error(err)
      })
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

  ul.dropdown-menu {
    width: 350px;
    margin: 0;
    padding: 0;
    font-size: 40px;

    li {
      padding: 15px 0 15px 15px;
      border-bottom: 1px solid rgb(235,235,235);
      cursor: pointer;
      color: rgb(100,100,100);
      list-style: circle inside none;
      font-size: 16px;
    }

    li:hover {
      background-color: #F0FAFF;
    }

    li.dropdown-footer {
      border: none;
      text-align: center;
      padding: 35px 0 5px 0;
      list-style: none;
      font-weight: 450;
      color: #404040;
      cursor: auto;
    }

    li.dropdown-footer {
      background: none;
    }
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
  }

  input.range {
    width: 150px;
  }
</style>
