<template>
  <div class="container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form class="form-tools">
      <el-form-item>
        <el-button type="primary" @click="changeAddModel">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column label="用户名" prop="userName"></el-table-column>

      <el-table-column label="注册日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.registerTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="changeUpdateModel(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total">
    </el-pagination>

    <el-dialog width="35%" :title="modelTitle"
               :visible.sync="modelStatus"
               :close-on-click-model="false"
               :close-on-press-escape="false"
               @before-close="initModel">
      <el-form :model="modelData" label-width="80px" :rules="modelRules" ref="userModel">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="modelData.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="modelData.account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="modelData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="modelData.checkPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="initModel">取 消</el-button>
        <el-button type="primary" @click="submitModelForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {addUser, updateUser, deleteUser, userList} from '@/api/user'
  export default {
    data() {
      return {
        modelTag: 1,
        modelTitle: '',
        modelStatus: false,
        modelData: {
          userName: 'test111',
          account: 'test111',
          password: '123',
          checkPassword: '123'
        },
        modelRules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else {
                  if (this.modelData.checkPassword !== '') {
                    this.$refs.userModel.validateField('checkPassword');
                  }
                  callback();
                }
              }, required: true, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.modelData.password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              }, required: true, trigger: 'blur' }
          ],
        },
        form: {
          page: 1,
          pageSize: 20,
          total: 0,
          userName: '',
        },
        tableData: [],
        tableLoading: true,
      }
    },
    created() {
      this.onSearch()
    },
    methods: {
      onSearch() {
        userList(this.form).then((res) => {
          this.tableData = res.list
          this.form.total = res.total
          this.tableLoading = false
        })
      },
      submitModelForm() {
        this.$refs['userModel'].validate((valid) => {
          if (valid) {
            if (this.modelTag === 1) {
              addUser(this.modelData).then(res => {
                console.log('res', res)
                this.modelStatus = false
                this.initModel();
                this.onSearch();
                this.$message('已为您保存！')
              })
            } else if (this.modelTag === 2) {
              updateUser(this.modelData).then(res => {
                console.log('res', res)
                this.modelStatus = false
                this.initModel();
                this.onSearch();
                this.$message('已为您更新！')
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeAddModel() {
        this.modelTag = 1
        this.modelTitle = '新增用户'
        this.modelStatus = true
      },
      changeUpdateModel(row) {
        this.modelTag = 2
        this.modelTitle = '编辑用户'
        this.modelStatus = true
        this.modelData = row
      },
      initModel() {
        this.modelTitle = ''
        this.modelStatus = false
        this.$refs['userModel'].resetFields();
        this.modelData = {

        }
      },
      handleSizeChange(val) {
        this.form.pageSize = val
        this.onSearch()
      },
      handleCurrentChange(val) {
        this.form.page = val
        this.onSearch()
      },
      handleDelete(row) {
        deleteUser(row.id).then(res =>{
          if (res) {
            this.$message('已为您删除！')
            this.onSearch()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {

  }
  .pagination {
    margin: 16px;
    text-align: center;
  }
</style>