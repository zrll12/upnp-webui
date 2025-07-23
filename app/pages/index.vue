<script setup lang="ts">

const routes = await useAsyncData('routes', () => $fetch('/api/route'))
</script>

<template>
  <n-grid cols="2 270:1 540:2 810:3 1080:4 1350:5" x-gap="20" y-gap="20">
    <n-grid-item v-for="route in routes.data.value" :key="route.id">
      <SingleRouteCard :route="route" />
    </n-grid-item>

    <n-grid-item>
      <n-card>
        <n-icon size="40">

        </n-icon>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
