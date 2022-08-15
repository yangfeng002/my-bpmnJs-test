<template>
  <div style="margin-top: 16px">
    <el-form-item label="处理用户">
      <el-select
        v-model="userTaskForm.assignee"
        @change="updateElementTask('assignee')"
      >
        <el-option
          v-for="ak in userList"
          :key="ak.id"
          :label="ak.realName"
          :value="ak.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="候选用户">
      <el-select
        v-model="userTaskForm.candidateUsers"
        multiple
        @change="updateElementTask('candidateUsers')"
      >
        <el-option
          v-for="uk in userList"
          :key="uk.id"
          :label="uk.realName"
          :value="uk.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="候选分组">
      <el-select
        v-model="userTaskForm.candidateGroups"
        multiple
        @change="updateElementTask('candidateGroups')"
      >
        <el-option
          v-for="gk in candidateList"
          :key="gk.id"
          :label="gk.roleName"
          :value="gk.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="到期时间" style="display: none;">
      <el-input
        v-model="userTaskForm.dueDate"
        clearable
        @change="updateElementTask('dueDate')"
      />
    </el-form-item>
    <el-form-item label="跟踪时间" style="display: none;">
      <el-input
        v-model="userTaskForm.followUpDate"
        clearable
        @change="updateElementTask('followUpDate')"
      />
    </el-form-item>
    <el-form-item label="优先级" style="display: none;">
      <el-input
        v-model="userTaskForm.priority"
        clearable
        @change="updateElementTask('priority')"
      />
    </el-form-item>
  </div>
</template>

<script>
import { queryUserByTenantCode, queryRoleListByTenantCode } from '@/api/workflow'
export default {
  name: 'UserTask',
  props: {
    id: String,
    type: String
  },
  data() {
    return {
      defaultTaskForm: {
        assignee: '',
        candidateUsers: [],
        candidateGroups: [],
        dueDate: '',
        followUpDate: '',
        priority: ''
      },
      userTaskForm: {},
      userList: [],
      candidateList: []
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.bpmnElement = window.bpmnInstances.bpmnElement
        this.$nextTick(() => {
          this.resetTaskForm()
          this.getUserList()
          this.getCandidateList()
        })
      }
    }
  },
  beforeDestroy() {
    this.bpmnElement = null
  },
  created() {
    // this.getUserList()
    // this.getCandidateList()
  },
  methods: {
    getUserList() {
      queryUserByTenantCode().then((res) => {
        if (res.code === '0') {
          this.userList = res.data || []
          this.userTaskForm.assignee = Number(this.userTaskForm.assignee)
          // 处理数据
          if (this.userTaskForm.candidateUsers && this.userTaskForm.candidateUsers.length > 0) {
            this.userTaskForm.candidateUsers = this.userTaskForm.candidateUsers.map(item => Number(item))
          }
        }
      })
        .catch((err) => {
          console.log(err.msg)
        })
    },
    getCandidateList() {
      queryRoleListByTenantCode().then((res) => {
        if (res.code === '0') {
          this.candidateList = res.data || []
          // 处理数据
          if (this.userTaskForm.candidateGroups && this.userTaskForm.candidateGroups.length > 0) {
            this.userTaskForm.candidateGroups = this.userTaskForm.candidateGroups.map(item => Number(item))
          }
        }
      })
        .catch((err) => {
          console.log(err.msg)
        })
    },
    resetTaskForm() {
      for (const key in this.defaultTaskForm) {
        let value
        if (key === 'candidateUsers' || key === 'candidateGroups') {
          value = this.bpmnElement?.businessObject[key]
            ? this.bpmnElement.businessObject[key].split(',')
            : []
        } else {
          value =
            this.bpmnElement?.businessObject[key] || this.defaultTaskForm[key]
        }
        this.$set(this.userTaskForm, key, value)
      }
    },
    updateElementTask(key) {
      const taskAttr = Object.create(null)
      if (key === 'candidateUsers' || key === 'candidateGroups') {
        taskAttr[key] =
          this.userTaskForm[key] && this.userTaskForm[key].length
            ? this.userTaskForm[key].join()
            : null
      } else {
        taskAttr[key] = this.userTaskForm[key] || null
      }
      window.bpmnInstances.modeling.updateProperties(this.bpmnElement, taskAttr)
    }
  }
}
</script>
