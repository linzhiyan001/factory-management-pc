<template>
  <div class="app-container">
    <div class="content">
      <div class="lgm-search">
        <el-form
          ref="form"
          :model="searchParams"
          label-width="80px"
          class="search-form"
        >
          <el-form-item label="员工">
            <el-input
              v-model="searchParams.nickname"
              placeholder="请输入员工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select
              v-model="searchParams.department_id"
              placeholder="请选择部门"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select
              v-model="searchParams.role_id"
              placeholder="请选择岗位"

            >
              <el-option
                v-for="item in gwList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="结算状态">
            <el-radio-group v-model="searchParams.status">
              <el-radio label="在职"></el-radio>
              <el-radio label="待审"></el-radio>
              <el-radio label="离职"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-row>
            <el-button
              @click="
                page = 1;
                adminAdminFn();
              "
              type="success"
              class="lgm-search-btn"
              icon="el-icon-search"
              >搜索</el-button
            >
            <el-button
              class="lgm-reset-btn"
              icon="el-icon-refresh"
              @click="reset"
              >重置</el-button
            >
          </el-row>
        </el-form>
      </div>

      <div class="table-header-btn">
        <el-button
          type="success"
          plain
          size="small"
          class="lgm-add-btn"
          icon="el-icon-plus"
          @click="addList"
          >新增</el-button
        >
      </div>
      <div class="table">
        <el-table :data="dataList" border>
          <el-table-column
            prop="nickname"
            label="员工姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            align="center"
          ></el-table-column>
          <el-table-column prop="gender" label="员工性别" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.gender == 1 ? "男" : "女" }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="department_id" label="员工部门" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                plain
                size="mini"
                v-for="(item, idx) in departmentList"
                :key="idx"
                v-show="item.id == scope.row.department_id"
                >{{ item.name }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="role_id" label="员工岗位" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                plain
                size="mini"
                v-for="(item, idx) in gwList"
                :key="idx"
                v-show="item.id == scope.row.role_id"
                >{{ item.name }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="entry_date"
            label="入职时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="leave_date"
            label=" 离职时间"
            align="center"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleDelete(scope.$index, scope.row)"
                  >离职</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="lgm-page-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[10, 100, 200, 300, 400]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 修改 -->
    <el-dialog title="员工" :visible.sync="dialogVisible" center width="900px">
      <el-form
        :model="detailForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="detailForm"
      >
        <el-form-item label="员工类型" style="width: 100%">
          <el-radio-group v-model="detailForm.employee_type">
            <el-radio :label="1">正式员工</el-radio>
            <el-radio :label="2">临时工</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="员工姓名" prop="nickname" style="width: 50%">
          <el-input v-model="detailForm.nickname" :disabled="!!detailForm.id"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" style="width: 50%">
          <el-input v-model="detailForm.phone" :disabled="!!detailForm.id"></el-input>
        </el-form-item>

        <el-form-item label="员工部门" prop="department_id" style="width: 50%">
          <el-select
            v-model="detailForm.department_id"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工岗位" prop="role_id" style="width: 50%">
          <el-select
            v-model="detailForm.role_id"
            placeholder="请选择岗位"
            style="width: 100%"
          >
            <el-option
              v-for="item in gwList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="登录密码" prop="password" style="width: 50%">
          <el-input type="password" v-model="detailForm.password"  :disabled="!!detailForm.id"></el-input>
        </el-form-item>
        <el-form-item label="数据权限" prop="data_authority" style="width: 50%">
          <el-radio-group v-model="detailForm.data_authority">
            <el-radio :label="1">所有数据</el-radio>
            <el-radio :label="2">本部门</el-radio>
            <el-radio :label="3">本部门及以下</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="身份证号" prop="id_card_number" style="width: 50%">
          <el-input v-model="detailForm.id_card_number"  :disabled="!!detailForm.id"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth_date" style="width: 50%">
          <el-date-picker
            v-model="detailForm.birth_date"
            type="date"
            format="yyyy-MM-dd"
             :disabled="!!detailForm.id"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="性别" prop="sex" style="width: 50%">
          <el-radio-group v-model="detailForm.gender"  :disabled="!!detailForm.id">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像" prop="avatar" style="width: 50%">
          <el-upload
  class="avatar-uploader"
  accept="image/*"
 :headers="headers"
  action="https://api.yhjerp.com/api/Admin/uploads"
  :show-file-list="false"
    :disabled="!!detailForm.id"
    :before-upload="beforeUpload"
  :on-success="handleAvatarSuccess">
  <img v-if="detailForm.avatar" :src="detailForm.avatar" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
          
        </el-form-item>

        <el-form-item label="入职日期" prop="entry_date" style="width: 50%">
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="detailForm.entry_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离职日期" prop="leave_date" style="width: 50%">
          <el-date-picker
            v-model="detailForm.leave_date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="lgm-reset-btn" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="dialogConfirm('ruleForm')"
          class="lgm-search-btn"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 上传图片 -->
    <!-- <upload-image :isShow="showUploadImage" :single="isSingle" @selectImageData="selectImageData"></upload-image> -->
  </div>
</template>

<script>
import SelectBed from "@/components/SelectBed";
import SelectStyle from "@/components/SelectStyle";
import UploadImage from "@/components/uploadImage";
import { adminAdmin, adminrole, department } from "@/api/admin";
import { getToken } from '@/utils/auth';
let loadingInstance = null;
import { Loading } from 'element-ui';

export default {
  name: "PieceSalaryDetail",
  components: {
    "select-bed": SelectBed,
    "select-style": SelectStyle,
    "upload-image": UploadImage,
  },
  data() {
    return {
      dataList: [],
      page: 1,
      page_size: 10,
      total: 0,
      totalNum: 0, // 总件数
      totalMoney: 0, // 总金额
      yjs: 0, // 已结算
      wjs: 0, // 未结算
      headers:{
        Authorization: `Bearer ${getToken()}`
      },
      searchParams: {
        nickname: "",
        department_id: "",
        role_id: "",
        status: "",
      },
      departmentList: [],
      gwList: [],
      dataList: [],
      detailForm: {
        employee_type: 1,
        nickname: "",
        phone: "",
        department_id: "",
        role_id: "",
        password: "",
        data_authority: 1,
        id_card_number: "",
        birth_date: "",
        gender: 1,
        avatar: "",
        entry_date: "",
        id:"",

        leave_date: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      },
      dialogVisible: false,
      showUploadImage: false,
      isSingle: true,
    };
  },
  created() {
    this.adminAdminFn();
    this.adminroleFn();
    this.departmentFn();
  },
  methods: {
    adminroleFn() {
      adminrole(
        {
          page: 1,
          page_size: 1000,
        },
        "GET"
      ).then((e) => {
        this.gwList = e.data.list;
      });
    },
    departmentFn() {
      department(
        {
          page: 1,
          page_size: 1000,
        },
        "GET"
      ).then((e) => {
        this.departmentList = e.data.list;
      });
    },

    handleSizeChange(value) {
      this.page_size = value;
      this.adminAdminFn();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.adminAdminFn();
    },
    adminAdminFn() {
      adminAdmin(
        {
          page: this.page,
          page_size: this.page_size,
          ...this.searchParams
        },
        "GET"
      ).then((e) => {
        console.log(e.data.list);
        this.dataList = e.data.list;
        this.total = e.data.total;
      });
    },
    dialogConfirm() {
      console.log(this.detailForm);
      adminAdmin(
        this.detailForm,
        this.detailForm.id ? "PATCH" : "POST",
        this.detailForm.id
      ).then((e) => {
        this.dialogVisible = false;
        this.seach();
      });
    },
    seach() {
      this.page = 1;
      this.adminAdminFn();
    },
    reset() {
      for (let i in this.searchParams) {
        this.searchParams[i] = null;
      }
      this.seach();
    },
    handleDelete(index, item) {
      this.$confirm("是否确认离职选中的员工?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "submitDeleteBtn",
        type: "warning",
      }).then(() => {
        adminAdmin({}, "DELETE", item.id).then((e) => {
          this.seach();
        });

        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    beforeUpload(){
 // 显示 loading
 loadingInstance = Loading.service({
      text: '上传...',
      background: 'rgba(0, 0, 0, 0.7)' // 自定义 loading 背景色
    });
    },
    handleAvatarSuccess(res, file) {
      if (loadingInstance) {
      loadingInstance.close(); // 隐藏 loading
    }
        this.detailForm.avatar = res.data
      },
    addList() {
      this.detailForm = {
        employee_type: 1,
        nickname: "",
        phone: "",
        department_id: "",
        role_id: "",
        password: "",
        data_authority: 1,
        id_card_number: "",
        birth_date: "",
        id:"",
        gender: 1,
        avatar: "",
        entry_date: "",
        leave_date: "",
      };
      this.dialogVisible = true;
    },
    handleEdit(idx, item) {
      this.detailForm = item;

      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-container {
  .detailForm {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .add-avatar {
      width: 90px;
      height: 40px;
      color: #909399;
      background-color: #dcdfe6;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
    }
  }

  .content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

    .item {
      font-size: 14px;
      display: flex;
      align-items: center;

      span {
        color: #000;
        font-size: 22px;
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }

  .tips {
    color: #999;
  }
}
</style>
