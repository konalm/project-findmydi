<template>
  <layout>
    <span slot="stepHeader">Hourly Rate</span>

    <span slot="introStep" v-if="allowedAccess"> 
      <p> How much money do you want to charge per hour ? </p>

      <p> £
        <input type="number" class="form-group hourly-rate" placeholder="Hourly rate" 
          v-model="hourlyRate" 
        />
      </p>

      <div class="offer-container">
        <p> Add an Offer? 
          <span class="faint-text"> E.g. First three lessons only £10.00</span>
        </p>

        <button class="base-button small" v-if="!addOffer" 
          v-on:click="toggleAddOffer()"
        > 
          <i class="fa fa-plus"></i> Sure 
        </button>

        <textarea v-model="offer" v-if="addOffer"></textarea>

        <button class="base-button small blue" v-on:click="toggleAddOffer()" 
          v-if="addOffer"
        >
          Cancel
        </button>
      </div>

      <div class="error-container text-danger">
        <p v-if="errorMessage"> {{ errorMessage }} </p>
      </div>
    </span>

    <button slot="proceedButton" class="base-button padded-button"
      v-on:click="proceed()">Proceed</button>
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
export default class InstAppIntro extends Vue {
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

    if (!this.addOffer) { this.offer = '' }
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

    router.push('/intro/coverage')
  }

  /** 
   * 
   */
  async updateHourlyRate() {
    const formData = {hourlyRate: this.hourlyRate}

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
  getInductionInfo() {
    httpAuth.get('instructor-induction-info')
      .then(res => {
        if (!res.data.intro_read) {
          router.push('/intro');
          return 
        }

        this.allowedAccess = true
      })
      .catch(err => {
        throw new Error(err)
      })
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
}

.error-container {
  margin-top: 30px;
}

textarea {
  width: 100%;
  height: 70px;
}
</style>