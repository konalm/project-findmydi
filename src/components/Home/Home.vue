<template>
  <div>
    <user-header />

    <div class="container mt-5">
      <div class="search-page__main-container">
        <h1>Find My Driving Instructor</h1>

        <form v-on:submit.prevent="searchForInstructors()">
          <div class="search-container">
            <input type="text" 
              class="form-control"
              placeholder="Enter Your postcode"
              v-model="postcode"
            >

            <button type="submit" class="base-button">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button> 
          </div>
        </form>

        <p class="search-container__lower-text lead">
          Find qualified driving instructors within your reach 
        </p>
      </div>

      <ul class="instructors-found-container mt-5 list-group">
        <li class="list-group-item"
          v-for="(instructor, index) in instructorsFound" 
          :key="instructor.name"
        >
          <p>{{ instructor.name }}</p>
          <p>{{ instructor.email }}</p> 
          <button class="btn btn-primary mr-2">Contact</button>
          <button class="btn btn-primary">View Profile</button>
        </li>
      </ul>

      <no-drivers-response 
        v-if="searched && Object(instructorsFound).length === 0" 
      />
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import UserHeader from '@/components/patterns/user-header'
import {http} from '../../http-requests'
import noDriversResponse from './NoDriversResponse.vue'
import router from '@/router'

// import location from '../../googleapis/location'
import store from '@/store'

@Component({
  components: {
    UserHeader,
    noDriversResponse
  }
})
export default class InstructorSearch extends Vue {
  postcode: string = ''
  searched: boolean = false
  searchResponse = []
  instructorsFound = []
  x: boolean = false

  beforeMount() {
    document.body.className = 'white-background' 
    console.log('HOME')
  }

  /**
   * submit search to api the find instructor covering entered postcode
   */
  searchForInstructors() {
    router.push({
      name: 'Search', 
      params: {postcode: this.postcode}}
    )
  }
}
</script>



<style lang="scss" scoped src="./home.scss" />
