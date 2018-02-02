<template>
  <div class="container">
    <h3 class="text-center">Super Admin</h3>

    <form v-on:submit.prevent="submit()">
      <!-- -->
      <div class="form-group">
        <input 
          type="text"
          class="form-control"
          placeholder="user name"
          v-model="username"
        >
      </div>

      <!-- -->
      <div class="form-group">
        <input 
          type="password"
          class="form-control"
          placeholder="password"
          v-model="password"
        >
      </div>

      <div class="form-group">
        <button class="btn btn-primary">
          Submit
        </button>
      </div>

      <div class="form-group">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import cookies from 'js-cookie'
import {httpAuth, updateHttpHeader} from '@/http-requests'
import router from '@/router'

@Component({})
export default class SuperAdminLogin extends Vue {
  username: string = ''
  password: string = ''
  errorMessage: string = ''

  /**
   * super username and password to api for verification
   */
  submit() {
    if (!this.validation()) { return }

    httpAuth.post('super-admin-login', {
      username: this.username,
      password: this.password
    })
      .then(res => {
        localStorage.setItem('token', res.data.access_token)
        updateHttpHeader()

        router.push({name: 'InstructorAdiReviews'})
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /**
   * validate all inputs where entered 
   */
  validation() {
    this.errorMessage = ''

    if (!this.username) {
      this.errorMessage = 'enter username'
      return false
    }

    if (!this.password) {
      this.errorMessage = 'enter password'
      return false
    }

    return true
  }
}
</script>

