<!--
 * @Author: luoheng
 * @Date: 2022-02-15 15:26:27
 * @LastEditTime: 2022-02-28 13:43:51
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <Card />
    <Sale />
    <Observe />
  </div>
</template>

<script>
import Card from "./Card";
import Sale from "./Sale";
import Observe from "./Observe";
export default {
  name: "Dashboard",
  components: { Card, Sale, Observe },
};
</script>

<style scoped>
</style>
