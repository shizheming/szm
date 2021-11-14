import {returnedMerchandise} from './returnedMerchandise';
import {noReturnOnlyRefund} from './noReturnOnlyRefund';
export {rules} from './rules';
export {hide} from './hide';
export {disabled} from './disabled';

export const group = {
  returnedGoods: [
    'returnMethod',
    'goodMoney=>isReturnSupplier',
    'goodMoney=>con_type',
    'mArea',
    'goodMoney=>address',
    'goodMoney=>name',
    'goodMoney=>mobile'
  ],
  noReturnOnlyRefund: [
    'max_freight',
    'freight_return_money',
    'freight_card_ticket_fee',
    'goodMoney=>real_return_freight',
    'good_return_money',
    'good_card_ticket_fee',
    'goodMoney=>real_return_goods_amount',
    'extra_fee_return_money',
    'extra_fee_card_ticket_fee',
    'service_fee',
    'goodMoney=>difference_amount_reason',
    'totalMoney',
    'goodMoney=>verify_return_reason'
  ]
};

// 备注的不同状态-处理备注-审核备注
// 所以状态不只有显示隐藏编辑不可编辑这四种

// 我刚刚又有一个想法，就是配的每个数据都是一个组件对么，然后就是用面向对象的思想来做，对象就是实体，我想把名字，是什么，状态一些基本的概念都写在配的组件里面，使他形成一个整体，一个独立的实体对象，而不是要去看逻辑代码才能搞明白某个组件是怎么变化的

// 然后我转念一想，这不就是我现在在写的关系表么，但是还是不一样的，我以实体位出发点，以独立的对象为出发点，那么自己的一些信息，比如名字状态这些就属于自己内部的东西，而关系表是外部的是对象与对象之间的

export const form = [
  {
    label: {
      props: {
        label: '审核结果'
      }
    },
    content: {
      type: 'radio',
      props: {
        options: [
          {
            label: '退回商品',
            value: 2
          },
          {
            label: '不退货仅退款',
            value: 100
          }
        ]
      },
      value: 'afterSaleType'
    }
  },
  ...noReturnOnlyRefund,
  ...returnedMerchandise,
  {
    label: {
      props: {
        label: '审核备注'
      }
    },
    content: {
      type: 'textarea',
      props: {
        placeholder: '备注'
      },
      value: 'verify_remark'
    },
    state: {
      label: {
        a: '审核备注',
        b: '处理备注'
      }
    }
  }
];