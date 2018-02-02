<template>
  <div class="header">
    <div class="container">
       <ul class="logged-out-header__nav">
        <li>Instructors in Review</li>
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

@Component({})
export default class Header extends Vue {
  @Prop() loggedIn: boolean
}

</script>
