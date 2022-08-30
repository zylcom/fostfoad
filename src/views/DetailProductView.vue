<script setup>
import { useRoute } from "vue-router";
import IconCart from "../components/icons/IconCart.vue";
import IconArrow from "../components/icons/IconArrow.vue";
import IconLove from "../components/icons/IconLove.vue";
import ReviewCard from "../components/ReviewCard.vue";
import IconMinus from "../components/icons/IconMinus.vue";
import IconPlus from "../components/icons/IconPlus.vue";

const route = useRoute();
const productName = route.params.slug;

console.log(productName);
</script>

<template>
  <header class="inline">
    <nav class="fixed z-30 flex w-full justify-between px-6 pt-8">
      <RouterLink to="/menu" class="transition duration-300 hover:scale-125">
        <IconArrow />
      </RouterLink>

      <RouterLink to="/cart" class="transition duration-300 hover:scale-125">
        <IconCart />
      </RouterLink>
    </nav>

    <img
      src="../assets/images/foods/cappuccino.jpg"
      alt="Cappuccino"
      class="sticky top-0 left-0 w-full"
    />
  </header>

  <main
    class="relative z-20 -translate-y-5 rounded-t-lg bg-zhen-zhu-bai-pearl px-6 pt-12 pb-5"
  >
    <div class="flex items-center justify-between pb-5">
      <h1 class="text-2xl font-medium text-dark-tone-ink">Cappuccino</h1>
      <button><IconLove /></button>
    </div>

    <h4 class="text-sm text-dark-tone-ink">Ingredients</h4>
    <p class="text-xs text-gray-500">
      Coco powder, ground coffee, milk, lorem, ipsum, sit, dolor, amet.
    </p>

    <div class="flex flex-col gap-y-6 pt-6 text-sm">
      <p class="font-medium">
        Price: <span class="font-normal">Rp 5.000</span>
      </p>

      <div class="flex items-center gap-x-2">
        <span class="text-sm">Quantity:</span>

        <button
          class="flex h-7 w-7 items-center justify-center bg-bleached-silk text-torii-red hover:bg-slate-200"
        >
          <IconMinus />
        </button>

        <span class="font-rubik text-sm">2</span>

        <button
          class="flex h-7 w-7 items-center justify-center bg-bleached-silk text-torii-red hover:bg-slate-200"
        >
          <IconPlus />
        </button>
      </div>

      <p class="font-medium">
        Total: <span class="font-normal">Rp 10.000</span>
      </p>
    </div>

    <button
      class="my-6 w-full rounded-lg bg-torii-red py-2 font-rubik text-charolais-cattle"
    >
      Add to cart
    </button>

    <div>
      <h4 class="pb-6 text-sm text-dark-tone-ink">Reviews</h4>
      <div class="review-list flex flex-col gap-y-6">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  </main>
</template>
