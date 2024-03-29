<template>
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
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import location from '../../../../../googleapis/location'


@Component({})
export default class InsertPostcode extends Vue {
  postcode: string = ''
  range: number = null
  addResponse = { valid: false, message: '' }
  editMode: boolean = true


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

        location.init([
          {
            longitude: Number(res.data.long), 
            latitude: Number(res.data.lat),
            range: this.range
          }
        ])
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



<style lang="scss" scoped src="../../../../../scss/insert-coverage-box.scss" />