<template>
<div>
    <h1>姓名：{{name}}</h1>
    <h2>{{age}}</h2>
    <button @click="golist">$route.router.go查看</button>
    <a v-link="{ name: 'list' }">v-link查看列表</a>
    <a v-link="{ name: 'index' }">回去主页</a>
    <a v-link="{ name: 'hello' }">hello</a>
</div>
</template>
<script>
    export default {
        data () { 
            return {   
                name:"guowenfh",
                age:"21"
            }
        },
        methods :{
            golist () {
                this.$route.router.go({name:"list"});
            }
        }
    }
</script>
<style></style>
