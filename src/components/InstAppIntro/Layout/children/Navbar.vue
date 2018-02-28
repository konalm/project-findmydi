<template>
 <div class="container">
   <i class="fas fa-money-bill-alt"></i>
   
    <ul class="instapp__navbar">
      <router-link v-for="navItem in navItems"
        :key="navItem.id"
        tag="li" 
        active-class="active" 
        class="instapp__navbar__item" 
        v-bind:to="navItem.link" 
        exact
      >
        <i v-bind:class="navItem.faIcon"></i>
        <div class="spacer"></div>
        <p class="item-title"> {{ navItem.item }} </p>
      </router-link>
    </ul>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'


@Component({})
export default class Navbar extends Vue {
  navItems = [
    {
      item: 'INTRODUCTION',
      faIcon: 'fa fa-home',
      link: '/intro'
    },
    {
      item: 'HOURLY RATE',
      faIcon: 'fa fa-money',
      link: '/intro/hourly-rate'
    },
     {
      item: 'COVERAGE',
      faIcon: 'fa fa-map-marker',
      link: '/intro/coverage'
    },
    {
      item: 'PROFILE PICTURE',
      faIcon: 'fa fa-user',
      link: '/intro/profile-picture'
    },
     {
      item: 'ADI LICENCE',
      faIcon: 'fa fa-id-card',
      link: '/intro/adi-licence'
    }
  ]
}
</script>



<style lang="scss" scoped>
  @import '../../../../scss/variables.scss';

  ul.instapp__navbar {
    display: flex;
    margin: 0 auto;
  margin-bottom: 40px;
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

      &.active {
        border: 1px solid $primary-color;
        background: #F2F2F2;
      }
      
      .spacer {
        height: 10px;
      }

      .fa {
        font-size: 22px;
        color: $primary-color;
      }

      p, .fa {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
