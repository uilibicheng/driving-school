<template>
  <view class="content">
    <view class="area-item" v-for="(place, placeIndex) in Object.keys(courseData)" :key="placeIndex">
      <view class="title">{{place}}</view>
      <view class="exam-item" v-for="(item, index) in courseData[place]" :key="index">
        <view class="image-wrap" @click="goToDetail(item.id)">
          <view class="image-info">
            <view class="image-info-title">{{item.courseName}}</view>
            <view>{{item.courseIntro}}</view>
            <view class="image-info-line"></view>
          </view>
          <image :src="item.videoInfoVO && item.videoInfoVO.videoThumbUrl" mode="aspectFit" />
        </view>
        <view class="exam-item-right">
          <view class="exam-item-right-title" @click="goToDetail(item.id)">{{item.courseName}}</view>
          <view class="right-bottom-wrap">
            <view @click="goToDetail(item.id)">
              <view class="price">
                <text class="symbol">￥</text>{{item.coursePrice}}
              </view>
              <view class="time">
                <image src="@/static/home/watch.png" />{{item.videoInfoVO ? item.videoInfoVO.videoPlayCount : 0}}人观看
              </view>
            </view>
            <!-- <view class="right-btn" @click="handleClick(item)" v-if="disableText">
              {{!item.selectSatus ? buttonText : disableText}}
            </view> -->
            <view class="right-btn copy-btn" v-if="roleCode">
              {{buttonText}}
            </view>
            <view class="right-btn" @click="handleClick(item)" v-else>
              {{buttonText}}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="footer-tip">{{Object.keys(courseData) && Object.keys(courseData).length ? '已经到底喽～' : '暂无数据'}}</view>
  </view>
</template>

<script>
import Clipboard from 'clipboard'
import utils from '@/utils/common'

export default {
  props: {
    courseData: {
      type: Object,
      default: {},
    },
    buttonText: {
      type: String,
      default: '',
    },
    roleCode: {
      type: String,
      default: ''
    },
    buttonClick: {
      type: Function,
      default: () => {}
    }
  },

  mounted() {
    this.$nextTick(() => {
      let clipboard = new Clipboard('.copy-btn', {
        text: () => {
          return utils.getInviteUrl()
        }
      })
      clipboard.on('success', e => {
        this.$toast('复制成功，快把链接分享给学员吧')
      })
    })
  },

  methods: {
    handleClick(data) {
      this.buttonClick && this.buttonClick(data)
    },
    goToDetail(id) {
			uni.navigateTo({
        url: `/pages/videoDetail/index?id=${id}`,
      })
		},
  },
}
</script>

<style lang="scss" scoped>
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
        // flex: 0 0 auto;
        width: 100%;
        font-size: 16rpx;
        margin-left: 20rpx;
        overflow: hidden;
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
</style>