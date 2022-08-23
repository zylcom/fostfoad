<script setup>
import IconHome from "../components/icons/IconHome.vue";
import IconMenu from "../components/icons/IconMenu.vue";
import IconHistory from "../components/icons/IconHistory.vue";
import IconDotsHorizontal from "../components/icons/IconDotsHorizontal.vue";
import NavigationButton from "./NavigationButton.vue";
</script>

<template>
  <nav class="flex justify-around">
    <NavigationButton
      path="/"
      path-name="Home"
      :icon="IconHome"
      text-active-color="text-chocobo-feather"
    />

    <NavigationButton
      path="/menu"
      path-name="Menu"
      :icon="IconMenu"
      text-active-color="text-torii-red"
    />

    <NavigationButton
      path="/history"
      path-name="History"
      :icon="IconHistory"
      text-active-color="text-heirloom-hydrangea"
    />

    <NavigationButton
      path="/setting"
      path-name="More"
      :icon="IconDotsHorizontal"
      text-active-color="text-venetian-nights"
    />
  </nav>
</template>
