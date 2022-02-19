<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="dialogFormVisible = true"
    >
      添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data:表格组件将展示的数据
         border：给表格添加边框
         column:属性
         label：显示标题
         width:对应的宽度
         align:标题对齐
         prop：列内容的字段名
     -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="width"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <!-- <img :src="row.logoUrl" alt="" /> -->
          <el-image
            style="width: 80px; height: 80px"
            :src="row.logoUrl"
            :preview-src-list="srcList"
          >
          </el-image>
          <!-- <i class="el-icon-warning" type="danger"></i> -->
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            icon="el-icon-edit"
            type="warning"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delelteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange"
         @current-change="handleCurrentChange" 
         current-page：
         total：当前第几页
         page-size：分页器展示多少数据
         page-sizes：每一页展示多少数据
         layout：实现分页布局
         pager-count：按钮数量，9页中间7页两边各1页
         -->
    <el-pagination
      :current-page="1"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :pager-count="7"
      layout="prev, pager, next, jumper, ->,sizes, total"
      :total="100"
      style="margin-top: 20px; textalign: center"
      align="center"
    >
    </el-pagination>
    <!-- 添加对话框 -->
    <!-- 
      visible.sync：控制对话框显示隐藏
     -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        style="width: 80%"
        v-model="tmForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
          class="lift"
        >
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
          class="margin"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelData">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "trademark",
  data() {
    return {
      // 第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 10,
      // 总页数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示隐藏
      dialogFormVisible: false,
      // 表单标签宽度
      formLabelWidth: "180px",
      // 上传图片
      // imageUrl: "",  上看 ↑
      // 收集手机品牌名称
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 图片缩放
      srcList: [""],
      // 表单验证
      rules: {
        // 品牌名称规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "change",
          },
        ],
        // 品牌logo规则
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
    };
  },
  mounted() {
    // console.log(this.$API);
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构参数，需要带参数，要在data中初始化
      const { page, limit } = this;
      // 获取服务器接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        // 展示数据总条数和列表数据
        this.total = result.data.tobal;
        this.list = result.data.records;
      }
      // console.log(result);
    },
    // handleCurrentChange(pager){
    //   this.page = pager
    //   this.getPageList()
    // }
    // 展示条数发生变化是触发
    // handleSizeChange(limit){
    //   this.list = limit
    //   this.getPageList()
    // },
    // 点击添加按钮事件
    showDialog() {
      // 清除数据
      this.tmForm = { tmForm: "", logoUrl: "" };
    },
    // 修改按钮事件
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      // console.log(row);
      // 不能将服务器返回的数据直接赋值给tmForm展示
      // row也是品牌收集的信息
      // 浅拷贝
      this.tmForm = { ...row };
    },
    // 文件上传成功时
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
      // res是上传成功后的数据
      // console.log(res);
      // 上传成功后服务器返回数据
      // console.log(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击输入框取消事件
    cancelData() {
      // 取消输入框显示
      this.dialogFormVisible = false;
      // 清除数据
      this.tmForm = { tmForm: "", logoUrl: "" };
    },
    // 添加按钮（添加商品 | 修改商品）
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        // console.log(success);
        if (success) {
          this.dialogFormVisible = false;
          // 发请求 （添加商品 | 修改商品）
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功！" : "添加品牌成功！",
            });
            // 成功后重新发请求获取品牌列表
            // 若添加品牌，停留第一页，修改品牌停留当前页
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          return false;
        }
      });
    },
    // 删除品牌
    delelteTradeMark(row) {
      // console.log(row);
      // 删除弹框
      this.$confirm(`你确定删${row.tmName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 给服务器发请求   点确定向服务器发送请求，注意携带ID
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          // 若删除成功
          if (result.code == 200) {
            // 点击按钮时触发
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 在次后去品牌列表数据   判断数据元素个数
            this.getPageList(this.list.length > 1 ? this.pages : this.page - 1)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.margin {
  margin-left: 12px;
}
.list {
  margin-left: 12px;
}
</style>