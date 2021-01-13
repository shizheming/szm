/*
    联动
    由运动提炼出来
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间的联动，单一的没有联动的概念❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
        const table = [
            {
                name: a,
                relationship: {
                    name: b,
                    relationship: f
                }
            },
            {
                name: b,
                relationship: f
            },
            {
                name: c,
                relationship: [
                    {
                        name: f
                    },
                    {
                        name: a,
                        relationship: {
                            name: b,
                            relationship: f
                        }
                    }
                ]
            }
        ];
*/
function linkage (...fn) {
    return function (...args) {
        return fn.reduce((a, b) => {
            return b.apply(this, a);
        }, args);
    };
}
export default linkage;