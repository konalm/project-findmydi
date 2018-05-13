<template>
  <layout :infoBox="true" :previousView="'/intro/profile-picture'">
    <span slot="stepHeader">ADI Licence Verification</span>

    <span slot="introStep" v-if="!adiLicenceStatus"> 
      <div class="adi-licence-no">
        <p> ADI Licence NO
          <input type="string" class="form-group adi-licence" 
            placeholder="ADI Licence NO"
            v-model="adiLicenceNo"
          />
        </p>
      </div>

      <div class="pic-container">
        <div class="pic-back"></div>
   
        <img id="preview-adi-licence" class="adi-img-preview" alt="preview adi licence"
          v-if="adiImgPreview.readSrc"
          v-bind:src="adiImgPreview.readSrc"
        />
      </div> 

      <!-- api response message -->
      <div class="api-response-container">
        <p class="text-danger"> {{ errorMessage }} </p> 
      </div>

      <!-- buttons -->
      <div class="button-container">
        <div class="upload-avatar-button" 
          v-bind:class="{'update': selectedAdiLicence}"
        >
          <form enctype="multipart/form-data" novalidate />
            <label for="adiLicenceUpload" class="custom-avatar"
              v-bind:class="{'update': selectedAdiLicence}"
            >
              <p> {{ uploadButtonText }} </p>
            </label> 

            <input id="adiLicenceUpload" type="file" name="profile-pic" 
              class="file-upload"
              size="60"
              accept="/image/*"
              @change="selectAdiLicence($event.target.files)"
            />
          </form>
        </div>

        <button class="base-button padded-button" v-if="selectedAdiLicence"
          v-on:click="proceed()"
        > 
          Proceed 
        </button>
      </div>
    </span>

    <p slot="infoText"> 
      Once your review has been submitted, It can not be altered again until review 
      has been complete.
    </p>


    <span slot="introStep" v-if="adiLicenceStatus">
      <p v-if="adiLicenceStatus === 2"> 
        Your adi licence information is in review.
      </p>
      
      <p v-if="adiLicenceStatus === 0">
        Your adi licence reviewed and rejected.
      </p>

      <p v-if="adiLicenceStatus === 1">
        Your adi licence has been reviewed and accepted.
      </p>
    </span>
  </span>
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
export default class InductionAdiLicence extends Vue {
  postcode: string = ''
  range: number = 0
  uploadedLicence: boolean = false 
  licenceImgSrc: string = ''
  selectedAdiLicence: boolean = false
  errorMessage: string = ''
  adiLicenceNo: string = ''
  adiImgPreview =  {file: null, readSrc: null}
  allowedAccess: boolean = false
  adiLicenceStatus: number = null


  get uploadButtonText() {
    return !this.selectedAdiLicence ? 
      'Select ADI Licence Image' : 'Select Another'
  }

  beforeMount() {
    this.getInductionInfo()
  }
  
  /** 
   * use FileReader to preview the selected image live
   */
  selectAdiLicence(files) {
    let reader = new FileReader()
    this.adiImgPreview.file = files[0]

    reader.readAsDataURL(this.adiImgPreview.file)

    reader.onload = (e: Event & { target: { result: string } }) => {
      this.adiImgPreview.readSrc = e.target.result
    }

    this.selectedAdiLicence = true
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

    if (!response.data.avatar_url) { 
      return router.push('/induction/profile-picture')
    }

    if (response.data.inducted) {
      router.push('/profile')
    }

    this.adiLicenceNo = response.data.adi_licence_no
    this.allowedAccess = true
    this.adiLicenceStatus = parseInt(response.data.adi_licence_verification)
    this.$store.commit('setInductionInfo', response.data)    
  }

  /** 
   * build form to send to API which will save the uploaded photo
   */
  async uploadAdiLicence() {
    let formData = new FormData()
    formData.append('file', this.adiImgPreview.file)
    formData.append('adiLicenceNo', this.adiLicenceNo)

    try {
      await httpAuth.post('instructor-adi-licence-data', formData)
    } catch (err) {
      throw Error(err.response.data)
    }
  }

  /**
   * validate data 
   * send http request to upload adi licence data
   */
  async proceed() {
    if (this.validation()) { return }

    try {
      await this.uploadAdiLicence()
    } catch (err) {
      return this.errorMessage = err.message
    }

    this.getInductionInfo()
  }

  /** 
   * Validate ADI Licence
   */
  validation() {
    if (!this.adiLicenceNo) {
      return this.errorMessage = 'adi licence number is required'
    }

    if (!this.adiImgPreview.file) {
      return this.errorMessage = 'adi licence image is required'
    }
  }
}
</script>



<style lang="scss" scoped>
  .pic-container {
    width: 348px;
    height: 180px;

    .adi-img-preview {
<<<<<<< HEAD
      height: 150px;
=======
      height: 160px;
>>>>>>> mobile-visuals
      width: auto;
    }
  }

  .api-response-container {
    width: 348px;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 0;

    p {
      margin: 0;
      padding: 0;
    }
  }

  .adi-licence-no {
    width: 348px;
    margin: 0 auto;

    p {
      font-size: 14px;
      margin: 0;
    }

    input {
      margin-left: 10px;
    }
  }

  .button-container {
    margin-top: 10px;
  }

  @import './scss/upload-img.scss';  
</style>

