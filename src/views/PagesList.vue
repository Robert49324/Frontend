<template>
  <Header />

  <div>
    <h1>Pages List</h1>
    <ul>
      <li v-for="page in pages" :key="page.id" class="card">
        <router-link :to="{ name: 'descriptionPage', params: { id: page.id } }">
          <div class="card-body">
            <h5 class="card-title">
              {{ page.name }}
            </h5>
            <p class="card-text">{{ page.description }}</p>
          </div>
        </router-link>
        <button @click="followPage(page.id)" v-if="!page.followed">
          Follow
        </button>
        <button @click="unfollowPage(page.id)" v-else>
          Unfollow
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "../axios/axios";
import Header from "@/components/HeaderElement.vue";

export default {
  components: {
    Header,
  },

  setup() {
    const pages = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get("/page/list/");
        pages.value = response.data.pages;
      } catch (error) {
        console.error(error);
      }
    });

    async function followPage(id) {
      try {
        await axios.patch(`/page/${id}/follow`);
        const index = pages.value.findIndex((page) => page.id === id);
        if (index !== -1) {
          pages.value[index].followed = true;
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function unfollowPage(id) {
      try {
        await axios.patch(`/page/${id}/unfollow`);
        const index = pages.value.findIndex((page) => page.id === id);
        if (index !== -1) {
          pages.value[index].followed = false;
        }
      } catch (error) {
        console.error(error);
      }
    }

    return {
      pages,
      followPage,
      unfollowPage,
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
ul {
  list-style-type: none;
  padding: 30px;
  margin: 0px;
}

.card {
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  margin-bottom: 0.5rem;
}

.card-text {
  margin-bottom: 0.5rem;
}
</style>
