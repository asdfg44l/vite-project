<template>
    <div>Home Page</div>
    <router-link to="about" v-slot="{ href, route, navigate }">
        <a :href="href" @click="navigate">
            {{ route.fullPath }}
        </a>
    </router-link>
    <DiceRolling />
</template>

<script>
import DiceRolling from '../components/DiceRolling.vue'
export default {
    components: { DiceRolling },
    setup() {
        
    },
}
</script>