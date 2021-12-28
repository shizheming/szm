<template>
  <s-button @click="chooseGoods" style="margin-bottom: 20px">选择商品</s-button>
  <a-table
    rowKey="id"
    :pagination="false"
    :columns="columns"
    :scroll="{ x: 2000 }"
    :dataSource="dataSource"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'sku_code'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.sku_code || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'sn'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.sn || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'goods_gallery'">
        <a-image :width="50" :src="record.img" />
      </template>
      <template v-if="column.key === 'sku_id'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.id || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'shop_goods_id'">
        {{ record.channel_relation[0].shop_goods_id || "-" }}
      </template>
      <template v-if="column.key === 'shop_selling_price'">
        {{ record.channel_relation[0].shop_selling_price }}
      </template>

      <template v-if="column.key === 'stock'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.stock }}
        </div>
      </template>
      <template v-if="column.key === 'marketing_org_stock'">
        <a-input-number
          style="width: 80px"
          :min="1"
          placeholder="数量"
          v-model:value="record.marketing_org_stock"
        />
      </template>
      <template v-if="column.key === 'marketing_stock'">
        {{ record.marketing_stock }}
      </template>
      <template v-if="column.key === 'sponsor'">
        <a-form-item
          :name="['goods', index, 'sponsor']"
          :rules="{ required: true, message: '请选择成本承担方' }"
        >
          <a-select style="width: 130px" v-model:value="record.sponsor">
            <a-select-option :value="1">平台</a-select-option>
            <a-select-option :value="2">销售企业</a-select-option>
            <a-select-option :value="3">平台+销售企业</a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <template v-if="column.key === 'sponsor_rate'">
        <s-form-item
          :name="['goods', index, 'platform_ratio']"
          style="width: 80px; margin-right: 15px; display: inline-block"
        >
          <s-input-number
            :disabled="record.sponsor != 3"
            :min="0"
            :max="100"
            placeholder="平台"
            v-model:value="record.platform_ratio"
            :trigger="[
              record.sponsor,
              (select, formComponent) =>
                platform_ratio_trigger(select, formComponent, index),
            ]"
          />
        </s-form-item>
        <s-form-item
          :name="['goods', index, 'shop_ratio']"
          style="width: 80px; display: inline-block"
        >
          <s-input-number
            :disabled="record.sponsor != 3"
            :min="0"
            :max="100"
            placeholder="销售企业"
            v-model:value="record.shop_ratio"
            :trigger="[
              record.sponsor,
              (select, formComponent) =>
                shop_ratio_trigger(select, formComponent, index),
            ]"
          />
        </s-form-item>
      </template>
      <template v-if="column.key === 'sku_spec_copy_data'">
        <a-tooltip
          placement="top"
          :key="index"
          v-if="
            record.sku_spec_copy_data && record.sku_spec_copy_data.length > 15
          "
        >
          <template slot="title">
            <span>{{ record.sku_spec_copy_data || "-" }}</span>
          </template>
          <div class="sku_spec_copy_data">
            {{ record.sku_spec_copy_data || "-" }}
          </div>
        </a-tooltip>
        <div class="sku_spec_copy_data" v-else>
          {{ record.sku_spec_copy_data || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'is_listing'">
        {{ record.is_listing == 1 ? "上架" : "下架" }}
      </template>
      <template v-if="column.key === 'action'">
        <a
          href="javascript:;"
          class="table-button-red"
          @click="siteIdsValueDelete(index)"
          >删除</a
        >
      </template>
    </template>
  </a-table>
  <ChooseGoods v-model:visible="visible" v-model:selected="selected" />
</template>

<script setup>
import {
  ref,
  toRefs,
  reactive,
  onMounted,
  inject,
  watch,
  createVNode,
} from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import axios from "../../api";
import { remove } from "lodash";
import ChooseGoods from "./chooseGoods.vue";
let formData = inject("formData");
const visible = ref(false);
const selected = ref();
const columns = [
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 80,
    fixed: "left",
  },
  {
    title: "商品图片",
    dataIndex: "goods_gallery",
    width: 100,
    key: "goods_gallery",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
  {
    title: "SPU ID",
    dataIndex: "spu_id",
    width: 80,
    key: "spu_id",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
  {
    title: "商品编码",
    dataIndex: "sku_code",
    width: 120,
    key: "sku_code",
  },
  {
    title: "货号",
    width: 120,
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "商品名称",
    dataIndex: "spu_name",
    width: 200,
    key: "spu_name",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
  {
    title: "SKU ID",
    dataIndex: "sku_id",
    width: 60,
    key: "sku_id",
  },
  {
    title: "shop_goods_id",
    dataIndex: "shop_goods_id",
    width: 80,
    key: "shop_goods_id",
  },
  {
    title: "店铺售价(元)",
    width: 110,
    dataIndex: "shop_selling_price",
    key: "shop_selling_price",
  },
  {
    title: "商品可用库存",
    dataIndex: "stock",
    width: 110,
    key: "stock",
  },
  {
    title: "活动数量",
    dataIndex: "marketing_org_stock",
    width: 120,
    key: "marketing_org_stock",
  },
  {
    title: "剩余活动数量",
    dataIndex: "marketing_stock",
    width: 120,
    key: "marketing_stock",
  },
  {
    title: "成本承担方",
    dataIndex: "sponsor",
    width: 160,
    key: "sponsor",
  },
  {
    title: "成本承担比例(%)",
    dataIndex: "sponsor_rate",
    width: 300,
    key: "sponsor_rate",
  },
  {
    title: "规格",
    dataIndex: "sku_spec_copy_data",
    width: 200,
    key: "sku_spec_copy_data",
  },
  {
    title: "状态",
    dataIndex: "is_listing",
    width: 60,
    key: "is_listing",
  },
  {
    title: "店铺名称",
    dataIndex: "shop_name",
    width: 100,
    key: "shop_name",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
  {
    title: "店铺ID",
    dataIndex: "shop_id",
    width: 100,
    key: "shop_id",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
  {
    title: "供应商名称",
    dataIndex: "supplier_name",
    width: 100,
    key: "supplier_name",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
  {
    title: "供应商编码",
    dataIndex: "supplier_id",
    width: 100,
    key: "supplier_id",
    customRender({ record, index }) {
      const obj = {
        props: {},
      };
      obj.props.rowSpan = record.rowSpan;

      return obj;
    },
  },
];

let shop_spu_ids;
watch(
  () => {
    return selected.value;
  },
  (newValue, oldValue) => {
    let sd = newValue.rows.filter(current => {
      return !oldValue?.rowKeys?.includes(current.id)
    })
    shop_spu_ids = sd.map((item) => {
      return item.shop_id + "-" + item.id;
    });
    getShopList(shop_spu_ids);
  }
);

// 存一下spu维度的list，删除的时候要用，需要比对
let spuList = [];
function getShopList(shop_spu_ids) {
  axios
    .post("/api/goods/list", {
      page: 1,
      page_size: 999,
      required_data:
        "category,skuList.channelRelation,skuList.skuSpecCopy,goodsGallery",
      channel_id: 1, //渠道ID，目前固定只有一个
      is_cms: 1, // 拉取有店铺的商品列表
      get_stock: 1, //是否展示库存
      shop_spu_ids,
    })
    .then(({ data: { list } }) => {
      spuList = spuList.concat(list);
      list.forEach((v, index) => {
        let {
          sku_list,
          goods_gallery,
          id,
          name,
          shop_name,
          shop_id,
          supplier_name,
          supplier_id,
        } = v;
        sku_list.forEach((value, key) => {
          value.marketing_org_stock = 1;
          value.marketing_stock = "-";
          value.sponsor = 1;
          value.platform_ratio = 100;
          value.shop_ratio = 0;
          value.sku_spec_copy_data = makeSpecCopy(value.sku_spec_copy);
          value.sku_id = value.id;
          value.img = goods_gallery[0].img_url;
          value.spu_id = id;
          value.spu_name = name;
          value.shop_name = shop_name;
          value.shop_id = shop_id;
          value.supplier_name = supplier_name;
          value.supplier_id = supplier_id;
          value.rowSpan = key === 0 ? sku_list.length : 0;
          dataSource.value.push(value);
        });
      });
      // 把dataSource挂到formData上面去
      formData.goods = dataSource.value;
      /* init && initMerge(data);
      !init && merge(data); */
    });
}


const dataSource = ref([]);
function chooseGoods() {
  if (formData.use_scope.site_ids === 0 && !formData.use_scope.shop_id) {
    message.warning("请先选择店铺");
    return;
  } else if (formData.use_scope.site_ids === 1) {
    if (!formData.use_scope.site_ids_value?.length) {
      message.warning("请先选择站点");
      return;
    } else if (!formData.use_scope.shop_id) {
      message.warning("请先选择店铺");
      return;
    }
  }
  visible.value = true;
}

function siteIdsValueDelete(index) {
  Modal.confirm({
    title: "确定删除吗？",
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      let [delObj] = dataSource.value.splice(index, 1);
      // 在spu里面把删除的sku删掉
      spuList.forEach(({ sku_list, id }, index) => {
        spuList[index].sku_list = sku_list.filter((current) => {
          return !(delObj.spu_id === id && delObj.sku_id === current.id);
        });
      });
      // 重新设置合并单元格的参数
      spuList.forEach(({ sku_list }) => {
        sku_list.forEach((value, key) => {
          value.rowSpan = key === 0 ? sku_list.length : 0;
        });
      });
      // 当sku_list删到空的时候，要把spu删掉
      spuList.forEach(({ sku_list, id }) => {
        if (sku_list.length === 0) {
          remove(selected.value.rows, (cur) => {
            return cur.id === id;
          });
          remove(selected.value.rowKeys, (cur) => {
            return cur === id;
          });
        }
      });
    },
  });
}

function platform_ratio_trigger(select, formComponent, index) {
  if (dataSource.value[index].sponsor === 1) {
    dataSource.value[index].platform_ratio = 100;
  } else if (dataSource.value[index].sponsor === 2) {
    dataSource.value[index].platform_ratio = 0;
  }
}
function shop_ratio_trigger(select, formComponent, index) {
  if (dataSource.value[index].sponsor === 1) {
    dataSource.value[index].shop_ratio = 0;
  } else if (dataSource.value[index].sponsor === 2) {
    dataSource.value[index].shop_ratio = 100;
  }
}
function makeSpecCopy(item) {
  if (!item || !item.sku_specs) return "-";
  let json = JSON.parse(item.sku_specs);
  let t = [];

  json.forEach((item, index) => {
    t.push(item.spec_value);
  });
  return t.join(",");
}
</script>

<style></style>
