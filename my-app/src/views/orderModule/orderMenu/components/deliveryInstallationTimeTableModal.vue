<template>
  <a-modal
    :visible="propsObject.visible"
    title="配送安装时间"
    @cancel="cancel"
    @ok="ok"
    :width="1000"
  >
    <a-form ref="formRefObject" :model="formModelObject">
      <a-table
        row-key="id"
        :data-source="formModelObject.tableDataSourceArray"
        :columns="deliveryInstallationTimeModalTableColumnsArray"
        :loading="loading"
        :pagination="false"
      >
        <template
          #expandedRowRender="{
            record,
          }: {
            record: GetServerInfoRequestResultItemInterface,
          }"
        >
          <a-table
            :columns="deliveryInstallationTimeModalTableGoodsTableColumnsArray"
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
                record: GetServerInfoRequestResultItemInterface['goods_list'][number],
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
            record: GetServerInfoRequestResultItemInterface,
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
                  :disabled-date="datePickerDisabledDateFunction"
                  :watch="[
                    () => record.isTime,
                    () => datePickerWatchFunction(index),
                  ]"
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
  deliveryInstallationTimeModalTableColumnsArray,
  deliveryInstallationTimeModalTableGoodsTableColumnsArray,
} from '../data';
import { usePagination } from 'vue-request';
import {
  GetServerInfoRequestResultItemInterface,
  OrderListRequestResultItemInterface,
} from '../interface';
import {
  getServerInfoRequestFunction,
  queryOrderPlansByOslSeqRequestFunction,
  confirmPreOrderRequestFunction,
} from '../api';
import { SelectProps } from 'ant-design-vue/lib/vc-select';
import dayjs, { Dayjs } from 'dayjs';
import { datePickerProps } from 'ant-design-vue/es/date-picker/generatePicker/props';

const propsObject = defineProps<{
  visible: boolean;
  record: Partial<OrderListRequestResultItemInterface>;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();

const datePickerWatchFunction = (index: number) => {
  nextTick(() => {
    formRefObject.value!.validate([['dataSource', index, 'apply_server_time']]);
  });
};
const { data, run, loading } = usePagination(getServerInfoRequestFunction, {
  manual: true,
  formatResult: ({ data }) => {
    return data.map((item) => {
      item.apply_server_time = undefined;
      return item;
    });
  },
});
const formModelObject = reactive({
  tableDataSourceArray: data,
});
const datePickerDisabledDateFunction = (current: Dayjs) => {
  return !dateArray.includes(current.startOf('day').valueOf());
};
const formRefObject = ref<FormInstance>();
let dateArray: number[];
watch(
  () => propsObject.visible,
  async (newValue) => {
    if (newValue === true) {
      run({
        osl_seq: propsObject.record.osl_seq,
      });
      let {
        data: [
          {
            orderPlans: [{ orderPlans }],
          },
        ],
      } = await queryOrderPlansByOslSeqRequestFunction({
        osl_seq: propsObject.record.osl_seq,
      });
      dateArray = orderPlans.map(({ planTime }) => {
        return planTime * 1000;
      });
    }
  }
);

const cancel: ModalProps['onCancel'] = () => {
  emitsFunction('update:visible', false);
};
const ok = async () => {
  try {
    await formRefObject.value!.validate();
    await confirmPreOrderRequestFunction({
      osl_seq: propsObject.record.osl_seq,
      server_list: formModelObject.tableDataSourceArray!.map((item) => {
        return {
          apply_server_time: item.isTime ? 0 : item.apply_server_time,
        };
      }),
    });
    emitsFunction('submit');
    emitsFunction('update:visible', false);
  } catch (e) {}
};
</script>
