<template>
  <!-- 创建文档 -->
  <div class="jfh__docList-box">
    <el-table
      :data="tableData"
      border
    >
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>

    <el-table-column
      prop="ownerName"
      label="创建人"
      width="180">
    </el-table-column>

    <el-table-column
      prop="fileUrl"
      label="文件链接">
    </el-table-column>

    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>

    <el-table-column
      prop="updateTime"
      label="修改时间">
    </el-table-column>

  </el-table>
  <!-- 分页功能 -->
  <el-pagination
    class="page-doclist"
     background
      :current-page.sync="current"
      :page-size="size"
      :page-sizes="pageSizes"
      layout="sizes,prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
  >
  </el-pagination>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, Pagination, Button } from 'element-ui'

// 环境变量设置
import { setEnv } from "./config"
import { queryDocumentList } from './api/onlineFile'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)

export default {
  name: 'DocList',
  props: {
    env: {
      type: String,
      default: 'production'
    },
    title: {
      // 文件标题
      type: String,
      default: ''
    },
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 30, 50]
    }
  },
  data() {
    return {
      tableData: [], // 表格数据
      total: 1,
      size: this.pageSize,
      current: this.pageNo
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
    // 数据初始化
    this.init()
  },
  methods: {
    init() {
      // 在线文档列表接口调用
      queryDocumentList({ title: this.title, pageNo: this.current, pageSize: this.size }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data.list
          this.current = res.data.current
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.init()
    },
    handleCurrentChange(val) {
      this.current = val
      this.init()
    }
  }
}
</script>

<style lang="scss">
.jfh__docList-box {
  .el-table{
    width: 100%;
  }
  .page-doclist{
    margin-top: 20px;
    text-align: right;
  }
}
</style>
