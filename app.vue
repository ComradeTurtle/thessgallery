<script setup>
const data = await fetch('https://thg-api.comradeturtle.dev/v1/category/list').then((res) => res.json());
const data2 = await fetch('https://thg-api.comradeturtle.dev/v1/files/list?listall=true').then((res) => res.json());

useState("user", () => null);
useState("categories").value = data;
useState("files").value = data2;
useState("featured").value = data2.filter((f) => f.isFeatured === 1);
</script>
<template>
  <Nav />
  <NuxtPage />
</template>
