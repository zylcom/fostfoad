<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import feedbackService from "../services/feedback-service";
import { useLoading } from "@/composables/useLoading";

const $toast = useToast();
const description = ref("");

const { isLoading, showLoading, hideLoading } = useLoading();

async function onSubmitHandler() {
  showLoading();

  try {
    const result = await feedbackService.create(description.value);

    $toast.success(`${result.data.data} success!`, { position: "top" });
  } catch (error) {
    console.log(error);

    $toast.error("Something went wrong!", { position: "top" });
  } finally {
    hideLoading();
  }
}
</script>

<template>
  <form action="" @submit.prevent="onSubmitHandler()">
    <textarea
      class="m-auto max-h-screen w-full rounded-md border border-dark-tone-ink/40 p-3 py-2 font-rubik focus:outline-none focus:ring-0"
      name="description"
      placeholder="Tell us whats going on..."
      id="description"
      v-model="description"
      cols="30"
      rows="10"
    ></textarea>

    <button
      :class="{
        'w-full rounded-md  py-3 text-white': true,
        'cursor-default bg-gray-400 text-mercury':
          isLoading || description.length < 1 || !Boolean(description.trim()),
        'bg-prunus-avium text-white':
          !isLoading && description.length > 0 && Boolean(description.trim()),
      }"
      type="submit"
      :disabled="
        isLoading || description.length < 1 || !Boolean(description.trim())
      "
    >
      Send Feedback
    </button>
  </form>
</template>
