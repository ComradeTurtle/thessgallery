<script setup>
const route = useRoute();
const files = useState("files");
const categories = useState("categories");
const category = route.query.category.split('-')[0];
const categoryObj = categories.value.find((f) => f.name === category);
const ourFiles = files.value.filter((f) => f.category === category);

for (let i = 0; i < ourFiles.length; i++) {
  ourFiles[i].inx = i;
}

const vModalDisplay = ref(false);
const vModalRef = ref(null);
const vModalCarousel = ref(null);
</script>

<template>
  <Grid columns="1" rows="3" mdColumns="3" class="gap-2 m-8">
    <div v-for="f in ourFiles">
      <div class="hvr-reveal rounded" @click="vModalDisplay = true;">
        <NuxtImg loading="lazy" :src="f.url" />
      </div>
      <UModal prevent-close v-model="vModalDisplay" :ui="{ overlay: {background: 'backdrop-blur bg-dark opacity-40'}}">
        <Flex column justify="center" items="center" class="p-8">

          <Carousel ref="vModalCarousel" class="max-w-screen" :wrap-around="true" @init="vModalCarousel[route.query.category.split('-')[1]].slideTo(f.inx)">
            <Slide v-for="g in ourFiles" :key="g">
              <NuxtImg loading="lazy" style="max-height: 60vh;" :src="g.url" />
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
          <h1 class="text-xl text-center mt-4 mb-2 bg-gray-200 bg-opacity-5 border-1 border border-gray-500 rounded p-6">Αριθμός οχήματος: 506<br>Γραμμή: 27 - Μετάβαση<br>Ημερομηνία: 09/11/2023</h1>
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