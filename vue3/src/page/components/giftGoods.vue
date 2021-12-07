<template>
  <s-button @click="chooseGoods">选择商品</s-button>
  <a-table
    rowKey="id"
    :pagination="false"
    :columns="columns"
    :dataSource="dataSource"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'title'">
        <a @click="chooseGoods(record)">选择商品</a>
      </template>
      <template v-if="column.key === 'action'">
        <a class="table-button-red" @click="siteIdsValueDelete(record, index)"
          >删除</a
        >
      </template>
    </template>
  </a-table>
  <ChooseGoods v-model:visible="visible" />
</template>

<script setup>
import { ref, toRefs, reactive, onMounted, inject } from "vue";
import { message } from "ant-design-vue";
import ChooseGoods from "./chooseGoods.vue";
let formData = inject("formData");
const visible = ref(false);

const columns = [
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    fixed: "left",
  },
  {
    title: "商品图片", // 暂时没有
    dataIndex: "spu_img_url",
    key: "spu_img_url",
  },
  {
    title: "SPU ID",
    dataIndex: "spu_id",
    key: "spu_id",
  },
  {
    title: "商品编码",
    dataIndex: "sku_code",
    key: "sku_code",
  },
  {
    title: "货号",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "商品名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SKU ID",
    dataIndex: "sku_id",
    key: "sku_id",
  },
  {
    title: "shop_goods_id",
    dataIndex: "shop_goods_id",
    key: "shop_goods_id",
  },
  {
    title: "店铺售价(元)",
    dataIndex: "shop_selling_price",
    key: "shop_selling_price",
  },
  {
    title: "商品可用库存",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "活动数量",
    dataIndex: "marketing_org_stock",
    key: "marketing_org_stock",
  },
  {
    title: "剩余活动数量",
    dataIndex: "marketing_stock",
    key: "marketing_stock",
  },
  {
    title: "成本承担方",
    dataIndex: "sponsor",
    key: "sponsor",
  },
  {
    title: "成本承担比例(%)",
    dataIndex: "sponsor_rate",
    key: "sponsor_rate",
  },
  {
    title: "规格",
    dataIndex: "sku_spec_copy_data",
    key: "sku_spec_copy_data",
  },
  {
    title: "状态",
    dataIndex: "is_listing",
    key: "is_listing",
  },
  {
    title: "店铺名称",
    dataIndex: "shop_name",
    key: "shop_name",
  },
  {
    title: "店铺ID",
    dataIndex: "shop_id",
    key: "shop_id",
  },
  {
    title: "供应商名称",
    dataIndex: "supplier_name",
    key: "supplier_name",
  },
  {
    title: "供应商编码",
    dataIndex: "supplier_id",
    key: "supplier_id",
  },
];
const dataSource = [];
function chooseGoods() {
  if (formData.use_scope.site_ids === 0 && !formData.use_scope.shop_id) {
    message.warning("请先选择店铺");
    return;
  } else if (formData.use_scope.site_ids === 1) {
    if (!formData.use_scope.site_ids_value?.length) {
      message.warning("请先选择站点");
      return;
    } else if (!formData.use_scope.shop_id) {
      message.warning("请先选择店铺");
      return;
    }
  }
  visible.value = true;
}
</script>

<style></style>
