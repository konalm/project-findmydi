<template>
<div class="white-modal-box__container">

  <!-- {{ coverageItem }} -->

  <div v-if="!editMode">
    <p v-if="coverageItem.coverage_type === 'postcode'">
      Postcode: {{ coverageItem.postcode }} 
    </p> 

    <p v-if="coverageItem.coverage_type === 'region'">
      Region: {{ coverageItem.region }}
    </p>

    <p>Range: {{ coverageItem.range }} </p>
  </div>

  <div v-if="editMode">
    <input type="text" placeholder="postcode" v-model="updatePostcode" />
    <br />
    <input type="text" placeholder="range" v-model="updateRange" />
  </div>

  <div class="white-modal-box__button-container" v-if="!editMode">
    <button class="small blue" v-on:click="toggleEditMode()">
      edit 
    </button>

    <button class="small green" v-on:click="destroy()">
      delete 
    </button>
  </div>

  <div class="white-modal-box__button-container" v-if="editMode">
    <button class="small green" v-on:click="toggleEditMode()">
      cancel
    </button>

    <button class="small blue" v-on:click="update()">
      update 
    </button>

    <p class="text-danger mt-3" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'


@Component({})
export default class CoverageItem extends Vue {
  editMode: boolean = false 
  updatePostcode: string = ''
  updateRange: number = null 
  errorMessage: string = ''

  @Prop() coverageItem: {id, postcode, range, coverage_type}

  /**
   * toggle edit mode true/false for UI
   */
  toggleEditMode() {
    this.editMode = !this.editMode
    this.updatePostcode = this.coverageItem.postcode 
    this.updateRange = this.coverageItem.range
  }

  /**
   * update coverage
   */
  update() {
    if (!this.validation()) { return }

    httpAuth.put(`instructors-coverage/${this.coverageItem.id}`, {
      postcode: this.updatePostcode,
      range: this.updateRange
    })
      .then(res => {
        this.toggleEditMode()
        this.$emit('coverageModified')
      })
      .catch(err => {
        this.errorMessage = err.response.data
      })
  }

  /**
   * delete coverage
   */
  destroy() {
    httpAuth.delete(`instructors-coverage/${this.coverageItem.id}`)
      .then(() => {
        this.$emit('coverageModified');
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

    return true
  }
}
</script>



<style lang="scss" scoped>
.white-modal-box__container {
  input {
    margin-bottom: 15px;
  }
}
</style>