<template>
  <header class="header">
    <button @click="navigateTo('home')">Home</button>
    <template v-if="!isAuth">
      <button @click="navigateTo('login')">Login</button>
      <button @click="navigateTo('signup')">Sign Up</button>
    </template>
    <template v-else>
      <button @click="navigateTo('profile')">Profile</button>
      <button @click="navigateTo('createPage')">Create Page</button>
      <button @click="navigateTo('pagesList')">Pages</button>
    </template>
  </header>
</template>

<script>
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const navigateTo = (name) => router.push({ name });

    const isAuth = computed(() => store.state.isAuth);

    return {
      navigateTo,
      isAuth,
    };
  },
};
</script>

<style></style>

