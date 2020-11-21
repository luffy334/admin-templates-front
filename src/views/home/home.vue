<template>
  <el-container style="height: 100%;">
    <el-aside width="200px" style="background-color: #545c64">
      <el-menu
              :router='true'
              :default-active="menu[0].uri"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
        <div v-for="obj in menu" :key="obj.id">
          <el-submenu :index="obj.id" v-if="obj.childMenus.length > 0">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{obj.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="childMenu in obj.childMenus" :key="childMenu.id" :index="childMenu.uri">{{childMenu.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="obj.uri" v-else>
            <i class="el-icon-menu"></i>
            <span slot="title">{{obj.name}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { getMenu } from '@/utils/auth'

  export default {
    data() {
      return {
        menu: JSON.parse(getMenu())
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created (){

    }
  }
</script>

<style lang="scss" scoped>
  .container {

  }
</style>