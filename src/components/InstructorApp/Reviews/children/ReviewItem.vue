<template>
  <div class="modal-box">
    <div class="modal-box__header">
      <!-- {{ review.reviewer_name }} -->
    </div> 

    <div class="modal-box__body">
      <!-- {{ review.reviewer_email }} -->
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class ReviewItem extends Vue {
  @Prop() review: {id, reviewer_name, reviewer_email, review_message, rating}

}
</script>