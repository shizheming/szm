import prismjs from 'prismjs';
// import line from 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import 'prismjs/themes/prism.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
export default {
    flattenFun (funStr) {
        return funStr.replace(/^\(\)\s=>\s\{/, '').replace(/\}$/, '');
    }
}