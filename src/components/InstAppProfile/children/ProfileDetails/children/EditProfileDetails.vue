<template>
  <div class="modal-box__body">
    <p class="form-text"> First name
      <input type="text" class="form-group" placeholder="First name" 
        v-model="updateFirstName" 
      />
    </p>

     <p class="form-text"> Surname
      <input type="text" class="form-group" placeholder="Surname" 
        v-model="updateSurname" 
      />
    </p>

    <p class="form-text"> Email
      <input type="text" class="form-group" placeholder="Email" 
        v-model="updateEmail" 
      />
    </p>

    <p class="form-text"> Contact NO
      <input type="number" class="form-group" placeholder="Contact NO" 
        v-model="updateNumber" 
      />
    </p>

    <p class="form-text"> Hourly Rate £
      <input type="number" class="form-group hourly-rate" placeholder="Houry rate" 
        v-model="updateHourlyRate" 
      />
    </p> 

    <div class="offer-container">
      <p class="form-text"> Offer </p> 

      <textarea type="text" class="form-group" v-model="updateOffer" row="4" cols="50">
      </textarea>
    </div>

    <p class="text-danger"> {{ actionResponse.message }} </p>

    <div class="modal-box__button-container">
      <button class="base-button secondary"
        v-on:click="$emit('toggleEditMode')"
      >
        cancel 
      </button>

      <div class="spacer"> </div>

      <button class="base-button"
        v-on:click="updateProfileDetails()"
      >
        update 
      </button>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'
import emailValidator from '@/services/email-validation'


@Component({})
export default class EditProfileDetails extends Vue {
  updateFirstName: string = ''
  updateSurname: string = ''
  updateEmail: string = ''
  updateNumber: number = null
  updateHourlyRate: number = null 
  updateOffer: string = ''

  actionResponse = {
    valid: false,
    message: ''
  }

  @Prop() 
    userDetails: {
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

  beforeMount() {
    this.assignUpdateProperties()
  }

   /**
   * update profile 
   * get Api response message for the UI
   */
  updateProfileDetails() {
    if (!this.validate()) { return }

    httpAuth.put('instructors-profile', {
      firstName: this.updateFirstName,
      surname: this.updateSurname,
      email: this.updateEmail,
      contactNumber: this.updateNumber,
      hourlyRate: this.updateHourlyRate,
      offer: this.updateOffer
    })
      .then(res => {
        this.actionResponse.valid = true
        this.actionResponse.message = 'Profile details updated'
        this.$emit('profileUpdated')
      })
      .catch(err => {
        this.actionResponse.valid = false
        this.actionResponse.message = err.response.data
      })
  }


  /** 
   * 
   */
  assignUpdateProperties() {
    this.updateFirstName = this.userDetails.first_name
    this.updateSurname = this.userDetails.surname
    this.updateEmail = this.userDetails.email
    this.updateNumber = this.userDetails.contact_number
    this.updateHourlyRate = this.userDetails.hourly_rate
    this.updateOffer = this.userDetails.offer
  }


  /**
   * validate profile inputs
   */
  validate() {
    this.actionResponse.message = '' 

    if (!this.updateFirstName) {
      this.actionResponse.valid = false
      this.actionResponse.message = 'First name is required'
      return false
    }

    if (!this.updateSurname) {
      this.actionResponse.valid = false
      this.actionResponse.message = 'Surname is required'
      return false
    }

     if (!this.updateEmail) {
      this.actionResponse.valid = false
      this.actionResponse.message = 'Email is required'
      return false
    }

    if (!emailValidator(this.updateEmail)) {
      this.actionResponse.valid = false 
      this.actionResponse.message = 'Email is invalid'
      return false
    }

    if (!this.updateNumber) {
      this.actionResponse.valid = false
      this.actionResponse.message = 'Contact number is required'
      return false
    }

    if (!this.updateHourlyRate) {
      this.actionResponse.valid = false
      this.actionResponse.message =  'Hourly rate is required'
      return false
    }

    return true
  }
}
</script>



<style lang="scss" scoped>
  p.form-text {
    font-size: 14px;
    color: #666767;
  }


  input, textarea {
    margin-left: 15px;
    color: #818181;
    width: 227px;
    height: 40px;
  }

  input.hourly-rate {
    width: 100px;
  }

  textarea {
    width: 300px;
    height: 120px;
    font-size: 14px;
    resize: none;
  }

  .offer-container {
    display: flex;
  }

  .modal-box__body {
    .modal-box__button-container {
      margin-top: 20px;

      .spacer {
        width: 60px;
      }

      button {
        width: 150px;
      }
    }
  }
</style>
