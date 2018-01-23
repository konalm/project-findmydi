<template>
<div class="white-modal-box">
  <p class="modal-box-header">Avatar</p>

  <div class="white-modal-box__container avatar-upload">
    <form 
      enctype="multipart/form-data"
      novalidate
      v-on:submit.prevent="uploadAvatar()"
    />
      <div class="form-group avatar-container">
        <img v-if="!user.avatar_url"
          src="../../../assets/profilePic.jpg"
          alt="profile-pic" 
          class="img-thumbnail"
          width="400px" 
          height="400px"
        />

        <img v-if="user.avatar_url"
          v-bind:src="avatarImgSrc"
          alt="profile-pic" 
          class="img-thumbnail avatar-img"
          width="400px" 
          height="400px"
        />
      </div>

      <div class="form-group" 
        v-bind:class="{'update-upload-container': user.avatar_url}"
      >
        <label for="avatar-upload" 
          class="custom-avatar upload" 
          v-bind:class="{'update-upload': user.avatar_url}"
        >
          <p v-if="!user.avatar_url">Upload a Profile Picture</p>
          <p v-if="user.avatar_url">Update</p>
        </label> 

        <input 
          id="avatar-upload"
          type="file"
          name="profile-pic"
          @change="saveAvatar($event.target.files)"
          class="file-upload"
          size="60"
          accept="/image/*"
        />
      </div>
    </form>
  </div>
</div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {getApiUrl} from '@/globals'
import {Prop} from 'vue-property-decorator'
import {httpAuth} from '@/http-requests'

// import defaultAvatar from '../../assets/profilePic.jpg'

@Component({})
export default class InstructorAvatar extends Vue {
  uploadAvatar: boolean = false
  avatar: string = ''
  cc: string = ''
  file: ""

  @Prop() 
    user: {
      id: '',
      name: '',
      email: '',
      postcode: '',
      radius: '',
      verified: 0,
      avatar_url: '',
    }
  
  $refs: {
    avatar: HTMLFormElement
  }
  
  get avatarImgSrc() {
      return `${getApiUrl()}img/avatar/${this.user.id}?${new Date().getTime()}`
  }

  /**
   * toggle upload avatar true/false for UI
   */
  toggleUploadAvatar() {
    this.uploadAvatar = !this.uploadAvatar
  }

  /** 
   * 
   */
  updateAvatar(targetFiles) {
    this.avatar = targetFiles[0]
  }

  /**
   * 
   */
  saveAvatar(targetFiles) {
    let data = new FormData()
    data.append('file', targetFiles[0])

    httpAuth.post('/update-avatar', data)
      .then(res => {
        console.log('new avatar uploaded')
        this.$emit('newAvatarUploaded')
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>



<style scoped lang="scss">
.white-modal-box__container.avatar-upload {
  input.file-upload {
    display: none;
  }

  label.custom-avatar {
    background: #2EA663;
    color: white; 
    padding: 7px 15px 7px 15px;
    border-radius: 5px;
    cursor: pointer;

    p {
      margin: 0;
    }
  }
  
  label.custom-avatar.update-upload {
    background: none;
    color: #2EA663;;
    font-size: 12px;
    padding: 0;
    text-align: left;
    text-decoration: underline;
  }

  &.avatar-upload {
    padding: 0;
    text-align: center;
  }
}

.update-upload-container {
  text-align: left;
  padding-left: 80px;
}



.avatar-container {
  // border: 1px solid green;
   padding-top: 10px;
}

img.avatar-img {
  // border: 1px solid red;
  margin: 0 auto;
}
</style>