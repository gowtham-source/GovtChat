<template>
  <div class="home">
    <div class="top-bar">
      <p>Goverment Schemes</p>
    </div>
    <div class="chatarea">
      <div class="chat" v-for="(message, index) in messages" :key="index">
        <div class="pic" :class="{ user: message.sender !== 'Bot' }">
          {{ message.sender[0] }}
        </div>
        <div class="text">
          <span>{{ message.sender }}</span>
          <p><pre>{{ message.text }}</pre></p>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input
        type="text"
        placeholder="Message..."
        v-model="currentMessage"
        @keyup.enter="sendChat"
        :disabled="isProcessing"
      />
      <button @click="sendChat">
        <ion-icon
          :name="!isProcessing ? 'arrow-up-outline' : 'stop'"
        ></ion-icon>
      </button>
    </div>
  </div>
</template>

<script async setup>
import { getCurrentUser } from "vuefire";
import axios from "axios";

const currentUser = await getCurrentUser();
const currentMessage = ref("");
const isProcessing = ref(false);
const messages = ref([
  {
    text: "Hi, how can I help you?",
    sender: "Bot",
  },
  {
    text: "I need help with my business",
    sender: "User",
  },
]);

const sendChat = () => {
  console.log(currentMessage);
  let message = currentMessage.value;
  currentMessage.value = "";
  if (message.length) {
    messages.value.push({
      text: message,
      sender: "User",
    });

    isProcessing.value = true;

    axios
      .post("http://192.168.0.151:5000/query", {
        query: message,
      })
      .then((response) => {
        console.log(response.data.response);
        messages.value.push({
          text: response.data.response,
          sender: "Bot",
        });
        isProcessing.value = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  background: #f1f1f1;
  text-align: center;

  .top-bar {
    min-height: 60px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #ffffff;
    border-bottom: 1px solid #d4d4d4;

    p {
      width: 100%;
      max-width: 100%;
      font-size: 20px;
      font-weight: 600;
      color: #1e1e1f;

      padding: 0 10px;

     
    }
  }

  .chatarea {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    overflow: auto;
    padding-top: 10px;

    .chat {
      width: 100%;

      display: flex;
      padding: 0 10px;
      margin-bottom: 15px;
      // justify-content: center;
      // align-items: center;

      .pic {
        width: 30px;
        height: 30px;

        background: #4d78cc;
        color: #ffffff;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        // align-items: center;
      }

      .user {
        background: #ffb168;
        color: #1e1e1f;
      }

      .text {
        display: flex;
        flex-direction: column;

        width: calc(100% - 30px);
        padding-left: 10px;
        span,
        p {
          width: 100%;
          max-width: 100%;
          text-align: left;
           pre {
        word-wrap: break-word;
        white-space: pre-wrap;
      }
        }
      }
    }
  }

  .chat-input {
    min-height: 60px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #ffffff;
    border-top: 1px solid #d4d4d4;

    padding: 0 20px;

    input {
      height: 40px;
      width: calc(100% - 50px);
      padding: 0 20px;
      border: none;
      outline: none;

      border-radius: 20px;
      background: #ffffff;
    }

    button {
      height: 40px;
      width: 40px;
      background: #4d78cc;
      color: #eeeeee;
      border: none;
      outline: none;

      border-radius: 50%;

      display: flex;
      justify-content: center;

      font-size: 18px;
      align-items: center;
    }
  }
}
</style>
