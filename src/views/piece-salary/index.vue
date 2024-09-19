<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="扫菲日期">
                        <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="加工厂">
                        <el-select v-model="searchParams.department" placeholder="请选择加工厂">
                            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="统计类型">
                        <el-select v-model="searchParams.department" placeholder="请选择加工厂">
                            <el-option label="按工资" value="1" />
                            <el-option label="按床数" value="2" />
                            <el-option label="按款号" value="3" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="款号">
                        <select-style></select-style>
                    </el-form-item>

                    <el-form-item label="床次">
                        <select-bed></select-bed>
                    </el-form-item>

                    <el-row>
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                        <el-button type="success">
                            <el-image :src="require('@/assets/images/export.png')" class="export-icon"></el-image>
                            导出
                        </el-button>
                    </el-row>

                </el-form>
            </div>

        </div>

        <div class="content">
            <div class="info">
                <div class="item">
                    计件总额
                    <span>{{ totalNum }}</span>
                </div>
                <div class="item">
                    已结算
                    <span>{{ totalNum }}</span>
                </div>
                <div class="item">
                    可结算
                    <span>￥{{ totalMoney }}</span>
                </div>
                <div class="item">
                    待结算
                    <span>￥{{ yjs }}</span>
                </div>
                <div class="item">
                    完成工序数
                    <span>￥{{ wjs }}</span>
                </div>
                <div class="item">
                    无单价工序数
                    <span>￥{{ wjs }}</span>
                </div>
            </div>

            <div class="tips">
                可结算表示已收货，待结算表示已扫菲但未收货
            </div>
        </div>

        <div class="content">
            <div class="table-header-btn">
                <el-button type="success" size="small" @click="addList">批量结算</el-button>
                <el-button type="warning" size="small" @click="deleteList">批量取消结算</el-button>
            </div>
            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="_id" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="name" label="完成工序数" align="center"></el-table-column>
                    <el-table-column prop="nikename" label="无单件工序数" align="center"></el-table-column>
                    <el-table-column prop="nikename" label="￥已结算" align="center"></el-table-column>
                    <el-table-column prop="idcard" label="￥可结算" align="center"></el-table-column>
                    <el-table-column prop="intro" label="￥待结算" align="center"></el-table-column>
                    <el-table-column prop="level" label=" ￥金额" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="380">
                        <template slot-scope="scope">
                            <div class="flex">
                                <el-button size="mini" type="primary" plain @click="handleDelete(scope.$index, scope.row)">查看明细</el-button>
                                <el-button size="mini" type="success" plain icon="el-icon-printer" @click="handleDelete(scope.$index, scope.row)">打印工资单</el-button>
                                <el-button size="mini" type="warning" plain @click="handleDelete(scope.$index, scope.row)">结算</el-button>
                                <el-button size="mini" type="info" plain @click="handleDelete(scope.$index, scope.row)">取消结算</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import SelectBed from '@/components/SelectBed'
import SelectStyle from '@/components/SelectStyle'
export default {
    name: 'PieceSalary',
    components: {
        'select-bed': SelectBed,
        'select-style': SelectStyle
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
            dataList: [
                {
                    avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    id: '001',
                    code: '001',
                    ccrq: '2024-05-04',
                    zs: 2,
                    color: '黑色',
                    name: '无',
                    orderNumber: '123332',
                    ch: '1',
                    time1: '2024-06-04',
                    js: 100,
                    size: '29,30',
                    sfsh: '否',
                    finishNumber: 10,
                    percentage: ''
                }
            ]

        }
    },
    methods: {
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
