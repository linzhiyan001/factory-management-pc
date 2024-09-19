<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="扫菲日期">
                        <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-select v-model="searchParams.department" placeholder="请选择部门">
                            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工">
                        <el-select v-model="searchParams.department" placeholder="请选择员工">
                            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-row>
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                        <el-button type="success">
                            <el-image :src="require('@/assets/images/export.png')" class="export-icon"></el-image>
                            导出
                        </el-button>
                        <el-button type="info">打印工资条</el-button>
                    </el-row>
                </el-form>
            </div>

            <div class="info">
                <p>总额:21746</p>
                <p>可结算:0</p>
                <p>待结算:0</p>
                <p>已结算:0</p>
                <p>基本薪资:113</p>
                <p>全勤奖:21321</p>
                <p>奖金:21</p>
                <p>罚款:123</p>
                <p>借款:12</p>
                <p>交通补贴:213</p>
            </div>

            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column prop="_id" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="name" label="电话" align="center" min-width="150"></el-table-column>
                    <el-table-column prop="nikename" label="总额" align="center" min-width="150"></el-table-column>
                    <el-table-column prop="nikename" label="可结算" align="center" min-width="150"></el-table-column>
                    <el-table-column prop="idcard" label="待结算" align="center" min-width="150"></el-table-column>
                    <el-table-column prop="intro" label="已结算" align="center" min-width="150"></el-table-column>
                    <el-table-column prop="level" label="基本薪资" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="全勤奖" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="餐补" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="奖金" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="罚款" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="借款" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="level" label="交通餐补" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.styleName"></el-input>
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
    name: 'PieceSalaryDetail',
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
                code2: '',
                status: 0
            },
            departmentList: [
                { value: '部门1', label: '部门1' },
                { value: '部门2', label: '部门2' }
            ],
            gwList: [
                { value: '平车', label: '平车' },
                { value: '打边', label: '打边' }
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
        },
        handleDelete() { },
        addList() { },
        deleteList() {}
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
        margin: 20px 0;

        p {
            margin-right: 30px;
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
