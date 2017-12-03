<template>
  <div>
    <h1 class="text-center">
      Sign Up and Let Your future student's find you
    </h1>

    <div class="container mt-5">
      <form v-on:submit.prevent="submitSignUp()" v-if="!registered">
        <!-- full name -->
        <div class="form-group">
          <label>Full name</label>

          <input 
            type="text" 
            class="form-control"
            placeholder="Enter full name"
            v-model="name"
          >
        </div>

        <!-- email -->
        <div class="form-group">
            <label>Email</label>

            <input 
              type="email" 
              class="form-control"
              placeholder="Enter Email Address"
              v-model="email"
            >
        </div>

        <!-- postcode -->
        <div class="form-group">
            <label>Postcode</label>
            
            <input 
              type="text" 
              class="form-control" 
              placeholder="Enter Postcode Where you wish to give lessons" 
              v-model="postcode"
            >
        </div>

        <!-- range -->
        <div class="form-group">
          <label>Range</label>
          
          <input 
            type="number" 
            class="form-control" 
            placeholder="Enter mile radius you wish to cover" 
            v-model="range"
          >
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>

        <!-- error message -->
        <div class="form-group mt-3" v-if="errorMessage">
          <p class="text-danger">{{ errorMessage }}</p>
        </div>
      </form>

      <sign-up-success v-if="registered" />
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import {http} from '../../http-requests'

import signUpSuccess from './SignUpSuccess.vue'


@Component({
  components: {
    signUpSuccess
  }
})
export default class InstructorSignUp extends Vue {
  name: string = ''
  email: string = ''
  postcode: string = ''
  range: number = 0
  registered: boolean = false
  errorMessage: string = ''

  /**
   * submit sign up details to the api to create new user model 
   */
  submitSignUp() { 
    this.errorMessage = ''

    http.post('users', {
      name: this.name,
      email: this.email,
      postcode: this.postcode,
      range: this.range
    })
      .then(res => {
        this.registered = true
      })
      .catch(err => { 
        if (err.response.status === 403) {
          this.errorMessage = err.response.data
        }

        throw new Error(err) 
      })
  }
}
</script>