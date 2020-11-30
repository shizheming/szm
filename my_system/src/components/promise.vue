<script>
import {myPromise} from '../script/promise';
export default {
    data () {
        return {

        };
    },
    created () {
        myPromise((resolve, reject) => {
            console.log(0);
            setTimeout(() => {
                console.log(1);
                resolve(100);
            }, 1000);
        }).then(result => {
            console.log(2);
            return myPromise((resolve, reject) => {
                console.log(21);
                setTimeout(() => {
                    console.log(22);
                    resolve(result + 100);
                }, 3000);
            });
        }).then(result => {
            console.log(3);
        });
        /*
        0
        1
        2
        21
        22
        3
        */
    },
    render () {
        return (
            <div>1231231111111</div>
        );
    }
};
</script>