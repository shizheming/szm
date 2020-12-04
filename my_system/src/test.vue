<script>
import regeneratorRuntime from './p';

function colorState (v) {
    var a;

    return regeneratorRuntime.wrap(function colorState$ (_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    a = v;
                    console.log(0, a);
                // eslint-disable-next-line no-fallthrough
                case 1:
                    console.log(1);
                    if (!(a > 0)) {
                        _context.next = 6;
                        break;
                    }

                    _context.next = 5;
                    return 'green';

                case 5:
                    console.log(5);
                    a = _context.sent;

                // eslint-disable-next-line no-fallthrough
                case 6:
                    console.log(6);
                    if (!(a < 0)) {
                        _context.next = 10;
                        break;
                    }

                    _context.next = 9;
                    return 'red';

                case 9:
                    a = _context.sent;
                    console.log(9);
                // eslint-disable-next-line no-fallthrough
                case 10:
                    console.log(10);
                    if (!(a === 0)) {
                        _context.next = 14;
                        break;
                    }

                    _context.next = 13;
                    return 'orange';

                case 13:
                    console.log(13);
                    a = _context.sent;

                // eslint-disable-next-line no-fallthrough
                case 14:
                    console.log(14);
                    _context.next = 1;
                    break;

                case 16:
                case 'end':
                    console.log('end');
                    return _context.stop();
            }
        }
    });
}
function f () {
    return regeneratorRuntime.wrap(function f$ (_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    _context.next = 4;
                    return 2;

                case 4:
                    _context.next = 6;
                    return 3;

                case 6:
                    return _context.abrupt('return', 4);

                case 7:
                case 'end':
                    return _context.stop();
            }
        }
    });
}
function *h () {
    const a = yield 1;

    console.log(a, 1);
    const b = yield 2;

    console.log(b, 2);
    const c = yield 3;

    console.log(c, 3);
}
const ao = h();

ao.next(100);
ao.next(200);
ao.next(300);
ao.next(400);
export default {
    data () {
        return {
            color: '#ccc'
        };
    },
    mounted () {
        this.k1 = colorState(1);

        /* this.k1 = this.colorState(1);
        console.log(this.k1, 90909090, this.k1.next); */
        this.k1.next(1999);

        this.pq = f();
    },
    methods: {
        *ksksksks () {
            let d;

            for (let i = 0; i < 10; i++) {
                d += yield i;
            }
            return d;
        },
        hhh () {
            const ko = this.pq.next();

            console.log(ko);
        },
        change (v) {
            this.color = this.k1.next(v).value;
            console.log(this.k1.next(v), this.color, 39);
        },
        *colorState (v) {
            let a = v;

            while (true) {
                if (a > 0) {
                    // yield可以理解为return，可以这是吐到外面的，不是吐给里面a的，有点难理解
                    a = yield 'green';
                }

                if (a < 0) {
                    a = yield 'red';
                }

                if (a === 0) {
                    a = yield 'orange';
                }
            }
        }
    },
    render () {
        return (
            <div>
                <div style={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '10px',
                    backgroundColor: this.color
                }} onClick={this.hhh}></div>
                <a-input-number onChange={this.change}/>
            </div>
        );
    }
};
</script>