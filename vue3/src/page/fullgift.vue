<template>
  <s-form
    :model="formData"
    ref="formSection"
    :api="api"
    :isEdit="isEdit"
    :labelCol="{ span: 4 }"
  >
    <s-form-item
      label="活动名称"
      :rules="{
        required: true,
        validator: nameRule,
      }"
      :name="['basic', 'name']"
    >
      <s-input v-model:value="formData.basic.name" placeholder="10个字以内" />
    </s-form-item>
    <s-form-item label="活动ID" name="marketing_id" v-if="isEdit">
      <s-input v-model:value="formData.marketing_id" disabled />
    </s-form-item>
    <s-form-item
      label="活动时间"
      :name="['basic', 'times']"
      :rules="{
        required: true,
        message: '请选择活动时间',
      }"
    >
      <s-range-picker
        showTime
        v-model:value="formData.basic.times"
        :inner="timesInner"
      />
      <div style="color: #ccc">活动到期后将自动失效，失效后不可延长</div>
    </s-form-item>
    <s-form-item
      label="同活动优先级"
      :name="['basic', 'priority']"
      :rules="{
        required: true,
        validator: priorityRule,
      }"
    >
      <s-input-number
        placeholder="0～999"
        v-model:value="formData.basic.priority"
      />
      <div style="color: #ccc">
        同个商品同时参与同类型活动时，取优先级最高的生效，数字越大优先级越高
      </div>
    </s-form-item>
    <s-form-item
      label="备注"
      :name="['basic', 'remark']"
      :rules="{
        max: 200,
        message: '备注不能大于200个字符',
      }"
    >
      <a-textarea
        placeholder="用户可以在礼金卡使用说明入口查看，请描述清楚礼金卡的使用范围"
        v-model:value="formData.basic.remark"
      />
    </s-form-item>
    <s-form-item
      label="业务类型"
      :name="['use_scope', 'business_id']"
      :rules="{
        required: true,
        message: '请选择业务类型',
      }"
    >
      <s-radio-group
        v-model:value="formData.use_scope.business_id"
        :initialValue="1"
      >
        <s-radio :value="1">精选</s-radio>
        <s-radio :value="2" disabled>紫荆</s-radio>
        <s-radio :value="3" disabled>到家</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      label="使用终端"
      :name="['use_scope', 'app_platform']"
      :rules="{
        required: true,
        message: '请选择使用终端',
      }"
    >
      <s-checkbox-group
        v-model:value="formData.use_scope.app_platform"
        :inner="app_platform_inner"
      >
        <s-checkbox value="i">iOS</s-checkbox>
        <s-checkbox value="a">Android</s-checkbox>
        <s-checkbox value="mp">小程序</s-checkbox>
        <s-checkbox value="h5">H5站点</s-checkbox>
      </s-checkbox-group>
    </s-form-item>
    <s-form-item
      label="所属站点"
      :name="['use_scope', 'site_ids']"
      :rules="{
        required: true,
        message: '请选择所属站点',
      }"
    >
      <s-radio-group
        v-model:value="formData.use_scope.site_ids"
        :inner="site_ids_inner"
        :disabled="isEdit"
        :initialValue="0"
      >
        <s-radio :value="0">全选</s-radio>
        <s-radio :value="1">指定站点</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      v-if="formData.use_scope.site_ids"
      label="添加站点"
      :name="['use_scope', 'site_ids_value']"
      :rules="{
        required: true,
        message: '请选择添加站点',
      }"
    >
      <Site
        v-model:value="formData.use_scope.site_ids_value"
        v-model:selectValue="formData.use_scope.siteIdsSelectValue"
        v-model:tableValue="formData.use_scope.siteIdsTableValue"
        :trigger="formData.use_scope.shop_id"
      />
    </s-form-item>
    <s-form-item
      label="适用店铺"
      :name="['use_scope', 'shop_id']"
      :rules="{
        required: true,
        message: '请选择适用店铺',
      }"
    >
      <s-select
        v-model:value="formData.use_scope.shop_id"
        :disabled="isEdit"
        :inner-options="shopIdOptions"
        :trigger="[formData.use_scope.site_ids, siteIdsChange]"
        :switch-triggerclear="!isEdit"
        :triggerclear="[formData.use_scope.site_ids_value, 'values']"
        :trigger-options="[
          [formData.use_scope.site_ids, siteIdsTriggerOptions],
          [formData.use_scope.site_ids_value, siteIdsValueTriggerOptions],
        ]"
      />
    </s-form-item>
    <s-form-item
      label="活动类型"
      :name="['preferential_rules', 'marketing_type']"
      :rules="{
        required: true,
        message: '请选择活动类型',
      }"
    >
      <s-radio-group
        v-model:value="formData.preferential_rules.marketing_type"
        :disabled="isEdit"
        initialValue="manyuanzeng001"
      >
        <s-radio value="manyuanzeng001">精选</s-radio>
        <s-radio value="manjianzeng001">满额赠</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      label="赠品类型"
      :name="['gift_settings', 'gift_type']"
      :rules="{
        required: true,
        message: '请选择赠品类型',
      }"
    >
      <s-checkbox-group
        v-model:value="formData.gift_settings.gift_type"
        :inner="gift_type_inner"
        :disabled="isEdit"
      >
        <s-checkbox :value="1">商品</s-checkbox>
        <s-checkbox :value="2">优惠券</s-checkbox>
      </s-checkbox-group>
    </s-form-item>
    <s-form-item
      label="赠品选择规则"
      :name="['gift_settings', 'gift_select_rule']"
    >
      <s-radio-group
        v-model:value="formData.gift_settings.gift_select_rule"
        :initialValue="1"
      >
        <s-radio :value="1">固定赠送</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item
      label="赠品信息-商品"
      :rules="{
        required: true,
      }"
      v-if="formData.gift_settings.gift_type?.includes(1)"
    >
      <GiftGoods v-model:value="formData.gift_settings.gift_spu_list"/>
    </s-form-item>
    <s-form-item
      label="赠品信息-优惠券"
      name="coupon"
      :rules="{
        required: true,
        message: '请选择赠品信息-优惠券',
      }"
      v-if="formData.gift_settings.gift_type?.includes(2)"
    >
      赠品信息-优惠券
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
import Site from "./components/site.vue";
import dayjs from 'dayjs'
import GiftGoods from "./components/giftGoods.vue";
const route = useRoute();
let marketing_id = route.query.marketing_id;
const formSection = ref();
const formData = reactive({
  basic: {},
  use_scope: {},
  preferential_rules: {},
  gift_settings: {},
  marketing_id,
});
provide("formAttrs", formSection);
let loading = ref();
// 是否编辑页
let isEdit = !!route.query.marketing_id;
let editId = route.query.marketing_id;
provide("isEdit", isEdit);
provide("editId", editId);

