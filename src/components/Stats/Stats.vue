<template>
  <div class="stats-page">
    <app-header />
    <page-header :header="'Statistics'" />
    <app-navbar />

    <div class="stats-container">
      <div class="stats-container__left-side">
          <email-click-stats />
      </div>

      <div class="spacer"></div>

      <div class="stats-container__right-side">
          <number-click-stats />
      </div>
    </div>
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import AppHeader from '@/components/patterns/InstAppHeader'
import PageHeader from '@/components/patterns/PageHeader.vue'
import AppNavbar from '@/components/patterns/InstAppNavbar.vue'
import EmailClickStats from './children/EmailClickStats.vue'
import NumberClickStats from './children/NumberClickStats.vue'

@Component({ 
  components: {
    AppHeader, PageHeader, AppNavbar, EmailClickStats, NumberClickStats
  }
})
export default class Stats extends Vue {
  pokemon: string = 'chari'
  stats = {emailClicks: null, numberClicks: null}

  beforeMount() {
    document.body.className = 'grey-background'
    this.getUserStats()
  }

  /** 
   * 
   */
  getUserStats() {
    httpAuth.get('stats')
      .then(res => {
        this.stats = {
          emailClicks: res.data.email_click_count,
          numberClicks: res.data.number_click_count
        }
      })
  }
}
</script>



<style lang="scss" scoped>
.stats-page {
  .stats-container {
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    display: flex;

    @media screen and (max-width: 450px) {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .stats-container__left-side, .stats-container__right-side {
      width: 50%;

      @media screen and (max-width: 450px) {
        width: 80%;
      }
    }

    .spacer {
      width: 150px;

      @media screen and (max-width: 850px) {
        width: 100px;
      }

      @media screen and (max-width: 650px) {
        width: 50px;
      }
    }
  }
}
</style>
