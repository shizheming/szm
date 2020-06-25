// 主体，客体，依附关系，不是简单的联动，主客体更好理解
function attachment (fn) {
    // 联动是平级的，不能很好的体现前后的依附关系，就是说，联动是n个同等重要的事情的联动，而这里我理解为附加的，就比方说我外门之前拉了一泡屎，这泡屎这是附带的，并不是主要的，真的是这样的吗，我获取option不重要》》》？？？？？我认为不是不重要而是这里是上下级关系，所以我在当前这个函数上家属性，属性里面描述下级关系
    // let as = _.linkage(this.return_type_change, this.hhh);

    /* this.return_type_change.attachment = [
        this.hhh
    ]; */
    if (!fn.attachment) return fn;
    return function (...arg) {
        const result = fn.apply(this, arg);

        fn.attachment.forEach((current) => {
            current.call(this, result);
        });
    };
}

export default attachment;