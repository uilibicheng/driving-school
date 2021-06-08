<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" type="addCourse" :isSelect="true" />

    <CourseList :courseData="courseData" buttonText="添加课程" disableText="移除" :buttonClick="handleClick" />
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import localM from '@/utils/common/local'
import {LOCAL_KEY} from '@/config/constants' //常量

export default {
  components: {
    HeaderSearch,
    CourseList,
	},

  data() {
    return {
      queryParams: {
        limit: 10,
        page: 1,
        courseCity: '',
        courseProvince: '',
      },
      totalPage: 10,
      areaData: {},
      courseData: {},
      loading: false,
    }
  },

  onLoad(options) {
    this.areaData.territoryName = options.city
    this.queryParams.courseCity = options.city
    this.queryParams.courseProvince = options.province

    this.getCourseGroup()
  },

  methods: {
    getCourseGroup() {
			let data = {
        sidx: 'courseSite',
        order: 'desc',
        ...this.queryParams,
			}
      this.$http.course.getCourseGroup({
				data,
        success: (res) => {
          this.totalPage = res.pages;
					let data = res
          this.courseData = Object.assign({}, this.courseData, data)
        },
      });
		},
    
    handleClick(item) {
      if (!item.selectSatus) {
        this.handleAdd(item)
      } else {
        this.handleRemove(item)
      }
    },

    handleAdd(item) {
      if (this.loading) return
      this.loading = true
      if (item.selectSatus) {
        return this.$toast('课程已添加')
      }
      let data = {
        courseId: item.id,
        roleCode: localM.get(LOCAL_KEY.USER).roleCode || ''
      }
      this.$http.course.addCourse({
        data,
        success: res => {
          this.getCourseGroup()
          this.$toast('添加成功')
        },
        complete: () => {
          this.loading = false
        }
      })
    },

    handleRemove(item) {
      if (this.loading) return
      this.loading = true
      let data = {
        courseId: item.id,
      }
      this.$http.course.removeCourse({
        data,
        success: res => {
          this.getCourseGroup()
          this.$toast('移除成功成功')
        },
        complete: () => {
          this.loading = false
        }
      })
    },

    addCourse() {
      
    }
  },

  onReachBottom(e) {
    if (this.queryParams.page < this.totalPage) {
      this.page = this.page + 1;
      this.getCourseGroup();
    }
  },
}
</script>