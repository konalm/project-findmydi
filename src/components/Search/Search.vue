<template>
<div class="search-instructor-view">
  <user-header />
  
  <!-- Search -->
  <div class="search-container">
    <input type="text" v-model="postcode" placeholder="Enter your postcode" />
    
    <button class="search-button" v-on:click="newSearch()"> 
      <i class="fa fa-search"></i>
     </button>
  </div>

  <!-- Search Results -->
  <div class="search-results-container container">
    <instructor-result v-for="instructor in searchResults"
      :key="instructor.id"
      :instructor="instructor"
    />

    <no-search-results v-if="searched && searchResults.length === 0" />
    <invalid-postcode v-if="invalidPostcode" />
    <loader v-if="loading" />
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import UserHeader from '@/components/patterns/user-header'
import InstructorResult from './children/InstructorResult.vue'
import NoSearchResults from './children/NoSearchResults.vue'
import InvalidPostcode from './children/InvalidPostcode.vue'
import Loader from '@/components/patterns/Loader.vue'
import {http} from '@/http-requests'
import router from '@/router'


@Component({
  components: {
    UserHeader,
    InstructorResult,
    NoSearchResults,
    InvalidPostcode,
    Loader
  }
})
export default class InstructorSearchResponse extends Vue {
  postcode: string = ''
  searchResults = []
  searched: boolean = false
  invalidPostcode: boolean = false
  loading: boolean = false

  beforeMount() {
    this.postcode = this.$route.params.postcode 
    this.searchForInstructors()
  }

  newSearch() {
    this.postcode = this.postcode.replace(/\s/g,'')

    router.push({
      name: 'Search', 
      params: {postcode: this.postcode}}
    )

    this.searchForInstructors();
  }

  /**
   * 
   */
  setStateForSearch() {
    this.searched = false 
    this.searchResults = []
    this.invalidPostcode = false
    this.loading = true
  }

  /**
   * submit search to api the find instructor covering entered postcode
   */
  searchForInstructors() {
    this.setStateForSearch()

    http.get(`search-instructors/${this.postcode}`)
      .then(res => {
        this.searchResults = res.data
        this.searched = true
        this.loading = false
      })
      .catch(err => { 
        if (err.response.status === 422) {
          this.invalidPostcode = true
          this.loading = false
        }
        throw new Error(err) 
      })
  }
}
</script>



<style lang="scss" scoped src="./search.scss" />

