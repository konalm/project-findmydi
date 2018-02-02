<template>
  <div>
    <super-admin-header /> 

    <div class="container">

      <ul class="mt-5 list-group instructors-in-review">
        <instructor 
          v-for="instructor in instructorsInReview"
          :key="instructor.id"
          :instructor="instructor"
          v-on:updatedInstructorAdiLicence="getInstructorsInReview"
        />

        <p v-if="instructorsInReview.length === 0" class="lead">
          No Instructors In Review
        </p>
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import {getApiUrl} from '@/globals'
import SuperAdminHeader from '@/components/patterns/SuperAdminHeader.vue'
import Instructor from './children/Instructor'

@Component({
  components: {
    SuperAdminHeader,
    Instructor
  }
})
export default class HandleUserVerification extends Vue {
  instructorsInReview = {}

  beforeMount() {
    this.getInstructorsInReview()
  }

  /**
   * get instructors with adi licence photo in review status
   */
  getInstructorsInReview() {
    httpAuth.get('instructors-in-review')
      .then(res => {
        this.instructorsInReview = res.data

        console.log(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>



<style lang="scss" scoped>
  ul.instructors-in-review {
    margin-top: 70px;
  }
</style>
