<template>
<div class="reviews-page">
  <instructor-header  />
  <page-header :header="'Reviews'" />
  <instructor-navbar />

  <div class="container mt-5 reviews">
    <div class="reviews-page__left-side">
      <no-reviews v-if="reviews.length === 0" />

      <review-item v-for="review in reviews"
        :key="review.id"
        :review="review"
      />
    </div>

    <div class="reviews-page__right-side">
      <review-summary :reviews="reviews" />
      <review-invite v-on:inviteSent="getReviewRequests()" />

      <review-request-item v-for="reviewRequest in reviewRequests" 
        :key="reviewRequest.item" 
        :review-request="reviewRequest"
      />
    </div>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import InstructorHeader from '@/components/patterns/InstAppHeader'
import InstructorNavbar from '@/components/patterns/InstAppNavbar.vue'
import PageHeader from '@/components/patterns/PageHeader.vue'
import ReviewItem from './children/ReviewItem.vue'
import ReviewSummary from './children/ReviewSummary.vue'
import ReviewInvite from './children/ReviewInvite.vue'
import ReviewRequestItem from './children/ReviewRequestItem.vue'
import NoReviews from "./children/NoReviews.vue"


@Component({
  components: { 
    InstructorHeader, 
    InstructorNavbar, 
    PageHeader,
    ReviewItem,
    ReviewSummary,
    ReviewInvite,
    ReviewRequestItem,
    NoReviews
  }
})
export default class Reviews extends Vue {
  reviews = [{id: null, reviewer_name: '', reviewer_email: ''}]
  reviewRequests = []


  beforeMount() {
    document.body.className = 'grey-background'
    this.getReviews()
    this.getReviewRequests()
  }

  /** 
   * get reviews from the API
   */
  getReviews() {
    httpAuth.get('reviews')
      .then(res => {
        this.reviews = res.data
      })
      .catch(err => {
        throw Error(err)
      })
  }

  /** 
   * get review requests from the API
   */
  getReviewRequests() { 
    httpAuth.get('review-requests')
      .then(res => {
        this.reviewRequests = res.data
      })
      .catch(err => {
        throw Error(err)
      })
  }
}
</script>


<style lang="scss" scoped>
.container.reviews {
  display: flex;

  .reviews-page__left-side {
    width: 60%;
    padding-right: 70px;
  }

  .reviews-page__right-side {
    width: 40%;
    padding-left: 30px;
    padding-right: 15px;
  }
}
</style>
