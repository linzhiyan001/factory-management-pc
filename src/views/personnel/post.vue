<template>
	<div class="app-container">

		<div class="content">
			<div class="lgm-search">
				<el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
					<el-form-item label="岗位">
						<el-input v-model="searchParams.code2" placeholder="请输入岗位名称查询"></el-input>
					</el-form-item>
					<el-row>
						<el-button @click="page = 1;adminroleFn()" type="success" class="lgm-search-btn"
							icon="el-icon-search">搜索</el-button>
						<el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
					</el-row>
				</el-form>
			</div>

			<div class="table-header-btn">
				<el-button type="success" plain size="small" class="lgm-add-btn" icon="el-icon-plus"
					@click="detailForm.id='';addList()">新增</el-button>
			</div>
			<div class="table">
				<el-table :data="dataList" border>
					<el-table-column prop="name" label="岗位名称" align="center"></el-table-column>
					<el-table-column prop="admin" label="是否管理员" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.is_admin==0" type="warning" plain size="mini">否</el-button>
							<el-button v-else type="success" plain size="mini">是</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="is_saofei" label="是否扫菲列表" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.is_saofei==0" type="warning" plain size="mini">否</el-button>
							<el-button v-else type="success" plain size="mini">是</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="sort" label="排序" align="center"></el-table-column>

					<el-table-column prop="menu_name" label="权限列表" align="center"></el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="200">
						<template slot-scope="scope">
							<div class="flex">
								<el-button size="mini" type="primary" plain
									@click="clickEdit(scope.$index, scope.row)">修改</el-button>
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
		<el-dialog title="岗位" :visible.sync="dialogVisible" center width="900px">
			<el-form :model="detailForm" :rules="rules" ref="ruleForm" label-width="100px" class="detailForm">
				<el-form-item label="岗位名称" prop="name" style="width: 100%;">
					<el-input v-model="detailForm.name"></el-input>
				</el-form-item>

				<el-form-item label="是否管理员" prop="phone" style="width: 50%;">
					<el-switch v-model="detailForm.admin" active-color="#ed6d00">
					</el-switch>
				</el-form-item>
				<el-form-item label="是否扫菲列表" prop="bm" style="width: 50%;">
					<el-switch v-model="detailForm.sf" active-color="#ed6d00">
					</el-switch>
				</el-form-item>
				<el-form-item label="选择权限" prop="list" style="width: 100%;">
					<el-cascader :options="options" :props="props" clearable v-model="selectedValues"
						:show-all-levels="false" @change="handleChange" style="width: 100%;"></el-cascader>
				</el-form-item>

				<el-form-item label="排序" prop="sort" style="width: 50%;">
					<el-input-number v-model="detailForm.sort" size="small" :min="0" label="描述文字"></el-input-number>
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
		adminrole,
		load_menu
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


				detailForm: {
					id: '',
					name: '',
					admin: true,
					sf: false,
					sort: ''
				},
				menu_id: [],
				selectedValues: [],
				rules: {
					name: [{
						required: true,
						message: '请输入岗位名称',
						trigger: 'blur'
					}, ]
				},
				dialogVisible: false,
				props: {
					multiple: true,
					label: "name",
					value: "id",
					children: "children",
				},
				options: []

			}
		},
		created() {
			this.adminroleFn()
			this.load_menuFn()
		},
		methods: {
			load_menuFn() {
				load_menu({

				}).then((e) => {
					this.options = e.data


				})
			},
			reset() {
				for (let i in this.searchParams) {
					this.searchParams[i] = null
				}
				this.page = 1;
				this.adminroleFn()

			},
			clickEdit(idx, item) {
				this.detailForm.id = item.id
				this.detailForm.sort = item.sort
				this.detailForm.admin = item.is_admin == 1 ? true : false
				this.detailForm.sf = item.is_saofei == 1 ? true : false
				this.detailForm.name = item.name
				this.dialogVisible = true
				this.selectedValues=[]
                if(item.menu_id_list){
                    item.menu_id_list.forEach((e)=>{
					this.selectedValues.push(JSON.parse(e))
				})
                }
                this.$forceUpdate()
				

			},


			handleChange(value) {
                
				this.selectedValues = value


			},

			handleSizeChange(value) {
				this.page_size = value
				this.adminroleFn()
			},
			handleCurrentChange(value) {
				this.page = value
				this.adminroleFn()
			},
			adminroleFn(page) {
				adminrole({
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
				this.menu_id = []

				console.log(this.menu_id)
				let obj = {
					sort: this.detailForm.sort,
					is_admin: this.detailForm.admin ? 1 : 0,
					is_saofei: this.detailForm.sf ? 1 : 0,
					name: this.detailForm.name,
					menu_id: [],
					menu_id_list:this.selectedValues,
				}
				if (this.detailForm.id) {
					obj['id'] = this.detailForm.id
				}
				if (this.selectedValues && this.selectedValues.length) {
					this.selectedValues.forEach((e) => {
						obj.menu_id.push(e[e.length - 1])
					})
				}
console.log(obj)
				adminrole(obj, this.detailForm.id ? 'PATCH' : 'POST', this.detailForm.id).then((e) => {
					this.dialogVisible = false
					this.page = 1
					this.adminroleFn()

				})
			},
			handleDelete(idx, item) {
				adminrole({}, 'DELETE', item.id).then((e) => {
					this.page = 1
					this.adminroleFn()

				})
			},
			clickItem() {
				console.log(456)
			},

			addList() {

				this.menu_id = []
				this.selectedValues = []
				this.detailForm = {
					id: '',
					name: '',
					admin: true,
					sf: false,
					sort: ''

				}
				this.dialogVisible = true
			},


		}

	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.detailForm {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	::v-deep .in-active-path {
		::v-deep .el-cascader-node__label {
			color: $fontColor !important;
		}
	}


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