<template>
  <div>
    <div class="white-modal-box__container">
      <div class="close-button__container">      
        <button class="close-button small" v-on:click="close()">
          <i class="material-icons">close</i>
        </button>
      </div>
        
      <p>Add Your postcode, or postcode you wish to instruct your lessons</p> 

      <input type="text" 
        class="form-group" 
        placeholder="postcode"
        v-model="postcode" 
        v-if="editMode"
      />

      <p v-if="!editMode" class="result-text">{{ postcode }}</p>

      <div class="range-container">
        <p>How far are you willing to travel to your learner drivers ?</p> 

        <input type="number" 
          class="form-group range" 
          placeholder="range" 
          v-model="range" 
          v-if="editMode"
        
        />
      </div>

      <p class="result-text" v-if="!editMode">{{ range }} Miles</p>

      <p class="api-response mt-3" v-if="addResponse.message"
        v-bind:class="[
          {'text-success': addResponse.valid},
          {'text-danger' : !addResponse.valid}
        ]"
      >
        {{ addResponse.message }}
      </p>

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
          <i class="fa fa-plus"></i> Add new coverage
        </button>
      </div>
    </div>

    <div id="map-canvas" v-bind:class="{'hide': this.editMode}"></div>
  </div>
</template>



<script lang="ts">
import Vue from 'Vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'

import location from '../../../../googleapis/location'


@Component({})
export default class AddPostcode extends Vue {
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
  margin-left: 20px;

  button {
    width: 190px;
    font-weight: normal;
  }

  .spacer {
    width: 30px;
  }
}

 input {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgb(200,200,200);
    padding-left: 20px;
    margin: 0;
  }

  input.range {
    width: 150px;
  }

  .range-container {
    margin-top: 30px;
  }

  .button-container {
    margin-top: 30px;
  }

  .result-text {
    font-weight: bold;
  }
</style>