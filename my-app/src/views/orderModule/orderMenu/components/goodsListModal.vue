<template>
  <a-modal
    :visible="props.visible"
    title="商品选择"
    @ok="ok"
    @cancel="cancel"
    :width="1400"
  >
    <a-form
      ref="formRef"
      :model="model"
      :label-col="{ span: 6 }"
      @finish="finish"
    >
      <a-row>
        <a-col :span="8"> </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item :wrapper-col="{ offset: 6 }">
            <a-space style="font-size: 18px" size="large">
              <a-button html-type="submit" type="primary">
                <search-outlined />
              </a-button>
              <clear-outlined @click="clearOutlinedClick" />
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :rowKey="tableRowKey"
      :row-selection="{
        selectedRowKeys,
        onChange: rowSelectionOnChange,
        getCheckboxProps,
      }"
      :dataSource="dataSource?.list"
      :columns="orderFormModalGoodsColumns"
      :loading="loading"
      :pagination="pagination"
      @change="tableChange"
    >
      <template
        #bodyCell="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: GoodsFormModelInterface,
        }"
      >
        <template v-if="column.key === 'operation'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
} from "ant-design-vue";
import { GoodsFormModelInterface } from "../interface";
import { sku_list_api } from "../api";
import { orderFormModalGoodsColumns } from "../data";
import { usePagination } from "vue-request";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons-vue";
import { TableRowSelection } from "ant-design-vue/es/table/interface";

const props = defineProps<{
  visible: boolean;
  selectedRowKeys: any[];
}>();
const emits = defineEmits<{
  (event: "update:visible", visible: boolean): void;
  (
    event: "select",
    selectedRowKeys: any[],
    selectedRowsArray: GoodsFormModelInterface[]
  ): void;
}>();

const selectedRowKeys = ref<any>([]);
const model = reactive<GoodsFormModelInterface>({});
const formRef = ref<FormInstance>();
const selectedRowsArray = ref<GoodsFormModelInterface[]>([]);
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(sku_list_api, {
  manual: true,
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    currentKey: "page",
    pageSizeKey: "page_size",
    totalKey: "total",
  },
});

const finish: FormProps["onFinish"] = async (values) => {
  run({
    channel_id: 1,
    is_listing: 1,
    need_stock: 1,
    business_id: 1,
    is_support_local: 0,
    page: 1,
    page_size: 10,
    ...model,
  });
};

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

const rowSelectionOnChange: TableRowSelection["onChange"] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const tableChange: TableProps["onChange"] = async (pag) => {
  run({
    channel_id: 1,
    is_listing: 1,
    need_stock: 1,
    business_id: 1,
    is_support_local: 0,
    page: pag.current as number,
    page_size: pag.pageSize as number,
    ...model,
  });
};

const getCheckboxProps: TableRowSelection["getCheckboxProps"] = ({
  sku_id,
  spu_id,
}) => {
  return {
    disabled: props.selectedRowKeys.includes(`${spu_id}_${sku_id}`),
  };
};

const tableRowKey: GoodsFormModelInterface = ({ sku_id, spu_id }) => {
  return `${spu_id}_${sku_id}`;
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
};

const ok: ModalProps["onOk"] = async (e) => {
  formRef.value?.resetFields();

  emits("select", selectedRowKeys.value, selectedRowsArray.value);
  emits("update:visible", false);
};
const cancel: ModalProps["onCancel"] = (e) => {
  formRef.value?.resetFields();
  emits("update:visible", false);
};

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      run({
        channel_id: 1,
        is_listing: 1,
        need_stock: 1,
        business_id: 1,
        is_support_local: 0,
        page: 1,
        page_size: 10,
      });
    } else {
      selectedRowKeys.value = [];
    }
  }
);
</script>
