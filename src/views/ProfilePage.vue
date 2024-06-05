<template>
  <Header />
  <div>
    <h1>Profile page</h1>
    <div v-if="isAuth">
      <p>Name: {{ user.name }}</p>
      <p>Surname: {{ user.surname }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="this.$router.push({ name: 'change-password' })">
        Change password
      </button>
    </div>
    <div v-else>
      <p>Please login</p>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import Header from "../components/HeaderElement.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);
    const isAuth = computed(() => store.getters.getIsAuth);
    const role = computed(() => store.state.role);

    onMounted(() => {
      if (!isAuth.value) {
        this.$router.push({ name: "login" });
      }
    });

    return { user, isAuth, role };
  },
};
</script>

<style></style>
