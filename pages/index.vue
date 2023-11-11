<script setup>
const categories = useState("categories");
const files = useState("files");
const featured = useState("featured");
const res = [];
let i = 0;
featured.value.forEach((f) => {
  const cat = categories.value.find((c) => c.name === f.category);
  const obj = {
    ...f,
    description: cat.description,
    count: cat.count,
    name: cat.name,
    inx: i
  }
  i++;
  res.push(obj);
})

</script>

<template>
  <Flex column items="center">
    <h1 class="text-2xl text-center">Επιλέξτε έναν τύπο οχήματος για να προβάλλετε τις εικόνες του</h1>
    <Grid columns="1" rows="3" mdColumns="3" class="gap-2 p-8">
      <div v-for="i in res">
        <nuxt-link :to="`/vehicle?category=${i.name}-${i.inx}`">
          <div class="hvr-reveal rounded">
            <NuxtImg loading="lazy" :src="i.url" />
            <div class="overlay text-center">
              <h1 class="text-xl">{{ i.description }}</h1>
              <h1 class="text-base">{{ i.count }} φωτογραφίες</h1>
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