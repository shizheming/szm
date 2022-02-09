<template>
  <s-button @click="add" style="margin-bottom: 20px">
    <template #icon><select-outlined /></template>
    优惠券
  </s-button>
  <a-table
    rowKey="id"
    :pagination="false"
    :columns="columns"
    :dataSource="formData.gift_settings.gift_coupon_list"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'marketing_org_stock'">
        <a-form-item
          :name="[
            'gift_settings',
            'gift_coupon_list',
            index,
            'marketing_org_stock',
          ]"
          :rules="{
            required: true,
            message: '请填写数量',
          }"
        >
          <a-input-number
            :min="1"
            :max="record.everyday_num"
            placeholder="数量"
            v-model:value="record.marketing_org_stock"
          />
        </a-form-item>
      </template>
      <template v-if="column.key === 'action'">
        <a
          href="javascript:;"
          class="table-button-red"
          @click="deletecoupon(index)"
          ><Delete-outlined
        /></a>
      </template>
    </template>
  </a-table>
  <AddCoupon v-model:visible="visible" />
</template>

<script setup>
import { ref, toRefs, reactive, onMounted, watch, provide, inject } from "vue";
import {
  ExclamationCircleOutlined,
  SelectOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import AddCoupon from "./addCoupon.vue";

let formData = inject("formData", {});
const props = defineProps(["value"]);
const emits = defineEmits(["update:value"]);
const visible = ref(false);
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
    customRender({ record }) {
      return `${record.total}/${record.everyday_num}`;
    },
  },
];
function add() {
  visible.value = true;
}
/* watch(
  () => formData.gift_coupon_list,
  (newValue) => {
    emits("update:value", newValue);
  }
); */
function deletecoupon() {}
</script>

<style></style>
