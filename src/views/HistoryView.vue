<script setup>
import { onMounted, ref } from "vue";
import ReceiptCard from "@/components/ReceiptCard.vue";
import orderService from "@/services/order-service";

const listOrder = ref([]);
const multipleThree = ref([]);
const multipleThree2 = ref([]);
const multipleThree3 = ref([]);

onMounted(async () => {
  try {
    const result = await orderService.listOrder();

    console.log(result.data.data);

    for (let i = 0; i < result.data.data.length; i += 3) {
      multipleThree.value = [...multipleThree.value, i];
    }

    for (let i = 1; i < result.data.data.length; i += 3) {
      multipleThree2.value = [...multipleThree2.value, i];
    }

    for (let i = 2; i < result.data.data.length; i += 3) {
      multipleThree3.value = [...multipleThree3.value, i];
    }

    console.log(multipleThree.value);
    console.log(multipleThree2.value);
    console.log(multipleThree3.value);

    listOrder.value = result.data.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="min-h-screen">
    <header class="sticky top-0 pb-24 pt-11">
      <h1 class="text-center text-2xl font-medium">History</h1>
    </header>

    <p class="text-center" v-if="listOrder.length < 1">There no records.</p>

    <main
      class="relative z-10 grid auto-rows-[minmax(min-content,max-content)] rounded-t-[20px] bg-zhen-zhu-bai-pearl pb-14 md:grid-cols-3"
      v-else
    >
      <div class="flex flex-col">
        <ReceiptCard
          v-for="n in multipleThree"
          :key="n"
          :order="listOrder[n]"
        />
      </div>

      <div class="flex flex-col">
        <ReceiptCard
          v-for="n in multipleThree2"
          :key="n"
          :order="listOrder[n]"
        />
      </div>

      <div class="flex flex-col">
        <ReceiptCard
          v-for="n in multipleThree3"
          :key="n"
          :order="listOrder[n]"
        />
      </div>
    </main>
  </div>
</template>
