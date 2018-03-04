<template>
  <div class="modal-box">
    <div class="modal-box__header">
      Your Details
      <i class="fa fa-edit" v-on:click="toggleEditMode()"></i>
    </div>

    <div class="modal-box__body" v-if="!editMode">
      <p>ADI No: {{ userProfile.adi_license_no }}</p>
      <p>{{ fullName }} </p> 
      <P> {{ userProfile.gender }} </P>
      <p>{{ userProfile.email }}</p>
      <p> Contact Number: {{ userProfile.contact_number }}</p>
      <p>Verified: <status-symbol :status="userProfile.verified" /></p> 
      <p> Hourly Rate: {{ userProfile.hourly_rate }} </p> 
      <p>Offer: {{ userProfile.offer}} </p> 
    </div>

    <edit-profile-details 
      v-if="editMode"
      :userDetails="userProfile" 
      v-on:profileUpdated="profileUpdated()"
      v-on:toggleEditMode="toggleEditMode()"
    />
  </div>
</template>
 


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'
import StatusSymbol from '@/components/patterns/status-symbol'
import EditProfileDetails from './children/EditProfileDetails.vue'


@Component({
  components: {
    StatusSymbol,
    EditProfileDetails
  }
})
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

  /** 
   * when profile updated by child, toggle edit mode off and emit event to parent
   * to get user 
   */
  profileUpdated() {
    this.toggleEditMode()
    this.$emit('profileUpdated')
  }

  /***
   * switch edit mode on/off
   */
  toggleEditMode() {
    this.editMode = !this.editMode
  }
}
</script>



