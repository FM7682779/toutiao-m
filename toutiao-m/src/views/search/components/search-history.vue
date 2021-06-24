<template>
  <van-cell title="历史记录">
    <div v-if="delButtonClick">
      <span @click="removeall">全部删除</span>
      &nbsp;&nbsp;
      <span @click="delButtonClick=!delButtonClick">完成</span>
    </div>
    <van-icon v-else class="delete" name="delete-o" @click="delButtonClick=true" />
  </van-cell>
  <van-cell v-for="(item, index) in listSearchhis1" :key="index"
  :title="item"
  @click="close(index,item)"
  >
    <van-icon v-show="delButtonClick" name="close"/>
  </van-cell>
</template>

<script>
import { setStorage } from '@/utils/storage'

export default {
  name: 'SearchHistory',
  components: {},
  props: {
    listSearchhis: {
      request: true,
      type: Array
    }
  },
  data() {
    return {
      listSearchhis1: this.listSearchhis,
      delButtonClick: false
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    close(index, item) {
      if (this.delButtonClick) {
        this.listSearchhis1.splice(index, 1)
        setStorage('SEARCHKEY', this.listSearchhis1)
        return
      }
      this.$emit('search', item)
    },
    removeall() {
      this.listSearchhis1 = []
      setStorage('SEARCHKEY', this.listSearchhis1)
    }

  }
}
</script>

<style scoped lang="less">
.van-icon {
  font-size: 35px;
}
</style>
