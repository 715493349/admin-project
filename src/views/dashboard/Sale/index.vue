<!--
 * @Author: luoheng
 * @Date: 2022-02-28 00:44:32
 * @LastEditTime: 2022-02-28 03:23:30
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <!-- 右侧内容· -->
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
            v-model="value"
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
      <div>
        <el-row :gutter="10">
          <!-- 左边可视信息 -->
          <el-col :span="18">
            <div class="charts" ref="charts"></div>
          </el-col>
          <!-- 右边排序信息 -->
          <el-col :span="6" class="right">
            <div class="rg">
              <h3>门店销售额排名</h3>
              <ul>
                <li>
                  <span class="rindex">1</span>
                  <span>肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li>
                  <span class="rindex">2</span>
                  <span>肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li>
                  <span class="rindex">3</span>
                  <span>肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li class="rr">
                  <span>4</span>
                  <span class="rrg">肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li class="rr">
                  <span>5</span>
                  <span class="rrg">肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li class="rr">
                  <span>6</span>
                  <span class="rrg">肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li class="rr">
                  <span>7</span>
                  <span class="rrg">肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
                <li class="rr">
                  <span>8</span>
                  <span class="rrg">肯德基</span>
                  <span class="rvalue">12313</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      activeName: "sale",
      value:''
    };
  },
  mounted() {
    // 初始化echarts实例
    let mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [110, 52, 200, 334, 390, 330, 220, 389, 256, 415, 264, 199],
        },
      ],
    });
  },
  computed: {
    title(){
      
    }
  }
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
.data {
  width: 250px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
.rg {
  margin-top: -15px;
}
ul {
  list-style: none;
  width: 100%;
  height: 275px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.rindex {
  float: left;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  text-align: center;
}
.rvalue {
  float: right;
}
.rr {
  margin-left: 5px;
}
.rrg {
  padding-left: 3px;
}
</style>