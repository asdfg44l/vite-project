<template>
  <p>{{ userList[0].email }}</p>
</template>

<script>
import { ref } from "vue";
// import { useHttp } from "@/plugins/axios";

export default {
  async setup() {
    const userList = ref(null);
    const http = useHttp();

    //axios
    userList.value = (
      await http.HTTP_GET("https://randomuser.me/api/")
    ).data.results;

    return {
      userList,
    };
  },
};
</script>
