<!--
 * @Author: luoheng
 * @Date: 2022-02-15 15:26:27
 * @LastEditTime: 2022-02-28 00:46:31
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <Card />
    <Sale />
  </div>
</template>

<script>
import Card from "./Card";
import Sale from "./Sale";
export default {
  name: "Dashboard",
  components: { Card, Sale },
};
</script>

<style scoped>
</style>
