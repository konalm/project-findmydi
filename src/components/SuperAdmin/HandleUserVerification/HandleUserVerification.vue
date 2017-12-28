<template>
  <div class="container">
    <h3 class="text-center"> Instructor Verifications To Review </h3>

    <ul class="mt-5 list-group">
      <li 
        v-for="instructor in instructorsInReview" 
        :key="instructor.id" 
        class="list-group-item"
      > 
        <!-- {{ instructor }} -->

        <p>{{ instructor.id }}</p>
        <p>{{ instructor.name }}</p>
        <p>{{ instructor.email }}</p>

        <button class="btn btn-primary">Verify</button>
      </li>
    </ul>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'


@Component({})
export default class HandleUserVerification extends Vue {
  instructorsInReview = {}

  beforeMount() {
    this.getInstructorsInReview()
  }

  /**
   * 
   */
  getInstructorsInReview() {
     httpAuth.get('users-verification-credentials')
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

