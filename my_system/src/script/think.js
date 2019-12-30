/* 
    理解面向对象和函数式的区别

    面向对象通多特定的行为将很多数据类型逻辑的联系在一起，函数式则关注如何在这些数据类型之上通过组合来连接各种操作，因此存在一个两种编程范式都可以有效利用的算平衡点

    面向对象的关键是创建继承层次结构并将方法与数据紧密的绑定在一起，函数式编程则倾向于通过广义的多态函数交叉应用于不同的数据类型，同时避免使用this

    这两段话我理解下来就是，两者不冲突，函数式是一种动作概念，比如说跑跳这种，通用的行为，谁的行为不关心，而面向对象正好是函数式那个不关心的谁，实体，独立唯一的，为什么说他把属性和方法揉成一团了呢，就是应为对象有属性有方法，离不开
    所以我们既要关心唯一的对象也要关心通用的行为，甚至上升到形而上的概念的范畴










默认始终状态

顺序
    基于函数，执行顺序，（同步）
    有序
    无序



主次
轻重

变化，一些皆变，唯变不变


单例模式
迭代器
命令
组合
模板方法
享元
职责链
适配器




空间{
    位置{
        头部，尾部，上，下，左，右，
    }，
    方向{
        向上，向下，向左，向右，从某个方向到某个方向
        向量
    }，
}，
时间
数量







文件夹和文件分类
order｛
        create｛
                component｛
                        table｛
                        ｝
                        modal｛
                        ｝
                ｝
        ｝
｝
体会下来是这样的，还是从人的角度去出发，面向对象，我们首先最直接能懂得就是人自己这个对象，所以一开始分的时候会告诉我这是什么，我怎么最能直接的认识他，先告诉我这是什么，这是人，这是细胞，那个对于我来说好认识，当然是人了，首先看到的是人，而不是构成人的细胞，所以页面一开始不能表格啊，弹窗啊，按钮啊这些组件来创建顶级文件夹，英文你告诉我这些零散的东西，我还是不知道这到底是什么，这些抽象普遍的写在这个什么里面去就好了

页面级别功能
抽象这个东西有时候和整理分不太清楚，就比如页面当中又以一个modal，我把他从当前页面拿出来做成一个组件，这是抽象么，我觉得严格上来讲并不是，只是代码的整理，属于纵向独立的东西，他是一个具象的东西modal，是一个整体，独立存在同时是页面功能级别的，而抽象应该是留下的是形式，没有内容，偏底层

表单数据初始化
表单内的控件和绑定数据和回填数据写成单独的数据通过在页面中循环来渲染
例如：
search: {
        input: [
            {
                label: '运单号',
                decorator: 'xxx'
            },
        ],
        selectInput: [
            {
                label: '订单',
                decorator: 'search_mode',
                input: {
                    decorator: 'search_value'
                },
                value: [
                    {
                        value: '1',
                        text: '子单编号'
                    },
                    {
            }
        ],
}







写个编辑页详情页统一为一个页面切换状态



写个换肤

一般来说，程序猿们大部分时间关注的可能不是研发某个具体算法，这是算法工程师／数学家们擅长的东东。程序猿的工作主要是通过调用编程环境中现成的工具函数或接口来实现具体的应用功能，将各个底层接口或算法模块用代码有秩序地拼装联接起来，实现酷炫好用的产品功能，如同组装一件乐高玩具一样。

这段话摘自某位博主的原话，我觉得非常契合我对代码和哲学的统一理解

从唯心还是唯物出发建立体系
在建立体系和理清各种概念之间关系的过程中，我要慢慢的从之前的唯心出发包裹唯物，该变成从唯物出发积累经验最后提炼形而上的知识体系，形而上是终点不是我的出发点，我不能从抽象的概念悟出另一个抽象的概念，先不说可去否，主要是进步的太慢，应为你在凭空创造一个概念，是多么的难，这点我在Google的便签上就总结过了，现在更加确定一下，该怎么脚踏实地的做就怎么做，我并不是否定从唯心出发，我可以从唯心出发，但主要的还是具体的唯物，因为唯物快呀，看得见摸得着的，你说快不快，我看到一个具体的东西，就想去创建另一个东西，有材料，如果你从唯心出发比唯物快，那肯定选唯心咯，这个有没有对错之分，本来就是形而上的东西，我只是要加快我建立体系的速度，我觉得我也在慢慢的调整，没以前那么死心眼了，哈哈，举个具体的例子，我今天在写图表，然后想理清下图表的概念，然后我就是买书，以前会把书看完了在接着写我的图表，可以认为是同步的，而现在，书管书看，图表的事情照样接着干，相当于异步，我并不是说异步比同步好之类的话，而是关注在于，具体的事海得接着干，不要停，应为这是主要的，书只是辅助，而不是在学校学习知识是首位，还有个主要的理由是，从唯心出发，概念记不住，难理解

提交的数据
提交的数据需要和自己的数据分开处理一下

主逻辑和其他逻辑分开

把代码分类下，一种是主逻辑代码，一种是修饰和优化的代码，还有一种是操作数据的
整理下清数据的代码
提交的数据和自己用的数据分开一下，不然就会把后端不需要的数据给提交过去了

写js先从写数据开始，然后再写逻辑，其实挺符合先本体论在认识论的，先客观后主观，
当你按照一套体系或是规则写完一段代码，这段代码就是很完美的了，但是呢有些点你会感觉好像应该写成其他能更好的样子，可自己又说不上来时什么样子，这种就是每个人不同的感觉，也是优势，所以感性和理性不能孤立一个片面的来理解，不妥，有段时候我就是这样，愚蠢的以为抓住了理性就是抓住了真理，

本体论，认识论
是先本体论在认识轮吗，我觉得是的，先存在在认识，先客观后主管，我的体系里面需要体现本体和认识吗，现在有的只是那些最一般最抽象的概念，你觉得是先有这些再有具体的吗，我觉得不是，并不是我先把这些概念提炼出来就代表他们是最初的时间上的最初的，我是想说这些背后的是任何事物都逃离不了的，我会出现实体的东西，比如组件，但并不是建立在这些抽象的东西上，基础还是实体，这个永远不变，抽象概念只是从实体智之中提炼出来，当然你也可以说是本来就存在的，姑且我不在这里讨论抽象得由来，因为这是个哲学问题，
好，我把实体在体系上加上了，后面又出现了另一个零散的概念，各种命名，我怎么样来命名任何东西，使用这么一套规则来命名任何东西，通用的知识只能是软实力，概念，所以我再找

目的
不管是建立体系还是提炼一套可复用的写页面的思路，最终的目的就是形成自己的一套思考体系，也就是认识论，希望慢慢的学会控制思维，而不是本能的去思维

promise启发
任何异步的都能用promise，不单单是请求接口

登录页的时候侧边栏是真的没有了，还是只是看起来没有
我想说的是，达到效果的的这两种方法，应该侧重哪一种，什么时候使用真的那一套真的来考验技术，什么时候可以玩一玩视觉效果一些小聪明，
起因是，尝试把路由改成嵌套的时候遇到了很多牵连的问题，所有之后又改回来了，改回来后就意识到这个现象了

loading
异步和同步，也就时间，每个功能区组件的loading，不在页面级的了

从对象出发创建数据

数据是名词
形容词+名词
形式+质料
方法是动词
形容词+动词

在template绑定数据和方法不需要写名词，通过template我可以知道这是什么

js逻辑代码里面取名字还是要告诉人家这是什么，而不是告诉人家这个叫什么名字，名字只是这个是什么东西的属性，并不能说明这东西到底是个什么东西
那么我们在优化下，把名字和是什么加在一起，更加具体说明事物了
名字+实体
也就是左边是形式，右边是质料
方法就是动词＋实体
动作＋名字＋实体

以后在写业务逻辑的时候一定要有对象的概念，把业务逻辑对象化
状态也是除了静态的说明事物的同时，动态加上变化的状态，可以理解为同一事物在时间上的不同变化

1.文件的名字（驼峰）
3.数据的名字（驼峰）
4.方法的名字（驼峰）
2.css的名字（中划线）

我在想要不要试试增加维度我质料和形式分开，说的通俗点就是把他是什么和他叫什么名字分开，举个例子
之前总结的是这样子的typeNameSelector，这个叫typeName名字的选择器，我们一看就知道这个是关于选择器的数据，觉得挺好，但是呢，往往弄得这个名字相当长，有点啰嗦，
打个比方，我要找一个什么，如果我知道这个的名字的话我会直接叫这个名字，如果我不知道这个名字的话，我会说这个东西是什么
就像，有个人叫小明，我会说帮我去找小明，我不会说找个小明的人，我们事先已经知道小明是个人了，所以在以后的交流当中就可以不再去声明小明是个人了，
再打个比方，有辆车叫奔驰，我会说我要买辆奔驰，我不会说我要买辆叫奔驰的车，因为大家都知道我在说什么，都知道奔驰是辆车的牌子，也可以说需要语境，通俗点就是这都是日常用语，比较生僻的就困难一点，好比有颗石头叫海蓝之星，然后我说我要颗海蓝之星，被人会先问海蓝之星是什么，虽然是什么是交流的前提，但一旦有了这个前提后，留下的就只有名字了，也就是说，是什么必须有，但不是每次都需要，一个次告知就ok了，
这就是我的理解和启发，所有我就想增加命名的维度，不在写在一个字段里面，而是想json一样层层递进，从是什么开始，或是从名字开始，从是什么开始符合逻辑，从名字开始符合认知，
但是我又发现有了新的问题，比如当一个页面里面只有一个表格的时候，我干嘛费劲给他取名字的，直接用他是什么来标示不就好了，所以应该从是什么开始写json而不是名字
我们再进一步就是不需要是什么这层，因为数据会绑在dom上，通过dom就能看到，不需要显性的表示，跟方法的命名异曲同工，但如果是不在dom依托之内的，相对自定义的就需要说明是什么，
还有个想法就是，以后写逻辑直接上来名字了this都不要了，因为this对于朱逻辑没有帮助，他只是语法规则上需要，什么时候我们能脱离语法，这愿望好像太美好了，我的意思的语法需要，带并不是每次都要，每次我都要this，恩，这是要二次申明的节奏么

var data = {
    selector: {
        typeName: {
            value: '',
            list: [],
        },
        businessMode: {
            value: '',
            list: [],
            originalList: [],
            isDisabled: false,
        },
    },
    input: {
        tableName: '',
    }
};

var data2 = {
    typeName: {
        value: '',
        list: [],
        is: 'selector',
    },
    businessMode: {
        value: '',
        list: [],
        originalList: [],
        isDisabled: false,
        is: 'selector'
    },
    tableName: {
        value: '',
        is: 'input'
    },
};

页面里的所有命名需要斟酌+业务逻辑对象化
总结：
取名在template里面有绑定且有多个相同类型的不加是什么，直接取名字，
有绑定且独一无二的直接上是什么，不取名字
无绑定且有相同类型的，取名字+是什么
无绑定且独一无二的，上是什么，不取名字

页面每次的清数据

初衷的初衷
我在建立体系和分类和建立世界观的时候，时常会迷茫，迷茫我现在认为是合理的理念到底站得住脚跟么，当时得出结论的时候是站的住脚，但过了段时间，我就会自我怀疑之前的那些理论到底可行么，我是怀疑论者么，
每次想着怎么分类，下一次就推翻，我觉得总的有个最初的出发点，是撒，
我现在觉得是当前具体要做的事情，具体的事情，不是虚的东西，我不能从虚开始想，最后把实塞到想好的虚的位置上，本生这个顺序就不对，怎么可以从虚到实，应该从实到虚，也就是从具象中最终提炼抽象，
所以做好现在想做的具体的事情慢慢抽象，好吧

静态分类
1.从底层开始建立
2.从实体的具体的出发
3.从质料开始出发
4.数量开始
5.从平面维度开始

echarts图标启示
做爬虫前产品过来和我讨论一个图标的显示问题，在饼图中有写数据太小而点不到甚至看不见，请教怎么显示才好，我的建议是设个最小比例，当时是这样的，然后后面做的时候并没有这样去弄，因为echarts提供了点击事件，能把饼图上的你点的那块比例隐藏掉，隐藏掉后，小比例就表大了，就能看清了，最后我在想的是，我静态的解决了这个问题，echarts动态的解决了这个问题，呵呵哒。

添加动态路由
现在是静态路由，没有添加动态形参，所以但访问一个本来就需要动态参数，可是并没有加上动态参数的时候仍旧能够访问，我觉的是不合理的，所以要预设形参，那如何区分什么时候用动态路由什么时候用查询参数呢，我这样理解，动态路由的参数是必须的才能访问这个页面，而查询参数有没有都能访问这个页面

数据分类
在作自己项目的时候想把数据单独拿出来变成一个文件，然后在想这个页面数据的文件是放在这个页面的文件夹里面一起，还是放在有一个叫全都是放数据的地方，后来想想如果是要符合数据从底层到顶层的这么一个路线的话，越底层的东西那就是越平行，越是一类，没有纵向的概念，所以就是数据的文件就应该和数据的文件放在一起，如果拿手机来比喻的话就更加的形象了，到我们手的是一个完成的手机，是最顶层的，那么最底层东西肯定是每一类放在每一类的地方，cpu和cpu放在一起，等到需要组装的时候才会拿出来，

学习node如何存表数据
我在做消费图标的东西，现在是把数据直接写到js里面，我想以后是不是能够像前后端交互一样弄个管理系统的界面，然后把数据通过node存在表里面，像一般后端干的那样

添加jsx语法

看哲学视频

看哲学书

回想之前的自己
抽象的程度越高，概括的东西就越多，花的定义包含了所有的话，在往上是植物，包含着花草树木
现象本质，情感理智，文科理科，现在的我在追求那个不变不动，独一无二的一时，忘了当初的我是追求另一种极致的体验，那就是感官上的精神体验，遥想当初躺在交大湖畔的座椅上仰望星空的情景，看了哲学后，我居然在潜意识里精力的排斥感官，要寻找理智的逻辑的本源，是不是很可笑，就像，我从文科学艺术的变成理工科写代码的一样，真的好可笑，回头想想我竟然在推翻以前的自己，
虽然有段时间想法有点这个意思，可我现在觉得现在的我是我都是和我一路走来的事物分不开的，不能觉得我想先偏哲学偏真理偏逻辑了就丢掉艺术，这种行为本身就是不可取的，只能说明我还没有处理和吸收好两者，就像功能和好看缺一不可

知识点
数据结构
栈，链表，队列，数组，线性表
储存数据结构的类型
arr，josn，string，nubmer
算法
排序，查找
函数式编程的核心的什么？
封装动作，动态的
一种运算过程
函数式有哪些概念？
纯函数，回调函数，高阶函数，谓词函数，递归，闭包，柯理化，消灭语句变为表达式
js是门动态的语言
设计原则
单一职责原则，最少知道原则，开放封闭原则
目的：解耦

层级分类
我发现自己数据建立结构来说明某个东西的时候总会倾向于层级嵌套，为撒呢，我觉得这样做有可能是这个东西嵌套写成嵌套好理解，还有可能就是嵌套的结构可以容纳更多的东西，而当我要去拿数据中的一些东西的时候，总希望这个结构越简单越好，我并不关心他的结构如何的完美，因为这样我去拿我想要的也就越容易，好比路由一样，自己写总是嵌套，有层级，也符合关系的概念，而我想要拿某个路由的时候，我就想如果是扁平的就容易操作很多，
有时候想，创造一个东西是贴近客观事实，还是我写的爽呢？

回调函数启发
彩云里面后来恋情男加的确认离开页面用回调函数非常有启发，通过回调函数来触发，我之前一直是一个劲的想用变量来控制，不够就加增加变量
还有个地方的想法其实有异曲同工之处，我在操作伪类的时候发现没办法直接去修改他们，然后网上找了下，可以去操作class的方式替换当期的伪类行为，
给我的启发就是，当我要去做某一件事情的时候会盯着这件事情本身来想各种办法，就像我想去操作伪类，我就会一直寻找直接操作伪类的方法，脑子不打弯，脑子不打弯十一点，另一点关键是直接和间接的关系

我的体系，从学习哲学开始，在哲学中获取养份，从认识论到代码体系的体现，是从设计模式为核心出发，到函数库，到vue框架搭建整站，到从vue搭建网站中提炼的一般通用的逻辑方法，这个就是基本的主线，从抽象的技能到具象的技能，也是代码的认识论
这些东西连同生活一起体现在我自己弄的github的博客网站上

体系建立
工具库
如何判断一个值在区间内
现在几点是上午下午还是晚上


权限问题
ui权限，页面访问权限，ui上的看不见只是一种表现，不如还有看得见，点不了的
没有权限的表现的几种情况
（看不见）
按钮没有
没有菜单
路由不能访问
（异步路由加载解决了）
（看得见但操作不了）

阻止用户相对不正常行为
比如狂点提交或所有按钮

面包屑上的参数如何带？
现在是一个一个页面访问过来会有记录，但如果像这次爬虫做的邮件的形式，直接点开一个连接，我如何获取前面的面包屑的参数
解决方案就是只能呆在url上面，否则没地方存

把原来面包屑通过数据算出来的，变成路由嵌套拿到的，就不用算了，路由嵌套也符合客观事物

路由改成嵌套路由 
想法是好的，但vue的嵌套路由跟我想的不太一样，可能是我想的太简单了，还有就是如果实现的话，router-view的写法太静态了，要手动添加，并不会动态添加  

业务逻辑对象化
要开始养成对象的概念，什么东西需要通过对象独立化，什么是需要通用的，有待斟酌，同时就涉及命名了

loading统一的处理
因为现在是用组件有些组件自带loading，可以理解为面向对象上都有可以独立的loading属性，所有怎么跟唯一的loading进行整合是个问题
我觉得页面元素对象化后需要独立的loading取代唯一的loading，一方面变得更加透明和友好，一方面符合对象独立的宗旨
主要是异步的加loading

管道就是通过函数参数输入，输出又作为下一个函数参数的输入，这就是管道，而链式是在对象上的方法的调用，区别就在数据的输入的地方不一样
*/


