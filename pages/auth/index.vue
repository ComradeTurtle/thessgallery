<script setup>
const { isMobileOrTablet } = useDevice();
const authItems = [
  {
    key: "login",
    label: "Σύνδεση",
    title: "Σύνδεση στην εφαρμογή"
  },
  {
    key: "register",
    label: "Δημιουργία λογαριασμού",
    title: "Δημιουργία λογαριασμού"
  }
]
</script>

<template>
  <Flex column items="center" justify="center" class="p-4">
    <Flex column class="w-full max-w-screen-lg">
      <UTabs :items="authItems" :orientation="isMobileOrTablet ? 'vertical' : 'horizontal'">
        <template #item="{ item }">
          <Flex column gap="4" class="p-2">
            <Flex column items="center" class="border-primary-500 rounded border-2 p-4" gap="2">
              <h1 class="text-3xl font-bold">{{ item.title }}</h1>
            </Flex>

            <Flex column items="center" class="border-primary-500 rounded border-2 p-4">
              <AuthLogin v-if="item.key === 'login'"/>
              <AuthRegister v-else />
            </Flex>
          </Flex>
        </template>
      </UTabs>
    </Flex>
  </Flex>
</template>

<style scoped>

</style>