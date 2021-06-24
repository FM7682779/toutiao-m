<template>
  <div class="home-container">
    <van-nav-bar class="home-tital">
      <template #title>
        <van-button class="search" round icon="search" to="search"> 搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs class="tabs" v-model:active="active">
      <van-tab :key="chanel.id" v-for="chanel in chanelData">
        <template #title>
          <span>{{ chanel.name }}</span>
        </template>
        <div class="artlist-warp">
          <artcel-list :channel="chanel" :tag="active" />
        </div>
      </van-tab>
      <template #nav-right @click="showDialog">
        <div class="t-nav" @click="showDialog">
          <van-icon name="wap-nav" @click="showDialog"/>
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
       round
      style="height: 100%"
      :overlay="false"
    >
    <template #default>
      <channel-edit :channel="chanelData"
       @close="show=false"
       @updateindex="active=$event"
      :tag="active"/>

    </template>

    </van-popup>
  </div>
</template>

<script>
import { getArt } from '@/api/art'
import ArtcelList from './components/artcellist.vue'
import ChannelEdit from './components/channeledit.vue'
import { mapState } from 'vuex'
import { getStorage } from '@/utils/storage.js'
import { USER_CHANNEL } from '@/utils/constdata.js'

export default {
  name: 'HomeIndex',
  components: {
    ArtcelList, ChannelEdit
  },
  props: {},
  data() {
    return {
      chanelData: [],
      show: false,
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.getArtData()
  },
  mounted() { },
  methods: {
    async getArtData() {
      if (this.user) {
        try {
          const { data } = await getArt()
          this.chanelData = data.data.channels
          console.dir(this.chanelData)
        } catch (error) {

        }
      } else {
        const channels = getStorage(USER_CHANNEL)
        if (channels) {
          this.chanelData = channels
        } else {
          const { data } = await getArt()
          this.chanelData = data.data.channels
        }
      }
    },
    showDialog() {
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
.home-tital {
  background-color: #3196fa;
}
/deep/ .van-nav-bar__title {
  max-width: none;
}

.search {
  width: 500px;
  height: 60px;
  background: #5babfb;
  border: none;
  color: #fff;
}
/deep/ .van-tabs__line {
  background-color: #3196fa;
  height: 1px;
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
}
.artlist-warp {
  position: fixed;
  left: 0;
  right: 0;
  top: 180px;
  bottom: 100px;
  overflow-y: auto;
}
.t-nav {
  position: fixed;
  right: 0px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0.9;
  width: 66px;
  .van-icon {
    font-size: 45px;
  }
  &:before {
    content: "|";
    position: absolute;
    left: -3px;
  }
}
</style>
