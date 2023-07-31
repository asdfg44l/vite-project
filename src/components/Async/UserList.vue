<template>
  <p>{{ userList[0].email }}</p>
</template>

<script setup lang="ts">
const userList = ref<{ email: string }[]>([])
const http = useHttp()
// axios
userList.value = (
  await http.HTTP_GET('https://randomuser.me/api/')
).data.results
</script>
