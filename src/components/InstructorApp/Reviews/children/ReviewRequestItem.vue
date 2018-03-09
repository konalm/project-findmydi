<template>
<div class="modal-box">
  <div class="modal-box__header">
    Review Invitation
  </div>

  <div class="modal-box__body">
    <p> {{ reviewRequest.name }} </p>
    <p> {{ reviewRequest.email }} </p>
    <p> {{ requestDate }} </p>

    <div class="modal-box__button-container">
      <button class="base-button blue">Cancel</button>
      <div class="spacer"></div>
      <button class="base-button"> Resend</button>
    </div>
  </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue' 
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import moment from 'moment'


@Component({})
export default class ReviewRequestItem extends Vue {
  @Prop() reviewRequest: {id, name, email, timestamp}


  get requestDate() {
    return moment(this.reviewRequest.timestamp).format('DD/MM/YYYY')
  }
}
</script>



<style lang="scss" scoped>
.modal-box {
  .modal-box__body {
    text-align: center;
    padding-right: 30px;
    padding-top: 15px;

    p {
      margin: 0;
      line-height: 33px;
    }

    .modal-box__button-container {
      margin-top: 20px;

      .spacer {
        width: 30px;
      }

      button {
        width: 200px;
      }
    }
  }
}

</style>
