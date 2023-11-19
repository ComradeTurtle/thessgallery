<script setup lang="ts">
const route = useRoute();
const user = useState("user");
const colorMode = useColorMode();

const menu = ref(false);
const pages = [
  {
    name: 'Αρχική',
    icon: 'i-mdi-home',
    to: '/'
  }
]

const adminPages = [
  [
    {
      label: 'Επεξεργασία αρχείων',
      icon: 'i-mdi-database-edit',
      to: '/admins/edit'
    },
    {
      label: 'Διαχείριση κατηγοριών',
      icon: 'i-mdi-image-multiple-outline',
      to: '/admins/categories'
    },
    {
      label: 'Μεταφόρτωση',
      icon: 'i-mdi-cloud-upload-outline',
      to: '/admins/upload'
    },
  ]
]

const admin_ui = {
  width: "w-64",
  padding: "p-2",
  item: {
    size: "text-base",
    icon: {
      base: "flex-shrink-0 h-6 w-6",
    },
  },
};

const logout = () => clearSession(() => navigateTo("/"));
</script>

<template>
  <UModal>
    <Flex column class="gap-4 p-4">
      <Flex row items="center" justify="center" class="gap-2">
        <Flex lg column items="center" class="gap-4">
          <Flex
              v-for="page in pages"
              router
              :to="page.to"
              row
              items="center"
              class="hover:text-primary-500 gap-1 transition-colors"
          >
            <Icon :name="page.icon" size="1.25em" class="text-primary-400" />
            <span>{{ page.name }}</span>
          </Flex>

          <UDropdown v-if="user?.preferences?.permissions >= 2" :items="adminPages" :popper="{ placement: 'bottom' }" :ui="admin_ui">
            <Flex row items="center" class="hover:text-primary-400 gap-1 transition-colors">
              <Icon name="uil:university" size="1.25em" class="text-primary-400" />
              <span :class="{ 'text-primary-200': route.path.includes('admins') }">Διαχειριστές</span>
            </Flex>
          </UDropdown>
        </Flex>
      </Flex>

      <hr class="border-primary-500 rounded-full" />

      <Flex lg column items="center" justify="center" class="gap-2">
        <Flex v-if="!user" router to="/auth" row items="center" class="hover:text-primary-400 gap-1 transition-colors">
          <Icon name="mdi:account-outline" size="1.25em" class="text-primary-400"/>
          <span>Σύνδεση</span>
        </Flex>

        <Flex
            v-else
            is="button"
            row
            items="center"
            @click="clearSession(() => navigateTo('/'))"
            class="gap-1 transition-colors hover:text-red-400"
        >
          <Icon name="mdi:logout" size="1.25em" class="text-red-500" />
          <span>Αποσύνδεση</span>
        </Flex>
      </Flex>
    </Flex>
  </UModal>
</template>