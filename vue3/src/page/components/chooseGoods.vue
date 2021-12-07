<template>
  <a-modal
    :visible="props.visible"
    title="选择商品"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <s-form :model="formData" ref="formSection">
      <s-form-item label="SPU ID">
        <s-input v-model:value="formData.spu_id"/>
      </s-form-item>
      <s-form-item label="商品名称">
        <s-input v-model:value="formData.name"/>
      </s-form-item>
      <s-form-item label="SKU ID">
        <s-input v-model:value="formData.sku_id"/>
      </s-form-item>
      <s-form-item label="SKU编码">
        <s-input v-model:value="formData.sku_code"/>
      </s-form-item>
      <s-form-item label="品牌">
        <s-input v-model:value="formData.brand_id"/>
      </s-form-item>
      <s-form-item label="后台类目">
        <s-input v-model:value="formData.category_id"/>
      </s-form-item>
      <s-form-item label="前台类目">
        <s-input v-model:value="formData.user_category_id"/>
      </s-form-item>
      <s-form-item label="供应商">
        <s-input v-model:value="formData.supplier_id"/>
      </s-form-item>
      <s-form-item label="上下架状态">
        <s-input v-model:value="formData.shop_is_listing"/>
      </s-form-item>
      <s-form-item label="商品标签">
        <s-input v-model:value="formData.label_id"/>
      </s-form-item>
      <s-form-item label="店铺名称">
        <s-input v-model:value="formData.shop_id"/>
      </s-form-item>
      <s-form-item label="营销类型">
        <s-input v-model:value="formData.active_type_text"/>
      </s-form-item>
      <s-form-item label="营销活动">
        <s-input v-model:value="formData.active_code"/>
      </s-form-item>
      <s-form-item label="营销活动">
        <s-input v-model:value="formData.coupon_id"/>
      </s-form-item>
      <s-form-item label="销售渠道">
        <s-input v-model:value="formData.channel_id"/>
      </s-form-item>
      <s-form-item label="货号">
        <s-input v-model:value="formData.sn"/>
      </s-form-item>
    </s-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible"]);
const formSection = ref()
const formData = reactive({})

function handleOk() {
  emit("update:visible", false);
}
function handleCancel() {
  emit("update:visible", false);
}
</script>

<style></style>
