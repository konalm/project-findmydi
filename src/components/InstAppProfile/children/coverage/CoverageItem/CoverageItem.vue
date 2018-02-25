<template>
<div class="white-modal-box__container">
  <div v-if="!editMode">
    <p v-if="coverageItem.coverage_type === 'postcode'">
      Postcode: {{ coverageItem.postcode }} 
    </p> 

    <p v-if="coverageItem.coverage_type === 'region'">
      Region: {{ coverageItem.region }}
    </p>

    <p>Range: {{ coverageItem.range }} </p>
  </div>

  <postcode-update 
    v-if="editMode && coverageItem.coverage_type === 'postcode'" 
    :coverageItem="coverageItem"
    v-on:toggleEditMode="toggleEditMode()"
    v-on:coverageModified="coverageModified()"
  />

  <region-update 
    v-if="editMode && coverageItem.coverage_type === 'region'"
    :coverageItem="coverageItem"
    v-on:toggleEditMode="toggleEditMode()"
    v-on:coverageModified="coverageModified()"
  />

  <div class="white-modal-box__button-container" v-if="!editMode">
    <button class="small blue" v-on:click="toggleEditMode()">
      edit 
    </button>

    <button class="small green" v-on:click="destroy()">
      delete 
    </button>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'

import PostcodeUpdate from './children/UpdatePostcodeCoverage.vue'
import RegionUpdate from './children/UpdateRegionCoverage.vue'

@Component({
  components: {
    PostcodeUpdate,
    RegionUpdate
  }
})
export default class CoverageItem extends Vue {
  editMode: boolean = false 
  errorMessage: string = ''

  @Prop() coverageItem: {id, postcode, range, coverage_type}


  /**
   * toggle edit mode true/false for UI
   */
  toggleEditMode() {
    this.editMode = !this.editMode
  }

  /** 
   * toggle edit mode off and emit event to parent that coverage was modified
   */
  coverageModified() {
    this.toggleEditMode()
    this.$emit('coverageModified')
  }

  /**
   * delete coverage
   */
  destroy() {
    httpAuth.delete(`instructors-coverage/${this.coverageItem.id}`)
      .then(() => {
        this.$emit('coverageModified');
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }
}
</script>



<style lang="scss" scoped>
.white-modal-box__container {
  input {
    margin-bottom: 15px;
  }
}
</style>