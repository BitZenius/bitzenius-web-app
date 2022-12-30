<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        Detail Risk
    </v-card-title>
    <v-card-text class="my-3">
        <v-stepper elevation="0" class="basic-1" v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">

                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3">
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 4" step="4">
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-12 d-flex flex-column align-center">
                        <h3>Choose an Exchange</h3>
                        <GlobalsExchangeList class="mt-3" />
                    </v-card>

                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" text @click="closeModal">
                            Cancel
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 2">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card elevation="0" class="mb-12 d-flex flex-column align-center">
                        <h3 class="mb-1">Choose the strategy & Amount</h3>
                        <v-tooltip right color="success">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                                    <v-col cols="7" md="7">
                                        <v-text-field dense class="mt-2" v-model="applyBalance" label="Total USDT To Apply" outlined></v-text-field>
                                    </v-col>
                                    <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                                        <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                                            <v-icon left>
                                                mdi-currency-usd
                                            </v-icon>
                                            USDT
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </v-tooltip>
                        <v-tooltip right color="success">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                                    <v-col cols="7" md="7">
                                        <v-text-field dense class="mt-2" v-model="applyBalance" label="USDT Per Order" outlined></v-text-field>
                                    </v-col>
                                    <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                                        <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                                            <v-icon left>
                                                mdi-currency-usd
                                            </v-icon>
                                            USDT
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </v-tooltip>
                        <v-tooltip right color="success">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                                    <v-col cols="7" md="7">
                                        <v-text-field dense class="mt-2" v-model="applyBalance" label="Maximum Concurrent Trading Pair" outlined></v-text-field>
                                    </v-col>
                                    <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                                        <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                                            <v-icon left>
                                                mdi-currency-usd
                                            </v-icon>
                                            USDT
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </v-tooltip>
                        <v-row class="d-flex align-center justify-center pt-0 mt-0" style="width:100%;">
                            <v-col cols="12">
                                <v-list dense elevation="0">
                                    <v-list-item-group v-model="selectedItem" color="primary">
                                        <v-list-item v-for="(style, i) in styleList" :key="i" class="mt-5">
                                            <v-list-item-icon>
                                                <v-icon small>mdi-checkbox-blank-circle-outline</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="style.text"></v-list-item-title>
                                                <v-list-item-subtitle v-text="style.subText"></v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-icon>
                                                <v-icon v-text="style.icon"></v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 1" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 3">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-12 d-flex flex-column align-center" flat min-height="200px">
                        <h3>Choose Technical Analysis</h3>
                        <v-row style="width:100%;">
                            <v-col cols="8">
                                <v-select :items="analysisList" label="Choose Analysis" dense outlined></v-select>
                            </v-col>
                            <v-col cols="4" class="mx-0">
                                <v-select :items="timeList" label="Minutes" dense outlined></v-select>
                            </v-col>
                        </v-row>
                        <h3 class="mt-3">Condition</h3>
                        <v-row style="width:100%;">
                            <v-col class="d-flex justify-center" cols="12">
                                <v-btn-toggle style="width:100%;" v-model="condition" borderless color="primary">
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
                                <v-select :items="analysisList" label="Choose Analysis" dense outlined></v-select>
                            </v-col>
                            <v-col cols="4" class="mx-0">
                                <v-select :items="timeList" label="Minutes" dense outlined></v-select>
                            </v-col>
                        </v-row>
                        <h3 class="mt-3">Minimum trading volume in 24h</h3>
                        <v-row style="width:100%;">
                            <v-col class="d-flex justify-center" cols="12">
                                <v-select :items="['$10,000,000','$1,000,000', '$100,000']" label="Trading Volume" dense outlined></v-select>
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 2" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 4">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card class="mb-12 d-flex flex-column align-center" flat min-height="200px">
                        <h3>Summary</h3>
                        <v-row class="mt-1" style="width:100%;">
                            <v-col cols="12">
                                <v-data-table :headers="summaryHeaders" :items="summary" hide-default-header hide-default-footer class="elevation-1"></v-data-table>
                                <!-- <table>
                                    <tr v-for="(item,i) in summary" :key="i">
                                        <td style="width:250px; font-weight:bold;">{{item.title}}</td>
                                        <td>:</td>
                                        <td style="padding-left:10px;">{{item.value}}</td>
                                    </tr>
                                </table> -->
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 3" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 4">
                            Submit
                        </v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            e1: 1,
            applyBalance: 100,
            selectedItem: 1,
            styleList: [{
                    text: "Conservative",
                    subText: "Very Low Risk",
                    icon: "mdi-pencil"
                },
                {
                    text: "Moderate",
                    subText: "Low Risk",
                    icon: "mdi-pencil"
                },
                {
                    text: "Aggressive",
                    subText: "Medium Risk",
                    icon: "mdi-pencil"
                },
                {
                    text: "Very Aggressive",
                    subText: "Very High Risk",
                    icon: "mdi-pencil"
                },
            ],
            analysisList: ['Bollinger Bands', 'CCI', 'RSI', 'Stochastic RSI', 'Stochastic', 'EMA'],
            timeList: ['15', '30', '45', '60'],
            condition: 'AND',
            summaryHeaders: [{
                    text: "Title",
                    align: "start",
                    value: "title"
                },
                {
                    text: "Value",
                    align: "start",
                    value: "value",
                    cellClass: "font-weight-bold"
                },
            ],
            summary: [{
                    color: 'indigo',
                    icon: 'mdi-buffer',
                    title: 'Exchange',
                    value: 'MEXC'
                },
                {
                    color: 'indigo',
                    icon: 'mdi-buffer',
                    title: 'Strategy',
                    value: 'Moderate'
                },
                {
                    color: 'green',
                    icon: 'mdi-buffer',
                    title: 'Total USDT',
                    value: '$2000'
                },
                {
                    color: 'indigo',
                    icon: 'mdi-buffer',
                    title: 'Technical Analysis',
                    value: 'Bollinger & RSI'
                },
                {
                    color: 'green',
                    icon: 'mdi-buffer',
                    title: 'Minimum Trading Volume',
                    value: '$10,000,000'
                },
            ]
        }
    },
    methods: {
        // TRIGGER
        closeModal() {
            this.$emit('close-modal', false);
        }
    }
}
</script>

<style scoped>
.summary .v-card__title {
    padding: 0;
    font-size: 0.9rem;
    text-align: center;
    display: block;
}

.summary .v-card__text {
    display: block;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
