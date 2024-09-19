<template>
    <div class="components-container">
        <el-select v-model="bedValue" placeholder="请选择床次">
            <div class="search-slot" slot="empty" style="padding: 10px;">
                <el-input v-model="searchParams" placeholder="快速查询过滤"></el-input>
                <div style="margin-top: 10px;">
                    <el-table :data="dataList" border>
                        <el-table-column type="selection" align="center" width="55"></el-table-column>
                        <el-table-column prop="_id" label="制单号" align="center" width="100"></el-table-column>
                        <el-table-column prop="name" label="款号" align="center" width="100"></el-table-column>
                        <el-table-column prop="name" label="床数" align="center" width="100"></el-table-column>
                        <el-table-column prop="name" label="裁床件数" align="center" width="100"></el-table-column>
                    </el-table>
                </div>
            </div>
        </el-select>
    </div>
</template>

<script>

export default {
    data() {
        return {
            bedValue: '',
            searchParams: '',
            dataList: [
                {
                    avatar: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    id: '001',
                    code: '001',
                    ccrq: '2024-05-04',
                    zs: 2,
                    color: '黑色',
                    name: '无',
                    orderNumber: '123332',
                    ch: '1',
                    time1: '2024-06-04',
                    js: 100,
                    size: '29,30',
                    sfsh: '否',
                    finishNumber: 10,
                    percentage: ''
                }
            ]
        }
    },

    created() {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped></style>
