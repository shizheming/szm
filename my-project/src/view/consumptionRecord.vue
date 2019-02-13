<template>
<div>
    <Select v-model="year" @on-change="getChart">
        <Option value="2017">2017</Option>
        <Option value="2018">2018</Option>
    </Select>
    <div id="consumptionRecord"></div>
</div>
</template>
<script>
import script from '../script/consumptionRecord';
export default script;
</script>
<style lang="scss">
@import "../style/consumptionRecord";
</style>