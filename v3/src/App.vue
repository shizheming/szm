<template>
  <s-form
    :api="api"
    :model="formState"
    :is-edit="true"
    :outer-model="outerFormState"
    @set-form="setForm"
    :label-col="{ span: 2 }"
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
  </s-form>

  <a-button type="primary" @click="onSubmit">Create</a-button>
</template>
<script>
import { reactive, ref, watch } from "vue";
export default {
  setup() {
    // 数据
    const formState = reactive({checkbox:true});

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
          console.log("error", formState);
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

      api,
      outerFormState,
      formState,
      onSubmit,
      setForm,
    };
  },
};
</script>
