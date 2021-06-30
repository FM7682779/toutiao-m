<template>
  <div class="update-name">
    <van-nav-bar
      title="名称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onsbmit"
    />
    <div class="edit-warp">
      <van-field
        class="name-edit"
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { UpdateUserInfo } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    locaName: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      message: this.locaName
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() { },
  methods: {
    async onsbmit() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0

      })
      try {
        const { data } = await UpdateUserInfo({
          name: this.message
        })
        console.log(data)
        this.$toast.success('修改成功')
        this.$emit('close')
        this.$emit('update:locaName', this.message)
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }

  }
}
</script>

<style scoped lang="less">
.edit-warp {
  padding: 20px;
}
</style>
