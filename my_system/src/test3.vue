<script>
import regeneratorRuntime from './regeneratorRuntime';

var _marked = /* #__PURE__ */regeneratorRuntime.mark(a);
var _marked2 = /* #__PURE__ */regeneratorRuntime.mark(b);

function a () {
    var a1, a2, a3, a4, a5;

    return regeneratorRuntime.wrap(function a$ (_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    a1 = _context.sent;
                    console.log(a1);
                    _context.next = 6;
                    return 2;

                case 6:
                    a2 = _context.sent;
                    console.log(a2);
                    _context.next = 10;
                    return 3;

                case 10:
                    a3 = _context.sent;
                    console.log(a3);
                    return _context.delegateYield(b(), 't0', 13);

                case 13:
                    a4 = _context.t0;
                    console.log(a4);
                    _context.next = 17;
                    return 5;

                case 17:
                    a5 = _context.sent;
                    console.log(a5);

                // eslint-disable-next-line no-fallthrough
                case 19:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked);
}

function b () {
    var a1, a2, a3, a4, a5;

    return regeneratorRuntime.wrap(function b$ (_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return 11;

                case 2:
                    a1 = _context2.sent;
                    console.log(a1);
                    _context2.next = 6;
                    return 22;

                case 6:
                    a2 = _context2.sent;
                    console.log(a2);
                    _context2.next = 10;
                    return 33;

                case 10:
                    a3 = _context2.sent;
                    console.log(a3);
                    _context2.next = 14;
                    return 44;

                case 14:
                    a4 = _context2.sent;
                    console.log(a4);
                    _context2.next = 18;
                    return 55;

                case 18:
                    a5 = _context2.sent;
                    console.log(a5);

                // eslint-disable-next-line no-fallthrough
                case 20:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2);
}
window.jj = a();

export default {
    data () {
        return {

        };
    },
    created () {
        /* function* a () {
            const a1 = yield 1;

            console.log(a1);
            const a2 = yield 2;

            console.log(a2);
            const a3 = yield 3;

            console.log(a3);
            const a4 = yield b();

            console.log(a4);
            const a5 = yield 5;

            console.log(a5);
        }
        function* b () {
            const a1 = yield 11;

            console.log(a1);
            const a2 = yield 22;

            console.log(a2);
            const a3 = yield 33;

            console.log(a3);
            const a4 = yield 44;

            console.log(a4);
            const a5 = yield 55;

            console.log(a5);
        } */
    },
    mounted () {
        /* async function a () {
            const a1 = await 1;

            console.log(a1);
            const a2 = await 2;

            console.log(a2);
            const a3 = await 3;

            console.log(a3);
            const a4 = await b();

            console.log(a4);
            const a5 = await 5;

            console.log(a5);
        }
        async function b () {
            const a1 = await 11;

            console.log(a1);
            const a2 = await 22;

            console.log(a2);
            const a3 = await 33;

            console.log(a3);
            const a4 = await 44;

            console.log(a4);
            const a5 = await 55;

            console.log(a5);
        }
        a(); */
    },
    methods: {

    },
    render () {
        return (
            <div>

            </div>
        );
    }
};
</script>