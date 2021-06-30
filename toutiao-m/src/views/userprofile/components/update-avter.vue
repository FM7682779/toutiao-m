<template>
<div class="image-warp">
    <img
    class="imag"
    :src="image"
    ref="image"/>
</div>
    <van-nav-bar
    class="action"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('close')"
    @click-right="onClickRight"
/>
</template>

<script>
import { UpdateAvter } from '@/api/user'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'QaIndex',
  components: {},
  props: {
    file: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      myCropper: null,
      afterImg: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    async  onClickRight() {
      try {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          duration: 0

        })
        const file = await this.sureSava()
        const f = new FormData()
        f.append('photo', file)
        await UpdateAvter(f)
        this.$emit('updata', window.URL.createObjectURL(file))
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (error) {
        console.log(error)
        this.$toast.fail('修改失败')
      }
    },
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    },
    sureSava() {
      return new Promise(resolve => {
        this.myCropper.getCroppedCanvas({
          imageSmoothingQuality: 'high'
        }).toBlob((blob) => {
          resolve(blob)
        })
        console.log('图片' + this.afterImg)
      })
    }

  }
}
</script>

<style scoped lang="less">
.action{
    position:fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: black;
}
.image-warp{
  height: 100%;
  .imag{
    display: block;
    max-width: 100%;
  }
}

</style>
