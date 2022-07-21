<template>
    <p>{{ msg }}</p>
</template>

<script>
import { toRef, toRefs } from '@vue/reactivity'
export default {
    props: {
        msg: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        //直接使用 props會無法同步來自 parents的改變
        // const { msg } = props
        // const msg = toRef(props, 'msg')
        const { msg } = toRefs(props)
        return { msg }
    },
}
</script>