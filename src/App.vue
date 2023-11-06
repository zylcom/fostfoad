<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>

  <RouterView name="NavigationTab" v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>
