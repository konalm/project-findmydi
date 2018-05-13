<template>
  <layout :infoBox="true" :previousView="'/induction'">
    <span slot="stepHeader">Hourly Rate</span>

    <span slot="introStep" v-if="allowedAccess"> 
      <p>How much money do you want to charge per hour ?</p>

      <p> £
        <input type="number" class="form-group hourly-rate" placeholder="Hourly rate" 
          v-model="hourlyRate" 
        />
      </p>

      <div class="offer-container">
        <p> Add an Offer? 
          <span class="faint-text"> E.g. First three lessons only £10.00</span>
        </p>

        <button class="base-button small secondary" v-if="!addOffer" 
          v-on:click="toggleAddOffer()"
        > 
          <i class="fa fa-plus"></i> Sure 
        </button>

        <textarea v-model="offer" v-if="addOffer"></textarea>

        <button class="base-button small cancel" v-on:click="toggleAddOffer()" 
          v-if="addOffer"
        >
          <i class="fa fa-times"></i> Cancel
        </button>
      </div>

      <div class="error-container text-danger" v-if="errorMessage">
        <p> {{ errorMessage }} </p>
      </div>
    </span>

    <button slot="proceedButton" class="base-button padded-button"
      v-on:click="proceed()"
    >
      Proceed
    </button>

    <p slot="infoText"> 
      Hourly rate can easily be updated again in the future.
    </p>
  </layout>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './Layout'
import {httpAuth} from '@/http-requests'
import router from '@/router'


@Component({
  components: {
    Layout
  }
})
export default class InductionHourlyRate extends Vue {
  hourlyRate: Number = null
  allowedAccess: Boolean = false
  addOffer: Boolean = false
  offer: String = ''
  errorMessage: String = ''

  beforeMount() {
    this.getInductionInfo()
  }

  /** 
   * toggle add offer in UI, if false set offer to empty
   */
  toggleAddOffer() {
    this.addOffer = !this.addOffer
  }

  /** 
   * update hourly rate 
   * redirect to coverages
   */
  async proceed() {
    if (this.validation()) { return }

    try {
      await this.updateHourlyRate()
    } catch (err) {
      return this.errorMessage = err.message
    }

    router.push('/induction/coverage')
  }


  /** 
   * update hourly rate http request
   */
  async updateHourlyRate() {
    const formData = {hourlyRate: this.hourlyRate, offer: this.offer}

    try {
      var response = await httpAuth.put('instructor-hourly-rate', formData)
    } catch (err) {
      throw Error(err.response.data)
    }
  }

  /** 
   * validate hourly rate 
   */
  validation() {
    this.errorMessage = ''

    if (!this.hourlyRate) {
      return this.errorMessage = 'Hourly rate is required'
    }

    if (this.hourlyRate <= 0) {
      return this.errorMessage = 'Hourly rate must be greater than 0'
    }
  }

  /** 
   * get instructor induction info
   */
  async getInductionInfo() {
    try {
      var response = await httpAuth.get('instructor-induction-info')
    } catch (err) {
      throw Error(err.response.data)
    }

    /* redirect to previous step if not complete */ 
    if (!response.data.intro_read) {
      return router.push('/induction');
    }

    this.allowedAccess = true
    this.offer = response.data.offer ? response.data.offer : this.offer

    if (this.offer) { this.addOffer = true }

    this.hourlyRate = response.data.hourly_rate ? 
      response.data.hourly_rate : this.hourlyRate

    this.$store.commit('setInductionInfo', response.data)
  }
}
</script>



<style lang="scss" scoped>
.faint-text {
  margin-left: 7px;
}

input.hourly-rate {
  margin-left: 10px;
}

.offer-container {
  margin-top: 15px;
  margin-bottom: 0;
  padding-bottom: 0;
}

.error-container {
  margin-top: 30px;
}

textarea {
  width: 100%;
  height: 60px;
  resize: none;
}
</style>