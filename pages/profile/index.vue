<template>
<div>
    <v-row>
        <v-col cols="12">
            <v-card elevation="8">
                <h2>Profile Page</h2>
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
                name: 'Standard',
                tagLine: 'For small to medium businesses',
                monthlyPrice: 42,
                yearlyPrice: 460,
                isPopular: true,
                current: false,
                features: [
                    'Bot Deployment',
                    'Custom Strategy And Amount',
                    'Free on any features update in the future',
                ]
            }
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    mounted() {
        this.$store.commit('setTitle', this.title)
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
