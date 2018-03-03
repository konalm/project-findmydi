<template>
  <li>
    <div class="white-modal-box__container instructor-item">
      <div class="avatar-img-container">
        <img v-bind:src="avatarPhotoSrc" class="avatar" />
      </div>

      <div class="profile">
        <p>{{ instructor.id }}</p>
        <p>{{ name }}</p>
        <p>{{ instructor.email }}</p>
        <p>ADI Lience No: {{ instructor.adi_license_no }}</p>
        <p>Contact No: {{ instructor.contact_number }} </p>
        <p> {{ instructor.email }} </p>
      </div>

      <div class="adi-licence-container">
        <img v-bind:src="adiLicensePhotoSrc" class="adi-licence-upload" />
      </div>
    </div>

    <div class="button-container">
      <button class="btn btn-success mt-2" 
        v-on:click="updateAdiLicenceStatus(1)"
      >
        Approve
      </button>

      <button class="btn btn-danger mt-2"
        v-on:click="openRejectReasonModal()"
      >
        Reject
      </button>
    </div>

    <reject-reason-modal  
      :instructorAdiLicenceId="this.instructor.adi_licence_id"
      v-on:rejectedAdiLicence="$emit('updatedInstructorAdiLicence')"
    />
  </li>
</template>



<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator'
import {getApiUrl} from '@/globals'
import {httpAuth} from '@/http-requests'
import RejectReasonModal from './RejectReasonModal.vue'


@Component({
  components: {
    RejectReasonModal
  }
})
export default class InstructorInReview extends Vue {
  rejectReason: string = null 

  @Prop() instructor: {
    id: 0, 
    adi_license_no: 0, 
    first_name: '', 
    surname: '',
    contact_number: 0,
    adi_licence_id: 0
  }

  get name() {
    return `${this.instructor.first_name} ${this.instructor.surname}`
  }

  get adiLicensePhotoSrc() {
    return `${getApiUrl()}img/adi-license/${this.instructor.id}`
  }

  get avatarPhotoSrc() {
    return `${getApiUrl()}img/avatar/${this.instructor.id}`
  }

  /**
   * update adi licence to approved or rejected 
   */
  updateAdiLicenceStatus(status) {
    httpAuth.put(`instructor-adi-licence-status/${this.instructor.adi_licence_id}`, {
      status: status,
      rejectReason: this.rejectReason
    })
      .then(res => {
        this.$emit('updatedInstructorAdiLicence');
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /** 
   * 
   */
  openRejectReasonModal() {
    $("#rejectReasonModal").modal()
  }
}
</script>


<style lang="scss" scoped>
  li {
    list-style: none;
  }

  .instructor-item {
    display: flex;
    padding-top: 15px;
    padding-bottom: 25px;

    div:first-child {
      margin-right: 25px;
    }

    div:last-child {
      flex-grow: 1;
      text-align: right;
      padding-right: 20px;
    }
  }

  img.avatar {
    width: 180px;
    height: auto;
  }

  img.adi-licence-upload {
    width: 270px;
    height: auto;
  }

  .button-container {
    width: 100%;

    button {
      width: 25%;
    }
    
    button:first-child {
      margin-right: 20px;
    }
  }
</style>