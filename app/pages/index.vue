<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {getRoutes} from "~~/server/api/routes/routes.get";

const routes = ref<Routes[]>([])

onMounted(() => {
  getRoutes(0, 10)
      .then((data) => {
        routes.value = data
        console.log(data)
      })
})
</script>

<template>
  <n-grid cols="2 200:1 400:2 600:3 800:4 1000:5" x-gap="20" y-gap="20">
    <n-grid-item>
      <div class="bg-green-300">
        1
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="bg-green-500">
        2
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="bg-green-300">
        3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="bg-green-500">
        4
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="bg-green-300">
        5
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="bg-green-500">
        6
      </div>
    </n-grid-item>
  </n-grid>

  <div class="mt-8">
    <h2 class="text-lg font-bold mb-2">所有路径：</h2>
    <ul>
      <li v-for="route in routes" :key="route">{{ route }}</li>
    </ul>
  </div>
</template>
