<template>
  <Header />
  <div v-if="page">
    <h1>{{ page.name }}</h1>
    <p>{{ page.description }}</p>
    <button v-if="page.owner == store.state.user.id" @click="openModal">Create post</button>
    <div v-if="page.related_posts && page.related_posts.length > 0">
      <h2>Posts:</h2>
      <div v-for="post in page.related_posts" :key="post.id" class="card">
        
        <div class="card-body">
          <router-link :to="{ name: 'postPage', params: { id: post.id } }">
          <p>{{ post.content }}</p>
          <p>{{ post.reply_to }}</p>
          </router-link>
          <button v-if="post.is_liked" @click="unlikePost(post.id)">Unlike ({{ post.likes }})</button>
          <button v-else @click="likePost(post.id)">Like ({{ post.likes }})</button>
        </div>
        
      </div>
    </div>
  </div>
  <div v-else>
    <p>Page not found</p>
  </div>
  <PostModal v-if="showModal" :page-id="pageId" @close="closeModal" />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "../axios/axios";
import Header from "../components/HeaderElement.vue";
import PostModal from "@/components/CreatePostModal.vue";
import { useStore } from "vuex";

export default {
  components: {
    Header,
    PostModal,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const pageId = computed(() => route.params.id);
    const page = ref(null);
    const showModal = ref(false);

    onMounted(async () => {
      try {
        const response = await axios.get(`/page/${pageId.value}/`);
        if (response.status === 200) {
          page.value = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    });

    function likePost(postId) {
      axios
        .patch(`post/${postId}/like`)
        .then((response) => {
          if (response.status === 200) {
            for (let post of page.value.related_posts) {
              if (post.id === postId) {
                post.likes++;
                post.is_liked = true;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function unlikePost(postId) {
      axios
        .patch(`post/${postId}/unlike`)
        .then((response) => {
          if (response.status === 200) {
            for (let post of page.value.related_posts) {
              if (post.id === postId) {
                post.likes--;
                post.is_liked = false;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function openModal() {
      showModal.value = true;
    }

    function closeModal() {
      showModal.value = false;
    }

    return {
      page,
      openModal,
      closeModal,
      pageId,
      showModal,
      likePost,
      unlikePost,
      store,
    };
  },
};
</script>
