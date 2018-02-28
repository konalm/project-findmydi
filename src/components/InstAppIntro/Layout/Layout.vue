<template>
  <div class="instructor-intro-page">
    <inst-app-header :loggedIn="true" />
    <page-header :header="'Welcome'" />
    <navbar />

    <div class="container">
      <div class="modal-box">
        <div class="modal-box__header">
          <slot name="stepHeader"></slot>
        </div>

        <div class="modal-box__body">
          <slot name="introStep"></slot>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import InstAppHeader from '@/components/patterns/InstAppHeader'
import PageHeader from '@/components/patterns/PageHeader.vue'
import Navbar from './children/Navbar.vue'


@Component({
  components: {
    InstAppHeader,
    PageHeader,
    Navbar
  }
})
export default class IntroLayout extends Vue {

  beforeMount() {
    document.body.className = 'grey-background'
  }

}
</script>



<style lang="scss" scoped>
  .modal-box {
    width: 574px;
    height: 423px;
    margin: 0 auto;

    .modal-box__body {
      padding-right: 30px;
    }
  }
</style>

