<template>
  <v-alert
    v-if="user && !user.emailVerified"
    color="customYellow"
    dark
    tile
    dense
    class="text-center black--text"
    ref="fixedAlert"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ message }}
        <v-btn
          :loading="isLoading"
          depressed
          class="error text-capitalize ml-2"
          @click.stop = "sendEmailVerification"
        >
          {{ buttonText }}
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      emailSent: false,
      message: 'Please verify your email',
      buttonText: 'Send Verification',
      topMargin: 0
    }
  },
  watch: {
    user: {
      handler (val) {
        if (val && val.emailVerified) {
          this.$store.commit('setGlobalCss', {
            topMargin: this.matchHeight()
          })
        }
      }
    }
  },
  mounted() {
    this.topMargin = this.matchHeight()
    this.$store.commit('setGlobalCss', {
      topMargin: this.topMargin
    })
  },
  computed: {
    user() {
      return this.$store.state.authUser
    }
  },
  methods: {
    sendEmailVerification () {
      this.isLoading = true
      this.$api.$post('/user/auth/verify', {
        email: this.user.email
      }).then((result) => {
        console.log(result)
        this.emailSent = true
        this.message = `We have sent a verification email to ${this.user.email}`
        this.buttonText = 'Resend'
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
    matchHeight () {
      if (this.$refs.fixedAlert) {
        return this.$refs.fixedAlert.$el.clientHeight
      } else {
        return 0
      }
    }
  }
}
</script>

<style>
.v-alert {
  position: fixed;
  left: 10;
  top: 0;
  margin: 0 auto;
  z-index: 1000;
  border-radius: 0px 0px 0px 0px;
  width: 100%;
}
</style>