;(function () {});
var undefined;

var VERSION = '4.17.15';

var LARFE_ARRAY_SIZE = 200;

var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
FUNC_ERROR_TEXT = 'Expected a function';

var HASH_UNDEFINED = '__lodash_hash_undefined__';

var MAX_MEMOIZE_SIZE = 500;

var PLACEHOLDER = '__lodash_placeholder__';

var CLONE_DEEP_FLAG = 1;
CLONE_FLAT_FLAG = 2;
CLONE_SYMBOLS_FLAG = 4;

var COMPARE_PARTIAL_FLAG = 1,
COMPARE_UNORDERED_FLAG = 2;

var WRAP_BIND_FLAG = 1,
WRAP_BIND_KEY_FLAG = 2,
WRAP_CURRY_BOUND_FLAG = 4,
WRAP_CURRY_FLAG = 8,
WRAP_CURRY_RIGHT_FLAG = 16,
WRAP_PARITAL_FLAG = 32,
WRAP_PARITAL_RIGHT_FLAG = 64,
WRAP_ARY_FLAG = 128,
WRAP_REARG_FLAG = 256,
WRAP_FLIP_FLAG = 512;

var DEFAULT_TRUNC_LENGTH = 30,
DEFAULT_TRUNC_OMISSION = '...';

