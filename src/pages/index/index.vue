<template>
  <div>
    <CoachView v-if="userInfo.roleCode" />
    <StudentView v-else />
  </div>
</template>

<script>
import CoachView from '@/components/CoachView'
import StudentView from '@/components/StudentView'
import localM from "@/utils/common/local";
import constants, { LOCAL_KEY } from "@/config/constants";

export default {
  components: {
    CoachView,
    StudentView
  },

  data() {
    return {
      userInfo: {}
    }
  },

  onShow() {
    // if (!localM.get(LOCAL_KEY.TOKEN)) {
    //   return common.toManage("/pages/login/login")
    // }
    this.userInfo = localM.get(LOCAL_KEY.USER) || {}
    console.log('user', this.userInfo)
	},
}
</script>