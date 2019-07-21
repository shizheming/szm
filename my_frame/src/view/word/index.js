import prismjs from 'prismjs';
// import line from 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import 'prismjs/themes/prism.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import compose from '@script/compose';

export default {
    handlefun (str, map) {
        return compose(this.flattenFun, this.replaceFnName)(str, map);
    },
    // 我需要把最外面的包的那层函数去掉，不需要
    flattenFun (funStr) {
        return funStr.replace(/^function\s\(\)\s\{/, '').replace(/\}$/, '');
    },
    // function toString方法会把里面调用的函数编译成一长串路径，这不是我想要的，我要的是正确的方法名调用，所以需要匹配替换
    replaceFnName (str, map) {
        var result;
        map.forEach(function (current) {
            var x = /Object\(.+?\)/;
            var s = x.exec(result || str);
            if (s) {
                result = str.replace(x, current);
            }
        });
        return result;
    },
    renderFun (example, map) {
        return Prism.highlight(`${this.handlefun(example.toString(), map)}`, Prism.languages.javascript, 'javascript');
    }
}