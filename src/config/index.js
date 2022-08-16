/* 接口配置 */

let ENV = 'development'
const API = 'API'

const HOSTS = {
  API: {
    local: 'https://rest-dev.jfh.com',
    development: 'https://rest-dev.jfh.com',
    test: 'https://rest-test.jfh.com',
    rc: 'https://rest-test.jfh.com',
    production: 'https://rest.jfh.com'
  }

}
/**
 * 柯里化
 * @param host {'local'|'development'|'test'|'production'}
 * @param path {string}
 * @return {function(*=)}
 * @private
 */
const _g = (host, path) => {
  return (env = ENV) => HOSTS[host][env] + path
}

/**
 * 接口字典
 *
 * 使用示例：
 * APIS.test()      // 获取该接口当前环境的url
 * APIS.test('development') // 获取接口指定环境的url
 *isv/claimBuByCompId
 * @type {{test: (function(*=))}}
 */
const APIS = {
  // getMenus: _g(API, '/prt-opcomponent/definition/findByProcessDefinitionId')
  // 获取流程图
  getWorkflows: _g(API, '/prt-opcomponent/definition/findByProcessDefinitionId'),
  findById: _g(API, '/prt-opcomponent/definition/findByProcessDefinitionKey'),
  // 保存流程图
  saveWorkflows: _g(API, '/prt-opcomponent/modeler/deployByStringXml'),
  // 流程图列表
  modelList: _g(API, '/prt-opcomponent/definition/findProcessDefinition'),
  // 用户列表
  queryUserByTenantCode: _g(API, '/prt-opcomponent/usersApi/queryUserByTenantCode'),
  // 候选组
  queryDepartmentListByTenantCode: _g(API, '/prt-opcomponent/tenantDepartmentApi/queryDepartmentListByTenantCode'),
  // 角色列表
  queryRoleListByTenantCode: _g(API, '/prt-opcomponent/tenantDepartmentApi/queryRoleListByTenantCode'),

  // 导出
  exportByKey: _g(API, '/prt-opcomponent/modeler/exportByKey')
}

const getEnv = () => ENV

const setEnv = env => {
  if (env && ['local', 'development', 'test', 'rc', 'production'].includes(env)) {
    ENV = env
  } else {
    throw new Error('Invalid env value')
  }
}

export {
  APIS, setEnv, getEnv
}

export default {
  APIS, setEnv, getEnv
}
