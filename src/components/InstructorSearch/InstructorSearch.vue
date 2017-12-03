<template>
  <div>
    <h1 class="text-center">
      Find Driving Instructors in your area
    </h1>

    <div class="container mt-5">
      <form v-on:submit.prevent="searchForDrivers()">
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

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <no-drivers-response 
        v-if="searched && Object(searchResponse).length === 0" 
      />
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

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

  /**
   * submit search to api the find instructor covering entered postcode
   */
  searchForDrivers() {
    this.searched = true
  }
}
</script>
