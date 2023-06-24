<template>
  <a-modal
    :visible="propsObject.visible"
    title="查看任务"
    @ok="ok"
    @cancel="cancel"
    :width="1400"
  >
    <a-form
      ref="formRefObject"
      :model="formModelObject"
      :label-col="{ span: 6 }"
      @finish="finish"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="任务编码" :name="['sync_id']">
            <a-input v-model:value="formModelObject.sync_id" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="任务类" :name="['name']">
            <a-select
              :options="TASK_CLASS_OPTIONS"
              v-model:value="formModelObject.type"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="操作人" :name="['name']">
            <a-input v-model:value="formModelObject.user_name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="操作时间" :name="['name']">
            <a-range-picker
              show-time
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model:value="formModelObject.time"
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
      :data-source="data?.list"
      :columns="taskListModalTableColumnsArray"
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
          record: OrderSyncListRequestResultItemInterface,
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
  OrderSyncListRequestResultItemInterface,
  OrderSyncListRequestParamsPageInterface,
} from '../interface';
import { orderSyncListRequestFunction, api_order_getFileByUrl } from '../api';
import { TASK_CLASS_OPTIONS } from '../../../../data/dictionary';
import { taskListModalTableColumnsArray } from '../data';
import { usePagination } from 'vue-request';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons-vue';

const propsObject = defineProps<{
  visible: boolean;
}>();
const emitsFunction = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'select'): void;
}>();

const formRefObject = ref<FormInstance>();
const { data, current, pageSize, run, loading, total } = usePagination(
  orderSyncListRequestFunction,
  {
    manual: true,
    formatResult: ({ data }) => {
      return data;
    },
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'page_size',
      totalKey: 'total',
    },
  }
);
const formModelObject = reactive<OrderSyncListRequestParamsPageInterface>({
  page: current.value,
  page_size: pageSize.value,
});
const getSearchDataObject = (
  params: OrderSyncListRequestParamsPageInterface = {
    page: current.value,
    page_size: pageSize.value,
  }
) => {
  [formModelObject.operate_time_begin, formModelObject.operate_time_end] =
    formModelObject.time || [];
  // 不管选哪个type都是2？？？？
  formModelObject.type = formModelObject.type ? 2 : undefined;

  return {
    ...formModelObject,
    ...params,
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
  formRefObject.value?.resetFields();
};

const ok: ModalProps['onOk'] = async (e) => {
  formRefObject.value?.resetFields();

  emitsFunction('select');
  emitsFunction('update:visible', false);
};
const cancel: ModalProps['onCancel'] = (e) => {
  formRefObject.value?.resetFields();
  emitsFunction('update:visible', false);
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
  () => propsObject.visible,
  async (newValue) => {
    if (newValue === true) {
      run(getSearchDataObject());
    }
  }
);
</script>
