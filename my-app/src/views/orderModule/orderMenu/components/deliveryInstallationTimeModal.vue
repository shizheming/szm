<template>
  <a-modal
    :visible="props.visible"
    title="配送安装时间"
    @cancel="cancel"
    @ok="ok"
    :width="1000"
  >
    <a-form ref="formRef" :model="model">
      <a-table
        rowKey="id"
        :dataSource="model.dataSource"
        :columns="deliveryInstallationTimeModalTableColumns"
        :loading="loading"
        :pagination="false"
      >
        <template
          #bodyCell="{
            column,
            record,
          }: {
            column: TableColumnType,
            record: Api_proxy_order_manage_query_getServerInfo_item_interface,
          }"
        >
          <template v-if="column.key === 'apply_server_time'">
            <a-form-item
              label="label"
              :name="['name']"
              :rules="{
                required: true,
                message: '请选择',
              }"
            >
              <a-select
                :inner="applyServerTimeSelectInner"
                v-model:value="record.apply_server_time"
              />
            </a-form-item>
          </template>
        </template>
      </a-table>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { ModalProps, TableColumnType } from 'ant-design-vue';
import { ref, watch, computed, reactive } from 'vue';
import { deliveryInstallationTimeModalTableColumns } from '../data';
import { usePagination } from 'vue-request';
import {
  Api_proxy_order_manage_query_getServerInfo_item_interface,
  Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface,
  Api_order_result_item_interface,
} from '../interface';
import {
  api_proxy_order_manage_query_getServerInfo,
  api_proxy_order_Order_assistant_queryOrderPlansByOslSeq,
} from '../api';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import dayjs from 'dayjs';

const props = defineProps<{
  visible: boolean;
  record: Api_order_result_item_interface;
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
}>();

const applyServerTimeSelectOptions = ref<SelectProps['options']>([
  {
    label: '暂不选择，请商家与我联系',
    value: 0,
  },
]);
const applyServerTimeSelectInner = async () => {
  let { data } = await api_proxy_order_Order_assistant_queryOrderPlansByOslSeq({
    osl_seq: props.record.osl_seq,
  });
  applyServerTimeSelectOptions.value = data[0].orderPlans[0].orderPlans.map(
    ({ planDate, planTime, planId }) => {
      return {
        label: `${planDate}${dayjs(planDate).format('dddd')}`,
        value: planTime,
        planId,
      };
    }
  );
};

const {
  data: dataSource,
  run,
  loading,
} = usePagination(api_proxy_order_manage_query_getServerInfo, {
  manual: true,
  formatResult: ({ data }) => {
    return data;
  },
});
const model = reactive({
  dataSource,
});

watch(
  () => props.visible,
  (newValue) => {
    if (newValue === true) {
      run({
        osl_seq: props.record.osl_seq,
      });
    }
  }
);

const cancel: ModalProps['onCancel'] = () => {
  emits('update:visible', false);
};
const ok = () => {
  emits('update:visible', false);
};
</script>
