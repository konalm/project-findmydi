<template>
  <div>
    <h1 class="text-center"> Instructor Portal </h1>

    <div class="container mt-5">
      <p class="lead bold"> <strong>Name:</strong> {{ user.name }}</p>
      <p class="lead"> <strong>Email:</strong> {{ user.email }}</p>

      <div class="avatar-upload">
        <form 
          enctype="multipart/form-data"
          novalidate
          v-on:submit.prevent="uploadProfilePic()"
        />
          <div class="form-group">
            <img 
              src="../../assets/profilePic.jpg" 
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
              @change="updateProfilePic($event.target.files);"
              class="input-file"
              size="60"
              accept="image/*"
            />
          </div>

          <div class="form-group" v-if="profilePic">
            <button 
              type="submit" 
              class="btn btn-primary"
              v-on:click="uploadProfilePic()"
            >
              Upload
            </button>
          </div>
        </form>
      </div>

      <!-- -->
      <div class="card mt-5">
        <div class="card-block p-2">
          <p class="card-text">
            Complete A few more steps to get verified and your future students 
            will be able to find you right away!
          </p>

          <router-link to="/verification-form">
            <button class="btn btn-success">Get Verified</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {httpAuth} from '../../http-requests'

  @Component({})
  export default class InstructorPortal extends Vue {
    profilePic: string = ''

    get user() {
      return this.$store.getters.user
    }

    /**
     * 
     */
    updateProfilePic(targetFiles) {
      console.log('update profile pic')

      this.profilePic = targetFiles[0]
    }

    /**
     * send uploaded pic to the api to be stored
     */
    uploadProfilePic () {
      console.log('upload profile pic')

      let data = new FormData()
      data.append('file', this.profilePic)


      httpAuth.post('/upload-profile-pic', data)
        .then(res => {
          console.log('file uploaded ------>')
          console.log(res)

        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }
</script>