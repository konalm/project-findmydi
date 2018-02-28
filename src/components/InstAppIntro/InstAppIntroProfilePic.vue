<template>
  <layout>
    <span slot="stepHeader">Profile Picture</span>

    <span slot="introStep"> 
      <div class="pic-container"></div>
      <br />

      <div class="modal-box__button-container">
        <button class="base-button"> Upload Profile Picture </button>
      </div>
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
export default class InstAppCoverage extends Vue {
  postcode: string = ''
  range: number = 0

}
</script>



<style lang="scss" scoped>
  .pic-container {
    width: 348px;
    height: 170px;
    background: black;
    opacity: 0.3;
    margin: 0 auto;
    margin-top: 30px;
  }
</style>

