<template>
<div class="instructor-portal__add-coverage">
  <div class="white-modal-box__container" v-if="addCoverage">
    <p>Add Your postcode, or postcode you wish to instruct your lessons</p> 

    <input type="text" class="form-group" placeholder="postcode"
      v-model="postcode" 
    />

    <p>How far are you willing to travel to your learner drivers ?</p> 

    <input type="number" class="form-group" placeholder="range" 
      v-model="range" 
    />

    <p class="api-response mt-3" v-if="addResponse.message"
      v-bind:class="[
        {'text-success': addResponse.valid},
        {'text-danger' : !addResponse.valid}
      ]"
    >
      {{ addResponse.message }}
    </p>
  </div>

  <button class="base-button green large-button" 
    v-if="!addCoverage"
    v-on:click="toggleAdd()"
  > 
    <i class="fa fa-plus" aria-hidden="true"></i> 
    Postcode 
  </button>

  <div class="button-container" v-if="addCoverage">
    <button class="base-button blue" v-on:click="toggleAdd()">
      Cancel
    </button>

    <div class="spacer"></div>

    <button class="base-button" v-on:click="addNewCoverage()">
      Add New Postcode 
    </button>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'

@Component({})
export default class AddCoverage extends Vue {
  addCoverage: boolean = false
  postcode: string = ''
  range: number = null
  addResponse = { valid: false, message: '' }

  /**
   * Toggle Add true/false for UI
   */
  toggleAdd() {
    this.addCoverage = !this.addCoverage

    if (!this.addCoverage) {
      this.addResponse.message = ''
      this.postcode = ''
      this.range = null
    }
  }

  /**
   * send http psot request to the API to add new coverage model
   */
  addNewCoverage() {
    if (!this.validate()) { return }

    httpAuth.post('instructors-coverage', {
      postcode: this.postcode,
      range: this.range
    })
      .then(() => {
        this.addResponse.valid = true 
        this.addResponse.message = 'New coverage added'
        this.$emit('newCoverageAdded')
        this.toggleAdd()
      })
      .catch(err => {
        this.addResponse.valid = false
        this.addResponse.message = err.response.data
      })
  }

  /**
   * validate user inputs 
   */
  validate() {
    this.addResponse.valid = false 
    
    if (!this.postcode) {
      this.addResponse.message = 'postcode is required'
      return false 
    }

    if (!this.range) {
      this.addResponse.message = 'range is required'
      return false
    }

    return true
  }
}
</script>



<style lang="scss" scoped>
.instructor-portal__add-coverage {
  .button-container {
    display: flex; 

    button {
      width: 50%;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .spacer {
      width: 20px;
    }
  }
}
</style>