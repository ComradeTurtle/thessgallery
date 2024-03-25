<script setup>
const categories = useState("categories");
const files = useState("files");
const featured = useState("featured");
const res = [];
let i = 0;

categories.value.forEach((c) => {
  const feat = featured.value.find((f) => f.category === c.name);
  if (!feat) return;
  const count = files.value.filter((v) => {
    const extraCategories = v.extraCategories || [];

    return (v.category === c.name || extraCategories.includes(c.name)) && v.isPublic;
  }).length;

  i++;
  delete feat.description;
  res.push({
    name: c.name,
    description: c.description,
    count: count,
    ...feat
  })
})
</script>

<template>
  <Flex column items="center">
    <h1 class="text-2xl text-center">Καλωσορίσατε στη γκαλερί του <NuxtLink class="font-semibold underline" external to="https://thesstrans.com">Thesstrans!</NuxtLink></h1>
    <h1 class="text-xl text-center">Επιλέξτε έναν τύπο οχήματος για να προβάλλετε τις εικόνες του</h1>
    <Grid columns="1" rows="1" mdRows="3" mdColumns="3" class="gap-2 p-8 md:p-16">
      <div v-for="i in res">
        <nuxt-link :to="`/vehicle?category=${i.name}`" @click="teleact({action: 'INTERACT_CLICK', data: {type: 'image', value: i.name}})">
          <div class="hvr-reveal rounded w-full">
            <NuxtImg class="max-h-80 h-full w-full object-cover" loading="lazy" placeholder="loading.jpg" :src="`${createUrl(i.url)}`" />
            <div class="overlay text-center pt-1">
              <h1 class="text-xl">{{ i.description }}</h1>
              <h1 class="text-base">{{ i.count }} {{ i.count === 1 ? 'φωτογραφία' : 'φωτογραφίες' }}</h1>
            </div>
          </div>
        </nuxt-link>
      </div>
    </Grid>
  </Flex>
</template>

<style>
.carousel__prev,
.carousel__next {
  border: 5px solid white !important;
  background: white !important;
  opacity: 0.5 !important;
  border-radius: 1rem !important;
}
</style>
<style scoped>
.overlay {
  @apply relative -mt-[60px] h-[60px];
  position: relative;
  margin-top: -60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
}

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
  border-color: #2e36ff;
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