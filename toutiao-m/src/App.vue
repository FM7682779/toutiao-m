<template>
<router-view v-slot="{ Component }">
  <keep-alive :include="cachePage">
    <component :is="Component" />
  </keep-alive>
</router-view>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePage'])
  }
}
</script>

<style lang="less">

</style>
