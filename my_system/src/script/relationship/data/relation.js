export const allrelation = {
  'goodMoney=>isReturnSupplier': [
    {
      be: 'state',
      name: 'isReturnSupplier',
      relationship: [
        {
          // 有一有多，把一变成多，就不用判断了，判断太麻烦
          component: 'goodMoney=>supplier_id',
          state: 'isShow'
        }
        /* {
          component: 'goodMoney=>con_type',
          state: ['options-a', 'options-b']
        } */
      ]
    }
  ],
  'goodMoney=>con_type': [
    {
      be: 'state',
      name: 'con_type',
      components: [
        {
          component: 'allAddr',
          // 接着做isRequired
          state: ['isShow', 'isRequired']
        }
      ]
    }
  ]
};
/* export const allrelation = {
  // 一对多的状态，之前是一对一的状态
  // 这个名字说明这个字段组件在change事件是有交互效果
  // 设定是当前只能存在一种状态
  // 把name的字符串变成函数，直接写上去，同时支持写字符串和函数，想写哪儿就写哪儿
  // 每个地方都需要连带，做自己的事情同时连带做额外的事情，就像基础状态后面的依附函数一样
  afterSaleType: [
    {
      be: 'state',
      name: 'afterSaleType',
      // type: 'displayCurrentShow', //displayCurrentEdit
      type: 'multiple',
      components: [
        {
          component: 'returnedGoods-noReturnOnlyRefund',
          state: ['isEdit','displayCurrentShow']//业有连带
        },
        {
          component: 'verify_remark',
          state: ['label-a', 'label-b']
        }
      ]
    }
  ],
  'goodMoney=>isReturnSupplier': [
    {
      be: 'state',
      name: 'isReturnSupplier',
      type: 'multiple',
      components: [
        {
          component: 'goodMoney=>supplier_id',
          state: ['isShow', 'options-a']
        },
        {
          component: 'goodMoney=>con_type',
          state: ['options-a', 'options-b']
        }
      ]
    }
  ],
  'goodMoney=>supplier_id': [
    {
      be: 'linkage',
      name: 'supplierIdChange',
      relationship: {
        be: 'judge',
        name: 'isConType3',
        relationship: [
          {
            name: 'goodMoney=>con_type'
          }
        ]
      }
    }
  ],
  'goodMoney=>con_type': [
    {
      be: 'state',
      name: 'con_type',
      type: 'multiple',
      components: [
        {
          component: 'allAddr',
          // 接着做isRequired
          state: ['isShow', 'allAddrAttachmentSow', 'isRequired']
        }
      ]
    }
  ],
  allAddr: [
    {
      be: 'linkage',
      name: 'allAddrChange'
    }
  ]
}; */