<template>
<div class="modal-box">

   <div class="modal-box__header">
    Profile Picture
    <i class="fa fa-edit"></i>
  </div>

  <div class="modal-box__body avatar-upload">
    <form 
      enctype="multipart/form-data"
      novalidate
      v-on:submit.prevent="uploadAvatar()"
    />
      <div class="form-group avatar-container">
        <img v-if="!user.avatar_url"
          src="../../../assets/profilePic.jpg"
          alt="profile-pic" 
          width="300px" 
        />

        <img v-if="user.avatar_url"
          v-bind:src="avatarImgSrc"
          alt="profile-pic" 
          class="avatar-img"
          width="300px" 
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
          <!-- <p v-if="user.avatar_url">Update</p> -->
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
  .modal-box {
    width: 80%;
    margin-left: 50px;
  }

  .modal-box__body.avatar-upload {
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
    padding-top: 40px;
  }

  img.avatar-img {
    margin: 0 auto;
  }
</style>