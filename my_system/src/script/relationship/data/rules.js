export const rules = {
  'goodMoney=>real_return_freight': [
    {
      required: true,
      message: '运费退款金额(非紫荆卡抵扣部分)'
    }
  ],
  'goodMoney=>real_return_goods_amount': [
    {
      required: true,
      message: '售后商品实退金额(非紫荆卡抵扣部分)'
    }
  ],
  'goodMoney=>difference_amount_reason': [
    {
      required: true,
      message: '请选择差额原因'
    }
  ],
  'goodMoney=>verify_return_reason': [
    {
      required: true,
      message: '请选择实际售后原因'
    }
  ],
  verify_remark: [
    {
      required: true,
      message: '请填写备注'
    },
    {
      pattern: /^.{0,500}$/,
      message: '请在500个字符之内'
    }
  ],
  'goodMoney=>supplier_id': [
    {
      required: true,
      message: '请选择退回供应商'
    }
  ],
  'goodMoney=>con_type': [
    {
      required: true,
      message: '请选择退回地址类型'
    }
  ],
  mArea: [
    {
      required: true,
      message: '请选择收货地址'
    },
    {
      validator (rule, value, c) {
        if (!value) {
          c('请选择收货地址');
        } else if (Object.values(value).some(current => current === undefined)) {
          c('请填全省市区');
        } else c();
      }
    }
  ],
  allAddr: [
    {
      required: false,
      message: '请填写详细地址'
    }
  ],
  'goodMoney=>address': [
    {
      required: true,
      message: '请填写详细地址'
    }
  ],
  'goodMoney=>name': [
    {
      required: true,
      message: '请填写商家收件人'
    }
  ],
  'goodMoney=>mobile': [
    {
      required: true,
      message: '请填写联系手机/座机'
    }
  ]
};