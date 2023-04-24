import { watch } from 'vue'
import { useForm } from 'vee-validate'

export function useTForm(form, emit) {
  const { handleSubmit } = useForm()
  // emit confirm and value after validate passed
  const onSubmit = handleSubmit((value) => {
    emit('confirm', value)
  })
  // expose onSubmit
  emit('exposeSubmit', onSubmit)

  watch(
    () => form.value,
    (val) => emit('update:TForm', val),
    { deep: true }
  )

  return {
    onSubmit,
  }
}
