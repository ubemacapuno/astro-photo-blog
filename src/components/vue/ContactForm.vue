<script setup lang="ts">
import { ref, reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const status = ref<"idle" | "submitting" | "success" | "error">("idle");
const errorMessage = ref("");

async function handleSubmit(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  
  if (status.value === "submitting") return false;

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    status.value = "error";
    errorMessage.value = "Please fill in all fields";
    return false;
  }

  status.value = "submitting";
  errorMessage.value = "";

  try {
    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("email", form.email.trim());
    formData.append("message", form.message.trim());

    const response = await fetch("/_actions/send", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorMsg = "Something went wrong";
      try {
        const result = await response.json();
        errorMsg = result?.message ?? result?.error ?? errorMsg;
      } catch {
        // If JSON parsing fails, use default message
        errorMsg = "Something went wrong";
      }
      throw new Error(errorMsg);
    }

    await response.json();

    status.value = "success";
    form.name = "";
    form.email = "";
    form.message = "";
    return false;
  } catch (err: any) {
    status.value = "error";
    errorMessage.value = err.message || "Failed to send message";
    return false;
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name">Name</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="border-2 border-black p-2 w-full"
      />
    </div>

    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="border-2 border-black p-2 w-full"
      />
    </div>

    <div>
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        required
        rows="5"
        class="border-2 border-black p-2 w-full"
      />
    </div>

    <button
      type="submit"
      :disabled="status === 'submitting' || status === 'success'"
      class="border-2 border-black p-2 w-full"
    >
      {{ status === "submitting" ? "Sending..." : status === "success" ? "Sent!" : "Send" }}
    </button>

    <p v-if="status === 'success'" class="text-green-600">
      Sent successfully!
    </p>

    <p v-if="status === 'error'" class="text-red-600">
      {{ errorMessage || "Failed to send message" }}
    </p>
  </form>
</template>
