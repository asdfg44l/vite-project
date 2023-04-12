<template>
  <Form @submit="onSubmit">
    <Field
      class="form-control"
      name="email"
      type="email"
      rules="email"
    />
    <button class="btn btn-secondary btn-sm">submit</button>
    <ErrorMessage name="email" />
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
    const validateEmail = (values) => {
      return !!values;
    };

    return {
      onSubmit,
      validateEmail,
    };
  },
};
</script>
