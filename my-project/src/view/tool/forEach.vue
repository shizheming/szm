<template>
<div>
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

export default {
	data() {
		return {
			code: '',
		};
	},
	mounted() {
		this.code = Prism.highlight(`
			/*
				function (currentValue, key, collection) {
				    currentValue => 当前值
				    key => 当前键
				    collection => 正在迭代的集合
				}
			*/

			_.forEach([1, 2], function (currentValue, index, array) {
			    array[index] = currentValue + 1;
			});
			// => [2, 3]

			_.forEach({
			    c : 1,
			    d : 2
			}, function (currentValue, key, object) {
			    object[key] = currentValue + 1;
			});
			/*
				=> {
				    c : 2,
				    d : 3
				}
			*/
		`, Prism.languages.javascript, 'javascript');
		console.log(this.code)
	}
};
</script>