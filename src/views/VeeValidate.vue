<template>
  <!-- field components -->
  <Form rules="email">
    <label class="mr-2 inline-block w-[55px]" for="email1">Email1:</label>
    <Field class="form-control" id="email1" name="email1" />
    <ErrorMessage name="email1" />
  </Form>
  <!-- field with custom input -->
  <Form @submit="onSubmit">
    <Field name="email2" rules="email" v-slot="{ field, errorMessage }">
      <label class="mr-2 inline-block w-[55px]" for="email2">Email2:</label>
      <input class="form-control" v-bind="field" type="email" id="email2" />
      <button class="btn btn-secondary btn-sm">submit</button>
      <p>{{ errorMessage }}</p>
    </Field>
  </Form>
  <hr class="my-3" />

  <!-- validate-schema -->
  <p class="mb-3">Validate Schema</p>
  <Form :validation-schema="schema" v-slot="{ errors }">
    <!-- email3 -->
    <div class="mb-2">
      <label class="mr-2 inline-block w-[55px]" for="email3">Email3:</label>
      <Field class="form-control" id="email3" name="email3" />
      <ErrorMessage name="email3" />
    </div>
    <!-- user -->
    <div class="mb-2">
      <label class="mr-2 inline-block w-[55px]" for="user">User:</label>
      <Field class="form-control" name="user" id="user" />
      <ErrorMessage name="user" />
    </div>
    <!-- password -->
    <div class="mb-2">
      <label class="mr-2 inline-block w-[70px]" for="password">Password:</label>
      <Field
        class="form-control"
        type="password"
        name="password"
        id="password"
      />
      <ErrorMessage name="password" />
    </div>
    <!-- confirmPassword -->
    <div>
      <label class="mr-2 inline-block" for="confirmPassword"
        >ConfirmPassword:</label
      >
      <Field
        class="form-control"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
      />
      <ErrorMessage name="confirmPassword" />
    </div>
    <!-- <p>{{ errors }}</p> -->
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const onSubmit = (values) => console.log(values);
    const schema = {
      email3: "required|email",
      user: "required|min:3|max:6",
      password: "required",
      confirmPassword: "required|confirmed:@password",
    };
    return {
      onSubmit,
      schema,
    };
  },
};
</script>
