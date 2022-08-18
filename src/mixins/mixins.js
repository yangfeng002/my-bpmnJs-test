// 引入流程图样式
/* 样式文件 */
import "../assets/style/index.scss"

// 流程图样式
import "bpmn-js/dist/assets/diagram-js.css" // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

// 环境变量设置
import { setEnv } from "../config"

export const mixins = {
  props: {
    // 环境设置
    env: {
      type: String,
      default: "production"
    },
    disable: { // 流程图是否可编辑
      type: Boolean,
      default: false
    },
    handleType: {
      // 查看、创建编辑
      type: String,
      default: 'create' // 默认是新建 create 创建 | edit 编辑 | show 查看
    },
    flowKey: {
      // 编辑功能下传递 示例：Process_1660270650612
      type: String,
      default: ""
    },
    flowId: { // 编辑功能 传递flowId
      type: String,
      default: ''
    },
    processDefinitionId: { // 查看流程图id
      type: String,
      default: ''
    },
    saveFlowsCallback: { // 保存流程图回调
      type: Function
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
    // 查看流程图
    if (this.processDefinitionId && this.handleType === 'show') {
      this.getWorkflow(1)
    }
    // 编辑流程图
    if (this.flowKey && this.handleType === 'edit') {
      this.getWorkflow(2)
    }
  }
}
