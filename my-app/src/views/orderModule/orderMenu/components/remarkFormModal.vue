<template>
  <a-modal
    :visible="props.visible"
    title="卖家备注"
    @ok="ok"
    @cancel="cancel"
    :confirmLoading="confirmLoading"
  >
    <a-form ref="formRef" :model="model">
      <a-form-item
        label="卖家备注"
        :name="['merchant_remark']"
        :rules="{
          required: true,
          message: '请填写',
        }"
      >
        <a-textarea v-model:value="model.merchant_remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { FormInstance, message, ModalProps } from 'ant-design-vue';
import {
  Api_order_merchantRemark_batch_params_item_interface,
  Api_order_params_part_interface,
} from '../interface';
import { api_order_merchantRemark_batch } from '../api';

const props = defineProps<{
  visible: boolean;
  selectedRowsArray: Api_order_params_part_interface[];
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();
const model = reactive<Api_order_merchantRemark_batch_params_item_interface>({
  merchant_remark: '',
});
const formRef = ref<FormInstance>();
const confirmLoading = ref<boolean>(false);

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      console.log();
    }
  }
);

const ok: ModalProps['onOk'] = async (e) => {
  try {
    let data = await formRef.value?.validate();
    await api_order_merchantRemark_batch({
      ids: props.selectedRowsArray.map(({ osl_seq, user: { user_id } }) => {
        return {
          ...(data as Api_order_merchantRemark_batch_params_item_interface),
          osl_seq,
          user_id,
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
const cancel: ModalProps['onCancel'] = (e) => {
  formRef.value?.resetFields();
  emits('update:visible', false);
};
</script>
