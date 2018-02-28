<template>
  <layout>
    <span slot="stepHeader">Coverage</span>

    <span slot="introStep"> 
      <p>Add your postcode, or postcode you wish to instruct your lessons</p>

      <input type="text" class="form-group" placeholder="Postcode" 
        v-model="postcode" 
      />

      <p> How far are you willing to travel</p>
        <input type="text" class="form-group" placeholder="Range" 
        v-model="range" 
      />

      <br />

      <button class="base-button"><i class="fa fa-plus"></i> Coverage </button>

      <br /> <br />

      <button class="base-button">Proceed</button>
    </span>
  </layout>
</template>


<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './Layout'

@Component({
  components: {
    Layout
  }
})
export default class InstAppCoverage extends Vue {
  postcode: string = ''
  range: number = 0

}
</script>

