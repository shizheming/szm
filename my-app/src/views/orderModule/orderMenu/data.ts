import { TableColumn, TableColumnsType } from 'ant-design-vue';
export const orderListPageTableColumnsArray: TableColumnsType = [
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
  {
    title: '订单编号',
    dataIndex: 'osl_seq',
    key: 'osl_seq',
  },
  {
    title: '订单状态',
    dataIndex: ['sub_status', 'name'],
    key: 'sub_status.name',
  },
  {
    title: '订单类型',
    dataIndex: ['order_type', 'name'],
    key: 'order_type.name',
  },
  {
    title: '本地服务',
    dataIndex: 'is_support_local_name',
    key: 'is_support_local_name',
  },
  {
    title: '是否分销订单',
    dataIndex: 'distribute_order_name',
    key: 'distribute_order_name',
  },
  {
    title: '订单金额合计',
    dataIndex: 'sub_total_amount',
    key: 'sub_total_amount',
    sorter: true,
  },
  {
    title: '运费金额',
    dataIndex: 'sub_total_freight',
    key: 'sub_total_freight',
  },
  {
    title: '附加服务费',
    dataIndex: 'sub_extra_fee',
    key: 'sub_extra_fee',
  },
  {
    title: '外部系统订单创建时间',
    dataIndex: 'order_time',
    key: 'order_time',
    sorter: true,
  },
  {
    title: '系统订单创建时间',
    dataIndex: 'create_datetime',
    key: 'create_datetime',
  },
  {
    title: '销售店铺',
    dataIndex: 'shop_name',
    key: 'shop_name',
  },
  {
    title: '预订购',
    dataIndex: 'is_pre_subscribe_name',
    key: 'is_pre_subscribe_name',
  },
  {
    title: '订单商品来源',
    dataIndex: 'goods_source_name',
    key: 'goods_source_name',
    ellipsis: true,
  },
];

export const orderListPageGoodsTableColumnsArray: TableColumnsType = [
  {
    title: '图片',
    dataIndex: 'pic',
    key: 'pic',
  },
  {
    title: '商品名称',
    dataIndex: 'goods_name',
    key: 'goods_name',
  },
  {
    title: '商品编码',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '店铺商品编码',
    dataIndex: 'shop_goods_code',
    key: 'shop_goods_code',
  },
  {
    title: '货号',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: '规格/属性',
    dataIndex: 'sku_specs',
    key: 'sku_specs',
  },
  {
    title: '品牌',
    dataIndex: 'brand_name',
    key: 'brand_name',
  },
  {
    title: '类目',
    dataIndex: 'category_name',
    key: 'category_name',
  },
  {
    title: '销售单价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '购买数量',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: '单位',
    dataIndex: 'sale_unit',
    key: 'sale_unit',
  },
  {
    title: '购买金额（元）',
    dataIndex: 'buy_amount',
    key: 'buy_amount',
  },
  {
    title: '附加费用（元）',
    dataIndex: 'item_extra_fee',
    key: 'item_extra_fee',
  },
];

export const orderFormPageGoodsTableColumnsArray: TableColumnsType = [
  {
    title: '操作',
    dataIndex: 'opration',
    key: 'opration',
    // fixed: 'right',
  },
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '主图',
    dataIndex: 'imgSrc',
    key: 'imgSrc',
  },
  {
    title: '商品名称',
    dataIndex: 'spu_name',
    key: 'spu_name',
  },
  {
    title: '商品编码',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '货号',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: '商品类型',
    dataIndex: 'sku_type_name',
    key: 'sku_type_name',
  },
  {
    title: '商品形式',
    dataIndex: 'is_suit',
    key: 'is_suit',
  },
  {
    title: '店铺商品编码',
    dataIndex: 'shop_goods_code',
    key: 'shop_goods_code',
  },
  {
    title: '销售店铺',
    dataIndex: 'shop_name',
    key: 'shop_name',
  },
  {
    title: '规格属性',
    dataIndex: 'sku_specs',
    key: 'sku_specs',
  },

  {
    title: '品牌',
    dataIndex: 'brand_name',
    key: 'brand_name',
  },
  {
    title: '类目',
    dataIndex: 'category_name',
    key: 'category_name',
  },
  {
    title: '订购单位',
    dataIndex: 'pack_unit',
    key: 'pack_unit',
  },
  {
    title: '可售库存',
    dataIndex: 'real_qty',
    key: 'real_qty',
  },
  {
    title: '订购数量',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: '定价方式',
    dataIndex: 'member_price_name',
    key: 'member_price_name',
  },
  {
    title: '销售单价',
    dataIndex: 'shopSellingPriceComputedRef',
    key: 'shopSellingPriceComputedRef',
  },
  {
    title: '购买单价',
    dataIndex: 'current_selling_price',
    key: 'current_selling_price',
  },
  {
    title: '改价优惠金额',
    dataIndex: 'adjustMountComputedRef',
    key: 'adjustMountComputedRef',
  },
  {
    title: '购买金额',
    dataIndex: 'purchaseAmount',
    key: 'purchaseAmount',
  },
];

export const orderFormPageGoodsLadderPriceTableColumnsArray: TableColumnsType =
  [
    {
      title: '订购数量',
      dataIndex: 'start_num_name',
      key: 'start_num_name',
    },
    {
      title: '销售单价',
      dataIndex: 'member_price',
      key: 'member_price',
    },
  ];

export const supplementaryInvoiceFormPageTableColumnsArray: TableColumnsType = [
  {
    title: '支付状态',
    dataIndex: 'pay_status_name',
    key: 'pay_status_name',
  },
  {
    title: '发货状态',
    dataIndex: 'sub_status_name',
    key: 'sub_status_name',
  },
  {
    title: '商品实付金额',
    dataIndex: 'money_sub_total_pay',
    key: 'money_sub_total_pay',
  },
  {
    title: '销售店铺',
    dataIndex: 'shop_name',
    key: 'shop_name',
  },
  {
    title: '销售组织',
    dataIndex: 'sub_org_name',
    key: 'sub_org_name',
  },
  {
    title: '剩余可申请开票金额',
    dataIndex: 'money_allow_invoice_amount',
    key: 'money_allow_invoice_amount',
  },
  {
    title: '订单创建时间',
    dataIndex: 'create_datetime',
    key: 'create_datetime',
  },
  {
    title: '录入方式',
    dataIndex: 'create_mode_name',
    key: 'create_mode_name',
  },
  {
    title: '订单编号',
    dataIndex: 'osl_seq',
    key: 'osl_seq',
  },
];
