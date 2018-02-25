<template>
<div class="white-modal-box__container">
  <button class="close-button" v-on:click="close()">
    <i class="material-icons">close</i>
  </button> 

  <div class="add-coverage-choice-container">
    <button class="base-button blue" v-on:click="addCoverage('postcode')"> 
      <i class="fa fa-plus" aria-hidden="true"></i>       
      Postcode 
    </button> 

    <button class="base-button green" v-on:click="addCoverage('region')">
      <i class="fa fa-plus" aria-hidden="true"></i> 
      Locality/Region 
    </button> 
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class AddCoverageChoice extends Vue {
  /** 
   * 
   */
  addCoverage(type) {
    this.$emit('selectCoverageType', type)
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
.white-modal-box__container {
  padding-left: 15px;
}

button.close-button {
  .materials-icons {
    font-size: 11px;
  }
}

.add-coverage-choice-container {
  padding: 40px 10px 10px 10px;
  display: flex;
  justify-content: space-around;

  button {
    width: 170px;
    padding-top: 13px;
    padding-bottom: 13px;
  }
}
</style>