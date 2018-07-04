主谓宾定补状
词性
词性包括开放性的（经常吸收引进新词）与封闭性的（很少或从不吸收引进新词）
动词--方法
名词--属性

为什么要分名词或是动词或是别的什么词，我不在乎什么词，只是要找什么是不动的词或是少动的词，更贴近不变不动的静的方向

独立实体：位置{
    头部，尾部，上，下，左，右，
}，长度，元素，集合，数量{
    一个，多个，单数，复数，全部，部分
}，数组，对象，函数，符号{
    字符串，斜杠，字母{
        大写，小写，
    }
}，条件，方向{
    向上，向下，向左，向右，从某个方向到某个方向
}，次序{
    正序，倒序
}，权限，属性，自身，原型，值，原始，属性名，属性值，数学{
    最大值，最小值，正无穷大，负无穷大，指数，数字，函数，自然对数，底数，直径，圆，平方根，次幂，绝对值，正切，余切，正弦，余弦
}，状态，词的各种否定（比如存在和不存在），相反的一面，顺序，正则表达式，布尔值，标志，单位，比例，周长，时间{
    年，月，日，时，分，秒，毫秒，星期，天，日，周，季，时间戳，时差
}，

动作行为：添加，删除，插入，返回，链接，合并，迭代，反复，寻找，过滤，转化，设置，冻结，密封，扩展，描述，继承，枚举，调用，匹配，随机，设置

感官思维：存在，判断，变化，控制，精度，模糊

// es1
长度
Array.length;
Array.prototype.sort();
位置颠倒
Array.prototype.reverse();
用符号连接元素
Array.prototype.join();
把数组转化为字符串
Array.prototype.toString();
// es3
Array.prototype.toLocaleString();
添加元素到数组的头部
Array.prototype.unshift();
从某一个位置开始添加或删除多个元素
Array.prototype.splice();
删除数组的第一个元素
Array.prototype.shift();
添加元素到数组的尾部
Array.prototype.push();
删除数组的最后一个元素
Array.prototype.pop();
合并多个数组
Array.prototype.concat();
// es5
集合中是否有某些元素通过测试条件
Array.prototype.some();
集合中的元素从左到右和初始值通过条件浓缩成一个值
Array.prototype.reduce();
集合中的元素从右到左和初始值通过条件浓缩成一个值
Array.prototype.reduceRight();
集合中的每个元素运行条件处理
Array.prototype.map();
正序的寻找集合中给定元素的位置
Array.prototype.indexOf();
倒序的寻找集合中给定元素的位置
Array.prototype.lastIndexOf();
对集合中的每个元素进行条件运行
Array.prototype.forEach();
集合中过滤符合条件的元素
Array.prototype.filter();
集合中是否所有元素都通过测试条件
Array.prototype.every();
判断是不是数组
Array.isArray();

// es5
控制单个属性的设置
Object.defineProperty();
控制多个属性的设置
Object.defineProperties();
冻结一个对象
Object.freeze();
获取对象上的某个属性的描述
Object.getOwnPropertyDescriptor();
获取对象上的所有属性的描述
Object.getOwnPropertyDescriptors();
获取对象自身属性
Object.getOwnPropertyNames();
获取对象原型
Object.getPrototypeOf();
判断是否可扩展
Object.isExtensible();
判断是否冻结
Object.isFrozen();
判断是否密封
Object.isSealed();
把对象变的不可扩展
Object.preventExtensions();
判断一个属性是否是自身属性
Object.prototype.hasOwnProperty();
判断一个对象是否存在于另一个对象的原型上
Object.prototype.isPrototypeOf();
密封对象
Object.seal();
创建一个对象继承
Object.create();
获取对象的所有的属性名
Object.keys();
// es3
判断属性是否可以被枚举
Object.prototype.propertyIsEnumerable();
把对象转化为字符串
Object.prototype.toLocaleString();
// es1
把对象转化为字符串
Object.prototype.toString();
获取对象的原始值
Object.prototype.valueOf();

// es1
长度
Function.length;
函数名
Function.name;
// es3
在指定的对象上调用方法
Function.prototype.apply();
// es1
在指定的对象上调用方法
Function.prototype.call();

// es1
最大值
Number.MAX_VALUE;
最小值
Number.MIN_VALUE;
负无穷大
Number.NEGATIVE_INFINITY;
非数字
Number.NaN;
正无穷大
Number.POSITIVE_INFINITY;
// es3
获取指数表示的字符串数字
Number.prototype.toExponential();
获取指定精度的数字
Number.prototype.toPrecision();
// es1
把数字转化为字符串
Number.prototype.toString();
获取数字的原始值
Number.prototype.valueOf();

