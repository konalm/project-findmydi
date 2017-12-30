<template>
  <div class="container">
    <h3 class="text-center"> Instructor Verifications To Review </h3>

    <ul class="mt-5 list-group">
      <instructor 
        v-for="instructor in instructorsInReview"
        :key="instructor.id"
        :instructor="instructor"
        v-on:instructor-verification-updated="getInstructorsInReview"
      />

      <p v-if="instructorsInReview.length === 0" class="lead">
        No Instructors In Review
      </p>
    </ul>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import {getApiUrl} from '@/globals'
import Instructor from './children/Instructor.vue'


@Component({
  components: {
    Instructor
  }
})
export default class HandleUserVerification extends Vue {
  instructorsInReview = {}

  beforeMount() {
    this.getInstructorsInReview()
  }

  /**
   * 
   */
  getInstructorsInReview() {
    console.log('get instructors in review')
    
    httpAuth.get('users-verification-credentials')
      .then(res => {
        this.instructorsInReview = res.data
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>

