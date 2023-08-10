<template>
  <!-- field components -->
  <!-- <Form rules="email">
    <label class="mr-2 inline-block w-[55px]" for="email1">Email1:</label>
    <Field id="email1" class="form-control" name="email1" />
    <ErrorMessage name="email1" />
  </Form> -->
  <!-- field with custom input -->
  <!-- <Form v-slot="{ resetForm }" @submit="onSubmit">
    <Field
      v-slot="{ handleReset, resetField, ...other }"
      name="email2"
      rules="required|email"
    >
      <TInput
        v-bind="other"
        v-model="unComposedEmail"
        :handle-reset="handleReset"
        :reset-field="resetField"
      />
    </Field>
    <p>{{ unComposedEmail }}</p>
    <TInputComposed
      id="emailx"
      v-model="composedEmail"
      title="Email:"
      name="emailx"
      rules="required|email"
      type="text"
      input-class="px-4 py-1"
    />
    <p>{{ composedEmail }}</p>
  </Form> -->
  <hr class="my-3" />

  <!-- validate-schema -->
  <p class="mb-3">Validate Schema</p>
  <Form
    v-slot="{ errors, resetForm, meta, handleSubmit }"
    :validation-schema="schema"
  >
    <!-- email3 -->
    <div class="mb-2">
      <label class="mr-2 inline-block w-[55px]" for="email3">Email3:</label>
      <Field id="email3" class="form-control" name="email3" />
      <ErrorMessage name="email3" />
    </div>
    <!-- user -->
    <div class="mb-2">
      <label class="mr-2 inline-block w-[55px]" for="user">User:</label>
      <Field id="user" class="form-control" name="user" />
      <ErrorMessage name="user" />
    </div>
    <!-- password -->
    <div class="mb-2">
      <label class="mr-2 inline-block w-[70px]" for="password">Password:</label>
      <Field
        id="password"
        v-model="password"
        class="form-control"
        type="password"
        name="password"
      />
      <ErrorMessage name="password" />
    </div>
    <!-- confirmPassword -->
    <div class="mb-2">
      <label class="mr-2 inline-block" for="confirmPassword"
        >ConfirmPassword:</label
      >
      <Field
        id="confirmPassword"
        class="form-control"
        type="password"
        name="confirmPassword"
      />
      <ErrorMessage name="confirmPassword" />
    </div>
    <!-- custom errorMessage -->
    <div>
      <label for="_custom_field_name">customName (只可輸入英數字): </label>
      <br />
      <Field
        id="_custom_field_name"
        v-maska
        data-maska="#"
        data-maska-tokens="#:[a-zA-Z0-9]:repeated"
        name="_custom_field_name"
        label="nice"
        class="form-control"
      ></Field>
      <ErrorMessage name="_custom_field_name" />
    </div>

    <p class="my-3">{{ errors }}</p>
    <button class="btn btn-sm btn-secondary" @click="onSubmit(handleSubmit)">
      Submit
    </button>
  </Form>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { object, string } from 'yup'

// const unComposedEmail = ref(null)
// const composedEmail = ref(null)
const password = ref('')

const $i18n = useI18n()
$i18n.locale.value = 'en-us'

const schema = object({
  email3: string().required().email(),
  user: string().required().min(3).max(6),
  password: string().required(),
  confirmPassword: string().sequence([
    () => string().required(),
    () =>
      string().oneOf(
        [password.value],
        $i18n.t('common.formError.confirm', { field: 'confirmPassword' })
      ),
  ]),
  _custom_field_name: string().required(),
})

function onSubmit(handleSubmit) {
  handleSubmit((value) => {
    console.log(value)
  })
}
</script>
