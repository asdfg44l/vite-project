<template>
  <TestModal :modal-id="TestModalId" />
</template>

<script>
export default {
  setup() {
    const { state } = useStore()

    return {
      TestModalId: state.dialogs.TestModal.key,
    }
  },
}
</script>
