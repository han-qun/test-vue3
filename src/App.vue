<script setup>
import { onMounted, ref } from 'vue'
let count = ref(0)

function increment() {
    if (count.value >= 10) {
        return
    }
    count.value++
}

function decrement() {
    if(count.value <= 0){
        return
    }
    count.value--;
}


</script>
<template>
    <div id="container">
        <div>
            <button @click="increment">+</button>
            <span>当前计数：{{ count }}</span>
            <button @click="decrement">-</button>
        </div>

    </div>
</template>
<style scoped lang="less">
#container {
    button {
        margin-right: 10px;
        margin-left: 10px;
        width: 75px;
    }
}
</style>
