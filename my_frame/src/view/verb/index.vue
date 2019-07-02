<template>
    <div class="verb">
        <span class="span" v-for="current in word">{{current}}</span>
        <div>
            我觉得还是先练练函数式编程吧，在重新写下关系，如何？？？？？？？？？？？？？？？
        </div>
    </div>
</template>
<script>

export default {
    name: 'verb',
    data() {
        return {
            word: ['关系', '顺序', '循环']
        };
    },
    mounted() {}
}
</script>
<style lang="less">
.span {
    margin: 10px;
    font-size: 22px;
}
</style>