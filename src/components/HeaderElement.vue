<template>
  <header class="header">
    <button @click="this.$router.push({ name: 'home' })">Home</button>
    <template v-if="!$store.state.isAuth">
      <button @click="this.$router.push({ name: 'login' })">Login</button>
      <button @click="this.$router.push({ name: 'signup' })">Sign Up</button>
    </template>
    <template v-else>
      <button @click="logout">Logout</button>
      <button @click="this.$router.push({ name: 'profile' })">Profile</button>
    </template>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("SET_IS_AUTH", false);
      this.$store.commit("SET_ROLE", "");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
