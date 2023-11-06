<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toast-notification";
import cartService from "../services/cart-service";
import IconPencil from "./icons/IconPencil.vue";
import IconPlus from "./icons/IconPlus.vue";
import QuantityInput from "./QuantityInput.vue";
import { allStore } from "../stores";
import { useLoading } from "@/composables/useLoading";

const props = defineProps({ product: Object });

const $toast = useToast();
const { authUserStore, cartStore } = allStore();

const authUser = computed(() => authUserStore.authUser);
const cartItem = computed(() => cartStore.getItem(props.product.slug));
const product = computed(() => props.product);
const quantity = ref(cartItem.value?.quantity || 1);

const { isLoading, showLoading, hideLoading } = useLoading();

async function onAddCartClicked(infoMessage) {
  showLoading();

  try {
    if (authUser.value) {
      await cartService.upsert({
        productSlug: product.value.slug,
        quantity: quantity.value,
      });
    } else {
      cartStore.upsertItem({
        productSlug: product.value.slug,
        quantity: quantity.value,
        product: product.value,
      });
    }

    $toast.success(`Success ${infoMessage}`, { position: "top" });
  } catch (error) {
    $toast.error("Something went wrong!", { position: "top" });
  } finally {
    setTimeout(() => {
      hideLoading();
    }, 1000);
  }
}

defineExpose({ cartItem });
</script>

<template>
  <form
    class="flex items-center gap-x-2"
    @submit.prevent="
      onAddCartClicked(cartItem?.product.id ? 'Updated' : 'Added')
    "
  >
    <span class="text-xs">Qty:</span>

    <QuantityInput class="w-12" v-model:quantity="quantity" />

    <button
      type="submit"
      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mercury"
      :title="cartItem?.product.id ? 'Update' : 'Add to cart'"
      :disabled="isLoading ? true : false"
    >
      <IconPlus color="#de3905" v-if="!cartItem?.product.id" />

      <IconPencil v-else />
    </button>
  </form>
</template>
