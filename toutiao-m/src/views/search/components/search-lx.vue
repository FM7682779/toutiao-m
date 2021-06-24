<template>
 <van-cell
 v-for="(item,index) in list"
 :key='index'
  icon="search"
  @click="onClick(item)">
  <template #title>
      <span class="title"
      v-html="getHight(item,searchText)"></span>
    </template>
  </van-cell>
</template>

<script>
import { getSearchLX } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchLx',
  components: {},
  props: {
    searchText: {
      request: true,
      type: String
    }
  },
  data () {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function() {
        const { data } = await getSearchLX(this.searchText)
        console.log(data)
        this.list = data.data.options
      }, 500),
      immediate: true
    }

  },
  created () {},
  mounted () {},
  methods: {
    getHight(source, keyword) {
      const reg = new RegExp(keyword, 'gi')
      return source.replace(reg, `<span style="color: #3296fa">${keyword}</span>`)
    },
    onClick(item) {
      this.$emit('setSearchText', item)
    }
  }
}
</script>

<style scoped lang="less">
.title{
color: black;
}
</style>
