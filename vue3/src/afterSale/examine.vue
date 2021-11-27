<template>
  <s-form
    :model="formData"
    :label-col="{ span: 7 }"
    :isEdit="true"
    :wrapper-col="{ span: 7 }"
    :outer-model="outerFormState"
    @set-form="setForm"
    :api="api"
    ref="form"
  >
    <a-form-item label="审核结果">
      <a-radio-group v-model:checked="formData.examineReault">
        <a-radio :value="2">退回商品</a-radio>
        <a-radio :value="1">不退货仅退款</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="寄回方式">
      <s-input
        name="returnMethod"
        initialValue="快递寄回"
        v-model:value="formData.returnMethod"
      />
    </a-form-item>
    <a-form-item
      label="是否退回至供应商"
      :rules="{
        required: true,
        message: '请选择是否退回至供应商',
      }"
      :name="['goodMoney', 'isReturnSupplier']"
    >
      <s-radio-group
        name="goodMoney.isReturnSupplier"
        v-model:value="formData.goodMoney.isReturnSupplier"
        :initialValue="0"
        :inner="isReturnSupplierInner"
      >
        <a-radio :value="0">否</a-radio>
        <a-radio :value="1">是</a-radio>
      </s-radio-group>
    </a-form-item>
    <a-form-item
      label="退回供应商"
      :rules="{
        required: true,
        message: '请选择退回供应商',
      }"
      :name="['goodMoney', 'supplier_id']"
      v-if="formData.goodMoney.isReturnSupplier"
    >
      <s-select
        v-model:value="formData.goodMoney.supplier_id"
        name="supplier_id"
        :inner="supplierIdInner"
      />
    </a-form-item>
    <a-form-item
      label="退回地址类型"
      :rules="{
        required: true,
        message: '请选择退回地址类型',
      }"
      :name="['goodMoney', 'con_type']"
    >
      <s-radio-group
        v-model:value="formData.goodMoney.con_type"
        :initialValue="2"
        name="goodMoney.con_type"
      >
        <s-radio :value="2">手动填写</s-radio>
        <s-radio :value="3">{{
          formData.goodMoney.isReturnSupplier === 1
            ? "按供应商地址列表"
            : "非供应商地址列表"
        }}</s-radio>
      </s-radio-group>
    </a-form-item>
    <a-form-item
      label="选择收货地址"
      :rules="{
        required: true,
        message: '请选择收货地址',
      }"
      name="allAddr"
      v-if="formData.goodMoney.con_type === 3"
    >
      <s-select
        name="allAddr"
        v-model:value="formData.allAddr"
        :inner="allAddrInner"
        :clear="true"
        :triggerclear="[formData.goodMoney.supplier_id, 'value', 'options']"
        :trigger-options="[
          formData.goodMoney.supplier_id,
          formData.goodMoney.isReturnSupplier,
        ]"
        triggeraction-options="inner"
      />
    </a-form-item>
    <a-form-item
      label="收货地址"
      :rules="{
        required: true,
        message: '收货地址',
      }"
      name="mArea"
    >
      <s-input
        name="mArea"
        v-model:value="formData.mArea"
        :triggerclear="[formData.allAddr, 'value']"
        :trigger="formData.allAddr"
        :triggeraction="mAreaTrigger"
      />
    </a-form-item>
    <a-form-item
      label="详细地址"
      :rules="{
        required: true,
        message: '详细地址',
      }"
      :name="['goodMoney', 'address']"
    >
      <s-input
        name="goodMoney.address"
        v-model:value="formData.goodMoney.address"
        :triggerclear="[formData.allAddr, 'value']"
        :trigger="formData.allAddr"
        :triggeraction="addressTrigger"
      />
    </a-form-item>
    <a-form-item
      label="商家收件人"
      :rules="{
        required: true,
        message: '商家收件人',
      }"
      :name="['goodMoney', 'name']"
    >
      <s-input
        name="goodMoney.name"
        v-model:value="formData.goodMoney.name"
        :triggerclear="[formData.allAddr, 'value']"
        :trigger="formData.allAddr"
        :triggeraction="nameTrigger"
      />
    </a-form-item>
    <a-form-item
      label="联系手机/座机"
      :rules="{
        required: true,
        message: '联系手机/座机',
      }"
      :name="['goodMoney', 'mobile']"
    >
      <s-input
        name="goodMoney.mobile"
        v-model:value="formData.goodMoney.mobile"
        :triggerclear="[formData.allAddr, 'value']"
        :trigger="formData.allAddr"
        :triggeraction="mobileTrigger"
      />
    </a-form-item>
    <a-form-item
      label="审核备注"
      :rules="{
        required: true,
        message: '审核备注',
      }"
      name="verify_remark"
    >
      <s-textarea name="verify_remark" v-model:value="formData.verify_remark" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 7 }">
      <s-button :loading="loading" @click="examine">审核</s-button>
    </a-form-item>
  </s-form>
