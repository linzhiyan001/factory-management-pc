<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="部位">
                        <el-input v-model="searchParams.code2" placeholder="请输入部位查询"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                    </el-row>
                </el-form>
            </div>
            <div class="table-header-btn">
                <el-button type="success" plain size="small" class="lgm-add-btn" icon="el-icon-plus" @click="addList">新增</el-button>
                <el-button type="danger" plain size="small" icon="el-icon-delete" @click="deleteList">删除</el-button>
            </div>
            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="name" label="模版名称" align="center"></el-table-column>
                    <el-table-column prop="part" label="部位" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <div class="flex">
                                <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <!-- 修改 -->
        <el-dialog title="部位模版" :visible.sync="dialogVisible" center width="500px">
            <el-form :model="detailForm" :rules="rules" ref="ruleForm" label-width="100px" class="detailForm">
                <el-form-item label="模版名称" prop="name" style="width: 100%;">
                    <el-input v-model="detailForm.name"></el-input>
                </el-form-item>
                <el-form-item label="部位" prop="part" style="width: 100%;">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button class="lgm-reset-btn" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogConfirm" class="lgm-search-btn">确定</el-button>
            </span>
        </el-dialog>
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
                cities: ['裤右后', '裤左后'],
                dialogVisible: false,
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
                dataList: [{
                        id: '1',
                        name: '模版1',
                        part: '裤右后'
                    },
                    {
                        id: '2',
                        name: '模版2',
                        part: '裤左后'
                    }
                ],
                detailForm: {
                    name: '',
                    part: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入分类', trigger: 'blur' },
                    ],
                    part: [
                        { required: true, message: '请选择部位', trigger: 'blur' },
                    ]
                },
                props: {
                    checkStrictly: true
                },
                options: [{
                    value: 1,
                    label: "顶级部门",
                    children: [{
                            value: 2,
                            label: "部门3",
                        },
                        {
                            value: 3,
                            label: "部门4",
                        }
                    ]
                }]

            }
        },
        methods: {
            dialogConfirm() {
                this.dialogVisible = false
            },
            reset() {
                for (let i in this.searchParams) {
                    this.searchParams[i] = null
                }
            },
            handleEdit() {
                this.dialogVisible = true
            },
            handleDelete(index) {
                this.$confirm('是否确认删除选中的部位?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'submitDeleteBtn',
                    type: 'warning'
                }).then(() => {
                    this.dataList.splice(index, 1)

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            },
            addList() {
                this.dialogVisible = true
            },
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