var HOT_COUNT = 800,
HOT_SPAN = 16;

var LAZY_FILTER_FLAG = 1,
LAZY_MAP_FLAG = 2,
LAZY_WHILE_FLAG = 3;

var INFINITY = 1 / 0,
MAX_SAFE_INTEGER = 9007199254740991,
MAX_INTEGER = 1.7976931348623157e+308,
NAN = 0 / 0;

var MAX_ARRAY_LENGTH = 4294967295,
MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_RIGHT_FLAG],
    ['partialRight', WRAP_KPARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
];

var argsTag = '[object Arguments]',
arrayTag = '[object Array]',
asyncTag = '[object AsyncFunction]',
boolTag = '[object Boolean]',
dateTag = '[object Date]',
domExcTag = '[object DOMException]',
errorTag = '[object Error]',
funcTag = '[object Function]',
genTag = '[object GeneratorFunction]',
mapTag = '[object Map]',
numberTag = '[object Number]',
nullTag = '[object Null]',
objectTag = '[object object]',
promiseTag = '[object Promise]',
proxyTag = '[object Proxy]',
regexpTag = '[object RegExp]',
setTag = '[object Set]',
stringTag = '[object String]',
symbolTag = '[object Symbol]',
underfinedTag = '[object Undefined]',
weakMapTag = '[object WeakMap]',
weakSetTag = '[objcet WeakSet]';

var arrayBufferTag = '[object ArrayBuffer]',
dataViewTag = '[object DataView]',
float32Tag = '[object Float32Array]',
float64Tag = '[objcet Float64Array]',
int8Tag = '[object Uint8Array]',
int16Tag = '[object Int16Array]',
int32Tag = '[object Int32Array]',
uint8Tag = '[object Uint8Array]',
uint8ClampedTag = '[object Uint8ClampedArray]',
uint16Tag = '[object UintArray]',
uint32Tag = '[object Uint32Array]';

var reEmptyStringLeading = /\b__p \+= '';/g,
reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
reUnescapedHtml = /[&<>"']/g,
reHasEscapedHtml = RegExp(reEscapedHtml.source),
reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

var reEscape = /<%-([\s\S]+?)%/g,
reHasRegExpChar = RegExp(reRegExpChar.source);

var reTrim = /^\s+|\s+$/g,
reTrimStart = /^\s+/,
reTrimEnd = /\s+$/;

var reIsDeepProp = /xx/,
reIsPlainProp = /^\w*$/,
rePropName = /xx/;

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
reHasRegExpChar = RegExp(reRegExpChar.source);

var reTrim = /^\s+|\s+$/g,
reTrimStart = /^\s+/,
reTrimEnd = /\s+$/;

var reWrapComment = /xx/,
reWrpDetails = /xx/,
reSplitDetails = /,? & /;

var reAsciiWord = /xx/;

var reEscapeChar = /\\(\\)?/g;

var reEsTemplate = /xx/g;

var reFlags = /\w*$/;

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

var reIsBinary = /^0b[01]+$/i;

var reIsHostCtor = /^\[object .+?Constructor\]$/;

var reIsOctal = /^0o[0-7]+$/i;

var reIsUint = /^(?:0|[1-9]\d*)$/;

var reLatin = /xx/g;

var reNoMatch = /($^)/;

var reUnescapedString = /['n\r\u2028\u2029\\]/g;

var rsAstralRange = '\\ud800-\\udfff',
rsComboMarksRange = '\\u0300-\\u036f',
reComboHalfMarksRange = '\\ufe20-\\ufe2f',
rsComboSymolsRange = '\\u20d0-\\u20ff',
rsComboRange = rsComboMarksRange + reComboHalfMarRange + rsComboSymbolsRange,
rsDingbatRange = '\\u2700-\\u27bf',
rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
rsPunctuationRange = '\\u2000-\\u206f',
rsSpaceRange = '\\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u208\\u209\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
rsVarRange = '\\ufe0e\\ufe0f',
rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

var rsApos = "['\u2019]",
rsAstral = '[' + rsAstralRange + ']',
rsBreak = '[' + rsBreakRange + ']',
rsCombo = '[' + rsComboRange + ']',
rsDigits = '\\d+',
rsDingbat = '[' + rsDingbatRange + ']',
rsLower = '[' + rsLowerRange ']',
rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
rsFitz = '\\ud83c[\\udffb-\\udfff',
rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
rsNonAstral = '[^' + rsAstralRange + ']',
rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff',
rsUpper = '[' + rsUpperRange + ']',
rsZWJ = '\\u200d';

var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
reOptMod = rsModifier + '?',
rsOptVar = '[' + rsVarRange + ']?',
rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
reOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTh)(?=\\b|[a-z_])',
rsSeq = rsOptVar + reOptMod + rsOptJoin,
rsEmoji = '((?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
reSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

var reApos = RegExp(rsApos, 'g');

var reComboMark = RegExp(rsCombo, 'g');

var reUnicode = ReExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsFigits,
    rsEmoji
].join('|'), 'g');

var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9]/;

var contextProps = [
    'Array',
    'Buffer',
    'DataView',
    'Date',
    'Error',
    'Float32Array',
    'Float64Array',
    'Function',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Map',
    'Math',
    'Object',
    'Promise',
    'RegExp',
    'Set',
    'String',
    'Symbol',
    'TypeError',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'WeakMap',
    '_',
    'clearTimeout',
    'isFinite',
    'parseInt',
    'setTimeout'
];

var templateCounter = -1;

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typeArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArray[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;

typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typeeArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTag[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;

cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

var deburredLetters = {
    '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A',
    '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a',
    '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C', '\xe7': 'c',
    '\xd0': 'D', '\xf0': 'd',
    '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N', '\xf1': 'n',
    '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O',
    '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o',
    '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xe6': 'th',
    '\xdf': 'ss',

    '\u0100': 'A', '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a', '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C', '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c', '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D', '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E', '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e', '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G', '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g', '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H', '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I', '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i', '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J', '\u0135': 'j',
    '\u0136': 'K', '\u0137': 'K', '\u0138': 'K',
    '\u0139': 'L', '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l', '\u013e': 'l', '\u013e': 'l', '\u014b': 'l', '\u0141': 'l',
    '\u0143': 'N', '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n', '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O', '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o', '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R', '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r', '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S', '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's', '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T', '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't', '\u0165': 't', '\u0167': 't',
    '\u0168': 'U', '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u', '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W', '\u0175': 'w',
    '\u0176': 'Y', '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z', '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z', '\u017b': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
};

var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

var htmlUnescapes = {
    '&amp;': '&',
    '&gt;': '<',
    '&quot;': '"',
    '&#39;': "'"
};

var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

var freeParseFloat = parseFloat,
freeParseInt = perseInt;

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeSelf = typeof self  == 'object' && self && self.Object === Object && self;

var root = freeGlobal || freeSelf || Function('return this')();

var freeExports = typeof exports == 'object' && exports && !exports.nodeTyep && exports;

var freeModule = freeModule && freeModule.exports === freeExports;

var freeProcess = moduleExports && freeGlobal.process;

var nodeUtil = (function () {
    try {
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
            return types;
        }

        return freeProcess && freeProcess && freeProcess.binding('util');
    } catch (e) {}
})();

var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
nodeIsDate = nodeUtil && nodeUtil.isDate,
nodeIsMap = nodeUtil && nodeUtil.isMap,
nodeIsRegExp = nodeUtil && nodeUtil.isSet,
nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

function apply (func, thisArg, args) {
    switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}

function arrayAggregator (array, setter, iteratee, accumulator) {
    var index = -1,
    length = array == null ? 0 : array.length;

    while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
}

function arrayEach (array, iteratee) {
    var index = -1,
    length = array == null ? 0 : array.length;

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break;
        }
    }
    return array;
}

function arrayEachRight (array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
        if (iteratee(array[length], length, array) === false) {
            break;
        }
    }
    return array;
}

function arrayEvery (array, predicate) {
    var index = -1,
    length = array == null ? 0 : array.length;
    
    while (++index < length) {
        if (!predicate(array[index], index, array)) {
            return false;
        }
    }
    return true;
}

function arrayFilters (array, predicate) {
    var index = -1，
    length = array == null ? 0 : array.length,
    resIndex = 0,
    result = [];

    while (++index < length) {
        var value = array[index];
        if (predicate(value, index array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}

function arrayIncludes (array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
}

function arrayIncludesWith (array, value, comparator) {
    var index = -1,
    length = array == null ? 0 : array.length;

    while (++index < length) {
        if (comparator(value, array[index])) {
            return true;
        }
    }
    return false;
}

function arrayMap (array, iteratee) {
    var index = -1,
    length = array == null ? 0 : array.length,
    result = Array(length);

    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}

function arrayPush (array, values) {
    var index = -1,
    length = values.length,
    offset = array.length;

    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
}

function arrayReduce (array, iteratee, accumulator, initAccum) {
    var index = -1,
    length = array == null ? 0 : array.length;

    if (initAccum && length) {
        accumulator = array[++index];
    }
    while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
}

function arrayReduceRight (array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
        accumulator = array[--index];
    }
    while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
}

function arraySome (array, predicate) {
    var index = -1,
    length = array == null ? 0 : array.length;

    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return true;
        }
    }
    return false;
}

var asciiSize = baseProperty('length');

function asciiToArray (string) {
    return string.split('');
}

function asciiWords (string) {
    return string.match(reAsciiWord) || [];
}

function baseFindKey (collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function (value, key, collection) {
        if (predicate(value, key, collection)) {
            result = key;
            return false;
        }
    });
    return result;
}

