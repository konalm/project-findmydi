<template>
<div class="modal fade" id="myModal" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <button class="close-button" v-on:click="closeModal()">
        <i class="material-icons">close</i>
      </button> 

      <!-- ADI upload process -->
      <div class="adi-licence-upload-process" v-if="!successUpload">
        <div class="adi-image-container">
          <div class="adi-image-placeholder"></div>

          <img id="preview-adi-licence"
            class="adi-image-preview"
            v-if="adiImgPreview.readSrc"
            v-bind:src="adiImgPreview.readSrc"
            alt="preview adi licence"
          />
        </div>

        <div class="modal-footer" v-if="!imgChosen">
          <label for="adiLicenceUpload" class="adi-licence-upload">
            Select ADI licence photo 
          </label>

          <input id="adiLicenceUpload" type="file" name="adi-licence-input"
            class="adi-licence-upload"
            size="60"
            accept="/images/*"
            @change="adiLicenceSelected($event.target.files)"
          />
        </div>

        <!-- error message -->
        <div class="api-response-container" v-if="apiResponseMessage">
          <p class="error"> {{ apiResponseMessage }} </p> 
        </div>

        <div class="modal-footer double-button-container" v-if="imgChosen">
          <div class="select-another">
            <label for="selectAnotherImg" class="select-another-img">
              Select Another
            </label>

            <input id="selectAnotherImg"
              type="file"
              name="adi-licence-input"
              @change="adiLicenceSelected($event.target.files)"
              class="adi-licence-upload"
              size="60"
              accept="/images/*"
            />
          </div>

          <div class="spacer"></div>

          <button class="base-button" v-on:click="uploadAdiLicence()">
            Upload
          </button>
        </div>
      </div>
      
      <success-feedback v-if="successUpload" v-on:close="closeModal()" />
    </div>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'Vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'
import SuccessFeedback from './SuccessFeedback.vue'

@Component({
  components: {
    SuccessFeedback
  }
})
export default class AdiLicenceUpload extends Vue {
  imgChosen: boolean = false
  adiImgPreview =  {file: null, readSrc: ''}
  apiResponseMessage: string = ''
  apiResponseStatus: string = ''
  successUpload: boolean = false


  /** 
   * use FileReader to preview the selected image live
   */
  adiLicenceSelected(files) {
    let reader = new FileReader()
    this.adiImgPreview.file = files[0]

    reader.readAsDataURL(this.adiImgPreview.file)

    reader.onload = (e: Event & { target: { result: string } }) => {
      this.adiImgPreview.readSrc = e.target.result
    }

    this.imgChosen = true
  }

  /** 
   * send adi image to api to be submitted
   */
  uploadAdiLicence() {
    let data = new FormData()
    data.append('file', this.adiImgPreview.file)
    this.apiResponseMessage = ''

    httpAuth.post('instructor-adi-licence-upload', data)
      .then(res => {
        this.successUpload = true
        this.$emit('adiLicenceUploaded')
      })
      .catch(err => {
        this.apiResponseMessage = err.response.data 
        this.apiResponseStatus = 'error'
      })
  }

  /** 
   * close the modal box
   */
  closeModal() {
    this.resetData()
    $("#myModal").modal("hide")
  }

  /** 
   * reset all variables back to default 
   */
  resetData() {
    this.imgChosen = false 
    this.adiImgPreview = {file: null, readSrc:  ''}
    this.apiResponseMessage = ''
    this.apiResponseStatus = ''
    this.successUpload = false
  }
}
</script>



<style lang="scss" src="./adi-licence-upload.scss" scoped>

