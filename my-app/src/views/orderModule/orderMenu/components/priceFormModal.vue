<template>
  <a-modal
    :visible="props.visible"
    title="修改价格"
    @ok="ok"
    @cancel="cancel"
    :confirmLoading="confirmLoading"
  >
    <a-form ref="formRef" :model="model" layout="vertical">
      <a-form-item label="销售单价" :name="['shop_selling_price']">
        <a-input-number
          v-model:value="model.shop_selling_price"
          :is-detail="true"
        />
      </a-form-item>
      <a-form-item
        label="销售单价"
        :name="['adjust_mount']"
        :rules="{
          required: true,
          message: '请填写',
        }"
      >
        <a-input-number v-model:value="model.adjust_mount">
          <template #addonAfter>元</template>
        </a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { FormInstance, message, ModalProps } from 'ant-design-vue';
import {
  Api_order_merchantRemark_batch_params_item_interface,
  Api_order_result_item_interface,
} from '../interface';
import { api_order_merchantRemark_batch } from '../api';

const props = defineProps<{
  visible: boolean;
  selectedRowsArray: Api_order_result_item_interface[];
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();
const model = reactive({
  merchant_remark: '',
});
const formRef = ref<FormInstance>();
const confirmLoading = ref(false);

const ok = async () => {
  try {
    await formRef.value?.validate();
    await api_order_merchantRemark_batch({
      ids: props.selectedRowsArray.map(({ osl_seq, user: { user_id } }) => {
        return {
          ...model,
          osl_seq,
          user_id: String(user_id),
        };
      }),
    });
    message.success('成功');
    confirmLoading.value = true;
    emits('submit');
    confirmLoading.value = false;
    formRef.value?.resetFields();
    emits('update:visible', false);
  } catch (error) {
    confirmLoading.value = false;
  }
};
const cancel = () => {
  formRef.value?.resetFields();
  emits('update:visible', false);
};
</script>
