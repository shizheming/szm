<template>
  <a-modal
    title="配送安装时间"
    :visible="propsObject.visible"
    :confirmLoading="modalConfirmLoadingBoolean"
    @cancel="modalCancelFunction"
    @ok="modalOkFunction"
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
            record: GetServerInfoSingleInterface,
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
                record: GetServerInfoSingleInterface['goods_list'][number],
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
            record: GetServerInfoSingleInterface,
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
import {
  FormInstance,
  ModalProps,
  TableColumnType,
  message,
  TableColumnsType,
} from 'ant-design-vue';
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
import { usePagination } from 'vue-request';
import {
  GetServerInfoSingleInterface,
  OrderListSingeInterface,
} from '../../api/interface';
import {
  getServerInfoRequestFunction,
  queryOrderPlansRequestFunction,
  confirmPreOrderRequestFunction,
} from '../../api/form';
import dayjs, { Dayjs } from 'dayjs';
const deliveryInstallationTimeModalTableColumnsArray: TableColumnsType = [
  {
    title: '服务名称',
    dataIndex: 'goods_name',
    key: 'goods_name',
  },
  {
    title: '选择时间',
    dataIndex: 'apply_server_time',
    key: 'apply_server_time',
  },
];

const deliveryInstallationTimeModalTableGoodsTableColumnsArray: TableColumnsType =
  [
    {
      title: '主图',
      dataIndex: 'pic_url',
      key: 'pic_url',
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
    },
    {
      title: '商品编码',
      dataIndex: 'sku_code',
      key: 'sku_code',
    },
    {
      title: '货号',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: '规格属性',
      dataIndex: 'sku_spec',
      key: 'sku_spec',
    },
  ];

const propsObject = defineProps<{
  visible: boolean;
  record: Partial<OrderListSingeInterface>;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'submit'): void;
}>();
const modalConfirmLoadingBoolean = ref(false);

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

const modalCancelFunction = () => {
  emitsFunction('update:visible', false);
};
const modalOkFunction = async () => {
  await formRefObject.value!.validate();
  modalConfirmLoadingBoolean.value = true;
  await confirmPreOrderRequestFunction({
    osl_seq: propsObject.record.osl_seq,
    server_list: formModelObject.tableDataSourceArray!.map((item) => {
      return {
        apply_server_time: item.isTime ? 0 : item.apply_server_time,
      };
    }),
  }).catch(() => {
    modalConfirmLoadingBoolean.value = false;
    return Promise.reject();
  });
  message.success('成功');
  emitsFunction('submit');
  modalConfirmLoadingBoolean.value = false;
  emitsFunction('update:visible', false);
};

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
      } = await queryOrderPlansRequestFunction({
        osl_seq: propsObject.record.osl_seq,
      });
      dateArray = orderPlans.map(({ planTime }) => {
        return planTime * 1000;
      });
    }
  }
);
</script>
