function decorate (before, after) {
    return function (beforeArguments, afterArguments) {
        // eslint-disable-next-line no-unused-expressions
        arguments.length === 1 ? afterArguments = beforeArguments : '';
        before.apply(this, beforeArguments);
        return after.apply(this, afterArguments);
    };
}
export default decorate;