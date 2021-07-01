<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" type="addCourse" :isSelect="true" />

    <CourseList :courseList="courseList" buttonText="添加课程" disableText="移除" :buttonClick="handleClick" />
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
      totalPage: 1,
      areaData: {},
      courseList: [],
      loading: false,
      userInfo: {},
    }
  },

  onLoad(options) {
    this.userInfo = localM.get(LOCAL_KEY.USER)
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
        roleCode: this.userInfo.roleCode || ''
      }
      this.$http.course.addCourse({
        data,
        success: res => {
          this.initList()
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
          this.initList()
          this.$toast('移除成功')
        },
        complete: () => {
          this.loading = false
        }
      })
    },

    initList() {
      this.queryParams.page = 1;
      this.courseList = [];
      this.getCourseGroup();
    }
  },

  onReachBottom(e) {
    if (this.queryParams.page < this.totalPage) {
      this.queryParams.page = this.queryParams.page + 1;
      this.getCourseGroup();
    }
  },

  onPullDownRefresh(e) {
    this.initList()
  },
}
</script>