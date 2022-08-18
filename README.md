

# comps-workflow

## 基于element-ui ui框架、 bpmn-js 流程图插件 封装的流程图功能（新建流程图、编辑流程图、查看流程图）
---
### 安装

``` bash
  npm i @jfh/comps-workflow -S
```
---
### 使用

一、全局使用

```javascript
import WorkFlowChart from '@jfh/comps-workflow'
Vue.use(WorkFlowChart)  // 使用插件
```

二、示例
```javascript
<template>
  <div id="app">
    <!-- <router-view></router-view> -->

    <!-- 新建流程图 -->
    <work-flow-chart v-show="handleType === 'create'" env="development" @saveFlowChart="saveFlowChart"></work-flow-chart>

    <!-- 编辑流程图 -->
    <work-flow-chart
        v-show="handleType === 'edit'"
        env="development"
        :flowId="flowId"
        :flowKey="flowKey"
        @saveFlowChart="saveFlowChart"
        >
    </work-flow-chart>

    <!-- 查看流程图 -->
    <work-flow-chart
      v-show="handleType === 'show'"
      :processDefinitionId="processDefinitionId"
      env="development"
      :disable="disable"
      @saveFlowChart="saveFlowChart"
      >
    </work-flow-chart>

  </div>
</template>
<script>

import WorkFlowChart from '@jfh/comps-workflow'

export default {
  name: 'App',
  components: {
    WorkFlowChart
  },
  data() {
    return {
      handleType: 'create', // 修改的类型
      flowId: '130144',
      flowKey: 'Process_1660643899042',
      disable: true,
      processDefinitionId: 'newflow:9:130109' // 定义id，查看流程图使用
    }
  },
  methods: {
    saveFlowChart(params) {
      console.log(params, '保存的流程参数')
    }
  }
}
</script>
<style lang="scss"></style>

```
---
### Props
| 名称       | 说明 |         备注 |
| :--------- | :--: | :----------- |
| env   | 当前打包环境   | 类型： String,  默认为production, 可选值：local、development、test、rc、production |
| handleType |  操作的类型  | 类型:  String： 默认‘create’  可选值： create \| edit \| show |
| disable |  流程图是否可编辑  | 默认：false, 表示可编辑 |
| flowKey |流程key| flowKey: String类型，编辑时需要传递该参数 |
| flowId |流程Id| flowId String类型，编辑时需要传递该参数 |
| processDefinitionId |流程定义Id| processDefinitionId: String类型，查看流程图传递该参数 |
---
### Event
| 事件名       | 说明 |         参数 |
| :--------- | :--- | :----------- |
| saveFlowsCallback |  保存流程图回调函数  | function(params) |
### 

注意： 组件中依赖第三方bpmn，所以需要安装相关的包，安装方法：
  ```
  步骤：
   1. package.json中添加
   
      "bpmn-js": "^8.8.2",
      "bpmn-js-properties-panel": "^0.46.0",
      "bpmn-js-token-simulation": "^0.21.1",
      "pubsub-js": "^1.9.4",
      "element-ui": "^2.15.3"

    2. 执行npm install 命令

  ```
