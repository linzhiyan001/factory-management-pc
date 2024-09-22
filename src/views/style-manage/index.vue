<template>
	<div class="app-container">

		<div class="content">
			<div class="lgm-search">
				<el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
					<el-form-item label="款式名称">
						<el-input v-model="searchParams.style_name" placeholder="请输入款式编号或名称查询"></el-input>
					</el-form-item>
					<el-row>
						<el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
						<el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
					</el-row>
				</el-form>
			</div>

			<div class="table-header-btn">
				<el-button type="success" plain size="small" class="lgm-add-btn" icon="el-icon-plus"
					@click="addList">新增</el-button>
				<el-button type="danger" plain size="small" icon="el-icon-delete" @click="deleteList">删除</el-button>
			</div>

			<div class="table">
				<el-table :data="dataList" border>
					<el-table-column type="selection" width="55" align="center"></el-table-column>
					<el-table-column prop="style_no" label="款式编号" align="center"></el-table-column>
					<el-table-column prop="style_name" label="款式名称" align="center"></el-table-column>
					<el-table-column prop="sizes" label="尺码组合" align="center"></el-table-column>
					<el-table-column prop="colors" label="颜色组合" align="center"></el-table-column>
					<el-table-column prop="picture" label="图片" min-width="140" align="center">
						<template slot-scope="scope">
							<el-image :src="scope.row.avatar" fit="cover" style="width: 80px;height: 80px;"
								:preview-src-list="srcList" />
						</template>
					</el-table-column>
					<el-table-column prop="production_process_id" label="工序(道)" align="center"></el-table-column>
					<el-table-column prop="unit_price_mode" label="工价" align="center">
					</el-table-column>
					<el-table-column prop="level" label="创建时间" align="center">
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="280">
						<template slot-scope="scope">
							<div class="flex">
								<el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">
									<i class="el-icon-edit"></i> 修改
								</el-button>
								<el-button size="mini" type="success" plain
									@click="handleCcbf(scope.$index, scope.row)">裁床编菲</el-button>
								<el-button size="mini" type="warning" plain
									@click="handleDelete(scope.$index, scope.row)">同步工序</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="lgm-page-wrap">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:page-sizes="[10, 100, 200, 300, 400]" :page-size="10"
					layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</div>
		</div>


		<!-- 修改 -->
		<el-dialog :title="dailogTitle" :visible.sync="dialog" width="100%" center fullscreen
			custom-class="edit-dialog">
			<el-form ref="form" :model="detailData" :rules="rules" label-width="80px" class="search-form">
				<el-form-item label="款式编号" class="lgm-form-item" required>
					<el-input v-model="detailData.style_no"></el-input>
				</el-form-item>
				<el-form-item label="款式名称" class="lgm-form-item">
					<el-input v-model="detailData.style_name"></el-input>
				</el-form-item>

				<el-form-item label="颜色组合" class="lgm-form-item">
					<el-select v-model="detailData.colors" placeholder="请选择" style="width: 100%;" multiple
						@change="colorChange">
						<div class="search-slot" style="padding: 10px;">
							<div class="header" style="display: flex; justify-content: space-between;">
								<!-- <div class="header-left" style="display: flex; width: calc(100% - 140px);">
									<el-input v-model="addColor" placeholder="输入新增颜色"></el-input>
									<el-button type="info" plain icon="el-icon-plus"
										@click="clickAddColor">添加颜色</el-button>
								</div> -->
								<div class="header-right">
									<el-button type="primary"  class="lgm-add-btn"
										@click="selectAllColor">{{ isAllSelectColorBtn }}</el-button>
								</div>
							</div>
						</div>
						<el-option v-for="item of colorListOptions" :key="item.id" :label="item.color_name"
							:value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="尺码组合" class="lgm-form-item">
					<el-select v-model="detailData.sizes" placeholder="请选择" style="width: 100%;" multiple
						@change="sizeChange">
						<div class="search-slot" style="padding: 10px;">
							<div class="header" style="display: flex; justify-content: space-between;">
								<!-- <div class="header-left" style="display: flex; width: calc(100% - 140px);">
									<el-input v-model="addSize" placeholder="输入新增尺码"></el-input>
									<el-button type="info" plain icon="el-icon-plus"
										@click="clickAddSize">添加尺码</el-button>
								</div> -->
								<div class="header-right">
									<el-button type="primary" class="lgm-add-btn"
										@click="selectAllSize">{{ isAllSelectSizeBtn }}</el-button>
								</div>
							</div>
						</div>
						<el-option v-for="item of sizeListOptions" :key="item.id" :label="item.size_name"
							:value="item.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="款式分类" class="lgm-form-item">
					<el-select v-model="detailData.style_category_id" placeholder="请选择" style="width: 100%;">
						<div class="search-slot" style="padding: 10px;">
							<div class="header" style="display: flex; justify-content: space-between;">
								<!-- <div class="header-left" style="display: flex; width: 100%;">
									<el-input v-model="addStyle" placeholder="输入新增分类"></el-input>
									<el-button type="info" plain icon="el-icon-plus"
										@click="clickAddStyle">添加分类</el-button>
								</div> -->
							</div>
						</div >
						<el-option v-for="item of styleListOptions" :key="item.id" :label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户名称" class="lgm-form-item">
					<el-select v-model="detailData.customer_id" placeholder="请选择" style="width: 100%;">
						<div class="search-slot" style="padding: 10px;">
							<!-- <div class="header" style="display: flex; justify-content: space-between;">
								<div class="header-left" style="display: flex; width: 100%;">
									<el-input v-model="addBoss" placeholder="输入客户名称"></el-input>
									<el-button type="info" plain icon="el-icon-plus"
										@click="clickAddBoss">添加客户</el-button>
								</div>
							</div> -->
						</div>
						<el-option v-for="item of bossListOptions" :key="item.id" :label="item.customer_name"
							:value="item.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="加工部门" class="lgm-form-item">
					<el-select v-model="detailData.department_id" placeholder="请选择部门" style="width: 100%;">
						<el-option v-for="item in departmentList" :key="item.id" :label="item.name"
							:value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="" class="lgm-form-item">

				</el-form-item>


				<el-form-item label="款式备注" class="lgm-form-item" style="width: 100% !important;">
					<el-input type="textarea" v-model="detailData.remark" style="height: 100px;"></el-input>
				</el-form-item>

				<el-form-item label="款式图片" class="lgm-form-item" style="width: 100% !important">
					<div class="update-image-wrap">
						<div v-for="(item, index) of srcList" :key="item">
							<el-image :src="srcList[0]"
								style="width: 78px; height: 78px; border-radius: 6px; margin-right: 10px;"></el-image>
						</div>
						<div class="update-image" @click="clickStyleImage">
							<i class="el-icon-plus" style="font-size: 30px; color: #ccc;"></i>
						</div>
					</div>
				</el-form-item>

				<el-form-item label="生产工序" class="lgm-form-item" style="width: 100% !important">
					<el-button type="info" size="small" plain>选择模板</el-button>
					<el-button type="info" size="small" plain>保存模板</el-button>
					<el-button type="info" size="small" plain @click="toTemplate">模板管理</el-button>

				</el-form-item>

				<el-form-item label="单价模式" style="width: 100% !important">
					<el-radio-group v-model="detailData.unit_price_mode" @input="modeChange" :disabled="modeDisabled">
						<el-radio label="0">默认单价</el-radio>
						<el-radio label="1">分码单价</el-radio>
						<el-radio label="2">分岗位单价</el-radio>
					</el-radio-group>
					<div class="tips">
						如设置了多单价，请先删除对应的多单价
					</div>
				</el-form-item>
			</el-form>

			<div class="detail-table">
				<el-table :data="dataList2" border ref="dragTable" style="width: 80%;">
					<el-table-column prop="phone" label="序号" width="80" align="center">
						<template slot-scope="scope">
							<span>
								<i class="el-icon-rank"></i>
								{{ scope.$index }}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="id" label="工序名称" align="center" min-width="160">
						<template slot-scope="scope">
							<el-input type="text" v-model="scope.row.id" />
						</template>
					</el-table-column>

					<el-table-column prop="price" align="center" min-width="160">
						<template slot="header" slot-scope="scope">
							<el-popover placement="bottom" title=" " popper-class="table-popover" width="400"
								trigger="hover" v-if="detailData.unit_price_mode === '1'">
								<span slot="reference">
									价格 <i class="el-icon-plus"></i>
								</span>
								<slot>
									<div class="size-list" style="display: flex; flex-wrap: wrap;">
										<div class="size-list-item" v-for="(item, index) of sizeList" :key="index"
											style="padding: 8px 15px;
                                            border: 1px solid #eee;
                                            cursor: pointer;"
											:class="{ 'isActive': item.isActive, 'isDisabled': item.disabled }"
											@click="clickTableAddSize(index)">
											{{ item.item }}
										</div>
									</div>
									<div style="margin-top: 20px;">
										<el-button class="lgm-reset-btn" icon="el-icon-refresh"
											@click="selectSize">选择尺码并确定</el-button>
									</div>
								</slot>
							</el-popover>

							<el-popover placement="bottom" title=" " popper-class="table-popover" width="400"
								trigger="hover" v-else-if="detailData.unit_price_mode === '2'">
								<span slot="reference">
									价格 <i class="el-icon-plus"></i>
								</span>
								<slot>
									<div class="size-list" style="display: flex; flex-wrap: wrap;">
										<div class="size-list-item" v-for="(item, index) of gwList" :key="index" style="padding: 8px 15px;
                                            border: 1px solid #eee;
                                            cursor: pointer;"
											:class="{ 'isActive': item.isActive, 'isDisabled': item.disabled }"
											@click="clickTableAddSize(index)">
											{{ item.item }}
										</div>
									</div>
									<div style="margin-top: 20px;">
										<el-button class="lgm-reset-btn" icon="el-icon-refresh"
											@click="selectGw">选择岗位并确定</el-button>
									</div>
								</slot>
							</el-popover>

							<span slot="reference" v-else>
								价格
							</span>
						</template>
						<template slot-scope="scope">
							<el-input-number v-model="scope.row.price" controls-position="right" :min="0"
								size="small" />
						</template>
					</el-table-column>


					<!-- 动态添加 -->
					<el-table-column align="center" min-width="160" v-for="(item, index) of customColumn"
						:key="item.id">
						<template slot="header" slot-scope="scope">
							<span slot="reference" @click="deleteTableColumn(item, index)">
								<i class="el-icon-delete"></i> {{ item.size }}
							</span>
						</template>
						<template slot-scope="scope">
							<el-input-number v-model="scope.row['a' + index]" controls-position="right" :min="0"
								size="small" />
						</template>
					</el-table-column>


					<el-table-column prop="price2" label="显示价格" align="center" min-width="160">
						<template slot-scope="scope">
							<el-switch v-model="scope.row.price2" active-color="#ed6d00" />
						</template>

					</el-table-column>
					<el-table-column prop="gw" label="可见岗位" align="center" min-width="180">
						<template slot-scope="scope">
							<el-select v-model="scope.row.gw" multiple collapse-tags style="margin-left: 20px;"
								placeholder="请选择">
								<div style="width: 100%; text-align: center; margin-bottom: 5px;">
									<el-button type="danger" size="small" plain style="width: 90%;">选择所有</el-button>
								</div>
								<el-option label="厂长" value="0"></el-option>
								<el-option label="平边" value="1"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="img" label="图片" align="center" min-width="160">
						<template slot-scope="scope">
							<div class="upload-image" @click="clickUpload(scope.$index)" v-if="scope.row.img">
								<el-image :src="scope.row.img" fit="cover"></el-image>
							</div>
							<div class="upload-image" @click="clickUpload(scope.$index)" v-else><i
									class="el-icon-plus"></i></div>
						</template>
					</el-table-column>
					<el-table-column prop="remark" label="备注" align="center" min-width="160">
						<template slot-scope="scope">
							<el-input type="text" v-model="scope.row.remark" />
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="80">
						<template slot-scope="scope">
							<div class="flex">
								<span @click="deleteItem(scope.row, scope.$index)">
									<i class="el-icon-delete" style="fontwarning-size: 20px; cursor: pointer;"></i>
								</span>
							</div>
						</template>
					</el-table-column>
				</el-table>

				<div class="hj">
					<span>默认工价合计：<b>20</b></span>
					<span>合计工序数：<b>{{ dataList2.length }}</b></span>
				</div>
			</div>

			<div class="add-gx" @click="addGxData">
				添加工序
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button class="lgm-reset-btn" @click="dialog = false">取消</el-button>
				<el-button type="primary" @click="dialog = false" class="lgm-search-btn">确定</el-button>
			</span>
		</el-dialog>


		<!-- 裁床编菲 -->
		<el-dialog title="款式信息" :visible.sync="ccDialog" width="100%" center fullscreen custom-class="cc-dialog">
			<div class="cc-header">
				<div class="item">
					款号：<b style="margin-right: 10px">{{ ccFormData.styleCode }}</b>
					<b>{{ ccFormData.style_name }}</b>
					<div style="margin-left: 10px;">
						<el-button type="success" plain size="small" class="lgm-add-btn"
							@click="changeStyle">更改款式</el-button>
					</div>
				</div>
				<div class="item">
					工序：<b>{{ ccFormData.gx }}</b>
				</div>
				<div class="item">
					默认工价：<b>{{ ccFormData.price }}</b>
				</div>
			</div>

			<div style="margin: 20px 0;">
				<b>裁单信息</b>
			</div>

			<el-form ref="cdForm" :model="cdFormData" :rules="rules2" label-width="100px" class="cd-form">
				<el-form-item label="床数" class="lgm-form-item lgm-form-item-year" prop="cs">
					<el-input v-model="cdFormData.cs"></el-input>
					<el-select v-model="cdFormData.isYear" placeholder="请选择">
						<el-option label="月" :value="1"></el-option>
						<el-option label="年" :value="2"></el-option>
					</el-select>
					<div class="add-btn" @click="clickAddCs">自动床数</div>
				</el-form-item>
				<el-form-item label="客户名称" class="lgm-form-item">
					<el-select v-model="cdFormData.bossListValue2" placeholder="请选择" style="width: 100%;">
						<div class="search-slot" style="padding: 10px;">
							<div class="header" style="display: flex; justify-content: space-between;">
								<div class="header-left" style="display: flex; width: 100%;">
									<el-input v-model="addBoss" placeholder="请输入客户名称"></el-input>
									<el-button type="info" plain icon="el-icon-plus"
										@click="clickAddBoss">添加客户</el-button>
								</div>
							</div>
						</div>
						<el-option v-for="item of bossListOptions" :key="item.value" :label="item.label"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="颜色组合" class="lgm-form-item">
					<el-popover placement="bottom" popper-class="table-popover" width="400" trigger="click">
						<div class="color-arr" slot="reference">
							<el-tag size="small" closable class="active-tag" v-for="(item, index) of selectColorArrTag"
								:key="item.color" @close="deleteTag(item, index)">
								{{ item.color }}
							</el-tag>
						</div>
						<slot>
							<div class="color-arr-top">
								<div class="color-arr-top-item-tag" :class="{ 'tag-isActive': item.isActive }"
									v-for="(item, index) of colorArrTag" :key="index" @click="clickSelectTag(index)">
									{{ item.color }}
								</div>
							</div>
							<div class="color-arr-bottom">
								<div class="left">
									<div class="input">
										<el-input v-model="colorTagValue" placeholder="输入新增颜色"></el-input>
									</div>
									<div class="add-btn" @click="clickAddColorTag">
										<i class="el-icon-plus"></i>
										添加颜色
									</div>
								</div>
								<div class="right" v-if="isAllColorTag">
									<el-button type="danger" @click="clickSelectAllColor">取消所有</el-button>
								</div>
								<div class="right" v-else>
									<el-button type="primary" @click="clickSelectAllColor"
										class="lgm-search-btn">选择所有</el-button>
								</div>
							</div>
						</slot>
					</el-popover>
				</el-form-item>
				<el-form-item label="尺码组合" class="lgm-form-item">
					<el-popover placement="bottom" popper-class="table-popover" width="400" trigger="click">
						<div class="color-arr" slot="reference">
							<el-tag size="small" closable class="active-tag" v-for="(item, index) of selectSizeArrTag"
								:key="item.size" @close="deleteSizeTag(item, index)">
								{{ item.size }}
							</el-tag>
						</div>
						<slot>
							<div class="color-arr-top">
								<div class="color-arr-top-item-tag" :class="{ 'tag-isActive': item.isActive }"
									v-for="(item, index) of sizeArrTag" :key="index" @click="clickSizeSelectTag(index)">
									{{ item.size }}
								</div>
							</div>
							<div class="color-arr-bottom">
								<div class="left">
									<div class="input">
										<el-input v-model="sizeTagValue" placeholder="输入新增尺码"></el-input>
									</div>
									<div class="add-btn" @click="clickAddSizeTag">
										<i class="el-icon-plus"></i>
										添加尺码
									</div>
								</div>
								<div class="right" v-if="isAllSizeTag">
									<el-button type="danger" @click="clickSelectAllSize">取消所有</el-button>
								</div>
								<div class="right" v-else>
									<el-button type="primary" @click="clickSelectAllSize"
										class="lgm-search-btn">选择所有</el-button>
								</div>
							</div>
						</slot>
					</el-popover>
				</el-form-item>


				<el-form-item label="裁床日期" class="lgm-form-item" prop="ccDate">
					<el-date-picker v-model="cdFormData.ccDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
						style="width: 100%;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="交货日期" class="lgm-form-item" prop="jhDate">
					<el-date-picker v-model="cdFormData.jhDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
						style="width: 100%;">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="订单号" class="lgm-form-item">
					<el-input v-model="cdFormData.number" placeholder="请输入订货单号"></el-input>
				</el-form-item>
				<el-form-item label="加工部门" class="lgm-form-item">
					<el-select v-model="cdFormData.department" placeholder="请选择部门" style="width: 100%;">
						<el-option v-for="item in departmentList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>

				<el-form-item label="备注" class="lgm-form-item2">
					<el-input v-model="cdFormData.remark" type="textarea" placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-form>

			<!-- 制单表 -->
			<div class="order-table">
				<div class="order-table-header">
					<div class="name">
						裁床表
					</div>

					<div class="size-arr">
						<span>每点击一次添加一次尺码</span>
						<div class="item" v-for="(item, index) of selectSizeArrTag" :key="item.size"
							@click="clickTableSize(index, item)">
							{{ item.size }}
						</div>
					</div>
				</div>
				<div class="order-table-bottom">
					<div class="name">
						<p>每点击一次</p>
						<p>添加一次颜色</p>

						<div class="item" v-for="(item, index) of selectColorArrTag" :key="item.color"
							@click="clickTableColor(item)">
							{{ item.color }}
						</div>
					</div>
					<div class="middle">
						<div class="no-data" v-if="diyTableData.length === 0 && diyTableColumn.length === 0">
							请点击添加尺码及颜色进行设置裁床表
						</div>
						<div class="diy-table" v-else>
							<el-table :data="diyTableData" ref="diyTable" id="diyTable" border show-summary
								:summary-method="getSummaries" :style="{ 'width': tableWidth + 'px' }">
								<el-table-column label="颜色尺码" align="center" width="150">
									<template slot-scope="scope">
										<div v-if="handleParams.dual && scope.$index === 0">

										</div>
										<div v-else>
											<i class="el-icon-delete" @click="deletTableColor(scope.$index)"></i>
											{{ scope.$index }}:{{ scope.row.color }}
										</div>
									</template>
								</el-table-column>

								<!-- 层号 -->
								<el-table-column label="层号" align="center" width="80" v-if="handleParams.customCh">
									<template slot-scope="scope">
										<div>
											<el-input v-model="scope.row['ch']" placeholder="层号"></el-input>

										</div>
									</template>
								</el-table-column>

								<!-- 倍数 -->
								<el-table-column label="倍数" align="center" width="80" v-if="handleParams.dual">
									<template slot-scope="scope">
										<div v-if="handleParams.dual !== '' && scope.$index !== 0">
											<el-input v-model="scope.row['dual']" placeholder="倍数"
												@input="topDualChange(scope.$index, $event)"></el-input>
										</div>
										<div v-else>
											倍数
										</div>
									</template>
								</el-table-column>

								<!-- 动态列 -->
								<el-table-column align="center" :prop="'gm' + item.zIndex" width="150"
									v-for="(item, index) of diyTableColumn" :key="item.label">
									<template slot="header" slot-scope="scope">
										<div slot="reference"
											@click="deleteTableColumn2(item, (scope.$index - 1), index)">
											<i class="el-icon-delete"></i> {{ item.size }}
											<div class="zszh" v-if="handleParams.customZh">
												<span>扎号</span>
												<span>数量</span>
											</div>
											<div class="zszh" v-if="handleParams.customZs">
												<span>扎数</span>
												<span>数量</span>
											</div>
										</div>
									</template>
									<template slot-scope="scope">
										<div style="display: flex; justify-content: space-between;"
											v-if="handleParams.dual">
											<el-input v-model="scope.row['zh' + item.zIndex]" placeholder="数量"
												style="width: 60px;"
												v-if="handleParams.customZh && scope.$index !== 0"></el-input>
											<el-input v-model="scope.row['zs' + item.zIndex]" placeholder="数量"
												style="width: 60px;" v-if="handleParams.customZs && scope.$index !== 0">
												@input="changeTableZsInput(scope.$index, item.zIndex,
												$event)"</el-input>
											<span v-if="handleParams.customStyle"
												@click="selectStyleTable(scope.$index, item.zIndex)">{{ scope.row['ks' + item.zIndex] }}</span>
											<el-input v-model="scope.row['gm' + item.zIndex]" placeholder="数量"
												style="flex: 1;"
												@input="changeTableInput(scope.$index, $event)"></el-input>
										</div>
										<div style="display: flex; justify-content: space-between;" v-else>
											<el-input v-model="scope.row['zh' + item.zIndex]" placeholder="数量"
												style="width: 60px;" v-if="handleParams.customZh"></el-input>
											<el-input v-model="scope.row['zs' + item.zIndex]" placeholder="数量"
												style="width: 60px;" v-if="handleParams.customZs"
												@input="changeTableZsInput(scope.$index, item.zIndex, $event)"></el-input>
											<span v-if="handleParams.customStyle" class="table-add-kh"
												@click="selectStyleTable(scope.$index, item.zIndex)">{{ scope.row['ks' + item.zIndex] }}</span>
											<el-input v-model="scope.row['gm' + item.zIndex]" placeholder="数量"
												style="flex: 1;"
												@input="changeTableInput(scope.$index, $event)"></el-input>
										</div>
									</template>
								</el-table-column>

								<el-table-column label="合计" prop="total" align="center" width="149">
									<template slot-scope="scope">
										<div>
											<div v-if="handleParams.dual && scope.$index === 0">
											</div>
											<div v-else>
												{{ scope.row.total }}
											</div>
										</div>
									</template>
								</el-table-column>
							</el-table>
							<div class="table-bottom" :style="{ 'width': tableWidth + 'px' }">
								总扎数：{{ totalZs }}
							</div>
						</div>
					</div>

					<div class="handle">
						<div class="item" sty>
							从<el-input-number v-model="handleParams.zsNumber" controls-position="right" :min="1"
								size="mini" style="margin: 0 5px; flex: 1;" />扎起
						</div>
						<div class="item">
							自定义扎号<el-switch v-model="handleParams.customZh" active-color="#ed6d00"
								@change="handleChangeZh" style="margin-left: 5px;"></el-switch>
						</div>
						<div class="item">
							自定义扎数<el-switch v-model="handleParams.customZs" active-color="#ed6d00"
								@change="handleChangeZs" style="margin-left: 5px;"></el-switch>
						</div>
						<!-- <div class="item">
                            行复制<el-switch v-model="handleParams.hfz" active-color="#ed6d00" style="margin-left: 5px;"></el-switch>
                        </div>
                        <div class="item">
                            列复制<el-switch v-model="handleParams.lfz" active-color="#ed6d00" style="margin-left: 5px;"></el-switch>
                        </div> -->
						<div class="item">
							倍数模式<el-switch v-model="handleParams.dual" active-color="#ed6d00" @change="handleChangeDual"
								style="margin-left: 5px;"></el-switch>
						</div>
						<div class="item">
							自定义层号<el-switch v-model="handleParams.customCh" active-color="#ed6d00"
								@change="handleChangeCh" style="margin-left: 5px;"></el-switch>
						</div>
						<div class="item">
							新增款号<el-switch v-model="handleParams.customStyle" active-color="#ed6d00"
								@change="handleChangeStyle" style="margin-left: 5px;"></el-switch>
						</div>
						<div class="item">
							<el-button type="danger" plain @click="clearTable">清空裁床表</el-button>
						</div>
					</div>
				</div>
			</div>


			<span slot="footer" class="dialog-footer">
				<el-button class="lgm-reset-btn" @click="ccDialog = false">返回</el-button>
				<el-button type="primary" @click="clickPreview('cdForm')" class="lgm-search-btn">预览</el-button>
				<el-button type="danger" @click="saveAndPreview('cdForm')">保存并预览菲票</el-button>
			</span>
		</el-dialog>


		<!-- 裁床编菲 -> 修改款式 -->
		<el-dialog title="选择款式" :visible.sync="dialogTableVisible" center width="900px">
			<div class="lgm-search">
				<el-form ref="form" :model="styleSearchParams" label-width="80px" class="search-form">
					<el-form-item label="款式名称">
						<el-input v-model="styleSearchParams.style_name" placeholder="请输入款号或名称查询"></el-input>
					</el-form-item>
					<el-row>
						<el-button type="success" class="lgm-search-btn" icon="el-icon-search"
							@click="styleTableSearch">搜索</el-button>
						<el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset2">重置</el-button>
					</el-row>
				</el-form>
			</div>
			<el-table :data="styleTableData" border highlight-current-row>
				<el-table-column property="id" label="款式编号" align="center"></el-table-column>
				<el-table-column property="name" label="款式名称" align="center"></el-table-column>
				<el-table-column property="sizeArr" label="尺码组合" align="center"></el-table-column>
				<el-table-column property="name" label="颜色组合" align="center"></el-table-column>
				<el-table-column property="name" label="工序（道）" align="center"></el-table-column>
				<el-table-column property="name" label="工价" align="center"></el-table-column>
				<el-table-column fixed="right" label="操作" align="center" width="120">
					<template slot-scope="scope">
						<div class="flex">
							<el-button size="mini" type="success" plain class="lgm-add-btn"
								@click="selectThisStyle(scope.row)">
								选择此款
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="lgm-page-wrap">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:page-sizes="[10, 100, 200, 300, 400]" :page-size="10"
					layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</div>
		</el-dialog>

		<!-- 裁床编菲 -> 预览菲票 -->
		<el-dialog title="预览菲票" :visible.sync="previewDialog" center width="900px">
			<div class="preview-info">
				<el-row :gutter="20" style="margin-bottom: 10px;">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							款号：{{ ccFormData.styleCode }} {{ ccFormData.style_name }}
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							床次：{{ cdFormData.cs }}
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							总扎数：{{ totalZs }}
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							总裁：3
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							裁床日期：{{ cdFormData.ccDate }}
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							交货日期：{{ cdFormData.jhDate }}
						</div>
					</el-col>
				</el-row>
			</div>

			<!-- 上面的table -->
			<el-table :data="diyTableData" ref="diyTable" border show-summary>
				<el-table-column label="颜色尺码" prop="'label" align="center">
					<template slot-scope="scope">
						{{ scope.row.color }}
					</template>
				</el-table-column>
				<!-- 动态列 -->
				<el-table-column align="center" :prop="'gm' + index" v-for="(item, index) of diyTableColumn"
					:key="item.label">
					<template slot="header" slot-scope="scope">
						<div slot="reference" @click="deleteTableColumn2(item, index)">
							{{ item.size }}
						</div>
					</template>
					<template slot-scope="scope">
						<span>{{ scope.row['gm' + index] }}</span>
					</template>
				</el-table-column>

				<el-table-column label="合计" prop="total" align="center"></el-table-column>
			</el-table>

			<div class="radio" style="margin: 10px 0">
				<el-radio-group v-model="radioStyle">
					<el-radio :label="1">裁床单格式</el-radio>
					<el-radio :label="2">列表格式</el-radio>
				</el-radio-group>
			</div>

			<!-- 下面的table -->
			<div v-if="radioStyle === 1">
				<el-table :data="diyTableData" style="width: 100%" border show-summary>
					<el-table-column prop="color" label="颜色尺码" align="center"></el-table-column>
					<el-table-column align="center" :label="item.size" v-for="(item, index) of diyTableColumn"
						:key="item.label">
						<el-table-column label="扎号" align="center" :prop="'zh' + index"
							v-if="!handleParams.customZs"></el-table-column>
						<el-table-column label="扎数" align="center" :prop="'zs' + index" v-else></el-table-column>
						<el-table-column label="数量" align="center" :prop="'gm' + index"></el-table-column>
					</el-table-column>
					<el-table-column label="合计" prop="total" align="center"></el-table-column>
				</el-table>
				<div class="table-bottom" style="width: 100%">
					总扎数：{{ totalZs }}
				</div>
			</div>
			<div v-else>
				<el-table :data="tableTypeData" style="width: 100%" border>
					<el-table-column prop="zh" label="扎号" align="center"></el-table-column>
					<el-table-column prop="size" label="尺码" align="center"></el-table-column>
					<el-table-column prop="color" label="颜色" align="center"></el-table-column>
					<el-table-column prop="number" label="件数" align="center"></el-table-column>

				</el-table>
			</div>


			<div class="bottom-btn" style="margin: 20px 0; text-align: center; ">
				<el-button class="lgm-reset-btn" @click="previewDialog = false">取消</el-button>
			</div>
		</el-dialog>

		<!-- 上传图片 -->
		<upload-image :isShow="showUploadImage" @selectImageData="selectImageData"></upload-image>


	</div>
