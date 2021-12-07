<template>
  <a-modal
    :visible="props.visible"
    title="选择商品"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <s-form :model="formData" ref="formSection">
      <s-form-item label="SPU ID">
        <s-input v-model:value="formData.spu_id" />
      </s-form-item>
      <s-form-item label="商品名称">
        <s-input v-model:value="formData.name" />
      </s-form-item>
      <s-form-item label="SKU ID">
        <s-input v-model:value="formData.sku_id" />
      </s-form-item>
      <s-form-item label="SKU编码">
        <s-input v-model:value="formData.sku_code" />
      </s-form-item>
      <s-form-item label="品牌">
        <s-select v-model:value="formData.brand_id" :inner="brand_id_inner" />
      </s-form-item>
      <s-form-item label="后台类目">
        <s-cascader
          v-model:value="formData.category_id"
          :inner="category_id_inner"
        />
      </s-form-item>
      <s-form-item label="前台类目">
        <s-cascader
          v-model:value="formData.user_category_id"
          :inner="user_category_id_inner"
        />
      </s-form-item>
      <s-form-item label="供应商">
        <s-select
          v-model:value="formData.supplier_id"
          :inner="supplier_id_inner"
        />
      </s-form-item>
      <s-form-item label="上下架状态">
        <s-select v-model:value="formData.shop_is_listing">
          <s-select-option :value="0">下架</s-select-option>
          <s-select-option :value="1">上架</s-select-option>
        </s-select>
      </s-form-item>
      <s-form-item label="货号">
        <s-input v-model:value="formData.sn" />
      </s-form-item>
    </s-form>
  </a-modal>
</template>

<script setup>
import axios from "../../api";
import { ref, reactive } from "vue";

const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible"]);
const formSection = ref();
const formData = reactive({});

function handleOk() {
  emit("update:visible", false);
}
function handleCancel() {
  emit("update:visible", false);
}

function brand_id_inner(select) {
  select.options = async function () {
    let {
      data: { list },
    } = await axios.get("/api/goods/brand?page_size=99999");

    return list.map(({ name, id }) => {
      return {
        label: name,
        value: id,
      };
    });
  };
}

function category_id_inner(cascader) {
  cascader.options = async function () {
    let { data } = await axios.get("/api/goods/category");
    return formatCategory(data);
  };
}

function formatCategory(cascader) {
  return cascader.map((item) => {
    item.label = item.name;
    item.value = item.id;

    if (item.child) {
      item.children = formatCategory(item.child);
    }

    return item;
  });
}

function user_category_id_inner(cascader) {
  cascader.options = async function () {
    let { data } = await axios.get("/api/goods/user-category");
    return formatCategory(
      data.filter((m) => {
        return m.child && m.child.length > 0;
      })
    );
  };
}

function supplier_id_inner(select) {
  select.options = async function () {
    let { data } = await axios.get("/api/stock/supplier/get-all/list");
    return data.map((item) => {
      return {
        label: item.name,
        value: item.id,
        code: item.code,
      };
    });
  };
}
</script>

<style></style>
