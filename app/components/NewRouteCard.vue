<script setup lang="ts">
import {useMessage} from "naive-ui";
import {Add12Filled} from "@vicons/fluent";

const message = useMessage()
const showCreateModel = ref(false);
const newRouteFormRef = ref<InstanceType<typeof import('naive-ui').NForm>>();
const newRouteForm = ref({
  name: '',
  innerPort: 1000,
  outerPort: 1000,
  contact: '',
  description: ''
});

const submitNewRoute = () => {
  if (!newRouteForm.value.name || !newRouteForm.value.contact) {
    message.error('请填写所有必填项');
    return;
  }
  if (newRouteForm.value.innerPort < 1000 || newRouteForm.value.innerPort > 65535 || newRouteForm.value.outerPort < 1000 || newRouteForm.value.outerPort > 65535) {
    message.error('端口必须在1000到65535之间');
    return;
  }


  $fetch('/api/application', {method: 'POST', body: newRouteForm.value})
      .then((response) => {
        message.success('提交成功，我们将在1周内与您联系，请勿重复提交。');
        showCreateModel.value = false;
        newRouteForm.value = {
          name: '',
          innerPort: 1000,
          outerPort: 1000,
          contact: '',
          description: ''
        };
      })
}
</script>

<template>
  <n-card @click="showCreateModel = true" class="cursor-pointer h-full" hoverable>
    <div class="flex flex-col items-center justify-center h-full">
      <n-icon size="40">
        <Add12Filled/>
      </n-icon>
      <n-text class="text-xl">申请新路由</n-text>
    </div>
  </n-card>

  <n-modal v-model:show="showCreateModel">
    <n-card
        style="width: 600px"
        title="提交新路由申请"
        :bordered="true"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-text>请填写以下信息用于验证，我们将在1周内与您联系。您的联系方式将会被保密。</n-text>
      <n-form v-model:ref="newRouteFormRef" :model="newRouteForm" class="my-3">
        <n-form-item path="name" label="申请名称" required>
          <n-input v-model:value="newRouteForm.name" placeholder="申请名称"/>
        </n-form-item>
        <n-form-item path="contact" label="联系方式" required>
          <n-input v-model:value="newRouteForm.contact" placeholder="联系方式"/>
        </n-form-item>
        <n-flex justify="space-between">
          <n-form-item path="innerPort" label="内部端口" required>
            <n-input-number v-model:value="newRouteForm.innerPort" :min="1000" :max="65535" placeholder="内网端口"/>
          </n-form-item>
          <n-form-item path="outerPort" label="外部端口" required>
            <n-input-number v-model:value="newRouteForm.outerPort" :min="1000" :max="65535" placeholder="外网端口"/>
          </n-form-item>
        </n-flex>
        <n-form-item path="description" label="其他信息">
          <n-input v-model:value="newRouteForm.description" placeholder="其他信息" type="textarea"/>
        </n-form-item>
      </n-form>
      <n-flex class="gap-20" vertical>
      </n-flex>
      <template #footer>
        <n-flex class="gap-10">
          <n-button @click="showCreateModel = false" secondary>取消</n-button>
          <n-button @click="submitNewRoute" type="primary" strong secondary>提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>
