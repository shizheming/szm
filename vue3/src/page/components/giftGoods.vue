<template>
  <s-button @click="chooseGoods" style="margin-bottom: 10px">选择商品</s-button>
  <a-table
    rowKey="id"
    :pagination="false"
    :columns="columns"
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
      <template v-if="column.key === 'spu_img_url'">
        <a-image :width="50" :src="record.spu_img_url" />
      </template>
      <template v-if="column.key === 'sku_id'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.sku_id || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'shop_goods_id'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.shop_goods_id || "-" }}
        </div>
      </template>
      <template v-if="column.key === 'sku_spec_copy_data'">
        <template v-for="(item, index) in record.sku_list">
          <a-tooltip
            placement="top"
            :key="index"
            v-if="
              item.sku_spec_copy_data && item.sku_spec_copy_data.length > 15
            "
          >
            <template slot="title">
              <span>{{ item.sku_spec_copy_data || "-" }}</span>
            </template>
            <div class="sku_spec_copy_data">
              {{ item.sku_spec_copy_data || "-" }}
            </div>
          </a-tooltip>
          <div class="sku_spec_copy_data" v-else>
            {{ item.sku_spec_copy_data || "-" }}
          </div>
        </template>
      </template>
      <template v-if="column.key === 'stock'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.stock }}
        </div>
      </template>
      <template v-if="column.key === 'marketing_org_stock'">
        <div v-for="(item, index) in record.sku_list" :key="item.shop_goods_id">
          <a-input-number
            style="width: 80px"
            :min="0"
            placeholder="数量"
            v-model="item.marketing_org_stock"
          />
        </div>
      </template>
      <template v-if="column.key === 'marketing_stock'">
        <div v-for="(item, index) in record.sku_list" :key="item.shop_goods_id">
          {{ item.marketing_stock }}
        </div>
      </template>
      <template v-if="column.key === 'sponsor'">
        <div v-for="(item, index) in record.sku_list" :key="item.shop_goods_id">
          <a-select
            style="width: 130px"
            @change="(res) => onSponsorChange(res, record, item)"
            v-model="item.sponsor"
          >
            <a-select-option :value="1">平台</a-select-option>
            <a-select-option :value="2">销售企业</a-select-option>
            <a-select-option :value="3">平台+销售企业</a-select-option>
          </a-select>
        </div>
      </template>
      <template v-if="column.key === 'sponsor_rate'">
        <div v-for="(item, index) in record.sku_list" :key="item.shop_goods_id">
          <a-input-number
            style="width: 80px"
            :disabled="item.sponsor != 3"
            :min="0"
            :max="100"
            placeholder="平台"
            v-model="item.platform_ratio"
          />
          <a-input-number
            style="width: 80px"
            :disabled="item.sponsor != 3"
            :min="0"
            :max="100"
            placeholder="销售企业"
            v-model="item.shop_ratio"
          />
        </div>
      </template>
      <template v-if="column.key === 'shop_selling_price'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.shop_selling_price }}
        </div>
      </template>
      <template v-if="column.key === 'is_listing'">
        <div v-for="(item, index) in record.sku_list" :key="index">
          {{ item.is_listing == 1 ? "上架" : "下架" }}
        </div>
      </template>
      <template v-if="column.key === 'action'">
        <div v-for="(item, index) in record.sku_list" :key="item.shop_goods_id">
          <a
            href="javascript:;"
            class="table-button-red"
            @click="siteIdsValueDelete(indexF, index)"
            >删除</a
          >
        </div>
      </template>
    </template>
  </a-table>
  <ChooseGoods v-model:visible="visible" v-model:selected="selected" />
</template>

<script setup>
import { ref, toRefs, reactive, onMounted, inject, watch } from "vue";
import { message } from "ant-design-vue";
import axios from "../../api";
import ChooseGoods from "./chooseGoods.vue";
let formData = inject("formData");
const visible = ref(false);
const selected = ref();

watch(
  () => {
    return selected.value;
  },
  (newValue) => {
    let shop_spu_ids = newValue.rows.map((item) => {
      return item.shop_id + "-" + item.spu_id;
    });
    getShopList(shop_spu_ids);
  }
);

