import { YES_NO_ENUM } from "../../../data/dictionary";
export const columns = [
  {
    title: "操作",
    dataIndex: "opration",
    key: "opration",
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
    customRender({ text }: { text: number }) {
      return YES_NO_ENUM[text];
    },
  },
  {
    title: "是否分销订单",
    dataIndex: "distribute_order",
    key: "distribute_order",
    customRender({ text }: { text: number }) {
      return ["否", "是"][text];
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
    customRender({ text }: { text: number }) {
      return ["否", "是"][text];
    },
  },
  {
    title: "订单商品来源",
    dataIndex: "goods_source",
    key: "goods_source",
    customRender({ text }: { text: number }) {
      return ["自建商品", "选品池商品"][text];
    },
  },
];
