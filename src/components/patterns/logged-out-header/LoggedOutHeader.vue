<template>
  <div class="header inst-app">
    <div class="header__inner">
      <img src="../../../assets/findmydi-dark.png" class="header__logo">

      <ul class="logged-out-header__nav">
        <li>Login</li>
        <li>Sign Up</li>
        <li>Services</li>
        <li>About</li>
        <li class="special">Get In Touch</li>
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class LoggedOutHeader extends Vue {}
</script>


<style scoped lang="scss" src="./logged-out-header.scss" />