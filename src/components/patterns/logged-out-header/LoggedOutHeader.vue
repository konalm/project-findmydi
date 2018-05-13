<template>
<div>
  <div class="header inst-app logged-out">
    <div class="header__inner">
      <img src="../../../assets/findmydi-dark.png" class="header__logo">

      <ul class="logged-out-header__nav">
        <li>Login</li>
        <li>Sign Up</li>
        <li>Services</li>
        <li>About</li>
        <li class="special">Get In Touch</li>
      </ul>

      <!-- mobile -->
      <i class="fas fa-bars" v-on:click="toggleMobileMenu()" v-if="!mobileMenuOpen"></i>
      <i class="fas fa-times" v-on:click="toggleMobileMenu()" v-if="mobileMenuOpen"></i>
    </div>
  </div>

  <ul class="logged-out-header__mobile-nav" id="mobileMenu">
    <li v-for="item in menuItems" :key="item.name">
      {{ item.name }}
    </li>
  </ul>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class LoggedOutHeader extends Vue {
  menuItems = [
    { name: 'Login', special: false },
    { name: 'Sign Up', special: false },
    { name: 'Services', special: false },
    { name: 'About', special: false },
    { name: 'Get In Touch', special: true }
  ]

  mobileMenuOpen: boolean = false

  toggleMobileMenu() {
    if (!this.mobileMenuOpen) {
      $("#mobileMenu").slideDown("slow")
    } else {
      $("#mobileMenu").slideUp("slow")      
    }

    this.mobileMenuOpen = !this.mobileMenuOpen
  }
}
</script>


<style scoped lang="scss" src="./logged-out-header.scss" />