/*
    联动
    由运动提炼出来
*/
import _ from 'lodash';
import motion from './motion';
function linkage () {
    return motion.apply(null, arguments);
}
export default linkage;