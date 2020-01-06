<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">S-PARK 运营管理后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autoComplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入登录密码"
          name="password"
          tabindex="2"
          autoComplete="new-password"
          @paste.native="onPaste"
          @focus="getCursor"
          @input="getValue"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <!-- eslint-disable-next-line -->
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- <el-form-item
        prop="captcha"
        class="vertifi-code"
      >
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          class="captcha"
          placeholder="请输入验证码"
          name="captcha"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
        <img
          :src="captchaUrl"
          height="40"
          @click="init"
        >
      </el-form-item> -->

      <el-button
        :loading="loading"
        class="login-submit"
        type="danger"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>

    </el-form>
  </div>
</template>

<script>
import { validatePassword, validateUsername } from '@/utils/validate';
// import { getCaptcha } from '@/api/user';
/* eslint-disable */
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin@123456',
        // captcha: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        // captcha: [{ required: true, min: 6, max: 6, message: '验证码长度为6个字符', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // captchaUrl: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.query) {
          const { redirect, username = "" } = route.query
          this.redirect = redirect
          if (username) this.loginForm = { ...this.loginForm, username }
        }
      },
      immediate: true,
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    getValue(val){
      if(val.length == 0){
        this.passwordType = 'text'
        this.$nextTick(()=>{
          this.$refs.password.focus()
        })
      }else if(val.length==1){
        this.passwordType = 'password'
        this.$nextTick(()=>{
          this.$refs.password.focus()
          this.$refs.loginForm.clearValidate();
        })
      }
    },
    onPaste(){
      this.passwordType = 'password'
      this.$nextTick(()=>{
        this.$refs.password.focus()
        this.$refs.loginForm.clearValidate();
      })
    },
    // 兼容IE
    getCursor (event) {
      if (window.ActiveXObject || 'ActiveXObject' in window) {
        event.target.setSelectionRange(this.loginForm.password.length, this.loginForm.password.length)
      }
    },
    async init () {
      // const res = await getCaptcha();
      // this.captchaUrl = window.URL.createObjectURL(res);
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$router.push({ path: this.redirect || '/' });
          this.loading = false;
          // this.$store.dispatch('user/login', this.loginForm).then((res) => {
          //   this.$router.push({ path: this.redirect || '/' });
          //   this.loading = false;
          // }).catch(()=>{
          //   this.init();
          //   // this.loginForm.captcha = '';
          // })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.forget-pwd {
  position: absolute;
  right: 0;
  bottom: -35px;
}
</style>
