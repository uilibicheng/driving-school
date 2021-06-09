<template>
  <view class="index">
    <HeaderSearch />
    
    <view class="content">
      <view class="area-item" v-for="(place, placeIndex) in Object.keys(mapData)" :key="placeIndex">
        <view class="title">{{place}}</view>
        <view class="exam-item" v-for="(item, index) in mapData[place]" :key="index">
          <view class="image-wrap">
            <view class="image-info">
              <view class="image-info-title">{{item.mapName}}</view>
              <!-- <view>{{item.courseIntro}}</view> -->
              <view class="image-info-line"></view>
            </view>
            <image :src="item.mapThumbUrl" mode="aspectFit" />
          </view>
          <view class="exam-item-right">
            <view class="exam-item-right-title">{{item.mapName}}</view>
            <view class="right-bottom-wrap">
              <view>
                <view class="time">
                  {{item.downloadCount ? item.downloadCount : 0}}人下载
                </view>
              </view>
              <view class="right-btn" @click="handleClick(item)">
                查看大图
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="footer-tip">{{Object.keys(mapData) && Object.keys(mapData).length ? '已经到底喽～' : '暂无数据'}}</view>
    </view>

    <view class="big-img-content" v-if="imgUrl">
      <view class="mask" @click="imgUrl = ''"></view>
      <view class="img-wrap">
        <image
          :src="imgUrl"
          mode="aspectFit"
        />
        <view class="img-tip">长按保存到相册</view>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import { USER_INFO } from "@/config/constants";

export default {
  components: {
    HeaderSearch,
    CourseList,
	},

  data() {
    return {
      userInfo: USER_INFO,
      mapData: {},
      page: 1,
      limit: 200,
      totalPage: 0,
      imgUrl: '',
    };
	},

  mounted() {
    this.getMapList()
  },

  methods: {
    getMapList() {
			let data = {
				page: this.page,
        limit: this.limit,
        sidx: 'mapPlace',
        order: 'desc',
        userId: this.userInfo.userId || 0
			}
      this.$http.data.getMapList({
				data,
        success: (res) => {
          this.totalPage = res.pages;
          let data = res
          this.mapData = Object.assign({}, this.mapData, data)
        },
      });
		},

    handleClick(item) {
      this.imgUrl = item.mapUrl
    }
  },
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  padding-bottom: 120rpx;
  position: relative;

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
        margin-top: 30rpx;
        padding-bottom: 40rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(153, 153, 153, .4);

        .image-wrap {
          flex: 0 0 auto;
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
          width: 100%;
          font-size: 16rpx;
          margin-left: 20rpx;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .exam-item-right-title {
            flex-grow: 0;
            margin-top: 10rpx;
            font-size: 32rpx;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #000;
          }

          .right-bottom-wrap {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 5px;
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

            .date {
              margin-top: 20rpx;
              margin-bottom: 20rpx;
              font-size: 22rpx;
              color: #9f9f9f;
              
            }
            .right-btn {
              width: 150rpx;
              height: 70rpx;
              line-height: 70rpx;
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

  .big-img-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
    }

    .img-wrap {
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      width: 100%;
      z-index: 1000;
    }
    image {
      width: 100%;
      background: #000;
    }
    .img-tip {
      color: #fff;
      font-size: 32rpx;
      margin-top: 20rpx;
      text-align: center;
    }
  }
}
</style>