// es1
长度
String.length;
获取Unicode值
String.fromCharCode();
获取某个位置的字符串
String.prototype.charAt();
获取某个位置的字符串的Unicode值
String.prototype.charCodeAt();
转化为小写
String.prototype.toLowerCase();
转化为大写
String.prototype.toUpperCase();
把字符串转化为字符串。。。。
String.prototype.toString();
获取字符串的原始值
String.prototype.valueOf();
// es3
获取2个字符串之间的前后顺序
String.prototype.localeCompare();
匹配一个正则表达式
String.prototype.match();
替换指定的内容
String.prototype.replace();
获取匹配字符串的位置
String.prototype.search();
转化为小写
String.prototype.toLocaleLowerCase();
转化为大写
String.prototype.toLocaleUpperCase();
// 功能和slice如此相似，有何意思？！
/*String.prototype.substr();
String.prototype.substring();*/

// es1
把布尔值转化为字符串
Boolean.prototype.toString();
获取布尔值的原始值
Boolean.prototype.valueOf();

// es3
是否有g标志
RegExp.prototype.global;
是否有i标志
RegExp.prototype.ignoreCase;
是否有m标志
RegExp.prototype.multiline;
获取斜杠中间的字符串
RegExp.prototype.source;
下次匹配的起始索引
RegExp.lastIndex;
获取正则匹配结果
RegExp.prototype.exec();
把正则转化成字符串
RegExp.prototype.toString();

// es1
表示自然对数的底数
Math.E;
表示 10 的自然对数
Math.LN10;
表示 2 的自然对数
Math.LN2;
表示以 10 为底数，e 的对数
Math.LOG10E;
表示以 2 为底数，e 的对数
Math.LOG2E;
一个圆的周长与直径的比例
Math.PI;
表示 1/2 的平方根
Math.SQRT1_2;
表示 2 的平方根
Math.SQRT2;
绝对值
Math.abs();
反余弦值
Math.acos();
反正切
Math.atan();
反正切值
Math.atan2();
余弦值
Math.cos();
ex
Math.exp();
一个数的自然对数
Math.log();
基数的指数次幂
Math.pow();
获取数在范围（0，1）内的值
Math.random();
一个数值的正弦值
Math.sin();
一个数的平方根
Math.sqrt();
一个数值的正切值
Math.tan();

// es1
Date.UTC();
返回时间戳
Date.parse();// 有风险
返回一个指定的日期对象为一个月中的第几天
Date.prototype.getDate();
返回一个具体日期中一周的第几天
Date.prototype.getDay();
返回指定日期的年份
Date.prototype.getFullYear();
返回一个指定的日期对象的小时
Date.prototype.getHours();
返回一个指定的日期对象的毫秒数
Date.prototype.getMilliseconds();
返回一个指定的日期对象的分钟数
Date.prototype.getMinutes();
返回一个指定的日期对象的月份
Date.prototype.getMonth();
返回一个指定的日期对象的秒数
Date.prototype.getSeconds();
返回一个时间的格林威治时间数值
Date.prototype.getTime();
返回协调世界时（UTC）相对于当前时区的时间差值
Date.prototype.getTimezoneOffset();
Date.prototype.getUTCDate();
Date.prototype.getUTCDay();
Date.prototype.getUTCFullYear();
Date.prototype.getUTCHours();
Date.prototype.getUTCMilliseconds();
Date.prototype.getUTCMinutes();
Date.prototype.getUTCMonth();
Date.prototype.getUTCSeconds();
设置日期
Date.prototype.setDate();
设置年
Date.prototype.setFullYear();
设置小时
Date.prototype.setHours();
设置毫秒
Date.prototype.setMilliseconds();
设置分钟
Date.prototype.setMinutes();
设置月
Date.prototype.setMonth();
设置秒
Date.prototype.setSeconds();
通过时间戳设置时间
Date.prototype.setTime();
Date.prototype.setUTCDate();
Date.prototype.setUTCFullYear();
Date.prototype.setUTCHours();
Date.prototype.setUTCMilliseconds();
Date.prototype.setUTCMinutes();
Date.prototype.setUTCMonth();
Date.prototype.setUTCSeconds();
把日期转化为字符串
Date.prototype.toString();
Date.prototype.toUTCString();
获取日期的原始值
Date.prototype.valueOf();
// es3
返回一个日期对象日期部分的字符串
Date.prototype.toDateString();
返回该日期对象日期部分的字符串
Date.prototype.toLocaleDateString();
返回该日期对象日期时间的字符串
Date.prototype.toLocaleString();
返回该日期对象时间部分的字符串
Date.prototype.toLocaleTimeString();
返回一个日期对象时间部分的字符串
Date.prototype.toTimeString();
// es5
获取时间戳
Date.now();
把日期转化为iso的字符串
Date.prototype.toISOString();
把日期转化为iso的字符串
Date.prototype.toJSON();