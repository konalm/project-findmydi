<template>
  <layout>
    <span slot="stepHeader">Introduction</span>

    <span slot="introStep"> 
      <p class="main-text"> Welcome to the Find My Driving Instructor app. 
        Our objective is to give you expose too future driving students who 
        are seeking driving lessons from verified, trusted and qualified driving 
        instructors.
      </p>

      <p class="sub-text"> Before we can give you expose we will require a few 
        more details from that will be exposed to driving instructors seeking 
        lessons.
      </p>
    </span>

    <button slot="proceedButton" class="base-button padded-button" 
      v-on:click="proceed()"
    >
      Proceed
    </button>
  </layout>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './Layout'
import router from '@/router'
import {httpAuth} from '@/http-requests'


@Component({
  components: {
    Layout
  }
})
export default class InductionIntro extends Vue {
  mounted() {
    this.getInductionInfo()
  }

  /** 
   * set intro read to yes in model  
   * redirect to intro hourly rate
   */
  proceed() {
    httpAuth.put('instructor-induction-intro-read', {
      readStatus: true
    })
      .then(res => {
        router.push('induction/hourly-rate')
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /** 
   * get instructor induction info
   */
  async getInductionInfo() {
    try {
      var response = await httpAuth.get('instructor-induction-info')
    } catch (err) {
      throw Error(err.response.data)
    }

    this.$store.commit('setInductionInfo', response.data)
  }
}
</script>



<style lang="scss" scoped>
  p.main-text, p.sub-text {
    font-size: 16px;
    text-align: center;
    line-height: 35px;
    color: #5D5D5D;
    margin-top: 30px;
  }

  p.sub-text {
    font-size: 14px;
    margin-top: 20px;
    opacity: 71%;
  }

</style>

