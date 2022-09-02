<script setup>
import BackButton from "../components/BackButton.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import CartItem from "../components/CartItem.vue";
</script>

<template>
  <header class="flex w-full items-center bg-cloud-break pt-8 pb-20">
    <nav class="fixed z-50 flex px-6">
      <BackButton />
    </nav>

    <h1 class="fixed w-full text-center text-2xl font-medium">Your Cart</h1>
  </header>

  <main
    class="relative z-20 -translate-y-2 rounded-t-2xl bg-zhen-zhu-bai-pearl"
  >
    <div
      class="grid auto-rows-fr grid-cols-2 items-center gap-x-6 border-b border-torii-red/50 px-6 pt-6 pb-6 [&>div]:relative"
    >
      <CartItem />

      <CartItem />

      <CartItem />

      <RouterLink
        to="/menu"
        class="mx-auto flex h-fit items-center gap-x-1 text-sm text-heirloom-hydrangea"
      >
        Add some more
        <span class="rounded-full bg-mercury p-1">
          <IconPlus color="#2a7dd2" />
        </span>
      </RouterLink>
    </div>

    <p
      class="flex justify-between px-6 pt-2 pb-4 text-xs font-medium text-thamar-black"
    >
      Total: <span class="font-normal">Rp 60.000</span>
    </p>

    <div class="border-t border-prunus-avium/50 px-6 pt-24">
      <h1 class="font-rubik text-lg text-thamar-black">Payment mode:</h1>
      <p class="font-rubik text-xs text-gray-500">Choose a method of payment</p>

      <div class="my-6 grid grid-cols-2 gap-6">
        <label for="payment-1" class="flex cursor-pointer items-center gap-x-2">
          <input type="radio" name="payment_method" id="payment-1" disabled />
          Coming Soon
        </label>

        <label for="payment-2" class="flex cursor-pointer items-center gap-x-2">
          <input type="radio" name="payment_method" id="payment-2" disabled />
          Coming Soon
        </label>

        <label for="payment-3" class="flex cursor-pointer items-center gap-x-2">
          <input type="radio" name="payment_method" id="payment-3" disabled />
          Coming Soon
        </label>

        <label for="payment-4" class="flex cursor-pointer items-center gap-x-2">
          <input type="radio" name="payment_method" id="payment-4" disabled />
          Coming Soon
        </label>
      </div>

      <button
        class="my-6 w-full rounded-lg bg-torii-red/95 py-2 font-rubik text-charolais-cattle hover:bg-torii-red/90 active:bg-torii-red"
      >
        Buy
      </button>
    </div>
  </main>
</template>
