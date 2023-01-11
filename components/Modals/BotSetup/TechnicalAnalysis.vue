<template>
<div class="d-flex flex-column align-center">
    <h3>Choose First Analysis</h3>
    <!-- <v-btn small @click="logger">logger</v-btn> -->
    <v-row style="width:100%;">
        <v-col cols="8">
            <v-select v-model="technical.first_analysis.analysis" item-value="id" item-text="name" :items="analysisList" label="Choose Analysis" dense outlined>
            </v-select>
        </v-col>
        <v-col cols="4" class="mx-0">
            <v-select v-model="technical.first_analysis.time" :items="timeList" label="Timeframe" dense outlined></v-select>
        </v-col>
    </v-row>
    <h3 class="mt-3">Condition</h3>
    <v-row style="width:100%;">
        <v-col class="d-flex justify-center" cols="12">
            <v-btn-toggle style="width:100%;" v-model="technical.condition" borderless color="primary">
                <v-btn style="width:50%;" value="AND">
                    AND
                </v-btn>
                <v-btn style="width:50%;" value="OR">
                    OR
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
    <h3 class="mt-3">Choose Second Analysis</h3>
    <v-row style="width:100%;">
        <v-col cols="8">
            <v-select v-model="technical.second_analysis.analysis" item-value="id" item-text="name":items="analysisList" label="Choose Analysis" dense outlined></v-select>
        </v-col>
        <v-col cols="4" class="mx-0">
            <v-select v-model="technical.second_analysis.time" :items="timeList" label="Timeframe" dense outlined></v-select>
        </v-col>
    </v-row>
    <h3 class="mt-3">Minimum trading volume in 24h</h3>
    <v-row style="width:100%;">
        <v-col class="d-flex justify-center" cols="12">
            <v-select v-model="technical.minimum_trading_volume" item-value="value" item-text="name":items="tradingVolumeList" label="Trading Volume" dense outlined></v-select>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props:['selectedTechnical'],
    data() {
        return {
            technical: {
                first_analysis: {
                    analysis: null,
                    time: null
                },
                condition: null,
                second_analysis: {
                    analysis: null,
                    time: null
                },
                minimum_trading_volume: null
            },
            analysisList: [{
                id: "EMA",
                name: "Exponential Moving Average"
            }, {
                id: "SMA",
                name: "Moving Average"
            }, {
                id: "BB",
                name: "Bollinger Band"
            }, {
                id: "RSI",
                name: "RSI"
            }, {
                id: "STOCHASTIC",
                name: "Stochastic"
            }, {
                id: "MACD",
                name: "MACD"
            }, {
                id: "STOCHASTIC_RSI",
                name: "Stochastic RSI"
            }, {
                id: "CCI",
                name: "CCI"
            }],
            timeList: ['5m', '15m', '30m', '1h', '2h', '4h', '12h'],
            tradingVolumeList:[
            {
                value:1000000,
                name:"1 mil USD"
            },    
            {
                value:5000000,
                name:"5 mil USD"
            },
            {
                value:10000000,
                name:"10 mil USD"
            },
            {
                value:15000000,
                name:"15 mil USD"
            },
            {
                value:20000000,
                name:"20 mil USD"
            },
            {
                value:30000000,
                name:"30 mil USD"
            }
            ],
            condition: 'AND',
        }
    },
    methods: {
        logger() {
            console.log(this.technical);
        },
        clearData() {
            this.technical = {
                first_analysis: {
                    analysis: null,
                    time: null
                },
                condition: null,
                second_analysis: {
                    analysis: null,
                    time: null
                },
                minimum_trading_volume: null
            }
        }
    },
    mounted(){
        if(this.selectedTechnical){
            this.technical = this.selectedTechnical
        }
    },
    watch: {
        technical: {
            handler(nv, ov) {
                nv.minimum_trading_volume = parseFloat(nv.minimum_trading_volume);
                this.$emit('onAlaysisSelected', nv);
            },
            deep: true
        }
    }
}
</script>

<style>
/* TEST */
</style>
