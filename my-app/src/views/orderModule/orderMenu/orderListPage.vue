<template>
  <a-form
    ref="formRefObject"
    :model="formModelObject"
    @finish="formFinishFunction"
  >
    <a-row :style="`height:${heightString};overflow:hidden`">
      <a-col :span="8">
        <a-form-item label="订单搜索" :label-col="{ span: 6 }">
          <a-input-group compact>
            <a-select
              style="width: 50%"
              :allow-clear="false"
              v-model:value="formModelObject.order_search_key"
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
              v-model:value="formModelObject.order_search_value"
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
              v-model:value="formModelObject.good_search_key"
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
              v-model:value="formModelObject.good_search_value"
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
            v-model:value="formModelObject.sub_status_arr"
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
            v-model:value="formModelObject.pay_status_arr"
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
            v-model:value="formModelObject.deliver_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="店铺名称"
          :label-col="{ span: 6 }"
          :name="['shop_name']"
        >
          <a-input v-model:value="formModelObject.shop_name" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="供应商"
          :label-col="{ span: 6 }"
          :name="['supplier_id']"
        >
          <supplier-select v-model:value="formModelObject.supplier_id" />
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
            v-model:value="formModelObject.user_level"
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
            v-model:value="formModelObject.category_id_array"
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
            v-model:value="formModelObject.brand_name_arr"
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
          <a-input v-model:value="formModelObject.user_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="录入方式"
          :label-col="{ span: 6 }"
          :name="['create_mode_arr']"
        >
          <a-select
            v-model:value="formModelObject.create_mode_arr"
            mode="multiple"
            :options="ENTRY_METHOD_OPTIONS"
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
            v-model:value="formModelObject.app_platform"
            :options="SOURCE_TERMINAL_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="销售渠道"
          :label-col="{ span: 6 }"
          :name="['sale_mode']"
        >
          <sale-mode-select v-model:value="formModelObject.sale_mode" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="配送方式"
          :label-col="{ span: 6 }"
          :name="['delivery_mode']"
        >
          <a-select
            v-model:value="formModelObject.delivery_mode"
            :options="DELIVERY_METHOD_OPTIONS"
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
            v-model:value="formModelObject.pay_type"
            :options="PAYMENT_METHOD_OPTIONS"
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
            v-model:value="formModelObject.payment_type"
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
            v-model:value="formModelObject.is_invoice"
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
            v-model:value="formModelObject.is_support_local"
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
            v-model:value="formModelObject.goods_source"
            :options="ORDER_GOODS_SOURCE_OPTIONS"
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
            v-model:value="formModelObject.distribute_order"
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
          <owner-site-select v-model:value="formModelObject.owner_site_id" />
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
            v-model:value="formModelObject.createTime"
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
          <a-input v-model:value="formModelObject.create_user_id" />
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
            v-model:value="formModelObject.paymentTime"
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
          <a-input v-model:value="formModelObject.trade_no" />
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
            v-model:value="formModelObject.deliveryTime"
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
          <a-input v-model:value="formModelObject.recommend_staff" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="营销活动明细"
          :label-col="{ span: 6 }"
          :name="['marketing_type']"
        >
          <a-select
            v-model:value="formModelObject.marketing_type"
            :options="DETAIL_OF_MARKETING_ACTIVITIES_OPTIONS"
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
            v-model:value="formModelObject.order_type"
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
          <a-select
            v-model:value="formModelObject.is_return"
            :options="YES_NO_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="运单号"
          :label-col="{ span: 6 }"
          :name="['package_no']"
        >
          <a-input v-model:value="formModelObject.package_no" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="买家备注"
          :label-col="{ span: 6 }"
          :name="['is_mem_msg']"
        >
          <a-select
            v-model:value="formModelObject.is_mem_msg"
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
          <sub-org-select v-model:value="formModelObject.sub_org_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="燃气用户"
          :label-col="{ span: 6 }"
          :name="['gas_account']"
        >
          <a-input v-model:value="formModelObject.gas_account" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="业务模式"
          :label-col="{ span: 6 }"
          :name="['business_id']"
        >
          <a-select
            v-model:value="formModelObject.business_id"
            :options="BUSINESS_MODEL_OPTIONS"
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
            v-model:value="formModelObject.is_pre_subscribe"
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
          <owner-site-select v-model:value="formModelObject.source_site_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="拼单状态"
          :label-col="{ span: 6 }"
          :name="['spell_order_status']"
        >
          <a-select
            v-model:value="formModelObject.spell_order_status"
            :options="GROUPING_STATUS_OPTIONS"
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
            v-model:value="formModelObject.is_out_supplier"
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
          <address-cascader v-model:value="formModelObject.address" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item :wrapper-col="{ offset: 6 }">
          <a-space size="large">
            <a-button html-type="submit" type="primary" :loading="loading">
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
      <a-button @click="exporButtonClick(6)" type="primary" size="small"
        >导出发货信息</a-button
      >
      <a-button @click="exporButtonClick(2)" type="primary" size="small"
        >导出订单明细</a-button
      >
    </a-space>
  </a-row>
  <a-table
    rowKey="id"
    :row-selection="{
      selectedRowKeys,
      onChange: rowSelectionOnChange,
      preserveSelectedRowKeys: true,
    }"
    :dataSource="dataSource?.list"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    :scroll="{ x: 'max-content' }"
    @change="tableChange"
  >
    <template
      #expandedRowRender="{
        record,
      }: {
        record: OrderListRequestResultItemInterface,
      }"
    >
      <a-tabs v-model:activeKey="record.activeKey">
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
              {{ GROUPING_STATUS_ENUM[record.spell_order_status] }}
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
            :columns="orderListPageGoodsTableColumnsArray"
            :pagination="false"
            :data-source="record.item"
          >
            <template
              #bodyCell="{
                column,
                record: itemRecord,
              }: {
                column: TableColumnType,
                record: OrderListRequestResultItemInterface['item'][number],
              }"
            >
              <template v-if="column.key === 'pic'">
                <a-image :src="itemRecord.pic_url_pic" :width="50" />
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
        record: OrderListRequestResultItemInterface,
      }"
    >
      <template v-if="column.key === 'operation'">
        <router-link :to="{ name: 'orderDetailPage' }">
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
          v-if="record.sub_status.value == 40 && record.business_id == 2"
          title="请确认用户已经签收，否则可能会引起用户投诉！"
          @confirm="confirmSigningPopconfirmConfirm(record)"
        >
          <a-button size="small">确认签收</a-button>
        </a-popconfirm>
        <template v-if="record.is_pre_subscribe && record.status == 20">
          <a-button
            size="small"
            v-if="record.is_support_local"
            @click="bookingConfirmationPopconfirmConfirm1(record)"
          >
            预订购确认
          </a-button>
          <a-popconfirm
            v-else
            title="订单确认后，在系统中可以对订单进行发货操作"
            @confirm="bookingConfirmationPopconfirmConfirm2(record)"
          >
            <a-button size="small">预订购确认</a-button>
          </a-popconfirm>
        </template>
        <a-popconfirm
          v-if="
            record.external_system_code != 'JINGDONG' &&
            record.distribute_order != 1 &&
            record.sub_status.value == 30 &&
            record.delivery_mode.value == 1 &&
            record.is_allow_create_outstock == true
          "
          title="确认要生成销售出库单吗？"
          @confirm="generateSalesIssueDocumentPopconfirmConfirm(record)"
        >
          <a-button size="small">生成销售出库单</a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <remark-form-modal
    v-model:visible="remarkFormModalVisible"
    :selected-rows-array="selectedRowsArray"
    @submit="modalSubmit"
  />
  <task-list-modal v-model:visible="taskListModalVisible" />
  <delivery-installation-time-table-modal
    v-model:visible="deliveryInstallationTimeTableModalVisible"
    :record="recordObject"
    @submit="modalSubmit"
  />
