<template>
<div class="instructor-search__message">
  <p class="header"> 
    There where no instructors found within you postcode. 
  </p>

  <p class="sub-header">
    We are currently in Beta and took note of your postcode. We are
    working on finding qualified instructors in your area. 
  </p>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class NoResultsSearch extends Vue {

}
</script>


<style lang="scss" scoped src="./response-message.scss">

