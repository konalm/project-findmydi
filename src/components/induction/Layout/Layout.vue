<template>
  <div class="instructor-intro-page">
    <inst-app-header :loggedIn="true" />
    <page-header :header="'Welcome'" />
    <navbar />

    <div class="container">
      <div class="modal-box">
        <div class="modal-box__header">
          <slot name="stepHeader"></slot>
        </div>

        <div class="modal-box__body">
          <div class="content">
            <slot name="introStep"></slot>
          </div> 

          <div class="modal-box__proceed-button-container">
            <slot name="proceedButton"></slot>
          </div>
        </div>
      </div>

      <div class="intro__back-button-container mobile" v-if="previousView"> 
        <router-link :to="previousView">
          <i class="fa fa-arrow-left"></i>
        </router-link>

         <!-- info box - mobile -->
         <div class="info-box mobile" v-if="infoBox">
          <div class="info-box__header">
            <i class="fa fa-info-circle"></i>
          </div> 

          <div class="info-box__body"> 
            <slot name="infoText"></slot>
          </div>
        </div>        
      </div>
    </div>

    <!-- info box -->
    <div class="info-box" v-if="infoBox">
      <div class="info-box__header">
        <i class="fa fa-info-circle"></i>
      </div> 

      <div class="info-box__body"> 
        <slot name="infoText"></slot>
      </div>
    </div>
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

import InstAppHeader from '@/components/patterns/InstAppHeader'
import PageHeader from '@/components/patterns/PageHeader.vue'
import Navbar from './children/Navbar.vue'
import InfoBox from './children/InfoBox.vue'


@Component({
  components: {
    InstAppHeader,
    PageHeader,
    Navbar,
    InfoBox
  }
})
export default class IntroLayout extends Vue {
  @Prop() infoBox: false
  @Prop() backButton: false
  @Prop() previousView: ''
  

  beforeMount() {
    document.body.className = 'grey-background'
  }
}
</script>



<style lang="scss" scoped>
  @import '../../../scss/variables.scss';

  .modal-box {
    max-width: 574px;
    height: 423px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;

    @media screen and (max-width: 650px) {
      height: auto;
    }

    .modal-box__body {
      padding-right: 30px;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      flex-direction: flex-end;
      flex-grow: 1;
      margin-bottom: 0;
      position: relative;

      @media screen and (max-width: 650px) {
        padding: 10px;
      }

      .content {
        flex-grow: 1;
        flex: 1;
      }

      .modal-box__proceed-button-container {
        text-align: right;
        padding-bottom: 10px;
      }
    }
  }

  .intro__back-button-container {
    max-width: 574px;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 30px;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;

    .fa {
      cursor: pointer;
      color: $primary-color;
    }
  }


  /** 
   * info box 
   */ 
  .info-box {
    width: 170px;
    position: absolute;
    top: 320px;
    right: 10%;

    @media screen and (max-width: 1200px) {
      right: 20px;
    }

    @media screen and (max-width: 960px) {
      display: none;
    }

    .info-box__header {
      color: $primary-color;
      font-size: 20px;
      padding-left: 10px;
    }
  
    .info-box__body {
      background: $primary-color;   
      color: white;
      padding: 7px;
      font-size: 12px;
      text-align: center;

      p {
        margin: 0;
      }
    }
  }

  .info-box.mobile {
    position: static;
    display: none;

    @media screen and (max-width: 960px) {
      display: block;
    }
  }
</style>

