<template>
  <a-form
    ref="formRef"
    :model="formModelObject"
    :label-col="{ span: 8 }"
    @finish="formFinishFunction"
  >
    <a-row>
      <a-col :span="8">
        <a-typography-title :level="4">基本信息</a-typography-title>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="录入方式" :name="['entryMode']">
          {{ formModelObject.entryMode }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="销售渠道" :name="['sale_mode']">
          {{ formModelObject.sale_mode }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="外部订单号" :name="['out_ono']">
          <a-input v-model:value="formModelObject.out_ono" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="站点/业务类型" :name="['businessType']">
          {{ formModelObject.businessType }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="用户ID"
          :name="['user_id']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-space>
            <span>{{ formModelObject.user_id }}</span>
            <plus-outlined @click="plusOutlinedClickFunction" />
          </a-space>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="关联手机号" :name="['phone']">
          {{ formModelObject.phone }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="微信昵称" :name="['wx_nickname']">
          {{ formModelObject.wx_nickname }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户等级" :name="['user_level_name']">
          {{ formModelObject.user_level_name }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户名" :name="['username']">
          {{ formModelObject.username }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="买家姓名" :name="['name']">
          {{ formModelObject.name }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="企业名称" :name="['company_name']">
          {{ formModelObject.company_name }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货人姓名"
          :name="['addressInfo', 'name']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="formModelObject.addressInfo.name" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货人手机"
          :name="['addressInfo', 'mobile']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="formModelObject.addressInfo.mobile" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="收货地址"
          :name="['addressInfo', 'addressIds']"
          :rules="{
            required: true,
            validator: formItemRulesValidatorFunction,
          }"
        >
          <address-cascader
            v-model:value="formModelObject.addressInfo.addressIds"
            v-model:options="addressCascaderOptionsArray"
            :watch="[
              () => formModelObject.addressInfo.addressIds,
              addressCascaderWatchFunction,
            ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="详细地址"
          :name="['addressInfo', 'address']"
          :rules="{
            required: true,
            message: '请填写',
          }"
        >
          <a-input v-model:value="formModelObject.addressInfo.address" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="收货人电话" :name="['addressInfo', 'tel']">
          <a-input v-model:value="formModelObject.addressInfo.tel" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="邮编" :name="['addressInfo', 'zipcode']">
          <a-input v-model:value="formModelObject.addressInfo!.zipcode" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="买家备注" :name="['buyer_note']">
          <a-textarea v-model:value="formModelObject.buyer_note" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="商家备注" :name="['merchant_note']">
          <a-textarea v-model:value="formModelObject.merchant_note" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-typography-title :level="4">发运计划</a-typography-title>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="库存冻结" :name="['stockFreeze']">
          {{ formModelObject.stockFreeze }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="配送方式" :name="['delivery_mode']">
          <a-radio-group
            v-model:value="formModelObject.delivery_mode"
            :options="DELIVERY_METHOD_OPTIONS"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-typography-title :level="4">开票申请</a-typography-title>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item
          label="开具发票"
          :name="['isInvoice']"
          :rules="{
            required: true,
            message: '请选择',
          }"
        >
          <a-radio-group
            v-model:value="formModelObject.isInvoice"
            :options="WHETHER_OPTIONS"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <div v-if="formModelObject.isInvoice">
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="增值税发票类型"
            :name="['order_invoice', 'invoice_form']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group
              v-model:value="formModelObject.order_invoice.invoice_form"
              :options="VAT_INVOICE_TYPE_OPTIONS"
            >
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="发票抬头类型"
            :name="['order_invoice', 'invoice_kind']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group
              v-model:value="formModelObject.order_invoice.invoice_kind"
              :watch="[
                () => formModelObject.order_invoice.invoice_form,
                radioGroupWatchFunction,
              ]"
            >
              <a-radio :value="2">企业</a-radio>
              <a-radio :value="1" :disabled="manRadioDisabledBoolean"
                >个人</a-radio
              >
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item
            label="发票内容"
            :name="['order_invoice', 'content_type']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <a-radio-group
              v-model:value="formModelObject.order_invoice.content_type"
              :options="INVOICE_CONTENT_OPTIONS"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="开票备注"
            :name="['order_invoice', 'invoice_notice']"
          >
            <a-textarea
              v-model:value="formModelObject.order_invoice.invoice_notice"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="发票抬头"
            :name="['order_invoice', 'invoice_title']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.invoice_title"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonElectronEnterpriseBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="税号"
            :name="['order_invoice', 'vat_number']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input v-model:value="formModelObject.order_invoice.vat_number" />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonElectronEnterpriseBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="注册地址"
            :name="['order_invoice', 'et_address']"
            :rules="{
              required: specialPaperEnterpriseBoolean,
              message: '请填写',
            }"
          >
            <a-input v-model:value="formModelObject.order_invoice.et_address" />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonElectronEnterpriseBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="注册电话"
            :name="['order_invoice', 'et_phone_num']"
            :rules="{
              required: specialPaperEnterpriseBoolean,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.et_phone_num"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonElectronEnterpriseBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="开户银行"
            :name="['order_invoice', 'et_bank_name']"
            :rules="{
              required: specialPaperEnterpriseBoolean,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.et_bank_name"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonElectronEnterpriseBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="银行账号"
            :name="['order_invoice', 'et_bank_account']"
            :rules="{
              required: specialPaperEnterpriseBoolean,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.et_bank_account"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonPaperPersonalBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="收票人姓名"
            :name="['order_invoice', 'invoice_username']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.invoice_username"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="收票人手机"
            :name="['order_invoice', 'invoice_phone_num']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.invoice_phone_num"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonElectronPersonalBoolean || commonElectronEnterpriseBoolean
          "
        >
          <a-form-item
            label="收票人邮箱"
            :name="['order_invoice', 'invoice_email']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.invoice_email"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonPaperPersonalBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="收票人地址"
            :name="['order_invoice', 'mArea']"
            :rules="{
              required: true,
              message: '请选择',
            }"
          >
            <address-cascader
              v-model:value="formModelObject.order_invoice.mArea"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          v-if="
            commonPaperPersonalBoolean ||
            commonPaperEnterpriseBoolean ||
            specialPaperEnterpriseBoolean
          "
        >
          <a-form-item
            label="收票详细地址"
            :name="['order_invoice', 'invoice_address']"
            :rules="{
              required: true,
              message: '请填写',
            }"
          >
            <a-input
              v-model:value="formModelObject.order_invoice.invoice_address"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <a-row>
      <a-col :span="8">
        <a-typography-title :level="4">支付和结算</a-typography-title>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="支付类型" :name="['pay_mode']">
          {{ formModelObject.pay_mode_name }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-typography-title :level="4">商品信息</a-typography-title>
      </a-col>
    </a-row>
    <a-space>
      <a-button html-type="submit">
        <plus-outlined />
      </a-button>
      <delete-outlined @click="deleteOutlinedClickFunction" />
    </a-space>
    <a-table
      :row-key="tableRowKey"
      :columns="orderFormPageGoodsTableColumns"
      :data-source="formModelObject.tableDataSourceArray"
      :pagination="false"
      :scroll="{ x: 3000 }"
      style="margin: 15px 0"
      :row-selection="{
        selectedRowKeys: tableRowSelectionSelectedRowKeysArray,
        onChange: tableRowSelectionOnChangeFunction,
      }"
    >
      <template
        #bodyCell="{
          column,
          record,
          index,
        }: {
          column: TableColumnType,
          record: GoodItemInterface,
          index: number,
        }"
      >
        <template v-if="column.key === 'opration'">
          <delete-outlined @click="tableDeleteOutlinedClickFunction(index)" />
        </template>
        <template v-if="column.key === 'member_price_name'">
          {{ record.member_price_name }}
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
        </template>
        <template v-if="column.key === 'category_path'">
          <background-category-cascader
            :is-detail="true"
            :value="record.category_path.map(Number)"
            style="width: 100%"
          />
        </template>
        <template v-if="column.key === 'qty'">
          <a-input-number
            v-model:value="record.qty"
            :max="record.real_qty"
            :min="record.min_qty"
            @change="inputNumberChange(record)"
          />
        </template>
        <template v-if="column.key === 'current_selling_price'">
          <a-input-number
            v-model:value="record.current_selling_price"
            :max="record.shop_selling_price"
            :min="0"
            @change="inputNumberChange(record)"
          />
        </template>
        <template v-if="column.key === 'imgSrc'">
          <a-image :src="record.imgSrc" :width="50" />
        </template>
      </template>
    </a-table>
    <a-row>
      <a-col :span="8">
        <a-typography-title :level="4">订单合计</a-typography-title>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="商品数量合计" :name="['qty']">
          {{ formModelObject.qty }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="商品金额合计" :name="['total_price']">
          {{ formModelObject.total_price }}
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="运费" :name="['freight']">
          <a-input-number
            v-model:value="formModelObject.freight"
            @change="setPriceFunction"
          >
            <template #addonAfter>元</template>
          </a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单金额合计" :name="['validator', 'total_pay']">
          {{ formModelObject.validator.total_pay }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item :wrapper-col="{ offset: 8 }">
          <a-button type="primary" html-type="submit">
            <save-outlined />
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <user-list-modal
    v-model:visible="userListModalVisibleBoolean"
    @select="userListModalSelectFunction"
  />
  <goods-list-modal
    v-model:visible="goodsListModalVisibleBoolean"
    :model="formModelObject"
    @select="goodsListModalSelectFunction"
  />
</template>

<script setup lang="ts">
import {
  reactive,
  defineAsyncComponent,
  ref,
  watch,
  watchEffect,
  computed,
  createVNode,
  ComputedRef,
} from 'vue';
import {
  FormInstance,
  InputProps,
  TableProps,
  TableColumnType,
  Modal,
  TableColumnsType,
  CascaderProps,
} from 'ant-design-vue';
import { AddParamsInterface } from './interface';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue';
import AddressCascader from '../../../components/cascader/addressCascader.vue';
import {
  WHETHER_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
  GOODS_FORM_ENUM,
  VAT_INVOICE_TYPE_OPTIONS,
  INVOICE_CONTENT_OPTIONS,
} from '../../../data/dictionary';
import { orderFormPageGoodsTableColumns } from './data';
import {
  UserRequestResultInterface,
  SkuRequestResultInterface,
} from '../../../api/interface';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import BackgroundCategoryCascader from '../../../components/cascader/backgroundCategoryCascader.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { cloneDeep, debounce, forEach, multiply, subtract } from 'lodash';
import { api_upload_getUrl, confirmRequestFunction } from './api';
import { SelectProps } from 'ant-design-vue/lib/vc-select';

type GoodItemInterface = SkuRequestResultInterface & {
  purchaseAmount: ComputedRef<number>;
};

const UserListModal = defineAsyncComponent(
  () => import('../../../components/modal/userListModal.vue')
);
const GoodsListModal = defineAsyncComponent(
  () => import('../../../components/modal/goodsListModal.vue')
);
const userListModalVisibleBoolean = ref(false);
const goodsListModalVisibleBoolean = ref(false);
const manRadioDisabledBoolean = ref(false);

let addressNameArray: string[] = [];
const formRef = ref<FormInstance>();
const tableRowSelectionSelectedRowKeysArray = ref<
  TableRowSelection['selectedRowKeys']
>([]);
const selectedRowsArray = ref<GoodItemInterface[]>([]);

const goodsListModalLadderPriceTableColumns: TableColumnsType = [
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

const modelObejct: AddParamsInterface = {
  site_id: 1,
  api_type: 3,
  entryMode: '手工创建订单',
  sale_mode: '名气商城',
  businessType: '名气家/精选',
  stockFreeze: '提交订单',
  pay_mode_name: '货到付款',
  delivery_mode: 1,
  isInvoice: 0,
  shop_goods_list: [],
  addressInfo: {
    addressIds: [],
  },
  order_invoice: {
    mArea: [],
    invoice_form: 3,
    invoice_kind: 2,
    apply_scene: 1,
  },
  pay_mode: 0,
  tableDataSourceArray: [],
  validator: {},
};
const addressCascaderOptionsArray = ref<CascaderProps['options']>([]);
const formModelObject = reactive(cloneDeep(modelObejct));
const commonPaperPersonalBoolean = computed(() => {
  return (
    formModelObject.order_invoice.invoice_kind == 1 &&
    formModelObject.order_invoice.invoice_form == 1
  );
});
const commonPaperEnterpriseBoolean = computed(() => {
  return (
    formModelObject.order_invoice.invoice_kind == 2 &&
    formModelObject.order_invoice.invoice_form == 1
  );
});
const commonElectronPersonalBoolean = computed(() => {
  return (
    formModelObject.order_invoice.invoice_kind == 1 &&
    formModelObject.order_invoice.invoice_form == 3
  );
});
const commonElectronEnterpriseBoolean = computed(() => {
  return (
    formModelObject.order_invoice.invoice_kind == 2 &&
    formModelObject.order_invoice.invoice_form == 3
  );
});
const specialPaperEnterpriseBoolean = computed(() => {
  return (
    formModelObject.order_invoice.invoice_kind == 2 &&
    formModelObject.order_invoice.invoice_form == 2
  );
});

const plusOutlinedClickFunction = () => {
  userListModalVisibleBoolean.value = true;
};

const formFinishFunction: FormInstance['onFinish'] = (values) => {
  goodsListModalVisibleBoolean.value = true;
};

const radioGroupWatchFunction = () => {
  if (
    formModelObject.order_invoice.invoice_form == 1 ||
    formModelObject.order_invoice.invoice_form == 3
  ) {
    manRadioDisabledBoolean.value = false;
  } else {
    manRadioDisabledBoolean.value = true;
    formModelObject.order_invoice!.invoice_kind = 2;
  }
};

const addressCascaderWatchFunction = () => {
  addressNameArray = [];
  let addressLevel = addressCascaderOptionsArray.value;
  formModelObject.addressInfo.addressIds.forEach((item) => {
    addressLevel.forEach((current) => {
      if (current.value === item) {
        addressNameArray.push(current.label);
        addressLevel = current.children;
      }
    });
  });
};

const formItemRulesValidatorFunction = async (_rule: Rule, value: number[]) => {
  if (!value) {
    return Promise.reject('请选择');
  } else if (value.length < 3) {
    return Promise.reject('请选择省市区');
  } else {
    return Promise.resolve();
  }
};

const tableRowSelectionOnChangeFunction: TableRowSelection['onChange'] = (
  keys,
  rows
) => {
  tableRowSelectionSelectedRowKeysArray.value = keys;
  selectedRowsArray.value = rows;
};

const userListModalSelectFunction: (
  rowKeys: TableRowSelection['selectedRowKeys'],
  rows: UserRequestResultInterface[]
) => void = (
  rowKeys,
  [
    {
      user_id,
      phone,
      wx_nickname,
      name,
      user_level_name,
      username,
      company_name,
      third_user_id,
    },
  ]
) => {
  Object.assign(formModelObject, {
    user_id,
    third_user_id,
    phone,
    wx_nickname,
    user_level_name,
    username,
    name,
    company_name,
  });
  formRef.value!.validate(['user_id']);
  if (formModelObject.tableDataSourceArray.length > 0) {
    setPriceFunction();
  }
};

const deleteOutlinedClickFunction = () => {
  if (tableRowSelectionSelectedRowKeysArray.value.length) {
    formModelObject.tableDataSourceArray =
      formModelObject.tableDataSourceArray.filter(({ sku_id, spu_id }) => {
        return !tableRowSelectionSelectedRowKeysArray.value.includes(
          `${spu_id}/${sku_id}`
        );
      });
    tableRowSelectionSelectedRowKeysArray.value = [];
  }
};

const tableDeleteOutlinedClickFunction = (index: number) => {
  formModelObject.tableDataSourceArray.splice(index, 1);
};

const goodsListModalSelectFunction = async (rows: GoodItemInterface[]) => {
  formModelObject.tableDataSourceArray =
    formModelObject.tableDataSourceArray.concat(
      rows.map((item, index) => {
        item.purchaseAmount = computed(() => {
          return multiply(item.current_selling_price, item.qty);
        });
        const shop_selling_price = item.shop_selling_price;
        item.shop_selling_price = computed(() => {
          // 需要判断下是否是阶梯价，阶梯价的单价会随着数量而变化
          if (item.member_price.length > 0) {
            let [{ member_price }] = item.member_price.filter(
              ({ start_num, end_num }) => {
                return (
                  item.qty >= start_num && (end_num ? item.qty < end_num : true)
                );
              }
            );
            return member_price;
          } else {
            return shop_selling_price;
          }
        });
        item.adjust_mount = computed(() => {
          // 需要判断下是否是阶梯价，阶梯价的单价会随着数量而变化
          if (item.member_price.length > 0) {
            let [{ member_price }] = item.member_price.filter(
              ({ start_num, end_num }) => {
                return (
                  item.qty >= start_num && (end_num ? item.qty < end_num : true)
                );
              }
            );
            return multiply(
              subtract(member_price, item.current_selling_price),
              item.qty
            );
          } else {
            return multiply(
              subtract(item.shop_selling_price, item.current_selling_price),
              item.qty
            );
          }
        });

        item.min_qty = item.real_qty && 1;
        item.qty = item.min_qty;
        item.current_selling_price = item.shop_selling_price;
        item.sku_type_name = '实物';
        item.is_suit =
          item.is_suit === 'b'
            ? ''
            : GOODS_FORM_ENUM[item.is_suit as number] || '普通';
        if (item.gallery.length) {
          const [{ key, upload_channel, bucket }] = item.gallery;
          api_upload_getUrl({
            key,
            upload_channel,
            bucket,
          }).then(({ data }) => {
            item.imgSrc = data;
          });
        }
        return item;
      })
    );
};

const goodsItemCalculatedFunction = (record: GoodItemInterface) => {
  // 需要判断下是否是阶梯价，阶梯价的单价会随着数量而变化
  if (record.member_price.length > 0) {
    let [{ member_price }] = record.member_price.filter(
      ({ start_num, end_num }) => {
        return (
          record.qty >= start_num && (end_num ? record.qty < end_num : true)
        );
      }
    );
    record.shop_selling_price = member_price;
    record.adjust_mount = multiply(
      subtract(member_price, record.current_selling_price),
      record.qty
    );
  } else {
    record.adjust_mount = multiply(
      subtract(record.shop_selling_price, record.current_selling_price),
      record.qty
    );
  }
};

const handleSubmitDataFunction = (formModelObject: AddParamsInterface) => {
  const value = cloneDeep(formModelObject);
  [
    value.addressInfo.province_id,
    value.addressInfo.city_id,
    value.addressInfo.district_id,
    value.addressInfo.street_id,
  ] = value.addressInfo.addressIds;
  [
    value.addressInfo.province_name,
    value.addressInfo.city_name,
    value.addressInfo.district_name,
    value.addressInfo.street_name,
  ] = addressNameArray;
  value.shop_goods_list = value.tableDataSourceArray.map(
    ({ qty, adjust_mount, shop_goods_id }) => {
      return {
        qty,
        shop_goods_id,
        adjust_mount: multiply(adjust_mount, 100),
      };
    }
  );
  value.freight = multiply(value.freight, 100);
  value.validator.total_pay = multiply(
    formModelObject.validator.total_pay,
    100
  );
  if (value.isInvoice) {
    if (value.order_invoice.mArea) {
      [
        value.order_invoice.province_id,
        value.order_invoice.city_id,
        value.order_invoice.district_id,
        value.order_invoice.street_id,
      ] = value.order_invoice.mArea;
    }
    // 去掉了开票形式，所以要改动一下数据，后端逻辑
    if (value.order_invoice.invoice_form != 2) {
      value.order_invoice.invoice_type = 1;
      if (value.order_invoice.invoice_form == 3) {
        value.order_invoice.invoice_form = 2;
      }
    } else {
      value.order_invoice.invoice_type = 2;
      value.order_invoice.invoice_form = 1;
    }
  } else {
    delete value.order_invoice;
  }
  return value;
};

const inputNumberChange = async (record: GoodItemInterface) => {
  setPriceFunction();
};

// 从实体的出发
// 实体的change是自己触发的，然后干一些事情，是一对一或是一对多，可以对实体自己做一些事情，也可以是对别的实体做一些事情，对别的实体是一种命令式的下发的写法，
// 现在一般是跟自己有关的用change，如果是多个实体的change干的是同一件事情，那我可以用监听，监听多个值，这个多个值就代表监听的实体，去触发干的那同一件事情，这是一种change的变体，这里的watch从概念上来看就不能当watch来看的，而是还是一种change，只是写法不同而已，因为从逻辑上来讲这里的watch没有主语，谁监听，没有，所以概念上还是change

// 谁在watch，是页面，没有当前input，select组件之类的watch，没有独立的watch，只有页面级别的watch
// 事实是这样，没有所谓的组件watch主语，但是我从逻辑上可以给他一个watch主语，没毛病的，我可以这样理解
// 实体的watch是别人触发的，然后干一些事情，是一对一或是一对多，一对多其实就是change概念了，多是多个其他实体的事情，可以对实体自己做一些事情，也可以是对别的实体做一些事情，监听别人，然后对别人干一些事情，watch主语的概念就变了，就已经是change的概念了，所以要首先明确watch的主语，有了实体主语后才知道是watch好点还是change好点
// watch里面只有自己的事情，才能在概念上叫实体的watch，如果干了别人的事情，那概念上就是别人的change了，跟当前实体就已经没有关系了

// 这个watch概念上就是table的chang事件，这是是概念上的宏观change，不是table组件的change事件
watch(
  () => formModelObject.tableDataSourceArray,
  async (newValue) => {
    if (newValue.length === 0) {
      formModelObject.freight = undefined;
      formModelObject.qty = undefined;
      formModelObject.total_price = undefined;
      formModelObject.validator.total_pay = undefined;
    } else {
      newValue.forEach((item, index) => {
        item.number = index + 1;
      });
      setPriceFunction();
    }
  }
);

const setPriceFunction = debounce(async () => {
  let { data } = await confirmRequestFunction(
    handleSubmitDataFunction(formModelObject)
  );
  formModelObject.freight = data.total_freight / 100;
  formModelObject.qty = data.qty;
  formModelObject.total_price = data.total_price / 100;
  formModelObject.validator.total_pay = data.total_real_price / 100;
}, 500);

const tableRowKey = ({ sku_id, spu_id }: GoodItemInterface) => {
  return `${spu_id}/${sku_id}`;
};
</script>
