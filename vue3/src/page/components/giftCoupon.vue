<template>
  <s-button @click="add" style="margin-bottom: 20px">
    <template #icon><select-outlined /></template>
    优惠券
  </s-button>
  <a-table
    rowKey="id"
    :pagination="false"
    :columns="columns"
    :dataSource="dataSource"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'sku_code'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.sku_code || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'sn'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.sn || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'goods_gallery'">
        <a-image :width="50" :src="record.img" style="cursor: pointer" />
      </template>
      <template v-if="column.key === 'sku_id'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.id || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'shop_goods_id'">
        {{ record.channel_relation[0].shop_goods_id || "-" }}
      </template>
      <template v-if="column.key === 'shop_selling_price'">
        {{ record.channel_relation[0].shop_selling_price }}
      </template>
      <template v-if="column.key === 'action'">
        <a
          href="javascript:;"
          class="table-button-red"
          @click="siteIdsValueDelete(index)"
          ><Delete-outlined
        /></a>
      </template>
    </template>
  </a-table>
  <AddCoupon />
</template>

<script setup>
import {
  ExclamationCircleOutlined,
  SelectOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import AddCoupon from "./addCoupon.vue";
function add() {}

const columns = [
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "劵批次号",
    dataIndex: "batch_number",
    key: "batch_number",
  },
  {
    title: "劵名称",
    dataIndex: "coupon_name",
    key: "coupon_name",
  },
  {
    title: "活动发劵数量",
    dataIndex: "marketing_org_stock",
    key: "marketing_org_stock",
  },
  {
    title: "剩余活动券数量",
    dataIndex: "marketing_stock",
    key: "marketing_stock",
  },
  {
    title: "批次总量/剩余可生劵量",
    dataIndex: "total_and_everyday_num",
    key: "total_and_everyday_num",
    customRender(text, record) {
      return `${record.total}/${record.everyday_num}`;
    },
  },
];
</script>

<style></style>
