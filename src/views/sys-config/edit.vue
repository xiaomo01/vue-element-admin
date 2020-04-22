<template>
  <el-form ref="form" :model="form" label-width="80px" class="fromClass">

    <el-form-item label="配置名称">
      <el-input v-model="form.config_key" />
    </el-form-item>

    <el-form-item label="配置值">
      <el-input v-model="form.config_value" />
    </el-form-item>

    <el-form-item label="配置描述">
      <el-input v-model="form.config_content" type="textarea" />
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea" />
    </el-form-item>

    <el-form-item label="排序">
      <el-input v-model="form.sort_num" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit"> 确认修改 </el-button>
    </el-form-item>

  </el-form>
</template>
<script>

import { configAdd } from '@/api/config'
import { findById } from '@/api/config'

export default {
  name: 'ConfigEdit',
  data() {
    return {
      form: {
        id: '',
        config_key: '',
        config_value: '',
        config_content: '',
        remark: '',
        sort_num: ''
      }
    }
  },
  created() {
    this.getObjById()
  },
  methods: {
    getObjById() {
      this.form.id = this.$route.params && this.$route.params.id
      const param = { id: this.form.id }
      findById(param).then(response => {
        this.form = response.data.obj
      })
    },
    onSubmit() {
      this.loading = true
      configAdd(this.form).then(response => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      })
    }
  }
}
</script>

<style>
  .fromClass {
    width: 400px;
    padding: 15px;
  }
</style>
