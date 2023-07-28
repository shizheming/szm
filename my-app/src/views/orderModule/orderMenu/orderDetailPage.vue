<template>
  <a-divider orientation="left">基本信息</a-divider>
  <a-descriptions>
    <a-descriptions-item label="订单编号">
      {{ detailDataObject.osl_seq }}
    </a-descriptions-item>
    <a-descriptions-item label="主单号">
      {{ detailDataObject.ono }}
    </a-descriptions-item>
    <a-descriptions-item label="外部订单号">
      {{ detailDataObject.out_ono
      }}{{
        detailDataObject.out_type_name
          ? `（${detailDataObject.out_type_name}）`
          : ''
      }}
    </a-descriptions-item>
    <a-descriptions-item label="订单状态">
      {{ detailDataObject.status_name }}
    </a-descriptions-item>
    <a-descriptions-item label="订单类型">
      {{ detailDataObject.order_type_name }}
    </a-descriptions-item>
    <a-descriptions-item label="支持本地服务">
      {{ detailDataObject.is_support_local_name }}
    </a-descriptions-item>
    <a-descriptions-item label="录入方式">
      {{ detailDataObject.create_mode_name }}
    </a-descriptions-item>
    <a-descriptions-item label="支付完成时间">
      {{ detailDataObject.pay_time_string }}
    </a-descriptions-item>
    <a-descriptions-item label="来源终端">
      {{ detailDataObject.app_platform_name }}
    </a-descriptions-item>
    <a-descriptions-item label="销售组织">
      {{ detailDataObject.sub_org_name }}
    </a-descriptions-item>
    <a-descriptions-item label="销售渠道">
      {{ detailDataObject.sale_mode_name }}
    </a-descriptions-item>
    <a-descriptions-item label="销售店铺">
      {{ detailDataObject.shop_name }}
    </a-descriptions-item>
    <a-descriptions-item label="系统订单创建时间">
      {{ detailDataObject.create_time_string }}
    </a-descriptions-item>
    <a-descriptions-item label="确认时间">
      {{ detailDataObject.confirm_time_string }}
    </a-descriptions-item>
    <a-descriptions-item label="用户id">
      {{ detailDataObject.user_id }}
    </a-descriptions-item>
    <a-descriptions-item label="推荐人">
      {{ detailDataObject.recommend_staff }}
    </a-descriptions-item>
    <a-descriptions-item label="关联手机">
      {{ detailDataObject.phone }}
    </a-descriptions-item>
    <a-descriptions-item label="供应商">
      {{ detailDataObject.supplier_name }}
    </a-descriptions-item>
    <a-descriptions-item label="发货仓库">
      {{ detailDataObject.store_name }}
    </a-descriptions-item>
    <a-descriptions-item label="是否有售后">
      {{ detailDataObject.is_return_name }}
    </a-descriptions-item>
    <a-descriptions-item label="用户来源站点">
      {{ detailDataObject.source_site_name }}
    </a-descriptions-item>
    <a-descriptions-item label="来源站点关联组织">
      {{ detailDataObject.source_org_name }}
    </a-descriptions-item>
    <a-descriptions-item label="预计发货时间">
      {{ detailDataObject.pre_delivery_time_string }}
    </a-descriptions-item>
    <a-descriptions-item label="订单发货时间">
      {{ detailDataObject.delivery_time_string }}
    </a-descriptions-item>
    <a-descriptions-item label="买家姓名">
      {{ detailDataObject.user_name }}
    </a-descriptions-item>
    <a-descriptions-item label="购买企业名称">
      {{ detailDataObject.buy_company_name }}
    </a-descriptions-item>
    <a-descriptions-item label="是否开发票">
      {{ detailDataObject.is_invoice_name }}
    </a-descriptions-item>
    <a-descriptions-item label="创建人">
      {{ detailDataObject.create_user_id }}
    </a-descriptions-item>
    <a-descriptions-item label="燃气户号">
      {{ detailDataObject.gas_account }}
    </a-descriptions-item>
    <a-descriptions-item label="要求送货时间">
      {{ detailDataObject.apply_delivery_time_string }}
    </a-descriptions-item>
    <a-descriptions-item label="业务类型">
      {{ detailDataObject.business_name }}
    </a-descriptions-item>
    <a-descriptions-item label="分销订单">
      {{ detailDataObject.distribute_order }}
    </a-descriptions-item>
    <a-descriptions-item label="用户等级">
      {{ detailDataObject.user_level_name }}
    </a-descriptions-item>
    <a-descriptions-item label="销售组织自营订单">
      {{ detailDataObject.type_name }}
    </a-descriptions-item>
    <a-descriptions-item label="微信昵称">
      {{ detailDataObject.wx_nickname }}
    </a-descriptions-item>
    <a-descriptions-item label="用户名">
      {{ detailDataObject.user_name }}
    </a-descriptions-item>
    <a-descriptions-item label="供货组织">
      {{ detailDataObject.distribute_org_name }}
    </a-descriptions-item>
    <a-descriptions-item label="供货组织来源平台企业id">
      {{ detailDataObject.distribute_org_enterprise_id }}
    </a-descriptions-item>
    <a-descriptions-item label="销售站点">
      {{ detailDataObject.owner_site_name }}
    </a-descriptions-item>
    <a-descriptions-item label="配送方式">
      {{ detailDataObject.delivery_mode_name }}
    </a-descriptions-item>
    <a-descriptions-item label="销售人员">
      {{ detailDataObject.shop_account_name }}
      <a-button type="text" size="small" @click="editOutlinedButtonClickFunction">
        <template #icon>
          <edit-outlined />
        </template>
      </a-button>
    </a-descriptions-item>
    <a-descriptions-item label="销售人员所属网点">
      {{ detailDataObject.salesman_node_name }}
    </a-descriptions-item>
    <a-descriptions-item label="预约信息">
      {{ detailDataObject.xxxx }}
    </a-descriptions-item>
    <a-descriptions-item label="销售站点">
      {{ detailDataObject.owner_site_name }}
    </a-descriptions-item>
  </a-descriptions>
  <sales-person-list-modal v-model:visible="salesPersonListModalVisibleBoolean" :shop-id="detailDataObject.shop_id"/>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { orderDetailRequestFunction } from './api';
