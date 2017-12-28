<template>
  <div class="adiLicenseUpload mt-3 mb-3">
    <form 
      enctype="multipart/form-data"
      novalidate
      v-on:submit.prevent="uploadProfilePic()"
    />
      <div class="form-group">
        <div class="row">
        <label>Upload a photo of your ADI license</label>
        </div>

        <img 
          src="../../../assets/profilePic.jpg" 
          alt="profile-pic" 
          class="img-thumbnail"
          width="200px" 
          height="200px"
        />
      </div>
      
      <div class="form-group">
        <input 
          id="profilePicUpload"
          type="file"
          name="profile-pic mt-3"
          @change="updatePhoto($event.target.files);"
          class="input-file"
          size="60"
          accept="image/*"
        />
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {httpAuth} from '@/http-requests'

@Component({})
export default class UploadAdiLicense extends Vue {
  pic: string = ''

  /**
   * 
   */
  updatePhoto(targetFiles) {
    console.log('update photo')
    
    this.pic = targetFiles[0]
    this.$emit('updatePhoto', targetFiles[0])
  }
}
</script>