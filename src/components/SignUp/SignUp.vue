<template>
  <div class="page-wrapper">
    <logged-out-header :loggedIn="false" />

    <div class="signup-container">
      <h1 class="text-center"> Sign Up </h1>

      <div class="container my-form">
        <form v-on:submit.prevent="submitSignUp()" v-if="!registered">
          <!-- name -->
          <div class="form-row split form-group">
            <input type="text" class="form-control" placeholder="First Name"
              v-model="firstName"
            >

            <input type="text"  class="form-control" placeholder="Surname"
              v-model="surname"
            >
          </div>

          <!-- email -->
          <div class="form-row">
            <input type="email" class="form-control" placeholder="Email Address"
              v-model="email"
            >
          </div>

          <!-- adi license number -->
          <div class="form-row">
            <input  type="number"  class="form-control" placeholder="ADI License Number" 
              v-model="adi"
            >
          </div>

          <!-- password -->
          <div class="form-row">
            <input type="password" class="form-control" placeholder="Password"
              v-model="password"
            >
          </div>

          <!-- confirm pasword -->
          <div class="form-row">
              <input type="password" class="form-control" placeholder="Confirm Password" 
                v-model="confirmPassword"
              >
          </div>

          <div class="form-row">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" value="female"
                v-model="gender"
              >
              Female
            </label>

              <label class="form-check-label male">
                <input type="radio" class="form-check-input" value="male" checked
                  v-model="gender"
                >
                Male
            </label>
          </div>

          <div class="form-row">
            <button type="submit" class="form">Sign Me Up</button>
          </div>

          <!-- error message -->
          <div class="form-group mt-3" v-if="errorMessage">
            <p class="text-danger">{{ errorMessage }}</p>
          </div>
        </form>

        <sign-up-success v-if="registered" />
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import {http} from '../../http-requests'
import signUpSuccess from './SignUpSuccess.vue'

import LoggedOutHeader from '@/components/patterns/logged-out-header'


@Component({
  components: {
    signUpSuccess,
    LoggedOutHeader
  }
})
export default class SignUp extends Vue {
  firstName: string = ''
  surname: string = ''
  email: string = ''
  adi: string = ''
  password: string = ''
  confirmPassword: string = ''
  gender: string= ''
  registered: boolean = false
  errorMessage: string = ''

  beforeMount() {
    document.body.className = 'grey-background'    
  }


  /**
   * submit sign up details to the api to create new user model 
   */
  submitSignUp() { 
    if (!this.validate()) { return }

    http.post('instructors', {
      firstName: this.firstName,
      surname: this.surname,
      email: this.email,
      adiLicenseNo: this.adi,
      gender: this.gender,
      password: this.password,
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

  /**
   * validate inputs
   */
  validate() {
    this.errorMessage = ''

    if (!this.firstName) {
      this.errorMessage = 'First name is required'
      return false
    }

    if (!this.surname) {
      this.errorMessage = 'Surname is required'
      return false
    }

    if (!this.email) {
      this.errorMessage = 'Email is required'
      return false
    }

    if (!this.adi) {
      this.errorMessage = 'ADI license no is required'
      return false
    }

    if (!this.password) {
      this.errorMessage = 'Password is required'
      return false
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Confirm password does not match'
      return false
    }

    if (!this.gender) {
      this.errorMessage = 'Gender is required'
      return false
    }

    return true
  }
}
</script>



<style scoped lang="scss" src="./sign-up.scss" />