<template>
  <div class="receipt-card border-b border-prunus-avium/50 px-5 py-4">
    <section class="receipt-header flex justify-between pb-5">
      <span class="text-sm font-medium text-dark-tone-ink">
        Date: 2022/07/02
      </span>

      <span class="text-xs text-torii-red"
        >Receipt#: <span class="text-gray-500">002</span>
      </span>
    </section>

    <section class="receipt-body">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="text-left text-lg font-normal text-dark-tone-ink">
              Ordered Items
            </th>
            <th class="text-sm font-normal text-dark-tone-ink">Pcs</th>
            <th class="text-sm font-normal text-dark-tone-ink">Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="text-sm text-gray-500">Espresso Single</td>
            <td class="text-center text-gray-500">2</td>
            <td class="text-center text-gray-500">30.000</td>
          </tr>
          <tr>
            <td class="text-sm text-gray-500">Espresso Single</td>
            <td class="text-center text-gray-500">2</td>
            <td class="text-center text-gray-500">30.000</td>
          </tr>
          <tr>
            <td class="text-sm text-gray-500">Espresso Single</td>
            <td class="text-center text-gray-500">2</td>
            <td class="text-center text-gray-500">30.000</td>
          </tr>
          <tr>
            <td class="text-sm text-gray-500">Espresso Single</td>
            <td class="text-center text-gray-500">2</td>
            <td class="text-center text-gray-500">30.000</td>
          </tr>
          <tr>
            <td
              class="border-t border-torii-red/50 text-sm font-medium text-dark-tone-ink"
              colspan="2"
            >
              Total Amount:
            </td>
            <td
              class="border-t border-torii-red/50 text-center text-sm text-dark-tone-ink"
            >
              60.000
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
