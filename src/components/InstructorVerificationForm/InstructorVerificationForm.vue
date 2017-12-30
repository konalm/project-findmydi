<template>
  <div class="container">
    <h3 class="text-center">Verification Form</h3>

    <form v-on:submit.prevent="submitForReview()">
      <div class="form-group">
        <!--  -->
        <label>ADI License No.</label>

        <input 
          type="text"
          class="form-control"
          placeholder="Enter Your Approved Driving Instructor Number"
          v-model="adiNo"
        >
      </div>

      <!-- -->
      <div class="form-group">
        <label>License held since</label>

        <input 
          type="number"
          class="form-control w-50"
          placeholder="Month"
          v-model="licenseSinceMonth"
        >

        <input 
          type="number"
          class="form-control w-50 mt-1"
          placeholder="Year"
          v-model="licenseSinceYear"
        >
      </div>

      <upload-adi-license
        v-on:updatePhoto="updateAdiLicensePhoto" 
      />

      <div class="form-group">
        <button class="btn btn-primary">
          Submit for Review 
        </button>
      </div>

      <div class="form-group">
        {{ submitResponse }}
      </div>
    </form>
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import router from '@/router'
import uploadAdiLicense from './children/UploadAdiLicense.vue'
import {httpAuth} from '@/http-requests'

@Component({
  components: {
    uploadAdiLicense
  }
})
export default class InstructorVerification extends Vue {
  adiNo: string = ''
  licenseSinceMonth: string = ''
  licenseSinceYear: string = ''
  adiLicensePhoto: string = ''
  submitResponse: string = ''

  get user() {
    return this.$store.getters.user
  }

  beforeMount() {
    this.checkInstructorNotVerified()
  }

  /**
   * check instructor is not already verified, 
   * If there are then redirect them
   */
  checkInstructorNotVerified() {
    if (this.user.verified === 1) {
      router.push({name: 'InstructorPortal'})
      return
    }

    httpAuth.get('user-db')
      .then(res => {
        if (res.data.verified === 1) {
          router.push({name: 'InstructorPortal'})
          return
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  

  /** 
   * 
   */
  updateAdiLicensePhoto(file) {
    this.adiLicensePhoto = file
  }

  /** 
   * submit credentials for review by super admin (Connor)
   * redirect back to portal
   */
  submitForReview() {
    this.submitResponse = '';
    let data = new FormData()
    data.append('adiLicensePhoto', this.adiLicensePhoto)
    data.append('adiNo', this.adiNo)
    data.append('licenseSinceMonth', this.licenseSinceMonth)
    data.append('licenseSinceYear', this.licenseSinceYear)

    httpAuth.post('verification-details', data)
      .then(res => {
        this.submitResponse = 
        'Your details have been submitted for review, you can expect' +
        ' a response within 24 hours.'

        router.push({name: 'InstructorPortal'})
      })
      .catch(err => {
        this.submitResponse = 
          'There was an issue submitting your details for review'
          
        throw new Error(err)
      })
  }
}
</script>