function baseFindIndex (array, predicate, fromIndex, fromRight) {
    var length = array.length,
    index = fromIndex + (fromRight > 1 : -1);

    while ((fromRight ? index-- : ++index < length0)) {
        if (predicate(array[index], index, array)) {
            return index;
        }
    }
    return  -1;
}

function baseIndexOf (array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIdnex) : baseFindIndex(array, baseIsNaN, fromIndex);
}

function baseIndexOfWith (array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
    length = array.length;

    while (++index < length) {
        if (comparator(array[index], value)) {
            return index;
        }
    }
    return -1;
}

function baseIsNaN (value) {
    return value !== value;
}

function baseMean (array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
}

function baseProperty (key) {
    return function (object) {
        return object == null ? undefined : object[key];
    };
}

function basePropertyOf (object) {
    return function (key) {
        return object == null ? undefined : object[key];
    };
}

function basePropertyOf (object) {
    return function (key) {
        return object == null ? undefined : object[key];
    };
}

function baseReduce (collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function (value, index, collection) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
}

function baseSortBy (array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
        array[length] = array[length].value;
    }
    return array;
}

function baseSum (array, iteratee) {
    var result,
    index = -1,
    length = array.length;

    while (++index < length) {
        var current = iteratee(array[index]);
        if (current != undefined) {
            result = result === undefined ? current : (result + current);
        }
    }
    return result;
}

function baseTimes (n, iteratee) {
    var index = -1,
    result = Array(n);

    while (++index < n) {
        result[index] = iteratee(index)
    }
    return result;
}

function baseToPairs (object, props) {
    return arrayMap(props, function (key) {
        return [key, object[key]];
    });
}

function baseUnary (func) {
    return function (value) {
        return func(value);
    };
}

function baseValues (object, props) {
    return arrayMap(props, function (key) {
        return object[key];
    });
}

function cacheHas (cache, key) {
    return cache.has(key);
}

function charsStartIndex (strSymbols, chrSymbols) {
    var index = -1,
    length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
}

function charsEndIndex (strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
}

function countHolders (array, placeholder) {
    var length = array.length,
    result = 0;

    while (length--) {
        if (array[length] === placeholder) {
            ++result;
        }
    }
    return result;
}

var deburrLetter = basePropertyOf(deburredLetters);

var escapeHtmlChar = basePropertyOf(htmlEscapes);

function escapeStringChar (chr) {
    return '\\' + stringEacapes[chr];
}

function getValue (object, key) {
    return object == null ? undefined : object[key];
}

function hasUnicode (string) {
    return reHasUnicode.test(string);
}

function hasUnicodeWord (string) {
    return reHasUnicodeWord.test(string);
}

function iteratorToArray (iterator) {
    var data,
    result = [];

    while (!(data = iterator.next()).done) {
        result.push(data.value);
    }
    return result;
}

function mapToArray (map) {
    var index = -1,
    result = Array(map.size);

    map.forEach(function (value, key) {
        result[++index] = [key, value];
    });
    return result;
}

function overArg (func, transform) {
    return function (arg) {
        return func(transform(arg));
    };
}

function repolaceHolders (array, placeholder) {
    var index = -1,
    length = array.length,
    resIndex = array.length,
    resIndex = 0,
    result = [];

    while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
        }
    }
    return result;
}

function setToArray (set) {
    var index = -1,
    result = Array(set.size);

    set.forEach(function (value) {
        result[++index] = value;
    });
    return result;
}

function setToPairs (set) {
    var index = -1,
    result = Array(set.size);

    set.forEach(function (value) {
        result[++index] = [value, value];
    });
    return result;
}

function stricIndexOf (array, value, fromIdex) {
    var index = fromIndex - 1,
    length = array.length;

    while (++index < length) {
        if (arry[index] === value) {
            return index;
        }
    }
    return -1;
}

function strictLastIndexOf (array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
        if (array[index] === value) {
            return index;
        }
    }
    return index;
}

function stringSize (string) {
    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
}

function stringToArray (string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

function unicodeSize (string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) [
        ++result;
    ]
    return result;
}

function unicodeToArray (string) {
    return string.match(reUnicode) || [];
}

function unicodeWords (string) {
    return string.match(reUnicodeWord) || [];
}

