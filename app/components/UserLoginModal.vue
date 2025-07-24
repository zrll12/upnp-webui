<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useUserFrontend } from "~/composables/useUserFrontend";

const showModal = ref(false)
const message = useMessage()
const { userInfo, login: userLogin, logout } = useUserFrontend()

const loginFormRef = ref<InstanceType<typeof import('naive-ui').NForm>>()
const loginForm = ref({
  username: '',
  password: '',
})


// 处理登录
const handleLogin = async () => {
  if (loginForm.value.username === '' || loginForm.value.password === '') {
    message.error('用户名和密码不能为空')
    return
  }

  try {
    await userLogin(loginForm.value)
    showModal.value = false
  } finally {
    loginForm.value.username = ''
    loginForm.value.password = ''
  }
}

const userMenuOptions = [
  {
    label: '登出',
    key: 'logout'
  }
]
const handleSelect = (key: string) => {
  if (key === 'logout') {
    logout()
  }
}
</script>

<template>
  <div class="user-login-container">
    <template v-if="userInfo.available">
      <n-dropdown :options="userMenuOptions" @select="handleSelect">
        <n-button strong quaternary>
          {{ userInfo.username }}
        </n-button>
      </n-dropdown>
    </template>
    <template v-else>
      <n-button @click="showModal = true">
        登录
      </n-button>
    </template>
  </div>

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
              type="password"
              placeholder=""
              v-model:value="loginForm.password"
              @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-flex class="gap-10">
          <n-button @click="showModal = false" secondary>取消</n-button>
          <n-button @click="handleLogin" type="primary" strong secondary>登录</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
.user-login-container {
  display: inline-flex;
  align-items: center;
}

.gap-10 {
  gap: 10px;
}
</style>
