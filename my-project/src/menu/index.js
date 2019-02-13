export default [
    {
        name: 'tool',
        title: '工具库',
        icon: 'ios-build',
    },
    {
        name: 'designPattern',
        title: '设计模式',
        icon: 'md-bonfire',
    },
    {
        name: 'consumptionRecord',
        title: '消费记录',
        icon: 'ios-book',
    },
    {
        title: '点',
        icon: 'md-basket',
        children: [
            {
            	name: 'reason',
            	title: '理性',
            },
            {
        	    name: 'perceptual',
        	    title: '感性',
        	}
        ],
    }
];