/*
    状态
    我自己内心有的状态我才能调整状态
    惰性函数，单列函数，一次函数，这些都能算状态的，这么说其实也没有什么不对，你可以认为是函数的状态，可以变惰性，可以变单列，可以变一次，所以我可以把这些写在状态里面，本来就是函数对象的状态，可我说的不是内容，而是状态的架子
    就是状态是内部有的，比如我可以很狂躁，我可以很安静，我可以很贱，我可以很坏，我有的我才能变
    状态的改变是什么，我觉得就是变化不同的属性和方法，对象这个时候拥有这些属性和方法，那个时候拥有那些属性和方法，想起了迪迦奥特曼红色蓝色形态
*/

function state (stateCollection) {
    // 初始状态，状态对象第一个
    var keys = Object.keys(stateCollection);
    var currentSate = stateCollection[keys[0]];

    function change (key) {
        currentSate = stateCollection[key];
    }
    function go () {
        return currentSate.apply(null, arguments);
    }
    return {
        change,
        go
    };
}

export default state;