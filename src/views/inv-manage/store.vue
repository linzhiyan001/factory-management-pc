<template>
    <div class="app-container">

        <div class="content">
            <div class="lgm-search">
                <el-form ref="form" :model="searchParams" label-width="100px" class="search-form">
                    <el-form-item label="仓库名称">
                        <el-input v-model="searchParams.code" placeholder="请输入仓库名称"></el-input>
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
                    <el-table-column prop="number" label="仓库编码" align="center"></el-table-column>
                    <el-table-column prop="code" label="仓库名称" align="center"></el-table-column>
                    <el-table-column prop="cpfl" label="仓库位置" align="center"></el-table-column>
                    <el-table-column prop="cpmc" label="仓库联系人" align="center"></el-table-column>
                    <el-table-column prop="size" label="联系电话" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="280">
                        <template slot-scope="scope">
                            <div class="flex">
                                <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit"></i> 修改
                                </el-button>
                                <el-button size="mini" type="danger" plain @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-delete"></i> 删除
                                </el-button>
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
    </div>
</template>

<script>
export default {
    name: 'StyleManage',
    data() {
        return {
            searchParams: {
                styleName: ''
            },
            dataList: [
                {
                    avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    number: '000001',
                    code: '深圳仓',
                    cpfl: '白云街道',
                    cpmc: '杰克',
                    color: '13888888888'
                },
                
            ]
        }
    },
    methods: {
        reset() {
            for (let i in this.searchParams) {
                this.searchParams[i] = null
            }
        },
        clickItem() {
            console.log(456)
        }
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
    }

    .lgm-search {
        ::v-deep input {
            width: 210px;
        }
    }

    .content {}

}
</style>
