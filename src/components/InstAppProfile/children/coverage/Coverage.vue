<template>
<div class="white-modal-box instructor-portal__coverage">
  <p class="modal-box-header">Coverage</p>

  <coverage-item
    v-for="coverageItem in coverage"
    :key="coverageItem.postcode"
    :coverageItem="coverageItem"
    v-on:coverageModified="$emit('coverageModified')"
  />

  <add-coverage 
    v-on:newCoverageAdded="$emit('coverageModified')" 
  />
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import AddCoverage from './AddCoverage.vue'
import CoverageItem from './CoverageItem'


@Component({
  components: {
    AddCoverage,
    CoverageItem
  }
})
export default class Profile extends Vue {
  editMode: boolean = false
  postcode: string = ''
  range: string = ''

  @Prop() coverage: [Object]


  /**
   * toggle edit mode on/off for UI
   */
  toggleEditMode() {
    this.editMode = !this.editMode
  }
}
</script>



<style lang="scss">
.instructor-portal__coverage {
  margin-bottom: 40px;
}


</style>