<script setup>
const route = useRoute();
const data = await fetch('https://thg-api.comradeturtle.dev/v1/category/list').then((res) => res.json());
const data2 = await fetch('https://thg-api.comradeturtle.dev/v1/files/list?listall=true').then((res) => res.json());

data.sort((a, b) => a.order - b.order);

useState("user", () => null);
useState("awaitingResult", () => true);
useState("imgEditPos", () => 0);
useState("awaitingResult", () => true);
useState("categories").value = data;
useState("files").value = data2;
useState("featured").value = data2.filter((f) => f.isFeatured === 1);

onMounted(() => getUser().then(() => {
  useState("awaitingResult").value = false;
  teleauth();
}));

useHead({
  titleTemplate: "Thesstrans - Gallery",
  htmlAttrs: {
    lang: "el",
  },
  link: [ 
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-32x32.png",
    },
    {
      el: "icon",
      type: "image/png",
      href: "/favicon-16x16.png",
    }
  ]
})

</script>
<template>
  <Nav />
  <NuxtPage />
  <Footer v-if="!route.path.includes('admins')" />
</template>

<style>
  body {
    @apply font-bahnscrift;
    background: #171717;
    font-family: bahnschrift,sans-serif;
  }
</style>