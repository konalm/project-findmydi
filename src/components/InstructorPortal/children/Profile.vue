<template>
<div class="white-modal-box">
  <p class="modal-box-header">Profile</p>

  <div class="white-modal-box__container">
    <p>ADI No: {{ userProfile.adi_license_no }}</p>
    <p>{{ fullName }} </p> 
    <P> {{ userProfile.gender }} </P>
    <p>{{ userProfile.email }}</p>

    <!-- Contact Number -->
    <p v-if="!editMode"> Contact Number: {{ userProfile.contact_number }}</p>

    <p v-if="editMode">
      Contact Number: 
      <input type="number" class="form-group" v-model="updateContactNumber" />
    </p>


    <p>Verified:  
      <i 
        class="fa fa-times text-danger" 
        aria-hidden="true" 
        v-if="!userProfile.verified"
      >
      </i> 

      <i 
        class="fa fa-check text-success" 
        aria-hidden="true"
        v-if="userProfile.verified"
      >
      </i>
    </p> 

    <!-- Hourly Rate -->
    <p v-if="!editMode"> Hourly Rate: {{ userProfile.hourly_rate }} </p> 

     <p v-if="editMode"> 
       Hourly Rate: 
      <input type="number" class="form-group" v-model="updateHourlyRate" />
    </p>

    <!-- Offer -->
    <p v-if="!editMode">Offer: {{ userProfile.offer}} </p> 

    <p v-if="editMode">
      Offer: 
    </p>
    
    <textarea 
      type="text" 
      class="form-group" 
      v-model="updateOffer" 
      row="4"
      cols="50"
      v-if="editMode"
    >
    </textarea>

    <div class="white-modal-box__button-container" v-if="!editMode">
      <button 
        class="small blue"
        v-on:click="toggleEditMode()"
      >
        edit 
      </button>
    </div>

    <div class="white-modal-box__button-container" v-if="editMode">
       <button 
        class="small blue"
        v-on:click="toggleEditMode()"
      >
        cancel 
      </button>

      <button 
        class="small blue"
        v-on:click="updateProfile()"
      >
        update 
      </button>
    </div>

    <p 
      class="api-response mt-3" 
      v-bind:class="[
        {'text-success': updateResponse.valid}, 
        {'text-danger': !updateResponse.valid}
      ]" 
      v-if="updateResponse.message"
    >
      {{ updateResponse.message }}
    </p>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'


@Component({})
export default class Profile extends Vue {
  editMode: boolean = false
  updateContactNumber: number = null
  updateHourlyRate: number = 0
  updateOffer: string = ''

  updateResponse = {
    valid: false,
    message: ''
  }


  @Prop() 
    userProfile: {
      adi_license_no: '',
      first_name: '',
      surname: '',
      email: '',
      contact_number: null,
      gender: '',
      verified: false,
      hourly_rate: 0,
      offer: ''
    }

  get fullName() {
    return `${this.userProfile.first_name} ${this.userProfile.surname}`
  }

  /***
   * switch edit mode on/off
   */
  toggleEditMode() {
    this.editMode = !this.editMode
    this.resetUpdateProperties()
  }

  /**
   * update profile 
   * get Api response message for the UI
   */
  updateProfile() {
    if (!this.validate()) { return }

    httpAuth.put('instructors-profile', {
      contactNumber: this.updateContactNumber,
      hourlyRate: this.updateHourlyRate,
      offer: this.updateOffer
    })
      .then(res => {
        this.updateResponse.valid = true
        this.updateResponse.message = 'Profile updated'
        this.editMode = false
        this.$emit('profileUpdated')
      })
      .catch(err => {
        this.updateResponse.valid = false
        this.updateResponse.message = err.response.data
      })
  }

  /**
   * 
   */
  resetUpdateProperties() {
    this.updateContactNumber = this.userProfile.contact_number
    this.updateHourlyRate = this.userProfile.hourly_rate
    this.updateOffer = this.userProfile.offer
  }

  /**
   * validate profile inputs
   */
  validate() {
    this.updateResponse.message = '' 

    if (!this.updateContactNumber) {
      this.updateResponse.valid = false
      this.updateResponse.message = 'contact number is required'
      return false
    }

    if (!this.updateHourlyRate) {
      this.updateResponse.valid = false
      this.updateResponse.message =  'hourly rate is required'
      return false
    }

    if (!this.updateOffer) {
      this.updateResponse.valid = false
      this.updateResponse.message = 'offer is required'
      return false
    }

    return true
  }
}
</script>



