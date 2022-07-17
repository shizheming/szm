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
          <a-range-picker
            show-time
            v-model:value="model.createTime"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
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
          <a-range-picker
            show-time
            v-model:value="model.paymentTime"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
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
          <a-range-picker
            show-time
            v-model:value="model.deliveryTime"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
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
    <a-space>
      <a-button @click="batchButtonClick" type="primary" size="small"
        >批量编辑商家备注</a-button
      >
      <a-button @click="taskButtonClick" type="primary" size="small"
        >查看任务</a-button
      >
      <a-button @click="exporButtonClick" type="primary" size="small"
        >导出发货信息</a-button
      >
      <a-button @click="exporButtonClick" type="primary" size="small"
        >导出订单明细</a-button
      >
      <router-link :to="{ name: 'orderFormPage' }">人工下单</router-link>
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
    <template #expandedRowRender="{ record }: { record: ModelInterface }">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="基本信息">
          <a-descriptions>
            <a-descriptions-item label="主单编号">
              {{ record.ono }}
            </a-descriptions-item>
            <a-descriptions-item label="外部订单号">
              {{ record.out_ono }}
            </a-descriptions-item>
            <a-descriptions-item label="供应商">
              {{ record.supplier_name }}
            </a-descriptions-item>
            <a-descriptions-item label="销售组织">
              {{ record.sub_org_name }}
            </a-descriptions-item>
            <a-descriptions-item label="销售渠道">
              {{ record.sale_mode.name }}
            </a-descriptions-item>
            <a-descriptions-item label="销售站点">
              {{ record.owner_site_name }}
            </a-descriptions-item>
            <a-descriptions-item label="预计发货时间">
              {{ record.pre_delivery_time }}
            </a-descriptions-item>
            <a-descriptions-item label="拼团状态">
              {{ SPELL_ORDER_STATUS_ENUM[record.spell_order_status as number] }}
            </a-descriptions-item>
            <a-descriptions-item label="支付时间">
              {{ record.pay_time }}
            </a-descriptions-item>
            <a-descriptions-item label="创建人">
              {{ record.create_user_id }}
            </a-descriptions-item>
            <a-descriptions-item label="用户等级">
              {{ record.user.user_level }}
            </a-descriptions-item>
            <a-descriptions-item label="燃气户号">
              {{ record.gas_account }}
            </a-descriptions-item>
            <a-descriptions-item label="是否企业用户">
              {{ WHETHER_ENUM[record.business_user] }}
            </a-descriptions-item>
            <a-descriptions-item label="推荐人">
              {{ record.recommend_staff }}
            </a-descriptions-item>
            <a-descriptions-item label="是否申请开发票">
              {{ WHETHER_ENUM[record.is_invoice] }}
            </a-descriptions-item>
            <a-descriptions-item label="配送方式">
              {{ record.delivery_mode.name }}
            </a-descriptions-item>
            <a-descriptions-item label="业务类型">
              {{ record.business_name }}
            </a-descriptions-item>
            <a-descriptions-item label="销售人员">
              {{ record.shop_account_name }}
            </a-descriptions-item>
            <a-descriptions-item label="销售人员所属网点">
              {{ record.salesman_node_name }}
            </a-descriptions-item>
            <a-descriptions-item label="外部系统履约">
              {{ record.external_system_code }}
            </a-descriptions-item>
            <a-descriptions-item label="收件人姓名">
              {{ record.consignee.name }}
            </a-descriptions-item>
            <a-descriptions-item label="收件人手机">
              {{ record.consignee.mobile }}
            </a-descriptions-item>
            <a-descriptions-item label="订单收货地址">
              {{ record.detailAddress }}
            </a-descriptions-item>
            <a-descriptions-item label="买家备注">
              {{ record.mem_msg }}
            </a-descriptions-item>
            <a-descriptions-item label="卖家备注">
              {{ record.merchant_remark }}
            </a-descriptions-item>
            <a-descriptions-item label="供货组织">
              {{ record.distribute_org_name }}
            </a-descriptions-item>
            <a-descriptions-item label="供货组织来源平台企业id">
              {{ record.distribute_org_enterprise_id }}
            </a-descriptions-item>
            <a-descriptions-item label="录入方式">
              {{ record.create_mode.name }}
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="2" tab="商品信息" force-render>
          <a-table
            size="small"
            :columns="goodsColumns"
            :pagination="false"
            :data-source="record.item"
          >
            <template
              #bodyCell="{
                column,
                record,
              }: {
                column: TableColumnType,
                record: any,
              }"
            >
              <template v-if="column.key === 'pic'">
                <a-image :src="record.pic_url_pic" :width="100" />
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </template>
    <template
      #bodyCell="{
        column,
        record,
      }: {
        column: TableColumnType,
        record: ModelInterface,
      }"
    >
      <template v-if="column.key === 'operation'">
        <a-space>
          <router-link to="/">
            <a-button type="link" size="small">查看</a-button>
          </router-link>
          <router-link
            to="/"
            v-if="
              record.distribute_order != 1 &&
              record.sub_status.value == 30 &&
              record.is_electron === 1 &&
              record.out_delivery_tag === 0 &&
              record.delivery_mode.value == 1
            "
          >
            <a-button type="link" size="small">京东快递发货</a-button>
          </router-link>

          <router-link
            v-if="
              record.external_system_code != 'JINGDONG' &&
              record.distribute_order != 1 &&
              record.sub_status.value == 30 &&
              record.delivery_mode.value == 1
            "
            to="/"
          >
            <a-button type="link" size="small">发货</a-button>
          </router-link>
          <a-popconfirm
            title="请确认用户已经签收，否则可能会引起用户投诉！"
            @confirm="
              popconfirmConfirm(confirmsign_api, {
                user_id: record.user.user_id,
                osl_seq: record.osl_seq,
                operator: USER_INFO.user_id,
              })
            "
          >
            <a-button size="small">确认签收</a-button>
          </a-popconfirm>
          <a-popconfirm
            v-if="record.is_pre_subscribe && record.status == 20"
            title="订单确认后，在系统中可以对订单进行发货操作"
            @confirm="
              popconfirmConfirm(confirmPreOrder_api, {
                osl_seq: record.osl_seq,
              })
            "
          >
            <a-button size="small">预订购确认</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
  <remark-modal
    v-model:visible="remarkModalVisible"
    :selectedRowsArray="selectedRowsArray"
  />
  <taskModal
    v-model:visible="taskModalVisible"
    :selectedRowKeys="selectedRowKeys"
  />
