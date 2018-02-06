<template>
<div class="instructor-result">
  <div class="avatar-container"> 
    <img v-bind:src="avatarPhotoSrc" class="adi-licence-upload" />
  </div>

  <div class="profile-container">
    <p class="name">{{ fullName }}</p>
    <p>Verified: <i class="fa fa-check"></i></p>

    <p> 
      <i class="fa fa-male" v-if="gender === 'Male'"></i>
      <i class="fa fa-female" v-if="gender === 'Female'"></i>
      {{ gender }}
    </p>

    <p>Hourly Rate: £ {{ hourlyRate }}</p>

    <p v-if="instructor.offer">
      <span class="offer">Offer:</span> 
      {{ instructor.offer }} 
    </p>
  </div>

  <div class="contact-container">  
    <p> <i class="fa fa-envelope"></i> {{ instructor.email }} </p> 
    <p> <i class="fa fa-phone"></i> {{ instructor.contact_number }} </p>
  </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {getApiUrl} from '@/globals'



@Component({})
export default class InstructorResult extends Vue {

  @Prop() instructor: {
    id: null,
    first_name: '',
    surname: '',
    gender: '',
    email: '',
    hourly_rate: '',
    contact_number: '',
    offer: ''
  }

  /**
   * First letters of first name and surname to capitals
   */
  get fullName() {
    const firstName = this.instructor.first_name
    const surname = this.instructor.surname

    return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}
      ${surname.charAt(0).toUpperCase()}${surname.slice(1)}`
  }

  /** 
   * First letter of gender to capital
   */
  get gender() {
    const gender = this.instructor.gender

    return `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`
  }

  /**
   * Add two decimals to hourly rate for pence
   */
  get hourlyRate() {
    return parseInt(this.instructor.hourly_rate).toFixed(2)
  }

   get avatarPhotoSrc() {
    return `${getApiUrl()}img/avatar/${this.instructor.id}`
  }
}
</script>



<style lang="scss" scoped>
.instructor-result {
  display: flex;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, .05);
  padding: 20px;
  width: 850px;
  margin: 0 auto;
  margin-bottom: 40px;  

  .avatar-container {
    margin-right: 30px;

    img {
      width: 170px;
      margin-top: 20px;
    }
  }

  .profile-container {
    p.name {
      font-weight: bold;
      font-size: 22px;
      color: rgb(120,120,120);
    }

    .fa-check {
      color: green;
    }

    .fa-male {
      color: #6255FF;
    }

    .fa-female {
      color: #FF559D;
    }

    .seperator {
      margin-left: 10px;
      margin-right: 10px;
    }

    .fa-envelope, .fa-phone {
      opacity: 0.6;
    }

    span.offer {
      text-decoration: underline;
    }
  }

  .contact-container {
    flex-grow: 1;
    text-align: right;
  }
}
</style>