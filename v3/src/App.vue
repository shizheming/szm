<template>
  <s-form :api="api" :model="formState" :isEdit="true" @setForm="setForm">
    <a-form-item label="input">
      <s-input v-model:value="formState.input" placeholder="input" />
    </a-form-item>
    <a-form-item
      label="select"
      name="select"
      :rules="{
        required: true,
        message: '请选择某一项',
      }"
    >
      <s-select
        v-model:value="formState.select"
        v-model:preValue="selectPreValue"
        :trigger="formState.input"
        :triggerAction="triggerSelect"
        placeholder="select"
        :inner="selectInner"
        :outer="selectOuter"
        @change="selectChange"
      >
        <!-- <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option> -->
      </s-select>
    </a-form-item>
  </s-form>
  <a-button type="primary" @click="onSubmit">Create</a-button>
</template>
<script>
import { reactive, toRaw, ref, watch } from "vue";
export default {
  setup() {
    // 数据
    const formState = reactive({});

    // 上一次的值
    const selectPreValue = ref();

    watch(
      () => selectPreValue.value,
      () => {
        console.log(3939);
      }
    );

    // api
    async function api() {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ input: 111111 , /* select: 1 */ });
        }, 3000);
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
    function selectOuter() {
      console.log("inner");
    }

    // 触发调用函数
    function triggerSelect(select) {
      console.log(123)
      select.options = async () => {
        return [
          { label: "cccc", value: 112 },
          { label: "fffff", value: 234 },
        ];
      };
    }

    // change事件
    function selectChange() {
      console.log("outer");
    }

    // 组件内部调用函数来设置真正的formRender
    let formRender;
    function setForm(fr) {
      formRender = fr;
    }

    // 提交
    function onSubmit() {
      console.log(formRender.value,2999)
      formRender.value
        .validate()
        .then(() => {
          console.log("values", formState);
        })
        .catch((error) => {
          console.log("error", formState);
        });
    }
    return {
      formState,
      selectPreValue,
      api,
      triggerSelect,
      onSubmit,
      selectInner,
      selectOuter,
      selectChange,
      setForm,
    };
  },
};
</script>
