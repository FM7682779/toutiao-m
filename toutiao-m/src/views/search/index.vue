<template>
<div class="search-container">
<!-- //搜索框 -->
<form action="/">
<van-search
  v-model="search_text"
  shape="round"
  background="#3196fa"
  show-action
  placeholder="请输入搜索关键词"
  @search="onSearch(search_text)"
  @cancel="$router.back()"
  @focus="isResultShow=false"
/>
</form>
<search-result v-if="isResultShow" :search-text="search_text"/>
<search-lx v-else-if="search_text" :search-text="search_text" @setSearchText="onSearch" />
<search-history v-else :listSearchhis="listSearchhis" @search="onSearch"/>

</div>
</template>

<script>
import searchHistory from './components/search-history'
import SearchLx from './components/search-lx'
import SearchResult from './components/search-result'
import { setStorage, getStorage } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    searchHistory, SearchLx, SearchResult
  },
  props: {},
  data () {
    return {
      search_text: '',
      isResultShow: false,
      listSearchhis: getStorage('SEARCHKEY') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch(value) {
      this.isResultShow = true
      this.search_text = value
      const index = this.listSearchhis.indexOf(value)
      if (index !== -1) {
        this.listSearchhis.splice(index, 1)
      }
      this.listSearchhis.unshift(this.search_text)
      if (this.user) {
        // 用户登录从线上获取
      } else {
        // 用户没登录从本地存储获取
        setStorage('SEARCHKEY', this.listSearchhis)
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-search__action{
    color:white;
}
.delete{
    font-size: 35px;
}

</style>
