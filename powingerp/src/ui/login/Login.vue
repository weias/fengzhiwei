<template>
  <div class="bg">
    <div class="login-wrap animated flipInY">
      <h3>欢迎使用宝盈业务系统</h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="0px">
        <el-form-item prop="name">
          <el-input :placeholder="'用户名'" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :placeholder="'密码'" v-model="form.password" type="password" @keyup.enter.native="Login('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-checkbox v-model="isMemery" style="color:#eee">记住密码</el-checkbox>
            <a href="" @click.prevent="openMsg"  style="color:#eee">忘记密码</a>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 粒子漂浮物 -->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="star"
      :particleSize="5"
      linesColor="#fff"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      form: {
        name: Cookies.get("userInfo") || "",
        password: Cookies.get("passwordInfo") || ""
      },
      isMemery: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: "blur",
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    localStorage.setItem("userInfo", null)
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "v1/commons/login",
            method: "POST",
            data: {
              username: this.form.name,
              password: this.form.password
            }
          }).then(res => {
//            console.log(res.data.data)
            if (res.data.status == 2000) {
              let userInfo = res.data.data;
              localStorage.userInfo = JSON.stringify(userInfo);
              this.setUserInfo(userInfo);
              this.$router.push("home");
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(error => {
            this.$message.error(error.toString());
          });
        } else {
          return false;
        }
      });
    },
    openMsg() {
      this.$message.warning('该功能还没开发');
    }
  },
  watch: {
    isMemery(n, o) {
      if (n) {
        Cookies.set("userInfo", this.form.name, { expires: 7 });
        Cookies.set("passwordInfo", this.form.password, { expires: 7 });
      } else {
        Cookies.remove("userInfo");
        Cookies.remove("passwordInfo");
      }
    }
  }
};
</script>
<style scoped lang="less">
  .bg {
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/img/sky.jpg');
    background-position: -20% 10%;
    background-size: contain;
    #particles-js {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .login-wrap {
    width: 330px;
    border-radius: 5px;
    padding: 20px;
    z-index: 3;
    margin-right: -37%;
    background: rgba(216,220,229,0.5);
    .el-form-item {
      margin-bottom: 25px !important;
    }
    h3 {
      text-align: center;
      color: #ebedef;
      margin-top: 0px;
      margin-bottom: 5px;
      span {
        color: #20a0ff;
      }
    }
    form {
      margin-top: 25px;
      .el-form-item {
        margin-bottom: 15px;
      }
    }
    a {
      text-decoration: none;
      color: #1f2d3d;
    }
    button {
      width: 100%;
      font-weight: 600;
    }
  }
</style>
