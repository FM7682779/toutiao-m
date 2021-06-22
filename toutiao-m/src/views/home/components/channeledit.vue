<template>
  <div class="channeledit-container">
    <van-cell center :border="false">
      <template #title>
        <span>我的频道</span>
        <span class="desc">点击进入频道</span>
      </template>
      <van-button
        round
        size="mini"
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ !isEdit ? "编辑" : "完成" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channelitem, index) in userChannel"
        :class="{ ac: index === tag }"
        :key="channelitem.id"
        :icon="isEdit && index != 0 ? 'clear' : ''"
        :text="channelitem.name"
        @click="delet(index)"
      />
    </van-grid>

    <van-cell class="tuijian" title="频道推荐" center :border="false">
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel1 in getChannel1"
        :key="channel1.id"
        :text="channel1.name"
        @click="add(channel1)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel } from '@/api/art'
import { mapState } from 'vuex'
import { setStorage } from '@/utils/storage.js'
import { USER_CHANNEL } from '@/utils/constdata.js'
export default {
  name: 'ChannelEdit',
  components: {
  },
  props: {
    channel: {
      request: true,
      type: Array
    },
    tag: {
      request: true,
      type: Number

    }
  },
  data() {
    return {
      allChannel: [],
      userChannel: this.channel,
      isEdit: false,
      tagtada: this.tag
    }
  },
  computed: {
    ...mapState(['user']),
    getChannel1() {
      return this.allChannel.filter((channe) => {
        return !this.userChannel.find((userchannel) => {
          return userchannel.id === channe.id
        })
      })
    }
  },
  watch: {},
  created() {
    this.getChannel()
  },
  mounted() {
  },
  methods: {
    async getChannel() {
      try {
        const { data } = await getAllChannels()
        this.allChannel = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    async add(channel) {
      this.userChannel.push(channel)
      console.log(this.user)
      if (this.user) {
        // 登陆了
        try {
          await addUserChannel([{
            id: channel.id, // 频道 id
            seq: this.userChannel.length // 频道的 序号
          }])
        } catch (error) {
          this.$toast('添加频道失败')
        }
      } else {
        // 未登陆了
        setStorage(USER_CHANNEL, this.userChannel)
      }
    },
    delet(index) {
      if (this.isEdit) {
        if (index <= this.tag) {
          this.$emit('updateindex', (this.tag - 1))
        }
        this.userChannel.splice(index, 1)
      } else {
        this.$emit('close', index)
        this.$emit('updateindex', index)
      }
    }
  }

}
</script>

<style scoped lang="less">
.channeledit-container {
  margin-top: 108px;
}
.desc {
  margin-left: 20px;
  color: gray;
  font-size: 10px;
}
.van-button--mini {
  height: auto;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
}
.tuijian {
  margin-top: 20px;
}
/deep/ .van-grid-item__content {
  background-color: lavender;
}
/deep/ .van-grid-item__text {
  line-height: 0.5;
  margin-top: 0px;
}
/deep/ .van-icon {
  position: absolute;
  top: -6px;
  right: -7px;
  font-size: 25px;
  color: #ccc;
}
.ac {
  /deep/ .van-grid-item__text {
    color: red;
  }
}
</style>
