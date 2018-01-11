<template>
<div class="white-modal-box">
  <p class="modal-box-header">Profile</p>

  <div class="white-modal-box__container">
    <p>ADI NO: </p>
    <p> </p>
    <P> </P>
    <p>Male</p>
    <p>Verified </p> 
    <p>Hourly Rate </p> 
    <p>Offers:  </p> 

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
  adiNo: string 

  @Prop() userProfile: {}
}
</script>



<style lang="scss">



</style>