<script setup>
import { useRoute } from "vue-router";
import IconDotsHorizontal from "../components/icons/IconDotsHorizontal.vue";
import IconHome from "../components/icons/IconHome.vue";
import IconHistory from "../components/icons/IconHistory.vue";
import IconMenu from "../components/icons/IconMenu.vue";
import NavigationButton from "./NavigationButton.vue";
import { useAuthUserStore } from "../stores/authUser";

const route = useRoute();
const authUserStore = useAuthUserStore();
const authUser = authUserStore.getAuthUser;
</script>

<template>
  <nav class="flex justify-around">
    <NavigationButton
      :path="route.path === '/' ? route.fullPath : '/'"
      path-name="Home"
      :icon="IconHome"
      text-active-color="text-chocobo-feather"
    />

    <NavigationButton
      :path="route.path === '/menu' ? route.fullPath : '/menu'"
      path-name="Menu"
      :icon="IconMenu"
      text-active-color="text-torii-red"
    />

    <NavigationButton
      path="/history"
      path-name="History"
      :icon="IconHistory"
      text-active-color="text-heirloom-hydrangea"
      v-if="authUser"
    />

    <NavigationButton
      path="/settings"
      path-name="More"
      :icon="IconDotsHorizontal"
      text-active-color="text-venetian-nights"
    />
  </nav>
</template>
