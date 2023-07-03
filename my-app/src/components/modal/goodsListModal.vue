<template>
  <a-modal
    :visible="propsObject.visible"
    :ok-button-props="{
      disabled: !tableRowSelectionSelectedRowKeysArray.length,
    }"
    title="商品选择"
    width="100%"
    wrap-class-name="full-modal"
    :confirm-loading="modalConfirmLoadingBoolean"
    @ok="modalOkFunction"
    @cancel="modalCancelFunction"
  >
    <a-form
      ref="formRef"
      :model="model"
      :label-col="{ span: 6 }"
      @finish="formFinishFunction"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="商品搜索" :label-col="{ span: 6 }">
            <a-input-group compact>
              <a-select
                style="width: 50%"
                :allow-clear="false"
                v-model:value="formModelObject.goods_search_key"
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
                v-model:value="formModelObject.goods_search_value"
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
              v-model:value="formModelObject.brand_id"
              mode="multiple"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="后台类目"
            :label-col="{ span: 6 }"
            :name="['category_id_array']"
          >
            <background-category-cascader
              v-model:value="formModelObject.category_id"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="订单金额" :label-col="{ span: 6 }">
            <a-input-group compact>
              <a-input
                v-model:value="formModelObject.sku_qty_start"
                style="width: 40%; text-align: center"
                placeholder="最大值"
              />
              <a-input
                style="
                  width: 20%;
                  border-left: 0;
                  pointer-events: none;
                  background-color: #fff;
                "
                placeholder="~"
                disabled
              />
              <a-input
                v-model:value="formModelObject.sku_qty_end"
                style="width: 40%; text-align: center; border-left: 0"
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
              <clear-outlined @click="clearOutlinedClickFunction" />
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :row-key="tableRowKeyFunction"
      :row-selection="{
        selectedRowKeys: tableRowSelectionSelectedRowKeysArray,
        onChange: tableRowSelectionOnChangeFunction,
        getCheckboxProps: tableRowSelectionGetCheckboxPropsFunction,
        preserveSelectedRowKeys: true,
      }"
      :data-source="data?.list"
      :columns="tableColumnsArray"
      :loading="loading"
      :pagination="tablePaginationObject"
      @change="tableChangeFunction"
    >
      <template
        #bodyCell="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: SkuSingleInterface,
        }"
      >
        <template v-if="column.key === 'category_id'">
          <background-category-cascader
            :is-detail="true"
            :value="record.category_path.map(Number)"
            style="width: 100%"
          />
        </template>
        <template v-if="column.key === 'shop_selling_price'">
          <a-popover title="阶梯价展示" v-if="record.member_price.length > 0">
            <template #content>
              <a-table
                :data-source="record.member_price"
                :columns="goodsListModalLadderPriceTableColumnsArray"
                :pagination="false"
                size="small"
              />
            </template>
            <info-circle-outlined />
          </a-popover>
          <span v-else>{{ record.shop_selling_price }}</span>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import GoodsBrandSelect from '../select/goodsBrandSelect.vue';
