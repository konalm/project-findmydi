<template>
<div class="portal-page">
  <inst-app-header :loggedIn="true" />
  <page-header :header="'Profile'" />
  <inst-app-navbar />
  
  <div class="container mt-5 instructor-portal">
    <div class="instructor-portal__left-side">
      <adi-licence-review 
        v-if="parseInt(user.adi_licence_verification) !== 1"
        :status="user.adi_licence_verification" 
        :rejectReason="user.adi_licence_reject_reason"
        v-on:uploadAdiLicence="showUploadAdiLicence()"
      />

      <profile-details
        :userProfile="user" 
        v-on:profileUpdated="getUser"
      />
    </div>

    <div class="spacer"></div>

    <div class="instructor-portal__right-side">
      <avatar 
        :user="user" 
        v-on:newAvatarUploaded="getUser"
      />
    </div>
  </div>

  <adi-licence-upload 
    v-on:adiLicenceUploaded="getUser" 
  />
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import {httpAuth} from '../../http-requests'
import Avatar from './children/Avatar.vue'
import VerificationRequest from './children/UserVerifiedStatus.vue'
import InstAppHeader from '@/components/patterns/InstAppHeader'
import PageHeader from '@/components/patterns/PageHeader.vue'
import InstAppNavbar from '@/components/patterns/InstAppNavbar.vue'
import AdiLicenceUpload from './children/AdiLicenceUpload'
import ProfileDetails from './children/ProfileDetails'
import AdiLicenceReview from './children/AdiLicenceReview.vue'
// import Stats from './children/Stats.vue'
// import VerificationRequirments from './children/VerificationRequirments.vue'

import location from '../../googleapis/location'


@Component({
  components: {
    Avatar,
    VerificationRequest,
    InstAppHeader,
    PageHeader,
    InstAppNavbar,
    ProfileDetails,
    AdiLicenceUpload,
    AdiLicenceReview
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
    coverages: {},
    adi_licence_verification: null,
    adi_licence_reject_reason: null
  }

  get postcodes() {
    if (!this.user.postcodes) { return }

    return this.user.postcodes.split(",");
  }

  /**
   * show open upload adi licence modal box 
   */
  showUploadAdiLicence() {
    $("#myModal").modal()
  }


  beforeMount() {
    this.getUser()
    document.body.className = 'grey-background'    
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