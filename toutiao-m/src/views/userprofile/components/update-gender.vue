<template>
 <van-picker
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    :default-index="gender"
    @change="change"
  />
</template>

<script>
import { UpdateUserInfo } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    gender: {
      requested: true,
      type: Number
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.gender
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    change(vlues, index) {
      this.localGender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0

      })
      try {
        const { data } = await UpdateUserInfo({
          gender: this.localGender
        })
        console.log(data)
        this.$emit('update:gender', this.localGender)
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
