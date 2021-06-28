<template>
  <div class="commentlist-container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in articleComment"
      :key="item.com_id"
      :title="item.aut_name">
        <template #icon>
          <van-image
            class="avter"
            round
            fit="cover"
            :src="item.aut_photo"
          />
        </template>

        <template #label>
          <div class="wz">
            <div class="xx">{{item.content}}</div>
            <div class="huifu-warp">
              <span class="a">{{$filters.relativeTime(item.pubdate)}}</span>
              <van-button class="huifu">{{`回复${item.reply_count}`}}</van-button>
            </div>
          </div>
        </template>

        <template #right-icon>
          <div>
            <van-icon
            :class="{like :!item.is_likeing}"
            name="good-job-o"
            />
            <span>{{item.like_count}}</span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/art'
export default {
  name: 'CommentList',
  components: {},
  props: {
    articleId: {
      request: true,
      type: [Object, Number, String]
    },
    articleComment1: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      articleComment: this.articleComment1,
      loading: false,
      finished: false,
      offset: null,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.onLoad()
  },
  mounted() { },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.articleId, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 每页大小
        })
        const comment = data.data.results
        if (comment.length > 0) {
          this.$emit('commnetcount', data.data.total_count)
          this.articleComment.push(...comment)
          // 加载状态结束
          this.offset = data.data.last_id
          this.loading = false
        } else {
          this.finished = true
        }
        console.log(data)
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.huifu {
  height: 50px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 20px;
}
.huifu-warp {
  display: flex;
  align-items: center;
}

/deep/ .van-cell__title {
  padding-left: 35px;
  color:#466b9d;
}

.xx {
  margin-top: 15px;
  margin-bottom: 15px;
  color: #000;
  font-size: 30px;
  word-break: break-all;
}
.avter{
 width:80px;
 height: 80px;
 }
 .like{
   color:red;
 }
</style>
