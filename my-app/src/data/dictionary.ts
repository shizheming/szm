import { optionsEnum } from "../utils/tool";
// 订单状态
enum ORDER_STATUS_ENUM {
  待支付 = "0",
  定金支付 = "10",
  待审核 = "25",
  待转单 = "26",
  待发货 = "30",
  已发货 = "40",
  已完成 = "50",
  售后中 = "60,80",
  已关闭 = "105,106,107,110",
}
export const ORDER_STATUS = optionsEnum(ORDER_STATUS_ENUM);

// 支付状态
enum PAY_STATUS_ENUM {
  未支付 = 1,
  已支付 = 3,
}

export const PAY_STATUS = optionsEnum(PAY_STATUS_ENUM);

// 发货状态
enum DELIVERY_STATUS_ENUM {
  未发货 = 1,
  已发货,
  已签收,
}
export const DELIVERY_STATUS = optionsEnum(DELIVERY_STATUS_ENUM);

// 用户等级
enum USER_LEVEL_ENUM {
  银牌会员,
  黄金会员 = 299,
  铂金会员 = 599,
  钻石会员 = 798,
}
export const USER_LEVEL = optionsEnum(USER_LEVEL_ENUM);
