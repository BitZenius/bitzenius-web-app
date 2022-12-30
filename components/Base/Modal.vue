<template>
<v-card>
    <v-card-title class="text-h5 lighten-2">
        <slot name="title"></slot>
    </v-card-title>
    <v-card-text class="mt-3 mb-0 pb-0">
        <slot name="body"></slot>
    </v-card-text>
    <v-card-actions class="my-2" >
        <v-spacer></v-spacer>
        <slot name="button"></slot>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
.balance-container {
    padding: 5px 15px;
    border-radius: 5px;
    position: relative;
}

.balance-container .v-btn {
    position: absolute;
    width: 150px;
    right: 15px;
}
</style>
