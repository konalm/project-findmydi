<template>
  <layout :infoBox="true" :previousView="'/intro/coverage'">
    <span slot="stepHeader">Profile Picture</span>

    <span slot="introStep" v-if="allowedAccess"> 
      <div class="pic-container">
        <div class="pic-back"></div>

        <img v-if="uploadedAvatar" v-bind:src="avatarImgSrc" alt="profile-pic" 
          class="avatar-img"
          width="300px" 
        />
      </div>

      <div class="button-container">
        <div class="upload-avatar-button" v-bind:class="{'update': uploadedAvatar}">
          <form enctype="multipart/form-data" novalidate />
            <!-- new profile pic -->
            <label for="avatar-upload" class="custom-avatar"
              v-if="!uploadedAvatar"
            >
              <p>Upload a Profile Picture</p>
            </label> 

            <!-- update profile pic -->
            <label for="avatar-upload" class="custom-avatar update"
              v-if="uploadedAvatar"
            >
              <p>Upload a New Profile Picture</p>
            </label> 

            <input id="avatar-upload" type="file" name="profile-pic"
              @change="saveAvatar($event.target.files)"
              class="file-upload"
              size="60"
              accept="/image/*"
            />
          </form>
        </div>

        <button class="base-button padded-button" v-if="uploadedAvatar"
          v-on:click="proceed()"
        > 
          Proceed 
        </button>
      </div>
    </span>

    <p slot="infoText"> 
      Profile Picture's can be updated instantly and as many times as you 
      like!
    </p>
  </layout>
</template>



<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './Layout'
import {httpAuth} from '@/http-requests'
import {getApiUrl} from '@/globals'
import router from '@/router'


@Component({
  components: {
    Layout
  }
})
export default class InductionProfilePic extends Vue {
  uploadedAvatar: boolean = false
  instructorInduction: {id: null, avatar_url: null}
  allowedAccess: boolean = false
  avatarImgSrc: string = ''

  beforeMount() {
    this.getInductionInfo()
  }

  /** 
   * 
   */
  updateAvatarImgSrc() {
    if (!this.instructorInduction) { return }

    this.avatarImgSrc = 
      `${getApiUrl()}img/avatar/${this.instructorInduction.id}?${new Date().getTime()}`
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

    this.instructorInduction = response.data
    this.uploadedAvatar = this.instructorInduction.avatar_url ? true : false

    const coverages = JSON.parse(response.data.coverages)
    if (coverages[0] === null) {
      return router.push('/induction/coverage')
    }

    this.updateAvatarImgSrc()
    this.allowedAccess = true
    this.$store.commit('setInductionInfo', response.data)    
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
        this.uploadedAvatar = true
        this.updateAvatarImgSrc()
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /** 
   * redirect to adi licence view
   */
  proceed() {
    router.push('/induction/adi-licence')
  }
}
</script>


<style lang="scss" scoped>
  @import './scss/upload-img.scss';
</style>

