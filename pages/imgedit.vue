<script setup>
  const files = useState("files");
  const lines = useState("lines", () => []);
  const position = useState("imgEditPos", () => 0);
  lines.value = await fetch('https://oasth-data.comradeturtle.dev/v1/lines?ignore=true').then((res) => res.json());

  lines.value.forEach((lv) => {
    lv.composite = `${lv.name} ${lv.description}`;
  })
  const isEdited = useState("imgEditIsEdited", () => false);
  const obj = {
    vehicle: files.value[0].vehicle,
    line: files.value[0].line ? files.value[0].line.split(',') : [],
    location: files.value[0].location,
    date: files.value[0].date,
    notes: files.value[0].notes,
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
        <USelectMenu multiple searchable creatable class="w-64" v-model="vmodel.line" :options="lines" placeholder="Επιλογή γραμμής" value-attribute="name" option-attribute="composite" />
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