<script setup>
const route = useRoute();
const { isMobileOrTablet } = useDevice();

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

const admins_ui = {
  width: "w-64",
  item: {
    size: "text-base",
    icon: {
      base: "flex-shrink-0 h-6 w-6",
    },
  },
};

const user = useState("user");
</script>
<template>
  <Flex is="nav" row items="center" justify="between" gap="4" class="p-2">
    <NuxtLink v-if="!isMobileOrTablet" to="/" class=w-1/2>
      <NuxtImg src="logo.png" class="w-1/3" />
    </NuxtLink>

    <NuxtLine v-else to="/">
      <h1 class="text-xl font-medium text-black dark:text-white">Thesstrans Gallery</h1>
    </NuxtLine>

    <Flex hidden lg row items="center" class="gap-4">
      <Flex
          v-for="page in pages"
          router
          :to="page.to"
          row
          items="center"
          class="hover:text-primary-400 gap-1 transition-colors"
      >
        <Icon :name="page.icon" size="1.25em" class="text-primary-400" />
        <span :class="{ 'text-primary-200': route.path === page.to }" >{{ page.name }}</span>
      </Flex>


      <UDropdown :items="adminPages" :popper="{ placement: 'bottom' }" :ui="admins_ui" v-if="user?.preferences?.permissions >= 2">
        <Flex row items="center" class="hover:text-primary-300 gap-1 transition-colors">
          <Icon name="i-mdi-card-account-details-star-outline" size="1.25em" class="text-primary-400" />
          <span :class="{ 'text-primary-200': route.path.includes('admins') }">Διαχειριστές</span>
        </Flex>
      </UDropdown>

      <Flex v-if="!user" router to="/auth" row items="center" class="hover:text-primary-500 gap-1 transition-colors">
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
 </template>