<script setup>
import ReceiptCard from "../components/ReceiptCard.vue";
</script>

<template>
  <header class="sticky top-0 pt-11 pb-24">
    <h1 class="text-center text-2xl font-medium">History</h1>
  </header>

  <main class="relative z-10 rounded-t-[20px] bg-zhen-zhu-bai-pearl pb-14">
    <ReceiptCard />
    <ReceiptCard />
    <ReceiptCard />
  </main>
</template>
