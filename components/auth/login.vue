<script setup>
const email = useState("user_username");
const password = useState("user_password");
const form = ref();
const token = ref();

const loginButtonText = useState("login_button_text", () => "Συνέχεια");
const loginButtonIcon = useState("login_button_icon", () => "i-mdi-key");
</script>

<template>
  <UForm ref="form" @submit="turnstile(token)">
    <Flex column items="center" gap="2">
      <UFormGroup label="Email" name="email" required class="w-full">
        <UInput icon="i-mdi-email" size="lg" placeholder="Email" v-model="email" required class="w-full" />
      </UFormGroup>

      <UFormGroup label="Password" name="password" required class="w-full">
        <UInput icon="i-mdi-form-textbox-password" size="lg" placeholder="Κωδικός" type="password" v-model="password" required class="w-full" />
      </UFormGroup>

      <NuxtTurnstile v-model="token" />

      <UButton block color="primary" variant="soft" size="lg" type="submit" :disabled="!token || token.length < 1">
        <Icon :name="loginButtonIcon" size="1.5em" />
        <span>{{ loginButtonText }}</span>
      </UButton>
    </Flex>
  </UForm>
</template>
