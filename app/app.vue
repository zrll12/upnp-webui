<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <header class="border-b border-gray-200">
        <nav>
          <n-flex class="mx-20 my-3">
            <n-button strong quaternary>
              <NuxtLink to="/"> 主页</NuxtLink>
            </n-button>
            <n-button strong quaternary>
              <NuxtLink to="/applications">申请</NuxtLink>
            </n-button>
            <n-button strong quaternary>
              <NuxtLink to="/status">状态</NuxtLink>
            </n-button>
            <n-button>登录</n-button>
          </n-flex>
        </nav>
      </header>

      <div class="mx-40 my-10">
        <NuxtPage />
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
