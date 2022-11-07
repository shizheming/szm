<template>
  <a-modal
    :visible="props.visible"
    title="商品选择"
    width="100%"
    wrap-class-name="full-modal"
    @ok="ok"
    @cancel="cancel"
  >
    <a-form
      ref="formRef"
      :model="model"
      :label-col="{ span: 6 }"
      @finish="finish"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="商品搜索" :label-col="{ span: 6 }">
            <a-input-group compact>
              <a-select
                style="width: 50%"
                :allow-clear="false"
                v-model:value="model.goods_search_key"
              >
                <a-select-option value="name">商品名称</a-select-option>
                <a-select-option value="sku_code">商品编码</a-select-option>
                <a-select-option value="shop_goods_code"
                  >店铺商品编码</a-select-option
                >
                <a-select-option value="sn">货号</a-select-option>
              </a-select>
              <a-input
                style="width: 50%"
                v-model:value="model.goods_search_value"
              />
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="商品品牌"
            :label-col="{ span: 6 }"
            :name="['brand_id']"
          >
            <goods-brand-select
              v-model:value="model.brand_id"
              mode="multiple"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="后台类目"
            :label-col="{ span: 6 }"
            :name="['category_id']"
          >
            <background-category-cascader
              v-model:value="model.category_id"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="订单金额" :label-col="{ span: 6 }">
            <a-input-group compact>
              <a-input
                v-model:value="model.sku_qty_start"
                style="width: 100px; text-align: center"
                placeholder="最大值"
              />
              <a-input
                style="
                  width: 60px;
                  border-left: 0;
                  pointer-events: none;
                  background-color: #fff;
                "
                placeholder="~"
                disabled
              />
              <a-input
                v-model:value="model.sku_qty_end"
                style="width: 100px; text-align: center; border-left: 0"
                placeholder="最小值"
              />
            </a-input-group>
          </a-form-item>
        </a-col>
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
      :row-key="tableRowKey"
      :row-selection="{
        selectedRowKeys,
        onChange: rowSelectionOnChange,
        getCheckboxProps,
      }"
      :data-source="dataSource?.list"
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
          record: Api_goods_sku_list_result_item_interface,
        }"
      >
        <template v-if="column.key === 'operation'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import GoodsBrandSelect from '../../../../components/select/goodsBrand.vue';
import BackgroundCategoryCascader from '../../../../components/cascader/backgroundCategory.vue';
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
} from 'ant-design-vue';
import {
  Api_goods_sku_list_result_item_interface,
  Api_goods_sku_list_params_interface,
} from '../interface';
import { api_goods_sku_list } from '../api';
import { orderFormModalGoodsColumns } from '../data';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';

const props = defineProps<{
  visible: boolean;
  selectedRowKeys: any[];
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (
    event: 'select',
    selectedRowKeys: any[],
    selectedRowsArray: Api_goods_sku_list_result_item_interface[]
  ): void;
}>();

const selectedRowKeys = ref<any>([]);
const model = reactive<Api_goods_sku_list_params_interface>({
  channel_id: 1,
  is_listing: 1,
  need_stock: 1,
  business_id: 1,
  is_support_local: 0,
  page: 1,
  page_size: 10,
});
const formRef = ref<FormInstance>();
const selectedRowsArray = ref<Api_goods_sku_list_result_item_interface[]>([]);
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(api_goods_sku_list, {
  manual: true,
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'page_size',
    totalKey: 'total',
  },
});

const finish: FormProps['onFinish'] = async (values) => {
  run({
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

const rowSelectionOnChange: TableRowSelection['onChange'] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const tableChange: TableProps['onChange'] = async (pag) => {
  run({
    ...model,
  });
};

const getCheckboxProps: TableRowSelection['getCheckboxProps'] = ({
  sku_id,
  spu_id,
}) => {
  return {
    disabled: props.selectedRowKeys.includes(`${spu_id}_${sku_id}`),
  };
};

const tableRowKey: Api_goods_sku_list_result_item_interface = ({
  sku_id,
  spu_id,
}) => {
  return `${spu_id}_${sku_id}`;
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
};

const ok: ModalProps['onOk'] = async (e) => {
  formRef.value?.resetFields();

  emits('select', selectedRowKeys.value, selectedRowsArray.value);
  emits('update:visible', false);
};
const cancel: ModalProps['onCancel'] = (e) => {
  formRef.value?.resetFields();
  emits('update:visible', false);
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
<style>
.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
}
.full-modal .ant-modal-body {
  flex: 1;
}
</style>
