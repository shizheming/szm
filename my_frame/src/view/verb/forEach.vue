<template>
<div class="forEach">
    <h4>_.forEach(collection, iterator)</h4>
    <div class="describe">
        <p>迭代一个集合</p>
        <h5>参数</h5>
        <div>collection<em>（Array || Object）</em>：需要迭代的集合</div>
        <div>iterator<em>（Function）</em>：迭代器</div>
        <h5>返回值</h5>
        <div><em>（undefined）</em>：返回undefined</div>
    </div>
    <pre class="line-numbers language-javascript">
    	<code class="language-javascript">
    		<div v-html="code"></div>
    	</code>
    </pre>
</div>
</template>
<script>
import prismjs from 'prismjs';
import line from 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import text from './example/forEach';
export default {
	data() {
		return {
			code: '',
		};
	},
	mounted() {
		this.code = Prism.highlight(`${text.toString()}`, Prism.languages.javascript, 'javascript');
	},
    methods: {
        flatten () {
            
        }
    }
};
</script>
<style lang="less">
.forEach {
    pre[class*="language-"] {
        margin: 0;
    }

    pre[class*="language-"].line-numbers {
        padding: 0;

    }

    .verb {
        .describe {
            margin: 1em;
            font-size: 14px;
        }

        .describe>div {
            text-indent: 1em;
            font-family: 'Consolas', 'Courier New', 'monospace'
        }

        h4 {
            background-color: #6d426d;
            color: #fff;
            margin: 0;
            padding: .75em;
            font-weight: 400;
            font-family: 'Consolas', 'Courier New', 'monospace'
        }
    }
}
</style>