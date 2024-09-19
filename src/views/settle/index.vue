<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="日期">
                        <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
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

            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column prop="_id" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="name" label="结算金额" align="center"></el-table-column>
                    <el-table-column prop="zs" label="结算时间" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settle',
    data() {
        return {
            searchParams: {
                department: '',
                time1: '',
                type: '',
                code: '',
                code2: ''
            },
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
                },
                {
                    avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    id: '002',
                    code: '001',
                    ccrq: '2024-05-04',
                    zs: 2,
                    color: '黑色',
                    name: '无',
                    orderNumber: '123332',
                    ch: '1',
                    jhrq: '2024-06-04',
                    js: 100,
                    size: '29,30',
                    sfsh: '否',
                    finishNumber: 20,
                    percentage: ''
                },
                {
                    avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    id: '003',
                    code: '001',
                    ccrq: '2024-05-04',
                    zs: 2,
                    color: '黑色',
                    name: '无',
                    orderNumber: '123332',
                    ch: '1',
                    jhrq: '2024-06-04',
                    js: 100,
                    size: '29,30',
                    sfsh: '否',
                    finishNumber: 30,
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
