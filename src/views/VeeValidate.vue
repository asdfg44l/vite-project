<template>
  <!-- field components -->
  <Form rules="email">
    <label class="mr-2 inline-block w-[55px]" for="email1">Email1:</label>
    <Field id="email1" class="form-control" name="email1" />
    <ErrorMessage name="email1" />
  </Form>
  <!-- field with custom input -->
  <Form @submit="onSubmit">
    <Field v-slot="{ field, errorMessage }" name="email2" rules="email">
      <label class="mr-2 inline-block w-[55px]" for="email2">Email2:</label>
      <input v-bind="field" id="email2" class="form-control" type="email" />
      <button class="btn btn-secondary btn-sm">submit</button>
      <p>{{ errorMessage }}</p>
    </Field>
  </Form>
  <hr class="my-3" />

  <!-- validate-schema -->
  <p class="mb-3">Validate Schema</p>
  <Form v-slot="{ errors }" :validation-schema="schema">
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
        class="form-control"
        type="password"
        name="password"
      />
      <ErrorMessage name="password" />
    </div>
    <!-- confirmPassword -->
    <div>
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
    <!-- <p>{{ errors }}</p> -->
    <p>{{ $t('hello') }}</p>
  </Form>
</template>

<script>
import { ErrorMessage, Field, Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const onSubmit = (values) => console.log(values)
    const schema = {
      email3: 'required|email',
      user: 'required|min:3|max:6',
      password: 'required',
      confirmPassword: 'required|confirmed:@password',
    }

    const $i18n = useI18n()
    $i18n.locale.value = 'en-us'

    return {
      onSubmit,
      schema,
    }
  },
}
</script>