</template>
<script setup lang="ts">
import { ref, watch, reactive, defineAsyncComponent } from "vue";
import {
  message,
  FormInstance,
  TableProps,
  TableColumnType,
  FormProps,
} from "ant-design-vue";
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
  SORT_ENUM,
  USER_INFO,
  WHETHER_ENUM,
  SPELL_ORDER_STATUS_ENUM,
} from "../../../data/dictionary";
import SupplierSelect from "../../../components/select/supplier.vue";
import BackgroundCategoryCascader from "../../../components/cascader/backgroundCategory.vue";
import GoodsBrandSelect from "../../../components/select/goodsBrand.vue";
import SaleModeSelect from "../../../components/select/saleMode.vue";
import OwnerSiteSelect from "../../../components/select/ownerSite.vue";
import SubOrgSelect from "../../../components/select/subOrg.vue";
import AddressCascader from "../../../components/cascader/address.vue";
import { columns, goodsColumns } from "./data";
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  ClearOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import type {
  ModelInterface,
  ConfirmsignInterface,
  ConfirmPreOrderInterface,
} from "./interface";
import { order_api, confirmsign_api, confirmPreOrder_api } from "./api";
import { usePagination } from "vue-request";
import { computed } from "@vue/reactivity";
import { TableRowSelection } from "ant-design-vue/es/table/interface";

// 异步组件
const remarkModal = defineAsyncComponent(
  () => import("./components/remarkModal.vue")
);
const taskModal = defineAsyncComponent(
  () => import("./components/taskModal.vue")
);

// 属性
const model = reactive<ModelInterface>({
  order_search_key: "osl_seq",
  good_search_key: "goods_name",
});
const remarkModalVisible = ref<boolean>(false);
const taskModalVisible = ref<boolean>(false);
const formRef = ref<FormInstance>();
const height = ref<string>("220px");

const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(order_api, {
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    currentKey: "page",
    pageSizeKey: "page_size",
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

const selectedRowKeys = ref<any[]>([]);
const selectedRowsArray = ref<ModelInterface[]>([]);
const rowSelectionOnChange: TableRowSelection["onChange"] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const finish: FormProps["onFinish"] = async (values) => {
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

const tableChange: TableProps["onChange"] = async (
  pag,
  filters: any,
  sorter: any
) => {
  let sorterAny: { [name: string]: any } = {};
  if (sorter.order) {
    sorterAny[SORT_KEY_ENUM[sorter.columnKey as keyof typeof SORT_KEY_ENUM]] =
      SORT_ENUM[sorter.order];
  }
  run({
    page: pag.current as number,
    page_size: pag.pageSize as number,
    ...model,
    ...sorterAny,
  });
};

const batchButtonClick = async () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择");
    return;
  }
  remarkModalVisible.value = true;
};

const taskButtonClick = () => {
  taskModalVisible.value = true;
};
const exporButtonClick = () => {};

const popconfirmConfirm = async (
  api: (p: any) => Promise<any>,
  params: ConfirmsignInterface | ConfirmPreOrderInterface
) => {
  await api(params);
  message.success("成功");
  setTimeout(() => {
    run({
      page: 1,
      page_size: 10,
      ...model,
    });
  }, 500);
};

const isExpandArrowBoolean = ref<boolean>(false);
enum SORT_KEY_ENUM {
  order_time = "createtime_sort",
  sub_total_amount = "amount_sort",
}

const activeKey = ref<string>("1");

watch(isExpandArrowBoolean, (newValue) => {
  if (newValue) {
    height.value = "auto";
  } else {
    height.value = "220px";
  }
});

// 初始化
</script>
