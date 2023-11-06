<script setup>
import BackButton from "@/components/BackButton.vue";
import FeedbackForm from "@/components/FeedbackForm.vue";
</script>

<template>
  <!-- <div
    class="flex min-h-screen items-center justify-center gap-x-2 [&_div:hover]:scale-105 [&_div]:flex [&_div]:cursor-pointer [&_div]:flex-col [&_div]:items-center [&_div]:justify-center [&_div]:rounded-md [&_div]:bg-mint-jelly/20 [&_div]:px-6 [&_div]:py-4"
  >
    <div>
      <IconBug class="h-9 w-9" />

      <h2>Bug</h2>
    </div>

    <div>
      <IconLightBulb class="h-9 w-9" />

      <h2>Idea</h2>
    </div>

    <div>
      <IconSparkle class="h-9 w-9" />

      <h2>Other</h2>
    </div>
  </div> -->

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

  <main class="flex min-h-screen items-center justify-center">
    <FeedbackForm />
  </main>
</template>
