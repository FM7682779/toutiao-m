<template>
  <div class="login-container">
    <van-nav-bar
      class="login-tital"
      title="注册/登录"
      border="fales"
      @click-left="$router.back()"
    >
      <template #left>
        <van-icon name="cross" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <van-form
      @submit="login"
      :show-error="false"
      :show-error-message="false"
      validate-first
      @failed="onFailed"
      ref="login-from"
    >
      <van-field
        v-model="user.mobile"
        left-icon="user-circle-o"
        placeholder="请输入手机号"
        :rules="rules.mb"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        left-icon="label-o"
        placeholder="请输入验证码"
        center
        :rules="rules.code"
         name="code"
      >
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="finish"
          />
          <van-button v-else size="small" type="primary" @click.prevent="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-but-warp">
        <van-button
          class="login-button"
          type="primary"
          native-type="submit"
          block
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { phonecode } from '@/api/phonecode'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      rules: {
        mb: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3 9 5 6]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /\d{6}/, message: '请输入正确的验证码' }]
      },
      time: 60 * 1000,
      isCountDownShow: false

    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async login() {
      this.isCountDownShow = false
      try {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          overlay: true,
          message: '登录中'
        })
        var { data } = await login(this.user)
        console.dir(data)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        this.$router.push('/my')
      } catch (error) {
        console.log(error)
        this.$toast.fail('登录失败')
      }
    },
    async sendCode() {
      try {
        await this.$refs['login-from'].validate('mobile')
        this.isCountDownShow = true
        this.getPhoneCode()
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    finish() {
      this.isCountDownShow = false
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
      this.$toast.fail(errorInfo.errors[0].message)
    },
    async getPhoneCode() {
      try {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          overlay: true,
          message: '获取验证码'
        })
        await phonecode(this.user.mobile)
        this.$toast.success('获取验证码成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('登录失败')
      }
    }

  }
}
</script>

<style scoped lang="less">
// .login-tital {
//   background-color: #3196fa;
//   --van-nav-bar-title-text-color: #fff;
//   --van-nav-bar-title-font-size: 17px;
//   border: none;
// }

.login-but-warp {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border: none;
}
.van-count-down {
  color: #3196fa;
  font-size: 17px;
}
</style>
