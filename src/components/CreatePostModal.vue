<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Create post</h2>
      <form @submit.prevent="submitForm">
        <label for="content">Content</label>
        <input type="text" id="content" v-model="content"/>
        <label for="reply_to">Reply to</label>
        <textarea id="reply_to" v-model="reply_to"></textarea>
        <button type="submit">Submit</button>
      </form>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../axios/axios';
export default {
  props: {
    pageId: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const content = ref('');
    const reply_to = ref('');

    const submitForm = async () => {
      try {
        const response = await axios.post(`/page/${props.pageId}/post`, {
          content: content.value,
          reply_to: reply_to.value,
        });
        if (response.status === 200) {
          emit('close');
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      content,
      reply_to,
      submitForm,
    };
  },
};
</script>

<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: fit-content;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>

