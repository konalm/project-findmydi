<template>
  <div>
    <h1 class="text-center"> Instructor Portal </h1>

    <div class="container mt-5">
      <p class="lead bold"> <strong>Name:</strong> {{ user.name }}</p>
      <p class="lead"> <strong>Email:</strong> {{ user.email }}</p>

      <div class="avatar-upload">
        <instructor-avatar 
          :user="user" 
          v-on:newAvatarUploaded="getUser"
        />
      </div>

      <div v-if="user.verified === 1">
        <p class="text-success">
          Verified <i class="fa fa-check" aria-hidden="true"></i>
        </p>
      </div>

      <div class="coverage">
        <p class="lead">Postcode: {{ postcode }}</p>
        <p class="lead">Radius: {{ radius }}</p>

        <router-link to="/coverage">
          <button class="btn btn-primary">Update Coverage</button>
        </router-link>
      </div>

      <verified-status-message
        :verifiedStatus="user.verified"
      />
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '../../http-requests'
import InstructorAvatar from './children/Avatar.vue'
import VerifiedStatusMessage from './children/UserVerifiedStatus.vue'



@Component({
  components: {
    InstructorAvatar,
    VerifiedStatusMessage
  }
})
export default class InstructorPortal extends Vue {
  profilePic: string = ''

  user = {
    id: '',
    name: '',
    email: '',
    postcode: '',
    radius: '',
    verified: 0,
    has_avatar: 0,
  }

  get postcode() {
    return this.user.postcode ? this.user.postcode : 'not yet specified'
  }

  get radius() {
    return this.user.radius ? this.user.radius : 'not yet specified'
  }

  beforeMount() {
    this.getUser()
  }

  getUser() {
    httpAuth.get('user-db')
      .then(res => {
        this.user = res.data
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /**
   * 
   */
  updateProfilePic(targetFiles) {
    this.profilePic = targetFiles[0]
  }

  /**
   * send uploaded pic to the api to be stored
   */
  uploadProfilePic () {
    let data = new FormData()
    data.append('file', this.profilePic)

    httpAuth.post('/upload-profile-pic', data)
      .then(res => {

      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>