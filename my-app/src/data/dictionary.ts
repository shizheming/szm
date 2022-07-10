import { optionsEnum } from "../utils/tool";

// 是否
enum WHETHER_ENUM {
  否,
  是,
}
export const WHETHER_OPTIONS = optionsEnum(WHETHER_ENUM);

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
export const ORDER_STATUS_OPTIONS = optionsEnum(ORDER_STATUS_ENUM);

// 支付状态
enum PAY_STATUS_ENUM {
  未 = 1,
  已 = 3,
}

export const PAY_STATUS_OPTIONS = optionsEnum(PAY_STATUS_ENUM);

// 发货状态
enum DELIVERY_STATUS_ENUM {
  未发货 = 1,
  已发货,
  已签收,
}
export const DELIVERY_STATUS_OPTIONS = optionsEnum(DELIVERY_STATUS_ENUM);

// 用户等级
enum USER_LEVEL_ENUM {
  银牌会员,
  黄金会员 = 299,
  铂金会员 = 599,
  钻石会员 = 798,
}
export const USER_LEVEL_OPTIONS = optionsEnum(USER_LEVEL_ENUM);

// 来源终端
enum APP_PLATFORM_ENUM {
  PC = "p",
  IOS = "i",
  Android = "a",
  H5 = "h5",
  小程序 = "mp",
}
export const APP_PLATFORM_OPTIONS = optionsEnum(APP_PLATFORM_ENUM);

// 配送方式
enum DELIVERY_MODE_ENUM {
  无需,
  快递,
  自提,
}
export const DELIVERY_MODE_OPTIONS = optionsEnum(DELIVERY_MODE_ENUM);

// 录入方式
enum CREATE_MODE_EUNM {
  外部接口表 = 1,
  批量导入 = 2,
  自建电商平台 = 6,
  补发 = 7,
  运营后台代客下单 = 3,
  店铺后台代客下单 = 9,
  时刻助手代客下单 = 10,
  导入历史订单 = 12,
  选品池同步 = 13,
}
export const CREATE_MODE_OPTIONS = optionsEnum(CREATE_MODE_EUNM);

// 支付方式
enum PAY_TYPE_ENUM {
  无现金 = 0,
  积分 = 12,
  微信 = 13,
  支付宝 = 14,
  微信H5 = 16,
  小程序 = 17,
  微信公众号 = 23,
  POS = 24,
  网付通银联在线 = 30,
  现金 = 100,
  紫荆卡 = 200,
  名气e卡 = 201,
}
export const PAY_TYPE_OPTIONS = optionsEnum(PAY_TYPE_ENUM);

// 支付类型
enum PAYMENT_TYPE_ENUM {
  "预付款-线上",
  "预付款-线下",
  现结,
  月结 = 4,
}
export const PAYMENT_TYPE_OPTIONS = optionsEnum(PAYMENT_TYPE_ENUM);

// 发票
enum IS_INVOICE_ENUM {
  开,
  不开,
}
export const IS_INVOICE_OPTIONS = optionsEnum(IS_INVOICE_ENUM);

// 订单商品来源
enum GOODS_SOURCE_ENUM {
  自建,
  选品池,
}
export const GOODS_SOURCE_OPTIONS = optionsEnum(GOODS_SOURCE_ENUM);
