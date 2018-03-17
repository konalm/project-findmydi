<template>
<div class="modal-box">
  <div class="modal-box__header">
    Summary
  </div>

  <div class="modal-box__body">
    <p>Total Reviews: {{ reviewCount }} </p>
    <p>Average Review: {{ reviewAverageRating }} </p>

    <div class="rating-container">
      <div class="rating-bar">
        <div class="rating-fill" 
          v-bind:style="{width: reviewAverageRating * 10 + '%'}"
        >
        </div>
      </div>
    </div>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'


@Component({})
export default class ReviewSummary extends Vue {
  @Prop() reviews: [{rating: string}]

  get reviewCount() {
    return this.reviews.length
  }

  /** 
   * use reduce to get total sum and then divide it by count to get average
   */
  get reviewAverageRating() {
    const sum = this.reviews.reduce(
      function (acc, review) { 
        return acc + parseFloat(review.rating)
      }, 0
    );

    return (sum / this.reviews.length).toFixed(2)
  }
}
</script>



<style lang="scss" scoped>
@import "../scss/rating-bar.scss";

.modal-box {
  margin-bottom: 30px;

  .modal-box__body {
    text-align: center;
    font-size: 20px;

    p {
      margin: 0;
      line-height: 33px;
      font-weight: 100;
    }

    .rating-container {
      margin-top: 20px;

      .rating-bar {
        margin: 0 auto;
      }
    }
  }
}
</style>