import { defineAsyncComponent, ref } from 'vue';
import { OrderDetailResultInterface } from './interface';
import { WHETHER_ENUM } from '../../../data/dictionary';
import dayjs from 'dayjs';
import { handleTimeFunction } from '../../../utils/z';
import { EditOutlined } from '@ant-design/icons-vue';

const routeObject = useRoute();
const routerObject = useRouter();
const detailDataObject = ref<OrderDetailResultInterface>({});
const SalesPersonListModal = defineAsyncComponent(() => import('../../../components/modal/salesPersonListModal.vue'))
const salesPersonListModalVisibleBoolean = ref(false);
const editOutlinedButtonClickFunction = () => {
  salesPersonListModalVisibleBoolean.value = true;
}

orderDetailRequestFunction({
  osl_seq: routeObject.query.osl_seq as string,
  user_id: routeObject.query.user_id as string,
  show_sublistExt: 1,
}).then(({ data }) => {
  data.is_support_local_name = WHETHER_ENUM[data.is_support_local];
  data.is_return_name = WHETHER_ENUM[data.is_return];
  data.is_invoice_name = WHETHER_ENUM[data.is_invoice];

  data.pay_time_string = handleTimeFunction(data.pay_time);
  data.create_time_string = handleTimeFunction(data.create_time);
  data.confirm_time_string = handleTimeFunction(data.confirm_time);
  data.pre_delivery_time_string = handleTimeFunction(data.pre_delivery_time);
  data.delivery_time_string = handleTimeFunction(data.delivery_time);
  data.apply_delivery_time_string = handleTimeFunction(
    data.apply_delivery_time
  ).split(' ')[0];

  detailDataObject.value = data;
});
</script>

<style></style>
