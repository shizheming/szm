<template>
  <s-form
    :model="formData"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8 }"
    :isEdit="isEdit"
    ref="formSection"
  >
    <s-form-item
      label="活动名称"
      :rules="{
        required: true,
        validator: nameRule,
      }"
      name="name"
    >
      <s-input v-model:value="formData.name" placeholder="10个字以内" />
    </s-form-item>
    <s-form-item label="活动ID" name="marketing_id" v-if="isEdit">
      <s-input
        v-model:value="formData.marketing_id"
        disabled
        :initialValue="$route.query.marketing_id"
      />
    </s-form-item>
    <s-form-item
      label="活动时间"
      name="times"
      :rules="{
        required: true,
        message: '请选择活动时间',
      }"
    >
      <s-range-picker :showTime="true" v-model:value="formData.times" />
      <div style="color: #ccc">活动到期后将自动失效，失效后不可延长</div>
    </s-form-item>
    <s-form-item
      label="同活动优先级"
      name="times"
      :rules="{
        required: true,
        validator: priorityRule,
      }"
    >
      <s-input-number placeholder="0～999" v-model:value="formData.priority" />
      <div style="color: #ccc">
        同个商品同时参与同类型活动时，取优先级最高的生效，数字越大优先级越高
      </div>
    </s-form-item>
    <s-form-item
      label="备注"
      name="remark"
      :rules="{
        max: 200,
        message: '备注不能大于200个字符',
      }"
    >
      <s-textarea
        placeholder="用户可以在礼金卡使用说明入口查看，请描述清楚礼金卡的使用范围"
        v-model:value="formData.remark"
      />
    </s-form-item>
    <s-form-item
      label="业务类型"
      name="business_id"
      :rules="{
        required: true,
        message: '请选择业务类型',
      }"
    >
      <s-radio-group v-model:value="formData.business_id" :initialValue="1">
        <s-radio :value="1">精选</s-radio>
        <s-radio :value="2" disabled>紫荆</s-radio>
        <s-radio :value="3" disabled>到家</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      label="使用终端"
      name="app_platform"
      :rules="{
        required: true,
        message: '请选择使用终端',
      }"
    >
      <s-checkbox-group v-model:value="formData.app_platform">
        <s-checkbox value="i">iOS</s-checkbox>
        <s-checkbox value="a">Android</s-checkbox>
        <s-checkbox value="mp">小程序</s-checkbox>
        <s-checkbox value="h5">H5站点</s-checkbox>
      </s-checkbox-group>
    </s-form-item>
    <s-form-item
      label="所属站点"
      name="business_id"
      :rules="{
        required: true,
        message: '请选择所属站点',
      }"
    >
      <s-radio-group
        v-model:value="formData.site_ids"
        :disabled="isEdit"
        :initialValue="formSection?.detail?.use_scope.site_ids.length ? 1 : 0"
      >
        <s-radio :value="0">全选</s-radio>
        <s-radio :value="1">指定站点</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      label="添加站点"
      name="site_ids_value"
      :rules="{
        required: true,
        message: '请选择添加站点',
      }"
    > 
      <Site/>
    </s-form-item>
    <s-form-item :wrapper-col="{ offset: 7 }">
      <s-button :loading="loading" @click="next">下一步</s-button>
    </s-form-item>
  </s-form>
</template>
<script setup>
import axios from "../api";
import { ref, toRefs, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import Site from './components/site.vue'
const route = useRoute();
const formSection = ref();
const formData = reactive({});
let loading = ref();
// 是否编辑页
let isEdit = ref(!!route.query.marketing_id);

function nameRule(rule, value) {
  if (!value) {
    return Promise.reject("请输入名称");
  } else if (value.length > 10) {
    return Promise.reject("名称不能大于10个字符");
  } else {
    return Promise.resolve();
  }
}

function priorityRule(rule, value) {
  if (!value) {
    return Promise.reject("请输入0-999间的正整数");
  } else if (
    !/^[0-9]+[0-9]*$/.test(value) ||
    parseInt(value) < 1 ||
    parseInt(value) > 999
  ) {
    return Promise.reject("请输入0-999间的正整数");
  } else {
    return Promise.resolve();
  }
}

// 下一步
function next() {
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

/* 
问题
isEdit
2种情况
1，编辑页，
2，新建保存后，回到第一步，那这时的第一步页算是编辑了
*/
</script>
