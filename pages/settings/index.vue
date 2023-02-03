<template>
  <div v-if="userData">
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-card class="px-3" elevation="0">
          <div class="text-center pa-3">
            <v-avatar
              size="180"
              class="mt-5"
            >
              <img
                :src="userData.photo_url"
                :alt="userData.display_name"
              >
            </v-avatar>
            <v-btn
              depressed
              :loading="isSelecting"
              @click.stop="doUpload"
              block
              class="mt-5 text-capitalize"
              color="primary"
            >
              Upload Image
            </v-btn>
            <v-file-input
              ref="uploader"
              @change="(file) => uploadImage(file)"
              hide-input
              class="d-none"
            />
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card class="pa-md-6 pa-4" elevation="0">
          <v-tabs
            v-model="tab"
          >
            <v-tab class="font-weight-bold">
              Profile
            </v-tab>
            <v-tab class="font-weight-bold">
              Wallet
            </v-tab>
            <v-tab class="font-weight-bold">
              Settings
            </v-tab>
          </v-tabs>
          <v-divider />
          <v-tabs-items v-model="tab">
            <v-tab-item class="pt-8">
              <v-row>
                <v-col cols="12">
                  <div class="mb-2 font-weight-bold">Display Name</div>
                  <div class="grey--text mb-3">Change your name if needed</div>
                  <v-text-field
                    v-model="userData.display_name"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
              <v-divider class="my-5" />
              <v-row>
                <v-col cols="12">
                  <div class="mb-2 font-weight-bold">Email</div>
                  <div class="grey--text mb-3">Currently, change email address is not available</div>
                  <v-text-field
                    v-model="userData.email"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
              </v-row>
              <v-divider class="my-5" />
              <v-row>
                <v-col cols="12">
                  <div class="mb-2 font-weight-bold">Password</div>
                  <div class="grey--text mb-3">To change your password, please logout from your account and click "forgot password" to reset your password</div>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item class="pt-8">
              <v-row>
                <v-col cols="12">
                  <div class="font-weight-bold">Virtual Account</div>
                  <div class="grey--text mb-3">Your Polygon ERC20 virtual account</div>
                  <v-text-field
                    v-model="userData.wallet_va"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
              </v-row>
              <v-divider class="my-5" />
              <v-row>
                <v-col cols="12">
                  <div class="font-weight-bold">Wallet Address</div>
                  <div class="grey--text mb-3">Your wallet address for withdrawal destination</div>
                  <v-text-field
                    v-model="userData.wallet"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item class="pt-8">
              <v-row>
                <v-col cols="12">
                  <div class="font-weight-bold">Telegram Bot</div>
                  <div class="grey--text">Activate BitZenius Telegram Bot as your virtual assistant</div>
                  <v-btn
                    depressed
                    :loading="isLoading"
                    class="mt-3 text-capitalize"
                    :color="telegramConnected ? 'secondary' : 'primary'"
                    :disabled="telegramConnected"
                    @click.stop="connectTelegram"
                  >
                    <v-icon
                      left
                    >
                      mdi-send
                    </v-icon>
                    {{ telegramConnected ? 'Connected' : 'Connect' }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider class="my-5" />
              <v-row>
                <v-col cols="12">
                  <div class="font-weight-bold">Two-Factor Authentication</div>
                  <div class="grey--text">Choose your preferred 2FA for your account</div>
                  <v-radio-group v-model="selected2Fa" class="px-3">
                    <v-radio
                      value="none"
                      label="Disabled"
                    />
                    <v-radio
                      value="email"
                      label="Email"
                    />
                    <v-radio
                      value="telegram"
                      :disabled="!telegramConnected"
                      label="Telegram"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
          <v-row>
            <v-col cols="12" md="6">
              <v-btn
                depressed
                :loading="isLoading"
                class="mt-5 text-capitalize"
                color="primary"
                @click="save"
              >
                Save Changes
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
    <v-dialog
      v-model="progressDialog"
      max-width="480px"
      persistent
    >
      <v-card>
        <v-card-text class="pt-5">
          <p>Uploading progress</p>
          <v-progress-linear
            v-if="uploadProgress"
            v-model="uploadProgress"
            color="light-blue"
            striped
            height="25"
          >
            <div class="subtitle">{{ uploadProgress }}%</div>
          </v-progress-linear>
        </v-card-text>
        <v-card-actions v-if="uploadProgress === 100">
          <v-btn color="blue darken-1" text @click="closeDialog">
            Finish
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      showEnableTwoFactorModal: false,
      telegramBotUrl: 'https://t.me/',
      isLoading: false,
      progressDialog: null,
      uploadProgress: null,
      isSelecting: false,
      userData: null,
      switch1: false,
      tab: null,
      selected2Fa: 'none',
      listener: new Object,
      telegramConnected: false
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  methods: {
    getProfile () {
      this.isLoading = true
      this.$api.$get('/user/profile').then((res) => {
        this.userData = res.result

        if (this.userData.otp && this.userData.otp.method) {
          this.selected2Fa = this.userData.otp.method
        }
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    generateBotUrl() {
      this.telegramBotUrl += process.env.BOT_ID;
      this.telegramBotUrl += '?start=';
      this.telegramBotUrl += this.user.uid;
    },
    uploadImage (file) {
      if (typeof(file) != 'undefined') {
        this.uploadProgress = null
        this.progressDialog = true

        const filePath = `user-avatars/${new Date().getTime()}-` + file.name
        const storageRef = this.$fire.storage.ref().child(filePath)
        const uploadTask = storageRef.put(file)
        
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.uploadProgress = Math.ceil(progress)
          
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            
            case 'running':
              console.log('Upload is running')
              break
          }
        }, (error) => {
          console.log(error)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.userData.photo_url = downloadURL
          })
        })
      }
    },
    closeDialog () {
      this.progressDialog = false
      this.uploadProgress = null
    },
    doUpload() {
      this.isSelecting = true
      
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.$refs.input.click()
    },
    save () {
      this.isLoading = true
      this.$api.$put('/user/profile', {
        display_name: this.userData.display_name,
        photo_url: this.userData.photo_url,
        wallet: this.userData.wallet,
        otp_method: this.selected2Fa
      }).then((res) => {
        this.$store.commit('setUser', {
          displayName: this.userData.display_name,
          photoURL: this.userData.photo_url
        })
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    connectTelegram () {
      this.isLoading = true
      this.$api.$post('/user/profile/connect-telegram').then((res) => {
        window.open(`https://t.me/${process.env.BOT_ID}?start=${res.token}`, '_blank')
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    listenTelegram () {
      if (this.user) {
        this.listener = this.$fire.firestore.collection('telegrams').doc(this.user.uid).onSnapshot(async(onResult, onError) => {
          if (onError) {
            console.log(onError)
          }

          if (onResult.exists) {
            const telegramData = onResult.data()

            if (telegramData.chat_id) {
              this.telegramConnected = true
            }
          }
        })
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    }
  },
  beforeDestroy () {
    this.listener()
  },
  mounted() {
    this.getProfile()
    this.listenTelegram()
  }
}
</script>
