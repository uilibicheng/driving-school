<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" />

    <view class="nav-list">
      <view class="nav-item" v-for="item in navItems" :key="item.id">
        <image :src="item.icon" />
        <view class="nav-item-right">
          <view class="right-title">{{item.title}}</view>
          <view class="right-sub">{{item.sub}}</view>
        </view>
      </view>
    </view>

    <view class="content">
      <view class="area-item" v-for="(place, placeIndex) in Object.keys(placeData)" :key="placeIndex">
        <view class="title">{{place}}</view>
        <view class="exam-item" v-for="(item, index) in placeData[place]" :key="index">
          <view class="image-wrap" @click="goToDetail(item.id)">
            <view class="image-info">
              <view class="image-info-title">{{item.courseName}}</view>
              <view>{{item.courseIntro}}</view>
              <view class="image-info-line"></view>
            </view>
            <image :src="item.courseThumbUrl" mode="aspectFit" />
          </view>
          <view class="exam-item-right">
            <view class="exam-item-right-title" @click="goToDetail(item.id)">xxx考场观路</view>
            <view class="right-bottom-wrap">
              <view @click="goToDetail(item.id)">
                <view class="price">
                  <text class="symbol">￥</text>{{item.coursePrice}}
                </view>
                <view class="time">
                  <image src="@/static/home/watch.png" />99人观看
                </view>
              </view>
              <view class="right-btn" @click="sendToStudent(item)">
                发给学员
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="footer-tip">已经到底喽～</view>
    </view>

    <BottomBar activeType="home" />
  </view>
</template>

<script>
import uniSearchBar from "../../components/uni-search-bar/uni-search-bar";
import HeaderSearch from '@/components/common/headerSearch'
import BottomBar from '@/components/common/bottomBar'
import localM from "@/utils/common/local";
import common from '@/utils/common'
import { LOCAL_KEY } from "@/config/constants";

export default {
  components: {
    uniSearchBar,
    BottomBar,
    HeaderSearch
	},

  data() {
    return {
			areaData: {},
			placeData: {},
      page: 1,
      limit: 20,
      totalPage: 0,
      activeColor: 'red',
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
      ]
    };
	},

	filters: {
		filterTime(val) {
			return common.getDateDiff(Date.parse(val))
		}
	},

  onShow() {
    // if (!localM.get(LOCAL_KEY.TOKEN)) {
    //   return common.toManage("/pages/login/login")
    // }
    this.getCourseList()
    // if (localM.get(LOCAL_KEY.AREA)) {
		// 	this.areaData = localM.get(LOCAL_KEY.AREA);
		// 	this.getCourseList()
    // } else {
    //   this.goToSelect();
    // }
	},

  methods: {
    // getCourseList() {
    //   let list = [
    //     {
    //       "courseCity": "深圳市",
    //       "courseIntro": "课程简介",
    //       "courseName": "课程名称",
    //       "coursePrice": 124,
    //       "courseProvince": "广东省",
    //       "courseSite": "华南城",
    //       "courseThumbUrl": "string",
    //       "courseVideoUrl": "string",
    //       "createBy": "创建人",
    //       "createTime": "2021-05-24T13:58:18.331Z",
    //       "delFlag": "0",
    //       "id": "123",
    //       "mapId": "333",
    //       "selectSatus": true,
    //       "updateBy": "更信任",
    //       "updateTime": "2021-05-24T13:58:18.331Z",
    //       "videoId": "345"
    //     },
    //     {
    //       "courseCity": "深圳市",
    //       "courseIntro": "课程简介",
    //       "courseName": "课程名称",
    //       "coursePrice": 124,
    //       "courseProvince": "广东省",
    //       "courseSite": "华南城",
    //       "courseThumbUrl": "string",
    //       "courseVideoUrl": "string",
    //       "createBy": "创建人",
    //       "createTime": "2021-05-24T13:58:18.331Z",
    //       "delFlag": "0",
    //       "id": "123",
    //       "mapId": "333",
    //       "selectSatus": true,
    //       "updateBy": "更信任",
    //       "updateTime": "2021-05-24T13:58:18.331Z",
    //       "videoId": "345"
    //     },
    //   ]
    //   let data = list.reduce((result, item) => {
    //     if (result[item.courseSite]) {
    //       result[item.courseSite].push(item)
    //     } else {
    //       result[item.courseSite] = [item]
    //     }
    //     return result
    //   }, {})
    //   this.placeData = Object.assign({}, this.placeData, data)
    //   console.log('placeData', this.placeData)
		// 	// let data = {
		// 	// 	// cityName: this.areaData.name,
		// 	// 	page: this.page,
    //   //   limit: this.limit,
    //   //   sidx: 'courseSite',
    //   //   order: 'desc',
    //   //   userId: '1234234234'
		// 	// }
    //   // this.$http.data.getCourseList({
		// 	// 	data,
    //   //   success: (res) => {
    //   //     this.totalPage = res.pages;
		// 	// 		let data = res.records.reduce((result, item) => {
		// 	// 			if (result[item.place]) {
		// 	// 				result[item.place].push(item)
		// 	// 			} else {
		// 	// 				result[item.place] = [item]
		// 	// 			}
		// 	// 			return result
		// 	// 		}, {})
    //   //     this.placeData = Object.assign({}, this.placeData, data)
    //   //   },
    //   // });
		// },

    getCourseList() {
			let data = {
				// cityName: this.areaData.name,
				page: this.page,
        limit: this.limit,
        sidx: 'courseSite',
        order: 'desc',
        userId: '1234234234'
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

    sendToStudent(data) {
      console.log('data', data)
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
    if (this.page < this.totalPage) {
      this.page = this.page + 1;
      this.getCourseList();
    }
  },

  onPullDownRefresh() {
    this.page = 1;
    this.placeData = {};
    this.getCourseList();
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
