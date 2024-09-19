<template>
  <div class="app-container">
 

    <div class="content">
      <div class="info">
        <div class="item">
          计件总额
          <span>￥{{ detail.total_piecework || 0 }}</span>
        </div>
        <div class="item">
          已结算
          <span>￥{{ detail.already_settled_price|| 0  }}</span>
        </div>
        <div class="item">
          可结算
          <span>￥{{ detail.settleable_price || 0 }}</span>
        </div>
        <div class="item">
          待结算
          <span>￥{{ detail.unsettled_price || 0 }}</span>
        </div>
        <div class="item">
          完成工序数
          <span>{{ detail.complete_process_count|| 0  }}</span>
        </div>
        <div class="item">
          无单价工序数
          <span>{{ detail.unpriced_process_count || 0 }}</span>
        </div>
      </div>

      <div class="tips">可结算表示已收货，待结算表示已扫菲但未收货</div>
    </div>
  </div>
</template>

<script>
import SelectBed from "@/components/SelectBed";
import SelectStyle from "@/components/SelectStyle";
import { compensationstatic } from "@/api/admin";
export default {
  name: "MineSalary",
  components: {
    "select-bed": SelectBed,
    "select-style": SelectStyle,
  },
  data() {
    return {
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
      },
      departmentList: [
        { value: "部门1", label: "部门1" },
        { value: "部门2", label: "部门2" },
      ],
      detail:{}
    };
  },
  created() {
    this.compensationstaticFn();
  },
  methods: {
    compensationstaticFn() {
      compensationstatic({}, "GET").then((e) => {
        this.detail = e.data;
      });
    },

    reset() {
      for (let i in this.searchParams) {
        this.searchParams[i] = null;
      }
    },
    clickItem() {
      console.log(456);
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
