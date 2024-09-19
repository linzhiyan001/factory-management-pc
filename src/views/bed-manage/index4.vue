<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="80px" class="search-form">
                    <el-form-item label="款式名称">
                        <el-input v-model="searchParams.styleName" placeholder="请输入床号、款号、款式、客户名称查询"></el-input>
                    </el-form-item>
                    <el-form-item label="交货日期">
                        <el-date-picker v-model="searchParams.time2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="裁床日期">
                        <el-date-picker v-model="searchParams.time1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-row>
                        <el-button type="success" class="lgm-search-btn" icon="el-icon-search">搜索</el-button>
                        <el-button class="lgm-reset-btn" icon="el-icon-refresh" @click="reset">重置</el-button>
                    </el-row>
                </el-form>
            </div>

            <div class="table-header-btn">
                <div class="left">
                    <el-button type="danger" plain size="small" icon="el-icon-delete" @click="deleteList">删除</el-button>
                </div>
                <div class="right">
                    <download-excel ref="export" class="export-excel-wrapper" :data="dataList" :fields="json_fields" header="裁床表" name="裁床表.xls">
                        <el-button type="success" size="small">
                            <el-image :src="require('@/assets/images/export.png')" class="export-icon"></el-image>
                            导出
                        </el-button>
                    </download-excel>
                    <div class="column-setting">

                        <!-- 列设置 -->
                        <el-popover placement="bottom" width="350" trigger="click" title="" popper-class="table-popover">
                            <span slot="reference">
                                <i class="el-icon-setting"></i>
                            </span>
                            <slot>
                                <div class="c-header">
                                    <el-checkbox v-model="cloumnSetting" @change="changeCloumnHead">列展示</el-checkbox>
                                </div>
                                <div class="c-content">
                                    <div class="item" v-for="(item, index) of cDataList" :key="index">
                                        <el-checkbox v-model="item.check" @change="changeCloumnItem">{{ item.title }}</el-checkbox>
                                    </div>
                                </div>
                            </slot>

                        </el-popover>

                    </div>

                </div>
            </div>

            <div class="table">
                <el-table :data="dataList" border>
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="id" label="制单号" align="center" min-width="240" v-if="cDataList[0].check"></el-table-column>
                    <el-table-column prop="code" label="款式编号" align="center" min-width="240" v-if="cDataList[1].check"></el-table-column>></el-table-column>
                    <el-table-column prop="name2" label="款式名称" align="center" min-width="200" v-if="cDataList[2].check"></el-table-column>
                    <el-table-column prop="cc" label="床次" align="center" width="140" v-if="cDataList[3].check"></el-table-column>
                    <el-table-column prop="js" label="裁床件数" align="center" width="140" v-if="cDataList[4].check"></el-table-column>
                    <el-table-column prop="name" label="客户名称" align="center" min-width="200" v-if="cDataList[5].check"></el-table-column>
                    <el-table-column prop="size" label="尺码组合" align="center" min-width="200" v-if="cDataList[6].check"></el-table-column>
                    <el-table-column prop="color" label="颜色组合" align="center" min-width="200" v-if="cDataList[7].check"></el-table-column>
                    <el-table-column prop="img" label="图片" align="center" width="140" v-if="cDataList[8].check">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.img" fit="cover" style="width: 80px;height: 80px;" :preview-src-list="srcList" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="工价" align="center" width="140" v-if="cDataList[9].check"></el-table-column>
                    <el-table-column prop="jhrq" label="交货日期" align="center" width="140" v-if="cDataList[10].check"></el-table-column>
                    <el-table-column prop="ccrq: '2024-05-04'," label="裁床日期" align="center" width="140" v-if="cDataList[11].check"></el-table-column>
                    <el-table-column prop="remark" label="备注" align="center" min-width="200" v-if="cDataList[12].check"></el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="280">
                        <template slot-scope="scope">
                            <div class="flex">
                                <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit"></i> 修改
                                </el-button>
                                <el-button size="mini" type="danger" plain @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-delete"></i> 删除
                                </el-button>
                                <el-button size="mini" type="success" plain @click="handleDelete(scope.$index, scope.row)">复制裁床单</el-button>
                                <el-button size="mini" type="warning" plain @click="handleDelete(scope.$index, scope.row)">导出裁床单</el-button>
                                <el-button size="mini" type="info" plain @click="handleEdit(scope.$index, scope.row)">打印菲票</el-button>
                                <el-button size="mini" class="lgm-add-btn" plain @click="handleDelete(scope.$index, scope.row)">查看明细</el-button>
                                <el-button size="mini" type="info" plain @click="handleDelete(scope.$index, scope.row)">打印裁床单</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="lgm-page-wrap">
                <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 100, 200, 300, 400]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination> -->
            </div>


        </div>
    </div>
