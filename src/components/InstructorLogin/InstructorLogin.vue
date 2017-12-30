<template>
  <div>
    <h1 class="text-center">Instructor Login</h1>

    <div class="container mt-5">
      <form v-on:submit.prevent="submitLogin()">
        <!-- Email -->
        <div class="form-group">
          <label>Email</label>

          <input 
            type="email"
            class="form-control"
            placeholder="Enter Email"
            v-model="email" 
          >
        </div>

        <!-- password -->
        <div class="form-group">
          <label>Password</label>

          <input 
            type="password"
            class="form-control"
            placeholder="Enter Password"
            v-model="password" 
          >
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {http} from '@/http-requests'
import cookies from 'js-cookie'
import router from '@/router'


@Component({})
export default class InstructorLogin extends Vue {
  email: string = ''
  password: string = ''

  submitLogin() {
    http.post('login', {
      email: this.email,
      password: this.password 
    })
    .then(res => {
      cookies.set('findmydi_token', res.data.access_token)
      this.$store.commit('setAccessToken', res.data.access_token)

      router.push({name: 'InstructorPortal'})
    })
    .catch((err) => {
      throw new Error(err)
    })
  }
}
</script>

