<template>
<van-cell v-for="item in artcellist" :key="item.id" :title="item.title">
        <template #label >
          <div >
            <van-grid v-if="item.cover.type>1" :border="false" :column-num="item.cover.type">
              <van-grid-item
                v-for="(image, index) in item.cover.images"
                :key="index"
              >
                <van-image class="im-v" fit="cover" :src="image" />
              </van-grid-item>
            </van-grid>
            <div>
              <span v-if="item.cover.type==1" class="span">
                {{ item.aut_name }}
                {{ item.comm_count }}
                {{  $filters.relativeTime(item.pubdate) }}
              </span>
              <span v-else>
                {{ item.aut_name }}
                {{ item.comm_count }}
                {{  $filters.relativeTime(item.pubdate) }}
              </span>
            </div>
          </div>
        </template>
        <template #extra v-if="item.cover.type==1">
          <div>
            <van-image
              class="im-v"
              fit="cover"
              :src="item.cover.images[0]"
            />
          </div>
        </template>
      </van-cell>
</template>

<script>
export default {
  name: 'Artcs',
  components: {},
  props: {
    artcellist: {
      request: true,
      type: Object
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.im-v {
  width: 200px;
  height: 150px;
  border: 1px solid grey;
}
/deep/ .van-grid-item__content {
  --van-grid-item-content-padding: 10px;
}
.a{
  margin-top: 50px;
}
.span{
    position: absolute;
    margin-top: 50px;
}
</style>
