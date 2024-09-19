<template>
	<div class="app-container">

		<div class="content">
			<div class="lgm-search">
				<el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
					<el-form-item label="名称">
						<el-input v-model="searchParams.code2" placeholder="请输入名称查询"></el-input>
					</el-form-item>
					<el-row>
						<el-button @click="
                    page = 1;
                    print_templateAdminFn();
                  " type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
						<el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
					</el-row>
				</el-form>
			</div>

			<div class="table-header-btn">
				<el-button type="success" plain size="small" class="lgm-add-btn" icon="el-icon-plus"
					@click="addList">新增</el-button>
			</div>
			<div class="table">
				<el-table :data="dataList" border>
					<el-table-column prop="name" label="菲票模板" align="center"></el-table-column>
					<el-table-column prop="ist" label="是否默认模板" align="center">
						<template slot-scope="scope">
							<el-button type="success" v-if="scope.row.is_default" plain size="mini">是</el-button>
							<el-button type="danger" v-else plain size="mini">否</el-button>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="400">
						<template slot-scope="scope">
							<div class="flex">
								<el-button size="mini" type="primary" plain
									@click="handleEdit(scope.$index, scope.row)">修改</el-button>
								<el-button size="mini" type="danger" plain
									@click="handleDelete(scope.$index, scope.row)">删除</el-button>
								<!-- <el-button size="mini" type="info" plain @click="handleDiy(scope.$index, scope.row)">设计模板</el-button> -->
								<!-- <el-button size="mini" type="warning" plain
									@click="handleCopy(scope.$index, scope.row)">复制模板</el-button> -->
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="lgm-page-wrap">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:page-sizes="[10, 100, 200, 300, 400]" :page-size="10"
					layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 修改 -->
		<el-dialog title="菲票模版" :visible.sync="dialogVisible" center width="500px">
			<el-form :model="detailForm" :rules="rules" ref="ruleForm" label-width="100px" class="detailForm">
				<el-form-item label="菲票模版" prop="name" style="width: 100%;">
					<el-input v-model="detailForm.name"></el-input>
				</el-form-item>
				<el-form-item label="默认模版" prop="is_default" style="width: 100%;">
					<el-switch v-model="detailForm.is_default" active-color="#ed6d00">
					</el-switch>
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
		print_templateAdmin
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
				detailForm: {
					name: '',
					is_default: true,
					id: ""
				},
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
				departmentList: [{
						value: '部门1',
						label: '部门1'
					},
					{
						value: '部门2',
						label: '部门2'
					}
				],
				gwList: [{
						value: '平车',
						label: '平车'
					},
					{
						value: '打边',
						label: '打边'
					}
				],
				dataList: [],
				dialogVisible: false,
				rules: {
					name: [{
						required: true,
						message: '请输入菲票模版',
						trigger: 'blur'
					}, ]
				},

			}
		},
		created() {
			this.print_templateAdminFn();
		},
		methods: {

			handleSizeChange(value) {
				this.page_size = value;
				this.print_templateAdminFn();
			},
			handleCurrentChange(value) {
				this.page = value;
				this.print_templateAdminFn();
			},
			print_templateAdminFn() {
				print_templateAdmin({
						page: this.page,
						page_size: this.page_size,
						...this.searchParams,
					},
					"GET"
				).then((e) => {
					console.log(e.data.list);
					this.dataList = e.data.list;
					this.total = e.data.total;
				});
			},
			dialogConfirm() {
				console.log(this.detailForm);

				let obj = this.detailForm
				obj['is_default'] = obj.is_default ? 1 : 0
				print_templateAdmin(this.detailForm, this.detailForm.id ? 'PATCH' : 'POST', this.detailForm.id).then((
				e) => {
					this.dialogVisible = false
					this.seach()

				})

			},

			seach() {
				this.page = 1;
				this.print_templateAdminFn();
			},
			reset() {
				for (let i in this.searchParams) {
					this.searchParams[i] = null;
				}
				this.seach();
			},

			addList() {
				this.detailForm = {
					name: '',
					id: "",
					is_default: true
				};
				this.dialogVisible = true;
			},
			handleEdit(idx, item) {
				item['is_default'] = item.is_default ? true : false
				this.detailForm = item;

				this.dialogVisible = true;
			},
			handleDelete(index, item) {
				this.$confirm('是否确认删除选中的菲票模版?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					confirmButtonClass: 'submitDeleteBtn',
					type: 'warning'
				}).then(() => {
					print_templateAdmin({}, 'DELETE', item.id).then((e) => {
						this.seach()

					})

					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
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