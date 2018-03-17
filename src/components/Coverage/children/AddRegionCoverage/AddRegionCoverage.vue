<template>
  <div>
    <div class="add-coverage-box" v-on:click="toggleInsert()" v-if="!insertRegion">
      <i class="fa fa-plus"></i> 
      <div class="spacer"></div> 
      Region
    </div>

    <insert-region v-if="insertRegion"
      v-on:toggleInsert="toggleInsert()"
      v-on:newCoverageAdded="newCoverageAdded()"
    />
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import InsertRegion from './children/InsertRegionCoverage.vue'


@Component({
  components: {
    InsertRegion
  }
})
export default class AddRegionCoverage extends Vue {
  insertRegion: boolean = false 

  /** 
   * toggle insert region for UI
   */
  toggleInsert() {
    this.insertRegion = !this.insertRegion
    this.$emit('insertRegionChanged', this.insertRegion)
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

