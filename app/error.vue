<script setup lang="ts">
import type { NuxtError } from "#app";

import type { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
	common: {
		borderRadius: "10px",
		borderRadiusSmall: "8px",
	},
	Checkbox: {
		borderRadius: "5px",
	},
};

const props = defineProps({
	error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="flex items-center justify-center h-screen">
      <n-result status="404" title="404 资源不存在" :description="props.error.message" v-if="props.error?.statusCode === 404">
        <template #footer>
          <n-button @click="handleError">找点乐子吧</n-button>
        </template>
      </n-result>
    </div>
  </n-config-provider>
</template>

<style>
@import "tailwindcss";
</style>
