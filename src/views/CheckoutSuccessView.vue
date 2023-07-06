<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const orderId = route.params.id;
</script>

<template>order {{ orderId }}</template>
