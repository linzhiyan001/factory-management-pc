<template>
	<div class="app-container">
		<div class="content">
			<div class="lgm-search">
				<el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
					<el-form-item label="员工">
						<el-input v-model="searchParams.nickname" placeholder="请输入员工姓名"></el-input>
					</el-form-item>

					<el-row>
						<el-button @click="
                page = 1;
                examineAdminFn();
              " type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
						<el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
					</el-row>
				</el-form>
			</div>

			<div class="table">
				<el-table :data="dataList" border>
					<el-table-column prop="nickname" label="员工姓名" align="center"></el-table-column>
					<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
					<el-table-column prop="gender" label="员工性别" align="center">
						<template slot-scope="scope">
							<p>{{ scope.row.gender == 1 ? "男" : "女" }}</p>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="审核状态" align="center">
						<template slot-scope="scope">
							<p v-if="scope.row.status==0">待审核</p>
							<p v-if="scope.row.status==1">审核通过</p>
							<p v-if="scope.row.status==2">审核不通过</p>
						</template>
					</el-table-column>

					<el-table-column fixed="right" label="操作" align="center" width="200">
						<template slot-scope="scope">
							<div class="flex" v-if="scope.row.status==0">
								<el-button size="mini" type="primary" plain
									@click="handleEdit(scope.$index, scope.row)">审核</el-button>
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
		<el-dialog title="审核" :visible.sync="dialogVisible" center width="900px">
			<el-form :model="detailForm" :rules="rules" ref="ruleForm" label-width="100px" class="detailForm">
				<el-form-item label="性别" prop="status">
					<el-radio-group v-model="detailForm.status" style="width: 100%">
						<el-radio :label="1">通过</el-radio>
						<el-radio :label="2">驳回</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="备注" prop="remark" style="width: 100%">
					<el-input type="textarea" v-model="detailForm.remark"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button class="lgm-reset-btn" @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="editFn('ruleForm')" class="lgm-search-btn">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import SelectBed from "@/components/SelectBed";
	import SelectStyle from "@/components/SelectStyle";
	import UploadImage from "@/components/uploadImage";
	import {
		examineAdmin,
		examine_status
	} from "@/api/admin";
	import {
		getToken
	} from "@/utils/auth";
	let loadingInstance = null;
	import {
		Loading
	} from "element-ui";

	export default {
		name: "PieceSalaryDetail",
		components: {
			"select-bed": SelectBed,
			"select-style": SelectStyle,
			"upload-image": UploadImage,
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
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				searchParams: {
					nickname: "",
				},
				departmentList: [],
				gwList: [],
				dataList: [],
				detailForm: {
					status: 1,
					id: "",
					remark: "",
				},
				rules: {
					name: [{
						required: true,
						message: "请输入姓名",
						trigger: "blur"
					}],
					phone: [{
						required: true,
						message: "请输入手机号码",
						trigger: "blur"
					}],
				},
				dialogVisible: false,
				showUploadImage: false,
				isSingle: true,
			};
		},
		created() {
			this.examineAdminFn();
		},
		methods: {
			handleSizeChange(value) {
				this.page_size = value;
				this.examineAdminFn();
			},
			handleCurrentChange(value) {
				this.page = value;
				this.examineAdminFn();
			},
			examineAdminFn() {
				examineAdmin({
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
				examineAdmin(this.detailForm, "POST", this.detailForm.id).then((e) => {
					this.dialogVisible = false;
					this.seach();
				});
			},
			editFn() {
				console.log(this.detailForm);
				examine_status(this.detailForm, "POST").then((e) => {
					this.dialogVisible = false;
					this.seach();
					this.detailForm = {
						status: 1,
						id: "",
						remark: "",
					}
				});
			},
			seach() {
				this.page = 1;
				this.examineAdminFn();
			},
			reset() {
				for (let i in this.searchParams) {
					this.searchParams[i] = null;
				}
				this.seach();
			},

			addList() {
				this.detailForm = {
					status: 1,
					id: "",
					remark: "",
				};
				this.dialogVisible = true;
			},
			handleEdit(idx, item) {
				this.detailForm.id = item.id;

				this.dialogVisible = true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.app-container {
		.detailForm {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.add-avatar {
				width: 90px;
				height: 40px;
				color: #909399;
				background-color: #dcdfe6;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4px;
				cursor: pointer;
				border: 1px solid #dcdfe6;
				box-sizing: border-box;
			}
		}

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