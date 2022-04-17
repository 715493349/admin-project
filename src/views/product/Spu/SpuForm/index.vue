<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="SPU名称"
          v-model="spu.spuName"
          class="wd"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <!-- type="textarea" -->
        <el-input
          type="textarea"
          rows="3"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图">
        <!-- :on-preview="handlePictureCardPreview"  预览时触发 -->
        <!-- :on-remove="handleRemove"  删除时触发-->
        <!-- list-type :文件列表的类型 -->
        <!-- file-list： 上传的文件列表, -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          value=""
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="unselect in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="hh"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column prop="" label="属性值名称列表">
            <template slot-scope="{ row, $index }">
              <!-- @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm" -->
              <!-- @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="100" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index,1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <!-- changeScene自定义事件 -->
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //存储spu信息属性 spu初始化是空对象，服务器发请求返回spu信息，修改时利用返回的=对象手机最新信息提交给服务器
      spu: {
        category3Id: 0, //三级分类id
        tmId: '', //品牌id
        description: "", //描述
        spuName: "", //spu名称
        id: 0,
        // 收集图片信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储spu图片
      saleAttrList: [], //存储销售属性
      inputVisible: false, //
      inputValue: "",
      attrIdAndAttrName: "", //手机未选择的销售属性id
    };
  },
  methods: {
    // 删除照片回调  file:删除的当前文件文件，fileList:剩余的当前文文件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // 收集照片数据 收集剩余的
      this.spuImageList = fileList;
    },
    // 预览图片回调
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      // 图片对话框显示
      this.dialogVisible = true;
    },
    // 初始化spuForm数据
    async initSpuData(spu) {
      // console.log('发请求',spu)

      // 获取spu信息
      // console.log(spu)
      let result = await this.$API.spu.reqSpu(spu.id);
      // console.log(result);
      if (result.code == 200) {
        this.spu = result.data;
      }

      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }

      // 获取spu图片
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(spuImageResult);
      if (spuImageResult.code == 200) {
        // 先不要直接存储
        // this.spuImageList = spuImageResult.data;
        let listArr = spuImageResult.data;
        // 由于照片墙显示图片数据需要数组里面的name和url字段，修改服务器的数据
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }

      // 获取品牌全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(saleResult);
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 图片上传成功回调 response:服务器返回的信息  file：传成功的图片  fileList：上传成功后所有图片信息
    handlerSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    // 添加销售属性
    addSaleAttr() {
      // 收集添加的销售属性 分割收集的销售属性
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      // 向spu对象spuSaleAttrList属性与属性值添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 选择完清空数组
      this.attrIdAndAttrName = "";
    },
    // 添加按钮回调
    addSaleAttrValue(row) {
      // 点击添加按钮变成input
      // console.log(row);
      // row.inputVisible = true;
      this.$set(row, "inputVisible", true);
      // 通过响应式数据inputValueble字段收集新增的销售属性值
      this.$set(row, "inputValueble", "");
    },
    // input失去焦点的事件
    handleInputConfirm(row) {
      // 解构出销售属性收集数据
      // console.log(row);
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能让为空！");
        return;
      }
      // 属性之不能重复
      let result = row.spuSaleAttrValueList.every((item) => {
        item.saleAttrValueName != inputValue
      })
      // console.log(result);
      // 新增的属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 修改inputVisible为false
      row.inputVisible = false;
      row.inputValue = ''
    },
    async addOrUpdateSpu(){                                                                            //保存数据请求失败
      // 整理照片墙数据，携带参数，对于图片需要携带imageName与imageUrl字段
      // 利用map方法映射
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return { 
          imageName: item.name,
          imagUrl:(item.response && item.response.data) || item.url
        }
      })
      // 参数整理完发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      // console.log(result);
      if(result.code == 200){
        // 提示
        this.$message({type:'success',message:'保存成功'})
        // 通知父组件回到场景0
        this.$emit('changeScene',0)
      }
    }
  },
  computed: {
    // 销售属性计算
    unSelectSaleAttr() {
      // 过滤出需要的元素
      let result = this.saleAttrList.filter((item) => {
        // console.log(item);
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style scoped>
/* .wd{
  width: 700px;
} */
.el-icon-plus {
  line-height: inherit;
}
.hh {
  margin-left: 20px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>


// 不能在mounted中发请求，因为每次显示子组件spuFOrm时发送四个请求，
// 因为v-show只能控制spuForm子组件显示隐藏，子组件未卸载，导致mounted只能执行一次




//    51跳跃
