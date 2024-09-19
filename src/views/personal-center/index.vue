<template>
  <div class="app-container">
    <div class="info-content">
      <div class="el-card__header">企业信息</div>
      <div class="el-card__body">
        <div class="item">下午好，欢迎使用 {{ companyName }}</div>
        <div class="item line-2">
          <p><span class="span">企业名称：</span>{{ store_info.store_name }}</p>
          <p>
            <span class="span">到期时间：</span>{{ store_info.expiration_at }}
          </p>
          <p>
            <span class="span">手机号码：</span>{{ store_info.store_phone }}
          </p>
        </div>
        <div class="item">
          <span class="span">企业地址：</span>{{ store_info.area_info }}
        </div>
      </div>
    </div>

    <div class="info-content">
      <div class="el-card__header">我的企业</div>
      <div class="el-card__body">
        <div class="item line-3">
          <span class="span">当前企业：</span>

          <el-select
            v-model="store_info.id"
            placeholder="请选择"
            @change="change_storeFn"
          >
            <el-option
              v-for="item in store_list"
              :key="item.id"
              :label="item.store_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- <div class="btn">
            <el-button type="success" plain size="small">当前企业</el-button>
          </div> -->
        </div>
        <!-- <div class="item line-3">
          <div class="company-name">
            <span class="span">企业名称：</span>{{store_info.store_name}}
          </div>
          <div class="btn">
            <el-button type="primary" size="small" class="lgm-search-btn"
              >切换企业</el-button
            >
          </div>
        </div> -->
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="info-content">
          <div class="el-card__header">扫码加入企业</div>
          <div class="el-card__body code-wrap">
            <el-image :src="require('@/assets/images/demo_02.png')"></el-image>
            <p class="left-p">打开微信小程序扫一扫加入企业</p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="info-content">
          <div class="el-card__header">续费企业</div>
          <div class="el-card__body code-wrap">
            <el-image :src="require('@/assets/images/demo_02.png')"></el-image>
            <p class="right-p">到期时间：{{ store_info.expiration_at }}</p>
            <p>打开微信扫一扫进行企业续费</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="info-content">
      <div class="el-card__header">更新信息</div>
      <div class="el-card__body">
        <el-row class="form">
          <el-col :span="6">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="姓名" required>
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  accept="image/*"
                  :headers="headers"
                  action="https://api.yhjerp.com/api/Admin/uploads"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submit"
                  icon="el-icon-position"
                  class="lgm-search-btn"
                  >更新个人信息</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { personalAdmin, change_store } from "@/api/admin";
import { getToken } from '@/utils/auth';

let loadingInstance = null;
import { Loading } from 'element-ui';
export default {
  data() {
    return {
         headers:{
        Authorization: `Bearer ${getToken()}`
      },
      form: {
        admin_id: "",
        avatar: "",
        nickname: "",
        role_id: "",
        role_name: "",
        store_id: "",
      },
      store_info: {},
      store_list: [],
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
    };
  },
  created() {
    this.personalFn();
  },
  methods: {
    change_storeFn(store_id) {
      change_store(
        {
          store_id,
        },
        "POST"
      ).then((e) => {
        this.personalFn();
      });
    },
    beforeUpload() {
      // 显示 loading
      loadingInstance = Loading.service({
        text: "上传...",
        background: "rgba(0, 0, 0, 0.7)", // 自定义 loading 背景色
      });
    },
    handleAvatarSuccess(res, file) {
      if (loadingInstance) {
        loadingInstance.close(); // 隐藏 loading
      }
      this.detailForm.avatar = res.data;
    },
    personalFn() {
      personalAdmin({}, "GET").then((e) => {
        this.form = e.data;
        this.store_info = e.data.store_info;
        this.store_list = e.data.store_list;
        console.log(this.store_info, 1211);
      });
    },
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.info-content {
  background-color: #fff;
  margin-bottom: 15px;
}

.form {
  display: flex;
  justify-content: center;
}

.avatar-wrap {
  display: flex;

  .avatar-btn {
    width: 115px;
  }
  .avatar-input {
    flex: 1;
  }
}

.el-card__body {
  .item {
    font-size: 18px;
    margin-bottom: 12px;

    .span {
      color: #909399;
    }
  }

  .line-2 {
    display: flex;

    p {
      width: 33%;
    }
  }

  .line-3 {
    display: flex;
    align-items: center;

    .company-name {
      width: 45%;
    }

    .btn {
      width: 45%;
    }
  }
}

.code-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .left-p {
    margin-top: 30px;
  }

  .right-p {
    margin: 6px 0;
  }
}
</style>
