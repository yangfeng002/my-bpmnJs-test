<template>
  <!-- 新建或者编辑流程图 -->
  <div class="myBpmn">
    <!-- 画布 -->
    <my-bpmn-canvas
      ref="processDesigner"
      v-model="xmlString"
      v-bind="controlForm"
      keyboard
      :disable="disable"
      @element-click="elementClick"
      @init-finished="initModeler"
    ></my-bpmn-canvas>
    <!-- 面板 -->
    <my-bpmn-panel
      :class="{ displayNone: disable }"
      :bpmn-modeler="modeler"
      :prefix="controlForm.prefix"
      class="process-panel"
    >
    </my-bpmn-panel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table } from 'element-ui'

import myBpmnCanvas from "./bpmn/myBpmnCanvas.vue"
import myBpmnPanel from "./bpmn/myBpmnPanel.vue"

// 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
import CustomContentPadProvider from "./bpmnJs/content-pad"
// 自定义左侧菜单（修改 默认任务 为 用户任务）
import CustomPaletteProvider from "./bpmnJs/palette"

/* 接口文件 */
import { getWorkflows, findById } from "../api/workflow.js"

Vue.use(Table)

export default {
  name: "MyBpmn",
  components: { myBpmnCanvas, myBpmnPanel },
  data() {
    return {
      modeler: null,
      xmlString: "",
      disable: false,
      controlForm: {
        processId: "",
        processName: "",
        simulation: true,
        labelEditing: false,
        prefix: "activiti",
        // additionalModel: []
        additionalModel: [CustomContentPadProvider, CustomPaletteProvider]
      }
    }
  },
  mounted() {
    if (this.$route.query.processDefinitionId) {
      this.getWorkflow(1)
    }
    if (this.$route.query.key) {
      this.getWorkflow(2)
    }
    if (this.$route.query.disable) {
      this.disable = true
    }
  },
  methods: {
    // 获取工作流
    getWorkflow(res) {
      if (res === 1) {
        getWorkflows({
          processDefinitionId: this.$route.query.processDefinitionId
        })
          .then((res) => {
            if (res.code === "0") {
              this.xmlString = res.data || ""
              this.$refs.processDesigner.createNewDiagram(this.xmlString)
              // console.log(this.xmlString)
            }
          })
          .catch(() => {
            this.$message.error("操作失败")
          })
      } else {
        findById({ processDefinitionKey: this.$route.query.key })
          .then((res) => {
            if (res.code === "0") {
              this.xmlString = res.data || ""
              this.$refs.processDesigner.createNewDiagram(this.xmlString)
              // console.log(this.xmlString)
            }
          })
          .catch(() => {
            this.$message.error("操作失败")
          })
      }
    },
    initModeler(modeler) {
      setTimeout(() => {
        this.modeler = modeler
      }, 10)
    },
    reloadProcessDesigner() {
      this.controlForm.additionalModel = []
      for (const key in this.addis) {
        if (this.addis[key]) {
          this.controlForm.additionalModel.push(this.addis[key])
        }
      }
      this.reloadIndex += 1
      this.modeler = null // 避免 panel 异常
    },
    changeLabelEditingStatus(status) {
      this.addis.labelEditing = status
        ? { labelEditingProvider: ["value", ""] }
        : false
      this.reloadProcessDesigner()
    },
    elementClick(element) {
      this.element = element
    }
  }
}
</script>
<style lang="scss">
.myBpmn {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: inline-grid;
  grid-template-columns: auto -webkit-max-content;
  grid-template-columns: auto max-content;
  .displayNone {
    display: none;
  }
  .el-table td,
  .el-table th {
    color: #333;
  }
  .el-drawer__header {
    padding: 16px 16px 8px 16px;
    margin: 0;
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    box-sizing: border-box;
    border-bottom: 1px solid #e8e8e8;
  }
  div[class^="el-drawer"]:focus,
  span:focus {
    outline: none;
  }
  .el-drawer__body {
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    overflow-y: auto;
  }

  .el-dialog {
    margin-top: 50vh !important;
    transform: translateY(-50%);
    overflow: hidden;
  }
  .el-dialog__wrapper {
    overflow: hidden;
    max-height: 100vh;
  }
  .el-dialog__header {
    padding: 16px 16px 8px 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #e8e8e8;
  }
  .el-dialog__body {
    padding: 16px;
    max-height: 80vh;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .el-dialog__footer {
    padding: 16px;
    box-sizing: border-box;
    border-top: 1px solid #e8e8e8;
  }
  .el-dialog__close {
    font-weight: 600;
  }
  .el-select {
    width: 100%;
  }
  .el-divider:not(.el-divider--horizontal) {
    margin: 0 8px;
  }
  .el-divider.el-divider--horizontal {
    margin: 16px 0;
  }
}
.el-dialog {
  .el-select {
    width: 100%;
  }
}
</style>
