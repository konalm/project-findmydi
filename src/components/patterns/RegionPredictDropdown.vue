<template>
  <div class="region-search-container dropdown" v-bind:class="view">
    <input type="text" class="dropdown-toggle region-input" placeholder="Enter region"
      v-model="region"
      id="regionSearch"
      data-toggle="dropdown"
    />

    <ul class="dropdown-menu" 
      aria-labelledby="regionSearch" 
      v-if="predictions && predictions.length > 0"
    >
      <li v-for="prediction in predictions" 
        v-on:click="selectRegion(prediction.description)"
        :key="prediction.description"
      >
        {{ prediction.description }}
      </li>

      <li class="dropdown-footer">
        Select region
      </li>
    </ul>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop, Watch} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'

@Component({})
export default class RegionPredictDropdown extends Vue {
  region: string = ''
  predictions = []

  @Prop() value: ''
  @Prop() view: ''

  beforeMount() {
    this.region = this.value
  }

  @Watch('region')
  OnRegionChanged(val: string, oldVal: string) {
    this.$emit('input', this.region)

    this.googlePlacesPredictionApiRequest()
  }

  /**
   * 
   */
  selectRegion(desc) {
    this.region = desc
  }

  /**
   * send region input to google api to predict users region
   */
  googlePlacesPredictionApiRequest() {
    httpAuth.get(`googleapis-autocomplete/${this.region}`)
      .then(res => {
        this.predictions = res.data
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>



<style lang="scss" scoped>
  .region-search-container {
    margin-bottom: 15px;

    &.update-region-coverage {
      // margin-bottom: 0;
    }

    input {
      width: 350px;
      height: 40px;
      border-radius: 5px;
      border: 1px solid rgb(200,200,200);
      padding-left: 20px;
      margin: 0;
    }

    ul.dropdown-menu {
      width: 350px;
      margin: 0;
      padding: 0;
      font-size: 40px;

      li {
        padding: 15px 0 15px 15px;
        border-bottom: 1px solid rgb(235,235,235);
        cursor: pointer;
        color: rgb(100,100,100);
        list-style: circle inside none;
        font-size: 16px;
      }

      li:hover {
        background-color: #F0FAFF;
      }

      li.dropdown-footer {
        border: none;
        text-align: center;
        padding: 35px 0 5px 0;
        list-style: none;
        font-weight: 450;
        color: #404040;
        cursor: auto;
      }

      li.dropdown-footer {
        background: none;
      }
    }
  }
</style>