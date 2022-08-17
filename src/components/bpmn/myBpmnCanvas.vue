<template>
  <div class="myBpmnCanvas">
    <div class="myBpmnCanvas-header">
      <el-button-group key="file-control">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-folder-opened"
          :class="{displayNone: disable}"
          @click="$refs.refFile.click()"
          >打开文件</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-download"
          @click="downloadProcessAsBpmn()"
          >下载文件</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-download"
          :class="{displayNone: disable}"
          @click="saveBpmn()"
          >保存文件</el-button
        >
      </el-button-group>
    </div>
    <div class="myBpmnCanvas-container">
      <div ref="bpmn-canvas" class="myBpmnCanvas-canvas"></div>
    </div>
    <!-- 用于打开本地文件-->
    <input
      id="files"
      ref="refFile"
      type="file"
      style="display: none"
      accept=".bpmn"
      @change="importLocalFile"
    />
  </div>
</template>
<script>
import Vue from 'vue'

import PubSub from 'pubsub-js' // 消息订阅引入

// 引入bpmn模块
import BpmnModeler from "bpmn-js/lib/Modeler"

import DefaultEmptyXML from "../bpmnJs/defaultEmpty"
// 中文汉化
import translations from "../bpmnJs/translate/translations"
// 翻译方法
import customTranslate from "../bpmnJs/translate/customTranslate"
// 模拟流转流程
import tokenSimulation from "bpmn-js-token-simulation"
// 标签解析 Extension
import camundaModdleExtension from "../bpmnJs/extension-moddle/camunda"
import activitiModdleExtension from "../bpmnJs/extension-moddle/activiti"
import flowableModdleExtension from "../bpmnJs/extension-moddle/flowable"
// 标签解析 Moddle
import camundaModdleDescriptor from "../bpmnJs/descriptor/camundaDescriptor.json"
import activitiModdleDescriptor from "../bpmnJs/descriptor/activitiDescriptor.json"
import flowableModdleDescriptor from "../bpmnJs/descriptor/flowableDescriptor.json"

/* 引入element ui 模块 */
import { ButtonGroup, Button, Message } from 'element-ui'

// import { saveWorkflows } from '../../api/workflow'

Vue.use(ButtonGroup)
Vue.use(Button)
Vue.prototype.$message = Message

