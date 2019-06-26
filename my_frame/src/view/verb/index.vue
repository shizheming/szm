<template>
    <div class="verb">
        rt34t4t
    </div>
</template>
<script>
import prismjs from 'prismjs';
import line from 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default {
    name: 'verb',
    data() {
        return {

        };
    },
    mounted() {}
}
</script>
<style lang="less">
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
</style>