<template>
  <!-- 创建文档 -->
  <div class="jfh__createDocFile-box">
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
import { createDocFile } from './api/onlineFile'

export default {
  name: 'CreateDocFile',
  props: {
    env: {
      type: String,
      default: 'production'
    },
    title: {
      // 文件标题
      type: String,
      default: ''
    },
    type: {
      // 文档类型
      type: Number,
      default: 1
    },
    folderID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: '' // 腾讯地址
    }
  },
  watch: {
    // 环境监视
    env: {
      immediate: true,
      handler() {
        setEnv(this.env)
      }
    }
  },
  mounted() {
    // 接口调用跳转
    createDocFile({ title: this.title, type: this.type, folderID: this.folderID }).then(res => {
      if (res.code === '0') {
        const { url } = res.data
        this.url = url
        // window.open(url)
      }
    })
  }
}
</script>

<style lang="scss">
.jfh__createDoscFile-box {
  position: relative;
}
 #padAloneTitle{
    visibility: hidden !important;
    display: none !important;
  }
  .bottom-connnect-us{
    display: none !important;
  }
</style>