</template>
<script setup lang="ts">
import { ref, watch, reactive, defineAsyncComponent, h } from 'vue';
import {
  message,
  FormInstance,
  TableProps,
  TableColumnType,
  FormProps,
  PopconfirmProps,
  Modal,
} from 'ant-design-vue';
import { findCategoryFunction } from '../../../utils/z';
import {
  SORT_ENUM,
  USER_INFO,
  WHETHER_ENUM,
  GROUPING_STATUS_ENUM,
  YES_NO_ENUM,
  ORDER_GOODS_SOURCE_ENUM,
  GOODS_FORM_ENUM,
} from '../../../data/dictionary';
import {
  ORDER_STATUS_OPTIONS,
  PAY_STATUS_OPTIONS,
  DELIVERY_STATUS_OPTIONS,
  USER_LEVEL_OPTIONS,
  SOURCE_TERMINAL_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
  ENTRY_METHOD_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
  ORDER_GOODS_SOURCE_OPTIONS,
  IS_INVOICE_OPTIONS,
  WHETHER_OPTIONS,
  DETAIL_OF_MARKETING_ACTIVITIES_OPTIONS,
  ORDER_TYPE_OPTIONS,
  YES_NO_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  GROUPING_STATUS_OPTIONS,
} from '../../../data/options';
import SupplierSelect from '../../../components/select/supplierSelect.vue';
import BackgroundCategoryCascader from '../../../components/cascader/backgroundCategoryCascader.vue';
import GoodsBrandSelect from '../../../components/select/goodsBrandSelect.vue';
import SaleModeSelect from '../../../components/select/saleModeSelect.vue';
import OwnerSiteSelect from '../../../components/select/ownerSiteSelect.vue';
import SubOrgSelect from '../../../components/select/subOrgSelect.vue';
import AddressCascader from '../../../components/cascader/addressCascader.vue';
import {
  orderListPageTableColumnsArray,
  orderListPageGoodsTableColumnsArray,
} from './data';
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  ClearOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons-vue';
import { last, compact, values, isInteger } from 'lodash';
import type {
  OrderListRequestResultItemInterface,
  OrderLsitParamsPageInterface,
} from './interface';
import {
  orderListRequestFunction,
  confirmsignRequestFunction,
  confirmPreOrderRequestFunction,
  orderDetailExportRequestFunction,
  saleOutstockRequestFunction,
} from './api';
import { usePagination } from 'vue-request';
import { computed } from '@vue/reactivity';
import {
  TableRowSelection,
  SorterResult,
} from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../../interface';
import { Item } from 'ant-design-vue/lib/menu';

