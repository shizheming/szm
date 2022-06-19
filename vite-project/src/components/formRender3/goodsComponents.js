import Brand from '../brands';
import Category from '@/widgets/form/category';
import OrgSelect from '@/widgets/form/orgSelect';
import GoodsStatus from '@/widgets/form/goodsStatus';
import GoodsType from '@/widgets/form/goodsType';
import Business from '@/widgets/form/business';
import Range from '@/widgets/form/range';
import Supplier from '@/widgets/form/supplier';
import FrontendCategory from '@/widgets/form/userCategory';
import Cooperation from '@/widgets/form/cooperation';
import Company from '@/widgets/form/company';
import Shop from '@/widgets/form/shop';

export default {
  brand (data) {
    return <Brand {...data}/>;
  },

  shop (data) {
    return <Shop {...data}/>;
  },

  frontendCategory (data) {
    return <FrontendCategory {...data}/>;
  },

  category (data) {
    return <Category {...data}/>;
  },

  checkStatus (data) {
    return <a-select {...data}>
      <a-select-option value={0}>
                未审核
      </a-select-option>
      <a-select-option value={1}>
                通过
      </a-select-option>
      <a-select-option value={2}>
                拒绝
      </a-select-option>
      <a-select-option value={3}>
                待审核
      </a-select-option>
    </a-select>;
  },

  // 带2个的input框-最小值-最大值
  inputInputNumber (data) {
    return <a-input-group {...data.group}>
      <a-input-number {...data.inputLeft}/>
      <a-input-number {...data.inputMiddle}/>
      <a-input-number {...data.inputRight}/>
    </a-input-group>;
  },

  range (data) {
    return <Range {...data}/>;
  },

  orgSelect (data) {
    return <OrgSelect {...data}/>;
  },

  goodsStatus (data) {
    return <GoodsStatus {...data}/>;
  },

  goodsType (data) {
    return <GoodsType {...data}/>;
  },
    
  business (data) {
    return <Business {...data}/>;
  },

  supplier (data) {
    return <Supplier {...data}/>;
  },
  bonusStatus (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>停用</a-select-option>
        <a-select-option value={1}>启用</a-select-option>
      </a-select>
    );
  },

  coopType (data) {
    return (
      <a-select {...data}>
        <a-select-option value={1}>企业</a-select-option>
        <a-select-option value={2}>个人</a-select-option>
      </a-select>
    );
  },

  status2 (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>正常</a-select-option>
        <a-select-option value={1}>停用</a-select-option>
      </a-select>
    );
  },

  status3 (data) {
    return (
      <a-select {...data}>
        <a-select-option value={1}>社交</a-select-option>
        <a-select-option value={2}>短视频</a-select-option>
      </a-select>
    );
  },

  status4 (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>启用</a-select-option>
        <a-select-option value={1}>停用</a-select-option>
      </a-select>
    );
  },

  posStatus (data) {
    return (
      <a-select {...data}>
        <a-select-option value={1}>待审核</a-select-option>
        <a-select-option value={2}>审核中</a-select-option>
        <a-select-option value={3}>审核通过</a-select-option>
        <a-select-option value={4}>审核驳回</a-select-option>
      </a-select>
    );
  },

  cooperation (data) {
    return <Cooperation {...data} />;
  },

  company (data) {
    return <Company {...data} />;
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

  articleStatus (data) {
    return (
      <a-select {...data}>
        <a-select-option value={0}>待审核</a-select-option>
        <a-select-option value={2}>审核通过</a-select-option>
        <a-select-option value={3}>审核不通过</a-select-option>
      </a-select>
    );
  },
  status6 (data) {
    return (
      <a-select {...data}>
        <a-select-option value={1}>显示</a-select-option>
        <a-select-option value={2}>隐藏</a-select-option>
      </a-select>
    );
  },

  commentType (data) {
    return (
      <a-select {...data}>
        <a-select-option value='0-2'>个人笔记</a-select-option>
        <a-select-option value='1-2'>官方软文</a-select-option>
        <a-select-option value='1-1'>官方菜谱</a-select-option>
      </a-select>
    );
  }
};