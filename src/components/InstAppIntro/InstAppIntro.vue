<template>
  <layout>
    <span slot="stepHeader">Introduction</span>

    <span slot="introStep"> 
      <p class="main-text"> Welcome to the Find My Driving Instructor app. Our objective is to
        give you expose too future driving students who are seeking driving 
        lessons from verified, trusted and qualified driving instructors.
      </p>

      <p class="sub-text"> Before we can give you expose we will require a few more details from that
        will be exposed to driving instructors seeking lessons.
      </p>

      <button class="base-button">Proceed</button>
    </span>
  </layout>
</template>


<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './Layout'

@Component({
  components: {
    Layout
  }
})
export default class InstAppIntro extends Vue {

}
</script>



<style lang="scss" scoped>
  p.main-text, p.sub-text {
    font-size: 16px;
    text-align: center;
    line-height: 35px;
    color: #5D5D5D;
    margin-top: 20px;
  }

  p.sub-text {
    font-size: 14px;
    opacity: 71%;
  }

</style>

