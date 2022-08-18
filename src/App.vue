<template>
  <div id="app">
    <!-- <router-view></router-view> -->

    <!-- 新建流程图 -->
    <work-flow-chart
        v-show="handleType === 'create'"
        :handleType="handleType"
        env="development"
        @saveFlowChart="saveFlowChart"
        >
    </work-flow-chart>

    <!-- 编辑流程图 -->
    <work-flow-chart
        v-show="handleType === 'edit'"
        :handleType="handleType"
        env="development"
        :flowId="flowId"
        :flowKey="flowKey"
        @saveFlowChart="saveFlowChart"
        >
    </work-flow-chart>

    <!-- 查看流程图 -->
    <work-flow-chart
      v-show="handleType === 'show'"
      :handleType="handleType"
      :processDefinitionId="processDefinitionId"
      env="development"
      :disable="disable"
      @saveFlowChart="saveFlowChart"
      >
    </work-flow-chart>

  </div>
</template>
<script>
import WorkFlowChart from './WorkFlowChart'
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
