<script setup>
const submitState = useState("submitState", () => null);
const formData = ref()

const lineDropdown = [
  {
    label: "test"
  },
  {
    label: "test1"
  }
]
</script>
<template>
  <Flex row>
    <Flex column class="border-r border-primary h-100 bg-gray">
      <h1 class="text-xl text-center font-semibold p-4 border-b border-primary">Admin Panel</h1>
      <Flex column>
        <Flex row gap="1" class="p-3 items-center">
          <UIcon name="i-mdi-file-search-outline" />
          <h1>Προβολή αρχείων</h1>
        </Flex>
        <Flex row gap="1" class="p-3 items-center">
          <UIcon name="i-mdi-file-upload-outline" />
          <h1>Ανέβασμα αρχείων</h1>
        </Flex>
      </Flex>
    </Flex>
    <Flex column grow class="gap-2" items="center">
      <UCard class="w-fit">
        <template #header>
          <h1 class="text-2xl pt-6 font-semibold text-center">Επιλογή αρχείου</h1>
        </template>

        <UForm ref="formData" @submit="uploadFile">
          <Flex column gap="2">
            <UFormGroup label="Επιλογή γραμμής" name="line">
              <UDropdown>
                <UButton variant="outline" label="Γραμμή" trailing-icon="i-mdi-menu-down-outline">Γραμμή</UButton>
              </UDropdown>
            </UFormGroup>
            <UFormGroup label="Επιλογή φορέα" name="provider">
              <UDropdown>
                <UButton variant="outline" label="Φορέας" trailing-icon="i-mdi-menu-down-outline">Φορέας</UButton>
              </UDropdown>
            </UFormGroup>
            <UFormGroup label="Επιλογή κατηγορίας οχήματος" name="category">
              <UDropdown>
                <UButton variant="outline" label="Κατηγορία" trailing-icon="i-mdi-menu-down-outline">Κατηγορία</UButton>
              </UDropdown>
            </UFormGroup>

            <UFormGroup label="Επιλογή αρχείου" name="select">
              <UInput type="file"></UInput>
            </UFormGroup>

            <UButton type="submit" variant="solid" class="mt-6 text-center">Υποβολή</UButton>

            <Flex column gap="2" v-if="submitState === 'waiting'">
              <h1>Μεταφόρτωση - παρακαλώ περιμένετε..</h1>
              <UProgress animation="carousel" />
            </Flex>
          </Flex>

        </UForm>


        <template #footer>
          <h1 class="text-lg text-center italic">Δεκτοί τύποι: JPG, PNG</h1>
        </template>
      </UCard>




    </Flex>
  </Flex>

</template>