<template>
<div>
    <v-row>
        <v-col cols="12">
            <GlobalsAddBalance class="py-5" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card elevation="8">
                <v-row class="pt-8">
                    <v-col cols="12" class="d-flex justify-center">
                        <div class="d-flex flex-column align-center justify-center" style="max-width:80%;">
                            <h2>Pricing Plans</h2>
                            <p style="font-size:0.9rem;" class="text-center mt-2">
                                Take a look of our Pricing and select Your Choice
                            </p>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="pb-8">
                    <v-col cols="4"></v-col>
                    <v-col cols="4" md="4" class="d-flex align-center justify-center">
                        <div class="plan-container pt-10 pb-2 d-flex flex-column align-center justify-center">
                            <v-img style="width:40px;" src="/subscription/pricing-icon.png" alt=""></v-img>
                            <strong class="pt-5 text-center" style="font-size:0.8rem;">{{plan.title}}</strong>
                            <div class="d-flex flex-column justify-center align-center my-3">
                                <h2 class="primary--text text-center">
                                    {{plan.price}} + {{plan.profitSharing}}
                                </h2>
                                <h2 class="primary--text text-center">
                                    Profit Sharing
                                    <sub style="font-size:0.8rem;">/mo</sub>
                                </h2>
                            </div>
                            <v-card-actions style="width:100%;">
                                <v-btn block color="primary">
                                    Subscribe
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-col>
                    <v-col cols="4"></v-col>
                    <!-- <v-col cols="12" md="8" class="d-flex flex-column align-center mb-10 pt-0">
                        <h2 class="mb-4">Available Features</h2>
                        <v-expansion-panels style="width:100%;">
                            <v-expansion-panel v-for="(feature,i) in availableFeatures" :key="i">
                                <v-expansion-panel-header>
                                    {{i+1}}. {{feature}}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col> -->
                    <v-col cols="12">
                        <v-row class="px-6">
                            <v-col v-for="i in 3" :key="i" cols="4" md="4" class="d-flex align-center justify-center">
                                <v-card elevation="8">
                                    <div class=" pt-10 pb-2 d-flex flex-column align-center justify-center">
                                        <v-icon color="primary" style="font-size:65px;">mdi-cog</v-icon>
                                        <h3 class="text-center mt-2 primary--text">Fully Automated</h3>
                                        <div class="d-flex justify-center align-center my-3">
                                            <p class="text-justify px-4" style="font-size:0.9rem;">
                                                Zoku Trade's trading bots are fully automated,
                                                allowing users to set them up and run them
                                                without the need for constant monitoring or
                                                intervention. This allows users to enjoy the
                                                benefits of automated trading without sacrificing control or flexibility.
                                            </p>
                                        </div>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    layout: 'account',
    data() {
        return {
            title: 'Subscription',
            plan: {
                title: 'ONE PRICE FOR ALL ( PAY ANNUALLY)',
                tagLine: 'For small to medium businesses',
                price: '$13.3',
                profitSharing: '15%',
            },
            availableFeatures: [
                'Access To All Features',
                'Unlimited DCA Bot',
                'Unlimited Grid Bot',
                '24/7 Support',
            ]
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    mounted() {
        this.$store.commit('setIsLoading', true);
        this.$store.commit('setTitle', this.title)
        this.$store.commit('setIsLoading', false);
    }
}
</script>

<style scoped>
.plan-container {
    border: 1.5px solid #49b5b2;
    border-radius: 10px;
    width: 100%;
}
</style>
