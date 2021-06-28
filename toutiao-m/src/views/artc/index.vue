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

    <van-skeleton title :row="3" :loading="loading">
      <div class="list-warp">
        <div class="tatil">
          {{ artcel.title }}
        </div>
        <van-cell
          class="cell"
          center
          :title="artcel.aut_name"
          :label="$filters.relativeTime(artcel.pubdate)"
        >
          <template #icon>
            <van-image
              class="avter"
              round
              fit="cover"
              :src="artcel.aut_photo"
            />
          </template>
          <template #right-icon>
            <van-button
              class="button1"
              @click="onFlow"
              :type="artcel.is_followed ? 'default' : 'primary'"
              :icon="artcel.is_followed ? '' : 'plus'"
              round
              :loading="isLoding"
            >
              {{ artcel.is_followed ? "已关注" : "关注" }}
            </van-button>
          </template>
        </van-cell>
        <div
          ref="archtml"
          class="content markdown-body"
          v-html="artcel.content"
        ></div>
        <div class="desc">全部评论</div>
        <comment-list
        :articleId="artcid"
        :articleComment1="commentlist"
        @commnetcount="commnetcount"
        />
      </div>
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
         :badge="commnetCount" />
        <van-action-bar-icon
          :icon="artcel.is_collected ? 'star' : 'star-o'"
          :color="artcel.is_collected ? '#ee0a24' : ''"
          @click="oncolect"
        />
        <van-action-bar-icon icon="good-job-o"
         @click="onClickIcon"
         badge="5" />
      </van-action-bar>
    </van-skeleton>
    <van-popup
      v-model:show="show"
      round
      position="bottom"
    >
    <popup-content
    :articleId="artcid"
    @publish="publish"
    />
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  deleteCollect
}
  from '@/api/art'
import { ImagePreview } from 'vant'
import './makedown.css'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'
import PopupContent from './components/popup-content'
export default {
  name: 'ArtcIndex',
  components: {
    CommentList,
    PopupContent

  },
  props: {
    artcid: {
      type: [String, Number, Object],
      request: true
    }
  },
  data() {
    return {
      artcel: '',
      imgIndex: 0,
      loading: true,
      isLoding: false,
      show: false,
      commentlist: [],
      commnetCount: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getContent()
  },
  mounted() { },
  methods: {
    async getContent() {
      try {
        const { data } = await getArticleById(this.artcid)
        this.loading = false
        this.artcel = data.data
        this.$nextTick(() => {
          this.showPic()
        })
      } catch (error) {

      }
    },
    showPic() {
      const artContent = this.$refs.archtml
      const imgs = artContent.querySelectorAll('img')
      const images1 = []
      imgs.forEach((img, index1) => {
        images1.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: images1,
            startPosition: index1
          })
        }
      })
    },
    async onFlow() {
      const authorId = this.artcel.aut_id
      this.isLoding = true
      try {
        if (this.artcel.is_followed) {
          await deleteFollow(authorId)
        } else {
          await addFollow(authorId)
        }
        this.artcel.is_followed = !this.artcel.is_followed
      } catch (error) {
        this.$toast('操作失败')
      }
      this.isLoding = false
    },
    async oncolect() {
      this.$toast.loading({
        message: `${this.artcel.is_collected ? '取消' : ''}收藏中...`,
        forbidClick: true
      })
      try {
        if (this.artcel.is_collected) {
          await deleteCollect(this.artcid)
        } else {
          await addCollect(this.artcid)
        }
        this.artcel.is_collected = !this.artcel.is_collected
      } catch (error) {
        this.$toast('操作失败')
      }
      this.$toast.success(`${this.artcel.is_collected ? '' : '取消'}收藏成功`)
    },
    onClickButton() {
      this.show = true
    },
    publish(value) {
      this.commentlist.unshift(value)
      this.show = false
    },
    commnetcount(value) {
      this.commnetCount = value
    }
  }
}
</script>

<style scoped lang="less">
.button {
  color: white;
  background: white !important;
  border: 1px #ebedf0 solid !important;
  width: 350px;
  height: 65px;
  /deep/ .van-button__text {
    color: black;
  }
}
.pldiv {
  flex: 1;
  text-align: center;
}
.van-action-bar-icon {
  min-width: 110px;
}
/deep/ .van-action-bar-icon__icon {
  font-size: 50px;
}

.tatil {
  color: #333333;
  font-size: 38px;
  background-color: #fff;
  padding: 28px;
  font-weight: bold;
  vertical-align: inherit;
}
.button1 {
  width: 200px;
  height: 60px;
  /deep/ .van-button__text {
    font-size: 28px;
  }
}
.cell {
  padding: 28px;
  line-height: 30px;
}
.avter {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}
/deep/ .van-cell__label {
  margin-top: 0px;
}
.content {
  background-color: #fff;
  padding: 28px;
}
.list-warp {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 92px;
  bottom: 100px;
  overflow-y: auto;
}
.desc {
  font-size: 30px;
  background-color: #fff;
  padding-left: 20px;
  padding-bottom: 20px;
}
</style>
