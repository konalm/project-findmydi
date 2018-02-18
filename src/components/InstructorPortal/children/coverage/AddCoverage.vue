<template>
<div class="instructor-portal__add-coverage">
  <add-coverage-choice
    v-on:selectCoverageType="selectCoverageType" 
    v-on:close="toggleAdd()"
    v-if="chooseCoverage && addCoverage"
  />
 
  <button class="base-button green large-button" 
    v-if="!addCoverage"
    v-on:click="toggleAdd()"
  > 
    <i class="fa fa-plus" aria-hidden="true"></i>  Coverage
  </button>

  <add-postcode 
    v-if="addPostcodeCoverage" 
    v-on:close="close()" 
    v-on:newCoverageAdded="$emit('newCoverageAdded')" 
  />

  <add-region 
    v-if="addRegionCoverage" 
    v-on:close="close()" 
    v-on:newCoverageAdded="$emit('newCoverageAdded')"     
  />
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import AddCoverageChoice from './AddCoverageChoice.vue'
import AddPostcode from './AddPostcode.vue'
import AddRegion from './AddRegion.vue'


@Component({
  components: {
    AddCoverageChoice,
    AddPostcode,
    AddRegion
  }
})
export default class AddCoverage extends Vue {
  addCoverage: boolean = false
  chooseCoverage: boolean = false
  addPostcodeCoverage: boolean = false 
  addRegionCoverage: boolean = false
  postcode: string = ''
  range: number = null
  addResponse = { valid: false, message: '' }

  /**
   * Toggle Add true/false for UI
   */
  toggleAdd() {
    this.addCoverage = !this.addCoverage
    this.chooseCoverage = !this.chooseCoverage

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
   * select type of coverage to be added in UI 'Postcode' or 'Region'
   */
  selectCoverageType(type) {
    console.log('select coverage type')
    console.log(type)
    
    switch (type) {
      case 'postcode':
        this.addPostcodeCoverage = true 
        break
      case 'region':
        this.addRegionCoverage = true
        break
    }

    this.chooseCoverage = false
  }

  /** 
   * 
   */
  close() {
    this.addCoverage = false
    this.chooseCoverage = false
    this.addPostcodeCoverage = false
    this.addRegionCoverage = false
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