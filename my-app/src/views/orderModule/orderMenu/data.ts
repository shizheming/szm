import {
  YES_NO_ENUM,
  WHETHER_ENUM,
  GOODS_SOURCE_ENUM,
} from "../../../data/dictionary";
import { TableColumn, TableColumnsType } from "ant-design-vue";
export const columns: TableColumnsType = [
  {
    title: "操作",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
  {
    title: "订单编号",
    dataIndex: "osl_seq",
    key: "order",
  },
  {
    title: "订单状态",
    dataIndex: ["sub_status", "name"],
    key: "sub_status.name",
  },
  {
    title: "订单类型",
    dataIndex: ["order_type", "name"],
    key: "order_type.name",
  },
  {
    title: "本地服务",
    dataIndex: "is_support_local",
    key: "is_support_local",
    customRender({ text }) {
      return YES_NO_ENUM[text];
    },
  },
  {
    title: "是否分销订单",
    dataIndex: "distribute_order",
    key: "distribute_order",
    customRender({ text }) {
      return WHETHER_ENUM[text];
    },
  },
  {
    title: "订单金额合计",
    dataIndex: "sub_total_amount",
    key: "sub_total_amount",
    sorter: true,
  },
  {
    title: "运费金额",
    dataIndex: "sub_total_freight",
    key: "sub_total_freight",
  },
  {
    title: "附加服务费",
    dataIndex: "sub_extra_fee",
    key: "sub_extra_fee",
  },
  {
    title: "外部系统订单创建时间",
    dataIndex: "order_time",
    key: "order_time",
    sorter: true,
  },
  {
    title: "系统订单创建时间",
    dataIndex: "create_datetime",
    key: "create_datetime",
  },
  {
    title: "销售店铺",
    dataIndex: "shop_name",
    key: "shop_name",
  },
  {
    title: "预订购",
    dataIndex: "is_pre_subscribe",
    key: "is_pre_subscribe",
    customRender({ text }) {
      return WHETHER_ENUM[text];
    },
  },
  {
    title: "订单商品来源",
    dataIndex: "goods_source",
    key: "goods_source",
    customRender({ text }) {
      return GOODS_SOURCE_ENUM[text];
    },
  },
];

export const goodsColumns: TableColumnsType = [
  {
    title: "图片",
    dataIndex: "pic",
    key: "pic",
  },
  {
    title: "商品名称",
    dataIndex: "goods_name",
    key: "goods_name",
  },
  {
    title: "商品编码",
    dataIndex: "sku_code",
    key: "sku_code",
  },
  {
    title: "店铺商品编码",
    dataIndex: "shop_goods_code",
    key: "shop_goods_code",
  },
  {
    title: "货号",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "规格/属性",
    dataIndex: "sku_specs",
    key: "sku_specs",
  },
  {
    title: "品牌",
    dataIndex: "brand_name",
    key: "brand_name",
  },
  {
    title: "类目",
    dataIndex: "category_id",
    key: "category_id",
  },
  {
    title: "销售单价",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "购买数量",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "单位",
    dataIndex: "sale_unit",
    key: "sale_unit",
  },
  {
    title: "购买金额（元）",
    dataIndex: "buy_amount",
    key: "buy_amount",
  },
  {
    title: "附加费用（元）",
    dataIndex: "item_extra_fee",
    key: "item_extra_fee",
  },
];

export const taskColumns: TableColumnsType = [
  {
    title: "任务编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "任务类型",
    dataIndex: "type_format",
    key: "type_format",
  },
  {
    title: "操作人",
    dataIndex: "operator",
    key: "operator",
  },
  {
    title: "任务状态",
    dataIndex: "status_format",
    key: "status_format",
  },
  {
    title: "操作时间",
    dataIndex: "operate_time",
    key: "operate_time",
  },
  {
    title: "总记录数",
    dataIndex: "total_num",
    key: "total_num",
  },
  {
    title: "成功记录数",
    dataIndex: "success_num",
    key: "success_num",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
