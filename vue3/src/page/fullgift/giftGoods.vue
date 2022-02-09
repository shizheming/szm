<template>
  <s-button @click="chooseGoods" style="margin-bottom: 20px">
    <template #icon><select-outlined /></template>
    商品
  </s-button>
  <a-table
    rowKey="id"
    :pagination="false"
    :columns="columns"
    :scroll="{ x: 2000 }"
    :dataSource="formData.sku_goods"
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
        <a-image :width="50" :src="record.img" style="cursor: pointer" />
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
        <a-form-item>
          <a-input-number
            style="width: 80px"
            :min="1"
            placeholder="数量"
            v-model:value="record.marketing_org_stock"
          />
        </a-form-item>
      </template>
      <template v-if="column.key === 'sponsor'">
        <a-form-item>
          <a-select style="width: 130px" v-model:value="record.sponsor">
            <a-select-option :value="1">平台</a-select-option>
            <a-select-option :value="2">销售企业</a-select-option>
            <a-select-option :value="3">平台+销售企业</a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <template v-if="column.key === 'sponsor_rate'">
        <s-form-item
          :rules="{ required: true, validator: ratioRule }"
          :name="['sku_goods', index]"
        >
          <s-form-item
            :name="['sku_goods', index, 'platform_ratio']"
            style="
              width: 80px;
              margin-right: 15px;
              margin-bottom: 0;
              display: inline-block;
            "
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
            :name="['sku_goods', index, 'shop_ratio']"
            style="width: 80px; display: inline-block; margin-bottom: 0"
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
        <a-popconfirm
          :title="
            formData.sku_goods[index].db_id
              ? '如果删除该赠品将影响赠送规则中赠品的配置，确定删除？'
              : '确定删除吗？'
          "
          @confirm="siteIdsValueDelete(index)"
          ><Delete-outlined />
        </a-popconfirm>
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
import {
  ExclamationCircleOutlined,
  SelectOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import axios from "../../api";
import { isArray, remove, values } from "lodash";
import ChooseGoods from "./chooseGoods.vue";

let formData = inject("formData", {});
let isEdit = inject("isEdit", false);
let editId = inject("editId", undefined);
const visible = ref(false);
const selected = ref();
const props = defineProps(["value", "trigger"]);
const emits = defineEmits(["update:value"]);
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
    width: 100,
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
    width: 100,
    key: "sku_id",
  },
  {
    title: "shop_goods_id",
    dataIndex: "shop_goods_id",
    width: 140,
    key: "shop_goods_id",
  },
  {
    title: "店铺售价(元)",
    width: 120,
    dataIndex: "shop_selling_price",
    key: "shop_selling_price",
  },
  {
    title: "商品可用库存",
    dataIndex: "stock",
    width: 120,
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
    width: 120,
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
    width: 120,
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

// 所属站点变化的时候清空商品
watch(
  () => props.trigger,
  () => {
    emits("update:value", []);
    formData.sku_goods = [];
  }
);

// 弹窗选好商品后，和原来的商品合在一起，去下重，在重新请求下列表
watch(
  () => {
    return selected.value;
  },
  (newValue, oldValue) => {
    // 回显的时候不触发
    if (newValue.isDisplay) return;

    let sd = newValue.rows
      .filter(({ shop_spu_id }) => {
        // 拿老的值对比下，去掉以前就有的
        return !oldValue?.rowKeys?.includes(shop_spu_id);
      })
      .map(({ shop_spu_id }) => {
        return shop_spu_id;
      });
    if (sd.length) {
      getShopList(sd);
    }
  }
);

// 回显
if (isEdit) {
  getShopList(
    props.value.map((item) => {
      return item.shop_spu_id;
    }),
    true
  );
}

// 请求列表，做了些处理，打平成sku维度的列表
// 所以就同时存在了2个维度，一个编辑的时候传进来的spu维度和把spu变成sku维度
// 我在删除的时候还是以spu维度为基础，最后演变成sku，当sku删空了后会反应回到spu，这么一个过程，而不是2个独立的，那没有联系，很难同步2个数据
// 商品有sku和spu维度所有在formData上面我用了2个key来记录不同维度的数据，一个就是gift_spu_list，一个就是sku_goods
function getShopList(shop_spu_ids, isDisplay) {
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
      list.forEach((current) => {
        current.shop_spu_id = `${current.shop_id}-${current.id}`;
      });
      // 编辑进来要勾选上弹窗里面的list
      if (isDisplay) {
        selected.value = {
          rowKeys: list.map(({ shop_spu_id }) => shop_spu_id),
          rows: list,
          isDisplay: true,
        };
        // 为了使绑定的值使用同一个地址，要更新spu_list
        emits("update:value", list);
      } else {
        // 不是编辑页，就是用户操作的，要更新值
        emits("update:value", props.value.concat(list));
      }
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
          value.marketing_org_stock = isDisplay
            ? props.value[index].gift_sku_list[key].marketing_org_stock
            : 1;
          value.marketing_stock = isDisplay
            ? props.value[index].gift_sku_list[key].marketing_stock
            : "-";
          value.sponsor = isDisplay
            ? props.value[index].gift_sku_list[key].sponsor
            : 1;
          value.platform_ratio = isDisplay
            ? props.value[index].gift_sku_list[key].platform_ratio
            : 100;
          value.shop_ratio = isDisplay
            ? props.value[index].gift_sku_list[key].shop_ratio
            : 0;
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
          value.db_id = isDisplay
            ? props.value[index].gift_sku_list[key].id
            : undefined;
          // 把dataSource挂到formData上面，因为有值要绑定
          formData.sku_goods.push(value);
        });
      });
    });
}

