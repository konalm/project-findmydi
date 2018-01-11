<template>
<div class="white-modal-box">
  <p class="modal-box-header">Coverage</p>

  <div class="white-modal-box__container">
    <p>Postcode: </p>
    <p>Mile Radius: </p>

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
  postcode: string = ''
  radius: string = ''

  @Prop() userProfile: {}
}
</script>



<style lang="scss">



</style>