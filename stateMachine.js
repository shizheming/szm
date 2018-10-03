var Config = function (options, defaults) {
    this.options     = options;
    this.defaults    = defaults;
    this.states      = [];
    this.transitions = [];
    this.map         = {};
    this.lifecycle   = {
        onbefore: { transition: 'onbeforetransition' },
        onafter:  { transition: 'onaftertransition'  },
        onenter:  { state:      'onenterstate'       },
        onleave:  { state:      'onleavestate'       },
        on:       { transition: 'ontransition'       }
    };
    this.init        = this.configureInitTransition(options.init);
    this.methods     = options.methods;
    this.map['*'] = {};
    this.configureTransitions(options.transitions);
};
Config.prototype = {
    addState : function (name) {
        if (!this.map[name]) {
            this.states.push(name);
            this.addStateLifecycleNames(name);
            this.map[name] = {};
        }
    },
    addStateLifecycleNames: function (name) {
        this.lifecycle.onenter[name] = 'onenter' + name;
        this.lifecycle.onleave[name] = 'onleave' + name;
        this.lifecycle.on[name]      = 'on' + name;
    },
    addTransition: function (name) {
        if (this.transitions.indexOf(name) < 0) {
            this.transitions.push(name);
            this.addTransitionLifecycleNames(name);
        }
    },
    addTransitionLifecycleNames: function (name) {
        this.lifecycle.onbefore[name] = 'onbefore' + name;
        this.lifecycle.onafter[name]  = 'onafter' + name;
        this.lifecycle.on[name]       = 'on' + name;
    },
    mapTransition: function (transition) {
        var name = transition.name,
            from = transition.from,
            to   = transition.to;
        this.addState(from);
        if (typeof to !== 'function') this.addState(to);
        this.addTransition(name);
        this.map[from][name] = transition;
        return transition;
    },
    configureInitTransition: function (init) {
        if (typeof init === 'string') {
            return this.mapTransition(Object.assign({}, this.defaults.init, { to: init, active: true }));
        } else {
            this.addState(this.defaults.init.from);
            return this.defaults.init;
        }
    },
    configureTransitions: function (transitions) {
        var that = this;
        transitions.forEach(function (currentValue, index, array) {
            var from = currentValue.from || '*';
            var to = currentValue.to || '*';
            that.mapTransition({
                name : currentValue.name,
                from : from,
                to : to
            });
        });
    },
    transitionFor: function (state, transition) {
        return this.map[state][transition] || this.map['*'][transition];
    },
};

var JSM = function  (context, config) {
    this.context   = context;
    this.config    = config;
    this.state     = config.init.from;
    this.observers = [context];
};
JSM.prototype = {
    init: function () {
        return this.fire(this.config.init.name, []);
    },
    seek: function (transition, args) {
        var entry    = this.config.transitionFor(this.state, transition);
        var to       = entry.to;
        if (typeof to === 'function') return to.apply(this.context, args); else if (to === '*') return this.state; else return to
    },  
    fire: function (transition, args) {
        return this.transit(transition, this.state, this.seek(transition, args), args);
    },  
    transit: function (transition, from, to, args) {  
        var lifecycle = this.config.lifecycle;
        args.unshift({             // this context will be passed to each lifecycle event observer
            transition: transition,
            from:       from,
            to:         to,
            fsm:        this.context
        });  
        // 生命周期的顺序
        return this.observeEvents([
            this.observersForEvent(lifecycle.onbefore.transition),
            this.observersForEvent(lifecycle.onbefore[transition]),
            this.observersForEvent(lifecycle.onleave.state),
            this.observersForEvent(lifecycle.onleave[from]),
            this.observersForEvent(lifecycle.on.transition),
            [ 'doTransit', [ this ] ]                      ,
            this.observersForEvent(lifecycle.onenter.state),
            this.observersForEvent(lifecycle.onenter[to])  ,
            this.observersForEvent(lifecycle.on[to])       ,
            this.observersForEvent(lifecycle.onafter.transition),
            this.observersForEvent(lifecycle.onafter[transition]),
            this.observersForEvent(lifecycle.on[transition])
        ], args);
    },
    doTransit:    function (lifecycle) { 
        this.state = lifecycle.to;
    },  
    observe: function (args) {
        if (args.length === 2) {
            var observer = {};
            observer[args[0]] = args[1];
            this.observers.push(observer);
        } else {
            this.observers.push(args[0]);
        }
    },  
    observersForEvent: function (event) { // TODO: this could be cached
        var result = [];
        this.observers.forEach(function (currentValue, index, array) {
            if (currentValue._fsm.config.methods[event]) result.push(currentValue);
        });
        return [ event, result, true ]
    },  
    observeEvents: function (events, args) {
        if (events.length === 0) return;

        var event     = events[0][0];
        var observers = events[0][1];

        args[0].event = event;

        if (observers.length === 0) {
            events.shift();
            return this.observeEvents(events, args);
        } else {
            var observer = observers.shift();
            // 设置状态
            var result = event === 'doTransit' ? observer[event].apply(observer, args) : observer._fsm.config.methods[event].apply(observer, args);
            if (result && typeof result.then === 'function') {
                // 这里是异步的处理方式么，看到then了
                return result.then(this.observeEvents.bind(this, events, args)).catch(function () {})
            } else {
                return this.observeEvents(events, args);
            }
        }
    },
};

var build = function  (target, config) {
    Object.assign(target, {
        observe: function (){ 
            return this._fsm.observe(arguments)
        },
    });
    config.transitions.forEach(function (transition) {
        target[transition] = function() {
            return this._fsm.fire(transition, [].slice.call(arguments))
        }
    });
    target._fsm = function() {
        this._fsm = new JSM(this, config);
        this._fsm.init();
    }
};

var StateMachine = function  (options) {
    var config = new Config(options, {
        wildcard: '*',
        init: {
            name: 'init',
            from: 'none'
        }
    });
    build(this, config);
    this._fsm();
};