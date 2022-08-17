import axios from "./index"
import { APIS } from "../config/index"

const getWorkflows = (data) => {
  return axios.request({
    url: APIS.getWorkflows(),
    method: 'GET',
    params: data
  })
}

const findById = (data) => {
  return axios.request({
    url: APIS.findById(),
    method: 'GET',
    params: data
  })
}

const modelList = (data) => {
  return axios.request({
    url: APIS.modelList(),
    method: 'GET',
    params: data
  })
}

const modelLists = (data) => {
  return axios.request({
    url: APIS.modelLists(),
    method: 'GET',
    params: data
  })
}

const queryDepartmentListByTenantCode = (data) => {
  return axios.request({
    url: APIS.queryDepartmentListByTenantCode(),
    method: 'GET',
    params: data
  })
}
// 角色列表
const queryRoleListByTenantCode = (data) => {
  return axios.request({
    url: APIS.queryRoleListByTenantCode(),
    method: 'GET',
    params: data
  })
}

const findFlowElementsByProcessInstanceId = (data) => {
  return axios.request({
    url: APIS.findFlowElementsByProcessInstanceId(),
    method: 'GET',
    params: data
  })
}

const rejectAnyNode = (data) => {
  return axios.request({
    url: APIS.rejectAnyNode(),
    method: 'GET',
    params: data
  })
}

const processInstanceList = (data) => {
  return axios.request({
    url: APIS.processInstanceList(),
    method: 'GET',
    params: data
  })
}

const exportByKey = (data) => {
  return axios.request({
    url: APIS.exportByKey(),
    method: 'GET',
    params: data
  })
}

const saveWorkflows = (data) => {
  return axios.request({
    url: APIS.saveWorkflows(),
    method: 'POST',
    data
  })
}
// 用户数据接口
const queryUserByTenantCode = (data) => {
  return axios.request({
    url: APIS.queryUserByTenantCode(),
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
