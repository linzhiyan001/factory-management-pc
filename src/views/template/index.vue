<template>
  <div class="app-container setImg">
    <div class="content">
      <div v-if="!isSelct" class="lgm-search">
        <el-form
          ref="form"
          :model="searchParams"
          label-width="80px"
          class="search-form"
        >
          <el-form-item label="模版名称">
            <el-input
              v-model="searchParams.code2"
              placeholder="请输入模版名称查询"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-button
              @click="
                page = 1;
                adminroleListFn();
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
      <div v-if="!isSelct" class="table-header-btn">
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
            prop="name"
            label="名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="unit_price_mode"
            label="单价模式"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <p v-if="scope.row.unit_price_mode == 0">默认单价</p>
                <p v-if="scope.row.unit_price_mode == 1">分码单价</p>
                <p v-if="scope.row.unit_price_mode == 2">分岗位单价</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="350"
          >
            <template slot-scope="scope">
              <div class="flex" style="display: flex; justify-content: center">
                <el-button
                  v-if="isSelct"
                  size="mini"
                  type="primary"
                  plain
                  @click="isSelctFn(scope.$index, scope.row)"
                >选择模板</el-button
                >
                <el-button
                  v-if="!isSelct"
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  v-if="!isSelct"

                  size="mini"
                  type="danger"
                  plain
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
                <!-- <download-excel
                  ref="export"
                  class="export-excel-wrapper"
                  :data="selectData"
                  :fields="json_fields"
                  :header="headerTitle"
                  name="工序模版.xls"
                  style="margin-left: 10px"
                >
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    @click="handleDownload(scope.$index, scope.row)"
                  >
                    <i class="el-icon-download"></i>
                    下载当前模版
                  </el-button>
                </download-excel> -->
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
    <el-dialog title="工序" :visible.sync="dialogVisible" center width="1200px">
      <el-form
        :model="detailForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="detailForm"
      >
        <el-form-item label="模版名称" prop="name" style="width: 100%">
          <el-input v-model="detailForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单价模式" style="width: 100%">
          <el-radio-group
            v-model="detailForm.unit_price_mode"
            :disabled="modeDisabled"
          >
            <el-radio :label="0">默认单价</el-radio>
            <el-radio :label="1">分码单价</el-radio>
            <el-radio :label="2">分岗位单价</el-radio>
          </el-radio-group>
          <div class="tips">如设置了多单价，请先删除对应的多单价</div>
        </el-form-item>
      </el-form>

      <div class="detail-table">
        <el-table :data="dataList2" border ref="dragTable" style="width: 100%">
          <el-table-column prop="phone" label="序号" width="80" align="center">
            <template slot-scope="scope">
              <span>
                <i class="el-icon-rank"></i>
                {{ scope.$index }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="工序名称"
            align="center"
            min-width="160"
          >
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.process_name" />
            </template>
          </el-table-column>

          <el-table-column prop="price" align="center" min-width="160">
            <template slot="header" slot-scope="scope">
              <el-popover
                placement="bottom"
                title=" "
                popper-class="table-popover"
                width="400"
                trigger="hover"
                v-if="detailForm.unit_price_mode === '2'"
              >
                <span slot="reference">
                  价格 <i class="el-icon-plus"></i>
                </span>
                <slot>
                  <div class="size-list" style="display: flex; flex-wrap: wrap">
                    <div
                      class="size-list-item"
                      v-for="(item, index) of sizeList"
                      :key="index"
                      style="
                        padding: 8px 15px;
                        border: 1px solid #eee;
                        cursor: pointer;
                      "
                      :class="{
                        isActive: item.isActive,
                        isDisabled: item.disabled,
                      }"
                      @click="clickTableAddSize(index)"
                    >
                      {{ item.item }}
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <el-button
                      class="lgm-reset-btn"
                      icon="el-icon-refresh"
                      @click="selectSize"
                      >选择尺码并确定</el-button
                    >
                  </div>
                </slot>
              </el-popover>

              <el-popover
                placement="bottom"
                title=" "
                popper-class="table-popover"
                width="400"
                trigger="hover"
                v-else-if="detailForm.unit_price_mode === '3'"
              >
                <span slot="reference">
                  价格 <i class="el-icon-plus"></i>
                </span>
                <slot>
                  <div class="size-list" style="display: flex; flex-wrap: wrap">
                    <div
                      class="size-list-item"
                      v-for="(item, index) of gwList"
                      :key="index"
                      style="
                        padding: 8px 15px;
                        border: 1px solid #eee;
                        cursor: pointer;
                      "
                      :class="{
                        isActive: item.isActive,
                        isDisabled: item.disabled,
                      }"
                      @click="clickTableAddSize(index)"
                    >
                      {{ item.item }}
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <el-button
                      class="lgm-reset-btn"
                      icon="el-icon-refresh"
                      @click="selectGw"
                      >选择岗位并确定</el-button
                    >
                  </div>
                </slot>
              </el-popover>

              <span slot="reference" v-else> 价格 </span>
            </template>
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.price"
                controls-position="right"
                @input="totalPriceFn"
                :min="0"
                size="small"
              />
            </template>
          </el-table-column>

          <!-- 动态添加 -->
          <el-table-column
            align="center"
            min-width="160"
            v-for="(item, index) of customColumn"
            :key="item.id"
          >
            <template slot="header" slot-scope="scope">
              <span slot="reference" @click="deleteTableColumn(item, index)">
                <i class="el-icon-delete"></i> {{ item.size }}
              </span>
            </template>
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row['a' + index]"
                controls-position="right"
                :min="0"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="price2"
            label="显示价格"
            align="center"
            min-width="80"
          >
            <template slot-scope="scope">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.display_price"
                active-color="#ed6d00"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="post_ids"
            label="可见岗位"
            align="center"
            min-width="180"
          >
            <template slot-scope="scope">

              <el-select
                v-model="scope.row.post_ids"
                multiple
                collapse-tags
                style="margin-left: 20px"
                placeholder="请选择"
              >
                <div
                  style="width: 100%; text-align: center; margin-bottom: 5px"
                  @click="
                    () => {
                      scope.row.post_ids = adminroleList.map((role) => role.id);
                    }
                  "
                >
                  <el-button type="danger" size="small" plain style="width: 90%"
                    >选择所有</el-button
                  >
                </div>
                <el-option
                  v-for="item in adminroleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="img"
            label="图片"
            align="center"
            min-width="160"
          >
            <template slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                accept="image/*"
                :headers="headers"
                action="https://api.yhjerp.com/api/Admin/uploads"
                :show-file-list="false"
                :disabled="!!detailForm.id"
                :before-upload="beforeUpload"
                :on-success="
                  (res, file) => {
                    if (loadingInstance) {
                      loadingInstance.close();
                    }
                    scope.row.image = res.data;
                  }
                "
              >
                <img
                  v-if="scope.row.image"
                  :src="scope.row.image"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            align="center"
            min-width="160"
          >
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.remark" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="80">
            <template slot-scope="scope">
              <div class="flex">
                <span @click="deleteItem(scope.row, scope.$index)">
                  <i
                    class="el-icon-delete"
                    style="fontwarning-size: 20px; cursor: pointer"
                  ></i>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="hj">
        <span
          >默认工价合计：<b>{{ totalPrice }}</b></span
        >
        <span
          >合计工序数：<b>{{ dataList2.length }}</b></span
        >
      </div>
      <el-button type="success" @click="addFn" plain style="width: 100%"
        >添加工序</el-button
      >
      <span slot="footer" class="dialog-footer">
        <el-button class="lgm-reset-btn" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" @click="dialogConfirm" class="lgm-search-btn"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { processs_template, adminrole } from "@/api/admin";
