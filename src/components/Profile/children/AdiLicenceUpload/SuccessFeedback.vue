<template>
<div class="adi-licence-upload__success-message"> 
  <p> Your Adi licence has successfully been submitted for review.
    You can expect to hear a response within 24 hours.
  </p>

  <button class="base-button" 
    v-on:click="$emit('close')" 
    data-dismiss="modal"
  >
    Okay!
  </button>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class AdiLicenceUploadSuccessMessage extends Vue {}
</script>


<style lang="scss" scoped>
.adi-licence-upload__success-message {
  padding: 0 15px 20px 15px;
  margin-top: 50px;
  text-align: center;

  p {
    font-size: 20px;
    text-align: center;
  }

  button {
    width: 60%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 18px;
    margin-top: 30px;
  }
}
</style>