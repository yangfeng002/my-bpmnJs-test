<template>
  <!-- 工作流 -->
  <div class="jfh-workflow-box">
    <!-- 新建流程图 -->
    <flow-detail v-if="!isEdit"></flow-detail>
    <!-- 编辑流程图 -->
    <flow-detail v-else :id="flowId" :key="flowKey"></flow-detail>
  </div>
</template>

<script>
/* 环境设置 */
import { setEnv } from "./config"

import FlowDetail from "./components/FlowDetail.vue"

/* 样式文件 */
import "@/assets/style/index.scss"

import "bpmn-js/dist/assets/diagram-js.css" // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

export default {
  name: "WorkFlow",
  components: {
    FlowDetail
  },
  props: {
    // 环境设置
    env: {
      type: String,
      default: "local"
    },
    isEdit: {
      // 是否为编辑
      type: Boolean,
      default: false // 默认是新建
    },
    flowKey: {
      // 编辑功能下传递 示例：Process_1660270650612
      type: String,
      default: ""
    },
    flowId: {
      // 编辑功能下传递 示例：130100
      type: String,
      default: ""
    }
  },
  watch: {
    env: {
      immediate: true,
      handler() {
        setEnv(this.env)
      }
    }
  }
}
</script>

<style>
.jfh-workflow-box{
  height: 100%;
}
</style>
