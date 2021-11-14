// 退回商品
export const returnedMerchandise = [
  {
    label: {
      props: {
        label: '寄回方式'
      }
    },
    content: {
      type: 'input',
      value: 'returnMethod'
    }
  },
  {
    label: {
      props: {
        label: '是否退回至供应商'
      }
    },
    content: {
      type: 'radio',
      props: {
        options: [
          {
            label: '否',
            value: 0
          },
          {
            label: '是',
            value: 1
          }
        ]
      },
      value: 'goodMoney=>isReturnSupplier'
    }
  },
  {
    label: {
      props: {
        label: '退回供应商'
      }
    },
    content: {
      type: 'select',
      props: {
        placeholder: '退回供应商'
        /* options: function () {
          return new Promise();
        } */
      },
      value: 'goodMoney=>supplier_id'
    },
    state: {
      options: {
        a: function () {
          return [
            {
              label: `${this.detailData.basic_info.supplier_name}`,
              value: this.detailData.basic_info.supplier_id
            }
          ];
        }
      }
    }
  },
  {
    label: {
      props: {
        label: '退回地址类型'
      }
    },
    content: {
      type: 'radio',
      props: {
        options: [
          {
            label: '手动填写',
            value: 2
          },
          {
            label: '供应商地址列表',
            value: 3
          }
        ]
      },
      value: 'goodMoney=>con_type'
    },
    state: {
      options: {
        a: [
          {
            label: '手动填写',
            value: 2
          },
          {
            label: '供应商地址列表',
            value: 3
          }
        ],
        b: [
          {
            label: '手动填写',
            value: 2
          },
          {
            label: '非供应商地址列表',
            value: 3
          }
        ]
      }
    }
  },
  {
    label: {
      props: {
        label: '选择收货地址'
      }
    },
    content: {
      type: 'select',
      props: {
        placeholder: '选择收货地址',
        showSearch: true,
        filterOption (input, option) {
          return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
      },
      value: 'allAddr'
    }
  },
  {
    label: {
      props: {
        label: '收货地址'
      }
    },
    content: {
      type: 'areaChoose',
      style: {
        width: '30%',
        display: 'inline-block',
        marginRight: '5px'
      },
      props: {
        placeholder: '收货地址'
      },
      value: 'mArea'
    }
  },
  {
    label: {
      props: {
        label: '详细地址'
      }
    },
    content: {
      type: 'input',
      props: {
        placeholder: '详细地址'
      },
      value: 'goodMoney=>address'
    }
  },
  {
    label: {
      props: {
        label: '商家收件人'
      }
    },
    content: {
      type: 'input',
      props: {
        placeholder: '商家收件人'
      },
      value: 'goodMoney=>name'
    }
  },
  {
    label: {
      props: {
        label: '联系手机/座机'
      }
    },
    content: {
      type: 'input',
      props: {
        placeholder: '联系手机/座机'
      },
      value: 'goodMoney=>mobile'
    }
  }
];