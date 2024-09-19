<template>
	<div class="app-container">

		<div class="content">
			<div class="lgm-search">
				<el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
					<el-form-item label="部门">
						<el-input v-model="searchParams.code2" placeholder="请输入部门名称查询"></el-input>
					</el-form-item>
					<el-row>
						<el-button type="success" @click="seach" class="lgm-search-btn"
							icon="el-icon-search">搜索</el-button>
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
					<el-table-column prop="name" label="部门名称" align="center"></el-table-column>
					<el-table-column prop="sort" label="排序" align="center"></el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="200">
						<template slot-scope="scope">
							<div class="flex">
								<el-button size="mini" type="primary" plain
									@click="handleEdit(scope.$index, scope.row)">修改</el-button>
								<el-button size="mini" type="danger" plain
									@click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		<el-dialog title="部门" :visible.sync="dialogVisible" center width="500px">
			<el-form :model="detailForm" :rules="rules" ref="ruleForm" label-width="100px" class="detailForm">
				<el-form-item label="上线部门" prop="list" style="width: 100%;">
					<el-cascader style="width: 100%;" v-model="detailForm.parent_id" @change="handleChange"
						:options="options" :props="props" clearable></el-cascader>
				</el-form-item>

				<el-form-item label="部门名称" prop="name" style="width: 100%;">
					<el-input v-model="detailForm.name"></el-input>
				</el-form-item>

				<el-form-item label="排序" prop="sort" style="width: 100%;">
					<el-input-number v-model="detailForm.sort" size="small" :min="0" label="排序"></el-input-number>
					<span style="margin-left: 5px;">越大越靠前</span>
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
	import {
		department,
		departmentSelect
	} from "@/api/admin";
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
				dataList: [],
				page: 1,
				page_size: 10,
				total: 0,
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
				departmentList: [],
				dataList: [],
				detailForm: {
					id: '',
					bm: '',
					name: '',
					sort: '',
					parent_id: []
				},
				rules: {
					name: [{
						required: true,
						message: '请输入部门名称',
						trigger: 'blur'
					}, ]
				},
				props: {
					checkStrictly: true,
					label: "name",
					value: "id",
					children: "children",
				},
				options: []

			}
		},
		created() {
			this.departmentFn()
			this.departmentSelectFn()
		},
		methods: {
			departmentSelectFn(page) {
				departmentSelect({

				}, 'GET').then((e) => {
					this.options = [{
						id: 0,
						name: "顶级部门",
						children: e.data.list
					}]


				})
			},
			handleChange(value) {
				console.log(value)
				this.detailForm.parent_id = value;
			},
			handleSizeChange(value) {
				this.page_size = value
				this.departmentFn()
			},
			handleCurrentChange(value) {
				this.page = value
				this.departmentFn()
			},
			departmentFn(page) {
				department({
					page: this.page,
					page_size: this.page_size,
					name: this.searchParams.code2
				}, 'GET').then((e) => {
					console.log(e.data.list)
					this.dataList = e.data.list
					this.total = e.data.total

				})
			},
			dialogConfirm() {
				let obj = {
					name: this.detailForm.name,
					parent_id: this.detailForm.parent_id,
					sort: this.detailForm.sort
				}
				if(!this.detailForm.parent_id.length){
					
					return
				}
				obj.parent_id=this.detailForm.parent_id[this.detailForm.parent_id.length-1]
				if (this.detailForm.id) {
					obj['id'] = this.detailForm.id
				}
				department(obj, this.detailForm.id ? 'PATCH' : 'POST', this.detailForm.id).then((e) => {
					this.dialogVisible = false
					this.seach()

				})
			},
			seach() {
				this.page = 1
				this.departmentFn()
				this.departmentSelectFn()
			},
			reset() {
				for (let i in this.searchParams) {
					this.searchParams[i] = null
				}
				this.seach()
			},
			clickItem() {
				console.log(456)

			},
			handleEdit(idx, item) {
				this.detailForm.name = item.name
				this.detailForm.sort = item.sort
				if (item.parent_id == 0) {
					this.detailForm.parent_id = [0]
				} else {
					this.detailForm.parent_id = [0, item.parent_id]
				}
				this.detailForm['id'] = item.id
				this.dialogVisible = true
			},
			handleDelete(index, item) {
				this.$confirm('是否确认删除选中的部门?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					confirmButtonClass: 'submitDeleteBtn',
					type: 'warning'
				}).then(() => {
					department({}, 'DELETE', item.id).then((e) => {
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
					id: '',
					bm: '',
					name: '',
					sort: '',
					parent_id: []
				}
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