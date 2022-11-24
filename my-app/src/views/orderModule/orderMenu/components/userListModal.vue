<template>
  <a-modal
    :visible="props.visible"
    title="用户选择"
    @ok="ok"
    @cancel="cancel"
    :width="1400"
  >
    <a-form
      ref="formRef"
      :model="model"
      :label-col="{ span: 6 }"
      @finish="finish"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="用户ID" :name="['user_id']">
            <a-input v-model:value="model.user_id" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item :wrapper-col="{ offset: 6 }">
            <a-space style="font-size: 18px" size="large">
              <a-button html-type="submit" type="primary">
                <search-outlined />
              </a-button>
              <clear-outlined @click="clearOutlinedClick" />
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      row-key="user_id"
      :row-selection="{
        selectedRowKeys,
        onChange: rowSelectionOnChange,
        type: 'radio',
      }"
      :data-source="dataSource?.list"
      :columns="userListModalTableColumns"
      :loading="loading"
      :pagination="pagination"
      @change="tableChange"
    >
      <template
        #bodyCell="{
          column,
          record,
        }: {
          column: TableColumnType,
          record: Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface,
        }"
      >
        <template v-if="column.key === 'operation'"> </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import {
  FormInstance,
  ModalProps,
  TableProps,
  FormProps,
  TableColumnType,
} from 'ant-design-vue';
import { Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface } from '../interface';
import { Api_proxy_user_User_UserSearch_epUserSearch } from '../api';
import { userListModalTableColumns } from '../data';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { PageInterface } from '../../../../interface';

const props = defineProps<{
  visible: boolean;
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (
    event: 'select',
    selectedRowKeys: TableRowSelection['selectedRowKeys'],
    selectedRowsArray: Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface[]
  ): void;
}>();

const selectedRowKeys = ref<TableRowSelection['selectedRowKeys']>([]);

const formRef = ref<FormInstance>();
const selectedRowsArray = ref<
  Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface[]
>([]);
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(Api_proxy_user_User_UserSearch_epUserSearch, {
  manual: true,
  formatResult: ({ data }) => {
    return data;
  },
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'page_size',
    totalKey: 'total',
  },
});
const model = reactive<{ user_id: string } & PageInterface>({
  page: current.value,
  page_size: pageSize.value,
});
const finish = async () => {
  run(model);
};

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

const rowSelectionOnChange: TableRowSelection['onChange'] = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRowsArray.value = rows;
};

const tableChange: TableProps['onChange'] = async (pag) => {
  run({
    ...model,
    page: pag.current!,
    page_size: pag.pageSize!,
  });
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
};

const ok = async () => {
  formRef.value?.resetFields();
  emits('select', selectedRowKeys.value, selectedRowsArray.value);
  emits('update:visible', false);
};
const cancel = () => {
  formRef.value?.resetFields();
  emits('update:visible', false);
};

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      run(model);
    }
  }
);
</script>
