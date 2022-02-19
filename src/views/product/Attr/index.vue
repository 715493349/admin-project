<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 给组组件绑定自定义事件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="hh"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格 -->
        <el-table style="width: 100%" :data="attrList" border>
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="attrName"
            label="属性名称"
            width="150"
          >
          </el-table-column>
          <!-- row是平台相应的属性 -->
          <el-table-column
            prop="prop"
            label="属性值列表"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updataAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性    -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性</el-button
        >
        <!-- <el-button @click="isShowTable=true">取消</el-button> -->
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span v-else @click="toEdit(row)" style="display: block">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`确定删除${row.valueName}？`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash
import cloneDeep from "lodash/cloneDeep";
import { Message } from 'element-ui';
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收服务返回的数据
      attrList: [],
      // 属性表格显示隐藏
      isShowTable: true,
      // 收集新增属性/修改属性
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值 每个属性值都是一个对象，需要attrId,valueName
        ],
        categoryId: 0, //三级分类id
        categoryLevel: 3, //区分服务器
      },
      // flag:true
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId({ categoryId, level }) {
      // console.log(getCategoryId);
      // 区分三级分类响相应Id，父组件存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 发请求
        this.getAttrList();
      }
    },
    // 获取平台属性数据
    async getAttrList() {
      // console.log('发请求');
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      // 向属性值的数组里添加元素
      this.attrInfo.attrValueList.push({
        // attrId:相应的属性id,目前没有属性操作和属性id
        // valueName:相应属性值名称
        attrId: this.attrInfo.id,
        valueName: "",
        // flag:给每个属性值添加一个标记flag，用户切换查看模式与编辑模式，利于每个属性值控制自己的模式切换
        flag: true,
      });
    },
    // 添加属性按钮回调
    addAttr() {
      // 切换table显示隐藏
      this.isShowTable = false;
      // 清除数据
      // 收集三级分类的id
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值 每个属性值都是一个对象，需要attrId,valueName
        ],
        categoryId: this.category3Id, //三级分类id
        categoryLevel: 3, //区分服务器
      };
    },
    // 修改某一个属性
    updataAttr(row) {
      // 切换table显示隐藏
      this.isShowTable = false;
      // this.attrInfo = row
      // 对象中套数组，数组中套对象，无法浅拷贝.利用深拷贝
      this.attrInfo = cloneDeep(row);
      // 修改某一个属性时，将相应的属性元素添加上flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        // 缺点是不是响应式数据
        // item.flsg = false
        this.$set(item, "flsg", false);
      });
    },
    toLook(row) {
      // 属性值为空不能作为新的属性值，需要给用户提示输入其他属性值
      // trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
      // trim() 方法不会改变原始字符串。
      // trim() 方法不适用于 null, undefined, Number 类型。
      if (row.valueName.trim() == "") {
        this.$message("请输入正确的属性值");
        return;
      }
      // 新增属性值不能重复
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
      // some() 方法会依次执行数组的每个元素：
      // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      // 如果没有满足条件的元素，则返回false。
      // 注意： some() 不会对空数组进行检测。
      // 注意： some() 不会改变原始数组。
      let isReoat = this.attrInfo.attrValueList.some((item) => {
        // 将row从数组里面判断是去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isReoat) return;
      //row:当前用户添加的最新属性值
      // 是当前编辑模式变成查看模式（input消失，span显示）
      row.flag = false;
      // console.log(row);
    },
    // 点击span回调，变为编辑模式
    toEdit(row) {
      row.flag = true;
    },
    // 气泡确认删除回调    注意：版本号不同  在前面家on
    deleteAttrValue(index){
      // alert(123)
      this.attrInfo.attrValueList.splice(index,1)
    }
  },
  // 保存按钮，添加属性/修改属性
  async addOrUpdateAttr(){
    // 整理参数
    // 空的属性值不提交
    // 不出现flag字段
    this.attrInfo.attrValueLiat = this.attrInfo.attrValueLait.filter(item => {
      // 过滤属性值不为空的
      if(item.valueName != ''){
        // 删除flag属性
        delete item.flag
        return true
      }
    })
    // 发请求
    try{
      await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
      this.$message({type:'success',message:'保存成功'})
      // 保存成功后重新获取属性
      this.getAttrLait()
    }catch(error){
      this.$message('保存失败')
    }
  }
};
</script>

<style scope>
.el-tag {
  margin: 0px 8px;
}
.hh {
  margin-bottom: 20px;
}
.el-table__empty-block {
  height: 0 !important;
}
</style>