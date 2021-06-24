<template>
  <van-list
    class="van-list"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item, index) in list" :key="index" :title="item.title" to="artc" />
  </van-list>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      request: true,
      type: String
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() { },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 搜索关键字
        })
        const result = data.data.results
        this.list.push(...result)
        // 加载状态结束
        this.loading = false
        if (result.length) {
          this.page++
        } else {
          // 数据全部加载完成
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style scoped lang="less">
.van-list{
    position: fixed;
    top: 109px;
    overflow-y: auto;
    right: 0px;
    left: 0px;
    bottom: 0px;
}
</style>
