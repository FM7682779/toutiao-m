<template>
  <van-field center
  class="field"
    v-model="message"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  >
    <template #extra>
        <van-button
         class="anniu"
         @click="onPost"
         :disabled="!message"
         >
        发布
        </van-button>
        </template>

  </van-field>
</template>

<script>
import { addComment } from '@/api/art'
export default {
  name: 'popup',
  components: {},
  props: {
    articleId: {
      request: true,
      type: [Object, String, Number]
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发表中...',
        forbidClick: true
      })
      try {
        const { data } = await addComment({
          target: this.articleId.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message,
          art_id: this.articleId ? null : this.articleId.toString()// 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        this.$emit('publish', data.data.new_obj)
        this.$toast.success('发表成功')
        this.message = ''
      } catch (error) {
        console.log(error)
        this.$toast.fail('发表失败，检测网络')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-field__value{
        background-color: azure;
        padding: 15px;
        margin-right: 20px;
}
.anniu{
    display: flex;
    align-items: center;
    justify-content: center;
}

/deep/ .van-button--default{
  border: 0px white;
}
</style>
