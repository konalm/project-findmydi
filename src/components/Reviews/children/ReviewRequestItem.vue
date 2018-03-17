<template>
<div class="modal-box">
  <div class="modal-box__header">
    Review Invitation
  </div>

  <div class="modal-box__body">
    <p> {{ reviewRequest.name }} </p>
    <p> {{ reviewRequest.email }} </p>
    <p> {{ requestDate }} </p>

    <p class="text-danger" v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <p class="text-success" v-if="message">
      {{ message }}
    </p>

    <div class="modal-box__button-container">
      <button class="base-button blue" v-on:click="cancelInvite()">Cancel</button>
      <div class="spacer"></div>
      <button class="base-button" v-on:click="resendInvite()">Resend</button>
    </div>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue' 
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import moment from 'moment'
import {httpAuth} from '@/http-requests'


@Component({})
export default class ReviewRequestItem extends Vue {
  errorMessage: string = ''
  message: string = ''

  @Prop() reviewRequest: {id, name, email, timestamp}


  get requestDate() {
    return moment(this.reviewRequest.timestamp).format('DD/MM/YYYY')
  }

  /**
   * resend email for review invitation 
   */
  resendInvite() {
    this.errorMessage, this.message = ''

    httpAuth.get(`resend-review-invite/${this.reviewRequest.id}`)
      .then(() => {
        this.message = 'review invitation has been resent via email just now'
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }


  /** 
   * cancel review invitation
   */
  cancelInvite() {
    this.errorMessage = ''

    httpAuth.delete(`review-invite-tokens/${this.reviewRequest.id}`)
      .then(() => {
        this.$emit('reviewInvitesModified')
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }
}
</script>



<style lang="scss" scoped>
.modal-box {
  .modal-box__body {
    text-align: center;
    padding-right: 30px;
    padding-top: 15px;

    p {
      margin: 0;
      line-height: 33px;
    }

    .modal-box__button-container {
      margin-top: 20px;

      .spacer {
        width: 30px;
      }

      button {
        width: 200px;
      }
    }
  }
}
</style>
