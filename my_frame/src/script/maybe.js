/*
    函子-处理错误
*/
const maybe = function (value) {
    this.value = value;
};
maybe.of = function (value) {
    return new maybe(value);
};
maybe.prototype.isNothing = function () {
    return this.value === null || this.value === undefined;
};
maybe.prototype.map = function (fn) {
    return this.isNothing() ? maybe.of(null) : maybe.of(fn(this.value));
};
maybe.prototype.join = function () {
    return this.isNothing() ? maybe.of(null) : this.value;
}
export default maybe;

