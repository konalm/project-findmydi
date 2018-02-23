<template>
  <div class="modal-box">
    <div class="modal-box__header">
      {{ coverage.coverage_type }}

      <div class="modal-box__header__icon-container">
        <i class="fa fa-edit"></i>
        <div class="spacer"></div>
        <i class="fa fa-close"></i>
      </div>
    </div>

    <div class="modal-box__body">
      <p v-if="coverage.coverage_type === 'postcode'"> {{ coverage.postcode }} </p> 
      <p v-if="coverage.coverage_type === 'region'"> {{ coverage.region }} </p>
      <p>Range: {{ coverage.range }} Miles</p>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'


@Component({})
export default class CoverageItem extends Vue {
  @Prop() coverage: {coverage_type, postcode, region, range}


}
</script>


<style lang="scss" scoped>
  .modal-box {
    width: 376px;
    margin-bottom: 50px;

    .modal-box__header {
      .modal-box__header__icon-container {
        display: flex;

        .spacer {
          width: 15px;
        }
      }
    }

    .modal-box__body {
      text-align: center;
      
      p {
        font-size: 20px;
        color: #6F6F6F;
        line-height: 50px;
      }
    }
  }
</style>