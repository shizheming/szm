<script>
export default {
    data () {
        return {

        };
    },
    created () {
        function ha () {
            setTimeout(() => {
                console.log(100);
            }, 1000);
            return 2999;
        }
        function * as () {
            yield new Promise(resolve => {
                setTimeout(function () {
                    resolve(2991);
                    console.log(gq.next());
                }, 1000);
            });
            yield 222;
        }
        const gq = as();

        console.log(gq.next());

        Promise.resolve(new Promise(resolve => {
            setTimeout(resolve, 6000);
        })).then(() => {
            console.log('resolve lala 2000');
        });
    },
    mounted () {
        let n = 0;

        function * aaa () {
            yield b();
            yield b();
            yield b();
        }
        function b () {
            return function (callback) {
                setTimeout(() => {
                    n++;
                    console.log(n, 83838);
                    callback();
                }, 1000);
            };
        }

        function h (jj) {
            const result = jj();

            let next = result.next();

            function o () {
                console.log(next, 29);
                if (next.done) {

                } else {
                    next.value(function () {
                        next = result.next();
                        o();
                    });
                }
            }
            o();
        }
        // h(aaa);
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