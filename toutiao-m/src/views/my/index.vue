<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="user-heard">
      <van-cell :title="userInfo.name" center class="my-info" :border="false">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-image
            class="user-image"
            :src="userInfo.photo"
            fit="fill"
            round
          />
        </template>
        <template #right-icon>
          <van-button
          plain
          type="default"
          round size="mini"
          class="user-button"
          to="userprofile"
            >编辑资料</van-button
          >
        </template>
      </van-cell>
      <van-cell class="user-grid">
        <van-grid :border="false">
          <van-grid-item>
            <div>{{userInfo.art_count}}</div>
            <div>头条</div>
          </van-grid-item>
          <van-grid-item>
            <div>{{userInfo.follow_count}}</div>
            <div>关注</div>
          </van-grid-item>
          <van-grid-item>
            <div>{{userInfo.fans_count}}</div>
            <div>粉丝</div>
          </van-grid-item>
          <van-grid-item>
            <div>{{userInfo.like_count}}</div>
            <div>获赞</div>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>
    <div v-else class="not-login">
        <img class="mobimag" src="./shouji.png" @click="$router.push('/login')"/>
      <div class="text">登录/注册</div>
    </div>

    <van-grid :column-num="2" class="grid-wap">
      <van-grid-item icon="photo-o" text="文字" class="grid-item" />
      <van-grid-item icon="photo-o" text="文字" class="grid-item" />
    </van-grid>
    <van-cell title="小智同学" is-link to="chart" class="xiaozhi" />
    <van-cell v-if="user" center title="退出登录" class="login-out" @click="loginOut" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadUserInfo()
  },
  mounted() { },
  methods: {
    async loadUserInfo() {
      try {
        const { data } = await userInfo()
        this.userInfo = data.data
      } catch (error) {

      }
    },
    loginOut() {
      this.$dialog.confirm({
        title: '退出',
        message: '确认退出'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }

  }
}
</script>

<style scoped lang="less">
.my-info {
  padding-top: 50px;
  font-size: 30px;
  color: #fff;
}
.van-cell {
  background-color: unset;
}
/deep/ .van-grid-item__content {
  background-color: unset;
  padding-top: 15px;
  padding-bottom: 20px;
}
.user-heard {
  background: url("./banner.png");
}
.grid-wap {
  width: 100%;
  background: white;
}
.login-out {
  text-align: center;
  background: white;
      margin-top: 10px;

}
.user-image {
  box-sizing: border-box;
  margin-right: 30px;
  margin-left: 10px;
  width: 66px;
  height: 66px;
  border: white 1px solid;
}
.user-button {
  margin-right: 10px;
}
.user-grid {
  padding-top: 0px;
  padding-bottom: 0px;
}
/deep/ .van-cell__value--alone {
  font-size: 23px;
  color: #fff;
}
.grid-item {
  font-size: 20px;
}
/deep/ .van-grid-item__icon + .van-grid-item__text {
  margin-top: 0px;
}
.xiaozhi {
  background: white;
    margin-top: 10px;

}
.not-login{
width: 100%;
height: 222px;
background: url("./banner.png") no-repeat;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
.mobimag{
  height: 66px;
  width: 66px;
}
.text{
color:#fff;
font-size: 13px;
}
}
</style>
