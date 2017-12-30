<template>
  <div class="card mt-5" v-if="verifiedStatus !== 1">
    <div class="card-block p-2" v-if="!verifiedStatus">
      <p class="card-text">
        Complete A few more steps to get verified and your future students 
        will be able to find you right away!
      </p>

      <router-link to="/verification-form">
        <button class="btn btn-success">Get Verified</button>
      </router-link>
    </div>

    <div class="card-block p-2" v-if="verifiedStatus == 2">
      <p class="card-text">
        Verification Pending Review
      </p>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'


@Component({})
export default class UserVerifiedStatus extends Vue {
  @Prop() verifiedStatus: number
}
</script>

