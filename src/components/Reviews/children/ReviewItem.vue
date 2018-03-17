<template>
  <div class="modal-box">
    <div class="modal-box__header">
      <p>{{ review.reviewer_name }} 
        <span class="subtext">{{review.reviewer_email }}</span>
      </p>

      <p class="review-date">{{ reviewDate }}</p>
    </div> 

    <div class="modal-box__body">
      {{ review.review_message }}

      <div class="ratings-container">
        <div class="rating-bar">
          <div class="rating-fill" v-bind:style="{width: ratingPercent + '%'}"></div>
        </div>

        <p class="rating">{{ rating }}</p>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator'
import moment from 'moment'

@Component({})
export default class ReviewItem extends Vue {
  @Prop() review: {
    id, 
    reviewer_name, 
    reviewer_email, 
    review_message, 
    rating, 
    timestamp
  }


  get reviewDate() {
   return moment(this.review.timestamp).format("DD/MM/YYYY")
  }

  get rating() {
    return parseFloat(this.review.rating).toFixed(2)
  }

  get ratingPercent() {
    if (!this.review.rating) { return }

    return this.review.rating * 10
  }
}
</script>



<style lang="scss" scoped>
@import "../../../scss/variables.scss";
@import "../scss/rating-bar.scss";

.modal-box {
  width: 100%;
  margin-bottom: 30px;

  .modal-box__header {
    display: flex;
    justify-content: space-between;

    span.subtext {
      font-size: 14px;
      font-weight: 100;
    }

    .review-date {
      font-size: 16px;
      font-weight: 100;
    }
  }

  .modal-box__body {
    font-size: 16px;

    .ratings-container {
      margin-top: 25px;
      display: flex;
      align-items: center;
      padding-bottom: 0;

      p.rating {
        font-size: 30px;
        color: $primary-color;
        margin: 0;
      }
    }
  }
}
</style>