</template>

<script>
	import Sortable from 'sortablejs'
	import UploadImage from '@/components/uploadImage'
	import $ from 'jquery';
	import {
		colorAdmin,
		sizeAdmin,
		clothing_categoryAdmin,
		customerAdmin,
		department
		
	} from "@/api/admin";
	export default {
		name: 'StyleManage',
		data() {
			return {
				tableCustomStyleObj: {},
				tableSelectStyle: '更改款式',
				isTableSelect: false,
				radioStyle: 1,
				previewDialog: false,
				totalZs: 0,
				handleParams: {
					zsNumber: 1,
					customZh: false,
					customZs: false,
					hfz: false,
					lfz: false,
					bsms: false,
					zdych: false,
					dual: false,
					customCh: false,
					customStyle: false
				},
				tableWidth: 300,
				colorTagValue: '',
				sizeTagValue: '',
				colorArrTag: [{
						color: '黑色',
						isActive: false
					},
					{
						color: '黄色',
						isActive: false
					},
					{
						color: '蓝色',
						isActive: false
					},
					{
						color: '白色',
						isActive: false
					},
					{
						color: '红色',
						isActive: false
					},
					{
						color: '紫色',
						isActive: false
					},
					{
						color: '绿色',
						isActive: false
					},
					{
						color: '银色',
						isActive: false
					},
					{
						color: '浅色',
						isActive: false
					},
					{
						color: '灰色',
						isActive: false
					}
				],
				sizeArrTag: [{
						size: '32',
						isActive: false
					},
					{
						size: '31',
						isActive: false
					},
					{
						size: '30',
						isActive: false
					},
					{
						size: '29',
						isActive: false
					},
					{
						size: '28',
						isActive: false
					},
					{
						size: '27',
						isActive: false
					},
					{
						size: '26',
						isActive: false
					},
					{
						size: '4XL',
						isActive: false
					},
					{
						size: '3XL',
						isActive: false
					},
					{
						size: '2XL',
						isActive: false
					},
					{
						size: 'XL',
						isActive: false
					},
					{
						size: 'L',
						isActive: false
					},
					{
						size: 'M',
						isActive: false
					},
					{
						size: 'S',
						isActive: false
					},
					{
						size: 'XS',
						isActive: false
					}
				],
				selectColorArrTag: [{
						color: '黑色',
						isActive: true
					},
					{
						color: '蓝色',
						isActive: true
					},
				],
				selectSizeArrTag: [{
						size: '32',
						isActive: true
					},
					{
						size: '31',
						isActive: true
					},
					{
						size: '30',
						isActive: true
					},
				],
				isAllColorTag: false,
				isAllSizeTag: false,
				showColorPop: false,
				ccFormData: {
					styleCode: '001',
					style_name: '牛仔裤',
					gx: 3,
					price: '0.000'
				},
				cdFormData: {
					cs: '12',
					isYear: 1,
					colorArr: [],
					bossListValue2: [],
					jhDate: '2024-10-01',
					ccDate: '2024-06-12',
					department: '',
					number: '',
					remark: ''
				},
				styleSearchParams: {
					style_name: ''
				},
				dialogTableVisible: false,
				styleTableData: [{
						id: '552',
						name: '碎花',
						'sizeArr': '30,31',
						colorArr: '红色',
						num: 1,
						pirce: '5.00'
					},
					{
						id: '553',
						name: '牛仔裤',
						'sizeArr': '30,31',
						colorArr: '红色',
						num: 1,
						pirce: '5.00'
					}
				],
				searchParams: {
					style_name: ''
				},
				srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
				dataList: [{
						avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
						id: '001',
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
				UploadImageType: '',
				dataList2: [{
						avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
						id: '平车2',
						price: 10,
						price2: true,
						gw: ['0', '1'],
						remark: '赶时间2222',
						a0: 2,
						img: ''
					},
					{
						avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
						id: '平车',
						price: 10,
						price2: 10,
						gw: ['0'],
						remark: '赶时间',
						a0: 3,
						img: ''
					}
				],
				dailogTitle: '新增',
				rules: {
					id: [{
						required: true,
						message: '请输入款式编号',
						trigger: 'blur'
					}, ],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				rules2: {
					cs: [{
						required: true,
						message: '请输入床数',
						trigger: 'blur'
					}, ],
					ccDate: [{
						required: true,
						message: '请选择裁床日期',
						trigger: 'change'
					}],
					jhDate: [{
						required: true,
						message: '请选择交货日期',
						trigger: 'change'
					}]
				},
				dialog: false,
				detailData: {
					style_no: '',
					style_name: '',
					style_category_id: '',
					customer_id: '',
					department_id: '',
					production_process_id: '',
					unit_price_mode: '0',
					picture: '',
					processs: [],
					sizes: [],
					colors: [],
					mode: '默认单价',
					classify: '',
					remark: '',
					
				},
				addColor: '',
				addSize: '',
				colorListValue: [],
				colorListOptions: [],
				sizeListOptions: [],
				addStyle: '',
				styleListOptions: [],
				departmentList: [],
				desk: '',
				mode: '',
				ccDialog: false,
				tablePrice: '价格',
				priceContent: null,
				sizeList: [],
				gwList: [],
				customColumn: [],
				customIndex: 0,
				isAllSelectColorBtn: '选择所有',
				isAllSelectSizeBtn: '选择所有',
				colorList: [],
				bossListValue: [],
				addBoss: '',
				bossListOptions: [],
				modeDisabled: false,
				showUploadImage: false,
				lineIndex: 0, // 点击哪行table
				diyTableData: [],
				diyTableColumn: [],
				nn: 0,
				tableTypeData: [],
				dualNumber: 0
			}
		},
		components: {
			'upload-image': UploadImage
		},
		watch: {
			customColumn(data) {
				if (data.length === 0) {
					this.modeDisabled = false
				} else {
					this.modeDisabled = true
				}
			}
		},
		created() {
			this.sizeList = [{
					item: '32',
					isActive: false
				},
				{
					item: '31',
					isActive: false
				},
				{
					item: '30',
					isActive: false
				},
				{
					item: '29',
					isActive: false
				},
				{
					item: '28',
					isActive: false
				},
				{
					item: '27',
					isActive: false
				},
				{
					item: '26',
					isActive: false
				},
				{
					item: '4XL',
					isActive: false
				},
				{
					item: '3XL',
					isActive: false
				},
				{
					item: '2XL',
					isActive: false
				},
				{
					item: 'XL',
					isActive: false
				},
				{
					item: 'L',
					isActive: false
				},
				{
					item: 'M',
					isActive: false
				},
				{
					item: 'S',
					isActive: false
				},
				{
					item: 'XS',
					isActive: false
				}
			]

			this.gwList = [{
					item: '冚车',
					isActive: false
				},
				{
					item: '打边',
					isActive: false
				},
				{
					item: '平车',
					isActive: false
				},
				{
					item: '裁床师',
					isActive: false
				},
				{
					item: '厂长',
					isActive: false
				}
			]

		

			// 尺码组合
			this.sizeListOptions = []

			// 款式组合
			this.styleListOptions = []

			// 客户组合
			this.bossListOptions = [{
					label: '李总',
					value: 1
				},
				{
					label: '刘总',
					value: 2
				},
				{
					label: '王总',
					value: 3
				}
			]

			for (let i in this.dataList2) {
				let item = this.dataList2[i]
				for (let k = 0; k < 16; k++) {
					this.$set(item, 'a' + k, 0)
				}
			}

			if (this.selectColorArrTag.length !== this.colorArrTag.length) {
				// 显示全选按钮
				this.isAllColorTag = false
			} else {
				this.isAllColorTag = true
			}


			// 颜色、尺码组合回显
			for (let i in this.selectColorArrTag) {
				let item = this.selectColorArrTag[i]
				for (let k in this.colorArrTag) {
					let item2 = this.colorArrTag[k]
					if (item2.color === item.color) {
						item2.isActive = true
						continue
					}
				}
			}
			for (let i in this.selectSizeArrTag) {
				let item = this.selectSizeArrTag[i]
				for (let k in this.sizeArrTag) {
					let item2 = this.sizeArrTag[k]
					if (item2.size === item.size) {
						item2.isActive = true
						continue
					}
				}
			}
			this.colorAdminFn()
			this.sizeAdminFn()
			this.clothing_categoryAdminFn()
			this.customerAdminFn()
			this.departmentFn()
				
		},
		methods: {
			colorAdminFn() {
				colorAdmin({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					this.colorListOptions = e.data.list;
				});
			},
			sizeAdminFn() {
				sizeAdmin({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					this.sizeListOptions = e.data.list;
				});
			},
			clothing_categoryAdminFn() {
				clothing_categoryAdmin({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					this.styleListOptions = e.data.list;
				});
			},
			customerAdminFn() {
				customerAdmin({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					this.bossListOptions = e.data.list;
				});
			},
			departmentFn() {
				department({
						page: 1,
						page_size: 100000,
					},
					"GET"
				).then((e) => {
					this.departmentList = e.data.list;
				});
			},


			
			toTemplate() {
				this.$router.push({
					path: '/template/part-template'
				})
			},
			clickStyleImage() {
				this.UploadImageType = 1
				this.showUploadImage = true
			},
			saveAndPreview(cdForm) {
				this.$refs[cdForm].validate((valid) => {
					if (valid) {
						if (this.diyTableColumn.length === 0 || this.diyTableData.length === 0) {
							this.$message({
								message: '请先设置裁床表',
								type: 'error'
							})
						}
					}
				})
			},
			// 自定义层号
			handleChangeZdych(bool) {

			},
			// 自定义扎号
			handleChangeZh(bool) {
				if (bool) {
					if (this.handleParams.customZs) this.handleParams.customZs = false


					for (let i in this.diyTableColumn) {
						let item = this.diyTableColumn[i]
						for (let k in this.diyTableData) {
							let item2 = this.diyTableData[k]
							item2['zh' + i] = this.handleParams.zsNumber
							this.handleParams.zsNumber += 1
						}
					}


				}
			},
			handleChangeZs(bool) {
				if (bool) {
					if (this.handleParams.customZh) this.handleParams.customZh = false

					for (let i in this.diyTableColumn) {
						let item = this.diyTableColumn[i]
						for (let k in this.diyTableData) {
							let item2 = this.diyTableData[k]
							item2['zs' + i] = '1'
						}
					}
				}
			},
			handleChangeDual(bool) {
				if (bool) {
					this.tableWidth += 80
					let obj = {
						dual: '倍数'
					}
					for (let i in this.diyTableColumn) {
						obj['dual' + i] = ''
					}

					this.diyTableData.unshift(obj)

				} else {
					this.tableWidth -= 80

				}

				this.$nextTick(() => { //在数据加载完，重新渲染表格
					if (this.$refs.diyTable) this.$refs.diyTable.doLayout()
				})
			},
			// 自定义层号
			handleChangeCh(bool) {
				if (bool) {
					this.tableWidth += 80
				} else {
					this.tableWidth -= 80
				}

				this.$nextTick(() => { //在数据加载完，重新渲染表格
					if (this.$refs.diyTable) this.$refs.diyTable.doLayout()

				})
			},
			// 新增样式
			handleChangeStyle(bool) {

			},
			// 删除列
			deleteTableColumn2(item, index, index2) {
				this.diyTableColumn.splice(index, 1)
				for (let i = 0; i < this.diyTableData.length; i++) {
					let item = this.diyTableData[i]
					delete item['gm' + index]
					delete item['zs' + index]
					delete item['ks' + index]
				}

				$('#diyTable .el-table__footer-wrapper .has-gutter tr').find('td').eq(index2 + 1).find('.cell').html(0)

				this.tableWidth -= 150


				// 修改扎数
				this.dealTotal((index2 - 1), true)
			},
			dealTotal(index, isDelete) {
				let zsTotal = null // 扎数

				if (zsTotal && zsTotal !== 0) {

				} else {
					zsTotal = 0
				}

				for (let i in this.diyTableData) {
					let item = this.diyTableData[i]
					let numTotal = 0
					for (let k in this.diyTableColumn) {
						let item2 = this.diyTableColumn[k]

						if (isDelete) {
							numTotal += Number(item[item2.label])
							// 赋值总计
							if (this.handleParams.dual && index === 0) {

							} else {
								this.diyTableData[i].total = numTotal
							}
						} else {
							if (Number(i) === index) {
								numTotal += Number(item[item2.label])
								// 赋值总计
								if (this.handleParams.dual && index === 0) {

								} else {
									this.diyTableData[index].total = numTotal
								}
							}
						}

						//总扎数
						if (Number(item[item2.label]) !== 0) {
							zsTotal += 1
						}

					}
				}
				this.totalZs = zsTotal


				this.$nextTick(() => { //在数据加载完，重新渲染表格
					if (this.$refs.diyTable) this.$refs.diyTable.doLayout()
				})
			},
			topDualChange(index, e) {
				for (let i in this.diyTableColumn) {
					let item = this.diyTableColumn[i]
					let label = item.label
					for (let k in this.diyTableData) {
						let item2 = this.diyTableData[k]
						if (Number(k) !== 0) {
							item2[label] = Number(this.diyTableData[0][label]) * Number(item2.dual)
						}

					}
				}
			},
			// 表格新增款号
			selectStyleTable(dataIndex, columnIndex) {
				this.isTableSelect = true // 从表格中打开“选择款式”
				this.tableCustomStyleObj = {
					dataIndex,
					columnIndex
				}
				this.dialogTableVisible = true
			},
			changeTableInput(index, e) {
				// 判断是否需要处理扎数
				if (this.handleParams.customZs) {
					this.dealZsTotal(index)
				} else {
					this.dealTotal(index)
				}
			},
			// 重载扎数合计
			dealZsTotal(index) {
				let _this = this
				// 赋值到底部合计行
				for (let i in this.diyTableColumn) {
					let item = this.diyTableColumn[i]
					let ii = Number(i)
					let footTotal = 0
					for (let k in this.diyTableData) {
						let item2 = this.diyTableData[k]
						let kk = Number(k)
						let $tr = $('#diyTable').find('.el-table__body-wrapper tbody tr').eq(kk)
						let $td = $tr.find('td').eq(ii + 1) // 开启倍数和层号需再判断
						let $input = $td.find('.el-input') // 左边的扎数
						let $rightInput = $td.find('.el-input').next() // 左边的扎数

						let leftValue = $input.find('input').val() * 1
						let rightInput = $rightInput.find('input').val() * 1
						if (footTotal === 0) {
							footTotal = leftValue * rightInput
						} else {
							footTotal = footTotal + (leftValue * rightInput)
						}

						$('#diyTable .el-table__footer-wrapper .has-gutter tr').find('td').eq(ii + 1).find('.cell').html(
							footTotal)
					}
				}


				// 赋值到右边合计行
				for (let i in this.diyTableData) {
					let item = this.diyTableData[i]
					let ii = Number(i)
					let rightTotal = 0
					for (let k in this.diyTableColumn) {
						let item2 = this.diyTableColumn[k]
						let kk = Number(k)
						let $tr = $('#diyTable').find('.el-table__body-wrapper tbody tr').eq(ii)
						let $td = $tr.find('td').eq(kk + 1) // 开启倍数和层号需再判断
						let $input = $td.find('.el-input') // 左边的扎数
						let $rightInput = $td.find('.el-input').next() // 左边的扎数

						let leftValue = $input.find('input').val() * 1
						let rightInput = $rightInput.find('input').val() * 1

						if (rightTotal === 0) {
							rightTotal = leftValue * rightInput
						} else {
							rightTotal = rightTotal + (leftValue * rightInput)
						}

						item['total'] = rightTotal

						console.log(rightTotal, '对昂打完', index)
					}
				}
			},
			changeTableZsInput(dataIndex, index, value) {
				this.dealZsTotal(dataIndex)
			},
			// 点击table上面的尺码
			clickTableSize(index, sizeData) {
				let itemData = {}
				let oldIndex = 0
				let newIndex = 0
				if (this.diyTableColumn.length > 0) {
					oldIndex = this.diyTableColumn[this.diyTableColumn.length - 1].zIndex
					newIndex = oldIndex + 1
				} else {
					newIndex = 0
				}


				let label = 'gm' + newIndex
				itemData.label = label
				itemData['zIndex'] = newIndex
				itemData['size'] = sizeData.size

				for (let item of this.diyTableData) {
					this.$set(item, 'gm' + newIndex, '')
					this.$set(item, 'zs' + newIndex, 1)
					this.$set(item, 'ks' + newIndex, '更改款式')
				}


				this.diyTableColumn.push(itemData)

				this.tableWidth += 150

				this.$nextTick(() => { //在数据加载完，重新渲染表格
					if (this.$refs.diyTable) this.$refs.diyTable.doLayout()
				})

			},
			// 点击table左边的颜色
			clickTableColor(itemData) {
				let obj = {
					color: itemData.color,
					total: 0,
					ch: '',
					dual: ''
				}

				for (let i in this.diyTableColumn) {
					let item = this.diyTableColumn[i]
					obj[item.label] = ''
				}

				this.diyTableData.push(obj)

				let nn = 0
				for (let i in this.diyTableColumn) {
					let item = this.diyTableColumn[i]
					let label = 'gm' + i
					item.label = label

					for (let item2 of this.diyTableData) {

						nn += 1
						let zsNum = item2['zs' + i] // 每列的扎数
						if (!zsNum && zsNum != 1) {
							this.$set(item2, 'zs' + i, '1')
						}

						let ksText = item2['ks' + i] // 每列的新增款式
						if (!ksText && ksText !== '更改款式') {
							this.$set(item2, 'ks' + i, '更改款式')
						}


						if (!item2['gm' + i] || 'gm' + i === 0) {
							item2['gm' + i] = ''
						}
						item2['cIndex'] = i
					}

				}

			},
			deletTableColor(index) {
				this.diyTableData.splice(index, 1)
			},
			// 删除颜色tag
			deleteTag(item, index) {
				this.colorArrTag[index].isActive = false
				this.selectColorArrTag.splice(index, 1)

				for (let i in this.colorArrTag) {
					if (this.colorArrTag[i].color === item.color) {
						this.colorArrTag[i].isActive = false
					}
				}

				this.isAllColorTag = false

			},

			getSummaries(param) {
				const _this = this
				let columns = param.columns
				let data = param.data
				const sums = [];

				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计';
					} else {
						const values = data.map(item => Number(item[column.property]));
						if (!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr);

								if (!isNaN(value)) {

									if (this.handleParams.customZs) {
										return prev + curr
									} else {
										return prev + curr
									}


								} else {
									if (this.handleParams.customZs) {
										console.log('二', index)
										return prev
									} else {
										return prev
									}

								}

							}, 0)
						} else {


							sums[index] = ''
						}
					}
				});




				if (_this.handleParams.dual) {
					let arr = []
					for (let i in sums) {
						let item = sums[i]
						let index = Number(i)
						if (index !== 0 && index !== 1 && index !== (sums.length - 1)) {
							let label = _this.diyTableColumn[index - 2].label
							let dualNum = _this.diyTableData[0][label] || 0

							item = item - dualNum

						}
						arr.push(item)
					}
					return arr
				} else {
					return sums
				}

			},

			// 新增颜色item
			clickAddColorTag() {
				for (let i in this.colorArrTag) {
					let item = this.colorArrTag[i]

					if (this.colorTagValue === item.color) {
						this.$message({
							message: '颜色已存在',
							type: 'error'
						})
						return
					}
				}
				let obj = {
					color: this.colorTagValue,
					isActice: false
				}

				this.colorArrTag.unshift(obj)
				this.colorTagValue = ''
			},
			// 点击全选，取消全选
			clickSelectAllColor() {
				if (this.colorArrTag.length === this.selectColorArrTag.length) {
					// 是全选
					for (let i in this.colorArrTag) {
						this.colorArrTag[i].isActive = false
					}
					this.isAllColorTag = false
					this.selectColorArrTag = []
				} else {
					// 不是全选
					this.selectColorArrTag = []
					for (let i in this.colorArrTag) {
						this.colorArrTag[i].isActive = true
						this.selectColorArrTag.push(this.colorArrTag[i])
					}
					this.isAllColorTag = true
				}
			},
			// 添加颜色tag
			clickSelectTag(index) {
				this.colorArrTag[index].isActive = true

				let arr = []
				for (let i in this.colorArrTag) {
					let item = this.colorArrTag[i]
					if (item.isActive) {
						arr.push(item)
					}
				}

				this.selectColorArrTag = arr
			},
			// 删除尺码tag
			deleteSizeTag(item, index) {
				this.sizeArrTag[index].isActive = false
				this.selectSizeArrTag.splice(index, 1)

				for (let i in this.sizeArrTag) {
					if (this.sizeArrTag[i].size === item.size) {
						this.sizeArrTag[i].isActive = false
					}
				}
				this.isAllSizeTag = false

			},
			// 新增尺码item
			clickAddSizeTag() {
				for (let i in this.sizeArrTag) {
					let item = this.sizeArrTag[i]

					if (this.sizeTagValue === item.size) {
						this.$message({
							message: '尺码已存在',
							type: 'error'
						})
						return
					}
				}
				let obj = {
					size: this.sizeTagValue,
					isActice: false
				}

				this.sizeArrTag.unshift(obj)

				this.sizeTagValue = ''
			},
			// 点击尺码全选，取消全选
			clickSelectAllSize() {
				if (this.sizeArrTag.length === this.selectSizeArrTag.length) {
					// 是全选
					for (let i in this.sizeArrTag) {
						this.sizeArrTag[i].isActive = false
					}
					this.isAllSizeTag = false
					this.selectSizeArrTag = []
				} else {
					// 不是全选
					this.selectSizeArrTag = []
					for (let i in this.sizeArrTag) {
						this.sizeArrTag[i].isActive = true
						this.selectSizeArrTag.push(this.sizeArrTag[i])
					}
					this.isAllSizeTag = true
				}
			},
			// 添加尺码tag
			clickSizeSelectTag(index) {
				this.sizeArrTag[index].isActive = true

				let arr = []
				for (let i in this.sizeArrTag) {
					let item = this.sizeArrTag[i]
					if (item.isActive) {
						arr.push(item)
					}
				}

				this.selectSizeArrTag = arr
			},

			clickAddCs() {
				this.cdFormData.cs = 2
			},
			selectThisStyle(row) {
				if (this.isTableSelect) {
					const {
						dataIndex,
						columnIndex
					} = this.tableCustomStyleObj
					this.diyTableData[dataIndex]['ks' + columnIndex] = row.name
					console.log(this.diyTableData)


				} else {
					this.ccFormData.styleCode = row.id
					this.ccFormData.style_name = row.name
				}



				this.dialogTableVisible = false
			},
			selectImageData(data) {
				if (this.UploadImageType === 1) {
					for (let i in data) {
						let item = data[i]
						this.srcList.push(item.img)
					}
				}

				if (this.UploadImageType === 2) {
					for (let i = 0; i < this.dataList2.length; i++) {
						let item = this.dataList2[i]

						if (this.lineIndex === i) {
							this.$set(item, 'img', data[0].img)
						}

					}
				}

			},
			clickUpload(index) {
				this.lineIndex = index
				this.UploadImageType = 2
				this.showUploadImage = true
			},
			deleteItem(e, index) {
				this.dataList2.splice(index, 1)
			},
			selectGw() {
				this.modeDisabled = true
				let arr = []
				let columnTitle = arr.join(',')
				let obj = {
					size: columnTitle,
					id: columnTitle,
					value: 0
				}

				this.customColumn.push(obj)

				// 重置选择
				for (let i in this.gwList) {
					this.gwList[i].isActive = false
				}
			},
			colorChange() {
				if (this.detailData.colors.length !== this.colorListOptions) {
					this.isAllSelectColorBtn = '选择所有'
				}
			},
			selectAllColor() {
				if (this.isAllSelectColorBtn === '取消所有') {
					this.isAllSelectColorBtn = '选择所有'
					this.detailData.colors = []
				} else {
					this.isAllSelectColorBtn = '取消所有'
					for (let i in this.colorListOptions) {
						let item = this.colorListOptions[i]
						this.detailData.colors.push(item.id)
					}
				}

			},
			sizeChange() {
				if (this.detailData.colors.length !== this.colorListOptions) {
					this.isAllSelectColorBtn = '选择所有'
				}
			},
			selectAllSize() {
				if (this.isAllSelectSizeBtn === '取消所有') {
					this.isAllSelectSizeBtn = '选择所有'
					this.detailData.sizes = []
				} else {
					this.isAllSelectSizeBtn = '取消所有'
					for (let i in this.sizeListOptions) {
						let item = this.sizeListOptions[i]
						this.detailData.sizes.push(item.id)
					}
				}
			},
			// 确定尺码
			selectSize() {
				let arr = []
				for (let i in this.sizeList) {
					let item = this.sizeList[i]
					if (item.isActive) {
						item['disabled'] = true
						arr.push(item.item)
					}
				}

				let columnTitle = arr.join(',')
				let obj = {
					size: columnTitle,
					id: columnTitle,
					value: 0
				}

				this.customColumn.push(obj)

				// 重置选择
				for (let i in this.sizeList) {
					this.sizeList[i].isActive = false
				}
			},
			// 删除尺码
			deleteTableColumn(row, index) {
				this.customColumn.splice(index, 1)

				// 判断是不是多尺码 31,32
				let sizeArr = row.size.split(',')

				for (let i in this.sizeList) {
					let item = this.sizeList[i]
					for (let k in sizeArr) {
						let item2 = sizeArr[k]
						if (item.item === item2) {
							item.isActive = false
							item.disabled = false
							break
						}
					}
				}
			},
			// 选择尺码
			clickTableAddSize(index) {
				if (this.detailForm.mode === '2') {
					if (!this.sizeList[index].disabled) {
						this.sizeList[index].isActive = !this.sizeList[index].isActive
					}
				} else {
					if (!this.gwList[index].disabled) {
						this.gwList[index].isActive = !this.gwList[index].isActive
					}
				}

			},
			modeChange(e) {
				if (e === '分码单价') {
					this.tablePrice = '价格 +'
				}

				if (e === '分岗位单价') {
					this.tablePrice = '价格 +'
				}

			},
			clickAddColor() {
				if (this.addColor !== '') {
					this.colorListOptions.push({
						label: this.addColor,
						value: this.colorListOptions.length + 1
					})

					this.addColor = ''
				}

			},
			clickAddSize() {
				if (this.addSize !== '') {
					this.sizeListOptions.push({
						label: this.addSize,
						value: this.sizeListOptions.length + 1
					})

					this.addSize = ''
				}
			},
			clickAddStyle() {
				if (this.addStyle !== '') {
					this.styleListOptions.push({
						label: this.addStyle,
						value: this.styleListOptions.length + 1
					})

					this.addStyle = ''
				}

			},
			clickAddBoss() {
				if (this.addBoss !== '') {
					this.bossListOptions.push({
						label: this.addBoss,
						value: this.bossListOptions.length + 1
					})

					this.addBoss = ''
				}
			},
			clickPreview(cdForm) {
				this.$refs[cdForm].validate((valid) => {
					if (valid) {
						if (this.totalZs === 0) {
							this.$message({
								type: 'error',
								message: '请先设置裁床表'
							})
							return
						}

						let arr = []

						for (let i = 0; i < this.diyTableData.length; i++) {
							let item = this.diyTableData[i]
							let obj = {}
							obj['color'] = item.color
							for (let j = 0; j < this.diyTableColumn.length; j++) {
								let item2 = this.diyTableColumn[j]
								obj = JSON.parse(JSON.stringify(obj))
								obj['size'] = this.diyTableColumn[j].size

								for (let jj = 0; jj < 200; jj++) {
									if (item2.label === 'gm' + jj) {
										obj['number'] = item['gm' + jj]
										obj['zh'] = item['zh' + jj]
										arr.push(obj)
									}
								}
							}
						}

						this.tableTypeData = arr

						this.previewDialog = true
					}
				})

			},
			changeStyle() {
				this.isTableSelect = false // 不是表格中打开“选择款式”
				this.dialogTableVisible = true
			},
			reset() {
				for (let i in this.searchParams) {
					this.searchParams[i] = null
				}
			},
			reset2() {
				for (let i in this.styleSearchParams) {
					this.searchParams[i] = null
				}
			},
			styleTableSearch() {

			},
			addList() {
				this.detailData = {
					mode: '默认单价',
					classify: ''
				}
				this.dailogTitle = '修改'
				this.dialog = true
				this.setSort()
			},
			deleteList() {},
			handleEdit(item) {
				this.detailData = {
					mode: '默认单价',
					classify: ''
				}



				this.dailogTitle = '修改'
				this.dialog = true
				this.setSort()
			},
			handleCcbf() {
				this.ccDialog = true
			},
			handleSizeChange() {},
			handleCurrentChange() {},
			clickItem() {},
			setSort() {
				this.$nextTick(() => {
					const el = this.$refs.dragTable.$el.querySelectorAll(
						'.el-table__body-wrapper > table > tbody')[0]
					new Sortable(el, {
						animation: 150,
						ghostClass: 'blue-background-class'
					})
				})
			},
			addGxData() {
				let obj = {
					avatar: '',
					id: '',
					price: 0,
					price2: 0,
					gw: [],
					remark: '',
				}
				this.dataList2.push(obj)
			},

			clearTable() {
				this.diyTableData = []
				this.diyTableColumn = []
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	#diyTable {
		.table-add-kh {
			height: 40px;
			width: 60px;
			color: $fontColor;
			background-color: #FDF0E5;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
			border-radius: 5px;
			margin-right: 5px;
		}
	}

	.table-bottom {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		border: 1px solid #eee;
		border-top: none;
		overflow-x: auto;
		// max-width: calc(100% - 350px) !important;
		max-width: calc(100%) !important;
	}

	.preview-info {
		margin-bottom: 20px;
	}

	.diy-table {
		.zszh {
			display: flex;
			justify-content: space-around;
		}

	}

	.order-table {
		width: 100%;
		min-height: 400px;
		margin-top: 20px;
		border: 1px solid #ccc;

		.order-table-bottom {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.middle {
				width: calc(100% - 350px);
				min-height: calc(400px - 53px);
				padding: 10px;
				overflow: hidden;

				.no-data {
					color: #777;
					font-size: 12px;
				}

			}

			.name {
				width: 150px;
				min-height: calc(400px - 53px);
				display: flex;
				align-items: center;
				flex-direction: column;
				font-weight: bold;
				font-size: 12px;
				color: #000;
				border-right: 1px solid #ccc;
				padding: 10px;
				cursor: pointer;

				.item {
					margin-top: 10px;
					font-size: 20px;
					color: $fontColor;
					background-color: #FDF0E5;
					height: 32px;
					line-height: 32px;
					border-radius: 4px;
					padding: 0 12px;
					user-select: none;
				}

				p {
					margin: 3px 0;
				}
			}

			.handle {
				width: 200px;
				min-height: calc(400px - 53px);
				padding: 10px;
				border-left: 1px solid #ccc;

				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20px;
				}
			}
		}

		.order-table-header {
			width: 100%;
			height: 53px;
			border-bottom: 1px solid #ccc;
			display: flex;
			align-items: center;

			.name {
				width: 150px;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 12px;
				color: #000;
				border-right: 1px solid #ccc;
			}

			.size-arr {
				width: calc(100% - 150px);
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				span {
					color: #000;
					font-size: 12px;
					font-weight: bold;
				}

				.item {
					height: 32px;
					font-size: 20px;
					border-radius: 4px;
					padding: 0 12px;
					line-height: 32px;
					margin-left: 10px;
					color: $fontColor;
					background-color: #FDF0E5;
					cursor: pointer;
					user-select: none;
				}
			}
		}
	}


	::v-deep .el-popover {
		background-color: paleturquoise !important;
	}

	::v-deep .size-list-item {
		&:hover {
			background-color: #eee;
		}
	}

	::v-deep .isActive {
		background-color: $btnColor !important;
		color: #fff;
	}

	::v-deep .isDisabled {
		color: #ccc;

		&:hover {
			cursor: not-allowed;
		}
	}

	::v-deep .lgm-form-item {
		width: 35% !important;
		margin-bottom: 25px;

		::v-deep textarea {
			height: 100%;
		}

	}

	::v-deep .lgm-form-item2 {
		width: 100% !important;
		margin-bottom: 25px;

		.el-textarea__inner {
			height: 75px;
		}

	}

	.color-arr-top {
		display: flex;
		flex-wrap: wrap;

		.color-arr-top-item-tag {
			height: 24px;
			border-radius: 5px;
			background-color: #f4f4f5;
			color: #909399;
			margin-bottom: 5px;
			margin-right: 5px;
			padding: 0 8px;
			line-height: 24px;
			cursor: pointer;
		}

		.tag-isActive {
			background-color: #fbe1cc;
			color: $fontColor;
		}
	}

	.color-arr-bottom {
		display: flex;
		justify-content: center;
		align-items: center;

		.left {
			display: flex;
			justify-content: center;
			align-items: center;

			.input {
				width: 140px;
			}

			.add-btn {
				width: 112px;
				height: 40px;
				background-color: #000;
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #909399;
				background-color: #F5F7FA;
				cursor: pointer;
				user-select: none;
			}
		}
	}



	.app-container {

		.cc-dialog {
			.cc-header {
				display: flex;



				.item {
					margin-right: 50px;
					display: flex;
					align-items: center;

					b {
						color: #000
					}

				}
			}

			.cd-form {
				display: flex;
				flex-wrap: wrap;

				.color-arr {
					min-height: 50px;
					border: 1px solid #dcdfe6;
					border-radius: 4px;
					padding: 10px;
					display: flex;
					flex-wrap: wrap;

					.el-tag {
						margin-right: 5px !important;
						margin-bottom: 5px !important;
					}

				}


				.lgm-form-item-year {
					::v-deep .el-form-item__content {
						display: flex;
					}

					.el-input {
						flex: 1
					}

					.el-select {
						width: 90px;
					}

					.add-btn {
						width: 90px;
						height: 100%;
						background-color: #eee;
						display: flex;
						justify-content: center;
						align-items: center;
						cursor: pointer;
					}
				}

			}
		}

		::v-deep .el-dialog__wrapper {
			position: absolute !important;
		}

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



		.edit-dialog {
			display: flex;
			flex-wrap: wrap;

			.detail-table {
				margin-top: 20px;
			}

			.hj {
				padding: 10px 0;

				span {
					margin-right: 20px;
				}
			}

			.upload-image {
				width: 40px;
				height: 40px;
				border-radius: 6px;
				border: 1px dashed #ccc;
				margin: 0 auto;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					border-color: $fontColor;
				}
			}

			.add-gx {
				width: 100%;
				height: 32px;
				border-radius: 20px;
				margin-top: 20px;
				border: 1px solid #eee;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;

				&:hover {
					background-color: #fdf0e5 !important;
					color: $fontColor;
				}
			}

			.tips {
				font-size: 12px;
				color: #777777;
			}

			.update-image-wrap {
				display: flex;


				.update-image {
					width: 78px;
					height: 78px;
					border-radius: 6px;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px dashed #ccc;
					cursor: pointer;
					background-color: #fafafa;

					&:hover {
						border-color: $fontColor;
					}
				}
			}




		}


		::v-deep .header {
			display: flex;
			justify-content: space-between;
			color: #fff;

		}




	}
</style>