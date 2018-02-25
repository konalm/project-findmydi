<template>
  <div class="container">
    <h3 class="text-center">Instructor Coverage</h3> 

    <form>
      <!-- -->
      <div class="form-group mt-5">
        <label>Postcode</label>

        <input 
          type="text"
          class="form-control"
          placeholder="Enter the Postcode you wish to teach lessons"
          v-model="postcode"
        >
      </div>

      <!-- -->
      <div class="form-group">
        <label>Radius</label>

        <input 
          type="text"
          class="form-control"
          placeholder="Enter mile radius from designated postcode you are willing to cover"
          v-model="radius"
        >
      </div>

      <div class="form-group">
        <button 
          class="btn btn-success" 
          v-on:click.prevent="updateCoverage()"
        >
          Update
        </button>

        <router-link to="/portal">
          <button class="btn btn-primary ml-4">Back to Portal</button>
        </router-link>
      </div>

      <div class="form-group">
        <p>{{ responseMessage }}</p>
      </div>
    </form>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'

@Component({})
export default class InstructorCoverage extends Vue {
  postcode: string = ''
  radius: string = ''
  user = {radius: null, postcode: ''}
  responseMessage: string = ''

  beforeMount() {
    this.getUser()
  }
  

  /**
   * 
   */
  updateCoverage() {
    this.responseMessage = ''

    httpAuth.put('instructor-coverage', {
      radius: this.radius,
      postcode: this.postcode
    })
      .then(res => {
        this.getUser()
        this.responseMessage = 'updated'        
      })
      .catch(err => {
        this.responseMessage = 'issue updating'
        throw new Error(err)
      })
  }


  /** 
   * 
   */
  getUser() {
    httpAuth.get('user-db')
      .then(res => {
        this.user = res.data
        this.radius = this.user.radius 
        this.postcode = this.user.postcode
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>