export default {
  name: "MyBpmnCanvas",
  props: {
    value: String, // xml 字符串
    disable: {
      type: Boolean,
      default: false
    },
    flowId: String, // 流程id
    processId: String,
    processName: String,
    // translations: Object, // 自定义的翻译文件
    additionalModel: [Object, Array], // 自定义model
    moddleExtension: Object, // 自定义moddle
    onlyCustomizeAddi: {
      type: Boolean,
      default: false
    },
    onlyCustomizeModdle: {
      type: Boolean,
      default: false
    },
    simulation: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: String,
      default: "camunda"
    },
    events: {
      type: Array,
      default: () => ["element.click"]
    }
  },
  data() {
    return {
      translations: translations // 翻译文件
    }
  },
  computed: {
    // 自定义的附加模块
    additionalModules() {
      const Modules = []
      // 仅保留用户自定义扩展模块
      if (this.onlyCustomizeAddi) {
        if (
          Object.prototype.toString.call(this.additionalModel) ===
          "[object Array]"
        ) {
          return this.additionalModel || []
        }
        return [this.additionalModel]
      }

      // 插入用户自定义扩展模块
      if (
        Object.prototype.toString.call(this.additionalModel) ===
        "[object Array]"
      ) {
        Modules.push(...this.additionalModel)
      } else {
        this.additionalModel && Modules.push(this.additionalModel)
      }

      // 翻译模块
      const TranslateModule = {
        translate: ["value", customTranslate(this.translations)]
      }
      Modules.push(TranslateModule)

      // 模拟流转模块
      if (this.simulation) {
        Modules.push(tokenSimulation)
      }

      // 根据需要的流程类型设置扩展元素构建模块
      if (this.prefix === "camunda") {
        Modules.push(camundaModdleExtension)
      }
      if (this.prefix === "flowable") {
        Modules.push(flowableModdleExtension)
      }
      if (this.prefix === "activiti") {
        Modules.push(activitiModdleExtension)
      }

      return Modules
    },
    // 自定义的扩展模块
    moddleExtensions() {
      const Extensions = {}
      // 仅使用用户自定义模块
      if (this.onlyCustomizeModdle) {
        return this.moddleExtension || null
      }

      // 插入用户自定义模块
      if (this.moddleExtension) {
        for (const key in this.moddleExtension) {
          Extensions[key] = this.moddleExtension[key]
        }
      }

      // 根据需要的 "流程类型" 设置 对应的解析文件
      if (this.prefix === "activiti") {
        Extensions.activiti = activitiModdleDescriptor
      }
      if (this.prefix === "flowable") {
        Extensions.flowable = flowableModdleDescriptor
      }
      if (this.prefix === "camunda") {
        Extensions.camunda = camundaModdleDescriptor
      }

      return Extensions
    }
  },
  mounted() {
    this.initBpmnModeler()
    if (!this.value) {
      this.createNewDiagram(this.value)
    }
  },
  methods: {
    // 初始化bpmn
    initBpmnModeler() {
      if (this.bpmnModeler) return
      this.bpmnModeler = new BpmnModeler({
        container: this.$refs["bpmn-canvas"],
        keyboard: this.keyboard ? { bindTo: document } : null,
        additionalModules: this.additionalModules,
        moddleExtensions: this.moddleExtensions
      })
      this.$emit("init-finished", this.bpmnModeler)
      this.initModelListeners()
    },
    initModelListeners() {
      const EventBus = this.bpmnModeler.get("eventBus")
      const that = this
      // 注册需要的监听事件, 会将 events 数组内部的事件名称中的 . 替换成 - 来适配 vue 的自定义监听事件, 避免解析异常
      this.events.forEach((event) => {
        EventBus.on(event, function (eventObj) {
          const eventName = event.replace(/\./g, "-")
          const element = eventObj ? eventObj.element : null
          that.$emit(eventName, element, eventObj)
        })
      })
      // 监听图形改变返回xml
      EventBus.on("commandStack.changed", async (event) => {
        try {
          this.recoverable = this.bpmnModeler.get("commandStack").canRedo()
          this.revocable = this.bpmnModeler.get("commandStack").canUndo()
          const { xml } = await this.bpmnModeler.saveXML({ format: true })
          this.$emit("commandStack-changed", event)
          this.$emit("input", xml)
          this.$emit("change", xml)
        } catch (e) {
          console.error(`[Process Designer Warn]: ${e.message || e}`)
        }
      })
      // 监听视图缩放变化
      this.bpmnModeler.on("canvas.viewbox.changed", ({ viewbox }) => {
        this.$emit("canvas-viewbox-changed", { viewbox })
        const { scale } = viewbox
        this.defaultZoom = Math.floor(scale * 100) / 100
      })
    },
    /* 创建新的流程图 */
    // 不初始化创建流程图页面无法画图
    async createNewDiagram(xml) {
      // 将字符串转换成图显示出来
      const newId = this.processId || `Process_${new Date().getTime()}`
      const newName = this.processName || `业务流程_${new Date().getTime()}`
      const xmlString = xml || DefaultEmptyXML(newId, newName, this.prefix)
      try {
        const { warnings } = await this.bpmnModeler.importXML(xmlString)
        if (warnings && warnings.length) {
          warnings.forEach((warn) => console.warn(warn))
        }
      } catch (e) {
        console.error(`[Process Designer Warn]: ${e.message || e}`)
      }
    },
    // 下载
    downloadProcessAsBpmn() {
      this.downloadProcess("bpmn")
    },
    // 保存
    async saveBpmn() {
      const deployXml = await this.bpmnModeler.saveXML()
      console.log(deployXml.xml)
      const obj = { deployXml: deployXml.xml }
      if (this.flowId) {
        obj.modelId = this.flowId
      }
      PubSub.publish('saveWorkFlows', obj) // 发布消息
    },
    // 下载流程图到本地（xml，bpmn，svg）
    async downloadProcess(type, name) {
      try {
        const _this = this
        // 按需要类型创建文件并下载
        if (type === "xml" || type === "bpmn") {
          const { err, xml } = await this.bpmnModeler.saveXML()
          // 读取异常时抛出异常
          if (err) {
            console.error(`[Process Designer Warn ]: ${err.message || err}`)
          }
          const { href, filename } = _this.setEncoded(
            type.toUpperCase(),
            name,
            xml
          )
          downloadFunc(href, filename)
        } else {
          const { err, svg } = await this.bpmnModeler.saveSVG()
          // 读取异常时抛出异常
          if (err) {
            return console.error(err)
          }
          const { href, filename } = _this.setEncoded("SVG", name, svg)
          downloadFunc(href, filename)
        }
      } catch (e) {
        console.error(`[Process Designer Warn ]: ${e.message || e}`)
      }
      // 文件下载方法
      function downloadFunc(href, filename) {
        if (href && filename) {
          const a = document.createElement("a")
          a.download = filename // 指定下载的文件名
          a.href = href //  URL对象
          a.click() // 模拟点击
          URL.revokeObjectURL(a.href) // 释放URL 对象
        }
      }
    },
    // 根据所需类型进行转码并返回下载地址
    setEncoded(type, filename = "diagram", data) {
      const encodedData = encodeURIComponent(data)
      return {
        filename: `${filename}.${type}`,
        href: `data:application/${
          type === "svg" ? "text/xml" : "bpmn20-xml"
        };charset=UTF-8,${encodedData}`,
        data: data
      }
    },
    // 加载本地文件
    importLocalFile() {
      const that = this
      const file = this.$refs.refFile.files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function () {
        const xmlStr = this.result
        that.createNewDiagram(xmlStr)
        console.log(this.result)
      }
    }
  }
}
</script>
<style lang="scss">
.myBpmnCanvas {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .displayNone{
    display: none;
  }
  .myBpmnCanvas-container {
    height: 100%;
    .myBpmnCanvas-canvas {
      height: 100%;
    }
  }
}
</style>
