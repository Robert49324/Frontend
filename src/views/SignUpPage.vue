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
import Header from "../components/HeaderElement.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    async submit() {
      try {
        const response = await this.$axios.post("/auth/signup", {
          name: this.name,
          surname: this.surname,
          username: this.username,
          password: this.password,
          email: this.email,
        });
        if (response.status == 201) {
          this.$router.push("login");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
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
