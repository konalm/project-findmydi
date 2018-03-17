<template>
  <div class="message-container">
   <p class="text-success">
      You have successfully create an account!
  </p>

    <router-link to="login">
      <button class="base-button">
        Go To Login
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class SignUpSuccess extends Vue {

}
</script>

