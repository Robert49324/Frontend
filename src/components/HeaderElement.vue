<template>
    <header class="header">
        <button @click="$router.push({name: 'home'})">Home</button>
        <button @click="$router.push({name: 'login'})">Login</button>
        <button @click="$router.push({name: 'signup'})">Sign Up</button>
    </header>
</template>

<script>
    export default {
        
    }
</script>

<style>

</style>
