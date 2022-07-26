<template>
    <div>Home Page</div>
    <router-link to="about" v-slot="{ href, route, navigate }">
        <a :href="href" @click="navigate">
            {{ route.fullPath }}
        </a>
    </router-link>
    <!-- <DiceRolling /> -->
    <RangeSliders @update:ratio="handleRatioUpdate"/>
</template>

<script>
// import DiceRolling from '../components/DiceRolling.vue'
import RangeSliders from '../components/RangeSliders.vue'
export default {
    components: { RangeSliders },
    setup() {
        function handleRatioUpdate(payload) {
            console.log({payload})
        }

        return {
            handleRatioUpdate
        }
    },
}
</script>