<script setup>
defineProps({ isActive: Boolean });
</script>

<template>
  <svg
    width="21"
    height="23"
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.79834"
      y="0.25"
      width="19.2419"
      height="21.0909"
      rx="2.75"
      :stroke="isActive ? '#DE3905' : '#808080'"
    />
    <line
      x1="0.54834"
      y1="5.38232"
      x2="8.67737"
      y2="5.38232"
      :stroke="isActive ? '#DE3905' : '#808080'"
      stroke-width="0.5"
    />
    <line
      x1="12.1611"
      y1="7.25977"
      x2="20.2902"
      y2="7.25977"
      :stroke="isActive ? '#DE3905' : '#808080'"
      stroke-width="0.5"
    />
    <line
      x1="0.54834"
      y1="10.0762"
      x2="8.67737"
      y2="10.0762"
      :stroke="isActive ? '#DE3905' : '#808080'"
      stroke-width="0.5"
    />
    <line
      x1="12.1611"
      y1="13.8311"
      x2="20.2902"
      y2="13.8311"
      :stroke="isActive ? '#DE3905' : '#808080'"
      stroke-width="0.5"
    />
    <line
      x1="0.54834"
      y1="11.9536"
      x2="8.67737"
      y2="11.9536"
      :stroke="isActive ? '#DE3905' : '#808080'"
      stroke-width="0.5"
    />
    <line
      x1="12.1611"
      y1="15.7085"
      x2="20.2902"
      y2="15.7085"
      :stroke="isActive ? '#DE3905' : '#808080'"
      stroke-width="0.5"
    />
  </svg>
</template>
