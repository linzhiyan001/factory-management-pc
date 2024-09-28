<template>
    <div>
      <el-button @click="addColor('黄色')">添加颜色</el-button>
      <el-button @click="addColor('蓝色')">添加颜色</el-button>
      <el-button @click="addSize('尺码1')">添加尺码</el-button>
      <el-button @click="addSize('尺码2')">添加尺码</el-button>
  
      <el-table :data="tableData" border>
        <el-table-column label="颜色" width="120">
          <template slot-scope="scope">
            <div>
              {{ scope.row.color }}
              <el-button icon="el-icon-delete" @click="deleteColor(scope.row.color)" size="mini" type="danger" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(size, index) in sizes"
          :key="index"
          :label="size"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row[size.id]" placeholder="输入值"></el-input>
          </template>
          <template slot="header">
            <div>
              {{ size.name }}
              <el-button icon="el-icon-delete" @click="deleteSize(size.id)" size="mini" type="danger" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sizes: [],
        colors: [],
        tableData: [],
      };
    },
    methods: {
      addSize(sizeName) {
        const sizeId = `size-${sizeName}-${Date.now()}`; // 生成唯一的尺码ID
        this.sizes.push({ id: sizeId, name: sizeName });
        this.updateTableData();
      },
      addColor(color) {
        this.colors.push(color);
        this.updateTableData();
      },
      deleteSize(sizeId) {
        this.sizes = this.sizes.filter(s => s.id !== sizeId);
        this.updateTableData();
      },
      deleteColor(color) {
        this.colors = this.colors.filter(c => c !== color);
        this.updateTableData();
      },
      updateTableData() {
        this.tableData = this.colors.map(color => {
          const row = { color };
          this.sizes.forEach(size => {
            row[size.id] = ''; // 确保每个输入框独立
          });
          return row;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .el-table {
    margin-top: 20px;
  }
  </style>
  