</template>

<script>
    import DownloadExcel from 'vue-json-excel'
    export default {
        name: 'BedManage',
        data() {
            return {
                json_fields: {},
                cDataList: [],
                cloumnSetting: true,
                searchParams: {
                    styleName: '',
                    time1: '',
                    time2: ''
                },
                srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
                dataList: [{
                        id: '001',
                        code: '001',
                        name2: '牛仔裤',
                        cc: '1',
                        js: 100,
                        name: '刘总',
                        size: '29,30',
                        color: '黑色',
                        img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                        price: '10.00',
                        jhrq: '2024-06-04',
                        ccrq: '2024-05-04',
                        remark: ''
                    }
                ]
            }
        },
        components: {
            'download-excel': DownloadExcel
        },
        watch: {
            cDataList: {
                handler(data) {
                    let obj = {}
                    for (let item of data) {
                        if (item.check) {
                            obj[item.title] = item.filed
                            console.log(item, 123)
                        }
                    }
                    console.log(obj)
                    
                    this.json_fields = obj
                },
                deep: true
            }
        },
        created() {
            let localColumn = JSON.parse(localStorage.getItem('cDataList'))

            if (localColumn) {
                this.cDataList = localColumn
                for (let item of this.cDataList) {
                    if (!item.check) {
                        this.cloumnSetting = false
                        break
                    } else {
                        this.cloumnSetting = true
                    }
                }

            } else {
                this.cDataList = [
                    { title: '制单号', check: true, filed: 'id' },
                    { title: '款式编号', check: true, filed: 'code' },
                    { title: '款式名称', check: true, filed: 'name' },
                    { title: '床次', check: true, filed: 'cc' },
                    { title: '裁床件数', check: true, filed: 'js' },
                    { title: '客户名称', check: true, filed: 'id' },
                    { title: '尺码组合', check: true, filed: 'size' },
                    { title: '颜色组合', check: true, filed: 'color' },
                    { title: '图片', check: true, filed: 'img' },
                    { title: '工价', check: true, filed: 'price' },
                    { title: '交货日期', check: true, filed: 'jhrq' },
                    { title: '裁床日期', check: true, filed: 'ccrq' },
                    { title: '备注', check: true, filed: 'remark' }
                ]

                this.cloumnSetting = true
            }
        },
        methods: {
            changeCloumnHead(bool) {
                if (bool) {
                    for (let item of this.cDataList) {
                        item.check = true
                    }

                }
            },
            changeCloumnItem(bool) {
                if (bool) {
                    for (let item of this.cDataList) {
                        if (!item.check) {
                            this.cloumnSetting = false
                            break
                        } else {
                            this.cloumnSetting = true
                        }
                    }
                } else {
                    this.cloumnSetting = false
                }

                localStorage.setItem('cDataList', JSON.stringify(this.cDataList))
            },
            reset() {
                for (let i in this.searchParams) {
                    this.searchParams[i] = null
                }
            },
            clickItem() {
                console.log(456)
            },
            deleteList() {

            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .c-header {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    
    .c-content {
        .item {
            padding: 10px 20px 10px 50px;
        }
    }


    .app-container {
        .table-header-btn {
            display: flex;
            justify-content: space-between;

            .right {
                display: flex;
                align-items: center;

                .column-setting {
                    margin-left: 10px;

                    .el-icon-setting {
                        font-size: 20px;
                        color: $fontColor;
                    }

                }
            }
        }

        .content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
        }

        .table {
            .flex {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-around;

                ::v-deep button {
                    margin: 0;
                    margin-bottom: 5px;
                }
            }
        }

    }
</style>