<template>
  <TSuspense>
    <UserList />
    <template #fallback>loading...</template>
  </TSuspense>
</template>
