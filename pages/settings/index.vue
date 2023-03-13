<template>
  <v-row v-if="checkMobile() == false" class="pa-5">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row
        v-if="userData"
        no-gutters
        justify="center"
        style="min-height: 500px"
      >
        <v-col cols="3" class="d-flex align-end justify-end pt-10">
          <!-- CUSTOM STEPPER -->
          <v-card flat class="custom-stepper-container" style="height: 100%">
            <v-list dense rounded>
              <v-list-item
                :class="
                  e1 == 0
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 0"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 == 0 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"
                    > -->
                  <v-icon
                    size="20"
                    :color="e1 == 0 ? 'primary' : ''"
                    v-html="`$vuetify.icon.ProfitBarChartIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
                <v-list-item-content>
                  <v-list-item-title class="pl-4 text-body-1 font-weight-bold"
                    >Basic</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                :class="
                  e1 == 1
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 1"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 == 1 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"> -->
                  <v-icon
                    size="20"
                    :color="e1 == 1 ? 'primary' : ''"
                    v-html="`$vuetify.icon.ChartArrowUpIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
                <v-list-item-content>
                  <v-list-item-title class="pl-4 text-body-1 font-weight-bold"
                    >Wallet</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :class="
                  e1 == 2
                    ? 'custom-stepper off-white-2 mb-2'
                    : 'custom-stepper mb-2'
                "
                :ripple="false"
                @click="e1 = 2"
              >
                <v-progress-circular
                  :rotate="270"
                  :size="60"
                  :width="7"
                  :value="e1 == 2 ? 100 : 0"
                  color="primary"
                  class="d-flex align-center justify-center"
                >
                  <!-- <v-list-item-avatar size="50" class="ma-0"> -->
                  <v-icon
                    size="20"
                    :color="e1 == 2 ? 'primary' : ''"
                    v-html="`$vuetify.icon.CopyCheckIcon`"
                  ></v-icon>
                  <!-- </v-list-item-avatar> -->
                </v-progress-circular>
                <v-list-item-content>
                  <v-list-item-title class="pl-4 text-body-1 font-weight-bold"
                    >Account</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list dense v-if="false">
              <v-list-item
                :class="
                  e1 == 0
                    ? 'custom-stepper mb-2 off-white-2'
                    : 'custom-stepper mb-2 off-white-3'
                "
                :ripple="false"
                @click="e1 = 0"
              >
                <v-list-item-content>
                  <v-list-item-title class="pl-2 text-body-1 font-weight-bold"
                    >Basic</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                :class="
                  e1 == 1
                    ? 'custom-stepper mb-2 off-white-2'
                    : 'custom-stepper mb-2 off-white-3'
                "
                :ripple="false"
                @click="e1 = 1"
              >
                <v-list-item-content>
                  <v-list-item-title class="pl-2 text-body-1 font-weight-bold"
                    >Wallet</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :class="
                  e1 == 2
                    ? 'custom-stepper mb-2 off-white-2'
                    : 'custom-stepper mb-2 off-white-3'
                "
                :ripple="false"
                @click="e1 = 2"
              >
                <v-list-item-content>
                  <v-list-item-title class="pl-2 text-body-1 font-weight-bold"
                    >Account</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- CUSTOM STEPPER ENDS -->
        </v-col>
        <v-col cols="9">
          <v-tabs-items v-model="e1" vertical style="height: 100%" class="pa-5">
            <v-tab-item key="0">
              <v-row>
                <v-col cols="12">
                  <v-alert
                    border="left"
                    dense
                    colored-border
                    color="success"
                    class="text-body-1 font-weight-bold custom-alert"
                    >Profile Information</v-alert
                  >
                </v-col>
                <v-col cols="2">
                  <v-avatar size="100">
                    <img
                      :src="
                        user.photo_url ? user.photo_url : userData.photo_url
                      "
                      :alt="userData.display_name"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="10">
                  <v-row>
                    <v-col cols="12" class="d-flex align-center mt-8">
                      <v-btn
                        depressed
                        :loading="
                          isLoading || isSelecting || uploadProgress != 100
                        "
                        @click.stop="doUpload"
                        :disabled="isLoading || uploadProgress != 100"
                        color="primary"
                        rounded
                        class="mr-5"
                      >
                        {{
                          uploadProgress != 100
                            ? "Uploading"
                            : "Upload New Picture"
                        }}
                      </v-btn>

                      <v-file-input
                        ref="uploader"
                        @change="(file) => uploadImage(file)"
                        hide-input
                        accept="image/png, image/jpeg"
                        class="d-none"
                      />
                    </v-col>
                    <v-col cols="6">
                      <div class="mb-2 font-weight-bold">Display Name</div>

                      <v-text-field
                        v-model="userData.display_name"
                        rounded
                        class="custom-input py-2"
                        dense
                      />
                    </v-col>
                    <v-col cols="6">
                      <div class="mb-2 font-weight-bold">Email</div>

                      <v-text-field
                        v-model="userData.email"
                        rounded
                        class="custom-input py-2"
                        dense
                        disabled
                      />
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-2 font-weight-bold">Password</div>
                      <div class="grey--text mb-3">
                        To change your password, please logout from your account
                        and click "forgot password" to reset your password
                      </div>
                    </v-col>
                    <v-col cols="12" class="mt-10">
                      <v-btn
                        @click="save"
                        color="primary"
                        rounded
                        style="width: 168px"
                      >
                        Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item key="1">
              <v-row>
                <v-col cols="12">
                  <v-alert
                    border="left"
                    dense
                    colored-border
                    color="customYellow"
                    class="text-body-1 font-weight-bold custom-alert"
                    >Wallet Information</v-alert
                  >
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-bold">Virtual Account</div>
                  <v-text-field
                    v-model="userData.wallet_va"
                    rounded
                    class="custom-input py-2"
                    dense
                    disabled
                  />
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-bold">Wallet Address</div>
                  <v-text-field
                    v-model="userData.wallet"
                    rounded
                    class="custom-input py-2"
                    dense
                  />
                </v-col>
                <v-col cols="12" class="mt-10">
                  <v-btn
                    @click="save"
                    color="primary"
                    rounded
                    style="width: 168px"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item key="2">
              <v-row>
                <v-col cols="12">
                  <v-alert
                    border="left"
                    dense
                    colored-border
                    color="customPink"
                    class="text-body-1 font-weight-bold custom-alert"
                    >Account Settings</v-alert
                  >
                </v-col>
                <v-col cols="8">
                  <div class="font-weight-bold">Telegram Bot</div>
                  <div class="grey--text">
                    Activate BitZenius Telegram Bot as your virtual assistant
                  </div>
                </v-col>
                <v-col cols="4" class="d-flex align-center justify-end">
                  <v-btn
                    depressed
                    :loading="isLoading"
                    class="mt-3 text-capitalize"
                    :color="telegramConnected ? 'secondary' : 'primary'"
                    :disabled="telegramConnected"
                    @click.stop="connectTelegram"
                  >
                    <v-icon left> mdi-send </v-icon>
                    {{ telegramConnected ? "Connected" : "Connect" }}
                  </v-btn>
                  <a ref="telegramLink" target="_blank" />
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-bold">Two-Factor Authentication</div>
                  <div class="grey--text">
                    Choose your preferred 2FA for your account
                  </div>
                </v-col>
                <v-col
                  cols="8"
                  class="font-weight-bold d-flex align-center justify-start"
                >
                  Email
                </v-col>
                <v-col cols="4" class="d-flex align-center justify-end">
                  <v-switch
                    v-model="selected2FA.email"
                    hide-details
                    readonly
                    inset
                    color="primary"
                  ></v-switch>
                </v-col>
                <v-col
                  cols="8"
                  class="font-weight-bold d-flex align-center justify-start"
                >
                  Telegram
                </v-col>
                <v-col cols="4" class="d-flex align-center justify-end">
                  <v-switch
                    v-model="selected2FA.telegram"
                    hide-details
                    inset
                    color="primary"
                  ></v-switch>
                </v-col>
                <v-col cols="12" class="mt-10">
                  <v-btn
                    @click="save"
                    color="primary"
                    rounded
                    style="width: 168px"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>

          <v-stepper
            v-if="false"
            class="off-white-3"
            flat
            v-model="e1"
            :ripple="false"
            style="height: 100%"
          >
            <v-stepper-items class="off-white-3" style="width: 100%">
              <v-stepper-content
                class="pa-5 off-white-3"
                step="1"
                transition="scale-transition"
              >
              </v-stepper-content>

              <v-stepper-content
                class="pa-5 off-white-3"
                step="2"
                transition="scale-transition"
              ></v-stepper-content>

              <v-stepper-content
                class="pa-5 off-white-3"
                step="3"
                transition="scale-transition"
              ></v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
      <v-row v-else no-gutters justify="center" style="min-height: 500px">
        <v-col cols="3" class="pt-10">
          <v-card
            flat
            class="custom-stepper-container-loader"
            style="height: 100%"
          >
            <v-skeleton-loader
              type="list-item-avatar"
              class="mb-2"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="list-item-avatar"
              class="mb-2"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="list-item-avatar"
              class="mb-2"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-tabs-items v-model="e1" vertical style="height: 100%" class="pa-5">
            <v-tab-item key="0">
              <v-row>
                <v-col cols="12">
                  <v-alert border="left" dense class="custom-alert"
                    ><v-skeleton-loader type="heading"></v-skeleton-loader
                  ></v-alert>
                </v-col>
                <v-col cols="2">
                  <v-avatar size="100">
                    <v-skeleton-loader type="avatar"></v-skeleton-loader>
                  </v-avatar>
                </v-col>
                <v-col cols="10">
                  <v-row>
                    <v-col cols="12" class="d-flex align-center mt-8">
                      <v-skeleton-loader type="button"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="6">
                      <v-skeleton-loader type="text"></v-skeleton-loader>
                      <v-skeleton-loader
                        type="button"
                        class="mt-5"
                      ></v-skeleton-loader>
                    </v-col>
                    <v-col cols="6">
                      <v-skeleton-loader type="text"></v-skeleton-loader>
                      <v-skeleton-loader
                        type="button"
                        class="mt-5"
                      ></v-skeleton-loader>
                    </v-col>

                    <v-col cols="12">
                      <v-skeleton-loader type="paragraph"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="12" class="mt-10">
                      <v-skeleton-loader type="button"></v-skeleton-loader>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-col>
    <BaseModal
      @close="successModal = false"
      :parentModel="successModal"
      :maxWidth="'450'"
    >
      <ModalsSuccess
        @close-modal="successModal = false"
        @main-event="successModal = false"
      ></ModalsSuccess>
    </BaseModal>
    <v-dialog v-model="progressDialog" max-width="480px" persistent>
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
  </v-row>
  <v-row v-else-if="checkMobile() == true" class="pa-1 ma-0">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          <v-icon @click="$router.push('/account')">mdi-arrow-left</v-icon>
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col v-if="userData" cols="12">
      <v-tabs class="pa-2" v-model="e1">
        <v-tab :ripple="false" key="0">
          <span class="text-body-1 text-capitalize">Basic</span>
        </v-tab>
        <v-tab :ripple="false" key="1">
          <span class="text-body-1 text-capitalize">Wallet</span>
        </v-tab>
        <v-tab :ripple="false" key="2">
          <span class="text-body-1 text-capitalize">Settings</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="e1"
        style="height: 100%"
        class="pa-5"
        :touchless="true"
      >
        <v-tab-item key="0">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-center align-center"
              style="position: relative"
            >
              <v-avatar size="125">
                <img :src="user.photo_url" :alt="userData.display_name" />
              </v-avatar>

              <v-btn
                depressed
                :loading="isLoading || isSelecting || uploadProgress != 100"
                @click.stop="doUpload"
                :disabled="isLoading || uploadProgress != 100"
                color="primary"
                rounded
                fab
                small
                class="floating-upload-icon"
              >
                <v-icon>$vuetify.icons.CameraSwitchIcon</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="d-flex align-center mt-8">
                  <v-file-input
                    ref="uploader"
                    @change="(file) => uploadImage(file)"
                    hide-input
                    accept="image/png, image/jpeg"
                    class="d-none"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="mb-2 font-weight-bold">Display Name</div>

                  <v-text-field
                    v-model="userData.display_name"
                    rounded
                    class="custom-input py-2"
                    dense
                  />
                </v-col>
                <v-col cols="12">
                  <div class="mb-2 font-weight-bold">Email</div>

                  <v-text-field
                    v-model="userData.email"
                    rounded
                    class="custom-input py-2"
                    dense
                    disabled
                  />
                </v-col>
                <v-col cols="12">
                  <div class="mb-2 font-weight-bold">Password</div>
                  <div class="grey--text mb-3">
                    To change your password, please logout from your account and
                    click "forgot password" to reset your password
                  </div>
                </v-col>
                <v-col cols="12" class="mt-10">
                  <v-btn
                    @click="save"
                    color="primary"
                    rounded
                    block
                    style="width: 168px"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item key="1">
          <v-row>
            <v-col cols="12">
              <div class="font-weight-bold">Virtual Account</div>
              <v-text-field
                v-model="userData.wallet_va"
                rounded
                class="custom-input py-2"
                dense
                disabled
              />
            </v-col>
            <v-col cols="12">
              <div class="font-weight-bold">Wallet Address</div>
              <v-text-field
                v-model="userData.wallet"
                rounded
                class="custom-input py-2"
                dense
              />
            </v-col>
            <v-col cols="12" class="mt-10">
              <v-btn
                block
                @click="save"
                color="primary"
                rounded
                style="width: 168px"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item key="2">
          <v-row>
            <v-col cols="8">
              <div class="font-weight-bold">Telegram Bot</div>
              <div class="grey--text">
                Activate BitZenius Telegram Bot as your virtual assistant
              </div>
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-end">
              <v-btn
                depressed
                :loading="isLoading"
                class="mt-3 text-capitalize"
                :color="telegramConnected ? 'secondary' : 'primary'"
                :disabled="telegramConnected"
                @click.stop="connectTelegram"
              >
                <v-icon left> mdi-send </v-icon>
                {{ telegramConnected ? "Connected" : "Connect" }}
              </v-btn>
              <a ref="telegramLink" target="_blank" />
            </v-col>
            <v-col cols="12">
              <div class="font-weight-bold">Two-Factor Authentication</div>
              <div class="grey--text">
                Choose your preferred 2FA for your account
              </div>
            </v-col>
            <v-col
              cols="8"
              class="font-weight-bold d-flex align-center justify-start"
            >
              Email
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-end">
              <v-switch
                v-model="selected2FA.email"
                hide-details
                readonly
                inset
                color="primary"
              ></v-switch>
            </v-col>
            <v-col
              cols="8"
              class="font-weight-bold d-flex align-center justify-start"
            >
              Telegram
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-end">
              <v-switch
                v-model="selected2FA.telegram"
                hide-details
                inset
                color="primary"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="mt-10">
              <v-btn
                block
                @click="save"
                color="primary"
                rounded
                style="width: 168px"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>

      <v-dialog v-model="progressDialog" max-width="480px" persistent>
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
    </v-col>
    <v-col v-else cols="12">
      <v-tabs class="pa-2" v-model="e1">
        <v-tab :ripple="false" disabled key="0">
          <span class="text-body-1 text-capitalize">Basic</span>
        </v-tab>
        <v-tab :ripple="false" disabled key="1">
          <span class="text-body-1 text-capitalize">Wallet</span>
        </v-tab>
        <v-tab :ripple="false" disabled key="2">
          <span class="text-body-1 text-capitalize">Settings</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="e1"
        style="height: 100%"
        class="pa-5"
        :touchless="true"
      >
        <v-tab-item key="0">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-center align-center"
              style="position: relative"
            >
              <v-avatar size="125">
                <v-skeleton-loader type="avatar"></v-skeleton-loader>
              </v-avatar>

              <v-skeleton-loader type="button" class="floating-upload-icon">
              </v-skeleton-loader>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="mb-3">
                  <v-skeleton-loader type="heading" class="mb-2">
                  </v-skeleton-loader>
                  <v-skeleton-loader type="text" class="mb-2">
                  </v-skeleton-loader>
                </v-col>
                <v-col cols="12" class="mb-3">
                  <v-skeleton-loader type="heading" class="mb-2">
                  </v-skeleton-loader>
                  <v-skeleton-loader type="text" class="mb-2">
                  </v-skeleton-loader>
                </v-col>
                <v-col cols="12" class="mb-3">
                  <v-skeleton-loader type="paragraph"> </v-skeleton-loader>
                </v-col>
                <v-col cols="12" class="mt-10">
                  <v-skeleton-loader type="button"> </v-skeleton-loader>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <BaseModal
      @close="successModal = false"
      :parentModel="successModal"
      :maxWidth="'450'"
    >
      <ModalsSuccess
        @close-modal="successModal = false"
        @main-event="successModal = false"
      ></ModalsSuccess>
    </BaseModal>
  </v-row>
