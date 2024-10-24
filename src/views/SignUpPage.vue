<template>
  <Header />
  <form @submit.prevent="submit" class="styled-form">
    <label>
      Name:
      <input type="text" v-model="name" />
    </label>
    <label>
      Surname:
      <input type="text" v-model="surname" />
    </label>
    <label>
      Username:
      <input type="text" v-model="username" />
    </label>
    <label>
      Password:
      <input type="password" v-model="password" />
    </label>
    <label>
      Email:
      <input type="email" v-model="email" />
    </label>
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "../axios/axios";
import Header from "../components/HeaderElement.vue";

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const name = ref("");
    const surname = ref("");
    const username = ref("");
    const password = ref("");
    const email = ref("");

    async function submit() {
      try {
        const response = await axios.post("/auth/signup", {
          name: name.value,
          surname: surname.value,
          username: username.value,
          password: password.value,
          email: email.value,
        });
        if (response.status === 201) {
          router.push("login");
        }
      } catch (err) {
        console.log(err);
      }
    }

    return {
      name,
      surname,
      username,
      password,
      email,
      submit,
    };
  },
});
</script>

<style scoped>
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

