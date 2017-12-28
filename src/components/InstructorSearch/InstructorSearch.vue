<template>
  <div>
    <h1 class="text-center">
      Find Driving Instructors in your area
    </h1>

    <div class="container mt-5">
      <form v-on:submit.prevent="searchForInstructors()">
        <!-- postcode -->
        <div class="form-group">
          <label>Postcode</label>

          <input 
            type="text" 
            class="form-control"
            placeholder="Enter postcode where you wish to recieve lessons"
            v-model="postcode"
          >
        </div>

        <button type="submit" class="btn btn-success">Submit</button>
      </form>

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
import {http} from '../../http-requests'
import noDriversResponse from './NoDriversResponse.vue'

@Component({
  components: {
    noDriversResponse
  }
})
export default class InstructorSearch extends Vue {
  postcode: string = ''
  searched: boolean = false
  searchResponse = []
  instructorsFound = []

  /**
   * submit search to api the find instructor covering entered postcode
   */
  searchForInstructors() {
    http.get(`search-instructors/${this.postcode}`)
      .then(res => {
        this.instructorsFound = res.data
        this.searched = true
      })
      .catch(err => { 
        throw new Error(err) 
      })

  }
}
</script>
