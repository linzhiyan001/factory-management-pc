<template>
	<div>
		
		<!-- 裁床表 -->
		<cutTable :sizes="cutSize" :colors="cutColor" :style_id="model1.form.styleId" @saveTableList="saveTableList">
		</cutTable>
		<div class="add">
			<button class="btn" @click="clickEditConfirm()" :disabled="disabled">
				<span >保存</span>
			</button>
		</div>
	</div>
</template>

<script>
	import {
		colorAdmin,
		sizeAdmin,
		clothing_categoryAdmin,
		customerAdmin,
		department,
		adminrole,
		styleAdmin,
		processs_template

	} from '@/api/admin'
	import cutTable from './cut-table.vue';
	export default {
		data() {
			return {
				cdFormData: {
					colors: [],
					sizes: [],
				},
				colorListOptions: [],
				sizeListOptions: [],
				cutSize: [],
				cutColor: [],
				dataList1: [],
				dataList2: [],
				disabled: false,
				model1: {
					form: {
						id: '',
						styleId: "", //款式id
						bed_count: 3, //床次
						bed_count_unit: '月', //床次单位
						sizeArr: "", //尺码组合
						sizes: [], //尺码组合id
						colorArr: "", //颜色组合
						colors: [], //颜色组合id
						departmentsName: "", //加工部门
						departments: [], //加工部门id
						customer_Name: "", //客户名
						customer_id: "", //客户id
						cutting_date: "", //裁床日期
						delivery_date: "", //交货日期
						order_number: "", //订单号
						remark: "", //备注
						detail: [{
							style_id: 23,
							size_id: 25,
							color_id: 18,
							bundle_number: 1,
							multiple: 1,
							quantity: 1,
							layer_number: 1,
							total: 2,
							bundle_no: 1
						}, {
							style_id: 23,
							size_id: 25,
							color_id: 18,
							bundle_number: 1,
							multiple: 1,
							quantity: 1,
							layer_number: 2,
							total: 2,
							bundle_no: 2
						}, ]
					}
				},

			};
		},
		components: {
			cutTable
		},
		created() {
			this.colorAdminFn()
			this.sizeAdminFn()

		},
		methods: {
			colorAdminFn() {
				colorAdmin({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					 e.data.list.forEach((e) => {
						e['checked'] = true
					})
					this.colorListOptions = e.data.list;
					this.dataList2 = e.data.list
					this.clickConfirmColor()

				});
			},
		
			sizeAdminFn() {
				sizeAdmin({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					e.data.list.forEach((e) => {
						e['checked'] = true
					})
					this.sizeListOptions = e.data.list;
					this.dataList1 = e.data.list
					this.clickConfirmSize()

				});
			},
				// 颜色弹窗-确定
			clickConfirmColor() {
				let arr = []
				let arrId = []
				let cutColor = []
				for (let i = 0; i < this.dataList2.length; i++) {
					if (this.dataList2[i].checked) {
						arr.push(this.dataList2[i].color_name)
						arrId.push(this.dataList2[i].id)
						cutColor.push(this.dataList2[i])
					}
				}
				this.model1.form.colorArr = arr.toString()
				this.model1.form.colors = arrId
				this.cutColor = cutColor
				this.$refs.popupColor.close()
				this.$refs.uForm.validate()
			},
			// 尺码弹窗-确定
			clickConfirmSize() {
				let arr = []
				let arrId = []
				let cutSize = []
				for (let i = 0; i < this.dataList1.length; i++) {
					if (this.dataList1[i].checked) {
						arr.push(this.dataList1[i].size_name)
						arrId.push(this.dataList1[i].id)
						cutSize.push(this.dataList1[i])
					}
				}
				this.model1.form.sizeArr = arr.toString()
				this.model1.form.sizes = arrId
				this.cutSize = cutSize
				this.$refs.popupSize.close()
				this.$refs.uForm.validate()
			},
			
			// 裁床表
			saveTableList(list, sizeCheck, colorCheck) {
				console.log(list)
				console.log(list, sizeCheck, colorCheck)
				this.model1.form.detail = list
				this.model1.form.sizeCheck = sizeCheck
				this.model1.form.colorCheck = colorCheck
			},
			// 新增-确定
			clickEditConfirm(ref) {
				// this.$refs.uForm.validate().then(async resp => {
				// 	var detail = this.model1.form.detail
				// 	if(!detail || detail.length == 0){
				// 		uni.$u.toast('请设置裁床表')
				// 		return
				// 	}
				// 	for(let i = 0; i<detail.length;i++){
				// 		if(!detail[i].quantity){
				// 			uni.$u.toast('请设置裁床表')
				// 			return
				// 		}
				// 	}
				// 	this.disabled = true
				// 	const res = await this.$myRequest({
				// 		url: this.model1.form.id ? '/Admin/cutting_bed/' + this.model1.form.id :
				// 			'/Admin/cutting_bed',
				// 		method: this.model1.form.id ? 'PATCH' : 'POST',
				// 		errorCode: true,
				// 		data: {
				// 			...this.model1.form,
				// 		}
				// 	})
				// 	this.disabled = false
				// 	if (res && res.code == 200) {
				// 		uni.navigateBack()
				// 	} else {
				// 		uni.$u.toast(res.msg);
				// 	}
				// }).catch(errors => {
				// 	uni.$u.toast(errors[0].message)
				// })
			},

		},
	};
</script>

<style scoped>
	.el-table {
		margin-top: 20px;
	}
</style>