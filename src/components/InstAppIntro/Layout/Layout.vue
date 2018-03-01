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
          <div class="content">
            <slot name="introStep"></slot>
          </div> 

          <div class="modal-box__proceed-button-container">
            <slot name="proceedButton"></slot>
          </div>
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
    display: flex;
    flex-direction: column;
    padding-bottom: 0;

    .modal-box__body {
      padding-right: 30px;
      display: flex;
      flex-direction: column;
      flex-direction: flex-end;
      flex-grow: 1;
      margin-bottom: 0;

      div:first-child {
        flex-grow: 1;
        flex: 1;
      }

      .modal-box__proceed-button-container {
        text-align: right;
        padding-bottom: 10px;
      }
    }
  }
</style>

