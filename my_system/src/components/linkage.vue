<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import {linkageRelationship} from '../script/linkage';
export default {
    mounted () {
        const a = function a (v) {
            console.log(v++, 'aaaaaaaaaaaaaavvvvvvvvvvvvvvvvvvvvvvv');
            return v;
        };

        const b = function b (v) {
            console.log(v++, 'b');
            return v;
        };

        function c (v) {
            console.log(v++, 'c');
            return v;
        }
        function d (v) {
            console.log(v++, 'd');
            return v;
        }
        function e (v) {
            console.log(v++, 'e');
            return v;
        }
        function f () {
            console.log('fffffff');
        }

        const oo = {
            jj () {
                console.log(this.nn, 'jjb');
            },
            nn: 81111111111111118
        };

        const s = linkageRelationship(
            [
                {
                    name: 'a',
                    relationship: {
                        name: 'f',
                        relationship: 'e'
                        // relationship: "oo.jj",
                    }
                },
                {
                    name: 'b',
                    relationship: [
                        {
                            name: 'f'
                        },
                        {
                            name: 'e',
                            relationship: 'c'
                        },
                        {
                            name: 'd',
                            relationship: 'c'
                        }
                    ]
                }
            ],
            {
                a,
                b,
                c,
                d,
                e,
                f,
                oo
            }
        );

        this.a = s.a;
        /* a = s.a;
        b = s.b;
        a();
        console.log('--------------------------------');
        b(); */
    },
    methods: {
        gggg () {
            this.a();
        }
    },
    render () {
        return <div>
            <button onClick={this.gggg}>123</button>
        </div>;
    }
};
</script>