</template>

<style scoped>
a {
  color: #0060b6;
  text-decoration: none;
}

a:hover {
  color: #00a0c6;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script>
export default {
  layout: "account",
  data() {
    return {
      title: "Settings",
      usdt: "0x19c4791bDEB776a376008F596F5D2564E5650379",
      avatar: "@/static/settings/avatar.png",
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@bitzenius.com",
      phone: "+6223123213",
      address: "Lorem Ipsum Dolor Sit Amet",
      country: "Lorem",
      showBotAlert: false,
      showEnableTwoFactorModal: false,
      isLoading: false,
      progressDialog: null,
      uploadProgress: 100,
      isSelecting: false,
      userData: null,
      switch1: false,
      tab: null,
      selected2Fa: "none",
      selected2FA: {
        email: true,
        telegram: false,
      },
      listener: new Object(),
      telegramConnected: false,
      e1: 0,

      successModal: false,
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    getProfile() {
      this.isLoading = true;
      this.$api
        .$get("/user/profile")
        .then((res) => {
          this.userData = res.result;

          if (this.userData.otp && this.userData.otp.method) {
            this.selected2Fa = this.userData.otp.method;
          }
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    uploadImage(file) {
      if (typeof file != "undefined") {
        if (!file.type.includes("image")) {
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please upload valid image file",
            color: "danger",
          });
        }
        this.uploadProgress = 0;
        // this.progressDialog = true;

        const filePath = `user-avatars/${new Date().getTime()}-` + file.name;
        const storageRef = this.$fire.storage.ref().child(filePath);
        const uploadTask = storageRef.put(file);
        this.isLoading = true;
        this.$store.commit("setIsLoading", true);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadProgress = Math.ceil(progress);

            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;

              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
            this.$store.commit("setIsLoading", false);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.userData.photo_url = downloadURL;
              this.save();
            });
          }
        );
      }
    },
    closeDialog() {
      this.progressDialog = false;
      this.uploadProgress = 100;
      this.save();
    },
    doUpload() {
      this.isSelecting = true;

      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.$refs.input.click();
    },
    save() {
      this.$store.commit("setIsLoading", true);
      this.isLoading = true;
      this.$api
        .$put("/user/profile", {
          display_name: this.userData.display_name,
          photo_url: this.userData.photo_url,
          wallet: this.userData.wallet,
          otp_method: this.selected2Fa,
        })
        .then((res) => {
          this.$store.commit("setUser", {
            displayName: this.userData.display_name,
            photoURL: this.userData.photo_url,
          });

          this.getProfile();
          this.successModal = true;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
          this.$store.commit("setIsLoading", false);
        });
    },
    connectTelegram() {
      this.isLoading = true;
      this.$api
        .$post("/user/profile/connect-telegram")
        .then((res) => {
          this.$refs.telegramLink.href = `https://t.me/${process.env.BOT_ID}?start=${res.token}`;
          this.$refs.telegramLink.click();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    listenTelegram() {
      if (this.user) {
        this.listener = this.$fire.firestore
          .collection("telegrams")
          .doc(this.user.uid)
          .onSnapshot(async (onResult, onError) => {
            if (onError) {
              console.log(onError);
            }

            if (onResult.exists) {
              const telegramData = onResult.data();

              if (telegramData.chat_id) {
                this.telegramConnected = true;
              }
            }
          });
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
  },
  beforeDestroy() {
    this.listener();
  },
  mounted() {
    this.getProfile();
    this.listenTelegram();
  },
};
</script>

<style>
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

.custom-chip {
  cursor: pointer;

  width: 100%;
  display: flex;
  justify-content: center;
  max-width: fit-content;
}
.custom-input {
  margin-top: 0px !important;
  padding: 0px !important;
}
.chip-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}
.custom-stepper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 5px !important;
  justify-content: flex-start;
  border-radius: 25px 0% 0% 25px;
}
.custom-stepper-container {
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  border-radius: 10px 0px 0px 10px;
}
.custom-stepper-container-loader {
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 25px;
  border-radius: 10px 0px 0px 10px;
}
.custom-input {
}

.custom-input.v-input .v-input__slot {
  color: black !important;
}

.custom-alert
  > .v-alert__wrapper
  > .v-alert__border.v-alert__border--left.v-alert__border--has-color {
  border-radius: 25% !important;
}

.floating-upload-icon {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(50%, 0%);
}
</style>