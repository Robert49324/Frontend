<template>
  <Header />
  <div>
    <h1>Change password</h1>
    <form @submit.prevent="submitForm" class="styled-form">
      <label>
        Password:
        <input type="password" v-model="password" />
      </label>
      <label>
        New password
        <input type="password" v-model="newPassword" />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import Header from "../components/HeaderElement.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "../axios/axios";

export default {
  components: {
    Header,
  },
  setup() {
    const password = ref("");
    const newPassword = ref("");
    const store = useStore();
    const router = useRouter();

    const submitForm = async () => {
      try {
        const response = await axios.post(
          "/auth/reset_password",
          {
            email: store.state.user.email,
            password: password.value,
            new_password: newPassword.value,
          }
        );
        if (response.status === 200) {
          router.push("home");
        }
      } catch (err) {
        console.log(err);
      }
    };


    return {
      password,
      newPassword,
      submitForm,
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
