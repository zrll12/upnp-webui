<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <header class="border-b border-gray-200">
        <nav>
          <n-flex class="mx-20 my-3">
            <NuxtLink to="/">
              <n-button strong quaternary>
                主页
              </n-button>
            </NuxtLink>
            <NuxtLink to="/applications">
              <n-button strong quaternary>
                申请
              </n-button>
            </NuxtLink>
            <NuxtLink to="/status">
              <n-button strong quaternary>
                状态
              </n-button>
            </NuxtLink>
            <UserLoginModal />
          </n-flex>
        </nav>
      </header>

      <div class="mx-40 my-10">
        <NuxtPage/>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import type {GlobalThemeOverrides} from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: "10px",
    borderRadiusSmall: "8px"
  },
  Checkbox: {
    borderRadius: "5px"
  }
}
</script>
