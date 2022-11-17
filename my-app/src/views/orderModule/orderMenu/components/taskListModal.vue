<template>
  <a-modal
    :visible="props.visible"
    title="查看任务"
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
          <a-form-item label="任务编码" :name="['sync_id']">
            <a-input v-model:value="model.sync_id" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="任务类" :name="['name']">
            <a-select :options="TYPE_OPTIONS" v-model:value="model.type" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="操作人" :name="['name']">
            <a-input v-model:value="model.user_name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="操作时间" :name="['name']">
            <a-range-picker
              show-time
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model:value="model.time"
            />
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
      row-key="id"
      :data-source="dataSource?.list"
      :columns="taskListModalTableColumns"
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
          record: Api_order_orderSyncList_result_item_interface,
        }"
      >
        <template v-if="column.key === 'operation'">
          <a-button
            size="small"
            v-if="record.log_url"
            @click="downTxtButtonClick(record.log_url)"
            >查看日志</a-button
          >
          <a-button size="small">
            <a :href="record.import_url" target="_blank" v-if="record.type == 1"
              >下载导入文件</a
            >
          </a-button>
          <a-button size="small">
            <a :href="record.file_url" target="_blank" v-if="record.type == 2"
              >导出</a
            >
          </a-button>
        </template>
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
import {
  Api_order_orderSyncList_params_part_interface,
  Api_order_orderSyncList_result_item_interface,
  Api_order_orderSyncList_params_interface,
} from '../interface';
import { api_order_orderSyncList, api_order_getFileByUrl } from '../api';
import { TYPE_OPTIONS } from '../../../../data/dictionary';
import { taskListModalTableColumns } from '../data';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';

const props = defineProps<{
  visible: boolean;
}>();
const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'select'): void;
}>();

const model = reactive<Partial<Api_order_orderSyncList_params_part_interface>>(
  {}
);
const formRef = ref<FormInstance>();
const {
  data: dataSource,
  current,
  pageSize,
  run,
  loading,
  total,
} = usePagination(api_order_orderSyncList, {
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
const getSearchDataObject = (
  params: Api_order_orderSyncList_params_interface = {
    page: current.value,
    page_size: pageSize.value,
  }
) => {
  [model.operate_time_begin, model.operate_time_end] = model.time || [];
  // 不管选哪个type都是2？？？？
  model.type = model.type ? 2 : undefined;
  return {
    ...params,
    ...model,
  };
};

const finish = async () => {
  run(
    getSearchDataObject({
      page: 1,
      page_size: 10,
    })
  );
};

const pagination = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  };
});

const tableChange: TableProps['onChange'] = async (pag) => {
  run(
    getSearchDataObject({
      page: pag.current!,
      page_size: pag.pageSize!,
    })
  );
};

const clearOutlinedClick = () => {
  formRef.value?.resetFields();
};

const ok: ModalProps['onOk'] = async (e) => {
  formRef.value?.resetFields();

  emits('select');
  emits('update:visible', false);
};
const cancel: ModalProps['onCancel'] = (e) => {
  formRef.value?.resetFields();
  emits('update:visible', false);
};

const downTxtButtonClick = async (url: any) => {
  let { data } = await api_order_getFileByUrl({
    url,
  });
  const a = document.createElement('a');
  const blob = new Blob([data.data]);
  const blobUrl = window.URL.createObjectURL(blob);

  download(blobUrl);
};

const download = (blobUrl: any) => {
  const a = document.createElement('a');

  a.style.display = 'none';
  a.download = `日志${new Date().getTime()}`;
  a.href = blobUrl;
  a.click();
  // document.body.removeChild(a);
};

watch(
  () => props.visible,
  async (newValue) => {
    if (newValue === true) {
      run(getSearchDataObject());
    }
  }
);
</script>
