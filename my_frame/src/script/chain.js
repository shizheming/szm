function setNext (successor) {
    this.successor = successor;
}

function request () {
    var ret = this.fn.apply(null, arguments);

    if (ret) this.successor && this.successor.request.apply(this.successor, arguments);
}

export default function (fn) {
    return {
        fn: fn,
        setNext: setNext,
        request: request
    };
};