<template>
<div>
    <v-chip style="width:100%;" v-if="!exist" @click="exist = !exist" class="" color="danger" label text-color="white">
        <v-icon left>
            mdi-label
        </v-icon>
        You don't have any exchanges registered!
    </v-chip>
    <v-select v-else dense v-model="selected" :items="exchangeItems" @change="onExchangeChange(selected)" label="Choose Exchange" outlined />
    <!-- <v-btn small @click="logger">logger</v-btn> -->
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
            exchangeItems: [],
            exist: true,
            selected:null
        }
    },
    computed: {
        selectedExchange(){
            return this.$store.state.exchange.selectedExchange
        }
    },
    methods: {
        ...mapMutations("exchange", ["setSelectedExchange"]),
        ...mapGetters("exchange", ["getSelectedExchange"]),
        onExchangeChange(val) {
            console.log(val);
            this.$store.commit('exchange/setSelectedExchange',val);
            this.$emit('onSelected', val);
        },
        logger() {
            console.log('state', this.$store.state.exchange.selectedExchange);
        },
        async fetchAvailableExchanges(){
            let res = await this.$api.$get('/user/exchange');
            console.log("availableExchange", res);
            let tempArray = []; 
            res.data.forEach((val)=>{
                tempArray.push(val.title);
            });
            this.exchangeItems = tempArray;
        }
    },
    mounted() {
        console.log('state', this.$store.state.exchange.selectedExchange);
        console.log(this.selectedExchange);
        this.fetchAvailableExchanges();
        this.selected = this.selectedExchange;
    },
    watch:{
        selectedExchange:{
            handler(nv, ov){
                this.selected = nv;
            },
            immediate:true
        }
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
