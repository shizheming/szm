<template>
  <s-form
    :model="formData"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8 }"
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
      <s-input v-model:value="formData.marketing_id" disabled />
    </s-form-item>
    <s-form-item
      label="活动时间"
      name="times"
      :rules="{
        required: true,
        message: '请选择活动时间',
      }"
    >
      <s-range-picker showTime v-model:value="formData.times" />
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
      <s-radio-group v-model:value="formData.business_id">
        <s-radio :value="1">精选</s-radio>
        <s-radio :value="2" disabled>紫荆</s-radio>
        <s-radio :value="3" disabled>到家</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      v-if="formData.site_ids"
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
      <!-- :disabled="isEdit" -->
      <s-radio-group v-model:value="formData.site_ids">
        <s-radio :value="0">全选</s-radio>
        <s-radio :value="1">指定站点</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      v-if="formData.site_ids"
      label="添加站点"
      name="site_ids_value"
      :rules="{
        required: true,
        message: '请选择添加站点',
      }"
    >
      <Site
        v-model:value="formData.site_ids_value"
        v-model:selectValue="formData.siteIdsSelectValue"
        v-model:tableValue="formData.siteIdsTableValue"
        :trigger="formData.shop_id"
      />
    </s-form-item>
    <s-form-item
      label="适用店铺"
      name="shop_id"
      :rules="{
        required: true,
        message: '请选择适用店铺',
      }"
    >
      <!-- :disabled="isEdit" -->
      <s-select
        ref="shop_id"
        v-model:value="formData.shop_id"
        :inner="shopIdInner"
        :switch-triggerclear="!isEdit"
        :triggerclear="[
          [formData.site_ids_value, 'values'],
          [formData.site_ids, 'values'],
        ]"
        :trigger-options="[
          [formData.site_ids, siteIdsTriggerOptions],
          [formData.site_ids_value, siteIdsValueTriggerOptions],
        ]"
      />
    </s-form-item>
    <s-form-item :wrapper-col="{ offset: 7 }">
      <s-button :loading="loading" @click="next">下一步</s-button>
    </s-form-item>
  </s-form>
</template>
<script setup>
import axios from "../api";
import { ref, toRefs, reactive, onMounted, watch, provide } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import Site from "./components/site.vue";
const route = useRoute();
let marketing_id = route.query.marketing_id;
const formSection = ref();
const formData = reactive({
  business_id: 1,
  marketing_id,
});
const formAttrs = provide("formAttrs", formSection);
let loading = ref();
// 是否编辑页
let isEdit = ref(!!route.query.marketing_id);
let detail = ref();
const formDetail = provide("formDetail", detail);

if (isEdit.value) {
  axios
    .get(`/api/marketing/fullGift/${marketing_id}`, {
      id: marketing_id,
      action: "first",
    })
    .then(({ data }) => {
      const { basic, use_scope } = data;
      detail.value = data;
      formData.name = basic.name;
      formData.times = [moment(basic.start_time), moment(basic.end_time)];
      formData.priority = basic.priority;
      formData.remark = basic.remark;
      formData.business_id = use_scope.business_id;
      formData.app_platform = use_scope.app_platform.split(",");
      formData.site_ids = use_scope.site_ids ? 1 : 0;
      formData.site_ids_value = use_scope.site_list.map((cur) => cur.id);
      formData.shop_id = use_scope.shop_id;
      console.log(formData, 111);
    });
}

async function nameRule(rule, value) {
  if (!value) {
    return Promise.reject("请输入名称");
  } else if (value.length > 10) {
    return Promise.reject("名称不能大于10个字符");
  } else {
    return Promise.resolve();
  }
}

async function priorityRule(rule, value) {
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

const shopIdOptions = async function (params = {}) {
  let {
    data: { list },
  } = await axios.get("/api/shop?page=1&page_size=999", {
    params,
  });
  return list.map((cur) => {
    return {
      ...cur,
      label: cur.shop_name,
      value: cur.id,
    };
  });
};

function shopIdInner(select) {
  select.options = shopIdOptions;
}

function siteIdsTriggerOptions(formComponent) {
  if (formData.site_ids === 0) {
    return shopIdOptions();
  } else if (formData.site_ids === 1 && formData.site_ids_value?.length) {
    return shopIdOptions({
      site_ids: Object.values(formData.site_ids_value),
    });
  }
}

function siteIdsValueTriggerOptions(formComponent) {
  return shopIdOptions({
    site_ids: Object.values(formData.site_ids_value),
  });
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
有3个bug，

切换后叉叉又有了
切换后shopid被清掉了
切换到站点，站点有值的时候需要请求options

marketing_id还没有和融进isEdit里面去
时间组件的语言问题，不知道是不是版本的问题
*/
</script>
