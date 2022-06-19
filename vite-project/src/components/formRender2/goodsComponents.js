import Brand from '../brands';
import Category from '@/widgets/form/category';
import OrgSelect from '@/widgets/form/orgSelect';
import GoodsStatus from '@/widgets/form/goodsStatus';
import GoodsType from '@/widgets/form/goodsType2';
import Business from '@/widgets/form/business';
import Supplier from '@/widgets/form/supplier';
import Range from '@/widgets/form/range';
import FrontendCategory from '@/widgets/form/userCategory';
import Shop from '@/widgets/form/shop';
import Cooperation from '@/widgets/form/cooperation';
import Company from '@/widgets/form/company';
import OrgPos from '@/widgets/form/orgPos';
import Nodes from '@/widgets/form/nodes';

export default {
  nodes (data) {
    return <Nodes {...data} />;
  },

  brand (data) {
    return <Brand {...data} />;
  },

  shop (data) {
    return <Shop {...data}/>;
  },

  shop1 (data) {
    return <Shop {...data}/>;
  },

  frontendCategory (data) {
    return <FrontendCategory {...data} />;
  },

  category (data) {
    return <Category {...data} />;
  },

  // 带2个的input框-最小值-最大值
  inputInputNumber (data) {
    return (
      <a-input-group {...data.group}>
        <a-input-number {...data.inputLeft} />
        <a-input-number {...data.inputMiddle} />
        <a-input-number {...data.inputRight} />
      </a-input-group>
    );
  },

  checkStatus (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>未审核</a-select-option>
        <a-select-option value={1}>审核通过</a-select-option>
        <a-select-option value={2}>审核拒绝</a-select-option>
        <a-select-option value={3}>待审核</a-select-option>
      </a-select>
    );
  },

  checkStatus2 (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>未提交审核</a-select-option>
        <a-select-option value={1}>审核通过</a-select-option>
        <a-select-option value={2}>审核拒绝</a-select-option>
        <a-select-option value={3}>已提交待审核</a-select-option>
      </a-select>
    );
  },

  bonusStatus (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>停用</a-select-option>
        <a-select-option value={1}>启用</a-select-option>
      </a-select>
    );
  },

  weight (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>所有</a-select-option>
        <a-select-option value={1}>从高到底排序</a-select-option>
        <a-select-option value={2}>从低到高排序</a-select-option>
      </a-select>
    );
  },

  range (data) {
    return <Range {...data} />;
  },

  orgSelect (data) {
    return <OrgSelect {...data} />;
  },

  orgPos (data) {
    return <OrgPos {...data} />;
  },

  goodsStatus (data) {
    return <GoodsStatus {...data} />;
  },

  goodsType (data) {
    return <GoodsType {...data} />;
  },

  business (data) {
    return <Business {...data} />;
  },

  supplier (data) {
    return <Supplier {...data} />;
  },

  shop (data) {
    return <Shop {...data} />;
  },

  cooperation (data) {
    return <Cooperation {...data} />;
  },

  company (data) {
    return <Company {...data} />;
  },

  posStatus (data) {
    return (
      <a-select {...data}>
        <a-select-option value="">全部</a-select-option>
        <a-select-option value={1}>待审核</a-select-option>
        <a-select-option value={2}>审核中</a-select-option>
        <a-select-option value={3}>审核通过</a-select-option>
        <a-select-option value={4}>审核驳回</a-select-option>
      </a-select>
    );
  },

  posStatus3 (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>未认证</a-select-option>
        <a-select-option value={1}>申请成功</a-select-option>
        <a-select-option value={2}>申请失败</a-select-option>
        <a-select-option value={3}>打款成功</a-select-option>
        <a-select-option value={4}>打款失败</a-select-option>
        <a-select-option value={5}>认证成功</a-select-option>
        <a-select-option value={6}>认证失败</a-select-option>
      </a-select>
    );
  },

  posStatus2 (data) {
    let options = [
      {
        value: 100,
        label: '初始'
      },
      {
        value: 200,
        label: '申请失败'
      },
      {
        value: 300,
        label: '申请成功'
      },
      {
        value: 400,
        label: '确认成功'
      },
      {
        value: 500,
        label: '确认失败'
      },
      {
        value: 600,
        label: '提现成功'
      },
      {
        value: 700,
        label: '提现失败'
      }
    ];

    return (
      <a-select {...data}>
        {options.map(item => {
          return (
            <a-select-option value={item.value}>
              {item.label}
            </a-select-option>
          );
        })}

      </a-select>
    );
  }
};