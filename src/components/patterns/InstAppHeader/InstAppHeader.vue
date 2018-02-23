<template>
  <div class="header inst-app">
    <div class="header__inner">
      
      <h3 class="logo">FIND MY DI</h3>
  
      <i class="fa fa-cog"></i>
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
