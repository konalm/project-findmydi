<template>
<div class="modal-box">
  <div class="modal-box__header">
    {{ coverage.coverage_type }}

    <div class="modal-box__header__icon-container">
      <i class="fa fa-edit" v-on:click="toggleUpdate()"></i>

      <div class="spacer"></div>

      <i class="fa fa-close" v-on:click="destroy()"></i>
    </div>
  </div>

  <div class="modal-box__body" v-if="!update">
    <p v-if="coverage.coverage_type === 'postcode'"> {{ coverage.postcode }} </p> 
    <p v-if="coverage.coverage_type === 'region'"> {{ coverage.region }} </p>
    <p>Range: {{ coverage.range }} Miles</p>
  </div>

  <update-postcode 
    v-if="update && coverage.coverage_type === 'postcode'" 
    :coverage="coverage" 
    v-on:coverageUpdated="coverageUpdated()"
  />

  <update-region
    v-if="update && coverage.coverage_type === 'region'"
    :coverage="coverage"
    v-on:coverageUpdated="coverageUpdated()"
  />
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'
import UpdatePostcode from './children/UpdatePostcodeCoverage.vue'
import UpdateRegion from './children/UpdateRegionCoverage.vue'


@Component({
  components: {
    UpdatePostcode,
    UpdateRegion
  }
})
export default class CoverageItem extends Vue {
  errorMessage: string = ''
  update: boolean = false

  @Prop() coverage: {id, coverage_type, postcode, region, range, longitude, latitude}

  /** 
   * toggle update mode true/false for UI
   */
  toggleUpdate() {
    this.update = !this.update
  }

  /**
   * delete coverage in the API
   */
  destroy() {
    httpAuth.delete(`instructors-coverage/${this.coverage.id}`)
      .then(() => {
        this.$emit('coverageModified');
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }

  /** 
   * on coverage updated, toggle update off and emit event to parent to get 
   * coverages 
   */
  coverageUpdated() {
    this.update = false
    this.$emit('coverageModified')
  }
}
</script>



<style lang="scss" scoped>
  .modal-box {
    width: 376px;
    margin-bottom: 50px;

    @media screen and (max-width: 700px) {
      width: 300px;
    }

    @media screen and (max-width: 650px) {
      width: 80%;
      margin: 0 auto;
    }

    @media screen and (max-width: 550px) {
      width: 90%;
    }
  
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
      padding-left: 0;
      padding-right: 0;

      @media screen and (max-width: 650px) {
        line-height: 10px;

        button {
          line-height: 20px;
        }
      }
      
      p {
        font-size: 20px;
        color: #6F6F6F;
        line-height: 50px;

        @media screen and (max-width: 650px) {
          font-size: 16px;
          line-height: 35px;
          margin: 0;
        }
      }
    }
  }
</style>