<template>
    <div class="tool">
		<Menu style="position: fixed;" ref="toolMenu" :active-name="active">
	        <Submenu :name="index" :key="index" v-for="(currentValue, index) in toolMenu">
	            <template slot="title">{{currentValue.name}}</template>
	            <MenuItem v-for="(item, idx) in currentValue.children" :to="{name: item}" :name="Number([index, idx].join(''))" :key="idx">
                </MenuItem>
            </Submenu>
        </Menu>
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import toolMenu from '../../menu/tool';
import prismjs from 'prismjs';
import line from 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default {
    name: 'tool',
    data() {
        return {
            toolMenu,
            active: '0'
        };
    },
    mounted() {}
}
</script>
<style lang="scss">
pre[class*="language-"] {
    margin: 0;
}

pre[class*="language-"].line-numbers {
    padding: 0;

}

.tool {
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