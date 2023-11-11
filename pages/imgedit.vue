<script setup>
  const files = useState("files");
  const position = useState("imgEditPos", () => 0);

  const isEdited = useState("imgEditIsEdited", () => false);
  const obj = {
    vehicle: files.value[0].vehicle,
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
    <p>Εικόνα</p> <UInput v-model="position" /> <p>από {{ files.length }} ({{ files[position].filename }})</p>
<!--    <UCheckbox @click="makeEdit('edited')" v-model="isEdited" label="Εμφάνιση μόνο μη-επεξεργασμένων"></UCheckbox>-->

    <Flex row gap="3">
      <UFormGroup label="Αρ. οχήματος">
        <UInput v-model="vmodel.vehicle" placeholder="Ο πάροχος συμπληρώνεται αυτόματα" />
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