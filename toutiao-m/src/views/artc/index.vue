<template>
  <div class="artc-container">
    <van-nav-bar
      class="login-tital"
      title="文章详情"
      border="fales"
      @click-left="$router.back()"
    >
      <template #left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>

    <van-action-bar>
      <div class="pldiv">
    <van-action-bar-button
        class="button"
        text="写评论"
        @click="onClickButton"
        color="#be99ff"
      />
      </div>

      <van-action-bar-icon
        icon="comment-o"
        @click="onClickIcon"
        badge="5"
      />
      <van-action-bar-icon
        icon="star-o"
        @click="onClickIcon"
        badge="5"
      />
      <van-action-bar-icon
        icon="good-job-o"
        @click="onClickIcon"
        badge="5"
      />
    </van-action-bar>
  </div>
</template>

<script>
export default {
  name: 'ArtcIndex',
  components: {},
  props: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style scoped lang="less">
/deep/ .van-button__text {
  color: black;
}
.button {
  color: white;
  background: white !important;
  border: 1px #ebedf0 solid !important;
  width: 350px;
  height: 65px;
}
.pldiv{
  flex:1;
  text-align: center;
}
.van-action-bar-icon{
  min-width: 110px;
}
/deep/ .van-action-bar-icon__icon {
font-size: 50px;
}

</style>
