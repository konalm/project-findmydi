<template>
<div class="container">
  <p class="page-header" v-bind:class="{'text-center': textCenter}"> 
    {{ header}} 
  </p>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

@Component({})
export default class PageHeader extends Vue {
  @Prop() header: ''
  @Prop() textCenter: false
}
</script>

<style lang="scss" scoped>
  p.page-header {
    font-size: 25px;
    font-weight: 500;
    color: rgb(50,50,60);
    border: none;
  }
</style>