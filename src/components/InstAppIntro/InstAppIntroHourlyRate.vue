<template>
  <layout>
    <span slot="stepHeader">Hourly Rate</span>

    <span slot="introStep"> 
      <p> How much money do you want to charge per hour ? </p>

      <p> £
        <input type="text" class="form-group" placeholder="Hourly rate" 
          v-model="updateEmail" 
        />
      </p>

      <p> Add an Offer? <span> E.g. First three lessons only £10.00</span></p>
      <button class="base-button"> <i class="fa fa-plus"></i> Sure </button>

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
export default class InstAppIntro extends Vue {

}
</script>

