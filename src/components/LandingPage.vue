<template>
  <div class="container">
    <h1 class="text-center">Find My Driving Instructor . Com</h1>

    <div class="button-container mt-5 text-center">
      <router-link to="/instructor-search"> 
        <button class="btn btn-primary mr-4">Find My Driving Instructor</button>
      </router-link>

      <router-link to="/signup">
        <button class="btn btn-primary"> Find my driving students </button>
      </router-link>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// import router from '@/router'

@Component({})
export default class LandingPage extends Vue {

}
</script>