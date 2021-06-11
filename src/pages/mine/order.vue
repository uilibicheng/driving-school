<template>
  <view class="order">
    <view class="order-list" v-if="list.length">
      <view
        class="order-item"
        v-for="(item, index) in list"
        :key="index"
        @click="goToDetail(item.courseInfoVOList[0].id)"
      >
        <view class="item-top">
          <view class="item-header">
            <view>订单编号：{{item.courseInfoVOList[0].payInfo ? item.courseInfoVOList[0].payInfo.orderId : item.courseInfoVOList[0].id}}</view>
          </view>
          <view class="item-info">
            <image :src="item.courseInfoVOList[0].videoInfoVO && item.courseInfoVOList[0].videoInfoVO.videoThumbUrl" mode="aspectFit" />
            <view class="info-desc">
              <view class="item-name">{{item.courseInfoVOList[0].courseName}}</view>
              <view class="price">
                <text class="symbol">￥</text>{{item.courseInfoVOList[0].coursePrice}}
              </view>
            </view>
          </view>
        </view>
        <view class="item-bottom">订单日期：{{item.courseInfoVOList[0].payInfo && item.courseInfoVOList[0].payInfo.payTime}}</view>
      </view>
      <view class="footer-tip">已经到底喽～</view>
    </view>
    <view class="no-order" v-else>还没有相关订单</view>
  </view>
</template>

<script>
import localM from '@/utils/common/local'
import {LOCAL_KEY} from '@/config/constants'

export default {
  data() {
    return {
      list: [],
      page: 1,
      limit: 10,
      totalPage: 0,
    };
  },

  onLoad() {
    this.getCoursePay();
  },

  methods: {
    getCoursePay() {
      let data = {
        userId: localM.get(LOCAL_KEY.USER).id || '',
        page: this.page,
        limit: this.limit,
        sidx: 'courseSite',
        order: 'desc',
      };
      this.$http.user.getCoursePay({
        data,
        success: (res) => {
          this.totalPage = res.pages;
          let data = res.list
          if (res.current === 1) {
            this.list = data
          } else {
            this.list = this.list.concat(data)
          }
        },
      });
    },

    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/videoDetail/index?id=${id}`,
      });
    },
  },

  onReachBottom() {
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getCoursePay();
    }
  },

  onPullDownRefresh() {
    this.page = 1;
    this.list = [];
    this.getCoursePay();
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  background: #F9F9F9;

  .order-item {
    width: 100%;
    background: #fff;
    border: 1px solid #cccccc;
    margin-bottom: 30rpx;

    .item-top {
      padding: 30rpx 20rpx;

      .item-header {
        font-size: 32rpx;
        color: #676767;
      }

      .item-info {
        display: flex;
        margin-top: 20rpx;

        image {
          flex: 0 0 300rpx;
          width: 300rpx;
          height: 160rpx;
        }

        .info-desc {
          width: 370rpx;
          padding-left: 15rpx;
          box-sizing: border-box;

          .item-name {
            width: 100%;
            margin-top: 30rpx;
            font-size: 32rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .price {
            margin-top: 30rpx;
            font-size: 42rpx;
            color: #fd8e57;

            .symbol {
              font-size: 28rpx;
              font-weight: normal;
            }
          }
        }
      }
    }

    .item-bottom {
      width: 100%;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      border-top: 1rpx solid #ccc;
      font-size: 28rpx;
      color: #676767;
    }
  }

  .footer-tip {
    font-size: 24rpx;
    color: #999;
    text-align: center;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
  }

  .no-order {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    color: #9b9b9b;
  }
}
</style>