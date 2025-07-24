<script setup lang="ts">
const showModal = ref(false)

const loginFormRef = ref<InstanceType<typeof import('naive-ui').NForm>>()
const loginForm = ref({
  username: '',
  password: '',
})


</script>

<template>
  <n-button @click="showModal = true">
    登录
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
        style="width: 600px"
        title="后台登录"
        :bordered="true"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-form ref="loginFormRef" :model="loginForm">
        <n-form-item path="username" label="用户名">
          <n-input
              placeholder=""
              v-model:value="loginForm.username"
              @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
              placeholder=""
              v-model:value="loginForm.password"
              @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-flex class="gap-10">
          <n-button @click="showModal = false" secondary>取消</n-button>
          <n-button type="primary" strong secondary>登录</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>
