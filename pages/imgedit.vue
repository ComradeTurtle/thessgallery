<script setup>
  const files = useState("files");
  const lines = useState("lines", () => ["1","2K","3K","4","5","6","7","8","9","10","11","11T","12","13","14","15","16","17","19","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","43Y","45","45Y","50","51","52","53","54","55","56","57","58","59","60","61","66","67","68","69","70","71","72","76","77","79","80","81","82","83","84","85","86","87","88","89","90","91","92","100","Χ1","Ν1"]);
  const position = useState("imgEditPos", () => 0);
  // lines.value = await fetch('https://oasth-data.comradeturtle.dev/v1/lines?ignore=true').then((res) => res.json());

  // lines.value.forEach((lv) => {
  //   lv.composite = `${lv.name} ${lv.description}`;
  // })
  const isEdited = useState("imgEditIsEdited", () => false);
  const obj = {
    vehicle: files.value[0].vehicle,
    line: files.value[0].line ? files.value[0].line.split(',') : [],
    location: files.value[0].location,
    date: files.value[0].date,
    notes: files.value[0].description,
    isPublic: files.value[0].isPublic === 1,
    isFeatured: files.value[0].isFeatured === 1
  }
  const vmodel = useState("imgEditCurr", () => obj);

</script>

<template>
  <Flex column items="center" justify="center" class="gap-2 py-4">
    <NuxtImg placeholder="loading.jpg" class="max-w-[50vw]" :key="files[position].url" :src="files[position].url" />
    <div class="inline-flex gap-2 items-baseline">
      <p>Εικόνα</p> <UInput size="xs" class="w-12" v-model="position" /> <p>από {{ files.length }} ({{ files[position].filename }})</p>
    </div>
<!--    <UCheckbox @click="makeEdit('edited')" v-model="isEdited" label="Εμφάνιση μόνο μη-επεξεργασμένων"></UCheckbox>-->

    <Flex row gap="3">
      <UFormGroup label="Αρ. οχήματος">
        <UInput v-model="vmodel.vehicle" placeholder="Ο πάροχος συμπληρώνεται αυτόματα" />
      </UFormGroup>
      <UFormGroup label="Γραμμή">
        <USelectMenu multiple searchable creatable class="w-64" v-model="vmodel.line" :options="lines" placeholder="Επιλογή γραμμής" />
      </UFormGroup>
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
    <Flex row gap="12">
      <UButton @click="makeEdit('prev')">Προηγούμενο</UButton>
      <UButton @click="makeEdit('act')" color="purple">Επεξεργασία</UButton>
      <UButton @click="makeEdit('next')">Επόμενο</UButton>
    </Flex>
  </Flex>
</template>