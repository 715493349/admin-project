<!--
 * @Author: luo_h603
 * @Date: 2022-02-15 15:26:27
 * @LastEditTime: 2022-03-24 10:10:35
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <!-- <div>SKU</div> -->
  <div>
    <li v-if="flag"><span @click="edit()">编辑</span></li>
    <input type="text" v-else @change="input()" />
  </div>
</template>

<script>
export default {
  name: "SKU",
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    edit() {
      this.flag = false;
    },
    input() {
      this.flag = true;
    },
  },
};
</script>

<style scope>
</style>