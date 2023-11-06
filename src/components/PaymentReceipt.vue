<script setup>
import IconCheck from "@/components/icons/IconCheck.vue";
import IconCross from "@/components/icons/IconCross.vue";
import IconExclamation from "@/components/icons/IconExclamation.vue";
import IconGreaterThan from "@/components/icons/IconGreaterThan.vue";
import { formatDateToLocaleId } from "@/utils";

defineProps({
  order: Object,
});
</script>

<template>
  <div class="rounded-xl bg-bleached-silk p-6">
    <div class="relative py-8">
      <div
        class="m-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-mint-jelly/10"
      >
        <IconCheck
          class="stroke-mint-jelly"
          v-if="order.payment.status === 'paid'"
        />

        <IconCross
          class="stroke-torii-red"
          v-else-if="order.payment.status === 'unpaid'"
        />

        <IconExclamation class="stroke-chocobo-feather" v-else />
      </div>

      <h2 class="text-center text-xl font-semibold">Payment Success!</h2>
    </div>

    <span
      class="block h-0 border-b-2 border-dashed border-dark-tone-ink before:absolute before:right-4 before:-ml-1 before:-mt-2 before:h-5 before:w-5 before:rounded-full before:bg-seljuk-blue after:absolute after:left-4 after:-mt-2 after:h-5 after:w-5 after:rounded-full after:bg-seljuk-blue"
    />

    <div
      class="pt-8 font-rubik text-xs [&_p]:mb-4 [&_p]:flex [&_p]:items-center [&_p]:justify-between [&_p]:gap-x-8"
    >
      <p>
        Order ID <span>{{ order.id }}</span>
      </p>
      <p>
        Status <span>{{ order.payment.status }}</span>
      </p>

      <details
        class="overflow-hidden [&[open]+div]:max-h-56 [&[open]_span]:rotate-90"
      >
        <summary
          class="mb-4 flex cursor-pointer list-none items-center justify-between font-semibold"
        >
          Transaction detail

          <span class="transition-transform"><IconGreaterThan /></span>
        </summary>
      </details>

      <div class="max-h-0 overflow-hidden transition-all duration-300">
        <p>
          Name <span>{{ order.payment.name }}</span>
        </p>

        <p>
          Date & Time
          <span>{{
            formatDateToLocaleId({
              date: order.payment.createdAt,
              showTime: true,
            })
          }}</span>
        </p>

        <p>
          Email <span>{{ order.email }}</span>
        </p>

        <p>
          Payment Method <span>{{ order.payment.method }}</span>
        </p>
      </div>

      <details
        class="mb-4 overflow-hidden [&[open]+div]:max-h-56 [&[open]_span]:rotate-90"
      >
        <summary
          class="flex cursor-pointer list-none items-center justify-between font-semibold"
        >
          Shipment detail

          <span class="transition-transform"><IconGreaterThan /></span>
        </summary>
      </details>

      <div class="max-h-0 overflow-hidden transition-all duration-300">
        <p>
          Address
          <span>{{
            `${order.shipment.address}, ${order.shipment.state}`
          }}</span>
        </p>

        <p>
          Detail <span>{{ order.shipment.detail }}</span>
        </p>

        <p>
          Name <span>{{ order.shipment.name }}</span>
        </p>

        <p>
          Status <span>{{ order.shipment.status }}</span>
        </p>
      </div>

      <span class="block h-0 border-b border-dashed border-dark-tone-ink" />

      <details class="mt-4 overflow-hidden [&[open]+div]:max-h-56">
        <summary
          class="flex cursor-pointer list-none justify-between rounded-lg bg-mint-jelly/20 px-1 py-3 font-semibold"
        >
          Total <span>{{ order.total }}</span>
        </summary>
      </details>

      <div class="max-h-0 overflow-hidden pl-3 transition-all duration-300">
        <p>
          Sub-total <span>{{ order.subTotal }}</span>
        </p>

        <p>
          Shiping Cost <span>{{ order.shipment.cost }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