function api() {
  return axios
    .get(`/api/marketing/fullGift/${marketing_id}`, {
      id: marketing_id,
      action: "first",
    })
    .then(({ data }) => {
      formData.use_scope.site_ids_value = data.use_scope.site_list.map(
        (cur) => cur.id
      );
      formData.gift_settings.gift_spu_list = data.gift_settings.gift_spu_list;
      return data;
    });
}

function gift_type_inner(detail) {
  return detail.gift_settings.gift_type == 3
    ? [1, 2]
    : [detail.gift_settings.gift_type];
}

function site_ids_inner(detail) {
  return detail.use_scope.site_ids ? 1 : 0;
}

function timesInner(detail) {
  return [dayjs(detail.basic.start_time), dayjs(detail.basic.end_time)];
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

function app_platform_inner(detail) {
  return detail.use_scope.app_platform.split(",");
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

function siteIdsTriggerOptions(formComponent) {
  if (formData.use_scope.site_ids === 0) {
    return shopIdOptions();
  } else if (
    formData.use_scope.site_ids === 1 &&
    formData.use_scope.site_ids_value?.length
  ) {
    return shopIdOptions({
      site_ids: Object.values(formData.use_scope.site_ids_value),
    });
  }
}

function siteIdsValueTriggerOptions(formComponent) {
  return shopIdOptions({
    site_ids: Object.values(formData.use_scope.site_ids_value),
  });
}

function siteIdsChange(select, formComponent) {
  let shop_id = formComponent["use_scope.shop_id"];
  if (formData.use_scope.site_ids === 1) {
    shop_id.site_ids_change_zero = formData.use_scope.shop_id;
    if ("site_ids_change_one" in shop_id) {
      formData.use_scope.shop_id = shop_id.site_ids_change_one;
    }
  } else if (formData.use_scope.site_ids === 0) {
    shop_id.site_ids_change_one = formData.use_scope.shop_id;
    formData.use_scope.shop_id = shop_id.site_ids_change_zero;
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

marketing_id还没有和融进isEdit里面去
时间组件的语言问题，不知道是不是版本的问题

单看页面，如何让用户知道某些item有关系，
*/

/* 
想法
1.像删除添加用icon代替，我觉得图标更快的能表达意思，文字还要念
2.页面和弹窗的交互只通过一个入口，一个值来交互，不要搞很多值，乱，又控制不好，不止着一种，各种组件之间的交互控制好一个入口
3.switch-triggerclear像这种控制按钮，不是监听的，要不要变成动态的，实时变化
4.什么时候用trigger，什么时候用change，trigger基础，change一起控制大局
5.一些公用的值可以用provide，inject，比如isEdit，组件的传值只通过v-model来，一个不够就多来几个
6.回显弹窗勾选的我用watch加销毁，只监听第一次，然后销毁，说明只是用于回显
7.watch会有个问题，比如不要监听的时候也监听，没有手动灵活，但是概念是完全不一样的，所以我想了下，还是在watch里面去逻辑判断下，也就是说，我监听到了，不代表我就要干事情，我还得看看条件是否成立在干，现在想到的是把判断的逻辑挂在监听的值上面，
*/
</script>
