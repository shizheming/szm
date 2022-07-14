<template>
  <a-form ref="formRef" :model="model" @finish="finish">
    <a-row :style="`height:${height};overflow:hidden`">
      <a-col :span="8">
        <a-form-item label="订单搜索" :label-col="{ span: 6 }">
          <a-input-group compact>
            <a-select
              style="width: 50%"
              :allow-clear="false"
              v-model:value="model.order_search_key"
            >
              <a-select-option value="osl_seq">订单编号</a-select-option>
              <a-select-option value="out_ono">外部订单号</a-select-option>
              <a-select-option value="name">收货人姓名</a-select-option>
              <a-select-option value="mobile">收货人手机号</a-select-option>
              <a-select-option value="mobile_tail"
                >收货人手机号后四位</a-select-option
              >
              <a-select-option value="ono">主单号</a-select-option>
            </a-select>
            <a-input
              style="width: 50%"
              v-model:value="model.order_search_value"
            />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="商品搜索" :label-col="{ span: 6 }">
          <a-input-group compact>
            <a-select
              style="width: 50%"
              :allow-clear="false"
              v-model:value="model.good_search_key"
            >
              <a-select-option value="goods_name">商品名称</a-select-option>
              <a-select-option value="sku_code">商品编码</a-select-option>
              <a-select-option value="shop_sku_code"
                >店铺商品编码</a-select-option
              >
              <a-select-option value="sn">货号</a-select-option>
            </a-select>
            <a-input
              style="width: 50%"
              v-model:value="model.good_search_value"
            />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单状态"
          :label-col="{ span: 6 }"
          :name="['sub_status_arr']"
        >
          <a-select
            mode="multiple"
            :options="ORDER_STATUS_OPTIONS"
            v-model:value="model.sub_status_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="支付状态"
          :label-col="{ span: 6 }"
          :name="['pay_status_arr']"
        >
          <a-select
            mode="multiple"
            :options="PAY_STATUS_OPTIONS"
            v-model:value="model.pay_status_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="发货状态"
          :label-col="{ span: 6 }"
          :name="['deliver_arr']"
        >
          <a-select
            mode="multiple"
            :options="DELIVERY_STATUS_OPTIONS"
            v-model:value="model.deliver_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="店铺名称"
          :label-col="{ span: 6 }"
          :name="['shop_name']"
        >
          <a-input v-model:value="model.shop_name" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="供应商"
          :label-col="{ span: 6 }"
          :name="['supplier_id']"
        >
          <supplier-select v-model:value="model.supplier_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="用户等级"
          :label-col="{ span: 6 }"
          :name="['user_level']"
        >
          <a-select
            :options="USER_LEVEL_OPTIONS"
            v-model:value="model.user_level"
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
        <a-form-item
          label="商品品牌"
          :label-col="{ span: 6 }"
          :name="['brand_name_arr']"
        >
          <goods-brand-select
            v-model:value="model.brand_name_arr"
            mode="multiple"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="用户ID"
          :label-col="{ span: 6 }"
          :name="['user_id']"
        >
          <a-input v-model:value="model.user_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="录入方式"
          :label-col="{ span: 6 }"
          :name="['create_mode_arr']"
        >
          <a-select
            v-model:value="model.create_mode_arr"
            mode="multiple"
            :options="CREATE_MODE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="来源终端"
          :label-col="{ span: 6 }"
          :name="['app_platform']"
        >
          <a-select
            v-model:value="model.app_platform"
            :options="APP_PLATFORM_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="销售渠道"
          :label-col="{ span: 6 }"
          :name="['sale_mode']"
        >
          <sale-mode-select v-model:value="model.sale_mode" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="配送方式"
          :label-col="{ span: 6 }"
          :name="['delivery_mode']"
        >
          <a-select
            v-model:value="model.delivery_mode"
            :options="DELIVERY_MODE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="支付方式"
          :label-col="{ span: 6 }"
          :name="['pay_type']"
        >
          <a-select
            v-model:value="model.pay_type"
            :options="PAY_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="支付类型"
          :label-col="{ span: 6 }"
          :name="['payment_type']"
        >
          <a-select
            v-model:value="model.payment_type"
            :options="PAYMENT_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="发票"
          :label-col="{ span: 6 }"
          :name="['is_invoice']"
        >
          <a-select
            v-model:value="model.is_invoice"
            :options="IS_INVOICE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="本地服务"
          :label-col="{ span: 6 }"
          :name="['is_support_local']"
        >
          <a-select
            v-model:value="model.is_support_local"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单商品来源"
          :label-col="{ span: 6 }"
          :name="['goods_source']"
        >
          <a-select
            v-model:value="model.goods_source"
            :options="GOODS_SOURCE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="分销订单"
          :label-col="{ span: 6 }"
          :name="['distribute_order']"
        >
          <a-select
            v-model:value="model.distribute_order"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="销售站点"
          :label-col="{ span: 6 }"
          :name="['owner_site_id']"
        >
          <owner-site-select v-model:value="model.owner_site_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单创建"
          :label-col="{ span: 6 }"
          :name="['createTime']"
        >
          <a-range-picker show-time v-model:value="model.createTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="创建人ID"
          :label-col="{ span: 6 }"
          :name="['create_user_id']"
        >
          <a-input v-model:value="model.create_user_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单支付"
          :label-col="{ span: 6 }"
          :name="['paymentTime']"
        >
          <a-range-picker show-time v-model:value="model.paymentTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="支付流水号"
          :label-col="{ span: 6 }"
          :name="['trade_no']"
        >
          <a-input v-model:value="model.trade_no" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="要求送货"
          :label-col="{ span: 6 }"
          :name="['deliveryTime']"
        >
          <a-range-picker show-time v-model:value="model.deliveryTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="推荐人"
          :label-col="{ span: 6 }"
          :name="['recommend_staff']"
        >
          <a-input v-model:value="model.recommend_staff" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="营销活动明细"
          :label-col="{ span: 6 }"
          :name="['marketing_type']"
        >
          <a-select
            v-model:value="model.marketing_type"
            :options="MARTING_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单类型"
          :label-col="{ span: 6 }"
          :name="['order_type']"
        >
          <a-select
            v-model:value="model.order_type"
            :options="ORDER_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="售后"
          :label-col="{ span: 6 }"
          :name="['is_return']"
        >
          <a-select v-model:value="model.is_return" :options="YES_NO_OPTIONS" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="运单号"
          :label-col="{ span: 6 }"
          :name="['package_no']"
        >
          <a-input v-model:value="model.package_no" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="买家备注"
          :label-col="{ span: 6 }"
          :name="['is_mem_msg']"
        >
          <a-select
            v-model:value="model.is_mem_msg"
            :options="YES_NO_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单销售组织"
          :label-col="{ span: 6 }"
          :name="['sub_org_id']"
        >
          <sub-org-select v-model:value="model.sub_org_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="燃气用户"
          :label-col="{ span: 6 }"
          :name="['gas_account']"
        >
          <a-input v-model:value="model.gas_account" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="业务模式"
          :label-col="{ span: 6 }"
          :name="['business_id']"
        >
          <a-select
            v-model:value="model.business_id"
            :options="BUSINESS_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="预订购"
          :label-col="{ span: 6 }"
          :name="['is_pre_subscribe']"
        >
          <a-select
            v-model:value="model.is_pre_subscribe"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="订单销售组织"
          :label-col="{ span: 6 }"
          :name="['source_site_id']"
        >
          <owner-site-select v-model:value="model.source_site_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="拼单状态"
          :label-col="{ span: 6 }"
          :name="['spell_order_status']"
        >
          <a-select
            v-model:value="model.spell_order_status"
            :options="SPELL_ORDER_STATUS_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="对接外部系统"
          :label-col="{ span: 6 }"
          :name="['is_out_supplier']"
        >
          <a-select
            v-model:value="model.is_out_supplier"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货地址"
          :label-col="{ span: 6 }"
          :name="['address']"
        >
          <address-cascader v-model:value="model.address" />
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
            <up-outlined @click="arrowClick" v-if="isExpandArrowBoolean" />
            <down-outlined @click="arrowClick" v-else />
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <a-row style="margin: 30px 0">
    <a-space size="large">
      <a-button @click="batchButtonClick">批量编辑商家备注</a-button>
      <router-link to="/">人工下单</router-link>
      <router-link to="/">补开发票</router-link>
    </a-space>
  </a-row>
  <a-table
    rowKey="id"
    :row-selection="{ selectedRowKeys, onChange: rowSelectionOnChange }"
    :dataSource="dataSource?.list"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @change="tableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a-space>
          <router-link to="/"><a>查看</a></router-link>
          <router-link to="/"><a>编辑</a></router-link>
          <a-popconfirm title="确定要？" @confirm="popconfirmConfirm">
            <a-button size="small">取消</a-button>
          </a-popconfirm>
        </a-space>
      </template>
      <template v-if="column.key === 'is_listing'">
        <a-switch
          :checked="!!record.is_listing"
          @change="switchChange"
          checked-children="上架"
          un-checked-children="下架"
        />
      </template>
      <template v-if="column.key === 'stock'">
        <a-space style="width: 100%">
          <a-input-number
            :disabled="!record.editStockStatus"
            :bordered="!!record.editStockStatus"
            v-model:value="record.stock"
            style="background-color: #fff; color: #000"
            :mim="0"
          />
          <edit-outlined
            v-if="!record.editStockStatus"
            style="color: #40a9ff"
            @click="editOutlinedIconClick(record)"
          />
          <div v-else>
            <check-outlined
              @click="checkOutlinedIconClick(record)"
              style="
                font-size: 18px;
                margin: 0 10px;
                color: #40a9ff;
                cursor: pointer;
              "
            />
            <close-outlined
              style="font-size: 18px; cursor: pointer"
              @click="closeOutlinedIconClick(record)"
            />
          </div>
        </a-space>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { message, FormInstance, TableProps } from "ant-design-vue";