</template>

<script setup>
import VueCookies from "vue-cookies";
import axios from "axios";
import { ref, toRefs, reactive, onMounted } from "vue";
const form = ref();
const formData = reactive({
  goodMoney: {},
});
const outerFormState = reactive({});
let loading = ref();
let formRender;
function setForm(fr) {
  formRender = fr;
}

async function api() {
  let {
    data: { data },
  } = await axios.get("/api/order/return/main/RO21082354785000016068", {
    headers: {
      Authorization: VueCookies.get("token"),
    },
  });
  return data;
}

function supplierIdInner(select, detail) {
  if (detail) {
    let {
      basic_info: { supplier_id, supplier_name },
    } = detail;
    select.options = [
      {
        label: supplier_name,
        value: supplier_id,
      },
    ];
    formData.goodMoney.supplier_id = supplier_id;
  }
}

function isReturnSupplierInner(radio, detail) {
  if (detail && detail.suppliers_info.length) {
    formData.goodMoney.isReturnSupplier = 1;
  }
}

function allAddrInner(select) {
  select.options = async function () {
    if (formData.goodMoney.isReturnSupplier === 0) {
      let {
        data: {
          data: { list },
        },
      } = await axios.get("/api/sys/org/return/consignees", {
        params: {
          page: 1,
          page_size: 9999,
          org_id: localStorage.userInfo.org_id,
        },
        headers: {
          Authorization: VueCookies.get("token"),
        },
      });
      return list.map((d, index) => {
        let { name: label } = d;
        return {
          ...d,
          label,
          value: index,
        };
      });
    } else if (formData.goodMoney.isReturnSupplier === 1) {
      if (formData.goodMoney.supplier_id) {
        let {
          data: { data },
        } = await axios.get("/api/order/return/stock/address", {
          params: {
            type: formData.goodMoney.con_type,
            supplier_id: formData.goodMoney.supplier_id,
          },
          headers: {
            Authorization: VueCookies.get("token"),
          },
        });
        return data.map((d, index) => {
          let { detailAddress } = d;
          return {
            ...d,
            label: detailAddress,
            value: index,
          };
        });
      }
    }
  };
}

function mAreaTrigger(input, d, detail) {
  let { allAddr: { optionsDetail } } = d
  if (formData.allAddr !== undefined) {
    if (formData.goodMoney.isReturnSupplier === 0) {
      formData.mArea = optionsDetail[formData.allAddr].address;
    } else if (formData.goodMoney.isReturnSupplier === 1) {
      formData.mArea = optionsDetail[formData.allAddr].detailAddress;
    }
  }
}

function addressTrigger(input, { allAddr: { optionsDetail } }) {
  if (formData.allAddr !== undefined) {
    if (formData.goodMoney.isReturnSupplier === 0) {
      formData.goodMoney.address = optionsDetail[formData.allAddr].address;
    } else if (formData.goodMoney.isReturnSupplier === 1) {
      formData.goodMoney.address = optionsDetail[formData.allAddr].detailAddress;
    }
  }
}

function nameTrigger(input, { allAddr: { optionsDetail } }) {
  if (formData.allAddr !== undefined)
    formData.goodMoney.name = optionsDetail[formData.allAddr].name;
}

function mobileTrigger(input, { allAddr: { optionsDetail } }) {
  if (formData.allAddr !== undefined)
    formData.goodMoney.mobile = optionsDetail[formData.allAddr].mobile;
}

// 审核
function examine() {
  formRender.value
    .validate()
    .then(() => {
      console.log("values", formData);
      console.log("最后的值", outerFormState);
    })
    .catch((error) => {
      console.log("error", formData);
    });
}
</script>

<style></style>
