<template>
  <Header />
  <div>
    <h1>Home page</h1>
    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id" class="card">
        <router-link :to="{ name: 'postPage', params: { id: post.id } }">
        <div class="card-body">
          <h5 class="card-title">{{ post.content }}</h5>
          <p class="card-text">{{ post.created_at }}</p>
        </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>No posts found</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "../axios/axios";
import Header from "../components/HeaderElement.vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    Header,
  },
  setup() {
    const posts = ref([]);
    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await axios.get('/feed/');
        posts.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      posts,
      router,
    };
  },
};
</script>

<style>
.card {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>



