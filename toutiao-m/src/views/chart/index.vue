<template>
  <div class="chart-container">
    <van-nav-bar
      class="login-tital"
      title="小智同学"
      border="fales"
      @click-left="$router.back()"
    >
      <template #left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>

    <van-cell-group class="cell-warp">
      <van-cell
        v-for="(item, index) in filterArr"
        :key="index"
        :title="item.message"
        center
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #defult>
          <van-image
            class="avter"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
                        fit="cover"
          />
        </template>
      </van-cell>

      <van-cell
        v-for="(item1, index) in filterArr1"
        :key="index"
        center
        title=""
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon >
        <p class="zi">{{item1.message}}</p>
          <van-image
            class="avter"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            fit="fill"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="field-warp">
      <van-field v-model="message" placeholder="请输入" />
      <van-button class="button" type="success" mini @click="sbmit"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client'
// import { setStorage } from '@/utils/storage'
export default {
  name: 'ChartIndex',
  components: {},
  props: {},
  data() {
    return {
      socket: null,
      chartList: [],
      message: ''
    }
  },
  computed: {
    filterArr() {
      return this.chartList.filter(item => item.isme)
    },
    filterArr1() {
      console.log(this.chartList)
      return this.chartList.filter(item => !item.isme)
    }
  },
  watch: {},
  created() {
    // const socket = io('https://ttapi.research.itcast.cn')
    // this.socket = socket
    // // 当客户端与服务器建立连接成功，触发 connect 事件
    // socket.on('connect', () => {
    //   console.log('建立连接成功！')
    // })
    // // 监听接收服务端消息
    // socket.on('message', data => {
    //   console.log('收到服务器消息：', data)
    // })
  },
  mounted() { },
  methods: {
    sbmit() {
      //   // 发送消息
      //   this.socket.emit('message', {
      //     msg: this.message,
      //     timestamp: Date.now()
      //   })
      const myMessage = {
        isme: false,
        message: this.message
      }
      this.chartList.push(myMessage)
    }
  }
}
</script>

<style scoped lang="less">
.field-warp {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  .button {
    width: 150px;
  }
}
.cell-warp {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 92px;
  bottom: 88px;
  overflow-y: auto;
  background-color: #ededed;
}

.avter {
  width: 60px;
  height: 60px;
  border: 1px solid gray;
}
.zi{
    margin-left: 20px;
    word-break:break-all;
    width: 600px;
    text-align: end;
    padding-right: 10px;
}
</style>
