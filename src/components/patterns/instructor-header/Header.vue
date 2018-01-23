<template>
  <div class="header">
    <div class="container">
      <ul class="logged-out-header__nav">
        <li v-if="loggedIn">Sign Out</li>
        <li v-if="!loggedIn">Login</li>
        <li v-if="!loggedIn">Sign Up</li> 
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
import {Prop} from 'vue-property-decorator'

@Component({})
export default class Header extends Vue {
  @Prop() loggedIn: boolean
}

</script>