import {
  ORDER_STATUS_OPTIONS,
  PAY_STATUS_OPTIONS,
  DELIVERY_STATUS_OPTIONS,
  USER_LEVEL_OPTIONS,
  APP_PLATFORM_OPTIONS,
  DELIVERY_MODE_OPTIONS,
  CREATE_MODE_OPTIONS,
  PAY_TYPE_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
  GOODS_SOURCE_OPTIONS,
  IS_INVOICE_OPTIONS,
  WHETHER_OPTIONS,
  MARTING_TYPE_OPTIONS,
  ORDER_TYPE_OPTIONS,
  YES_NO_OPTIONS,
  BUSINESS_OPTIONS,
  SPELL_ORDER_STATUS_OPTIONS,
} from "../../../data/dictionary";
import SupplierSelect from "../../../components/select/supplier.vue";
import BackgroundCategoryCascader from "../../../components/cascader/backgroundCategory.vue";
import GoodsBrandSelect from "../../../components/select/goodsBrand.vue";
import SaleModeSelect from "../../../components/select/saleMode.vue";
import OwnerSiteSelect from "../../../components/select/ownerSite.vue";
import SubOrgSelect from "../../../components/select/subOrg.vue";
import AddressCascader from "../../../components/cascader/address.vue";
import { columns } from "./orderListPageData";
import {
  SmileOutlined,
  SearchOutlined,
  ClearOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import type { modelInterface } from "./interface";
import { order_list_page_api } from "./api";
import { usePagination } from "vue-request";
import { computed } from "@vue/reactivity";

// 实体

// 属性
const model = reactive<modelInterface>({
  order_search_key: "osl_seq",
  good_search_key: "goods_name",
});
const formRef = ref<FormInstance>();
const height = ref<string>("220px");
const selectedRowKeys = ref([]);
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(order_list_page_api, {
  defaultParams: [
    {
      page: 1,
      page_size: 10,
    },
  ],
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    totalKey: "total",
  },
});

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

