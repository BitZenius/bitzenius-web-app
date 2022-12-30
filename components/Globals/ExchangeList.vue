<template>
<div>
    <v-chip style="width:100%;" v-if="!exist" @click="exist = !exist" class="" color="danger" label text-color="white">
        <v-icon left>
            mdi-label
        </v-icon>
        You don't have any exchanges registered!
    </v-chip>
    <v-select v-else dense v-model="selectedExchange" :items="exchangeItems" @change="onExchangeChange(selectedExchange)" label="Choose Exchange" outlined />
</div>
</template>

<script>
import {
    mapGetters,
    mapMutations,
    mapActions,
    mapState
} from "vuex";

export default {
    data() {
        return {
            exchangeItems: ['Binance', 'Tokocrypto', 'MEXC', 'Coinstore'],
            selectedExchange: null,
            exist:true
        }
    },
    computed: {},
    methods: {
        ...mapMutations("exchange", ["setSelectedExchange"]),
        ...mapGetters("exchange", ["getSelectedExchange"]),
        onExchangeChange(val) {
            this.setSelectedExchange(val);
            this.$emit('onSelected', val);
        },
        getExchange() {
            this.selectedExchange = this.getSelectedExchange();
        }
    },
    mounted() {
        this.getExchange();
    }
}
</script>

<style>
.v-select {
    width: 100%;
}

.v-text-field__details {
    display: none;
}
</style>
