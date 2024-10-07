<template>
  <div class="login-container">
    <div class="wrap">
      <div class="left"></div>
      <div class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="密码登录" name="password">
            <div class="form">
              <div class="item">
                <div class="item-left">
                  <span style="width: 14px; margin-right: 5px;">
                    <i class="el-icon-mobile-phone icon"></i>
                  </span>
                  手机号
                </div>
                <div class="item-right">
                  <el-input
                    placeholder="请输入手机号"
                    type="text"
                    v-model="formData.username"
                    :maxlength="11"
                    clearable
                  />
                </div>
              </div>
              <div class="item">
                <div class="item-left">
                  <span style="width: 14px; margin-right: 5px;">
                    <i class="el-icon-lock icon"></i>
                  </span>
                  密码
                </div>
                <div class="item-right">
                  <el-input
                    placeholder="请输入密码"
                    type="password"
                    v-model="formData.password"
                    :maxlength="30"
                    clearable
                  />
                </div>
              </div>
            </div>

            <div class="register">
              还没有账号？
              <span @click="toRegister">去注册</span>
            </div>

            <div class="register-btn">
              <el-button type="success" class="lgm-search-btn" @click="toLogin">
                立即登录
              </el-button>
            </div>

            <div class="tips">
              {{ tips }}
            </div>
          </el-tab-pane>

          <el-tab-pane label="验证码登录" name="code">
            <div class="form">
              <div class="item">
                <div class="item-left">
                  <span style="width: 14px; margin-right: 5px;">
                    <i class="el-icon-mobile-phone icon"></i>
                  </span>
                  手机号
                </div>
                <div class="item-right">
                  <el-input
                    placeholder="请输入手机号"
                    type="text"
                    v-model="formData.phoneNumber"
                    :maxlength="11"
                    clearable
                  />
                </div>
              </div>
              <div class="item-wrap">
                <div class="item">
                  <div class="item-left">
                    <span style="width: 14px; margin-right: 5px;">
                      <i class="el-icon-lock icon"></i>
                    </span>
                    验证码
                  </div>
                  <div class="item-right code-input">
                    <el-input
                      placeholder="请输入验证码"
                      type="text"
                      v-model="formData.code"
                      :maxlength="6"
                      clearable
                    />
                  </div>
                </div>
                <div class="code-btn" @click="getCode">
                  <el-button type="info" plain :disabled="btnDisabled">
                    {{ codeText }}
                  </el-button>
                </div>
              </div>
            </div>

            <div class="register-btn login-btn">
              <el-button type="success" class="lgm-search-btn" @click="toLogin">
                登录
              </el-button>
            </div>

            <div class="tips">
              {{ tips }}
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 注册 -->
    <el-dialog
      title="企业注册"
      :visible.sync="dialogVisible"
      center
      width="600px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="企业名称" prop="qyName">
          <el-input v-model="ruleForm.qyName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display: flex; justify-content: space-between;">
            <el-input
              v-model="ruleForm.code"
              maxlength="6"
              style="flex: 1;"
            ></el-input>
            <div class="code-btn" @click="getCode2">
              <el-button type="info" plain :disabled="btnDisabled">
                {{ codeText }}
              </el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="qy">
          <el-cascader
            :options="copyRegionData"
            v-model="ruleForm.qy"
            @change="handleChange"
            :props="defaultProps"
            style="width: 100%;"
            class="qy-cascader"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" prop="yqCode">
          <el-input v-model="ruleForm.yqCode"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="lgm-reset-btn" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogConfirm('ruleForm')"
          class="lgm-search-btn"
        >
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { regionData } from 'element-china-area-data'
import { storesAdmin } from '@/api/user'
import { load_areas } from '@/api/admin'

