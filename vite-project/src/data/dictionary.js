// 订单状态
export const ORDER_STATUS = [
  {
    label: "待支付",
    value: "0",
  },
  {
    label: "定金支付",
    value: "10",
  },
  {
    label: "待确认",
    value: "20",
  },
  {
    label: "待审核",
    value: "25",
  },
  {
    label: "待转单",
    value: "26",
  },
  {
    label: "待发货",
    value: "30",
  },
  {
    label: "已发货",
    value: "40",
  },
  {
    label: "已完成",
    value: "50",
  },
  {
    label: "售后中",
    value: "60,80",
  },
  {
    label: "已关闭",
    value: "105,106,107,110",
  },
];

// 支付状态
export const PAY_STATUS = [
  {
    label: "未支付",
    value: 1,
  },
  {
    label: "已支付",
    value: 3,
  },
];

// 发货状态
export const DELIVERY_STATUS = [
  {
    label: "未发货",
    value: 1,
  },
  {
    label: "已发货",
    value: 2,
  },
  {
    label: "已签收",
    value: 3,
  },
];

// 用户等级
export const USER_LEVEL = [
  {
    label: "银牌会员",
    value: 0,
  },
  {
    label: "黄金会员",
    value: 299,
  },
  {
    label: "铂金会员",
    value: 598,
  },
  {
    label: "钻石会员",
    value: 798,
  },
];
