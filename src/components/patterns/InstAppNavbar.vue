<template>
  <div class="container">
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

@Component({})
export default class Navbar extends Vue {
  navItems = [
    {
      item: 'STATISTICS',
      faIcon: 'far fa-chart-bar',
      link: 'statistics',
    },
    {
      item: 'PROFILE',
      faIcon: 'fa fa-user',
      link: '/profile'
    },
    {
      item: 'AREA\'S YOU COVER',
      faIcon: 'fa fa-map-marker',
      link: '/areas-you-cover'
    },
    {
      item: 'REVIEWS',
      faIcon: 'fa fa-star',
      link: '/reviews'
    }
  ]
}
</script>



<style lang="scss" scoped>
  @import '../../scss/variables.scss';

  ul.instapp__navbar {
    display: flex;
    margin-bottom: 40px;
    // border: 1px solid blue;

    @media screen and (max-width: 650px) {
      padding: 0;
      padding-left: 15px;
    }

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

      @media screen and (max-width: 650px) {
        width: 85px;
        height: 60px;
        margin-right: 15px;
        font-size: 11px;

        .fa {
          font-size: 17px;
        }
      }

      &.active {
        border: 1px solid $primary-color;
        background: #F2F2F2;
      }
      
      .spacer {
        height: 10px;
      }

      .fa, .far {
        font-size: 22px;
        color: $primary-color;

        @media screen and (max-width: 650px) {
          font-size: 17px;
        }
      }

      p, .fa {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>

