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
import Vue from 'Vue'
import Component from 'vue-class-component'

@Component({})
export default class RejectReason extends Vue {
  rejectReason: string = null

  /** 
   * close the modal box
   */
  closeModal() {
    $("#rejectReasonModal").modal("hide")
  }
}
</script>