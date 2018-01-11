<template>
  <div class="portal-page">
    <Header />
    
    <div class="container mt-5 instructor-portal">
      <div class="instructor-portal__left-side">
        <profile />
        <coverage />
        <stats />
      </div>

      <div class="spacer"></div>

      <div class="instructor-portal__right-side">
        <avatar 
          :user="user" 
          v-on:newAvatarUploaded="getUser"
        />

        <verification-request
          :verifiedStatus="user.verified"
        />

        <VerificationRequirments />
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '../../http-requests'
import Avatar from './children/Avatar.vue'
import VerificationRequest from './children/UserVerifiedStatus.vue'
import Header from '@/components/patterns/header'
import Profile from './children/Profile.vue'
import Coverage from './children/Coverage.vue'
import Stats from './children/Stats.vue'
import VerificationRequirments from './children/VerificationRequirments.vue'


@Component({
  components: {
    Avatar,
    VerificationRequest,
    Header,
    Profile,
    Coverage,
    Stats,
    VerificationRequirments
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



<style lang="scss" scoped src="./instructor-portal.scss" />