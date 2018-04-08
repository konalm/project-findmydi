<template>
  <div class="add-coverage-box-container" 
    v-bind:class="{'insert-mode' : insertPostcode}"
  >
    <div class="add-coverage-box" v-on:click="toggleInsert()" 
      v-if="!insertPostcode"
    >
      <i class="fa fa-plus"></i> 
      <div class="spacer"></div>
      Postcode
    </div>

    <insert-postcode v-if="insertPostcode" 
      v-on:toggleInsert="toggleInsert()" 
      v-on:newCoverageAdded="newCoverageAdded()"
    />
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import InsertPostcode from './children/InsertPostcodeCoverage.vue'


@Component({
  components: {
    InsertPostcode
  }
})
export default class AddPostcodeCoverage extends Vue {
  insertPostcode: boolean = false


  /** 
   * toggle instert postcode state 
   */
  toggleInsert() {
    this.insertPostcode = !this.insertPostcode
    this.$emit('insertPostcodeChanged', this.insertPostcode)
  }

  /** 
   * toggle insert off and emit event to parent to re-get covergages
   */
  newCoverageAdded() {
    this.toggleInsert()
    this.$emit('newCoverageAdded')
  }
}
</script>
