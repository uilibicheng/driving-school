<template>
  <view>
    添加课程
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {
        limit: 10,
        page: 1,
        courseCity: '',
        courseProvince: '',
      }
    }
  },

  onLoad(options) {
    this.queryParams.courseCity = options.city
    this.queryParams.courseProvince = options.province
  }
}
</script>