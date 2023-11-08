<script setup>
// const route = getRoute();
const pages = [
  {
    name: 'Αρχική',
    icon: 'i-mdi-home',
    to: '/'
  },
  // {
  //   name: 'Εμφάνιση',
  //   icon: 'i-mdi-magnify',
  //   to: '/vehicle'
  // },
  {
    name: 'Διαχειριστές',
    icon: 'i-mdi-card-account-details-star-outline',
    to: '/admins'
  }
]
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
  </Flex>
  </Flex>
 </template>