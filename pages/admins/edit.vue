<script setup>
const user = useState("user");
if (!user.value || user.value.preferences.permissions < 2) navigateTo('/auth');
const files = useState("files");
const categories = useState("categories");
const lines = useState("lines", () => [{"value":"1","label":"1"},{"value":"2K (πρώην 2)","label":"2K"},{"value":"3K (πρώην 3)","label":"3K"},{"value":"4","label":"4"},{"value":"5","label":"5"},{"value":"6","label":"6"},{"value":"7","label":"7"},{"value":"8","label":"8"},{"value":"9","label":"9"},{"value":"10","label":"10"},{"value":"11","label":"11"},{"value":"11T","label":"11T"},{"value":"12","label":"12"},{"value":"13","label":"13"},{"value":"14","label":"14"},{"value":"15","label":"15"},{"value":"16","label":"16"},{"value":"17","label":"17"},{"value":"19","label":"19"},{"value":"20","label":"20"},{"value":"21","label":"21"},{"value":"22","label":"22"},{"value":"23","label":"23"},{"value":"24","label":"24"},{"value":"25","label":"25"},{"value":"26","label":"26"},{"value":"27","label":"27"},{"value":"28","label":"28"},{"value":"29","label":"29"},{"value":"30","label":"30"},{"value":"31","label":"31"},{"value":"32","label":"32"},{"value":"33","label":"33"},{"value":"34","label":"34"},{"value":"35","label":"35"},{"value":"36","label":"36"},{"value":"37","label":"37"},{"value":"38","label":"38"},{"value":"39","label":"39"},{"value":"40","label":"40"},{"value":"41","label":"41"},{"value":"42","label":"42"},{"value":"43","label":"43"},{"value":"43Y","label":"43Y"},{"value":"45","label":"45"},{"value":"45Y","label":"45Y"},{"value":"50","label":"50"},{"value":"51","label":"51"},{"value":"52","label":"52"},{"value":"53","label":"53"},{"value":"54","label":"54"},{"value":"55","label":"55"},{"value":"56","label":"56"},{"value":"57","label":"57"},{"value":"58","label":"58"},{"value":"59","label":"59"},{"value":"60","label":"60"},{"value":"61","label":"61"},{"value":"64","label":"64"},{"value":"66","label":"66"},{"value":"67","label":"67"},{"value":"68","label":"68"},{"value":"69","label":"69"},{"value":"70","label":"70"},{"value":"71","label":"71"},{"value":"72","label":"72"},{"value":"76","label":"76"},{"value":"77","label":"77"},{"value":"79","label":"79"},{"value":"80","label":"80"},{"value":"81","label":"81"},{"value":"82","label":"82"},{"value":"83","label":"83"},{"value":"84","label":"84"},{"value":"85","label":"85"},{"value":"86","label":"86"},{"value":"87","label":"87"},{"value":"88","label":"88"},{"value":"89","label":"89"},{"value":"90","label":"90"},{"value":"91","label":"91"},{"value":"92","label":"92"},{"value":"100","label":"100"},{"value":"Χ1 (πρώην 78)","label":"Χ1"},{"value":"Ν1 (πρώην 78Ν)","label":"Ν1"},{"value":"Σ1","label":"Σέρρες - 1"}, {"value":"Σ2","label":"Σέρρες - 2"}, {"value":"Σ4","label":"Σέρρες - 4"}, {"value":"Σ5","label":"Σέρρες - 5"}, {"value":"Σ7","label":"Σέρρες - 7"}, {"value":"Σ9","label":"Σέρρες - 9"}, {"value":"Σ10","label":"Σέρρες - 10"}, {"value":"Σ13","label":"Σέρρες - 13"}, {"value":"Σ14","label": "Σέρρες - 14"}, {"value":"Σ15","label":"Σέρρες - 15"}, {"value":"Σ17","label":"Σέρρες - 17"}, {"value":"Σ18","label":"Σέρρες - 18"}, {"value":"Σ20","label":"Σέρρες - 20"}, {"value":"Σ21","label":"Σέρρες - 21"}, {"value":"Σ22","label":"Σέρρες - 22"}, {"value":"Σ31","label":"Σέρρες - 31"}, {"value":"Σ37","label":"Σέρρες - 37"}, {"value":"Σ49","label":"Σέρρες - 49"}, {"value":"Σ54","label":"Σέρρες - 54"}]);
const position = useState("imgEditPos");
const isEdited = useState("imgEditIsEdited", () => false);
const obj = {
  vehicle: files.value[0].vehicle,
  line: files.value[0].line ? files.value[0].line.split(',') : [],
  location: files.value[0].location,
  date: files.value[0].date,
  notes: files.value[0].description,
  category: files.value[0].category,
  isPublic: files.value[0].isPublic === 1,
  isFeatured: files.value[0].isFeatured === 1
}
const vmodel = useState("imgEditCurr", () => obj);
</script>
<template>
  <Flex column items="center" justify="center" class="gap-2 py-4">
    <NuxtImg placeholder="../loading.jpg" class="max-h-[55vh]" :key="files[position].url" :src="files[position].url" />
    <div class="inline-flex gap-2 items-baseline">
      <p>Εικόνα</p> <UInput size="xs" class="w-12" v-model="position" /> <p>από {{ files.length }} ({{ files[position].filename }})</p>
    </div>
    <!--    <UCheckbox @click="makeEdit('edited')" v-model="isEdited" label="Εμφάνιση μόνο μη-επεξεργασμένων"></UCheckbox>-->
    <!--    <UButton color="red" @click="makeDelete" class="text-center">Διαγραφή εικόνας</UButton>-->
    <Flex column gap="3" items="center">
      <Flex row gap="3">
        <UFormGroup label="Κατηγορία">
          <USelectMenu searchable class="w-64" v-model="vmodel.category" :options="categories" value-attribute="name" option-attribute="description" placeholder="Επιλογή κατηγορίας" />
        </UFormGroup>
        <UFormGroup label="Αρ. οχήματος">
          <UInput v-model="vmodel.vehicle" placeholder="Ο πάροχος συμπληρώνεται αυτόματα" />
        </UFormGroup>
        <UFormGroup label="Γραμμή">
          <USelectMenu multiple searchable creatable class="w-64" v-model="vmodel.line" :options="lines" value-attribute="value" option-attribute="label" placeholder="Επιλογή γραμμής" />
        </UFormGroup>
      </Flex>
      <Flex row gap="3" class="items-center">
        <UFormGroup label="Τοποθεσία">
          <UInput v-model="vmodel.location" />
        </UFormGroup>
        <UFormGroup label="Ημερομηνία">
          <UInput v-model="vmodel.date" />
        </UFormGroup>
        <UFormGroup label="Σημειώσεις">
          <UInput v-model="vmodel.notes" />
        </UFormGroup>
        <UFormGroup>
          <UCheckbox v-model="vmodel.isPublic" label="Δημόσια"></UCheckbox>
          <UCheckbox v-model="vmodel.isFeatured" label="Επιλεγμένη"></UCheckbox>
        </UFormGroup>
      </Flex>
    </Flex>
    <Flex row gap="12">
      <UButton @click="makeEdit('prev')">Προηγούμενο</UButton>
      <UButton @click="makeEdit('act')" color="purple">Επεξεργασία</UButton>
      <UButton @click="makeEdit('next')">Επόμενο</UButton>
    </Flex>
  </Flex>
</template>