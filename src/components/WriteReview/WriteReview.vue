<template>
<div class="write-review-page">
  <user-header />
  <page-header :header="'Driving instructor review'" />

  <div class="container mt-5">
    <div class="container">
      <div class="modal-box">
        <div class="modal-box__body">
          <p> Tell us about your experience</p> 

          <textarea placeholder="your experience" v-model="message"></textarea>

          <div class="rating-container">
            <p> Rate your experience out of <span class="underline">10</span></p>

            <div class="slider-container">
              0
              <input type="range" min="0" max="10" value="5" class="slider" 
                v-model="rating"
              />
              10
            </div>

            <div class="rating-text-container">
              <p class="rating">{{ rating }}</p>
            </div>
          </div>

          <button class="base-button padded-button">Submit Review</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import UserHeader from '@/components/patterns/user-header'
import PageHeader from '@/components/patterns/PageHeader.vue'


@Component({
  components: {
    UserHeader,
    PageHeader
  }
})
export default class WriteReview extends Vue {
  message: string = ''
  rating: number = 5

  beforeMount() {
    document.body.className = 'grey-background'
  }

}
</script>


<style lang='scss' scoped>
.modal-box {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;

  .modal-box__body {
    padding-left: 20px;
    padding-right: 20px;

    textarea {
      width: 80%;
      height: 180px;
    }

    .rating-container {
      margin-top: 20px;
      margin-bottom: 30px;

    
      .slider-container {
        display: flex;
        align-items: center;

          input.slider {
            padding-left: 0;
            margin-left: 7px;
            margin-right: 7px;
          }
      }

      .rating-text-container {
        border: 1px solid #BFBFBF;
        margin: 0 auto;
        margin-top: 25px;
        display: flex;
        width: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;


        p.rating {
          font-size: 30px;
          margin: 0;
        }
      }
    }
  }
}
</style>
