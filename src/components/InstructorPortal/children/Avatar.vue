<template>
<div class="white-modal-box">
  <p class="modal-box-header">Avatar</p>

  <div class="white-modal-box__container avatar-upload">
    <form 
      enctype="multipart/form-data"
      novalidate
      v-on:submit.prevent="uploadAvatar()"
    />
      <div class="form-group">
        <img 
          v-if="!user.has_avatar"
          src="../../../assets/profilePic.jpg"
          alt="profile-pic" 
          class="img-thumbnail"
          width="200px" 
          height="200px"
        />

        <img 
          v-if="user.has_avatar === 1"
          v-bind:src="avatarImgSrc"
          alt="profile-pic" 
          class="img-thumbnail"
          width="200px" 
          height="200px"
        />
      </div>

      <div class="form-group">
        <input 
          id="avatarUpload"
          type="file"
          name="profile-pic mt-3"
          @change="updateAvatar($event.target.files);"
          ref="avatar"
          el:avatar
          class="input-file"
          size="60"
          accept="image/*"
        />
      </div>

      <div class="form-group" v-if="avatar">
        <button 
          type="submit" 
          class="btn btn-primary"
          v-on:click="uploadAvatar()"
        >
          Upload
        </button>
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
      has_avatar: number,
    }
  
  $refs: {
    avatar: HTMLFormElement
  }
  
  get avatarImgSrc() {
      return `${getApiUrl()}img/avatar/${this.user.id}?${new Date().getTime()}`
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
  uploadAvatar() {
    let data = new FormData()
    data.append('file', this.avatar)

    httpAuth.post('/upload-avatar', data)
      .then(res => {
        this.$emit('newAvatarUploaded')

        this.$refs.avatar.value = ''
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
</script>