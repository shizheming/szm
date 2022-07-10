<template>
  <a-form ref="formRef" :model="formModel" @finish="formFinish">
    <a-row :style="`height:${height};overflow:hidden`">
      <a-col :span="8">
        <a-form-item label="订单搜索" :label-col="{ span: 6 }">
          <a-input-group compact>
            <a-select
              style="width: 50%"
              :allow-clear="false"
              v-model:value="formModel.order_search_key"
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
              v-model:value="formModel.order_search_value"
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
              v-model:value="formModel.good_search_key"
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
              v-model:value="formModel.good_search_value"
            />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单状态" :label-col="{ span: 6 }">
          <a-select
            mode="multiple"
            :options="ORDER_STATUS_OPTIONS"
            v-model:value="formModel.sub_status_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付状态" :label-col="{ span: 6 }">
          <a-select
            mode="multiple"
            :options="PAY_STATUS_OPTIONS"
            v-model:value="formModel.pay_status_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="发货状态" :label-col="{ span: 6 }">
          <a-select
            mode="multiple"
            :options="DELIVERY_STATUS_OPTIONS"
            v-model:value="formModel.deliver_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="店铺名称" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.shop_name" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="供应商" :label-col="{ span: 6 }">
          <supplier-select v-model:value="formModel.supplier_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户等级" :label-col="{ span: 6 }">
          <a-select
            :options="USER_LEVEL_OPTIONS"
            v-model:value="formModel.user_level"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="后台类目" :label-col="{ span: 6 }">
          <background-category-cascader
            v-model:value="formModel.category_id"
            placeholder="请输入"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="商品品牌" :label-col="{ span: 6 }">
          <goods-brand-select
            v-model:value="formModel.brand_name_arr"
            mode="multiple"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户ID" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.user_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="录入方式" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.create_mode_arr"
            mode="multiple"
            :options="CREATE_MODE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="来源终端" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.app_platform"
            :options="APP_PLATFORM_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="销售渠道" :label-col="{ span: 6 }">
          <sale-mode-select v-model:value="formModel.sale_mode" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="配送方式" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.delivery_mode"
            :options="DELIVERY_MODE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付方式" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.pay_type"
            :options="PAY_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付类型" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.payment_type"
            :options="PAYMENT_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="发票" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.is_invoice"
            :options="IS_INVOICE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="本地服务" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.is_support_local"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单商品来源" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.goods_source"
            :options="GOODS_SOURCE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="分销订单" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.distribute_order"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="销售站点" :label-col="{ span: 6 }">
          <owner-site-select v-model:value="formModel.owner_site_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单创建" :label-col="{ span: 6 }">
          <a-range-picker show-time v-model:value="formModel.createTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="创建人ID" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.create_user_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单支付" :label-col="{ span: 6 }">
          <a-range-picker show-time v-model:value="formModel.paymentTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付流水号" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.trade_no" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="要求送货" :label-col="{ span: 6 }">
          <a-range-picker show-time v-model:value="formModel.deliveryTime" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="推荐人" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.recommend_staff" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="营销活动明细" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.marketing_type"
            :options="MARTING_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单类型" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.order_type"
            :options="ORDER_TYPE_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="售后" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.is_return"
            :options="YES_NO_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="运单号" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.package_no" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="买家备注" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.is_mem_msg"
            :options="YES_NO_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单销售组织" :label-col="{ span: 6 }">
          <sub-org-select v-model:value="formModel.sub_org_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="燃气用户" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.gas_account" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="业务模式" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.business_id"
            :options="BUSINESS_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="预订购" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.is_pre_subscribe"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单销售组织" :label-col="{ span: 6 }">
          <owner-site-select v-model:value="formModel.source_site_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="拼单状态" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.spell_order_status"
            :options="SPELL_ORDER_STATUS_OPTIONS"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="对接外部系统" :label-col="{ span: 6 }">
          <a-select
            v-model:value="formModel.is_out_supplier"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item :wrapper-col="{ offset: 6 }">
          <a-space style="font-size: 18px" size="large">
            <a-button html-type="submit"><search-outlined /></a-button>
            <clear-outlined @click="resetformClick" />
            <down-outlined @click="expandArrowClick" v-if="isExpandArrow" />
            <up-outlined @click="expandArrowClick" v-else />
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <a-row style="margin: 30px 0">
    <a-space size="large">
      <a-button @click="chooseButtonClick">批量编辑商家备注</a-button>
      <router-link to="/">人工下单</router-link>
      <router-link to="/">补开发票</router-link>
    </a-space>
  </a-row>
  <a-table
    rowKey="id"
    :row-selection="{ selectedRowKeys, onChange }"
    :dataSource="dataSource"
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
            @click="editButtonClick(record)"
          />
          <div v-else>
            <check-circle-outlined
              @click="okButtonClick(record)"
              style="
                font-size: 18px;
                margin: 0 10px;
                color: #40a9ff;
                cursor: pointer;
              "
            />
            <stop-outlined
              style="font-size: 18px; cursor: pointer"
              @click="cancelButtonClick(record)"
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
import { message } from "ant-design-vue";
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
import BackgroundCategoryCascader from "../../../components/select/backgroundCategory.vue";
import GoodsBrandSelect from "../../../components/select/goodsBrand.vue";
import SaleModeSelect from "../../../components/select/saleMode.vue";
import OwnerSiteSelect from "../../../components/select/ownerSite.vue";
import SubOrgSelect from "../../../components/select/subOrg.vue";

