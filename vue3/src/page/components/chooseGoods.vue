<template>
  <a-modal
    :visible="props.visible"
    title="选择商品"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="1400"
  >
    <s-form
      :model="formData"
      ref="formSection"
      :labelCol="{span:4}"
    >
      <s-form-item label="SPU ID" style="width:25%;display:inline-block;">
        <s-input v-model:value="formData.spu_id" />
      </s-form-item>
      <s-form-item label="商品名称" style="width:25%;display:inline-block;">
        <s-input v-model:value="formData.name" />
      </s-form-item>
      <s-form-item label="SKU ID" style="width:25%;display:inline-block;">
        <s-input v-model:value="formData.sku_id" />
      </s-form-item>
      <s-form-item label="SKU编码" style="width:25%;display:inline-block;">
        <s-input v-model:value="formData.sku_code" />
      </s-form-item>
      <s-form-item label="品牌" style="width:25%;display:inline-block;">
        <s-select v-model:value="formData.brand_id" :inner="brand_id_inner" />
      </s-form-item>
      <s-form-item label="后台类目" style="width:25%;display:inline-block;">
        <s-cascader
          v-model:value="formData.category_id"
          :inner="category_id_inner"
        />
      </s-form-item>
      <s-form-item label="前台类目" style="width:25%;display:inline-block;">
        <s-cascader
          v-model:value="formData.user_category_id"
          :inner="user_category_id_inner"
        />
      </s-form-item>
      <s-form-item label="供应商" style="width:25%;display:inline-block;">
        <s-select
          v-model:value="formData.supplier_id"
          placeholder="供应商"
          :inner="supplier_id_inner"
        />
      </s-form-item>
      <s-form-item label="上下架状态" style="width:25%;display:inline-block;">
        <s-select
          v-model:value="formData.shop_is_listing"
          placeholder="上下架状态"
        >
          <s-select-option :value="0">下架</s-select-option>
          <s-select-option :value="1">上架</s-select-option>
        </s-select>
      </s-form-item>
      <s-form-item label="货号" style="width:25%;display:inline-block;">
        <s-input v-model:value="formData.sn" />
      </s-form-item>
    </s-form>
    <s-button @click="search">搜索</s-button>
    <a-table :columns="columns" :dataSource="dataSource" rowKey="id">
      <template #expandedRowRender="{ record }">
        <a-table
          :columns="innerColumns"
          :data-source="record.sku_list"
          :pagination="false"
        >
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'sku_spec_copy_data'">
              {{ makeSpecCopy(column.sku_spec_copy) }}
            </template>
          </template>
        </a-table>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'img_url'">
          <img
            :data-item="record.name"
            :src="record.goods_gallery[0].img_url"
            style="width: 100px"
          />
        </template>
        <template v-if="column.key === 'shop_selling_price'">
          {{
            makeSellPrice(
              record.sku_list.map(({ channel_relation }) => {
                return channel_relation[0].shop_selling_price;
              })
            )
          }}
        </template>
        <template v-if="column.key === 'is_listing'">
          {{ record.is_listing == 1 ? "上架" : "下架" }}
        </template>
        <template v-if="column.key === 'stock'">
          {{
            record.sku_list
              .map((cur) => cur.stock)
              .reduce((prev, cur) => {
                return prev + cur;
              })
          }}
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup>
import axios from "../../api";
import { ref, reactive, inject } from "vue";
import { last } from "lodash";
let shop_id_list = inject("shop_id_list");
const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible"]);
const formSection = ref();
const formData = reactive({});
const dataSource = ref();
const innerData = ref();
const columns = [
  {
    title: "SPU ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "商品图片", // 暂时没有
    dataIndex: "img_url",
    key: "img_url",
  },
  {
    title: "商品名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "店铺ID",
    dataIndex: "shop_id",
    key: "shop_id",
  },
  {
    title: "店铺名称",
    dataIndex: "shop_name",
    key: "shop_name",
  },
  {
    title: "商品类目",
    dataIndex: "category.name",
    key: "category.name",
  },
  {
    title: "供应商",
    dataIndex: "supplier_name",
    key: "supplier_name",
  },
  {
    title: "商品品牌",
    dataIndex: "brand_name",
    key: "brand_name",
  },
  {
    title: "状态",
    dataIndex: "is_listing",
    key: "is_listing",
  },
  {
    title: "售价", // goods_sku.channel_relation.shop_selling_price
    dataIndex: "shop_selling_price",
    key: "shop_selling_price",
  },
  {
    title: "库存", // 暂时没有
    dataIndex: "stock",
    key: "stock",
  },
];

const innerColumns = [
  {
    title: "SKU ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "SKU CODE",
    dataIndex: "sku_code",
    key: "sku_code",
  },
  {
    title: "规格",
    dataIndex: "sku_spec_copy_data",
    key: "sku_spec_copy_data",
  },
  {
    title: "货号",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "状态",
    dataIndex: "channel_relation[0].shop_is_listing",
    key: "channel_relation[0].shop_is_listing",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
  },
];

function handleOk() {
  emit("update:visible", false);
}
function handleCancel() {
  emit("update:visible", false);
}

function brand_id_inner(select) {
  select.options = async function () {
    let {
      data: { list },
    } = await axios.get("/api/goods/brand?page_size=99999");

    return list.map(({ name, id }) => {
      return {
        label: name,
        value: id,
      };
    });
  };
}

function category_id_inner(cascader) {
  cascader.options = async function () {
    let { data } = await axios.get("/api/goods/category");
    return formatCategory(data);
  };
}

function formatCategory(cascader) {
  return cascader.map((item) => {
    item.label = item.name;
    item.value = item.id;

    if (item.child) {
      item.children = formatCategory(item.child);
    }

    return item;
  });
}

function user_category_id_inner(cascader) {
  cascader.options = async function () {
    let { data } = await axios.get("/api/goods/user-category");
    return formatCategory(
      data.filter((m) => {
        return m.child && m.child.length > 0;
      })
    );
  };
}

function supplier_id_inner(select) {
  select.options = async function () {
    let { data } = await axios.get("/api/stock/supplier/get-all/list");
    return data.map((item) => {
      return {
        label: item.name,
        value: item.id,
        code: item.code,
      };
    });
  };
}

// 非平台账号才传入shop_org_id,平台账号可选择全部商品;
let p = {};
const { is_mqj, is_platform } = localStorage.userInfo;

if (is_platform != 1 || is_mqj != 1) {
  p.shop_org_id = localStorage.org_id;
}

async function search() {
  console.log(formData, 12);
  let {
    data: { list },
  } = await axios.post("/api/goods/list", {
    ...formData,
    category_id: last(formData.category_id),
    user_category_id: last(formData.user_category_id),
    required_data:
      "category,skuList.channelRelation,skuList.skuSpecCopy,goodsGallery",
    channel_id: 1, //渠道ID，目前固定只有一个
    is_cms: 1, // 拉取有店铺的商品列表
    get_stock: 1, //是否展示库存
    is_shop: 1, //分店铺展示
    // get_stock: 1, //是否获取库存
    enterprise_id: localStorage.userInfo.enterprise_id,
    ...p,
    shop_id_list: shop_id_list.value,
    page: 1,
    page_size: 10,
  });
  dataSource.value = list;
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

function makeSellPrice(list) {
  if (!list || list.length <= 0) {
    return "-";
  }
  if (list.length == 1) {
    return list[0];
  }
  list.sort(function (a, b) {
    return a - b;
  });
  if (list[0] == list[list.length - 1]) return list[0];
  return list[0] + "-" + list[list.length - 1];
}
</script>

<style></style>
