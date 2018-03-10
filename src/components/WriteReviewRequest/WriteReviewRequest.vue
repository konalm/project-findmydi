<template>
<div class="write-review-page">
  <user-header />
  <page-header v-if="!reviewSubmitted"
    :header="`Write a review`" 
    :textCenter="true" 
  />

  <div class="container mt-5">
    <div class="modal-box" v-if="!reviewSubmitted">
      <div class="modal-box__body">
        <div class="form-group">
          <p>Name</p>
          <input type="text" v-model="name" placeholder="Enter name" />
        </div>

        <div class="form-group">
          <p>Email address</p>
          <input type="text" v-model="email" placeholder="Enter email" />
        </div>

        <div class="form-group">
          <p>Postcode</p> 
          <input type="text" v-model="postcode" placeholder="Enter postcode" />
        </div> 

        <div class="form-group">
          <p>Instructor name</p>
          <input type="text" v-model="instructorsName" 
            placeholder="Enter Instructor's name" 
          />
        </div>
          
        <div class="form-group your-experience">
          <p> Tell us about your experience</p> 
          <textarea placeholder="your experience" v-model="message"></textarea>
        </div>

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
</div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import UserHeader from '@/components/patterns/user-header'
import PageHeader from '@/components/patterns/PageHeader.vue'
import ReviewSubmittedMessage from '@/components/patterns/ReviewSubmitted.vue'
import {http} from '@/http-requests'
import router from '@/router'


@Component({
  components: {
    UserHeader,
    PageHeader,
    ReviewSubmittedMessage
  }
})
export default class WriteReview extends Vue {
  name: string = ''
  email: string = ''
  postcode: string = ''
  instructorsName: string = ''
  message: string = ''
  rating: number = 7.5
  errorMessage = ''
  reviewSubmitted: boolean = false

  beforeMount() {
    document.body.className = 'grey-background'
  }

  /** 
   * send review to API to be saved
   */
  submitReview() {
    if (this.validation()) { return }

    http.post('review-requests', {
      name: this.name,
      email: this.email,
      postcode: this.postcode,
      instructorName: this.instructorsName,
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
   * validation 
   */
  validation() {
    if (!this.name) {
      return this.errorMessage = 'name is required'
    }

    if (!this.email) {
      return this.errorMessage = 'email is required'
    }

    if (!this.postcode) {
      return this.errorMessage = 'postcode is required'
    }

    if (!this.instructorsName) {
      return this.errorMessage = 'instructor\'s name is required'
    }

    if (!this.message) {
      return this.errorMessage  = 'please tell is about your experience'
    }

    if (!this.rating) {
      return this.errorMessage = 'rating is required'
    }
  }
}
</script>



<style lang='scss' scoped>
@import "../../scss/review-form.scss";

.modal-box {
  .modal-box__body {
    .form-group {
      padding-left: 80px;
      padding-right: 80px;
      text-align: left;

      p {
        text-align: left;
      }


      &.your-experience {
        margin-top: 30px;
      }

      input { 
        width: 100%;
        height: 36px;
        font-size: 14px;
      }

      textarea {
        width: 100%;
      }
    }
  }
}
</style>
