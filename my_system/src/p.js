const obj = {};
var runtime = (function (exports) {
    'use strict';

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol = Symbol.iterator;
    var toStringTagSymbol = Symbol.toStringTag;

    function define (obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }

    function wrap (innerFn, self) {
        var generator = Object.create(Gp);
        var context = new Context([]);

        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
    }
    exports.wrap = wrap;

    function tryCatch (fn, obj, arg) {
        return {type: 'normal', arg: fn.call(obj, arg)};
    }

    var GenStateSuspendedStart = 'suspendedStart';
    var GenStateSuspendedYield = 'suspendedYield';
    var GenStateExecuting = 'executing';
    var GenStateCompleted = 'completed';

    var ContinueSentinel = {};

    function Generator () {}
    function GeneratorFunction () {}
    function GeneratorFunctionPrototype () {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
        return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);

    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;

    function defineIteratorMethods (prototype) {
        ['next', 'throw', 'return'].forEach(function (method) {
            define(prototype, method, function (arg) {
                return this._invoke(method, arg);
            });
        });
    }

    exports.mark = function (genFun) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    function makeInvokeMethod (innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke (method, arg) {
            if (state === GenStateCompleted) {
                return doneResult();
            }

            context.method = method;
            context.arg = arg;

            if (context.method === 'next') {
                context.sent = context._sent = context.arg;
            } else if (context.method === 'return') {
                context.abrupt('return', context.arg);
            }

            var record = tryCatch(innerFn, self, context);

            state = context.done
                ? GenStateCompleted
                : GenStateSuspendedYield;

            return {
                value: record.arg,
                done: context.done
            };
        };
    }

    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, 'Generator');

    function pushTryEntry (locs) {
        var entry = {tryLoc: locs[0]};

        if (1 in locs) {
            entry.catchLoc = locs[1];
        }

        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
    }

    function resetTryEntry (entry) {
        var record = entry.completion || {};

        record.type = 'normal';
        delete record.arg;
        entry.completion = record;
    }

    function Context (tryLocsList) {
        this.tryEntries = [{tryLoc: 'root'}];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }

    function values (iterable) {
        // eslint-disable-next-line no-useless-call
        return iterable[iteratorSymbol].call(iterable);
    }

    function doneResult () {
        return {value: undefined, done: true};
    }

    Context.prototype = {
        constructor: Context,

        reset: function (skipTempReset) {
            this.prev = 0;
            this.next = 0;
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;

            this.method = 'next';
            this.arg = undefined;

            this.tryEntries.forEach(resetTryEntry);

            if (!skipTempReset) {
                for (var name in this) {
                    if (name.charAt(0) === 't' &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
                        this[name] = undefined;
                    }
                }
            }
        },

        stop: function () {
            this.done = true;

            return this.rval;
        },

        abrupt: function (type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];

                if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, 'finallyLoc') &&
              this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;

                    break;
                }
            }

            var record = finallyEntry ? finallyEntry.completion : {};

            record.type = type;
            record.arg = arg;

            if (finallyEntry) {
                this.method = 'next';
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }

            return this.complete(record);
        },

        complete: function (record) {
            this.rval = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
            console.log(record, 50);
        }

    };

    return exports;
}(
    obj
));

export default runtime;