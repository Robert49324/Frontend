<template>
  <Header />
  <div>
    <h1>Profile page</h1>
    <div v-if="isAuth">
      <p>Name: {{ user.name }}</p>
      <p>Surname: {{ user.surname }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="this.$router.push({ name: 'changePassword' })">
        Change password
      </button>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>Please login</p>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Header from "../components/HeaderElement.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const navigateTo = (name) => router.push({ name });
    const user = computed(() => store.state.user);
    const isAuth = computed(() => store.getters.getIsAuth);
    const role = computed(() => store.state.role);

    const logout = () => {
      store.commit("SET_IS_AUTH", false);
      store.commit("SET_ROLE", "");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigateTo("home");
    };

    onMounted(() => {
      if (!isAuth.value) {
        this.$router.push({ name: "login" });
      }
    });

    return { user, isAuth, role, logout };
  },
};
</script>

<style></style>
