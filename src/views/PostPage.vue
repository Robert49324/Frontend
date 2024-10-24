<template>
    <Header />
    <div>
        <h1>Post page</h1>
        <p v-if="post">{{ post.content }}</p>
        <p v-if="post">{{ post.created_at }}</p>
        <p v-if="post">{{ post.reply_to }}</p>
        <button v-if="post && is_liked" @click="unlikePost(postId)">Unlike ({{ post.likes }})</button>
        <button v-else-if="post" @click="likePost(postId)">Like ({{ post.likes }})</button>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "../axios/axios";
import { useRoute } from "vue-router";
import Header from "../components/HeaderElement.vue";

export default {
    components: {
        Header
    },

    setup() {
        const route = useRoute();
        const postId = computed(() => route.params.id);
        const post = ref(null);
        const is_liked = ref(false);

        onMounted(async () => {
            try {
                const response = await axios.get(`/post/${postId.value}/info`);
                post.value = response.data;
                is_liked.value = post.value.is_liked;
            } catch (error) {
                console.error(error);
            }
        });

        function likePost(postId) {
            if (!post.value) return;

            axios
                .patch(`post/${postId}/like`)
                .then((response) => {
                    if (response.status === 200) {
                        if (post.value.id === postId) {
                            post.value.likes++;
                            
                        }
                        is_liked.value = true;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        function unlikePost(postId) {
            if (!post.value) return;

            axios
                .patch(`post/${postId}/unlike`)
                .then((response) => {
                    if (response.status === 200) {
                        if (post.value.id === postId) {
                            post.value.likes--;
                        }
                        is_liked.value = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return {
            post,
            likePost,
            postId,
            unlikePost,
            is_liked
        };
    }
}
</script>

<style>
</style>
