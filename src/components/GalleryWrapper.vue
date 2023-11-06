<template>
  <div
    class="absolute z-10 h-[90vw] min-w-[200px] max-w-[210px] origin-top-left translate-y-52 -rotate-90 select-none overflow-y-auto"
  >
    <div
      class="grid translate-y-5 rotate-90 grid-cols-[repeat(10,minmax(200px,1fr))] grid-rows-1 gap-x-2"
    >
      <slot></slot>
    </div>
  </div>
</template>
