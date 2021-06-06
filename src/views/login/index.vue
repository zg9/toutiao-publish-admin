<template>
  <div class="login-container">
    <el-form class="login-form"
             ref="formRef"
             :model="userForm"
             :rules="formRules">
      <div class="login-head"></div>
      <el-form-item prop="mobile">
        <el-input v-model="userForm.mobile"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="userForm.code"
                  placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item  prop="agree">
        <el-checkbox v-model="userForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn"
                   type="primary"
                   @click="onLogin"
                   :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  // 组件名称
  name: 'LoginIndex',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      userForm: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      //   checked: false, // 协议的选中状态
      loginLoading: false, // 登录的loading状态
      formRules: { // 表单验证规则配置
        //   要验证的数据名称:规则列表[]
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            //   自定义校验规则
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
    //   const user = this.userForm

      // 表单验证
      this.$refs.formRef.validate((valid) => {
        // 如果表单验证失败,停止请求提交
        if (!valid) {
          return
        }
        //   验证通过,请求登录
        this.login()
      })
    },
    // 登录方法单独封装,onLogin需要用时调用
    login () {
      // 开启登录中loading
      this.loginLoading = true

      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: this.userForm
      })
        .then(res => {
          console.log(res)
          this.$message({
            message: '登录成功',
            type: 'success'
          })

          // 关闭登录中loading
          this.loginLoading = false
        })
        .catch(err => {
          console.log('登录失败', err)
          // 登录失败
          this.$message.error('登录失败,手机号或验证码错误')

          this.loginLoading = false
        })
    }
  },
  created () {},
  mounted () {}
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  //   flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .login-head {
    width: 100%;
    height: 57px;
    background: url('./logo_index.png') no-repeat;
    margin-bottom: 10px;
  }
  .login-form {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
