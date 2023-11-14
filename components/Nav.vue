<script setup>
const route = useRoute();
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
  padding: "p-2",
  item: {
    size: "text-base",
    icon: {
      base: "flex-shrink-0 h-6 w-6",
    },
  },
};
</script>
<template>
  <Flex is="nav" row items="center" justify="between" gap="4" class="p-4">
    <NuxtLink to="/">
      <h1 class="text-xl font-medium text-black dark:text-white">Thessgallery</h1>
    </NuxtLink>
    <Flex hidden lg row items="center" class="gap-4">
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


      <UDropdown :items="adminPages" :popper="{ placement: 'bottom' }" :ui="admins_ui">
        <Flex row items="center" class="hover:text-primary-500 gap-1 transition-colors">
          <Icon name="i-mdi-card-account-details-star-outline" size="1.25em" class="text-primary-400" />
          <span :class="{ 'text-primary-300': route.path.includes('admins') }">Διαχειριστές</span>
        </Flex>
      </UDropdown>


      <Flex
          router
          to="/auth"
          row
          items="center"
          class="hover:text-primary-500 gap-1 transition-colors"
      >
        <Icon name="mdi:account-outline" size="1.25em" class="text-primary-400" />
        <span>Σύνδεση</span>
      </Flex>
  </Flex>
  </Flex>
 </template>