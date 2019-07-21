import _ from '@script/_/_';
// 方法
var funcRelation = {
    // 建立联动
    build : function (name, bindName) {
        var findName = this.original.filter(function (currentValue, index, array) {
            return currentValue.content.name === name;
        });
        var findBindName = this.original.filter(function (currentValue, index, array) {
            return currentValue.content.name === bindName;
        });
        this[name] = _.decorate(findName[0].content, findBindName[0].content);
        findName[0].relationName = findBindName[0].content.name;
    },
    // 解除联动
    relieve : function (name) {
        var findName = this.original.filter(function (currentValue, index, array) {
            return currentValue.content.name === name;
        });
        this[name] = findName.content;
    },

};

// 绑定一对一
var oneByOne = function (obj, result, current, currentRelation) {
    obj.forEach(function (currentValue, index, array) {
        // current, currentRelation是判断联动的
        var relationName = currentValue.relationName;
        var func = currentValue.content;
        if (current) {
            if (currentValue !== current) return;
            relationName = currentRelation;
            func = result[currentValue.content.name];
        }
        var findRelation;
        if (relationName) {
            findRelation = array.filter(function (item, idx, arr) {
                return item.content.name === relationName;
            });
            func = _.decorate(func, findRelation[0].content);
        }
        result[currentValue.content.name] = func;

        if (relationName && findRelation[0].relationName) {
            oneByOne(obj, result, currentValue, findRelation[0].relationName);
        }
    });
};

// 建立联系，初始化
const createRelation = function (obj) {
    var result = Object.create(funcRelation);
    result.original = obj;
    // 一对一和一对多的情况
    oneByOne(obj, result);
    return result;
}

export default createRelation