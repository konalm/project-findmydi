<template>
<div class="white-modal-box">
  <p class="modal-box-header">Stats</p>

  <div class="white-modal-box__container">
    <p>Contact Request: </p>
    <p>Today: </p>
    <p>This Month: </p>

    <button class="small blue"> edit </button>
  </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'


@Component({})
export default class Profile extends Vue {
  contactRequestCount: number
  contactRequestsToday: number = 0
  contactRequestsMonthCount: number = 0

  @Prop() userProfile: {}
}
</script>



<style lang="scss">



</style>