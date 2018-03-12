<template>
<div class="write-review-page">
  <user-header />
  <page-header v-if="validReviewToken && !reviewSubmitted && !forbidden"
    :header="`Driving instructor review for ${reviewInvite.instructor_name}`" 
    :textCenter="true" 
  />

  <div class="container mt-5" v-if="validReviewToken && !forbidden">
    <div class="modal-box" v-if="!reviewSubmitted">
      <div class="modal-box__body">
        <p> Tell us about your experience</p> 

        <textarea placeholder="your experience" v-model="message"></textarea>

        <div class="rating-container">
          <p> Rate your experience out of <span class="underline">10</span></p>

          <div class="slider-container">
            1
            <input type="range" min="1" max="10" value="5" class="slider" step="0.5"
              v-model="rating"
            />
            10
          </div>

          <div class="rating-text-container">
            <p class="rating">{{ rating }}</p>
          </div>
        </div>

        <!-- error -->
        <p class="text-danger" v-if="errorMessage">
          {{ errorMessage}}
        </p>

        <button class="base-button padded-button" v-on:click="submitReview()">
          Submit Review
        </button>
      </div>
    </div>

    <review-submitted-message v-if="reviewSubmitted" />
  </div>

  <forbidden-message v-if="forbidden" />
</div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import UserHeader from '@/components/patterns/user-header'
import PageHeader from '@/components/patterns/PageHeader.vue'
import ReviewSubmittedMessage from '@/components/patterns/ReviewSubmitted.vue'
import ForbiddenMessage from './children/ForbiddenMessage.vue'
import {http} from '@/http-requests'
import router from '@/router'


@Component({
  components: {
    UserHeader,
    PageHeader,
    ReviewSubmittedMessage,
    ForbiddenMessage
  }
})
export default class WriteReview extends Vue {
  message: string = ''
  rating: number = 7.5
  inviteToken: string = ''
  validReviewToken: boolean = false
  reviewInvite = {instructor_name: '', name: '', email: ''}
  errorMessage = ''
  reviewSubmitted: boolean = false
  forbidden: boolean = false


  beforeMount() {
    document.body.className = 'grey-background'
    this.inviteToken = this.$route.params.inviteToken
    this.getReviewInvite()
  }

  /** 
   * send review to API to be saved
   */
  submitReview() {
    http.post('reviews', {
      token: this.inviteToken,
      reviewMessage: this.message,
      rating: this.rating
    })
      .then(() => {
        this.reviewSubmitted = true
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }

  /** 
   * get review invite data from token
   */
  getReviewInvite() {
    http.get(`review-by-token/${this.inviteToken}`)
      .then(res => {
        if (!res.data) { return router.push('/') }



        this.validReviewToken = true
        this.reviewInvite = res.data.data
      })
      .catch(err => {
        if (err.response.status === 404) {
          return router.push('/')
        }

        if (err.response.status === 403) {
          return this.forbidden = true
        }
      })
  }

  /** 
   * validation 
   */
  validation() {
    if (!this.message) {
      return this.errorMessage = 'please tell us about your experience'
    }

    if (!this.rating) {
      return this.errorMessage = 'rating is required'
    }
  }
}
</script>



<style lang='scss' scoped>
@import "../../scss/review-form.scss";
</style>
