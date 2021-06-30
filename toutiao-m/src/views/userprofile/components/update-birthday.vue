<template>
<van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="confirm"
  @cancel="$emit('close')"
/>
</template>

<script>
import { UpdateUserInfo } from '@/api/user'
export default {
  name: 'QaIndex',
  components: {},
  props: {
    birthday: {
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.birthday)
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async  confirm(value) {
      try {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          duration: 0

        })
        const date = this.$filters.format(value)
        await UpdateUserInfo({
          birthday: date
        })
        this.$emit('update:birthday', date)
        this.$emit('close')
        console.log(date)
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
