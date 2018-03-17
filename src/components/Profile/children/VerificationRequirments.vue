<template>
  <div class="white-modal-box__container text-center">
    <p>What we need before your future students can start finding you</p>

    <ul class="instructor-requirement-list">
      <li>Hourly Rate  <status-symbol :status="hasHourlyRate" /></li>

      <li>Postcode (where you are based to give driving lessons)
          <status-symbol :status="hasPostcode" />
      </li>

      <li>Upload a profile picture <status-symbol :status="hasAvatar" /></li>

      <li>Submit a photo of your adi licence for verification
        <status-symbol 
          :status="adiLicenceIsVerified" 
          v-if="adiLicenceIsVerified !== 2" 
        />

        <i class="fa fa-ellipsis-h text-warning" v-if="adiLicenceIsVerified === 2"></i>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import StatusSymbol from '@/components/patterns/status-symbol'

@Component({
  components: {
    StatusSymbol
  }
})
export default class VerificationRequirments extends Vue {
  @Prop() coverages: [Object]
  @Prop() hourlyRate: string
  @Prop() avatar: string 
  @Prop() adiLicenceVerified: string

  get hasPostcode() {
    return this.coverages.length > 0
  }

  get hasHourlyRate() {
   return this.hourlyRate ? true : false
  }

  get hasAvatar() {
    return this.avatar ? true : false
  }

  get adiLicenceIsVerified() {
    if (parseInt(this.adiLicenceVerified) === 2) {
      return 2
    }

    if (parseInt(this.adiLicenceVerified) === 0) {
      return false
    }

    return true
  }

}
</script>



<style lang="scss">
  ul.instructor-requirement-list {
    list-style: none;

    li {
      font-size: 14px;
      line-height: 32px;
      color: rgba(0,0,0,0.6);
    }
  }

</style>
