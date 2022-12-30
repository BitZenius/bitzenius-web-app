<template>
<v-app>
    <v-main>
        <nuxt />
    </v-main>
</v-app>
</template>

<script>
export default {
    computed: {
        title() {
            return this.$store.state.title
        }
    },
    mounted() {
        this.$vuetify.theme.dark = true
    }
}
</script>
