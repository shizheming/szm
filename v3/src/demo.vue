<template>
  <s-form
    :api="api"
    :model="formState"
    :is-edit="true"
    :outer-model="outerFormState"
    @set-form="setForm"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 10 }"
  >
    <a-form-item label="input">
      <s-input
        name="input"
        v-model:value="formState.input"
        placeholder="input"
      />
    </a-form-item>
    <a-select-option />
    <a-form-item
      label="select"
      name="select"
      :rules="{
        required: true,
        message: '请选择某一项',
      }"
    >
      <s-select
        name="select"
        v-model:value="formState.select"
        v-model:preValue="selectPreValue"
        :trigger="formState.input"
        :triggeraction="triggerSelect"
        placeholder="select"
        :inner="selectInner"
        :outer="selectOuter"
        @change="selectChange"
      />
    </a-form-item>
    <a-form-item label="switch">
      <s-switch name="switch" v-model:checked="formState.switch" />
    </a-form-item>
    <a-form-item label="cascader">
      <s-cascader
        name="cascader"
        v-model:value="formState.cascader"
        :inner="cascaderInner"
        placeholder="cascader"
      />
    </a-form-item>
    <a-form-item label="checkbox">
      <s-checkbox name="checkbox" v-model:checked="formState.checkbox" />
    </a-form-item>
    <a-form-item label="checkboxGroup">
      <s-checkbox-group
        v-model:value="formState.checkboxGroup"
        name="checkboxgroup"
        :inner="checkboxGroupInner"
        :trigger-disabled="formState.checkbox"
        :triggeraction-disabled="triggerCheckboxGroupDisabled"
      />
    </a-form-item>
    <a-form-item label="datePicker">
      <s-date-picker v-model:value="formState.datePicker" name="datePicker" />
    </a-form-item>
    <a-form-item label="rangePicker">
      <s-range-picker
        v-model:value="formState.rangePicker"
        name="rangePicker"
      />
    </a-form-item>
    <a-form-item label="inputSearch">
      <s-input-search
        v-model:value="formState.inputSearch"
        name="inputSearch"
      />
    </a-form-item>
    <a-form-item label="textarea">
      <s-textarea v-model:value="formState.textarea" name="textarea" />
    </a-form-item>
    <a-form-item label="inputNumber">
      <s-input-number
        v-model:value="formState.inputNumber"
        name="inputNumber"
      />
    </a-form-item>
    <a-form-item label="radio">
      <s-radio v-model:checked="formState.radio" name="radio" />
    </a-form-item>
    <a-form-item label="radioGroup">
      <s-radio-group v-model:value="formState.radioGroup" name="radioGroup">
        <a-radio :value="1">Option A</a-radio>
        <a-radio :value="2">Option B</a-radio>
        <a-radio :value="3">Option C</a-radio>
      </s-radio-group>
    </a-form-item>
    <a-form-item label="rate">
      <s-rate v-model:value="formState.rate" name="rate" />
    </a-form-item>
    <a-form-item label="timePicker">
      <s-time-picker v-model:value="formState.timePicker" name="timePicker" />
    </a-form-item>
    <a-form-item label="timeRangePicker">
      <s-time-range-picker
        v-model:value="formState.timeRangePicker"
        name="timeRangePicker"
      />
    </a-form-item>
    <a-form-item label="treeSelect">
      <s-tree-select
        v-model:value="formState.treeSelect"
        name="treeSelect"
        :tree-data="treeData"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 7 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
    </a-form-item>
  </s-form>
</template>
<script>
import { reactive, ref, watch } from "vue";
export default {
  setup() {
    // 数据
    const formState = reactive({ checkbox: true });

    // 最后输出的表单值
    const outerFormState = reactive({});

    // 上一次的值
    const selectPreValue = ref();

    watch(
      () => selectPreValue.value,
      () => {
        // console.log(3939);
      }
    );

    // api
    async function api() {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ input: 111111, select: 1 });
        }, 1000);
      });
    }

    // 进入函数
    function selectInner(select, detailData = {}) {
      // formState.select = [1];
      select.options = async () => {
        return [
          { label: "aaaaaa", value: 1 },
          { label: "ddddddddd", value: 2 },
        ];
      };
      select.placeholder = 888888;
      select.detail = detailData.select;
    }

    // 出口函数
    function selectOuter(v) {
      return v + 2;
    }

    // 触发调用函数
    function triggerSelect(select) {
      select.options = async () => {
        return [
          { label: "cccc", value: 112 },
          { label: "fffff", value: 234 },
        ];
      };
    }

    // change事件
    function selectChange() {
      console.log("selectChange");
    }

    function cascaderInner(cascader, detailData = {}) {
      cascader.options = [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
      ];
    }

    function checkboxGroupInner(checkboxGroup, detailData = {}) {
      checkboxGroup.options = [
        {
          label: "Apple",
          value: "Apple",
        },
        {
          label: "Pear",
          value: "Pear",
        },
        {
          label: "Orange",
          value: "Orange",
        },
      ];
    }

    function triggerCheckboxGroupDisabled(checkboxGroup) {
      return !checkboxGroup;
    }

    const treeData = reactive([
      {
        title: "parent 1",
        value: "parent 1",
        children: [
          {
            title: "parent 1-0",
            value: "parent 1-0",
            children: [
              {
                title: "my leaf",
                value: "leaf1",
              },
              {
                title: "your leaf",
                value: "leaf2",
              },
            ],
          },
          {
            title: "parent 1-1",
            value: "parent 1-1",
          },
        ],
      },
    ]);

    // 组件内部调用函数来设置真正的formRender
    let formRender;
    function setForm(fr) {
      formRender = fr;
    }

    // 提交
    function onSubmit() {
      formRender.value
        .validate()
        .then(() => {
          console.log("values", formState);
          console.log("最后的值", outerFormState);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    return {
      selectPreValue,
      triggerSelect,
      selectInner,
      selectOuter,
      selectChange,
      cascaderInner,
      checkboxGroupInner,
      triggerCheckboxGroupDisabled,
      treeData,

      api,
      outerFormState,
      formState,
      onSubmit,
      setForm,
    };
  },
};
</script>
