<script setup lang="ts">
import {useUserFrontend} from "~/composables/useUserFrontend";
import {useAsyncData} from "#app";
import {NTag, NButton} from "naive-ui";
import type {DataTableColumn, DropdownOption} from "naive-ui";
import EditRouteCard from "~/components/EditRouteCard.vue";

const {userInfo} = useUserFrontend();

const reactivePagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 25, 30],
})

const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: '拒绝',
    key: 'reject'
  },
  {
    label: '通过',
    key: 'accept'
  }
]
const editModalOpen = ref(false)
const editApplication = ref<Applications | null>(null)
const xRef = ref(0)
const yRef = ref(0)
const applicationSelected = ref<Applications | null>(null)
const showDropdownRef = ref(false)
const onSelect = (e) => {
  showDropdownRef.value = false
  switch (e) {
    case "edit":
      editApplication.value = applicationSelected.value;
      editModalOpen.value = true;
      break;
    // case "reject":
    //   $fetch(`/api/application/${applicationId.value}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Authorization": `${userInfo.token}`,
    //     }
    //   }).then(() => {
    //     applications.refresh();
    //   });
    //   break;
    // case "accept":
    //   $fetch(`/api/application/${applicationId.value}/accept`, {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `${userInfo.token}`,
    //     }
    //   }).then(() => {
    //     applications.refresh();
    //   });
    //   break;
  }
}
const onClickOutside = () => {
  showDropdownRef.value = false
}

const applications = useAsyncData(`applications-${reactivePagination.page}-${reactivePagination.pageSize}`,
    () => $fetch("/api/application", {
      query: {
        page: reactivePagination.page,
        size: reactivePagination.pageSize,
      },
      headers: {
        "Authorization": `${userInfo.token}`,
      }
    }))
const columns: Array<DataTableColumn> = [
  {
    title: "申请ID",
    key: "id",
    width: 100,
  },
  {
    title: "路由名称",
    key: "name",
    width: 200,
  },
  {
    title: "内网端口",
    key: "innerPort",
    width: 50,
  },
  {
    title: "外网端口",
    key: "outerPort",
    width: 50,
  },
  {
    title: "联系方式",
    key: "contact",
    width: 100,
  },
  {
    title: "状态",
    key: "status",
    width: 100,
    render(row: Applications) {
      return h(NTag, {
        type: row.status === 0 ? "info" : row.status === 1 ? "success" : "error",
      }, row.status === 0 ? "待处理" : row.status === 1 ? "已通过" : "已拒绝");
    }
  }
]
const rowProps = (row: Applications) => {
  return {
    onClick: () => {
      console.log(`/applications/${row.id}`);
      editApplication.value = row;
      editModalOpen.value = true;
    },
    onContextmenu: (e: MouseEvent) => {
      e.preventDefault();
      nextTick().then(() => {
        showDropdownRef.value = true;
        xRef.value = e.x;
        yRef.value = e.y;
        applicationSelected.value = row;
      })
    },
  }
}
</script>

<template>
  <template v-if="!userInfo.available">
    <n-result
        status="403"
        title="禁止访问"
        description="申请处理页面仅对登录用户开放"
    >
      <template #footer>
        <NuxtLink href="/">
          <n-button>回首页</n-button>
        </NuxtLink>
      </template>
    </n-result>
  </template>
  <template v-else>
    <n-flex vertical class="gap-5">
      <n-data-table
          :columns="columns"
          :row-key="(data) => data.id"
          :data="applications.data.value.data"
          :row-props="rowProps"
          bordered
      />
      <n-pagination
          v-model:page="reactivePagination.page"
          v-model:page-size="reactivePagination.pageSize"
          :page-count="applications.data.value.count / reactivePagination.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          @update-page-size="reactivePagination.page = 1; applications.refresh();"
          @update-page="applications.refresh()"
          show-size-picker
      />
    </n-flex>
    <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="xRef"
        :y="yRef"
        :options="options"
        :show="showDropdownRef"
        :on-clickoutside="onClickOutside"
        @select="onSelect"
    />
    <EditRouteCard :route="editApplication" v-model:open="editModalOpen" />
  </template>
</template>

<style scoped>

</style>
