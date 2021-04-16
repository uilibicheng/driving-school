<template>
  <view class="index">
    <view class="header" @click="goToSelect">
      <view class="btn-icon">{{areaData.name}}</view>
      <uni-search-bar placeholder="城市/考场" radius="20" class="search-bar" cancelButton="none" />
    </view>

    <view class="content">
      <view class="area-item" v-for="(place, placeIndex) in Object.keys(placeData)" :key="placeIndex">
        <view class="title">{{place}}</view>
        <view class="exam-item" v-for="(item, index) in placeData[place]" :key="index" @click="goToDetail(item.id)">
          <image :src="item.thumbnailUrl" mode="aspectFit" />
          <view class="exam-item-right">
            <view class="exam-item-right-title">{{item.name}}</view>
            <view class="time">
              <text>{{item.playNumber}}次播放</text>
              <text style="margin-left: 40rpx">{{item.updateTime | filterTime}}更新</text>
            </view>
            <view class="price">
              <text class="symbol">￥</text>{{item.price}}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniSearchBar from "../../components/uni-search-bar/uni-search-bar";
import localM from "@/utils/common/local";
import common from '@/utils/common'
import { LOCAL_KEY } from "@/config/constants";

export default {
  components: {
    uniSearchBar,
	},

  data() {
    return {
			areaData: {},
			placeData: {},
      pageNo: 1,
      pageSize: 20,
      totalPage: 0,
    };
	},

	filters: {
		filterTime(val) {
			return common.getDateDiff(Date.parse(val))
		}
	},

  onShow() {
    if (!localM.get(LOCAL_KEY.TOKEN)) {
      return common.toManage("/pages/login/login")
    }
    if (localM.get(LOCAL_KEY.AREA)) {
			this.areaData = localM.get(LOCAL_KEY.AREA);
			this.getCourseList()
    } else {
      this.goToSelect();
    }
	},

  methods: {
    getCourseList() {
			let data = {
				cityName: this.areaData.name,
				pageNo: this.pageNo,
        pageSize: this.pageSize,
			}
      this.$http.data.getCourseList({
				data,
        success: (res) => {
          this.totalPage = res.pages;
					let data = res.records.reduce((result, item) => {
						if (result[item.place]) {
							result[item.place].push(item)
						} else {
							result[item.place] = [item]
						}
						return result
					}, {})
          this.placeData = Object.assign({}, this.placeData, data)
        },
      });
		},
		
		goToDetail(id) {
			uni.navigateTo({
        url: `/pages/videoDetail/index?id=${id}`,
      })
		},

    goToSelect() {
      uni.navigateTo({
        url: "/pages/selectArea/index",
      })
    },
  },

  onReachBottom(e) {
    if (this.pageNo < this.totalPage) {
      this.pageNo = this.pageNo + 1;
      this.getCourseList();
    }
  },

  onPullDownRefresh() {
    this.pageNo = 1;
    this.placeData = {};
    this.getCourseList();
  },
};
</script>

<style lang="scss" scoped>
.index {

  .header {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10rpx 10rpx;

    .btn-icon {
      color: #000;
      font-size: 32rpx;
      font-weight: bold;

      &::after {
        display: inline-block;
        font-family: unibtn;
        content: "\e601";
        margin-left: 2px;
        transform: rotate(-90deg) scale(0.8);
      }
    }

    .search-bar {
      width: 500rpx;
      text-align: left;
    }
  }

  .content {
    padding: 20rpx 30rpx;

    .area-item {
      margin-bottom: 20rpx;

      .title {
        font-size: 36rpx;
        border-left: 4rpx solid #22c359;
        padding-left: 30rpx;
        height: 70rpx;
        line-height: 70rpx;
        margin-bottom: 20rpx;
      }

      .exam-item {
        width: 100%;
        background: #fff;
        border-radius: 10rpx;
        display: flex;
        padding: 20rpx;
        margin-bottom: 25rpx;
        box-sizing: border-box;

        image {
          width: 250rpx;
          height: 150rpx;
          background: #000;
        }

        .exam-item-right {
          width: 390rpx;
          font-size: 16rpx;
          margin-left: 20rpx;

          .exam-item-right-title {
            font-size: 32rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
          }

          .time {
            margin-top: 10rpx;
            font-size: 26rpx;
            color: #9f9f9f;
          }

          .price {
            margin-top: 10rpx;
            font-size: 36rpx;
            color: #fd8e57;
            font-weight: bold;

            .symbol {
              font-size: 24rpx;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
</style>
