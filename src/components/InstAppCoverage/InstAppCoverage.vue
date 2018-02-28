<template>
  <div class="coverage-page">
    <inst-app-header />
    <page-header :header="'Areas\'s you cover'" />
    <inst-app-navbar />

    <div class="coverage-container">
      <div class="coverage-container__left-side">
        <div class="coverage-items-container">
          <item v-for="coverage in coverages"
            :key="coverage.id"
            :coverage="coverage"
            v-on:coverageModified="getCoverages()"
          />
        </div>

        <div class="coverage-container__add-container">
          <add-postcode v-if="!insertingRegion"
            v-on:newCoverageAdded="getCoverages()" 
            v-on:insertPostcodeChanged="insertPostcodeChanged"
          />

          <add-region v-if="!insertingPostcode" 
            v-on:newCoverageAdded="getCoverages()" 
            v-on:insertRegionChanged="insertRegionChanged"
          />
        </div>
      </div>

      <div class="spacer"></div>

      <div class="coverage-container__right-side">
        <main-map :coverages="coverages" />
      </div>
    </div>
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import InstAppHeader from '@/components/patterns/InstAppHeader'
import PageHeader from '@/components/patterns/PageHeader.vue'
import InstAppNavbar from '@/components/patterns/InstAppNavbar.vue'
import Item from './children/CoverageItem'
import MainMap from './children/MainMap.vue'
import AddPostcode from './children/AddPostcodeCoverage'
import AddRegion from './children/AddRegionCoverage'


@Component({
  components: {
    InstAppHeader,
    PageHeader,
    InstAppNavbar,
    Item,
    MainMap,
    AddPostcode,
    AddRegion
  }
})
export default class InstAppCoverage extends Vue {
  coverages = [{id: null, postcode: '', region: '', range: '', coverage_type: ''}]
  insertingPostcode: boolean = false
  insertingRegion: boolean = false

  beforeMount() {
    this.getCoverages()
    document.body.className = 'grey-background'
  }

  /**
   * get instructor's coverages
   */
  getCoverages() {
    httpAuth.get('instructor-coverages')
      .then(res => {
        this.coverages = res.data        
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /** 
   * 
   */
  insertPostcodeChanged(value) {
    this.insertingPostcode = value
  }

  /** 
   * 
   */
  insertRegionChanged(value) {
    this.insertingRegion = value
  }
}
</script>



<style lang="scss" scoped>
  .coverage-container {
    display: flex;
    justify-content: center;
    width: 1170px;
    margin: 0 auto;

    .spacer {
      width: 200px;
    }

    .coverage-container__add-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
  }
</style>