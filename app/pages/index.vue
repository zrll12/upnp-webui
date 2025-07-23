<script setup lang="ts">
import {Add12Filled} from '@vicons/fluent';

const routes = await useAsyncData('routes', () => $fetch('/api/route'))
const message = useMessage()

const showCreateModel = ref(false);
const newRouteName = ref('');
const newRouteInner = ref(0);
const newRouteOuter = ref(0);
const newRouteContact = ref('');
const newRouteDescription = ref('');

const openCreateModel = () => {
  showCreateModel.value = true;
}

const closeCreateModel = () => {
  showCreateModel.value = false;
}

const submitNewRoute = () => {
  if (!newRouteName.value || !newRouteInner.value || !newRouteOuter.value || !newRouteContact.value) {
    message.error('请填写所有必填项');
    return;
  }
  if (newRouteOuter.value < 1000 || newRouteOuter.value > 65535 || newRouteInner.value < 1000 || newRouteInner.value > 65535) {
    message.error('端口必须在1000到65535之间');
    return;
  }

  const newRoute = {
    name: newRouteName.value,
    innerPort: newRouteInner.value,
    outerPort: newRouteOuter.value,
    contact: newRouteContact.value,
    description: newRouteDescription.value
  };

  useFetch('/api/application', {method: 'POST', body: newRoute})
      .then((response) => {
        console.log(response);
        message.success('提交成功，我们将在1周内与您联系，请勿重复提交。');
        closeCreateModel();
        newRouteName.value = '';
        newRouteInner.value = 0;
        newRouteOuter.value = 0;
        newRouteContact.value = '';
        newRouteDescription.value = '';
      })
}
</script>

<template>
  <n-grid cols="2 270:1 540:2 810:3 1080:4 1350:5" x-gap="20" y-gap="20">
    <n-grid-item v-for="route in routes.data.value" :key="route.id">
      <SingleRouteCard :route="route"/>
    </n-grid-item>

    <n-grid-item>
      <n-card @click="openCreateModel" class="flex cursor-pointer h-full items-center justify-center">
        <n-icon size="40">
          <Add12Filled/>
        </n-icon>
      </n-card>
    </n-grid-item>
  </n-grid>
  <n-modal v-model:show="showCreateModel">
    <n-card
        style="width: 600px"
        title="提交新路由申请"
        :bordered="true"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-flex class="gap-20" vertical>
        <n-text>请填写以下信息用于验证，我们将在1周内与您联系。您的联系方式将会被保密。</n-text>
        <n-input v-model:value="newRouteName" placeholder="申请名称"/>
        <n-input v-model:value="newRouteContact" placeholder="联系方式"/>
        <n-flex>
          <n-input-number v-model:value="newRouteInner" />
          <n-text class="text-xl">:</n-text>
          <n-input-number v-model:value="newRouteOuter" />
        </n-flex>
        <n-input v-model:value="newRouteDescription" placeholder="其他信息" type="textarea"/>
      </n-flex>
      <template #footer>
        <n-flex class="gap-10">
          <n-button @click="closeCreateModel" secondary>取消</n-button>
          <n-button @click="submitNewRoute" type="primary" strong secondary>提交</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>