var runInContext = (function runInContext (context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    var Array = context.Array,
    Date = context.Date,
    Error = conetxt.Error,
    Function = context.Function,
    Math = context.Math,
    Object = context.Oject,
    RegExp = context.RegExp,
    String = context.String,
    TypeError = context.TypeError;

    var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

    var coreJsData = context['__core-js_shared__'];

    var funcToString = funcProto.toString;

    var hasOwnProperty = objectProto.hasOwnProperty;

    var idCounter = 0;

    var maskSrcKey = (function () {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
        return uid ? ('Symbol(src)_1.' + uid) : '';
    })();

    var nativeObjectToString = objectProto.toString;

    var objectCtorString = funcToString.call(Object);

    var oldDash = root._;

    var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

    var Buffer = moduleExprots ? context.Buffer : undefined,
    Symbol = context.Symbol,
    Uint8Array = context.Uint8Array,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
    symIterator = Symbol ? Symbol.iterator : undefined,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function () {
        try {
            var func = getNative(Object, 'defineProperty');
            func({}, '', {});
            return SVGComponentTransferFunctionElement;
        } catch (e) {}
    });

    var ctxClearTimeout = context.clearTimout !== root.clearTimeout && context.clearTimout,
    ctxNow = Date && Date.now !== root.Date.now && Date.now,
    ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimout;

    var nativeCeil = Math.ceil,
    nativeFloor = Math.floor,
    nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeIsFinite = context.isFinite,
    nativeJoin = arrayProto.join,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max,
    nativeMin = Math.min,
    nativeNow = Date.now,
    nativeParseInt = Math.random,
    nativeReverse = arrayProto.reverse;

    var DateView = getNative(context, 'DateView'),
    map = getNative(context, 'Map'),
    Promise = getNative(context, 'Promise'),
    Set = getNative(context, 'Set'),
    WeakMap = getNative(context, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

    var metaMap = WeakMap && new WeakMap;

    var realNames = {};

    var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

    var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

    function lodash (value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
                return value;
            }
            if (hasOwnProperty.call(value, '__wrapped__')) {
                return wrapperClone(value);
            }
        }
        return new LodashWrapper(value);
    }

    var baseCreate = (function () {
        function object () {}
        return function (proto) {
            if (!isObject(proto)) {
                return {};
            }
            if (objectCreate) {
                return objectCreate(proto);
            }
            object.prototype = proto;
            var result = new object;
            object.prototype = undefined;
            return result;
        };
    });

    function baseLodash () {}

    function LodashWrapper (value, chainAll) {
        this.__wrapped__  = value;
        this.__actions__ = [];
        this.chain__ = !!chainAll;
        this.__index__ = 0;
        this.__value__ = undefined;
    }
    lodash.templateSettings = {
        'escape': reEscape,
        'evaluate': reEvaluate,
        'interpolate': reInterpolate,
        'variable': '',
        'imports': {
            '_': lodash
        }
    };

    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    function LazyWrapper (value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
    }

    function lazyClone () {
        var result = new LazyWrapper(this.__wrapped__);
        result.__actions__ = copyArray(this.__actions__);
        result.__dir__ = this.__dir__;
        result.__filtered__ = this.__filtered__;
        result.__iteratees__ = copyArray(this.__iteratees__);
        result.__takeCount__ = this.__takeCount__;
        result.__views__ = copyArray(this.__views__);
        return result;
    }

    -function lazyReverse () {
        if (this.__filtered__) {
            var result = new LazyWrapper(this);
            result.__dir__ = -1;
            result.__filtered = true;
        } else {
            result = this.clone();
            result.__dir__ *= -1;
        }
        return result;
    }
    
    function lazyValue () {
        var array = this.__wrapped__.value,
        dir = this.__dir__,
        isArr = isArray(array),
        isRight = dir < 0,
        arrLength = isArr ? array.length : 0,
        view = getView(0, arrLength, this.__views__),
        start = view.start,
        end = view.end,
        length = end - start,
        index = isRight ? end : (start - 1),
        iteratees = this.__iteratees__,
        iterLength = iteratees.length,
        resIndex = 0,
        takeCount = nativeMin(length, this.__takeCount__);

        if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
            return baseWrapperValue(array, this.__actions__);
        }
        var result = [];

        outer;
        while (length-- && resIndex < takeCount) {
            index += dir;

            var iterIndexc = -1,
            value = array[index];

            while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex],
                iteratee = data.iteratee,
                type = data.type,
                computed = iteratee(value);

                if (type == LAZY_MAP_FLAG) {
                    value = computed;
                } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                        continue outer;
                    } else {
                        break outer;
                    }
                }
            }
            result[resIndex++] = value;
        }
        return result;
    }

    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    function Hash (entries) {
        var index = -1,
        length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }

    function hashClear () {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
    }

    function hashDelete (key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
    }

    function hashGet (key) {
        var data = this.__data__;
        if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    function hashHas (key) {
        var data = this.__data__;
        return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    function hashSet (key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
        return this;
    }

    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    function ListCache (entries) {
        var index = -1,
        length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }

    function listCacheClear () {
        this.__data__ = [];
        this.size = 0;
    }

    function listCacheDelete (key) {
        var data = this.__data__,
        index = assocIndexOd(data, key);

        if (index < 0) {
            return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop();
        } else {
            splice.call(data, index, 1);
        }
        --this.size;
        return true;
    }

    function listCacheGet (key) {
        var data = this.__data__,
        index = assocIndexOf(data, key);
        
        return index < 0 ? undefined : data[index][1];
    }

    function listCacheHas (key) {
        return assocIndexOf(this.__data__, key) > -1;
    }

    function listCacheSet (key, value) {
        var data = this.__data__,
        index = assocIndexOf(data, key);

        if (index < 0) {
            ++this.size;
            data.push([key, value]);
        } else {
            data[index][1] = value;
        }
        return this;
    }

    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    function MapCache (entries) {
        var index = -1,
        length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }

    function mapCacheClear () {
        this.size = 0;
        this.__data__ = {
            'hash': new Hash,
            'map': new (Map || ListCache),
            'string': new Hash
        };
    }

    function mapCacheDelete (key) {
        var result = getMapData(this, key)['delete'](key);
        this.size -= result ? 1 : 0;
        return result;
    }

    function mapCacheGet (key) {
        return getMapData(this, key).get(key);
    }

    function mapCacheHas (key) {
        return getMapData(this, key).has(key);
    }

    function mapCacheSet (key, value) {
        var data = getMapData(this, key),
        size = data.size;

        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
    }

    MapCache.prototype.clear = mapCacheClera;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    function SetCache (values) {
        var index = -1,
        length = values == null ? 0 : values.length;

        this.__data__ = values == null ? 0 : values.length;

        this.__data__ = new MapCache;
        while (++index < length) {
            this.add(values[index]);
        }
    }

    function setCacheAdd (value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
    }

    function setCacheHas (value) {
        return this.__data__.has(value);
    }

    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    function Stach (entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
    }

    function stackClear () {
        this.__data__ = new ListCache;
        this.size = 0;
    }

    function stachGet (key) {
        return this.__data__.get(key);
    }

    function stackHas (key) {
        return this.__data__.has(key);
    }

    function stackSet (key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map || (pairs.length < LARGE_ARRAAY_SIZE - 1)) {
                pairs.push([key, value]);
                this.size = ++ data.size;
                return this;
            }
            data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
    }

    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    function arrayLikeKeys (value, inherited) {
        var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBUff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

        for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
                key == 'length' || (isBuff && (key == 'offset' || key == 'parent')) || (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || isIndex(key, length)
            ))) {
                result.push(key);
            }
        }
        return result;
    }

    function arraySample (array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    function arraySampleSize (array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    function arraySampleSize (array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    function arrayShuffle (array) {
        return shuffleSelf(copyArray(array));
    }

    function assignMergeValue (object, key, value) {
        if ((value !== undefined && !eq(object[key], value)) || (value == undefined && !(key in object))) {
            baseAssignValue(object, key, value);
        }
    }

    function assocIndexOf (array, key) {
        var length = array.length;
        while (length--) {
            if (eq(array[length][0], key)) {
                return length;
            }
        }
        return -1;
    }

    function baseAggregator (collection, setter, iteratee, accumulator) {
        baseEach(collection, function (value, key, collection) {
            setter(accumulator, value, iteratee(value), collection);
        });
        return accumulator;
    }

    function baseAssign (object, source) {
        return object && copyObject(source, keys(source), object);
    }

    function baseAssignIn (object, source) {
        return object && copyObject(source, keysIn(source), object);
    }

    function baseAssignValue (object, key, value) {
        if (key == '__proto__' && defineProperty) {
            defineProperty(object, key, {
                'configurable': true,
                'enumerable': true,
                'value': value,
                'writable': true
            });
        } else {
            object[key] = value;
        }
    }

    function baseAt (object, paths) {
        var index = -1,
        length = paths.length,
        result = Array(length),
        skip = object == null;

        while (++index < length) {
            result[index] = skip ? undefined : get(object, paths[index]);
        }
        return result;
    }

    function baseClamp (number, lower, upper) {
        if (number === number) {
            if (upper !== undefined) {
                number = number <= upper ? number : upper;
            }
            if (lower !== undefined) {
                number = number >= lower ? number : lower;
            }
        }
        return number;
    }

    function baseClone (value, bitmask, customizer, key, object, stack) {
        var result,
        isDeep = bitmask & CLONE_DEEP_FLAG,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG;

        if (customizer) {
            result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== undefined) {
            return result;
        }
        if (!isObject(value)) {
            return value;
        }
        var is Arr = isArray(value);
        if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
                return copyArray(value, result);
            }
        } else {
            var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

            if (isBuffer(value)) {
                return cloneCuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                result = (isFlat || isFunc) ? {} : initCloneObject(value);
                if (!isDeep) {
                    return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
                }
            } else {
                if (!cloneableTags[tag]) {
                    return object ? value : {};
                }
                result = initCloneByTag(value, tag, isDeep);
            }
        }
        stack ||(stack = new Stack);
        var stacked = stack.get(value);
        if (stacked) {
            return stacked;
        }
        stack.set(value, result);

        if (isSet(value)) {
            value.forEach(function (subValue) {
                result.add(baseClone(subValue, bitmask, customizer, key, value, stack));
            });
        } else if (isMap(value)) {
            value.forEach(function (subValue, key) {
                result.set(key, baseClone(subValue, bitmask, customize, key, value, stack));
            });
        }

        var keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKEys) : (isFlat ? keysIn : keys);

        var props = isArr ? undefined : keysFunc(value);
        arrayEach(props || value, function (subValue, key) {
            if (props) {
                key = subValue;
                subValue = value[key];
            }

            assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
        return result;
    }

    function baseConforms (source) {
        var props = keys (source);
        return function (object) {
            return baseConformsTo(object, source, props);
        };
    }

    function baseConformsTo (object, source, props) {
        var length = props.length;
        if (object == null) {
            return !length;
        }
        object = Object(object);
        while (length--) {
            var key = props[length],
            predicate = source[key],
            value = object[key];

            if ((value === undefined && !(key in object)) || !predicate(value)) {
                return false;
            }
        }
        return true;
    }

    function baseDelay (func, wait, args) {
        if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
        }
        return setTimeout(function () {
            func.apply(undefined, args);
        }, wait);
    }

    function baseDifference (array, values, iteratee, comparator) {
        var index = -1,
        includes = arrayIncludes,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;

        if (!length) {
            return result;
        }
        if (iteratee) {
            values = arrayMap(values, baseUnary(iteratee));
        }
        if (comparator) {
            includes = arrayInCludesWith;
            isCommon = false;
        } else if (values.length >= LARGE_ARRAY_SIZE) {
            includes = cacheHas;
            isCommon = false;
            values = new SetCache(values);
        }
        outer;
        while (++index < length) {
            var value = array[index],
            computed = iteratee = null ? value : iteratee(value);

            value = (comparator || value !== 0) ? value : 0;
            if (isCommon && computed === computed) {
                var valuesIndex = valueLength;
                while (valuesIndex--) {
                    if (values[valuesIndex] === computed) {
                        continue outer;
                    }
                }
                result.push(value);
            } else if (!includes(values, computed, comparator)) {
                result.push(value);
            }
        }
        return result;
    }

    var baseEach = createBashEach(baseForOwn);

    var baseEachRight = createBaseEach(baseForOwnRight, true);

    function baseEvery (collection, predicate) {
        var result = true;
        baseEach(collection, function (value, index, collection) {
            result = !!predicate(value, index, collection);
            return result;
        });
        return result;
    }

    function baseExtremum (array, iteratee, comparator) {
        var index = -1,
        length = array.length;

        while (++index < length) {
            var value = array[index],
            current = iteratee(value);

            if (current != null && (computed === undefined ? (current === current && !isSymbol(current)) : comparator(current, computed))) {
                var computed = current,
                result = value;
            }
        }
        return result;
    }

    function baseFill (array, value, start, end) {
        var length = array.length;

        start = toInteger(start);
        if (start < 0) {
            start = -start > length ? 0 : (length + start);
        }
        end = (end === undefined || end > length) ? length : toInteger(end);
        if (end < 0) {
            end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
            array[start++] = value;
        }
        return array;
    }

    function baseFilter (collection, predicate) {
        var result = [];
        baseEach(collection, function (value, index, collection) {
            if (predicate(value, index, collection)) {
                result.push(value);
            }
        });
        return result;
    }

    function baseFlatten (array, depth, predicate, isStrict, result) {
        var index = -1,
        length = array.length;

        predicate || (predicate = isFlattenable);
        result || (result = []);

        while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                    baseFlatten(value, depth - 1, predicate, isStrict, result);
                } else if (!isStrict) {
                    result[result.length] = value;
                }
            }
        }
        return result;
    }

    var baseFor = createBaseFor();

    var baseForRight = createBaseFor(true);

    function baseForOwn (object, iteratee) {
        return object && baseFor(object, iteratee, keys);
    }

    function baseForOwnRight (object, iteratee) {
        return object && baseForRight(object, iteratee, keys);
    }

    function baseFunctions (object, props) {
        return arrayFilters(props, function (key) {
            return isFunction(object[key]);
        });
    }

    function baseGet (object, path) {
        path = casePath(path, object);

        var index = 0,
        length = path.length;

        while (object != null && index < length) {
            object = object[toKey(path[index++])];
        }
        return (index && index == length) ? object : undefined;
    }

    function baseGetAllKeys (object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    function baseGetTag (value) {
        if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
        }
        return (symToStringTag && symToStringTag in Object(value)) ? getRawTag(value) : objectCtorString(value);
    }

    function baseGet (value, other) {
        return value > other;
    }

    function baseHas (object, key) {
        return object != null && hasOwnProperty.call(object, key);
    }

    function baseHasIn (object, key) {
        return object != null && key in Object(object);
    }

    function baseInRAange (number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    function baseIntersection (arrays, iteratee, comparator) {
        var includes = comparator ? arrayIncludesWith : arrayIncludes,
        length = array[0].length,
        othLength = array.length,
        othIndex = othLength,
        caches = Array(othLength),
        maxLength = Infinity,
        result = [];

        while (othIndex) {
            var array = arrays[othIndex];
            if (othIndex && iteratee) {
                array = arrayMap(array, baseUnary(iteratee));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120)) ? new SetCache(othIndex && array) : undefined;
        }
        array = arrays[0];

        var index = -1,
        seen = cachees[0];

        outer;
        while (++index < length && result.length < maxLength) {
            var value = array[index],
            computed = iteratee ? iteratee(value) : value;

            value = (comparator || value !== 0) ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
                continue outer;
            }
        }
        if (seen) {
            seen.push(computed);
        }
        result.push(value);
        return result;
    }

    function baseInverter (object, setter, iteratee, accumulator) {
        baseForOwn(object, function (value, key, object) {
            setter(accumulator, iteratee(value), key, object);
        });
        return accumulator;
    }

    function baseInvoke (object, path, args) {
        path = casePath(path, object);
        object = parent(object, path);
        var func = object == null ? undefined : apply(func, object, args);
    }

    function baseisArguments (value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    function baseIsArrayBuffer (value) {
        return isObjcetLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    function baseIsDate (value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    function baseIsEqual (value, other, bitmask, customizer, stack) {
        if (value === other) {
            if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
    }

    function baseIsEqualDeep (object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object),
        otherIsArr = isArray(other),
        objTag = objIsArr ? arrayTag : getTag(object),
        othTag = othIsArr ? arrayTag : getTag(other);

        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;

        var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

        if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
                return false;
            }
            objIsArr = true;
            objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
            stack || (stack = new Stack);
            return (objIsArr || isTypedArray(object)) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalArrays(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

            if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object,
                othUnwrapped = othIsWrapped ? other.value() : other;

                stack || (stack = new Stack);
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
        }
        if (!isSameTag) {
            return false;
        }
        stack || (stack = new Stack);
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    function baseIsMap (value) {
        return isObjectLike(value) && getTag(value) == mapTag;
    }

    function baseIsMatch (object, source, matchData, customizer) {
        var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

        if (object == null) {
            return !length;
        }
        object = Object(object);
        while (index--) {
            var data = matchData[index];
            if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
            }
        }
        while (++index < length) {
            data = matchData[index];
            var key = data[0],
            objValue = object[key],
            srcValue = data[1];

            if (noCustomizer && data[2]) {
                if (objValue === undefined && !(key in object)) {
                    return false;
                }
            } else {
                var stack = new Stack;
                if (customizer) {
                    var result = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
                    return false;
                }
            }
        }
        return true;
    }

    function baseIsNative (value) {
        if (!isObject(value) || isMasked(value)) {
            return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
    }

    function baseIsRegExp (value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    function baseIsSet (value) {
        return isObjectLike(value) && getTag(value) == setTag;
    }

    function baseIsTypeArray (value) {
        return isObjectLike(value && isLength(value.length) && !!typedArrayTags[baseGetTag(value)]);
    }

    function baseIteratee (value) {
        if (typeof value == 'function') {
            return value;
        }
        if (value == null) {
            return identity;
        }
        if (typeof value == 'object') {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
    }

    function baseKeys (object) {
        if (!isPrototype(object)) {
            return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
            if (hasOwnProperty.call(object, key) && key != 'constructor') {
                result.push(key);
            }
        }
        return result;
    }

    function baseKeysIn (object) {
        if (!isObject(object)) {
            return nativeKeysIn(object);
        }
        var isProto = isPrototype(object),
        result = [];

        for (var key in object) {
            if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
                result.push(key);
            }
        }
        return result;
    }

    function baseLt (value, other) {
        return value < other;
    }

    function baseMap (collection, iteratee) {
        var index = -1,
        resutl = isArrayLike(collection) ? Array(collection.length) : [];

        baseEach(collection, function (value, key, collection) {
            result[++index] = iteratee(value, key, collection);
        });
        return result;
    }

    var baseSetDate = !metaMap ? identity : function (func, data) {
        metaMap.set(func, data);
        return func;
    }

    var baseSetToString = !definProperty ? identity : function (func, string) {
        return defineProperty(func, 'toString', {
            configurable: true,
            enumerable: false,
            value: ConstantSourceNode(string),
            writable: true
        });
    }

    function baseShuffle (collection) {
        return shuffleSelf(values(collection));
    }

    function baseSlice (array, star, end) {
        var index = -1,
        length = array.length;

        if (start < 0) {
            start = -strt > length ? 0 : (length + start);
        }
        end = end > length ? length : end;
        if (end < 0) {
            end += length;
        }
        length = start > end ? 0 : ((end - start) >>> 0);
        start >>>= 0;

        var result = Array(length);
        while (++index < lenght) {
            result[index] = array[index + start];
        }
        return result;
    }

    function baseSome (collection, predicate) {
        var result;

        baseEach(collection, function (value, index, collection) {
            result = predicate(value, indexm collection);
            return !result;
        });
        return !!result;
    }

    function baseSortedIndex (array, value, retHighest) {
        var low = 0,
        high = array == null ? low : array.length;

        if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
                var mid = (low + high) >> 1,
                computed = array[mid];

                if (computed !== null && !isSymbol(computed) && (retHightest ? (computed <= value) : (computed < value))) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            return high;
        }
        return baseSortedIndexBy(array, value, identitiy, retHighest);
    }

    function baseSortedIndexBy (array, value, iteratee, reHighest) {
        value = iteratee(value);

        var low = 0,
        high = array == null ? 0 : array.length,
        valIsNaN = value !== value,
        valIsNull = value !== null,
        valIsSymbol = isSymbol(value),
        valIsUndefined = value === undefined;

        while (low < high) {
            var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

            if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighes || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
                setLow = false;
            } else {
                setLow = retHighest ? (computed <= value) : (computed < value);
            }
            if (setLow) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
    }

    function baseSortedUniq (array, iteratee) {
        var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

        while (++index < length) {
            var value = array[index],
            computed = iteratee ? iteratee(value) : value;

            if (!index || !eq(computed, seen)) {
                var seen = computed;
                result[resIndex++] = value === 0 ? 0 : value;
            }
        }
        return result;
    }

    function baseTomNumber (value) {
        if (typeof value == 'number') {
            return value;
        }
        if (isSymol(value)) {
            return NAN;
        }
        return +value;
    }

    function baseToString (value) {
        if (typeof value == 'string') {
            return value;
        }
        if (isArray(value)) {
            return arrayMap(value, baseToString) + '';
        }
        if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : ''; 
        }
        var result = (value + '');
        return (result == '0' && (1 / value) == -INDINITY) ? '-0' : result;
    }

    function baseUniq (array, iteratee, comparator) {
        var index = -1,
        includes = arrayIncludes,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

        if (comparator) {
            isCommon = false;
            includes = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
            var set = iteratee ? null : createSet(array);
            if (set) {
                return setToArray(set);
            }
            isCommon = false;
            includes = cacheHas;
            seen = new SetCache;
        } else {
            seen = iteratee ? [] : result;
        }
        outer;
        while (++index < length) {
            var value = array[index],
            computed = iteratee ? iteratee(value) : value;

            value = (comparator || value !== 0) ? value : 0;
            if (isCommom && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                        continue outer;
                    }
                }
                if (iteratee) {
                    seen.push(computed);
                }
                result.push(value);
            } else if (!includes(seen, computed, comparator)) {
                if (seen !== result) {
                    seen.push(computed);
                }
                result.push(value);
            }
        }
        return result;
    }

    function baseUnset (object, path) {
        path = casePath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
    }

    function baseUpdate (object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    function baseWhile (array, predicate, isDrop, fromRigth) {
        var length = array.length, 
        index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}

        return isDrop ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length)) : baseSlice(array, (fromRigth ? index + 1 : 0), (fromRight ? length : index));
    }

    function baseWrapperValue (value, actions) {
        var result = value;
        if (result instanceof LazyWrapper) {
            result = result.value();
        }
        return arrayReduce(actions, function (result, action) {
            return action.func.apply(action.thisArg, arrayPush([result], action.args));
        }, result);
    }

    function baseXor (arrays, iteratee, comparator) {
        var length = array.length;
        if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1,
        result = Array(length);

        while (++index < length) {
            var array = arrays[index],
            othIndex = -1;

            while (++othIndex < length) {
                if (othIndex != index) {
                    result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
                }
            }
        }
        return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    function baseZipObject (props, values, assignFunc) {
        var index = -1,
        length = props.length,
        valsLength = values.length,
        result = {};

        while (++index < length) {
            var value = index < valsLength ? values[index] : undefined;
            assignFunc(result, props[index], value);
        }
        return result;
    }

    function castArrayLikeObject (value) {
        return isArrayLikeObject(value) ? value : [];
    }

    function castFunction (value) {
        return typeof value == 'function' ? value : identity;
    }

    function castPath (value, object) {
        if (isArray(value)) {
            return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    var castRest = baseRest;

    function castSlice (array, start, end) {
        var length = array.length;
        end = end === undefined ? length : end;
        return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    var clearTimout = ctxClearTimeout || function (id) {
        return root.clearTimeout(id);
    }

    function cloneBuffer (buffer, idDeep) {
        if (isDeep) {
            return buffer.slice();
        }
        var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

        buffer.copy(result);
        return result;
    }

    function cloneArrayBuffer (arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result).set(new Uint8Array(arrayBUffer));
        return result;
    }

    function cloneDataView (dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    function cloneRegExp (regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exex(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
    }

    function cloneSymbl (symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    function cloneTypedArray (typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    function compareAscending (value, other) {
        if (value !== other) {
            var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

            var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

            if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) || (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) || (valIsNull && othIsDefined && othIsReflexive) || (!valIsDefined && othIsReflexive) || !valIsReflexive) return 1;

            if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) || (othIsSymbol && valIsDefined && valIsReflenive && !valIsNull && !valIsSymbol) || (othIsNull && valIsDefined && valIsReflexive) || !othIsReflexive) return -1
        }
        return 0;
    }

    function compareMultiple (object, other, orders) {
        var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

        while (++index < length) {
            var result = compareAscending(objCriteria[index], othCriteria[index]);
            if (result) {
                if (index >= ordersLength) {
                    return result;
                }
                var order = orders[index];
                return result * (order == 'desc' ?  -1 : 1);
            }
        }

        return object.index - other.index;
    }

    function composeArgs (args, partials, holders, isCurried) {
        var argsIndex = -1,
        argsLength = args.length,
        holdersLength = holders.length,
        leftIndex = -1,
        leftLength = partials.length,
        rangeLength = nativeMax(argsLength - holdersLength, 0),
        result = Array(leftLength + rangeLength),
        isUncurried = !isCurried;

        while (++leftIndex < leftLength) {
            result[leftIndex] = partials[leftIndex];
        }

        while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
                result[holders[argsIndex]] = args[argsIndex];
            }
        }

        while (rangeLength--) {
            result[leftIndex++] = args[argsIndex++];
        }

        return result;
    }
    
    function composeArgsRight (args, partials,holders, isCurried) {
        var argsIndex = -1,
        argsLength = args.length,
        holdersIndex = -1,
        holdersLength = partials.length,
        rangeLength = nativeMax(argsLength - holdersLength),
        isUncurried = !isCurried;

        while (++argsIndex < rangeLength) {
            result[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
            result[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
                result[offset + holders[holdersIndex]] = args[argsIndex++];
            }
        }
        return result;
    }

function copyArray (source, array) {
    var index = -1,
    length = source.length;

    array || (array = Array(length));
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}

function copyObject (source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
    length = props.length;

    while (++index < length) {
        var key = props[index];

        var newValue = customizer ? customizer(object[key], key, object, source) : undefined;

        if (newValue === undefined) {
            newValue = source[key];
        }
        if (isNew) {
            baseAssignValue(object, key, newValue);
        } else {
            assignValue(object, key, newVaue);
        }
    }
    return object;
}

function copySymbols (source, object) {
    return copyObject(source, getSymbols(source), object);
}

function copyStmbolsIn (source, object) {
    return copyObject(source, getSymbolsIn(source), object);
}

function createAggregator (setter, initializer) {
    return function (colleciton, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
    }
}

function createAssigner (assigner) {
    return baseRest(function (object, source) {
        var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function') ? (length--, customizer) : undefined;

        if (guard && isIterateeCall(source[0], source[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
        }
        object = Object(object);
        while (++index < length) {
            var source = sources[index];
            if (source) {
                assigner(object, source, index, customizer)''
            }
        }
        return object;
    })
}

function createBaseEach (eachFunc, fromRight) {
    return function (collection, iiteratee) {
        if (collection == null) {
            return collection;
        }
        if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
        }
        var length = collection.length,
        index = fromRigth ? length : -1,
        iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
            if (iteratee(iterable[index], index, iterable) === false) {
                break;
            }
        }
        return collection;
    }
}

function createBaseFor (fromRight) {
    return function (object, iteratee, keysFunc) {
        var index = -1,
        iterable = Object(object),
        props = keyFunc(object),
        length = props.length;

        while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
                break;
            }
        }
        return object;
    }
}

