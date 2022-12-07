import { optionsEnum } from '../utils/tool';

// 排序
export enum SORT_ENUM {
  descend,
  ascend,
}

// 是否
export enum WHETHER_ENUM {
  否,
  是,
}
export const WHETHER_OPTIONS = optionsEnum(WHETHER_ENUM);

// 有无
export enum YES_NO_ENUM {
  无,
  有,
}
export const YES_NO_OPTIONS = optionsEnum(YES_NO_ENUM);

// 订单状态
export enum ORDER_STATUS_ENUM {
  待支付 = '0',
  定金支付 = '10',
  待审核 = '25',
  待转单 = '26',
  待发货 = '30',
  已发货 = '40',
  已完成 = '50',
  售后中 = '60,80',
  已关闭 = '105,106,107,110',
}
export const ORDER_STATUS_OPTIONS = optionsEnum(ORDER_STATUS_ENUM);

// 支付状态
export enum PAY_STATUS_ENUM {
  未支付 = 1,
  已支付 = 3,
}

export const PAY_STATUS_OPTIONS = optionsEnum(PAY_STATUS_ENUM);

// 发货状态
export enum DELIVERY_STATUS_ENUM {
  未发货 = 1,
  已发货,
  已签收,
}
export const DELIVERY_STATUS_OPTIONS = optionsEnum(DELIVERY_STATUS_ENUM);

// 用户等级
export enum USER_LEVEL_ENUM {
  银牌会员,
  黄金会员 = 299,
  铂金会员 = 599,
  钻石会员 = 798,
}
export const USER_LEVEL_OPTIONS = optionsEnum(USER_LEVEL_ENUM);

// 来源终端
export enum SOURCE_TERMINAL_ENUM {
  PC = 'p',
  IOS = 'i',
  Android = 'a',
  H5 = 'h5',
  小程序 = 'mp',
}
export const SOURCE_TERMINAL_OPTIONS = optionsEnum(SOURCE_TERMINAL_ENUM);

// 配送方式
export enum DELIVERY_METHOD_ENUM {
  无需,
  快递,
  自提,
}
export const DELIVERY_METHOD_OPTIONS = optionsEnum(DELIVERY_METHOD_ENUM);

// 录入方式
export enum ENTRY_METHOD_EUNM {
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
export const ENTRY_METHOD_OPTIONS = optionsEnum(ENTRY_METHOD_EUNM);

// 支付方式
export enum PAYMENT_METHOD_ENUM {
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
export const PAYMENT_METHOD_OPTIONS = optionsEnum(PAYMENT_METHOD_ENUM);

// 支付类型
export enum PAYMENT_TASK_CLASS_ENUM {
  '预付款-线上',
  '预付款-线下',
  现结,
  月结 = 4,
}
export const PAYMENT_TYPE_OPTIONS = optionsEnum(PAYMENT_TASK_CLASS_ENUM);

// 发票
export enum IS_INVOICE_ENUM {
  开,
  不开,
}
export const IS_INVOICE_OPTIONS = optionsEnum(IS_INVOICE_ENUM);

// 订单商品来源
export enum ORDER_GOODS_SOURCE_ENUM {
  自建,
  选品池,
}
export const ORDER_GOODS_SOURCE_OPTIONS = optionsEnum(ORDER_GOODS_SOURCE_ENUM);

// 营销活动明细
export enum DETAIL_OF_MARKETING_ACTIVITIES_ENUM {
  普通 = '',
  拼团 = 'pintuan001',
  秒杀 = 'miaosha001',
  抽奖 = 'choujiang001',
  满N元减 = 'manyuanjian001',
  满N元折 = 'manyuanzhe001',
  满N件减 = 'manjianjian001',
  以旧换新 = 'jiuhuanxin001',
  满N件折 = 'manjianzhe001',
  积分兑换 = 'jifen001',
  满赠 = 'manyuanzeng001',
  新人特价 = 'xinrentejia001',
  拼单预售 = 'pindanyushou',
}
export const DETAIL_OF_MARKETING_ACTIVITIES_OPTIONS = optionsEnum(
  DETAIL_OF_MARKETING_ACTIVITIES_ENUM
);

// 订单类型
export enum ORDER_TASK_CLASS_ENUM {
  普通 = 1,
  供应商直送 = 5,
  自提 = 6,
}
export const ORDER_TYPE_OPTIONS = optionsEnum(ORDER_TASK_CLASS_ENUM);

// 业务模式
export enum BUSINESS_MODEL_ENUM {
  精选 = 1,
  紫荆,
}
export const BUSINESS_MODEL_OPTIONS = optionsEnum(BUSINESS_MODEL_ENUM);

// 拼团状态
export enum GROUPING_STATUS_ENUM {
  进行中 = 1,
  成功,
  失败,
}
export const GROUPING_STATUS_OPTIONS = optionsEnum(GROUPING_STATUS_ENUM);

// 任务类
export enum TASK_CLASS_ENUM {
  导出订单明细 = 2,
  导出发货信息 = 6,
}
export const TASK_CLASS_OPTIONS = optionsEnum(TASK_CLASS_ENUM);

// 商品形式
export enum GOODS_FORM_ENUM {
  普通 = 0,
  组合 = 1,
  b = '',
}

// user-info
export const USER_INFO = JSON.parse(localStorage.getItem('userInfo') as string);

// 增值税发票类型
export enum VAT_INVOICE_TYPE_ENMU {
  专用发票 = 2,
  电子普通发票,
}
export const VAT_INVOICE_TYPE_OPTIONS = optionsEnum(VAT_INVOICE_TYPE_ENMU);

// 发票抬头类型
export enum INVOICE_HEADER_TYPE_ENMU {
  个人 = 1,
  单位 = 2,
}
export const INVOICE_HEADER_TYPE_OPTIONS = optionsEnum(
  INVOICE_HEADER_TYPE_ENMU
);
