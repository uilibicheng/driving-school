<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" />
    <NavList />
    <CourseList :courseList="courseList" buttonText="查看详情" :buttonClick="goToDetail" />

    <BottomBar activeType="home" />
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import NavList from '@/components/common/navList'
import BottomBar from '@/components/common/bottomBar'
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

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
      userInfo: {}
    };
	},

  mounted() {
    this.userInfo = localM.get(LOCAL_KEY.USER)
  },

  methods: {
		goToDetail(data) {
      let url = `/pages/videoDetail/index?id=${data.id}`
      if (+data.courseType === 2) {
        url = `/pages/compilations/index?id=${data.id}`
      }
			uni.navigateTo({
        url,
      })
		},
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  padding-bottom: 120rpx;

  .content {
    padding: 20rpx 20rpx;

    .area-item {
      margin-bottom: 20rpx;

      .title {
        font-size: 32rpx;
        color: #333;
        padding-left: 15rpx;
        margin-bottom: 20rpx;
        position: relative;
        height: 70rpx;
        line-height: 70rpx;

        &::after {
          content: '';
          position: absolute;
          top: 20rpx;
          left: 0;
          width: 4rpx;
          height: 30rpx;
          background: #4A7FF6;
          border-radius: 4rpx 0px 4rpx 0px;
        }
      }

      .exam-item {
        width: 100%;
        background: #fff;
        display: flex;
        margin-top: 40rpx;
        padding-bottom: 40rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(153, 153, 153, .4);

        .image-wrap {
          width: 300rpx;
          height: 180rpx;
          position: relative;

          .image-info {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #69658A;
            font-size: 24rpx;
            z-index: 500;
            padding: 0 15rpx;
            box-sizing: border-box;
            .image-info-title {
              font-size: 32rpx;
              margin-bottom: 15rpx;
            }
            .image-info-item {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .image-info-line {
              margin-top: 20rpx;
              width: 40rpx;
              height: 1px;
              background: #69658A;
            }
          }

          image {
            width: 300rpx;
            height: 180rpx;
            background: #000;
            border-radius: 10rpx;
          }
        }


        .exam-item-right {
          flex: 1 0 auto;
          font-size: 16rpx;
          margin-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .exam-item-right-title {
            font-size: 32rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
          }

          .right-bottom-wrap {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 15rpx;
            .time {
              margin-top: 10rpx;
              font-size: 26rpx;
              color: #9f9f9f;
              display: flex;
              align-items: center;
              image {
                width: 20rpx;
                height: 15rpx;
                background: #fff;
                margin-right: 10rpx;
              }
            }

            .price {
              margin-top: 20rpx;
              margin-bottom: 20rpx;
              font-size: 36rpx;
              color: #FF3B0D;

              .symbol {
                font-size: 24rpx;
              }
            }
            .right-btn {
              width: 160rpx;
              height: 85rpx;
              line-height: 85rpx;
              text-align: center;
              font-size: 26rpx;
              color: #fff;
              background: #426ADC;
              border-radius: 10rpx;
            }
          }
        }
      }
    }

    .footer-tip {
      font-size: 24rpx;
      color: #999;
      text-align: center;
      margin-top: 30rpx;
    }
  }
}
</style>
