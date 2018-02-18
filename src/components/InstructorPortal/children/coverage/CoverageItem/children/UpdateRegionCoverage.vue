<template>
  <div>
    <region-dropdown v-model="updateRegion" />

    <br />
    <input type="number" class="range" placeholder="range" v-model="updateRange" />

    <p class="text-danger mt-3" v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <div class="white-modal-box__button-container">    
      <button class="small green" v-on:click="$emit('toggleEditMode')">
        cancel
      </button>

      <button class="small blue" v-on:click="update()">
        update 
      </button>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import {httpAuth} from '@/http-requests'
import RegionDropdown from '@/components/patterns/RegionPredictDropdown.vue'

let geometry = {lng: '', lat: ''}


@Component({
  components: {
    RegionDropdown
  }
})
export default class UpdateRegionCoverage extends Vue {
  updateRegion: string = ''
  updateRange: number = null 
  errorMessage: string = ''

  @Prop() coverageItem: {id, region, range}

  beforeMount() {
    this.updateRegion = this.coverageItem.region 
    this.updateRange = this.coverageItem.range
  }

  /**
   * update region coverage 
   */
  update() {
    if (!this.validation()) { return }

    httpAuth.get(`googleapis-geocode/${this.updateRegion}`)
      .then(res => {
        geometry = res.data.geometry.location

        console.log('geometry ---->')
        console.log(geometry)

        return httpAuth.put(`instructor-region-coverages/${this.coverageItem.id}`, {
          region: this.updateRegion,
          range: this.updateRange,
          long: geometry.lng,
          lat: geometry.lat
        })
      })
      .then(res => {
        this.$emit('coverageModified')
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

    if (!this.updateRegion) {
      this.errorMessage = 'region is required'
      return false
    }

    if (!this.updateRange) {
      this.errorMessage = 'range is required'
      return false
    }

    if (this.updateRange <= 0) {
      this.errorMessage = 'range must be greater than 0'
      return false
    }

    return true
  }
}
</script>


<style lang="scss" scoped>
  input {
    margin-bottom: 15px;

    &.region {
      width: 350px;
    }

    &.range {
      width: 100px;
      margin-bottom: 15px;
    }
  }
</style>