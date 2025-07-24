<script setup lang="ts">
const props = defineProps<{ route: Routes }>()

const titleStr = `${props.route.outerPort}:${props.route.innerPort}`
const created = computed(() => new Date(props.route.createdAt).toLocaleString())
const updated = computed(() => new Date(props.route.updatedAt).toLocaleString())
// TODO: Time format on backend to fix hydration issues
</script>

<template>
<n-card :title="titleStr" class="w-80" hoverable>
  <div class="flex flex-col gap-2">
    <n-text>{{ props.route.name }}</n-text>
    <n-text class="text-gray-500">ID: {{ props.route.id }}</n-text>
    <n-text class="text-gray-500">创建时间: {{ created }}</n-text>
    <n-text class="text-gray-500">更新时间: {{ updated }}</n-text>
  </div>
</n-card>
</template>

<style scoped>

</style>
