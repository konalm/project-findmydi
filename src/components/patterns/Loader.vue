<template>
  <div class="loader-container">
    <i class="fa fa-spinner fa-spin"></i>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Loader extends Vue {

}
</script>


<style lang="scss" scoped>
.loader-container {
  width: 100%;
  text-align: center;
  font-size: 50px;
  color: #2CA062;
}
</style>