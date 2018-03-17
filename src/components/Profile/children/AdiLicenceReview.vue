<template>
  <div class="modal-box">
    <div class="modal-box__header">
      ADI Licence Status
    </div> 

    <div class="modal-box__body">
      {{ message }}

      <p class="reject-reason" v-if="showRejectReason && parseInt(status) === 0">
        {{ rejectReason }}
      </p>

      <div class="modal-box__button-container" v-if="parseInt(status) === 0">
        <button class="base-button blue" v-on:click="toggleRejectReason()"
          v-if="!showRejectReason"
        > 
          View Reason 
        </button>

        <button class="base-button blue" v-on:click="toggleRejectReason()"
          v-if="showRejectReason"
        > 
          Hide Reason 
        </button>

        <div class="spacer"></div>

        <button class="base-button" v-on:click="$emit('uploadAdiLicence')">
          Resubmit ADI Licence 
        </button>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'


@Component({})
export default class AdiLicenceReview extends Vue {
  showRejectReason: boolean = false 

  @Prop({}) status: ''
  @Prop({}) rejectReason: ''


  get message() {
    if (parseInt(this.status) === 2) {
      return `Your ADI licence is currently in review. You can expect a 
        response within 24 hours.`;
    }

    if (parseInt(this.status) === 1) {
      return `You ADI licence review has passed.`;
    }

    if (parseInt(this.status) === 0) {
      return `Your ADI Licence review has been rejected.`
    }
  }


  /** 
   * toggle display of reject reason in the UI 
   */
  toggleRejectReason() {  
    this.showRejectReason = !this.showRejectReason
  }
}
</script> 



<style lang="scss" scoped> 
.modal-box {
  .modal-box__body {
    p.reject-reason {
      margin-top: 20px;
      font-size: 14px;
      color: rgb(120,120,120);
    }

    .modal-box__button-container {
      text-align: left;
      justify-content: flex-start;
      margin-top: 20px;

      .spacer {
        width: 20px;
      }
    }
  }
}
</style>


