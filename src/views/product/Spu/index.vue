<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 给组件绑定自定义事件 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <!-- 展示spu列表 -->
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="hh"
          :disabled="!category3Id"
          @click="addSpu"
          >添加spu</el-button
        >
        <!-- 表格 -->
        <el-table style="width: 100%" :data="records" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updataSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- @size-change="handleSizeChange" -->
        <!-- @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center"
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[3, 5, 10]"
          :page-size="4"
          layout="prev, pager, next, jumper,->, sizes, total"
          :total="20"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true,
      page: 1, //第几页
      limit: 3, //每页展示多少数据
      records: [], //列表数据
      total: 3, //展示条数
      scene: 0, //  0:spu列表数据     1:添加修改spu    2:添加sku
    };
  },
  methods: {
    // 三级联动的自定义事件，可以把子组件的相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // categoryId获取一二三及分类id，level区分几级id
      if (level == 1) {
        this.category1Id = categoryId;
        thisa.category2Id = "";
        thisa.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取spu数据
        this.getSpuList();
      }
    },
    // 获取spu列表数据
    async getSpuList() {
      // 解构数据
      const { page, limit, category3Id } = this;
      // 携带参数  pagel第几页 imit每页展示多少数据 category3Id三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.tobal = result.data.tobal;
        this.records = result.data.records;
      }
    },
    // 点击分页器第几页回调
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    // 分页器展示条数变化回调
    handleSizeChange() {
      console.log(limit);
    },
    // 添加spu按钮回调
    addSpu(){
      this.scene = 1
    },
    // 修改spu按钮回调
    updataSpu(row){
      this.scene = 1
      // 获取子组件spuform子组件    在父组件通过$ref获取组件
      // console.log(this.$refs.spu);
      // console.log(row);
      this.$refs.spu.initSpuData(row)
    },
    // 自定义事件回调 (spuform)
    changeScene(scene){
      // console.log(scene);
      // 切换场景
      this.scene = scene
    }
  },
};
</script>

<style  scope>
.hh {
  margin-bottom: 20px;
}
.el-table__empty-block {
  height: 0 !important;
}
</style>