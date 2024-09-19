<template>
    <div class="app-container">

        <el-row :gutter="20">
            <el-col :span="9">
                <div class="line-order">
                    <p class="title">在线生产订单</p>
                    <div class="wrap">
                        <div class="item">
                            <div class="icon">
                                <i class="el-icon-document"></i>
                            </div>
                            <p class="item-title">款数</p>
                            <p class="num">{{ ks }}</p>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <el-image :src="require('@/assets/images/index_02.png')" />
                            </div>
                            <p class="item-title">床次</p>
                            <p class="num">{{ cc }}</p>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <el-image :src="require('@/assets/images/index_03.png')" />
                            </div>
                            <p class="item-title">待生产(件)</p>
                            <p class="num">{{ dsc }}</p>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="5">
                <div class="line-order">
                    <p class="title">当日完成件数</p>
                    <div class="item2">
                        <p class="num">{{ drwcjs }}</p>
                        <p class="text">完成件数</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="line-order">
                    <p class="title">今日产量</p>
                    <div class="item2">
                        <p class="num">{{ jrcl }}</p>
                        <p class="text">完成工序数</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="line-order">
                    <p class="title">昨日产量</p>
                    <div class="item2">
                        <p class="num">{{ zrcl }}</p>
                        <p class="text">完成件数</p>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="lgm-search">
            <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                <el-form-item label="部门">
                    <el-select v-model="searchParams.department" placeholder="请选择部门">
                        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="款式名称">
                    <el-input v-model="searchParams.name" placeholder="请输入款式、编号、订单"></el-input>
                </el-form-item>
                <el-form-item label="裁床日期">
                    <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="交货日期">
                    <el-date-picker v-model="searchParams.time2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-row>
                    <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                </el-row>

            </el-form>
        </div>

        <div class="content">
            <el-row :gutter="20">
                <el-col :span="12" v-for="item of dataList" :key="item.id">
                    <div class="item" @click="clickItem">
                        <div class="top">
                            <div class="img" @click.stop="clickImage">
                                <el-image :src="item.avatar" fit="cover" :preview-src-list="srcList" style="width: 80px; height: 80px;" />
                            </div>
                            <div class="text-wrap">
                                <div class="text-item">
                                    <p>款式编号：{{ item.code }}</p>
                                    <p>裁床日期：{{ item.ccrq }}</p>
                                    <p>扎数：{{ item.zs }}</p>
                                    <p>颜色：{{ item.color }}</p>
                                    <p>客户名：{{ item.name }}</p>
                                    <p>制单号：{{ item.orderNumber }}</p>
                                </div>
                                <div class="text-item">
                                    <p>床号：{{ item.ch }}</p>
                                    <p>交货日期：{{ item.jhrq }}</p>
                                    <p>件数：{{ item.js }}</p>
                                    <p>尺码：{{ item.size }}</p>
                                    <p>是否收货：{{ item.sfsh }}</p>
                                    <p class="finish-num">完成件数：{{ item.finishNumber }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <el-progress :percentage="item.finishNumber / item.js * 100" color="#ed6d00"></el-progress>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </div>

        <el-dialog title="编辑" :visible.sync="dialogVisible" center :modal-append-to-body='false' show-close fullscreen width="100%" custom-class="edit-dialog-wrap">
            <div class="dialog-content">
                <el-row>
                    <el-col :span="6">制单号：1111222</el-col>
                    <el-col :span="6">床号：2</el-col>
                    <el-col :span="6">款号：牛仔裤</el-col>
                    <el-col :span="6">尺码：29,31</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">颜色：黑色</el-col>
                    <el-col :span="6">总扎数：6</el-col>
                    <el-col :span="6">总件数：500</el-col>
                </el-row>
                <div class="number">
                    <div style="width: 130px;">完成数：10</div>
                    <div class="progress">
                        <el-progress :percentage="90" color="#ed6d00"></el-progress>
                    </div>
                </div>
            </div>

            <div class="dialog-content">
                <el-table :data="dataList2" :span-method="objectSpanMethod" border>
                    <el-table-column prop="color" label="颜色" align="center"></el-table-column>
                    <el-table-column prop="name" label="尺码" align="center"></el-table-column>
                    <el-table-column prop="amount1" label="29" align="center"></el-table-column>
                    <el-table-column prop="amount1" label="31" align="center"></el-table-column>
                    <el-table-column prop="amount2" label="合计" align="center"></el-table-column>
                </el-table>
            </div>

            <div class="tabs-content">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="按扎号" name="0">
                        <div class="index-1">
                            <div class="item" v-for="(item, index) of zhList" :key="item.id">
                                <div class="line-1">
                                    <span>扎号：{{ item.id }}</span>
                                    <el-button type="danger" plain size="small" @click="editNumber(item)">修改件数</el-button>
                                </div>
                                <div class="line-1">
                                    <span>颜色：{{ item.color }}</span>
                                    <span>尺码：{{ item.size }}</span>
                                    <span>件数：{{ item.number }}</span>
                                </div>
                                <div class="line-1">
                                    <span>收货件数：<b>{{ item.shNumber }}</b></span>
                                    <span>是否收货：<b>{{ item.isSh }}</b></span>
                                </div>
                                <div class="line-1">
                                    <span style="width: 150px;">工序完成比：{{ item.gswcb }}</span>
                                    <div style="width: calc(100% - 150px);">
                                        <el-progress :percentage="12" color="#ed6d00"></el-progress>
                                    </div>
                                </div>
                                <div class="line-1">
                                    <span>已完成件数：<b></b>{{ item.ywcjs }}</b></span>
                                    <span>剩余件数：<b>{{ item.syjs }}</b></span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="按工序" name="1">
                        按工序
                    </el-tab-pane>
                    <el-tab-pane label="按工序扎号" name="2">
                        按工序扎号
                    </el-tab-pane>
                    <el-tab-pane label="按工序明细" name="3">
                        按工序明细
                    </el-tab-pane>
                </el-tabs>
            </div>


            <span slot="footer" class="dialog-footer">
                <el-button class="lgm-reset-btn" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false" class="lgm-search-btn">确定</el-button>
            </span>
        </el-dialog>

        <!-- 修改件数 -->
        <el-dialog title="修改件数" :visible.sync="editDialog" width="384px" center @close="editDialogClose" custom-class="edit-dialog">
            <div class="line-1">
                <span>扎号：{{ editDialogData.id }}</span>
                <span>现有件数：{{ editDialogData.number }}</span>
            </div>

            <div>
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form" :rules="rules">
                    <el-form-item label="件数">
                        <el-input type="number" v-model="editDialogData.number"></el-input>
                    </el-form-item>
                </el-form>
            </div>


            <span slot="footer" class="dialog-footer">
                <el-button class="lgm-reset-btn" @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="editDialog = false" class="lgm-search-btn">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            editDialog: false,
            editDialogData: {},
            ks: 3,
            cc: 0,
            dsc: 0,
            drwcjs: 0,
            jrcl: 0,
            zrcl: 0,
            searchParams: {
                department: '',
                name: '',
                time1: '',
                time2: ''
            },
            departmentList: [
                { value: '部门1', label: '部门1' },
                { value: '部门2', label: '部门2' }
            ],
            srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
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
            ],
            dataList2: [
                {
                    color: '黄色',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    color: '黄色',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    color: '黄色',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    color: '黑色',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    color: '黑色',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    color: '黑色',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }
            ],
            dialogVisible: false,
            activeName: '0',
            zhList: [
                {
                    id: 1,
                    color: '黑色',
                    size: 31,
                    number: 400,
                    shNumber: 0,
                    isSh: '否',
                    gswcb: 0,
                    ywcjs: 0,
                    syjs: 400
                },
                {
                    id: 2,
                    color: '红色',
                    size: 31,
                    number: 400,
                    shNumber: 0,
                    isSh: '否',
                    gswcb: 0,
                    ywcjs: 0,
                    syjs: 400
                },
                {
                    id: 3,
                    color: '蓝色',
                    size: 31,
                    number: 400,
                    shNumber: 0,
                    isSh: '否',
                    gswcb: 0,
                    ywcjs: 0,
                    syjs: 400
                },
                {
                    id: 41,
                    color: '黄色',
                    size: 31,
                    number: 400,
                    shNumber: 0,
                    isSh: '否',
                    gswcb: 0,
                    ywcjs: 0,
                    syjs: 400
                }
            ],
            rules: {
                number: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        editNumber(item) {
            this.editDialogData = item
            this.editDialog = true
        },
        editDialogClose() {
            this.editDialogData = {}
        },
        clickImage() {
            console.log(123)
        },
        clickItem() {
            this.dialogVisible = true
        },
        handleCurrentChange() {

        },
        handleSizeChange() {

        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 3 === 0) {
                    return {
                        rowspan: 3,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";


.app-container {
    ::v-deep .el-dialog__wrapper {
        position: absolute !important;
    }

    .tabs-content {
        .index-1 {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .item {
                width: calc(50% - 10px);
                border-radius: 6px;
                background-color: #fff;
                padding: 5px;
                margin-bottom: 15px;

                .line-1 {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;

                    b {
                        color: $fontColor;
                    }
                }
            }
        }
    }

    .dialog-content {
        width: 100%;
        padding: 10px 5px;
        background-color: #fff;
        border-radius: 6px;
        margin-bottom: 20px;

        .number {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;

            .progress {
                flex: 1;
                margin-left: 20px;

            }
        }
    }

    ::v-deep .edit-dialog-wrap {
        background-color: #f0f2f5;

        .el-row {
            border-bottom: 1px solid #eee;
        }

        .el-col {
            padding: 8px 0;
        }
    }

    ::v-deep .edit-dialog {

        .line-1 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
    }

    .content {
        .item {
            border-radius: 6px;
            background-color: #fff;
            padding: 12px;
            margin-bottom: 20px;
            cursor: pointer;

            .top {
                display: flex;

                .img {
                    width: 80px;
                    height: 80px;
                }

                .text-wrap {
                    display: flex;
                    margin-left: 10px;
                    width: 100%;

                    .text-item {
                        width: 50%;

                        p {
                            line-height: 20px;
                        }

                        .finish-num {
                            color: $fontColor;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    .line-order {
        height: 132px;
        background-color: #fff;
        padding: 10px;
        border-radius: 6px;
        font-size: 12px;

        .wrap {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        .item2 {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fff8f2;
            border-radius: 6px;
            height: 94px;
            margin-top: 5px;

            .num {
                font-size: 20px;
                font-weight: bold;
                color: $fontColor;
                margin-bottom: 6px;
            }
        }

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .icon {
                width: 50px;
                height: 50px;
                border-radius: 10px;
                background-color: pink;
                display: flex;
                justify-content: center;
                align-items: center;
                background-image: linear-gradient(45deg, #ff9700, #ed1c24);
                font-size: 28px;
                color: #fff;

                ::v-deep img {
                    width: 28px;
                    height: 28px;
                }
            }

            .item-title {
                margin: 7px 0;
            }

            .num {
                font-size: 14px;
                color: $fontColor;
                font-weight: bold;
            }
        }
    }
}
</style>
