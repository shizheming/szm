<template>
  <s-form ref="formRef" :model="formModel" @finish="formFinish">
    <a-row :style="`height:${height};overflow:hidden`">
      <a-col :span="8">
        <a-form-item label="订单搜索" :label-col="{ span: 6 }">
          <a-input-group compact>
            <s-select
              style="width: 50%"
              :allow-clear="false"
              v-model:value="formModel.order_search_key"
            >
              <a-select-option value="osl_seq">订单编号</a-select-option>
              <a-select-option value="out_ono">外部订单号</a-select-option>
              <a-select-option value="name">收货人姓名</a-select-option>
              <a-select-option value="mobile">收货人手机号</a-select-option>
              <a-select-option value="mobile_tail"
                >收货人手机号后四位</a-select-option
              >
              <a-select-option value="ono">主单号</a-select-option>
            </s-select>
            <s-input
              style="width: 50%"
              v-model:value="formModel.order_search_value"
            />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="商品搜索" :label-col="{ span: 6 }">
          <a-input-group compact>
            <s-select
              style="width: 50%"
              :allow-clear="false"
              v-model:value="formModel.good_search_key"
            >
              <a-select-option value="goods_name">商品名称</a-select-option>
              <a-select-option value="sku_code">商品编码</a-select-option>
              <a-select-option value="shop_sku_code"
                >店铺商品编码</a-select-option
              >
              <a-select-option value="sn">货号</a-select-option>
            </s-select>
            <s-input
              style="width: 50%"
              v-model:value="formModel.good_search_value"
            />
          </a-input-group>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="订单状态" :label-col="{ span: 6 }">
          <a-select
            mode="multiple"
            :options="ORDER_STATUS"
            v-model:value="formModel.sub_status_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付状态" :label-col="{ span: 6 }">
          <s-select
            mode="multiple"
            :options="PAY_STATUS"
            v-model:value="formModel.pay_status_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="发货状态" :label-col="{ span: 6 }">
          <s-select
            mode="multiple"
            :options="DELIVERY_STATUS"
            v-model:value="formModel.deliver_arr"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="店铺名称" :label-col="{ span: 6 }">
          <s-input v-model:value="formModel.shop_name" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="供应商" :label-col="{ span: 6 }">
          <Supplier v-model:value="formModel.supplier_id" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="用户等级" :label-col="{ span: 6 }">
          <s-select
            :options="USER_LEVEL"
            v-model:value="formModel.user_level"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 6 }">
          <a-input-number
            v-model:value="formModel.b"
            placeholder="请输入"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 6 }">
          <a-range-picker v-model:value="formModel.time" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.d" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.f" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.g" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="label" :label-col="{ span: 6 }">
          <a-input v-model:value="formModel.h" placeholder="请输入" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item :wrapper-col="{ offset: 6 }">
          <a-space style="font-size: 18px" size="large">
            <a-button html-type="submit"><search-outlined /></a-button>
            <clear-outlined @click="resetformClick" />
            <down-outlined @click="expandArrowClick" v-if="isExpandArrow" />
            <up-outlined @click="expandArrowClick" v-else />
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </s-form>
  <a-row style="margin: 30px 0">
    <a-space size="large">
      <a-button @click="chooseButtonClick">批量编辑商家备注</a-button>
      <router-link to="/">人工下单</router-link>
      <router-link to="/">补开发票</router-link>
    </a-space>
  </a-row>
  <a-table
    rowKey="id"
    :row-selection="{ selectedRowKeys, onChange }"
    :dataSource="dataSource"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @change="tableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a-space>
          <router-link to="/"><a>查看</a></router-link>
          <router-link to="/"><a>编辑</a></router-link>
          <a-popconfirm title="确定要？" @confirm="popconfirmConfirm">
            <a-button size="small">取消</a-button>
          </a-popconfirm>
        </a-space>
      </template>
      <template v-if="column.key === 'is_listing'">
        <a-switch
          :checked="!!record.is_listing"
          @change="switchChange(record)"
          checked-children="上架"
          un-checked-children="下架"
        />
      </template>
      <template v-if="column.key === 'stock'">
        <a-space style="width: 100%">
          <a-input-number
            :disabled="!record.editStockStatus"
            :bordered="!!record.editStockStatus"
            v-model:value="record.stock"
            style="background-color: #fff; color: #000"
            :mim="0"
          />
          <edit-outlined
            v-if="!record.editStockStatus"
            style="color: #40a9ff"
            @click="editButtonClick(record)"
          />
          <div v-else>
            <check-circle-outlined
              @click="okButtonClick(record)"
              style="
                font-size: 18px;
                margin: 0 10px;
                color: #40a9ff;
                cursor: pointer;
              "
            />
            <stop-outlined
              style="font-size: 18px; cursor: pointer"
              @click="cancelButtonClick(record)"
            />
          </div>
        </a-space>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { ref, watch, reactive } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
  ORDER_STATUS,
  PAY_STATUS,
  DELIVERY_STATUS,
  USER_LEVEL,
} from "../../../data/dictionary";
import Supplier from "../../../components/select/supplier.vue";
import {
  SmileOutlined,
  SearchOutlined,
  ClearOutlined,
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";

// 动态数据
const isExpandArrow = ref();
const formModel = reactive({
  order_search_key: "osl_seq",
  good_search_key: "goods_name",
});
const formRef = ref();
const dataSource = ref();
const loading = ref();
const height = ref();
const pagination = reactive({});
const selectedRowKeys = ref([]);
const selectedRows = ref();
// 静态数据
const columns = [
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
  {
    title: "title",
    dataIndex: "is_listing",
    key: "is_listing",
  },
  {
    title: "title",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "title",
    dataIndex: "name3",
    key: "name3",
  },
  {
    title: "title",
    dataIndex: "name4",
    key: "name4",
  },
];

watch(isExpandArrow, (newValue) => {
  if (newValue) {
    height.value = "100px";
  } else {
    height.value = "auto";
  }
});

const onChange = (keys, rows) => {
  selectedRowKeys.value = keys;
  selectedRows.value = rows;
};

const formFinish = async (values) => {
  console.log(formModel, 123);
  tableChange();
};

const expandArrowClick = () => {
  isExpandArrow.value = !isExpandArrow.value;
};

const resetformClick = () => {
  formRef.value.resetFields();
};

const tableChange = async (pag = { page: 1, page_size: 10 }) => {
  loading.value = true;
  let submitData = { ...formModel };
  if (submitData.time?.length) {
    submitData.start = submitData.time[0].valueOf() * 1000;
    submitData.end = submitData.time[1].valueOf() * 1000;
  }
  let { data } = await Promise.resolve({
    data: [{ id: 1, name1: 1234 }],
  });
  dataSource.value = data;
  pagination.total = data.total;
  pagination.page = data.page;
  pagination.pageSize = data.pageSize;
  loading.value = false;
};

const chooseButtonClick = async () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择");
    return;
  }
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};

const popconfirmConfirm = async () => {
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};

const switchChange = async () => {
  await Promise.resolve();
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
};

function editButtonClick(record) {
  record.editStockStatus = true;
}

function cancelButtonClick(record) {
  record.editStockStatus = false;
}

async function okButtonClick(record) {
  await Promise.resolve();
  record.editStockStatus = false;
  message.success("成功");
  setTimeout(() => {
    tableChange();
  }, 500);
}
// 初始化
tableChange();
</script>