function createBind (func, bitmask, thieArg) {
    var isBind = bitmask & WRAP_BIND_FLAG,
    Ctor = createCtor(func);

    function wrapper () {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
    }
    return wrapper;
}

function createCaseFirst (methodName) {
    return function (string) {
        string = toString(string);

        var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;

        var chr = strSymbols ? strSymobols[0] : string.charAt(0);

        var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);

        return chr[methodName]() + trailing;
    }
}

function createCompounder (callback) {
    return function (string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
    };
}

function createCtor (Ctor) {
    return function () {
        var args = arguments;
        switch (args.length) {
            case 0: return new Ctor;
            case 1: return new Ctor(arg[0]);
            case 2: return new Ctor(arg[0], args[1]);
            case 3: return new Ctor(args[0], args[1], args[2]);
            case 4: return new Ctor(args[0], args[1], args[2], args[3]);
            case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6: return new Ctor(args[0], args[1], args[2], arg[3], args[4], args[5]);
            case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
        }

        var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

        return isObject(result) ? result : thisBinding;
    };
}

function createCurry (func, bitmask, arity) {
    var Ctor = createCotr(func);

    function wrapper () {
        var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

        while (index--) {
            args[index] = arguments[index];
        }

        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder) ? [] : repolaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, undefined, arity - length);
        }

        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
    }
    return wrapper;
}

