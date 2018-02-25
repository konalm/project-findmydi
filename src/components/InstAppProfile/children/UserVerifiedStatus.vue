<template>
  <div class="white-modal-box__container text-center" v-if="!verified && verifiedStatus !== '1'">
    <!-- Not yet submitted -->
    <div class="card-block p-2" v-if="verifiedStatus === null">
      <p class="card-text">
        We need a photo to confirm your ADI licence.
      </p>

      <button class="warning" 
        v-on:click="$emit('uploadAdiLicence')"
      >
        Upload ADI Licence
      </button>
    </div>

    <!-- Rejected -->
    <div class="card-block p-2" v-if="verifiedStatus === '0'">
      <p class="card-text">
        Your ADI licence was rejected!
      </p>

      <p class="card-text sub-text" v-if="showRejectReason">
        {{ rejectReason }}
      </p>

      <div class="button-container">
        <button class="base-button blue" v-on:click="toggleRejectReason()">
          <span v-if="!showRejectReason">View Reason</span> 
          <span v-if="showRejectReason">Hide Reason</span>
        </button>

        <div class="spacer"></div>

        <button class="base-button" 
          v-on:click="$emit('uploadAdiLicence')"
        >
          Reupload ADI Licence
        </button>
      </div>
    </div>

    <!-- Pending Review -->
    <div class="card-block p-2" v-if="verifiedStatus === '2'">
      <p class="card-text pending-review">
        Your ADI licence is pending review.
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
  showRejectReason: boolean  = false

  @Prop() verified: boolean
  @Prop() verifiedStatus: string
  @Prop() rejectReason: string 

  toggleRejectReason() {
    this.showRejectReason = !this.showRejectReason
  }

  uploadAdiLicence() {

  }
}
</script>


<style lang="scss" scoped>
p.card-text {
  margin-bottom: 25px;

  &.pending-review {
    margin-bottom: 15px;
    margin-top: 15px;
  }
}

p.card-text.sub-text {
  color: rgb(140,140,140);
  font-size: 14px;
}

.button-container {
  display: flex;
  width: 100%;
  justify-content: center;

  .spacer {
    width: 20px;
  }

  button {
    width: 40%;
  }
}
</style>
