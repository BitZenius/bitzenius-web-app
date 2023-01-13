<template>
<div>
    <v-dialog v-model="showEnableTwoFactorModal" max-width="600">
        <template>
            <BaseModal>
                <template v-slot:title>
                    Enable 2 Factor Authentication
                </template>
                <template v-slot:body>
                    <div style="padding:12px; border-radius:15px; color:white;" class="success d-flex flex-column align-center justify-center">
                        <h4>You're going to enable 2 factor authentication, please check your email</h4>
                    </div>
                </template>
                <template v-slot:button>
                    <v-btn @click="showEnableTwoFactorModal = false" color="info--text">Close</v-btn>
                    <v-btn color="success">Ok</v-btn>
                </template>
            </BaseModal>
        </template>
    </v-dialog>
    <v-row>
        <v-col cols="12">
            <v-card class="d-flex flex-column px-4" elevation="8">
                <v-row>
                    <v-col cols="12" class="px-4 d-flex align-center pb-0">
                        <img style="width:100px; padding-top:30px; padding-bottom:30px;" src="/settings/avatar.png" alt="" />
                        <div class="d-flex flex-column">
                            <div class="d-flex flex-wrap">
                                <v-btn color="primary" class="ml-2">Upload New Photo</v-btn>
                            </div>
                            <div class="d-flex flex-wrap mt-2">
                                <span class="pl-2">Allowed JPG, GIF or PNG. Max size of 800K</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="pt-0 mb-7">
                        <v-divider class="pb-2" />
                        <v-row>
                            <v-col cols="6" class="pb-0">
                                <v-text-field class="pa-2" v-model="first_name" label="First name" outlined></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pb-0">
                                <v-text-field class="pa-2" v-model="last_name" label="Last name" outlined></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pb-0">
                                <v-text-field class="pa-2" v-model="email" label="E-mail" outlined></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pb-0">
                                <v-text-field class="pa-2" v-model="phone" label="Phone Number" outlined></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pb-0">
                                <div class="d-flex flex-wrap">
                                    <v-btn color="primary" class="ml-2">Save Changes</v-btn>
                                    <v-btn color="danger white--text" class="ml-2">Reset</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card class="d-flex flex-column" elevation="8">
                <v-row>
                    <v-col class="d-flex flex-column justify-center" cols="8">
                        <div class="ma-3">
                            <v-row>
                                <v-col cols="9" class="d-flex align-center justify-">
                                    <v-text-field class="pa-2" v-model="usdt" label="USDT Address" outlined></v-text-field>
                                </v-col>
                                <v-col cols="3" class="d-flex justify-end ">
                                    <v-btn class="mr-2 mt-2" color="primary" style="height:54px; width:100%;">
                                        <span>USDT</span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-end px-5">
                                    <v-btn @click="showEnableTwoFactorModal = true" color="orange white--text" style="height:54px; width:100%;">
                                        <span>Enable Two-Factor Authentication</span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-end px-5">
                                    <a style="width:100%;" target="#" :href="telegramBotUrl">
                                        <v-btn color="#799eab" class="white--text" style="height:54px; width:100%;">
                                            <img class="mr-3" style="width:1.5rem;" src="/logo/telegram.png" alt="" />
                                            <span>Connect Telegram Bot</span>
                                        </v-btn>
                                    </a>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-center">
                        <img style="width:100px; padding-top:30px; padding-bottom:30px;" src="/settings/setting.png" alt="" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<style scoped>
a {
    color: #0060B6;
    text-decoration: none;
}

a:hover {
    color: #00A0C6;
    text-decoration: none;
    cursor: pointer;
}
</style>

<script>
export default {
    layout: 'account',
    data() {
        return {
            title: 'Settings',
            usdt: '0x19c4791bDEB776a376008F596F5D2564E5650379',
            avatar: '@/static/settings/avatar.png',
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@bitzenius.com",
            phone: "+6223123213",
            address: "Lorem Ipsum Dolor Sit Amet",
            country: "Lorem",
            showBotAlert: false,
            showTestingModal: false,
            showEnableTwoFactorModal: false,
            telegramBotUrl: 'https://t.me/'
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    methods: {
        setLoader(val) {
            if (val) {
                this.$store.commit('setIsLoading', val);
                setTimeout(() => {
                    this.$store.commit('setIsLoading', false);
                }, 2000)
            } else {
                this.$store.commit('setIsLoading', val);
            }
        },
        testModal() {
            this.showTestingModal = true;
        },
        closeModal() {
            alert('closed');
            this.showTestingModal = false;
        },
        generateBotUrl() {
            this.telegramBotUrl += process.env.BOT_ID;
            this.telegramBotUrl += '?start=';
            this.telegramBotUrl += this.user.uid;
        }
    },
    computed: {
        // this.$store.state.authUser
        user() {
            return this.$store.state.authUser;
        },
        userToken(){
            return this.$store.state.token;
        }
    },
    mounted() {
        this.$store.commit('setIsLoading', true);
        this.$store.commit('setTitle', this.title);
        this.$store.commit('setIsLoading', false);
        console.log("SERVER", process.env.SERVER);
        console.log("BOT_ID", process.env.BOT_ID);
        console.log("USER", this.user);
        console.log("TOKEN", this.$store.state.token);
        this.generateBotUrl();
    }
}
</script>