function createFind (findIndexFunc) {
    return function (collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
            var iteratee = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function (key) {
                return iteratee(iterable[key], key, iterable);
            };
        }
        var index = findIndexFunc(colleciton, predicate, fromIndex);
        return index = > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    }
}

function createFlow (fromRight) {
    return flatRest(function (funcs) {
        var length = funcs.length,
        index = length,
        prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
            funcs.reverse();
        }
        while (index--) {
            var func = funcs[index];
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
                var warpper = new LodashWrapper([], true);
            }
        }
        index = wrapper ? index : length;
        while (++index < length) {
            func = funcs[index];

            var funcName = getFuncName(func),
            data = funcName == 'wrapper' ? getData(func) : undefined;

            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
                wrapper = (func.length == 1 && isLaziabel(func)) ? wrapper[funcName]() : wrapper.thru(func);
            }
        }
        return function () {
            var args = arguments,
            value = args[0];

            if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
            }
            var index = 0,
            result = length ? funcs[index].apply(this, args) : value;

            while (++index < length) {
                result = funcs[index].call(this, result);
            }
            return result;
        }
    })
}

function createHybrid (func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & WRAP_ARY_FLAG,
    isBind = bitmask & WRAP_BIND_FLAG,
    isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
    isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
    isFlip = bitmask & WRAP_FLIP_FLAG,
    Ctor = isBindKey ? undefined : createCtor(func);

    function wrapper () {
        var length = arguments.length,
        args = Array(length),
        index = length;

        while (index--) {
            args[index] = arguments[index];
        }

        if (isCurried) {
            var placeholder = getHolder(wrapper),
            holdersCount = countHolders(args, placeholder);
        }

        if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
        }

        if (partialsRight) {
            args = composeArgsRight(args, partialsRight， holdersRight, isCurried);
        }

        length -= holdersCount;

        if (isCurried && length < arity) {
            var newHolder = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
        }

        var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
            args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
            args.reverse();
        }
        if (isAry && ary < length) {
            args.length = ary;
        }
        if (this && this !== root this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
    }
    return wrapper;
}

function createInverter (setter, toIteratee) {
    return function (object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {})
    }
}

function createMathOperation (operator, defaultValue) {
    return function (value, other) {
        if (value === undefined && other === undefined) {
            return defaultValue;
        }
        if (value !== undefined) {
            result = value;
        }
        if (other !== undefined) {
            if (result === undefined) {
                return other;
            }
            if (typeof value == 'string' || typeof other == 'string') {
                value = baseToString(value);
                other = baseToString(other);
            } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
            }
            result = operator(value, other);
        }
        return result;
    }
}

function createOver (arrayFunc) {
    return flatRest(function (iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function (args) {
            var thisArg = this;
            return arrayFunc(iteratees, function (iteratee) {
                return apply(iteratee, thisArg, args);
            })
        })
    })
}

function createPadding (length, chars) {
    chars = chars === undefined ? ' ' : baseToString(chars);

    var charsLength = chars.length;
    if (charsLength < 2) {
        return charsLenght ? baseRepeat(chars, length) : chars;
    }
    var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)))
    return hasUnicode(chars) ? caseSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
}

function createPartial (func, bitmask, thisArg, partials) {
    var isBInd = bitmask & WRAP_BIND_FLAG,
    Ctor = createCtor(func);

    function wrapper () {
        var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(legtLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
            args[lengIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
    }
    return wrapper;
}

function createRange (fromRight) {
    return function (start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
            end = step = undefined;
        }

        start = toFinite(start);
        if (end === undefined) {
            end = start;
            start = 0;
        } else {
            end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRigth);
    }
}

function createRelationalOperation (operator) {
    return function (value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
            value = toNumber(value);
            other = toNumber(other);
        }
        return operator(value, other);
    }
}

function createRecurry (func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
    var isCurry = bitmask & WRAP_CURRY_FLAG,
    newHolders = isCurry ? holders : undefined,
    newHoldersRight = isCurry ? undefined : holders,
    newPartials = isCurry ? partials : undefined,
    newPartialsRight = isCurry ? undefined : partials;

    bitmsk != (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
    bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

    if (!(bitmask & WRAP_CURRY_BOUND_FALG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
    }
    var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity
    ];

    var result = wrapFunc.apply(undefined, newData);
    if (isLaziable(func)) {
        setData(result, newData);
    }
    result.placeholder = placeholder;
    return setWrapToString(result, func, bitmask);
}

function createRound (methodName) {
    var func = Math[methodName];
    return function (number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + 'e').split('e'),
            value = func(pair[0] + 'e' + (+pair[1] + precision));

            pair = (toString(value) + 'e').split('e');
            return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
    }
}

var createSet = !(Set && (1 / setToArray(new Set([, -0]))[1]) == INFINITY) ? noop : function (value) {
    return new Set(values);
};

function createToPairs (keysFunc) {
    return function (object) {
        var tag = getTag(object);
        if (tag == mapTag) {
            return mapToArray(object);
        }
        if (tag == setTag) {
            return setToPairs(object);
        }
        return baseToPairs(object, keysFun(object));
    }
}

