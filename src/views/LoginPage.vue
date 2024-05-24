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
    import Header from '../components/HeaderElement.vue'
    export default {
        components: {
            Header
        },
        methods: {
            async submit() {
            try{
                const response = await this.$axios.post('/auth/login', {
                password: this.password,
                email: this.email,
                })
                if (response.status == 201) {
                  console.log(response.data)
                  this.$store.commit('setUser', response.data)
                  this.$router.push('home')
                }
            }      
            catch (err) {
                console.log(err)
            }
            },
        },
    }
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
