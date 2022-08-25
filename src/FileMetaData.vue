<template>
  <!-- 创建文档 -->
  <div class="jfh__fileMetaData-box">
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
import { setEnv } from "./config"
import { queryFileMetadataById } from './api/onlineFile'

export default {
  name: 'FileMetaData',
  props: {
    env: {
      type: String,
      default: 'production'
    },
    fileId: {
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
      handler(val) {
        setEnv(this.env)
      }
    }
  },
  mounted() {
    queryFileMetadataById({ fileId: this.fileId }).then(res => {
      if (res.code === '0') {
        const { url } = res.data
        this.url = url
        // window.open(url)
      }
    })
  }
}
</script>

<style>

</style>
