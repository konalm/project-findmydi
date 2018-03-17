import InductionIntro from '@/components/induction/InductionIntro.vue'
import InductionHourlyRate from '@/components/induction/InductionHourlyRate.vue'
import InductionCoverage from '@/components/induction/InductionCoverage.vue'
import InductionProfilePic from '@/components/induction/InductionProfilePic.vue'
import InductionAdiLicence from '@/components/induction/InductionAdiLicence.vue'
import InductionAuth from '@/induction-authorization'


const inductionRoutes = [
  {
    path: '/induction',
    name: 'InductionIntro',
    component: InductionIntro
  },
  {
    path: '/induction/hourly-rate',
    name: 'InstructorIntroHourlyRate',
    component: InductionHourlyRate,
    beforeEnter: InductionAuth
  },
  {
    path: '/induction/coverage',
    name: 'InstructorIntroCoverage',
    component: InductionCoverage,
    beforeEnter: InductionAuth
  },
  {
    path: '/induction/profile-picture',
    name: 'InstructorIntroProfilePic',
    component: InductionProfilePic,
    beforeEnter: InductionAuth
  },
  {
    path: '/induction/adi-licence',
    name: 'InstructorIntroAdiLicence',
    component: InductionAdiLicence,
    beforeEnter: InductionAuth
   },
]


export default inductionRoutes

