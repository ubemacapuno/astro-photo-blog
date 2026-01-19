<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  messages: string[];
}>();

const greeting = ref(props.messages[0]);

function randomMessage(): string {
  const index = Math.floor(Math.random() * props.messages.length);
  return props.messages[index];
}

function setRandomGreeting() {
  greeting.value = randomMessage();
}
</script>

<template>
  <div>
    <h3>{{ greeting }}! Thank you for visiting!</h3>
    <button @click="setRandomGreeting">New Greeting</button>
  </div>
</template>
