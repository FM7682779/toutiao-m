<template>
  <div class="userprofile-container">
    <van-nav-bar
      class="login-tital"
      title="个人信息"
      border="fales"
      @click-left="$router.back()"
    >
      <template #left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>

    <van-cell title="头像" is-link center @click="selectPic">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isEditBirthdayShow = true"
    />
    <van-popup
      v-if="isEditNameShow"
      v-model:show="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @close="isEditNameShow = fales"
        v-model:locaName="userInfo.name"
      />
    </van-popup>

    <van-popup
      v-if="isEditGenderShow"
      v-model:show="isEditGenderShow"
      position="bottom"
    >
      <update-gender
        v-model:gender="userInfo.gender"
        @close="isEditGenderShow = fales"
      />
    </van-popup>

    <van-popup
      v-if="isEditBirthdayShow"
      v-model:show="isEditBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-model:birthday="userInfo.birthday"
        @close="isEditBirthdayShow = fales"
      />
    </van-popup>
    <input
      type="file"
      ref="imgSelect"
      accept="image/*"
      @change="fileChange"
      hidden
    />

    <van-popup
    class="popup1"
      v-if="isEditAverShow"
      v-model:show="isEditAverShow"
      :style="{ height: '100%' ,width: '100%' }"
       position="bottom"
    >
      <update-avter
      @close="isEditAverShow = fales"
      :file="file"
      @updata="userInfo.photo=$event"
       />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdateAvter from './components/update-avter.vue'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvter
  },
  props: {},
  data() {
    return {
      isEditNameShow: false,
      userInfo: {},
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditAverShow: false,
      file: ''

    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUser()
  },
  mounted() { },
  methods: {
    async getUser() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
        this.userInfo.birthday = '2020-6-5'
      } catch (error) {

      }
    },
    selectPic() {
      this.$refs.imgSelect.click()
    },
    fileChange() {
    //  this.userInfo.photo = window.URL.createObjectURL(this.$refs.imgSelect.files[0])
      this.file = this.$refs.imgSelect.files[0]
      this.$refs.imgSelect.value = ''
      this.isEditAverShow = true
    }

  }
}
</script>

<style scoped lang="less">
/deep/ .van-popup {
  background-color: #f5f7f9;
}
/deep/ .popup1{
    background-color: #000;

}

</style
>
