<template>
<!-- 网络错误 -->
<van-empty v-if="state===400" image="network" description="网络连接失败" />
<!-- 通用错误 -->
<van-empty v-else image="error" description="未知错误" />
</template>

<script>
export default {
  name: 'EmptyIndex',
  components: {},
  props: {},
  data () {
    return {
      state: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.state = this.$route.params.state
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
