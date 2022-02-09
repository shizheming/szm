<template>
  <a-modal
    title="添加优惠券"
    :visible="props.visible"
    @cancel="cancel"
    @ok="ok"
  >
    <a-form ref="formSection" :model="formData">
      <a-form-item
        label="券批次号"
        name="code"
        :rules="{
          required: true,
          message: '请输入券批次号',
        }"
      >
        <a-input placeholder="券批次号" v-model:value="formData.code" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { ref, toRefs, reactive, onMounted, watch, provide, inject } from "vue";
const props = defineProps(["visible"]);
const emits = defineEmits(["update:visible"]);
const formData = reactive({});
import axios from "../../api";
const formSection = ref();
let warpFormData = inject("formData", {});
function ok() {
  formSection.value
    .validate()
    .then(() => {
      console.log("values", formData);
      axios
        .post("/api/proxy/coupon/index/couponDetail", {
          data_id: formData.code,
          type: 0,
        })
        .then(({ data }) => {
          // 默认数量为1
          data.marketing_org_stock = 1;
          warpFormData.gift_settings.gift_coupon_list.push(data);
          emits("update:visible", false);
        });
    })
    .catch((error) => {
      console.log("error", formData);
    });
}
function cancel() {
  emits("update:visible", false);
}
</script>
