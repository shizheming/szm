import data from '../data/consumptionRecord';
import echarts from 'echarts';
import 'echarts/theme/macarons';
import {Select, Option} from 'iview';

export default {
    data() {
        return data;
    },
    components: {Select, Option},
    created() {
        this.setYear(2017);
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.map = echarts.init(document.getElementById('consumptionRecord'), 'macarons');
        // 绘制图表
        this.map.setOption(this.option);

        window.onresize = function(){
            this.map.resize();
        }
    },
    methods: {
        getChart(value) {
            this.map.clear();
            this.setYear(value);
            this.map.setOption(this.option);
        },
        setYear(n) {
            this.option.series.data = this.data[n].series.data;
            this.option.title = {
                ...this.option.title,
                ...this.data[n].title
            }
        }
    }
};