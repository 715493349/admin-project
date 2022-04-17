<!--
 * @Author: luo_h603
 * @Date: 2022-02-21 00:07:58
 * @LastEditTime: 2022-03-21 18:06:24
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <el-card>
      <el-button type="primary" plain @click="add">添加角色</el-button>
      <el-button type="danger" plain>删除</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button type="text"
              ><i class="el-icon-sunny"></i> 查看</el-button
            >
            <el-button type="text" @click="edit"
              ><i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button type="text"
              ><i class="el-icon-delete"></i> 删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Text",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
      dialogVisible: false,
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      this.dialogVisible = true;
    },
    edit() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
</style>