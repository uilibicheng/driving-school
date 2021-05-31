<template>
  <view class="index">
    <HeaderSearch :areaData="areaData" />

    <!-- <CourseList :courseData="courseData" buttonText="查看详情" :buttonClick="goToDetail" /> -->
    <CourseList :courseData="courseData" buttonText="立即购买" :buttonClick="goToDetail" />

    <BottomBar activeType="home" />
  </view>
</template>

<script>
import HeaderSearch from '@/components/common/headerSearch'
import CourseList from '@/components/common/courseList'
import BottomBar from '@/components/common/bottomBar'
import Clipboard from 'clipboard'
import localM from "@/utils/common/local";
import common from '@/utils/common'
import constants, { LOCAL_KEY } from "@/config/constants";
import jweixin from "@/static/js/jweixin-module.js";

export default {
  components: {
    BottomBar,
    HeaderSearch,
    CourseList,
	},

  data() {
    return {
			areaData: {},
			courseData: {},
      page: 1,
      limit: 20,
      totalPage: 0,
    };
	},

	filters: {
		filterTime(val) {
			return common.getDateDiff(Date.parse(val))
		}
	},

  mounted() {
    console.log(33333)
    this.getCourseList()
    this.$nextTick(() => {
      var clipboard = new Clipboard('.copy-btn', {
        text: () => {
          let url = `${constants.ROOT_URL}/#/pages/index/index`
          let userInfo = localM.get(LOCAL_KEY.USER)
          if (userInfo && userInfo.id) {
            url = `${url}?recommendId=${userInfo.id}`
          }
          return url
        }
      })
      clipboard.on('success', e => {
        console.log('e', e)
        this.$toast('复制成功，快把链接分享给学员吧')
      })
    })
  },

  methods: {

    getCourseList() {
			let data = {
				// cityName: this.areaData.name,
				page: this.page,
        limit: this.limit,
        sidx: 'courseSite',
        order: 'desc',
        parentId: 2
			}
      this.$http.course.getCourseList({
				data,
        success: (res) => {
          this.totalPage = res.pages;
          console.log('res', res)
          let data = res
          this.courseData = Object.assign({}, this.courseData, data)
        },
      });
		},

    wxPay(data) {
      let that = this
      this.$http.course.payCourse({
        data: data,
        success: res => {
          //支付
          try {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: res.data.appId, //公众号名称，由商户传入
                timeStamp: res.data.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: res.data.nonceStr, //随机串
                package: res.data.package,
                signType: "MD5", //微信签名方式：
                paySign: res.data.paySign //微信签名
              },
              function(res1) {
                if (res1.err_msg == "get_brand_wcpay_request:ok") {
                  uni.showToast({
                    title: "支付成功",
                    duration: 3000
                  });
                  setTimeout(function() {
                    uni.redirectTo({
                      url: "/pages/myWallet/myWallet"
                    });
                  }, 3000);
                }
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                ZENG.msgbox._hide();
              }
            );
          } catch (err) {
            ZENG.msgbox._hide();
            that.unbind = true;
            this.$toast(JSON.stringify(err))
          }
        },
        complete: () => {
          this.unbind = true;
        }
      });
    },
		
		// goToDetail(id) {
		// 	uni.navigateTo({
    //     url: `/pages/videoDetail/index?id=${id}`,
    //   })
		// },

    goToDetail(data) {
      console.log('data', data)
      const params = {
        courseId: data.id,
        price: String(data.coursePrice),
        dealPrice: String(data.coursePrice),
        recommendUserId: '',
      }
      this.wxPay(params)
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
    this.courseData = {};
    this.getCourseList();
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
