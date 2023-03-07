<script setup>
import IconGreaterThan from "../components/icons/IconGreaterThan.vue";
import IconLogin from "../components/icons/IconLogin.vue";
import IconLogout from "../components/icons/IconLogout.vue";
import ToggleSwitch from "../components/ToggleSwitch.vue";
import SettingButton from "../components/SettingButton.vue";
import { useAuthUserStore } from "../stores/authUser";

const authUserStore = useAuthUserStore();
const authUser = authUserStore.getAuthUser;
</script>

<template>
  <header class="sticky top-0 pb-8 pr-7 pt-7">
    <img src="../assets/images/gear.png" alt="" class="ml-auto" />
  </header>

  <main class="relative z-10 rounded-t-[20px] bg-zhen-zhu-bai-pearl pb-14">
    <h1 class="pb-6 text-center text-2xl font-medium">Settings</h1>
    <div class="flex flex-col gap-y-4 px-5">
      <SettingButton
        setting-name="Profile"
        :child="IconGreaterThan"
        v-if="authUser"
      />

      <SettingButton
        toggle-id="dark-mode-switch"
        setting-name="Dark Mode"
        :child="ToggleSwitch"
      />

      <SettingButton
        toggle-id="push-notification-toggle"
        setting-name="Push Notification"
        :child="ToggleSwitch"
        v-if="authUser"
      />

      <SettingButton setting-name="Help" :child="IconGreaterThan" />

      <SettingButton
        setting-name="Send Us Feedback"
        :child="IconGreaterThan"
        class="text-heirloom-hydrangea"
      />

      <SettingButton setting-name="Show More" :child="IconGreaterThan" />
    </div>

    <button
      class="m-auto mt-14 mb-28 flex items-center gap-x-3 text-lg"
      v-if="authUser"
    >
      Log out <span><IconLogout /></span>
    </button>

    <RouterLink
      to="/login"
      class="m-auto mt-14 mb-28 flex items-center justify-center gap-x-3 text-lg"
      v-else
    >
      Log in <span><IconLogin /></span>
    </RouterLink>
  </main>
</template>
