<script setup>
import BackButton from "@/components/BackButton.vue";
import FeedbackForm from "@/components/FeedbackForm.vue";
</script>

<template>
  <header class="bg-cloud-break">
    <div
      class="fixed top-0 z-50 flex w-full items-center bg-cloud-break px-6 pb-2 pt-3 shadow transition-all duration-500"
      ref="navElement"
    >
      <nav class="flex">
        <BackButton />
      </nav>

      <h1 class="w-full text-center text-2xl font-medium">Feedback</h1>
    </div>
  </header>

  <main class="m-4 flex min-h-screen flex-col items-center justify-center">
    <h2 class="mb-4 mt-16">
      What would you like to share with the developer teams?*
    </h2>

    <FeedbackForm />
  </main>
</template>