import {
  SmileOutlined,
  SearchOutlined,
  ClearOutlined,
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";

let asdf = {};

// 接口
interface formModel {
  order_search_key?: string;
  order_search_value?: string;
  good_search_key?: string;
  good_search_value?: string;
  sub_status_arr?: [];
  pay_status_arr?: [];
  deliver_arr?: [];
  shop_name?: string;
  supplier_id?: number;
  user_level?: number;
  category_id?: number;
  brand_name_arr?: [];
  user_id?: number;
  create_mode_arr?: [];
  app_platform?: string;
  sale_mode?: number;
  delivery_mode?: number;
  pay_type?: number;
  payment_type?: number;
  is_invoice?: number;
  is_support_local?: number;
  goods_source?: number;
  distribute_order?: number;
  owner_site_id?: number;
  createTime?: [];
  create_user_id?: number;
  paymentTime?: [];
  trade_no?: number;
  deliveryTime?: [];
  recommend_staff?: string;
  marketing_type?: number;
  order_type?: number;
  is_return?: number;
  package_no?: string;
  is_mem_msg?: number;
  sub_org_id?: number;
  gas_account?: string;
  business_id?: number;
  is_pre_subscribe?: number;
  source_site_id?: number;
  spell_order_status?: number;
  is_out_supplier?: number;
}

// 动态数据
const isExpandArrow = ref();
const formModel = reactive<formModel>({
  order_search_key: "osl_seq",
  good_search_key: "goods_name",
});
const formRef = ref();
const dataSource = ref();
const loading = ref();
const height = ref();
const pagination = reactive({});
const selectedRowKeys = ref([]);
const selectedRows = ref();
// 静态数据
const columns = [
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
  {
    title: "title",
    dataIndex: "is_listing",
    key: "is_listing",
  },
  {
    title: "title",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "title",
    dataIndex: "name3",
    key: "name3",
  },
  {
    title: "title",
    dataIndex: "name4",
    key: "name4",
  },
];

watch(isExpandArrow, (newValue) => {
  if (newValue) {
    height.value = "100px";
  } else {
    height.value = "auto";
  }
});

const onChange = (keys: [], rows: []) => {
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
};

const formFinish = async (values: any) => {
  console.log(formModel, 123);
  tableChange();
};

const expandArrowClick = () => {
  isExpandArrow.value = !isExpandArrow.value;
};

const resetformClick = () => {
  formRef.value.resetFields();
};

const tableChange = async (pag = { page: 1, page_size: 10 }) => {
  loading.value = true;
  let submitData = { ...formModel };
  if (submitData.time?.length) {
    submitData.start = submitData.time[0].valueOf() * 1000;
    submitData.end = submitData.time[1].valueOf() * 1000;
  }
  let { data } = await Promise.resolve({
    data: [{ id: 1, name1: 1234 }],
  });
  dataSource.value = data;
  pagination.total = data.total;
  pagination.page = data.page;
  pagination.pageSize = data.pageSize;
  loading.value = false;
};

const chooseButtonClick = async () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择");
    return;
  }
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};

const popconfirmConfirm = async () => {
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};

const switchChange = async () => {
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};

function editButtonClick(record: any) {
  record.editStockStatus = true;
}

function cancelButtonClick(record: any) {
  record.editStockStatus = false;
}

async function okButtonClick(record: any) {
  await Promise.resolve();
  record.editStockStatus = false;
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
}
// 初始化
tableChange();
</script>
