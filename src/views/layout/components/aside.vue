<template>
  <!-- 侧边栏组件 -->
  <el-menu default-active="/"
           background-color="#002033"
           text-color="#fff"
           active-text-color="#ffd04b"
           router>
    <!-- 加上router,index就可以跳转路径 -->
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-chat-dot-round"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-present"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
  },
  created () {},
  mounted () {}
}
</script>

<style scoped lang="less">
</style>
