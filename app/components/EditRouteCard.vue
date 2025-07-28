<script setup lang="ts">
const props = defineProps<{ route: Applications | null, open: boolean }>();
const emit = defineEmits<{
  'update:open': [value: boolean]
}>();

const modalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});
</script>

<template>
  <n-modal v-model:show="modalVisible">
    <template v-if="props.route !== null">
      <n-card
          style="width: 600px"
          :title="() => `提交 ${props.route?.id || 0}`"
          :bordered="true"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        内容
        <template #footer>
          <n-flex class="gap-10">
            <n-button @click="modalVisible = false" secondary>取消</n-button>
            <n-button type="primary" strong secondary>保存</n-button>
            <n-button type="primary" strong secondary>保存并通过</n-button>
            <n-button type="error" strong secondary>保存并拒绝</n-button>
          </n-flex>
        </template>
      </n-card>
    </template>
  </n-modal>
</template>

<style scoped>

</style>
