<template>
  <!-- 克隆文档 -->
  <div class="jfh__cloneDocFile-box">
     <iframe
      :src="url"
      class="iframe-file"
      frameborder="0"
      style="width: 100%;height:97vh;"
      >
    </iframe>
  </div>
</template>

<script>
// 环境变量设置
import { setEnv } from "./config"
import { fileCloneById } from './api/onlineFile'
export default {
  name: 'CloneDocFile',
  props: {
    env: {
      type: String,
      default: 'production'
    },
    fileId: { // 获取文档列表中的fileId
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    folderID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: ''
    }
  },
  watch: {
    env: {
      immediate: true,
      handler() {
        setEnv(this.env)
      }
    }
  },
  mounted() {
    fileCloneById({ fileId: this.fileId, title: this.title, folderID: this.folderID }).then(res => {
      if (res.code === '0') {
        const { url } = res.data
        this.url = url
      }
    })
  }
}
</script>

<style>

</style>
