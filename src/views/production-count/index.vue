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
          <el-form-item label="部门">
            <el-select
              v-model="searchParams.department"
              placeholder="请选择部门"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="扫菲日期">
            <el-date-picker
              v-model="searchParams.time1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="统计类型">
            <el-select v-model="searchParams.type" placeholder="请选择统计类型">
              <el-option
                v-for="item in tjType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="款号">
            <el-input
              v-model="searchParams.kh"
              placeholder="请输入款号"
            ></el-input>
          </el-form-item>
          <el-form-item label="床次">
            <el-input
              v-model="searchParams.cc"
              placeholder="请输入床次"
            ></el-input>
          </el-form-item>
          <el-row style="display: flex; height: 40px">
            <el-button
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

            <div style="margin-left: 10px">
              <download-excel
                ref="export"
                class="export-excel-wrapper"
                :data="dataList"
                :fields="json_fields"
                header="生产统计"
                name="生产统计.xls"
              >
                <el-button type="success">
                  <el-image
                    :src="require('@/assets/images/export.png')"
                    class="export-icon"
                  ></el-image>
                  导出
                </el-button>
              </download-excel>
            </div>
          </el-row>
        </el-form>
      </div>

      <div class="table">
        <el-table
          :data="dataList"
          border
          show-summary
          :summary-method="summary"
        >
          <el-table-column
            prop="cc"
            label="床次"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="kh"
            label="款号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="total"
            label="总件数"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { production_static } from "@/api/admin";
import DownloadExcel from "vue-json-excel";
export default {
  data() {
    return {
      searchParams: {
        cc: "",
        kh: "",
        type: "",
      },
      departmentList: [
        { value: "1", label: "部门1" },
        { value: "2", label: "部门2" },
      ],
      tjType: [
        { value: "1", label: "裁床总数" },
        { value: "2", label: "生产统计(按收货完成)" },
        { value: "3", label: "按床数" },
        { value: "4", label: "按款号" },
      ],
      dataList: [
        {
          cc: "1",
          kh: "牛仔裤",
          total: "100",
        },
        {
          cc: "2",
          kh: "碎花裙",
          total: "321",
        },
        {
          cc: "3",
          kh: "直筒裤",
          total: "200",
        },
      ],
      json_fields: {
        床次: "cc",
        款号: "kh",
        总件数: {
          field: "total",
          // 使用自定义的表头样式
          header: {
            style: "text-align: center",
          },
          // 使用自定义的单元格样式
          cell: {
            style: "text-align: center",
          },
        },
      },
    };
  },
  components: {
    "download-excel": DownloadExcel,
  },
  mounted() {
    this.production_staticFn();
  },
  methods: {
    production_staticFn() {
      production_static().then((e) => {});
    },
    reset() {
      for (let i in this.searchParams) {
        this.searchParams[i] = null;
      }
    },
    clickItem() {
      console.log(456);
    },
    summary(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-container {
  .content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .table {
    .flex {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;

      ::v-deep button {
        margin: 0;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
