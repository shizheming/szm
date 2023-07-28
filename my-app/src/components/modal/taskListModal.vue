<template>
  <a-modal
    title="查看任务"
    :visible="propsObject.visible"
    @ok="modalOkFunction"
    @cancel="modalCancelFunction"
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
              <a-button html-type="submit" type="primary" :loading="loading">
                <template #icon>
                  <search-outlined />
                </template>
              </a-button>
              <a-button type="text" @click="clearOutlinedClickFunction">
                <template #icon>
                  <clear-outlined />
                </template>
              </a-button>
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
          record: OrderSyncListSingleInterface,
        }"
      >
        <template v-if="column.key === 'operation'">
          <a-button
            size="small"
            type="primary"
            v-if="record.log_url"
            @click="downTxtButtonClick(record.log_url)"
          >
            查看日志
          </a-button>
          <a-button
            type="text"
            size="small"
            :href="['', record.import_url, record.file_url][record.type]"
            target="_blank"
          >
            <template #icon>
              <download-outlined />
            </template>
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
  TableColumnsType,
} from 'ant-design-vue';
import {
  OrderSyncListSingleInterface,
  OrderSyncListRequestParamsInterface,
} from '../../api/interface';
import {
  orderSyncListRequestFunction,
  fileByUrlRequestFunction,
} from '../../api/list';
import { TASK_CLASS_OPTIONS } from '../../data/options';
import { usePagination } from 'vue-request';
import {
  SearchOutlined,
  ClearOutlined,
  DownloadOutlined,
} from '@ant-design/icons-vue';
const taskListModalTableColumnsArray: TableColumnsType = [
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
  {
    title: '任务编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '任务类型',
    dataIndex: 'type_format',
    key: 'type_format',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '任务状态',
    dataIndex: 'status_format',
    key: 'status_format',
  },
  {
    title: '操作时间',
    dataIndex: 'operate_time',
    key: 'operate_time',
  },
  {
    title: '总记录数',
    dataIndex: 'total_num',
    key: 'total_num',
  },
  {
    title: '成功记录数',
    dataIndex: 'success_num',
    key: 'success_num',
  },
];
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
const formModelObject = reactive<OrderSyncListRequestParamsInterface>({
  page: current.value,
  page_size: pageSize.value,
});
const getSearchDataObject = (
  params: OrderSyncListRequestParamsInterface = {
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
    showQuickJumper: true,
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

const clearOutlinedClickFunction = () => {
  formRefObject.value?.resetFields();
};

const modalOkFunction: ModalProps['onOk'] = async (e) => {
  formRefObject.value?.resetFields();

  emitsFunction('select');
  emitsFunction('update:visible', false);
};
const modalCancelFunction: ModalProps['onCancel'] = (e) => {
  formRefObject.value?.resetFields();
  emitsFunction('update:visible', false);
};

const downTxtButtonClick = async (url: any) => {
  let { data } = await fileByUrlRequestFunction({
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
