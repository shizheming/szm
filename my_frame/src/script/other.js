//

/* 
代理
单例模式
迭代器
发布—订阅
命令
组合
模板方法
享元
职责链
中介者
装饰者
适配器

*/

// 代理模式
// 图片预加载
/*var myImage = (function() {
        var imgNode = document.createElement('img');
        document.body.appendChild(imgNode);
        return {
            setSrc : function(src) {
                imgNode.src = src;
            };
        };
    });
    var proxyImage = (function() {
        var img = new Image;
        img.onload = function() {
            myImage.setSrc(this.src);
        };
        return {
            setSrc : function(src) {
                myImage.setSrc('.....png');
                img.src; = src;
            }
        };
    });*/

/*
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

概念
命令式
声明式
纯函数
无副作用
不可变性
引用透明
链式调用
函数组合
管道
单一职责
高阶函数
一等公民
闭包
作用域
call
apply
惰性求知，定义函数时静态的，调用时才计算
柯里化
部分应用

轻数据结构，重操作

面向对象通多特定的行为将很多数据类型逻辑的联系在一起，函数式则关注如何在这些数据类型之上通过组合来连接各种操作，因此存在一个两种编程范式都可以有效利用的算平衡点

面向对象的关键是创建继承层次结构并将方法与数据紧密的绑定在一起，函数式编程则倾向于通过广义的多态函数交叉应用于不同的数据类型，同时避免使用this

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

git视频学习

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

a().b().c().d()
这是链式
a(b(c(d(e()))))
这是管道
管道就是通过函数参数输入，输出又作为下一个函数参数的输入，这就是管道，而链式是在对象上的方法的调用，区别就在数据的输入的地方不一样
*/