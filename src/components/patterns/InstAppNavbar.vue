<template>
  <div class="container">
    <div class="instapp__navbar">
      <div class="instapp__navbar__item" 
        v-for="navItem in navItems"
        :key="navItem.item"
      >
        <i v-bind:class="navItem.faIcon"></i>
        <div class="spacer"></div>
        <p class="item-title"> {{ navItem.item }} </p>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class InstAppNavbar extends Vue {
  navItems = [
    {
      item: 'PROFILE',
      faIcon: 'fa fa-user'
    },
    {
      item: 'AREA\'S YOU COVER',
      faIcon: 'fa fa-map-marker'
    }
  ]
}
</script>




<style lang="scss" scoped>
  @import '../../scss/variables.scss';

  .instapp__navbar {
    display: flex;
    margin-bottom: 40px;

    .instapp__navbar__item {
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

