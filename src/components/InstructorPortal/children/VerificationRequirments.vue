<template>
<div class="white-modal-box__container text-center">
  <p>What we need before your future students can start finding you</p>
  <ul class="instructor-requirement-list">
    <li>Hourly Rate</li>
    <li>Postcode (where you are based to give driving lessons)</li>
    <li>Mile Radius (how far are you willing to travel to pick up students)</li>
    <li>Get verified</li>
  </ul>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

@Component({})
export default class VerificationRequirments extends Vue {

}
</script>



<style lang="scss">
  ul.instructor-requirement-list {
    list-style: none;

    li {
      font-size: 14px;
      line-height: 32px;
      color: rgba(0,0,0,0.6);
    }
  }

</style>
