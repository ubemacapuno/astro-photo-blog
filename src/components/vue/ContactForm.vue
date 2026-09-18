<script setup lang="ts">
import { ref, reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const status = ref<"idle" | "submitting" | "success" | "error">("idle");
const errorMessage = ref("");
const maxTextAreaLength = 500;

async function handleSubmit(event: Event) {
  event.preventDefault();
  event.stopPropagation();

  if (status.value === "submitting") return false;

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    status.value = "error";
    errorMessage.value = "Please fill in all fields";
    return false;
  }

  if (form.message.trim().length > maxTextAreaLength) {
    status.value = "error";
    errorMessage.value = `Message must be ${maxTextAreaLength} characters or less`;
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
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
    <div class="flex flex-col gap-2">
      <label for="name" class="font-bold">Name</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        autocomplete="name"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="email" class="font-bold">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        autocomplete="email"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="message" class="font-bold">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        required
        rows="5"
        class="resize-y"
        :maxlength="maxTextAreaLength"
      />
      <p class="text-sm text-text-muted text-right">
        {{ form.message.length }}/{{ maxTextAreaLength }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="status === 'submitting' || status === 'success'"
      :class="[
        'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold',
        'bg-text-primary text-text-secondary transition-opacity',
        status === 'submitting' || status === 'success'
          ? 'cursor-not-allowed opacity-60'
          : 'cursor-pointer hover:opacity-80',
      ]"
    >
      <span>
        {{
          status === "submitting"
            ? "Sending..."
            : status === "success"
              ? "Sent!"
              : "Send Message"
        }}
      </span>
      <svg
        v-if="status === 'idle' || status === 'error'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
        aria-hidden="true"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    </button>

    <p v-if="status === 'success'" role="status" class="text-green-600">
      Sent successfully!
    </p>

    <p v-if="status === 'error'" role="alert" class="text-red-600">
      {{ errorMessage || "Failed to send message" }}
    </p>
  </form>
</template>
