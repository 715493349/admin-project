<!--
 * @Author: luoheng
 * @Date: 2022-02-28 00:44:32
 * @LastEditTime: 2022-02-28 01:33:51
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs class="tab">
          <el-tab-pane label="销售额" name="first"></el-tab-pane>
          <el-tab-pane label="访问量" name="second"></el-tab-pane>
        </el-tabs>
        <!-- 右侧内容· -->
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
            class="data"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.data{
  width: 200px;
  margin: 0 20px;
}
.span{
    margin: 0 20px;
  }
</style>