<template>
<div>
    <h4>_.after(times, func)</h4>
    <div class="describe">
        <p>调用多次后才执行函数</p>
        <h5>参数</h5>
        <div>times<em>（Number）</em>：需要几次才执行函数</div>
        <div>func<em>（Function）</em>：需要执行的函数</div>
        <h5>返回值</h5>
        <div><em>（all data type）</em>：返回执行函数的返回值</div>
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
				function (value) {
				    value => 运行函数传进来的值
				}
			*/

			var b = _.after(2, function (a) {
			    return a;
			});
			b(1);
			// => 
			b(1);
			// => 1

			var c = _.after(2, function (a) {
			    return this.a + a;
			});
			b.call({
			    a : 1
			}, 2);
			// => 
			b.call({
			    a : 1
			}, 2);
			// => 3
		`, Prism.languages.javascript, 'javascript');
		
	}
};
</script>