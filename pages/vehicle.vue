<script setup>
const route = useRoute();
const files = useState("files");
const categories = useState("categories");
const category = route.query.category;
const categoryObj = categories.value.find((f) => f.name === category);
const ourFiles = files.value.filter((f) => f.category === category);

const vModalDisplay = ref(false);
const vModalRef = ref(null);
</script>

<template>
  <Grid columns="1" rows="3" mdColumns="3" class="gap-2 m-8">
    <div v-for="f in ourFiles">
      <div class="hvr-reveal rounded" @click="vModalDisplay = true; vModalref = f;">
        <NuxtImg loading="lazy" :src="f.url" />
      </div>
      <UModal fullscreen prevent-close v-model="vModalDisplay">
        <Flex column justify="center" items="center" class="p-8">

          <Carousel class="max-w-screen">
            <Slide v-for="g in ourFiles" :key="g">
              <NuxtImg loading="lazy" style="max-height: 60vh;" :src="g.url" />
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
          <h1 class="text-2xl text-center mt-8">Πληροφορίες οχήματος εδώ <br>Μπλα μπλα μπλα</h1>
          <UButton variant="soft" @click="vModalDisplay = false;">
            Κλείσιμο
          </UButton>
        </Flex>
      </UModal>
    </div>
  </Grid>
</template>

<style scoped>

.hvr-reveal {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}
.hvr-reveal:before {
  content: "";
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-color: #0f1ad2;
  border-style: solid;
  border-width: 0;
  -webkit-transition-property: border-width;
  transition-property: border-width;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-reveal:hover:before, .hvr-reveal:focus:before, .hvr-reveal:active:before {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  border-width: 4px;
}
</style>

<style>
.carousel__prev {
  background: #f3f3f3!important;
  opacity: 0.8;
  border-radius: 1rem;
}

.carousel__next {
  background: #f3f3f3!important;
  opacity: 0.8;
  border-radius: 1rem;
}
</style>