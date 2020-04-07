<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6"><div class="grid-content bg-purple">
        <el-input v-model="listQuery.config_key" placeholder="配置名称" />
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <el-input v-model="listQuery.config_value" placeholder="配置值" />
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      </div></el-col>

      <div class="grid-content bg-purple" style="float: right;margin-right: 20px;">
        <router-link :to="'/sys-config/add/'">
          <el-button type="primary" icon="el-icon-plus">添加配置</el-button>
        </router-link>
      </div>
    </el-row>

    <div style="padding: 5px" />

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="配置名称">
        <template slot-scope="scope">
          <span>{{ scope.row.config_key }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="配置值">
        <template slot-scope="scope">
          <span>{{ scope.row.config_value }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" label="配置说明">
        <template slot-scope="scope">
          <span>{{ scope.row.config_content }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/sys-config/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <router-link to="#">
            <el-button type="primary" size="small" icon="el-icon-delete" @click.native.prevent="deleteItem(scope.row.id, scope.$index)">删除</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/config'
import { deleteItem } from '@/api/config'
import Pagination from '@/components/Pagination' // 分页相关

export default {
  name: 'ConfigList',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        config_key: '',
        config_value: '',
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listQuery.config_key = response.data.listQuery.config_key
        this.listQuery.config_value = response.data.listQuery.config_value
        this.listLoading = false
      })
    },
    deleteItem(id, index, obj) {
      this.$confirm('确认删除本行数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = { id: id }
        deleteItem(param).then(response => {
          const code = response.code
          if (code === 20000) {
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '删除失败！'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
