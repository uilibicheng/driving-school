<template>
  <div>
    <CoachView  v-if="userInfo && userInfo.roleCode" :courseData="courseData" />
    <StudentView v-else :courseData="courseData" />
  </div>
</template>

<script>
import CoachView from '@/components/CoachView'
import StudentView from '@/components/StudentView'
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

export default {
  components: {
    CoachView,
    StudentView
  },

  data() {
    return {
      userInfo: {},
			courseData: {},
      page: 1,
      limit: 200,
      totalPage: 0,
    }
  },

  onShow() {
    this.userInfo = localM.get(LOCAL_KEY.USER) || {}
    this.getCourseList()
	},

  methods: {
    getCourseList() {
			let data = {
				page: this.page,
        limit: this.limit,
        sidx: 'courseSite',
        order: 'desc',
        parentId: this.userInfo.pid || 0
			}
      this.$http.course.getCourseList({
				data,
        success: (res) => {
          this.totalPage = res.pages;
          let data = res
          this.courseData = Object.assign({}, this.courseData, data)
        },
      });
		},
  },

  onReachBottom(e) {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getCourseList();
    }
  },

  onPullDownRefresh() {
    this.page = 1;
    this.courseData = {};
    this.getCourseList();
  },
}
</script>