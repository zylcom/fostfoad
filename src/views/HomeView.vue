<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import BestRatedProductList from "../components/BestRatedProductList.vue";
import CartButton from "../components/CartButton.vue";
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";
import { useHideOnScroll } from "../composables/useHideOnScroll";
import { useCategoryStore } from "../stores/category";
import { storeToRefs } from "pinia";
import categoryService from "../services/category-service";
import JumbotronCard from "../components/cards/JumbotronCard.vue";
import MarketingCard from "../components/cards/MarketingCard.vue";

const categoryStore = useCategoryStore();
const { categoryList } = storeToRefs(categoryStore);
const keyword = ref("");
const navElement = ref(null);
const sidebar = ref(null);
const overlayElement = ref(null);

useHideOnScroll(navElement);

function hide() {
  overlayElement.value.classList.replace("block", "hidden");
  sidebar.value.style = "transform: translateX(-100%)";
  document.body.style = "height: auto; overflow-y: auto;";
}

function show() {
  overlayElement.value.classList.replace("hidden", "block");
  sidebar.value.style = "transform: translateX(0%)";
  document.body.style = "height: 100lvh; overflow-y: hidden;";
}

onMounted(async () => {
  try {
    await categoryService.get();
  } catch (error) {
    console.log(error);
  }
});

onMounted(() => {
  overlayElement.value = document.querySelector(".overlay-bg");
  overlayElement.value.addEventListener("click", hide);
});

onUnmounted(() => {
  overlayElement.value.removeEventListener("click", hide);
});
</script>

<template>
  <header class="fixed top-0 z-20 inline w-full shadow transition-all duration-500" ref="navElement">
    <div class="h-3 w-full [background:repeating-linear-gradient(135deg,#F2921E,#F2921E_7%,#d9cbc4_7%,#d9cbc4_14%)]" />

    <nav class="grid w-full grid-cols-[40px_1fr_40px] grid-rows-2 items-center gap-x-2 gap-y-4 bg-dark-serpent px-2 pb-2 pt-3 md:grid-cols-12 md:px-6">
      <button class="order-1 md:hidden" @click="show()">side</button>

      <SearchBar v-model:keyword="keyword" redirectTo="result" class="order-4 col-span-3 md:order-1 md:col-span-5" />

      <a href="/" class="order-2 mx-auto w-fit text-center text-3xl text-snowbank md:order-2 md:col-span-2">FostFoad</a>

      <CartButton class="order-3 col-span-1 w-fit justify-self-center md:order-3 md:col-end-13 md:justify-self-end" />

      <div class="hidden md:order-4 md:col-span-12 md:flex md:items-center md:justify-between">
        <ul class="flex items-center gap-8 font-rubik font-medium text-snowbank">
          <li>Menu</li>
          <li>Main Course</li>
          <li>Drink</li>
          <li>Apetizer</li>
          <li>Desert</li>
        </ul>

        <div>
          <button class="rounded-full bg-mint-jelly px-5 py-2 text-xs font-medium uppercase tracking-wider">Personalised</button>
        </div>
      </div>
    </nav>
  </header>

  <aside
    class="side fixed left-0 top-0 z-30 h-[100lvh] w-full max-w-sm overflow-auto bg-bleached-silk pb-20 font-medium transition-transform duration-500"
    style="transform: translateX(-100%)"
    ref="sidebar"
  >
    <div class="sticky top-0 flex items-center justify-between bg-thamar-black px-6 py-3 text-snowbank">Menu <button class="" @click="hide()">x</button></div>

    <section v-if="categoryList.length > 0">
      <div class="border-b border-b-dark-side-of-the-moon/10" v-for="category in categoryList" :key="category.id">
        <details
          class="md:hidden [&[open]+ul]:max-h-56 [&[open]+ul]:pb-2 [&[open]>summary_span:first-of-type]:rotate-[360deg] [&[open]>summary_span:last-of-type]:rotate-[270deg]"
        >
          <summary class="w-full cursor-pointer list-none">
            <div class="flex w-full items-center justify-between px-6 py-3">
              {{ category.name }}

              <div class="relative flex items-center justify-center">
                <span class="h-[0.75px] w-4 rotate-0 bg-thamar-black transition duration-1000" />
                <span class="absolute h-4 w-[0.75px] rotate-0 bg-thamar-black transition delay-100 duration-1000" />
              </div>
            </div>
          </summary>
        </details>

        <ul class="max-h-0 space-y-1 overflow-hidden pl-11 pr-8 font-normal transition-all duration-1000 [list-style:circle] md:hidden">
          <li>Burger</li>
          <li>Pizza</li>
        </ul>
      </div>
    </section>

    <section class="space-y-6 px-6 pt-6">
      <div class="flex items-center justify-center gap-2 text-sm">
        <button class="rounded-full bg-mint-jelly px-10 py-2 uppercase tracking-wider">Favorite</button>
        <button class="rounded-full bg-prunus-avium px-10 py-2 uppercase tracking-wider">New</button>
      </div>

      <div>
        <span>Contact Us</span>

        <ul class="mt-3 font-normal text-dark-side-of-the-moon/40">
          <li>icon <a href="#">081234567890</a></li>
          <li>icon <a href="#">email@gmail.com</a></li>
        </ul>
      </div>
    </section>
  </aside>

  <main class="mx-[18px] flex flex-col gap-y-16 pb-16 pt-36">
    <section class="grid grid-cols-12 gap-8">
      <JumbotronCard class="col-span-8 h-[70vh] w-full" />

      <div class="col-span-4 flex flex-col gap-8">
        <MarketingCard />
        <MarketingCard />
      </div>
    </section>

    <BestRatedProductList title="Best Rated Foods" category="food" />

    <BestRatedProductList title="Best Rated Drinks" category="drink" />

    <ProductList title="All Food & Drink" :keyword="keyword" />
  </main>
</template>
