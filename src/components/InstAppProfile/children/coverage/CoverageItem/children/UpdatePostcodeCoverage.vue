<template>
   <div>
    <input type="text" placeholder="postcode" v-model="updatePostcode" />
    <br />
    <input type="number" placeholder="range" v-model="updateRange" />

    <div class="white-modal-box__button-container">
      <p class="text-danger mt-3" v-if="errorMessage">
        {{ errorMessage }}
      </p>

      <button class="small green" v-on:click="$emit('toggleEditMode')">
        cancel
      </button>

      <button class="small blue" v-on:click="update()">
        update 
      </button>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'


@Component({})
export default class UpdatePostcodeCoverage extends Vue {
  updatePostcode: string = ''
  updateRange: number = null
  errorMessage: string = ''

  @Prop() coverageItem: {id, postcode, range, coverage_type}


  beforeMount() {
    this.updatePostcode = this.coverageItem.postcode
    this.updateRange = this.coverageItem.range
  }
    
  /**
   * update postcode coverage
   */
  update() {
    if (!this.validation()) { return }

    httpAuth.put(`instructors-coverage/${this.coverageItem.id}`, {
      postcode: this.updatePostcode,
      range: this.updateRange
    })
      .then(res => {
        this.$emit('coverageModified')
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }

  /**
   * validate inputs 
   */
  validation() {
    this.errorMessage = ''

    if (!this.updatePostcode) {
      this.errorMessage = 'postcode is required'
      return false
    }

    if (!this.updateRange) {
      this.errorMessage = 'range is required'
      return false
    }

    if (this.updateRange <= 0) {
      this.errorMessage = 'range must be greater than 0'
      return false
    }

    return true
  }
}
</script>



<style lang="scss" scoped>
  input {
    margin-bottom: 15px;
  }
</style>