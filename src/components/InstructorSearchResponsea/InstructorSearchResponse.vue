<template>
<div class="search-instructor-view">
  <user-header />
  <h4>Instructor Search Response</h4>
  <!-- Search -->
  <div class="search-container">
    <input type="text" v-model="postcodeSearch" />
    <button> <i class="fa fa-search"></i> </button>
  </div>

  <!-- Search Results -->
  <div class="search-results-container">

  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import UserHeader from '@/components/patterns/user-header'

@Component({
  components: {
    UserHeader
  }
})
export default class InstructorSearchResponse extends Vue {
  postcodeSearch: string = ''
  instructorResults = []

  beforeMount() {

  }
}
</script>

