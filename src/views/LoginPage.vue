<template>
  <Header />
  <form @submit.prevent="submit" class="styled-form">
    <label>
      Email:
      <input type="email" v-model="email" />
    </label>
    <label>
      Password:
      <input type="password" v-model="password" />
    </label>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Header from "../components/HeaderElement.vue";
import axios from "../axios/axios";

export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const email = ref("");
    const password = ref("");

    const submit = async () => {
      try {
        const response = await axios.post("/auth/login", {
          password: password.value,
          email: email.value,
        });
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          store.commit("SET_IS_AUTH", true);
          store.commit("SET_USER", data.user);
          store.commit("SET_ROLE", data.user.role);
          router.push("home");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      email,
      password,
      submit,
    };
  },
};
</script>

<style>
.styled-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.styled-form label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
}

.styled-form input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.styled-form button {
  width: 100%;
  padding: 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.styled-form button:hover {
  background-color: #4cae4c;
}
</style>
