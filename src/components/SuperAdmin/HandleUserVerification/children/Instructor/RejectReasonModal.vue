<template>
<div class="modal fade modal-box" id="rejectReasonModal" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-content__top-row">
        <button class="close-button" v-on:click="closeModal()">
          <i class="material-icons">close</i>
        </button> 
      </div>

      <textarea 
        class="form-control"
        placeholder="Reason for Rejecting" 
        v-model="rejectReason"
      >
      </textarea>

      <p v-if="errorMessage" class="text-danger"> {{ errorMessage }} </p>

      <div class="modal-footer">
        <button class="base-button" v-on:click="rejectAdiLicence()">
          Reject 
        </button>
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'

@Component({})
export default class RejectReason extends Vue {
  rejectReason: string = null
  errorMessage: string = null 

  @Prop() instructorAdiLicenceId: number

  /** 
   * close the modal box
   */
  closeModal() {
    $("#rejectReasonModal").modal("hide")
    this.errorMessage = ''
    this.rejectReason = ''
  }

  /**
   * reject adi licence photo review 
   */
  rejectAdiLicence() {
    if (!this.validation()) { return }

    httpAuth.put(`instructor-adi-licence-status/${this.instructorAdiLicenceId}`, {
      status: 0,
      rejectReason: this.rejectReason
    })
      .then(() => {
        $("#rejectReasonModal").modal("hide")
        this.$emit('rejectedAdiLicence')
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }
  
  /** 
   * 
   */
  validation() {
    this.errorMessage = ''

    if (!this.rejectReason) {
      this.errorMessage = 'Reject reason required';
      return false
    }

    return true
  }
}
</script>