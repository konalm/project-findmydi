<template>
<div class="coverage-page">
  <inst-app-header />
  <page-header :header="'Areas\'s you cover'" />
  <inst-app-navbar />

  <div class="coverage-container">
    <!-- left side -->
    <div class="coverage-container__left-side">
      <div class="coverage-items-container">
        <item 
          v-for="coverage in coverages"
          :key="coverage.id"
          :coverage="coverage"
        />
      </div>
    </div>

    <div class="spacer"></div>

    <!-- right side -->
    <div class="coverage-container__right-side">
      <main-map />
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
import Item from './children/CoverageItem.vue'
import MainMap from './children/MainMap.vue'


@Component({
  components: {
    InstAppHeader,
    PageHeader,
    InstAppNavbar,
    Item,
    MainMap
  }
})
export default class InstAppCoverage extends Vue {
  coverages = []

  beforeMount() {
    this.getCoverages()
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

}
</script>



<style lang="scss" scoped>
  .coverage-container {
    display: flex;
    // border: 1px solid red;
    justify-content: center;
    width: 1170px;
    margin: 0 auto;

    .spacer {
      width: 200px;
    }
  }
</style>