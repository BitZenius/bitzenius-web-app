<template>
<div class="text-center ma-2">
    <v-btn dark @click="show = true">
        Open Snackbar
    </v-btn>
    <v-snackbar timeout="2000" elevation="5" :color="color" v-model="show">
        {{message}}
        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="show = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message:null,
            color:null,
        }
    },
    methods: {
        logger() {
            console.log(this.snackbar);
        }
    },
    computed: {
        snackbar() {
            return this.$store.state.snackbar
        }
    },
    watch: {
        snackbar: {
            handler(nv, ov) {
                console.log(arguments);
                this.show = nv.show;
                this.message = nv.message;
                this.color = nv.color;
            },
            immediate: true
        }
    },
}
</script>

<style>

</style>