async function ratioRule(rule, value) {
  if (value.platform_ratio + value.shop_ratio !== 100) {
    return Promise.reject("成本承担比例之和要等于100%");
  } else {
    return Promise.resolve();
  }
}

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

async function siteIdsValueDelete(index) {
  let data;
  if (formData.sku_goods[index].db_id) {
    data = await axios.delete(
      `/api/marketing/fullGift/${editId}/gift/sku/${formData.sku_goods[index].db_id}`
    );
  }
  if (data && data.code !== 0) {
    message.error(data.msg);
    return;
  }
  let [delObj] = formData.sku_goods.splice(index, 1);
  // 在spu里面把删除的sku删掉
  props.value.forEach(({ sku_list, id }, index) => {
    props.value[index].sku_list = sku_list.filter((current) => {
      return !(delObj.spu_id === id && delObj.sku_id === current.id);
    });
  });
  // 重新设置合并单元格的参数
  props.value.forEach(({ sku_list }) => {
    sku_list.forEach((value, key) => {
      value.rowSpan = key === 0 ? sku_list.length : 0;
    });
  });
  // 当sku_list删到空的时候，要把spu删掉，也就是把弹窗的沟去掉
  props.value.forEach(({ sku_list, id }) => {
    if (sku_list.length === 0) {
      remove(selected.value.rows, (cur) => {
        return cur.id === id;
      });
      remove(selected.value.rowKeys, (cur) => {
        return cur === id;
      });
    }
  });
}

function platform_ratio_trigger(select, formComponent, index) {
  if (formData.sku_goods[index].sponsor === 1) {
    formData.sku_goods[index].platform_ratio = 100;
  } else if (formData.sku_goods[index].sponsor === 2) {
    formData.sku_goods[index].platform_ratio = 0;
  }
}

function shop_ratio_trigger(select, formComponent, index) {
  if (formData.sku_goods[index].sponsor === 1) {
    formData.sku_goods[index].shop_ratio = 0;
  } else if (formData.sku_goods[index].sponsor === 2) {
    formData.sku_goods[index].shop_ratio = 100;
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
