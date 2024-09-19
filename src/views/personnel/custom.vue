<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="客户">
                        <el-input v-model="searchParams.customer_name" placeholder="请输入客户名称查询"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search" @click="seach">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                    </el-row>
                </el-form>
            </div>
            <div class="table-header-btn">
                <el-button type="success" plain size="small" class="lgm-add-btn" icon="el-icon-plus" @click="addList">新增</el-button>
            </div>
            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column prop="customer_name" label="客户名称" align="center"></el-table-column>
                    <el-table-column prop="contact_person" label="联系人" align="center"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                    <el-table-column prop="address" label="企业地址" align="center"></el-table-column>
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
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>


        <!-- 修改 -->
        <el-dialog title="岗位" :visible.sync="dialogVisible" center width="500px">
            <el-form :model="detailForm" :rules="rules" ref="ruleForm" label-width="100px" class="detailForm">
                <el-form-item label="客户名称" prop="customer_name" style="width: 100%;">
                    <el-input v-model="detailForm.customer_name"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact_person" style="width: 100%;">
                    <el-input v-model="detailForm.contact_person"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone" style="width: 100%;">
                    <el-input v-model="detailForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address" style="width: 100%;">
                    <el-input v-model="detailForm.address"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark" style="width: 100%;">
                    <el-input type="textarea" v-model="detailForm.remark"></el-input>
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
    import {
		customerAdmin,
	} from "@/api/admin";
    export default {
        name: 'PieceSalaryDetail',
        components: {
            'select-bed': SelectBed,
            'select-style': SelectStyle
        },
        data() {
            return {
                dataList: [],
				page: 1,
				page_size: 10,
				total: 0,
                totalNum: 0, // 总件数
                totalMoney: 0, // 总金额
                yjs: 0, // 已结算
                wjs: 0, // 未结算

                searchParams: {
                    customer_name: '',
                   
                },
                customerAdminList: [
                    { value: '部门1', label: '部门1' },
                    { value: '部门2', label: '部门2' }
                ],
                gwList: [
                    { value: '平车', label: '平车' },
                    { value: '打边', label: '打边' }
                ],
                dataList: [],
                detailForm: {
                    customer_name: '',
                    contact_person: '',
                    phone: '',
                    address: '',
                    remark: '',
                    id:""
                },
                rules: {
                    customer_name: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                    ]
                },
                dialogVisible: false

            }
        },
        created() {
			this.customerAdminFn()
		},
        methods: {




            handleSizeChange(value) {
				this.page_size = value
				this.customerAdminFn()
			},
			handleCurrentChange(value) {
				this.page = value
				this.customerAdminFn()
			},
			customerAdminFn(page) {
				customerAdmin({
					page: this.page,
					page_size: this.page_size,
					...this.searchParams
				}, 'GET').then((e) => {
					console.log(e.data.list)
					this.dataList = e.data.list
					this.total = e.data.total

				})
			},
			dialogConfirm() {
				
				customerAdmin(this.detailForm, this.detailForm.id ? 'PATCH' : 'POST',this.detailForm.id).then((e) => {
					this.dialogVisible = false
					this.seach()

				})
			},
			seach() {
				this.page = 1
				this.customerAdminFn()
			},
			reset() {
				for (let i in this.searchParams) {
					this.searchParams[i] = null
				}
				this.seach()
			},
			handleDelete(index, item) {
                this.$confirm('是否确认删除选中的客户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					confirmButtonClass: 'submitDeleteBtn',
					type: 'warning'
				}).then(() => {
					customerAdmin({}, 'DELETE', item.id).then((e) => {
						this.seach()

					})

					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
			},
			addList() {
				this.detailForm = {
					customer_name: '',
                    contact_person: '',
                    phone: '',
                    address: '',
                    remark: '',
                    id:""

				}
				this.dialogVisible = true
			},
            handleEdit(idx, item) {
				this.detailForm=item
			
				this.dialogVisible = true
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