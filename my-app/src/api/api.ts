// api层
// 字典api
// 供应商
export const SUPPLIER_API_STRING = '/api/stock/supplier/get-all/list';
// 类目
export const CATEGORY_API_STRING = '/api/goods/category';
// 品牌
export const BRAND_API_STRING = '/api/goods/brand/list';
// 通用
export const DICT_API_STRING = '/api/order/dict';
// 站点
export const SITE_API_STRING = '/api/sys/site';
// 组织
export const ORG_API_STRING = '/api/sys/org';
// 地址
export const AREA_API_STRING = '/api/common/area';

// 弹框api
// 用户
export const USER_API_STRING = '/api/proxy/user/User/UserSearch/epUserSearch';
// sku商品列表
export const SKU_API_STRING = '/api/goods/sku/list';
// 发票抬头
export const INVOICE_TITLE_STRING =
  '/api/proxy/order/config/invoiceTitle/getList';
// 订单
export const ORDER_STRING = '/api/proxy/order/Manage/query/searchOrder';
// 查看任务
export const TASK_STRING = '/api/order/orderSyncList';
// 查看日志
export const LOG_STRING = '/api/order/getFileByUrl';
// 批量修改备注
export const BATCH_REMARK_STRING = '/api/order/merchant-remark/batch';
// 配送安装时间列表
export const SERVER_INFO_REMARK_STRING =
  '/api/proxy/order/manage/query/getServerInfo';
// 配送安装选择时间列表
export const ORDER_PLANS_STRING =
  '/api/proxy/order/Order/assistant/queryOrderPlansByOslSeq';
// 预订购确认
export const CONFIRM_PRE_ORDER_STRING = '/api/proxy/order/manage/edit/confirmPreOrder';
