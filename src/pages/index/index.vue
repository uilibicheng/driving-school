<template>
  <div>
    <CoachView  v-if="userInfo && userInfo.roleCode" :courseList="courseList" />
    <StudentView v-else :courseList="courseList" />
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
			courseList: [],
      page: 1,
      limit: 10,
      totalPage: 1,
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
        roleCode: this.userInfo.roleCode || '',
        parentId: this.userInfo.pid || ''
			}
      this.$http.course.getCourseList({
				data,
        success: (res) => {
          this.totalPage = res.pages;
          let data = res.list
          if (res.current === 1) {
            this.courseList = data
          } else {
            if (data && data.length && this.courseList.length) {
              const length = this.courseList.length
              // 如果新的第一条考场和旧列表最后一条是同个考场
              if (data[0].courseSite === this.courseList[length - 1].courseSite) {
                this.courseList[length - 1].courseInfoVOList = this.courseList[length - 1].courseInfoVOList.concat(data[0].courseInfoVOList)
                data.splice(0, 1)
              }
            }
            this.courseList = this.courseList.concat(data)
          }
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
    this.courseList = [];
    this.getCourseList();
  },
}
</script>