// 事件
const rowSelectionOnChange = (keys: [], rows: []) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const finish = async (values: any) => {
  console.log(model, 123);
  run({
    page: 1,
    page_size: 10,
    ...model,
  });
};

const arrowClick = () => {
  isExpandArrowBoolean.value = !isExpandArrowBoolean.value;
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
  model.order_search_value = undefined;
  model.good_search_value = undefined;
};

const tableChange: TableProps["onChange"] = async (pag) => {
  run({
    page: pag.current as number,
    page_size: 10,
    ...model,
  });
};

const batchButtonClick = async () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择");
    return;
  }
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    run({
      page: 1,
      page_size: 10,
    });
  }, 500);
};

const popconfirmConfirm = async () => {
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    run({
      page: 1,
      page_size: 10,
    });
  }, 500);
};

const switchChange = async () => {
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    run({
      page: 1,
      page_size: 10,
    });
  }, 500);
};

function editOutlinedIconClick(record: any) {
  record.editStockStatus = true;
}

function closeOutlinedIconClick(record: any) {
  record.editStockStatus = false;
}

async function checkOutlinedIconClick(record: any) {
  await Promise.resolve();
  record.editStockStatus = false;
  message.success("成功");
  setTimeout(() => {
    run({
      page: 1,
      page_size: 10,
    });
  }, 500);
}

// 数据
const isExpandArrowBoolean = ref<boolean>(false);
const selectedRowsArray = ref();

watch(isExpandArrowBoolean, (newValue) => {
  if (newValue) {
    height.value = "auto";
  } else {
    height.value = "220px";
  }
});

// 初始化
</script>
