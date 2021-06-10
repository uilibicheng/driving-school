<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" />

    <view class="nav-list">
      <view class="nav-item" v-for="item in navItems" :key="item.id" @click="handleClick(item.id)">
        <image :src="item.icon" />
        <view class="nav-item-right">
          <view class="right-title">{{item.title}}</view>
          <view class="right-sub">{{item.sub}}</view>
        </view>
      </view>
    </view>

    <CourseList :courseData="courseData" buttonText="发给学员" :isCopy="true" />
    <BottomBar activeType="home" />
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import BottomBar from '@/components/common/bottomBar'
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

export default {
  components: {
    BottomBar,
    HeaderSearch,
    CourseList,
	},

  props: {
    courseData: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
			areaData: {},
      navItems: [
        {
          id: 1,
          icon: require("@/static/home/invite-coach.png"),
          title: "邀请教练",
          sub: 'Invitation',
        },
        {
          id: 2,
          icon: require("@/static/home/icon-watch.png"),
          title: "学员观看",
          sub: 'Watch',
        },
        {
          id: 3,
          icon: require("@/static/home/icon-tool.png"),
          title: "教练工具",
          sub: 'Instructor',
        },
        {
          id: 4,
          icon: require("@/static/home/icon-free.png"),
          title: "申请免费",
          sub: '观看',
        },
        {
          id: 5,
          icon: require("@/static/home/icon-route.png"),
          title: "线路图",
          sub: '下载',
        },
        {
          id: 6,
          icon: require("@/static/home/icon-photo.png"),
          title: "回执拍照",
          sub: 'Shot',
        }
      ],
      userInfo: {},
      path: '',
    };
	},

  mounted() {
    this.userInfo = localM.get(LOCAL_KEY.USER)
  },

  methods: {
    handleClick(id) {
      switch(id) {
        case 1:
          uni.navigateTo({
            url: `/pages/poster/index?type=INVITE_COACH`
          })
          break
        case 5:
          uni.navigateTo({
            url: `/pages/mapList/index`
          })
          break
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  padding-bottom: 120rpx;

  .nav-list {
    margin-top: 30rpx;
    padding: 0 20rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .nav-item {
      width: 220rpx;
      height: 110rpx;
      background: #fff;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      padding-left: 20rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      color: #fff;
      image {
        width: 50rpx;
        height: 70rpx;
      }
      &:nth-child(1) {
        background: linear-gradient(-40deg, #4A77FD, #255BFF);
      }
      &:nth-child(2) {
        background: linear-gradient(128deg, #FFBD23, #FFBA00);
      }
      &:nth-child(3) {
        background: linear-gradient(128deg, #01D3B1, #03CDB4);
        image {
          width: 60rpx;
          height: 60rpx;
        }
      }
      &:nth-child(4) {
        background: linear-gradient(128deg, #FC763D, #FE6E48);
        image {
          width: 60rpx;
          height: 50rpx;
        }
      }
      &:nth-child(5) {
        background: linear-gradient(128deg, #9F70FD, #B96FFE);
        image {
          width: 66rpx;
          height: 54rpx;
        }
      }
      &:nth-child(6) {
        background: linear-gradient(128deg, #F775FF, #FD4ECA);
        image {
          width: 60rpx;
          height: 50rpx;
        }
      }
      .nav-item-right {
        margin-left: 20rpx;
        .right-sub {
          margin-top: 5rpx;
          font-size: 16rpx;
          opacity: .5;
        }
      }
    }
  }
}
</style>