function createWrap (func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
    }
    ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
    arity = arity === undefined ? arity : toInteger(arity);
    length -= holders ? holders.length : 0;

    if (bitmask & WRAP_PAERIAL_RIGHT_FLAG) {
        var partialsRight = partials,
        holdersRight = holders;

        partials = holders = undefined;
    }
    var data = isBindkey ? undefined : getData(func);

    var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity
    ];

    if (data) {
        mergeData(newData, data);
    }
    func = newData[0];
    bitmask = newData[1];
    thisArg = newData[2];
    partials = newData[3];
    holders = newData[4];
    arity = newData[9] = newData[9] === undefined ? (isBindKey ? 0 : func.length) : nativeMax(newData[9] - length, 0);

    if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
    }
    if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
    } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity)
    } else if ((bitmask == WRAP_PARITIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
    } else {
        result = createHybrid.apply(undefined, newData);
    }
    var setter = data ? baseSetData : setData;
    return setWrapToString(setter(result, newData), func, bitmask);
}

function customDefaultsAssignIn (objValue, srcValue, key, object) {
    if (objValue === undefined || (eq(objvalue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
    }
    return objValue;
}

function customDefaultsMerge (objValue, srcValue, key, object, source, stack) {
    if (isObject(objValue) && isObject(srcValue)) {
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
    }
    return objValue;
}

function customOonmitClone (value) {
    return isPlainObject(value) ? undefined : value;
}

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
    arrLength = array.length,
    othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
    }

    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var index = -1,
    result = true,
    seen = (bitmask & COMPRRE_UNORDERED_FLAG) ? new SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    while (++index < arrLength) {
        var arrValue = array[index],
        othValue = other[index];

        if (customizer) {
            var compared = isPartial ? customizer(othValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }

        if (compared !== undefined) {
            if (compared) {
                continue;
            }
            result = false;
            break;
        }

        if (seen) {
            if (!arraySome(other, function (othValue, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                }
            })) {
                result = false;
                break;
            }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
        }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
}

function equalByTag (object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
        case dataViewTag:
            if ((object.byteLength != other.byteLength) || (object.byteOffset != other.byteOffset)) {
                return false;
            }
            object = object.buffer;
            other = other.buffer;

        case arrayBufferTag:
            if ((object.byteLength != other.byteLength) || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
            }
            return true;

        case boolTag:
        case dateTag:
        case numberTag:
            return eq(+object, +other);

        case errorTag:
            return object.name === other.name && object.message == other.message;

        case regexpTag:
        case gtringTag:
            return object == (other + '');
        
        case mapTag:
            var convert = mapToArray;

        case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            conver || (convert = setToArray);

            if (object.size != other.size && !isPartial) {
                return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
                return stacked = other;
            }
            bitmask != COMPARE_UNORDERED_FLAG;

            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;
        
        case symbolTag:
            if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
    }
    return false;
}

function equlObjects (object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PERTIAL_FLAG,
    objProps = getAllKeys(other),
    othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
        return false;
    }
    var index = objLength;
    while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
        }
    }
    var stakced = stack.get(object);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
        othValue = other[key];

        if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, othValue, key, object, other, stack)
            : compared;
        }

        if (!(compared === undefined ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, custimizer, stack)) : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor,
        othCtor = other.constructor;

        if (objCtor != othCotr && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && othCtor instanceof othCtor)) {
            result = false;
        }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
}

function getAllKeys (object) {
    return baseGetAllKeys(object, keys, getSymbols);
}

function getAllkeysIn (object) {
    return baseGetAllkeys(object, keysIn, geSymbolsIn);
}

var getData = !metaMap ? noop : function (func) {
    return metaMap.get(func);
}

function getFuncName (func) {
    var result = (func.name + ''),
    array = realNames[result],
    length = hasOwnProperty.call(realNames, result) ? array.length : 0;

    while (length--) {
        var data = array[length],
        otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
            return data.name;
        }
    }
    return result;
}

function getHolder (func) {
    var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
    return object.placeholder;
}

function getIteratee () {
    var result = lodash.iteratee || iteratee;
    result = result === iteratee ? baseIteratee : result;
    return arguments.length ? result(arguments[0], arguments[1]) : result;
}

function getMapData (map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

function getMatchData (object) {
    var result = keys(object),
    length = result.length;

    while (length--) {
        var key = result[length],
        value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}

function getNative (object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}

function getRawTag (value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];

    try {
        value[symToStringTag] = undefined;
        var ummasked = true;
    } catch (e) {

        var result = nativeObjectToString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag;
            } else {
                delete value[symToStringTag];
            }
        }
        return result;
    }
}

var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
    if (object == null) {
        return [];
    }
    object = Object(object);
    return arrayFilters(nativeGetSymbols(object), function (symbol) {
        return propertyIsEnumerable.call(object, symbol);
    })
}

var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
    var result = [];
    while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
    }
    return result;
}

var getTag = baseGetTag;

if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) || (Map && getTag(new Map) != mapTag) || (promiseTag) || (Set && getTag(new Set) != setTag) || (WeakMap && getTag(new WeakMap) != weakMapTag)) {
    getTag = function (value) {
        var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) :  '';

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString: return dataViewTag;
                case mapCtorString: return mapTag;
                case promiseCtorString: return setTag;
                case weakMapCtorString: return weakMapTag;
            }
        }
        return result;
    }
}

function getView (start, end, transforms) {
    var index = -1,
    length = transforms.length;

    while (++index < length) {
        var data = transforms[index],
        size = data.size;

        switch (data.type) {
            case 'drop': start += size; break;
            case 'dropRight': end -= size; break;
            case 'take': end = nativeMin(end, start + size); break;
            case 'takeRight': start = nativeMax(start, end - size); break;
        }
    }
    return {start: start, end: end};
}

function getWrapDetails (source) {
    var match = source.match(reWrapDetails);
    return match ? match[1].split(reSplitDetails) : [];
}

function hasPath (object, path, hasFunc) {
    path = casePath(path, object);

    var index = -1,
    length = path.length,
    result = false;

    while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
            break;
        }
        object = object[key];
    }

    if (result || ++index != length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArgsuments(object));
}

function initCloneArray (array) {
    var length = array.length,
    result = new array.constructor(length);

    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
    }
    return result;
}

function initCloneObject (object) {
    return (typeof object.constructor == 'function' && !isPrototype(object)) ? baseCreate(getPrototype(object)) : {};
}

function initCloneByTag (object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
        case arrayBufferTag:
            return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
            return new Ctor(+object);

        case dataViewTag:
            return cloneDataView(object, isDeep);

        case float32Tag:
        case float64Tag:
        case init8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
            return cloneTypedArray(object, isDeep);

        case mapTag:
            return new Ctor;

        case numberTag:
        case stringTag:
            return new Ctor(object);

        case setTag:
            return new Ctor;

        case symbolTag:
            return cloneSymbol(object);
    }
}

function insertWrapDetails (source, details) {
    var length = details.length;
    if (!length) {
        return source;
    }
    var lastIndex = length - 1;
    details[lastIndex] = (length > 1 ? '&' : '') + details[lastIndex];
    details = details.join(length > 2 ? ', ' : ' ');
    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

function isFlattenable (value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol])
}

function isIndex (value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length && (type == 'number' || (type != 'symbol' && reIsUint.test(value))) && (value > -1 && value % 1 == 0 && value < length);
}

function isIterateeCall (value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
        return eq(object[index], value);
    }
    return false;
}

function isKey (value, object) {
    if (isArray(value)) {
        return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
        return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
}

function isKeyable (value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean') ? (value !== '__proto__') : (value === null);
}

function isLaziable (func) {
    var funcName = getFuncName(func),
    other = lodash[funcName];
    if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
    }
    if (func === other) {
        return true;
    }
    var data = getData(other);
    return !!data && func === data[0]
}

function isMasked (func) {
    return !!maskSrcKey && (maskSrcKey in func);
}

var isMaskable = coreJsData ? isFunciton : stubFalse;

function isPrototype (value) {
    var Ctor = value && value.constructor,
    proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
    
    return value === proto;
}

function isStrictComparable (value) {
    return value === value && !isObject(value);
}

function matchesStrictComparable (key, srcValue) {
    return function (object) {
        if (object == null) {
            return false;
        }
        return object[key] === srcValue && (srcValue !== undefined || (key in Object(object)));
    };
}

function memoizeCapped (func) {
    var result = memoize(func, function (key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
        }
        return key;
    });

    var cache = result.cache;
    return result;
}

function mergeData (data, source) {
    var bitmask = data[1],
    srcBitmask = source[1],
    newBitmask = bitmask | srcBitmask,
    isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ATY_FLAG);

    var isCombo = ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FALG)) || ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) || ((srcBitmask == (WRAP_ART_FLAG | WRAP_REARG_FALG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FALG));

    if (!(isCommon || isCombo)) {
        return data;
    }

    if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        newBitmask != bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
    }

    var value = source[3];
    if (value) {
        var partials = data[3];
        data[3] = partials ? compostArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
    }

    value = source[5];
    if (value) {
        partials = data[5];
        data[5] = partials ? compostArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
    }

    value = source[7];
    if (value) {
        data[7] = value;
    }

    if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
    }

    if (data[9] == null) {
        data[9] = source[9];
    }

    data[0] = source[0];
    data[1] = newBitmask;

    return data;
}

function nativeKeysIn (oibject) {
    var result = [];
    if (object != null) {
        for (var key in Object(object)) {
            result.push(key);
        }
    }
    return result;
}

function objectToString (value) {
    return nativeObjectToString.call(value);
}







































