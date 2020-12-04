<script>
export default {
    data () {
        return {

        };
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
        h(aaa);
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