const RemarkFormModal = defineAsyncComponent(
  () => import('./components/remarkFormModal.vue')
);
const TaskListModal = defineAsyncComponent(
  () => import('./components/taskListModal.vue')
);
const DeliveryInstallationTimeTableModal = defineAsyncComponent(
  () => import('./components/deliveryInstallationTimeTableModal.vue')
);

const remarkFormModalVisible = ref(false);
const taskListModalVisible = ref(false);
const deliveryInstallationTimeTableModalVisible = ref(false);
const formRefObject = ref<FormInstance>();
const heightString = ref('220px');

const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(orderListRequestFunction, {
  formatResult: ({ data }) => {
    data.list.forEach((current) => {
      current.sub_total_amount = isInteger(current.sub_total_amount)
        ? (current.sub_total_amount as number).toFixed(2)
        : current.sub_total_amount;
      current.is_support_local_name = YES_NO_ENUM[current.is_support_local];
      current.distribute_order_name = WHETHER_ENUM[current.distribute_order];
      current.is_pre_subscribe_name = WHETHER_ENUM[current.is_pre_subscribe];
      current.item.forEach((item) => {
        let priceNumberString: number | string;
        if (current.create_mode.value == 15) {
          priceNumberString = isInteger(item.shop_retail_price / 100)
            ? (item.shop_retail_price / 100).toFixed(2)
            : item.shop_retail_price / 100;
        } else {
          priceNumberString = isInteger(item.price)
            ? (item.price as number).toFixed(2)
            : item.price;
        }
        item.price = priceNumberString;
        item.real_price = isInteger(item.real_price)
          ? (item.real_price as number).toFixed(2)
          : item.real_price;

        item.category_name = findCategoryFunction(Number(item.category_id)).join('/');
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

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
    showQuickJumper: true,
  };
});
const formModelObject = reactive<OrderLsitParamsPageInterface>({
  order_search_key: 'osl_seq',
  good_search_key: 'goods_name',
  page: current.value,
  page_size: pageSize.value,
});
const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);
const selectedRowsArray = ref<OrderListRequestResultItemInterface[]>([]);
const rowSelectionOnChange: TableRowSelection['onChange'] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const getSearchDataObject = (
  params: PageInterface = {
    page: current.value,
    page_size: pageSize.value,
  }
) => {
  formModelObject.category_id = last(formModelObject.category_id_array);
  [formModelObject.create_time_start, formModelObject.create_time_end] =
    formModelObject.createTime || [];
  [formModelObject.pay_time_start, formModelObject.pay_time_end] =
    formModelObject.paymentTime || [];
  [
    formModelObject.pre_delivery_start_date,
    formModelObject.pre_delivery_end_date,
  ] = formModelObject.deliveryTime || [];
  formModelObject.pay_mode = formModelObject.payment_type;

  return {
    ...formModelObject,
    ...params,
    order_search_key: formModelObject.order_search_value
      ? formModelObject.order_search_key
      : undefined,
    order_search_value: formModelObject.order_search_value || undefined, //为了排除空字符串
    good_search_key: formModelObject.good_search_value
      ? formModelObject.good_search_key
      : undefined,
    good_search_value: formModelObject.good_search_value || undefined,
  };
};
const sortedInfoObject = ref<SorterResult>();
const columns = computed(() => {
  return orderListPageTableColumnsArray.map((item) => {
    if (item.sorter) {
      item.sortOrder =
        sortedInfoObject.value?.columnKey === item.key
          ? sortedInfoObject.value?.order
          : undefined;
    }
    return item;
  });
});
const formFinishFunction = async () => {
  sortedInfoObject.value = undefined;
  run(
    getSearchDataObject({
      page: 1,
      page_size: 10,
    })
  );
};

const exporButtonClick = async (service_type: number) => {
  if (compact(values(formModelObject)).length <= 2) {
    message.warning(
      '为避免导出数据量过大，目前仅支持导出有大于等于两个查询条件的结果数据！'
    );
    return;
  }
  await formFinishFunction();
  let { data } = await orderDetailExportRequestFunction({
    ...getSearchDataObject({
      page: 1,
      page_size: 10,
    }),
    service_type,
  });
  Modal.info({
    title: '导出提示',
    content: h('div', {}, [
      h(
        'p',
        `导出任务创建成功，任务编码：${data.id}，请在查看任务中查看日志！`
      ),
    ]),
    onOk() {
      taskListModalVisible.value = true;
    },
  });
};

const arrowClick = () => {
  isExpandArrowBoolean.value = !isExpandArrowBoolean.value;
};
const clearOutlinedClick = () => {
  formRefObject.value?.resetFields();
  formModelObject.order_search_value = undefined;
  formModelObject.good_search_value = undefined;
};

const tableChange: TableProps['onChange'] = async (pag, filters, sorter) => {
  let sorterAny: { [name: string]: any } = {};
  sorter = sorter as SorterResult;
  sortedInfoObject.value = sorter;
  if (sorter.order) {
    sorterAny[SORT_KEY_ENUM[sorter.columnKey as keyof typeof SORT_KEY_ENUM]] =
      SORT_ENUM[sorter.order];
  }
  run(
    getSearchDataObject({
      page: pag.current!,
      page_size: pag.pageSize!,
      ...sorterAny,
    })
  );
};

const batchButtonClick = async () => {
  if (selectedRowKeys.value!.length === 0) {
    message.warning('请选择');
    return;
  }
  remarkFormModalVisible.value = true;
};

const modalSubmit = () => {
  setTimeout(() => {
    run(getSearchDataObject());
  }, 500);
};

const taskButtonClick = () => {
  taskListModalVisible.value = true;
};
const confirmSigningPopconfirmConfirm = async (
  record: OrderListRequestResultItemInterface
) => {
  await confirmsignRequestFunction({
    user_id: String(record.user.user_id),
    osl_seq: record.osl_seq,
    operator: USER_INFO.user_id,
  });
  message.success('成功');
  setTimeout(() => {
    run(getSearchDataObject());
  }, 500);
};

const recordObject = ref<Partial<OrderListRequestResultItemInterface>>({});
const bookingConfirmationPopconfirmConfirm1 = (
  record: OrderListRequestResultItemInterface
) => {
  recordObject.value = record;
  deliveryInstallationTimeTableModalVisible.value = true;
};
const bookingConfirmationPopconfirmConfirm2 = async (
  record: OrderListRequestResultItemInterface
) => {
  await confirmPreOrderRequestFunction({
    osl_seq: record.osl_seq,
  });
  message.success('成功');
  setTimeout(() => {
    run(getSearchDataObject());
  }, 500);
};

const generateSalesIssueDocumentPopconfirmConfirm = async (
  record: OrderListRequestResultItemInterface
) => {
  await saleOutstockRequestFunction({
    osl_seq: record.osl_seq,
  });
  message.success('成功');
  setTimeout(() => {
    run(getSearchDataObject());
  }, 500);
};

const isExpandArrowBoolean = ref(false);
enum SORT_KEY_ENUM {
  order_time = 'createtime_sort',
  sub_total_amount = 'amount_sort',
}

watch(isExpandArrowBoolean, (newValue) => {
  if (newValue) {
    heightString.value = 'auto';
  } else {
    heightString.value = '220px';
  }
});
</script>
