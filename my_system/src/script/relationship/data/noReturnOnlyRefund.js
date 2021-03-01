// 不退货仅退款
export const noReturnOnlyRefund = [
  {
    label: {
      props: {
        label: '运费最大可退款金额'
      }
    },
    content: {
      type: 'input',
      value: 'max_freight'
    }
  },
  {
    label: {
      props: {
        label: '售后商品运费分摊金额'
      }
    },
    content: {
      type: 'input',
      value: 'freight_return_money'
    }
  },
  {
    label: {
      props: {
        label: '运费退款金额'
      },
      attrs: {
        'data-name': 'order_0301p4010|freight_card_ticket_fee'
      }
    },
    content: {
      type: 'inputPS',
      ps: '(紫荆卡抵扣部分)',
      value: 'freight_card_ticket_fee'
    }
  },
  {
    label: {
      props: {
        label: '运费退款金额'
      }
    },
    content: {
      type: 'inputPS',
      ps: '(非紫荆卡抵扣部分)',
      props: {
        placeholder: '运费退款金额(非紫荆卡抵扣部分)'
      },
      value: 'goodMoney=>real_return_freight'
    }
  },
  {
    label: {
      props: {
        label: '商品申请退款金额'
      }
    },
    content: {
      type: 'input',
      value: 'good_return_money'
    }
  },
  {
    label: {
      props: {
        label: '售后商品实退金额'
      },
      attrs: {
        'data-name': 'order_0301p4011|good_card_ticket_fee'
      }
    },
    content: {
      type: 'inputPS',
      ps: '(紫荆卡抵扣部分)',
      value: 'good_card_ticket_fee'
    }
  },
  {
    label: {
      props: {
        label: '售后商品实退金额'
      }
    },
    content: {
      type: 'inputPS',
      ps: '(非紫荆卡抵扣部分)',
      props: {
        placeholder: '售后商品实退金额(非紫荆卡抵扣部分)'
      },
      value: 'goodMoney=>real_return_goods_amount'
    }
  },
  {
    label: {
      props: {
        label: '附加费申请退款金额'
      },
      attrs: {
        'data-name': 'order_0301p4012|extra_fee_return_money'
      }
    },
    content: {
      type: 'input',
      value: 'extra_fee_return_money'
    }
  },
  {
    label: {
      props: {
        label: '附加费实退金额'
      },
      attrs: {
        'data-name': 'order_0301p4013|extra_fee_card_ticket_fee'
      }
    },
    content: {
      type: 'inputPS',
      ps: '(紫荆卡抵扣部分)',
      value: 'extra_fee_card_ticket_fee'
    }
  },
  {
    label: {
      props: {
        label: '附加费实退金额'
      },
      attrs: {
        'data-name': 'order_0301p4014|service_fee'
      }
    },
    content: {
      type: 'inputModify',
      ps: '(非紫荆卡抵扣部分)',
      value: 'service_fee'
    }
  },
  {
    label: {
      props: {
        label: '差额原因'
      }
    },
    content: {
      type: 'select',
      props: {
        placeholder: '差额原因'
      },
      value: 'goodMoney=>difference_amount_reason'
    }
  },
  {
    label: {
      props: {
        label: '合计退款金额'
      }
    },
    content: {
      type: 'input',
      value: 'totalMoney'
    }
  },
  {
    label: {
      props: {
        label: '实际售后原因'
      }
    },
    content: {
      type: 'select',
      props: {
        placeholder: '实际售后原因'
      },
      value: 'goodMoney=>verify_return_reason'
    }
  }
];