function getShopList(shop_spu_ids, init) {
  axios
    .post("/api/goods/list", {
      page: 1,
      page_size: 999,
      // 英文逗号分隔，
      // category（分类），
      // skuList.channelRelation（sku列表）,
      // skuList.channelRelation.gallery(相册)，
      // skuList.skuSpecCopy（规格），
      // goodsGallery（spu相册），
      required_data:
        "category,skuList.channelRelation,skuList.skuSpecCopy,goodsGallery",
      channel_id: 1, //渠道ID，目前固定只有一个
      is_cms: 1, // 拉取有店铺的商品列表
      get_stock: 1, //是否展示库存
      shop_spu_ids,
    })
    .then((res) => {
      let data = makeGoodsData(res.data.list);

      init && initMerge(data);
      !init && merge(data);
    });
}

const columns = [
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    fixed: "left",
  },
  {
    title: "商品图片", // 暂时没有
    dataIndex: "spu_img_url",
    key: "spu_img_url",
  },
  {
    title: "SPU ID",
    dataIndex: "spu_id",
    key: "spu_id",
  },
  {
    title: "商品编码",
    dataIndex: "sku_code",
    key: "sku_code",
  },
  {
    title: "货号",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "商品名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SKU ID",
    dataIndex: "sku_id",
    key: "sku_id",
  },
  {
    title: "shop_goods_id",
    dataIndex: "shop_goods_id",
    key: "shop_goods_id",
  },
  {
    title: "店铺售价(元)",
    dataIndex: "shop_selling_price",
    key: "shop_selling_price",
  },
  {
    title: "商品可用库存",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "活动数量",
    dataIndex: "marketing_org_stock",
    key: "marketing_org_stock",
  },
  {
    title: "剩余活动数量",
    dataIndex: "marketing_stock",
    key: "marketing_stock",
  },
  {
    title: "成本承担方",
    dataIndex: "sponsor",
    key: "sponsor",
  },
  {
    title: "成本承担比例(%)",
    dataIndex: "sponsor_rate",
    key: "sponsor_rate",
  },
  {
    title: "规格",
    dataIndex: "sku_spec_copy_data",
    key: "sku_spec_copy_data",
  },
  {
    title: "状态",
    dataIndex: "is_listing",
    key: "is_listing",
  },
  {
    title: "店铺名称",
    dataIndex: "shop_name",
    key: "shop_name",
  },
  {
    title: "店铺ID",
    dataIndex: "shop_id",
    key: "shop_id",
  },
  {
    title: "供应商名称",
    dataIndex: "supplier_name",
    key: "supplier_name",
  },
  {
    title: "供应商编码",
    dataIndex: "supplier_id",
    key: "supplier_id",
  },
];
const dataSource = ref();
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

function siteIdsValueDelete() {}

// 新增商品和旧dataSource.value 数据合并，解决已有spu下添加sku问题
function merge(data) {
  if (!data.length) return;
  if (!dataSource.value?.length) {
    dataSource.value = data.map((record) => {
      return {
        ...record,
        sku_list: record.sku_list.map((item) => {
          return {
            ...item,
            marketing_org_stock: 0,
            marketing_stock: "-",
            sponsor: 1,
            platform_ratio: 100,
            shop_ratio: 0,
          };
        }),
      };
    });
    console.log(dataSource.value, 1000);
    return;
  }
  // 上一次data数据
  let old_shop_spu_ids = dataSource.value.map((item) => {
    return item.shop_id + "-" + item.spu_id;
  });
  // 本次筛选的data数据
  let new_shop_spu_ids = data.map((item) => {
    return item.shop_id + "-" + item.spu_id;
  });

  data.forEach((spu) => {
    let index = old_shop_spu_ids.indexOf(spu.shop_id + "-" + spu.spu_id);

    if (index == -1) {
      dataSource.value.push({
        ...spu,
        sku_list: spu.sku_list.map((sku) => {
          return {
            ...sku,
            marketing_org_stock: 0,
            marketing_stock: "-",
            sponsor: 1,
            platform_ratio: 100,
            shop_ratio: 0,
          };
        }),
      });
    } else {
      let shop_goods_ids = dataSource.value[index].sku_list.map((sku) => {
        return sku.shop_goods_id;
      });

      spu.sku_list.forEach((sku) => {
        if (shop_goods_ids.indexOf(sku.shop_goods_id) == -1) {
          dataSource.value[index].sku_list.push({
            ...sku,
            marketing_org_stock: 0,
            marketing_stock: "-",
            sponsor: 1,
            platform_ratio: 100,
            shop_ratio: 0,
          });
        }
      });
    }
  });
}

