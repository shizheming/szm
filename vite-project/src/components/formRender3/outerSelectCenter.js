import OuterCate from '@/widgets/form/outerSelectCenter/cate';
import OuterBrands from '@/widgets/form/outerSelectCenter/brands';
import Supply from '@/widgets/form/outerSelectCenter/supply';

export default {
  outerBrands (data) {
    return <OuterBrands allow-clear={true} {...data}/>;
  },

  outerCate(data) {
    return <OuterCate allow-clear={true} {...data}/>;
  },

  outerSupply(data) {
    return <Supply allow-clear={true} {...data}/>;
  },
};
