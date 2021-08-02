<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" />

    <CourseList :courseList="courseList" buttonText="免费试看" :isFree="true"  :buttonClick="goToDetail" />
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

export default {
  components: {
    HeaderSearch,
    CourseList,
	},

  data() {
    return {
			areaData: {},
      courseList: [],
      page: 1,
      limit: 10,
      totalPage: 1,
    };
	},

  created() {
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

    goToDetail(data) {
			uni.navigateTo({
        url: `/pages/videoDetail/index?id=${data.id}&isFree=1`,
      })
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
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  padding-bottom: 120rpx;
}
</style>
