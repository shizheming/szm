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
import { ref, toRefs, reactive, onMounted, watch, provide } from "vue";
const props = defineProps(["visible", "datasource"]);
const emits = defineEmits(["update:visible", "update:datasource"]);
const formData = reactive({});
import axios from "../../api";
const formSection = ref();
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
          emits("update:datasource", [data]);
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
