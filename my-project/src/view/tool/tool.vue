<template>
<div>
	<Menu style="position: fixed;" ref="toolMenu" :active-name="active">
        <Submenu :name="index" :key="index" v-for="(currentValue, index) in toolMenu">
            <template slot="title">{{currentValue.name}}</template>
            <MenuItem v-for="(item, idx) in currentValue.children" :to="{name: item}" :name="Number([index, idx].join(''))" :key="idx">
                _.{{item}}
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
export default {
    name: 'tool',
    data() {
        return {
        	toolMenu,
        	active: '0'
        };
    },
    mounted() {
    }
}
</script>
<style>
</style>