<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="外发日期">
                        <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="加工厂">
                        <el-select v-model="searchParams.department" placeholder="请选择加工厂">
                            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否收货">
                        <el-select v-model="searchParams.department" placeholder="请选择加工厂">
                            <el-option label="全部" value="" />
                            <el-option label="未收货" value="1" />
                            <el-option label="部分收货" value="2" />
                            <el-option label="以收货" value="3" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否结算">
                        <el-select v-model="searchParams.department" placeholder="请选择加工厂">
                            <el-option label="全部" value="" />
                            <el-option label="未结算" value="1" />
                            <el-option label="部分结算" value="2" />
                            <el-option label="全部结算" value="3" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="款号">
                        <select-style></select-style>
                    </el-form-item>

                    <el-form-item label="床次">
                        <select-bed></select-bed>
                    </el-form-item>

                    <el-row style="display: flex; height: 40px;">
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                        <div style="margin-left: 10px;">
                            <download-excel ref="export" class="export-excel-wrapper" :data="dataList2" :fields="json_fields" header="title" name="外发统计.xls">
                                <el-button type="success">
                                    <el-image :src="require('@/assets/images/export.png')" class="export-icon"></el-image>
                                    导出
                                </el-button>
                            </download-excel>
                        </div>
                    </el-row>

                </el-form>
            </div>
        </div>

        <div class="content">
            <div class="info">
                <div class="item">
                    总件数
                    <span>{{ totalNum }}</span>
                </div>
                <div class="item">
                    总金额
                    <span>￥{{ totalMoney }}</span>
                </div>
                <div class="item">
                    已结算
                    <span>￥{{ yjs }}</span>
                </div>
                <div class="item">
                    未结算
                    <span>￥{{ wjs }}</span>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column prop="jgc" label="加工厂" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="kh" label="款号" align="center"></el-table-column>
                    <el-table-column prop="cc" label="床次" align="center"></el-table-column>
                    <el-table-column prop="wfsj" label="外发时间" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="jhsj" label="交货时间" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="shsj" label="收货时间" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="dj" label="单价" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="fhzs" label="发货总数" align="center"></el-table-column>
                    <el-table-column prop="shjs" label="收货件数" align="center"></el-table-column>
                    <el-table-column prop="wwcjs" label="未完成件数" align="center" min-width="120"></el-table-column>
                    <el-table-column prop="jgf" label="￥加工费" align="center"></el-table-column>
                    <el-table-column prop="yjs" label="￥已结算" align="center"></el-table-column>
                    <el-table-column prop="wjs" label="￥未结算" align="center">
                    </el-table-column>
                    <el-table-column prop="sfjs" label="是否结算" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini">未结算</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jssj" label="结算时间" align="center" min-width="120"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { outsource } from "@/api/admin";

    import SelectBed from '@/components/SelectBed'
    import SelectStyle from '@/components/SelectStyle'
    import DownloadExcel from 'vue-json-excel'
    export default {
        name: 'AssignCount',
        components: {
            'select-bed': SelectBed,
            'select-style': SelectStyle,
            'download-excel': DownloadExcel
        },
        data() {
            return {
                totalNum: 0, // 总件数
                totalMoney: 0, // 总金额
                yjs: 0, // 已结算
                wjs: 0, // 未结算

                searchParams: {
                    department: '',
                    time1: '',
                    type: '',
                    code: '',
                    code2: ''
                },
                departmentList: [
                    { value: '部门1', label: '部门1' },
                    { value: '部门2', label: '部门2' }
                ],
                dataList: [{
                        jgc: '深圳',
                        kh: '碎花',
                        cc: '1',
                        wfsj: '2024-05-04',
                        jhsj: '2024-05-04',
                        shsj: '2024-05-04',
                        dj: '1.000',
                        fhzs: '100',
                        shjs: '100',
                        wwcjs: '90',
                        jgf: '123332',
                        yjs: '100.00',
                        wjs: '100.00',
                        sfjs: '1',
                        jssj: '2024-05-11'
                    },
                    {
                        jgc: '广州',
                        kh: '碎花',
                        cc: '1',
                        wfsj: '2024-05-04',
                        jhsj: '2024-05-04',
                        shsj: '2024-05-04',
                        dj: '1.000',
                        fhzs: '100',
                        shjs: '100',
                        wwcjs: '90',
                        jgf: '123332',
                        yjs: '100.00',
                        wjs: '100.00',
                        sfjs: '1',
                        jssj: '2024-05-11'
                    }
                ],
                dataList2: [{
                        jgc: '深圳',
                        kh: '碎花',
                        cc: '1',
                        wfsj: '2024-05-04',
                        jhsj: '2024-05-04',
                        shsj: '2024-05-04',
                        dj: '1.000',
                        fhzs: '100',
                        shjs: '100',
                        wwcjs: '90',
                        jgf: '123332',
                        yjs: '100.00',
                        wjs: '100.00',
                        sfjs: '未结算',
                        jssj: '2024-05-11'
                    },
                    {
                        jgc: '广州',
                        kh: '碎花',
                        cc: '1',
                        wfsj: '2024-05-04',
                        jhsj: '2024-05-04',
                        shsj: '2024-05-04',
                        dj: '1.000',
                        fhzs: '100',
                        shjs: '100',
                        wwcjs: '90',
                        jgf: '123332',
                        yjs: '100.00',
                        wjs: '100.00',
                        sfjs: '已结算',
                        jssj: '2024-05-11'
                    }
                ],
                json_fields: {
                    "加工厂": 'jgc',
                    "款号": 'kh',
                    "床次": 'cc',
                    "外发时间": 'wfsj',
                    "交货时间": 'jhsj',
                    "收货时间": 'shsj',
                    "单价": 'dj',
                    "发货总数": 'shzs',
                    "收货件数": 'shjs',
                    "未完成件数": 'wwcjs',
                    "加工费": 'jgf',
                    "已结算": 'yjs',
                    "未结算": 'cc',
                    "是否结算": 'cc',
                    "结算时间": 'jssj'
                }
            }
        },
        mounted(){
this.outsourceFn()
        },
        methods: {
          outsourceFn(){
            outsource().then((e)=>{

            })
          },
            reset() {
                for (let i in this.searchParams) {
                    this.searchParams[i] = null
                }
            },
            clickItem() {
                console.log(456)
            }
        }

    }
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
            justify-content: space-around;
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
