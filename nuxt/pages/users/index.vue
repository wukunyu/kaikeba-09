<template>
    <div>
    users page
    <el-button type="primary" @click="$router.push('/users')">用户列表</el-button>
    <el-button type="primary" @click="$router.push({name: 'users-details'})">用户详情</el-button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>