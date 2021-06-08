<template>
  <!-- 布局组件 -->
  <el-container class="layout-container">
    <el-aside class="aside"
              width="auto">
      <app-aside class="aside-menu"
                 :is-collapse="isCollapse" />
      <!-- 或者 <AppAside /> -->
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <!-- 展开收缩切换icon -->
          <i :class="{
                  'el-icon-s-fold':isCollapse,
                  'el-icon-s-unfold':!isCollapse
             }"
             @click="isCollapse = !isCollapse"></i>
          <!-- <i class="el-icon-s-unfold"></i> -->
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar"
                 :src="user.photo"
                 alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
// 获取用户信息接口
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  props: {},
  components: {
    AppAside // 注册组件
  },
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边栏展开与收缩
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then((res) => {
        // console.log(res)
        this.user = res.data.data
      })
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {}
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  //   background-color: #b3c0d1;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
