<template>
  <div class="page-wrapper">
    <logged-out-header
      :loggedIn="false" 
    />

    <div class="login-page">
      <div class="login-container">
        <h1 class="text-center">Sign In</h1>

        <div class="container my-form">
          <form v-on:submit.prevent="submitLogin()">
            <!-- Email -->
            <div class="form-row">
              <input 
                type="email"
                class="form-control"
                placeholder="Enter Email"
                v-model="email" 
              >
            </div>

            <!-- password -->
            <div class="form-row">
              <input 
                type="password"
                class="form-control"
                placeholder="Enter Password"
                v-model="password" 
              >
            </div>

            <p class="text-danger" v-if="errorMessage">
              {{ errorMessage }}
            </p> 

            <div class="form-row">
              <button type="submit" class="form">Sign Me In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {http} from '@/http-requests'
import {httpAuth, updateHttpHeader} from '@/http-requests'

import router from '@/router'

import LoggedOutHeader from '@/components/patterns/logged-out-header'


@Component({
  components: {
    LoggedOutHeader
  }
})
export default class InstructorLogin extends Vue {
  email: string = ''
  password: string = ''
  errorMessage: string = ''
  userType: number = 1

  beforeMount() {
    document.body.className = 'white-background'
  }
  
  /**
   * submit email and password to api for credential check
   * if successfully store access token recieved in Cookie and Store
   */
  submitLogin() {
    if (!this.validation()) { return }

    http.post('login', {
      email: this.email,
      password: this.password 
    })
    .then(res => {
      localStorage.setItem('token', res.data.access_token)
      updateHttpHeader()

      router.push({name: 'InstructorProfile'})
    })
    .catch((err) => {
      this.errorMessage = err.response.data
    })
  }

  /**
   * validate user inputs
   */
  validation() {
    this.errorMessage = ''

    if (!this.email) {
      this.errorMessage = 'Must enter email'
      return false
    }

    if (!this.password) {
      this.errorMessage = 'Must enter password'
      return false
    }

    return true
  }
}
</script>



<style lang="scss" scoped src="./instructor-login.scss" />
