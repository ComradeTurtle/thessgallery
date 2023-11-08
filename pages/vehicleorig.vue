<script setup>
const route = useRoute();
const files = useState("files");
const categories = useState("categories");
const category = route.query.category;
const categoryObj = categories.value.find((f) => f.name === category);
const ourFiles = files.value.filter((f) => f.category === category);
</script>

<template>
  <Flex justify="center" items="center" column>
    <UButton variant="outline">
      <nuxt-link to="/">
        <Flex gap="1" justify="center">
          <Icon name="i-mdi-arrow-left" size="2em" class="text-primary" />
          <h1 class="text-2xl">Επιστροφή</h1>
        </Flex>
      </nuxt-link>
    </UButton>
    <h1 class="text-3xl pb-3">Τύπος οχήματος: {{ categoryObj.description }}</h1>
  </Flex>
  <Flex justify="center">
    <Carousel class="w-3/6">
      <Slide v-for="f in ourFiles" :key="f">
        <div class="carousel__item">
          <img :src="f.url">
          <div class="overlay text-red-500 font-bold">{{ f.description }}</div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </Flex>
</template>

<style scoped>

.overlay {
  position: absolute;
  bottom: 0;
  color: #f1f1f1;
  width: 100%;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
}

</style>