<template>
  <layout :infoBox="true" :previousView="'/intro/hourly-rate'">
    <span slot="stepHeader">Coverage</span>

    <span slot="introStep" v-if="allowedAccess" class="coverage-step"> 
      <p>Add your postcode, or postcode you wish to instruct your lessons</p>

      <input type="text" class="form-group" placeholder="Postcode" 
        v-model="postcode"
        v-if="!coverageAdded" 
      />

      <p v-if="coverageAdded"> <strong>{{ postcode }}</strong> </p>

      <div class="range-container">
        <p> How far are you willing to travel</p>

        <p v-if="!coverageAdded">  
          <input type="text" class="form-group range" placeholder="Range" 
            v-model="range" 
          /> Miles
        </p>

        <p v-if="coverageAdded"> <strong>{{ range }} Miles</strong> </p>
      </div>

      <!-- error -->
      <p v-if="errorMessage" class="text-danger"> 
        {{ errorMessage }} 
      </p>

      <!-- map -->
      <div>
        <div id="map-canvas" v-bind:class="{'hide': !coverageAdded}"></div>
      </div>
      
      <!-- buttons -->
      <button class="base-button padded-button blue form-button" 
        v-on:click="iniMapWithCoverageData()"
        v-if="!coverageAdded"
      >
        <i class="fa fa-plus"></i> Coverage 
      </button>

      <button class="base-button padded-button blue form-button" 
        v-on:click="toggleCoverageAdd()"
        v-if="coverageAdded"
      >
        Edit
      </button>
    </span>

    <!-- proceed -->
    <button slot="proceedButton" class="base-button padded-button"
      v-on:click="proceed()" 
      v-if="coverageAdded"
    >
      Proceed 
    </button>


    <p slot="infoText"> 
      More coverages can be added in application.
    </p>
  </layout>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './Layout'
import {httpAuth} from '@/http-requests'
import router from '@/router'
import location from '../../googleapis/location'

let existingCoverage = {id: null, postcode: null, range: null}


@Component({
  components: {
    Layout
  }
})
export default class InductionCoverage extends Vue {
  postcode: string = ''
  range: number = null
  allowedAccess: boolean = false
  errorMessage: string = ''
  coverageAdded: boolean = false
  iniMap: boolean = false
  existingCoverage: boolean = false


  mounted() {
    this.getInductionInfo()
  }

  /**
   * toggle coverage add
   */
  toggleCoverageAdd() {
    this.coverageAdded = !this.coverageAdded
  }

  /** 
   * get instructor induction info 
   */
  async getInductionInfo() {
    try {
      var response = await httpAuth.get('instructor-induction-info')
    } catch (err) {
      throw Error(err.response.data)
    }

    if (!response.data.hourly_rate) {
      return router.push('/induction/hourly-rate')
    }

    this.handleExistingCoverage(response)
    this.allowedAccess = true 
    this.$store.commit('setInductionInfo', response.data)    
  }


  /** 
   * if existing coverage, then handle coverage for update 
   */
  handleExistingCoverage(response) {
    const coverages = JSON.parse(response.data.coverages)

    if (coverages[0] === null) { return }

    this.existingCoverage = true
    existingCoverage = coverages[0]
    this.postcode = existingCoverage.postcode 
    this.range = existingCoverage.range
    this.iniMapWithCoverageData()
  }

  /** 
   * get postcode & radius too display on map 
   */
  iniMapWithCoverageData() {
    if (this.validation()) { return }

    httpAuth.get(`postcode-lnglat/${this.postcode}`)
      .then(res => {
        const geoData = {
          longitude: res.data.long,
          latitude: res.data.lat,
          range: this.range 
        }

        this.coverageAdded = true
        location.init([geoData])
      })
      .catch(err => {
        this.errorMessage = 'invalid postcode'
      })
  }

  /** 
   * check data valid
   * create coverage
   * redirect to next step (profile pic)
   */
  async proceed() {
    if (this.validation()) { return }

    if (!this.existingCoverage) {
      try {
        await this.createCoverage()
      } catch (err) {
        return this.errorMessage = err.message
      }

      return router.push('/induction/profile-picture')
    }
    
    try {
      await this.updateCoverage()
    } catch (err) {
      return this.errorMessage = err.message
    }
    
    router.push('/induction/profile-picture')
  }


  /** 
   * http request to create coverage in the API
   */
  async createCoverage() {
    const formData = {postcode: this.postcode, range: this.range}

    try {
      var response = await httpAuth.post('instructors-coverage', formData)
    } catch (err) {
      throw Error(err.response.data)
    }
  }

  /** 
   * http request to update coverage in the API
   */
  async updateCoverage() {
    try {
      var response =
        await httpAuth.put(`instructors-coverage/${existingCoverage.id}`, {
          id: existingCoverage.id, 
          postcode: this.postcode,
          range: this.range
        })
    } catch (err) {
      throw Error(err.response.data)
    }
  }

  /** 
   * validate add coverage 
   */
  validation() {
    this.errorMessage = ''

    if (!this.postcode) {
      return this.errorMessage = 'Postcode is required'
    }

    if (!this.range) {
      return this.errorMessage = 'Range is required'
    }
  }
}
</script>



<style lang="scss" scoped>
  button.form-button {
    margin-top: 20px;
  }

  .range-container {
    margin-top: 20px;

    input {
      width: 100px;
      margin-right: 7px;
    }
  }

  .map-canvas-container {
    width: 500px;
    height: 500px;
    border: 1px solid green;

    #map-canvas {
      width: 150px;
      height: 150px;
    }
  }

  #map-canvas {
    width: 200px;
    height: 200px;
    position: absolute !important;
    top: 70px;
    right: 7%;
  }
</style>

