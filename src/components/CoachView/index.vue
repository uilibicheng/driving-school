<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" />
    
    <NavList />

    <CourseList :courseList="courseList" buttonText="发给学员" :isCopy="true" />
    <BottomBar activeType="home" />
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import NavList from '@/components/common/navList'
import BottomBar from '@/components/common/bottomBar'

export default {
  components: {
    BottomBar,
    HeaderSearch,
    NavList,
    CourseList,
	},

  props: {
    courseList: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
			areaData: {},
    };
	},
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  padding-bottom: 120rpx;
}
</style>
