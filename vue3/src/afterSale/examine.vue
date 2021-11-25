<template>
  <s-form
    :model="formData"
    :label-col="{ span: 10 }"
    :wrapper-col="{ span: 4 }"
    :outer-model="outerFormState"
    @set-form="setForm"
    ref="form"
  >
    <a-form-item label="审核结果">
      <a-radio-group v-model:checked="formData.examineReault">
        <a-radio :value="2">退回商品</a-radio>
        <a-radio :value="1">不退货仅退款</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="寄回方式">
      <s-input
        name="returnMethod"
        initialValue="快递寄回"
        v-model:value="formData.returnMethod"
      />
    </a-form-item>
    <a-form-item
      label="是否退回至供应商"
      :rules="{
        required: true,
        message: '请选择是否退回至供应商',
      }"
      name="goodMoney.isReturnSupplier"
    >
      <a-radio-group v-model:value="formData.goodMoney.isReturnSupplier">
        <a-radio :value="0">否</a-radio>
        <a-radio :value="1">是</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="退回供应商"
      :rules="{
        required: true,
        message: '请选择退回供应商',
      }"
      name="goodMoney.supplier_id"
      v-if="formData.goodMoney.isReturnSupplier"
    >
      <a-select v-model:value="formData.goodMoney.supplier_id" />
    </a-form-item>
    <a-form-item
      label="退回地址类型"
      :rules="{
        required: true,
        message: '请选择退回地址类型',
      }"
      :name="['goodMoney','con_type']"
    >
      <a-radio-group v-model:value="formData.goodMoney.con_type">
        <a-radio :value="2">手动填写</a-radio>
        <a-radio :value="3">按供应商地址列表</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="选择收货地址"
      :rules="{
        required: true,
        message: '请选择收货地址',
      }"
      name="allAddr"
      v-if="formData.goodMoney.con_type === 3"
    >
      <a-select v-model:value="formData.allAddr" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 10 }">
      <s-button :loading="loading" @click="examine">审核</s-button>
    </a-form-item>
  </s-form>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from "vue";
const form = ref();
const formData = reactive({
  goodMoney: {},
});
const outerFormState = reactive({});
let loading = ref();
let formRender;
function setForm(fr) {
  formRender = fr;
}
function examine() {
  formRender.value
    .validate()
    .then(() => {
      console.log("values", formData);
      console.log("最后的值", outerFormState);
    })
    .catch((error) => {
      console.log("error", formData);
    });
}
</script>

<style></style>
