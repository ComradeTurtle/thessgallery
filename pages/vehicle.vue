<script setup>
const route = useRoute();
const user = useState("user");
const files = useState("files");
const categories = useState("categories");
const category = route.query.category.split('-')[0];
const isDirect = route.query.direct === "1";
const categoryObj = categories.value.find((f) => f.name === category);
const ourFiles = files.value.filter((f) => {
  const extraCategories = f.extraCategories || [];

  return (f.category === category || extraCategories.includes(category)) && f.isPublic;
});

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
  <Flex justify="center" items="center" column gap="2">
    <UButton variant="outline">
      <Flex gap="1" justify="center" router to="/" v-if="!isDirect">
        <Icon name="i-mdi-arrow-left" size="2em" class="text-primary" />
        <h1 class="text-2xl">Επιστροφή</h1>
      </Flex>

      <Flex router v-else gap="2" justify="center" items="center" :to="`https://thessgallery.comradeturtle.dev/vehicle?category=${category}`" target="_blank" external>
          <Icon name="i-mdi-launch" size="2em" class="text-primary" />
          <h1 class="text-2xl">Άνοιγμα σε νέα καρτέλα</h1>
      </Flex>

    </UButton>
    <h1 class="text-xl md:text-3xl md:pb-3 text-center">Τύπος οχήματος: {{ categoryObj.description }}</h1>
  </Flex>

  <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 px-4 md:px-6 py-6 md:py-8">
    <div v-for="(f, index) in ourFiles" :key="index" class="mb-8">
      <div class="hvr-reveal rounded w-full" @click="openModal(index)">
        <NuxtImg placeholder="loading.jpg" loading="lazy" class="object-cover w-full" :src="`${createUrl(f.url)}`" />
      </div>
      <UModal v-model="vModalDisplay[index]" :ui="{ overlay: {background: 'bg-dark opacity-80 backdrop-blur-sm transition-all'}, width: 'sm:max-w-2xl'}">
        <Flex column justify="center" items="center" class="p-8">
          <NuxtImg :src="`${createUrl(f.url)}`" />
          <h1 v-html="createDesc(f)" class="text-xl text-center mt-4 mb-2 bg-gray-200 bg-opacity-5 border-1 border border-gray-500 rounded p-6"></h1>
          <Flex row gap="2" justify="between">
            <UButton variant="soft" @click="closeModal(index)">
              Κλείσιμο
            </UButton>
            <UButton color="purple" v-if="user?.preferences?.permissions >= 2" @click="makeEdit('set', f.incid)">
              Επεξεργασία Διαχειριστή
            </UButton>
          </Flex>
        </Flex>
      </UModal>
    </div>
  </div>
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
