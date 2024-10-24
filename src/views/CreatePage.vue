<template>
  <Header />
  <div>
    <h1>Create Page</h1>
    <form @submit.prevent="submitForm" class="styled-form">
      <input v-model="name" type="text" placeholder="Page name">
      <input v-model="description" type="text" placeholder="Page description">
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../axios/axios';
import Header from '../components/HeaderElement.vue';
import { useRouter } from 'vue-router';


export default {
  components: {
    Header
  },
  setup() {
    const name = ref('');
    const description = ref('');
    const router = useRouter();

    const submitForm = async () => {
      try {
        const response = await axios.post('/page/', {
          name: name.value,
          description: description.value,
        });
        if (response.status === 201) {
          router.push('pages');
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      name,
      description,
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
