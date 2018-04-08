<template>
<div class="header inst-app">
  <div class="header__inner">
    <img src="../../../assets/findmydi-dark.png" class="header__logo">

    <div class="header__settings dropdown">
      <i class="fa fa-cog dropdown-toggle" data-toggle="dropdown" id="settings"></i>

      <ul class="dropdown-menu" aria-labelledby="settings">
        <li v-on:click="signOut()">Sign Out</li>
      </ul>
    </div>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {updateHttpHeader} from '@/http-requests'
import router from '@/router'


@Component({})
export default class Header extends Vue {
  @Prop() loggedIn: boolean

  /** 
   * destroy token and direct to login page 
   */
  signOut() {
    localStorage.removeItem('token');
    updateHttpHeader()
    router.push('/login')
  }
}
</script>
