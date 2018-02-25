<template>
  <div>
    <div class="modal-box insert-box">
      <div class="modal-box__body">
        <div class="close-button__container">     
          <button class="close-button small" v-on:click="$emit('toggleInsert')">
            <i class="material-icons">close</i>
          </button>
        </div>
          
        <p>Add Your postcode, or postcode you wish to instruct your lessons</p> 

        <input type="text" class="form-group" placeholder="Postcode" 
          v-model="postcode" v-if="editMode"
        />

        <!-- summary -->
        <p v-if="!editMode" class="result-text">{{ postcode }}</p>

        <div class="range-container">
          <p>How far are you willing to travel?</p> 

          <input type="number" class="form-group range" placeholder="Range" 
            v-model="range" v-if="editMode"
          />

          Miles
        </div>

        <!-- summary -->
        <p class="result-text" v-if="!editMode">{{ range }} Miles</p>

        <p class="api-response mt-3" v-if="addResponse.message"
          v-bind:class="[
            {'text-success': addResponse.valid},
            {'text-danger' : !addResponse.valid}
          ]"
        >
          {{ addResponse.message }}
        </p>
      </div>

      <!-- buttons -->
      <div class="button-container" v-if="editMode">
        <button class="base-button padded-button" v-on:click="proceed()">
          Proceed
        </button>
      </div>

      <div class="button-container summary" v-if="!editMode">
        <button class="base-button blue edit-button" v-on:click="toggleEditMode()">
          Edit 
        </button> 

        <div class="spacer"> </div>

        <button class="base-button" v-on:click="addCoverage()">
          <i class="fa fa-plus"></i> Coverage
        </button>
      </div>
     
      <!-- map -->
      <div class="map-container">
        <div id="map-canvas" v-bind:class="{'hide': this.editMode}"></div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'Vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import location from '../../../../../googleapis/location'


@Component({})
export default class InsertPostcode extends Vue {
  postcode: string = ''
  range: number = null
  addResponse = { valid: false, message: '' }
  editMode: boolean = true


  mounted() {
    location.init()
  }


  /** 
   * send postcode and range to API to be saved
   */
  addCoverage() {
    if (!this.validation()) { return }

    httpAuth.post('instructors-coverage', {
      postcode: this.postcode, 
      range: this.range
    })
      .then(() => {
        this.$emit('newCoverageAdded')
        this.close()
      })
  }

  /** 
   * 
   */
  proceed() {
    if (!this.validation()) { return }

    httpAuth.get(`postcode-lnglat/${this.postcode}`)
      .then(res => {
        this.toggleEditMode()

        this.$store.commit(
          'setGoogleapisLocation', 
          {long: Number(res.data.long), lat: Number(res.data.lat)}
        )

        this.$store.commit('setGoogleapisRadius', Number(this.range))
        location.init()
      })
      .catch(err => {
        this.addResponse.message = 'invalid postcode'
      })
  }

  /** 
   * 
   */
  toggleEditMode() {
    this.editMode = !this.editMode
  }

  /** 
   * 
   */
  validation() {
    this.addResponse.valid = false
    this.addResponse.message = ''

    if (!this.postcode) {
      this.addResponse.message = 'Postcode required'
      return 
    }

    if (!this.range) {
      this.addResponse.message = 'Range required'
      return 
    }

    return true
  }

  /** 
   * 
   */
  close() {
    this.$emit('close')
  }
}
</script>



<style lang="scss" scoped>
  .close-button__container {
    margin-bottom: 15px;
  }

  .button-container.summary {
    display: flex;
    justify-content: center;
    margin-top: 0;

    button {
      width: 130px;
      font-weight: normal;
    }
    
    .spacer {
      width: 30px;
    }
  }

 input {
    width: 200px;
    height: 40px;
    margin: 0;

    &.range {
      width: 100px;
    }
  }

  .range-container {
    margin-top: 30px;
  }

  .button-container {
    margin-top: 30px;
    padding-left: 20px;

    &.summary {
      padding-left: 0;
    }

    button {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .result-text {
    font-weight: bold;
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
    }
  }

  .map-container {
    padding: 20px 0 14px 0;

    #map-canvas {
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
</style>