<template>
  <a-modal
    :visible="props.visible"
    :ok-button-props="{ disabled: !selectedRowKeys.length }"
    title="商品选择"
    width="100%"
    wrap-class-name="full-modal"
    :confirmLoading="confirmLoading"
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
            :name="['category_id_array']"
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
                v-model:value="model.sku_qty_end"
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
        preserveSelectedRowKeys: true,
      }"
      :data-source="dataSource?.list"
      :columns="goodsListModalGoodsTableColumns"
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
                :columns="goodsListModalLadderPriceTableColumns"
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
import GoodsBrandSelect from '../../../../components/select/goodsBrand.vue';
import BackgroundCategoryCascader from '../../../../components/cascader/backgroundCategory.vue';
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
  message,
} from 'ant-design-vue';
import {
  Api_goods_sku_list_result_item_interface,
  Api_goods_sku_list_params_part_interface,
  Api_goods_sku_list_params_interface,
  Api_proxy_order_Order_BackEnd_submit_params_interface,
} from '../interface';
import { api_goods_sku_list, api_goods_sku_getSkuAreaBySkuIds } from '../api';
import {
  goodsListModalGoodsTableColumns,
  goodsListModalLadderPriceTableColumns,
} from '../data';
import { usePagination } from 'vue-request';
import {
  SearchOutlined,
  ClearOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { difference, last } from 'lodash';
import { PageInterface } from '../../../../interface';

const props = defineProps<{
  visible: boolean;
  model: Api_proxy_order_Order_BackEnd_submit_params_interface;
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (
    event: 'select',
    selectedRowsArray: Api_goods_sku_list_result_item_interface[]
  ): void;
}>();
const confirmLoading = ref(false);
const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);
let noSelectedRowKeysArray: string[] = [];
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
});
const model = reactive<Api_goods_sku_list_params_interface>({
  channel_id: 1,
  is_listing: 1,
  need_stock: 1,
  business_id: 1,
  is_support_local: 0,
  is_suit: 0,
  page: current.value,
  page_size: pageSize.value,
});
const finish = async () => {
  run(getSearchDataObject({ page: 1, page_size: 10 }));
};
const getSearchDataObject = (
  params: PageInterface = {
    page: current.value,
    page_size: pageSize.value,
  }
) => {
  model.category_id = last(model.category_id_array);

  return {
    ...model,
    ...params,
    good_search_key: model.goods_search_value
      ? model.goods_search_key
      : undefined,
    good_search_value: model.goods_search_value || undefined,
  };
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
  console.log(keys, 304);

  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const tableChange: TableProps['onChange'] = async (pag) => {
  run(
    getSearchDataObject({
      page: pag.current!,
      page_size: pag.pageSize!,
    })
  );
};

const getCheckboxProps: TableRowSelection['getCheckboxProps'] = ({
  sku_id,
  spu_id,
  real_qty,
}) => {
  return {
    disabled:
      noSelectedRowKeysArray.includes(`${spu_id}/${sku_id}`) || real_qty === 0,
  };
};

const tableRowKey = ({
  sku_id,
  spu_id,
}: Api_goods_sku_list_result_item_interface) => {
  return `${spu_id}/${sku_id}`;
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
};

const ok = async () => {
  confirmLoading.value = true;
  try {
    // 验证选择得商品是否在可配送的范围内
    let { data } = await api_goods_sku_getSkuAreaBySkuIds({
      shop_goods_ids: selectedRowsArray.value.map(
        ({ shop_goods_id }) => shop_goods_id
      ),
      province: props.model.addressInfo.addressIds[0],
      district: props.model.addressInfo.addressIds[2],
      channel_id: 1,
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
      selectedRowKeys.value = difference(selectedRowKeys.value, spuSkuArray);
    }
    emits('select', selectedRowsArray.value);
    emits('update:visible', false);
    confirmLoading.value = false;
  } catch (e) {
    confirmLoading.value = false;
  }
};
const cancel = () => {
  emits('update:visible', false);
};

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      noSelectedRowKeysArray = props.model.dataSource.map(
        ({ spu_id, sku_id }) => {
          return `${spu_id}/${sku_id}`;
        }
      );
      run(getSearchDataObject());
    } else {
      formRef.value?.resetFields();
      selectedRowKeys.value = [];
      selectedRowsArray.value = [];
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
