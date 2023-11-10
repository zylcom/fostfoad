<template>
  <div
    class="absolute z-10 h-[91vw] min-w-[260px] max-w-[260px] origin-top-left translate-y-64 -rotate-90 select-none overflow-y-auto sm:h-[95vw]"
  >
    <div
      class="grid translate-y-2 rotate-90 grid-cols-[repeat(10,minmax(200px,1fr))] grid-rows-1 gap-x-2"
    >
      <slot></slot>
    </div>
  </div>
</template>
