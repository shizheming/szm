<template>
  <s-form
    :model="formData"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 7 }"
    :isEdit="true"
    :api="api"
    ref="formSection"
  >
    <s-form-item label="审核结果">
      <s-radio-group
        v-model:value="formData.examineReault"
        :inner="examineReaultInner"
      >
        <s-radio
          :value="2"
          v-if="
            formSection?.detail?.apply_info?.return_type?.code !== 1 &&
            verifyType?.includes('2')
          "
          >退回商品</s-radio
        >
        <s-radio
          :value="1"
          v-if="
            formSection?.detail?.apply_info?.return_type?.code === 1 ||
            (formSection?.detail?.apply_info?.return_type?.code !== 1 &&
              verifyType?.includes('5'))
          "
          >不退货仅退款</s-radio
        >
      </s-radio-group>
    </s-form-item>
    <div v-if="formData.examineReault === 2">
      <s-form-item label="寄回方式">
        <s-input
          name="returnMethod"
          initialValue="快递寄回"
          v-model:value="formData.returnMethod"
        />
      </s-form-item>
      <s-form-item
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
      </s-form-item>
      <s-form-item
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
          :initialValue="formSection?.detail?.basic_info?.supplier_id"
          @change="supplierIdChange"
        >
          <s-select-option :value="formSection?.detail?.basic_info?.supplier_id">{{
            formSection?.detail?.basic_info?.supplier_name
          }}</s-select-option>
        </s-select>
      </s-form-item>
      <s-form-item
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
      </s-form-item>
      <s-form-item
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
      </s-form-item>
      <s-form-item
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
      </s-form-item>
      <s-form-item
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
      </s-form-item>
      <s-form-item
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
      </s-form-item>
      <s-form-item
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
          :outer="mobileOuter"
        />
      </s-form-item>
    </div>
    <s-form-item
      label="审核备注"
      :rules="{
        required: true,
        message: '审核备注',
      }"
      name="verify_remark"
    >
      <s-textarea name="verify_remark" v-model:value="formData.verify_remark" />
    </s-form-item>
    <s-form-item :wrapper-col="{ offset: 7 }">
      <s-button :loading="loading" @click="examine">审核</s-button>
    </s-form-item>
  </s-form>
</template>

<script setup>
import { Modal } from "ant-design-vue";
import axios from "../api";
import { ref, toRefs, reactive, onMounted } from "vue";
const formSection = ref();
const formData = reactive({
  goodMoney: {},
});
let loading = ref();

async function api() {
  let {
    data: { data },
  } = await axios.get("/api/order/return/main/RO21082354785000016068");
  return data;
}

let verifyType = ref();
async function examineReaultInner(radio, detail) {
  if (detail) {
    let {
      data: { data },
    } = await axios.post(
      "/api/proxy/order/returnOrder/query/getReturnOrderVerifyType",
      {
        ro_seq: detail.basic_info.ro_seq,
      }
    );
    verifyType.value = data;

    // 设置值
    if (detail.apply_info.return_type.code == 2 && data.includes("2")) {
      formData.examineReault = 2;
    } else if (
      detail.apply_info.return_type.code == 1 ||
      (detail.apply_info.return_type.code == 5 && data.includes("5"))
    ) {
      formData.examineReault = 1;
    }
  }
}

function isReturnSupplierInner(radio, detail) {
  if (detail && detail.suppliers_info.length) {
    formData.goodMoney.isReturnSupplier = 1;
  }
}

// 后端单独要的值
let supplier_code;
async function supplierIdChange(v, components, { suppliers_info }) {
  if (v !== undefined) {
    // 检查供应商是否停用
    let {
      data: { data },
    } = await axios.get(`/api/stock/supplier/${v}`, {
      params: {
        is_return_order: 1,
      },
    });
    if (data.status === 0) {
      Modal.info({
        title: "提示",
        content: "该供应商已经停用",
      });
      let sc = suppliers_info.filter((current) => {
        return current.id == supplier_id;
      });

      supplier_code = sc[0] ? sc[0].code : undefined;
    }
  } else {
    supplier_code = undefined;
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
  console.log(d,309)
  let {
    allAddr: { optionsDetail },
  } = d;
  
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
      formData.goodMoney.address =
        optionsDetail[formData.allAddr].detailAddress;
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

function mobileOuter(v){
  return v + '你好'
}

// 审核
function examine() {
  formSection.value
    .validate()
    .then(() => {
      console.log("values", formData);
      console.log("最后的值", formSection.value.outerModel);
    })
    .catch((error) => {
      console.log("error", formData);
    });
}
</script>

<style></style>
