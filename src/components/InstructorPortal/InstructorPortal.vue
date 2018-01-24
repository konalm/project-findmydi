<template>
  <div class="portal-page">
    <InstructorHeader :loggedIn="true" />
    
    <div class="container mt-5 instructor-portal">
      <div class="instructor-portal__left-side">
        <profile 
          :userProfile="user" 
          v-on:profileUpdated="getUser"
        />

        <coverage
          :coverage="coverage" 
          v-on:coverageModified="getUser"  
        />

        <stats />
      </div>

      <div class="spacer"></div>

      <div class="instructor-portal__right-side">
        <avatar 
          :user="user" 
          v-on:newAvatarUploaded="getUser"
        />

        <verification-request :verified="user.verified" />

        <VerificationRequirments
          :hourlyRate="user.hourly_rate"
          :coverages="coverage" 
          :avatar="user.avatar_url"
          :verified="user.verified"
        />
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
import InstructorHeader from '@/components/patterns/instructor-header'
import Profile from './children/Profile.vue'
import Coverage from './children/coverage'
import Stats from './children/Stats.vue'
import VerificationRequirments from './children/VerificationRequirments.vue'


@Component({
  components: {
    Avatar,
    VerificationRequest,
    InstructorHeader,
    Profile,
    Coverage,
    Stats,
    VerificationRequirments
  }
})
export default class InstructorPortal extends Vue {
  profilePic: string = ''
  coverage = []

  user = {
    id: '',
    firstName: '',
    surname: '',
    email: '',
    contact_number: null,
    hourly_rate: '',
    postcodes: '',
    radius: '',
    verified: false,
    avatar_url: '',
    coverages: {}
  }

  get postcodes() {
    if (!this.user.postcodes) { return }

    return this.user.postcodes.split(",");
  }

  beforeMount() {
    this.getUser()
  }

  /**
   * get instructor from the api
   */
  getUser() {
    httpAuth.get('instructor')
      .then(res => {
        this.user = res.data
        this.coverage = JSON.parse(res.data.coverages)        
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>



<style lang="scss" scoped src="./instructor-portal.scss" />