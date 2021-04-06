<template>
  <view class="order">
    <view class="order-list" v-if="list.length">
      <view
        class="order-item"
        v-for="(item, index) in list"
        :key="index"
        @click="goToDetail(item.id)"
      >
        <view class="item-top">
          <view class="item-header">
            <view>订单编号：{{item.id}}</view>
          </view>
          <view class="item-info">
            <image :src="item.thumbnailUrl" mode="aspectFit" />
            <view class="info-desc">
              <view class="item-name">{{item.name}}</view>
              <view class="price">
                <text class="symbol">￥</text>{{item.price}}
              </view>
            </view>
          </view>
        </view>
        <view class="item-bottom">订单日期：{{item.createTime}}</view>
      </view>
    </view>
    <view class="no-order" v-else>还没有相关订单</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageNo: 1,
      pageSize: 20,
      totalPage: 0,
    };
  },

  onLoad() {
    this.getOrderList();
  },

  methods: {
    getOrderList() {
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      this.$http.data.getOrderList({
        data,
        success: (res) => {
          this.totalPage = res.pages;
          for (let i = 0; i < 10; i++) {
            this.list = this.list.concat(res.records);
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

  onReachBottom(e) {
    console.log(111, this.pageNo)
    if (this.pageNo < this.totalPage) {
      this.pageNo = this.pageNo + 1;
      this.getOrderList();
    }
  },

  onPullDownRefresh() {
    this.pageNo = 1;
    this.list = [];
    this.getOrderList();
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
      border-top: 4rpx solid #ccc;
      font-size: 28rpx;
      color: #676767;
    }
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