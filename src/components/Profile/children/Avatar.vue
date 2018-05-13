<template>
  <div class="modal-box">
    <div class="modal-box__header">
      Profile Picture 
      <i class="fa fa-edit" v-on:click="toggleUploadAvatar()"></i>
    </div>

    <div class="modal-box__body avatar-upload">
      <form enctype="multipart/form-data" novalidate  
        v-on:submit.prevent="uploadAvatar()"
      />
        <div class="form-group avatar-container">
          <img v-if="!user.avatar_url" src="../../../assets/profilePic.jpg" 
            alt="profile-pic" 
          />

          <img v-if="user.avatar_url" v-bind:src="avatarImgSrc" alt="profile-pic" 
            class="avatar-img"
          />
        </div>

        <div class="form-group" 
          v-bind:class="{'update-upload-container': user.avatar_url}"
        >
          <label for="avatar-upload" class="custom-avatar upload" 
            v-if="uploadAvatar"
          >
            <p v-if="!user.avatar_url">Upload a Profile Picture</p>
            <p v-if="user.avatar_url">Upload New Profile Picture</p>
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
   * save new avatar image 
   * toggle off update mode
   */
  saveAvatar(targetFiles) {
    let data = new FormData()
    data.append('file', targetFiles[0])

    httpAuth.post('/update-avatar', data)
      .then(res => {
        this.$emit('newAvatarUploaded')
        this.toggleUploadAvatar()
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

    @media screen and (max-width: 650px) {
      margin-left: 0;
      width: 100%;
    }
  }

  .modal-box__body.avatar-upload {
    input.file-upload {
      display: none;
    }

    label.custom-avatar {
      background: #2EA663;
      color: white; 
      padding: 7px 15px 7px 15px;
      width: 80%;
      font-weight: 300;
      cursor: pointer;

      p {
        margin: 0;
      }
    }
    
    label.custom-avatar.update-upload {
      background: none;
      color: #2EA663;;
      padding: 0;
      text-align: left;
      text-decoration: underline;
      width: 80%;
    }

    &.avatar-upload {
      padding: 0;
      text-align: center;
    }
  }

  .update-upload-container {
    text-align: center;
    padding: 20px 0 10px 0;

    button {
      width: 80%;
    }
  }

  .avatar-container {
    padding-top: 40px;

    img {
      width: 80%;
    }
  }

  img.avatar-img {
    margin: 0 auto;
  }
</style>