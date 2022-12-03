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
        row-key="id"
        :data-source="model.dataSource"
        :columns="deliveryInstallationTimeModalTableColumns"
        :loading="loading"
        :pagination="false"
      >
        <template
          #expandedRowRender="{
            record,
          }: {
            record: Api_proxy_order_manage_query_getServerInfo_item_interface,
          }"
        >
          <a-table
            :columns="deliveryInstallationTimeModalTableGoodsTableColumns"
            :data-source="record.goods_list"
            :pagination="false"
            size="small"
          >
            <template
              #bodyCell="{
                column,
                record: record2,
                index,
              }: {
                column: TableColumnType,
                record: Api_proxy_order_manage_query_getServerInfo_item_interface['goods_list'][number],
                index: number,
              }"
            >
              <template v-if="column.key === 'pic_url'">
                <a-image :src="record2.pic_url" :width="50" />
              </template>
              <template v-if="column.key === 'sku_spec'">
                <span v-for="(item, index) in record2.sku_spec" :key="index"
                  >{{ item.spec_name }}：{{ item.spec_value }}</span
                >
              </template>
            </template>
          </a-table>
        </template>
        <template
          #bodyCell="{
            column,
            record,
            index,
          }: {
            column: TableColumnType,
            record: Api_proxy_order_manage_query_getServerInfo_item_interface,
            index: number,
          }"
        >
          <template v-if="column.key === 'apply_server_time'">
            <a-space>
              <a-form-item
                :name="['dataSource', index, 'apply_server_time']"
                :rules="{
                  required: !record.isTime,
                  message: '请选择',
                }"
              >
                <a-date-picker
                  :disabled="record.isTime"
                  :disabled-date="datePickerDisabledDate"
                  :watch="[() => record.isTime, () => datePickerWatch(index)]"
                  v-model:value="record.apply_server_time"
                />
              </a-form-item>
              <a-form-item :name="['name']">
                <a-checkbox v-model:checked="record.isTime"
                  >暂不选择，请商家与我联系</a-checkbox
                >
              </a-form-item>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { FormInstance, ModalProps, TableColumnType } from 'ant-design-vue';
import {
  ref,
  watch,
  computed,
  reactive,
  WatchOptions,
  WatchSource,
  WatchCallback,
  nextTick,
} from 'vue';
import {
  deliveryInstallationTimeModalTableColumns,
  deliveryInstallationTimeModalTableGoodsTableColumns,
} from '../data';
import { usePagination } from 'vue-request';
import {
  Api_proxy_order_manage_query_getServerInfo_item_interface,
  Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface,
  Api_order_result_item_interface,
} from '../interface';
import {
  api_proxy_order_manage_query_getServerInfo,
  api_proxy_order_Order_assistant_queryOrderPlansByOslSeq,
  api_proxy_order_manage_edit_confirmPreOrder,
} from '../api';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import dayjs, { Dayjs } from 'dayjs';
import { datePickerProps } from 'ant-design-vue/es/date-picker/generatePicker/props';

const props = defineProps<{
  visible: boolean;
  record: Api_order_result_item_interface;
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();

const datePickerWatch = (index: number) => {
  nextTick(() => {
    formRef.value!.validate([['dataSource', index, 'apply_server_time']]);
  });
};
const {
  data: dataSource,
  run,
  loading,
} = usePagination(api_proxy_order_manage_query_getServerInfo, {
  manual: true,
  formatResult: ({ data }) => {
    return data.map((item) => {
      item.apply_server_time = undefined;
      return item;
    });
  },
});
const model = reactive({
  dataSource,
});
const datePickerDisabledDate = (current: Dayjs) => {
  return !dateArray.includes(current.startOf('day').valueOf());
};
const formRef = ref<FormInstance>();
let dateArray: number[];
watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      run({
        osl_seq: props.record.osl_seq,
      });
      let {
        data: [
          {
            orderPlans: [{ orderPlans }],
          },
        ],
      } = await api_proxy_order_Order_assistant_queryOrderPlansByOslSeq({
        osl_seq: props.record.osl_seq,
      });
      dateArray = orderPlans.map(({ planTime }) => {
        return planTime * 1000;
      });
    }
  }
);

const cancel: ModalProps['onCancel'] = () => {
  emits('update:visible', false);
};
const ok = async () => {
  try {
    await formRef.value!.validate();
    await api_proxy_order_manage_edit_confirmPreOrder({
      osl_seq: props.record.osl_seq,
      server_list: model.dataSource!.map((item) => {
        return {
          apply_server_time: item.isTime ? 0 : item.apply_server_time,
        };
      }),
    });
    emits('submit');
    emits('update:visible', false);
  } catch (e) {}
};
</script>
