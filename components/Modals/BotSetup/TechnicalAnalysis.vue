<template>
<div class="d-flex flex-column align-center">
    <h3>Choose Technical Analysis</h3>
    <v-row style="width:100%;">
        <v-col cols="8">
            <v-select v-model="technical.first_analysis.analysis" :items="analysisList" label="Choose Analysis" dense outlined></v-select>
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
    <v-row style="width:100%;">
        <v-col cols="8">
            <v-select v-model="technical.second_analysis.analysis" :items="analysisList" label="Choose Analysis" dense outlined></v-select>
        </v-col>
        <v-col cols="4" class="mx-0">
            <v-select v-model="technical.second_analysis.time" :items="timeList" label="Timeframe" dense outlined></v-select>
        </v-col>
    </v-row>
    <h3 class="mt-3">Minimum trading volume in 24h</h3>
    <v-row style="width:100%;">
        <v-col class="d-flex justify-center" cols="12">
            <v-select v-model="technical.minimum_trading_volume" :items="[10000000, 1000000, 100000]" label="Trading Volume" dense outlined></v-select>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
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
            analysisList: ['Bollinger Bands', 'CCI', 'RSI', 'Stochastic RSI', 'Stochastic', 'EMA'],
            timeList: ['5m', '15m', '30m', '1h', '2h', '4h', '12h'],
            condition: 'AND',
        }
    },
    methods:{

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

</style>