import BackgroundCategoryCascader from '../cascader/backgroundCategoryCascader.vue';
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
  message,
  TableColumn,
  TableColumnsType,
} from 'ant-design-vue';
import {
  SkuSingleInterface,
  SkuRequestParamsInterface,
} from '../../api/interface';
import { api_goods_sku_getSkuAreaBySkuIds } from '../../views/orderModule/orderMenu/api';
import { skuRequestFunction } from '../../api/list';
import { usePagination } from 'vue-request';
import {
  SearchOutlined,
  ClearOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { difference, last } from 'lodash';
import { PageInterface } from '../../interface';

const tableColumnsArray: TableColumnsType = [
  {
    title: '商品名称',
    dataIndex: 'spu_name',
    key: 'spu_name',
  },
  {
    title: '商品编码',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '店铺商品编码',
    dataIndex: 'shop_goods_code',
    key: 'shop_goods_code',
  },
  {
    title: '货号',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: '销售店铺',
    dataIndex: 'shop_name',
    key: 'shop_name',
  },
  {
    title: '商品类型',
    dataIndex: 'sku_type_name',
    key: 'sku_type_name',
  },
  {
    title: '规格属性',
    dataIndex: 'sku_specs',
    key: 'sku_specs',
  },
  {
    title: '品牌类目',
    dataIndex: 'category_id',
    key: 'category_id',
  },
  {
    title: '订购单位',
    dataIndex: 'pack_unit',
    key: 'pack_unit',
  },
  {
    title: '定价方式',
    dataIndex: 'member_price_name',
    key: 'member_price_name',
  },
  {
    title: '销售单价',
    dataIndex: 'shop_selling_price',
    key: 'shop_selling_price',
  },
  {
    title: '可售库存',
    dataIndex: 'real_qty',
    key: 'real_qty',
  },
];

const goodsListModalLadderPriceTableColumnsArray: TableColumnsType = [
  {
    title: '订购数量',
    dataIndex: 'start_num_name',
    key: 'start_num_name',
  },
  {
    title: '销售单价',
    dataIndex: 'member_price',
    key: 'member_price',
  },
];

const propsObject = defineProps<{
  visible: boolean;
  tableDataSource: SkuSingleInterface[];
  area: number[];
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'select', selectedRowsArray: SkuSingleInterface[]): void;
}>();
const modalConfirmLoadingBoolean = ref(false);
const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
let noSelectedRowKeysArray: string[] = [];
const formRefObject = ref<FormInstance>();
const selectedRowsArray = ref<SkuSingleInterface[]>([]);
const { data, current, pageSize, run, loading, total } = usePagination(
  skuRequestFunction,
  {
    manual: true,
    formatResult: ({ data }) => {
      data.list.forEach((current) => {
        current.sku_type_name = '实物';
        current.member_price_name =
          current.member_price.length > 0 ? '阶梯价' : '固定价';
        current.member_price.forEach((item) => {
          item.start_num_name = `${item.start_num}${
            item.end_num ? `~${item.end_num}` : '+'
          }`;
        });
      });
      return data;
    },
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'page_size',
      totalKey: 'total',
    },
  }
);
const formModelObject = reactive<SkuRequestParamsInterface>({
  channel_id: 1,
  is_listing: 1,
  need_stock: 1,
  business_id: 1,
  is_support_local: 0,
  is_suit: 0,
  page: current.value,
  page_size: pageSize.value,
});
const formFinishFunction = async () => {
  run(getSearchDataFunction({ page: 1, page_size: 10 }));
};
const getSearchDataFunction = (
  params: PageInterface = {
    page: current.value,
    page_size: pageSize.value,
  }
) => {
  formModelObject.category_id = last(formModelObject.category_id_array);

  return {
    ...formModelObject,
    ...params,
    good_search_key: formModelObject.goods_search_value
      ? formModelObject.goods_search_key
      : undefined,
    good_search_value: formModelObject.goods_search_value || undefined,
  };
};
const tablePaginationObject = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

const tableRowSelectionOnChangeFunction: TableRowSelection['onChange'] = (
  keys,
  rows
) => {
  tableRowSelectionSelectedRowKeysArray.value = keys;
  selectedRowsArray.value = rows;
};

const tableChangeFunction: TableProps['onChange'] = async (pag) => {
  run(
    getSearchDataFunction({
      page: pag.current!,
      page_size: pag.pageSize!,
    })
  );
};

const tableRowSelectionGetCheckboxPropsFunction: TableRowSelection['getCheckboxProps'] =
  ({ sku_id, spu_id, real_qty }) => {
    return {
      disabled:
        noSelectedRowKeysArray.includes(`${spu_id}/${sku_id}`) ||
        real_qty === 0,
    };
  };

const tableRowKeyFunction = ({ sku_id, spu_id }: SkuSingleInterface) => {
  return `${spu_id}/${sku_id}`;
};

const clearOutlinedClickFunction = () => {
  formRefObject.value?.resetFields();
};

const modalOkFunction = async () => {
  modalConfirmLoadingBoolean.value = true;
  // 验证选择得商品是否在可配送的范围内
  let { data } = await api_goods_sku_getSkuAreaBySkuIds({
    shop_goods_ids: selectedRowsArray.value.map(
      ({ shop_goods_id }) => shop_goods_id
    ),
    province: propsObject.area[0],
    district: propsObject.area[2],
    channel_id: 1,
  }).catch(() => {
    modalConfirmLoadingBoolean.value = false;
    return Promise.reject();
  });
  if (data.length) {
    message.warning(
      `所选择的商品中有${data.length}个商品不支持该收货地址，系统已自动删除！`
    );
    let spuSkuArray: string[] = [];
    data.forEach((item) => {
      selectedRowsArray.value = selectedRowsArray.value.filter((current) => {
        if (current.shop_goods_id !== item) {
          return true;
        } else {
          spuSkuArray.push(`${current.spu_id}/${current.sku_id}`);
          return false;
        }
      });
    });
    tableRowSelectionSelectedRowKeysArray.value = difference(
      tableRowSelectionSelectedRowKeysArray.value,
      spuSkuArray
    );
  }
  emitsFunction('select', selectedRowsArray.value);
  emitsFunction('update:visible', false);
  modalConfirmLoadingBoolean.value = false;
};
const modalCancelFunction = () => {
  emitsFunction('update:visible', false);
  formRefObject.value?.resetFields();
  tableRowSelectionSelectedRowKeysArray.value = [];
  selectedRowsArray.value = [];
};

// 这个watch其实概念上就是modal自己显示隐藏得change事件
watch(
  () => propsObject.visible,
  async (newValue) => {
    if (newValue === true) {
      noSelectedRowKeysArray = propsObject.tableDataSource.map(
        ({ spu_id, sku_id }) => {
          return `${spu_id}/${sku_id}`;
        }
      );
      run(getSearchDataFunction());
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
