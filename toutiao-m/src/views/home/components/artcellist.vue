<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      class="art-list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
<artcs :artcellist="artcellist"/>
    </van-list>
    </van-pull-refresh>
</template>

<script>
import { getArts } from '@/api/art'
import Artcs from '@/components/atics.vue'
export default {
  name: 'ArtcelList',
  components: {
    Artcs
  },
  props: {
    channel: {
      request: true,
      type: Object
    }
  },
  data() {
    return {
      artcellist: [],
      loading: false,
      finished: false,
      timestamp: null,
      refreshing: false
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArts(
          {
            channel_id: this.channel.id, // 频道 ID
            timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
            with_top: 1 // 是否包含置顶，进入页面第

          }
        )
        this.artcellist.push(...data.data.results)
        this.loading = false
        const a = data.data.results
        if (a.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {

      }
    },
    async onRefresh() {
      try {
        const { data } = await getArts(
          {
            channel_id: this.channel.id, // 频道 ID
            timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
            with_top: 1 // 是否包含置顶，进入页面第

          }
        )
        this.artcellist.unshift(...data.data.results)
        this.refreshing = false
      } catch (error) {

      }
    }

  }
}
</script>

<style scoped lang="less">

</style>
