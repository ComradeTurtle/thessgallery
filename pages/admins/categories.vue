<script setup>
const categories = useState("categories");
const columns = [{
  key: 'name',
  label: 'Κωδικός κατηγορίας'
}, {
  key: 'description',
  label: 'Όνομα κατηγορίας'
}, {
  key: 'isVisible',
  label: 'Δημόσια κατηγορία'
}, {
  key: 'actions'
}];
const actionItems = (row) => [
  [
    {
      label: 'Επεξεργασία',
      icon: 'i-mdi-pencil-outline',
      click: () => makeCategoryEdit('select', row.name)
    }, {
    label: 'Εμφάνιση/Απόκρυψη',
    icon: 'i-mdi-archive-edit-outline',
    click: () => makeCategoryEdit('toggleDisplay', row.name)
  }
  ], [
    {
      label: 'Διαγραφή',
      icon: 'i-mdi-archive-remove-outline',
      click: () => makeCategoryEdit('delete', row.name)
    }
  ]
]
const obj = {
  name: null,
  description: null,
  isVisible: false
};
const vmodel = useState("categoryEditCurr", () => obj);
</script>

<template>

  <Flex column items="center" justify="center" gap="2" class="p-4">
    <UTable :rows="categories" :columns="columns" :ui="{ th: { padding: 'px-1 py-1.5'}, td: { padding: 'px-2 py-1'}}">
      <template #isVisible-data="{ row }">
        <span>{{ row.isVisible === 1 ? 'Ναι' : 'Όχι' }}</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="actionItems(row)">
          <UButton color="gray" variant="ghost" icon="i-mdi-dots-horizontal" />
        </UDropdown>
      </template>
    </UTable>

    <Flex column gap="3">
      <Flex row items="center" gap="3" class="items-center">
        <UFormGroup label="Κωδικός">
          <UInput v-model="vmodel.name" placeholder=">3 χαρακτ., πεζά λατινικά" />
        </UFormGroup>
        <UFormGroup label="Περιγραφή">
          <UInput v-model="vmodel.description" />
        </UFormGroup>
        <UFormGroup>
          <UCheckbox v-model="vmodel.isVisible" label="Είναι δημόσια;" />
        </UFormGroup>
      </Flex>
    </Flex>
    <Flex row gap="2">
      <UButton @click="makeCategoryEdit('edit')">Υποβολή επεξεργασίας</UButton>
      <UButton @click="makeCategoryEdit('add')" color="green">Προσθήκη κατηγορίας</UButton>
    </Flex>
  </Flex>
</template>