// 编辑初始化数据
function initMerge(data) {
  // 数据库存储spu
  let db_shop_spu_ids = this.spu_list.map((item) => {
    return item.shop_spu_id;
  });

  data.forEach((spu) => {
    let index = db_shop_spu_ids.indexOf(spu.shop_id + "-" + spu.spu_id);

    if (index == -1) return;
    let sku_list = [];
    let shop_goods_ids = this.spu_list[index].gift_sku_list.map((sku) => {
      return sku.shop_goods_id;
    });

    spu.sku_list.forEach((sku) => {
      let i = shop_goods_ids.indexOf(sku.shop_goods_id);

      if (i != -1) {
        sku_list.push({
          ...sku,
          db_id: this.spu_list[index].gift_sku_list[i].id,
          marketing_stock:
            this.spu_list[index].gift_sku_list[i].marketing_stock,
          marketing_org_stock:
            this.spu_list[index].gift_sku_list[i].marketing_org_stock,
          sponsor: this.spu_list[index].gift_sku_list[i].sponsor,
          platform_ratio: this.spu_list[index].gift_sku_list[i].platform_ratio,
          shop_ratio: this.spu_list[index].gift_sku_list[i].shop_ratio,
        });
      }
    });
    dataSource.value.push({
      ...spu,
      db_id: this.spu_list[index].id,
      sku_list,
    });
  });
}

function makeGoodsData(list) {
  list.forEach((item, index) => {
    item.key = index + "";
    let shop_selling_price = [];
    let spu_img_url = "";
    let stock = 0;

    item.spu_id = item.id;
    item.unique_id = item.shop_id ? item.id + "_" + item.shop_id : item.id;
    item.shop_spu_id = item.shop_id
      ? item.shop_id + "-" + item.spu_id
      : item.spu_id;
    // spu第一张图片
    if (
      item.goods_gallery &&
      item.goods_gallery.length &&
      item.goods_gallery[0].img_url &&
      !spu_img_url
    ) {
      spu_img_url = item.goods_gallery[0].img_url;
    }

    if (item.sku_list && item.sku_list.length > 0) {
      item.sku_list.forEach((itemC, indexC) => {
        // 活动spu_库存
        stock = stock + (itemC.stock || 0);
        itemC.sku_id = itemC.id;
        // 活动现有库存
        itemC.stock_text = 0;
        itemC.stock = itemC.stock || 0;
        itemC.sku_spec_copy_data = makeSpecCopy(itemC.sku_spec_copy);
        itemC.shop_selling_price = "-";

        if (itemC.channel_relation && itemC.channel_relation.length > 0) {
          item.shop_org_id = itemC.channel_relation[0].shop_org_id; //shop_org_id=1销售组织名气家
          itemC.is_listing = itemC.channel_relation[0].is_listing;
          itemC.shop_is_listing = itemC.channel_relation[0].shop_is_listing;
          itemC.shop_goods_id = itemC.channel_relation[0].shop_goods_id;
          itemC.shop_selling_price =
            itemC.channel_relation[0].shop_selling_price; // 店铺售价
          itemC.shop_retail_price = itemC.channel_relation[0].shop_retail_price; // 经销价
          shop_selling_price.push(
            itemC.channel_relation[0].shop_selling_price || 0
          );
          if (
            itemC.channel_relation[0].points &&
            itemC.channel_relation[0].points.length
          ) {
            itemC.shop_exchange_price =
              itemC.channel_relation[0].points[0].exchange_price; //兑换价格
            itemC.shop_exchange_score =
              itemC.channel_relation[0].points[0].exchange_score; //兑换积分
          }
        }
      });
    }
    item.stock = stock;
    item.spu_img_url = spu_img_url;
    // 商品价格（每个sku都有一个价格-取区间）
    item.shop_selling_price = makeSellPrice(shop_selling_price);
  });
  return list;
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
