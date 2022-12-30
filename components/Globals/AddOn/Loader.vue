<template>
<v-overlay :z-index="zIndex" :value="loading">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
</v-overlay>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            zIndex: 1000,

        }
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading
        }
    },
    watch: {
        isLoading: {
            handler(nv, ov) {
                console.log(arguments);
                this.loading = nv;
            },
            immediate: true
        }
    },
}
</script>

<style>

</style>
