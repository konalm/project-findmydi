<template>
  <i class="fa" 
    v-bind:class="[
      {'fa-times text-danger': !status}, 
      {'fa-check text-success': status}
    ]"
  > 
</i>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

@Component({})
export default class StatusSymbol extends Vue {
  @Prop() status: boolean 
}
</script>



