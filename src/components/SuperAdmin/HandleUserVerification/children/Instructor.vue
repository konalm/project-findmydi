<template>
  <li class="list-group-item">
    <p>{{ instructor.id }}</p>
    <p>{{ instructor.name }}</p>
    <p>{{ instructor.email }}</p>
    <p>ADI NO - {{ instructor.adi_no }}</p>

    <p>
      Licence Held Since - {{ instructor.license_since_month }} : 
      {{ instructor.license_since_year }}
    </p>

    <div class="row">
      <img v-bind:src="adiLicensePhotoSrc" width="150px" height="150px" />
    </div>

    <button 
      class="btn btn-primary mt-2" 
      v-on:click="verifyInstructor()"
    >
      Verify
    </button>
  </li>
</template>



<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator'
import {getApiUrl} from '@/globals'
import {httpAuth} from '@/http-requests'


@Component({})
export default class InstructorInReview extends Vue {
  @Prop() instructor: {id: 0}

  get adiLicensePhotoSrc() {
    return `${getApiUrl()}img/adi-license/${this.instructor.id}`
  }

  /**
   * update instructor verification to 1 (verified)
   */
  verifyInstructor() {
    httpAuth.put(`instructor-verification/${this.instructor.id}`, {
      status: 1
    })
      .then(res => {
        console.log('instructor verified')
        this.$emit('instructor-verification-updated')
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>