<script setup>
import {vModelDynamic} from "vue";

const route = useRoute();
const files = useState("files");
const categories = useState("categories");
const category = route.query.category.split('-')[0];
const categoryObj = categories.value.find((f) => f.name === category);
const ourFiles = files.value.filter((f) => f.category === category && f.isPublic);

for (let i = 0; i < ourFiles.length; i++) {
  ourFiles[i].inx = i;
}

const createDesc = (file) => {
  let str = "false";
  console.log(file);
  if (file.vehicle) {
    if (file.vehicle.includes(',')) str += `Αριθμοί Οχημάτων: ${file.vehicle}<br>`;
    else str += `Αριθμός Οχήματος: ${file.vehicle}<br>`;
  }
  if (file.line) {
    if (file.line.includes(',')) str += `Γραμμές: ${file.line}<br>`;
    else str += `Γραμμή: ${file.line}<br>`;
  }
  if (file.date) str += `Ημερομηνία: ${file.date}<br>`;
  if (file.location) str += `Τοποθεσία: ${file.location}<br>`;
  if (file.description) str += `Σημειώσεις: ${file.description}<br>`;

  return str === "false" ? 'Δεν υπάρχουν πληροφορίες για αυτή την εικόνα.' : str.replaceAll('false', '');
}

let vModalDisplay = ref(Array(ourFiles.length).fill(false));
const vModalRef = ref(null);
const vModalCarousel = ref(null);

const openModal = (index) => {
  vModalDisplay.value = Array(ourFiles.length).fill(false);
  vModalDisplay.value[index] = true;
  console.log(vModalDisplay.value, index);
}

const closeModal = (index) => {
  vModalDisplay.value = Array(ourFiles.length).fill(false);
  vModalDisplay.value[index] = false;
  console.log(vModalDisplay.value, index);
}
console.log(vModalDisplay.value);

</script>

<template>
  <Grid columns="1" rows="4" mdColumns="4" class="gap-2 m-16">
    <div v-for="(f, index) in ourFiles" :key="index">
      <div class="hvr-reveal rounded" @click="openModal(index)">
        <NuxtImg loading="lazy" :src="`https://eu2.contabostorage.com/987a186318de400dba43c3a946456795:${category}/${f.filename.split('.')[0]}-opti80.webp`" />
      </div>
      <UModal prevent-close v-model="vModalDisplay[index]" :ui="{ overlay: {background: 'bg-dark opacity-40'}}">
        <Flex column justify="center" items="center" class="p-8">
          <NuxtImg style="max-height: 80vh;" :src="`https://eu2.contabostorage.com/987a186318de400dba43c3a946456795:${category}/${f.filename.split('.')[0]}-opti80.webp`" />
          <h1 v-html="createDesc(f)" class="text-xl text-center mt-4 mb-2 bg-gray-200 bg-opacity-5 border-1 border border-gray-500 rounded p-6"></h1>
          <UButton variant="soft" @click="closeModal(index)">
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