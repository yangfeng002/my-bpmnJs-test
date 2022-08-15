import axios from './index'

const getWorkflows = (data) => {
  return axios.request({
    key: 'getWorkflows',
    method: 'GET',
    params: data
  })
}

const findById = (data) => {
  return axios.request({
    key: 'findById',
    method: 'GET',
    params: data
  })
}

const modelList = (data) => {
  return axios.request({
    key: 'modelList',
    method: 'GET',
    params: data
  })
}

const modelLists = (data) => {
  return axios.request({
    key: 'modelLists',
    method: 'GET',
    params: data
  })
}

const queryDepartmentListByTenantCode = (data) => {
  return axios.request({
    key: 'queryDepartmentListByTenantCode',
    method: 'GET',
    params: data
  })
}
// 角色列表
const queryRoleListByTenantCode = (data) => {
  return axios.request({
    key: 'queryRoleListByTenantCode',
    method: 'GET',
    params: data
  })
}

const findFlowElementsByProcessInstanceId = (data) => {
  return axios.request({
    key: 'findFlowElementsByProcessInstanceId',
    method: 'GET',
    params: data
  })
}

const rejectAnyNode = (data) => {
  return axios.request({
    key: 'rejectAnyNode',
    method: 'GET',
    params: data
  })
}

const processInstanceList = (data) => {
  return axios.request({
    key: 'processInstanceList',
    method: 'GET',
    params: data
  })
}

const exportByKey = (data) => {
  return axios.request({
    key: 'exportByKey',
    method: 'GET',
    params: data
  })
}

const saveWorkflows = (data) => {
  return axios.request({
    key: 'saveWorkflows',
    method: 'POST',
    data
  })
}

const queryUserByTenantCode = (data) => {
  return axios.request({
    key: 'queryUserByTenantCode',
    method: 'POST',
    data
  })
}

export {
  findById,
  getWorkflows,
  modelList,
  modelLists,
  exportByKey,
  saveWorkflows,
  queryUserByTenantCode,
  queryDepartmentListByTenantCode,
  queryRoleListByTenantCode,
  findFlowElementsByProcessInstanceId,
  rejectAnyNode,
  processInstanceList
}
