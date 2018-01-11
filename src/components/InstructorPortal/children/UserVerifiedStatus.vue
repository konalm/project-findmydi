<template>
  <div class="white-modal-box__container text-center" v-if="verifiedStatus !== 1">
    <div class="card-block p-2" v-if="!verifiedStatus">
      <p class="card-text">
        We need a few more details before we can verify you.
      </p>

      <router-link to="/verification-form">
        <button class="warning">Get Verified!</button>
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