import DownloadExcel from "vue-json-excel";
import { getToken } from "@/utils/auth";
import { Loading } from "element-ui";
export default {
  name: "PieceSalaryDetail",
  components: {
    "download-excel": DownloadExcel,
  },
  props:['isSelct'],
  data() {
    return {
      dataList: [],
      page: 1,
      page_size: 10,
      total: 0,
      loadingInstance: null,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      sizeList: [],
      customColumn: [],
      dataList2: [
        {
          process_name: "",
          price: "",
          display_price: 1,
          remark: "",
          image: "",
          size_id: "",
          post_ids: [],
        },
      ],
      modeDisabled: false,
      tablePrice: "价格",
      dialogVisible: false,
      totalNum: 0, // 总件数
      totalMoney: 0, // 总金额
      yjs: 0, // 已结算
      wjs: 0, // 未结算

      searchParams: {
        department: "",
        time1: "",
        type: "",
        code: "",
        code2: "",
        status: 0,
      },
      departmentList: [
        {
          value: "部门1",
          label: "部门1",
        },
        {
          value: "部门2",
          label: "部门2",
        },
      ],
      gwList: [],
      dataList: [],
      json_fields: {
        名称: "name",
        工序数: "sort",
        工价: "price",
      },
      detailForm: {
        unit_price_mode: 0,
        name: "",
        id: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入模版名称",
            trigger: "blur",
          },
        ],
      },
      props: {
        checkStrictly: true,
      },
      adminroleList: [],
      options: [
        {
          value: 1,
          label: "顶级部门",
          children: [
            {
              value: 2,
              label: "部门3",
            },
            {
              value: 3,
              label: "部门4",
            },
          ],
        },
      ],
      selectData: [],
      headerTitle: "",
      gwList: [],
      totalPrice: 0,
    };
  },

  watch: {
    customColumn(data) {
      if (data.length === 0) {
        this.modeDisabled = false;
      } else {
        this.modeDisabled = true;
      }
    },
  },
  created() {
    this.adminroleFn();
    this.adminroleListFn();
    this.gwList = [];
    this.sizeList = [
      {
        item: "32",
        isActive: false,
      },
      {
        item: "31",
        isActive: false,
      },
      {
        item: "30",
        isActive: false,
      },
      {
        item: "29",
        isActive: false,
      },
      {
        item: "28",
        isActive: false,
      },
      {
        item: "27",
        isActive: false,
      },
      {
        item: "26",
        isActive: false,
      },
      {
        item: "4XL",
        isActive: false,
      },
      {
        item: "3XL",
        isActive: false,
      },
      {
        item: "2XL",
        isActive: false,
      },
      {
        item: "XL",
        isActive: false,
      },
      {
        item: "L",
        isActive: false,
      },
      {
        item: "M",
        isActive: false,
      },
      {
        item: "S",
        isActive: false,
      },
      {
        item: "XS",
        isActive: false,
      },
    ];
  },
  computed: {},
  methods: {
    isSelctFn(index,row){
      this.$emit('isSelctFn',row)

},
    totalPriceFn() {
      this.totalPrice = this.dataList2.reduce(
        (sum, item) => sum + (item.price || 0),
        0
      );
    },

    addFn() {
      this.dataList2.push({
        process_name: "",
        price: "",
        display_price:1,
        remark: "",
        image: "",
        size_id: "",
        post_ids: [],
      });
    },
    beforeUpload() {
      // 显示 loading
      this.loadingInstance = Loading.service({
        text: "上传...",
        background: "rgba(0, 0, 0, 0.7)", // 自定义 loading 背景色
      });
    },
    deleteItem(e, index) {
      this.dataList2.splice(index, 1);
    },

    reset() {
      for (let i in this.searchParams) {
        this.searchParams[i] = null;
      }
      this.page = 1;
      this.adminroleListFn();
    },
    clickEdit(idx, item) {
      this.detailForm.id = item.id;
      this.detailForm.sort = item.sort;
      this.detailForm.admin = item.is_admin == 1 ? true : false;
      this.detailForm.sf = item.is_saofei == 1 ? true : false;
      this.detailForm.name = item.name;
      this.dialogVisible = true;
      this.selectedValues = [];
      if (item.menu_id_list) {
        item.menu_id_list.forEach((e) => {
          this.selectedValues.push(JSON.parse(e));
        });
      }
      this.$forceUpdate();
    },

    handleSizeChange(value) {
      this.page_size = value;
      this.adminroleListFn();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.adminroleListFn();
    },
    adminroleListFn(page) {
      processs_template(
        {
          page: this.page,
          page_size: this.page_size,
          name: this.searchParams.code2,
        },
        "GET"
      ).then((e) => {
        console.log(e.data.list);
        this.dataList = e.data.list;
        this.total = e.data.total;
      });
    },

    clickItem() {
      console.log(456);
    },

    addList() {
      this.detailForm = {
        id: "",
        unit_price_mode: 0,
        name: "",
      };
      this.dataList2 = [
        {
          process_name: "",
          price: "",
          display_price: 1,
          remark: "",
          image: "",
          size_id: "",
          post_ids: [],
        },
      ];
      this.dialogVisible = true;
    },

    // 选择尺码
    clickTableAddSize(index) {
      if (this.detailForm.unit_price_mode === "2") {
        if (!this.sizeList[index].disabled) {
          this.sizeList[index].isActive = !this.sizeList[index].isActive;
        }
      } else {
        if (!this.gwList[index].disabled) {
          this.gwList[index].isActive = !this.gwList[index].isActive;
        }
      }
    },
    // 删除尺码
    deleteTableColumn(row, index) {
      this.customColumn.splice(index, 1);

      // 判断是不是多尺码 31,32
      let sizeArr = row.size.split(",");

      for (let i in this.sizeList) {
        let item = this.sizeList[i];
        for (let k in sizeArr) {
          let item2 = sizeArr[k];
          if (item.item === item2) {
            item.isActive = false;
            item.disabled = false;
            break;
          }
        }
      }
    },
    // 确定尺码
    selectSize() {
      let arr = [];
      for (let i in this.sizeList) {
        let item = this.sizeList[i];
        if (item.isActive) {
          item["disabled"] = true;
          arr.push(item.item);
        }
      }

      let columnTitle = arr.join(",");
      let obj = {
        size: columnTitle,
        id: columnTitle,
        value: 0,
      };

      this.customColumn.push(obj);

      this.modeDisabled = true;

      // 重置选择
      for (let i in this.sizeList) {
        this.sizeList[i].isActive = false;
      }
    },
    selectGw() {
      let arr = [];
      for (let i in this.gwList) {
        let item = this.gwList[i];
        if (item.isActive) {
          item["disabled"] = true;
          arr.push(item.item);
        }
      }

      let columnTitle = arr.join(",");
      let obj = {
        size: columnTitle,
        id: columnTitle,
        value: 0,
      };

      this.customColumn.push(obj);

      this.modeDisabled = true;

      // 重置选择
      for (let i in this.gwList) {
        this.gwList[i].isActive = false;
      }
    },

    handleDownload(index, item) {
      this.selectData[0] = item;
      this.headerTitle = item.name;
    },
    adminroleFn() {
      adminrole(
        {
          page: 1,
          page_size: 1000,
        },
        "GET"
      ).then((e) => {
        this.adminroleList = e.data.list;
      });
    },
    dialogConfirm() {
      if (this.detailForm.id) {
        this.dataList2.forEach((e) => {
          delete e.post_list;
        });
      }

      processs_template(
        {
          name: this.detailForm.name,
          unit_price_mode: this.detailForm.unit_price_mode,
          processs: this.dataList2,
        },
        this.detailForm.id ? "PATCH" : "POST",
        this.detailForm.id
      ).then((e) => {
        this.dialogVisible = false;
        this.reset();
      });
    },
    reset() {
      for (let i in this.searchParams) {
        this.searchParams[i] = null;
      }

      this.adminroleListFn();
    },
    clickItem() {
      console.log(456);
    },
    handleEdit(idx, item) {
      if (item.detail && item.detail.length) {
        item.detail.forEach((e) => {
          e.post_ids = e.post_ids.map(Number);
        });
      }
      this.dataList2 = item.detail;
      this.detailForm = item;
      this.dialogVisible = true;
    },
    handleDelete(index, item) {
      this.$confirm("是否确认工序模版?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "submitDeleteBtn",
        type: "warning",
      }).then(() => {
        processs_template({}, "DELETE", item.id).then((e) => {
          this.reset();
        });

        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

::v-deep .isActive {
  background-color: $btnColor !important;
  color: #fff;
}

::v-deep .isDisabled {
  color: #ccc;

  &:hover {
    cursor: not-allowed;
  }
}

.hj {
  padding: 10px 0;

  span {
    margin-right: 20px;
  }
}

.app-container {
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

.detail-table {
  overflow-y: scroll;
  max-height: 300px;
}
</style>
