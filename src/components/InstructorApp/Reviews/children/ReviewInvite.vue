<template>
<div>
  <div class="modal-box review-invite" v-if="!invite" v-on:click="toggleInvite()">
    <p v-if="!invite">
      <i class="fa fa-paper-plane"></i> Send Review Invitation
    </p>
  </div>

  <!-- insert -->
  <div class="modal-box review-invite inputs" v-if="invite">
    <div class="close-button__container">     
      <button class="close-button small" v-on:click="toggleInvite()">
        <i class="material-icons">close</i>
      </button>
    </div>

    <input type="text" placeholder="name" v-model="name" />
    <input type="text" placeholder="email" v-model="email" />

    <p class="text-danger error-message" v-if="errorMessage"> {{ errorMessage }} </p>

    <button class="base-button padded-button" v-on:click="sendInvite()">
      Send Email
    </button>
  </div>
</div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import emailValidation from '@/services/email-validation'


@Component({})
export default class ReviewInvite extends Vue {
  invite: boolean = false
  name: string = ''
  email: string = ''
  errorMessage: string = ''

  /** 
   * 
   */
  toggleInvite() {
    this.invite = !this.invite
  }

  /** 
   * send/email review invite 
   */
  sendInvite() {
    if (this.validation()) { return }

    httpAuth.post('email-review-invite', {
      name: this.name,
      email: this.email 
    })
      .then(res => {
        console.log('invite sent')
        this.name = ''
        this.email = ''
        this.toggleInvite()
        this.$emit('inviteSent')
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }

  /** 
   * 
   */
  validation() {
    if (!this.name) {
      return this.errorMessage = 'Name is required'
    }

    if (!this.email) {
      return this.errorMessage = 'Email is required'
    }

    if (!emailValidation(this.email)) {
      return this.errorMessage = 'You entered an invalid email address'
    }
  }
}
</script>



<style lang="scss" scoped>
@import "../../../../scss/variables.scss";

.modal-box.review-invite {
  text-align: center;
  padding: 20px 20px 20px 20px;
  margin-bottom: 40px;
  font-size: 18px;
  cursor: pointer;

  .close-button__container {
    text-align: left;
    margin-bottom: 15px;
  }

  &.inputs {
    padding: 20px 20px 20px 20px;
  }

  input {
    width: 100%;
    margin-bottom: 20px;
  }

  p {
    margin: 0;
  }
  
  p.error-message {
    margin-bottom: 20px;
    text-align: left;
  }

  .fa {
    color: $primary-color;
    margin-right: 10px;
  }
}
</style>
