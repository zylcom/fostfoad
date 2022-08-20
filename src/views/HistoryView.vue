<script setup>
import NavigationBar from "../components/NavigationBar.vue";
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

  <footer class="fixed bottom-0 z-50 w-full bg-white py-2">
    <NavigationBar />
  </footer>
</template>
