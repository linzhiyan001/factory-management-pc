<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="100px" class="search-form">
                    <el-form-item label="财务报表">
                        <el-select v-model="searchParams.department">
                            <el-option label="回款单数据" value="1" />
                            <el-option label="付款单数据" value="2" />
                            <el-option label="开票数据" value="3" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    
                    <el-form-item label="客户名称">
                        <el-input v-model="searchParams.code" placeholder="请输入供应商或客户名称"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                    </el-row>
                </el-form>
            </div>

            <div class="info">
                <div class="item">
                    <p class="title">回款统计</p>
                    <div class="box">
                        0
                    </div>
                </div>
                <div class="item">
                    <p class="title">付款统计</p>
                    <div class="box">
                        5
                    </div>
                </div>
                <div class="item">
                    <p class="title">开票统计</p>
                    <div class="box">
                        5
                    </div>
                </div>
            </div>

            <div class="table-header-btn">
                <el-button type="success" plain size="small" class="lgm-add-btn" icon="el-icon-plus" @click="addList">新增</el-button>
                <el-button type="danger" plain size="small" icon="el-icon-delete" @click="deleteList">删除</el-button>
            </div>

            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="number" label="付款单号" align="center"></el-table-column>
                    <el-table-column prop="code" label="付款时间" align="center"></el-table-column>
                    <el-table-column prop="cpfl" label="供应商名称" align="center"></el-table-column>
                    <el-table-column prop="cpmc" label="销售合同编号" align="center" min-width="200"></el-table-column>
                    <el-table-column prop="size" label="合同金额" align="center"></el-table-column>
                    <el-table-column prop="color" label="未回款金额" align="center"></el-table-column>
                    <el-table-column prop="ggxh" label="回款类型" align="center"></el-table-column>
                    <el-table-column prop="dw" label="支付方式" align="center"></el-table-column>
                    <el-table-column prop="kcsl" label="备注" align="center" min-width="200"></el-table-column>

                    <el-table-column fixed="right" label="操作" align="center" width="380">
                        <template slot-scope="scope">
                            <div class="flex">
                                <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit"></i> 修改
                                </el-button>
                                <el-button size="mini" type="danger" plain @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-delete"></i> 删除
                                </el-button>
                                <el-button size="mini" type="info" plain @click="handleEdit(scope.$index, scope.row)">
                                    查看邮件
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="lgm-page-wrap">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StyleManage',
    data() {
        return {
            searchParams: {
                styleName: ''
            },
            srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
            dataList: [
                {
                    avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    number: '000001',
                    code: '001',
                    cpfl: '连衣裙',
                    cpmc: '裤子',
                    color: '黑色',
                    size: 'L',
                    ggxh: '005',
                    dw: '条',
                    kcsl: '100',
                    ckdj: '20.00',
                    cksl: 100,
                    sfsh: '否',
                    time: '2024-06-18',
                },
                
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
    }

    .lgm-search {
        ::v-deep input {
            width: 210px;
        }
    }

    .info {
        display: flex;
        margin-bottom: 20px;
        .item {
            width: 220px;
            padding: 8px 15px;
            border: 1px solid #eee;
            border-radius: 6px;
            margin-right: 30px;
            .title {
                margin-bottom: 6px;
            }
            .box {
                width: 100%;
                height: 100px;
                border-radius: 6px;
                background-color: #fdf0e5;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $fontColor;
                font-weight: bold;
                font-size: 18px;
            }
        }
    }

}
</style>
