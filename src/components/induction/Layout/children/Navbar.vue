<template>
 <div class="container">
   <i class="fas fa-money-bill-alt"></i>
   
    <ul class="instapp__navbar">
      <!-- Introduction -->
      <li class="instapp__navbar__item" 
        v-bind:class="{'active' : linkIsActive('')}" 
        v-on:click="goToLink('/intro', true)"
      >
       <i class="fa fa-home"></i>
        <div class="spacer"></div>
        <p class="item-title">  Introduction </p>

        <i class="fa fa-check" aria-hidden="true" v-if="introRead"></i>        
      </li>


      <!-- Hourly Rate -->
      <li class="instapp__navbar__item" 
        v-bind:class="{'active' : linkIsActive('/hourly-rate'), 'disabled': !introRead}" 
        v-on:click="goToLink('/intro/hourly-rate', introRead)"
      >
       <i class="fa fa-money"></i>
        <div class="spacer"></div>
        <p class="item-title"> Hourly Rate </p>

        <i class="fa fa-check" aria-hidden="true" v-if="hourlyRateComplete"></i>        
      </li>


      <!-- Coverage -->
      <li class="instapp__navbar__item" 
        v-bind:class="{
          'active' : linkIsActive('/coverage'), 
          'disabled': !hourlyRateComplete
        }" 
        v-on:click="goToLink('/intro/coverage', hourlyRateComplete)"
      >
       <i class="fa fa-map-marker"></i>
        <div class="spacer"></div>
        <p class="item-title"> Coverage </p>

        <i class="fa fa-check" aria-hidden="true" v-if="coverageComplete"></i>        
      </li>


      <!-- Profile Pic -->
      <li class="instapp__navbar__item" 
        v-bind:class="{
          'active' : linkIsActive('/profile-picture'), 
          'disabled': !coverageComplete
        }" 
        v-on:click="goToLink('/intro/profile-picture', coverageComplete)"
      >
       <i class="fa fa-user"></i>
        <div class="spacer"></div>
        <p class="item-title"> Profile Picture </p>

        <i class="fa fa-check" aria-hidden="true" v-if="profilePicComplete"></i>        
      </li>


      <!-- Adi Licence -->
      <li class="instapp__navbar__item" 
        v-bind:class="{
          'active' : linkIsActive('/adi-licence'), 
          'disabled': !profilePicComplete
        }" 
        v-on:click="goToLink('/intro/adi-licence', profilePicComplete)"
      >
       <i class="fa fa-id-card"></i>
        <div class="spacer"></div>
        <p class="item-title"> ADI Licence </p>

        <i class="fa fa-check" aria-hidden="true" v-if="adiLicenceComplete"></i>        
      </li>
    </ul>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import _ from 'lodash'
import {Prop, Watch} from 'vue-property-decorator'
import router from '@/router'


@Component({})
export default class Navbar extends Vue {
  get inductionInfo() {
    return this.$store.getters.inductionInfo
  }

  get introRead() {
    return this.inductionInfo.intro_read ? true : false
  }

  get hourlyRateComplete() {
    return this.inductionInfo.hourly_rate ? true : false
  }

  get hourlyRateLink() {
    return !this.introRead ? '/intro/hourly-rate' : '#'
  }

  get coverageComplete() {
    if (_.isEmpty(this.inductionInfo.coverages)) { return }

    const coverages = JSON.parse(this.inductionInfo.coverages)
  
    return coverages[0] !== null ? true : false
  }

  get profilePicComplete() {
    return this.inductionInfo.avatar_url ? true : false
  }

  get adiLicenceComplete() {
    return this.inductionInfo.adi_licence_verification ? true : false
  }

  /** 
   * 
   */
  goToLink(link, requirement) {
    if (!requirement) { return }

    router.push(link)
  }

  /** 
   *
   */ 
  linkIsActive(link) {
    return `#/induction${link}` === window.location.hash
  }
}
</script>



<style lang="scss" scoped>
  @import '../../../../scss/variables.scss';

  ul.instapp__navbar {
    display: flex;
    margin: 0 auto;
    margin-bottom: 55px;
    justify-content: center;

    li.instapp__navbar__item {
      margin-right: 30px;
      padding: 0;
      background: white;
      text-align: center;
      width: 160px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, .03);
      opacity: 0.5;
      position: relative;

      &.disabled {
        cursor: not-allowed;
      }

      &.active {
        opacity: 1;
      }
      
      .spacer {
        height: 10px;
      }

      .fa {
        font-size: 22px;
        color: $primary-color;
      }

      .fa-check {
        position: absolute;
        bottom: -40%;
        left: 50%;
        transform: translateX(-50%);
      }

      p, .fa {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
