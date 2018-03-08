<template>
<div class="reviews-page">
  <instructor-header  />
  <page-header :header="'Reviews'" />
  <instructor-navbar />

  <div class="container mt-5">
    <review-item v-for="review in reviews"
      :key="review.id"
      :review="review"
    />
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


@Component({
  components: { InstructorHeader, InstructorNavbar, PageHeader, ReviewItem }
})
export default class Reviews extends Vue {
  reviews = [{id: null, reviewer_name: '', reviewer_email: ''}]


  beforeMount() {
    document.body.className = 'grey-background'
    this.getReviews()
  }

  /** 
   * get reviews from API
   */
  getReviews() {
    httpAuth.get('reviews')
      .then(res => {
        this.reviews = res.data
      })
  }

}
</script>
