<template>
  <a-modal
    :visible="props.visible"
    title="配送安装时间"
    @cancel="cancel"
    @ok="ok"
    :width="1000"
  >
    <a-table
      rowKey="id"
      :dataSource="dataSource"
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
          record: Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface,
        }"
      >
        <template v-if="column.key === 'name'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ModalProps, TableColumnType } from 'ant-design-vue';
import { ref, watch, computed } from 'vue';
import { deliveryInstallationTimeModalTableColumns } from '../data';
import { usePagination } from 'vue-request';
import {
  Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface,
  Api_order_result_item_interface,
} from '../interface';
import { api_proxy_order_manage_query_getServerInfo } from '../api';

const props = defineProps<{
  visible: boolean;
  record: Api_order_result_item_interface;
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
}>();

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

watch(
  () => props.visible,
  (newValue) => {
    if (newValue === true) {
      run({
        osl_seq: props.visible,
      });
    }
  }
);

const cancel: ModalProps['onCancel'] = () => {
  emits('update:visible', false);
};
const ok = () => {};
</script>
