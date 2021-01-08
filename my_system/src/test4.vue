<script>

export default {
    data () {
        return {

        };
    },
    created () {
        // 异步的generator
        async function * gen () {
            // eslint-disable-next-line promise/param-names
            const vv = await new Promise((r) => {
                setTimeout(() => {
                    console.log(9999);
                    r(66);
                }, 2000);
            });

            console.log(vv);
            yield 2;
        }
        const ab = gen();

        ab.next(100).then((v) => {
            console.log(v);
        });
        // ab.next(200).then(() => console.log(22));
    },
    mounted () {
        // async并发
        /* const op = [
            // eslint-disable-next-line promise/param-names
            new Promise((r) => {
                setTimeout(r, 3000);
            }),
            // eslint-disable-next-line promise/param-names
            new Promise((r) => {
                setTimeout(r, 1000);
            })
        ];

        async function a () {
            op.forEach(async (p, i) => {
                await p;
                console.log(i, 991);
            });
            for (const v of [1, 2, 3, 4, 5])console.log(v);
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