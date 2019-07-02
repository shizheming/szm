<template>
<div class="verb">
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
import i from './index';
import './index.less';
import text from './example/forEach';
export default {
	data() {
		return {
			code: '',
		};
	},
	mounted() {
		this.code = Prism.highlight(`${i.flattenFun(text.toString())}`, Prism.languages.javascript, 'javascript');
	},
    methods: {
    }
};
</script>