export default {
  name: 'Login',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      activeName: 'password',
      tips:
        '* 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式',
      formData: {
        // username: "110",
        // password: "123123a",
        username: '13570919386',
        password: '123456',

        code: '',
      },
      codeText: '获取验证码',
      countdown: 60,
      btnDisabled: false,
      redirect: null,
      loginForm: {
        username: '',
        password: '',
      },
      dialogVisible: false,
      ruleForm: {
        qyName: '',
        name: '',
        phone: '',
        code: '',
        password: '',
        qy: '',
        address: '',
        yqCode: '',
        city_id: '',
        province_id: '',
        region_id: '',
      },
      rules: {
        qyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        qy: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        yqCode: [{ required: true, message: '请输入邀请码', trigger: 'blur' }],
      },
      copyRegionData: [],
      selectedLabels: '',
    }
  },
  created() {
    let storageTime = localStorage.getItem('codeBtnTime')
    if (storageTime) {
      this.countdown = storageTime
      this.codeText = this.countdown
      this.getCode()
    }

    // this.copyRegionData = regionData;
    // console.log(this.copyRegionData);
    this.load_areasFn()
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    load_areasFn() {
      load_areas({})
        .then((response) => {
          if (response.code == 200) {
            this.copyRegionData = response.data
          }
        })
        .catch((error) => {})
    },
    handleChange(value) {
      console.log(value)
      this.ruleForm.province_id = value[0]
      this.ruleForm.city_id = value[1]
      this.ruleForm.region_id = value[2]
      // 获取中文内容
      const getLabelByValue = (data, value) => {
        for (const item of data) {
          if (item.id === value) return item.name
          if (item.children) {
            const name = getLabelByValue(item.children, value)
            if (name) return name
          }
        }
        return null
      }

      const selectedLabels = this.ruleForm.qy.map((val) =>
        getLabelByValue(this.copyRegionData, val),
      )
      console.log('选中的中文内容:', selectedLabels)
      this.selectedLabels = selectedLabels.join('-')
    },
    dialogConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          storesAdmin({
            store_name: this.ruleForm.qyName,
            legal_person: this.ruleForm.name,
            store_phone: this.ruleForm.phone,
            area_info: this.selectedLabels,
            store_address: this.ruleForm.address,
            platform_id: this.ruleForm.yqCode,
            province_id: this.ruleForm.province_id,
            city_id: this.ruleForm.city_id,
            region_id: this.ruleForm.region_id,
            password: this.ruleForm.password,
          })
            .then((response) => {
              if (response.code == 200) {
                this.dialogVisible = false
                this.$refs.ruleForm.resetFields()
                this.$notifySuccess('注册成功')
              }
            })
            .catch((error) => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toLogin() {
      this.$store
        .dispatch('user/login', this.formData)
        .then(() => {
          this.$notifySuccess('登录成功')

          this.$router.push({ path: this.redirect || '/' })
        })
        .catch(() => {})
    },
    toRegister() {
      this.dialogVisible = true
    },
    getCode() {
      let timer = setInterval(() => {
        this.countdown -= 1
        this.codeText = this.countdown
        this.btnDisabled = true
        localStorage.setItem('codeBtnTime', this.countdown)
        // 存储获取验证码间隔
        if (this.countdown === 0) {
          clearInterval(timer)
          this.codeText = '获取验证码'
          this.countdown = 60
          this.btnDisabled = false
          localStorage.removeItem('codeBtnTime')
        }
      }, 1000)
    },
    getCode2() {},
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

::v-deep .qy-cascader {
  .is-focus {
    .el-input__inner {
      border-color: $fontColor !important;
    }
  }

  .el-input__inner:focus {
    border-color: $fontColor !important;
  }
}

.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('~@/assets/images/loginbg.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrap {
    width: 800px;
    display: flex;
    height: 424px;
    background-image: url('~@/assets/images/login_bg.jpg');
    background-size: 100% 100%;

    .left {
      width: 400px;
      height: 100%;
    }

    .right {
      width: 400px;
      height: 100%;
      background-color: #fff;
      padding: 20px;
    }
  }

  .register {
    text-align: right;
    color: #a8abb2;
    margin-bottom: 20px;

    span {
      color: $fontColor;
      cursor: pointer;
    }
  }

  .register-btn {
    width: 100%;
    margin-bottom: 30px;

    ::v-deep button {
      width: 100%;
      margin-left: 0;
    }
  }

  .login-btn {
    margin-top: 66px;
  }

  .tips {
    font-size: 12px;
    color: #a8abb2;
  }

  .form {
    width: 350px;

    .item-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item {
        width: calc(100% - 125px);
        margin: 0 !important;
      }

      .code-input {
        ::v-deep input {
          width: 100px !important;
        }
      }

      .code-btn {
        width: 115px;
        height: 38px;

        ::v-deep button {
          width: 100% !important;
          padding: 11px 20px !important;
        }
      }
    }

    .item {
      width: 100%;
      height: 38px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0 30px;

      .item-left {
        width: 78px;
        border-right: 1px solid #eee;
        display: flex;
        align-items: center;

        .icon {
          margin-right: 6px;
          color: $fontColor;
        }
      }

      .item-right {
        ::v-deep input {
          width: 230px;
          height: 36px;
          border: unset;
        }
      }
    }
  }
}
</style>
