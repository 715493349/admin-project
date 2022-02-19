<template>
  <div>
    <!-- inline:行内表单，表示一行可放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="hForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="hForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="h1.name"
            :value="h1.id"
            v-for="h1 in list1"
            :key="h1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="hForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="h2.name"
            :value="h2.id"
            v-for="h2 in list2"
            :key="h2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="hForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="h3.name"
            :value="h3.id"
            v-for="h3 in list3"
            :key="h3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      // 一级数据
      list1: [],
      //  二级分类数据
      list2: [],
      // 三级分类数组
      list3: [],
      //  收集一级二级三级分类id
      hForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  // 组件挂载完毕，向服务器发请求，获取数据
  mounted() {
    // 获取一级分类数据方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据方法
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      // console.log(result);
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    // 一级分类的select事件回调,一级分类option发生变化时获取响应二级分类数据
    async handler1() {
      // 当一级数据发生变化后，二级三级清除name数据
      this.list2 = [];
      this.list3 = [];
      // 二三级ID清除掉
      this.hForm.category2Id = "";
      this.hForm.category3Id = "";
      // console.log(1111);
      // 解构一级分类id
      const { category1Id } = this.hForm;
      // 一级事件触发时，一级Id传递过去 方便父亲组件区分id传递两个参数
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      // 通过一级分类id，获取二级分类数据
      let result = await this.$API.attr.reqCategory2List(category1Id);
      // console.log(result);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    // 二级分类的select事件回调
    async handler2() {
      // 二级数据变化清除数组
      this.list3 = [];
      this.hForm.category3Id = "";
      // 解构出数据
      const { category2Id } = this.hForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    // 三级分类的select事件回调
    handler3() {
      const { category3Id } = this.hForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>
<style scoped>
.el-form-item {
  margin-left: 10px;
}
</style>